# Comprehensive Quality & Adversarial Review Report

**Agent**: `reviewer_1` (roles: reviewer, critic)  
**Date**: 2026-08-29  
**Target Subject**: HSC Vocabulary & MCQ Engine Audit (`src/data/questions/hscQuestionsData.js`, `src/data/hscUnitsData.js`)  
**Scope**: 156 Vocabulary Items, 613 Board-Standard MCQs, Generator Guard Clauses, Curriculum Counts  

---

## 1. Quality Review Summary

**Verdict**: **REQUEST_CHANGES**

While `worker_1` executed substantial, high-quality improvements across the 156 vocabulary entries, fixed numerous part-of-speech mismatches, added generator guard clauses, and accurately updated curriculum counts, a deep lexical and adversarial audit revealed **1 Critical defect** (a tautological primary synonym causing an invalid MCQ question where the correct answer is the question word itself) and **2 Major data anomalies** (redundant self-referential words in synonyms lists) that must be resolved before final production release.

---

## 2. Findings

### [Critical] Finding 1: Tautological Primary Synonym for `Hostess` (`vocab-34`)
- **What**: The primary synonym of `Hostess` is defined as `"Hostess"`.
- **Where**: `src/data/questions/hscQuestionsData.js`, line 795 (`vocab-34`).
- **Why**: In `buildQuestionsDatabase()`, `primarySyn` is extracted as `synList[0]` (`"Hostess"`). Consequently, the auto-generated MCQ for question `hsc-u10-l1-57-syn` is:
  - *Question Text*: `What is the closest SYNONYM of the word "Hostess"?`
  - *Option A (Correct)*: `"Hostess"`
  - *Option B*: `"Guest"`
  - *Option C*: `[Distractor Word]`
  - *Option D*: `[Distractor Word]`
  This creates an invalid tautological question where a word is its own correct synonym.
- **Suggestion**: Update `synonyms` in `vocab-34` from `"Hostess, Welcomer, Entertainer, Lady host"` to `"Welcomer, Entertainer, Lady host, Keeper"`.

---

### [Major] Finding 2: Self-Referential Sub-Synonyms in Vocabulary Entries
- **What**: The vocabulary words `Downfall` and `Gilded` include their exact target words within their own `synonyms` comma-separated strings.
- **Where**:
  1. `vocab-u1-l1-08` (`Downfall`, line 109): `synonyms: "Ruin, collapse, downfall, degradation"` (contains `"downfall"`).
  2. `vocab-u1-l1-15` (`Gilded`, line 207): `synonyms: "Gold-plated, golden, ornate, gilded"` (contains `"gilded"`).
- **Why**: While their `primarySyn` is safe (`"Ruin"` and `"Gold-plated"`), the full synonym string is rendered on the flashcards UI and explanation drawers, presenting circular and redundant definitions to students.
- **Suggestion**:
  - For `Downfall` (`vocab-u1-l1-08`), replace `"downfall"` with `"demise"`: `"Ruin, collapse, demise, degradation"`.
  - For `Gilded` (`vocab-u1-l1-15`), replace `"gilded"` with `"embellished"`: `"Gold-plated, golden, ornate, embellished"`.

---

### [Minor] Finding 3: Minor Bengali Meaning & Formatting Inconsistencies
- **What**:
  - `vocab-u10-27` (`Hugging`): `partsOfSpeech` is `Noun`, but `bengaliMeaning` uses purely verbal infinitive forms (`"আলিঙ্গন করা / বুকে জড়িয়ে ধরা"`).
  - `vocab-u10-l2-27` (`Room`): `bengaliMeaning` contains a comma separator (`"জায়গা, স্থান / পরিসর"`) instead of uniform slashes (`/`).
- **Where**:
  - `src/data/questions/hscQuestionsData.js`, line 1648 (`vocab-u10-27`).
  - `src/data/questions/hscQuestionsData.js`, line 1178 (`vocab-u10-l2-27`).
