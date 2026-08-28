/**
 * HSC English Vocabulary and MCQ Question Database
 * Unit 1: Education and Life | Lesson 1: The Parrot's Tale (তোতাকাহিনী)
 *
 * Supported Practice Categories:
 * 1. 'synonyms' - Synonyms (সমার্থক শব্দ)
 * 2. 'antonyms' - Antonyms (বিপরীত শব্দ)
 * 3. 'english_meaning' - Meaning in English (ইংরেজি অর্থ)
 * 4. 'bangla_meaning' - Meaning in Bangla (বাংলা অর্থ)
 *
 * All options are single-word / short clean phrases.
 * Options are shuffled randomly in the UI on every render.
 */

// 23 Core Vocabulary words with all trait & textbook data
export const hscVocabularyList = [
  {
    id: 'vocab-01',
    word: 'Ambitious',
    bengaliMeaning: 'উচ্চাকাঙ্ক্ষী / বড় কিছু অর্জনের তীব্র ইচ্ছাপোষণকারী',
    partsOfSpeech: 'Adjective',
    synonyms: 'Aspiring, Driven, Goal-oriented, Determined, Enterprising',
    antonyms: 'Aimless, Lazy, Unambitious, Complacent, Apathetic',
    englishMeaning: 'Having a strong desire and determination to achieve success.',
    exampleSentence: 'The King made an ambitious plan to educate the forest bird in a royal golden cage.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Board Standard, Unit 1'
  },
  {
    id: 'vocab-02',
    word: 'Unrealistic',
    bengaliMeaning: 'অবাস্তব / কাল্পনিক / অবাস্তবসম্মত',
    partsOfSpeech: 'Adjective',
    synonyms: 'Impractical, Idealistic, Visionary, Quixotic',
    antonyms: 'Practical, Realistic, Pragmatic, Sensible',
    englishMeaning: 'Not based on actual reality or practical facts.',
    exampleSentence: 'Forcing a free bird to memorize scriptures by tearing paper into its throat was completely unrealistic.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Board Exam, Unit 1 Vocab'
  },
  {
    id: 'vocab-03',
    word: 'Dreamer',
    bengaliMeaning: 'স্বপ্নদর্শী / ভাবুক / কল্পনাবিহারী ব্যক্তি',
    partsOfSpeech: 'Noun',
    synonyms: 'Visionary, Idealist, Utopian, Daydreamer, Romantic',
    antonyms: 'Realist, Pragmatist, Skeptic',
    englishMeaning: 'A person guided by ideals and imagination rather than practical realities.',
    exampleSentence: 'A dreamer believes education should nurture the natural spirit, unlike the king\'s rigid scholars.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC 1st Paper, Unit 1'
  },
  {
    id: 'vocab-04',
    word: 'Theorist',
    bengaliMeaning: 'তত্ত্ববিদ / যিনি কেবল পুঁথিগত তত্ত্ব নিয়ে আলোচনা করেন',
    partsOfSpeech: 'Noun',
    synonyms: 'Thinker, Ideologue, Philosopher, Speculator, Academic',
    antonyms: 'Practitioner, Doer, Realist',
    englishMeaning: 'One who deals with theoretical principles rather than practical execution.',
    exampleSentence: 'The royal theorists deliberated that straw nests cannot hold knowledge, so a golden cage is required.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Dhaka Board Model MCQ'
  },
  {
    id: 'vocab-05',
    word: 'Stupid',
    bengaliMeaning: 'নির্বোধ / মূর্খ / বিচারবুদ্ধিহীন',
    partsOfSpeech: 'Adjective',
    synonyms: 'Foolish, Witless, Dense, Brainless, Simple-minded',
    antonyms: 'Intelligent, Wise, Clever, Astute, Bright',
    englishMeaning: 'Lacking intelligence, judgment, or common sense.',
    exampleSentence: 'The courtiers absurdly remarked, "The birds in this kingdom are not only stupid, but also ungrateful."',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC 1st Paper Textbook'
  },
  {
    id: 'vocab-06',
    word: 'Clever',
    bengaliMeaning: 'চালাক / চতুর / কূটবুদ্ধিসম্পন্ন',
    partsOfSpeech: 'Adjective',
    synonyms: 'Shrewd, Astute, Quick-witted, Ingenious, Crafty',
    antonyms: 'Foolish, Clumsy, Naive, Dull',
    englishMeaning: 'Quick at learning, understanding, or manipulating situations.',
    exampleSentence: 'The clever nephews profited immensely from the royal budget allocated for the bird\'s education.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Chattogram Board Standard'
  },
  {
    id: 'vocab-07',
    word: 'Hypocritical',
    bengaliMeaning: 'ভণ্ড / কপট / মুখে এক অন্তরে আরেক',
    partsOfSpeech: 'Adjective',
    synonyms: 'Deceitful, Duplicitous, Insincere, Two-faced, Sanctimonious',
    antonyms: 'Sincere, Genuine, Honest, Forthright, Authentic',
    englishMeaning: 'Pretending to have moral standards or virtues that one does not actually possess.',
    exampleSentence: 'The hypocritical courtiers praised the education system while the helpless bird was starving to death.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Board Exam Model'
  },
  {
    id: 'vocab-08',
    word: 'Over-enthusiastic',
    bengaliMeaning: 'অতিরিক্ত উৎসাহী / অতি-উচ্ছ্বসিত',
    partsOfSpeech: 'Adjective',
    synonyms: 'Overzealous, Hyperactive, Fanatical, Exuberant, Eager',
    antonyms: 'Indifferent, Apathetic, Unenthusiastic, Calm, Cool',
    englishMeaning: 'Showing excessively intense eagerness or excitement.',
    exampleSentence: 'The over-enthusiastic scribes copied so many manuscripts that a veritable mountain was formed.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Rajshahi Board Vocab Standard'
  },
  {
    id: 'vocab-09',
    word: 'Honest',
    bengaliMeaning: 'সৎ / অকপট / সত্যনিষ্ঠ',
    partsOfSpeech: 'Adjective',
    synonyms: 'Truthful, Upright, Candid, Trustworthy, Frank',
    antonyms: 'Deceitful, Corrupt, Dishonest, Untruthful, Fraudulent',
    englishMeaning: 'Free of deceit and truthful in actions and words.',
    exampleSentence: 'Only the honest fault-finders pointed out that the bird itself was neglected amidst the glamour.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC 1st Paper'
  },
  {
    id: 'vocab-10',
    word: 'Brave',
    bengaliMeaning: 'সাহসী / নির্ভীক',
    partsOfSpeech: 'Adjective',
    synonyms: 'Courageous, Valiant, Intrepid, Bold, Dauntless',
    antonyms: 'Cowardly, Timid, Fainthearted, Fearful, Craven',
    englishMeaning: 'Ready to face and endure danger or pain without showing fear.',
    exampleSentence: 'It was brave of the critic to question the King\'s elaborate schooling project.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Sylhet Board Standard'
  },
  {
    id: 'vocab-11',
    word: 'Likes flattery',
    bengaliMeaning: 'তোষামোদ বা চাটুকারিতা পছন্দ করে এমন (চাটুকারপ্রিয়)',
    partsOfSpeech: 'Phrase / Trait',
    synonyms: 'Vain, Sycophancy-seeker, Praise-loving, Egocentric',
    antonyms: 'Humble, Modest, Unflattered',
    englishMeaning: 'Enjoying false or exaggerated praise to feed one\'s ego.',
    exampleSentence: 'The King was a person who likes flattery and rewarded his nephews whenever they chanted his glory.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Textbook Character Analysis'
  },
  {
    id: 'vocab-12',
    word: 'Courageous',
    bengaliMeaning: 'সাহসিকতাপূর্ণ / অকুতোভয়',
    partsOfSpeech: 'Adjective',
    synonyms: 'Heroic, Audacious, Fearless, Gallant, Plucky',
    antonyms: 'Timid, Scared, Cowardly, Meek',
    englishMeaning: 'Displaying bravery in the face of fear, danger, or oppression.',
    exampleSentence: 'The captive bird made courageous attempts to cut the cage wires with its feeble beak.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Barishal Board Vocab'
  },
  {
    id: 'vocab-13',
    word: 'Believes in hype',
    bengaliMeaning: 'অতিপ্রচার বা চাকচিক্যে অন্ধবিশ্বাস স্থাপনকারী (হুজুগে বিশ্বাসী)',
    partsOfSpeech: 'Phrase / Trait',
    synonyms: 'Gullible, Credulous, Easily persuaded, Trend-follower',
    antonyms: 'Skeptical, Critical, Discerning, Rational',
    englishMeaning: 'Easily convinced by extravagant publicity, exaggeration, and superficial show.',
    exampleSentence: 'The public who believes in hype cheered when they saw the golden cage without checking the bird.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Theme Analysis MCQ'
  },
  {
    id: 'vocab-14',
    word: 'Go with the flow',
    bengaliMeaning: 'স্রোতের অনুকূলে চলা / সবার সাথে তাল মিলিয়ে চলা',
    partsOfSpeech: 'Idiom',
    synonyms: 'Conform, Adapt, Yield to the majority, Follow the herd',
    antonyms: 'Rebel, Resist, Stand out, Oppose, Dissent',
    englishMeaning: 'To accept the situation and adapt to what other people are doing without opposing.',
    exampleSentence: 'Instead of speaking the truth, the courtiers decided to go with the flow to earn handsome salaries.',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Idioms & Phrases'
  },
  {
    id: 'vocab-15',
    word: 'Unlettered',
    bengaliMeaning: 'নিরক্ষর / অশিক্ষিত / পুঁথিজ্ঞানহীন',
    partsOfSpeech: 'Adjective',
    synonyms: 'Illiterate, Unschooled, Ignorant, Uneducated',
    antonyms: 'Literate, Learned, Scholarly, Educated, Erudite',
    englishMeaning: 'Not educated or unable to read and write.',
    exampleSentence: '"Once upon a time there lived a bird. It was unlettered." - The Parrot\'s Tale, Para 1',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Textbook Direct, Dhaka Board'
  },
  {
    id: 'vocab-16',
    word: 'Devour',
    bengaliMeaning: 'লোলুপভাবে গ্রাস করা / উদরস্থ করা',
    partsOfSpeech: 'Verb',
    synonyms: 'Gorge, Gobble, Ingest, Gulp down, Consume greedily',
    antonyms: 'Nibble, Fast, Abstain, Pick at',
    englishMeaning: 'To eat food hungrily, quickly, or greedily.',
    exampleSentence: '"Yet it devours fruit from the forest, bringing down the profits of fruiterers." - Para 1',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC 1st Paper Textbook'
  },
  {
    id: 'vocab-17',
    word: 'Deliberate',
    bengaliMeaning: 'গভীরভাবে পরামর্শ বা বিবেচনা করা',
    partsOfSpeech: 'Verb',
    synonyms: 'Consult, Ponder, Debate, Meditate, Contemplate',
    antonyms: 'Haste, Ignore, Rush, Disregard',
    englishMeaning: 'To engage in long and careful consideration or discussion.',
    exampleSentence: '"The learned men of the court deliberated long." - The Parrot\'s Tale, Para 2',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Board Exam Standard'
  },
  {
    id: 'vocab-18',
    word: 'Exquisite',
    bengaliMeaning: 'অপূর্ব সুন্দর / সূক্ষ্ম ও নিখুঁত কারুকার্যময়',
    partsOfSpeech: 'Adjective',
    synonyms: 'Magnificent, Delicate, Superb, Flawless, Splendid',
    antonyms: 'Crude, Ugly, Inferior, Rough, Shoddy',
    englishMeaning: 'Extremely beautiful, delicate, and flawless in craftsmanship.',
    exampleSentence: '"It turned out to be of such exquisite workmanship that people crowded round for a look." - Para 3',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Dhaka Board 2023 Vocab'
  },
  {
    id: 'vocab-19',
    word: 'Scribe',
    bengaliMeaning: 'লেখক / অনুলিপিকারক (যিনি পুঁথি নকল করেন)',
    partsOfSpeech: 'Noun',
    synonyms: 'Copyist, Clerk, Secretary, Writer, Calligrapher',
    antonyms: 'Illiterate, Non-writer',
    englishMeaning: 'A person who copies out documents or manuscripts before printing was invented.',
    exampleSentence: '"One of the royal nephews sent for scribes. They made multiple copies of various texts." - Para 3',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Textbook Contextual MCQ'
  },
  {
    id: 'vocab-20',
    word: 'Detractor',
    bengaliMeaning: 'নিন্দুক / সমালোচক / কুৎসা রটনাকারী',
    partsOfSpeech: 'Noun',
    synonyms: 'Critic, Defamer, Slanderer, Fault-finder, Belittler',
    antonyms: 'Supporter, Admirer, Praiser, Defender, Champion',
    englishMeaning: 'A person who disparages, belittles, or criticizes someone or something.',
    exampleSentence: '"The world is short of many things but not detractors." - The Parrot\'s Tale, Para 4',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC Board Exam Standard'
  },
  {
    id: 'vocab-21',
    word: 'Slander',
    bengaliMeaning: 'মিথ্যা অপবাদ / পরনিন্দা / কুৎসা রটনা',
    partsOfSpeech: 'Noun / Verb',
    synonyms: 'Defamation, Calumny, Vilification, Backbiting, Libel',
    antonyms: 'Praise, Commendation, Acclaim, Compliment',
    englishMeaning: 'The action or crime of making a false spoken statement damaging to a person\'s reputation.',
    exampleSentence: '"Those who haven\'t got a share of the royal bounty are resorting to slander." - Para 4',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Chattogram Board Model'
  },
  {
    id: 'vocab-22',
    word: 'Impudence',
    bengaliMeaning: 'ধৃষ্টতা / নির্লজ্জ বেহায়াপনা / ঔদ্ধত্য',
    partsOfSpeech: 'Noun',
    synonyms: 'Insolence, Audacity, Effrontery, Impertinence, Cheek',
    antonyms: 'Humility, Modesty, Respect, Politeness, Deference',
    englishMeaning: 'The quality of being insolent, disrespectful, and boldly rude.',
    exampleSentence: '"What impudence!" the Inspector of Police commented when the bird tried to cut the wires. - Para 6',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'Dhaka Board 2024 Question'
  },
  {
    id: 'vocab-23',
    word: 'Melancholy',
    bengaliMeaning: 'বিষাদ / গভীর দুঃখ / বিষণ্ণতা',
    partsOfSpeech: 'Noun / Adjective',
    synonyms: 'Gloom, Sorrow, Sadness, Desolation, Dejection',
    antonyms: 'Joy, Happiness, Cheerfulness, Exuberance, Delight',
    englishMeaning: 'A feeling of pensive, deep sadness, typically with no obvious cause.',
    exampleSentence: '"Filling the sky above the budding forest trees with wistful melancholy." - The Parrot\'s Tale, Para 7',
    unit: 'Unit 1: Lesson 1 (The Parrot\'s Tale)',
    boardExamTag: 'HSC 1st Paper Literature Question'
  }
];

