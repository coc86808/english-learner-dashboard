import fs from 'fs';

const unit3AllLessonsWords = [
  // --- Lesson 1: Myths of Bengal (12 words) ---
  {
    "id": "vocab-u3-l1-01",
    "word": "Gazing",
    "bengaliMeaning": "একদৃষ্টিতে তাকিয়ে থাকা / নিরীক্ষণ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Staring, contemplating, peering, observing intently",
    "antonyms": "Glancing, overlooking, ignoring",
    "englishMeaning": "Looking steadily and intently, especially in admiration, surprise, or thought.",
    "exampleSentence": "Waking up in darkness and gazing at the fig-tree, the poet beholds Bengal's beauty.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Dhaka Board Standard, Unit 3"
  },
  {
    "id": "vocab-u3-l1-02",
    "word": "Roosting",
    "bengaliMeaning": "পাখির আশ্রয় বা বিশ্রাম নেওয়া / আড্ডা",
    "partsOfSpeech": "Verb",
    "synonyms": "Perching, nesting, resting, settling",
    "antonyms": "Flying, soaring, roaming",
    "englishMeaning": "Settling or congregating for rest or sleep, as birds do.",
    "exampleSentence": "Dawn's swallows were roosting under huge umbrella-like leaves.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u3-l1-03",
    "word": "Leafy",
    "bengaliMeaning": "পত্রবহুল / পাতাময় / শ্যামল",
    "partsOfSpeech": "Adjective",
    "synonyms": "Foliaged, verdant, lush, green, wooded",
    "antonyms": "Barren, leafless, desolate, bare",
    "englishMeaning": "Having or covered with many leaves or foliage.",
    "exampleSentence": "The poet discovered a leafy dome formed by ancient indigenous trees.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u3-l1-04",
    "word": "Dome",
    "bengaliMeaning": "গম্বুজ / প্রাকৃতিক বা নান্দনিক ছাউনি",
    "partsOfSpeech": "Noun",
    "synonyms": "Canopy, vault, arch, cupola, roof",
    "antonyms": "Depression, hollow, base",
    "englishMeaning": "A rounded vault or canopy forming a roof or ceiling.",
    "exampleSentence": "The branches of Bat and Aswatha arched into a magnificent natural dome.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u3-l1-05",
    "word": "Hush",
    "bengaliMeaning": "নিস্তব্ধতা / গভীর নীরবতা / স্তব্ধতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Silence, stillness, quietude, tranquility, calm",
    "antonyms": "Noise, clamor, uproar, din",
    "englishMeaning": "A period of profound silence, quiet, or stillness.",
    "exampleSentence": "The forest trees stood all in a hush before the first light of dawn.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u3-l1-06",
    "word": "Honeycombed",
    "bengaliMeaning": "মৌচাক সদৃশ / বহু প্রকোষ্ঠবিশিষ্ট / নকশাদার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Cellular, reticulated, porous, patterned, chambered",
    "antonyms": "Solid, plain, uniform",
    "englishMeaning": "Patterned with or penetrated by many small compartments like a honeycomb.",
    "exampleSentence": "Chand Sadagar sailed long ago in his magnificent honeycombed boat.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u3-l1-07",
    "word": "Incomparable",
    "bengaliMeaning": "অতুলনীয় / যার কোনো সমকক্ষ বা তুলনা নেই",
    "partsOfSpeech": "Adjective",
    "synonyms": "Peerless, matchless, unrivaled, extraordinary, singular",
    "antonyms": "Ordinary, mediocre, common, comparable",
    "englishMeaning": "Matchless; so good or exceptional as to be beyond all comparison.",
    "exampleSentence": "The mythical traveler was awestruck by Bengal's incomparable natural beauty.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u3-l1-08",
    "word": "Waning",
    "bengaliMeaning": "হ্রাসমান / ক্ষয়িষ্ণু / অস্তগামী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Diminishing, fading, subsiding, receding, declining",
    "antonyms": "Waxing, growing, expanding, intensifying",
    "englishMeaning": "Decreasing in vigor, power, or lunar brightness.",
    "exampleSentence": "Behula floated on the river while the waning moon sank behind sandbanks.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u3-l1-09",
    "word": "Raft",
    "bengaliMeaning": "ভেলা / চালি / ভাসমান কাষ্ঠখণ্ড",
    "partsOfSpeech": "Noun",
    "synonyms": "Float, catamaran, pontoon, barge",
    "antonyms": "Anchor, submarine",
    "englishMeaning": "A flat buoyant structure of timber or other materials used for transport on water.",
    "exampleSentence": "Behula journeyed on a fragile raft down the river Ganguri.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u3-l1-10",
    "word": "Desolate",
    "bengaliMeaning": "বিমর্ষ / সঙ্গীহীন / নিঃসঙ্গ / নিরাশ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Forlorn, solitary, lonely, grieving, bleak",
    "antonyms": "Joyful, companionable, cheerful, flourishing",
    "englishMeaning": "Feeling or showing misery, unhappiness, or loneliness.",
    "exampleSentence": "She danced before the court of gods like a desolate, sorrowful wagtail.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u3-l1-11",
    "word": "Wagtail",
    "bengaliMeaning": "খঞ্জনা পাখি / দ্রুত লেজ নাড়ানো পাখি",
    "partsOfSpeech": "Noun",
    "synonyms": "Small songbird, motacilla, passerine",
    "antonyms": "Bird of prey",
    "englishMeaning": "A small songbird with a long tail that wags incessantly up and down.",
    "exampleSentence": "The poet compared Behula's dance to the rapid movements of a wagtail.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "HSC Board Standard, Unit 3"
  },
  {
    "id": "vocab-u3-l1-12",
    "word": "Wailed",
    "bengaliMeaning": "বিলাপ করেছিল / কেঁদে উঠেছিল / হাহাকার করেছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Mourned, lamented, wept, cried out, sobbed",
    "antonyms": "Rejoiced, celebrated, cheered",
    "englishMeaning": "Made a prolonged high-pitched cry of pain, grief, or anger.",
    "exampleSentence": "Bengal's flowers and rivers wailed like melodious ankle bells as she danced.",
    "unit": "Unit 3: Lesson 1 (Myths of Bengal)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // --- Lesson 2: Icarus (12 words) ---
  {
    "id": "vocab-u3-l2-01",
    "word": "Fearsome",
    "bengaliMeaning": "ভীতিপ্রদ / ভয়ংকর / ত্রাস সৃষ্টিকারী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Formidable, dreadful, terrifying, menacing, frightening",
    "antonyms": "Harmless, inviting, soothing, comforting",
    "englishMeaning": "Frightening, especially in appearance to an extreme degree.",
    "exampleSentence": "The fearsome Minotaur kept the terrified citizens of Crete in constant horror.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u3-l2-02",
    "word": "Terrorize",
    "bengaliMeaning": "আতঙ্কিত করা / ভয় দেখানো / ত্রাস সৃষ্টি করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Intimidate, menace, frighten, petrify, oppress",
    "antonyms": "Reassure, comfort, console, soothe",
    "englishMeaning": "To make someone feel extremely frightened by threatening harm.",
    "exampleSentence": "The beast was sent to terrorize everyone who defied the monarch.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Dhaka Board Standard"
  },
  {
    "id": "vocab-u3-l2-03",
    "word": "Masterful",
    "bengaliMeaning": "অত্যন্ত দক্ষ / নিপুণ / কর্তৃত্বপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Skillful, expert, adept, accomplished, proficient",
    "antonyms": "Clumsy, amateurish, inept, incompetent",
    "englishMeaning": "Performed or producing work with outstanding skill or artistry.",
    "exampleSentence": "Daedalus was a masterful inventor and builder admired throughout ancient Greece.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u3-l2-04",
    "word": "Labyrinth",
    "bengaliMeaning": "জটিল গোলকধাঁধা / পথভ্রান্তিকর ফাঁদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Maze, web, tangle, complex network, winding path",
    "antonyms": "Straight pathway, clear passage",
    "englishMeaning": "A complicated irregular network of passages or paths in which it is difficult to find one's way.",
    "exampleSentence": "The intricate labyrinth was designed so expertly that escape was virtually impossible.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u3-l2-05",
    "word": "Gruesome",
    "bengaliMeaning": "বীভৎস / ভয়াবহ / লোমহর্ষক পরিণতি",
    "partsOfSpeech": "Adjective",
    "synonyms": "Horrific, grisly, macabre, ghastly, dreadful",
    "antonyms": "Pleasant, attractive, delightful, charming",
    "englishMeaning": "Extremely unpleasant and shocking, usually dealing with death or injury.",
    "exampleSentence": "Enemies hurled into the dark maze met a gruesome and agonizing end.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u3-l2-06",
    "word": "Stranded",
    "bengaliMeaning": "আটকে পড়া / অসহায় / সঙ্গীহীন অবস্থায় পতিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Marooned, abandoned, helpless, isolated, trapped",
    "antonyms": "Rescued, liberated, guided",
    "englishMeaning": "Left without the means to move from somewhere; marooned.",
    "exampleSentence": "After fleeing prison, father and son found themselves stranded on the guarded island.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u3-l2-07",
    "word": "Moderate",
    "bengaliMeaning": "পরিমিত / মধ্যম মাত্রার / সহনশীল",
    "partsOfSpeech": "Adjective",
    "synonyms": "Temperate, reasonable, modest, intermediate, balanced",
    "antonyms": "Extreme, excessive, drastic, radical",
    "englishMeaning": "Average in amount, intensity, quality, or degree; not extreme.",
    "exampleSentence": "The father urged Icarus to fly at a moderate height to preserve his wings.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u3-l2-08",
    "word": "Heeded",
    "bengaliMeaning": "মনোযোগ দিয়েছিল / সতর্কবার্তা মেনে চলেছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Observed, obeyed, paid attention to, complied with",
    "antonyms": "Ignored, disregarded, defied, overlooked",
    "englishMeaning": "Paid careful attention to advice or a warning.",
    "exampleSentence": "If Icarus had heeded his father's wise counsel, disaster could have been avoided.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u3-l2-09",
    "word": "Overwhelmed",
    "bengaliMeaning": "অভিভূত / দিশেহারা / আবেগে আচ্ছন্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Overpowered, consumed, overcome, inundated, breathless",
    "antonyms": "Calm, controlled, indifferent, composed",
    "englishMeaning": "Overcome by superior force or deeply affected by intense emotion.",
    "exampleSentence": "Overwhelmed by the exhilarating joy of flight, the young boy soared toward the sun.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u3-l2-10",
    "word": "Ascended",
    "bengaliMeaning": "উপরে উঠল / আরোহণ করল / ঊর্ধ্বগমন করল",
    "partsOfSpeech": "Verb",
    "synonyms": "Soared, climbed, rose, elevated, mounted",
    "antonyms": "Descended, plummeted, dropped, fallen",
    "englishMeaning": "Went up or climbed; rose move up through the air.",
    "exampleSentence": "As he ascended higher into the sky, the intense solar heat began melting the wax.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u3-l2-11",
    "word": "Plummeted",
    "bengaliMeaning": "দ্রুত নিচে খসে পড়ল / খাড়াভাবে পতন হলো",
    "partsOfSpeech": "Verb",
    "synonyms": "Plunged, dropped sharply, fell steeply, hurtled",
    "antonyms": "Soared, ascended, skyrocketed",
    "englishMeaning": "Fell or dropped straight down at high speed.",
    "exampleSentence": "With his wax melted, Icarus plummeted into the roaring sea below.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "HSC Board Standard, Unit 3"
  },
  {
    "id": "vocab-u3-l2-12",
    "word": "Mourned",
    "bengaliMeaning": "শোক প্রকাশ করল / বিলাপ করল / কাতর হলো",
    "partsOfSpeech": "Verb",
    "synonyms": "Grieved, lamented, sorrowed, deplored, wept for",
    "antonyms": "Celebrated, rejoiced, rejoiced at",
    "englishMeaning": "Felt or expressed deep sorrow for the death of someone loved.",
    "exampleSentence": "The brokenhearted architect mourned his son and named the waters in his honor.",
    "unit": "Unit 3: Lesson 2 (Icarus)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // --- Lesson 3: The Legend of Gazi (10 words) ---
  {
    "id": "vocab-u3-l3-01",
    "word": "Legends",
    "bengaliMeaning": "কিংবদন্তি / ঐতিহ্যবাহী ঐতিহাসিক লোকগাথা",
    "partsOfSpeech": "Noun",
    "synonyms": "Myths, folk tales, folklore, sagas, epics",
    "antonyms": "Verified facts, scientific data",
    "englishMeaning": "Traditional stories sometimes regarded as historical but unauthenticated.",
    "exampleSentence": "Ancient legends recount the extraordinary deeds of the sufi saint in Bengal.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Dhaka Board Standard, Unit 3"
  },
  {
    "id": "vocab-u3-l3-02",
    "word": "Miracles",
    "bengaliMeaning": "অলৌকিক ঘটনা / আশ্চর্য পরাবাস্তব ক্ষমতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Wonders, marvels, supernatural events, divine signs",
    "antonyms": "Natural occurrences, ordinary events",
    "englishMeaning": "Surprising and welcome events that cannot be explained by natural laws.",
    "exampleSentence": "Gazi Pir was credited with miracles that pacified the wilderness of Sunderbans.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u3-l3-03",
    "word": "Docile",
    "bengaliMeaning": "শান্ত / অনুগত / সহজে বশ মানে এমন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Tame, submissive, compliant, gentle, obedient",
    "antonyms": "Ferocious, wild, untamable, defiant",
    "englishMeaning": "Ready to accept control or instruction; submissive and calm.",
    "exampleSentence": "The holy saint could supposedly pacify wild beasts and make them completely docile.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u3-l3-04",
    "word": "Apparent",
    "bengaliMeaning": "দৃশ্যমান / স্পষ্ট / আপাতদৃষ্ট",
    "partsOfSpeech": "Adjective",
    "synonyms": "Evident, visible, noticeable, obvious, perceptible",
    "antonyms": "Hidden, concealed, obscure, disguised",
    "englishMeaning": "Clearly visible or understood; seeming rather than actual.",
    "exampleSentence": "He rode the fierce Bengal tiger in no apparent danger of harm.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u3-l3-05",
    "word": "Creeks",
    "bengaliMeaning": "ছোট নদী / খাঁড়ি / বনভূমির জলপ্রণালী",
    "partsOfSpeech": "Noun",
    "synonyms": "Inlets, streams, rivulets, tributaries, bayous",
    "antonyms": "Oceans, mainlands",
    "englishMeaning": "Narrow, sheltered waterways, especially an inlet for a river.",
    "exampleSentence": "The coastal forest is crisscrossed by labyrinthine canals and mangrove creeks.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u3-l3-06",
    "word": "Vigilant",
    "bengaliMeaning": "সতর্ক / সদা সজাগ / জাগ্রত দৃষ্টিসম্পন্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Watchful, alert, attentive, observant, guarded",
    "antonyms": "Heedless, careless, negligent, oblivious",
    "englishMeaning": "Keeping careful watch for possible danger or difficulties.",
    "exampleSentence": "His vigilant protection permitted villagers to settle near dangerous tiger territory.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u3-l3-07",
    "word": "Predatory",
    "bengaliMeaning": "শিকারি / হিংস্র স্বভাবসম্পন্ন / মাংসাশী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Carnivorous, hunting, raptorial, ravaging",
    "antonyms": "Harmless, herbivorous, domesticated",
    "englishMeaning": "Relating to animals preying naturally on others.",
    "exampleSentence": "All predatory creatures were kept at bay by the mystical saint.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u3-l3-08",
    "word": "Indigenous",
    "bengaliMeaning": "দেশীয় / স্থানীয় / আদিবাসী ঐতিহ্যবাহী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Native, aboriginal, endemic, traditional, homegrown",
    "antonyms": "Foreign, alien, imported, exotic",
    "englishMeaning": "Originating or occurring naturally in a particular place; native.",
    "exampleSentence": "The Gazi stories have been performed for centuries in indigenous village theatre.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u3-l3-09",
    "word": "Scroll",
    "bengaliMeaning": "জড়ানো চিত্রপট / পুথি / কাপড়ের চিত্রকর্ম",
    "partsOfSpeech": "Noun",
    "synonyms": "Parchment, roll, painted canvas, manuscript",
    "antonyms": "Bound volume, digital screen",
    "englishMeaning": "A roll of parchment or paper for writing or painting on.",
    "exampleSentence": "Gazir Paat represents an authentic scroll painting tradition preserved in museums.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u3-l3-10",
    "word": "Depicted",
    "bengaliMeaning": "চিত্রায়িত / ক্যানভাসে অঙ্কিত বা বর্ণিত",
    "partsOfSpeech": "Verb",
    "synonyms": "Portrayed, represented, illustrated, rendered, sketched",
    "antonyms": "Concealed, hidden, misrepresented",
    "englishMeaning": "Represented by a drawing, painting, or other art form.",
    "exampleSentence": "The folk saint is typically depicted with spiritual grace holding a snake.",
    "unit": "Unit 3: Lesson 3 (The Legend of Gazi)",
    "boardExamTag": "HSC Board Standard, Unit 3"
  },

  // --- Lesson 4: Khona (11 words) ---
  {
    "id": "vocab-u3-l4-01",
    "word": "Prosper",
    "bengaliMeaning": "সমৃদ্ধ হওয়া / উন্নতি করা / সুফল পাওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Thrive, flourish, succeed, blossom, boom",
    "antonyms": "Decline, wither, fail, languish",
    "englishMeaning": "Succeed in activity, typically by making good economic progress.",
    "exampleSentence": "Timely winter rain guarantees that the agricultural land and kingdom will prosper.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Dhaka Board Standard, Unit 3"
  },
  {
    "id": "vocab-u3-l4-02",
    "word": "Interdependence",
    "bengaliMeaning": "পারস্পরিক নির্ভরশীলতা / অচ্ছেদ্য সম্পর্ক",
    "partsOfSpeech": "Noun",
    "synonyms": "Mutual reliance, interconnectedness, mutuality",
    "antonyms": "Independence, detachment, isolation",
    "englishMeaning": "The dependence of two or more people or things on each other.",
    "exampleSentence": "Khona intuitively understood the deep interdependence between humans and rainfall.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u3-l4-03",
    "word": "Myriad",
    "bengaliMeaning": "অসংখ্য / অগুনতি / বহুবিধ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Countless, innumerable, infinite, multitudinous, endless",
    "antonyms": "Few, limited, scarce, countable",
    "englishMeaning": "A countless or extremely great number of people or things.",
    "exampleSentence": "Nature affects agriculture and harvesting patterns in myriad subtle ways.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u3-l4-04",
    "word": "Folklore",
    "bengaliMeaning": "লোকগাথা / ঐতিহ্যবাহী লোকসংস্কৃতি / মৌখিক ধারা",
    "partsOfSpeech": "Noun",
    "synonyms": "Oral traditions, folk myths, lore, heritage, customs",
    "antonyms": "Written chronicles, formal history",
    "englishMeaning": "The traditional beliefs, customs, and stories of a community passed by word of mouth.",
    "exampleSentence": "Khona's remarkable life and wisdom remain deeply anchored in Bengali folklore.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u3-l4-05",
    "word": "Rhyming",
    "bengaliMeaning": "অন্ত্যমিলযুক্ত / ছন্দোবদ্ধ / পদ মিলানো",
    "partsOfSpeech": "Adjective",
    "synonyms": "Metered, rhythmic, poetic, harmonious, balanced",
    "antonyms": "Prosaic, discordant, unrhymed",
    "englishMeaning": "Having correspondence in the terminal sounds of words or to lines of verse.",
    "exampleSentence": "Her rhyming maxims made complex agricultural knowledge effortless for peasants to recall.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u3-l4-06",
    "word": "Defiance",
    "bengaliMeaning": "স্পর্ধা / অবাধ্যতা / অনমনীয় প্রতিরোধ",
    "partsOfSpeech": "Noun",
    "synonyms": "Rebellion, resistance, non-compliance, challenge, courage",
    "antonyms": "Submission, obedience, compliance, surrender",
    "englishMeaning": "Open resistance; bold disobedience against an authoritarian rule.",
    "exampleSentence": "Her brave defiance of elite court astrologers exposed the fallacies of dogma.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u3-l4-07",
    "word": "Astrologer",
    "bengaliMeaning": "জ্যোতিষী / ভাগ্য গণনাকারী ব্যক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Stargazer, seer, horoscopist, soothsayer",
    "antonyms": "Astronomer, scientist",
    "englishMeaning": "A person who uses astrology to tell others about their character, or to predict future events.",
    "exampleSentence": "The royal astrologer Varaha felt deeply humiliated when his predictions failed.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u3-l4-08",
    "word": "Destined",
    "bengaliMeaning": "পূর্বনির্ধারিত / ভাগ্যে নির্ধারিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Fated, predetermined, bound, intended, doomed",
    "antonyms": "Accidental, random, uncertain",
    "englishMeaning": "According with a plan or pre-ordained destiny; certain to happen.",
    "exampleSentence": "The prophecy claimed the newborn boy was destined for misfortune and sorrow.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u3-l4-09",
    "word": "Afloat",
    "bengaliMeaning": "ভাসমান অবস্থায় / ভেসে থাকা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Floating, buoyant, adrift, sailing",
    "antonyms": "Sunken, submerged, sunk",
    "englishMeaning": "Floating in water; not sinking below the surface.",
    "exampleSentence": "The infant was placed in a copper pot and set afloat on the current of the river.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u3-l4-10",
    "word": "Predictions",
    "bengaliMeaning": "ভবিষ্যদ্বাণী / পূর্বাভাস / ভবিষ্যজ্ঞান",
    "partsOfSpeech": "Noun",
    "synonyms": "Prophecies, forecasts, divinations, prognostications",
    "antonyms": "Historical records, recollections",
    "englishMeaning": "Things predicted; statements about what will happen in the future.",
    "exampleSentence": "Khona's seasonal weather predictions proved uncannily accurate season after season.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u3-l4-11",
    "word": "Silenced",
    "bengaliMeaning": "মুখ বন্ধ করা / স্তব্ধ করা / কণ্ঠরোধ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Gagged, suppressed, muffled, quieted, quelled",
    "antonyms": "Vocalized, expressed, voiced, echoed",
    "englishMeaning": "Prohibited or prevented someone from expressing opinion or knowledge.",
    "exampleSentence": "Though her tongue was cruelly cut out, Khona's timeless verses could never be silenced.",
    "unit": "Unit 3: Lesson 4 (Khona)",
    "boardExamTag": "Rajshahi Board Exam"
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
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 3:'));
    const combined = [...existingOtherWords, ...unit3AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 3 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 2: Lesson 4'\) \|\| item\.unit\.includes\('Craft'\)\) \{\s*prefix = 'hsc-u2-l4-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 2: Lesson 4') || item.unit.includes('Craft')) {
      prefix = 'hsc-u2-l4-' + num;
    } else if (item.unit.includes('Unit 3: Lesson 1') || item.unit.includes('Myths of Bengal')) {
      prefix = 'hsc-u3-l1-' + num;
    } else if (item.unit.includes('Unit 3: Lesson 2') || item.unit.includes('Icarus')) {
      prefix = 'hsc-u3-l2-' + num;
    } else if (item.unit.includes('Unit 3: Lesson 3') || item.unit.includes('The Legend of Gazi')) {
      prefix = 'hsc-u3-l3-' + num;
    } else if (item.unit.includes('Unit 3: Lesson 4') || item.unit.includes('Khona')) {
      prefix = 'hsc-u3-l4-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 3 added ${unit3AllLessonsWords.length} words.`);

    // Update hscUnitsData.js for Unit 3
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-3',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u3-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u3-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u3-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u3-l4',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-3',
    number: 3,
    unitNumber: 'Unit 3',
    unitTitle: 'Myths and Literature',
    unitTitleBn: 'পৌরাণিক উপাখ্যান ও সাহিত্য',
    bgClass: 'bg-[#432ec4] hover:bg-[#5239e0]',
    gradient: 'from-[#5b42e6] to-[#3a26a8]',
    progress: 0,
    totalWords: 45,
    masteredWords: 0,
    lessons: [
      { id: 'u3-l1', number: 'Lesson 1', title: 'Myths of Bengal', titleBn: 'বাংলার পৌরাণিক রূপকথা', questionsCount: '৪৮ টি প্রশ্ন', wordsCount: 12, progress: 0 },
      { id: 'u3-l2', number: 'Lesson 2', title: 'Icarus', titleBn: 'ইকারাস', questionsCount: '৪৮ টি প্রশ্ন', wordsCount: 12, progress: 0 },
      { id: 'u3-l3', number: 'Lesson 3', title: 'The Legend of Gazi', titleBn: 'গাজী পীরের উপাখ্যান', questionsCount: '৪০ টি প্রশ্ন', wordsCount: 10, progress: 0 },
      { id: 'u3-l4', number: 'Lesson 4', title: 'Khona', titleBn: 'খনার বচন ও জীবন', questionsCount: '৪৪ টি প্রশ্ন', wordsCount: 11, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 3!');
  });
}
