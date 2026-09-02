import fs from 'fs';

const unit10NewLessonsWords = [
  // --- Lesson 3: Food and Culture (8 words) ---
  {
    "id": "vocab-u10-l3-01",
    "word": "Travelogue",
    "bengaliMeaning": "ভ্রমণকাহিনী / পর্যটন বিবরণীমূলক সাহিত্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Travel narrative, travel book, itinerary, traveler's chronicle",
    "antonyms": "Fiction novel, stationary diary",
    "englishMeaning": "A film, book, or illustrated lecture about the places visited and experiences encountered by a traveler.",
    "exampleSentence": "Syed Mujtaba Ali's famous travelogues blend erudition with playful humor.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Dhaka Board Standard, Unit 10"
  },
  {
    "id": "vocab-u10-l3-02",
    "word": "Anecdotes",
    "bengaliMeaning": "মজার চুটকি / বাস্তব জীবনের কৌতুকপূর্ণ ঘটনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Short tales, vignettes, reminiscences, humorous accounts",
    "antonyms": "Official chronicles, solemn essays",
    "englishMeaning": "Short amusing or interesting stories about a real incident or person.",
    "exampleSentence": "The voyager seasoned his Egyptian narratives with witty anecdotes.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u10-l3-03",
    "word": "Gastronomy",
    "bengaliMeaning": "উন্নত রন্ধনশিল্প / রসনাবিদ্যা ও খাদ্যসংস্কৃতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Culinary art, haute cuisine, gourmet cooking, epicurism",
    "antonyms": "Fasting, starvation",
    "englishMeaning": "The practice or art of choosing, cooking, and eating good food.",
    "exampleSentence": "Mughal gastronomy left an indelible impression upon Middle Eastern cuisines.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u10-l3-04",
    "word": "Savoury",
    "bengaliMeaning": "মুখরোচক নোনতা বা মসলাযুক্ত খাবার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Spicy, piquant, appetizing, flavorful, pungent",
    "antonyms": "Sweet, sugary, bland, unpalatable",
    "englishMeaning": "Belonging to the category that is salty or spicy rather than sweet.",
    "exampleSentence": "Traditional Bengali banquets balance bitter greens with savoury meat delicacies.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u10-l3-05",
    "word": "Cuisine",
    "bengaliMeaning": "রন্ধনশৈলী / বিশেষ অঞ্চলের ঐতিহ্যবাহী খাবার",
    "partsOfSpeech": "Noun",
    "synonyms": "Cooking style, culinary tradition, fare, culinary art",
    "antonyms": "Raw ingredients",
    "englishMeaning": "A style or method of cooking, especially as characteristic of a particular country or region.",
    "exampleSentence": "Egyptian street cuisine shares remarkable historical affinity with Mughlai cooking.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u10-l3-06",
    "word": "Delicacies",
    "bengaliMeaning": "সুস্বাদু খাবার / উপাদেয় খাদ্যপদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Dainties, treats, gourmet dishes, delicacies, morsels",
    "antonyms": "Common rations, coarse food",
    "englishMeaning": "Choice or expensive foods considered especially rare and delicious.",
    "exampleSentence": "Sandesh and rasogolla are sweet delicacies revered throughout Bengal.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u10-l3-07",
    "word": "Linguist",
    "bengaliMeaning": "ভাষাবিদ / বহুভাষাতত্ত্ববিদ ও পণ্ডিত",
    "partsOfSpeech": "Noun",
    "synonyms": "Polyglot, philologist, language specialist, etymologist",
    "antonyms": "Monoglot, illiterate",
    "englishMeaning": "A person skilled in foreign languages or studying the structure of human language.",
    "exampleSentence": "As a polyglot linguist, Ali appreciated the dialectal nuances of Cairo.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u10-l3-08",
    "word": "Voyager",
    "bengaliMeaning": "ভ্রমণযাত্রী / পরিব্রাজক নাবিক",
    "partsOfSpeech": "Noun",
    "synonyms": "Traveler, seafaring explorer, navigator, peregrinator",
    "antonyms": "Homebody, stay-at-home",
    "englishMeaning": "A person who goes on a long journey, typically by sea or into space.",
    "exampleSentence": "The intrepid voyager crossed uncharted seas to observe foreign cultures.",
    "unit": "Unit 10: Lesson 3 (Food and Culture)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 4: Fitness (8 words) ---
  {
    "id": "vocab-u10-l4-01",
    "word": "Contemplation",
    "bengaliMeaning": "ধ্যানমগ্নতা / গভীর আত্মচিন্তন ও অন্তর্দৃষ্টি",
    "partsOfSpeech": "Noun",
    "synonyms": "Meditation, reflection, introspection, musing, deliberation",
    "antonyms": "Distraction, carelessness, thoughtlessness",
    "englishMeaning": "The action of looking thoughtfully at something for a long time; deep reflective thought.",
    "exampleSentence": "Quiet contemplation beneath trees clears the mind of academic stress.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Dhaka Board Standard, Unit 10"
  },
  {
    "id": "vocab-u10-l4-02",
    "word": "Retrospection",
    "bengaliMeaning": "অতীতচারণ / ফেলে আসা দিনের পর্যালোচনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Review, remembrance, looking back, recollection",
    "antonyms": "Foresight, anticipation",
    "englishMeaning": "The action of looking back on or reviewing past events or situations.",
    "exampleSentence": "Mature retrospection allows us to learn constructive lessons from earlier blunders.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u10-l4-03",
    "word": "Postures",
    "bengaliMeaning": "শারীরিক ভঙ্গিমা / যোগব্যায়ামের আসনসমূহ",
    "partsOfSpeech": "Noun",
    "synonyms": "Stances, bodily poses, carriage, asanas, bearings",
    "antonyms": "Immobility",
    "englishMeaning": "Particular ways of standing, sitting, or positioning the body.",
    "exampleSentence": "Maintaining upright yogic postures enhances respiratory volume and posture.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u10-l4-04",
    "word": "Aerobics",
    "bengaliMeaning": "সঙ্গীতের তালে শারীরিক কসরত ও ব্যায়াম",
    "partsOfSpeech": "Noun",
    "synonyms": "Calisthenics, cardio fitness, rhythmic exercises",
    "antonyms": "Sedentary lifestyle",
    "englishMeaning": "Vigorous exercises designed to increase cardiovascular efficiency.",
    "exampleSentence": "Practicing thirty minutes of daily aerobics bolsters heart health.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u10-l4-05",
    "word": "Contentment",
    "bengaliMeaning": "পরম আত্মতৃপ্তি / প্রশান্ত মানসিক সন্তুষ্টি",
    "partsOfSpeech": "Noun",
    "synonyms": "Serenity, satisfaction, fulfillment, inner peace, happiness",
    "antonyms": "Discontent, restlessness, misery",
    "englishMeaning": "A state of happiness and satisfaction.",
    "exampleSentence": "True mental wellness arises from spiritual contentment rather than vanity.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u10-l4-06",
    "word": "Torrent",
    "bengaliMeaning": "তীব্র প্রবাহ / বাঁধভাঙা প্রবল স্রোতোধারা",
    "partsOfSpeech": "Noun",
    "synonyms": "Deluge, flood, cascade, rushing stream, spate",
    "antonyms": "Trickle, drip",
    "englishMeaning": "A strong and fast-moving stream of water or other liquid; overwhelming outpouring.",
    "exampleSentence": "Meditation calms the chaotic torrent of stressful everyday thoughts.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u10-l4-07",
    "word": "Centering",
    "bengaliMeaning": "মনঃসংযোগ / আত্মস্থ হওয়া ও ভারসাম্য রক্ষা",
    "partsOfSpeech": "Noun",
    "synonyms": "Focusing, grounding, stabilizing, balancing, concentrating",
    "antonyms": "Scattering, distracting",
    "englishMeaning": "Finding a calm point of mental equilibrium and focus.",
    "exampleSentence": "Centering your breathing before an exam curbs panic and sharpen recall.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u10-l4-08",
    "word": "Ushered",
    "bengaliMeaning": "সূচনা করেছিল / নতুন যুগের পথপ্রদর্শন করেছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Introduced, guided, heralded, led in, initiated",
    "antonyms": "Ended, closed, terminated",
    "englishMeaning": "Showed or guided someone somewhere; heralded the start of something new.",
    "exampleSentence": "Ancient sages ushered in the philosophy of mental purification through meditation.",
    "unit": "Unit 10: Lesson 4 (Fitness)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 5: Consumerism (8 words) ---
  {
    "id": "vocab-u10-l5-01",
    "word": "Consumerism",
    "bengaliMeaning": "ভোক্তাবাদ / অতিভোগবাদী সামাজিক সংস্কৃতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Commercialism, materialistic culture, consumption culture",
    "antonyms": "Frugality, thrift, asceticism",
    "englishMeaning": "The protection or promotion of the interests of consumers; preoccupation with buying consumer goods.",
    "exampleSentence": "Rampant consumerism drives individuals to accumulate redundant possessions.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Dhaka Board Standard, Unit 10"
  },
  {
    "id": "vocab-u10-l5-02",
    "word": "Compulsive",
    "bengaliMeaning": "অনিবার্য বাধ্যবাধকতাগ্রস্ত / নিয়ন্ত্রণহীন মানসিক তাড়না",
    "partsOfSpeech": "Adjective",
    "synonyms": "Uncontrollable, obsessive, irresistible, pathological",
    "antonyms": "Deliberate, restrained, controlled",
    "englishMeaning": "Resulting from or relating to an irresistible urge, especially one that is irrational.",
    "exampleSentence": "Compulsive shopping often masks underlying emotional isolation.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u10-l5-03",
    "word": "Overspend",
    "bengaliMeaning": "অতিরিক্ত বা সামর্থ্যের বাইরে অর্থ ব্যয় করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Squander, splurge, dissipate funds, overreach financially",
    "antonyms": "Save, budget, economize",
    "englishMeaning": "Spend more than is necessary or can be afforded.",
    "exampleSentence": "Those who routinely overspend on brand labels soon invite insolvency.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u10-l5-04",
    "word": "Flattering",
    "bengaliMeaning": "তোষামোদপূর্ণ / চাটুকারিতামূলক প্রশংসা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Complimentary, adulatory, praiseful, obsequious",
    "antonyms": "Critical, insulting, disparaging",
    "englishMeaning": "Full of praise and compliments, often excessively or insincerely.",
    "exampleSentence": "Clever salesmen deploy flattering remarks to disarm cautious shoppers.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u10-l5-05",
    "word": "Stunning",
    "bengaliMeaning": "চমকপ্রদ / চোখধাঁধানো রূপ বা সৌন্দর্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Dazzling, breathtaking, splendid, gorgeous, magnificent",
    "antonyms": "Hideous, plain, unattractive",
    "englishMeaning": "Extremely impressive or attractive.",
    "exampleSentence": "She was captivated by the stunning craftsmanship of the embroidered silk gown.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u10-l5-06",
    "word": "Addiction",
    "bengaliMeaning": "নেশা / চরম ক্ষতিকর মানসিক আসক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Dependency, habit, obsession, fixation, compulsive craving",
    "antonyms": "Aversion, indifference, detachment",
    "englishMeaning": "The fact or condition of being addicted to a particular substance or activity.",
    "exampleSentence": "Retail addiction can drain family savings as insidiously as gambling.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u10-l5-07",
    "word": "Tempted",
    "bengaliMeaning": "প্রলুব্ধ / কোনো কিছুর মোহে আকৃষ্ট",
    "partsOfSpeech": "Adjective",
    "synonyms": "Enticed, lured, seduced, attracted, coaxed",
    "antonyms": "Repelled, resistant, wary",
    "englishMeaning": "Having an urge or inclination to do something.",
    "exampleSentence": "Shoppers are tempted by flashing neon discount banners during festival seasons.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u10-l5-08",
    "word": "Financial",
    "bengaliMeaning": "আর্থিক / রাজস্ব ও অর্থব্যবস্থা সংক্রান্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Monetary, fiscal, pecuniary, economic, commercial",
    "antonyms": "Non-financial",
    "englishMeaning": "Relating to finance or financial matters.",
    "exampleSentence": "Prudent budgeting shields middle-class households from unexpected financial crises.",
    "unit": "Unit 10: Lesson 5 (Consumerism)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  }
];

// Ingest into src/data/questions/hscQuestionsData.js
const qPath = './src/data/questions/hscQuestionsData.js';
let qContent = fs.readFileSync(qPath, 'utf8');

const listStartMarker = 'export const hscVocabularyList = [\n';
const listEndMarker = '\n];\n\n// Generates question variations';

const startIdx = qContent.indexOf(listStartMarker);
const endIdx = qContent.indexOf(listEndMarker);

if (startIdx !== -1 && endIdx !== -1) {
  import('../src/data/questions/hscQuestionsData.js').then((m) => {
    // Keep existing words that aren't already from Lessons 3-5 of Unit 10
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Food and Culture') && !w.unit.includes('Fitness') && !w.unit.includes('Consumerism'));
    const combined = [...existingOtherWords, ...unit10NewLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 10 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 9: Lesson 4'\) \|\| item\.unit\.includes\('Story of Shilpi'\)\) \{\s*prefix = 'hsc-u9-l4-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 9: Lesson 4') || item.unit.includes('Story of Shilpi')) {
      prefix = 'hsc-u9-l4-' + num;
    } else if (item.unit.includes('Unit 10: Lesson 3') || item.unit.includes('Food and Culture')) {
      prefix = 'hsc-u10-l3-' + num;
    } else if (item.unit.includes('Unit 10: Lesson 4') || item.unit.includes('Fitness')) {
      prefix = 'hsc-u10-l4-' + num;
    } else if (item.unit.includes('Unit 10: Lesson 5') || item.unit.includes('Consumerism')) {
      prefix = 'hsc-u10-l5-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 10 added ${unit10NewLessonsWords.length} new words.`);

    // Update hscUnitsData.js for Unit 10
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-10',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u10-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u10-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u10-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u10-l4',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u10-l5',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-10',
    number: 10,
    unitNumber: 'Unit 10',
    unitTitle: 'Lifestyle',
    unitTitleBn: 'জীবনধারা ও শিষ্টাচার',
    bgClass: 'bg-[#0284c7] hover:bg-[#0369a1]',
    gradient: 'from-[#38bdf8] to-[#0284c7]',
    progress: 0,
    totalWords: 134,
    masteredWords: 0,
    lessons: [
      { id: 'u10-l1', number: 'Lesson 1', title: 'Manners Around the World', titleBn: 'বিশ্বজুড়ে শিষ্টাচার', questionsCount: '২৪০ টি প্রশ্ন', wordsCount: 60, progress: 0 },
      { id: 'u10-l2', number: 'Lesson 2', title: 'Etiquette Netquette', titleBn: 'শিষ্টাচার ও নেটকেয়ার', questionsCount: '২০০ টি প্রশ্ন', wordsCount: 50, progress: 0 },
      { id: 'u10-l3', number: 'Lesson 3', title: 'Food and Culture', titleBn: 'খাদ্য ও সংস্কৃতি (মুজতবা আলী)', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u10-l4', number: 'Lesson 4', title: 'Fitness', titleBn: 'ফিটনেস ও মেডিটেশন', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u10-l5', number: 'Lesson 5', title: 'Consumerism', titleBn: 'ভোক্তাবাদ ও ব্যয়', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 10!');
  });
}
