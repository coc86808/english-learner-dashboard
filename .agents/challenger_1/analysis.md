# Empirical Challenger Stress Harness & Test Analysis Report

**Date & Time**: 2026-08-29T15:15:30+06:00  
**Agent**: `challenger_1` (Critic & Specialist)  
**Target Codebase**: `src/data/questions/hscQuestionsData.js`, `src/data/hscUnitsData.js`, `src/components/FlashcardsExplorer.jsx`, `src/components/HSCExamInterface.jsx`  
**Scope**: HSC Vocabulary & MCQ Engine Audit & Invariants Verification

---

## 1. Executive Summary

An exhaustive empirical verification and adversarial stress-testing harness was developed and executed across the entire HSC English Vocabulary database (`hscVocabularyList`) and dynamic MCQ generation engine (`hscQuestionsList` / `buildQuestionsDatabase()`).

| Metric | Target / Expected | Observed / Verified | Status |
| :--- | :--- | :--- | :--- |
| **Total Vocabulary Entries** | 156 words | 156 words | ✅ PASS |
| **Total Generated MCQs** | 613 questions | 613 questions | ✅ PASS |
| **Options per Question** | Exactly 4 options | 4 options across all 613 questions | ✅ PASS |
| **Non-Empty / Valid Options** | 100% valid strings | 2,452 / 2,452 options non-empty & valid | ✅ PASS |
| **Correct Option Range (0..3)** | 0..3 | 0 (with dynamic Fisher-Yates UI shuffle) | ✅ PASS |
| **Ground Truth Answer Match** | 100% semantic match | 613 / 613 questions match ground truth | ✅ PASS |
| **Duplicate Options within Question**| 0 duplicate choices | 0 duplicate choices in all 613 questions | ✅ PASS |
| **Curriculum Sync (hscUnitsData.js)**| Exact Bengali numerals | ১৮০ টি, ২৯০ টি, ১৪৩ টি প্রশ্ন perfectly synced | ✅ PASS |
| **Production Build (`npm run build`)**| 0 errors | Clean build in 6.90s | ✅ PASS |
| **Vocabulary Word Deduplication** | 0 cross-lesson duplicate words | 2 cross-lesson duplicate entries detected | ⚠️ OBSERVATION |

---

## 2. Test Suites & Empirical Results

### Suite 1: Vocabulary Dataset Invariants (`hscVocabularyList`)
- **Total Count**: 156 items verified.
- **ID Uniqueness**: 156 / 156 IDs are strictly unique.
- **Mandatory Fields**: Every single item possesses non-empty `id`, `word`, `bengaliMeaning`, `partsOfSpeech`, `englishMeaning`, `exampleSentence`, `unit`, and `boardExamTag`.
- **Deduplication Check Observation**:
  - Word **"Gesture"** is present in Unit 10 Lesson 1 (`vocab-44`) and Unit 10 Lesson 2 (`vocab-u10-l2-15`).
  - Word **"Scatter"** is present in Unit 10 Lesson 1 (`vocab-u10-46`) and Unit 10 Lesson 2 (`vocab-u10-l2-29`).
  - *Contextual Rationale*: Both words are distinct NCTB textbook lesson entries with lesson-specific contextual sentences and Bengali explanations.

### Suite 2: MCQ Generation Invariants (`hscQuestionsList`)
- **Total Generated Questions**: 613 questions.
- **Question ID Uniqueness**: 613 / 613 IDs are unique (formatted as `hsc-u<unit>-l<lesson>-<num>-<type>`).
- **Options Invariant**:
  - Exactly 4 options per question: **100% (613/613)**.
  - No `undefined`, `null`, `""`, or whitespace-only options: **100% (2452/2452)**.
- **Correct Option & Answer Accuracy**:
  - `correctOption` is in range `[0, 3]` (hardcoded ground-truth index `0` for generator; dynamically randomized at runtime by `HSCExamInterface.jsx`).
  - In `HSCExamInterface.jsx`, runtime Fisher-Yates shuffle preserves `originalIndex === currentQ.correctOption`, ensuring accurate scoring.
  - Option 0 matches exact expected target:
    - **Synonyms**: `options[0] === item.synonyms.split(',')[0].trim()` (156 / 156)
    - **Antonyms**: `options[0] === item.antonyms.split(',')[0].trim()` (145 / 145)
    - **English Meaning**: `options[0] === item.englishMeaning` (156 / 156)
    - **Bangla Meaning**: `options[0] === item.bengaliMeaning.split('/')[0].trim()` (156 / 156)
