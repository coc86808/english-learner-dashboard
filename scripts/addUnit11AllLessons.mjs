import fs from 'fs';

const unit11AllLessonsWords = [
  // --- Lesson 1: Situations of Conflict (8 words) ---
  {
    "id": "vocab-u11-l1-01",
    "word": "Cruelties",
    "bengaliMeaning": "নিষ্ঠুরতা / বর্বর নির্যাতন ও পৈশাচিক আচরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Atrocities, brutalities, barbarities, inhumanities",
    "antonyms": "Kindnesses, compassions, benevolences",
    "englishMeaning": "Cruel acts or behaviors; callous indifference to or enjoyment of another's suffering.",
    "exampleSentence": "The cruelties of ethnic conflict leave enduring scars across generations.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Dhaka Board Standard, Unit 11"
  },
  {
    "id": "vocab-u11-l1-02",
    "word": "Vernacular",
    "bengaliMeaning": "আঞ্চলিক কথ্য ভাষা / স্বদেশী সাধারণ মানুষের ভাষা",
    "partsOfSpeech": "Noun",
    "synonyms": "Dialect, native tongue, patois, idiom, indigenous language",
    "antonyms": "Standard literary language, formal tongue",
    "englishMeaning": "The language or dialect spoken by the ordinary people in a particular country or region.",
    "exampleSentence": "Maya Angelou composed her poignant verses in authentic African-American vernacular.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u11-l1-03",
    "word": "Racial",
    "bengaliMeaning": "জাতিগত / বর্ণভিত্তিক ও জাতিবৈষম্যমূলক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Ethnic, racialist, ancestral, lineage-based",
    "antonyms": "Universal, non-racial, colorblind",
    "englishMeaning": "Relating to the major groupings into which humankind is divided on the basis of physical traits.",
    "exampleSentence": "Overcoming racial prejudice remains humanity's urgent moral crusade.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u11-l1-04",
    "word": "Traumatized",
    "bengaliMeaning": "মানসিকভাবে চরম আঘাতপ্রাপ্ত / বিপর্যস্ত ও সন্ত্রস্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Distressed, emotionally scarred, shocked, horrified",
    "antonyms": "Healed, comforted, tranquil, serene",
    "englishMeaning": "Subject to lasting shock as a result of an emotionally disturbing experience.",
    "exampleSentence": "Traumatized refugee children require compassionate clinical therapy to rebuild trust.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u11-l1-05",
    "word": "Togetherness",
    "bengaliMeaning": "একাত্মতা / সৌহার্দ্যপূর্ণ ঐক্য ও ভ্রাতৃত্ববোধ",
    "partsOfSpeech": "Noun",
    "synonyms": "Solidarity, unity, camaraderie, fellowship, communion",
    "antonyms": "Isolation, alienation, estrangement, discord",
    "englishMeaning": "The state of being close to another person or other people; affection and closeness.",
    "exampleSentence": "Community togetherness dispels the toxic chill of solitary confinement.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u11-l1-06",
    "word": "Expire",
    "bengaliMeaning": "বিলীন হওয়া / শেষ বা অপসারিত হয়ে যাওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Terminate, vanish, run out, perish, cease",
    "antonyms": "Commence, begin, inaugurate, blossom",
    "englishMeaning": "Come to an end; become invalid or extinguished.",
    "exampleSentence": "Naïve hopes of quick diplomatic truce expire as fighting intensifies.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u11-l1-07",
    "word": "Obsessing",
    "bengaliMeaning": "আচ্ছন্ন করে রাখা / মনে সার্বক্ষণিক প্রভাব বিস্তার করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Preoccupying, haunting, dominating, consuming, fixating",
    "antonyms": "Ignoring, releasing, disregarding",
    "englishMeaning": "Preoccupying or continually filling the mind of someone.",
    "exampleSentence": "Dread of nuclear escalation has been obsessing geopolitical thinkers worldwide.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u11-l1-08",
    "word": "Unmentionable",
    "bengaliMeaning": "অনুল্লেখ্য / মুখে আনার অযোগ্য জঘন্য বিষয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unspeakable, taboo, ineffable, shocking, abhorrent",
    "antonyms": "Mentionable, praiseworthy, speakable",
    "englishMeaning": "Too bad, embarrassing, or shocking to be spoken about.",
    "exampleSentence": "War zones emanate the unmentionable stench of decay and destruction.",
    "unit": "Unit 11: Lesson 1 (Situations of Conflict)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 2: The Old Man at the Bridge (8 words) ---
  {
    "id": "vocab-u11-l2-01",
    "word": "Pontoon",
    "bengaliMeaning": "নৌকাসেতু / ভাসমান সামরিক সেতু",
    "partsOfSpeech": "Noun",
    "synonyms": "Floating bridge, ponton, barge bridge, floating pier",
    "antonyms": "Suspension bridge, stone viaduct",
    "englishMeaning": "A flat-bottomed boat or hollow cylinder, used with others to support a temporary bridge.",
    "exampleSentence": "Refugees converged upon the vibrating wooden planks of the pontoon bridge.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Dhaka Board Standard, Unit 11"
  },
  {
    "id": "vocab-u11-l2-02",
    "word": "Staggered",
    "bengaliMeaning": "টলে টলে হাঁটা / কাঁপতে কাঁপতে কোনোমতে চলা",
    "partsOfSpeech": "Verb",
    "synonyms": "Reeled, tottered, stumbled, swayed, wavered",
    "antonyms": "Strode, marched steadily, bolted",
    "englishMeaning": "Walked or moved unsteadily, as if about to fall.",
    "exampleSentence": "Exhausted mules staggered under heavy household loads up the river embankment.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u11-l2-03",
    "word": "Plodded",
    "bengaliMeaning": "ক্লান্ত পায়ে ভারাক্রান্ত হয়ে চলা",
    "partsOfSpeech": "Verb",
    "synonyms": "Trudged, lumbered, stamped, dragged along, sllogged",
    "antonyms": "Sprinted, skipped, dashed",
    "englishMeaning": "Walked doggedly and slowly with heavy steps.",
    "exampleSentence": "Peasants plodded mechanically through ankle-deep dust toward safety.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u11-l2-04",
    "word": "Bridgehead",
    "bengaliMeaning": "সেতুমুখ সামরিক ফাঁড়ি / গুরুত্বপূর্ণ রণঘাঁটি",
    "partsOfSpeech": "Noun",
    "synonyms": "Beachhead, vanguard post, tactical perimeter, bridge redoubt",
    "antonyms": "Hinterland, distant retreat",
    "englishMeaning": "A strong position secured by an army inside hostile territory to protect bridge crossing.",
    "exampleSentence": "The scout crept forward to examine whether the enemy artillery had reached the bridgehead.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u11-l2-05",
    "word": "Artillery",
    "bengaliMeaning": "ভারী কামান ও গোলাবারুদ বাহিনী",
    "partsOfSpeech": "Noun",
    "synonyms": "Ordnance, cannonry, heavy weaponry, battery",
    "antonyms": "Infantry rifles, sidearms",
    "englishMeaning": "Large-caliber guns used in warfare on land.",
    "exampleSentence": "The distant thud of advancing artillery heralded impending catastrophe.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u11-l2-06",
    "word": "Blankly",
    "bengaliMeaning": "শূন্যদৃষ্টিতে / অভিব্যক্তিশূন্য নির্বিকার ভঙ্গিতে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Vacantly, expressionlessly, dully, numbly",
    "antonyms": "Expressively, keenly, sharply",
    "englishMeaning": "In a way that shows no emotion, understanding, or interest.",
    "exampleSentence": "Overwhelmed by grief, the displaced grandfather stared blankly at the flowing river.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u11-l2-07",
    "word": "Fascists",
    "bengaliMeaning": "ফ্যাসিস্ট বাহিনী / উগ্র স্বৈরাচারী দল",
    "partsOfSpeech": "Noun",
    "synonyms": "Authoritarians, totalitarian invaders, autocrats, oppressors",
    "antonyms": "Democrats, anti-fascists, liberators",
    "englishMeaning": "Followers of a political philosophy characterized by dictatorial power and forcible suppression.",
    "exampleSentence": "Franco's fascists bombarded civilian settlements throughout Catalonia.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u11-l2-08",
    "word": "Anxious",
    "bengaliMeaning": "উদ্বিগ্ন / শঙ্কিত ও আশঙ্কাকুল",
    "partsOfSpeech": "Adjective",
    "synonyms": "Apprehensive, fearful, restless, perturbed, agitated",
    "antonyms": "Calm, composed, unconcerned, serene",
    "englishMeaning": "Experiencing worry, unease, or nervousness, typically about an imminent event.",
    "exampleSentence": "The refugee was anxious about the fate of the goats he had been forced to leave behind.",
    "unit": "Unit 11: Lesson 2 (The Old Man at the Bridge)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 3: Stories From Gaza (8 words) ---
  {
    "id": "vocab-u11-l3-01",
    "word": "Monologues",
    "bengaliMeaning": "স্বগতোক্তি / একক নাট্য সংলাপ",
    "partsOfSpeech": "Noun",
    "synonyms": "Soliloquies, dramatic addresses, single discourses, orations",
    "antonyms": "Dialogues, colloquies, conversations",
    "englishMeaning": "Long speeches by one actor in a play or movie, or as part of a theatrical program.",
    "exampleSentence": "The poignant monologues by Palestinian teenagers brought international audiences to tears.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Dhaka Board Standard, Unit 11"
  },
  {
    "id": "vocab-u11-l3-02",
    "word": "Siege",
    "bengaliMeaning": "অবরোধ / সামরিক বেষ্টনী ও প্রবেশপথ রুদ্ধকরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Blockade, encirclement, containment, cordon",
    "antonyms": "Liberation, relief, breakout",
    "englishMeaning": "A military operation in which enemy forces surround a town or building, cutting off essential supplies.",
    "exampleSentence": "The protracted military siege denied the urban population access to clean drinking water.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u11-l3-03",
    "word": "Deprivation",
    "bengaliMeaning": "বঞ্চনা / মৌলিক মানবিক চাহিদাহীনতা ও অভাব",
    "partsOfSpeech": "Noun",
    "synonyms": "Privation, hardship, destitution, deficiency, impoverishment",
    "antonyms": "Abundance, opulence, prosperity",
    "englishMeaning": "The damaging lack of material benefits considered to be basic necessities in a society.",
    "exampleSentence": "Children grew up under persistent medical and nutritional deprivation.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u11-l3-04",
    "word": "Shattered",
    "bengaliMeaning": "চূর্ণবিচূর্ণ / ছিন্নভিন্ন ও সম্পূর্ণরূপে বিধ্বস্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Fractured, pulverized, wrecked, decimated, broken",
    "antonyms": "Intact, whole, undamaged",
    "englishMeaning": "Broken into many pieces; severely damaged or destroyed.",
    "exampleSentence": "Shattered windowpanes and pulverized masonry carpeted every street after the airstrike.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u11-l3-05",
    "word": "Ceasefire",
    "bengaliMeaning": "যুদ্ধবিরতি / সামরিক সংঘাত সাময়িক স্থগিতকরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Truce, armistice, suspension of arms, moratorium on fighting",
    "antonyms": "Bombardment, offensive, combat",
    "englishMeaning": "A temporary suspension of fighting, typically one during which peace talks take place.",
    "exampleSentence": "Humanitarian agencies urged all factions to observe an immediate humanitarian ceasefire.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u11-l3-06",
    "word": "Rubble",
    "bengaliMeaning": "ধ্বংসস্তূপ / ভাঙা ইট-পাথর ও কংক্রিটের স্তূপ",
    "partsOfSpeech": "Noun",
    "synonyms": "Debris, wreckage, ruins, detritus, crushed stone",
    "antonyms": "Intact structure, erected building",
    "englishMeaning": "Waste or rough fragments of stone, brick, concrete, etc., especially as the debris from the demolition of buildings.",
    "exampleSentence": "Rescue crews dug frantically through smoking rubble to locate survivors.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u11-l3-07",
    "word": "Displaced",
    "bengaliMeaning": "বাস্তুচ্যুত / গৃহহারা ও নিজ দেশেই শরণার্থী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Dispossessed, uprooted, evicted, homeless, expatriated",
    "antonyms": "Settled, housed, rooted",
    "englishMeaning": "Forced someone to leave their home, typically because of war, persecution, or natural disaster.",
    "exampleSentence": "Over one million displaced families took makeshift refuge in crowded school yards.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u11-l3-08",
    "word": "Despair",
    "bengaliMeaning": "চরম হতাশা / নিরাশা ও গভীর বিষাদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Hopelessness, despondency, gloom, anguish, dejection",
    "antonyms": "Hope, optimism, cheerfulness",
    "englishMeaning": "The complete loss or absence of hope.",
    "exampleSentence": "Amidst heartbreaking despair, youthful Palestinian artists refuse to silence their creative resistance.",
    "unit": "Unit 11: Lesson 3 (Stories From Gaza)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 4: Peace in Literature (7 words) ---
  {
    "id": "vocab-u11-l4-01",
    "word": "Crave",
    "bengaliMeaning": "ব্যাকুলভাবে প্রার্থনা করা / চরম আকাঙ্ক্ষা করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Yearn, desire, beg, plead, covet, solicit",
    "antonyms": "Spurn, reject, despise, decline",
    "englishMeaning": "Feel a powerful desire for something; ask for earnestly.",
    "exampleSentence": "War-weary citizens passionately crave an end to senseless bloodshed.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Dhaka Board Standard, Unit 11"
  },
  {
    "id": "vocab-u11-l4-02",
    "word": "Gallant",
    "bengaliMeaning": "বীরত্বপূর্ণ / তেজস্বী, মনোহর ও চমৎকার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Valiant, heroic, noble, splendid, courtly, magnificent",
    "antonyms": "Cowardly, timid, wretched, ignoble",
    "englishMeaning": "Brave; heroic; charming or exceptionally splendid.",
    "exampleSentence": "The poet admired a gallant blossom flourishing in the tranquil monastery garden.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u11-l4-03",
    "word": "Devour",
    "bengaliMeaning": "গ্রাস করা / গোগ্রাসে ভক্ষণ বা ধ্বংস করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Consume, engulf, swallow up, ravage, destroy",
    "antonyms": "Preserve, protect, nourish, spare",
    "englishMeaning": "Eat food or prey hungrily or quickly; destroy or consume entirely.",
    "exampleSentence": "Militarism threatens to devour civil budgets that should fund human health.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u11-l4-04",
    "word": "Humbly",
    "bengaliMeaning": "বিনম্রভাবে / নম্র চিত্তে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Meekly, modestly, deferentially, unpretentiously",
    "antonyms": "Proudly, arrogantly, haughtily",
    "englishMeaning": "In a way that shows a modest or low estimate of one's importance; without arrogance.",
    "exampleSentence": "The seeker knelt humbly before the altar to beseech peace.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u11-l4-05",
    "word": "Hollow",
    "bengaliMeaning": "ফাঁপা / অন্তঃসারশূন্য ও প্রতিধ্বনিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Empty, cavernous, void, echoey, unsubstantial",
    "antonyms": "Solid, dense, full, substantial",
    "englishMeaning": "Having a hole or empty space inside; without significance or sincerity.",
    "exampleSentence": "A hollow breeze whispered through the cavern where peace could not be found.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u11-l4-06",
    "word": "Reverend",
    "bengaliMeaning": "শ্রদ্ধাভাজন / পূজনীয় ধর্মগুরু বা বিজ্ঞ সাধক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Venerable, holy, esteemed, pious, revered, sacred",
    "antonyms": "Profane, disreputable, scandalous",
    "englishMeaning": "Worthy of reverence; used as a title or respect for a member of the clergy or elder sage.",
    "exampleSentence": "A reverend sage guided Herbert to the true wellspring of spiritual repose.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u11-l4-07",
    "word": "Dwell",
    "bengaliMeaning": "বাস করা / চিরকাল অবস্থান করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Reside, inhabit, abide, stay, settle, lodge",
    "antonyms": "Depart, wander, vacate, abandon",
    "englishMeaning": "Live in or at a specified place; remain in a given state.",
    "exampleSentence": "May brotherhood and mutual respect dwell forever among all nations.",
    "unit": "Unit 11: Lesson 4 (Peace in Literature)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // --- Lesson 5: Opinions through Images (7 words) ---
  {
    "id": "vocab-u11-l5-01",
    "word": "Artillery-brigade",
    "bengaliMeaning": "কামান ব্রিগেড / ভারী গোলন্দাজ সামরিক দল",
    "partsOfSpeech": "Noun",
    "synonyms": "Ordnance unit, cannon battalion, artillery corps, battery division",
    "antonyms": "Unarmed scout troupe",
    "englishMeaning": "A military brigade armed with large-caliber artillery pieces and cannons.",
    "exampleSentence": "The Australian artillery-brigade advanced under devastating hostile bombardment.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "Dhaka Board Standard, Unit 11"
  },
  {
    "id": "vocab-u11-l5-02",
    "word": "Duckboard",
    "bengaliMeaning": "কাদামুক্ত কাঠের তক্তাপথ / পরিখার সাঁকো",
    "partsOfSpeech": "Noun",
    "synonyms": "Wooden planking, boardwalk, trench path, timber trackway",
    "antonyms": "Deep mire, quicksand",
    "englishMeaning": "A board consisting of a number of wooden slats joined together, placed over muddy ground.",
    "exampleSentence": "Troopers balanced carefully on slippery duckboard walkways crossing the marsh.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u11-l5-03",
    "word": "Depicts",
    "bengaliMeaning": "চিত্রিত করে / নিখুঁতভাবে ফুটিয়ে তোলে",
    "partsOfSpeech": "Verb",
    "synonyms": "Portrays, illustrates, delineates, represents, captures",
    "antonyms": "Conceals, obscures, misrepresents",
    "englishMeaning": "Show or represent by a drawing, painting, or other art form.",
    "exampleSentence": "Robert Capa's photograph depicts the horrific final heartbeat of a falling warrior.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u11-l5-04",
    "word": "Battlefield",
    "bengaliMeaning": "রণক্ষেত্র / যুদ্ধক্ষেত্র",
    "partsOfSpeech": "Noun",
    "synonyms": "Battleground, war zone, front lines, combat arena, killing ground",
    "antonyms": "Sanctuary, peace zone, safe haven",
    "englishMeaning": "The piece of ground on which a battle is or was fought.",
    "exampleSentence": "Centuries later, wildflowers bloom across what once was a bloody battlefield.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u11-l5-05",
    "word": "Territory",
    "bengaliMeaning": "ভূখণ্ড / ভৌগোলিক সার্বভৌম এলাকা",
    "partsOfSpeech": "Noun",
    "synonyms": "Domain, province, tract, terrain, sector, jurisdiction",
    "antonyms": "No man's land, international waters",
    "englishMeaning": "An area of land under the jurisdiction of a ruler or state.",
    "exampleSentence": "Armies bled dry fighting over a few muddy square meters of disputed territory.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u11-l5-06",
    "word": "Accompanied",
    "bengaliMeaning": "সংযুক্ত / সাথে বিদ্যমান বা সাহচর্যে থাকা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Attended, escorted, partnered, accompanied by, joined",
    "antonyms": "Unaccompanied, solitary, abandoned",
    "englishMeaning": "Having someone or something along as a companion or accompaniment.",
    "exampleSentence": "Historical photo collections should be accompanied by clear contextual analysis.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u11-l5-07",
    "word": "Soldier",
    "bengaliMeaning": "সৈনিক / সমরাস্ত্রধারী সেনানী ও যোদ্ধা",
    "partsOfSpeech": "Noun",
    "synonyms": "Combatant, warrior, trooper, serviceman, fighter",
    "antonyms": "Civilian, pacifist, non-combatant",
    "englishMeaning": "A person who serves in an army.",
    "exampleSentence": "Every unknown soldier represents an irreplaceable life cut down in its prime.",
    "unit": "Unit 11: Lesson 5 (Opinions through Images)",
    "boardExamTag": "HSC Board Standard, Unit 11"
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
    // Filter out any existing Unit 11 words
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 11:'));
    const combined = [...existingOtherWords, ...unit11AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 11 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 10: Lesson 5'\) \|\| item\.unit\.includes\('Consumerism'\)\) \{\s*prefix = 'hsc-u10-l5-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 10: Lesson 5') || item.unit.includes('Consumerism')) {
      prefix = 'hsc-u10-l5-' + num;
    } else if (item.unit.includes('Unit 11: Lesson 1') || item.unit.includes('Situations of Conflict')) {
      prefix = 'hsc-u11-l1-' + num;
    } else if (item.unit.includes('Unit 11: Lesson 2') || item.unit.includes('Old Man at the Bridge')) {
      prefix = 'hsc-u11-l2-' + num;
    } else if (item.unit.includes('Unit 11: Lesson 3') || item.unit.includes('Stories From Gaza')) {
      prefix = 'hsc-u11-l3-' + num;
    } else if (item.unit.includes('Unit 11: Lesson 4') || item.unit.includes('Peace in Literature')) {
      prefix = 'hsc-u11-l4-' + num;
    } else if (item.unit.includes('Unit 11: Lesson 5') || item.unit.includes('Opinions through Images')) {
      prefix = 'hsc-u11-l5-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 11 added ${unit11AllLessonsWords.length} new words.`);

    // Update hscUnitsData.js for Unit 11
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-11',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u11-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u11-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u11-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u11-l4',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u11-l5',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-11',
    number: 11,
    unitNumber: 'Unit 11',
    unitTitle: 'Peace and Conflict',
    unitTitleBn: 'শান্তি ও সংঘাত',
    bgClass: 'bg-[#4f46e5] hover:bg-[#4338ca]',
    gradient: 'from-[#6366f1] to-[#4f46e5]',
    progress: 0,
    totalWords: 38,
    masteredWords: 0,
    lessons: [
      { id: 'u11-l1', number: 'Lesson 1', title: 'Situations of Conflict', titleBn: 'সংঘাতময় পরিস্থিতি', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u11-l2', number: 'Lesson 2', title: '"The Old Man at the Bridge" by Ernest Hemingway', titleBn: 'ব্রিজের ধারের বৃদ্ধটি (হেমিংওয়ে)', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u11-l3', number: 'Lesson 3', title: 'Stories From Gaza', titleBn: 'গাজার গল্প (নাট্য সংলাপ)', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u11-l4', number: 'Lesson 4', title: 'Peace in Literature', titleBn: 'সাহিত্যে শান্তি (জর্জ হারবার্ট)', questionsCount: '২৮ টি প্রশ্ন', wordsCount: 7, progress: 0 },
      { id: 'u11-l5', number: 'Lesson 5', title: 'Opinions through images', titleBn: 'ছবির ভাষায় যুদ্ধ ও সংঘাত', questionsCount: '২৮ টি প্রশ্ন', wordsCount: 7, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 11!');
  });
}
