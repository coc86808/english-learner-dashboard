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

## 2026-09-14T19:54:06Z

# Complete Ingestion of NCTB HSC English 11-12 (2025–2026 Edition) into Interactive Textbook Reader

Extract, transcribe, and integrate all units and lessons (Units 1–14) from the 285-page official NCTB HSC English For Today revised 2025–2026 PDF (C:\Users\infinix\Downloads\English 11-12 All PDF 06.10.25.pdf) into the website's interactive Textbook Reader with authentic full texts, sentence-by-sentence Bengali translations, and vocabulary keyword highlights.

Working directory: e:/english leaner
Integrity mode: development

## Requirements

### R1. Complete 285-Page Textbook Ingestion (Units 1–14)
- Process the official 285-page NCTB HSC English For Today PDF (C:\Users\infinix\Downloads\English 11-12 All PDF 06.10.25.pdf) covering all units from Unit 1 to Unit 14, including all 2024/2025 revised curriculum contents.
- Transcribe and format all reading passages verbatim with accurate chapter titles, lesson headings, and paragraph numbers.

### R2. Interactive Textbook Reader Data Structures
- For each lesson, generate structured data files in src/data/textbooks/ containing:
  - unitId, unitTitle, unitTitleBn, lessonId, lessonTitle, lessonTitleBn
  - Array of paragraphs, each with:
    - number: Paragraph index / number
    - heading: Descriptive Bengali & English section heading
    - text: Verbatim English passage text
    - bengaliTranslation: Accurate, natural Bengali translation
    - highlightWords: Array of important vocabulary keywords matching hscVocabularyList
- Register all lesson files in the central textbook index (src/data/textbooks/index.js) under ALL_TEXTBOOKS.

### R3. Curriculum & Navigation Synchronization
- Ensure all lessons are selectable and navigable in src/data/hscUnitsData.js and src/components/pages/TextbookPage.jsx.
- Verify smooth TTS (Text-to-Speech), bilingual side-by-side toggles, font scaling, and keyword click popup behaviors.

## Acceptance Criteria

### Content Fidelity & Completeness
- [ ] All units (1–14) and their respective lessons from the 285-page PDF are fully transcribed into src/data/textbooks/.
- [ ] Every paragraph contains authentic English text and corresponding Bengali translation without missing or truncated sections.
- [ ] ALL_TEXTBOOKS exports an entry for every lesson ID and unit ID.

### Quality & System Verification
- [ ] Node verification script passes with 0 missing lessons, 0 empty paragraphs, and 100% valid structure.
- [ ] npm run build succeeds with 0 errors.
- [ ] Interactive Textbook Reader in TextbookPage.jsx renders all lessons properly with translation toggle and vocabulary highlights.

## 2026-09-16T09:51:04Z

# Redesign English-Learning Dashboard into Modern Student SaaS Command Center

