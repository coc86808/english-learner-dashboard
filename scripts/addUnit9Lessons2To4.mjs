import fs from 'fs';

const unit9NewLessonsWords = [
  // --- Lesson 2: Adolescence and Some Related Problems in Bangladesh (8 words) ---
  {
    "id": "vocab-u9-l2-01",
    "word": "Adulthood",
    "bengaliMeaning": "প্রাপ্তবয়স্ক অবস্থা / যৌবনোত্তর পরিনত জীবন",
    "partsOfSpeech": "Noun",
    "synonyms": "Maturity, legal age, full age, womanhood/manhood",
    "antonyms": "Childhood, infancy, adolescence",
    "englishMeaning": "The state or condition of being fully grown or mature.",
    "exampleSentence": "Successful passage into adulthood requires supportive community infrastructure.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l2-02",
    "word": "Responsibility",
    "bengaliMeaning": "দায়িত্ব / সামাজিক দায়বদ্ধতা ও কর্তব্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Duty, obligation, accountability, liability",
    "antonyms": "Irresponsibility, carelessness, neglect",
    "englishMeaning": "The state or fact of having a duty to deal with something or of having control over someone.",
    "exampleSentence": "Communities bear collective responsibility for safeguarding vulnerable youth.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l2-03",
    "word": "Adjustment",
    "bengaliMeaning": "অভিযোজন / পরিবর্তনের সাথে খাপ খাওয়ানো",
    "partsOfSpeech": "Noun",
    "synonyms": "Adaptation, accommodation, orientation, acclimation",
    "antonyms": "Maladjustment, resistance, disharmony",
    "englishMeaning": "A small alteration or movement made to achieve a desired fit, appearance, or result; psychological coping.",
    "exampleSentence": "Puberty requires rapid emotional adjustment to drastic bodily changes.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l2-04",
    "word": "Effectively",
    "bengaliMeaning": "কার্যকরভাবে / ফলপ্রসূ ও সফল উপায়ে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Efficaciously, successfully, productively, competently",
    "antonyms": "Ineffectively, fruitlessly, unsuccessfully",
    "englishMeaning": "In such a manner as to achieve a desired result.",
    "exampleSentence": "Counselors must intervene effectively when young students face bullying or substance risks.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l2-05",
    "word": "Unmarried",
    "bengaliMeaning": "অবিবাহিত / একক জীবনযাপনকারী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Single, unwed, bachelor/spinster, celibate",
    "antonyms": "Married, wedded, espoused",
    "englishMeaning": "Not married; single.",
    "exampleSentence": "Unmarried adolescent girls frequently face social stigma when asking about reproductive healthcare.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u9-l2-06",
    "word": "Provider",
    "bengaliMeaning": "সেবাদানকারী / চিকিৎসাসেবা পরিবেশক",
    "partsOfSpeech": "Noun",
    "synonyms": "Supplier, practitioner, caregiver, dispenser",
    "antonyms": "Recipient, consumer, beneficiary",
    "englishMeaning": "A person or thing that provides something; healthcare practitioner.",
    "exampleSentence": "The unsympathetic attitude of the clinic provider alienated teenage patients.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l2-07",
    "word": "Attitudes",
    "bengaliMeaning": "মনোভাব / মানসিক দৃষ্টিভঙ্গি ও প্রবৃত্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Mindsets, outlooks, viewpoints, perceptions, stances",
    "antonyms": "Realities, actions",
    "englishMeaning": "A settled way of thinking or feeling about someone or something.",
    "exampleSentence": "Enlightened societal attitudes are crucial for empowering growing adolescent girls.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u9-l2-08",
    "word": "Hazards",
    "bengaliMeaning": "বিপদাপদ / স্বাস্থ্যঝুঁকি ও ক্ষতিকর বিষয়সমূহ",
    "partsOfSpeech": "Noun",
    "synonyms": "Dangers, perils, risks, threats, jeopardy",
    "antonyms": "Safeties, protections, shelters",
    "englishMeaning": "Dangers or risks, especially regarding health or well-being.",
    "exampleSentence": "Early pregnancy exposes immature adolescent bodies to catastrophic medical hazards.",
    "unit": "Unit 9: Lesson 2 (Problems in Bangladesh)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 3: Why Does Child Marriage Happen? (8 words) ---
  {
    "id": "vocab-u9-l3-01",
    "word": "Subordination",
    "bengaliMeaning": "অধীনতা / পরাধীনতা / দ্বিতীয় শ্রেণীর অবস্থান",
    "partsOfSpeech": "Noun",
    "synonyms": "Servitude, subjugation, inferiority, compliance, subjection",
    "antonyms": "Autonomy, equality, dominance, sovereignty",
    "englishMeaning": "The act of placing in a lower rank or position; the state of being subordinate.",
    "exampleSentence": "Patriarchal traditions enforce the economic subordination of young female dependents.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l3-02",
    "word": "Marginalisation",
    "bengaliMeaning": "প্রান্তিকীকরণ / সুযোগবঞ্চিত অবস্থায় নির্বাসন",
    "partsOfSpeech": "Noun",
    "synonyms": "Exclusion, alienation, sidelining, ostracism, neglect",
    "antonyms": "Inclusion, mainstreaming, integration, empowerment",
    "englishMeaning": "Treatment of a person, group, or concept as insignificant or peripheral.",
    "exampleSentence": "Child marriage cements the lifelong socio-economic marginalisation of girls.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l3-03",
    "word": "Affluent",
    "bengaliMeaning": "ধনাঢ্য / বিত্তশালী / সচ্ছল ও সম্পদশালী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Wealthy, prosperous, rich, well-off, moneyed",
    "antonyms": "Impoverished, destitute, poor, needy",
    "englishMeaning": "Having a great deal of money; wealthy.",
    "exampleSentence": "Adolescents from affluent households enjoy superior nutritional and educational resources.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l3-04",
    "word": "Dowry",
    "bengaliMeaning": "যৌতুক / কন্যাপক্ষ কর্তৃক বাধ্যতামূলক পণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Marriage portion, bride price, marital tribute, bridegift",
    "antonyms": "Free endowment",
    "englishMeaning": "Property or money brought by a bride to her husband on their marriage.",
    "exampleSentence": "Demands for dowry persist in rural weddings despite being completely illegal.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l3-05",
    "word": "Maternal",
    "bengaliMeaning": "মাতৃত্বজনিত / প্রসূতি সংক্রান্ত ও মাতৃসুলভ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Motherly, pregnancy-related, obstetric, natal",
    "antonyms": "Paternal",
    "englishMeaning": "Relating to a mother, especially during pregnancy and childbirth.",
    "exampleSentence": "Ensuring trained obstetric care dramatically reduces maternal complications.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u9-l3-06",
    "word": "Mortality",
    "bengaliMeaning": "মৃত্যুহার / মরণশীলতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Death rate, fatality, lethality, perishability",
    "antonyms": "Immortality, survival rate",
    "englishMeaning": "The state of being subject to death; death, especially on a large scale.",
    "exampleSentence": "Teenage maternal mortality is significantly higher than that for adult mothers.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l3-07",
    "word": "Curtails",
    "bengaliMeaning": "সংকোচন করে / হ্রাস করে বা স্বাধীনতা কেড়ে নেয়",
    "partsOfSpeech": "Verb",
    "synonyms": "Restricts, limits, reduces, slashes, cuts short",
    "antonyms": "Expands, increases, lengthens, extends",
    "englishMeaning": "Reduces in extent or quantity; imposes a restriction on.",
    "exampleSentence": "Early motherhood abruptly curtails a young woman's academic development.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u9-l3-08",
    "word": "Mobility",
    "bengaliMeaning": "চলাচলের স্বাধীনতা / অবাধ গমনাগমন",
    "partsOfSpeech": "Noun",
    "synonyms": "Movement, freedom of travel, agility, locomotion",
    "antonyms": "Confinement, immobility, restriction",
    "englishMeaning": "The ability to move or be moved freely and easily.",
    "exampleSentence": "Confining young brides indoors eliminates their social contact and physical mobility.",
    "unit": "Unit 9: Lesson 3 (Child Marriage)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 4: The Story of Shilpi (9 words) ---
  {
    "id": "vocab-u9-l4-01",
    "word": "Pertaining",
    "bengaliMeaning": "সম্পর্কিত / প্রাসঙ্গিক বিষয় সংক্রান্ত",
    "partsOfSpeech": "Verb",
    "synonyms": "Relating, concerning, regarding, appertaining, bearing on",
    "antonyms": "Unrelated, irrelevant, disconnected",
    "englishMeaning": "Be appropriate, related, or applicable to something.",
    "exampleSentence": "The workshop addressed issues pertaining to adolescent reproductive rights.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l4-02",
    "word": "Counselling",
    "bengaliMeaning": "পরামর্শদান / দিকনির্দেশনামূলক পরামর্শ",
    "partsOfSpeech": "Noun",
    "synonyms": "Guidance, advising, mentoring, psychological direction",
    "antonyms": "Misguidance, deception",
    "englishMeaning": "The provision of professional assistance and guidance in resolving personal problems.",
    "exampleSentence": "Professional counselling gave Shilpi the confidence to express her health choices.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l4-03",
    "word": "Declined",
    "bengaliMeaning": "হ্রাস পেয়েছে / উল্লেখযোগ্য হারে কমে গেছে",
    "partsOfSpeech": "Verb",
    "synonyms": "Decreased, dropped, plummeted, dwindled, lessened",
    "antonyms": "Increased, soared, escalated, climbed",
    "englishMeaning": "Diminished in size, amount, or strength; decreased.",
    "exampleSentence": "Maternal mortality rates have declined substantially across Bangladesh over two decades.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l4-04",
    "word": "Hemorrhage",
    "bengaliMeaning": "মারাত্মক রক্তক্ষরণ / জীবনঘাতী রক্তপাত",
    "partsOfSpeech": "Noun",
    "synonyms": "Bleeding, profuse blood loss, rupture, blood extravasation",
    "antonyms": "Blood clotting, hemostasis",
    "englishMeaning": "An escape of blood from a ruptured blood vessel, especially when profuse.",
    "exampleSentence": "Obstructed labor can cause severe hemorrhage that threatens an adolescent mother's life.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l4-05",
    "word": "Fistula",
    "bengaliMeaning": "ফিস্টুলা / অস্বাভাবিক অভ্যন্তরীণ ক্ষত নালী",
    "partsOfSpeech": "Noun",
    "synonyms": "Abnormal channel, fistula duct, ulcerated passage",
    "antonyms": "Healthy uninjured tissue",
    "englishMeaning": "An abnormal or surgically made passage between a hollow or tubular organ and the body surface, or between two hollow organs.",
    "exampleSentence": "Obstetric fistula leads to chronic pain and heartbreaking social ostracization.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u9-l4-06",
    "word": "Obstructed",
    "bengaliMeaning": "বাধাপ্রাপ্ত / রুদ্ধ ও জটিল প্রসব",
    "partsOfSpeech": "Adjective",
    "synonyms": "Blocked, impeded, hindered, jammed, hampered",
    "antonyms": "Unobstructed, smooth, clear",
    "englishMeaning": "Prevented or hindered from movement or progress; blocked.",
    "exampleSentence": "Immature pelvic development frequently results in obstructed delivery in teenage girls.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l4-07",
    "word": "Morbidities",
    "bengaliMeaning": "অসুস্থতা / দীর্ঘমেয়াদী জটিল রোগব্যাধি",
    "partsOfSpeech": "Noun",
    "synonyms": "Ailments, illnesses, diseases, disorders, infirmities",
    "antonyms": "Robust health, wellness, vitality",
    "englishMeaning": "The condition of suffering from a disease or medical condition.",
    "exampleSentence": "Early marriage exposes vulnerable youth to long-term gynecological morbidities.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u9-l4-08",
    "word": "Empowerment",
    "bengaliMeaning": "ক্ষমতায়ন / স্বনির্ভরতা ও মর্যাদার শক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Elevation, enfranchisement, independence, strengthening",
    "antonyms": "Subjugation, disempowerment, disenfranchisement",
    "englishMeaning": "The process of becoming stronger and more confident, especially in controlling one's life and claiming one's rights.",
    "exampleSentence": "Adolescent empowerment clubs provide young women with tools to reshape their destinies.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l4-09",
    "word": "Convinced",
    "bengaliMeaning": "নিশ্চিত / সম্মত বা যুক্তি দ্বারা প্রত্যয়ী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Persuaded, assured, certain, positive, converted",
    "antonyms": "Doubtful, skeptical, unconvinced",
    "englishMeaning": "Completely certain about something; persuaded by argument or evidence.",
    "exampleSentence": "Shilpi convinced her husband to postpone parenthood until she attained adulthood.",
    "unit": "Unit 9: Lesson 4 (Story of Shilpi)",
    "boardExamTag": "HSC Board Standard, Unit 9"
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
    // Keep existing words that aren't already from Lessons 2-4 of Unit 9
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Problems in Bangladesh') && !w.unit.includes('Child Marriage') && !w.unit.includes('Story of Shilpi'));
    const combined = [...existingOtherWords, ...unit9NewLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 9 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 8: Lesson 4'\) \|\| item\.unit\.includes\('Love'\)\) \{\s*prefix = 'hsc-u8-l4-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 8: Lesson 4') || item.unit.includes('Love')) {
      prefix = 'hsc-u8-l4-' + num;
    } else if (item.unit.includes('Unit 9: Lesson 2') || item.unit.includes('Problems in Bangladesh')) {
      prefix = 'hsc-u9-l2-' + num;
    } else if (item.unit.includes('Unit 9: Lesson 3') || item.unit.includes('Child Marriage')) {
      prefix = 'hsc-u9-l3-' + num;
    } else if (item.unit.includes('Unit 9: Lesson 4') || item.unit.includes('Story of Shilpi')) {
      prefix = 'hsc-u9-l4-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 9 added ${unit9NewLessonsWords.length} new words.`);

    // Update hscUnitsData.js for Unit 9
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-9',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u9-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u9-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u9-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u9-l4',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-9',
    number: 9,
    unitNumber: 'Unit 9',
    unitTitle: 'Adolescence',
    unitTitleBn: 'বয়ঃসন্ধিকাল ও মানসিক পরিবর্তন',
    bgClass: 'bg-[#d97706] hover:bg-[#b45309]',
    gradient: 'from-[#f59e0b] to-[#d97706]',
    progress: 0,
    totalWords: 86,
    masteredWords: 0,
    lessons: [
      { id: 'u9-l1', number: 'Lesson 1', title: 'The Storm and Stress at Adolescence', titleBn: 'বয়ঃসন্ধিকালের ঝড় ও চাপ', questionsCount: '২৪৪ টি প্রশ্ন', wordsCount: 61, progress: 0 },
      { id: 'u9-l2', number: 'Lesson 2', title: 'Adolescence and Some (Related) Problems in Bangladesh', titleBn: 'কৈশোর ও সমস্যা', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u9-l3', number: 'Lesson 3', title: 'Why Does Child Marriage Happen?', titleBn: 'বাল্যবিবাহ কেন ঘটে?', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u9-l4', number: 'Lesson 4', title: 'The Story of Shilpi', titleBn: 'শিল্পীর গল্প', questionsCount: '৩৬ টি প্রশ্ন', wordsCount: 9, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 9!');
  });
}
