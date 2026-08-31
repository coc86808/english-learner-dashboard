import fs from 'fs';

// Complete curated list of Unit 9 Lesson 1 words matching the uploaded textbook photos
const unit9Words = [
  {
    "id": "vocab-u9-l1-01",
    "word": "Abstain",
    "bengaliMeaning": "বিরত থাকা / পরিহার করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Refrain, cease, desist, forgo",
    "antonyms": "Continue, indulge, participate",
    "englishMeaning": "To restrain oneself from partaking in or indulging in something harmful or risky.",
    "exampleSentence": "Adolescents should abstain from substance abuse and risky behaviors.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-02",
    "word": "Acquisition",
    "bengaliMeaning": "অর্জন / আয়ত্তকরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Attainment, achievement, learning, gain",
    "antonyms": "Loss, forfeit, surrender",
    "englishMeaning": "The learning, gaining, or developing of a skill, habit, or cognitive quality.",
    "exampleSentence": "The acquisition of adult skills is crucial during the teenage years.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u9-l1-03",
    "word": "Adolescence",
    "bengaliMeaning": "কৈশোর / বয়ঃসন্ধিকাল",
    "partsOfSpeech": "Noun",
    "synonyms": "Puberty, youth, teenage, juvenility",
    "antonyms": "Adulthood, old age, senility, maturity",
    "englishMeaning": "The transitional period of human growth and development between childhood and adulthood (ages 13 to 18).",
    "exampleSentence": "Adolescence is a time of rapid growth, identity formation, and potential.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "BSMRTU Admission & Board Exam"
  },
  {
    "id": "vocab-u9-l1-04",
    "word": "Adult",
    "bengaliMeaning": "প্রাপ্তবয়স্ক",
    "partsOfSpeech": "Noun",
    "synonyms": "Grown-up, mature person",
    "antonyms": "Juvenile, child, minor, infant",
    "englishMeaning": "A person who is fully grown or developed, legally aged 18 and over in our society.",
    "exampleSentence": "Persons 18 and over are legally considered adults in our society.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-05",
    "word": "Alcohol",
    "bengaliMeaning": "মদ্য / মাদক পানীয়",
    "partsOfSpeech": "Noun",
    "synonyms": "Liquor, intoxicant, spirits, brew",
    "antonyms": "Non-alcoholic beverage, soft drink",
    "englishMeaning": "A colorless volatile flammable liquid which is the intoxicating constituent of wine, beer, and spirits.",
    "exampleSentence": "Many adolescents face peer pressure to use alcohol and cigarettes.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-06",
    "word": "Arise",
    "bengaliMeaning": "উদ্ভূত হওয়া / সৃষ্টি হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Emerge, occur, originate, crop up",
    "antonyms": "Disappear, vanish, cease, end",
    "englishMeaning": "To originate, emerge, or come into being as a noticeable issue or event.",
    "exampleSentence": "Community leaders should intervene constructively when youth problems arise.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-07",
    "word": "Avoidance",
    "bengaliMeaning": "পরিহার / বর্জন",
    "partsOfSpeech": "Noun",
    "synonyms": "Avert, evasion, refraining, shunning",
    "antonyms": "Indulgence, participation, embracing",
    "englishMeaning": "The act of keeping away from or preventing something harmful from happening.",
    "exampleSentence": "The avoidance of harmful drugs during teenage years protects future health.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-08",
    "word": "Barrier",
    "bengaliMeaning": "বাধা / প্রতিবন্ধক",
    "partsOfSpeech": "Noun",
    "synonyms": "Obstacle, hindrance, hurdle, impediment",
    "antonyms": "Freedom, gateway, opening, bridge",
    "englishMeaning": "An obstacle, taboo, or rule that prevents progress, movement, or access.",
    "exampleSentence": "Provider attitudes often pose a significant barrier to adolescent healthcare access.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-09",
    "word": "Biological",
    "bengaliMeaning": "জৈবিক / জীবসম্পর্কিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Organic, physiological, biotic",
    "antonyms": "Inorganic, artificial, synthetic",
    "englishMeaning": "Relating to biology, living organisms, and natural bodily processes.",
    "exampleSentence": "Biological processes drive many developmental aspects of puberty and growth.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l1-10",
    "word": "Capable",
    "bengaliMeaning": "সক্ষম / দক্ষ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Able, competent, qualified, efficient",
    "antonyms": "Incapable, unable, incompetent",
    "englishMeaning": "Having the ability, skill, or power to do or understand something successfully.",
    "exampleSentence": "Adolescents are not yet fully capable of evaluating complex long-term consequences.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Exam, Unit 9"
  },
  {
    "id": "vocab-u9-l1-11",
    "word": "Communication",
    "bengaliMeaning": "যোগাযোগ / ভাববিনিময়",
    "partsOfSpeech": "Noun",
    "synonyms": "Interaction, contact, dialogue, interchange",
    "antonyms": "Isolation, disconnect, silence",
    "englishMeaning": "The imparting or exchanging of information by speaking, writing, or using digital media.",
    "exampleSentence": "The spread of global communication has transformed adolescent lifestyles.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l1-12",
    "word": "Community",
    "bengaliMeaning": "সম্প্রদায় / সমাজ",
    "partsOfSpeech": "Noun",
    "synonyms": "Society, fellowship, locality, public",
    "antonyms": "Isolation, solitude, individual",
    "englishMeaning": "A group of people living in the same place or having particular characteristics in common.",
    "exampleSentence": "Members of the community share the responsibility to support adolescent wellbeing.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u9-l1-13",
    "word": "Consequence",
    "bengaliMeaning": "পরিণাম / ফলাফল",
    "partsOfSpeech": "Noun",
    "synonyms": "Outcome, result, effect, aftermath",
    "antonyms": "Cause, origin, reason",
    "englishMeaning": "A result or effect of an action, condition, or behavioral decision.",
    "exampleSentence": "Adolescents should consider the serious consequences of reckless choices.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-14",
    "word": "Considerable",
    "bengaliMeaning": "উল্লেখযোগ্য / প্রচুর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Substantial, significant, sizable, noteworthy",
    "antonyms": "Inconsiderable, trivial, insignificant",
    "englishMeaning": "Notably large in size, amount, extent, or importance.",
    "exampleSentence": "Adolescence is also a time of considerable risk and peer pressure.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-15",
    "word": "Cope",
    "bengaliMeaning": "মানিয়ে নেওয়া / সামাল দেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Manage, adjust, handle, tackle, endure",
    "antonyms": "Crumble, collapse, surrender, fail",
    "englishMeaning": "To deal successfully with something difficult, stressful, or demanding.",
    "exampleSentence": "Life skills training helps adolescents to cope with academic and emotional pressures.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u9-l1-16",
    "word": "Critical",
    "bengaliMeaning": "জটিল / সংকটপূর্ণ / গুরুত্বপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Troublesome, crucial, vital, decisive, pivotal",
    "antonyms": "Uncritical, trivial, minor, insignificant",
    "englishMeaning": "Having decisive importance in the success, failure, or development of something.",
    "exampleSentence": "Adolescence represents one of the critical transitions in human life.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-17",
    "word": "Determinant",
    "bengaliMeaning": "নির্ধারক / নির্ণায়ক উপাদান",
    "partsOfSpeech": "Noun",
    "synonyms": "Factor, cause, driver, deciding element",
    "antonyms": "Result, consequence, outcome",
    "englishMeaning": "A factor or element that decisively determines the nature or outcome of something.",
    "exampleSentence": "The biological determinants of puberty are largely universal in nature.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-18",
    "word": "Differently",
    "bengaliMeaning": "ভিন্নভাবে / পৃথকভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Separately, distinctively, uniquely",
    "antonyms": "Similarly, identically, uniformly",
    "englishMeaning": "In a way that is not the same as another; in another manner.",
    "exampleSentence": "Laws, customs, and community practices affect adolescents differently than adults.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-19",
    "word": "Economic",
    "bengaliMeaning": "অর্থনৈতিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Financial, monetary, fiscal, commercial",
    "antonyms": "Non-financial, social",
    "englishMeaning": "Relating to the production, distribution, and consumption of goods, income, and resources.",
    "exampleSentence": "Young people gradually move toward social and economic independence.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Standard"
  },
  {
    "id": "vocab-u9-l1-20",
    "word": "Exert",
    "bengaliMeaning": "প্রয়োগ করা / খাটানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Exercise, apply, wield, bring to bear",
    "antonyms": "Rest, withhold, conceal, disuse",
    "englishMeaning": "To apply or bring to bear force, authority, effort, or psychological influence.",
    "exampleSentence": "Social contexts exert powerful influences on adolescent decision-making.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u9-l1-21",
    "word": "Experience",
    "bengaliMeaning": "অভিজ্ঞতা লাভ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Go through, encounter, undergo, face",
    "antonyms": "Inexperience, miss, avoid",
    "englishMeaning": "To undergo, encounter, or feel the effects of a situation or sensation.",
    "exampleSentence": "Adolescents experience profound biological and emotional transformations.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Exam, Unit 9"
  },
  {
    "id": "vocab-u9-l1-22",
    "word": "Exploitation",
    "bengaliMeaning": "শোষণ / অনুচিত সুযোগ গ্রহণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Abuse, manipulation, victimization, misuse",
    "antonyms": "Protection, empowerment, fairness, respect",
    "englishMeaning": "The action of treating someone unfairly in order to benefit from their work or vulnerability.",
    "exampleSentence": "Lack of legal protections leaves young people vulnerable to exploitation.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Exam"
  },
  {
    "id": "vocab-u9-l1-23",
    "word": "Fairly",
    "bengaliMeaning": "মোটামুটি / যথেষ্ট পরিমাণে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Moderately, reasonably, tolerably, quite",
    "antonyms": "Insufficiently, poorly, extremely",
    "englishMeaning": "To a moderately large extent or degree; with reasonable consistency.",
    "exampleSentence": "The physical stages of puberty are fairly universal across all human societies.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u9-l1-24",
    "word": "Global",
    "bengaliMeaning": "বিশ্বব্যাপী / সামগ্রিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Worldwide, cosmopolitan, universal, international",
    "antonyms": "Local, regional, provincial, isolated",
    "englishMeaning": "Relating to or encompassing the whole world; worldwide.",
    "exampleSentence": "Global digital media connects adolescents across countries and cultures.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-25",
    "word": "Inability",
    "bengaliMeaning": "অক্ষমতা / সামর্থ্যহীনতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Incapability, inadequacy, powerlessness",
    "antonyms": "Ability, capability, competence, power",
    "englishMeaning": "The state of being unable to do something due to lack of power, skill, or development.",
    "exampleSentence": "Inability to perceive hidden risks can lead adolescents into dangerous situations.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u9-l1-26",
    "word": "Individual",
    "bengaliMeaning": "ব্যক্তি / স্বতন্ত্র",
    "partsOfSpeech": "Noun",
    "synonyms": "Person, human being, entity, single",
    "antonyms": "Group, team, collective, mass",
    "englishMeaning": "A single human being as distinct from a group, class, or family.",
    "exampleSentence": "Most individuals go through developmental stages regardless of their background.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-27",
    "word": "Infancy",
    "bengaliMeaning": "শিশুকাল / শৈশব",
    "partsOfSpeech": "Noun",
    "synonyms": "Babyhood, nonage, early childhood, inception",
    "antonyms": "Adulthood, maturity, senescence",
    "englishMeaning": "The earliest period of childhood development, from birth to age two.",
    "exampleSentence": "Rapid growth during adolescence is second only to that in infancy.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-28",
    "word": "Intentional",
    "bengaliMeaning": "উদ্দেশ্যমূলক / ইচ্ছাকৃত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Deliberate, willful, intended, planned, conscious",
    "antonyms": "Unintentional, undesigned, accidental",
    "englishMeaning": "Done with conscious intention, purpose, premeditation, or design.",
    "exampleSentence": "Awareness campaigns educate teens about preventing intentional harm and injuries.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-29",
    "word": "Intervene",
    "bengaliMeaning": "হস্তক্ষেপ করা / মধ্যস্থতা করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Interfere, mediate, intercede, step in",
    "antonyms": "Ignore, overlook, disregard, withdraw",
    "englishMeaning": "To step into a situation to prevent undesirable outcomes or resolve conflict.",
    "exampleSentence": "Adults must intervene effectively when young people encounter mental health problems.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-30",
    "word": "Irrespective",
    "bengaliMeaning": "বিবেচনা করা হয় না এমন / নির্বিশেষে",
    "partsOfSpeech": "Adjective",
    "synonyms": "Regardless, notwithstanding, heedless",
    "antonyms": "Considered, mindful, attentive",
    "englishMeaning": "Not taking something into account; regardless of external conditions.",
    "exampleSentence": "Individuals pass through developmental stages irrespective of social or economic status.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l1-31",
    "word": "Key",
    "bengaliMeaning": "মূখ্য / প্রধান",
    "partsOfSpeech": "Adjective",
    "synonyms": "Major, chief, crucial, primary, pivotal",
    "antonyms": "Minor, secondary, trivial",
    "englishMeaning": "Of crucial importance; serving as the fundamental or chief factor.",
    "exampleSentence": "During adolescence one experiences several key physical and cognitive developments.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-32",
    "word": "Late",
    "bengaliMeaning": "বিলম্বে / দেরিতে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Belatedly, tardily, behindhand",
    "antonyms": "Early, in time, punctually",
    "englishMeaning": "Doing something or occurring after the usual, expected, or proper time.",
    "exampleSentence": "In modern urbanized societies, educated individuals tend to marry late.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u9-l1-33",
    "word": "Lifespan",
    "bengaliMeaning": "জীবনকাল / পরমায়ু",
    "partsOfSpeech": "Noun",
    "synonyms": "Lifetime, life expectancy, duration of life",
    "antonyms": "Brevity, instant",
    "englishMeaning": "The length of time for which a person, animal, or organism lives or functions.",
    "exampleSentence": "Adolescence represents one of the critical transitions in a person's life span.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Exam"
  },
  {
    "id": "vocab-u9-l1-34",
    "word": "Maturation",
    "bengaliMeaning": "পূর্ণতা / পরিপক্বতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Fulfillment, development, ripening, growth",
    "antonyms": "Decline, immaturity, regression",
    "englishMeaning": "The biological and psychological process of reaching full development and maturity.",
    "exampleSentence": "Physical and sexual maturation marks the transition toward adulthood.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-35",
    "word": "Negative",
    "bengaliMeaning": "নেতিবাচক / ক্ষতিকর",
    "partsOfSpeech": "Adjective",
    "synonyms": "Unenthusiastic, adverse, detrimental, unfavorable",
    "antonyms": "Positive, beneficial, constructive",
    "englishMeaning": "Consisting in or characterized by the absence rather than the presence of distinguishing features; adverse or harmful.",
    "exampleSentence": "Early risky habits can have long-lasting negative impacts on future health.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-36",
    "word": "Occur",
    "bengaliMeaning": "ঘটা / সংঘটিত হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Take place, happen, transpire, arise",
    "antonyms": "Stop, cease, vanish",
    "englishMeaning": "To happen, come to pass, or take place naturally.",
    "exampleSentence": "Biological growth that occurs after childhood prepares the body for adult life.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u9-l1-37",
    "word": "Pose",
    "bengaliMeaning": "সৃষ্টি করা / উত্থাপন করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Cause, present, create, produce",
    "antonyms": "Hide, conceal, resolve",
    "englishMeaning": "To present or constitute a problem, danger, or difficulty.",
    "exampleSentence": "Provider attitudes often pose significant barriers to accessing youth health services.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-38",
    "word": "Positive",
    "bengaliMeaning": "ইতিবাচক / গঠনমূলক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Affirmative, constructive, beneficial, optimistic",
    "antonyms": "Negative, adverse, pessimistic",
    "englishMeaning": "Constructive, optimistic, or confident; having a good or beneficial effect.",
    "exampleSentence": "Supportive families exert a positive influence on teenagers' emotional health.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-39",
    "word": "Pregnancy",
    "bengaliMeaning": "গর্ভাবস্থা",
    "partsOfSpeech": "Noun",
    "synonyms": "Childbearing, gestation",
    "antonyms": "Non-pregnancy",
    "englishMeaning": "The condition or period of being pregnant with an unborn offspring.",
    "exampleSentence": "Lack of reproductive education puts vulnerable young girls at risk of unintended pregnancies.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-40",
    "word": "Pressure",
    "bengaliMeaning": "চাপ / পীড়ন",
    "partsOfSpeech": "Noun",
    "synonyms": "Stress, strain, tension, compulsion",
    "antonyms": "Relief, calm, relaxation",
    "englishMeaning": "Continuous physical force or psychological stress exerted upon someone.",
    "exampleSentence": "Teens often struggle with peer pressure to engage in high-risk behaviors.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l1-41",
    "word": "Promote",
    "bengaliMeaning": "উন্নীত করা / উৎসাহ দেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Raise, foster, advance, encourage, boost",
    "antonyms": "Demote, discourage, impede, hinder",
    "englishMeaning": "To support, encourage, or actively contribute to the progress or growth of something.",
    "exampleSentence": "Schools have a duty to promote healthy adolescent development.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-42",
    "word": "Puberty",
    "bengaliMeaning": "বয়ঃসন্ধিকাল / যৌবনারম্ভ",
    "partsOfSpeech": "Noun",
    "synonyms": "Adolescence, maturation stage, sexual maturity",
    "antonyms": "Adulthood, infancy, childhood",
    "englishMeaning": "The period during which adolescents reach sexual maturity and become capable of reproduction.",
    "exampleSentence": "The onset of puberty marks the biological passage from childhood to adolescence.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l1-43",
    "word": "Range",
    "bengaliMeaning": "পরিসর / ব্যাপ্তি",
    "partsOfSpeech": "Noun",
    "synonyms": "Extent, scope, variety, spectrum, reach",
    "antonyms": "Limitation, narrowness",
    "englishMeaning": "The area of variation between upper and lower limits on a particular scale.",
    "exampleSentence": "Adolescents must learn a wide range of interpersonal and academic skills.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Exam"
  },
  {
    "id": "vocab-u9-l1-44",
    "word": "Reproduction",
    "bengaliMeaning": "বংশবৃদ্ধি বা প্রজনন-সংক্রান্ত",
    "partsOfSpeech": "Noun",
    "synonyms": "Regenerative, procreation, propagation, breeding",
    "antonyms": "Extinction, sterilization",
    "englishMeaning": "The biological process by which new individual organisms are produced by their parents.",
    "exampleSentence": "Laws sometimes restrict unmarried adolescents' access to reproductive health information.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-45",
    "word": "Restrict",
    "bengaliMeaning": "সীমাবদ্ধ করা / নিয়ন্ত্রণ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Limit, constrain, confine, restrain",
    "antonyms": "Expand, broaden, liberate, release",
    "englishMeaning": "To put a limit on or keep within specific bounds.",
    "exampleSentence": "Societal taboos restrict adolescents from openly discussing reproductive health.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-46",
    "word": "Risk",
    "bengaliMeaning": "ঝুঁকি / বিপদের সম্ভাবনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Hazard, danger, peril, jeopardy",
    "antonyms": "Safety, security, protection",
    "englishMeaning": "A situation involving exposure to danger, injury, or loss.",
    "exampleSentence": "Impulsive decision-making puts young people at high risk of unintentional injury.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u9-l1-47",
    "word": "Role",
    "bengaliMeaning": "ভূমিকা / দায়িত্ব",
    "partsOfSpeech": "Noun",
    "synonyms": "Part, function, duty, capacity, position",
    "antonyms": "Disregard, neglect",
    "englishMeaning": "The function assumed or part played by a person or thing in a particular situation.",
    "exampleSentence": "Teenagers develop the skills needed to carry out adult roles successfully.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-48",
    "word": "Several",
    "bengaliMeaning": "কয়েকটি / একাধিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Some, multiple, various, diverse",
    "antonyms": "None, zero, solitary",
    "englishMeaning": "More than two but not many of something.",
    "exampleSentence": "Children must pass through several stages in their lives to become adults.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-49",
    "word": "Specifically",
    "bengaliMeaning": "সুনির্দিষ্টভাবে / বিশেষ করে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Distinctively, particularly, expressly, uniquely",
    "antonyms": "Generally, broadly, commonly",
    "englishMeaning": "In a way that is exact, detailed, and specific.",
    "exampleSentence": "Specifically, adolescents struggle to assess the consequences of high-risk actions.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l1-50",
    "word": "Transmit",
    "bengaliMeaning": "সঞ্চারিত করা / ছড়ানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Spread, convey, transfer, pass on",
    "antonyms": "Hide, withhold, suppress, stop",
    "englishMeaning": "To pass or cause something to spread from one person or place to another.",
    "exampleSentence": "Unprotected risky behaviors can transmit serious infections such as HIV.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-51",
    "word": "Transition",
    "bengaliMeaning": "স্থানান্তর / রূপান্তর",
    "partsOfSpeech": "Noun",
    "synonyms": "Change, transfer, exchange, progression",
    "antonyms": "Preservation, permanence, stagnation",
    "englishMeaning": "The process or a period of changing from one state or condition to another.",
    "exampleSentence": "Adolescents make a successful transition from childhood to adulthood with family guidance.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u9-l1-52",
    "word": "Tremendous",
    "bengaliMeaning": "বিশাল / প্রচণ্ড / অসাধারণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Great, awesome, immense, colossal, huge",
    "antonyms": "Tiny, insignificant, trivial, slight",
    "englishMeaning": "Extremely great in scale, amount, intensity, or potential.",
    "exampleSentence": "Adolescence is a time of tremendous intellectual and emotional growth.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u9-l1-53",
    "word": "Unintentional",
    "bengaliMeaning": "অনিচ্ছাকৃত / অনভিপ্রেত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Accidental, sudden, inadvertent, unintended",
    "antonyms": "Intentional, deliberate, premeditated",
    "englishMeaning": "Done not on purpose or without conscious design.",
    "exampleSentence": "Young people taking physical hazards often suffer unintentional trauma.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u9-l1-54",
    "word": "Universal",
    "bengaliMeaning": "সার্বজনীন / সর্বব্যাপী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Worldwide, general, all-inclusive, omnipresent",
    "antonyms": "Particular, individual, local, specific",
    "englishMeaning": "Applicable to, existing in, or characteristic of all people, places, or conditions.",
    "exampleSentence": "The biological determinants of puberty are universal throughout humanity.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-55",
    "word": "Urbanization",
    "bengaliMeaning": "নগরায়ণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Urban expansion, city growth, municipal development",
    "antonyms": "Ruralization, de-urbanization",
    "englishMeaning": "The process of making an area more urban or migration of populations to cities.",
    "exampleSentence": "Urbanization and digital communication have reshaped modern youth culture.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u9-l1-56",
    "word": "Vary",
    "bengaliMeaning": "ভিন্ন হওয়া / পরিবর্তনশীল হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Differ, fluctuate, diverge, change",
    "antonyms": "Conform, match, stay same, agree",
    "englishMeaning": "To differ in size, amount, degree, or nature from something else of the same type.",
    "exampleSentence": "The duration of adolescence may vary across cultures and socio-economic situations.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Dhaka Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-57",
    "word": "Vulnerable",
    "bengaliMeaning": "সুরক্ষিত নয় এমন / অরক্ষিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Exposed, susceptible, defenseless, at risk",
    "antonyms": "Invulnerable, protected, secure, safe",
    "englishMeaning": "Susceptible to physical harm, emotional injury, or exploitation.",
    "exampleSentence": "Lack of life skills makes adolescents vulnerable to peer manipulation.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u9-l1-58",
    "word": "Well-being",
    "bengaliMeaning": "হিতাবস্থা / কল্যাণ / মঙ্গল",
    "partsOfSpeech": "Noun",
    "synonyms": "Welfare, betterment, prosperity, health",
    "antonyms": "Ill-being, woe, misery, suffering",
    "englishMeaning": "The state of being comfortable, healthy, or happy.",
    "exampleSentence": "Healthy lifestyle choices established early promote future well-being.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u9-l1-59",
    "word": "Wide",
    "bengaliMeaning": "ব্যাপক / বিস্তৃত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Broad, extensive, comprehensive, expansive",
    "antonyms": "Narrow, limited, restricted",
    "englishMeaning": "Including a great variety of people or things; broad in scope.",
    "exampleSentence": "Adolescents experience a wide range of social and emotional changes.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u9-l1-60",
    "word": "Span",
    "bengaliMeaning": "ব্যাপ্তি / বিস্তার / স্থিতিকাল",
    "partsOfSpeech": "Noun",
    "synonyms": "Duration, extent, stretch, period, length",
    "antonyms": "Instant, point, brevity, compression",
    "englishMeaning": "The full duration, extent, or reach of something from beginning to end.",
    "exampleSentence": "Adolescence represents one of the most critical transitions in an individual's life span.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "HSC Board Standard, Unit 9"
  },
  {
    "id": "vocab-u9-l1-61",
    "word": "Passage",
    "bengaliMeaning": "উত্তরণ / রূপান্তর / অতিক্রম",
    "partsOfSpeech": "Noun",
    "synonyms": "Transition, crossing, progression, evolution",
    "antonyms": "Stagnation, standstill, halt, cessation",
    "englishMeaning": "The process of moving or transitioning from one life stage, condition, or state to another.",
    "exampleSentence": "The onset of puberty marks the developmental passage from childhood to adolescence.",
    "unit": "Unit 9: Lesson 1 (Storms and Stresses of Adolescence)",
    "boardExamTag": "Rajshahi Board Exam"
  }
];

