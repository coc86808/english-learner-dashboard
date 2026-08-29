# Implementation Change Log: HSC Vocabulary & MCQ Engine Audit

**Agent**: `worker_1` (implementer, qa, specialist)  
**Date**: 2026-08-29  
**Files Modified**:
1. `src/data/questions/hscQuestionsData.js`
2. `src/data/hscUnitsData.js`

---

## 1. Summary of Changes

### A. Vocabulary Data Audited & Corrected (`src/data/questions/hscQuestionsData.js`)
All 156 items in `hscVocabularyList` were reviewed, audited, and corrected:
- **11 words with non-opposable meanings had antonyms safely set to `""`**:
  1. `Chopsticks` (`vocab-28`): Dining utensils do not have antonyms. (Removed `"Fork, Spoon, Knife"`).
  2. `Twig` (`vocab-u1-l1-39`): Botanical parts do not have polar opposites. (Removed `"Trunk, tree base, root"`).
  3. `Scripture` (`vocab-u1-l1-32`): Religious texts do not have polar opposites. (Removed `"Secular book, worldly writings"`).
  4. `Personnel` (`vocab-u1-l1-27`): Workforce/staff is not the opposite of management. (Removed `"Management, leadership"`).
  5. `Percussion` (`vocab-u1-l1-29`): Instrument category has no antonym. (Removed `"Silence, quiet"`).
  6. `Utensils` (`vocab-47`): Concrete implements do not have antonyms. (Removed `"Bare hands"`).
  7. `Grocery` (`vocab-u10-l2-17`): Commodities/foodstuff do not have antonyms. (Removed `"Luxury items, non-essentials"`).
  8. `Cheek` (`vocab-76`): Anatomical body parts do not have antonyms. (Removed `"Forehead, Chin"`).
  9. `Cue` (`vocab-u10-15`): Prompt/signal has no opposite noun. (Removed `"Nowhere, Blindness"`).
  10. `Gristle` (`vocab-u10-22`): Cartilage tissue has no antonym. (Removed `"Tender meat, Soft flesh"`).
  11. `Gravy` (`vocab-u10-24`): Meat sauce has no antonym. (Removed `"Dry seasoning"`).

- **Critical Part-of-Speech (POS) & Semantic Fixes**:
  - `Apathy` (`vocab-u10-l2-01`, Noun): Synonym changed from `"Indifferent"` (Adjective) to `"Indifference, unconcern, disinterest, detachment"`.
  - `Investigation` (`vocab-u10-l2-20`, Noun): Bengali corrected from verb `"তদন্ত করা"` to `"তদন্ত / অনুসন্ধান / নিরীক্ষা"`. Synonym changed from verb phrase `"Inquire into"` to `"Inquiry, examination, probe, scrutiny, inspection"`. Antonyms changed from verbs `"Ignore, overlook"` to nouns `"Neglect, disregard, oversight, ignorance"`.
  - `Pace` (`vocab-u1-l1-28`, Noun): Removed invalid antonym `"Delinquency"` and replaced with `"Sluggishness, slowness, standstill"`.
  - `Thrust` (`vocab-u1-l1-41`, Verb): Removed invalid antonym `"Plop"` and replaced with `"Withdraw, extract, pull back, retract"`.
  - `Unlettered` (`vocab-u1-l1-43`, Adjective): Fixed erroneous Bengali meaning `"বর্ণহীন"` (colorless) to `"নিরক্ষর / অশিক্ষিত / বিদ্যাবুদ্ধিহীন"`.
  - `Flourish` (`vocab-u1-l1-11`, Verb): Fixed noun antonym `"Downturn"` to verbs `"Wither, decline, languish, fail"`.
  - `Polish` (`vocab-u1-l1-30`, Verb): Fixed noun antonym `"Dullness"` to verbs `"Tarnish, dull, blemish, dirty"`.
  - `Flutter` (`vocab-u1-l1-13`, Verb): Fixed adjective antonyms `"Steady, quiet"` to verbs `"Settle, freeze, stay still"`.
  - `Exquisite` (`vocab-u1-l1-09`): Removed non-synonym `"Exclusive"` and replaced with `"Splendid, magnificent, elegant, superb"`.
  - `Concerned` (`vocab-u10-10`): Replaced erroneous antonym `"Fascinated"` with `"Unconcerned, Indifferent, Carefree, Apathetic"`.
  - `Conscientious` (`vocab-u10-11`): Prioritized standard antonym `"Careless, Irresponsible, Negligent"`.
  - `Caveman` (`vocab-u10-04`, Noun): Replaced adjective synonyms `"Primitive, Brutal"` with nouns `"Cave-dweller, Barbarian, Troglodyte"`.
  - `Gulp` (`vocab-u10-25`, Verb): Replaced noun synonym `"Mouthful"` with verbs `"Swallow, Guzzle, Quaff"`.
  - `Lack` (`vocab-u10-34`, Noun): Replaced mixed verb set with pure noun sets (`"Shortage, Deficiency"` / `"Abundance, Plenty"`).
  - `Puff up` (`vocab-u10-42`, Verb phrase): Corrected synonym `"Bulk"` to `"Inflate, Swell, Expand"` and antonym `"Squeeze"` to `"Deflate, Shrink"`.
  - `Nod` (`vocab-u10-38`, Verb): Replaced nonsensical antonym `"Recede"` with `"Shake head, Refuse"`.
  - `Maintain` (`vocab-u10-36`): Fixed duplicate Bengali text `"বজায় রাখা / সংরক্ষণ করা / বজায় রাখা"` -> `"বজায় রাখা / সংরক্ষণ করা / অব্যাহত রাখা"`.
  - `Workmanship` (`vocab-u1-l1-46`): Fixed Bengali typo `"কারিগেরি"` -> `"কারিগরি"`.
  - `Folly` (`vocab-u1-l1-14`): Fixed Bengali typo `"বোকামী"` -> `"বোকামি"`.
  - Standardized all Bengali definitions to use clean `/` separators for optimal MCQ distractor splitting.

