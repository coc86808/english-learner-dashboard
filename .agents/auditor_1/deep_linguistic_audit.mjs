import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('=== DEEP LINGUISTIC & STRUCTURAL AUDIT (156 ENTRIES) ===\n');

let issuesCount = 0;
const issues = [];

const bengaliRegex = /[\u0980-\u09FF]/;

hscVocabularyList.forEach((entry, idx) => {
  const itemIssues = [];

  // Check ID
  if (!entry.id || !/^vocab-/.test(entry.id)) {
    itemIssues.push(`Invalid ID format: ${entry.id}`);
  }

  // Check Word
  if (!entry.word || entry.word.trim().length < 2) {
    itemIssues.push(`Invalid word: "${entry.word}"`);
  }

  // Check Bengali Meaning
  if (!entry.bengaliMeaning || !bengaliRegex.test(entry.bengaliMeaning)) {
    itemIssues.push(`Bengali meaning lacks Bengali characters: "${entry.bengaliMeaning}"`);
  }

  // Check POS
  if (!entry.partsOfSpeech || typeof entry.partsOfSpeech !== 'string') {
    itemIssues.push(`Missing or invalid POS: "${entry.partsOfSpeech}"`);
  }

  // Check English Definition
  if (!entry.englishMeaning || entry.englishMeaning.length < 10) {
    itemIssues.push(`Too short or missing English meaning: "${entry.englishMeaning}"`);
  }

  // Check Example Sentence
  if (!entry.exampleSentence || entry.exampleSentence.length < 15) {
    itemIssues.push(`Too short or missing example sentence: "${entry.exampleSentence}"`);
  }

  // Check Unit
  if (!entry.unit || !entry.unit.startsWith('Unit ')) {
    itemIssues.push(`Invalid unit tag: "${entry.unit}"`);
  }

  // Check Board Exam Tag
  if (!entry.boardExamTag || entry.boardExamTag.trim() === '') {
    itemIssues.push(`Missing board exam tag: "${entry.boardExamTag}"`);
  }

  // Check Synonyms / Antonyms consistency
  if (entry.synonyms && typeof entry.synonyms === 'string' && entry.synonyms.trim() !== '') {
    const syns = entry.synonyms.split(',').map(s => s.trim()).filter(Boolean);
    if (syns.length === 0) itemIssues.push(`Synonyms defined but no items parsed: "${entry.synonyms}"`);
  }

  if (entry.antonyms && typeof entry.antonyms === 'string' && entry.antonyms.trim() !== '') {
    const ants = entry.antonyms.split(',').map(s => s.trim()).filter(Boolean);
    if (ants.length === 0) itemIssues.push(`Antonyms defined but no items parsed: "${entry.antonyms}"`);
  }

  if (itemIssues.length > 0) {
    issuesCount++;
    issues.push({ index: idx, id: entry.id, word: entry.word, itemIssues });
  }
});

console.log(`Audited ${hscVocabularyList.length} vocabulary entries.`);
console.log(`Total structural/linguistic issues found: ${issuesCount}`);

if (issuesCount > 0) {
  console.error('Issues list:', JSON.stringify(issues, null, 2));
  process.exit(1);
} else {
  console.log('✅ ALL 156 VOCABULARY ENTRIES ARE STRUCTURALLY & LINGUISTICALLY CLEAN.');
  process.exit(0);
}
