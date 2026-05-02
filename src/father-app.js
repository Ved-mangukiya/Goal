import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import {
  normalizeStartedAtMs,
  isLiveSessionRunning
} from "./session-utils.js";
import { buildTimetableRows } from "./timetable-utils.js";
import { weeklyPlan } from "./weekly-plan-data.js";

const SUBJECT_GU = {
  Physics: "ભૌતિક વિજ્ઞાન",
  Chemistry: "રસાયણ વિજ્ઞાન",
  Mathematics: "ગણિત"
};

const COL = {
  settings: "settings",
  general: "general",
  live: "live",
  session: "session",
  dailyTotals: "dailyTotals",
  studySessions: "studySessions",
  tasks: "tasks"
};

export function bootFatherApp(db) {
  function activeWeekFromSettings(data) {
    let wNum = Number(data && data.currentPrepWeek);
    if (!weeklyPlan.some((w) => w.week === wNum)) {
      wNum = weeklyPlan[0].week;
    }
    return weeklyPlan.find((w) => w.week === wNum) || weeklyPlan[0];
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function toDateKey(d) {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }

  function formatGuDuration(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    let out = "";
    if (h > 0) {
      out += `${h} કલાક `;
    }
    if (m > 0 || h > 0) {
      out += `${m} મિનિટ `;
    }
    out += `${r} સેકન્ડ`;
    return out.trim();
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function tickClock() {
    const el = document.getElementById("father-clock");
    const now = new Date();
    el.textContent = now.toLocaleString("gu-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  tickClock();
  setInterval(tickClock, 30000);

  onSnapshot(doc(db, COL.settings, COL.general), (snap) => {
    const data = snap.exists() ? snap.data() : {};
    const finalStr = data.jeeAdvancedFinalDate || "2027-05-23";
    const dateKey = toDateKey(new Date());
    const subjects = ["Physics", "Chemistry", "Mathematics"];
    const rows = buildTimetableRows(data, dateKey, finalStr, subjects);
    const wk = activeWeekFromSettings(data);
    const weekEl = document.getElementById("father-week-focus");
    if (weekEl) {
      weekEl.textContent = `સપ્તાહ ${wk.week} · ${wk.theme || ""}`;
    }
    document.getElementById("father-timetable").innerHTML = rows
      .map(
        (r) =>
          `<li class='timetable-row'><span class='timetable-time'>${r.start} – ${r.end}</span><span><strong>${escapeHtml(SUBJECT_GU[r.subject] || r.subject)}</strong></span></li>`
      )
      .join("");
  });

  const dateKey = toDateKey(new Date());

  onSnapshot(doc(db, COL.tasks, dateKey), (snap) => {
    const items = snap.exists() && snap.data().items ? snap.data().items : [];
    const root = document.getElementById("father-tasks");
    if (!items.length) {
      root.innerHTML = "<li class='empty-state'>આજે કોઈ કામ ઉમેર્યું નથી.</li>";
      return;
    }
    root.innerHTML = items
      .map((t) => {
        const mark = t.done ? "✓ " : "○ ";
        return `<li class='timetable-row'><span>${mark}${escapeHtml(t.text || "")}</span></li>`;
      })
      .join("");
  });

  onSnapshot(doc(db, COL.dailyTotals, dateKey), (snap) => {
    const d = snap.exists() ? snap.data() : {};
    const parts = ["Physics", "Chemistry", "Mathematics"].map((s) => {
      const sec = Number(d[s] || 0);
      return `<li class='timetable-row'><span>${escapeHtml(SUBJECT_GU[s])}</span><span>${formatGuDuration(sec)}</span></li>`;
    });
    document.getElementById("father-today-times").innerHTML = parts.join("");
  });

  let liveCache = { isActive: false, subject: null, startedAtMs: null };

  function paintLive() {
    const liveEl = document.getElementById("father-live");
    const d = liveCache;
    if (isLiveSessionRunning(d)) {
      const gu = SUBJECT_GU[d.subject] || d.subject;
      const running = Math.floor(
        (Date.now() - normalizeStartedAtMs(d.startedAtMs)) / 1000
      );
      liveEl.innerHTML =
        `<span class='live-dot'></span>${escapeHtml(gu)} — ચાલુ સત્ર: ${formatGuDuration(running)}`;
    } else {
      liveEl.textContent = "હમણાં કોઈ સત્ર ચાલતું નથી.";
    }
  }

  onSnapshot(doc(db, COL.live, COL.session), (snap) => {
    const d = snap.exists() ? snap.data() : {};
    liveCache = {
      isActive: Boolean(d.isActive),
      subject: d.subject || null,
      startedAtMs: d.startedAtMs || null
    };
    paintLive();
  });

  setInterval(paintLive, 1000);

  const q = query(
    collection(db, COL.studySessions),
    orderBy("endedAt", "desc"),
    limit(150)
  );
  onSnapshot(q, (snap) => {
    const body = document.getElementById("father-history");
    if (snap.empty) {
      body.innerHTML =
        "<tr><td colspan='4' class='empty-state'>હજી કોઈ સત્ર નથી.</td></tr>";
      return;
    }
    body.innerHTML = snap.docs
      .map((dSnap) => {
        const x = dSnap.data();
        const when =
          x.endedAt && x.endedAt.toDate
            ? x.endedAt.toDate().toLocaleString("gu-IN")
            : "";
        const sub = SUBJECT_GU[x.subject] || x.subject;
        return `<tr><td>${escapeHtml(x.dateKey || "")}</td><td>${escapeHtml(sub)}</td><td>${formatGuDuration(Number(x.durationSeconds || 0))}</td><td>${escapeHtml(when)}</td></tr>`;
      })
      .join("");
  });
}
