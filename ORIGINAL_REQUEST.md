# Original User Request

## 2026-08-29T15:04:40Z

Audit all 156 words in the HSC English vocabulary database at `e:\english leaner\src\data\questions\hscQuestionsData.js` to find any word whose listed **synonyms or antonyms are linguistically incorrect, nonsensical, or inappropriate for HSC board exam standard**. For any word that genuinely has **no meaningful synonyms or no meaningful antonyms** (e.g. proper nouns, very specific technical terms), clear those fields and update the MCQ engine accordingly. Use Google Translate (English → Bangla) as a cross-reference tool to verify Bengali meanings are correct too.

Working directory: `e:\english leaner`
Integrity mode: development

## Requirements

### R1. Full Vocabulary Audit
Read all 156 vocabulary entries from `src/data/questions/hscQuestionsData.js`. For each word, verify:
- Its listed **synonyms** are real, valid English synonyms appropriate for HSC board exam level.
- Its listed **antonyms** are real, valid English antonyms appropriate for HSC board exam level.
- Its **Bengali meaning** is accurate (cross-check using Google Translate English→Bangla).
Produce a report listing every word that has any issue.

### R2. Fix Problematic Entries
For any word identified with issues in R1:
- If a word has **no valid synonyms** (e.g. it is a proper noun or a term with no synonyms): set `synonyms: ""` and remove its synonym MCQ from the question engine.
- If a word has **no valid antonyms** (e.g. abstract nouns, proper terms): set `antonyms: ""` and remove its antonym MCQ from the question engine.
- If the synonyms/antonyms are **wrong** (not real synonyms/antonyms): replace them with correct ones.
- If the Bengali meaning is wrong: fix it.
All changes must be made directly in `src/data/questions/hscQuestionsData.js`.

### R3. Verification Build
After all fixes, run `npm run build` and confirm it exits with code 0 (zero errors). The total MCQ count shown in the console output should reflect any removed questions.

## Acceptance Criteria

### Audit Quality
- [ ] All 156 words are checked — no word skipped
- [ ] Every identified issue is documented with: word name, field (synonyms/antonyms/bengaliMeaning), what was wrong, what was fixed
- [ ] Google Translate was actually used to cross-check Bengali meanings (not guessed)

### Code Fixes
- [ ] `src/data/questions/hscQuestionsData.js` is updated with all corrections
- [ ] No empty synonym/antonym field causes a broken MCQ (the MCQ engine must skip generation for empty fields)
- [ ] `npm run build` exits with code 0 after all changes

### Report
- [ ] A final human-readable summary report is produced listing every word that was changed and why

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
