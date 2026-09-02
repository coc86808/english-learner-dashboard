import fs from 'fs';

const filePath = './src/data/questions/hscQuestionsData.js';

let fileContent = fs.readFileSync(filePath, 'utf8');

const antonymUpdates = {
  'vocab-28': 'Bare hands, fingers, eating by hands',
  'vocab-47': 'Bare hands, fingers, unassisted hands',
  'vocab-u10-l2-17': 'Non-food merchandise, luxury durable goods',
  'vocab-76': 'Handshake, forehead, hand greeting',
  'vocab-u10-15': 'Deterrence, dissuasion, impediment',
  'vocab-u10-22': 'Tender meat, soft fillet, lean cut',
  'vocab-u10-24': 'Dry roast, brothless food, solid dish'
};

// Import existing module
import('../src/data/questions/hscQuestionsData.js').then((m) => {
  const list = m.hscVocabularyList;

  // Build lookup map of all words
  const wordMap = new Map();
  list.forEach((item) => {
    const key = item.word.toLowerCase().trim();
    if (!wordMap.has(key)) {
      wordMap.set(key, item);
    }
  });

  // Update antonyms and recalculate cross references
  let updatedCount = 0;
  const enrichedList = list.map((item) => {
    let antonyms = item.antonyms;
    if (antonymUpdates[item.id]) {
      antonyms = antonymUpdates[item.id];
      updatedCount++;
    }

    const wordKey = item.word.toLowerCase().trim();
    const synList = (item.synonyms || '')
      .split(',')
      .map((s) => s.toLowerCase().trim())
      .filter((s) => s.length > 0 && s !== wordKey);

    const antList = (antonyms || '')
      .split(',')
      .map((a) => a.toLowerCase().trim())
      .filter((a) => a.length > 0 && a !== wordKey);

    const matchedSynonyms = synList.filter((s) => wordMap.has(s));
    const matchedAntonyms = antList.filter((a) => wordMap.has(a));
    const isCrossReferenced = matchedSynonyms.length > 0 || matchedAntonyms.length > 0;

    const sources = item.sources || [item.unit || 'General HSC'];

    return {
      ...item,
      antonyms,
      sources,
      isCrossReferenced,
      crossReferencedWords: [...new Set([...matchedSynonyms, ...matchedAntonyms])],
      crossRefMatchCount: matchedSynonyms.length + matchedAntonyms.length,
      crossRefSynonyms: matchedSynonyms,
      crossRefAntonyms: matchedAntonyms,
      priority: isCrossReferenced ? 100 + (matchedSynonyms.length + matchedAntonyms.length) : 10
    };
  });

  console.log(`Updated ${updatedCount} words with antonyms.`);

  // Write back to file
  const listStartMarker = 'export const hscVocabularyList = [\n';
  const listEndMarker = '\n];\n\n// Generates question variations';

  const startIdx = fileContent.indexOf(listStartMarker);
  const endIdx = fileContent.indexOf(listEndMarker);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Markers not found in hscQuestionsData.js');
  }

  const formatted = enrichedList
    .map((w) => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  '))
    .join(',\n');

  const newContent =
    fileContent.slice(0, startIdx + listStartMarker.length) +
    formatted +
    fileContent.slice(endIdx);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully saved updated hscQuestionsData.js');
});
