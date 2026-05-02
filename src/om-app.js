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

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];

export function bootOmApp(db) {
  let unsubscribers = [];
  let localTimerInterval = null;
  let examInputsWired = false;
  let timerButtonsWired = false;
  let addTaskWired = false;
  let addMainsWired = false;
  let adminWired = false;
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

  function formatClock(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${d} days, ${pad2(h)} hours, ${pad2(m)} minutes, ${pad2(s)} seconds`;
  }

  function buildTimetable(finalExamDateStr) {
    const examEnd = endOfLocalDayFromDateInput(finalExamDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = Math.max(0, Math.ceil((examEnd - today) / 86400000));
    const daySeed = Math.floor(today.getTime() / 86400000);
    const slots = [
      { start: "06:30", end: "08:30" },
      { start: "09:15", end: "11:15" },
      { start: "11:45", end: "13:15" },
      { start: "15:30", end: "17:30" },
      { start: "18:00", end: "20:00" }
    ];
    if (daysLeft <= 45) {
      slots.push({ start: "20:15", end: "22:00" });
    }
    return slots.map((slot, index) => ({
      start: slot.start,
      end: slot.end,
      subject: SUBJECTS[(daySeed + index) % SUBJECTS.length],
      focus: "Deep work on one subject. Take a short break between blocks."
    }));
  }

  function renderCountdowns(trialStr, finalStr) {
    const trialEl = document.getElementById("count-trial");
    const finalEl = document.getElementById("count-final");
    const tick = () => {
      const now = Date.now();
      const trialEnd = endOfLocalDayFromDateInput(trialStr).getTime();
      const finalEnd = endOfLocalDayFromDateInput(finalStr).getTime();
      trialEl.textContent = formatClock(trialEnd - now);
      finalEl.textContent = formatClock(finalEnd - now);
    };
    tick();
    if (window.__countdownTimer) {
      clearInterval(window.__countdownTimer);
    }
    window.__countdownTimer = setInterval(tick, 1000);
  }

  function renderMainsCountdowns(list) {
    const root = document.getElementById("mains-countdowns");
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

  function renderTimetable(finalStr) {
    const rows = buildTimetable(finalStr);
    const ul = document.getElementById("timetable-body");
    ul.innerHTML = rows
      .map(
        (r) =>
          `<li class='timetable-row'><span class='timetable-time'>${r.start} – ${r.end}</span><span><strong>${r.subject}</strong> — ${r.focus}</span></li>`
      )
      .join("");
  }

  function applySettingsToUi(data) {
    const trial = document.getElementById("input-trial");
    const fin = document.getElementById("input-final");
    trial.value = data.jeeAdvancedTrialDate || "2026-05-24";
    fin.value = data.jeeAdvancedFinalDate || "2027-05-23";
    renderCountdowns(trial.value, fin.value);
    renderTimetable(fin.value);
    renderMainsCountdowns(data.jeeMainsList || []);
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
    examInputsWired = true;
    const trial = document.getElementById("input-trial");
    const fin = document.getElementById("input-final");
    trial.addEventListener("change", () => {
      commitSettingsMerged(
        { jeeAdvancedTrialDate: trial.value },
        "Exam dates saved. Your timetable updated automatically."
      ).catch((e) => {
        toast("Could not save. Check internet and Firebase rules.");
        console.error(e);
      });
    });
    fin.addEventListener("change", () => {
      commitSettingsMerged(
        { jeeAdvancedFinalDate: fin.value },
        "Exam dates saved. Your timetable updated automatically."
      ).catch((e) => {
        toast("Could not save. Check internet and Firebase rules.");
        console.error(e);
      });
    });
  }

  function renderMainsEditor(list) {
    const root = document.getElementById("mains-editor");
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
    addMainsWired = true;
    document.getElementById("btn-add-mains").addEventListener("click", () => {
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
        data.jeeAdvancedTrialDate = "2026-05-24";
      }
      if (!data.jeeAdvancedFinalDate) {
        data.jeeAdvancedFinalDate = "2027-05-23";
      }
      applySettingsToUi(data);
      renderMainsEditor(data.jeeMainsList || []);
      renderMainsCountdowns(data.jeeMainsList || []);
    });
    unsubscribers.push(u);
  }

  function subscribeTodayTotals(dateKey) {
    const ref = doc(db, COL.dailyTotals, dateKey);
    const u = onSnapshot(ref, (snap) => {
      const d = snap.exists() ? snap.data() : {};
      SUBJECTS.forEach((sub) => {
        const sec = Number(d[sub] || 0);
        const el = document.getElementById(`today-${sub}`);
        if (el) {
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
      const el = document.getElementById(`running-${subject}`);
      if (el) {
        el.textContent = formatDuration(elapsed);
      }
    }, 500);
  }

  function stopLocalTick() {
    if (localTimerInterval) {
      clearInterval(localTimerInterval);
      localTimerInterval = null;
    }
    SUBJECTS.forEach((s) => {
      const el = document.getElementById(`running-${s}`);
      if (el) {
        el.textContent = "Not running";
      }
    });
  }

  function subscribeLiveSession() {
    const ref = doc(db, COL.live, COL.session);
    const u = onSnapshot(ref, (snap) => {
      const d = snap.exists() ? snap.data() : {};
      const running = isLiveSessionRunning(d, SUBJECTS);
      if (running) {
        startLocalTick(d.subject, normalizeStartedAtMs(d.startedAtMs));
      } else {
        stopLocalTick();
      }
      SUBJECTS.forEach((s) => {
        const btnStart = document.getElementById(`start-${s}`);
        const btnStop = document.getElementById(`stop-${s}`);
        const thisSubjectActive = running && d.subject === s;
        if (btnStart) {
          btnStart.disabled = running;
        }
        if (btnStop) {
          btnStop.disabled = !thisSubjectActive;
        }
      });
    });
    unsubscribers.push(u);
  }

  function wireTimerButtonsOnce() {
    if (timerButtonsWired) {
      return;
    }
    timerButtonsWired = true;
    SUBJECTS.forEach((subject) => {
      document.getElementById(`start-${subject}`).addEventListener("click", () => {
        const liveRef = doc(db, COL.live, COL.session);
        getDoc(liveRef)
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
              toast(`Timer started for ${subject}.`);
            });
          })
          .catch((e) => {
            const msg =
              e && e.code === "permission-denied"
                ? "Firebase blocked the write. Open Firestore rules and allow read and write for your project."
                : "Could not start timer. Check the internet connection and the browser console.";
            toast(msg);
            console.error(e);
          });
      });

      document.getElementById(`stop-${subject}`).addEventListener("click", () => {
        const liveRef = doc(db, COL.live, COL.session);
        const dayRef = doc(db, COL.dailyTotals, toDateKey(new Date()));
        getDoc(liveRef)
          .then((snap) => {
            const d = snap.data() || {};
            const startedAt = normalizeStartedAtMs(d.startedAtMs);
            if (
              !isLiveSessionRunning(d, SUBJECTS) ||
              d.subject !== subject
            ) {
              return Promise.resolve();
            }
            const seconds = Math.max(
              1,
              Math.floor((Date.now() - startedAt) / 1000)
            );
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
                    b.set(
                      dayRef,
                      { [subject]: increment(-seconds) },
                      { merge: true }
                    );
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
              toast(`Study time saved for ${subject}.`);
              subscribeWeekMonth();
            });
          })
          .catch((e) => {
            toast("Could not stop timer.");
            console.error(e);
          });
      });
    });
  }

  function wireAddTaskOnce() {
    if (addTaskWired) {
      return;
    }
    addTaskWired = true;
    document.getElementById("btn-add-task").addEventListener("click", () => {
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
    const ref = doc(db, COL.tasks, dateKey);
    const u = onSnapshot(ref, (snap) => {
      const data = snap.exists() && snap.data().items ? snap.data().items : [];
      renderTasks(dateKey, data);
    });
    unsubscribers.push(u);
  }

  function renderTasks(dateKey, items) {
    const root = document.getElementById("task-list");
    if (!items.length) {
      root.innerHTML = "<p class='empty-state'>No tasks yet. Add one below.</p>";
      return;
    }
    root.innerHTML = items
      .map(
        (t, index) =>
          `<div class='task-row ${t.done ? "done" : ""}' data-index='${index}'>` +
          `<input type='checkbox' ${t.done ? "checked" : ""} aria-label='Mark done' />` +
          `<label>${escapeHtml(t.text)}</label></div>`
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
  }

  function subscribeHistory() {
    const q = query(
      collection(db, COL.studySessions),
      orderBy("endedAt", "desc"),
      limit(120)
    );
    const u = onSnapshot(q, (snap) => {
      const tbody = document.getElementById("history-body");
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
    adminWired = true;
    const btnUndo = document.getElementById("btn-undo");
    const btnRedo = document.getElementById("btn-redo");
    const btnReset = document.getElementById("btn-reset-database");
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
        "This will delete every exam setting, timer log, daily total, and task in the database. Are you sure you want to continue?"
      );
      if (!w1) {
        return;
      }
      const w2 = window.confirm(
        "Final check: all study data for this app will be removed from Firestore. Tap OK only if you understand."
      );
      if (!w2) {
        return;
      }
      exportFullDatabase(db)
        .then(async (snapshot) => {
          clearHistory();
          await wipeAllStudyData(db);
          recordAction({
            undo: async () => {
              await wipeAllStudyData(db);
              await restoreFullDatabase(db, snapshot);
            },
            redo: async () => {
              await wipeAllStudyData(db);
            }
          });
          toast(
            "Database was cleared. Use Undo last change to bring everything back."
          );
        })
        .catch((e) => {
          toast("Reset failed. Check the browser console.");
          console.error(e);
        });
    });
  }

  function wireNavHighlight() {
    const nav = document.getElementById("main-nav");
    if (!nav) {
      return;
    }
    const links = nav.querySelectorAll(".nav-link");
    function sync() {
      const hash = window.location.hash || "#nav-home";
      links.forEach((a) => {
        const active = a.getAttribute("href") === hash;
        a.classList.toggle("nav-link-active", active);
        a.setAttribute("aria-current", active ? "page" : "false");
      });
    }
    sync();
    window.addEventListener("hashchange", sync);
  }

  function boot() {
    unsubscribers.forEach((fn) => {
      if (typeof fn === "function") {
        fn();
      }
    });
    unsubscribers = [];
    wireNavHighlight();
    wireExamDateInputsOnce();
    wireAdminOnce();
    const dateKey = toDateKey(new Date());
    subscribeSettings();
    subscribeTodayTotals(dateKey);
    subscribeWeekMonth();
    subscribeLiveSession();
    wireTimerButtonsOnce();
    wireAddTaskOnce();
    wireAddMainsOnce();
    subscribeTasks(dateKey);
    subscribeHistory();
    document.getElementById("today-label").textContent = `Today is ${new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })}.`;

    if (weekTicker) {
      clearInterval(weekTicker);
    }
    weekTicker = setInterval(() => subscribeWeekMonth(), 60000);
  }

  boot();
}
