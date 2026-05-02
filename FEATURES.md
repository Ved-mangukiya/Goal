# Om's JEE Study Tracker — Complete Feature List

## 🎯 Overview
A comprehensive, Firebase-powered study tracker for JEE Advanced preparation targeting **IIT Bombay with AIR < 100**. Journey starts **May 3, 2025** and runs through **JEE Advanced 2027**.

---

## ✨ New Features Added

### 1. 💡 Doubt & Mistake Journal
- **Daily doubt tracking** — record every doubt and mistake with subject tags
- **Persistent storage** — all doubts saved to Firestore with timestamps
- **Subject-wise filtering** — Physics, Chemistry, Mathematics tags
- **Delete functionality** — remove resolved doubts
- **Animated entries** — smooth slide-in animations for each doubt
- **Review-friendly** — designed for weekly review sessions

**How to use:**
1. Select subject from dropdown
2. Type your doubt/mistake in detail
3. Click "💾 Save doubt"
4. Review and delete when resolved

### 2. 🏆 IIT Bombay Branding
- **Official IIT Bombay logo** displayed prominently on dashboard
- **Target badge** — "Target: IIT Bombay · AIR < 100"
- **Motivational footer** — journey stats and countdown
- **IIT Blue color scheme** — professional branding throughout

### 3. ⏱️ Triple Countdown Timers
- **JEE Mains 2nd Attempt** — April 10, 2025
- **JEE Advanced 2026 (Trial)** — May 24, 2026
- **JEE Advanced 2027 (Final)** — May 23, 2027
- **Reset buttons** — reset any timer to default date
- **Live ticking** — updates every second
- **Days remaining** — shown in motivational footer

### 4. 📅 Schedule Starting May 3, 2025
- **Week 1 starts:** May 3, 2025
- **33-week structured curriculum** through January 2027
- **Extended planning** — weeks 30-45 for JEE Main + Advanced prep
- **Flexible blocks** — 5 daily time blocks (06:30-08:30, 09:15-11:15, etc.)
- **Auto evening block** — added when < 45 days to exam

