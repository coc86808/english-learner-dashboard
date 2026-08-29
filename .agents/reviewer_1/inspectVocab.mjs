import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';
import fs from 'fs';

let output = '';

hscVocabularyList.forEach((item, i) => {
  output += `[${i + 1}] ID: ${item.id} | Word: ${item.word} | POS: ${item.partsOfSpeech}\n`;
  output += `    Bengali: ${item.bengaliMeaning}\n`;
  output += `    Synonyms: ${item.synonyms}\n`;
  output += `    Antonyms: ${item.antonyms}\n`;
  output += `    English: ${item.englishMeaning}\n`;
  output += `    Example: ${item.exampleSentence}\n`;
  output += `    Unit: ${item.unit} | Board: ${item.boardExamTag}\n\n`;
});

fs.writeFileSync('.agents/reviewer_1/all_vocab_dump.txt', output, 'utf8');
console.log('Successfully written 156 items to .agents/reviewer_1/all_vocab_dump.txt');
