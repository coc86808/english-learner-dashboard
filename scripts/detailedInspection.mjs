import { hscVocabularyList, hscQuestionsList } from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';

console.log('Total vocab:', hscVocabularyList.length);
console.log('Total questions:', hscQuestionsList.length);

// Count by unit strings
const unitCounts = {};
hscVocabularyList.forEach((item, idx) => {
  unitCounts[item.unit] = (unitCounts[item.unit] || 0) + 1;
});
console.log('Vocab count by item.unit string:');
console.log(unitCounts);

// Check matching for u1-l1, u10-l1, u10-l2
const u1Exact = hscVocabularyList.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
const u10l1Exact = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
const u10l2Exact = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));

console.log('\nExact filtered vocab counts:');
console.log('Unit 1 Lesson 1:', u1Exact.length);
console.log('Unit 10 Lesson 1:', u10l1Exact.length);
console.log('Unit 10 Lesson 2:', u10l2Exact.length);
console.log('Sum:', u1Exact.length + u10l1Exact.length + u10l2Exact.length);

// Check questions count
const u1QExact = hscQuestionsList.filter(q => q.unit.includes("Unit 1:") || q.unit.includes("The Parrot's Tale"));
const u10l1QExact = hscQuestionsList.filter(q => q.unit.includes("Unit 10: Lesson 1") || q.unit.includes("Manners Around the World"));
const u10l2QExact = hscQuestionsList.filter(q => q.unit.includes("Unit 10: Lesson 2") || q.unit.includes("Etiquette Netquette") || q.unit.includes("Good manners always wins") || q.unit.includes("Food and Culture"));

console.log('\nExact filtered question counts:');
console.log('Unit 1 Lesson 1 questions:', u1QExact.length);
console.log('Unit 10 Lesson 1 questions:', u10l1QExact.length);
console.log('Unit 10 Lesson 2 questions:', u10l2QExact.length);
console.log('Sum questions:', u1QExact.length + u10l1QExact.length + u10l2QExact.length);

// Check questionsCount in hscUnits
console.log('\nValues in hscUnitsData.js:');
hscUnits.forEach(u => {
  if (u.totalWords > 0) {
    console.log(`${u.unitNumber} (${u.unitTitle}): totalWords=${u.totalWords}`);
    u.lessons.forEach(l => {
      if (l.wordsCount > 0) {
        console.log(`  ${l.number} (${l.title}): wordsCount=${l.wordsCount}, questionsCount="${l.questionsCount}"`);
      }
    });
  }
});
