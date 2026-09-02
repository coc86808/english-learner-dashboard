import fs from 'fs';

const unit8AllLessonsWords = [
  // --- Lesson 1: Family Relationship (8 words) ---
  {
    "id": "vocab-u8-l1-01",
    "word": "Companionship",
    "bengaliMeaning": "সঙ্গ / সাহচর্য / সৌহার্দ্যপূর্ণ বন্ধুত্ব",
    "partsOfSpeech": "Noun",
    "synonyms": "Fellowship, company, camaraderie, partnership, friendship",
    "antonyms": "Isolation, solitude, loneliness, alienation",
    "englishMeaning": "A feeling of fellowship or friendship.",
    "exampleSentence": "Human beings innately crave meaningful companionship and warmth.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Dhaka Board Standard, Unit 8"
  },
  {
    "id": "vocab-u8-l1-02",
    "word": "Familial",
    "bengaliMeaning": "পারিবারিক / রক্তসম্পর্ক ও বংশীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Domestic, genealogical, ancestral, maternal, kin-based",
    "antonyms": "Non-familial, unrelated, foreign",
    "englishMeaning": "Relating to or occurring in a family or its members.",
    "exampleSentence": "Close familial bonds serve as a safety net through turbulent life crises.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u8-l1-03",
    "word": "Intimate",
    "bengaliMeaning": "অন্তরঙ্গ / নিবিড় / অত্যন্ত গভীর ও বিশ্বস্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Close, confidential, warm, deep, affectionate",
    "antonyms": "Distant, cold, aloof, estranged",
    "englishMeaning": "Closely acquainted; familiar, close, or personal.",
    "exampleSentence": "True friendship develops into an intimate bond of mutual trust.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u8-l1-04",
    "word": "Fostered",
    "bengaliMeaning": "লালিত-পালিত বা গড়ে তোলা / পরিপুষ্ট করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Nurtured, cultivated, encouraged, promoted, cherished",
    "antonyms": "Neglected, stifled, suppressed, discouraged",
    "englishMeaning": "Encouraged or promoted the development of something desirable.",
    "exampleSentence": "Healthy emotional security is fostered within supportive family environments.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u8-l1-05",
    "word": "Redoubles",
    "bengaliMeaning": "বহুগুণ বৃদ্ধি পায় / দ্বিগুণ হওয়া বা তীব্রতর হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Multiplies, intensifies, amplifies, increases, heightens",
    "antonyms": "Decreases, diminishes, halves, reduces",
    "englishMeaning": "Makes or becomes much greater, more intense, or numerous.",
    "exampleSentence": "Sharing happiness with beloved peers simply redoubles the joy.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u8-l1-06",
    "word": "Possessive",
    "bengaliMeaning": "স্বত্বাধিকারী / মাত্রাতিরিক্ত দখলদারিত্বপ্রবণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Controlling, domineering, jealous, grasping, overbearing",
    "antonyms": "Generous, sharing, unselfish, liberal",
    "englishMeaning": "Demanding someone's total attention and love, or unwilling to share.",
    "exampleSentence": "Excessively possessive behavior can suffocate interpersonal relationships.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u8-l1-07",
    "word": "Quarrelling",
    "bengaliMeaning": "কলহ / বিবাদে লিপ্ত হওয়া / বাকবিতণ্ডা",
    "partsOfSpeech": "Noun",
    "synonyms": "Disputing, bickering, wrangling, feuding, squabbling",
    "antonyms": "Harmonizing, co-operating, agreeing",
    "englishMeaning": "Having an angry argument or disagreement.",
    "exampleSentence": "Endless domestic quarrelling causes severe emotional distress to developing children.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u8-l1-08",
    "word": "Preconditions",
    "bengaliMeaning": "পূর্বশর্ত / আবশ্যিক প্রাথমিক শর্তমালা",
    "partsOfSpeech": "Noun",
    "synonyms": "Prerequisites, requirements, essentials, foundations",
    "antonyms": "Consequences, subsequent outcomes",
    "englishMeaning": "Conditions that must exist or be established before something can occur.",
    "exampleSentence": "Mutual respect and loyalty are indispensable preconditions for enduring friendships.",
    "unit": "Unit 8: Lesson 1 (Family)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 2: Warmth in Relationships (8 words) ---
  {
    "id": "vocab-u8-l2-01",
    "word": "Blueblack",
    "bengaliMeaning": "কালচে নীল / হাড়কাঁপানো ঘোর শৈত্য ও অন্ধকার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Deep-navy, midnight-shade, freezing-darkness",
    "antonyms": "Bright dawn, warm sunshine",
    "englishMeaning": "Of a very dark blue color approaching black.",
    "exampleSentence": "The father arose in the bitter blueblack cold before dawn.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Dhaka Board Standard, Unit 8"
  },
  {
    "id": "vocab-u8-l2-02",
    "word": "Banked",
    "bengaliMeaning": "জ্বালিয়ে রাখা আগুন / ছাইচাপা রাখা আগুন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Stoked, heaped, sustained, contained fire",
    "antonyms": "Extinguished, doused, quenched",
    "englishMeaning": "Built up a fire with fuel and banked it so that it burns slowly.",
    "exampleSentence": "He made the banked fireplace embers blaze into comforting warmth.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u8-l2-03",
    "word": "Splintering",
    "bengaliMeaning": "তীব্র ঠাণ্ডায় ফেটে যাওয়া / চিড় ধরা",
    "partsOfSpeech": "Verb",
    "synonyms": "Cracking, shattering, fracturing, splitting, breaking",
    "antonyms": "Melting, fusing, mending",
    "englishMeaning": "Breaking or causing to break into small sharp fragments.",
    "exampleSentence": "The boy woke to hear the morning frost splintering against the floorboards.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u8-l2-04",
    "word": "Chronic",
    "bengaliMeaning": "দীর্ঘস্থায়ী / স্থায়ী মনস্তাত্ত্বিক ক্ষোভ বা টানাপোড়েন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Persistent, constant, lingering, habitual, inveterate",
    "antonyms": "Temporary, acute, ephemeral",
    "englishMeaning": "Persisting for a long time or constantly recurring.",
    "exampleSentence": "The home was shadowed by the chronic angers of poverty and labor.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u8-l2-05",
    "word": "Indifferently",
    "bengaliMeaning": "উদাসীনভাবে / অনাগ্রহভরে / তাচ্ছিল্যের সাথে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Casually, coolly, detachedly, unenthusiastically",
    "antonyms": "Warmly, affectionately, passionately",
    "englishMeaning": "In a way that shows no particular interest or sympathy; unconcernedly.",
    "exampleSentence": "The young son spoke indifferently to a father who gave his all.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u8-l2-06",
    "word": "Austere",
    "bengaliMeaning": "কঠোর / ভাবাবেগহীন সংযমী ও ত্যাগী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Stern, severe, strict, self-denying, rigorous",
    "antonyms": "Indulgent, lavish, luxurious, lenient",
    "englishMeaning": "Severe or strict in manner, attitude, or appearance.",
    "exampleSentence": "A parent's love often expresses itself through austere and thankless sacrifices.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u8-l2-07",
    "word": "Offices",
    "bengaliMeaning": "স্নেহের সেবামূলক কর্তব্য ও দায়িত্ব",
    "partsOfSpeech": "Noun",
    "synonyms": "Services, duties, obligations, acts of devotion",
    "antonyms": "Neglect, dereliction, abandons",
    "englishMeaning": "Services, duties, or acts done for other people.",
    "exampleSentence": "The poet lamented not appreciating his father's austere and lonely offices.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u8-l2-08",
    "word": "Ached",
    "bengaliMeaning": "বেদনাতুর / ব্যথায় টনটন করছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Pained, smarted, throbbed, hurt, agonized",
    "antonyms": "Healed, eased, rested",
    "englishMeaning": "Suffered a continuous dull pain from rigorous physical strain.",
    "exampleSentence": "His rough hands ached with fissures caused by harsh winter quarry work.",
    "unit": "Unit 8: Lesson 2 (Warmth)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 3: A Mother in Mannville (10 words) ---
  {
    "id": "vocab-u8-l3-01",
    "word": "Splendid",
    "bengaliMeaning": "চমৎকার / অসাধারণ সুন্দর ও প্রশংসনীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Magnificent, marvelous, superb, impressive, admirable",
    "antonyms": "Terrible, poor, wretched, meager",
    "englishMeaning": "Magnificent; very impressive, excellent, or grand.",
    "exampleSentence": "The young orphan boy chopped a splendid pile of dense mountain hardwood.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Dhaka Board Standard, Unit 8"
  },
  {
    "id": "vocab-u8-l3-02",
    "word": "Kindling",
    "bengaliMeaning": "আগুন ধরানোর শুকনো কাঠ / জ্বালানি কাঠি",
    "partsOfSpeech": "Noun",
    "synonyms": "Tinder, firesticks, firewood, dry splinters",
    "antonyms": "Damp logs, waterlogged wood",
    "englishMeaning": "Easily combustible small sticks or twigs used for starting a fire.",
    "exampleSentence": "Jerry stacked dry cedar kindling neatly beside the cabin chimney.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u8-l3-03",
    "word": "Integrity",
    "bengaliMeaning": "সততা ও চারিত্রিক ঋজুতা / নৈতিক দৃঢ়তা",
    "partsOfSpeech": "Noun",
    "synonyms": "Probity, uprightness, rectitude, honour, righteousness",
    "antonyms": "Dishonesty, corruption, deceitfulness",
    "englishMeaning": "The quality of being honest and having strong moral principles.",
    "exampleSentence": "Jerry possessed rare spiritual integrity that was deeply embedded in courage.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u8-l3-04",
    "word": "Orphanage",
    "bengaliMeaning": "এতিমখানা / অনাথ আশ্রম",
    "partsOfSpeech": "Noun",
    "synonyms": "Children's home, foundling asylum, foster home",
    "antonyms": "Paternal home, ancestral estate",
    "englishMeaning": "A residential institution for the care and education of orphans.",
    "exampleSentence": "The solitary boy had resided at the Carolina orphanage since infancy.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u8-l3-05",
    "word": "Substituted",
    "bengaliMeaning": "প্রতিস্থাপিত করেছিল / বদল করল",
    "partsOfSpeech": "Verb",
    "synonyms": "Replaced, exchanged, swapped, alternated",
    "antonyms": "Retained, kept, preserved",
    "englishMeaning": "Used or added in place of something else.",
    "exampleSentence": "In his fantasy, Jerry substituted the loving writer for the mother he never had.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u8-l3-06",
    "word": "Magnificent",
    "bengaliMeaning": "জমকালো / গৌরবমণ্ডিত ও রাজকীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Grand, splendid, glorious, majestic, noble",
    "antonyms": "Pathetic, unimpressive, modest",
    "englishMeaning": "Extremely beautiful, elaborate, or impressive.",
    "exampleSentence": "He described his mother's imagined character in magnificent, glowing terms.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u8-l3-07",
    "word": "Anomalous",
    "bengaliMeaning": "অস্বাভাবিক / ব্যতিক্রমী ও অপ্রত্যাশিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Irregular, atypical, abnormal, aberrant, peculiar",
    "antonyms": "Normal, typical, standard, ordinary",
    "englishMeaning": "Deviating from what is standard, normal, or expected.",
    "exampleSentence": "Jerry's sudden fabrications appeared anomalous compared to his usual candid honesty.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u8-l3-08",
    "word": "Pretended",
    "bengaliMeaning": "ভণিতা বা ছলনা করেছিল / কাল্পনিক দাবি করেছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Feigned, faked, simulated, imagined, assumed",
    "antonyms": "Disclosed truthfully, acknowledged",
    "englishMeaning": "Behaved so as to make it appear that something was the case when in fact it was not.",
    "exampleSentence": "The lonely boy pretended his mother lived comfortably in faraway Mannville.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u8-l3-09",
    "word": "Bluntly",
    "bengaliMeaning": "সোজাসাপটাভাবে / কোনো রাখঢাক ছাড়া",
    "partsOfSpeech": "Adverb",
    "synonyms": "Plainly, directly, candidly, straightforwardly, curtly",
    "antonyms": "Subtly, gently, ambiguously, tactfully",
    "englishMeaning": "In an uncompromisingly forthright and direct way.",
    "exampleSentence": "The headmistress bluntly informed the writer that Jerry had no mother alive.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u8-l3-10",
    "word": "Grave",
    "bengaliMeaning": "গম্ভীর / ভাবলেশহীন ও ধীরস্থির",
    "partsOfSpeech": "Adjective",
    "synonyms": "Solemn, serious, somber, dignified, sober",
    "antonyms": "Playful, frivolous, lighthearted",
    "englishMeaning": "Giving cause for alarm; serious, solemn, and quiet.",
    "exampleSentence": "Jerry fixed his grave gray-blue eyes upon the distant mountain peaks.",
    "unit": "Unit 8: Lesson 3 (A Mother in Mannville)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // --- Lesson 4: Love - Butterfly Forever (9 words) ---
  {
    "id": "vocab-u8-l4-01",
    "word": "Psyche",
    "bengaliMeaning": "মানবিক আত্মা / মন ও প্রণোদনার উৎস",
    "partsOfSpeech": "Noun",
    "synonyms": "Soul, spirit, mind, inner self, subconscious",
    "antonyms": "Physical flesh, corporeal body",
    "englishMeaning": "The human soul, mind, or spirit.",
    "exampleSentence": "In classical Hellenic myths, the human psyche is symbolized with butterfly wings.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Dhaka Board Standard, Unit 8"
  },
  {
    "id": "vocab-u8-l4-02",
    "word": "Transient",
    "bengaliMeaning": "ক্ষণস্থায়ী / দ্রুত অপসীয়মান ও অনিত্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Ephemeral, fleeting, temporary, transitory, brief",
    "antonyms": "Permanent, eternal, everlasting, perpetual",
    "englishMeaning": "Lasting only for a short time; impermanent.",
    "exampleSentence": "A butterfly's fleeting dance reminds us of the transient sweetness of existence.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u8-l4-03",
    "word": "Asphalt",
    "bengaliMeaning": "পিচঢালা মসৃণ রাজপথ",
    "partsOfSpeech": "Noun",
    "synonyms": "Tarmac, bitumen, blacktop, paved road",
    "antonyms": "Dirt trail, unpaved path",
    "englishMeaning": "A dark bituminous substance used for surfacing roads.",
    "exampleSentence": "Rain slicked the glistening dark asphalt under flashing traffic lamps.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u8-l4-04",
    "word": "Windbreaker",
    "bengaliMeaning": "বাতাস প্রতিরোধী হালকা জ্যাকেট",
    "partsOfSpeech": "Noun",
    "synonyms": "Windcheater, anorak, light jacket, parka",
    "antonyms": "Woolen shawl",
    "englishMeaning": "A wind-resistant jacket with a close-fitting neck, waistband, and cuffs.",
    "exampleSentence": "He kept the addressed parcel sheltered inside his nylon windbreaker.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u8-l4-05",
    "word": "Cocoon",
    "bengaliMeaning": "গুটি / রূপান্তরের পূর্ববর্তী সুরক্ষা আবরণী",
    "partsOfSpeech": "Noun",
    "synonyms": "Chrysalis, protective casing, pupa shell",
    "antonyms": "Open atmosphere",
    "englishMeaning": "A silky case spun by insect larvae for protection in the pupal stage.",
    "exampleSentence": "The caterpillar patiently endures darkness within the cocoon before emerging.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u8-l4-06",
    "word": "Transformation",
    "bengaliMeaning": "আমূল রূপান্তর / গুণগত পরিবর্তন",
    "partsOfSpeech": "Noun",
    "synonyms": "Metamorphosis, evolution, conversion, transmogrification",
    "antonyms": "Stagnation, constancy, stagnation",
    "englishMeaning": "A marked change in form, nature, or appearance.",
    "exampleSentence": "The wondrous transformation from chrysalis to winged beauty evokes awe.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u8-l4-07",
    "word": "Umbrella",
    "bengaliMeaning": "ছাতা / বর্ষাতি আচ্ছাদন",
    "partsOfSpeech": "Noun",
    "synonyms": "Parasol, sunshade, canopy, brolly",
    "antonyms": "Rain shower",
    "englishMeaning": "A device consisting of a circular canopy of cloth on a folding metal frame.",
    "exampleSentence": "She crossed the stormy avenue sheltering underneath a tiny folding umbrella.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u8-l4-08",
    "word": "Fascinating",
    "bengaliMeaning": "মুগ্ধকর / অতি চমৎকার ও আকর্ষণীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Captivating, enchanting, spellbinding, alluring, dazzling",
    "antonyms": "Boring, repulsive, uninteresting, dull",
    "englishMeaning": "Extremely interesting and charming.",
    "exampleSentence": "Butterflies exhibit a fascinating spectrum of iridescence and symmetry.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u8-l4-09",
    "word": "Solitary",
    "bengaliMeaning": "একাকী / নির্জন ও নিঃসঙ্গ অবস্থান",
    "partsOfSpeech": "Adjective",
    "synonyms": "Lone, single, isolated, lonely, secluded",
    "antonyms": "Accompanied, social, crowded",
    "englishMeaning": "Done or existing alone; isolated.",
    "exampleSentence": "A solitary scarlet postbox stood desolate at the edge of the drenched crossing.",
    "unit": "Unit 8: Lesson 4 (Love)",
    "boardExamTag": "HSC Board Standard, Unit 8"
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
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 8:'));
    const combined = [...existingOtherWords, ...unit8AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 8 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 7: Lesson 3'\) \|\| item\.unit\.includes\('Unbeaten Girls'\)\) \{\s*prefix = 'hsc-u7-l3-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 7: Lesson 3') || item.unit.includes('Unbeaten Girls')) {
      prefix = 'hsc-u7-l3-' + num;
    } else if (item.unit.includes('Unit 8: Lesson 1') || item.unit.includes('Family')) {
      prefix = 'hsc-u8-l1-' + num;
    } else if (item.unit.includes('Unit 8: Lesson 2') || item.unit.includes('Warmth')) {
      prefix = 'hsc-u8-l2-' + num;
    } else if (item.unit.includes('Unit 8: Lesson 3') || item.unit.includes('A Mother in Mannville')) {
      prefix = 'hsc-u8-l3-' + num;
    } else if (item.unit.includes('Unit 8: Lesson 4') || item.unit.includes('Love')) {
      prefix = 'hsc-u8-l4-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 8 added ${unit8AllLessonsWords.length} words.`);

    // Update hscUnitsData.js for Unit 8
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-8',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u8-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u8-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u8-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u8-l4',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-8',
    number: 8,
    unitNumber: 'Unit 8',
    unitTitle: 'Relationships',
    unitTitleBn: 'মানবসম্পর্ক ও স্নেহবন্ধন',
    bgClass: 'bg-[#059669] hover:bg-[#10b981]',
    gradient: 'from-[#10b981] to-[#047857]',
    progress: 0,
    totalWords: 35,
    masteredWords: 0,
    lessons: [
      { id: 'u8-l1', number: 'Lesson 1', title: 'Family Relationship', titleBn: 'পারিবারিক সম্পর্ক', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u8-l2', number: 'Lesson 2', title: 'Warmth in Relationships', titleBn: 'সম্পর্কে উষ্ণতা (রবার্ট হেইডেন)', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u8-l3', number: 'Lesson 3', title: 'A Mother in Mannville', titleBn: 'ম্যানভিলে এক মা (জেরি)', questionsCount: '৪০ টি প্রশ্ন', wordsCount: 10, progress: 0 },
      { id: 'u8-l4', number: 'Lesson 4', title: 'Love (Butterfly Forever)', titleBn: 'ভালোবাসা (প্রজাপতি চিরন্তন)', questionsCount: '৩৬ টি প্রশ্ন', wordsCount: 9, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 8!');
  });
}
