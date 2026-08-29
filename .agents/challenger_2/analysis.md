# Challenger 2 — Empirical Verification & Adversarial Stress Test Analysis

## 1. Executive Summary

| Category | Status | Details |
|---|---|---|
| **Production Build (`npm run build`)** | **PASS ✅** | Vite build finished cleanly with 0 errors (Exit code 0, 1860 modules transformed). |
| **MCQ Generation Engine** | **PASS ✅** | Safely skips empty fields; 613 board-standard questions generated (156 Synonyms, 145 Antonyms, 156 English Meaning, 156 Bangla Meaning). 0 duplicate/empty options. |
| **Empty Antonym Skip Handling** | **PASS ✅** | Exactly 11 non-antonym nouns correctly set to `""` and cleanly bypassed by the generator. |
| **Curriculum Data Synchronization** | **PASS ✅** | `src/data/hscUnitsData.js` matches exact counts: Unit 1 L1 (46 words, 180 questions / `১৮০ টি প্রশ্ন`), Unit 10 L1 (74 words, 290 questions / `২৯০ টি প্রশ্ন`), Unit 10 L2 (36 words, 143 questions / `১৪৩ টি প্রশ্ন`). All other units 0 / `০ টি প্রশ্ন`. |
| **Deduplication Check** | **FAIL ❌** | 2 duplicate words found across `hscVocabularyList`: `Gesture` and `Scatter`. |
| **Flashcards Explorer Filtering** | **FAIL ❌** | Substring collision in `FlashcardsExplorer.jsx`: `item.unit.includes("Unit 1")` matches all Unit 10 items (`"Unit 10"` contains `"Unit 1"`), causing the Unit 1 filter to load all 156 words instead of 46. |
| **Overall Verdict** | **REQUEST_CHANGES ❌** | Actionable bug fixes required for Deduplication and Flashcards Explorer filtering. |

---

## 2. Test Execution & Empirical Results

### Test Suite 1: Deduplication & Vocabulary Data Structure Integrity

**Test Script**: `scripts/empiricalChallengerTest.mjs` & `scripts/checkDuplicates.mjs`

```javascript
// Verification logic for word uniqueness
const wordSet = new Set();
const duplicateWords = [];
hscVocabularyList.forEach((item, idx) => {
  const normWord = item.word.trim().toLowerCase();
  if (wordSet.has(normWord)) {
    duplicateWords.push({ word: item.word, index: idx, id: item.id, unit: item.unit });
  } else {
    wordSet.add(normWord);
  }
});
```

**Observed Output**:
```
Total vocabulary items: 156
Unique IDs count: 156 / 156
Unique Words count: 154 / 156
Deduplication Status: FAIL ❌
```

**Duplicate Details**:
1. **Word "Gesture"**:
   - Instance 1: Index 66, ID: `vocab-44`, Unit: `Unit 10: Lesson 1 (Manners Around the World)`
     - *Meaning*: `"অঙ্গভঙ্গি / মনোভাব প্রকাশের শারীরিক বা আচরণিক ভঙ্গি"`
   - Instance 2: Index 85, ID: `vocab-u10-l2-15`, Unit: `Unit 10: Lesson 2 (Etiquette Netquette)`
     - *Meaning*: `"ইশারা বা ইঙ্গিত / শারীরিক অঙ্গভঙ্গি"`
2. **Word "Scatter"**:
   - Instance 1: Index 99, ID: `vocab-u10-l2-29`, Unit: `Unit 10: Lesson 2 (Etiquette Netquette)`
     - *Meaning*: `"ছড়িয়ে পড়া / চারদিকে ছিটকে যাওয়া"`
   - Instance 2: Index 155, ID: `vocab-u10-46`, Unit: `Unit 10: Lesson 1 (Manners Around the World)`
     - *Meaning*: `"ছড়িয়ে দেওয়া / ছিটানো / ইতস্তত বিক্ষিপ্ত করা"`

---

### Test Suite 2: Flashcards Explorer Filtering Collision

**Test Script**: `scripts/empiricalChallengerTest.mjs`

**Observation in `src/components/FlashcardsExplorer.jsx` (Lines 45-51)**:
```javascript
if (selectedLessonId === 'u1-l1') {
  list = hscVocabularyList.filter(item => item.unit.includes("Unit 1") || item.unit.includes("The Parrot's Tale"));
} else if (selectedLessonId === 'u10-l1') {
  list = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
} else if (selectedLessonId === 'u10-l2') {
  list = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));
}
```

