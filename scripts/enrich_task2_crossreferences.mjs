import fs from 'fs';

const filePath = './src/data/questions/hscQuestionsData.js';

import('../src/data/questions/hscQuestionsData.js').then((m) => {
  const list = m.hscVocabularyList;
  console.log(`Analyzing ${list.length} vocabulary words for Task 2 cross-referencing...`);

  // Build a lookup map of all main words (lowercase trimmed)
  const wordMap = new Map();
  list.forEach((item) => {
    const key = item.word.toLowerCase().trim();
    if (!wordMap.has(key)) {
      wordMap.set(key, item);
    }
  });

  let crossRefCount = 0;

  // Process cross-references
  const enrichedList = list.map((item) => {
    const wordKey = item.word.toLowerCase().trim();
    const synList = (item.synonyms || '')
      .split(',')
      .map((s) => s.toLowerCase().trim())
      .filter((s) => s.length > 0 && s !== wordKey);

    const antList = (item.antonyms || '')
      .split(',')
      .map((a) => a.toLowerCase().trim())
      .filter((a) => a.length > 0 && a !== wordKey);

    // Check which synonyms match another main word in the book
    const matchedSynonyms = synList.filter((s) => wordMap.has(s));
    // Check which antonyms match another main word in the book
    const matchedAntonyms = antList.filter((a) => wordMap.has(a));

    const isCrossReferenced = matchedSynonyms.length > 0 || matchedAntonyms.length > 0;
    if (isCrossReferenced) crossRefCount++;

    // Ensure sources array exists
    const sources = item.sources || [item.unit || 'General HSC'];

    return {
      ...item,
      sources,
      isCrossReferenced,
      crossReferencedWords: [...new Set([...matchedSynonyms, ...matchedAntonyms])],
      crossRefMatchCount: matchedSynonyms.length + matchedAntonyms.length,
      crossRefSynonyms: matchedSynonyms,
      crossRefAntonyms: matchedAntonyms,
      priority: isCrossReferenced ? 100 + (matchedSynonyms.length + matchedAntonyms.length) : 10
    };
  });

  console.log(`Task 2 Complete: Found ${crossRefCount} cross-referenced words (with matching synonyms/antonyms in other units)!`);

  // Update hscQuestionsData.js with enriched list
  let fileContent = fs.readFileSync(filePath, 'utf8');
  const listStartMarker = 'export const hscVocabularyList = [\n';
  const listEndMarker = '\n];\n\n// Generates question variations';

  const startIdx = fileContent.indexOf(listStartMarker);
  const endIdx = fileContent.indexOf(listEndMarker);

  if (startIdx !== -1 && endIdx !== -1) {
    const formatted = enrichedList
      .map((w) => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  '))
      .join(',\n');

    let updatedContent =
      fileContent.slice(0, startIdx + listStartMarker.length) +
      formatted +
      fileContent.slice(endIdx);

    // Also update buildQuestionsDatabase to attach isCrossReferenced and sources to each MCQ
    if (!updatedContent.includes('isCrossReferenced: item.isCrossReferenced')) {
      updatedContent = updatedContent.replace(
        'boardExamTag: item.boardExamTag,',
        `boardExamTag: item.boardExamTag,
        sources: item.sources || [item.unit],
        isCrossReferenced: item.isCrossReferenced || false,
        crossReferencedWords: item.crossReferencedWords || [],`
      );
    }

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Successfully written enriched vocabulary and MCQ database to ${filePath}!`);
  }
});
