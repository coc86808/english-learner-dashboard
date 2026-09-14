import { ALL_TEXTBOOKS } from '../src/data/textbooks/index.js';
import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

console.log('Total vocabulary words to process:', hscVocabularyList.length);

let singleUnitWords = 0;
let multiUnitWords = 0;
let exactSentenceMatches = 0;
let fallbackNeeded = 0;

const results = [];

for (const item of hscVocabularyList) {
  const sources = item.sources && item.sources.length > 0 ? item.sources : [item.unit];
  if (sources.length > 1) multiUnitWords++;
  else singleUnitWords++;

  const sentencesFound = [];

  for (const src of sources) {
    const match = src.match(/Unit\s+(\d+)\s*:\s*Lesson\s+(\d+)/i);
    if (!match) continue;

    const key = 'u' + match[1] + '-l' + match[2];
    const tb = ALL_TEXTBOOKS[key];
    if (!tb || !tb.paragraphs) continue;

    let foundSentence = null;
    const wordBase = item.word.toLowerCase().trim();

    // Strategy 1: Exact word boundary match in sentence
    for (const p of tb.paragraphs) {
      const sentences = p.text.match(/[^.!?\n]+[.!?]+/g) || [p.text];
      for (const s of sentences) {
        const cleanS = s.trim().replace(/\s+/g, ' ');
        const wordsInSentence = cleanS.toLowerCase().split(/[^a-z0-9_-]+/);
        if (wordsInSentence.includes(wordBase)) {
          foundSentence = cleanS;
          break;
        }
      }
      if (foundSentence) break;
    }

    // Strategy 2: Lemmatized / stemmed / prefix match
    if (!foundSentence) {
      for (const p of tb.paragraphs) {
        const sentences = p.text.match(/[^.!?\n]+[.!?]+/g) || [p.text];
        for (const s of sentences) {
          const cleanS = s.trim().replace(/\s+/g, ' ');
          const wordsInSentence = cleanS.toLowerCase().split(/[^a-z0-9_-]+/);
          const stemMatch = wordsInSentence.some(w => 
            w.startsWith(wordBase.slice(0, Math.max(4, wordBase.length - 2))) ||
            (wordBase.length > 4 && wordBase.startsWith(w.slice(0, Math.max(4, w.length - 2))))
          );
          if (stemMatch) {
            foundSentence = cleanS;
            break;
          }
        }
        if (foundSentence) break;
      }
    }

    if (foundSentence) {
      foundSentence = foundSentence.trim();
      sentencesFound.push({
        unitTag: src.split('(')[0].trim(),
        fullSource: src,
        sentence: foundSentence
      });
    }
  }

  if (sentencesFound.length === sources.length) {
    exactSentenceMatches++;
  } else {
    fallbackNeeded++;
  }

  // Format the resulting exampleSentence
  let finalExampleSentence = '';
  if (sources.length > 1) {
    // Multi-unit format
    finalExampleSentence = sources.map(src => {
      const match = sentencesFound.find(sf => sf.fullSource === src);
      const tag = src.split('(')[0].trim();
      if (match) {
        return '[' + tag + ']: ' + match.sentence;
      } else {
        return '[' + tag + ']: ' + item.exampleSentence;
      }
    }).join('\n');
  } else {
    // Single unit
    if (sentencesFound.length > 0) {
      finalExampleSentence = sentencesFound[0].sentence;
    } else {
      finalExampleSentence = item.exampleSentence;
    }
  }

  results.push({
    id: item.id,
    word: item.word,
    sourcesCount: sources.length,
    matchedCount: sentencesFound.length,
    originalExample: item.exampleSentence,
    newExample: finalExampleSentence
  });
}

console.log({
  totalWords: hscVocabularyList.length,
  singleUnitWords,
  multiUnitWords,
  exactSentenceMatches,
  fallbackNeeded
});

console.log('\nSample multi-unit word output:');
const multiSample = results.find(r => r.sourcesCount > 1);
if (multiSample) console.log(multiSample);

console.log('\nSample single-unit word output:');
console.log(results[0]);
