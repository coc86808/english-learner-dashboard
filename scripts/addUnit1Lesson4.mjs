import fs from 'fs';

const unit1Lesson4Words = [
  {
    "id": "vocab-u1-l4-01",
    "word": "Illuminate",
    "bengaliMeaning": "আলোকিত করা / উদ্ভাসিত করা / স্পষ্ট করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Enlighten, clarify, brighten, elucidate, irradiate",
    "antonyms": "Darken, confuse, obscure, cloud",
    "englishMeaning": "To light up or make much clearer and intellectually enlightened.",
    "exampleSentence": "True education should illuminate our minds and inspire civic action.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Dhaka Board 1st Paper, Unit 1"
  },
  {
    "id": "vocab-u1-l4-02",
    "word": "Engagement",
    "bengaliMeaning": "সম্পৃক্ততা / সক্রিয় অংশগ্রহণ / প্রতিশ্রুতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Involvement, participation, commitment, immersion, dedication",
    "antonyms": "Detachment, apathy, disengagement, withdrawal",
    "englishMeaning": "The state of being actively involved and committed to something.",
    "exampleSentence": "Students' active civic engagement brings lasting benefits to society.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },
  {
    "id": "vocab-u1-l4-03",
    "word": "Motivation",
    "bengaliMeaning": "অনুপ্রেরণা / উদ্দীপনা / প্রেরণা",
    "partsOfSpeech": "Noun",
    "synonyms": "Incentive, inspiration, drive, encouragement, impetus",
    "antonyms": "Discouragement, apathy, indifference, hesitation",
    "englishMeaning": "A reason or reasons for acting or behaving in a particular way.",
    "exampleSentence": "Civic engagement utilizes knowledge, skills, values, and noble motivation.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l4-04",
    "word": "Discrimination",
    "bengaliMeaning": "বৈষম্য / পক্ষপাতিত্ব / অবিচার",
    "partsOfSpeech": "Noun",
    "synonyms": "Bias, prejudice, inequity, bigotry, unfairness",
    "antonyms": "Equality, fairness, impartiality, justice",
    "englishMeaning": "The unjust or prejudicial treatment of different categories of people.",
    "exampleSentence": "Responsible citizens raise their voices against injustice and social discrimination.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l4-05",
    "word": "Petitions",
    "bengaliMeaning": "আবেদনপত্র / গণস্বাক্ষরযুক্ত নাগরিক দাবি",
    "partsOfSpeech": "Noun",
    "synonyms": "Appeals, pleas, supplications, solicitations, representations",
    "antonyms": "Orders, decrees, commands",
    "englishMeaning": "Formal written requests, typically signed by many people, appealing to authority.",
    "exampleSentence": "Citizens submitted petitions to the municipal authority against unfair tax hikes.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l4-06",
    "word": "Volunteerism",
    "bengaliMeaning": "স্বেচ্ছাসেবা / নিঃস্বার্থ পরার্থপরতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Voluntary service, altruism, unpaid service, charity",
    "antonyms": "Compulsion, coercion, conscription",
    "englishMeaning": "The use or involvement of volunteer labor, especially in community services.",
    "exampleSentence": "Spontaneous civic participation outside of formal courses is known as volunteerism.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l4-07",
    "word": "Onrush",
    "bengaliMeaning": "প্রবল স্রোত / পাহাড়ি ঢল / আকস্মিক প্লাবন",
    "partsOfSpeech": "Noun",
    "synonyms": "Surge, flood, deluge, influx, onslaught, torrent",
    "antonyms": "Retreat, ebb, receding, stagnation",
    "englishMeaning": "A sudden forceful rush or flow forward, as of floodwaters.",
    "exampleSentence": "Rivers overflowed their banks due to the torrential onrush of water from hills.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u1-l4-08",
    "word": "Hygiene",
    "bengaliMeaning": "স্বাস্থ্যবিধি / পরিচ্ছন্নতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Cleanliness, sanitation, purity, disinfection, asepsis",
    "antonyms": "Filth, dirtiness, contamination, unsanitariness",
    "englishMeaning": "Conditions or practices conducive to maintaining health and preventing disease.",
    "exampleSentence": "Volunteers distributed soaps and purification tablets to maintain public hygiene.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u1-l4-09",
    "word": "Substantial",
    "bengaliMeaning": "উল্লেখযোগ্য / পর্যাপ্ত / অর্থবহ পরিমাণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Considerable, significant, ample, sizable, meaningful",
    "antonyms": "Negligible, trivial, minor, insignificant, meager",
    "englishMeaning": "Of considerable importance, size, or worth.",
    "exampleSentence": "The students raised a substantial relief fund to assist elderly flood victims.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l4-10",
    "word": "Immensely",
    "bengaliMeaning": "অত্যধিক মাত্রায় / অপরিমেয়ভাবে / বিপুলভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Vastly, enormously, exceedingly, tremendously, hugely",
    "antonyms": "Scarcely, slightly, insignificantly, barely",
    "englishMeaning": "To a great extent; extremely or immeasurably.",
    "exampleSentence": "The young volunteers were immensely gratified by the smiling faces of the victims.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l4-11",
    "word": "Distressing",
    "bengaliMeaning": "মর্মান্তিক / উদ্বেগজনক / কষ্টদায়ক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Heartbreaking, agonizing, upsetting, painful, harrowing",
    "antonyms": "Comforting, soothing, reassuring, pleasant",
    "englishMeaning": "Causing anxiety, sorrow, or deep mental pain.",
    "exampleSentence": "Reports of poor families freezing without home heating were deeply distressing.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "HSC Board Standard, Unit 1"
  },
  {
    "id": "vocab-u1-l4-12",
    "word": "Introvert",
    "bengaliMeaning": "অন্তর্মুখী / চাপা স্বভাবের মানুষ",
    "partsOfSpeech": "Noun",
    "synonyms": "Reserved person, quiet person, introspective, loner",
    "antonyms": "Extrovert, outgoing person, socializer",
    "englishMeaning": "A shy, reticent person who enjoys solitary reflection.",
    "exampleSentence": "Though Alex was a quiet introvert, his deep empathy inspired international aid.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u1-l4-13",
    "word": "Plea",
    "bengaliMeaning": "আকুল আবেদন / কাতর প্রার্থনা / নিবেদন",
    "partsOfSpeech": "Noun",
    "synonyms": "Appeal, supplication, request, entreaty, petition",
    "antonyms": "Demand, command, order, refusal",
    "englishMeaning": "A request made in an urgent and emotional manner.",
    "exampleSentence": "The young boy's heartfelt plea touched his teacher and mobilized the entire class.",
    "unit": "Unit 1: Lesson 4 (Civic Engagement)",
    "boardExamTag": "Rajshahi Board Exam"
  }
];

// Append to hscVocabularyList in src/data/questions/hscQuestionsData.js
const qPath = './src/data/questions/hscQuestionsData.js';
let qContent = fs.readFileSync(qPath, 'utf8');

const listStartMarker = 'export const hscVocabularyList = [\n';
const listEndMarker = '\n];\n\n// Generates question variations';

const startIdx = qContent.indexOf(listStartMarker);
const endIdx = qContent.indexOf(listEndMarker);

if (startIdx !== -1 && endIdx !== -1) {
  import('../src/data/questions/hscQuestionsData.js').then((m) => {
    // Filter out old unit 1 lesson 4 words if any
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 1: Lesson 4'));
    const combined = [...existingOtherWords, ...unit1Lesson4Words];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure prefix generation handles Unit 1 Lesson 4
    newContent = newContent.replace(
      /let prefix = 'hsc-u1-l1-' \+ num;[\s\S]*?if \(item\.unit\.includes\('Unit 2: Lesson 1'\)/,
      `let prefix = 'hsc-u1-l1-' + num;
    if (item.unit.includes('Unit 1: Lesson 4') || item.unit.includes('Civic Engagement')) {
      prefix = 'hsc-u1-l4-' + num;
    } else if (item.unit.includes('Unit 2: Lesson 1')`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 1 Lesson 4 added ${unit1Lesson4Words.length} words.`);

    // Update hscUnitsData.js for Unit 1 Lesson 4
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-1',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u1-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u1-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u1-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u1-l4',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-1',
    number: 1,
    unitNumber: 'Unit 1',
    unitTitle: 'Education and Life',
    unitTitleBn: 'শিক্ষা ও জীবন',
    bgClass: 'bg-[#1b8a43] hover:bg-[#1f9c4c]',
    gradient: 'from-[#1e9649] to-[#146e33]',
    progress: 0,
    totalWords: 123,
    masteredWords: 0,
    lessons: [
      { id: 'u1-l1', number: 'Lesson 1', title: "The Parrot's Tale", titleBn: 'তোতাকাহিনী', questionsCount: '১৮৪ টি প্রশ্ন', wordsCount: 46, progress: 0 },
      { id: 'u1-l2', number: 'Lesson 2', title: 'Education and Technology', titleBn: 'শিক্ষা ও প্রযুক্তি', questionsCount: '১৩৬ টি প্রশ্ন', wordsCount: 34, progress: 0 },
      { id: 'u1-l3', number: 'Lesson 3', title: 'Children in School', titleBn: 'বিদ্যালয়ে শিশু (তোত্তো-চান)', questionsCount: '১২০ টি প্রশ্ন', wordsCount: 30, progress: 0 },
      { id: 'u1-l4', number: 'Lesson 4', title: 'Civic Engagement', titleBn: 'নাগরিক সম্পৃক্ততা', questionsCount: '৫২ টি প্রশ্ন', wordsCount: 13, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 1 Lesson 4!');
  });
}
