import "./dashboard.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseConfig } from "./firebase-config.js";
import { bootOmApp } from "./om-app.js";

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const alertEl = document.getElementById("setup-alert");
  const main = document.getElementById("main-app");
  if (alertEl) {
    alertEl.classList.remove("hidden");
    alertEl.textContent =
      "Add your Firebase keys inside src/firebase-config.js, run npm run build, then open the built site.";
  }
  if (main) {
    main.classList.add("hidden");
  }
} else {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  isSupported()
    .then((ok) => {
      if (ok && firebaseConfig.measurementId) {
        getAnalytics(app);
      }
    })
    .catch(() => {});
  const page = document.body.dataset.omPage || "home";
  bootOmApp(db, page);
}