// Generates 4 question variations for each vocabulary word
function buildQuestionsDatabase() {
  const list = [];

  hscVocabularyList.forEach((item, index) => {
    const num = (index + 1).toString().padStart(2, '0');

    // 1. SYNONYM QUESTION
    list.push({
      id: `hsc-u1-l1-${num}-syn`,
      vocabId: item.id,
      word: item.word,
      category: 'synonyms',
      categoryLabel: 'Synonym (সমার্থক শব্দ)',
      categoryIcon: '🔄',
      bengaliMeaning: item.bengaliMeaning,
      partsOfSpeech: item.partsOfSpeech,
      questionText: `What is the closest SYNONYM of the word "${item.word}"?`,
      options: [item.synonyms.split(',')[0].trim(), item.antonyms.split(',')[0].trim(), 'Hesitant', 'Indifferent'],
      correctOption: 0,
      synonyms: item.synonyms,
      antonyms: item.antonyms,
      exampleSentence: item.exampleSentence,
      unit: item.unit,
      boardExamTag: item.boardExamTag,
      difficulty: 'Medium'
    });

    // 2. ANTONYM QUESTION
    list.push({
      id: `hsc-u1-l1-${num}-ant`,
      vocabId: item.id,
      word: item.word,
      category: 'antonyms',
      categoryLabel: 'Antonym (বিপরীত শব্দ)',
      categoryIcon: '⚡',
      bengaliMeaning: item.bengaliMeaning,
      partsOfSpeech: item.partsOfSpeech,
      questionText: `What is the ANTONYM (Opposite) of the word "${item.word}"?`,
      options: [item.antonyms.split(',')[0].trim(), item.synonyms.split(',')[0].trim(), 'Feasible', 'Active'],
      correctOption: 0,
      synonyms: item.synonyms,
      antonyms: item.antonyms,
      exampleSentence: item.exampleSentence,
      unit: item.unit,
      boardExamTag: item.boardExamTag,
      difficulty: 'Medium'
    });

    // 3. WORD MEANING IN ENGLISH QUESTION
    list.push({
      id: `hsc-u1-l1-${num}-eng`,
      vocabId: item.id,
      word: item.word,
      category: 'english_meaning',
      categoryLabel: 'Meaning in English (ইংরেজি অর্থ)',
      categoryIcon: '📖',
      bengaliMeaning: item.bengaliMeaning,
      partsOfSpeech: item.partsOfSpeech,
      questionText: `What is the English meaning of the word "${item.word}"?`,
      options: [
        item.englishMeaning,
        'Feeling lazy, sleepy, and exhausted without any aim',
        'Being totally frightened and running away from problems',
        'Showing anger and violence towards other people'
      ],
      correctOption: 0,
      synonyms: item.synonyms,
      antonyms: item.antonyms,
      exampleSentence: item.exampleSentence,
      unit: item.unit,
      boardExamTag: item.boardExamTag,
      difficulty: 'Medium'
    });

    // 4. WORD MEANING IN BANGLA QUESTION
    const bngCorrect = item.bengaliMeaning.split('/')[0].trim();
    list.push({
      id: `hsc-u1-l1-${num}-bng`,
      vocabId: item.id,
      word: item.word,
      category: 'bangla_meaning',
      categoryLabel: 'Meaning in Bangla (বাংলা অর্থ)',
      categoryIcon: '🇧🇩',
      bengaliMeaning: item.bengaliMeaning,
      partsOfSpeech: item.partsOfSpeech,
      questionText: `"${item.word}" শব্দটির সঠিক বাংলা অর্থ কোনটি?`,
      options: [
        bngCorrect,
        'অলস ও কর্মবিমুখ ব্যক্তি',
        'ভীতু ও কাপুরুষোচিত আচরণ',
        'প্রতারণাপূর্ণ মিথ্যা স্তাবকতা'
      ],
      correctOption: 0,
      synonyms: item.synonyms,
      antonyms: item.antonyms,
      exampleSentence: item.exampleSentence,
      unit: item.unit,
      boardExamTag: item.boardExamTag,
      difficulty: 'Easy'
    });
  });

  return list;
}

export const hscQuestionsList = buildQuestionsDatabase();

/**
 * Filter questions based on selected categories (synonyms, antonyms, english_meaning, bangla_meaning)
 */
export function getFilteredCategoryQuestions(
  categories = ['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning'],
  lessonId = null,
  unitNumber = null
) {
  const activeCategories = categories.length > 0
    ? categories
    : ['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning'];

  return hscQuestionsList.filter((q) => {
    const matchCat = activeCategories.includes(q.category);
    if (!matchCat) return false;
    return true;
  });
}