**Flaw Analysis**:
- In JavaScript, `"Unit 10: Lesson 1 (Manners Around the World)".includes("Unit 1")` returns `true`.
- When the user selects `u1-l1` ("Unit 1: The Parrot's Tale"), the filter matches ALL items in Unit 1 AND ALL items in Unit 10 Lesson 1 and Lesson 2 (returning 156 items instead of 46 items).
- When simulating the exact UI selection `u1-l1`:
  - Expected: 46 cards
  - Actual: 156 cards

**Mitigation**:
Change line 46 to:
```javascript
list = hscVocabularyList.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
```

---

### Test Suite 3: MCQ Generation Engine & Distractor Safety

**Test Script**: `scripts/deepStressTest.mjs`

**Execution Output**:
```
Total generated questions: 613
- Synonym Questions: 156 (100% of words with synonyms)
- Antonym Questions: 145 (156 - 11 words with empty antonyms = 145)
- English Meaning Questions: 156
- Bangla Meaning Questions: 156
- Questions with duplicate options: 0
- Questions with empty/blank options: 0
- Questions with invalid correctOption index: 0
- Smart interleaver execution: PASS (maintains 613 items without errors)
```

**11 Words with Intentionally Empty Antonyms (Safe Skip Verified)**:
1. `[vocab-u1-l1-27]` Personnel (Noun) — Unit 1 L1
2. `[vocab-u1-l1-29]` Percussion (Noun) — Unit 1 L1
3. `[vocab-u1-l1-32]` Scripture (Noun) — Unit 1 L1
4. `[vocab-u1-l1-39]` Twig (Noun) — Unit 1 L1
5. `[vocab-28]` Chopsticks (Noun) — Unit 10 L1
6. `[vocab-47]` Utensils (Noun) — Unit 10 L1
7. `[vocab-u10-l2-17]` Grocery (Noun) — Unit 10 L2
8. `[vocab-76]` Cheek (Noun) — Unit 10 L1
9. `[vocab-u10-15]` Cue (Noun) — Unit 10 L1
10. `[vocab-u10-22]` Gristle (Noun) — Unit 10 L1
11. `[vocab-u10-24]` Gravy (Noun) — Unit 10 L1

All 11 words cleanly generated 3 MCQs instead of 4, correctly skipping the Antonym question without throwing undefined reference or breaking option structures.

---

### Test Suite 4: Curriculum Data Synchronization

**Test Script**: `scripts/detailedInspection.mjs`

| Unit / Lesson | Vocabulary Count | Questions Count | `hscUnitsData.js` Word Count | `hscUnitsData.js` Question Text | Status |
|---|---|---|---|---|---|
| **Unit 1: Education and Life** | **46** | **180** | `totalWords: 46` | - | PASS ✅ |
| └ Lesson 1: The Parrot's Tale | 46 | 180 | `wordsCount: 46` | `"১৮০ টি প্রশ্ন"` | PASS ✅ |
| └ Lessons 2–4 | 0 | 0 | `wordsCount: 0` | `"০ টি প্রশ্ন"` | PASS ✅ |
| **Unit 10: Lifestyle** | **110** | **433** | `totalWords: 110` | - | PASS ✅ |
| └ Lesson 1: Manners Around the World | 74 | 290 | `wordsCount: 74` | `"২৯০ টি প্রশ্ন"` | PASS ✅ |
| └ Lesson 2: Etiquette Netiquette | 36 | 143 | `wordsCount: 36` | `"১৪৩ টি প্রশ্ন"` | PASS ✅ |
| └ Lessons 3–5 | 0 | 0 | `wordsCount: 0` | `"০ টি প্রশ্ন"` | PASS ✅ |
| **Units 2–9, 11–14** | 0 | 0 | `totalWords: 0` | `"০ টি প্রশ্ন"` | PASS ✅ |
| **Grand Total** | **156** | **613** | **156** | **613** | **MATCH ✅** |

---

### Test Suite 5: Production Build Verification

**Command**: `npm run build`

**Terminal Output**:
```
> english-learner-dashboard@1.0.0 build
> vite build

vite v6.4.3 building for production...
transforming...
✓ 1860 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.06 kB │ gzip:   0.62 kB
dist/assets/index-BijkI9zW.css   84.36 kB │ gzip:  12.65 kB
dist/assets/index-9xH_94mI.js   613.04 kB │ gzip: 161.39 kB
✓ built in 3.91s
```
Production build succeeded with 0 errors.

---

## 3. Summary of Findings & Actionable Recommendations

1. **Fix FlashcardsExplorer.jsx filter**:
   - Change `item.unit.includes("Unit 1")` to `item.unit.includes("Unit 1:")` (or `item.unit.startsWith("Unit 1:")`).
2. **Resolve Deduplication for "Gesture" and "Scatter"**:
   - Review Unit 10 Lesson 1 vs Unit 10 Lesson 2 to ensure either unique words are used or deduplication notification rule is adhered to.