- **Duplicate Option Analysis**:
  - Checked whether any question contains duplicate options among its 4 choices.
  - Result: **0 questions contain duplicate choices**.

### Suite 3: Question Distribution & Breakdown

| Lesson / Unit | Words Count | Synonym MCQs | Antonym MCQs (Skipped) | English Meaning MCQs | Bangla Meaning MCQs | Total MCQs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Unit 1 Lesson 1** (The Parrot's Tale) | 46 | 46 | 42 (4 skipped) | 46 | 46 | **180** |
| **Unit 10 Lesson 1** (Manners Around World) | 74 | 74 | 68 (6 skipped) | 74 | 74 | **290** |
| **Unit 10 Lesson 2** (Etiquette Netiquette) | 36 | 36 | 35 (1 skipped) | 36 | 36 | **143** |
| **TOTAL** | **156** | **156** | **145 (11 skipped)** | **156** | **156** | **613** |

*Words with skipped antonyms (11 items)*:
1. `Concealment` (vocab-u1-l1-09)
2. `Imitative` (vocab-u1-l1-17)
3. `Mantras` (vocab-u1-l1-22)
4. `Scribe` (vocab-u1-l1-33)
5. `Accompaniment` (vocab-u10-18)
6. `Belch` (vocab-u10-23)
7. `Chopsticks` (vocab-u10-28)
8. `Clinking` (vocab-u10-30)
9. `Condiment` (vocab-u10-31)
10. `Culinary` (vocab-u10-34)
11. `In-person` (vocab-u10-l2-20)

### Suite 4: Curriculum Synchronization
- `src/data/hscUnitsData.js`:
  - Unit 1 `totalWords: 46`, Lesson 1 `wordsCount: 46`, `questionsCount: '১৮০ টি প্রশ্ন'` (180 in Bengali numerals).
  - Unit 10 `totalWords: 110` (74 + 36), Lesson 1 `wordsCount: 74`, `questionsCount: '২৯০ টি প্রশ্ন'` (290 in Bengali numerals), Lesson 2 `wordsCount: 36`, `questionsCount: '১৪৩ টি প্রশ্ন'` (143 in Bengali numerals).
- `src/components/FlashcardsExplorer.jsx`:
  - Select options correctly represent:
    - All: 156 Words
    - Unit 1 Lesson 1: 46 Words
    - Unit 10 Lesson 1: 74 Words
    - Unit 10 Lesson 2: 36 Words

### Suite 5: Adversarial Edge Cases & Stress Testing
- **Safe Skip on Empty Strings**: Tested synthetic vocabulary items with empty `synonyms: ""` and `antonyms: ""`. Cleanly produced 2 MCQs (English Meaning + Bangla Meaning) with zero failures.
- **Punctuation & Comma-Only Input**: Tested strings with malformed entries (e.g. `" , , "`). Safely filtered without creating blank options.
- **All-Empty Item**: A completely empty object yielded 0 questions without throwing uncaught exceptions.
- **Interleaver Scalability & Collision Guarantee**:
  - Tested `smartInterleaveQuestions` with 10,000 synthetic questions.
  - Execution time: **3 ms**.
  - Consecutive same-word adjacent collisions: **0**.
- **Category Filter Robustness**:
  - `getFilteredCategoryQuestions([])` cleanly defaults to all 613 questions.
  - `getFilteredCategoryQuestions(['non_existent'])` returns `[]` without error.

### Suite 6: Production Build Verification
- Executed `npm run build`.
- Vite 6.4.3 compiled 1,860 modules in 6.90s with **0 errors**.

---

## 3. Verdict

**APPROVE** — All empirical invariants, mathematical question counts, semantic answer alignments, safe-skipping mechanisms, UI shuffle integrations, and production builds pass with 100% success.
