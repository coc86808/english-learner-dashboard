# Changes Summary — Worker 2

## 1. Vocabulary Corrections in `src/data/questions/hscQuestionsData.js`
- **Hostess** (`vocab-34`):
  - *Before*: `"synonyms": "Hostess, Welcomer, Entertainer, Lady host"`
  - *After*: `"synonyms": "Welcomer, Entertainer, Lady host, Host"`
  - *Rationale*: Removed self-synonym `Hostess` so that the word is not defined as its own synonym in MCQ distractor generation and study views.
- **Downfall** (`vocab-u1-l1-08`):
  - *Before*: `"synonyms": "Ruin, collapse, downfall, degradation"`
  - *After*: `"synonyms": "Ruin, collapse, degradation, descent"`
  - *Rationale*: Removed self-synonym `downfall` and replaced with accurate standard synonym `descent`.
- **Gilded** (`vocab-u1-l1-15`):
  - *Before*: `"synonyms": "Gold-plated, golden, ornate, gilded"`
  - *After*: `"synonyms": "Gold-plated, golden, ornate, adorned"`
  - *Rationale*: Removed self-synonym `gilded` and replaced with authentic synonym `adorned`.
- **Hugging** (`vocab-u10-27`):
  - *Before*: `"bengaliMeaning": "আলিঙ্গন করা / বুকে জড়িয়ে ধরা"`
  - *After*: `"bengaliMeaning": "আলিঙ্গন / বুকে জড়িয়ে ধরা"`
  - *Rationale*: Updated to true nominal Bengali form without verbal auxiliary "করা", matching its Part of Speech (`Noun`).
- **Room** (`vocab-u10-l2-27`):
  - *Before*: `"bengaliMeaning": "জায়গা, স্থান / পরিসর"`
  - *After*: `"bengaliMeaning": "জায়গা / সুযোগ / কক্ষ"`
  - *Rationale*: Standardized delimiters to forward slashes `" / "` and incorporated comprehensive curriculum meanings (space, opportunity, chamber).

---

## 2. Unit 1 vs Unit 10 Filter Collision Fixes
- **`src/components/FlashcardsExplorer.jsx`**:
  - Replaced `item.unit.includes("Unit 1")` with `item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale")`.
  - Now selecting `Unit 1: The Parrot's Tale (46 Words)` isolates strictly the 46 Unit 1 flashcards, preventing the 110 Unit 10 flashcards from colliding.
- **`src/components/HSCUnitsExplorer.jsx`**:
  - Updated `getCategoryCount` and `getFilteredQuestions` unit matching logic to use `qu.includes(uNum + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu)` instead of naive substring inclusion `qu.includes(uNum)`.
- **`src/components/UnitLessonExamModal.jsx`**:
  - Updated both `getFilteredQuestions` and the 4 category count badge calculations to enforce unit boundary matching `(q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase() + ':') || new RegExp(`\\b${selectedUnit.unitNumber}\\b`, 'i').test(q.unit))`.
- **`src/components/VocabularyBank.jsx`**:
  - Updated `matchesUnit` filter predicate to enforce colon/word-boundary check on `unitNumberStr`.

---

## 3. Test Suite Enhancements & Build Verification
- **`scripts/testQuestionEngine.mjs`**:
  - Added Section 8 verifying the 5 specific vocabulary fixes (`Hostess`, `Downfall`, `Gilded`, `Hugging`, `Room`).
  - Added Section 9 verifying Unit 1 (46 words) vs Unit 10 (110 words = 74 + 36) filter isolation.
- **Verification Results**:
  - `node scripts/testQuestionEngine.mjs` -> PASS (All 9 test suites passed with 100% success).
  - `npm run build` -> PASS (Vite production build succeeded in 4.05s with 0 errors).
