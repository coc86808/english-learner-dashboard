import fs from 'fs';

const newWords = [
  {
    "id": "vocab-u9-l1-01",
    "word": "Adolescence",
    "bengaliMeaning": "কৈশোর / বয়ঃসন্ধিকাল",
    "partsOfSpeech": "Noun",
    "synonyms": "Youth, teenage, puberty, juvenility",
    "antonyms": "Adulthood, old age, senility, maturity",
    "englishMeaning": "The transitional period of human growth and development between childhood and adulthood (ages 13 to 18).",
    "exampleSentence": "Adolescence is characterized by fast-paced biological growth, emotional changes, and cognitive development.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "BSMRTU Admission & Board Exam"
  },
  {
    "id": "vocab-u9-l1-02",
    "word": "Span",
    "bengaliMeaning": "ব্যাপ্তি / বিস্তার / স্থিতিকাল",
    "partsOfSpeech": "Noun",
    "synonyms": "Duration, extent, stretch, period, length",
    "antonyms": "Instant, point, brevity, compression",
    "englishMeaning": "The full duration, extent, or reach of something from beginning to end.",
    "exampleSentence": "Adolescence represents one of the most critical transitions in an individual's life span.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-03",
    "word": "Infancy",
    "bengaliMeaning": "শৈশব / প্রারম্ভিক অবস্থা / জন্মাবস্থা",
    "partsOfSpeech": "Noun",
    "synonyms": "Babyhood, early childhood, inception, beginning",
    "antonyms": "Adulthood, maturity, old age, senescence",
    "englishMeaning": "The earliest stage of childhood development, from birth up to two years of age.",
    "exampleSentence": "Rapid growth during adolescence is second only to that observed during infancy.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-04",
    "word": "Passage",
    "bengaliMeaning": "উত্তরণ / রূপান্তর / অতিক্রম",
    "partsOfSpeech": "Noun",
    "synonyms": "Transition, crossing, progression, evolution",
    "antonyms": "Stagnation, standstill, halt, cessation",
    "englishMeaning": "The process of moving or transitioning from one life stage, condition, or state to another.",
    "exampleSentence": "The onset of puberty marks the developmental passage from childhood to adolescence.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-05",
    "word": "Determinant",
    "bengaliMeaning": "নির্ধারক / নির্ণায়ক উপাদান",
    "partsOfSpeech": "Noun",
    "synonyms": "Deciding factor, indicator, driver, constituent",
    "antonyms": "Result, consequence, outcome, aftermath",
    "englishMeaning": "A primary factor, condition, or element that decisively determines a developmental outcome.",
    "exampleSentence": "The biological determinants of adolescence are universal across human populations.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-06",
    "word": "Fairly",
    "bengaliMeaning": "যথেষ্ট পরিমাণে / মোটামুটি / নিরপেক্ষভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Moderately, reasonably, tolerably, quite",
    "antonyms": "Extremely, poorly, unfairly, unjustifiably",
    "englishMeaning": "To a moderately large extent or degree; with reasonable consistency.",
    "exampleSentence": "The physical stages of adolescent growth are fairly universal across cultures.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-07",
    "word": "Universal",
    "bengaliMeaning": "সার্বজনীন / সর্বব্যাপী",
    "partsOfSpeech": "Adjective",
    "synonyms": "General, worldwide, omnipresent, all-inclusive",
    "antonyms": "Specific, local, unique, isolated",
    "englishMeaning": "Applicable to, existing in, or characteristic of all human beings and societies.",
    "exampleSentence": "While biological puberty is universal, cultural practices around it vary widely.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l1-08",
    "word": "Urbanization",
    "bengaliMeaning": "নগরায়ণ / শহরমুখী বিস্তার",
    "partsOfSpeech": "Noun",
    "synonyms": "Urban development, city growth, municipal expansion",
    "antonyms": "Ruralization, de-urbanization, rural seclusion",
    "englishMeaning": "The societal process whereby large populations migrate to and concentrate in urban city environments.",
    "exampleSentence": "Rapid urbanization and global communication have transformed adolescent lifestyles in Bangladesh.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Exam, Unit 9"
  },
  {
    "id": "vocab-u9-l1-09",
    "word": "Spread",
    "bengaliMeaning": "বিস্তার / প্রসার / সম্প্রসারণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Expansion, diffusion, dissemination, propagation",
    "antonyms": "Contraction, suppression, restriction, decline",
    "englishMeaning": "The expansion, propagation, or distribution of ideas, technology, or habits across wider populations.",
    "exampleSentence": "The spread of digital communication networks allows teenagers to access information instantly.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l1-10",
    "word": "Tremendous",
    "bengaliMeaning": "বিশাল / প্রচণ্ড / অসাধারণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Huge, immense, enormous, extraordinary, colossal",
    "antonyms": "Tiny, trivial, insignificant, negligible",
    "englishMeaning": "Extremely large in degree, scale, intensity, potential, or importance.",
    "exampleSentence": "Adolescence is a formative period of tremendous growth, intellectual curiosity, and potential.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u9-l1-11",
    "word": "Maturation",
    "bengaliMeaning": "পরিপক্বতা / পূর্ণতাপ্রাপ্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Development, ripening, evolution, growth",
    "antonyms": "Immaturity, regression, decay, deterioration",
    "englishMeaning": "The natural biological and psychological process of reaching full maturity and adult capabilities.",
    "exampleSentence": "Physical and emotional maturation during teenage years requires patient adult guidance.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-12",
    "word": "Acquisition",
    "bengaliMeaning": "অর্জন / আয়ত্তকরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Attainment, learning, mastery, procurement",
    "antonyms": "Loss, forfeit, surrender, deprivation",
    "englishMeaning": "The act of learning, acquiring, or gaining complex cognitive and practical skills.",
    "exampleSentence": "The acquisition of critical thinking skills enables teenagers to navigate adult roles effectively.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u9-l1-13",
    "word": "Independence",
    "bengaliMeaning": "স্বাধীনতা / স্বনির্ভরতা / আত্মমর্যাদা",
    "partsOfSpeech": "Noun",
    "synonyms": "Autonomy, self-reliance, freedom, liberty",
    "antonyms": "Dependence, reliance, servitude, subordination",
    "englishMeaning": "Freedom from outside control and the state of relying on one's own capabilities and judgment.",
    "exampleSentence": "Teens naturally seek social and economic independence as they prepare for adult responsibilities.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-14",
    "word": "Considerable",
    "bengaliMeaning": "উল্লেখযোগ্য / প্রচুর / বিবেচনাযোগ্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Significant, substantial, sizable, noteworthy",
    "antonyms": "Insignificant, trivial, negligible, slight",
    "englishMeaning": "Notably large in amount, extent, severity, or importance.",
    "exampleSentence": "Adolescents encounter considerable peer and social pressures during their transition to adulthood.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u9-l1-15",
    "word": "Exert",
    "bengaliMeaning": "প্রয়োগ করা / বিস্তার করা / খাটানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Apply, exercise, wield, employ, utilize",
    "antonyms": "Withhold, idle, conceal, disuse",
    "englishMeaning": "To apply or bring to bear force, authority, effort, or psychological influence.",
    "exampleSentence": "Peer groups exert powerful influences on adolescent decision-making and habits.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-16",
    "word": "Intentional",
    "bengaliMeaning": "ইচ্ছাকৃত / উদ্দেশ্যপ্রণোদিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Deliberate, willful, intended, planned, conscious",
    "antonyms": "Unintentional, accidental, unintended, inadvertent",
    "englishMeaning": "Done with conscious intention, purpose, premeditation, or design.",
    "exampleSentence": "Education campaigns help young people prevent both intentional violence and accidental injuries.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-17",
    "word": "Unintentional",
    "bengaliMeaning": "অনিচ্ছাকৃত / আকস্মিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Accidental, unintended, inadvertent, incidental",
    "antonyms": "Intentional, deliberate, planned, premeditated",
    "englishMeaning": "Happening not on purpose, without conscious intent or premeditated plan.",
    "exampleSentence": "Teenagers taking risky physical challenges often suffer unintentional trauma and health hazards.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Standard"
  },
  {
    "id": "vocab-u9-l1-18",
    "word": "Abstaining",
    "bengaliMeaning": "বিরত থাকা / পরিহার করা / সংযম",
    "partsOfSpeech": "Verb",
    "synonyms": "Refraining, avoiding, forgoing, desisting, withholding",
    "antonyms": "Indulging, partaking, participating",
    "englishMeaning": "Restraining oneself from partaking in or indulging in harmful behaviors and substances.",
    "exampleSentence": "Abstaining from smoking, substance abuse, and dangerous behaviors protects future wellbeing.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u9-l1-19",
    "word": "Consequence",
    "bengaliMeaning": "পরিণতি / ফলাফল / প্রতিক্রিয়া",
    "partsOfSpeech": "Noun",
    "synonyms": "Outcome, result, effect, aftermath, repercussion",
    "antonyms": "Cause, origin, reason, inception",
    "englishMeaning": "An outcome or effect that follows from a specific choice, action, or condition.",
    "exampleSentence": "Adolescents must learn to evaluate the serious long-term consequences of reckless behaviour.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Exam, Unit 9"
  },
  {
    "id": "vocab-u9-l1-20",
    "word": "Vulnerable",
    "bengaliMeaning": "ঝুঁকিপূর্ণ / অরক্ষিত / সহজে ক্ষতিগ্রস্ত হতে পারে এমন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Susceptible, exposed, defenseless, at risk, endangered",
    "antonyms": "Protected, secure, resilient, invulnerable, safe",
    "englishMeaning": "Susceptible to physical harm, emotional injury, exploitation, or detrimental peer influence.",
    "exampleSentence": "Lack of correct health information makes underprivileged adolescents vulnerable to exploitation.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u9-l1-21",
    "word": "Exploitation",
    "bengaliMeaning": "শোষণ / অনুচিত সুযোগ গ্রহণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Abuse, manipulation, misuse, victimization",
    "antonyms": "Fairness, protection, empowerment, respect",
    "englishMeaning": "The act of taking unfair advantage of someone to benefit oneself.",
    "exampleSentence": "Strict laws and social safety nets are necessary to protect minors from commercial and sexual exploitation.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Exam"
  },
  {
    "id": "vocab-u9-l1-22",
    "word": "Barrier",
    "bengaliMeaning": "বাধা / প্রতিবন্ধক / প্রাচীর",
    "partsOfSpeech": "Noun",
    "synonyms": "Obstacle, hurdle, hindrance, impediment, blockade",
    "antonyms": "Gateway, passage, opening, bridge, aid",
    "englishMeaning": "A physical obstacle, societal taboo, or rule that hinders progress or access.",
    "exampleSentence": "Judgmental provider attitudes pose a significant barrier preventing teenagers from seeking healthcare.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-23",
    "word": "Cope",
    "bengaliMeaning": "মোকাবিলা করা / মানিয়ে নেওয়া / সামাল দেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Manage, deal with, handle, endure, tackle",
    "antonyms": "Surrender, yield, succumb, break down",
    "englishMeaning": "To deal effectively with a difficult, stressful, or demanding situation.",
    "exampleSentence": "Community counseling programs train adolescents to cope with academic and emotional pressures.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-24",
    "word": "Transition",
    "bengaliMeaning": "রূপান্তর / অবস্থান্তর / পর্যায় বদল",
    "partsOfSpeech": "Noun",
    "synonyms": "Shift, changeover, progression, transformation, passage",
    "antonyms": "Stagnation, permanence, constancy, persistence",
    "englishMeaning": "The process or a period of changing from one state, stage, or condition to another.",
    "exampleSentence": "Schools must support students during their critical transition from childhood into adult life.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Exam"
  },
  {
    "id": "vocab-u9-l1-25",
    "word": "Adjustment",
    "bengaliMeaning": "অভিযোজন / সমন্বয় সাধন / খাপ খাইয়ে নেওয়া",
    "partsOfSpeech": "Noun",
    "synonyms": "Adaptation, acclimatization, modification, accommodation",
    "antonyms": "Maladjustment, incongruity, resistance, maladaptation",
    "englishMeaning": "A small alteration, adaptation, or psychological accommodation to new environmental circumstances.",
    "exampleSentence": "Adolescents often experience psychological adjustment challenges as they enter new social circles.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u9-l1-26",
    "word": "Intervene",
    "bengaliMeaning": "হস্তক্ষেপ করা / মধ্যস্থতা করা / সহায়তায় এগিয়ে আসা",
    "partsOfSpeech": "Verb",
    "synonyms": "Intercede, step in, mediate, arbitrate, intervene",
    "antonyms": "Ignore, overlook, disregard, withdraw",
    "englishMeaning": "To take active steps or step into a developing situation to improve outcomes or resolve crises.",
    "exampleSentence": "Parents and teachers have the duty to intervene constructively when mental health problems arise.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-27",
    "word": "Puberty",
    "bengaliMeaning": "বয়ঃসন্ধি / শারীরিক পরিবর্তনের প্রারম্ভিক সময়",
    "partsOfSpeech": "Noun",
    "synonyms": "Adolescence onset, maturation stage, sexual maturity",
    "antonyms": "Infancy, childhood, senescence",
    "englishMeaning": "The biological stage of development during which a young person reaches reproductive maturity.",
    "exampleSentence": "Biological puberty triggers rapid physiological changes that herald the transition to adulthood.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  }
];

// 1. Update hscQuestionsData.js
const qFilePath = './src/data/questions/hscQuestionsData.js';
let qContent = fs.readFileSync(qFilePath, 'utf8');

// Find insertion point inside export const hscVocabularyList = [ ... ];
const vocabArrayEndMarker = '];\n\n/**\n * Auto-generated Board Exam MCQs';
const vocabArrayEndMarkerFallback = '];\n\nexport function buildQuestionsDatabase';

let insertTarget = vocabArrayEndMarker;
if (!qContent.includes(insertTarget)) {
  const lastBracketIdx = qContent.indexOf('];\n\nfunction buildQuestionsDatabase');
  if (lastBracketIdx === -1) {
    insertTarget = '];\n\nexport const hscQuestionsList';
  } else {
    insertTarget = '];\n\nfunction buildQuestionsDatabase';
  }
}

const formattedNewWords = newWords.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

// Replace the array ending
const targetPos = qContent.lastIndexOf('];\n\n');
if (targetPos !== -1) {
  const before = qContent.slice(0, targetPos);
  const after = qContent.slice(targetPos);
  qContent = before + ',\n' + formattedNewWords + after;
  fs.writeFileSync(qFilePath, qContent, 'utf8');
  console.log('Successfully added 27 words to hscQuestionsData.js');
} else {
  console.error('Could not find array ending in hscQuestionsData.js');
}

// 2. Update hscUnitsData.js
const unitsFilePath = './src/data/hscUnitsData.js';
let unitsContent = fs.readFileSync(unitsFilePath, 'utf8');

// Update Unit 9 details: totalWords: 27, lessons: u9-l1 wordsCount: 27, questionsCount: '১০৮ টি প্রশ্ন'
unitsContent = unitsContent.replace(
  /id:\s*'unit-9',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u9-l1',[\s\S]*?progress:\s*0\s*\},/,
  `id: 'unit-9',
    number: 9,
    unitNumber: 'Unit 9',
    unitTitle: 'Adolescence',
    unitTitleBn: 'কৈশোর ও বয়ঃসন্ধিকাল',
    bgClass: 'bg-[#d97706] hover:bg-[#ec850b]',
    gradient: 'from-[#ec850b] to-[#a85802]',
    progress: 0,
    totalWords: 27,
    masteredWords: 0,
    lessons: [
      { id: 'u9-l1', number: 'Lesson 1', title: 'Storms and Stresses of Adolescence', titleBn: 'কৈশোরের ঝড় ও সংকট', questionsCount: '১০৮ টি প্রশ্ন', wordsCount: 27, progress: 0 },`
);

fs.writeFileSync(unitsFilePath, unitsContent, 'utf8');
console.log('Successfully updated hscUnitsData.js');
