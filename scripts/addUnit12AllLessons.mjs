import fs from 'fs';

const unit12AllLessonsWords = [
  // --- Lesson 1: Water, Water Everywhere... (8 words) ---
  {
    "id": "vocab-u12-l1-01",
    "word": "Harrowing",
    "bengaliMeaning": "মর্মান্তিক / লোমহর্ষক ও নিদারুণ কষ্টদায়ক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Traumatic, agonizing, distressing, heartbreaking, painful",
    "antonyms": "Pleasurable, soothing, calming, pleasant",
    "englishMeaning": "Acutely distressing or painful.",
    "exampleSentence": "The harrowing voyage across drought-stricken waters tested human endurance.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Dhaka Board Standard, Unit 12"
  },
  {
    "id": "vocab-u12-l1-02",
    "word": "Tributary",
    "bengaliMeaning": "উপনদী / প্রধান নদীর সাথে মিলিত শাখানদী",
    "partsOfSpeech": "Noun",
    "synonyms": "Branch river, stream, affluent, feeder, side channel",
    "antonyms": "Main stream, sea, estuary",
    "englishMeaning": "A river or stream flowing into a larger river or lake.",
    "exampleSentence": "The Buriganga originated as a vibrant tributary linking the Ganges with local commerce.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u12-l1-03",
    "word": "Perpetual",
    "bengaliMeaning": "চিরস্থায়ী / নিরবচ্ছিন্ন ও অবিরাম",
    "partsOfSpeech": "Adjective",
    "synonyms": "Continuous, endless, permanent, ceaseless, eternal",
    "antonyms": "Temporary, fleeting, transient, intermittent",
    "englishMeaning": "Never ending or changing; occurring repeatedly.",
    "exampleSentence": "Untreated factory sewage emits a perpetual stench that sickens surrounding residents.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u12-l1-04",
    "word": "Stench",
    "bengaliMeaning": "দুর্গন্ধ / তীব্র পচা দুর্গন্ধযুক্ত বাতাস",
    "partsOfSpeech": "Noun",
    "synonyms": "Foul odor, reek, stink, fetor, malodor",
    "antonyms": "Fragrance, perfume, sweet scent, aroma",
    "englishMeaning": "A strong and very unpleasant smell.",
    "exampleSentence": "The foul stench hovering over the dead river drove fishermen away.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u12-l1-05",
    "word": "Discharges",
    "bengaliMeaning": "নির্গমন করে / অপদ্রব্য ও তরল বর্জ্য ফেলে দেয়",
    "partsOfSpeech": "Verb",
    "synonyms": "Emits, expels, releases, unloads, flushes, dumps",
    "antonyms": "Absorbs, retains, holds, purifies",
    "englishMeaning": "Allows a liquid, gas, or other substance to flow out from where it has been confined.",
    "exampleSentence": "The municipality discharges massive loads of unpurified sewage directly into the riverbed.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u12-l1-06",
    "word": "Tannery",
    "bengaliMeaning": "চামড়া প্রক্রিয়াকরণ কারখানা / ট্যানারি",
    "partsOfSpeech": "Noun",
    "synonyms": "Leather-works, tanyard, curriery, pelt processor",
    "antonyms": "Organic wildlife sanctuary",
    "englishMeaning": "A place where animal hides are tanned and turned into leather.",
    "exampleSentence": "Toxic chromium effluent from the old tannery district poisoned subterranean aquifers.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u12-l1-07",
    "word": "Shrink",
    "bengaliMeaning": "কুঁকড়ে যাওয়া / শুকিয়ে সংকুচিত হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Contract, diminish, shrivel, compress, constrict",
    "antonyms": "Expand, swell, grow, inflate",
    "englishMeaning": "Become or make smaller in size or amount.",
    "exampleSentence": "Under blistering tropical heat, the thirsty timber boards began to shrink.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u12-l1-08",
    "word": "Marvelled",
    "bengaliMeaning": "বিস্মিত হয়েছিল / অপরিসীম শ্রদ্ধায় মুগ্ধ হয়েছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Wondered, astonished, gazed in awe, admired",
    "antonyms": "Disregarded, ignored, scoffed",
    "englishMeaning": "Be filled with wonder or astonishment.",
    "exampleSentence": "Mughal explorers marvelled at the pristine tide of the sparkling river.",
    "unit": "Unit 12: Lesson 1 (Water Everywhere)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 2: The Greta Effect (8 words) ---
  {
    "id": "vocab-u12-l2-01",
    "word": "Activist",
    "bengaliMeaning": "কর্মসূচি পালনকারী সক্রিয় কর্মী / আন্দোলনকারী",
    "partsOfSpeech": "Noun",
    "synonyms": "Campaigner, advocate, crusader, militant reformer",
    "antonyms": "Bystander, passive spectator",
    "englishMeaning": "A person who campaigns to bring about political or social change.",
    "exampleSentence": "The teenage activist challenged world leaders to halt reliance on fossil fuels.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Dhaka Board Standard, Unit 12"
  },
  {
    "id": "vocab-u12-l2-02",
    "word": "Baffled",
    "bengaliMeaning": "হতভম্ব / চরম বিভ্রান্ত ও কিংকর্তব্যবিমূঢ়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Perplexed, bewildered, mystified, puzzled, confounded",
    "antonyms": "Clearheaded, enlightened, comprehending",
    "englishMeaning": "Totally bewilder or perplex.",
    "exampleSentence": "Students were baffled by the indifference of authorities toward glacier melt.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u12-l2-03",
    "word": "Syndrome",
    "bengaliMeaning": "লক্ষণসমষ্টি / শারীরিক বা মানসিক বিশেষ অবস্থা",
    "partsOfSpeech": "Noun",
    "synonyms": "Condition, disorder, complex, clinical diagnosis",
    "antonyms": "Flawless physical condition",
    "englishMeaning": "A group of symptoms that consistently occur together, or a condition characterized by a set of associated symptoms.",
    "exampleSentence": "Living with Asperger syndrome gave Greta unswerving focus on environmental science.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u12-l2-04",
    "word": "Boycott",
    "bengaliMeaning": "বর্জন করা / প্রতিবাদস্বরূপ অংশগ্রহণ প্রত্যাহার করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Spurn, shun, reject, embargo, abstain from, ostracize",
    "antonyms": "Patronize, support, participate in",
    "englishMeaning": "Withdraw from commercial or social relations with a country, organization, or person as a punishment or protest.",
    "exampleSentence": "Youth groups chose to boycott classes to press their urgent climate manifesto.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u12-l2-05",
    "word": "Catalyst",
    "bengaliMeaning": "অনুঘটক / ইতিবাচক পরিবর্তনের শক্তিশালী উদ্দীপক",
    "partsOfSpeech": "Noun",
    "synonyms": "Stimulus, spark, instigator, prime mover, trigger",
    "antonyms": "Deterrent, hindrance, damper",
    "englishMeaning": "A person or thing that precipitates an event or change.",
    "exampleSentence": "Her solitary school strike served as the catalyst for international climate rallies.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u12-l2-06",
    "word": "Global-warming",
    "bengaliMeaning": "বৈশ্বিক উষ্ণায়ন / গ্রিনহাউস গ্যাসের কারণে তাপমাত্রা বৃদ্ধি",
    "partsOfSpeech": "Noun",
    "synonyms": "Climate change, greenhouse heating, planetary warming",
    "antonyms": "Global cooling, ice age",
    "englishMeaning": "A gradual increase in the overall temperature of the earth's atmosphere generally attributed to the greenhouse effect.",
    "exampleSentence": "Accelerating global-warming intensifies sea-level rise along Bangladesh's coastlines.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u12-l2-07",
    "word": "Unprecedented",
    "bengaliMeaning": "অভূতপূর্ব / ইতিপূর্বে কখনো দেখা যায়নি এমন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unparalleled, matchless, novel, unprecedented, unequaled",
    "antonyms": "Familiar, common, usual, precedent",
    "englishMeaning": "Never done or known before.",
    "exampleSentence": "Millions of teenagers mobilized in an unprecedented display of planetary solidarity.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u12-l2-08",
    "word": "Accountable",
    "bengaliMeaning": "জবাবদিহিমূলক / কৃতকর্মের জন্য নীতিগতভাবে দায়ী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Responsible, answerable, liable, amenable, chargeable",
    "antonyms": "Unaccountable, immune, blameless",
    "englishMeaning": "Required or expected to justify actions or decisions; responsible.",
    "exampleSentence": "Carbon emitters must be held accountable for compensating climate-vulnerable societies.",
    "unit": "Unit 12: Lesson 2 (The Greta Effect)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 3: Endangered Species (8 words) ---
  {
    "id": "vocab-u12-l3-01",
    "word": "Endangered",
    "bengaliMeaning": "বিলুপ্তির ঝুঁকিতে থাকা / মারাত্মকভাবে বিপন্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Threatened, imperiled, vulnerable, at-risk, dying out",
    "antonyms": "Abundant, thriving, flourishing, safe",
    "englishMeaning": "Seriously at risk of extinction.",
    "exampleSentence": "The Bengal slow loris is an endangered primate requiring urgent sanctuary protection.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Dhaka Board Standard, Unit 12"
  },
  {
    "id": "vocab-u12-l3-02",
    "word": "Deciduous",
    "bengaliMeaning": "পর্ণমোচী / নির্দিষ্ট ঋতুতে পাতাঝরা বৃক্ষসমৃদ্ধ বন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Seasonal-shedding, broad-leaved, leaf-falling",
    "antonyms": "Evergreen, perennial",
    "englishMeaning": "Shedding its leaves annually (of a tree or shrub).",
    "exampleSentence": "Reptiles take refuge amid the leaf litter of deciduous forests during dry winter months.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u12-l3-03",
    "word": "Nocturnal",
    "bengaliMeaning": "নিশাচর / রাতের অন্ধকারে সক্রিয় প্রাণী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Night-active, nighttime, night-loving",
    "antonyms": "Diurnal, daytime-active",
    "englishMeaning": "Done, occurring, or active at night.",
    "exampleSentence": "Nocturnal mammals possess acute eyesight to forage under dense canopy shade.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u12-l3-04",
    "word": "Deforestation",
    "bengaliMeaning": "নির্বিচারে বন উজাড়করণ / বনাঞ্চল ধ্বংস",
    "partsOfSpeech": "Noun",
    "synonyms": "Forest clearance, logging, logging-off, de-treeing",
    "antonyms": "Afforestation, reforestation, forest preservation",
    "englishMeaning": "The action of clearing a wide area of trees.",
    "exampleSentence": "Rampant deforestation deprives wild elephants of customary migration corridors.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u12-l3-05",
    "word": "Poaching",
    "bengaliMeaning": "চোরাশিকার / বন্যপ্রাণী বেআইনি নিধন ও পাচার",
    "partsOfSpeech": "Noun",
    "synonyms": "Illegal hunting, illicit trapping, game theft",
    "antonyms": "Wildlife conservation, sanctuary management",
    "englishMeaning": "The illegal practice of trespassing on another's property to hunt or steal game.",
    "exampleSentence": "Armed rangers patrol the Sundarbans to suppress tiger poaching.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u12-l3-06",
    "word": "Habitat",
    "bengaliMeaning": "প্রাকৃতিক আবাসস্থল / প্রাণীর বেঁচে থাকার প্রাকৃতিক ক্ষেত্র",
    "partsOfSpeech": "Noun",
    "synonyms": "Natural home, territory, biotope, ecosystem, native environment",
    "antonyms": "Captivity, artificial cage, unnatural enclosure",
    "englishMeaning": "The natural home or environment of an animal, plant, or other organism.",
    "exampleSentence": "Protecting wetland habitat ensures plentiful fish breeding grounds.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u12-l3-07",
    "word": "Biodiversity",
    "bengaliMeaning": "জীববৈচিত্র্য / উদ্ভিদ ও প্রাণী প্রজাতির প্রাচুর্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Ecological variety, species diversity, wildlife wealth",
    "antonyms": "Monoculture, ecological sterility",
    "englishMeaning": "The variety of life in the world or in a particular habitat or ecosystem.",
    "exampleSentence": "The mangrove delta shelters an astonishing richness of avian and marine biodiversity.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u12-l3-08",
    "word": "Extinction",
    "bengaliMeaning": "বিলুপ্তি / কোনো প্রজাতির চিরতরে নিঃশেষ হওয়া",
    "partsOfSpeech": "Noun",
    "synonyms": "Dying out, eradication, annihilation, disappearance, extermination",
    "antonyms": "Survival, perpetuation, revival, proliferation",
    "englishMeaning": "The fact or process of a species, family, or other group of animals or plants becoming extinct.",
    "exampleSentence": "Once a species crosses into extinction, no human ingenuity can restore it.",
    "unit": "Unit 12: Lesson 3 (Endangered Species)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 4: What is Environmental Justice? (8 words) ---
  {
    "id": "vocab-u12-l4-01",
    "word": "Devastation",
    "bengaliMeaning": "ব্যাপক ধ্বংসযজ্ঞ / চরম বিপর্যয় ও ধ্বংসস্তূপ",
    "partsOfSpeech": "Noun",
    "synonyms": "Destruction, desolation, ruin, catastrophe, havoc",
    "antonyms": "Restoration, building, rehabilitation",
    "englishMeaning": "Great destruction or damage.",
    "exampleSentence": "The cyclone left a trail of unmitigated devastation across coastal fishing hamlets.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Dhaka Board Standard, Unit 12"
  },
  {
    "id": "vocab-u12-l4-02",
    "word": "Pernicious",
    "bengaliMeaning": "অত্যন্ত ক্ষতিকর / মারাত্মক ক্ষতিকর ও ধ্বংসাত্মক প্রভাব",
    "partsOfSpeech": "Adjective",
    "synonyms": "Harmful, destructive, noxious, insidious, lethal, malign",
    "antonyms": "Beneficial, wholesome, salutary, harmless",
    "englishMeaning": "Having a harmful effect, especially in a gradual or subtle way.",
    "exampleSentence": "Corporate dumping exerted pernicious effects upon local ground water tables.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u12-l4-03",
    "word": "Disproportionately",
    "bengaliMeaning": "অসমভাবে / মাত্রাতিরিক্ত অসম অনুপাতে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Unequally, unevenly, excessively, unfair in proportion",
    "antonyms": "Equitably, proportionately, fairly, evenly",
    "englishMeaning": "To an extent that is too large or too small in comparison with something else.",
    "exampleSentence": "Environmental contamination falls disproportionately upon impoverished minority enclaves.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u12-l4-04",
    "word": "Shortsighted",
    "bengaliMeaning": "অদূরদর্শী / সংকীর্ণ ও ভবিষ্যৎহীন দৃষ্টিভঙ্গিসম্পন্ন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Myopic, improvident, unthinking, narrow-minded, careless",
    "antonyms": "Farsighted, visionary, prudent, provident",
    "englishMeaning": "Lacking foresight or intellectual insight.",
    "exampleSentence": "Shortsighted industrial deregulation invites catastrophic long-term public health crises.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u12-l4-05",
    "word": "Overconsumption",
    "bengaliMeaning": "অতিরিক্ত ভোগ / সম্পদের লাগামহীন অপব্যয়",
    "partsOfSpeech": "Noun",
    "synonyms": "Excessive consumption, squandering, depletion, resource gorging",
    "antonyms": "Conservation, moderation, frugal stewardship",
    "englishMeaning": "The action of consuming something in excessive amounts.",
    "exampleSentence": "Western overconsumption of single-use plastics overwhelms oceanic life.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u12-l4-06",
    "word": "Interconnected",
    "bengaliMeaning": "পরস্পর সংযুক্ত / ওতপ্রোতভাবে জড়িয়ে থাকা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Interlinked, interrelated, interdependent, mutually tied",
    "antonyms": "Isolated, disconnected, separate, independent",
    "englishMeaning": "Having all constituent parts linked or connected.",
    "exampleSentence": "Global ecology operates through an intricate web of interconnected food chains.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u12-l4-07",
    "word": "Explosion",
    "bengaliMeaning": "বিস্ফোরণ / রাসায়নিক বা পারমাণবিক প্রচণ্ড নির্গমন",
    "partsOfSpeech": "Noun",
    "synonyms": "Blast, detonation, blowup, burst, eruption",
    "antonyms": "Implosion, containment, suppression",
    "englishMeaning": "A violent and destructive shattering or blowing apart of something.",
    "exampleSentence": "The chemical reactor explosion in Bhopal leaked lethal methyl isocyanate gas.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u12-l4-08",
    "word": "Ecological",
    "bengaliMeaning": "বাস্তুসংস্থানিক / পরিবেশ ও জীবজগতের সম্পর্ক বিষয়ক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Environmental, ecosystemic, bionomic, green, natural",
    "antonyms": "Anti-ecological, artificial",
    "englishMeaning": "Relating to or concerned with the relation of living organisms to one another and to their physical surroundings.",
    "exampleSentence": "Restoring mangroves is crucial for maintaining regional ecological equilibrium.",
    "unit": "Unit 12: Lesson 4 (Environmental Justice)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // --- Lesson 5: Limits of the Scientific Method (8 words) ---
  {
    "id": "vocab-u12-l5-01",
    "word": "Philosophers",
    "bengaliMeaning": "দার্শনিক / তত্ত্বজ্ঞানী চিন্তাবিদ ও তত্ত্ববিদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Thinkers, sages, theorists, scholars, visionaries, logicians",
    "antonyms": "Dogmatists, literalists",
    "englishMeaning": "Persons engaged or learned in philosophy, especially as an academic discipline.",
    "exampleSentence": "Agricultural researchers must think as philosophers before disrupting ancient soil microbiomes.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Dhaka Board Standard, Unit 12"
  },
  {
    "id": "vocab-u12-l5-02",
    "word": "Whittling",
    "bengaliMeaning": "ছেঁটে ফেলা / অপ্রয়োজনীয় অংশ ধীরে ধীরে কেটে বাদ দেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Paring down, trimming, pruning, carving away, reducing gradually",
    "antonyms": "Expanding, augmenting, multiplying, heaping on",
    "englishMeaning": "Carving wood into an object by repeatedly cutting small slices from it; reducing something in size gradually.",
    "exampleSentence": "Natural farming thrives by whittling away unnecessary tillage and chemical inputs.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u12-l5-03",
    "word": "Aimlessly",
    "bengaliMeaning": "উদ্দেশ্যহীনভাবে / লক্ষ্যভ্রষ্ট হয়ে দিকবিদিক",
    "partsOfSpeech": "Adverb",
    "synonyms": "Purposelessly, haphazardly, erratically, blindly, randomly",
    "antonyms": "Purposefully, deliberately, intentionally, systematically",
    "englishMeaning": "Without purpose or direction.",
    "exampleSentence": "Commercial research wanders aimlessly when severed from holistic ecology.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u12-l5-04",
    "word": "Desertification",
    "bengaliMeaning": "মরুকরণ / সবুজ উর্বর ভূমির মরুভূমিতে রূপান্তর",
    "partsOfSpeech": "Noun",
    "synonyms": "Land degradation, aridification, barrenness, soil exhaustion",
    "antonyms": "Reforestation, land revitalization, afforestation",
    "englishMeaning": "The process by which fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agriculture.",
    "exampleSentence": "Fukuoka's seed-ball technique succeeded in reversing severe desertification in arid zones.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u12-l5-05",
    "word": "Modernization",
    "bengaliMeaning": "আধুনিকীকরণ / যন্ত্রনির্ভর নবরূপে সজ্জিতকরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Renovation, technological updating, industrialization, mechanization",
    "antonyms": "Traditionalism, primitivism",
    "englishMeaning": "The process of adapting something to modern needs or habits, typically by installing modern equipment.",
    "exampleSentence": "Reckless modernization of agriculture depleted living organic topsoil across continents.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u12-l5-06",
    "word": "Theories",
    "bengaliMeaning": "তত্ত্বসমূহ / সুবিন্যস্ত বৈজ্ঞানিক মতবাদ",
    "partsOfSpeech": "Noun",
    "synonyms": "Hypotheses, doctrines, principles, concepts, theorems",
    "antonyms": "Concrete facts, direct experiences, reality",
    "englishMeaning": "Suppositions or systems of ideas intended to explain something.",
    "exampleSentence": "Agronomic theories must bend to real soil behavior in diverse agro-climatic regions.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u12-l5-07",
    "word": "Harvest",
    "bengaliMeaning": "ফসল উত্তোলন / কৃষিজ উৎপাদন ও ফলন",
    "partsOfSpeech": "Noun",
    "synonyms": "Crop yield, reaping, gathering, produce, vintage",
    "antonyms": "Fallow season, seed-time",
    "englishMeaning": "The process or period of gathering in crops; the product or result of an action.",
    "exampleSentence": "Mulching straw yielded an abundant golden rice harvest with zero chemical fertilizers.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u12-l5-08",
    "word": "Practitioner",
    "bengaliMeaning": "অনুশীলনকারী / অভিজ্ঞ বাস্তবায়নকারী ব্রতী ব্যক্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Professional, specialist, doer, master, technician",
    "antonyms": "Amateur, novice, theorist",
    "englishMeaning": "A person actively engaged in an art, discipline, or profession, especially medicine or agriculture.",
    "exampleSentence": "As a dedicated practitioner of natural tillage, he inspired generations of permaculture farmers.",
    "unit": "Unit 12: Lesson 5 (Limits of Scientific Method)",
    "boardExamTag": "HSC Board Standard, Unit 12"
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
    // Filter out any existing Unit 12 words
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 12:'));
    const combined = [...existingOtherWords, ...unit12AllLessonsWords];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure question generation handles Unit 12 lesson prefixes
    newContent = newContent.replace(
      /if \(item\.unit\.includes\('Unit 11: Lesson 5'\) \|\| item\.unit\.includes\('Opinions through Images'\)\) \{\s*prefix = 'hsc-u11-l5-' \+ num;\s*\}/,
      `if (item.unit.includes('Unit 11: Lesson 5') || item.unit.includes('Opinions through Images')) {
      prefix = 'hsc-u11-l5-' + num;
    } else if (item.unit.includes('Unit 12: Lesson 1') || item.unit.includes('Water Everywhere')) {
      prefix = 'hsc-u12-l1-' + num;
    } else if (item.unit.includes('Unit 12: Lesson 2') || item.unit.includes('The Greta Effect')) {
      prefix = 'hsc-u12-l2-' + num;
    } else if (item.unit.includes('Unit 12: Lesson 3') || item.unit.includes('Endangered Species')) {
      prefix = 'hsc-u12-l3-' + num;
    } else if (item.unit.includes('Unit 12: Lesson 4') || item.unit.includes('Environmental Justice')) {
      prefix = 'hsc-u12-l4-' + num;
    } else if (item.unit.includes('Unit 12: Lesson 5') || item.unit.includes('Limits of Scientific Method')) {
      prefix = 'hsc-u12-l5-' + num;
    }`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 12 added ${unit12AllLessonsWords.length} new words.`);

    // Update hscUnitsData.js for Unit 12
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-12',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u12-l1',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u12-l2',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u12-l3',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u12-l4',[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u12-l5',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-12',
    number: 12,
    unitNumber: 'Unit 12',
    unitTitle: 'Environment and Nature',
    unitTitleBn: 'পরিবেশ ও প্রকৃতি',
    bgClass: 'bg-[#15803d] hover:bg-[#166534]',
    gradient: 'from-[#22c55e] to-[#15803d]',
    progress: 0,
    totalWords: 40,
    masteredWords: 0,
    lessons: [
      { id: 'u12-l1', number: 'Lesson 1', title: 'Water, Water Everywhere...', titleBn: 'পানি দূষণ ও হাহাকার', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u12-l2', number: 'Lesson 2', title: 'The Greta Effect', titleBn: 'গ্রেটা প্রভাব ও জলবায়ু আন্দোলন', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u12-l3', number: 'Lesson 3', title: 'Endangered Species', titleBn: 'বিপন্ন বন্যপ্রাণী', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u12-l4', number: 'Lesson 4', title: 'What is Environmental Justice?', titleBn: 'পরিবেশগত সুবিচার', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },
      { id: 'u12-l5', number: 'Lesson 5', title: 'Limits of the Scientific Method', titleBn: 'প্রাকৃতিক কৃষি ও মাসানোবু ফুকুওকা', questionsCount: '৩২ টি প্রশ্ন', wordsCount: 8, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 12!');
  });
}