### 5. 🎨 Enhanced UI/UX
- **Inter font** — clean, modern typography
- **Smooth animations** — fade-in, slide-up, hover effects
- **Glassmorphism cards** — subtle shadows and borders
- **Color-coded subjects:**
  - ⚛️ Physics — Teal (#2a5c52)
  - 🧪 Chemistry — Brown (#8b5c2a)
  - 📐 Mathematics — Navy (#3d4f6b)
- **Responsive design** — works on mobile, tablet, desktop
- **Emoji icons** — visual clarity throughout

### 6. 🔐 Secret Parent Monitoring
- **Om's view (index.html):** NO mention of family/parent view
- **Father's view (father.html):** Complete monitoring dashboard
  - Live session tracking
  - Today's schedule
  - Task completion
  - Study time by subject
  - Full session history
- **Gujarati interface** for father's page
- **Real-time sync** — updates automatically

---

## 📊 Existing Features (Enhanced)

### Study Blocks
- **One-tap timers** — ▶ Start / ■ Stop buttons on each block
- **Live timer display** — shows elapsed time
- **Today's totals** — cumulative time per subject
- **Week/month totals** — on Timers page
- **Subject rotation** — automatic based on timetable

### Task Management
- **Add/edit/delete tasks** — checkbox completion
- **Timestamps** — completion time recorded
- **Persistent storage** — Firestore backed
- **Undo/redo support** — up to 40 actions

### Activity History
- **Session log** — all completed study sessions
- **Sortable table** — date, subject, duration, end time
- **Limit 120 rows** — newest first
- **Export capability** — via database admin

### Settings
- **Exam date inputs** — trial and final JEE Advanced
- **Timetable editor:**
  - Fixed mode — same blocks every day
  - Daily mode — custom blocks per day
  - Auto evening slot toggle
- **JEE Mains countdown rows** — add multiple dates
- **Database admin:**
  - Export full database
  - Wipe all data (with undo)
  - Restore from snapshot

### Weekly Plan
- **33-week curriculum** — detailed topics, books, tasks
- **Subject cards:**
  - Mathematics
  - Physics
  - Chemistry
  - Previous-year questions (PYQs)
- **Target tracking** — questions per week
- **Active week selector** — dropdown navigation

---

## 🚀 How to Run

### Development Mode
```bash
npm install
npm run dev
```
Open **http://localhost:5173**

### Production Build
```bash
npm run build
```
Upload `dist/` folder to GitHub Pages or any static host.

### Direct File Access
⚠️ **Important:** Opening `index.html` directly via `file://` will **NOT work** due to ES modules. Always use:
- `npm run dev` for development
- `npm run build` + static server for production

---

## 📁 File Structure

```
Goal/
├── index.html              ← Main dashboard (Om's view)
├── schedule.html           ← Study blocks with timers
├── plan.html               ← 33-week curriculum
├── timers.html             ← Subject timers (week/month totals)
├── tasks.html              ← Daily task list
├── history.html            ← Session history table
├── settings.html           ← Exam dates, timetable, admin
├── father.html             ← Secret parent monitoring (Gujarati)
├── src/
│   ├── om-main.js          ← Entry point (Firebase init)
│   ├── om-app.js           ← Main app logic (1500+ lines)
│   ├── father-app.js       ← Father's dashboard logic
│   ├── firebase-config.js  ← Firebase credentials
│   ├── collections.js      ← Firestore collection names
│   ├── session-utils.js    ← Timer helpers
│   ├── timetable-utils.js  ← Schedule generation
│   ├── weekly-plan-data.js ← 33-week curriculum data
│   ├── undo-manager.js     ← Undo/redo stack
│   ├── db-admin.js         ← Export/wipe/restore
│   └── dashboard.css       ← All styling (2000+ lines)
├── vite.config.js          ← Multi-page build config
├── package.json            ← Dependencies
└── FIREBASE_SETUP.md       ← Firebase setup guide
```

---

## 🔥 Firebase Collections

| Collection | Document ID | Purpose |
|-----------|-------------|---------|
| `settings` | `general` | Exam dates, timetable config, active week |
| `live` | `session` | Current running timer (subject, startedAtMs) |
| `dailyTotals` | `YYYY-MM-DD` | Daily study time per subject (seconds) |
| `tasks` | `YYYY-MM-DD` | Daily task list with completion status |
| `studySessions` | auto-generated | Completed session log (subject, duration, endedAt) |
| `doubts` | `YYYY-MM-DD` | Daily doubt/mistake journal |
| `questionTracking` | auto-generated | Question completion tracking (future) |
| `blockCompletions` | auto-generated | Block-wise question stats (future) |

---

## 🎯 Upcoming Features (Planned)

### Question Tracking After Each Block
When a study block ends, prompt:
- **Total questions attempted**
- **Correct answers**
- **Wrong answers**
- **Remaining questions** → carry over to next block

### Carryover System
- Remaining questions auto-added to next block
- Or pushed to next week if block is full
- Visual indicator for carryover questions

### Extended Schedule (Weeks 34-45)
- **Weeks 34-36:** JEE Advanced intensive prep
- **Weeks 37-40:** Allen AITS mock tests
- **Weeks 41-44:** Final revision + error log
- **Week 45:** Taper phase (3 days before exam)

### Analytics Dashboard
- **Weekly progress charts**
- **Subject-wise time distribution**
- **Question accuracy trends**
- **Doubt resolution rate**

---

## 🛡️ Security Notes

### Firebase Rules (Current)
```
allow read, write: if true;
```
⚠️ **Anyone with the URL can read/write.** Suitable for private family use only.

### Recommended Production Rules
```
allow read, write: if request.auth != null;
```
Add Firebase Authentication for better security.

---

## 📱 Mobile Optimization

- **Responsive breakpoints** — 480px, 640px, 720px
- **Touch-friendly buttons** — 44px minimum tap target
- **Smooth scrolling** — momentum-based
- **Optimized fonts** — Inter via Google Fonts CDN
- **Fast load times** — Vite code splitting

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Ivory | `#f7f5f2` | Background base |
| Cream | `#eeebe5` | Secondary background |
| Gold | `#8a7229` | Primary accent |
| IIT Blue | `#003d82` | Branding |
| Physics Teal | `#2a5c52` | Subject tag |
| Chemistry Brown | `#8b5c2a` | Subject tag |
| Math Navy | `#3d4f6b` | Subject tag |
| Success Green | `#2e7d4a` | Live session |
| Warning Orange | `#d97706` | Doubts |
| Danger Red | `#dc2626` | Delete actions |

---

## 🏅 Credits

- **Design:** Custom UI inspired by Notion, Linear, and Figma
- **Fonts:** Inter by Rasmus Andersson
- **Icons:** Emoji (native)
- **Logo:** IIT Bombay official logo (educational use)
- **Framework:** Vanilla JavaScript + Firebase
- **Build Tool:** Vite 6.4.2

---

## 📞 Support

For issues or questions:
1. Check `FIREBASE_SETUP.md` for Firebase configuration
2. Verify Firestore rules are published
3. Check browser console for errors
4. Ensure `npm run dev` is running (not `file://`)

---

**Last Updated:** May 2, 2025  
**Version:** 2.0.0  
**Target:** IIT Bombay · JEE Advanced 2027 · AIR < 100 🎯
