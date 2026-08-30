# Original User Request

## 2026-08-30T08:00:19Z

Perform a **complete professional redesign and full site map expansion** of the HSC English Learner Dashboard — an NCTB HSC English exam prep EdTech platform built with React + Vite + Tailwind CSS + Framer Motion. Every existing screen must be visually polished, 8 brand-new pages must be built, and all navigation must be fully wired.

Working directory: e:\english leaner
Integrity mode: demo

---

## Context

**Live site:** https://english-learner-dashboard.vercel.app  
**GitHub:** https://github.com/coc86808/english-learner-dashboard (branch: main)  
**Stack:** React 18 + Vite + Tailwind CSS + Framer Motion + Lucide Icons  
**GitHub PAT:** `github_pat_[REDACTED]`  
**Vercel Token:** `vcp_[REDACTED]`

**Design System (must stay consistent across all pages):**
- Background: Deep navy `#0c0f17`, `#131824`, `#0d1220`
- Primary Accent: Emerald green `#10b981`, `#059669`, `#065f46`
- Secondary Accent: Amber `#f59e0b` (streaks), Rose `#f43f5e` (weak words/danger)
- Cards: Dark glassmorphism `#111723`, `#161e2e`, borders `#1e293b`
- Typography: White `#ffffff`, Slate `#94a3b8`, `#cbd5e1`
- Bangla font: Hind Siliguri or system Bengali font
- Components: Rounded-2xl/3xl cards, subtle glow shadows, Framer Motion animations

**Master Admin credentials (must keep working):**
- Emails: `sakin@gmail.com`, `sakin7112`, `sakinadmin`, `admin@learnerhub.com`, `admin`
- Passwords: `AdminHSC@2026!`, `Abc@#123`, `Z%#91V4PrG`

---

## Full Site Map

```
📱 HSC English Learner Dashboard
│
├── 🏠 PUBLIC (No Auth Required)
│   ├── / — Landing Page (Hero + Features + Testimonials + CTA)
│   ├── /about — About & Contact Page
│   └── /auth — Sign In / Sign Up Modal
│
├── 🎓 STUDENT ZONE (Auth Required)
│   ├── /dashboard — Main Dashboard (Action Cards + Progress Ring + Streaks)
│   ├── /units — HSC Units & Lessons Explorer
│   ├── /vocabulary — Vocabulary Bank (4-column filterable sheet)
│   ├── /flashcards — 3D Flip Flashcards Explorer
│   ├── /practice — Quick Practice MCQ (random lesson)
│   ├── /exam — Full MCQ Exam Interface (Unit + Lesson Board Exam)
│   ├── /weak-words — Weak Words Revision Hub
│   ├── /textbook — Textbook Reader (NCTB Passage Viewer)
│   ├── /progress — Student Progress Dashboard (Charts + Analytics)
│   ├── /leaderboard — Leaderboard (Weekly + Monthly + All-time Rankings)
│   ├── /notes — Personal Notes & Bookmarks Page
│   ├── /certificates — Certificate Downloads Page
│   ├── /settings — Account Settings (Password, Theme, Language)
│   └── /profile — User Profile Modal
│
└── 👨‍💼 ADMIN ZONE (Admin Auth Required)
    ├── /admin — Admin Dashboard (Overview KPIs)
    ├── /admin/users — User Management (Authorize/Ban/Reset)
    ├── /admin/questions — Question Management (Add/Edit/Delete MCQs)
    ├── /admin/analytics — Platform Analytics (Student Activity Charts)
    └── /admin/settings — Quiz Maker Pro Settings
```

---

## Requirements

### R1. Visual Redesign of All Existing Screens
Every currently existing page/component must receive a professional visual upgrade:
- **LandingPage.jsx**: Redesigned hero with animated floating flashcard widget, gradient brand banner, 4 feature highlights with glassmorphism cards, student testimonials carousel, animated stats counter (122 words, 488 MCQs), and sticky CTA footer bar.
- **Dashboard (App.jsx main view)**: Redesigned 4-action-card grid with glowing icon borders, daily streak flame counter, weekly progress ring chart, and contextual "Resume Learning" smart card.
- **HSCExamInterface.jsx**: Modern distraction-free exam shell with animated question transition, answer state animations (green pulse correct, red shake wrong), progress breadcrumb, and "Save & Exit" flow.
- **FlashcardsExplorer.jsx**: 3D CSS flip animation cards, swipe gesture support, mastery progress bar, and animated confetti on lesson completion.
- **VocabularyBank.jsx**: Sticky emerald table header, alternating row shading, column-specific color coding (Bangla=emerald, Synonyms=slate, Antonyms=rose), and inline audio pronunciation buttons.
- **Sidebar.jsx + Header.jsx + MobileBottomNav.jsx**: Unified navigation redesign with active page indicator glow, collapsible sidebar on mobile, and smooth tab transitions.
- **Admin Panel**: Dark professional admin layout with sidebar navigation between all 4 admin sub-pages, sortable tables, and color-coded status badges.