---

### B. MCQ Engine Guard Clauses & Distractor Safety (`buildQuestionsDatabase`)
1. **Dynamic Question Skipping**:
   - Synonym questions are generated only if `primarySyn` is present and non-empty.
   - Antonym questions are generated only if `primaryAnt` is present and non-empty.
   - Meaning in English questions are generated only if `englishMeaning` is present and non-empty.
   - Meaning in Bangla questions are generated only if `bengaliMeaning` is present and non-empty.
2. **Zero-Empty-Option Invariant**:
   - In Synonym questions, if `primaryAnt` is empty (`""`), Option 2 safely falls back to `distractorWord3` rather than inserting a blank string.
   - In Antonym questions, if `primarySyn` is empty, Option 2 safely falls back to `distractorWord3`.
   - Every question is guaranteed to have exactly 4 valid, non-empty options with `correctOption: 0`.

---

### C. Curriculum Metadata Synchronization (`src/data/hscUnitsData.js`)
- Unit 1 Lesson 1 (`u1-l1`): Updated `questionsCount` from `'১৮৪ টি প্রশ্ন'` to `'১৮০ টি প্রশ্ন'` (46 words × 4 − 4 empty antonyms = 180 questions).
- Unit 10 Lesson 1 (`u10-l1`): Updated `questionsCount` from `'২৯৬ টি প্রশ্ন'` to `'২৯০ টি প্রশ্ন'` (74 words × 4 − 6 empty antonyms = 290 questions).
- Unit 10 Lesson 2 (`u10-l2`): Updated `questionsCount` from `'১৪৪ টি প্রশ্ন'` to `'১৪৩ টি প্রশ্ন'` (36 words × 4 − 1 empty antonym = 143 questions).
- Total questions generated dynamically: **613 MCQs**.
- Total vocabulary words: **156 words**.

---

## 2. Verification Commands & Results

1. **Test Suite Verification**:
   - Command: `node scripts/testQuestionEngine.mjs`
   - Result: 100% tests passed.
   - Zero empty options across all 613 questions.
   - Exact counts: U1-L1 (180), U10-L1 (290), U10-L2 (143).
   - Category filtering and smart interleaving fully operational.

2. **Production Build Verification**:
   - Command: `npm run build`
   - Result: Built in 11.17s with 0 errors.
