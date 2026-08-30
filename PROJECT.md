# Project: HSC English Learner Dashboard Redesign & Full Site Map Expansion

## Architecture
- **Framework**: React 18/19 + Vite + Tailwind CSS + Framer Motion + Lucide Icons + Canvas-Confetti
- **Design Tokens**:
  - Background: Deep navy `#0c0f17`, `#131824`, `#0d1220`
  - Primary Accent: Emerald green `#10b981`, `#059669`, `#065f46`
  - Secondary Accent: Amber `#f59e0b` (streaks/XP), Rose `#f43f5e` (weak words/danger)
  - Cards: Dark glassmorphism `#111723`, `#161e2e`, borders `#1e293b`
  - Typography: White `#ffffff`, Slate `#94a3b8`, `#cbd5e1`, Bengali Font `Hind Siliguri`
- **Routing**: Unified history router with 23 routes, dynamic path matching, public/student/admin auth guards.
- **State Management**:
  - Auth: `localStorage['hsc_auth_user']`, Master Admin credentials & aliases
  - Spaced Repetition & Weak Words: `localStorage['hsc_weak_words']`, 3-mistake auto-weak-word, 5-correct mastery recovery
  - Personal Notes: `localStorage['hsc_student_notes']`
  - Contact & Feedback: `localStorage['hsc_contact_messages']`
  - Settings & Preferences: `localStorage['hsc_user_settings']`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Full 20+ Routing & Auth Guard | Exhaustive path mapping, protected student routes, admin route lockdown | M1 | ORIGINAL_REQUEST §R3 |
