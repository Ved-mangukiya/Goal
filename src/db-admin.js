import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch
} from "firebase/firestore";
import { COL } from "./collections.js";

const CHUNK = 450;

async function deleteCollectionDocs(db, name) {
  const snap = await getDocs(collection(db, name));
  const docs = snap.docs;
  for (let i = 0; i < docs.length; i += CHUNK) {
    const batch = writeBatch(db);
    docs.slice(i, i + CHUNK).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}

export async function exportFullDatabase(db) {
  const snapshot = {
    settingsGeneral: null,
    liveSession: null,
    dailyTotals: [],
    tasks: [],
    studySessions: []
  };

  const genRef = doc(db, COL.settings, COL.general);
  const genSnap = await getDoc(genRef);
  if (genSnap.exists()) {
    snapshot.settingsGeneral = genSnap.data();
  }

  const liveRef = doc(db, COL.live, COL.session);
  const liveSnap = await getDoc(liveRef);
  if (liveSnap.exists()) {
    snapshot.liveSession = liveSnap.data();
  }

  const dailySnap = await getDocs(collection(db, COL.dailyTotals));
  dailySnap.forEach((d) => {
    snapshot.dailyTotals.push({ id: d.id, data: d.data() });
  });

  const tasksSnap = await getDocs(collection(db, COL.tasks));
  tasksSnap.forEach((d) => {
    snapshot.tasks.push({ id: d.id, data: d.data() });
  });

  const sessSnap = await getDocs(collection(db, COL.studySessions));
  sessSnap.forEach((d) => {
    snapshot.studySessions.push({ id: d.id, data: d.data() });
  });

  return snapshot;
}

export async function wipeAllStudyData(db) {
  await deleteCollectionDocs(db, COL.studySessions);
  await deleteCollectionDocs(db, COL.tasks);
  await deleteCollectionDocs(db, COL.dailyTotals);

  const genRef = doc(db, COL.settings, COL.general);
  const liveRef = doc(db, COL.live, COL.session);
  try {
    await deleteDoc(genRef);
  } catch (_) {
    /* empty */
  }
  try {
    await deleteDoc(liveRef);
  } catch (_) {
    /* empty */
  }
}

export async function restoreFullDatabase(db, snapshot) {
  if (!snapshot) {
    return;
  }

  const ops = [];

  if (snapshot.settingsGeneral) {
    ops.push({
      ref: doc(db, COL.settings, COL.general),
      data: snapshot.settingsGeneral
    });
  }
  if (snapshot.liveSession) {
    ops.push({
      ref: doc(db, COL.live, COL.session),
      data: snapshot.liveSession
    });
  }
  snapshot.dailyTotals.forEach((row) => {
    ops.push({
      ref: doc(db, COL.dailyTotals, row.id),
      data: row.data
    });
  });
  snapshot.tasks.forEach((row) => {
    ops.push({
      ref: doc(db, COL.tasks, row.id),
      data: row.data
    });
  });
  snapshot.studySessions.forEach((row) => {
    ops.push({
      ref: doc(db, COL.studySessions, row.id),
      data: row.data
    });
  });

  for (let i = 0; i < ops.length; i += CHUNK) {
    const batch = writeBatch(db);
    ops.slice(i, i + CHUNK).forEach((op) => {
      batch.set(op.ref, op.data);
    });
    await batch.commit();
  }
}
