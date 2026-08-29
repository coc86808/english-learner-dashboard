# Project: HSC Vocabulary & MCQ Engine Audit and Correction

## Architecture
- `src/data/questions/hscQuestionsData.js`: Central repository of `hscVocabularyList` (156 entries) and the dynamic MCQ generation function `generateHscQuestions()`.
- `src/data/hscUnitsData.js`: Curriculum unit definitions with `wordsCount`, `totalWords`, and `questionsCount` (Bengali numerals).
- `src/components/FlashcardsExplorer.jsx`: Vocabulary explorer component.
- `scripts/`: Verification scripts and helper tools.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Vocabulary Audit (156 entries) | Verify Bengali meanings against standard/Google Translate; verify synonyms and antonyms for HSC standard | M1 | ORIGINAL_REQUEST |
| 2 | MCQ Engine Safe Skip | If synonyms or antonyms are empty strings `""`, ensure `generateHscQuestions()` cleanly skips generating those question types without breaking counts or throwing errors | M1 | ORIGINAL_REQUEST |
| 3 | Data Correction & Polish | Correct all invalid Bengali meanings, wrong synonyms/antonyms in `src/data/questions/hscQuestionsData.js` | M1 | ORIGINAL_REQUEST |
| 4 | Curriculum Sync | Synchronize `src/data/hscUnitsData.js` and `FlashcardsExplorer.jsx` if question/word counts are adjusted | M1 | AGENTS.md / GEMINI.md |
| 5 | Build & Test Verification | Run `npm run build` with 0 errors and test the MCQ generation output | M1 | ORIGINAL_REQUEST |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | HSC Vocabulary Audit & Correction | Comprehensive audit of 156 entries, engine skip support, data updates, build verification | none | DONE |

## Interface Contracts
### `hscVocabularyList` Entry Format
```javascript
{
  id: "...",
  word: "...",
  partOfSpeech: "noun|verb|adjective|adverb|...",
  bengaliMeaning: "...", // Accurate Bengali meaning
  primarySynonym: "...", // Standard synonym or "" if none
  secondarySynonym: "...", // Secondary synonym or ""
  primaryAntonym: "...", // Standard antonym or "" if none
  secondaryAntonym: "...", // Secondary antonym or ""
  englishDefinition: "...",
  exampleSentence: "...",
  boardExam: "..."
}
```

### `generateHscQuestions()` Contract
- For each vocabulary item:
  - If `primarySynonym` is present and non-empty, generate Synonym Question.
  - If `primaryAntonym` is present and non-empty, generate Antonym Question.
  - If `englishDefinition` is present and non-empty, generate English Definition Question.
  - If `bengaliMeaning` is present and non-empty, generate Bengali Meaning Question.
- If any field is `""`, gracefully skip question creation for that specific type.

## Code Layout
- `src/data/questions/hscQuestionsData.js`
- `src/data/hscUnitsData.js`
- `src/components/FlashcardsExplorer.jsx`
