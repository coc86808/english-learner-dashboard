import fs from 'fs';
import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

console.log('Loaded words from hscVocabularyList:', hscVocabularyList.length);

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

// Headers requested by user: Word, Bengali Meaning, Synonyms, Antonyms, English Definition, Example Sentence, Unit.( lesson)
const headers = [
  'Word',
  'Bengali Meaning',
  'Synonyms',
  'Antonyms',
  'English Definition',
  'Example Sentence',
  'Unit (Lesson)'
];

const rows = [headers.join(',')];

for (const item of hscVocabularyList) {
  const row = [
    escapeCsv(item.word || ''),
    escapeCsv(item.bengaliMeaning || item.bengali_meaning || ''),
    escapeCsv(item.synonyms || ''),
    escapeCsv(item.antonyms || ''),
    escapeCsv(item.englishMeaning || item.english_meaning || ''),
    escapeCsv(item.exampleSentence || item.example_sentence || ''),
    escapeCsv(item.unit || '')
  ];
  rows.push(row.join(','));
}

fs.writeFileSync('public/hsc_vocabulary_all_words.csv', rows.join('\r\n'), 'utf8');
console.log('Successfully created public/hsc_vocabulary_all_words.csv with', hscVocabularyList.length, 'words!');
