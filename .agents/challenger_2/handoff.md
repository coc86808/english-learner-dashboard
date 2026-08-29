# Challenger 2 Handoff Report

## 1. Observation

1. **Production Build (`npm run build`)**:
   - Command executed: `npm run build`
   - Result: Exited with code 0. Generated `dist/index.html` (1.06 kB), `dist/assets/index-BijkI9zW.css` (84.36 kB), and `dist/assets/index-9xH_94mI.js` (613.04 kB). 0 compilation or syntax errors.

2. **Vocabulary Data Deduplication & Integrity (`src/data/questions/hscQuestionsData.js`)**:
   - `hscVocabularyList` contains 156 items.
   - All 156 IDs are unique.
   - Word uniqueness check (`node scripts/checkDuplicates.mjs`) revealed 2 duplicate words:
     - Word `"Gesture"`: `vocab-44` (line 804, Unit 10 Lesson 1) vs `vocab-u10-l2-15` (line 1032, Unit 10 Lesson 2).
     - Word `"Scatter"`: `vocab-u10-l2-29` (line 1200, Unit 10 Lesson 2) vs `vocab-u10-46` (line 1872, Unit 10 Lesson 1).

3. **MCQ Engine Safe Skip & Question Quality (`src/data/questions/hscQuestionsData.js`)**:
   - `buildQuestionsDatabase()` successfully produces 613 questions:
     - Synonyms: 156
     - Antonyms: 145 (11 words with empty string `antonyms: ""` properly skipped)
     - English Meaning: 156
     - Bangla Meaning: 156
   - 0 duplicate options across all 613 questions.
   - 0 empty/blank options.
   - All `correctOption` indices are valid (index 0).

4. **Curriculum Consistency (`src/data/hscUnitsData.js`)**:
   - Unit 1: `totalWords: 46`, Lesson 1: `wordsCount: 46`, `questionsCount: "১৮০ টি প্রশ্ন"`.
   - Unit 10: `totalWords: 110`, Lesson 1: `wordsCount: 74`, `questionsCount: "২৯০ টি প্রশ্ন"`, Lesson 2: `wordsCount: 36`, `questionsCount: "১৪৩ টি প্রশ্ন"`.
   - All other units (2-9, 11-14): `totalWords: 0`, all lessons `wordsCount: 0`, `questionsCount: "০ টি প্রশ্ন"`.
   - Exact sum of words = 46 + 74 + 36 = 156. Exact sum of questions = 180 + 290 + 143 = 613.

5. **Flashcards Explorer Filtering Bug (`src/components/FlashcardsExplorer.jsx`)**:
   - Lines 45-51 in `src/components/FlashcardsExplorer.jsx`:
     ```javascript
     if (selectedLessonId === 'u1-l1') {
       list = hscVocabularyList.filter(item => item.unit.includes("Unit 1") || item.unit.includes("The Parrot's Tale"));
     }
     ```
   - When evaluating `item.unit.includes("Unit 1")`, strings like `"Unit 10: Lesson 1..."` and `"Unit 10: Lesson 2..."` return `true` because `"Unit 10"` contains the substring `"Unit 1"`.
   - Consequently, selecting `u1-l1` loads all 156 words instead of only Unit 1's 46 words.

---

## 2. Logic Chain

1. From Observation 1, the codebase builds cleanly into production without syntactic or packaging errors.
2. From Observation 3 and 4, the MCQ generation engine correctly implements safe skipping for empty fields (11 nouns with no antonyms), generates well-formed distractor sets (0 duplicate options, 0 empty options), and `src/data/hscUnitsData.js` accurately records Bengali numeral question counts and word counts matching the database.
3. From Observation 5, `item.unit.includes("Unit 1")` creates a false positive match on all Unit 10 items because `"Unit 1"` is a prefix substring of `"Unit 10"`. This breaks the UI contract of `FlashcardsExplorer.jsx` by returning 156 cards when the user selects Unit 1.
4. From Observation 2, `hscVocabularyList` contains duplicate words (`Gesture` and `Scatter`) across Lesson 1 and Lesson 2 of Unit 10, conflicting with the mandatory Deduplication Rule in `AGENTS.md` and `GEMINI.md`.

---

## 3. Caveats

- **No other caveats**: The audio speech synthesis, state persistence, and card flip CSS are standard and syntactically valid.
- Words with empty antonyms were evaluated and confirmed to be concrete nouns where antonyms do not semantically exist (e.g. *Chopsticks, Utensils, Percussion, Personnel, Twig, Scripture, Grocery, Cheek, Cue, Gristle, Gravy*).

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

Two issues require remediation before final approval:
1. **Fix Flashcard Explorer Filter Substring Collision**:
   In `src/components/FlashcardsExplorer.jsx` line 46, replace `item.unit.includes("Unit 1")` with `item.unit.includes("Unit 1:")` or `item.unit.startsWith("Unit 1:")`.
2. **Resolve Vocabulary Deduplication**:
   Remove or replace the duplicate entries for `"Gesture"` (`vocab-44` vs `vocab-u10-l2-15`) and `"Scatter"` (`vocab-u10-l2-29` vs `vocab-u10-46`) in `src/data/questions/hscQuestionsData.js`, and sync counts accordingly.

---

## 5. Verification Method

To independently verify these findings, run:
```bash
node scripts/empiricalChallengerTest.mjs
node scripts/checkDuplicates.mjs
node scripts/deepStressTest.mjs
npm run build
```

**Invalidation Conditions**:
- The verdict will change to `APPROVE` once:
  1. `item.unit.includes("Unit 1:")` is used in `FlashcardsExplorer.jsx` so that `u1-l1` filter produces exactly 46 cards.
  2. The duplicate entries for `Gesture` and `Scatter` are resolved.
  3. `scripts/empiricalChallengerTest.mjs` exits with code 0.
