/** Default block list (same as original app) before user customizes. */
export const DEFAULT_TIMETABLE_FIXED_BLOCKS = [
  { start: "06:30", end: "08:30" },
  { start: "09:15", end: "11:15" },
  { start: "11:45", end: "13:15" },
  { start: "15:30", end: "17:30" },
  { start: "18:00", end: "20:00" }
];

const EVENING_BOOST_BLOCK = { start: "20:15", end: "22:00" };

export function parseDateKey(dateKey) {
  const parts = String(dateKey).split("-").map(Number);
  if (parts.length !== 3) {
    return new Date();
  }
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
}

export function endOfLocalDayFromDateInput(dateStr) {
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length !== 3) {
    return new Date();
  }
  return new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999);
}

function daysUntilExam(finalExamDateStr, dayAtMidnight) {
  const examEnd = endOfLocalDayFromDateInput(finalExamDateStr);
  return Math.max(0, Math.ceil((examEnd - dayAtMidnight) / 86400000));
}

function normalizedFixedBlocks(settings) {
  const raw = settings && settings.timetableFixedBlocks;
  if (Array.isArray(raw) && raw.length) {
    return raw.map((b) => ({
      start: String(b.start || "").trim(),
      end: String(b.end || "").trim()
    }));
  }
  return DEFAULT_TIMETABLE_FIXED_BLOCKS.map((b) => ({ ...b }));
}

/**
 * Template slots for a calendar day when there is no per-day override:
 * fixed blocks + optional auto evening row when close to exam.
 */
export function getDefaultSlotsWithoutOverride(
  settings,
  dateKey,
  finalExamDateStr
) {
  const slots = normalizedFixedBlocks(settings).map((b) => ({ ...b }));
  const dayStart = parseDateKey(dateKey);
  const daysLeft = daysUntilExam(finalExamDateStr, dayStart);
  const autoEvening =
    !settings || settings.timetableAutoEveningSlot !== false;
  if (autoEvening && daysLeft <= 45) {
    slots.push({ ...EVENING_BOOST_BLOCK });
  }
  return slots;
}

/**
 * Final time slots for one calendar day (after applying daily mode overrides).
 */
export function getTimeSlotsForDay(settings, dateKey, finalExamDateStr) {
  const mode = settings && settings.timetableMode === "daily" ? "daily" : "fixed";
  const overrides =
    settings && settings.timetableDailyOverrides &&
    typeof settings.timetableDailyOverrides === "object"
      ? settings.timetableDailyOverrides
      : {};
  const overrideList = overrides[dateKey];
  const hasOverride =
    mode === "daily" &&
    Array.isArray(overrideList) &&
    overrideList.length > 0;

  if (hasOverride) {
    return overrideList.map((b) => ({
      start: String(b.start || "").trim(),
      end: String(b.end || "").trim()
    }));
  }
  return getDefaultSlotsWithoutOverride(settings, dateKey, finalExamDateStr);
}

export function buildTimetableRows(
  settings,
  dateKey,
  finalExamDateStr,
  subjects = ["Physics", "Chemistry", "Mathematics"]
) {
  const slots = getTimeSlotsForDay(settings, dateKey, finalExamDateStr);
  const d = parseDateKey(dateKey);
  const daySeed = Math.floor(d.getTime() / 86400000);
  return slots.map((slot, index) => ({
    start: slot.start,
    end: slot.end,
    subject: subjects[(daySeed + index) % subjects.length],
    focus: "Deep work on one subject. Take a short break between blocks."
  }));
}
