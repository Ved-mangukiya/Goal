import "./dashboard.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";
import { bootFatherApp } from "./father-app.js";

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const el = document.getElementById("father-setup");
  el.classList.remove("hidden");
  el.textContent =
    "src/firebase-config.js માં Firebase કી દાખલ કરો, npm run build ચલાવો, પછી બિલ્ડ ખોલો.";
} else {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  bootFatherApp(db);
}
