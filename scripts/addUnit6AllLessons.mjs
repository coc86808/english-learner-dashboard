import fs from 'fs';

const unit6AllLessonsWords = [
  // --- Lesson 1: What is a Dream? (15 words) ---
  {
    "id": "vocab-u6-l1-01",
    "word": "Empirical",
    "bengaliMeaning": "বাস্তবধর্মী / পরীক্ষণভিত্তিক / প্রত্যক্ষ অভিজ্ঞতানির্ভর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Experimental, observational, factual, practical, verifiable",
    "antonyms": "Theoretical, hypothetical, speculative, conjectural",
    "englishMeaning": "Based on, concerned with, or verifiable by observation or experience rather than theory.",
    "exampleSentence": "Only recently have sleep and dreams been subjected to empirical scientific analysis.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Dhaka Board Standard, Unit 6"
  },
  {
    "id": "vocab-u6-l1-02",
    "word": "Vivid",
    "bengaliMeaning": "সুস্পষ্ট / উজ্জ্বল / প্রাণবন্ত ও সতেজ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Clear, graphic, striking, brilliant, detailed",
    "antonyms": "Vague, dull, indistinct, blurry",
    "englishMeaning": "Producing powerful feelings or strong, clear images in the mind.",
    "exampleSentence": "Some people recall extraordinarily vivid dreams filled with intense colors.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u6-l1-03",
    "word": "Vague",
    "bengaliMeaning": "অস্পষ্ট / অনির্দিষ্ট / ধোঁয়াটে স্মৃতি",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unclear, hazy, indistinct, shadowy, ambiguous",
    "antonyms": "Vivid, precise, distinct, definite",
    "englishMeaning": "Of uncertain, indefinite, or unclear character or meaning.",
    "exampleSentence": "He had only a vague and fleeting recollection of what happened in the night.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u6-l1-04",
    "word": "Baffling",
    "bengaliMeaning": "বিভ্রান্তিকর / হতবুদ্ধিকর / জটিল ধাঁধা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Perplexing, puzzling, mystifying, enigmatic, bewildering",
    "antonyms": "Clear, straightforward, fathomable, simple",
    "englishMeaning": "Impossible to understand; completely perplexing.",
    "exampleSentence": "The exact evolutionary purpose of sleep remains a baffling question to scientists.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u6-l1-05",
    "word": "Consensus",
    "bengaliMeaning": "সর্বসম্মত অভিমত / সামগ্রিক ঐক্যমত",
    "partsOfSpeech": "Noun",
    "synonyms": "Agreement, unanimity, accord, harmony, general consent",
    "antonyms": "Disagreement, conflict, discord, dissension",
    "englishMeaning": "A general agreement among members of a group or community.",
    "exampleSentence": "No scientific consensus has emerged regarding the primary biological function of dreaming.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u6-l1-06",
    "word": "Unraveling",
    "bengaliMeaning": "রহস্য উন্মোচন করা / জটিলতার জট খোলা",
    "partsOfSpeech": "Verb",
    "synonyms": "Deciphering, untangling, solving, explaining, clarifying",
    "antonyms": "Complicating, entangling, obscuring",
    "englishMeaning": "Investigating and solving or explaining something complicated.",
    "exampleSentence": "Neurologists are gradually unraveling the neural pathways activated during sleep.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u6-l1-07",
    "word": "Psychoanalytic",
    "bengaliMeaning": "মনোসমীক্ষণমূলক / মনস্তাত্ত্বিক বিশ্লেষণধর্মী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Psychological, psychoanalytical, psychiatric",
    "antonyms": "Physiological, purely physical",
    "englishMeaning": "Relating to psychoanalysis, the psychological theory and therapy developed by Freud.",
    "exampleSentence": "The psychoanalytic perspective treats dreams as symbolic windows into the unconscious.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u6-l1-08",
    "word": "Subconscious",
    "bengaliMeaning": "অবচেতন / অন্তলীন মানসিক স্তর",
    "partsOfSpeech": "Noun",
    "synonyms": "Subliminal mind, unconscious, repressed self, innermost thoughts",
    "antonyms": "Conscious awareness, wakefulness",
    "englishMeaning": "The part of the mind of which one is not fully aware but which influences actions and feelings.",
    "exampleSentence": "Unresolved anxieties from daytime often manifest through the subconscious mind.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u6-l1-09",
    "word": "Repressed",
    "bengaliMeaning": "অবদমিত / সচেতন মন থেকে দমনকৃত ইচ্ছা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Suppressed, smothered, stifled, hidden, bottled up",
    "antonyms": "Expressed, released, uninhibited, voiced",
    "englishMeaning": "Characterized by the suppression of impulses or desires.",
    "exampleSentence": "Freud famously declared dreams to be disguised fulfillments of repressed wishes.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u6-l1-10",
    "word": "Interpretation",
    "bengaliMeaning": "ব্যাখ্যা / তাৎপর্য বিশ্লেষণ / নিহিতার্থ",
    "partsOfSpeech": "Noun",
    "synonyms": "Explanation, analysis, decipherment, evaluation, reading",
    "antonyms": "Misinterpretation, confusion, misunderstanding",
    "englishMeaning": "The action of explaining the meaning of something.",
    "exampleSentence": "Dream interpretation has been practiced across human civilizations since antiquity.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u6-l1-11",
    "word": "Subjective",
    "bengaliMeaning": "আত্মগত / ব্যক্তিগত অনুভূতি ও দৃষ্টিভঙ্গিভিত্তিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Personal, individual, idiosyncratic, intuitive",
    "antonyms": "Objective, impartial, empirical, universal",
    "englishMeaning": "Based on or influenced by personal feelings, tastes, or opinions.",
    "exampleSentence": "The emotional impact of a nighttime vision is entirely subjective to the dreamer.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u6-l1-12",
    "word": "Cognitive",
    "bengaliMeaning": "বুদ্ধিবৃত্তিক / জ্ঞান ও উপলব্ধিসম্পর্কিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Mental, intellectual, perceptual, rational, cognitive-process",
    "antonyms": "Instinctive, visceral, mindless",
    "englishMeaning": "Relating to cognition; the mental process of acquiring knowledge and understanding.",
    "exampleSentence": "Dreams help synthesize memories and strengthen cognitive abilities during sleep.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u6-l1-13",
    "word": "Stimuli",
    "bengaliMeaning": "উত্তেজক সংকেত / উদ্দীপক / প্রেরণা",
    "partsOfSpeech": "Noun",
    "synonyms": "Incentives, impulses, triggers, inputs, prods",
    "antonyms": "Deterrents, suppressants, depressants",
    "englishMeaning": "Things that evoke a specific functional reaction in an organ or tissue.",
    "exampleSentence": "External sensory stimuli like barking dogs can be woven into the fabric of a dream.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "HSC Board Standard, Unit 6"
  },
  {
    "id": "vocab-u6-l1-14",
    "word": "Clutter",
    "bengaliMeaning": "এলোমেলো আবর্জনা / মানসিক বিশৃঙ্খলা ও জট",
    "partsOfSpeech": "Noun",
    "synonyms": "Disorder, mess, jumble, litter, chaos",
    "antonyms": "Neatness, order, clarity, tidiness",
    "englishMeaning": "A collection of things lying about in an untidy mass; mental mess.",
    "exampleSentence": "One theory suggests dreams clear out unnecessary neural clutter from memory.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u6-l1-15",
    "word": "Psychotherapy",
    "bengaliMeaning": "মানসিক রোগের মনস্তাত্ত্বিক চিকিৎসা",
    "partsOfSpeech": "Noun",
    "synonyms": "Counseling, psychological therapy, psychoanalysis, healing",
    "antonyms": "Somatic medication",
    "englishMeaning": "The treatment of mental disorders by psychological rather than medical means.",
    "exampleSentence": "Some psychologists believe dreaming serves as natural, nocturnal psychotherapy.",
    "unit": "Unit 6: Lesson 1 (What is a Dream?)",
    "boardExamTag": "Jashore Board Exam"
  },

  // --- Lesson 2: Dreams in Literature (10 words) ---
  {
    "id": "vocab-u6-l2-01",
    "word": "Strive",
    "bengaliMeaning": "কঠোর প্রচেষ্টা চালানো / ক্লান্তিহীন সংগ্রাম করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Struggle, endeavor, labor, aspire, toil",
    "antonyms": "Surrender, yield, give up, idle",
    "englishMeaning": "Make great efforts to achieve or obtain something.",
    "exampleSentence": "Poets give voice to the noble ideals for which brave reformers strive.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Dhaka Board Standard, Unit 6"
  },
  {
    "id": "vocab-u6-l2-02",
    "word": "Renaissance",
    "bengaliMeaning": "পুনর্জাগরণ / নবজাগরণ / সাহিত্য ও সংস্কৃতির নবযুগ",
    "partsOfSpeech": "Noun",
    "synonyms": "Revival, rebirth, renewal, resurgence, regeneration",
    "antonyms": "Decay, decline, collapse, stagnation",
    "englishMeaning": "A revival of or renewed interest in something, especially culture or art.",
    "exampleSentence": "Langston Hughes was a leading intellectual voice of the Harlem Renaissance.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u6-l2-03",
    "word": "Recesses",
    "bengaliMeaning": "অন্তঃস্থল / মনের নির্জন ও গোপন কুঠুরি",
    "partsOfSpeech": "Noun",
    "synonyms": "Depths, alcoves, innermost chambers, corners, interior",
    "antonyms": "Surface, exterior, outside",
    "englishMeaning": "Small spaces created by building part of a wall further back from the rest; innermost parts.",
    "exampleSentence": "Nighttime dreams often vanish back into the dusty recesses of the mind.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u6-l2-04",
    "word": "Vanity",
    "bengaliMeaning": "অসারতা / শূন্যগর্ভ মোহ / নিস্ফল অহংকার",
    "partsOfSpeech": "Noun",
    "synonyms": "Futility, worthlessness, hollowness, illusion, conceit",
    "antonyms": "Substance, value, humility, truth",
    "englishMeaning": "The quality of being worthless or futile.",
    "exampleSentence": "Those who dream only in sleep awaken to discover that their hopes were mere vanity.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u6-l2-05",
    "word": "Barren",
    "bengaliMeaning": "অনুর্বর / বন্ধ্যা / শস্যহীন শুষ্ক প্রান্তর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Infertile, sterile, desolate, arid, unproductive",
    "antonyms": "Fertile, productive, fruitful, flourishing",
    "englishMeaning": "Too poor to produce much or any vegetation; bleak and lifeless.",
    "exampleSentence": "When cherished dreams die, human life resembles a frozen and barren field.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u6-l2-06",
    "word": "Daydream",
    "bengaliMeaning": "দিবাস্বপ্ন / জাগ্রত অবস্থার মধুর কল্পনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Reverie, fantasy, vision, musing, trance",
    "antonyms": "Harsh reality, concrete fact",
    "englishMeaning": "A series of pleasant thoughts that distract one's attention from the present.",
    "exampleSentence": "Action-oriented thinkers turn their waking daydream into transformative reality.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u6-l2-07",
    "word": "Hallucination",
    "bengaliMeaning": "দৃষ্টিবিভ্রম / অলীক প্রত্যক্ষ / মায়া",
    "partsOfSpeech": "Noun",
    "synonyms": "Illusion, delusion, mirage, apparition, phantom",
    "antonyms": "Concrete reality, truth",
    "englishMeaning": "An experience involving the apparent perception of something not present.",
    "exampleSentence": "Extreme sleep deprivation causes bizarre waking hallucinations in humans.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u6-l2-08",
    "word": "Reverie",
    "bengaliMeaning": "দিবাস্বপ্ন / তন্ময় ধ্যানমগ্নতা / আত্মমগ্ন অবস্থা",
    "partsOfSpeech": "Noun",
    "synonyms": "Daydream, musing, trance, contemplative dream",
    "antonyms": "Alert wakefulness, vigilance",
    "englishMeaning": "A state of being pleasantly lost in one's thoughts; a daydream.",
    "exampleSentence": "She was lost in a peaceful reverie while listening to the raindrops.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u6-l2-09",
    "word": "Silvery",
    "bengaliMeaning": "রূপালি / উজ্জ্বল স্নিগ্ধ শুভ্র আভা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Shining, lustrous, radiant, argent, gleaming",
    "antonyms": "Dull, tarnished, dark",
    "englishMeaning": "Resembling or having the bright luster of silver.",
    "exampleSentence": "The silvery moonlight reflected gently across the surface of the quiet lake.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u6-l2-10",
    "word": "Patriots",
    "bengaliMeaning": "দেশপ্রেমিক নাগরিকগণ / স্বদেশের একনিষ্ঠ সেবক",
    "partsOfSpeech": "Noun",
    "synonyms": "Loyalists, nationalists, devoted citizens, freedom champions",
    "antonyms": "Traitors, betrayers, defectors",
    "englishMeaning": "People who vigorously support their country and are prepared to defend it.",
    "exampleSentence": "Poets celebrate the enduring dreams of patriots who struggle for their country's liberty.",
    "unit": "Unit 6: Lesson 2 (Dreams in Literature)",
    "boardExamTag": "HSC Board Standard, Unit 6"
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
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 6:'));
    const combined = [...existingOtherWords, ...unit6AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 6 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 5: Lesson 5'\) \|\| item\.unit\.includes\('Frederick Douglass'\)\) \{\s*prefix = 'hsc-u5-l5-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 5: Lesson 5') || item.unit.includes('Frederick Douglass')) {
      prefix = 'hsc-u5-l5-' + num;
    } else if (item.unit.includes('Unit 6: Lesson 1') || item.unit.includes('What is a Dream')) {
      prefix = 'hsc-u6-l1-' + num;
    } else if (item.unit.includes('Unit 6: Lesson 2') || item.unit.includes('Dreams in Literature')) {
      prefix = 'hsc-u6-l2-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 6 added ${unit6AllLessonsWords.length} words.`);

    // Update hscUnitsData.js for Unit 6
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-6',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u6-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u6-l2',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-6',
    number: 6,
    unitNumber: 'Unit 6',
    unitTitle: 'Dreams',
    unitTitleBn: 'স্বপ্ন ও মানব আকাঙ্ক্ষা',
    bgClass: 'bg-[#c21818] hover:bg-[#d62020]',
    gradient: 'from-[#d62020] to-[#960f0f]',
    progress: 0,
    totalWords: 25,
    masteredWords: 0,
    lessons: [
      { id: 'u6-l1', number: 'Lesson 1', title: 'What is a Dream?', titleBn: 'স্বপ্ন কী?', questionsCount: '৬০ টি প্রশ্ন', wordsCount: 15, progress: 0 },
      { id: 'u6-l2', number: 'Lesson 2', title: 'Dreams in Literature', titleBn: 'সাহিত্যে স্বপ্ন', questionsCount: '৪০ টি প্রশ্ন', wordsCount: 10, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 6!');
  });
}
