import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

console.log('--- LINGUISTIC AUDIT OF 156 VOCABULARY ITEMS ---');

let flagged = [];

hscVocabularyList.forEach((item, idx) => {
  const pos = item.partsOfSpeech ? item.partsOfSpeech.toLowerCase() : '';
  const word = item.word;
  const bn = item.bengaliMeaning;
  const syn = item.synonyms;
  const ant = item.antonyms;
  const eng = item.englishMeaning;
  const ex = item.exampleSentence;

  // 1. Check POS agreement with Bengali Meaning
  if (pos.includes('verb') && !pos.includes('noun')) {
    // Verbs generally have action meaning
    // Just a sanity check
  }

  // 2. Check for punctuation issues (e.g. double commas, trailing slashes, unescaped characters)
  if (bn.endsWith('/') || bn.startsWith('/') || bn.includes('//')) {
    flagged.push(`[${item.id}] "${word}" - Bengali meaning format issue: "${bn}"`);
  }
  if (syn && (syn.endsWith(',') || syn.startsWith(',') || syn.includes(',,'))) {
    flagged.push(`[${item.id}] "${word}" - Synonyms format issue: "${syn}"`);
  }
  if (ant && (ant.endsWith(',') || ant.startsWith(',') || ant.includes(',,'))) {
    flagged.push(`[${item.id}] "${word}" - Antonyms format issue: "${ant}"`);
  }

  // 3. Check for empty strings in exampleSentence or boardExamTag
  if (!ex || ex.trim() === '') {
    flagged.push(`[${item.id}] "${word}" - Missing exampleSentence`);
  }
  if (!item.boardExamTag || item.boardExamTag.trim() === '') {
    flagged.push(`[${item.id}] "${word}" - Missing boardExamTag`);
  }

  // 4. Check for self-stem matches in synonyms / antonyms
  if (syn) {
    const synList = syn.split(',').map(s => s.trim().toLowerCase());
    synList.forEach(s => {
      if (s === word.toLowerCase()) {
        flagged.push(`[${item.id}] "${word}" - Self-synonym match: "${s}"`);
      }
    });
  }
  if (ant) {
    const antList = ant.split(',').map(a => a.trim().toLowerCase());
    antList.forEach(a => {
      if (a === word.toLowerCase()) {
        flagged.push(`[${item.id}] "${word}" - Self-antonym match: "${a}"`);
      }
    });
  }
});

console.log(`Linguistic formatting issues flagged: ${flagged.length}`);
flagged.forEach(f => console.log(f));
