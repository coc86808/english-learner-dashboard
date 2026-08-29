const fs = require('fs');
const content = fs.readFileSync('src/data/questions/hscQuestionsData.js', 'utf8');

// Parse the vocabulary list
const vocabRegex = /\{[^}]*"id":\s*"(vocab-[^"]+)"[^}]*"word":\s*"([^"]+)"[^}]*"synonyms":\s*"([^"]*)"[^}]*"antonyms":\s*"([^"]*)"/gs;
const entries = [];
let match;

// Simpler approach - get all words and their synonyms/antonyms
const lines = content.split('\n');
let currentEntry = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.includes('"id": "vocab-')) {
    currentEntry = { id: line.match(/"id":\s*"([^"]+)"/)[1] };
  } else if (line.includes('"word":') && currentEntry.id) {
    const m = line.match(/"word":\s*"([^"]+)"/);
    if (m) currentEntry.word = m[1];
  } else if (line.includes('"synonyms":') && currentEntry.id) {
    const m = line.match(/"synonyms":\s*"([^"]*)"/);
    if (m) currentEntry.synonyms = m[1];
  } else if (line.includes('"antonyms":') && currentEntry.id) {
    const m = line.match(/"antonyms":\s*"([^"]*)"/);
    if (m) {
      currentEntry.antonyms = m[1];
      entries.push({ ...currentEntry });
      currentEntry = {};
    }
  }
}

console.log('Total words found:', entries.length);
console.log('');

const emptySyn = entries.filter(e => !e.synonyms || e.synonyms.trim() === '');
const emptyAnt = entries.filter(e => !e.antonyms || e.antonyms.trim() === '');

console.log('Words with EMPTY synonyms (' + emptySyn.length + '):');
emptySyn.forEach(e => console.log('  -', e.word, '(', e.id, ')'));

console.log('');
console.log('Words with EMPTY antonyms (' + emptyAnt.length + '):');
emptyAnt.forEach(e => console.log('  -', e.word, '(', e.id, ')'));

// Also show words with potentially problematic synonyms/antonyms (very short)
const shortSyn = entries.filter(e => e.synonyms && e.synonyms.trim().length < 5);
const shortAnt = entries.filter(e => e.antonyms && e.antonyms.trim().length < 5);

console.log('');
console.log('Words with very short synonyms (<5 chars) (' + shortSyn.length + '):');
shortSyn.forEach(e => console.log('  -', e.word, ':', e.synonyms));

console.log('');
console.log('Words with very short antonyms (<5 chars) (' + shortAnt.length + '):');
shortAnt.forEach(e => console.log('  -', e.word, ':', e.antonyms));
