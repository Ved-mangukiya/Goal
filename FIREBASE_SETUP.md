# Firebase, npm, and GitHub Pages

This app uses the **Firebase modular JavaScript Software Development Kit** from **npm** (`firebase` package), bundled with **Vite**. Om’s page and the family page both talk to **Cloud Firestore** in real time. There is **no sign-in** in the app: you rely on a **private link** and Firestore rules you control.

---

## Fix: “Firebase blocked the write” / `permission-denied`

That message means **Firestore security rules** are still **denying** reads or writes. The app cannot save timers, dates, or tasks until you fix this.

Do this once:

1. Open [Firebase Console](https://console.firebase.google.com) and select your project (**om-study-dashboard** or whatever you named it).
2. In the left sidebar, click **Build** → **Firestore Database**.
3. Open the **Rules** tab (not “Data”).
4. **Replace** everything in the editor with the rules below (same as **`firestore.rules`** in this project).
5. Click **Publish** and wait until it finishes (often a few seconds).
6. Reload your study website and try again (start a timer or change a date).

**Rules to paste (no login required):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Common mistakes:**

- Rules were never published after editing (you must click **Publish**).
- The database was created in **production mode** with the default “deny all” rules — you must replace them with the block above.
- You edited rules on a **different Firebase project** than the one in `src/firebase-config.js` (check **projectId** matches).

**Security note:** `if true` means anyone who has your page URL can change data. That matches a private family setup. For stronger protection later, add Firebase Authentication and tighten rules.

---

## Part 1 — Create a Firebase project

1. Open [https://console.firebase.google.com](https://console.firebase.google.com) and sign in.
2. Click **Add project** (or **Create a project**), choose a name, and finish the wizard.
3. You may enable or skip Google Analytics. If you enable it, you will get a `measurementId` for the config file.

---

## Part 2 — Register a web app and paste config

1. In the Firebase console, open your project.
2. Click the **Web** icon (`</>`) to add a web app.
3. Register the app. Copy the `firebaseConfig` object from the **npm** / modular snippet.

Open **`src/firebase-config.js`** and paste your values into the exported `firebaseConfig` object. You can copy from **`firebase-config.example.js`** as a shape guide.

**Security:** If the GitHub repository is public, anyone can read your web API key from the built JavaScript. That is normal for Firebase web apps, but you must keep **Firestore rules** strict enough for your comfort. If keys were ever shared in a chat or screenshot, **rotate** them in the Google Cloud console and update `src/firebase-config.js`.

---

## Part 3 — Turn on Firestore

1. Click **Build** → **Firestore Database** → **Create database**.
2. Pick a region, then start in **production mode** and use the rules in **Part 5** below (or test mode only for a short local test).
3. Click **Enable**.

You do **not** need to create collections by hand. The app creates documents on first use.

---

## Why `index.html` appears twice

You will see **`index.html` and `father.html` in the project root** and again inside **`dist/`** after a build. The root copies are the **source** that Vite reads. The **`dist/`** copies are the **built site** (bundled JavaScript, hashed file names). Publish **`dist/`** to GitHub Pages, not the raw root unless you only use `npm run dev` locally.

---

## Part 4 — Install, build, and preview locally

From this project folder on your computer:

```powershell
npm install
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173`) to try the site.

For a production bundle (what you publish):

```powershell
npm run build
```

The output is in the **`dist`** folder. Open `dist/index.html` via a local static server if you want to test the built files (double-clicking `index.html` may block modules).

---

## Part 5 — Firestore rules (no authentication)

Because you asked for **no Authentication**, rules must allow reads and writes from the web client. This is only suitable if **only Om and family** use the link and you accept that **anyone with the link could change data**.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish** after editing. For a stricter setup later, add Authentication and change `write` to `if request.auth != null`.

---

## Part 6 — Data layout

| Collection        | Document id   | Purpose |
|------------------|---------------|---------|
| `settings`       | `general`     | Exam dates and Main exam list. |
| `live`           | `session`     | Live timer state. |
| `dailyTotals`    | `YYYY-MM-DD`  | Seconds per subject per day. |
| `tasks`          | `YYYY-MM-DD`  | Daily checklist `items`. |
| `studySessions`  | auto id       | Finished timer sessions. |

---

## Part 7 — Deploy `dist` to GitHub Pages

1. Run **`npm run build`**.
2. Push the repo to GitHub (you can ignore committing `node_modules`; it is listed in `.gitignore`).
3. Either:
   - **Option A:** Commit the **`dist`** folder and set GitHub Pages **source** to that folder, or  
   - **Option B:** Use a GitHub Action that runs `npm run build` and publishes `dist` (recommended for not storing build output in git).

After deployment, open:

- `.../index.html` — Om (English, full editing, undo, redo, reset).
- `.../father.html` — family view (Gujarati, read-only in the user interface; rules above still allow writes if someone uses developer tools).

Paths use **`base: './'`** in Vite so asset links work on `https://user.github.io/repo-name/`.

---

## Part 8 — Reset, undo, and redo (Om’s page only)

- **Undo last change** reverses the last **Firestore write** that Om’s page recorded (exam settings, tasks, timer start/stop batches, and similar). The stack holds up to 40 steps in this browser session.
- **Redo last undone change** reapplies that step.
- **Reset entire database** exports a full snapshot, deletes app data in Firestore, then lets you **Undo** once to restore that snapshot. **Redo** after a reset wipes everything again.

Undo history is stored **in memory** only; refreshing the page clears it.

---

## Part 9 — Analytics

Om’s entry file initializes **Firebase Analytics** when the browser supports it and `measurementId` is present in `firebase-config.js`. The family page does not load Analytics.
