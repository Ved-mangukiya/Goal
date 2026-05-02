# Changelog — Om's JEE Study Tracker

## Version 2.1.0 (Latest) — May 2, 2025

### 🎨 **Typography Upgrade**
- **Poppins** — Primary body font (clean, modern, highly readable)
- **Space Grotesk** — Display font for headings (geometric, bold)
- **JetBrains Mono** — Monospace font for numbers/timers (technical, precise)
- All fonts loaded via Google Fonts CDN

### ⏱️ **Dual JEE Mains Countdowns**
- **JEE Mains 1st Attempt** — January 22, 2026
- **JEE Mains 2nd Attempt** — April 10, 2026
- Both countdowns displayed alongside JEE Advanced timers
- Individual reset buttons for each exam
- 4-column responsive grid layout

### ✅ **Task Management Enhancements**
- **Edit button** (✏️) — Click to edit task text inline
- **Delete button** (🗑️) — Click to remove task with confirmation
- Buttons appear on hover for clean UI
- Smooth animations on edit/delete actions
- Prompt-based editing (native browser prompt)

### 📊 **Block Completion System**
New "✓ Complete" button on each study block that opens a modal asking:

**Question Tracking:**
- 📝 Total questions attempted
- ✅ Correct answers
- ❌ Wrong answers
- ⏳ Remaining questions (auto-carryover to next block)

**Additional Data:**
- Automatic accuracy calculation (correct/total × 100%)
- Optional notes field for observations
- Time spent display (from today's totals)
- Subject and time block info

**Carryover System:**
- Remaining questions automatically tracked
- Stored in `questionTracking` collection
- Will be added to next block or next week
- Visual indicator (planned for future update)

**Data Storage:**
- All completions saved to `blockCompletions` collection
- Includes: subject, time, questions, accuracy, notes, timestamp
- Supports undo/redo (future enhancement)
- Synced across devices via Firebase

### 🎯 **Modal Features**
- Beautiful glassmorphism overlay with backdrop blur
- Smooth scale + fade animations
- Click outside to close
- Escape key support (future)
- Mobile-responsive (full-screen on small devices)
- Form validation (correct + wrong ≤ total)

---

## Version 2.0.0 — May 2, 2025

### 🏆 **IIT Bombay Branding**
- Official IIT Bombay logo on dashboard
- "Target: IIT Bombay · AIR < 100" badge
- IIT Blue color scheme (#003d82)
- Motivational footer with journey stats

### 💡 **Doubt & Mistake Journal**
- Daily doubt tracking with subject tags
- Timestamped entries
- Delete functionality
- Smooth slide-in animations
- Stored in Firestore (`doubts` collection)

### 📅 **Schedule Starting May 3, 2025**
- Week 1 begins May 3, 2025
- 33-week structured curriculum
- Extended weeks 30-45 for final prep
- All dates adjusted from original June 2026 start

### ⏱️ **Triple Countdown Timers**
- JEE Mains 2nd Attempt (April 10, 2025)
- JEE Advanced 2026 Trial (May 24, 2026)
- JEE Advanced 2027 Final (May 23, 2027)
- Reset buttons for each timer

### 🎨 **Enhanced UI/UX**
- Inter font (clean, modern)
- Smooth animations everywhere
- Glassmorphism cards
- Emoji icons for visual clarity
- Fully responsive design

### 🔐 **Secret Parent Monitoring**
- `index.html` — NO mention of family view
- `father.html` — Complete monitoring (hidden from Om)
- Real-time sync via Firebase

---

## Firestore Collections

| Collection | Purpose | Documents |
|-----------|---------|-----------|
| `settings` | App configuration | `general` |
| `live` | Current running timer | `session` |
| `dailyTotals` | Daily study time per subject | `YYYY-MM-DD` |
| `tasks` | Daily task list | `YYYY-MM-DD` |
| `studySessions` | Completed session log | auto-generated |
| `doubts` | Daily doubt/mistake journal | `YYYY-MM-DD` |
| `blockCompletions` | Block completion stats | auto-generated |
| `questionTracking` | Question carryover tracking | `carryover` |

---

## Upcoming Features (Roadmap)

### 📊 Analytics Dashboard
- Weekly progress charts
- Subject-wise time distribution
- Question accuracy trends
- Doubt resolution rate

### 🔔 Smart Notifications
- Block start reminders
- Daily goal alerts
- Carryover question notifications
- Weekly review prompts

### 📈 Performance Insights
- Weak topic identification
- Best study time analysis
- Accuracy improvement tracking
- Personalized recommendations

### 🎯 Advanced Carryover
- Visual carryover indicators on blocks
- Automatic question redistribution
- Priority-based scheduling
- Smart load balancing

### 📱 Mobile App
- Native iOS/Android apps
- Offline mode support
- Push notifications
- Widget support

---

## Technical Details

### Build System
- **Vite 6.4.2** — Fast build tool
- **ES Modules** — Modern JavaScript
- **Multi-page app** — 8 HTML pages
- **Firebase SDK 11.6.0** — Real-time database

### Performance
- **Code splitting** — Optimized bundle sizes
- **Lazy loading** — On-demand module loading
- **Gzip compression** — Reduced transfer sizes
- **CDN fonts** — Fast font loading

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## How to Use New Features

### Completing a Study Block
1. Start a timer for a subject
2. Study and solve questions
3. Stop the timer when done
4. Click "✓ Complete" button
5. Fill in question stats in the modal
6. Add optional notes
7. Click "💾 Save & Complete"
8. View accuracy percentage in toast

### Editing Tasks
1. Hover over a task
2. Click the ✏️ edit button
3. Type new text in the prompt
4. Press OK to save

### Deleting Tasks
1. Hover over a task
2. Click the 🗑️ delete button
3. Confirm deletion
4. Task removed with animation

### Resetting Timers
1. Find the countdown card
2. Click "Reset" button below the timer
3. Confirm reset
4. Timer resets to default date

---

## Known Issues

### Minor
- Modal doesn't support Escape key yet (planned)
- Carryover questions not visually indicated on blocks (planned)
- No analytics dashboard yet (planned)

### Workarounds
- Use Cancel button or click outside to close modal
- Check `questionTracking` collection in Firebase Console for carryover data

---

## Credits

- **Design:** Custom UI inspired by Notion, Linear, Figma
- **Fonts:** 
  - Poppins by Indian Type Foundry
  - Space Grotesk by Florian Karsten
  - JetBrains Mono by JetBrains
- **Icons:** Emoji (native)
- **Logo:** IIT Bombay official logo (educational use)
- **Framework:** Vanilla JavaScript + Firebase
- **Build Tool:** Vite 6.4.2

---

**Last Updated:** May 2, 2025  
**Version:** 2.1.0  
**Target:** IIT Bombay · JEE Advanced 2027 · AIR < 100 🎯
