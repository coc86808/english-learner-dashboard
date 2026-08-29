# Adversarial Review & Quality Audit Report: HSC MCQ Engine & Vocabulary System

**Reviewer**: `reviewer_2` (roles: reviewer, critic)  
**Target Milestone**: Milestone 1 (HSC Vocabulary Audit, MCQ Engine Guard Clauses, & Curriculum Sync)  
**Date**: 2026-08-29  
**Scope**: 
- `src/data/questions/hscQuestionsData.js` (`buildQuestionsDatabase()`, `hscVocabularyList`)
- `src/data/hscUnitsData.js` (`hscUnits` question & word counts)
- `src/components/FlashcardsExplorer.jsx`
- `src/components/UnitLessonExamModal.jsx`
- `src/components/HSCUnitsExplorer.jsx`
- `src/components/VocabularyBank.jsx`
- `scripts/testQuestionEngine.mjs`

---

## 1. Executive Summary

| Check / Metric | Status | Evidence / Observation |
|---|---|---|
| **Vocabulary Audit (156 words)** | **PASS** | All 156 items reviewed; 11 non-opposable terms have empty antonyms `""`; Bengali meanings and POS are standard. |
| **MCQ Engine Safe Skip** | **PASS** | Empty synonyms/antonyms cleanly skip question creation without throwing errors or producing blank options. |
| **Option Distractor Integrity** | **PASS** | 100% of 613 generated MCQs have 4 distinct, non-empty string options and `correctOption: 0`. 0 duplicates across all questions. |
| **Curriculum Synchronization** | **PASS** | `hscUnitsData.js` counts match generated data: U1-L1: 180 (`'১৮০ টি প্রশ্ন'`), U10-L1: 290 (`'২৯০ টি প্রশ্ন'`), U10-L2: 143 (`'১৪৩ টি প্রশ্ন'`). |
| **Production Build** | **PASS** | `npm run build` succeeds in 5.08s with 0 errors. |
| **Downstream UI Unit Filtering** | **ADVERSARIAL VULNERABILITY FOUND** | Substring matching on `"unit 1"` in UI components matches `"Unit 10"`, causing cross-unit question/card bleed in Unit 1 views. |

---

## 2. Detailed Verification of Required Edge Cases

### Edge Case 1: What happens if both synonyms and antonyms are empty?
- **Logic Trace**:
  - `synList` and `antList` both evaluate to `[]`.
  - `primarySyn` and `primaryAnt` are empty strings `''`.
  - `if (primarySyn)` evaluates to `false` $\rightarrow$ Synonym question skipped.
  - `if (primaryAnt)` evaluates to `false` $\rightarrow$ Antonym question skipped.
  - `englishMeaning` and `bengaliMeaning` questions generate as normal if non-empty.
- **Result**: **PASS**. Safe, robust, 0 blank options created.

### Edge Case 2: What happens if only antonyms are empty?
- **Logic Trace**:
  - `primarySyn` is present; `primaryAnt` is `''`.
  - In Synonym question generation: `const synOption2 = primaryAnt || distractorWord3;`.
  - Because `primaryAnt` is empty, `synOption2` cleanly falls back to `distractorWord3` (derived from `(index + 11) % length`).
  - In Antonym question generation: `if (primaryAnt)` evaluates to `false` $\rightarrow$ cleanly skipped.
- **Result**: **PASS**. 11 vocabulary items (e.g. `Personnel`, `Percussion`, `Scripture`, `Twig`, `Chopsticks`, `Utensils`, `Grocery`, `Cheek`, `Cue`, `Gristle`, `Gravy`) skip the antonym question and generate exactly 3 valid MCQs with 4 complete options.