// Read hscQuestionsData.js and replace all Unit 9 words with this complete 61-word set
const qPath = './src/data/questions/hscQuestionsData.js';
let qContent = fs.readFileSync(qPath, 'utf8');

// Filter out old unit 9 words from hscVocabularyList
// Let's find start of hscVocabularyList and build questions database
const listStartMarker = 'export const hscVocabularyList = [\n';
const listEndMarker = '\n];\n\n// Generates question variations';

const startIdx = qContent.indexOf(listStartMarker);
const endIdx = qContent.indexOf(listEndMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const currentArrayStr = qContent.slice(startIdx + listStartMarker.length, endIdx);
  // Parse existing words (Unit 1 and Unit 10)
  // We can load them via node import
  import('../src/data/questions/hscQuestionsData.js').then((m) => {
    const nonUnit9Words = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 9'));
    const combinedWords = [...nonUnit9Words, ...unit9Words];

    const formattedAllWords = combinedWords.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    const newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAllWords + qContent.slice(endIdx);
    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully wrote ${combinedWords.length} total vocabulary words to hscQuestionsData.js!`);
    console.log(`Unit 9 Lesson 1 has ${unit9Words.length} words.`);

    // Update hscUnitsData.js
    const unitsPath = './src/data/hscUnitsData.js';
    let unitsContent = fs.readFileSync(unitsPath, 'utf8');
    unitsContent = unitsContent.replace(
      /id:\s*'unit-9',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u9-l1',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-9',
    number: 9,
    unitNumber: 'Unit 9',
    unitTitle: 'Adolescence',
    unitTitleBn: 'কৈশোর ও বয়ঃসন্ধিকাল',
    bgClass: 'bg-[#d97706] hover:bg-[#ec850b]',
    gradient: 'from-[#ec850b] to-[#a85802]',
    progress: 0,
    totalWords: 61,
    masteredWords: 0,
    lessons: [
      { id: 'u9-l1', number: 'Lesson 1', title: 'Storms and Stresses of Adolescence', titleBn: 'কৈশোরের ঝড় ও সংকট', questionsCount: '২৪৪ টি প্রশ্ন', wordsCount: 61, progress: 0 },`
    );
    fs.writeFileSync(unitsPath, unitsContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for 61 words (244 MCQs)!');
  });
}
