import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  query,
  orderBy,
  limit,
  increment,
  serverTimestamp
} from "firebase/firestore";
import { COL } from "./collections.js";
import {
  recordAction,
  bindUndoRedoButtons,
  undoLast,
  redoLast,
  clearHistory,
  isApplyingHistory
} from "./undo-manager.js";
import {
  exportFullDatabase,
  wipeAllStudyData,
  restoreFullDatabase
} from "./db-admin.js";
import {
  normalizeStartedAtMs,
  isLiveSessionRunning
} from "./session-utils.js";
import { weeklyPlan } from "./weekly-plan-data.js";
import {
  buildTimetableRows,
  getDefaultSlotsWithoutOverride,
  DEFAULT_TIMETABLE_FIXED_BLOCKS
} from "./timetable-utils.js";

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];

export function bootOmApp(db, pageId = "home") {
  let unsubscribers = [];
  let notifyPlanWeekFromSettings = null;
  let localTimerInterval = null;
  let examInputsWired = false;
  let timerButtonsWired = false;
  let addTaskWired = false;
  let addMainsWired = false;
  let adminWired = false;
  let timetableEditorWired = false;
  let timetableFormInitializing = false;
  let weekTicker = null;

  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) {
      return;
    }
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2800);
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function toDateKey(d) {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }

  function endOfLocalDayFromDateInput(dateStr) {
    const parts = dateStr.split("-").map(Number);
    if (parts.length !== 3) {
      return new Date();
    }
    return new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999);
  }

  function formatDuration(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h > 0) {
      return `${h} hours, ${m} minutes, ${r} seconds`;
    }
    if (m > 0) {
      return `${m} minutes, ${r} seconds`;
    }
    return `${r} seconds`;
  }

  function formatDurationShort(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    if (s < 60) {
      return `${s}s`;
    }
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) {
      return `${h}h ${m % 60}m`;
    }
    return `${m}m`;
  }

  function getActiveWeekObject(settings) {
    let wNum = Number(settings && settings.currentPrepWeek);
    if (!weeklyPlan.some((w) => w.week === wNum)) {
      wNum = weeklyPlan[0].week;
    }
    return weeklyPlan.find((w) => w.week === wNum) || weeklyPlan[0];
  }

  function planSliceForSubject(weekObj, subject) {
    if (!weekObj) {
      return null;
    }
    if (subject === "Mathematics") {
      return weekObj.math;
    }
    if (subject === "Physics") {
      return weekObj.phy;
    }
    if (subject === "Chemistry") {
      return weekObj.chem;
    }
    return null;
  }

  function formatClock(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${d} days, ${pad2(h)} hours, ${pad2(m)} minutes, ${pad2(s)} seconds`;
  }

  function renderCountdowns(trialStr, finalStr, mains1Str, mains2Str) {
    const trialEl = document.getElementById("count-trial");
    const finalEl = document.getElementById("count-final");
    const mains1El = document.getElementById("count-mains1");
    const mains2El = document.getElementById("count-mains2");
    const daysRemainingEl = document.getElementById("days-remaining");

    if (!trialEl || !finalEl) {
      return;
    }

    // Use saved dates from settings, fall back to official defaults
    const MAINS1 = mains1Str || "2026-01-29";
    const MAINS2 = mains2Str || "2026-04-08";
    const ADV2026 = trialStr || "2026-05-17";
    const ADV2027 = finalStr || "2027-05-17";

    const tick = () => {
      const now = Date.now();
      if (mains1El) mains1El.textContent = formatClock(endOfLocalDayFromDateInput(MAINS1).getTime() - now);
      if (mains2El) mains2El.textContent = formatClock(endOfLocalDayFromDateInput(MAINS2).getTime() - now);
      trialEl.textContent = formatClock(endOfLocalDayFromDateInput(ADV2026).getTime() - now);
      finalEl.textContent = formatClock(endOfLocalDayFromDateInput(ADV2027).getTime() - now);

      if (daysRemainingEl) {
        const daysLeft = Math.max(0, Math.ceil((endOfLocalDayFromDateInput(ADV2027).getTime() - now) / 86400000));
        daysRemainingEl.textContent = daysLeft;
      }
    };
    tick();
    if (window.__countdownTimer) {
      clearInterval(window.__countdownTimer);
    }
    window.__countdownTimer = setInterval(tick, 1000);
  }

  function renderMainsCountdowns(list) {
    const root = document.getElementById("mains-countdowns");
    if (!root) {
      return;
    }
    if (!list || !list.length) {
      root.innerHTML =
        "<p class='section-desc'>No Joint Entrance Examination Main dates added yet.</p>";
      return;
    }
    const now = Date.now();
    root.innerHTML = list
      .map((row) => {
        const end = endOfLocalDayFromDateInput(row.date).getTime();
        const text = formatClock(end - now);
        return `<div class='count-card'><div class='count-card-label'>${escapeHtml(row.title)}</div><div class='count-card-value'>${text}</div></div>`;
      })
      .join("");
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderScheduleUnified(settings) {
    const root = document.getElementById("schedule-blocks");
    if (!root) {
      return;
    }
    const finalStr = settings.jeeAdvancedFinalDate || "2027-05-17";
    const dateKey = toDateKey(new Date());
    const rows = buildTimetableRows(settings, dateKey, finalStr, SUBJECTS);
    const wObj = getActiveWeekObject(settings);
    const banner = document.getElementById("weekly-plan-banner");
    if (banner) {
      banner.innerHTML =
        `<div class="week-banner__text">` +
        `<p class="week-banner__meta">Week ${wObj.week} · ${escapeHtml(wObj.month)}</p>` +
        `<p class="week-banner__theme">${escapeHtml(wObj.theme || "")}</p></div>` +
        `<a class="week-banner__link btn btn-ghost" href="./plan.html">Edit week</a>`;
    }
    const subSlug = (s) =>
      s === "Mathematics" ? "mathematics"
      : s === "Physics" ? "physics"
      : "chemistry";
    root.innerHTML = rows
      .map((r) => {
        const p = planSliceForSubject(wObj, r.subject);
        const topic = p && p.topic ? `<p class="study-block__topic">${escapeHtml(p.topic)}</p>` : "";
        const task = p && p.task ? `<p class="study-block__task">${escapeHtml(p.task)}</p>` : "";
        const book =
          p && p.book ?
            `<p class="study-block__book">${escapeHtml(p.book)}</p>`
          : "";
        const chips = (p && p.targets ? p.targets : [])
          .filter((t) => t && (Number(t.n) > 0 || String(t.lbl || "").length))
          .slice(0, 4)
          .map(
            (t) =>
              `<span class="study-chip">${escapeHtml(t.lbl)}${Number(t.n) > 0 ? ` · ${t.n}` : ""}</span>`
          )
          .join("");
        const chipsHtml =
          chips ? `<div class="study-block__chips">${chips}</div>` : "";
        const sub = escapeHtml(r.subject);
        return (
          `<article class="study-block study-block--${subSlug(r.subject)}">` +
          `<div class="study-block__head">` +
          `<span class="study-block__time">${escapeHtml(r.start)}–${escapeHtml(r.end)}</span>` +
          `<span class="study-block__subject">${sub}</span></div>` +
          `<div class="study-block__plan">${topic}${task}${book}${chipsHtml}</div>` +
          `<div class="study-block__timer">` +
          `<span class="study-block__live" data-running-live="${sub}">—</span>` +
          `<div class="study-block__timer-btns">` +
          `<button type="button" class="btn btn-timer-start timer-subject-start" data-subject="${sub}">Start</button>` +
          `<button type="button" class="btn btn-timer-stop timer-subject-stop" data-subject="${sub}" disabled>Stop</button>` +
          `</div>` +
          `<span class="study-block__today">Today <strong data-today-total="${sub}">0s</strong></span>` +
          `</div></article>`
        );
      })
      .join("");
    const pyqEl = document.getElementById("schedule-pyq");
    if (pyqEl) {
      const q = wObj.pyq;
      if (q && (q.topic || q.task)) {
        pyqEl.hidden = false;
        const qt = q.topic ? `<p class="study-pyq__topic">${escapeHtml(q.topic)}</p>` : "";
        const qtask = q.task ? `<p class="study-pyq__task">${escapeHtml(q.task)}</p>` : "";
        const qchips = (q.targets || [])
          .map(
            (t) =>
              `<span class="study-chip">${escapeHtml(t.lbl)}${Number(t.n) > 0 ? ` · ${t.n}` : ""}</span>`
          )
          .join("");
        pyqEl.innerHTML =
          `<h3 class="study-pyq__title">Previous-year &amp; mocks</h3>${qt}${qtask}` +
          (qchips ? `<div class="study-block__chips">${qchips}</div>` : "");
      } else {
        pyqEl.hidden = true;
        pyqEl.innerHTML = "";
      }
    }
    resyncLiveTimersAfterScheduleRender();
  }

  function applySettingsToUi(data) {
    const trialStr = data.jeeAdvancedTrialDate || "2026-05-17";
    const finalStr = data.jeeAdvancedFinalDate || "2027-05-17";
    const mains1Str = data.jeeMains1Date || "2026-01-29";
    const mains2Str = data.jeeMains2Date || "2026-04-08";
    const trial = document.getElementById("input-trial");
    const fin = document.getElementById("input-final");
    const m1 = document.getElementById("input-mains1");
    const m2 = document.getElementById("input-mains2");
    if (trial) trial.value = trialStr;
    if (fin) fin.value = finalStr;
    if (m1) m1.value = mains1Str;
    if (m2) m2.value = mains2Str;
    renderCountdowns(trialStr, finalStr, mains1Str, mains2Str);
    renderScheduleUnified(data);
    renderMainsCountdowns(data.jeeMainsList || []);
    // home page specific
    if (pageId === "home") {
      renderHomeScheduleBlocks(data);
      const mainsSection = document.getElementById("mains-section");
      if (mainsSection) {
        mainsSection.style.display = (data.jeeMainsList && data.jeeMainsList.length) ? "" : "none";
      }
    }
  }

  async function commitDocumentReplace(ref, nextData, successToast) {
    const snap = await getDoc(ref);
    const had = snap.exists();
    const prev = had ? snap.data() : null;
    await setDoc(ref, nextData);
    if (isApplyingHistory()) {
      return;
    }
    recordAction({
      undo: async () => {
        if (!had) {
          await deleteDoc(ref);
        } else {
          await setDoc(ref, prev);
        }
      },
      redo: async () => {
        await setDoc(ref, nextData);
      }
    });
    if (successToast) {
      toast(successToast);
    }
  }

  async function commitSettingsMerged(patch, successToast) {
    const ref = doc(db, COL.settings, COL.general);
    const snap = await getDoc(ref);
    const base = snap.exists() ? snap.data() : {};
    const next = { ...base, ...patch };
    await commitDocumentReplace(ref, next, successToast);
  }

  function timeToMinutes(t) {
    const p = String(t || "").split(":");
    if (p.length < 2) {
      return NaN;
    }
    return Number(p[0]) * 60 + Number(p[1]);
  }

  function validateBlockRows(rows) {
    if (!rows.length) {
      return "Add at least one time block.";
    }
    for (const r of rows) {
      if (!r.start || !r.end) {
        return "Every block needs a start and end time.";
      }
      if (timeToMinutes(r.end) <= timeToMinutes(r.start)) {
        return "Each block’s end time must be after its start time.";
      }
    }
    return null;
  }

  function readBlockRows(root) {
    if (!root) {
      return [];
    }
    const rows = [];
    root.querySelectorAll(".timetable-block-row").forEach((el) => {
      const s = el.querySelector(".timetable-start")?.value?.trim();
      const e = el.querySelector(".timetable-end")?.value?.trim();
      if (s && e) {
        rows.push({ start: s, end: e });
      }
    });
    return rows;
  }

  function appendBlockRow(root, start, end) {
    const wrap = document.createElement("div");
    wrap.className = "timetable-block-row";
    wrap.innerHTML =
      `<div class="field"><label>Start</label><input type="time" class="timetable-start" value="${escapeHtml(start)}" /></div>` +
      `<div class="field"><label>End</label><input type="time" class="timetable-end" value="${escapeHtml(end)}" /></div>` +
      `<div><button type="button" class="btn btn-ghost timetable-remove-row">Remove</button></div>`;
    wrap.querySelector(".timetable-remove-row").addEventListener("click", () => {
      const par = wrap.parentElement;
      wrap.remove();
      if (par && par.id === "timetable-fixed-rows") {
        par.dispatchEvent(new Event("change", { bubbles: false }));
      }
    });
    root.appendChild(wrap);
  }

  function refreshDailyEditorRows() {
    const dailyRoot = document.getElementById("timetable-daily-rows");
    const od = document.getElementById("timetable-override-date");
    if (!dailyRoot || !od) {
      return;
    }
    const data = window.__lastSettings || {};
    const dk = od.value || toDateKey(new Date());
    const finalStr = data.jeeAdvancedFinalDate || "2027-05-17";
    const overrides = data.timetableDailyOverrides || {};
    const mode = data.timetableMode === "daily" ? "daily" : "fixed";
    let slots;
    if (
      mode === "daily" &&
      Array.isArray(overrides[dk]) &&
      overrides[dk].length
    ) {
      slots = overrides[dk].map((b) => ({
        start: String(b.start),
        end: String(b.end)
      }));
    } else {
      slots = getDefaultSlotsWithoutOverride(data, dk, finalStr);
    }
    dailyRoot.innerHTML = "";
    slots.forEach((b) => appendBlockRow(dailyRoot, b.start, b.end));
  }

  function setTimetableFormFromSettings(data) {
    const fixedRoot = document.getElementById("timetable-fixed-rows");
    if (!fixedRoot) {
      return;
    }
    timetableFormInitializing = true;
    try {
      const modeFixed = document.getElementById("timetable-mode-fixed");
      const modeDaily = document.getElementById("timetable-mode-daily");
      const autoEvening = document.getElementById("timetable-auto-evening");
      const dailyPanel = document.getElementById("timetable-daily-panel");
      const mode = data.timetableMode === "daily" ? "daily" : "fixed";
      if (modeFixed) {
        modeFixed.checked = mode === "fixed";
      }
      if (modeDaily) {
        modeDaily.checked = mode === "daily";
      }
      if (autoEvening) {
        autoEvening.checked = data.timetableAutoEveningSlot !== false;
      }
      if (dailyPanel) {
        dailyPanel.classList.toggle("hidden", mode !== "daily");
      }
      const blocks =
        Array.isArray(data.timetableFixedBlocks) && data.timetableFixedBlocks.length
          ? data.timetableFixedBlocks
          : DEFAULT_TIMETABLE_FIXED_BLOCKS;
      fixedRoot.innerHTML = "";
      blocks.forEach((b) =>
        appendBlockRow(fixedRoot, String(b.start), String(b.end))
      );
      if (!blocks.length) {
        appendBlockRow(fixedRoot, "06:30", "08:30");
      }
      const od = document.getElementById("timetable-override-date");
      if (od && !od.value) {
        od.value = toDateKey(new Date());
      }
      refreshDailyEditorRows();
    } finally {
      timetableFormInitializing = false;
    }
  }

  function wireTimetableEditorOnce() {
    if (timetableEditorWired) {
      return;
    }
    const fixedRoot = document.getElementById("timetable-fixed-rows");
    const modeFixed = document.getElementById("timetable-mode-fixed");
    const modeDaily = document.getElementById("timetable-mode-daily");
    const autoEvening = document.getElementById("timetable-auto-evening");
    const dailyPanel = document.getElementById("timetable-daily-panel");
    const overrideDate = document.getElementById("timetable-override-date");
    const dailyRoot = document.getElementById("timetable-daily-rows");
    const btnAddFixed = document.getElementById("btn-timetable-add-fixed");
    const btnAddDaily = document.getElementById("btn-timetable-add-daily");
    const btnSaveDaily = document.getElementById("btn-timetable-save-daily");
    const btnClearDaily = document.getElementById("btn-timetable-clear-daily");
    if (
      !fixedRoot ||
      !modeFixed ||
      !modeDaily ||
      !autoEvening ||
      !dailyPanel ||
      !overrideDate ||
      !dailyRoot ||
      !btnAddFixed ||
      !btnAddDaily ||
      !btnSaveDaily ||
      !btnClearDaily
    ) {
      return;
    }
    timetableEditorWired = true;

    function onModeChange() {
      if (timetableFormInitializing) {
        return;
      }
      const daily = modeDaily.checked;
      dailyPanel.classList.toggle("hidden", !daily);
      commitSettingsMerged(
        { timetableMode: daily ? "daily" : "fixed" },
        "Timetable mode saved."
      ).catch((e) => {
        toast("Could not save timetable mode.");
        console.error(e);
      });
    }
    modeFixed.addEventListener("change", onModeChange);
    modeDaily.addEventListener("change", onModeChange);

    autoEvening.addEventListener("change", () => {
      if (timetableFormInitializing) {
        return;
      }
      commitSettingsMerged(
        { timetableAutoEveningSlot: autoEvening.checked },
        "Timetable option saved."
      ).catch((e) => {
        toast("Could not save option.");
        console.error(e);
      });
    });

    fixedRoot.addEventListener("change", () => {
      if (timetableFormInitializing) {
        return;
      }
      const rows = readBlockRows(fixedRoot);
      const err = validateBlockRows(rows);
      if (err) {
        toast(err);
        return;
      }
      commitSettingsMerged(
        { timetableFixedBlocks: rows },
        "Default timetable blocks saved."
      ).catch((e) => {
        toast("Could not save blocks.");
        console.error(e);
      });
    });

    btnAddFixed.addEventListener("click", () => {
      appendBlockRow(fixedRoot, "09:00", "10:30");
      if (timetableFormInitializing) {
        return;
      }
      const rows = readBlockRows(fixedRoot);
      const err = validateBlockRows(rows);
      if (err) {
        toast(err);
        return;
      }
      commitSettingsMerged({ timetableFixedBlocks: rows }, null).catch(
        console.error
      );
    });

    overrideDate.addEventListener("change", () => {
      refreshDailyEditorRows();
    });

    btnSaveDaily.addEventListener("click", () => {
      const dk = overrideDate.value;
      if (!dk) {
        toast("Pick a date first.");
        return;
      }
      const rows = readBlockRows(dailyRoot);
      const err = validateBlockRows(rows);
      if (err) {
        toast(err);
        return;
      }
      const data = window.__lastSettings || {};
      const next = { ...(data.timetableDailyOverrides || {}), [dk]: rows };
      commitSettingsMerged(
        { timetableDailyOverrides: next },
        "Saved blocks for that day."
      ).catch((e) => {
        toast("Could not save this day.");
        console.error(e);
      });
    });

    btnClearDaily.addEventListener("click", () => {
      const dk = overrideDate.value;
      if (!dk) {
        return;
      }
      const data = window.__lastSettings || {};
      const prev = { ...(data.timetableDailyOverrides || {}) };
      delete prev[dk];
      commitSettingsMerged(
        { timetableDailyOverrides: prev },
        "Cleared custom day."
      )
        .then(() => refreshDailyEditorRows())
        .catch((e) => {
          toast("Could not clear.");
          console.error(e);
        });
    });

    btnAddDaily.addEventListener("click", () => {
      appendBlockRow(dailyRoot, "09:00", "10:30");
    });
  }

  async function commitTasksChange(dateKey, nextItems) {
    const ref = doc(db, COL.tasks, dateKey);
    const snap = await getDoc(ref);
    const had = snap.exists();
    const prev = had ? snap.data() : null;
    const nextPayload = {
      items: nextItems,
      updatedAt: serverTimestamp()
    };
    await setDoc(ref, nextPayload);
    if (isApplyingHistory()) {
      return;
    }
    recordAction({
      undo: async () => {
        if (!had) {
          await deleteDoc(ref);
        } else {
          await setDoc(ref, prev);
        }
      },
      redo: async () => {
        await setDoc(ref, {
          items: nextItems,
          updatedAt: serverTimestamp()
        });
      }
    });
  }

  function wireExamDateInputsOnce() {
    if (examInputsWired) {
      return;
    }
    const trial = document.getElementById("input-trial");
    const fin = document.getElementById("input-final");
    const m1 = document.getElementById("input-mains1");
    const m2 = document.getElementById("input-mains2");
    if (!trial || !fin) {
      return;
    }
    examInputsWired = true;
    trial.addEventListener("change", () => {
      commitSettingsMerged(
        { jeeAdvancedTrialDate: trial.value },
        "JEE Advanced 2026 date saved."
      ).catch((e) => {
        toast("Could not save. Check internet and Firebase rules.");
        console.error(e);
      });
    });
    fin.addEventListener("change", () => {
      commitSettingsMerged(
        { jeeAdvancedFinalDate: fin.value },
        "JEE Advanced 2027 date saved."
      ).catch((e) => {
        toast("Could not save. Check internet and Firebase rules.");
        console.error(e);
      });
    });
    if (m1) {
      m1.addEventListener("change", () => {
        commitSettingsMerged(
          { jeeMains1Date: m1.value },
          "JEE Mains Session 1 date saved."
        ).catch((e) => {
          toast("Could not save. Check internet and Firebase rules.");
          console.error(e);
        });
      });
    }
    if (m2) {
      m2.addEventListener("change", () => {
        commitSettingsMerged(
          { jeeMains2Date: m2.value },
          "JEE Mains Session 2 date saved."
        ).catch((e) => {
          toast("Could not save. Check internet and Firebase rules.");
          console.error(e);
        });
      });
    }
  }

  function renderMainsEditor(list) {
    const root = document.getElementById("mains-editor");
    if (!root) {
      return;
    }
    const rows = list || [];
    root.innerHTML = rows
      .map(
        (row) =>
          `<div class='mains-item' data-id='${escapeHtml(row.id)}'>` +
          `<input type='text' class='mains-title' value='${escapeHtml(row.title)}' placeholder='Example: Joint Entrance Examination Main, January attempt' aria-label='Exam name' />` +
          `<input type='date' class='mains-date' value='${escapeHtml(row.date)}' aria-label='Exam date' />` +
          `<button type='button' class='btn btn-ghost mains-remove' data-id='${escapeHtml(row.id)}'>Remove this exam row</button></div>`
      )
      .join("");

    root.querySelectorAll(".mains-title").forEach((inp) => {
      inp.addEventListener("change", flushMainsFromEditor);
    });
    root.querySelectorAll(".mains-date").forEach((inp) => {
      inp.addEventListener("change", flushMainsFromEditor);
    });
    root.querySelectorAll(".mains-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const latest =
          (window.__lastSettings && window.__lastSettings.jeeMainsList) || [];
        const next = latest.filter((r) => r.id !== id);
        commitSettingsMerged({ jeeMainsList: next }, null).catch(console.error);
      });
    });
  }

  function flushMainsFromEditor() {
    const root = document.getElementById("mains-editor");
    const items = [];
    root.querySelectorAll(".mains-item").forEach((el) => {
      const id = el.getAttribute("data-id");
      const title = el.querySelector(".mains-title").value.trim();
      const date = el.querySelector(".mains-date").value;
      if (title && date) {
        items.push({ id, title, date });
      }
    });
    commitSettingsMerged({ jeeMainsList: items }, null).catch(console.error);
  }

  function wireAddMainsOnce() {
    if (addMainsWired) {
      return;
    }
    const addBtn = document.getElementById("btn-add-mains");
    if (!addBtn) {
      return;
    }
    addMainsWired = true;
    addBtn.addEventListener("click", () => {
      const id = `mains_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const cur =
        window.__lastSettings && window.__lastSettings.jeeMainsList
          ? window.__lastSettings.jeeMainsList.slice()
          : [];
      cur.push({
        id,
        title: "Joint Entrance Examination Main",
        date: toDateKey(new Date())
      });
      commitSettingsMerged({ jeeMainsList: cur }, null).catch(console.error);
    });
  }

  function subscribeSettings() {
    const ref = doc(db, COL.settings, COL.general);
    const u = onSnapshot(ref, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      window.__lastSettings = data;
      if (!data.jeeAdvancedTrialDate) {
        data.jeeAdvancedTrialDate = "2026-05-17";
      }
      if (!data.jeeAdvancedFinalDate) {
        data.jeeAdvancedFinalDate = "2027-05-17";
      }
      applySettingsToUi(data);
      renderMainsEditor(data.jeeMainsList || []);
      renderMainsCountdowns(data.jeeMainsList || []);
      if (notifyPlanWeekFromSettings) {
        notifyPlanWeekFromSettings(data);
      }
      if (document.getElementById("timetable-fixed-rows")) {
        setTimetableFormFromSettings(data);
      }
    });
    unsubscribers.push(u);
  }

  function subscribeTodayTotals(dateKey) {
    const ref = doc(db, COL.dailyTotals, dateKey);
    const u = onSnapshot(ref, (snap) => {
      const d = snap.exists() ? snap.data() : {};
      SUBJECTS.forEach((sub) => {
        const sec = Number(d[sub] || 0);
        const short = formatDurationShort(sec);
        document.querySelectorAll(`[data-today-total="${sub}"]`).forEach((el) => {
          el.textContent = short;
        });
        const el = document.getElementById(`today-${sub}`);
        if (el && !el.hasAttribute("data-today-total")) {
          el.textContent = formatDuration(sec);
        }
      });
    });
    unsubscribers.push(u);
  }

  function subscribeWeekMonth() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    function sumRangeDocs(docs) {
      const acc = { Physics: 0, Chemistry: 0, Mathematics: 0 };
      docs.forEach((s) => {
        if (!s.exists()) {
          return;
        }
        const x = s.data();
        SUBJECTS.forEach((sub) => {
          acc[sub] += Number(x[sub] || 0);
        });
      });
      return acc;
    }

    const keysThisWeek = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      keysThisWeek.push(toDateKey(d));
    }

    const keysThisMonth = [];
    for (
      let d = new Date(monthStart);
      d <= today;
      d.setDate(d.getDate() + 1)
    ) {
      keysThisMonth.push(toDateKey(new Date(d)));
    }

    Promise.all(keysThisWeek.map((k) => getDoc(doc(db, COL.dailyTotals, k)))).then(
      (snaps) => {
        const acc = sumRangeDocs(snaps);
        SUBJECTS.forEach((s) => {
          const el = document.getElementById(`week-${s}`);
          if (el) {
            el.textContent = formatDuration(acc[s]);
          }
        });
      }
    );

    Promise.all(
      keysThisMonth.map((k) => getDoc(doc(db, COL.dailyTotals, k)))
    ).then((snaps) => {
      const acc = sumRangeDocs(snaps);
      SUBJECTS.forEach((s) => {
        const el = document.getElementById(`month-${s}`);
        if (el) {
          el.textContent = formatDuration(acc[s]);
        }
      });
    });
  }

  function startLocalTick(subject, startedAtMs) {
    if (localTimerInterval) {
      clearInterval(localTimerInterval);
    }
    localTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
      const text = formatDuration(elapsed);
      const shortText = formatDurationShort(elapsed);
      document.querySelectorAll(`[data-running-live="${subject}"]`).forEach((el) => {
        el.textContent = text;
      });
      const legacy = document.getElementById(`running-${subject}`);
      if (legacy) {
        legacy.textContent = text;
      }
      // home bar live timer
      const homeTimer = document.getElementById("home-live-timer");
      if (homeTimer) {
        homeTimer.textContent = shortText;
      }
    }, 500);
  }

  function stopLocalTick() {
    if (localTimerInterval) {
      clearInterval(localTimerInterval);
      localTimerInterval = null;
    }
    SUBJECTS.forEach((s) => {
      document.querySelectorAll(`[data-running-live="${s}"]`).forEach((el) => {
        el.textContent = "—";
      });
      const legacy = document.getElementById(`running-${s}`);
      if (legacy) {
        legacy.textContent = "—";
      }
    });
  }

  function applyLiveSessionToDom(d) {
    const running = isLiveSessionRunning(d, SUBJECTS);
    if (running) {
      startLocalTick(d.subject, normalizeStartedAtMs(d.startedAtMs));
    } else {
      stopLocalTick();
    }
    SUBJECTS.forEach((s) => {
      const thisSubjectActive = running && d.subject === s;
      document.querySelectorAll(`.timer-subject-start[data-subject="${s}"]`).forEach((btn) => {
        btn.disabled = running;
      });
      document.querySelectorAll(`.timer-subject-stop[data-subject="${s}"]`).forEach((btn) => {
        btn.disabled = !thisSubjectActive;
      });
      const btnStart = document.getElementById(`start-${s}`);
      const btnStop = document.getElementById(`stop-${s}`);
      if (btnStart) {
        btnStart.disabled = running;
      }
      if (btnStop) {
        btnStop.disabled = !thisSubjectActive;
      }
    });
  }

  function subscribeLiveSession() {
    const ref = doc(db, COL.live, COL.session);
    const u = onSnapshot(ref, (snap) => {
      const d = snap.exists() ? snap.data() : {};
      applyLiveSessionToDom(d);
    });
    unsubscribers.push(u);
  }

  function resyncLiveTimersAfterScheduleRender() {
    getDoc(doc(db, COL.live, COL.session))
      .then((snap) => {
        const d = snap.exists() ? snap.data() : {};
        applyLiveSessionToDom(d);
      })
      .catch(() => {});
  }

  function startLiveSessionForSubject(subject) {
    const liveRef = doc(db, COL.live, COL.session);
    return getDoc(liveRef)
      .then((snap) => {
        const had = snap.exists();
        const prev = had
          ? { ...snap.data() }
          : { isActive: false, subject: null, startedAtMs: null };
        const next = {
          isActive: true,
          subject,
          startedAtMs: Date.now()
        };
        return setDoc(liveRef, next).then(() => {
          if (!isApplyingHistory()) {
            recordAction({
              undo: async () => {
                if (!had) {
                  await deleteDoc(liveRef);
                } else {
                  await setDoc(liveRef, prev);
                }
              },
              redo: async () => {
                await setDoc(liveRef, next);
              }
            });
          }
          toast(`Timer · ${subject}`);
        });
      })
      .catch((e) => {
        const msg =
          e && e.code === "permission-denied"
            ? "Firebase blocked the write. Check Firestore rules."
            : "Could not start timer.";
        toast(msg);
        console.error(e);
      });
  }

  function stopLiveSessionForSubject(subject) {
    const liveRef = doc(db, COL.live, COL.session);
    const dayRef = doc(db, COL.dailyTotals, toDateKey(new Date()));
    return getDoc(liveRef)
      .then((snap) => {
        const d = snap.data() || {};
        const startedAt = normalizeStartedAtMs(d.startedAtMs);
        if (!isLiveSessionRunning(d, SUBJECTS) || d.subject !== subject) {
          return Promise.resolve();
        }
        const seconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
        const prevLive = { ...d };
        const logRef = doc(collection(db, COL.studySessions));
        const cleared = {
          isActive: false,
          subject: null,
          startedAtMs: null
        };
        const logPayload = {
          dateKey: toDateKey(new Date()),
          subject,
          durationSeconds: seconds,
          endedAt: serverTimestamp()
        };
        const batch = writeBatch(db);
        batch.set(dayRef, { [subject]: increment(seconds) }, { merge: true });
        batch.set(logRef, logPayload);
        batch.set(liveRef, cleared, { merge: true });
        return batch.commit().then(() => {
          if (!isApplyingHistory()) {
            recordAction({
              undo: async () => {
                const b = writeBatch(db);
                b.delete(logRef);
                b.set(dayRef, { [subject]: increment(-seconds) }, { merge: true });
                b.set(liveRef, prevLive);
                await b.commit();
              },
              redo: async () => {
                const b = writeBatch(db);
                b.set(dayRef, { [subject]: increment(seconds) }, { merge: true });
                b.set(logRef, {
                  ...logPayload,
                  endedAt: serverTimestamp()
                });
                b.set(liveRef, cleared, { merge: true });
                await b.commit();
              }
            });
          }
          toast(`Saved · ${subject}`);
          subscribeWeekMonth();
        });
      })
      .catch((e) => {
        toast("Could not stop timer.");
        console.error(e);
      });
  }

  function wireTimerDelegationOnce() {
    if (timerButtonsWired) {
      return;
    }
    timerButtonsWired = true;
    document.body.addEventListener("click", (e) => {
      const startEl = e.target.closest(".timer-subject-start");
      const stopEl = e.target.closest(".timer-subject-stop");
      if (startEl && !startEl.disabled) {
        const subject = startEl.getAttribute("data-subject");
        if (SUBJECTS.includes(subject)) {
          startLiveSessionForSubject(subject);
        }
      }
      if (stopEl && !stopEl.disabled) {
        const subject = stopEl.getAttribute("data-subject");
        if (SUBJECTS.includes(subject)) {
          stopLiveSessionForSubject(subject);
        }
      }
    });
  }

  function wireAddTaskOnce() {
    if (addTaskWired) {
      return;
    }
    const btn = document.getElementById("btn-add-task");
    if (!btn) {
      return;
    }
    addTaskWired = true;
    btn.addEventListener("click", () => {
      const inp = document.getElementById("new-task-text");
      const text = inp.value.trim();
      if (!text) {
        toast("Type a task first.");
        return;
      }
      const dateKey = toDateKey(new Date());
      const ref = doc(db, COL.tasks, dateKey);
      getDoc(ref)
        .then((snap) => {
          const cur = snap.exists() && snap.data().items ? snap.data().items : [];
          const nextItems = [
            ...cur,
            {
              id: `t_${Date.now()}`,
              text,
              done: false,
              completedAt: null
            }
          ];
          return commitTasksChange(dateKey, nextItems).then(() => {
            inp.value = "";
          });
        })
        .catch(console.error);
    });
  }

  function subscribeTasks(dateKey) {
    if (!document.getElementById("task-list")) {
      return;
    }
    const ref = doc(db, COL.tasks, dateKey);
    const u = onSnapshot(ref, (snap) => {
      const data = snap.exists() && snap.data().items ? snap.data().items : [];
      renderTasks(dateKey, data);
    });
    unsubscribers.push(u);
  }

  function renderTasks(dateKey, items) {
    const root = document.getElementById("task-list");
    if (!root) {
      return;
    }
    if (!items.length) {
      root.innerHTML = "<p class='empty-state'>No tasks yet. Add one below.</p>";
      return;
    }
    root.innerHTML = items
      .map(
        (t, index) =>
          `<div class='task-row ${t.done ? "done" : ""}' data-index='${index}'>` +
          `<input type='checkbox' ${t.done ? "checked" : ""} aria-label='Mark done' />` +
          `<label class="task-text">${escapeHtml(t.text)}</label>` +
          `<div class="task-actions">` +
          `<button class="task-edit-btn" data-index="${index}" title="Edit task">✏️</button>` +
          `<button class="task-delete-btn" data-index="${index}" title="Delete task">🗑️</button>` +
          `</div>` +
          `</div>`
      )
      .join("");

    root.querySelectorAll(".task-row").forEach((row) => {
      const index = Number(row.getAttribute("data-index"));
      const cb = row.querySelector("input[type=checkbox]");
      cb.addEventListener("change", () => {
        const next = items.slice();
        next[index] = {
          ...next[index],
          done: cb.checked,
          completedAt: cb.checked ? Date.now() : null
        };
        commitTasksChange(dateKey, next).catch(console.error);
      });
    });

    // Wire edit buttons
    root.querySelectorAll(".task-edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.getAttribute("data-index"));
        const task = items[index];
        const newText = prompt("Edit task:", task.text);
        if (newText && newText.trim() && newText.trim() !== task.text) {
          const next = items.slice();
          next[index] = { ...next[index], text: newText.trim() };
          commitTasksChange(dateKey, next).catch(console.error);
        }
      });
    });

    // Wire delete buttons
    root.querySelectorAll(".task-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.getAttribute("data-index"));
        if (confirm("Delete this task?")) {
          const next = items.filter((_, i) => i !== index);
          commitTasksChange(dateKey, next).catch(console.error);
        }
      });
    });
  }

  function subscribeHistory() {
    const tbody = document.getElementById("history-body");
    if (!tbody) {
      return;
    }
    const q = query(
      collection(db, COL.studySessions),
      orderBy("endedAt", "desc"),
      limit(120)
    );
    const u = onSnapshot(q, (snap) => {
      if (snap.empty) {
        tbody.innerHTML =
          "<tr><td colspan='4' class='empty-state'>No sessions yet.</td></tr>";
        return;
      }
      tbody.innerHTML = snap.docs
        .map((dSnap) => {
          const x = dSnap.data();
          const when =
            x.endedAt && x.endedAt.toDate
              ? x.endedAt.toDate().toLocaleString()
              : "";
          return `<tr><td>${escapeHtml(x.dateKey || "")}</td><td>${escapeHtml(x.subject || "")}</td><td>${formatDuration(Number(x.durationSeconds || 0))}</td><td>${escapeHtml(when)}</td></tr>`;
        })
        .join("");
    });
    unsubscribers.push(u);
  }

  function wireAdminOnce() {
    if (adminWired) {
      return;
    }
    const btnUndo = document.getElementById("btn-undo");
    const btnRedo = document.getElementById("btn-redo");
    const btnReset = document.getElementById("btn-reset-database");
    if (!btnUndo || !btnRedo || !btnReset) {
      return;
    }
    adminWired = true;
    bindUndoRedoButtons(btnUndo, btnRedo);
    btnUndo.addEventListener("click", () => {
      undoLast()
        .then(() => toast("Undid the last change."))
        .catch((e) => {
          toast("Undo failed.");
          console.error(e);
        });
    });
    btnRedo.addEventListener("click", () => {
      redoLast()
        .then(() => toast("Redid the change."))
        .catch((e) => {
          toast("Redo failed.");
          console.error(e);
        });
    });
    btnReset.addEventListener("click", () => {
      const w1 = window.confirm(
        "This will delete all timer logs, daily totals, tasks, doubts, and session history.\n\nYour exam dates and timetable settings will be KEPT.\n\nAre you sure?"
      );
      if (!w1) {
        return;
      }
      exportFullDatabase(db)
        .then(async (snapshot) => {
          clearHistory();
          // preserveSettings = true → exam dates and timetable are kept
          await wipeAllStudyData(db, true);
          recordAction({
            undo: async () => {
              await wipeAllStudyData(db, true);
              await restoreFullDatabase(db, snapshot);
            },
            redo: async () => {
              await wipeAllStudyData(db, true);
            }
          });
          toast("✅ Study data cleared. Exam dates kept. Use Undo to restore.");
        })
        .catch((e) => {
          toast("Reset failed. Check the browser console.");
          console.error(e);
        });
    });
  }

  function renderPlanSubjectCard(title, obj) {
    if (!obj) {
      return "";
    }
    const bookLine =
      obj.book ?
        `<p class="plan-book section-desc"><strong>Book:</strong> ${escapeHtml(obj.book)}</p>`
      : "";
    const targetItems = (obj.targets || [])
      .map(
        (t) =>
          `<li>${escapeHtml(t.lbl)} — <strong>${t.n}</strong></li>`
      )
      .join("");
    const targetsBlock =
      targetItems ?
        `<ul class="plan-targets">${targetItems}</ul>`
      : "";
    return (
      `<article class="plan-subject-card"><h3 class="plan-subject-title">${escapeHtml(title)}</h3>` +
      `<p>${escapeHtml(obj.topic || "")}</p>${bookLine}` +
      `<p class="section-desc">${escapeHtml(obj.task || "")}</p>${targetsBlock}` +
      `<p class="plan-totalq section-desc"><strong>Total questions (planned):</strong> ${Number(obj.totalQ) || 0}</p></article>`
    );
  }

  function renderPlanWeekPanels(wObj) {
    const themeBlock = `<div class="plan-week-theme"><p><strong>Theme:</strong> ${escapeHtml(wObj.theme || "")}</p></div>`;
    const grid =
      `<div class="plan-subject-grid">${renderPlanSubjectCard("Mathematics", wObj.math)}` +
      `${renderPlanSubjectCard("Physics", wObj.phy)}` +
      `${renderPlanSubjectCard("Chemistry", wObj.chem)}` +
      `${renderPlanSubjectCard("Previous-year questions", wObj.pyq)}</div>`;
    return themeBlock + grid;
  }

  function initPlanPage() {
    const select = document.getElementById("plan-week-select");
    const meta = document.getElementById("plan-week-meta");
    const detail = document.getElementById("plan-detail-root");
    if (!select || !meta || !detail) {
      return;
    }
    select.innerHTML = weeklyPlan
      .map(
        (w) =>
          `<option value="${w.week}">Week ${w.week} — ${escapeHtml(w.theme)} (${escapeHtml(w.month)})</option>`
      )
      .join("");

    function showWeekByNumber(wNum) {
      const wObj = weeklyPlan.find((x) => x.week === wNum) || weeklyPlan[0];
      select.value = String(wObj.week);
      meta.textContent = `${wObj.month} · Week ${wObj.week}`;
      detail.innerHTML = renderPlanWeekPanels(wObj);
    }

    notifyPlanWeekFromSettings = (data) => {
      let wNum = Number(data.currentPrepWeek);
      if (!weeklyPlan.some((x) => x.week === wNum)) {
        wNum = weeklyPlan[0].week;
      }
      showWeekByNumber(wNum);
    };

    select.addEventListener("change", () => {
      const wNum = Number(select.value);
      showWeekByNumber(wNum);
      commitSettingsMerged({ currentPrepWeek: wNum }, "Active week saved.").catch(
        (e) => {
          toast("Could not save week. Check internet and Firebase rules.");
          console.error(e);
        }
      );
    });
  }

  function setGreeting() {
    const el = document.getElementById("greeting-text");
    if (!el) return;
    const h = new Date().getHours();
    if (h < 12) el.textContent = "Good morning,";
    else if (h < 17) el.textContent = "Good afternoon,";
    else el.textContent = "Good evening,";
  }

  function renderHomeLiveBar(d) {
    const bar = document.getElementById("home-live-bar");
    const text = document.getElementById("home-live-text");
    const timer = document.getElementById("home-live-timer");
    if (!bar || !text) return;
    const running = isLiveSessionRunning(d, SUBJECTS);
    if (running) {
      bar.classList.add("home-live-bar--active");
      text.textContent = `Studying ${d.subject}`;
      if (timer) timer.style.display = "";
    } else {
      bar.classList.remove("home-live-bar--active");
      text.textContent = "No session running — tap Start on a block below";
      if (timer) { timer.style.display = "none"; timer.textContent = ""; }
    }
  }

  function renderHomeScheduleBlocks(settings) {
    const root = document.getElementById("home-schedule-blocks");
    if (!root) return;
    const finalStr = settings.jeeAdvancedFinalDate || "2027-05-17";
    const dateKey = toDateKey(new Date());
    const rows = buildTimetableRows(settings, dateKey, finalStr, SUBJECTS);
    const wObj = getActiveWeekObject(settings);

    const weekLine = document.getElementById("home-week-line");
    if (weekLine) {
      weekLine.textContent = `Week ${wObj.week} · ${wObj.month} — ${wObj.theme || ""}`;
    }

    const subSlug = (s) =>
      s === "Mathematics" ? "mathematics" : s === "Physics" ? "physics" : "chemistry";

    root.innerHTML = rows.map((r) => {
      const p = planSliceForSubject(wObj, r.subject);
      const topic = p && p.topic ? `<p class="study-block__topic">${escapeHtml(p.topic)}</p>` : "";
      const task = p && p.task ? `<p class="study-block__task">${escapeHtml(p.task)}</p>` : "";
      const targetQ = p && p.totalQ ? p.totalQ : 0;
      const sub = escapeHtml(r.subject);
      return (
        `<article class="study-block study-block--${subSlug(r.subject)}" data-subject="${sub}" data-start="${escapeHtml(r.start)}" data-end="${escapeHtml(r.end)}" data-target-q="${targetQ}">` +
        `<div class="study-block__head">` +
        `<span class="study-block__time">${escapeHtml(r.start)}–${escapeHtml(r.end)}</span>` +
        `<span class="study-block__subject">${sub}</span></div>` +
        `<div class="study-block__plan">${topic}${task}</div>` +
        `<div class="study-block__timer">` +
        `<span class="study-block__live" data-running-live="${sub}">—</span>` +
        `<div class="study-block__timer-btns">` +
        `<button type="button" class="btn btn-timer-start timer-subject-start" data-subject="${sub}">▶ Start</button>` +
        `<button type="button" class="btn btn-timer-stop timer-subject-stop" data-subject="${sub}" disabled>■ Stop</button>` +
        `<button type="button" class="btn btn-complete-block" data-subject="${sub}">✓ Complete</button>` +
        `</div>` +
        `<span class="study-block__today">Today <strong data-today-total="${sub}">0s</strong></span>` +
        `</div></article>`
      );
    }).join("");

    resyncLiveTimersAfterScheduleRender();
    wireCompleteBlockButtons();
  }

  function subscribeHomeLiveSession() {
    const ref = doc(db, COL.live, COL.session);
    const u = onSnapshot(ref, (snap) => {
      const d = snap.exists() ? snap.data() : {};
      applyLiveSessionToDom(d);
      renderHomeLiveBar(d);
      // update live timer label in home bar
      const timerEl = document.getElementById("home-live-timer");
      if (timerEl && isLiveSessionRunning(d, SUBJECTS)) {
        timerEl.style.display = "";
      }
    });
    unsubscribers.push(u);
  }

  // ── Doubt Journal Functions ──────────────────────────────────────

  function subscribeDoubts(dateKey) {
    const doubtList = document.getElementById("doubt-list");
    if (!doubtList) return;
    
    const ref = doc(db, COL.doubts, dateKey);
    const u = onSnapshot(ref, (snap) => {
      const data = snap.exists() && snap.data().items ? snap.data().items : [];
      renderDoubts(dateKey, data);
    });
    unsubscribers.push(u);
  }

  function renderDoubts(dateKey, items) {
    const root = document.getElementById("doubt-list");
    const countEl = document.getElementById("doubt-count");
    if (!root) return;
    
    if (countEl) {
      countEl.textContent = `${items.length} ${items.length === 1 ? 'entry' : 'entries'}`;
    }
    
    if (!items.length) {
      root.innerHTML = "<p class='empty-state'>No doubts recorded today. Keep going! 💪</p>";
      return;
    }
    
    root.innerHTML = items.map((doubt, index) => {
      const time = doubt.timestamp ? new Date(doubt.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
      return `
        <div class="doubt-item" data-index="${index}">
          <div class="doubt-item-head">
            <span class="doubt-subject-tag doubt-subject-tag--${escapeHtml(doubt.subject)}">${escapeHtml(doubt.subject)}</span>
            <span class="doubt-time">${time}</span>
          </div>
          <p class="doubt-text">${escapeHtml(doubt.text)}</p>
          <button class="doubt-delete" data-index="${index}">🗑️ Delete</button>
        </div>
      `;
    }).join("");
    
    // Wire delete buttons
    root.querySelectorAll(".doubt-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.getAttribute("data-index"));
        const next = items.filter((_, i) => i !== index);
        commitDoubtsChange(dateKey, next).catch(console.error);
      });
    });
  }

  async function commitDoubtsChange(dateKey, nextItems) {
    const ref = doc(db, COL.doubts, dateKey);
    const snap = await getDoc(ref);
    const had = snap.exists();
    const prev = had ? snap.data() : null;
    const nextPayload = {
      items: nextItems,
      updatedAt: serverTimestamp()
    };
    await setDoc(ref, nextPayload);
    if (isApplyingHistory()) {
      return;
    }
    recordAction({
      undo: async () => {
        if (!had) {
          await deleteDoc(ref);
        } else {
          await setDoc(ref, prev);
        }
      },
      redo: async () => {
        await setDoc(ref, {
          items: nextItems,
          updatedAt: serverTimestamp()
        });
      }
    });
  }

  function wireAddDoubtOnce() {
    const btn = document.getElementById("btn-add-doubt");
    if (!btn || btn.dataset.wired) return;
    btn.dataset.wired = "true";
    
    btn.addEventListener("click", () => {
      const subjectSelect = document.getElementById("doubt-subject");
      const textArea = document.getElementById("doubt-text");
      const subject = subjectSelect.value;
      const text = textArea.value.trim();
      
      if (!text) {
        toast("Please describe the doubt or mistake.");
        return;
      }
      
      const dateKey = toDateKey(new Date());
      const ref = doc(db, COL.doubts, dateKey);
      
      getDoc(ref).then((snap) => {
        const cur = snap.exists() && snap.data().items ? snap.data().items : [];
        const nextItems = [
          ...cur,
          {
            id: `doubt_${Date.now()}`,
            subject,
            text,
            timestamp: Date.now()
          }
        ];
        return commitDoubtsChange(dateKey, nextItems).then(() => {
          textArea.value = "";
          toast("💡 Doubt saved!");
        });
      }).catch(console.error);
    });
  }

  // ── Timer Reset Functions ────────────────────────────────────────

  function wireTimerResets() {
    // Each reset saves the default date to Firestore so the countdown
    // immediately reflects the change on all devices.
    const resets = [
      {
        id: "reset-mains1",
        label: "JEE Mains 2026 Session 1",
        defaultDate: "2026-01-29",
        settingsKey: "jeeMains1Date",
        display: "Jan 29, 2026"
      },
      {
        id: "reset-mains2",
        label: "JEE Mains 2026 Session 2",
        defaultDate: "2026-04-08",
        settingsKey: "jeeMains2Date",
        display: "Apr 8, 2026"
      },
      {
        id: "reset-trial",
        label: "JEE Advanced 2026",
        defaultDate: "2026-05-17",
        settingsKey: "jeeAdvancedTrialDate",
        display: "May 17, 2026"
      },
      {
        id: "reset-final",
        label: "JEE Advanced 2027",
        defaultDate: "2027-05-17",
        settingsKey: "jeeAdvancedFinalDate",
        display: "May 17, 2027"
      }
    ];

    resets.forEach(({ id, label, defaultDate, settingsKey, display }) => {
      const btn = document.getElementById(id);
      if (!btn || btn.dataset.wired) return;
      btn.dataset.wired = "true";
      btn.addEventListener("click", () => {
        if (confirm(`Reset ${label} countdown to ${display}?`)) {
          commitSettingsMerged({ [settingsKey]: defaultDate }, `${label} reset to ${display}.`)
            .catch((e) => {
              toast("Could not reset. Check internet and Firebase rules.");
              console.error(e);
            });
        }
      });
    });
  }

  // ── Block Completion Modal Functions ────────────────────────────

  let currentBlockData = null;

  function wireCompleteBlockButtons() {
    document.querySelectorAll(".btn-complete-block").forEach((btn) => {
      if (btn.dataset.wired) return;
      btn.dataset.wired = "true";
      
      btn.addEventListener("click", () => {
        const subject = btn.getAttribute("data-subject");
        const block = btn.closest(".study-block");
        const startTime = block.getAttribute("data-start");
        const endTime = block.getAttribute("data-end");
        const targetQ = Number(block.getAttribute("data-target-q")) || 0;
        
        // Get today's total time for this subject
        const totalEl = block.querySelector(`[data-today-total="${subject}"]`);
        const timeSpent = totalEl ? totalEl.textContent : "0s";
        
        currentBlockData = {
          subject,
          startTime,
          endTime,
          targetQ,
          timeSpent,
          dateKey: toDateKey(new Date())
        };
        
        openBlockCompletionModal();
      });
    });
  }

  function openBlockCompletionModal() {
    const modal = document.getElementById("block-completion-modal");
    const subjectInfo = document.getElementById("modal-subject-info");
    const timeInfo = document.getElementById("modal-time-info");
    
    if (!modal || !currentBlockData) return;
    
    subjectInfo.innerHTML = `Subject: <strong>${escapeHtml(currentBlockData.subject)}</strong> (${currentBlockData.startTime}–${currentBlockData.endTime})`;
    timeInfo.innerHTML = `Time spent: <strong>${escapeHtml(currentBlockData.timeSpent)}</strong>`;
    
    // Clear previous inputs
    document.getElementById("questions-total").value = "";
    document.getElementById("questions-correct").value = "";
    document.getElementById("questions-wrong").value = "";
    document.getElementById("questions-remaining").value = "";
    document.getElementById("block-notes").value = "";
    
    // Suggest target questions
    if (currentBlockData.targetQ > 0) {
      document.getElementById("questions-total").placeholder = `Target: ${currentBlockData.targetQ} questions`;
    }
    
    modal.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  }

  function closeBlockCompletionModal() {
    const modal = document.getElementById("block-completion-modal");
    if (!modal) return;
    
    modal.classList.remove("modal-open");
    document.body.style.overflow = "";
    currentBlockData = null;
  }

  async function saveBlockCompletion() {
    if (!currentBlockData) return;
    
    const total = Number(document.getElementById("questions-total").value) || 0;
    const correct = Number(document.getElementById("questions-correct").value) || 0;
    const wrong = Number(document.getElementById("questions-wrong").value) || 0;
    const remaining = Number(document.getElementById("questions-remaining").value) || 0;
    const notes = document.getElementById("block-notes").value.trim();
    
    if (total === 0) {
      toast("Please enter the total questions attempted.");
      return;
    }
    
    if (correct + wrong > total) {
      toast("Correct + Wrong cannot exceed Total questions.");
      return;
    }
    
    const blockCompletion = {
      id: `block_${Date.now()}`,
      dateKey: currentBlockData.dateKey,
      subject: currentBlockData.subject,
      startTime: currentBlockData.startTime,
      endTime: currentBlockData.endTime,
      timeSpent: currentBlockData.timeSpent,
      questionsTotal: total,
      questionsCorrect: correct,
      questionsWrong: wrong,
      questionsRemaining: remaining,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      notes: notes,
      completedAt: serverTimestamp()
    };
    
    try {
      const ref = doc(collection(db, COL.blockCompletions));
      await setDoc(ref, blockCompletion);
      
      // If there are remaining questions, add them to carryover
      if (remaining > 0) {
        await addCarryoverQuestions(currentBlockData.subject, remaining, currentBlockData.dateKey);
      }
      
      toast(`✅ Block completed! Accuracy: ${blockCompletion.accuracy}%`);
      closeBlockCompletionModal();
    } catch (e) {
      toast("Could not save block completion.");
      console.error(e);
    }
  }

  async function addCarryoverQuestions(subject, count, fromDateKey) {
    const carryoverRef = doc(db, COL.questionTracking, "carryover");
    const snap = await getDoc(carryoverRef);
    const current = snap.exists() ? snap.data().items || [] : [];
    
    const newCarryover = {
      id: `carry_${Date.now()}`,
      subject,
      count,
      fromDateKey,
      addedAt: Date.now()
    };
    
    await setDoc(carryoverRef, {
      items: [...current, newCarryover],
      updatedAt: serverTimestamp()
    });
  }

  function wireBlockCompletionModal() {
    const closeBtn = document.getElementById("close-block-modal");
    const cancelBtn = document.getElementById("cancel-block-modal");
    const saveBtn = document.getElementById("save-block-completion");
    const modal = document.getElementById("block-completion-modal");
    
    if (closeBtn && !closeBtn.dataset.wired) {
      closeBtn.dataset.wired = "true";
      closeBtn.addEventListener("click", closeBlockCompletionModal);
    }
    
    if (cancelBtn && !cancelBtn.dataset.wired) {
      cancelBtn.dataset.wired = "true";
      cancelBtn.addEventListener("click", closeBlockCompletionModal);
    }
    
    if (saveBtn && !saveBtn.dataset.wired) {
      saveBtn.dataset.wired = "true";
      saveBtn.addEventListener("click", saveBlockCompletion);
    }
    
    if (modal && !modal.dataset.wired) {
      modal.dataset.wired = "true";
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeBlockCompletionModal();
        }
      });
    }
  }

  function boot() {
    unsubscribers.forEach((fn) => {
      if (typeof fn === "function") {
        fn();
      }
    });
    unsubscribers = [];
    const dateKey = toDateKey(new Date());
    const needsSettings = ["home", "schedule", "settings", "plan"].includes(pageId);

    setGreeting();

    const todayEl = document.getElementById("today-label");
    if (todayEl) {
      todayEl.textContent = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }

    if (pageId === "plan") {
      initPlanPage();
    }
    if (needsSettings) {
      subscribeSettings();
    }
    if (pageId === "settings") {
      wireTimetableEditorOnce();
      wireExamDateInputsOnce();
      wireAddMainsOnce();
      wireAdminOnce();
    }
    if (pageId === "timers" || pageId === "schedule") {
      subscribeTodayTotals(dateKey);
      subscribeWeekMonth();
      subscribeLiveSession();
      wireTimerDelegationOnce();
      if (weekTicker) {
        clearInterval(weekTicker);
      }
      weekTicker = setInterval(() => subscribeWeekMonth(), 60000);
    }
    if (pageId === "home") {
      subscribeTodayTotals(dateKey);
      subscribeHomeLiveSession();
      wireTimerDelegationOnce();
      wireAddTaskOnce();
      subscribeTasks(dateKey);
      subscribeDoubts(dateKey);
      wireAddDoubtOnce();
      wireTimerResets();
      wireBlockCompletionModal();
    }
    if (pageId === "tasks") {
      wireAddTaskOnce();
      subscribeTasks(dateKey);
    }
    if (pageId === "history") {
      subscribeHistory();
    }
  }

  boot();
}