### R2. 8 New Pages to Build From Scratch
Build and fully wire these new pages into the navigation and routing:

1. **Student Progress Dashboard (`/progress`)**  
   - Weekly study hours bar chart, per-unit MCQ accuracy donut charts, streak calendar heatmap, weak word recovery timeline, and total XP score.

2. **Leaderboard Page (`/leaderboard`)**  
   - Ranked table of students by weekly/monthly/all-time correct answers, Top 3 podium with trophy icons, student rank badge showing user's own position, and animated rank change arrows.

3. **Textbook Reader (`/textbook`)**  
   - Unit & Lesson selector, scrollable NCTB passage text display with key vocabulary highlighted in emerald, click-on-word popup showing Bengali meaning + synonyms.

4. **Certificate Page (`/certificates`)**  
   - Show certificates earned per unit when student achieves ≥80% exam score, downloadable/printable certificate with student name, college, date, and NCTB unit badge.

5. **Personal Notes Page (`/notes`)**  
   - Rich text notepad per lesson/unit, auto-save to localStorage, search across notes, and "Quick Note" floating action button available on all pages.

6. **Settings Page (`/settings`)**  
   - Password change form, dark/light theme toggle (dark is default), language toggle (English/Bangla UI), notification preferences, and account deletion option.

7. **About & Contact Page (`/about`)**  
   - Platform mission statement, NCTB curriculum badge, developer credit, and a contact form (stores submissions to localStorage).

8. **Enhanced Admin Panel Sub-pages**  
   - Upgrade `/admin/users` with 1-click Authorize/Ban/Role Switch/Password Reset controls.
   - Upgrade `/admin/analytics` with per-student drill-down, top weak words heatmap, and daily active users chart.

### R3. Full Navigation & Routing Wiring
- All 20+ routes must be properly navigable from the Sidebar, MobileBottomNav, Header, and contextual in-page links.
- Auth guard: students cannot access `/admin*` routes; unauthenticated users are redirected to Landing/Auth.
- Mobile bottom navigation must show the 5 most important student routes with icons.
- Sidebar must have labeled sections: Study, Practice, Progress, Account, Admin (admin-only).

### R4. Build Verification & Deployment
After all changes:
- Run `npm run build` — must exit with code 0 and 0 errors.
- Commit all changes with message: `"Full site map expansion: 8 new pages + complete visual redesign"`.
- Push to GitHub main branch using the provided PAT.
- Deploy to Vercel production using the provided token: `npx vercel --prod --yes --token vcp_[REDACTED]`
- Verify live URL returns HTTP 200.

---

## Acceptance Criteria

### Navigation & Routing
- [ ] All 20+ routes listed in the site map are accessible and render without errors.
- [ ] Auth guard works: unauthenticated users cannot reach student or admin pages.
- [ ] Admin guard works: regular students cannot reach `/admin*` routes.
- [ ] Sidebar, MobileBottomNav, and Header all update active state correctly on each route.

### New Pages (All 8 must exist and be functional)
- [ ] `/progress` renders at least 3 chart/analytics widgets with real or mock data.
- [ ] `/leaderboard` renders a ranked table with at least Top 3 podium display.
- [ ] `/textbook` renders NCTB passage text with at least one vocabulary highlight popup.
- [ ] `/certificates` renders at least one certificate card with download/print button.
- [ ] `/notes` allows creating, saving, and searching notes — data persists in localStorage.
- [ ] `/settings` allows theme toggle and language toggle with visible effect.
- [ ] `/about` renders mission content and a contact form with submit action.
- [ ] Admin sub-pages render with enhanced controls (Authorize, Ban, Analytics charts).

### Visual Redesign Quality
- [ ] All pages use consistent design tokens: navy backgrounds, emerald accents, glassmorphism cards.
- [ ] All pages are mobile responsive (test at 375px and 768px breakpoints).
- [ ] Framer Motion animations present on page transitions and interactive elements.
- [ ] No raw unstyled HTML or default browser styling visible anywhere.

### Build & Deploy
- [ ] `npm run build` exits with code 0, zero errors.
- [ ] Production URL https://english-learner-dashboard.vercel.app returns HTTP 200.
- [ ] GitHub commit pushed to main branch successfully.

---

*Expecting this to run as a large full-project build — many components to create and wire. The team will work across new pages, routing, design system, and deployment.*
