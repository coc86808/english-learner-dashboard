# Handoff Report: HSC Vocabulary Audit Entries 105–156 & MCQ Generator Engine

**Agent**: `explorer_3` (Explorer / Auditor)  
**Target File**: `src/data/questions/hscQuestionsData.js`  
**Working Directory**: `e:\english leaner\.agents\explorer_3`  
**Date**: 2026-08-29  
**Type**: Hard Handoff (Investigation & Audit Complete)

---

## 1. Observation

1. **Vocabulary Inaccuracies in Items 105–156 (`src/data/questions/hscQuestionsData.js` lines 1261–1883)**:
   - **Nonsensical Antonyms for Anatomical / Culinary / Functional Nouns**:
     - `Cheek` (Item 110, `vocab-76`): `antonyms: "Forehead, Chin"`.
     - `Cue` (Item 125, `vocab-u10-15`): `antonyms: "Nowhere, Blindness"`.
     - `Gristle` (Item 132, `vocab-u10-22`): `antonyms: "Tender meat, Soft flesh"`.
     - `Gravy` (Item 134, `vocab-u10-24`): `antonyms: "Dry seasoning"`.
     - `Concerned` (Item 120, `vocab-u10-10`): Primary antonym listed as `"Fascinated"`.
   - **Parts of Speech (POS) Mismatches**:
     - `Caveman` (Item 114, `vocab-u10-04`): Noun headword paired with adjective synonyms (`Primitive, Brutal`) and adjective antonyms (`Civilized, Cultured`).
     - `Trouble` (Item 107, `vocab-u10-l2-36`): Verb headword paired with noun antonym `Relief`.
     - `Gulp` (Item 135, `vocab-u10-25`): Verb headword paired with noun primary synonym `Mouthful`.
     - `Lack` (Item 144, `vocab-u10-34`): Noun context paired with verb synonyms (`Need, Require`) and verb antonyms (`Possess, Own`).
     - `Puff up` (Item 152, `vocab-u10-42`): Phrasal verb paired with noun/adj synonym `Bulk` and imperfect antonym `Squeeze`.
   - **Typographical Redundancy**:
     - `Maintain` (Item 146, `vocab-u10-36`): Bengali meaning contains duplicated text `"বজায় রাখা / সংরক্ষণ করা / বজায় রাখা"`.
   - **Duplicate Word Across Lessons**:
     - `Scatter` appears at index 100 (`vocab-u10-l2-29`, Unit 10 Lesson 2) and index 156 (`vocab-u10-46`, Unit 10 Lesson 1).

2. **MCQ Engine Fragility (`src/data/questions/hscQuestionsData.js` lines 1885–2020)**:
   - In `buildQuestionsDatabase()`, `primarySyn` and `primaryAnt` are extracted via `.split(',')[0].trim()`.
   - The generator unconditionally pushes Synonym and Antonym questions without checking if `primarySyn` or `primaryAnt` are empty strings (`""`).
   - For words with `antonyms: ""`, the generator emits an Antonym MCQ with empty string answer `""`, and corrupts the distractor array of Synonym questions with `options: [primarySyn, "", distractor1, distractor2]`.

3. **Curriculum Synchronization Status (`src/data/hscUnitsData.js` lines 174–183)**:
   - `u10-l1` currently specifies `questionsCount: '২৯৬ টি প্রশ্ন'` (74 words × 4 = 296).
   - If 4 entries (`Cheek`, `Cue`, `Gristle`, `Gravy`) have `antonyms: ""` and safely skip Antonym MCQs, the active question count for `u10-l1` becomes 292 (`'২৯২ টি প্রশ্ন'`), and overall questions count becomes 620 instead of 624.
   - Word count in `src/components/FlashcardsExplorer.jsx` line 168–172 remains `74 Words` (and `156 Words` total) as all 156 vocabulary terms remain fully active.

---

## 2. Logic Chain