- **Why**: Clean slash separators ensure predictable splitting when the MCQ generator creates Bengali distractors via `.split('/')[0].trim()`.
- **Suggestion**:
  - Update `vocab-u10-27` (`Hugging`) to: `"আলিঙ্গন / কোলাকুলি / জড়িয়ে ধরা"`.
  - Update `vocab-u10-l2-27` (`Room`) to: `"জায়গা / স্থান / পরিসর"`.

---

## 3. Adversarial Review & Challenge Report

**Overall Risk Assessment**: **MEDIUM** (contained to specific vocabulary data points; engine architecture is robust).

### [High] Challenge 1: Self-Referential Question Generation Attack
- **Assumption Challenged**: Upstream worker assumed all `synList[0]` items in `hscVocabularyList` are valid distinct synonyms.
- **Attack Scenario**: Audited all 156 items programmatically by comparing `item.word.toLowerCase()` against `synList[0].toLowerCase()`.
- **Result**: `vocab-34` (`Hostess`) failed with exact equality (`"hostess" === "hostess"`), resulting in an invalid MCQ.
- **Mitigation**: Correct `vocab-34` synonym definition and optionally add a runtime filter in `buildQuestionsDatabase()`:
  `const synList = item.synonyms ? item.synonyms.split(',').map(s => s.trim()).filter(s => s && s.toLowerCase() !== item.word.toLowerCase()) : [];`

### [Medium] Challenge 2: Option Collision & Distractor Overlap Stress Test
- **Assumption Challenged**: Distractor offsets `(index + 3)`, `(index + 7)`, `(index + 11)` might produce duplicate options if distractor words match `primarySyn` or `primaryAnt`.
- **Stress Test**: Evaluated all 613 generated MCQs for option set uniqueness (`new Set(options).size === 4`).
- **Result**: **0 collisions across all 613 questions** (PASS). All option sets have exactly 4 unique choices.

### [Low] Challenge 3: Antonym Skip Invariant & Empty Option Stress Test
- **Assumption Challenged**: In Synonym/Antonym questions where `primaryAnt` is `""`, fallback to `distractorWord3` might fail or leave empty strings.
- **Stress Test**: Iterated through all 613 questions checking `opt === ""` or `opt === undefined`.
- **Result**: **0 empty options** (PASS). 100% of questions have 4 populated strings and `correctOption === 0`.

---

## 4. Verified Claims

| Upstream Claim | Verification Method | Status | Details |
|---|---|---|---|
| 156 total vocabulary words | Programmatic array length check | **PASS** | `hscVocabularyList.length === 156` |
| 11 words with non-opposable antonyms set to `""` | Filter on `!item.antonyms` | **PASS** | Exact 11 words verified (`Personnel`, `Percussion`, `Scripture`, `Twig`, `Chopsticks`, `Utensils`, `Grocery`, `Cheek`, `Cue`, `Gristle`, `Gravy`) |
| 613 total questions generated | Execution of `buildQuestionsDatabase()` | **PASS** | 180 (U1-L1) + 290 (U10-L1) + 143 (U10-L2) = 613 MCQs |
| Curriculum synchronization in `hscUnitsData.js` | Inspect `hscUnits` lesson metadata | **PASS** | Exact match: `'১৮০ টি প্রশ্ন'`, `'২৯০ টি প্রশ্ন'`, `'১৪৩ টি প্রশ্ন'` |
| Zero empty options in all generated MCQs | Automated iteration across 613 items | **PASS** | All options non-empty, strings trimmed |
| Production build succeeds | `npm run build` | **PASS** | Built cleanly in 6.41s with 0 errors |

---

## 5. Coverage Gaps & Unverified Items

- **Coverage Gaps**: None. All 156 vocabulary entries, all 613 generated MCQs, and all lesson metadata entries were examined.
- **Unverified Items**: None. Full end-to-end automated and manual validation completed.
