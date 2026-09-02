import fs from 'fs';

const unit7AllLessonsWords = [
  // --- Lesson 1: Brojen Das: On Crossing the English Channel (12 words) ---
  {
    "id": "vocab-u7-l1-01",
    "word": "Electrified",
    "bengaliMeaning": "তড়িৎস্পৃষ্ট বা রোমাঞ্চিত করল / উদ্দীপিত করল",
    "partsOfSpeech": "Verb",
    "synonyms": "Thrilled, energized, galvanized, excited, stimulated",
    "antonyms": "Depressed, deadened, dispirited",
    "englishMeaning": "To arouse a sudden sense of great excitement or enthusiasm.",
    "exampleSentence": "The prospect of breaking a world record electrified the exhausted swimmer.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Dhaka Board Standard, Unit 7"
  },
  {
    "id": "vocab-u7-l1-02",
    "word": "Goaded",
    "bengaliMeaning": "প্রণোদিত বা তাড়িত করল / প্ররোচিত করল",
    "partsOfSpeech": "Verb",
    "synonyms": "Prodded, spurred, impelled, provoked, urged",
    "antonyms": "Dissuaded, restrained, discouraged",
    "englishMeaning": "Provoked or annoyed someone so as to stimulate some action or reaction.",
    "exampleSentence": "A passionate desire for national glory goaded him to swim across the freezing sea.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u7-l1-03",
    "word": "Treachery",
    "bengaliMeaning": "বিশ্বাসঘাতকতা / প্রকৃতির অপ্রত্যাশিত ঝুঁকি ও কপটতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Perfidiousness, betrayal, deceit, unpredictability, hazard",
    "antonyms": "Loyalty, dependability, constancy, reliability",
    "englishMeaning": "Betrayal of trust; deceptive or unpredictable danger.",
    "exampleSentence": "Channel swimmers must battle the treachery of sudden Atlantic squalls and currents.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u7-l1-04",
    "word": "Grit",
    "bengaliMeaning": "দৃঢ় মানসিক মনোবল / অটল সাহসিকতা ও চরিত্রবল",
    "partsOfSpeech": "Noun",
    "synonyms": "Courage, resolve, determination, pluck, fortitude",
    "antonyms": "Cowardice, spinelessness, timidity",
    "englishMeaning": "Courage and resolve; strength of character.",
    "exampleSentence": "Only athletes blessed with uncommon mental grit can subdue the English Channel.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u7-l1-05",
    "word": "Subdue",
    "bengaliMeaning": "বশীভূত বা জয় করা / দমন করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Conquer, overcome, tame, defeat, master",
    "antonyms": "Yield to, submit, succumb, surrender",
    "englishMeaning": "Overcome, quieten, or bring under control.",
    "exampleSentence": "Brojen was resolved to subdue the icy waters through sheer endurance.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u7-l1-06",
    "word": "Oblivious",
    "bengaliMeaning": "বেখবর / অচেতন / আশপাশের বিষয়ে আত্মমগ্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unaware, unconscious, heedless, unmindful, inattentive",
    "antonyms": "Aware, mindful, alert, conscious",
    "englishMeaning": "Not aware of or not concerned about what is happening around one.",
    "exampleSentence": "Engrossed in rhythm, he became oblivious of freezing temperature and distance.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u7-l1-07",
    "word": "Ebbing",
    "bengaliMeaning": "ক্ষয়িষ্ণু / ভাটার মতো হ্রাস পাওয়া বা কমে যাওয়া",
    "partsOfSpeech": "Adjective",
    "synonyms": "Dwindling, waning, receding, decaying, diminishing",
    "antonyms": "Surging, rising, swelling, increasing",
    "englishMeaning": "Gradually lessening or reducing.",
    "exampleSentence": "He fought valiantly to rally his ebbing energy in the final nautical miles.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u7-l1-08",
    "word": "Famished",
    "bengaliMeaning": "ক্ষুধার্ত / অনাহারে চরম কাতর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Starving, ravenous, hungry, malnourished, depleted",
    "antonyms": "Sated, full, satisfied, glutted",
    "englishMeaning": "Extremely hungry; starving.",
    "exampleSentence": "After swimming ten grueling hours, the famished athlete desperately pleaded for nourishment.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u7-l1-09",
    "word": "Proverbial",
    "bengaliMeaning": "প্রবাদপ্রতিম / বহুল পরিচিত ও দৃষ্টান্তমূলক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Legendary, well-known, famous, celebrated, renowned",
    "antonyms": "Unknown, obscure, nameless",
    "englishMeaning": "Well known, especially so as to be stereotypical.",
    "exampleSentence": "The elusive world record dangled before his vision like the proverbial carrot.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u7-l1-10",
    "word": "Craggy",
    "bengaliMeaning": "পাথুরে খাড়া / অসমতল শৈলময় ও ধারালো",
    "partsOfSpeech": "Adjective",
    "synonyms": "Rugged, steep, rocky, jagged, sharp",
    "antonyms": "Smooth, flat, level, even",
    "englishMeaning": "Rough and uneven; having many crags or steep rocks.",
    "exampleSentence": "He scraped his arms against craggy submerged rocks while staggering ashore.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u7-l1-11",
    "word": "Momentum",
    "bengaliMeaning": "গতিশক্তি / তীব্র গতিবেগ ও উদ্যম",
    "partsOfSpeech": "Noun",
    "synonyms": "Impetus, drive, thrust, velocity, force",
    "antonyms": "Inertia, stagnation, standstill",
    "englishMeaning": "The quantity of motion of a moving body; impetus gained by movement.",
    "exampleSentence": "Building strong swimming momentum helped him cut through turbulent coastal surf.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "HSC Board Standard, Unit 7"
  },
  {
    "id": "vocab-u7-l1-12",
    "word": "Breakers",
    "bengaliMeaning": "উত্তাল ফেনিল ঢেউ / আছড়ে পড়া তরঙ্গ",
    "partsOfSpeech": "Noun",
    "synonyms": "Surf, foaming waves, rollers, billows, ocean swells",
    "antonyms": "Calm water, stillness",
    "englishMeaning": "Heavy sea waves that break into white foam on rocks or a beach.",
    "exampleSentence": "Giant breakers tossed the swimmer violently as he approached the Kent shoreline.",
    "unit": "Unit 7: Lesson 1 (Brojen Das)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // --- Lesson 2: Scaling a Mountain Peak (11 words) ---
  {
    "id": "vocab-u7-l2-01",
    "word": "Icon",
    "bengaliMeaning": "অনুকরণীয় ব্যক্তিত্ব / প্রতীক / আদর্শ প্রতিমূর্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Symbol, idol, emblem, exemplar, paragon",
    "antonyms": "Nobody, nonentity",
    "englishMeaning": "A person or thing regarded as a representative symbol or as worthy of veneration.",
    "exampleSentence": "Nishat Mazumder is celebrated as a sporting icon across Bangladesh.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Dhaka Board Standard, Unit 7"
  },
  {
    "id": "vocab-u7-l2-02",
    "word": "Trekking",
    "bengaliMeaning": "দুর্গম পর্বতারোহণ যাত্রা / পদব্রজে গিরি অভিযান",
    "partsOfSpeech": "Noun",
    "synonyms": "Hiking, mountaineering, tramping, backpacking, rambling",
    "antonyms": "Resting, idling",
    "englishMeaning": "Go on a long arduous journey, typically on foot across rough terrain.",
    "exampleSentence": "She joined the mountaineering and trekking club to learn basic high-altitude survival.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u7-l2-03",
    "word": "Perseverance",
    "bengaliMeaning": "অধ্যবসায় / অবিচল নিষ্ঠা ও একনিষ্ঠ সাধনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Persistence, dedication, tenacity, steadfastness, resolve",
    "antonyms": "Laziness, quitting, surrender, irresolution",
    "englishMeaning": "Persistence in doing something despite difficulty or delay in achieving success.",
    "exampleSentence": "Reaching Mount Everest requires unwavering mental perseverance and physical discipline.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u7-l2-04",
    "word": "Calamitous",
    "bengaliMeaning": "বিপর্যয়কর / মারাত্মক দুর্দশাপূর্ণ ও ক্ষতিকর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Disastrous, catastrophic, tragic, ruinous, fatal",
    "antonyms": "Fortunate, blessed, favorable, prosperous",
    "englishMeaning": "Involving or resulting in great damage or disaster.",
    "exampleSentence": "Her mother maintained calm resilience even in the most calamitous moments.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u7-l2-05",
    "word": "Inevitable",
    "bengaliMeaning": "অনিবার্য / যা কোনোভাবেই ঠেকানো যায় না",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unavoidable, inescapable, certain, destined, sure",
    "antonyms": "Avoidable, uncertain, preventable",
    "englishMeaning": "Certain to happen; unavoidable.",
    "exampleSentence": "With unyielding willpower, conquering formidable obstacles becomes inevitable.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u7-l2-06",
    "word": "Conquest",
    "bengaliMeaning": "বিজয় / প্রতিকূলতা জয় করে প্রাধান্য অর্জন",
    "partsOfSpeech": "Noun",
    "synonyms": "Triumph, victory, subjugation, mastery, vanquishing",
    "antonyms": "Defeat, surrender, failure",
    "englishMeaning": "The overcoming of a problem or evil; the winning of something.",
    "exampleSentence": "Hillary and Tenzing's historic conquest of Everest inspired dreamers everywhere.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u7-l2-07",
    "word": "Expedition",
    "bengaliMeaning": "অভিযান / সুনির্দিষ্ট লক্ষ্যভিত্তিক দুঃসাহসিক যাত্রা",
    "partsOfSpeech": "Noun",
    "synonyms": "Venture, journey, exploration, excursion, trek",
    "antonyms": "Home-stay, stagnation",
    "englishMeaning": "A journey undertaken by a group of people with a particular purpose.",
    "exampleSentence": "She carried the flag of Bangladesh during the landmark 2012 Himalayan expedition.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u7-l2-08",
    "word": "Direst",
    "bengaliMeaning": "চরমতম / সবচেয়ে দুঃসহ ও ভয়ানক অবস্থা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Most dreadful, most desperate, most acute, gravest",
    "antonyms": "Mildest, happiest, easiest",
    "englishMeaning": "Extremely serious or urgent; most terrible.",
    "exampleSentence": "Even under the direst financial constraints, her family stood beside her dreams.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u7-l2-09",
    "word": "Cherished",
    "bengaliMeaning": "সযত্নে লালিত / অন্তরে সশ্রদ্ধ স্নেহে ধারণকৃত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Treasured, prized, valued, loved, fostered",
    "antonyms": "Scorned, neglected, disdained",
    "englishMeaning": "Protect and care for someone or something lovingly.",
    "exampleSentence": "To stand atop the highest peak on earth was her long cherished ambition.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u7-l2-10",
    "word": "Modest",
    "bengaliMeaning": "নম্র / সাধারণ / বাহুল্যবর্জিত ও নিরহঙ্কার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Humble, simple, unpretentious, unassuming, plain",
    "antonyms": "Arrogant, extravagant, haughty",
    "englishMeaning": "Unassuming in the estimation of one's abilities; relatively moderate.",
    "exampleSentence": "She emerged from a modest family background to achieve international renown.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "HSC Board Standard, Unit 7"
  },
  {
    "id": "vocab-u7-l2-11",
    "word": "Improbable",
    "bengaliMeaning": "অসম্ভবপ্রায় / সচরাচর অভাবনীয় ও অবিশ্বাস্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unlikely, doubtful, dubious, questionable",
    "antonyms": "Probable, likely, plausible",
    "englishMeaning": "Not likely to be true or to happen.",
    "exampleSentence": "Dreams that appear improbable at first can be realized through unrelenting perseverance.",
    "unit": "Unit 7: Lesson 2 (Scaling a Mountain Peak)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // --- Lesson 3: The Unbeaten Girls (11 words) ---
  {
    "id": "vocab-u7-l3-01",
    "word": "Miniature",
    "bengaliMeaning": "ক্ষুদ্র সংস্করণের / ক্ষুদ্রাকৃতির খেলনা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Small-scale, tiny, diminutive, compact, micro",
    "antonyms": "Giant, colossal, immense, massive",
    "englishMeaning": "Representing or being on a small or much smaller scale than normal.",
    "exampleSentence": "Traditional households gave girls miniature kitchen sets to groom them for domestic chores.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Dhaka Board Standard, Unit 7"
  },
  {
    "id": "vocab-u7-l3-02",
    "word": "Vigour",
    "bengaliMeaning": "শারীরিক প্রাণশক্তি / তেজ ও বলিষ্ঠ উদ্দীপনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Energy, vitality, robustness, stamina, dynamic strength",
    "antonyms": "Lethargy, weakness, fatigue, enervation",
    "englishMeaning": "Physical strength and good health; effort, energy, and enthusiasm.",
    "exampleSentence": "The young female athletes played ninety minutes of football with fierce vigour.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u7-l3-03",
    "word": "Counterparts",
    "bengaliMeaning": "সমকক্ষ ব্যক্তি বা প্রতিপক্ষ / সমান পদস্থ ব্যক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Equals, equivalents, peers, matches, complements",
    "antonyms": "Opposites, unequals",
    "englishMeaning": "Persons or things corresponding to others in another group or context.",
    "exampleSentence": "Female footballers proved they could equal and surpass their male counterparts.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u7-l3-04",
    "word": "Clinched",
    "bengaliMeaning": "চূড়ান্তভাবে জয় বা নিশ্চিত করল / ছিনিয়ে নিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Secured, won, settled, finalized, sealed, bagged",
    "antonyms": "Lost, forfeited, surrendered",
    "englishMeaning": "Confirmed or settled something conclusively; won an athletic competition.",
    "exampleSentence": "Bangladesh clinched the regional championship trophy with a breathtaking solitary goal.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u7-l3-05",
    "word": "Unbeaten",
    "bengaliMeaning": "অপরাজিত / সকল ম্যাচে অজেয় ও জয়ী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Undefeated, unconquered, victorious, invincible",
    "antonyms": "Defeated, beaten, vanquished",
    "englishMeaning": "Not defeated or bested; victorious throughout an entire tournament.",
    "exampleSentence": "The fearless squad returned from Bhutan as the proud unbeaten champions.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u7-l3-06",
    "word": "Epic",
    "bengaliMeaning": "মহাকাব্যিক / গৌরবোজ্জ্বল বীরত্বপূর্ণ মহৎ কীর্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Legendary saga, monumental feat, heroic tale, masterwork",
    "antonyms": "Petty event, trivial tale",
    "englishMeaning": "An exceptionally heroic or monumental achievement resembling a classical epic.",
    "exampleSentence": "The journey of Kalsindur footballers reads like an inspiring real-world epic.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u7-l3-07",
    "word": "Adversities",
    "bengaliMeaning": "প্রতিকূলতা / জীবনের কঠিন প্রতিবন্ধকতা ও দারিদ্র্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Hardships, misfortunes, obstacles, tribulations, distress",
    "antonyms": "Privileges, fortunes, prosperity",
    "englishMeaning": "Difficulties or misfortunes.",
    "exampleSentence": "Despite grappling with acute poverty and social bias, they overcame all adversities.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u7-l3-08",
    "word": "Malnutrition",
    "bengaliMeaning": "অপুষ্টিজনিত দুর্বলতা / পুষ্টির মারাত্মক অভাব",
    "partsOfSpeech": "Noun",
    "synonyms": "Undernourishment, nutritional deficiency, starvation",
    "antonyms": "Healthy nutrition, balanced diet",
    "englishMeaning": "Lack of proper nutrition, caused by not having enough to eat.",
    "exampleSentence": "Early in their careers, several young village girls suffered from chronic malnutrition.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u7-l3-09",
    "word": "Inhibition",
    "bengaliMeaning": "দ্বিধা / মানসিক জড়তা ও সামাজিক সংকোচ",
    "partsOfSpeech": "Noun",
    "synonyms": "Restraint, shyness, reticence, hesitancy, reserve",
    "antonyms": "Confidence, boldness, uninhibited freedom",
    "englishMeaning": "A feeling that makes one self-conscious and unable to act in a relaxed and natural way.",
    "exampleSentence": "The girls shook off all gendered inhibition once they stepped onto the green grass.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u7-l3-10",
    "word": "Persuaded",
    "bengaliMeaning": "প্ররোচিত বা সম্মত করেছিল / বোঝাতে সক্ষম হয়েছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Convinced, coaxed, influenced, swayed, induced",
    "antonyms": "Dissuaded, deterred, discouraged",
    "englishMeaning": "Induced someone to do something through reasoning or argument.",
    "exampleSentence": "Dedicated teachers persuaded skeptical parents to allow their daughters to practice.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u7-l3-11",
    "word": "Ambitious",
    "bengaliMeaning": "উচ্চাকাঙ্ক্ষী / লক্ষ্য পূরণে সংকল্পবদ্ধ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Aspiring, determined, driven, goal-oriented, enterprising",
    "antonyms": "Apathetic, unambitious, indifferent",
    "englishMeaning": "Having or showing a strong desire and determination to succeed.",
    "exampleSentence": "Even humble daily-wage earners became ambitious supporters of their daughters' goals.",
    "unit": "Unit 7: Lesson 3 (The Unbeaten Girls)",
    "boardExamTag": "HSC Board Standard, Unit 7"
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
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 7:'));
    const combined = [...existingOtherWords, ...unit7AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 7 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 6: Lesson 2'\) \|\| item\.unit\.includes\('Dreams in Literature'\)\) \{\s*prefix = 'hsc-u6-l2-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 6: Lesson 2') || item.unit.includes('Dreams in Literature')) {
      prefix = 'hsc-u6-l2-' + num;
    } else if (item.unit.includes('Unit 7: Lesson 1') || item.unit.includes('Brojen Das')) {
      prefix = 'hsc-u7-l1-' + num;
    } else if (item.unit.includes('Unit 7: Lesson 2') || item.unit.includes('Scaling a Mountain')) {
      prefix = 'hsc-u7-l2-' + num;
    } else if (item.unit.includes('Unit 7: Lesson 3') || item.unit.includes('Unbeaten Girls')) {
      prefix = 'hsc-u7-l3-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 7 added ${unit7AllLessonsWords.length} words.`);

    // Update hscUnitsData.js for Unit 7
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-7',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u7-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u7-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u7-l3',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-7',
    number: 7,
    unitNumber: 'Unit 7',
    unitTitle: 'Youthful Achievers',
    unitTitleBn: 'তারুণ্যের অর্জন ও সাফল্য',
    bgClass: 'bg-[#d97706] hover:bg-[#b45309]',
    gradient: 'from-[#f59e0b] to-[#d97706]',
    progress: 0,
    totalWords: 34,
    masteredWords: 0,
    lessons: [
      { id: 'u7-l1', number: 'Lesson 1', title: 'Brojen Das: On Crossing the English Channel', titleBn: 'ব্রজেন দাস ও ইংলিশ চ্যানেল', questionsCount: '৪৮ টি প্রশ্ন', wordsCount: 12, progress: 0 },
      { id: 'u7-l2', number: 'Lesson 2', title: 'Scaling a Mountain Peak', titleBn: 'পর্বতচূড়া আরোহণ', questionsCount: '৪৪ টি প্রশ্ন', wordsCount: 11, progress: 0 },
      { id: 'u7-l3', number: 'Lesson 3', title: 'The Unbeaten Girls', titleBn: 'অপরাজিত বালিকারা (কলসিন্দুর)', questionsCount: '৪৪ টি প্রশ্ন', wordsCount: 11, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 7!');
  });
}
