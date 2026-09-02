import fs from 'fs';

const unit5AllLessonsWords = [
  // --- Lesson 1: Are We Aware of These Rights-I? (8 words) ---
  {
    "id": "vocab-u5-l1-01",
    "word": "Spouses",
    "bengaliMeaning": "স্বামী-স্ত্রী / জীবনসঙ্গী যুগল",
    "partsOfSpeech": "Noun",
    "synonyms": "Partners, mates, companions, couples",
    "antonyms": "Bachelors, singles, celibates",
    "englishMeaning": "Husbands or wives, considered in relation to their partner.",
    "exampleSentence": "Marriage should be entered into only with the full and free consent of intending spouses.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Dhaka Board Standard, Unit 5"
  },
  {
    "id": "vocab-u5-l1-02",
    "word": "Interference",
    "bengaliMeaning": "নাক গলানো / অযাচিত হস্তক্ষেপ / বিঘ্ন সৃষ্টি",
    "partsOfSpeech": "Noun",
    "synonyms": "Intrusion, intervention, meddling, interruption, encroachment",
    "antonyms": "Non-intervention, detachment, non-interference",
    "englishMeaning": "The act of interfering in something; meddling or intervention.",
    "exampleSentence": "No individual should be subjected to arbitrary interference with their personal privacy.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u5-l1-03",
    "word": "Correspondence",
    "bengaliMeaning": "চিঠিপত্র আদান-প্রদান / বার্তা বিনিময় / যোগাযোগ",
    "partsOfSpeech": "Noun",
    "synonyms": "Communication, letters, messages, mail, dispatches",
    "antonyms": "Isolation, non-communication",
    "englishMeaning": "Communication by exchanging letters or messages.",
    "exampleSentence": "The human rights charter protects citizens' confidential mail and correspondence.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u5-l1-04",
    "word": "Asylum",
    "bengaliMeaning": "রাজনৈতিক বা মানবিক আশ্রয় / নিরাপদ শরণার্থী স্থান",
    "partsOfSpeech": "Noun",
    "synonyms": "Refuge, sanctuary, haven, shelter, protection",
    "antonyms": "Expulsion, eviction, deportation",
    "englishMeaning": "The protection granted by a nation to someone who has left their native country as a political refugee.",
    "exampleSentence": "Every persecuted victim has the fundamental right to seek asylum abroad.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u5-l1-05",
    "word": "Persecution",
    "bengaliMeaning": "নিপীড়ন / নির্মম অত্যাচার / নির্যাতন",
    "partsOfSpeech": "Noun",
    "synonyms": "Oppression, victimization, harassment, torture, tyranny",
    "antonyms": "Protection, safety, liberation, tolerance",
    "englishMeaning": "Hostility and ill-treatment, especially because of race or political or religious beliefs.",
    "exampleSentence": "Refugees fled across borders to protect their families from brutal persecution.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u5-l1-06",
    "word": "Nationality",
    "bengaliMeaning": "জাতীয়তা / রাষ্ট্রীয় নাগরিকত্ব",
    "partsOfSpeech": "Noun",
    "synonyms": "Citizenship, statehood, allegiance, identity",
    "antonyms": "Statelessness, exile",
    "englishMeaning": "The status of belonging to a particular nation by origin, birth, or naturalization.",
    "exampleSentence": "No authority can arbitrarily deprive any human being of their nationality.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u5-l1-07",
    "word": "Deprived",
    "bengaliMeaning": "বঞ্চিত / অধিকারচ্যুত / সুবিধা বঞ্চিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Dispossessed, stripped, robbed, destitute, denied",
    "antonyms": "Privileged, endowed, blessed, wealthy",
    "englishMeaning": "Suffering a severe and damaging lack of basic material and cultural benefits.",
    "exampleSentence": "No community should be deprived of food, shelter, and legal justice.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u5-l1-08",
    "word": "Consent",
    "bengaliMeaning": "সম্মতি / অনুমোদন / স্বেচ্ছায় রাজি হওয়া",
    "partsOfSpeech": "Noun",
    "synonyms": "Agreement, approval, assent, permission, concurrence",
    "antonyms": "Refusal, dissent, denial, objection",
    "englishMeaning": "Permission for something to happen or agreement to do something.",
    "exampleSentence": "Free and informed consent is essential before entering into any matrimonial covenant.",
    "unit": "Unit 5: Lesson 1 (Are We Aware of These Rights-I?)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 2: Are We Aware of These Rights-II? (8 words) ---
  {
    "id": "vocab-u5-l2-01",
    "word": "Dignity",
    "bengaliMeaning": "মর্যাদা / আত্মসম্মান / ব্যক্তিত্বের গৌরব",
    "partsOfSpeech": "Noun",
    "synonyms": "Honor, self-respect, prestige, stature, worthiness",
    "antonyms": "Humiliation, dishonor, shame, degradation",
    "englishMeaning": "The state or quality of being worthy of honor or respect.",
    "exampleSentence": "All human beings are born free and equal in human dignity and rights.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Dhaka Board Standard, Unit 5"
  },
  {
    "id": "vocab-u5-l2-02",
    "word": "Endowed",
    "bengaliMeaning": "প্রদত্ত / সহজাত গুণে ভূষিত বা সমৃদ্ধ",
    "partsOfSpeech": "Verb",
    "synonyms": "Gifted, blessed, bestowed, supplied, enriched",
    "antonyms": "Deprived, bereft, dispossessed",
    "englishMeaning": "Provided or supplied with a quality, ability, or asset by nature.",
    "exampleSentence": "Humans are endowed with moral conscience and the capacity to reason.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u5-l2-03",
    "word": "Conscience",
    "bengaliMeaning": "বিবেক / ন্যায় ও অন্যায়ের অন্তর্নিহিত বোধ",
    "partsOfSpeech": "Noun",
    "synonyms": "Moral sense, scruples, inner voice, integrity, ethics",
    "antonyms": "Callousness, immorality, shamelessness",
    "englishMeaning": "An inner feeling or voice viewed as acting as a guide to the rightness or wrongness of one's behavior.",
    "exampleSentence": "A sensitive human conscience refuses to remain silent before oppression.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u5-l2-04",
    "word": "Brotherhood",
    "bengaliMeaning": "ভ্রাতৃত্ববোধ / সম্প্রীতি / ঐক্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Fraternity, fellowship, kinship, solidarity, companionship",
    "antonyms": "Enmity, hostility, rivalry, discord",
    "englishMeaning": "An association, or feelings of friendship, mutual support, and solidarity.",
    "exampleSentence": "Citizens across borders should treat one another in a noble spirit of brotherhood.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u5-l2-05",
    "word": "Entitled",
    "bengaliMeaning": "স্বত্বাধিকারী / আইনগত অধিকারপ্রাপ্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Eligible, authorized, qualified, sanctioned, permitted",
    "antonyms": "Disqualified, forbidden, excluded",
    "englishMeaning": "Believing oneself to be inherently deserving of privileges or rights.",
    "exampleSentence": "Every single child is entitled to safety, nutritious food, and schooling.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u5-l2-06",
    "word": "Distinction",
    "bengaliMeaning": "পার্থক্য / বৈষম্যমূলক বিভেদ / স্বাতন্ত্র্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Differentiation, separation, disparity, divergence",
    "antonyms": "Equality, sameness, uniformity",
    "englishMeaning": "A difference or contrast between similar things or people.",
    "exampleSentence": "Rights apply to all humans without distinction of caste, colour, or religion.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u5-l2-07",
    "word": "Jurisdictional",
    "bengaliMeaning": "আইনগত এক্তিয়ারভুক্ত / শাসন সীমানা সংক্রান্ত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Legal, judicial, administrative, territorial, authoritative",
    "antonyms": "Extra-legal, unauthorized",
    "englishMeaning": "Relating to the official power to make legal decisions and judgments.",
    "exampleSentence": "Rights cannot be curtailed based on the jurisdictional status of a homeland.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u5-l2-08",
    "word": "Activism",
    "bengaliMeaning": "সক্রিয় সামাজিক আন্দোলন / অধিকার আদায়ের প্রয়াস",
    "partsOfSpeech": "Noun",
    "synonyms": "Advocacy, campaigning, engagement, grassroots reform",
    "antonyms": "Passivity, apathy, lethargy, inaction",
    "englishMeaning": "The policy or action of using vigorous campaigning to bring about political or social change.",
    "exampleSentence": "Youth activism has historically challenged institutional bigotry and corruption.",
    "unit": "Unit 5: Lesson 2 (Are We Aware of These Rights-II?)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 3: Rights to Health and Education (7 words) ---
  {
    "id": "vocab-u5-l3-01",
    "word": "Adequate",
    "bengaliMeaning": "পর্যাপ্ত / মানসম্মত / সমুচিত ও উপযোগী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Sufficient, satisfactory, acceptable, suitable, ample",
    "antonyms": "Inadequate, insufficient, deficient, meager",
    "englishMeaning": "Satisfactory or acceptable in quality or quantity.",
    "exampleSentence": "Every family is entitled to an adequate standard of living and health.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Dhaka Board Standard, Unit 5"
  },
  {
    "id": "vocab-u5-l3-02",
    "word": "Wellbeing",
    "bengaliMeaning": "সুস্থতা / সার্বিক কল্যাণ ও মঙ্গলজনক অবস্থা",
    "partsOfSpeech": "Noun",
    "synonyms": "Welfare, prosperity, health, happiness, flourishing",
    "antonyms": "Misery, suffering, hardship, despair",
    "englishMeaning": "The state of being comfortable, healthy, or happy.",
    "exampleSentence": "Access to clean water and sanitation directly affects human wellbeing.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u5-l3-03",
    "word": "Wedlock",
    "bengaliMeaning": "বিবাহবন্ধন / পরিণয় সূত্রে আবদ্ধতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Matrimony, marriage, wedded state, marital union",
    "antonyms": "Divorce, celibacy, separation",
    "englishMeaning": "The state of being married; matrimony.",
    "exampleSentence": "All children, born in or out of wedlock, deserve equal legal security.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u5-l3-04",
    "word": "Elementary",
    "bengaliMeaning": "প্রাথমিক / বুনিয়াদি পর্যায় / মৌলিক স্তর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Basic, primary, foundational, rudimentary, introductory",
    "antonyms": "Advanced, complex, sophisticated",
    "englishMeaning": "Relating to the basic elements of a subject; primary.",
    "exampleSentence": "Free elementary education must be accessible to children in every village.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u5-l3-05",
    "word": "Compulsory",
    "bengaliMeaning": "বাধ্যতামূলক / অত্যাবশ্যক ও অনিবার্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Mandatory, obligatory, required, imperative, binding",
    "antonyms": "Optional, voluntary, discretionary",
    "englishMeaning": "Required by law or a rule; obligatory.",
    "exampleSentence": "The constitution declared primary schooling to be free and compulsory.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u5-l3-06",
    "word": "Fundamental",
    "bengaliMeaning": "মৌলিক / মূলনীতি সংক্রান্ত / প্রধান স্তম্ভ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Essential, core, foundational, primary, paramount",
    "antonyms": "Superficial, secondary, incidental",
    "englishMeaning": "Forming a necessary base or core; of central importance.",
    "exampleSentence": "Freedom of thought is recognized as a fundamental constitutional right.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u5-l3-07",
    "word": "Strengthening",
    "bengaliMeaning": "শক্তিশালীকরণ / সুদৃঢ়করণ / ক্ষমতায়ন",
    "partsOfSpeech": "Noun",
    "synonyms": "Reinforcement, fortification, bolstering, enhancement",
    "antonyms": "Weakening, undermining, erosion",
    "englishMeaning": "The action or process of making something stronger or more robust.",
    "exampleSentence": "Education promotes the strengthening of human rights and peace.",
    "unit": "Unit 5: Lesson 3 (Rights to Health and Education)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // --- Lesson 4: Coal Miners (10 words) ---
  {
    "id": "vocab-u5-l4-01",
    "word": "Colliery",
    "bengaliMeaning": "কয়লা খনি ও সংলগ্ন কারখানা চত্বর",
    "partsOfSpeech": "Noun",
    "synonyms": "Coalmine, pit, quarry, excavation shaft",
    "antonyms": "Open meadow, farmland",
    "englishMeaning": "A coal mine and the buildings connected with it.",
    "exampleSentence": "A tragic disaster at the Huskar Colliery prompted sweeping factory reforms.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Dhaka Board Standard, Unit 5"
  },
  {
    "id": "vocab-u5-l4-02",
    "word": "Inhumane",
    "bengaliMeaning": "অমানবিক / নিষ্ঠুর / হৃদয়হীন ও বর্বর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Cruel, brutal, callous, barbaric, merciless",
    "antonyms": "Compassionate, humane, benevolent, merciful",
    "englishMeaning": "Without compassion for misery or suffering; cruel and uncaring.",
    "exampleSentence": "Chaining small children to coal carts was an inhumane practice of early capitalism.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u5-l4-03",
    "word": "Exploitations",
    "bengaliMeaning": "শোষণ / অসহায়তার অনুচিত সুযোগ গ্রহণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Abuses, victimizations, manipulations, unfair takings",
    "antonyms": "Fair treatment, protections, empowerment",
    "englishMeaning": "The action of treating someone unfairly in order to benefit from their work.",
    "exampleSentence": "The commission uncovered shocking exploitations of defenseless youth in mines.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u5-l4-04",
    "word": "Testimonies",
    "bengaliMeaning": "সাক্ষ্য / চাক্ষুষ বিবৃতি ও প্রমাণমালা",
    "partsOfSpeech": "Noun",
    "synonyms": "Statements, evidence, declarations, affidavits, accounts",
    "antonyms": "Denials, retractions, fables",
    "englishMeaning": "Formal written or spoken statements, especially given in an investigation or court.",
    "exampleSentence": "Heartbreaking testimonies of little girls shocked British parliamentary lawmakers.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u5-l4-05",
    "word": "Trapper",
    "bengaliMeaning": "খনিতে বায়ুচলাচল দরজার শিশুপ্রহরী",
    "partsOfSpeech": "Noun",
    "synonyms": "Vent-tender, pit-door boy, door-keeper",
    "antonyms": "Mine superintendent",
    "englishMeaning": "A young miner employed to open and close ventilation doors in a mine.",
    "exampleSentence": "The eight-year-old trapper sat in pitch-black gloom for twelve long hours.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u5-l4-06",
    "word": "Fathom",
    "bengaliMeaning": "ফ্যাদম / ছয় ফুট গভীরতা পরিমাপক একক",
    "partsOfSpeech": "Noun",
    "synonyms": "Linear depth unit, 6-foot measure, nautical unit",
    "antonyms": "Surface level",
    "englishMeaning": "A unit of length equal to six feet (approximately 1.8 meters), used especially for measuring the depth of water or mines.",
    "exampleSentence": "The little girl trudged hundreds of fathoms beneath the surface of the earth.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u5-l4-07",
    "word": "Stoop",
    "bengaliMeaning": "কুঁজো হয়ে ঝুঁকে চলা / মাথা নিচু করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Bend, crouch, hunch, bow, kneel down",
    "antonyms": "Stand erect, straighten up, rise",
    "englishMeaning": "Bend one's head or body forward and downward.",
    "exampleSentence": "Miners had to stoop low in narrow tunnels filled with toxic seeping water.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u5-l4-08",
    "word": "Fatigue",
    "bengaliMeaning": "চরম ক্লান্তি / শারীরিক ও মানসিক অবসাদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Exhaustion, weariness, lethargy, tiredness, languor",
    "antonyms": "Energy, vigor, vitality, freshness",
    "englishMeaning": "Extreme tiredness resulting from mental or physical exertion or illness.",
    "exampleSentence": "Overcome by sheer fatigue, child laborers would collapse on the damp pit floor.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u5-l4-09",
    "word": "Obliged",
    "bengaliMeaning": "বাধ্য / নিরুপায় হয়ে দায়বদ্ধ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Compelled, forced, required, bound, constrained",
    "antonyms": "Free, unrestrained, exempt",
    "englishMeaning": "Make someone legally or morally bound to an action or course of action.",
    "exampleSentence": "Impoverished children felt obliged to earn bread for their starving siblings.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u5-l4-10",
    "word": "Rudely",
    "bengaliMeaning": "রূঢ়ভাবে / কর্কশ ও নির্দয়ভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Harshly, insolently, discourteously, crudely, impolitely",
    "antonyms": "Politely, courteously, kindly, respectfully",
    "englishMeaning": "In an offensive, bad-mannered, or aggressive manner.",
    "exampleSentence": "Overseers treated the helpless adolescent workers rudely and without empathy.",
    "unit": "Unit 5: Lesson 4 (Coal Miners)",
    "boardExamTag": "HSC Board Standard, Unit 5"
  },

  // --- Lesson 5: Frederick Douglass (11 words) ---
  {
    "id": "vocab-u5-l5-01",
    "word": "Authentic",
    "bengaliMeaning": "প্রামাণিক / খাঁটি / নির্ভরযোগ্য ও পরীক্ষিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Genuine, verified, reliable, legitimate, real",
    "antonyms": "Fake, forged, spurious, fabricated",
    "englishMeaning": "Of undisputed origin; genuine and verified.",
    "exampleSentence": "Enslaved people were deliberately denied any authentic record of their births.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Dhaka Board Standard, Unit 5"
  },
  {
    "id": "vocab-u5-l5-02",
    "word": "Impertinent",
    "bengaliMeaning": "ধৃষ্টতাপূর্ণ / বেয়াদব / শিষ্টাচারবহির্ভূত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Insolent, impudent, disrespectful, brazen, ill-mannered",
    "antonyms": "Respectful, polite, deferential, courteous",
    "englishMeaning": "Not showing proper respect; rude or insolent.",
    "exampleSentence": "Masters considered inquiries about one's own age to be impertinent on a slave's part.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u5-l5-03",
    "word": "Estimate",
    "bengaliMeaning": "আনুমানিক হিসাব / নিরীক্ষা / পরিমাপ",
    "partsOfSpeech": "Noun",
    "synonyms": "Approximation, assessment, appraisal, valuation, guess",
    "antonyms": "Certainty, exactitude, exact measurement",
    "englishMeaning": "Roughly calculate or judge the value, number, quantity, or extent of.",
    "exampleSentence": "Douglass had to rely on an approximate estimate to determine how old he was.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u5-l5-04",
    "word": "Complexion",
    "bengaliMeaning": "ত্বকের বর্ণ / শারীরিক গায়ের রঙ",
    "partsOfSpeech": "Noun",
    "synonyms": "Skin tone, hue, coloration, visage, appearance",
    "antonyms": "Inner personality",
    "englishMeaning": "The natural color, texture, and appearance of a person's skin.",
    "exampleSentence": "His mother had a darker complexion than either of his grandparents.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u5-l5-05",
    "word": "Parentage",
    "bengaliMeaning": "পিতামাতার পরিচয় / কুলমর্যাদা / বংশপরিচয়",
    "partsOfSpeech": "Noun",
    "synonyms": "Lineage, ancestry, descent, origins, pedigree",
    "antonyms": "Unknown heritage",
    "englishMeaning": "The identity and origins of one's parents.",
    "exampleSentence": "The slave boy was kept in dark ignorance regarding his true parentage.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u5-l5-06",
    "word": "Withheld",
    "bengaliMeaning": "গোপন রাখা / আটকে রাখা / প্রদান না করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Suppressed, concealed, kept back, retained, denied",
    "antonyms": "Revealed, disclosed, granted, released",
    "englishMeaning": "Refused to give something that was due for or desired by another.",
    "exampleSentence": "The vital knowledge of his origin was coldly withheld from Frederick.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u5-l5-07",
    "word": "Infant",
    "bengaliMeaning": "দুগ্ধপোষ্য শিশু / নবজাতক",
    "partsOfSpeech": "Noun",
    "synonyms": "Baby, newborn, toddler, nursling",
    "antonyms": "Adult, grown-up",
    "englishMeaning": "A very young child or baby.",
    "exampleSentence": "While still a tiny infant, he was cruelly torn away from his mother's arms.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u5-l5-08",
    "word": "Hinder",
    "bengaliMeaning": "বাধা দেওয়া / বিঘ্ন সৃষ্টি করা / আটকে রাখা",
    "partsOfSpeech": "Verb",
    "synonyms": "Obstruct, impede, hamper, thwart, prevent",
    "antonyms": "Encourage, facilitate, assist, foster",
    "englishMeaning": "Create difficulties for someone or something, resulting in delay or obstruction.",
    "exampleSentence": "The master separated families to hinder the natural bonding between mother and son.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u5-l5-09",
    "word": "Blunt",
    "bengaliMeaning": "ভোঁতা করা / অনুভূতি নিস্তেজ করা / ভোঁতা হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Dull, deaden, numb, dampen, weaken",
    "antonyms": "Sharpen, intensify, heighten, sensitize",
    "englishMeaning": "Make less sharp, intense, or sensitive.",
    "exampleSentence": "Forced separation was designed to blunt the warm affection of motherhood.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u5-l5-09a",
    "word": "Affection",
    "bengaliMeaning": "স্নেহ / মমতা / গভীর ভালোবাসা",
    "partsOfSpeech": "Noun",
    "synonyms": "Tenderness, fondness, maternal love, devotion, warmth",
    "antonyms": "Hatred, enmity, coldness, indifference",
    "englishMeaning": "A gentle feeling of fondness or liking.",
    "exampleSentence": "The harsh institution sought to extinguish every spark of familial affection.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u5-l5-10",
    "word": "Restless",
    "bengaliMeaning": "অস্থির / বিদ্রোহী মনোভাবাপন্ন / অবাধ্য",
    "partsOfSpeech": "Adjective",
    "synonyms": "Rebellious, unruly, agitated, questioning, unquiet",
    "antonyms": "Submissive, calm, docile, obedient",
    "englishMeaning": "Unable to rest or relax as a result of anxiety, boredom, or yearning for freedom.",
    "exampleSentence": "A yearning to know his rights gave him a restless, unconquerable spirit.",
    "unit": "Unit 5: Lesson 5 (Frederick Douglass)",
    "boardExamTag": "HSC Board Standard, Unit 5"
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
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 5:'));
    const combined = [...existingOtherWords, ...unit5AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 5 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 3: Lesson 4'\) \|\| item\.unit\.includes\('Khona'\)\) \{\s*prefix = 'hsc-u3-l4-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 3: Lesson 4') || item.unit.includes('Khona')) {
      prefix = 'hsc-u3-l4-' + num;
    } else if (item.unit.includes('Unit 5: Lesson 1') || item.unit.includes('Rights-I')) {
      prefix = 'hsc-u5-l1-' + num;
    } else if (item.unit.includes('Unit 5: Lesson 2') || item.unit.includes('Rights-II')) {
      prefix = 'hsc-u5-l2-' + num;
    } else if (item.unit.includes('Unit 5: Lesson 3') || item.unit.includes('Health and Education')) {
      prefix = 'hsc-u5-l3-' + num;
    } else if (item.unit.includes('Unit 5: Lesson 4') || item.unit.includes('Coal Miners')) {
      prefix = 'hsc-u5-l4-' + num;
    } else if (item.unit.includes('Unit 5: Lesson 5') || item.unit.includes('Frederick Douglass')) {
      prefix = 'hsc-u5-l5-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 5 added ${unit5AllLessonsWords.length} words.`);

    // Update hscUnitsData.js for Unit 5
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-5',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u5-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u5-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u5-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u5-l4',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u5-l5',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-5',
    number: 5,
    unitNumber: 'Unit 5',
    unitTitle: 'Human Rights',
    unitTitleBn: 'মানবাধিকার ও স্বাধীনতা',
    bgClass: 'bg-[#b81d9f] hover:bg-[#cb23b0]',
    gradient: 'from-[#cb23b0] to-[#8e117a]',
    progress: 0,
    totalWords: 44,
    masteredWords: 0,
    lessons: [
      { id: 'u5-l1', number: 'Lesson 1', title: 'Are We Aware of These Rights -I?', titleBn: 'আমরা কি অধিকার সম্পর্কে সচেতন?-১', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u5-l2', number: 'Lesson 2', title: 'Are We Aware of These Rights -II?', titleBn: 'আমরা কি অধিকার সম্পর্কে সচেতন?-২', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u5-l3', number: 'Lesson 3', title: 'Rights to Health and Education', titleBn: 'স্বাস্থ্য ও শিক্ষার অধিকার', questionsCount: '২৮ টি প্রশ্ন', wordsCount: 7, progress: 0 },
      { id: 'u5-l4', number: 'Lesson 4', title: 'Coal Miners', titleBn: 'কয়লা খনি শ্রমিকদের জীবন', questionsCount: '৪০ টি প্রশ্ন', wordsCount: 10, progress: 0 },
      { id: 'u5-l5', number: 'Lesson 5', title: 'Frederick Douglass', titleBn: 'ফ্রেডরিক ডগলাস', questionsCount: '৪৪ টি প্রশ্ন', wordsCount: 11, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 5!');
  });
}
