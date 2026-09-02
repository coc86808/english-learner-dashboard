import fs from 'fs';

const unit1Lesson2Words = [
  {
    "id": "vocab-u1-l2-01",
    "word": "Revolutionise",
    "bengaliMeaning": "বিপ্লবী পরিবর্তন আনা / আমূল বদলে দেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Transform, modernize, overhaul, innovate",
    "antonyms": "Stagnate, preserve, deteriorate, ruin",
    "englishMeaning": "To fundamentally change something so that it is radically different and improved.",
    "exampleSentence": "Artificial intelligence has the potential to revolutionise the way we learn and teach.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dhaka Board 1st Paper, Unit 1"
  },
  {
    "id": "vocab-u1-l2-02",
    "word": "Personalised",
    "bengaliMeaning": "ব্যক্তিমাফিক / ব্যক্তিকেন্দ্রিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Customized, individualized, tailored, personal",
    "antonyms": "Standardized, generic, universal, uniform",
    "englishMeaning": "Designed or altered to meet the specific requirements or abilities of an individual student.",
    "exampleSentence": "AI can provide students with personalised learning experiences tailored to their pace.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },
  {
    "id": "vocab-u1-l2-03",
    "word": "Automate",
    "bengaliMeaning": "স্বয়ংক্রিয় করা / যন্ত্রচালিত করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Mechanize, computerize, streamline, systemize",
    "antonyms": "Operate manually, manualize, handcraft",
    "englishMeaning": "To convert a process or task to be operated largely by automatic electronic equipment.",
    "exampleSentence": "AI educational tools can automate repetitive grading tasks for teachers.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l2-04",
    "word": "Repetitive",
    "bengaliMeaning": "পুনরাবৃত্তিমূলক / একঘেয়ে",
    "partsOfSpeech": "Adjective",
    "synonyms": "Monotonous, recurrent, routine, tedious, reiterative",
    "antonyms": "Varied, diverse, sporadic, irregular",
    "englishMeaning": "Containing or characterized by repetition, especially when routine or uninteresting.",
    "exampleSentence": "Automating repetitive grading frees up valuable classroom time for teachers.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l2-05",
    "word": "Limitation",
    "bengaliMeaning": "সীমাবদ্ধতা / দুর্বলতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Restriction, shortcoming, constraint, boundary, flaw",
    "antonyms": "Strength, capability, freedom, infinity",
    "englishMeaning": "A limiting rule or condition; a lack of capacity or restrictive factor.",
    "exampleSentence": "While AI has immense benefits, it also has notable limitations in human empathy.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l2-06",
    "word": "Instructors",
    "bengaliMeaning": "প্রশিক্ষক / শিক্ষক / নির্দেশক",
    "partsOfSpeech": "Noun",
    "synonyms": "Teachers, educators, trainers, mentors, tutors",
    "antonyms": "Learners, students, pupils, trainees",
    "englishMeaning": "People who teach something or guide learning in an academic or training context.",
    "exampleSentence": "AI is designed to assist instructors in classroom management rather than replace them.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l2-07",
    "word": "Threat",
    "bengaliMeaning": "হুমকি / ভীতি / বিপদের লক্ষণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Danger, menace, hazard, risk, warning",
    "antonyms": "Protection, safety, blessing, reassurance",
    "englishMeaning": "A person or thing likely to cause damage, job loss, or danger.",
    "exampleSentence": "Some educators perceive automated software as a potential threat to their jobs.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u1-l2-08",
    "word": "Redundant",
    "bengaliMeaning": "অপ্রয়োজনীয় / বাহুল্য / কর্মহীন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unnecessary, surplus, expendable, superfluous",
    "antonyms": "Essential, indispensable, vital, required",
    "englishMeaning": "Not or no longer needed or useful; superfluous.",
    "exampleSentence": "Teachers fear technological automation might make human instructors redundant.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u1-l2-09",
    "word": "Implementing",
    "bengaliMeaning": "বাস্তবায়ন করা / প্রয়োগ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Executing, applying, enforcing, performing, carrying out",
    "antonyms": "Abandoning, delaying, halting, neglecting",
    "englishMeaning": "Putting a decision, plan, software, or agreement into effect.",
    "exampleSentence": "Implementing smart classroom software requires considerable financial investment.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l2-10",
    "word": "Interaction",
    "bengaliMeaning": "মিথস্ক্রিয়া / পারস্পরিক যোগাযোগ",
    "partsOfSpeech": "Noun",
    "synonyms": "Communication, dialogue, contact, interplay, connection",
    "antonyms": "Isolation, detachment, alienation, segregation",
    "englishMeaning": "Reciprocal action or social communication between individuals.",
    "exampleSentence": "Students need interpersonal human interaction alongside digital learning tools.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l2-11",
    "word": "Emotional",
    "bengaliMeaning": "মানসিক / আবেগীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Sentimental, psychological, affective, empathetic",
    "antonyms": "Unemotional, cold, indifferent, impassive",
    "englishMeaning": "Relating to a person's emotions, feelings, and psychological well-being.",
    "exampleSentence": "AI cannot replace the vital emotional support provided by empathetic teachers.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "HSC Board Standard, Unit 1"
  },
  {
    "id": "vocab-u1-l2-12",
    "word": "Heavily",
    "bengaliMeaning": "অতিরিক্ত মাত্রায় / গভীরভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Excessively, deeply, profoundly, severely",
    "antonyms": "Lightly, slightly, marginally, scarcely",
    "englishMeaning": "To a great degree; intensely or excessively.",
    "exampleSentence": "Relying too heavily on digital tools may hinder social skills development.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u1-l2-13",
    "word": "Impact",
    "bengaliMeaning": "প্রভাব ফেলা / প্রতিক্রিয়া সৃষ্টি করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Influence, affect, alter, impress, shape",
    "antonyms": "Leave unaffected, ignore, overlook",
    "englishMeaning": "To have a strong effect on someone or something.",
    "exampleSentence": "Overdependence on algorithms could impact students' critical reasoning negatively.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l2-14",
    "word": "Sensitive",
    "bengaliMeaning": "সংবেদনশীল / গোপনীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Confidential, delicate, private, secret",
    "antonyms": "Insensitive, public, open, resilient",
    "englishMeaning": "Requiring careful handling due to privacy, confidentiality, or security risks.",
    "exampleSentence": "Educational software must protect sensitive personal data collected from students.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l2-15",
    "word": "Crucial",
    "bengaliMeaning": "অত্যন্ত গুরুত্বপূর্ণ / নির্ণায়ক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Vital, critical, essential, pivotal, decisive",
    "antonyms": "Trivial, minor, insignificant, optional",
    "englishMeaning": "Decisive or critical, especially in the success or failure of something.",
    "exampleSentence": "EdTech companies play a crucial role in promoting ethical classroom tools.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l2-16",
    "word": "Ethically",
    "bengaliMeaning": "নৈতিকভাবে / ন্যায়সঙ্গতভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Morally, righteously, fairly, legitimately",
    "antonyms": "Unethically, immorally, dishonestly",
    "englishMeaning": "In a way that avoids activities that harm people or violate moral principles.",
    "exampleSentence": "Developers must ensure educational algorithms are deployed ethically.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l2-17",
    "word": "Responsibly",
    "bengaliMeaning": "দায়িত্বশীলতার সাথে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Accountably, conscientiously, sensibly, reliably",
    "antonyms": "Irresponsibly, carelessly, recklessly",
    "englishMeaning": "In a sensible, trustworthy, and accountable manner.",
    "exampleSentence": "Schools must use student analytics responsibly to safeguard pupil privacy.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u1-l2-18",
    "word": "Accessible",
    "bengaliMeaning": "সহজলভ্য / প্রবেশযোগ্য / ব্যবহারোপযোগী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Available, reachable, attainable, approachable",
    "antonyms": "Inaccessible, unreachable, limited, restricted",
    "englishMeaning": "Able to be easily reached, entered, used, or obtained by diverse users.",
    "exampleSentence": "Modern technology should be accessible to students from all socio-economic backgrounds.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Sylhet Board Exam"
  },
  {
    "id": "vocab-u1-l2-19",
    "word": "Broader",
    "bengaliMeaning": "ব্যাপক / বিস্তৃত / প্রশস্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Wider, extensive, comprehensive, expansive",
    "antonyms": "Narrower, restricted, confined",
    "englishMeaning": "Covering a large number and wide scope of subjects or individuals.",
    "exampleSentence": "Grants help make learning applications accessible to a broader range of schools.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l2-20",
    "word": "Alternative",
    "bengaliMeaning": "বিকল্প",
    "partsOfSpeech": "Adjective",
    "synonyms": "Substitute, optional, alternate, substitute",
    "antonyms": "Compulsory, mandatory, sole, fixed",
    "englishMeaning": "Available as another possibility or choice.",
    "exampleSentence": "Institutions explore alternative funding options to finance modern computing labs.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l2-21",
    "word": "Offset",
    "bengaliMeaning": "ক্ষতিপূরণ করা / সমন্বয় করা / ভারসাম্য রক্ষা করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Balance, compensate, counteract, neutralize",
    "antonyms": "Worsen, intensify, exacerbate, unbalance",
    "englishMeaning": "To counterbalance or compensate for a cost, loss, or disadvantage.",
    "exampleSentence": "Educational grants help offset the high costs of digital software subscriptions.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u1-l2-22",
    "word": "Augment",
    "bengaliMeaning": "বৃদ্ধি করা / সমৃদ্ধ করা / সম্পূরক হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Enhance, supplement, boost, expand, reinforce",
    "antonyms": "Diminish, reduce, decrease, weaken",
    "englishMeaning": "To make something greater by adding to it; to supplement.",
    "exampleSentence": "Classroom technology should augment teacher capabilities rather than replace them.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l2-23",
    "word": "Well-rounded",
    "bengaliMeaning": "পরিপূর্ণ / সর্বাঙ্গীণ / ভারসাম্যপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Comprehensive, balanced, versatile, complete",
    "antonyms": "One-sided, narrow, biased, incomplete",
    "englishMeaning": "Having a personality or education that is fully developed and well balanced.",
    "exampleSentence": "A well-rounded education combines both smart technology and human mentorship.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l2-24",
    "word": "Secured",
    "bengaliMeaning": "সুরক্ষিত / নিরাপদ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Protected, guarded, safe, safeguarded, fortified",
    "antonyms": "Unsecured, exposed, vulnerable, unprotected",
    "englishMeaning": "Protected against danger, unauthorized access, or loss.",
    "exampleSentence": "Student databases must be properly secured against unauthorized external breaches.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l2-25",
    "word": "Creativity",
    "bengaliMeaning": "সৃজনশীলতা / উদ্ভাবনী ক্ষমতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Inventiveness, imagination, originality, ingenuity",
    "antonyms": "Unimaginativeness, imitation, conformity",
    "englishMeaning": "The use of imagination or original ideas to create something artistic or novel.",
    "exampleSentence": "Current AI tools often lack the spontaneous creativity found in human minds.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l2-26",
    "word": "Originality",
    "bengaliMeaning": "মৌলিকত্ব / অভিনবত্ব",
    "partsOfSpeech": "Noun",
    "synonyms": "Novelty, uniqueness, freshness, authenticity",
    "antonyms": "Conventionality, reproduction, plagiarism",
    "englishMeaning": "The quality of being new, unique, and not derived from something else.",
    "exampleSentence": "Human teachers cultivate true originality and expressive thought in their students.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u1-l2-27",
    "word": "Overcome",
    "bengaliMeaning": "কাটিয়ে ওঠা / পরাস্ত করা / জয় করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Conquer, surmount, defeat, master, triumph over",
    "antonyms": "Succumb, surrender, yield, lose",
    "englishMeaning": "To succeed in dealing with a problem, difficulty, or obstacle.",
    "exampleSentence": "Future software updates aim to overcome algorithmic biases in language comprehension.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u1-l2-28",
    "word": "Innovative",
    "bengaliMeaning": "উদ্ভাবনী / আধুনিক / নতুন ধারণাসম্পন্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Inventive, novel, groundbreaking, state-of-the-art",
    "antonyms": "Traditional, outdated, conventional, old-fashioned",
    "englishMeaning": "Featuring new, original, and advanced methods or ideas.",
    "exampleSentence": "Innovative learning apps provide interactive visual exercises for complex topics.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l2-29",
    "word": "Implications",
    "bengaliMeaning": "তাৎপর্য / দূরবর্তী প্রভাব / ফলাফল",
    "partsOfSpeech": "Noun",
    "synonyms": "Consequences, ramifications, effects, repercussions",
    "antonyms": "Causes, origins, antecedents",
    "englishMeaning": "The conclusion that can be drawn from something or prospective future effects.",
    "exampleSentence": "Educators must carefully study the social implications of AI in education.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l2-30",
    "word": "Transparent",
    "bengaliMeaning": "স্বচ্ছ / স্পষ্ট / বোধগম্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Clear, open, candid, lucid, unambiguous",
    "antonyms": "Opaque, obscure, secretive, hidden",
    "englishMeaning": "Easy to perceive, understand, or examine; open to public scrutiny.",
    "exampleSentence": "AI algorithms should function in a transparent and explainable manner.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u1-l2-31",
    "word": "Governing",
    "bengaliMeaning": "নিয়ন্ত্রণকারী / পরিচালনাকারী / বিধানকারী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Regulating, controlling, directing, ruling",
    "antonyms": "Submitting, obeying, complying",
    "englishMeaning": "Having the power, duty, or legal authority to conduct policy and actions.",
    "exampleSentence": "Developers must comply with laws governing student data privacy and protection.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l2-32",
    "word": "Intellectual",
    "bengaliMeaning": "মেধাসম্পর্কিত / বুদ্ধিভিত্তিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Mental, cognitive, cerebral, scholarly",
    "antonyms": "Physical, bodily, non-intellectual",
    "englishMeaning": "Relating to the intellect, mental reasoning, and creative scholarship.",
    "exampleSentence": "Respecting intellectual property rights is essential when training AI models.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l2-33",
    "word": "Collaboration",
    "bengaliMeaning": "সহযোগিতা / যৌথ প্রচেষ্টা / মৈত্রী",
    "partsOfSpeech": "Noun",
    "synonyms": "Cooperation, partnership, alliance, teamwork",
    "antonyms": "Conflict, opposition, competition, rivalry",
    "englishMeaning": "The action of working together with someone to produce or create something.",
    "exampleSentence": "Close collaboration between teachers and software engineers yields better classroom tools.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l2-34",
    "word": "Valuable",
    "bengaliMeaning": "মূল্যবান / গুরুত্বপূর্ণ / কল্যাণকর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Precious, beneficial, worthy, priceless, helpful",
    "antonyms": "Worthless, useless, trivial, disadvantageous",
    "englishMeaning": "Extremely useful, helpful, or important.",
    "exampleSentence": "AI is a valuable addition to modern classrooms when used with proper pedagogical care.",
    "unit": "Unit 1: Lesson 2 (Education and Technology)",
    "boardExamTag": "Jashore Board Exam"
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
    // Filter out old unit 1 lesson 2 words if any
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 1: Lesson 2'));
    const combined = [...existingOtherWords, ...unit1Lesson2Words];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure prefix generation handles Unit 1 Lesson 2
    newContent = newContent.replace(
      /let prefix = 'hsc-u1-l1-' \+ num;[\s\S]*?if \(item\.unit\.includes\('Unit 9'\)/,
      `let prefix = 'hsc-u1-l1-' + num;
    if (item.unit.includes('Unit 1: Lesson 2') || item.unit.includes('Education and Technology')) {
      prefix = 'hsc-u1-l2-' + num;
    } else if (item.unit.includes('Unit 9')`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 1 Lesson 2 added ${unit1Lesson2Words.length} words.`);

    // Update hscUnitsData.js for Unit 1 Lesson 2
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-1',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u1-l1',[\s\S]*?wordsCount:\s*46,[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u1-l2',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-1',
    number: 1,
    unitNumber: 'Unit 1',
    unitTitle: 'Education and Life',
    unitTitleBn: 'শিক্ষা ও জীবন',
    bgClass: 'bg-[#1b8a43] hover:bg-[#1f9c4c]',
    gradient: 'from-[#1e9649] to-[#146e33]',
    progress: 0,
    totalWords: 80,
    masteredWords: 0,
    lessons: [
      { id: 'u1-l1', number: 'Lesson 1', title: "The Parrot's Tale", titleBn: 'তোতাকাহিনী', questionsCount: '১৮৪ টি প্রশ্ন', wordsCount: 46, progress: 0 },
      { id: 'u1-l2', number: 'Lesson 2', title: 'Education and Technology', titleBn: 'শিক্ষা ও প্রযুক্তি', questionsCount: '১৩৬ টি প্রশ্ন', wordsCount: 34, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 1 Lesson 2!');
  });
}