Redesign and elevate the existing English-learning dashboard (https://english-learner-dashboard.vercel.app/dashboard) into a polished, modern, student-friendly, high-quality educational SaaS dashboard that acts as a personal learning command center answering: "What have I achieved?", "What should I do next?", and "What do I need to improve?"

Working directory: e:/english leaner
Integrity mode: development

## Requirements

### R1. Educational SaaS Visual Design System & Layout
- Re-architect the student dashboard page (/dashboard) with a calm, modern educational SaaS aesthetic:
  - Page background: #F7F9FC
  - Card background: #FFFFFF
  - Card border: 1px solid #E5E7EB
  - Card border-radius: 20px–24px
  - Subtle shadows, generous spacing (gap: 20px–24px)
  - Primary blue (#2563EB, hover #1D4ED8) for CTAs and active states
  - Success green (#16A34A) for completions and accuracy
  - Accent yellow/orange (#F59E0B) for streaks and alerts
  - Dark text #172033, muted secondary text #64748B
- Maintain typography hierarchy (28–32px page title, 20–22px section titles, 16–18px card titles, 14–16px body, 12–13px metadata) using Plus Jakarta Sans and Inter.

### R2. Modular Student Command Center Components
Implement clean, modular, accessible React components in src/components/dashboard/:
1. WelcomeHero: Personalized greeting ("Good afternoon 👋"), weekly progress indicator, contextual motivation, and primary [ Continue Learning ] CTA.
2. TopStatsSummary: 4 compact summary cards (Daily Goal e.g. 14/20, Streak e.g. 7 days 🔥, Accuracy e.g. 78%, Questions Completed e.g. 420).
3. DailyGoalCard: Visually prominent daily progress with progress bar, remaining question counter, motivational streak prompt, and [ Continue Goal ] action.
4. ContinueLearningCard: High-priority featured card displaying active/last unit or quiz topic, question progress (e.g. Question 18 / 30), estimated time remaining, and [ Continue Quiz → ] button.
5. RecommendedPractice: 3 personalized action cards (Vocabulary Challenge, Grammar Practice, Reading Passage) with subject, question count, difficulty, recommendation reason, and direct launch buttons.
6. SkillProgress: Clean horizontal progress bars for Vocabulary, Grammar, Reading, Listening, and Speaking with percentage indicators.
7. WeakAreasSection ("Areas to Improve"): Identifies low-performing topics or words linked to the student's weakWords list and test mistakes, with [ Practice ] and [ Review ] buttons.
8. PersonalizedInsights: Contextual learning feedback cards (e.g. goal proximity, accuracy improvements, specific practice tips).
9. AchievementsWidget: Rewarding achievement badges (7-Day Streak, 100 Questions Solved, Vocabulary Master, 90% Accuracy, Fast Solver).
10. MiniLeaderboard: Secondary weekly leaderboard preview (#12 You, top peers, XP scores) with [ View Full Leaderboard → ] navigation.
11. RecentActivity: Compact timeline rows showing recent quizzes, scores, and timestamps.

### R3. Learning Loop & Real Engine Integration
- Wire all dashboard cards directly to the platform's actual data sources and state managers:
  - currentUser state, scoreManager.js, and localStorage / Firebase for real streak, XP, accuracy, and question counts.
  - hscUnitsData.js and hscQuestionsData.js for authentic units, lessons, and vocabulary.
  - weakWords array for dynamic rendering in the "Areas to Improve" section.
  - Connect [ Continue Learning ], [ Start Practice ], and [ Review ] buttons to UnitLessonExamModal, QuickPracticeModal, TextbookReaderModal, or routes (/exam, /textbook, /practice, /weak-words, /flashcards).
  - Provide realistic fallback/demo states if user data is brand new or empty so no blank voids appear.

### R4. Responsive Design & Accessibility
- Desktop (>=1024px): Clean left sidebar + organized 2-column/3-column main dashboard grid following the visual wireframe hierarchy.
- Tablet (640px–1024px): Responsive 2-column reflow with compact sidebar.
- Mobile (<640px): Reflowed vertical stack prioritizing Greeting → Daily Goal → Continue Learning → Recommended Practice → Weak Areas; comfortable touch targets (min 44px), zero horizontal overflow.
- Full WCAG color contrast, visible focus states, semantic headings, and smooth microinteractions (card hover, progress bar animations).

## Acceptance Criteria

### Visual & Architectural Polish
- [ ] Student dashboard at /dashboard strictly adheres to the modern educational SaaS aesthetic (#F7F9FC bg, #FFFFFF cards with 20–24px radius, #E5E7EB borders, #2563EB primary CTA).
- [ ] Visual hierarchy places Continue Learning, Today's Goal, and Recommended Practice as immediate first-view priorities.
- [ ] All 11 student command center components are modularized under src/components/dashboard/ and integrated smoothly.

### Functional Integration & Learning Loop
- [ ] Clicking "Continue Learning" launches or navigates to the active lesson/exam.
- [ ] Clicking "Recommended Practice" cards launches corresponding practice quizzes or passage readers.
- [ ] "Areas to Improve" reflects real weak words and triggers dedicated practice.
- [ ] Streak, accuracy, and completed questions dynamically reflect the user's real progress.
- [ ] Empty and loading states are handled gracefully with friendly messages and skeleton placeholders.

### Responsiveness & System Integrity
- [ ] Tested and verified on Mobile (<640px), Tablet, and Desktop with 0 horizontal overflow.
- [ ] Zero regressions to existing routes (/vocabulary-bank, /flashcards, /exam, /textbook, /progress, /leaderboard, /settings, /admin).
- [ ] npm run build succeeds with 0 errors.
