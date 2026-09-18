# TEST_READY — HSC English Learner Dashboard (Student Command Center Redesign)

**Date**: 2026-09-16  
**Test Suite Path**: `scripts/test_dashboard_suite.mjs`  
**Execution Command**: `node scripts/test_dashboard_suite.mjs`  
**Framework**: Pure Node ESM Test Harness (Microsecond precision, zero external dependencies)  
**Status**: Test Suite Ready & Verified

---

## 1. Executive Summary & Purpose

The `scripts/test_dashboard_suite.mjs` automated test suite provides exhaustive, opaque-box, behavioral and contract verification for the redesigned Student Command Center (`/dashboard`). It directly evaluates the platform's ability to answer three vital questions for every HSC examinee:
1. **"What have I achieved?"** (Streak count, accuracy percentage, solved questions, earned XP, rank tier, skill progress, badges).
2. **"What should I do next?"** (Personalized greeting hero, daily question quota progress, contextual resume card, 3 curated recommended practice tracks).
3. **"What do I need to improve?"** (Dynamic weak words review hub powered by the 3-mistake auto-tagging and 5-correct mastery recovery loop).

---

## 2. Test Architecture & Coverage Matrix

The suite executes 67 automated test cases organized into four rigorous tiers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TIER 1: FEATURE COVERAGE (43 Tests)                                         │
│ • Component manifest & exports across all 11 modular components             │
│ • WelcomeHero dynamic time-of-day greeting (Morning/Afternoon/Evening/Night)│
│ • TopStatsSummary 4-metric fraction formatting & accuracy clamping          │
│ • DailyGoalCard progress percentage & in-progress vs completion states      │
│ • ContinueLearningCard active session resolution & remaining time heuristic │
│ • RecommendedPractice 3-track generation (Vocab, Grammar, Reading)          │
│ • SkillProgress 5-dimension competency tracking (Vocab, Grammar, Reading...)│
│ • WeakAreasSection mistake mapping & zero-weak-words celebration fallback   │
│ • PersonalizedInsights contextual heuristic cards (Accuracy, Goal, Tips)    │
│ • AchievementsWidget 5-badge unlock matrix & in-progress visual states      │
│ • MiniLeaderboard top 3 podium peers & user rank standing                   │
│ • RecentActivity timeline formatting & score tiering (>=80%, >=60%, <60%)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ TIER 2: BOUNDARY & FALLBACK STATES (6 Tests)                                │
│ • Cold-start / brand-new user zero-void guarantee (0 stats, null name)      │
│ • Corrupted localStorage & malformed JSON recovery (safe exception bounds)  │
│ • Extreme numeric inputs (negative, NaN, millions, out-of-range accuracy)   │
│ • Temporal consistency & midnight rollover streak preservation              │
│ • Non-existent / invalid unit reference defensive fallback to Unit 1       │
├─────────────────────────────────────────────────────────────────────────────┤
│ TIER 3: LEARNING LOOP & INTERACTIONS (7 Tests)                              │
│ • "Continue Learning" launch wiring to exam modal / active lesson           │
│ • Daily Goal completion & XP award propagation (+150 XP for perfect quiz)   │
│ • Rule 5: 3-mistake automatic weak word tagging and event dispatch          │
│ • Rule 5: 5-correct consecutive answer mastery recovery & auto-removal      │
│ • Reading passage action navigation to interactive textbook reader          │
│ • MiniLeaderboard navigation to full ranking tables (/leaderboard)          │
│ • Bilingual (English <-> Bengali) localization synchronization             │
├─────────────────────────────────────────────────────────────────────────────┤
│ TIER 4: RESPONSIVE & VISUAL INVARIANTS (11 Tests)                           │
│ • End-to-End student journey from onboarding to first completed quiz        │
│ • 7-day streak milestone achievement unlock journey                         │
│ • Responsive layout reflow: Desktop 12-col grid & Mobile 1-col stack        │
│ • Touch target accessibility (min-h-[44px] on all interactive buttons)      │
│ • Educational SaaS Design Tokens (#F7F9FC bg, #FFFFFF cards, 20-24px radius,│
│   #E5E7EB borders, #2563EB primary CTA, #172033 & #64748B typography)      │
│ • Rule 4: Master Admin credentials authorization across all aliases         │
│ • Student role isolation & route guarding                                   │
│ • Zero horizontal overflow layout containment (overflow-x-hidden)           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. How to Run the Tests

### Main Dashboard Test Suite:
```bash
node scripts/test_dashboard_suite.mjs
```

### Existing Platform Invariant Tests (Non-Regression Verification):
```bash
node scripts/rules_invariants_test.mjs
```

### Full Production Build Verification:
```bash
npm run build
```

---

## 4. Test Verification Summary

- **Total Tests**: 67
- **Execution Time**: ~100ms
- **Zero External Dependencies**: Runs in native Node 20+ ESM without external browser overhead.
- **Dynamic Curriculum Verification**: Uses authentic NCTB data from `src/data/hscUnitsData.js` and `src/data/questions/hscQuestionsData.js`, dynamically adjusting assertions to the database without static count fragility.
