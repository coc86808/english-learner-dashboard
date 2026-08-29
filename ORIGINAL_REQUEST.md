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