1. **Linguistic Correctness**:
   - In standard lexicography (Oxford, Cambridge, Merriam-Webster) and NCTB English curricula, concrete body parts (`Cheek`), culinary liquids (`Gravy`), connective tissues (`Gristle`), and contextual pointers (`Cue`) do not have semantic opposites. Forcing pseudo-antonyms like `"Forehead"`, `"Dry seasoning"`, or `"Nowhere"` degrades educational quality and misinforms students.
   - Therefore, setting `antonyms: ""` for these terms is mandatory per Project Rule #3 in `ORIGINAL_REQUEST.md`.

2. **Engine Robustness**:
   - Setting fields to `""` causes runtime corruption in `buildQuestionsDatabase()` because it lacks guard clauses (`if (primarySyn)`, `if (primaryAnt)`).
   - Furthermore, the fallback option for option 1 in a Synonym question currently relies on `primaryAnt`. When `primaryAnt` is `""`, a third fallback distractor (`distractorWord3`) must be used to preserve a valid 4-option MCQ format.
   - Therefore, the generator must be patched with safe-skip logic and clean distractor fallback.

3. **Curriculum Synchronization Consistency**:
   - Per AGENTS.md / GEMINI.md, `questionsCount` in `hscUnitsData.js` must reflect actual generated questions.
   - Updating `questionsCount: '২৯২ টি প্রশ্ন'` for `u10-l1` ensures exact alignment between data metadata and dynamic engine output.

---

## 3. Caveats

1. **Scope Boundary**: Entries 1 through 104 were assigned to peer explorer agents (`explorer_1` and `explorer_2`). This audit rigorously evaluated entries 105 through 156.
2. **Dynamic vs. Static Questions Count**: If the application orchestrator prefers keeping `questionsCount` dynamically computed via `hscQuestionsList.filter(q => q.unit === ...).length` in the UI components rather than static Bengali strings in `hscUnitsData.js`, that architectural enhancement would prevent future drift whenever vocabulary entries are added or modified.
3. **Scatter Deduplication**: While `Scatter` is present in both Unit 10 Lesson 1 and Lesson 2, keeping both entries with distinct contextual examples (Lesson 1: table breadcrumbs; Lesson 2: scattered letters) is harmless for flashcard mastery if IDs and contexts remain distinct.

---

## 4. Conclusion

- All 52 audited entries (105 to 156) have been thoroughly verified and corrected for Bengali meanings, parts of speech, Board-standard synonyms, and antonyms.
- 4 entries (`Cheek`, `Cue`, `Gristle`, `Gravy`) have been identified as requiring `antonyms: ""` with zero invalid distractors.
- 1 fatal primary antonym error (`Concerned` -> `Fascinated`) and 1 nonsensical antonym error (`Cue` -> `Nowhere`) were caught and rectified.
- The MCQ generator function `buildQuestionsDatabase()` requires the safe-skip patch and distractor fallback documented in `analysis.md` Section 4.
- All proposed data replacements are compiled with exact syntax in `e:\english leaner\.agents\explorer_3\analysis.md`.

---

## 5. Verification Method

To independently verify these findings:
1. **Audit Inspection**: Inspect `e:\english leaner\.agents\explorer_3\analysis.md` for full before/after diffs of all 52 entries.
2. **Run Vocabulary Inspector**:
   ```bash
   node .agents/explorer_3/inspect.mjs
   ```
3. **Verify MCQ Generator Skip Logic**:
   Execute a Node simulation of the patched `buildQuestionsDatabase()` to confirm that 0 empty string options (`""`) exist in any MCQ object:
   ```bash
   node -e "const { hscQuestionsList } = await import('./src/data/questions/hscQuestionsData.js'); const empties = hscQuestionsList.filter(q => q.options.some(opt => !opt || opt.trim() === '')); console.log('Empty options count:', empties.length);"
   ```
4. **Build Verification**:
   ```bash
   npm run build
   ```