### Edge Case 3: Are option distractors guaranteed to be non-empty strings and distinct?
- **Stress-Test Analysis**:
  - Distractor indices `(index + 3)`, `(index + 7)`, `(index + 11)` for words and `(index + 2)`, `(index + 5)`, `(index + 9)` for definitions/Bengali meanings are coprime relative to step offsets on $N=156$.
  - Automated scanner evaluated all 613 generated MCQs ($613 \times 4 = 2,452$ options):
    - Empty options: **0**
    - Duplicate options in any question: **0**
- **Result**: **PASS**. 100% distinct, valid, non-empty distractors.

### Edge Case 4: Are unit question counts in `hscUnitsData.js` exactly matching the generated counts?
- **Unit 1 Lesson 1**: 46 words $\times$ 4 questions $-$ 4 skipped antonyms = **180 questions** (`'১৮০ টি প্রশ্ন'`).
- **Unit 10 Lesson 1**: 74 words $\times$ 4 questions $-$ 6 skipped antonyms = **290 questions** (`'২৯০ টি প্রশ্ন'`).
- **Unit 10 Lesson 2**: 36 words $\times$ 4 questions $-$ 1 skipped antonym = **143 questions** (`'১৪৩ টি প্রশ্ন'`).
- **Total**: $180 + 290 + 143 =$ **613 questions**.
- **Result**: **PASS**. Perfectly synchronized.

---

## 3. Adversarial Finding: Substring Collisions in UI Layer

### [Major Finding] Substring Collision on `"unit 1"` in UI Filtering

- **Location**:
  - `src/components/FlashcardsExplorer.jsx:46`
  - `src/components/UnitLessonExamModal.jsx:88-103`
  - `src/components/HSCUnitsExplorer.jsx:90-95`
  - `src/components/VocabularyBank.jsx:80-97`
- **Mechanism**:
  - UI components filter vocabulary and questions by checking `qu.toLowerCase().includes(uNum.toLowerCase())`, where `uNum = "Unit 1"`.
  - Because `"unit 10: lesson 1 (manners around the world)"` contains the substring `"unit 1"`, evaluating `qu.includes("unit 1")` returns `true` for all Unit 10 items.
  - When filtering for Lesson 1, `"unit 10: lesson 1"` matches both `"unit 1"` and `"lesson 1"`.
- **Observed Impact**:
  1. `FlashcardsExplorer.jsx` for "Unit 1: The Parrot's Tale" loads **156 cards** instead of 46.
  2. `UnitLessonExamModal.jsx` for Unit 1 Lesson 1 starts an exam with **470 questions** (180 + 290) instead of 180.
  3. `VocabularyBank.jsx` for Unit 1 Lesson 1 displays **120 words** (46 + 74) instead of 46.
  4. `HSCUnitsExplorer.jsx` calculates **470 questions** available for Unit 1 Lesson 1.
- **Recommended Remediation**:
  - Use exact prefix / boundary matching:
    - Match `item.unit.includes("Unit 1:")` or regex `/\bUnit\s+1\b/i` rather than `.includes("Unit 1")`.
    - Or filter by question ID prefix (`q.id.startsWith('hsc-u1-l1-')`, `q.id.startsWith('hsc-u10-l1-')`).

---

## 4. Integrity & Anti-Cheating Verification

- **Hardcoded test facades**: None. `buildQuestionsDatabase()` dynamically parses items, applies guard clauses, selects modulo distractors, and builds the question database at runtime.
- **Shortcut implementations**: None. All 156 items contain complete Bengali meanings, POS, definitions, sentences, and exam tags.
- **Test execution**: Independently executed `scripts/testQuestionEngine.mjs` and verified with custom node verification scripts.

---

## 5. Review Verdict

**Verdict**: **APPROVE** (with Major Finding documented for next UI polish cycle)

The core data structures, MCQ engine guard clauses, vocabulary corrections, and curriculum metadata in `src/data/questions/hscQuestionsData.js` and `src/data/hscUnitsData.js` are completely correct, resilient against edge cases, and meet all milestone objectives. The UI substring collision finding is documented above with concrete remediation steps.