| 2 | Unified Navigation Suite | Redesigned Sidebar (5 sections), Header (user status + breadcrumbs), MobileBottomNav (5 core items) | M1 | ORIGINAL_REQUEST §R1, R3 |
| 3 | Student Progress Dashboard (`/progress`) | Weekly study hours chart, unit accuracy donuts, streak calendar heatmap, recovery timeline, XP tier | M2 | ORIGINAL_REQUEST §R2.1 |
| 4 | Leaderboard Page (`/leaderboard`) | Weekly/monthly/all-time ranked table, Top 3 podium, student personal rank card, animated rank changes | M2 | ORIGINAL_REQUEST §R2.2 |
| 5 | Textbook Reader (`/textbook`) | NCTB passage text reader, emerald clickable vocab highlights + popup definitions/synonyms, unit/lesson selector | M2 | ORIGINAL_REQUEST §R2.3 |
| 6 | Certificates Page (`/certificates`) | Unit certificate cards (locked/unlocked $\ge 80\%$), printable/downloadable certificate generator with NCTB badge | M2 | ORIGINAL_REQUEST §R2.4 |
| 7 | Personal Notes Page & FAB (`/notes`) | Rich text notepad per unit/lesson, auto-save to localStorage, search, persistent Quick Note FAB | M2 | ORIGINAL_REQUEST §R2.5 |
| 8 | Settings Page (`/settings`) | Password change form, theme toggle, English/Bangla language toggle, notification prefs, account delete | M2 | ORIGINAL_REQUEST §R2.6 |
| 9 | About & Contact Page (`/about`) | Platform mission statement, NCTB curriculum badge, developer credits, contact form with localStorage save | M2 | ORIGINAL_REQUEST §R2.7 |
| 10 | Enhanced Admin Sub-pages (`/admin/*`) | 1-click Authorize/Ban/Role-Switch/Reset controls on `/admin/users`, drill-down analytics & weak words heatmap on `/admin/analytics` | M2 | ORIGINAL_REQUEST §R2.8 |
| 11 | Landing Page Visual Redesign | Hero with floating flashcard widget, gradient banner, 4 feature cards, testimonials carousel, stats counter, sticky CTA | M3 | ORIGINAL_REQUEST §R1 |
| 12 | Dashboard Redesign | 4-action card grid with glowing borders, streak flame counter, weekly SVG progress ring, contextual "Resume Learning" card | M3 | ORIGINAL_REQUEST §R1 |
| 13 | HSC Exam Interface Redesign | Full-height distraction-free shell, Framer Motion transitions, green pulse/red shake feedback, progress breadcrumbs, timer | M3 | ORIGINAL_REQUEST §R1 |
| 14 | Flashcards Explorer Redesign | 3D CSS flip animation, swipe gesture support, mastery progress bar, animated completion confetti modal | M3 | ORIGINAL_REQUEST §R1 |
| 15 | Vocabulary Bank Redesign | Sticky emerald table header, alternating row shading, color-coded columns, inline pronunciation buttons, expandable row | M3 | ORIGINAL_REQUEST §R1 |
| 16 | Admin Layout & Tables Redesign | Dark professional glassmorphism layout, tab navigation, sortable tables, color-coded status badges | M3 | ORIGINAL_REQUEST §R1 |
| 17 | Core Rules Synchronization | Master Admin aliases, 3 mistakes weak word / 5 correct recovery, 4 MCQs per word, units sync | M4 | AGENTS.md / GEMINI.md |
| 18 | E2E Testing Suite (Tiers 1-4) | Opaque-box requirement-driven test suite for all features and routes (286 tests passing) | Test Track | Dual Track |
| 19 | Build, Git Push & Vercel Deploy | `npm run build` exit 0, git commit & push to main, Vercel prod deploy, HTTP 200 verification | M5 | ORIGINAL_REQUEST §R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Routing Architecture & Navigation Suite | Routing engine in `App.jsx`, route guards, redesign `Sidebar.jsx`, `Header.jsx`, `MobileBottomNav.jsx` | none | DONE |
| M2 | 8 Brand-New Feature Pages & Admin Sub-pages | Build `/progress`, `/leaderboard`, `/textbook`, `/certificates`, `/notes` + FAB, `/settings`, `/about`, and enhanced admin subpages | M1 | DONE |
| M3 | Visual Redesign of Existing Screens | Redesign `LandingPage.jsx`, Dashboard view, `HSCExamInterface.jsx`, `FlashcardsExplorer.jsx`, `VocabularyBank.jsx`, `AdminPanel.jsx` | M1 | DONE |
| M4 | Integration, State & Rules Synchronization | Wire all new pages with auth state, test Master Admin aliases, verify 3-mistake/5-mastery logic, ensure clean navigation across all 20+ routes | M2, M3 | DONE |
| M5 | Final Verification, Build, Git Push & Vercel Deployment | Run build, E2E test verification, Git commit & push, Vercel production deploy, live URL verification | M4 | DONE |

## Code Layout
- `src/App.jsx`: Global router, route dispatcher, auth guards, global state, layout wrapper, Quick Note FAB mount
- `src/components/Sidebar.jsx`, `Header.jsx`, `MobileBottomNav.jsx`: Navigation Suite
- `src/components/pages/`:
  - `ProgressPage.jsx` (`/progress`)
  - `LeaderboardPage.jsx` (`/leaderboard`)
  - `TextbookPage.jsx` (`/textbook`)
  - `CertificatesPage.jsx` (`/certificates`)
  - `NotesPage.jsx` (`/notes` + `QuickNoteFAB.jsx`)
  - `SettingsPage.jsx` (`/settings`)
  - `AboutPage.jsx` (`/about`)
- `src/components/admin/`: `AdminDashboard.jsx`, `UserManagement.jsx`, `AdminAnalytics.jsx`, `QuestionManagement.jsx`, `QuizMakerSettings.jsx`
- `src/components/`: `LandingPage.jsx`, `ActionCards.jsx`, `HSCExamInterface.jsx`, `FlashcardsExplorer.jsx`, `VocabularyBank.jsx`, `AuthModal.jsx`, `StreakWidget.jsx`, `DailyPointsChart.jsx`, `CertificateModal.jsx`
- `src/data/`: `hscUnitsData.js`, `questions/hscQuestionsData.js`, `textbooks/`, `users/userData.js`
- `scripts/`: `test_e2e_suite.mjs`, `rules_invariants_test.mjs`, `challenger_stress_test.mjs`
