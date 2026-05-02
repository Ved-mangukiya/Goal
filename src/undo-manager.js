const MAX_DEPTH = 40;
const undoStack = [];
const redoStack = [];

let applying = false;
let btnUndo = null;
let btnRedo = null;

function refreshButtons() {
  if (btnUndo) {
    btnUndo.disabled = undoStack.length === 0 || applying;
  }
  if (btnRedo) {
    btnRedo.disabled = redoStack.length === 0 || applying;
  }
}

export function bindUndoRedoButtons(undoEl, redoEl) {
  btnUndo = undoEl;
  btnRedo = redoEl;
  refreshButtons();
}

export function recordAction(entry) {
  if (applying) {
    return;
  }
  undoStack.push(entry);
  if (undoStack.length > MAX_DEPTH) {
    undoStack.shift();
  }
  redoStack.length = 0;
  refreshButtons();
}

export async function undoLast() {
  const entry = undoStack.pop();
  if (!entry) {
    return;
  }
  applying = true;
  refreshButtons();
  try {
    await entry.undo();
  } finally {
    applying = false;
    redoStack.push(entry);
    refreshButtons();
  }
}

export async function redoLast() {
  const entry = redoStack.pop();
  if (!entry) {
    return;
  }
  applying = true;
  refreshButtons();
  try {
    await entry.redo();
  } finally {
    applying = false;
    undoStack.push(entry);
    refreshButtons();
  }
}

export function clearHistory() {
  undoStack.length = 0;
  redoStack.length = 0;
  refreshButtons();
}

export function isApplyingHistory() {
  return applying;
}
