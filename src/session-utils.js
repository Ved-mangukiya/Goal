/** Firestore may return milliseconds as a number or as a Timestamp. */
export function normalizeStartedAtMs(raw) {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return raw;
  }
  if (raw != null && typeof raw.toMillis === "function") {
    return raw.toMillis();
  }
  return 0;
}

const DEFAULT_SUBJECTS = ["Physics", "Chemistry", "Mathematics"];

export function isLiveSessionRunning(data, subjects = DEFAULT_SUBJECTS) {
  if (!data || typeof data !== "object") {
    return false;
  }
  const started = normalizeStartedAtMs(data.startedAtMs);
  return (
    data.isActive === true &&
    typeof data.subject === "string" &&
    subjects.includes(data.subject) &&
    started > 0
  );
}
