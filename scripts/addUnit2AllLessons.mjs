import fs from 'fs';

export const unit2Vocabulary = [
  // -------------------------------------------------------------
  // LESSON 1: What is Beauty? (22 Words)
  // -------------------------------------------------------------
  {
    "id": "vocab-u2-l1-01",
    "word": "Appreciate",
    "bengaliMeaning": "মূল্যায়ন করা / প্রশংসা করা / যথার্থ অনুধাবন করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Value, cherish, admire, esteem, acknowledge",
    "antonyms": "Disregard, neglect, overlook, undervalue",
    "englishMeaning": "To recognize the full worth, significance, or aesthetic quality of something.",
    "exampleSentence": "Beauty is easy to appreciate but remarkably difficult to define.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Dhaka Board Standard, Unit 2"
  },
  {
    "id": "vocab-u2-l1-02",
    "word": "Perceptions",
    "bengaliMeaning": "উপলব্ধি / দৃষ্টিভঙ্গি / ইন্দ্রিয়ানুভূতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Insights, perspectives, impressions, viewpoints, observations",
    "antonyms": "Blindness, misconceptions, ignorance",
    "englishMeaning": "The ability to see, hear, or become aware of something through the senses or intellect.",
    "exampleSentence": "Is the notion of beauty universal, or is it shaped by individual perceptions?",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "HSC Board Exam, Unit 2"
  },
  {
    "id": "vocab-u2-l1-03",
    "word": "Beholder",
    "bengaliMeaning": "দর্শক / যিনি প্রত্যক্ষ করেন",
    "partsOfSpeech": "Noun",
    "synonyms": "Observer, spectator, onlooker, viewer, watcher",
    "antonyms": "Participator, actor, performer",
    "englishMeaning": "A person who sees or observes someone or something.",
    "exampleSentence": "People often wonder whether beauty truly lies in the eye of the beholder.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l1-04",
    "word": "Faculties",
    "bengaliMeaning": "অনুষদ / মানসিক বা সৃষ্টিশীল ক্ষমতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Capabilities, talents, aptitudes, powers, faculties",
    "antonyms": "Inabilities, weaknesses, incapacities",
    "englishMeaning": "Inherent mental or physical powers and creative talents.",
    "exampleSentence": "Artists create stunning representations of beauty using their creative faculties.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l1-05",
    "word": "Idealizes",
    "bengaliMeaning": "আদর্শায়িত করা / শ্রেষ্ঠ রূপে কল্পনা করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Glorifies, romanticizes, exalts, elevates, deifies",
    "antonyms": "Depreciates, criticizes, discredits",
    "englishMeaning": "To regard or represent as perfect or better than in reality.",
    "exampleSentence": "Lord Byron idealizes the pure, innocent charm of the woman he depicts.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l1-06",
    "word": "Inseparable",
    "bengaliMeaning": "অবিচ্ছেদ্য / যাকে পৃথক করা যায় না",
    "partsOfSpeech": "Adjective",
    "synonyms": "Indivisible, intertwined, connected, integral",
    "antonyms": "Separable, divisible, detached, alienable",
    "englishMeaning": "Unable to be separated, dissolved, or treated as distinct.",
    "exampleSentence": "Emily Dickinson asserts in her poem that beauty is inseparable from truth.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l1-07",
    "word": "Climes",
    "bengaliMeaning": "জলবায়ু / দেশ বা অঞ্চল",
    "partsOfSpeech": "Noun",
    "synonyms": "Climates, regions, territories, lands, realms",
    "antonyms": "Void, emptiness",
    "englishMeaning": "Regions or areas considered with reference to their climate and atmosphere.",
    "exampleSentence": "She walks in beauty, like the night of cloudless climes and starry skies.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u2-l1-08",
    "word": "Starry",
    "bengaliMeaning": "তারকাখচিত / তারাময়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Starlit, sparkling, celestial, luminous, radiant",
    "antonyms": "Dark, overcast, starless, gloomy",
    "englishMeaning": "Full of or lit by stars.",
    "exampleSentence": "The poet compares her sublime grace to a cloudless starry night.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l1-09",
    "word": "Aspect",
    "bengaliMeaning": "চেহারা / রূপ / অবয়ব / বাহ্যিক রূপ",
    "partsOfSpeech": "Noun",
    "synonyms": "Appearance, countenance, visage, look, facet",
    "antonyms": "Essence, interiority",
    "englishMeaning": "The visual appearance of someone's face or bearing.",
    "exampleSentence": "All that is best of dark and bright meet harmoniously in her aspect and her eyes.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l1-10",
    "word": "Mellowed",
    "bengaliMeaning": "কোমল বা পরিপক্ব হওয়া / স্নিগ্ধ রূপ ধারণ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Softened, ripened, subdued, harmonized",
    "antonyms": "Harsh, aggravated, worsened, toughened",
    "englishMeaning": "Made pleasantly smooth, soft, or tender in quality.",
    "exampleSentence": "The dazzling day is mellowed to a tender, gentle light in the lady's presence.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l1-11",
    "word": "Tender",
    "bengaliMeaning": "স্নিগ্ধ / কোমল / মোলায়েম",
    "partsOfSpeech": "Adjective",
    "synonyms": "Gentle, delicate, soft, mild, affectionate",
    "antonyms": "Rough, harsh, severe, callous",
    "englishMeaning": "Showing gentleness, kindness, and delicate softness.",
    "exampleSentence": "The poet praises the tender light that heaven denies to the gaudy day.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "HSC Board Standard, Unit 2"
  },
  {
    "id": "vocab-u2-l1-12",
    "word": "Gaudy",
    "bengaliMeaning": "অতিরিক্ত জমকালো / চটুল / ভড়ংপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Flashy, garish, showy, ostentatious, loud",
    "antonyms": "Subtle, modest, understated, elegant",
    "englishMeaning": "Extravagantly bright or showy, typically so as to be tasteless.",
    "exampleSentence": "Unlike gaudy daylight, the lady's soothing glow possesses timeless dignity.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l1-13",
    "word": "Impaired",
    "bengaliMeaning": "ক্ষতিগ্রস্ত করা / সৌন্দর্য হ্রাস করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Diminished, damaged, weakened, spoiled, harmed",
    "antonyms": "Enhanced, improved, perfected, restored",
    "englishMeaning": "Weakened or damaged; lessened in beauty or perfection.",
    "exampleSentence": "One shade more or one ray less would have half impaired her nameless grace.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l1-14",
    "word": "Grace",
    "bengaliMeaning": "লাবণ্য / সৌন্দর্য / শোভা / মাধুর্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Elegance, charm, poise, loveliness, refinement",
    "antonyms": "Clumsiness, awkwardness, ugliness",
    "englishMeaning": "Smoothness, elegance, and beauty of movement, form, or expression.",
    "exampleSentence": "Her nameless grace radiates through every movement and raven curl of hair.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l1-15",
    "word": "Raven",
    "bengaliMeaning": "কুচকুচে কালো / উজ্জ্বল কৃষ্ণবর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Jet-black, sable, ebony, inky, pitch-black",
    "antonyms": "Blonde, fair, pale, bleached",
    "englishMeaning": "Glossy black in color, like the feathers of a raven.",
    "exampleSentence": "A wave of beauty shines in every raven tress that frames her delicate face.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l1-16",
    "word": "Tress",
    "bengaliMeaning": "কেশর / চুলের গোছা / বিনুনি",
    "partsOfSpeech": "Noun",
    "synonyms": "Lock, curl, ringlet, braid, plait",
    "antonyms": "Baldness, crop",
    "englishMeaning": "A long lock or curl of a woman's hair.",
    "exampleSentence": "The dark shadows play gracefully in every raven tress cascading down her shoulder.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l1-17",
    "word": "Serenely",
    "bengaliMeaning": "শান্তভাবে / প্রশান্ত চিত্তে / নির্লিপ্তভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Peacefully, placidly, calmly, tranquilly, quietly",
    "antonyms": "Agitatedly, violently, tumultuously",
    "englishMeaning": "In a calm, peaceful, and untroubled manner.",
    "exampleSentence": "Her facial expression serenely conveys the sweet purity of her inner mind.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l1-18",
    "word": "Eloquent",
    "bengaliMeaning": "বাকপটু / ভাবপূর্ণ / গভীর অর্থবহ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Expressive, articulate, meaningful, communicative",
    "antonyms": "Inarticulate, silent, clumsy, expressionless",
    "englishMeaning": "Clearly expressing or indicating something without words.",
    "exampleSentence": "Her calm smile and glowing brow remain so soft and yet deeply eloquent.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l1-19",
    "word": "Scarce",
    "bengaliMeaning": "কদাচিৎ / কষ্টেসৃষ্টে / প্রায় না এমন",
    "partsOfSpeech": "Adverb",
    "synonyms": "Hardly, barely, scarcely, seldom",
    "antonyms": "Easily, fully, amply, abundantly",
    "englishMeaning": "Only just; almost not; with difficulty.",
    "exampleSentence": "The narrator died for beauty, but was scarce adjusted in the tomb when another arrived.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l1-20",
    "word": "Adjoining",
    "bengaliMeaning": "সংলগ্ন / পাশাপাশি অবস্থিত / লাগোয়া",
    "partsOfSpeech": "Adjective",
    "synonyms": "Adjacent, neighboring, contiguous, bordering",
    "antonyms": "Distant, remote, separated, far-off",
    "englishMeaning": "Next to or joined with something else.",
    "exampleSentence": "One who died for truth was laid to rest in an adjoining tomb room.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l1-21",
    "word": "Brethren",
    "bengaliMeaning": "ভ্রাতৃবৃন্দ / সহোদরগণ / সমধর্মী ব্যক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Brothers, comrades, peers, fellows, kin",
    "antonyms": "Strangers, adversaries, enemies",
    "englishMeaning": "Fellow members of a group or religion; brothers in purpose.",
    "exampleSentence": "The martyr for truth proclaimed that lovers of truth and beauty are brethren.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l1-22",
    "word": "Kinsmen",
    "bengaliMeaning": "জ্ঞাতি / আত্মীয় / স্বগোত্রীয় ব্যক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Relatives, kinfolk, relations, blood relatives",
    "antonyms": "Strangers, foreigners, outsiders",
    "englishMeaning": "A man who is one of a person's blood relations.",
    "exampleSentence": "Like kinsmen meeting in the night, the two spirits conversed across the rooms.",
    "unit": "Unit 2: Lesson 1 (What is Beauty?)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // -------------------------------------------------------------
  // LESSON 2: Folk Music & Lalon Shah (20 Words)
  // -------------------------------------------------------------
  {
    "id": "vocab-u2-l2-01",
    "word": "Sophisticated",
    "bengaliMeaning": "অভিজাত / জটিল ও অত্যন্ত মার্জিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Refined, complex, polished, cultured, advanced",
    "antonyms": "Simple, rustic, naive, unsophisticated",
    "englishMeaning": "Appealing to cultured taste; developed to a high degree of complexity.",
    "exampleSentence": "Folk music is not influenced by sophisticated rules of classical compositions.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l2-02",
    "word": "Secular",
    "bengaliMeaning": "ধর্মনিরপেক্ষ / ইহজাগতিক / অসাম্প্রদায়িক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Non-religious, worldly, lay, temporal",
    "antonyms": "Religious, sacred, spiritual, theological",
    "englishMeaning": "Denoting attitudes, activities, or songs that have no religious or spiritual basis.",
    "exampleSentence": "Bangladesh has a rich tradition of folk music featuring both religious and secular songs.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l2-03",
    "word": "Sprang",
    "bengaliMeaning": "উৎসারিত হয়েছিল / আবির্ভূত হয়েছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Originated, emerged, arose, flowed, issued",
    "antonyms": "Ended, ceased, disappeared, halted",
    "englishMeaning": "Originated or arose from a particular source.",
    "exampleSentence": "Folk tunes sprang naturally from the collective heart and soul of rural communities.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l2-04",
    "word": "Spontaneous",
    "bengaliMeaning": "স্বতঃস্ফূর্ত / স্বাভাবিক / ভেতর থেকে আসা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unprompted, natural, uninhibited, impulsive, instinctive",
    "antonyms": "Calculated, forced, planned, premeditated",
    "englishMeaning": "Performed or occurring as a result of a sudden inner impulse without premeditation.",
    "exampleSentence": "Folk songs are a spontaneous expression of feelings in simple language and melody.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l2-05",
    "word": "Dialect",
    "bengaliMeaning": "উপভাষা / আঞ্চলিক ভাষা",
    "partsOfSpeech": "Noun",
    "synonyms": "Vernacular, regionalism, patois, local tongue",
    "antonyms": "Standard language, formal language",
    "englishMeaning": "A particular form of a language peculiar to a specific region or social group.",
    "exampleSentence": "Despite its universal appeal, rural folk music often uses local dialects.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l2-06",
    "word": "Manifestation",
    "bengaliMeaning": "বহিঃপ্রকাশ / প্রকাশরূপ / নিদর্শন",
    "partsOfSpeech": "Noun",
    "synonyms": "Demonstration, embodiment, revelation, expression, display",
    "antonyms": "Concealment, suppression, hiding",
    "englishMeaning": "An event, action, or object that clearly shows or embodies something.",
    "exampleSentence": "Folk music is an explicit manifestation of the joys and sorrows of village life.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l2-07",
    "word": "Rhythms",
    "bengaliMeaning": "ছন্দ / লয় / সুরের প্রবাহ",
    "partsOfSpeech": "Noun",
    "synonyms": "Cadences, beats, tempos, pulses, measures",
    "antonyms": "Disorder, irregularity, arrhythmia",
    "englishMeaning": "A strong, regular, repeated pattern of movement or sound in music.",
    "exampleSentence": "The flowing rivers and monsoon rains provide natural rhythms for Bengali folk tunes.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l2-08",
    "word": "Emotive",
    "bengaliMeaning": "আবেগঘন / আবেগসঞ্চারী / হৃদয়স্পর্শী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Poignant, touching, evocative, heartfelt, stirring",
    "antonyms": "Unemotional, dull, cold, indifferent",
    "englishMeaning": "Arousing or able to arouse intense emotional feelings.",
    "exampleSentence": "Bhatiyali songs contain an emotive expression of human longing, love, and separation.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l2-09",
    "word": "Riverine",
    "bengaliMeaning": "নদীমাতৃক / নদীতীরবর্তী / নদীসংক্রান্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Riparian, fluvial, river-dwelling, waterborne",
    "antonyms": "Landlocked, arid, desert",
    "englishMeaning": "Relating to, situated on, or characteristic of a river system.",
    "exampleSentence": "Since Bangladesh is largely riverine, songs of boatmen form a core cultural genre.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l2-10",
    "word": "Metaphors",
    "bengaliMeaning": "রূপক / উপমা / প্রতীকী তুলনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Symbols, allegories, figures of speech, analogies",
    "antonyms": "Literal terms, plain speech",
    "englishMeaning": "Figures of speech in which words or phrases are applied to an object not literally applicable.",
    "exampleSentence": "Mystical Baul poets compose philosophical verses using metaphors of rivers and boats.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l2-11",
    "word": "Minorities",
    "bengaliMeaning": "সংখ্যালঘু সম্প্রদায়",
    "partsOfSpeech": "Noun",
    "synonyms": "Smaller groups, cultural subsets, marginalized groups",
    "antonyms": "Majorities, dominant groups",
    "englishMeaning": "Smaller groups of people differing ethnically or culturally from the larger majority.",
    "exampleSentence": "Ethnic minorities like Chakmas and Santals have deeply enriched Bangladesh's folk music.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l2-12",
    "word": "Chorus",
    "bengaliMeaning": "সমবেত কণ্ঠ / বৃন্দগান / দলগত গীত",
    "partsOfSpeech": "Noun",
    "synonyms": "Choir, ensemble, vocal group, unison singing",
    "antonyms": "Solo, individual recital",
    "englishMeaning": "A large organized group of singers; singing in unison together.",
    "exampleSentence": "Folk forms such as Gambhira and Kabigan are traditionally performed in vibrant chorus.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l2-13",
    "word": "Tolerance",
    "bengaliMeaning": "সহনশীলতা / পরমতসহিষ্ণুতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Acceptance, forbearance, broadmindedness, patience",
    "antonyms": "Intolerance, bigotry, prejudice, fanaticism",
    "englishMeaning": "The ability or willingness to tolerate differing opinions or religious beliefs.",
    "exampleSentence": "Lalon Shah preached deep religious tolerance and rejected sectarian discrimination.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l2-14",
    "word": "Creed",
    "bengaliMeaning": "ধর্মবিশ্বাস / মতবাদ / মূলনীতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Faith, dogma, doctrine, belief, persuasion",
    "antonyms": "Disbelief, skepticism, agnosticism",
    "englishMeaning": "A set of religious beliefs or principles that guide someone's actions.",
    "exampleSentence": "Lalon rejected social divisions based strictly on class, caste, and religious creed.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l2-15",
    "word": "Pilgrimage",
    "bengaliMeaning": "তীর্থযাত্রা / পবিত্র স্থান ভ্রমণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Holy journey, religious expedition, trek, crusade",
    "antonyms": "Exile, wandering, aimless journey",
    "englishMeaning": "A journey to a place associated with someone or something well respected or holy.",
    "exampleSentence": "While on a pilgrimage to a holy site, Lalon contracted smallpox and fell gravely ill.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l2-16",
    "word": "Contracted",
    "bengaliMeaning": "আক্রান্ত হয়েছিল / রোগে সংক্রামিত হয়েছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Caught, developed, acquired, succumbed to",
    "antonyms": "Overcame, recovered, resisted, prevented",
    "englishMeaning": "Caught or developed a disease or medical condition.",
    "exampleSentence": "After he contracted smallpox during his journey, his companions left him behind.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l2-17",
    "word": "Devotion",
    "bengaliMeaning": "ভক্তি / নিষ্ঠা / আত্মনিবেদন / অনুরাগ",
    "partsOfSpeech": "Noun",
    "synonyms": "Dedication, loyalty, piety, faithfulness, commitment",
    "antonyms": "Disloyalty, apathy, indifference, rebellion",
    "englishMeaning": "Love, loyalty, or enthusiasm for a person, belief, or religious path.",
    "exampleSentence": "Lalon dedicated his life to spiritual devotion under the guidance of Siraj Sain.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l2-18",
    "word": "Asceticism",
    "bengaliMeaning": "কৃচ্ছ্রসাধন / বৈরাগ্য / সন্ন্যাসধর্ম",
    "partsOfSpeech": "Noun",
    "synonyms": "Self-discipline, austerity, renunciation, monkhood",
    "antonyms": "Hedonism, self-indulgence, materialism",
    "englishMeaning": "Severe self-discipline and avoidance of all forms of physical indulgence.",
    "exampleSentence": "Baul mystics embrace asceticism to attain higher spiritual truth within their soul.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l2-19",
    "word": "Monastery",
    "bengaliMeaning": "মঠ / আশ্রম / আখড়া",
    "partsOfSpeech": "Noun",
    "synonyms": "Abbey, ashram, convent, hermitage, priory",
    "antonyms": "Metropolis, bustling city",
    "englishMeaning": "A building or community occupied by religious persons living under ascetic vows.",
    "exampleSentence": "Lalon established his famous spiritual monastery and akhrah in Chheuriya near Kushtia.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l2-20",
    "word": "Disciples",
    "bengaliMeaning": "শিষ্যবৃন্দ / অনুসারীগণ / ভক্তবৃন্দ",
    "partsOfSpeech": "Noun",
    "synonyms": "Followers, pupils, acolytes, adherents, devotees",
    "antonyms": "Teachers, masters, adversaries",
    "englishMeaning": "Personal followers or students of a religious teacher or philosopher.",
    "exampleSentence": "His devoted disciples sang his compositions with ektara across every corner of Bengal.",
    "unit": "Unit 2: Lesson 2 (Folk Music)",
    "boardExamTag": "Chattogram Board Exam"
  },

  // -------------------------------------------------------------
  // LESSON 3: Art (28 Words)
  // -------------------------------------------------------------
  {
    "id": "vocab-u2-l3-01",
    "word": "Sculpture",
    "bengaliMeaning": "ভাস্কর্য / খোদাই করা ত্রিমাত্রিক শিল্পকর্ম",
    "partsOfSpeech": "Noun",
    "synonyms": "Statue, carving, effigy, model, figurine",
    "antonyms": "Flat painting, 2D drawing",
    "englishMeaning": "The art of making three-dimensional representative or abstract forms.",
    "exampleSentence": "Novera Ahmed pioneered modern sculpture in Bangladesh using stone and plaster.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l3-02",
    "word": "Evoke",
    "bengaliMeaning": "জাগিয়ে তোলা / স্মরণ করানো / অনুভূতি সৃষ্টি করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Kindle, elicit, awaken, invoke, stimulate",
    "antonyms": "Suppress, stifle, quench, extinguish",
    "englishMeaning": "To bring or recall a feeling, memory, or image to the conscious mind.",
    "exampleSentence": "The primary aim of great painting is to evoke genuine aesthetic emotions.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l3-03",
    "word": "Aesthetic",
    "bengaliMeaning": "নান্দনিক / সৌন্দর্যবিষয়ক / রুচিসম্মত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Artistic, tasteful, beautiful, appealing, refined",
    "antonyms": "Unaesthetic, crude, inelegant, ugly",
    "englishMeaning": "Concerned with beauty or the appreciation of artistic elegance.",
    "exampleSentence": "Fine art touches the soul by presenting profound aesthetic experiences.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l3-04",
    "word": "Commentary",
    "bengaliMeaning": "ভাষ্য / পর্যালোচনা / সামাজিক সমালোচনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Critique, evaluation, analysis, interpretation, review",
    "antonyms": "Silence, disregard, omission",
    "englishMeaning": "An expression of opinions or an explanation about an event or situation.",
    "exampleSentence": "Zainul's drawings served as powerful social commentary on human suffering.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l3-05",
    "word": "Glorifies",
    "bengaliMeaning": "মহিমান্বিত করে / ভূয়সী প্রশংসা করে",
    "partsOfSpeech": "Verb",
    "synonyms": "Extols, praises, dignifies, elevates, exalts",
    "antonyms": "Degrades, condemns, disparages, defames",
    "englishMeaning": "Presents something in high admiration or as especially worthy of praise.",
    "exampleSentence": "A landscape painting glorifies the sublime majesty of nature's scenery.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l3-06",
    "word": "Anguish",
    "bengaliMeaning": "তীব্র মনোকষ্ট / মানসিক বা শারীরিক যন্ত্রণা",
    "partsOfSpeech": "Noun",
    "synonyms": "Agony, torment, distress, heartache, misery",
    "antonyms": "Joy, contentment, relief, bliss",
    "englishMeaning": "Severe mental or physical pain or intense suffering.",
    "exampleSentence": "Paintings of war-torn cities convey intense anguish and humanitarian despair.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l3-07",
    "word": "Famine",
    "bengaliMeaning": "দুর্ভিক্ষ / চরম খাদ্যাভাব / মন্বন্তর",
    "partsOfSpeech": "Noun",
    "synonyms": "Starvation, scarcity, destitution, food crisis",
    "antonyms": "Abundance, plenty, surplus, feast",
    "englishMeaning": "Extreme scarcity of food causing starvation and widespread death.",
    "exampleSentence": "Zainul Abedin achieved historical renown for his haunting sketches of the 1943 Bengal famine.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l3-08",
    "word": "Haunting",
    "bengaliMeaning": "মর্মস্পর্শী / যা মন থেকে মোছা যায় না / দাগ কাটে এমন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Evocative, memorable, indelible, piercing, poignant",
    "antonyms": "Forgettable, pleasant, comforting, bland",
    "englishMeaning": "Poignant, evocative, and difficult to ignore or forget from the mind.",
    "exampleSentence": "His ink drawings captured the haunting agony of starving masses on city pavements.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l3-09",
    "word": "Contemporary",
    "bengaliMeaning": "সমসাময়িক / আধুনিক যুগের",
    "partsOfSpeech": "Adjective",
    "synonyms": "Current, modern, present-day, up-to-date",
    "antonyms": "Ancient, archaic, antiquated, outdated",
    "englishMeaning": "Belonging to or occurring in the present time.",
    "exampleSentence": "Prominent artists fostered the spectacular rise of Bangladeshi contemporary art.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l3-10",
    "word": "Installation",
    "bengaliMeaning": "সংস্থাপন শিল্প / ইনস্টলেশন আর্ট",
    "partsOfSpeech": "Noun",
    "synonyms": "Art arrangement, sculptural construction, visual setup",
    "antonyms": "Demolition, dismantling",
    "englishMeaning": "An artistic genre of three-dimensional works designed to transform interior perception.",
    "exampleSentence": "Post-war artists embraced installation art to express complex socio-political realities.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l3-11",
    "word": "Insightful",
    "bengaliMeaning": "অন্তর্দৃষ্টিপূর্ণ / গভীর বোধসম্পন্ন / বিশ্লেষণধর্মী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Perceptive, discerning, profound, sagacious, acute",
    "antonyms": "Shallow, obtuse, superficial, undiscerning",
    "englishMeaning": "Having or showing an accurate and deep understanding of a complex issue.",
    "exampleSentence": "The museum galleries display modern realities in fascinating and insightful ways.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l3-12",
    "word": "Distinguished",
    "bengaliMeaning": "বিশিষ্ট / প্রখ্যাত / অনন্য মর্যাদাপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Eminent, illustrious, celebrated, renowned, honored",
    "antonyms": "Obscure, unknown, undistinguished, common",
    "englishMeaning": "Successful, authoritative, and commanding great public respect.",
    "exampleSentence": "S M Sultan was a distinguished painter renowned for his muscular peasant figures.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l3-13",
    "word": "Bohemian",
    "bengaliMeaning": "উদাসীন / বাউন্ডুলে / প্রথাহীন স্বাধীনচেতা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unconventional, nonconformist, free-spirited, nomadic",
    "antonyms": "Conventional, orthodox, conformist, traditional",
    "englishMeaning": "Having informal and unconventional social habits and an artistic lifestyle.",
    "exampleSentence": "S M Sultan is remembered as a bohemian artist who roamed far and wide.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l3-14",
    "word": "Retrospective",
    "bengaliMeaning": "পশ্চাৎমুখী প্রদর্শনী / শিল্পীর অতীত কাজের পূর্ণাঙ্গ প্রদর্শনী",
    "partsOfSpeech": "Noun",
    "synonyms": "Comprehensive exhibition, career survey, review",
    "antonyms": "Prospective preview, debut showcase",
    "englishMeaning": "An exhibition showing the development of the work of a particular artist over time.",
    "exampleSentence": "A major retrospective held in 1987 solidified Sultan's rank as an artistic legend.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l3-15",
    "word": "Underprivileged",
    "bengaliMeaning": "সুবিধাবঞ্চিত / অনুন্নত পটভূমির",
    "partsOfSpeech": "Adjective",
    "synonyms": "Disadvantaged, needy, impoverished, deprived",
    "antonyms": "Privileged, affluent, wealthy, favored",
    "englishMeaning": "Not enjoying the same standard of living or rights as the majority of people in a society.",
    "exampleSentence": "Despite his underprivileged rural background, Sultan conquered world art galleries.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l3-16",
    "word": "Enduring",
    "bengaliMeaning": "স্থায়ী / দীর্ঘস্থায়ী / কালজয়ী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Lasting, durable, abiding, timeless, permanent",
    "antonyms": "Fleeting, short-lived, transient, ephemeral",
    "englishMeaning": "Continuing or long-lasting through changing circumstances.",
    "exampleSentence": "S M Sultan created enduring connections between village peasants and canvas art.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l3-17",
    "word": "Stature",
    "bengaliMeaning": "শারীরিক উচ্চতা ও ব্যক্তিত্ব / গৌরবময় মর্যাদা",
    "partsOfSpeech": "Noun",
    "synonyms": "Prestige, status, standing, height, prominence",
    "antonyms": "Insignificance, lowliness, unimportance",
    "englishMeaning": "Importance or reputation gained by ability or achievement; also physical height.",
    "exampleSentence": "Sultan painted village farmers with extensive muscles and godly physical stature.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l3-18",
    "word": "Accolades",
    "bengaliMeaning": "স্বীকৃতি / ভূয়সী প্রশংসা / অর্জিত পুরস্কার",
    "partsOfSpeech": "Noun",
    "synonyms": "Honors, laurels, awards, tributes, praises",
    "antonyms": "Criticisms, censures, condemnations",
    "englishMeaning": "Awards, honors, or privileges granted as a special honor or as an acknowledgment of merit.",
    "exampleSentence": "The painter won worldwide accolades from leading art critics and newspapers.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l3-19",
    "word": "Laudatory",
    "bengaliMeaning": "প্রশংসাসূচক / স্তুতিপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Complimentary, eulogistic, praising, commending",
    "antonyms": "Critical, derogatory, disparaging, uncomplimentary",
    "englishMeaning": "Expressing praise and commendation in speech or writing.",
    "exampleSentence": "The Washington Post published laudatory reviews praising his epic canvas paintings.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l3-20",
    "word": "Acclaimed",
    "bengaliMeaning": "নন্দিত / সর্বজনস্বীকৃত / প্রশংসিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Celebrated, lauded, acclaimed, distinguished, praised",
    "antonyms": "Disdained, neglected, condemned, ignored",
    "englishMeaning": "Publicly praised and celebrated with high honor.",
    "exampleSentence": "He became internationally acclaimed as a master painter of classic dimensions.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l3-21",
    "word": "Pioneer",
    "bengaliMeaning": "পথপ্রদর্শক / অগ্রদূত / প্রথম প্রবর্তক",
    "partsOfSpeech": "Noun",
    "synonyms": "Trailblazer, innovator, forerunner, groundbreaker",
    "antonyms": "Follower, imitator, conformist",
    "englishMeaning": "A person who is among the first to explore or settle a new country or area of thought.",
    "exampleSentence": "Novera Ahmed was the daring pioneer of modern three-dimensional sculpting in Bangladesh.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l3-22",
    "word": "Proclaimed",
    "bengaliMeaning": "ঘোষণা করেছিলেন / জোরালোভাবে ব্যক্ত করেছিলেন",
    "partsOfSpeech": "Verb",
    "synonyms": "Declared, announced, stated, affirmed, asserted",
    "antonyms": "Concealed, denied, retracted, withheld",
    "englishMeaning": "Announced officially or publicly with strong conviction.",
    "exampleSentence": "Zainul Abedin proclaimed that it would take society a long time to understand Novera's art.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l3-23",
    "word": "Aptly",
    "bengaliMeaning": "যথাযথভাবে / উপযুক্তভাবে / চমৎকারভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Fittingly, suitably, appropriately, correctly",
    "antonyms": "Inappropriately, unfittingly, wrongly",
    "englishMeaning": "In a manner that is suitable or appropriate in the circumstances.",
    "exampleSentence": "This description aptly highlights her forward-thinking vanguard mentality.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l3-24",
    "word": "Artefacts",
    "bengaliMeaning": "শিল্পকর্ম / হস্তনির্মিত ঐতিহাসিক বস্তু",
    "partsOfSpeech": "Noun",
    "synonyms": "Relics, antiques, handicrafts, items, artworks",
    "antonyms": "Natural objects, raw materials",
    "englishMeaning": "Objects made by a human being, typically an item of cultural or historical interest.",
    "exampleSentence": "Her artistic artefacts blended western abstract form with Bengal rural motifs.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l3-25",
    "word": "Motifs",
    "bengaliMeaning": "নকশার মূল ভাব / শিল্পরীতি / প্যাটার্ন",
    "partsOfSpeech": "Noun",
    "synonyms": "Patterns, themes, designs, figures, concepts",
    "antonyms": "Disorder, plainness, randomness",
    "englishMeaning": "Decorative designs, patterns, or dominant recurring ideas in artistic work.",
    "exampleSentence": "Traditional village motifs inspired her unique sculptures depicting women's lives.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l3-26",
    "word": "Inaugurated",
    "bengaliMeaning": "উদ্বোধন করা হয়েছিল / সূচনা করা হয়েছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Launched, opened, instituted, unveiled, commenced",
    "antonyms": "Closed, concluded, terminated, dissolved",
    "englishMeaning": "Formally opened a facility, event, or initiated an exhibition.",
    "exampleSentence": "Her landmark solo sculpture exhibition was inaugurated at Dhaka University Library.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l3-27",
    "word": "Intricate",
    "bengaliMeaning": "জটিল ও সূক্ষ্ম নকশাদার / পেঁচানো",
    "partsOfSpeech": "Adjective",
    "synonyms": "Elaborate, complex, detailed, convoluted, sophisticated",
    "antonyms": "Simple, basic, plain, unelaborate",
    "englishMeaning": "Very complicated or detailed in design and arrangement.",
    "exampleSentence": "Alpana involves painting intricate floral patterns with white rice paste on courtyards.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l3-28",
    "word": "Adequately",
    "bengaliMeaning": "পর্যাপ্তভাবে / যথাযথভাবে / সামঞ্জস্যপূর্ণভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Sufficiently, satisfactorily, suitably, appropriately",
    "antonyms": "Inadequately, insufficiently, poorly",
    "englishMeaning": "To a satisfactory or acceptable extent; suitably.",
    "exampleSentence": "Artists adopted new styles to adequately express the profound changes in human thought.",
    "unit": "Unit 2: Lesson 3 (Art)",
    "boardExamTag": "Jashore Board Exam"
  },

  // -------------------------------------------------------------
  // LESSON 4: Craft (11 Words)
  // -------------------------------------------------------------
  {
    "id": "vocab-u2-l4-01",
    "word": "Intuitive",
    "bengaliMeaning": "সহজাত / স্বজ্ঞাত / আত্মিক বোধসম্পন্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Instinctive, spontaneous, innate, perceptive",
    "antonyms": "Calculated, reasoned, deliberate, analytical",
    "englishMeaning": "Using or based on what one feels to be true without conscious reasoning.",
    "exampleSentence": "While art is considered intuitive and visionary, craft is a practical application of skills.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l4-02",
    "word": "Artisans",
    "bengaliMeaning": "কারিগর / হস্তশিল্পী",
    "partsOfSpeech": "Noun",
    "synonyms": "Craftsmen, craftspeople, handcrafters, masters",
    "antonyms": "Unskilled laborers, mass-producers",
    "englishMeaning": "Workers in a skilled trade, especially one that involves making things by hand.",
    "exampleSentence": "Rural communities historically relied on local artisans to fashion essential household wares.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u2-l4-03",
    "word": "Terracotta",
    "bengaliMeaning": "পোড়ামাটি / পোড়ামাটির ফলক বা পুতুল শিল্প",
    "partsOfSpeech": "Noun",
    "synonyms": "Baked clay, earthenware, ceramic, pottery",
    "antonyms": "Plastic, synthetic polymer",
    "englishMeaning": "A type of brownish-red earthenware used for pottery, tiles, and figurines.",
    "exampleSentence": "The anonymous maker of a terracotta doll imbues the clay piece with a loving human touch.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u2-l4-04",
    "word": "Anonymous",
    "bengaliMeaning": "বেনামী / অজ্ঞাতনামা / যার নাম প্রকাশ পায় না",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unnamed, unidentified, nameless, uncredited",
    "antonyms": "Named, identified, famous, renowned",
    "englishMeaning": "Not identified by name; of unknown authorship or identity.",
    "exampleSentence": "The makers of historic nakshikanthas remain anonymous, yet their genius endures.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u2-l4-05",
    "word": "Tactile",
    "bengaliMeaning": "স্পর্শনীয় / স্পর্শগ্রাহ্য / অনুভূতির মাধ্যমে অনুভূত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Palpable, tangible, touchable, physical",
    "antonyms": "Intangible, abstract, untouchable, ethereal",
    "englishMeaning": "Connected with the sense of touch or pleasant to feel with one's fingers.",
    "exampleSentence": "The tactile texture of hand-stitched embroidered quilts makes them inviting to hold.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u2-l4-06",
    "word": "Abreast",
    "bengaliMeaning": "তাল মিলিয়ে / সমান গতিতে বা হালনাগাদ থাকা",
    "partsOfSpeech": "Adverb",
    "synonyms": "Up to date, alongside, abreast of, informed of",
    "antonyms": "Behind, lagging, unaware, ignorant",
    "englishMeaning": "Up to a particular standard or keeping up with recent developments.",
    "exampleSentence": "Craftwork is a dynamic tradition that constantly stays abreast of changing tastes.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u2-l4-07",
    "word": "Signifier",
    "bengaliMeaning": "প্রতীক / পরিচায়ক / সামাজিক নির্দেশক",
    "partsOfSpeech": "Noun",
    "synonyms": "Symbol, indicator, mark, representation, token",
    "antonyms": "Distortion, falsehood",
    "englishMeaning": "A sign's physical form (such as a sound, printed word, or image) as distinct from its meaning.",
    "exampleSentence": "Handmade artifacts function as a stable signifier of timeless community heritage.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u2-l4-08",
    "word": "Township",
    "bengaliMeaning": "শহরাঞ্চল / প্রাচীন নগরী / জনপদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Municipality, settlement, borough, town, district",
    "antonyms": "Wilderness, uninhabited jungle",
    "englishMeaning": "A division of a county with some corporate powers; a historic town settlement.",
    "exampleSentence": "Sonargaon is an ancient township boasting a famous Folk Arts and Crafts Museum.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u2-l4-09",
    "word": "Antiquity",
    "bengaliMeaning": "প্রাচীনত্ব / সুদূর অতীতকাল / প্রত্নতাত্ত্বিক গুরুত্ব",
    "partsOfSpeech": "Noun",
    "synonyms": "Ancientness, archaism, age-old heritage, historical past",
    "antonyms": "Modernity, novelty, recency",
    "englishMeaning": "The ancient past, especially the period before the Middle Ages.",
    "exampleSentence": "Hundreds of tourists flock to Panam Nagar to admire its rich antiquity and splendid buildings.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u2-l4-10",
    "word": "Prosperous",
    "bengaliMeaning": "সমৃদ্ধ / বর্ধিষ্ণু / সম্পদশালী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Thriving, affluent, flourishing, opulent, wealthy",
    "antonyms": "Impoverished, destitute, declining, bankrupt",
    "englishMeaning": "Successful in material terms; flourishing financially.",
    "exampleSentence": "Sonargaon was a prosperous medieval trading post with an active river port.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u2-l4-11",
    "word": "Splendor",
    "bengaliMeaning": "মহিমা / জাঁকজমক / অপরূপ শোভা",
    "partsOfSpeech": "Noun",
    "synonyms": "Magnificence, grandeur, brilliance, glory, opulence",
    "antonyms": "Drabness, squalor, modesty, ugliness",
    "englishMeaning": "Magnificent and splendid appearance; grandeur.",
    "exampleSentence": "Famed traveler Ibn Battuta visited Sonargaon in 1346 and was amazed by its architectural splendor.",
    "unit": "Unit 2: Lesson 4 (Craft)",
    "boardExamTag": "Sylhet Board Standard"
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
    // Filter out old unit 2 words if any
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 2:'));
    const combined = [...existingOtherWords, ...unit2Vocabulary];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure prefix generation handles Unit 2 Lessons 1, 2, 3, 4
    newContent = newContent.replace(
      /let prefix = 'hsc-u1-l1-' \+ num;[\s\S]*?if \(item\.unit\.includes\('Unit 1: Lesson 3'\)/,
      `let prefix = 'hsc-u1-l1-' + num;
    if (item.unit.includes('Unit 2: Lesson 1') || item.unit.includes('What is Beauty?')) {
      prefix = 'hsc-u2-l1-' + num;
    } else if (item.unit.includes('Unit 2: Lesson 2') || item.unit.includes('Folk Music')) {
      prefix = 'hsc-u2-l2-' + num;
    } else if (item.unit.includes('Unit 2: Lesson 3') || item.unit.includes('Lesson 3 (Art)')) {
      prefix = 'hsc-u2-l3-' + num;
    } else if (item.unit.includes('Unit 2: Lesson 4') || item.unit.includes('Craft')) {
      prefix = 'hsc-u2-l4-' + num;
    } else if (item.unit.includes('Unit 1: Lesson 3')`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 2 added ${unit2Vocabulary.length} words.`);

    // Update hscUnitsData.js for Unit 2
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-2',[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u2-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u2-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u2-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u2-l4',[\s\S]*?progress:\s*0\s*\},?\s*\]/,
      `id: 'unit-2',
    number: 2,
    unitNumber: 'Unit 2',
    unitTitle: 'Art and Craft',
    unitTitleBn: 'শিল্প ও কারুকলা',
    bgClass: 'bg-[#1d63d8] hover:bg-[#256fe8]',
    gradient: 'from-[#226fe8] to-[#154db0]',
    progress: 0,
    totalWords: 81,
    masteredWords: 0,
    lessons: [
      { id: 'u2-l1', number: 'Lesson 1', title: 'What is Beauty?', titleBn: 'সৌন্দর্য কী?', questionsCount: '৮৮ টি প্রশ্ন', wordsCount: 22, progress: 0 },
      { id: 'u2-l2', number: 'Lesson 2', title: 'Folk Music', titleBn: 'লোকসংগীত', questionsCount: '৮০ টি প্রশ্ন', wordsCount: 20, progress: 0 },
      { id: 'u2-l3', number: 'Lesson 3', title: 'Art', titleBn: 'শিল্পকলা', questionsCount: '১১২ টি প্রশ্ন', wordsCount: 28, progress: 0 },
      { id: 'u2-l4', number: 'Lesson 4', title: 'Craft', titleBn: 'কারুশিল্প', questionsCount: '৪৪ টি প্রশ্ন', wordsCount: 11, progress: 0 },
    ]`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 2!');
  });
}
