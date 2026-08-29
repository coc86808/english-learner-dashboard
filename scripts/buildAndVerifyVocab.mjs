import fs from 'fs';
import path from 'path';

const hscVocabularyList = [
  // 1. Bounty (vocab-u1-l1-01)
  {
    "id": "vocab-u1-l1-01",
    "word": "Bounty",
    "bengaliMeaning": "পুরস্কার / অনুদান / বদান্যতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Reward, prize, grant, bonus",
    "antonyms": "Penalty, fine, punishment",
    "englishMeaning": "A reward, prize, or monetary grant given by authority for an effort or service.",
    "exampleSentence": "The king gave a handsome bounty to the scholars and cage-builders.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "HSC Board Standard, Unit 1"
  },

  // 2. Contextual (vocab-u1-l1-02)
  {
    "id": "vocab-u1-l1-02",
    "word": "Contextual",
    "bengaliMeaning": "প্রাসঙ্গিক / পরিপ্রেক্ষিতমূলক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Relevant, related, circumstantial, pertinent",
    "antonyms": "Irrelevant, unrelated, out-of-context",
    "englishMeaning": "Depending on, related to, or clarifying the surrounding circumstances.",
    "exampleSentence": "Contextual understanding of Rabindranath's satire makes the story even more profound.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },

  // 3. Deliberate (vocab-u1-l1-03)
  {
    "id": "vocab-u1-l1-03",
    "word": "Deliberate",
    "bengaliMeaning": "গভীরভাবে চিন্তা করা / বিবেচনা করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Contemplate, ponder, reflect, meditate",
    "antonyms": "Disregard, overlook, ignore",
    "englishMeaning": "To engage in long and careful consideration or discussion.",
    "exampleSentence": "The royal pundits met to deliberate on how to educate the ignorant bird.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 4. Detractor (vocab-u1-l1-04)
  {
    "id": "vocab-u1-l1-04",
    "word": "Detractor",
    "bengaliMeaning": "নিন্দুক / সমালোচক / কুৎসাকারী",
    "partsOfSpeech": "Noun",
    "synonyms": "Critic, disparager, censurer, fault-finder",
    "antonyms": "Supporter, admirer, advocate, benefactor",
    "englishMeaning": "A person who disparages someone or something, seeking to diminish their worth.",
    "exampleSentence": "The envious detractor complained that the bird was starving inside its cage.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 5. Delighted (vocab-u1-l1-05)
  {
    "id": "vocab-u1-l1-05",
    "word": "Delighted",
    "bengaliMeaning": "আনন্দিত / অত্যন্ত খুশি",
    "partsOfSpeech": "Adjective",
    "synonyms": "Pleased, overjoyed, thrilled, gratified",
    "antonyms": "Dejected, depressed, miserable, sorrowful",
    "englishMeaning": "Feeling or showing great pleasure and satisfaction.",
    "exampleSentence": "The king was delighted to witness the golden sheen of the newly built cage.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 6. Din (vocab-u1-l1-06)
  {
    "id": "vocab-u1-l1-06",
    "word": "Din",
    "bengaliMeaning": "কোলাহল / হট্টগোল / বিকট শব্দ",
    "partsOfSpeech": "Noun",
    "synonyms": "Uproar, tumult, commotion, racket, clamor",
    "antonyms": "Silence, quietude, peace, serenity",
    "englishMeaning": "A loud, unpleasant, and prolonged tumult or noise.",
    "exampleSentence": "The deafening din of scholars reciting mantras filled the entire palace courtyard.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 7. Demonstration (vocab-u1-l1-07)
  {
    "id": "vocab-u1-l1-07",
    "word": "Demonstration",
    "bengaliMeaning": "প্রদর্শন / চিত্রায়ন / উপস্থাপন",
    "partsOfSpeech": "Noun",
    "synonyms": "Display, illustration, exhibition, presentation",
    "antonyms": "Concealment, hiding, suppression",
    "englishMeaning": "An act of showing or explaining something clearly to an audience.",
    "exampleSentence": "The teachers gave a magnificent demonstration of the parrot's memorization method.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Barishal Board Model"
  },

  // 8. Downfall (vocab-u1-l1-08)
  {
    "id": "vocab-u1-l1-08",
    "word": "Downfall",
    "bengaliMeaning": "অধঃপতন / পতন / সর্বনাশ",
    "partsOfSpeech": "Noun",
    "synonyms": "Ruin, collapse, downfall, degradation",
    "antonyms": "Rise, ascent, triumph, elevation",
    "englishMeaning": "A loss of power, prosperity, health, or status; ruin.",
    "exampleSentence": "Rigid schooling led to the tragic downfall and death of the vibrant bird.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 9. Exquisite (vocab-u1-l1-09)
  {
    "id": "vocab-u1-l1-09",
    "word": "Exquisite",
    "bengaliMeaning": "অপরূপ সুন্দর / চমৎকার / নিখুঁত কারুকাজময়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Splendid, magnificent, elegant, superb, delicate",
    "antonyms": "Crude, ordinary, common, ugly",
    "englishMeaning": "Extremely beautiful, delicate, and pleasing to look at.",
    "exampleSentence": "Goldsmiths crafted an exquisite golden cage that dazzled all royal visitors.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 10. Entrust (vocab-u1-l1-10)
  {
    "id": "vocab-u1-l1-10",
    "word": "Entrust",
    "bengaliMeaning": "অর্পণ করা / দায়িত্ব দেওয়া / ন্যস্ত করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Assign, delegate, commit, confide",
    "antonyms": "Withhold, retain, keep, hold",
    "englishMeaning": "To assign the responsibility for doing something to someone.",
    "exampleSentence": "The king decided to entrust the education of the bird to his nephews.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 11. Flourish (vocab-u1-l1-11)
  {
    "id": "vocab-u1-l1-11",
    "word": "Flourish",
    "bengaliMeaning": "সমৃদ্ধিশালী হওয়া / উন্নতি লাভ করা / বিকশিত হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Thrive, prosper, bloom, blossom",
    "antonyms": "Wither, decline, languish, fail",
    "englishMeaning": "To grow or develop in a healthy or vigorous way; thrive.",
    "exampleSentence": "All the relatives and scribes flourished with wealth from the education fund.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 12. Feeble (vocab-u1-l1-12)
  {
    "id": "vocab-u1-l1-12",
    "word": "Feeble",
    "bengaliMeaning": "দুর্বল / নিস্তেজ / ক্ষীণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Weak, frail, sickly, debilitated, faint",
    "antonyms": "Strong, robust, vigorous, sturdy",
    "englishMeaning": "Lacking physical strength, energy, or power; weak.",
    "exampleSentence": "Over time, the stuffed parrot grew too feeble even to chirp or flutter.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 13. Flutter (vocab-u1-l1-13)
  {
    "id": "vocab-u1-l1-13",
    "word": "Flutter",
    "bengaliMeaning": "ডানা ঝাপটানো / কম্পিত হওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Flap, flicker, quiver, beat",
    "antonyms": "Settle, freeze, stay still",
    "englishMeaning": "To fly unsteadily or flap wings quickly and lightly.",
    "exampleSentence": "The caged parrot tried to flutter its wings toward the open forest sky.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },

  // 14. Folly (vocab-u1-l1-14)
  {
    "id": "vocab-u1-l1-14",
    "word": "Folly",
    "bengaliMeaning": "বোকামি / মূর্খতা / নির্বুদ্ধিতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Foolishness, stupidity, absurdity, silliness",
    "antonyms": "Wisdom, prudence, sagacity, sanity",
    "englishMeaning": "Lack of good sense; foolishness or an unwise action.",
    "exampleSentence": "Rabindranath Tagore satirized the utter folly of rote memorization in education.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 15. Gilded (vocab-u1-l1-15)
  {
    "id": "vocab-u1-l1-15",
    "word": "Gilded",
    "bengaliMeaning": "সোনার জলে মোড়ানো / সোনালি / স্বর্ণখচিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Gold-plated, golden, ornate, gilded",
    "antonyms": "Unadorned, plain, bare, rustic",
    "englishMeaning": "Covered thinly with gold leaf or gold paint; opulent.",
    "exampleSentence": "Inside the gilded cage, the wild bird lost its natural song and freedom.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 16. Hop (vocab-u1-l1-16)
  {
    "id": "vocab-u1-l1-16",
    "word": "Hop",
    "bengaliMeaning": "লাফানো / লাফিয়ে চলা / এক পায়ে লাফানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Jump, leap, bound, skip",
    "antonyms": "Stand still, halt, stay",
    "englishMeaning": "To move by jumping on one or both feet or legs.",
    "exampleSentence": "In the wild, the free bird used to hop merrily from branch to branch.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 17. Humorous (vocab-u1-l1-17)
  {
    "id": "vocab-u1-l1-17",
    "word": "Humorous",
    "bengaliMeaning": "হাস্যরসাত্মক / হাস্যরসপূর্ণ / রসাত্মক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Amusing, comical, funny, witty, hilarious",
    "antonyms": "Serious, grave, somber, solemn",
    "englishMeaning": "Causing lighthearted laughter and amusement; comical.",
    "exampleSentence": "Tagore presents a humorous yet biting critique of bureaucratic education.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Barishal Board Model"
  },

  // 18. Impudence (vocab-u1-l1-18)
  {
    "id": "vocab-u1-l1-18",
    "word": "Impudence",
    "bengaliMeaning": "ধৃষ্টতা / ঔদ্ধত্য / নির্লজ্জতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Insolence, impertinence, audacity, disrespect",
    "antonyms": "Politeness, civility, modesty, courtesy",
    "englishMeaning": "The trait of being rude, insolent, and disrespectfully bold.",
    "exampleSentence": "The royal courtiers considered it impudence when the bird gasped for air.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 19. Innate (vocab-u1-l1-19)
  {
    "id": "vocab-u1-l1-19",
    "word": "Innate",
    "bengaliMeaning": "সহজাত / স্বভাবজাত / জন্মগত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Inborn, inherent, natural, instinctive",
    "antonyms": "Acquired, learned, extrinsic, artificial",
    "englishMeaning": "Inborn; natural; present from birth rather than acquired.",
    "exampleSentence": "True learning must nurture a child's innate curiosity and creativity.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 20. Ideally (vocab-u1-l1-20)
  {
    "id": "vocab-u1-l1-20",
    "word": "Ideally",
    "bengaliMeaning": "আদর্শভাবে / নিখুঁতভাবে / সর্বোত্তমভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Perfectly, flawlessly, optimally, impeccably",
    "antonyms": "Imperfectly, poorly, defectively",
    "englishMeaning": "In the best possible way; perfectly.",
    "exampleSentence": "Ideally, schools should provide an open and joyful learning environment.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 21. Lurk (vocab-u1-l1-21)
  {
    "id": "vocab-u1-l1-21",
    "word": "Lurk",
    "bengaliMeaning": "ওত পেতে থাকা / লুকিয়ে থাকা / গোপনে থাকা",
    "partsOfSpeech": "Verb",
    "synonyms": "Skulk, sneak, hide, prowl",
    "antonyms": "Emerge, appear, show",
    "englishMeaning": "To remain hidden so as to wait in ambush or go unnoticed.",
    "exampleSentence": "Detractors lurking in dark corners whispered rumors about the bird's suffering.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 22. Merrily (vocab-u1-l1-22)
  {
    "id": "vocab-u1-l1-22",
    "word": "Merrily",
    "bengaliMeaning": "আনন্দের সাথে / হাসিখুশিভাবে / উল্লাসভরে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Joyfully, cheerfully, happily, gleefully",
    "antonyms": "Sadly, sorrowfully, gloomily, unhappily",
    "englishMeaning": "In a cheerful and joyous manner.",
    "exampleSentence": "The free forest birds sang merrily among the green tree tops.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 23. Maintenance (vocab-u1-l1-23)
  {
    "id": "vocab-u1-l1-23",
    "word": "Maintenance",
    "bengaliMeaning": "রক্ষণাবেক্ষণ / সংস্কার / দেখাশোনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Upkeep, preservation, conservation, sustenance",
    "antonyms": "Neglect, destruction, abandonment, disregard",
    "englishMeaning": "The process of preserving a condition or keeping something in good repair.",
    "exampleSentence": "Enormous sums of money were allocated for the maintenance of the golden cage.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },

  // 24. Mount (vocab-u1-l1-24)
  {
    "id": "vocab-u1-l1-24",
    "word": "Mount",
    "bengaliMeaning": "আরোহণ করা / চড়া / ওঠা",
    "partsOfSpeech": "Verb",
    "synonyms": "Ascend, climb, ride, scale",
    "antonyms": "Dismount, descend, drop, step down",
    "englishMeaning": "To climb up on or get on top of something, such as a horse or platform.",
    "exampleSentence": "The royal inspector mounted his grand elephant to inspect the parrot's school.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 25. Negligible (vocab-u1-l1-25)
  {
    "id": "vocab-u1-l1-25",
    "word": "Negligible",
    "bengaliMeaning": "নগণ্য / তুচ্ছ / উপেক্ষণীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Insignificant, trivial, minor, slight, petty",
    "antonyms": "Significant, substantial, important, remarkable",
    "englishMeaning": "So small or unimportant as to be not worth considering.",
    "exampleSentence": "The educators regarded the bird's actual physical health as completely negligible.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 26. Ponder (vocab-u1-l1-26)
  {
    "id": "vocab-u1-l1-26",
    "word": "Ponder",
    "bengaliMeaning": "গভীরভাবে চিন্তা করা / ভাবা / অনুধ্যান করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Contemplate, consider, deliberate, meditate, reflect",
    "antonyms": "Ignore, disregard, dismiss, overlook",
    "englishMeaning": "To think about something carefully, especially before making a decision.",
    "exampleSentence": "The king sat to ponder the reports submitted by the cage guardians.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 27. Personnel (vocab-u1-l1-27)
  {
    "id": "vocab-u1-l1-27",
    "word": "Personnel",
    "bengaliMeaning": "কর্মীবৃন্দ / কর্মকর্তা-কর্মচারী / কর্মী",
    "partsOfSpeech": "Noun",
    "synonyms": "Staff, workforce, employees, manpower",
    "antonyms": "",
    "englishMeaning": "People employed in an organization or engaged on an official undertaking.",
    "exampleSentence": "Scores of royal personnel were hired just to polish the golden cage bars.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Barishal Board Model"
  },

  // 28. Pace (vocab-u1-l1-28)
  {
    "id": "vocab-u1-l1-28",
    "word": "Pace",
    "bengaliMeaning": "গতি / চলার গতি / বেগ",
    "partsOfSpeech": "Noun",
    "synonyms": "Speed, tempo, rate, velocity, swiftness",
    "antonyms": "Sluggishness, slowness, standstill",
    "englishMeaning": "Speed in walking, running, or movement; rate of progress.",
    "exampleSentence": "The scribes worked at a furious pace to produce endless copies of the text.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 29. Percussion (vocab-u1-l1-29)
  {
    "id": "vocab-u1-l1-29",
    "word": "Percussion",
    "bengaliMeaning": "ঘাতবাদ্য / বাদ্যযন্ত্রের আঘাতধ্বনি",
    "partsOfSpeech": "Noun",
    "synonyms": "Drumming, beat, percussion instrument",
    "antonyms": "",
    "englishMeaning": "Musical instruments played by striking with the hand or a beater.",
    "exampleSentence": "Loud percussion drums were sounded to announce the parrot's grand education.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 30. Polish (vocab-u1-l1-30)
  {
    "id": "vocab-u1-l1-30",
    "word": "Polish",
    "bengaliMeaning": "উজ্জ্বল করা / চকচকে করা / ঘষে মাজা",
    "partsOfSpeech": "Verb",
    "synonyms": "Burnish, shine, buff, brighten, rub",
    "antonyms": "Tarnish, dull, blemish, dirty",
    "englishMeaning": "To make the surface of something smooth and shiny by rubbing.",
    "exampleSentence": "The workers spent all day using powder to polish the bird's magnificent cage.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 31. Reprehensible (vocab-u1-l1-31)
  {
    "id": "vocab-u1-l1-31",
    "word": "Reprehensible",
    "bengaliMeaning": "নিন্দনীয় / তিরস্কারযোগ্য / গর্হিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Blameworthy, deplorable, disgraceful, shameful",
    "antonyms": "Praiseworthy, commendable, blameless, impeccable",
    "englishMeaning": "Deserving censure or condemnation; blameworthy.",
    "exampleSentence": "Forcing manuscripts down a living creature's throat was a reprehensible act.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 32. Scripture (vocab-u1-l1-32)
  {
    "id": "vocab-u1-l1-32",
    "word": "Scripture",
    "bengaliMeaning": "ধর্মগ্রন্থ / ধর্মীয় শাস্ত্র",
    "partsOfSpeech": "Noun",
    "synonyms": "Sacred text, holy book, holy scripture, canon",
    "antonyms": "",
    "englishMeaning": "The sacred writings or treatises of a religion or philosophical system.",
    "exampleSentence": "Leaves torn from thick scripture texts were shoved into the parrot's mouth.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 33. Summon (vocab-u1-l1-33)
  {
    "id": "vocab-u1-l1-33",
    "word": "Summon",
    "bengaliMeaning": "তলব করা / ডেকে পাঠানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Call, convene, cite, assemble",
    "antonyms": "Dismiss, send away, discharge, ignore",
    "englishMeaning": "To authoritatively or urgently call on someone to be present.",
    "exampleSentence": "The king decided to summon the nephews to answer the complaints of critics.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },

  // 34. Startled (vocab-u1-l1-34)
  {
    "id": "vocab-u1-l1-34",
    "word": "Startled",
    "bengaliMeaning": "চমকিত / আঁতকে ওঠা / শঙ্কিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Shocked, alarmed, surprised, astonished",
    "antonyms": "Calm, undisturbed, composed, assured",
    "englishMeaning": "Feeling sudden shock or alarm caused by an unexpected occurrence.",
    "exampleSentence": "The courtiers were startled when the nephew claimed the bird had no complaints.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 35. Slander (vocab-u1-l1-35)
  {
    "id": "vocab-u1-l1-35",
    "word": "Slander",
    "bengaliMeaning": "কুৎসা রটানো / মিথ্যা অপবাদ দেওয়া / পরনিন্দা করা",
    "partsOfSpeech": "Verb / Noun",
    "synonyms": "Defame, vilify, malign, disparage, smear",
    "antonyms": "Praise, applaud, commend, laud",
    "englishMeaning": "To make false and damaging spoken statements about someone.",
    "exampleSentence": "The nephews claimed that the envious detractors were spreading pure slander.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 36. Screech (vocab-u1-l1-36)
  {
    "id": "vocab-u1-l1-36",
    "word": "Screech",
    "bengaliMeaning": "কর্কশ চিৎকার করা / তীক্ষ্ণ চিৎকার দেওয়া",
    "partsOfSpeech": "Verb / Noun",
    "synonyms": "Shriek, squawk, scream, squeal",
    "antonyms": "Whisper, murmur, hush",
    "englishMeaning": "To make a loud, harsh, piercing cry or sound.",
    "exampleSentence": "The starving parrot could only let out a faint screech when prodded.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 37. Sigh (vocab-u1-l1-37)
  {
    "id": "vocab-u1-l1-37",
    "word": "Sigh",
    "bengaliMeaning": "দীর্ঘশ্বাস ফেলা / হা-হুতাশ করা",
    "partsOfSpeech": "Verb / Noun",
    "synonyms": "Gasp, groan, moan, breathe out",
    "antonyms": "Rejoice, cheer, laugh",
    "englishMeaning": "To emit a long, deep, audible breath expressing sadness or exhaustion.",
    "exampleSentence": "The dying bird let out a final weak sigh inside its magnificent prison.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Barishal Board Model"
  },

  // 38. Satire (vocab-u1-l1-38)
  {
    "id": "vocab-u1-l1-38",
    "word": "Satire",
    "bengaliMeaning": "ব্যঙ্গরচনা / বিদ্রূপাত্মক সাহিত্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Parody, lampoon, sarcasm, irony, mockery",
    "antonyms": "Praise, tribute, eulogy, panegyric",
    "englishMeaning": "The use of humor, irony, or exaggeration to expose human folly and vices.",
    "exampleSentence": "The Parrot's Tale is a world-famous political and pedagogical satire by Tagore.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 39. Twig (vocab-u1-l1-39)
  {
    "id": "vocab-u1-l1-39",
    "word": "Twig",
    "bengaliMeaning": "গাছের ছোট ডাল / কচি ডাল / পল্লব",
    "partsOfSpeech": "Noun",
    "synonyms": "Sprig, branchlet, shoot, stick",
    "antonyms": "",
    "englishMeaning": "A slender, woody shoot growing from a branch or stem of a tree.",
    "exampleSentence": "The forest bird once happily built its nest on a green leafy twig.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 40. Tear (vocab-u1-l1-40)
  {
    "id": "vocab-u1-l1-40",
    "word": "Tear",
    "bengaliMeaning": "ছিঁড়ে ফেলা / টুকরো করা / ফালাফালা করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Rip, shred, split, sever",
    "antonyms": "Mend, join, repair, stitch",
    "englishMeaning": "To pull or rip something apart or into pieces with force.",
    "exampleSentence": "The pundits would tear page after page of manuscripts into tiny bits for the bird.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 41. Thrust (vocab-u1-l1-41)
  {
    "id": "vocab-u1-l1-41",
    "word": "Thrust",
    "bengaliMeaning": "জোরপূর্বক ঢোকানো / ঠেলা দেওয়া / ধাক্কা দেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Shove, push, force, drive, plunge",
    "antonyms": "Withdraw, extract, pull back, retract",
    "englishMeaning": "To push someone or something suddenly or violently in a specified direction.",
    "exampleSentence": "Handfuls of torn manuscript pages were thrust directly into the bird's beak.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 42. Thunderous (vocab-u1-l1-42)
  {
    "id": "vocab-u1-l1-42",
    "word": "Thunderous",
    "bengaliMeaning": "বজ্রনিনাদপূর্ণ / প্রচণ্ড শব্দময় / বজ্রসম গর্জনপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Booming, deafening, roaring, thundering",
    "antonyms": "Quiet, silent, muted, subdued",
    "englishMeaning": "Making a very loud and deep noise like thunder.",
    "exampleSentence": "Thunderous applause filled the auditorium when the royal education was praised.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 43. Unlettered (vocab-u1-l1-43)
  {
    "id": "vocab-u1-l1-43",
    "word": "Unlettered",
    "bengaliMeaning": "নিরক্ষর / অশিক্ষিত / বিদ্যাবুদ্ধিহীন",
    "partsOfSpeech": "Adjective",
    "synonyms": "Illiterate, uneducated, unlearned, ignorant",
    "antonyms": "Literate, educated, learned, scholarly",
    "englishMeaning": "Not educated; illiterate; unable to read or write.",
    "exampleSentence": "The king declared that the unlettered forest bird must be formally civilized.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },

  // 44. Veritable (vocab-u1-l1-44)
  {
    "id": "vocab-u1-l1-44",
    "word": "Veritable",
    "bengaliMeaning": "প্রকৃত / যথার্থ / খাঁটি / সত্যিকার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Authentic, genuine, real, actual",
    "antonyms": "Fake, false, counterfeit, spurious",
    "englishMeaning": "Being truly or very much so; real, genuine, and authentic.",
    "exampleSentence": "The bird's cage became a veritable spectacle for spectators from across the empire.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 45. Vice (vocab-u1-l1-45)
  {
    "id": "vocab-u1-l1-45",
    "word": "Vice",
    "bengaliMeaning": "পাপ / অনাচার / অনৈতিকতা / অসদাচরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Sin, immorality, wickedness, wrongdoing",
    "antonyms": "Virtue, goodness, righteousness, morality",
    "englishMeaning": "Immoral or wicked behavior; a bad habit or moral weakness.",
    "exampleSentence": "Greed and sycophancy were the underlying vices of the royal courtiers.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 46. Workmanship (vocab-u1-l1-46)
  {
    "id": "vocab-u1-l1-46",
    "word": "Workmanship",
    "bengaliMeaning": "কারিগরি দক্ষতা / নির্মাণকৌশল / শিল্পনৈপুণ্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Craftsmanship, artisanship, artistry, expertise",
    "antonyms": "Incompetence, clumsiness, crude work",
    "englishMeaning": "The degree of skill with which a product is made or a job done.",
    "exampleSentence": "The gold cage was praised for its unmatched workmanship and flawless finish.",
    "unit": "Unit 1: Lesson 1 (The Parrot's Tale)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 47. Etiquette (vocab-24)
  {
    "id": "vocab-24",
    "word": "Etiquette",
    "bengaliMeaning": "শিষ্টাচার / সামাজিক আদব-কায়দা / আচরণবিধি",
    "partsOfSpeech": "Noun",
    "synonyms": "Protocol, manners, decorum, propriety, politeness",
    "antonyms": "Impoliteness, rudeness, indecency, discourtesy",
    "englishMeaning": "The customary code of polite behavior in society or among members of a particular profession or group.",
    "exampleSentence": "Understanding table etiquette is essential when attending formal dinners in different countries.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam, Unit 10"
  },

  // 48. Manners (vocab-25)
  {
    "id": "vocab-25",
    "word": "Manners",
    "bengaliMeaning": "ভদ্রতা / আদব-কায়দা / সদাচার",
    "partsOfSpeech": "Noun",
    "synonyms": "Courtesy, politeness, civility, etiquette, respect",
    "antonyms": "Rudeness, discourtesy, bad manners, impoliteness",
    "englishMeaning": "Polite ways of behaving toward others with social respect and consideration.",
    "exampleSentence": "Good manners demand that you shake hands softly in China so as not to appear aggressive.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper, Unit 10"
  },

  // 49. Graceful (vocab-26)
  {
    "id": "vocab-26",
    "word": "Graceful",
    "bengaliMeaning": "মার্জিত / লাবণ্যময় / শোভন / সুরুচিপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Elegant, refined, dignified, tasteful, polite",
    "antonyms": "Clumsy, awkward, ungainly, crude, rude",
    "englishMeaning": "Characterized by elegance, good taste, refinement, and polite movement.",
    "exampleSentence": "Be graceful and polite when taking food with chopsticks in Chinese dining culture.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dhaka Board Standard, Unit 10"
  },

  // 50. Aggression (vocab-27)
  {
    "id": "vocab-27",
    "word": "Aggression",
    "bengaliMeaning": "আগ্রাসন / আক্রমণাত্মক মনোভাব / শত্রুভাবাপন্নতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Hostility, belligerence, combativeness, antagonism",
    "antonyms": "Friendliness, gentleness, peacefulness, passivity",
    "englishMeaning": "Feelings of anger or antipathy resulting in hostile or violent behavior.",
    "exampleSentence": "In China, a firm handshake could be interpreted as a sign of aggression.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 51. Chopsticks (vocab-28)
  {
    "id": "vocab-28",
    "word": "Chopsticks",
    "bengaliMeaning": "খাবার খাওয়ার কাঠি / চপস্টিক",
    "partsOfSpeech": "Noun",
    "synonyms": "Eating sticks",
    "antonyms": "",
    "englishMeaning": "A pair of small, thin sticks used especially in East Asia for eating food.",
    "exampleSentence": "Don't play with chopsticks or point at anyone with them while dining in China.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Textbook Vocab, Unit 10"
  },

  // 52. Norm (vocab-29)
  {
    "id": "vocab-29",
    "word": "Norm",
    "bengaliMeaning": "সামাজিক রীতি / প্রচলিত প্রথা / আদর্শ মাপকাঠি",
    "partsOfSpeech": "Noun",
    "synonyms": "Standard, convention, custom, rule, tradition",
    "antonyms": "Anomaly, exception, irregularity, deviation",
    "englishMeaning": "A standard or pattern, especially of social behavior, that is typical or expected of a group.",
    "exampleSentence": "Politely refusing a gift before accepting it is the cultural norm in China.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 53. Discouraged (vocab-30)
  {
    "id": "vocab-30",
    "word": "Discouraged",
    "bengaliMeaning": "নিরুৎসাহিত / হতোদ্যম / মনোবল হারানো",
    "partsOfSpeech": "Adjective",
    "synonyms": "Disheartened, Demoralized, Despondent, Depressed",
    "antonyms": "Encouraged, Motivated, Inspired, Hopeful",
    "englishMeaning": "Having lost confidence or enthusiasm; disheartened.",
    "exampleSentence": "Foreign visitors shouldn't feel discouraged when trying to learn complex cultural etiquette.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 54. Symbolise (vocab-31)
  {
    "id": "vocab-31",
    "word": "Symbolise",
    "bengaliMeaning": "প্রতীক হিসেবে প্রকাশ করা / তাৎপর্য বহন করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Represent, Signify, Stand for, Typify, Embody",
    "antonyms": "Misrepresent, Conceal, Obscure",
    "englishMeaning": "To represent or identify by means of a symbol or emblem.",
    "exampleSentence": "In many cultures, sharing bread is used to symbolise friendship and unity.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 55. Senior (vocab-32)
  {
    "id": "vocab-32",
    "word": "Senior",
    "bengaliMeaning": "বয়োজ্যেষ্ঠ / ঊর্ধ্বতন / প্রবীণ ব্যক্তি",
    "partsOfSpeech": "Noun / Adjective",
    "synonyms": "Elder, Older, Superior, Higher-ranking",
    "antonyms": "Junior, Subordinate, Youth, Minor",
    "englishMeaning": "A person who is older or has a higher rank or standing than another.",
    "exampleSentence": "In China, it is customary to greet the most senior person first.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Barishal Board Model"
  },

  // 56. Casual (vocab-33)
  {
    "id": "vocab-33",
    "word": "Casual",
    "bengaliMeaning": "অনানুষ্ঠানিক / সাদামাটা / সাধারণ পোশাক বা আচরণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Informal, Relaxed, Nonchalant, Easygoing, Everyday",
    "antonyms": "Formal, Ceremonious, Strict, Stiff",
    "englishMeaning": "Relaxed and unconcerned; not formal.",
    "exampleSentence": "Casual clothing is fine for everyday outings, but formal dinners demand etiquette.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 57. Hostess (vocab-34)
  {
    "id": "vocab-34",
    "word": "Hostess",
    "bengaliMeaning": "গৃহকর্ত্রী / মেজবান নারী / নিমন্ত্রণকর্ত্রী",
    "partsOfSpeech": "Noun",
    "synonyms": "Hostess, Welcomer, Entertainer, Lady host",
    "antonyms": "Guest, Visitor, Invitee",
    "englishMeaning": "A woman who receives or entertains guests socially or commercially.",
    "exampleSentence": "It is customary to thank the hostess warmly for preparing a wonderful meal.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 58. Preparation (vocab-35)
  {
    "id": "vocab-35",
    "word": "Preparation",
    "bengaliMeaning": "প্রস্তুতি / আয়োজন / প্রস্তুতকরণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Arrangement, Readiness, Planning, Organization",
    "antonyms": "Unpreparedness, Neglect, Disorganization, Improvisation",
    "englishMeaning": "The action or process of making ready or being made ready for use or consideration.",
    "exampleSentence": "Hours of careful preparation went into creating the magnificent feast for royal guests.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 59. Gradually (vocab-36)
  {
    "id": "vocab-36",
    "word": "Gradually",
    "bengaliMeaning": "ধীরে ধীরে / পর্যায়ক্রমে / ক্রমান্বয়ে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Slowly, Steadily, Step by step, Progressively, Incrementally",
    "antonyms": "Suddenly, Abruptly, Rapidly, Instantly",
    "englishMeaning": "In a gradual way; slowly; by degrees.",
    "exampleSentence": "Gradually, foreign travelers learn to appreciate local table traditions.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 60. Foreigners (vocab-37)
  {
    "id": "vocab-37",
    "word": "Foreigners",
    "bengaliMeaning": "বিদেশি / ভিন্ন দেশ বা সংস্কৃতির নাগরিক",
    "partsOfSpeech": "Noun",
    "synonyms": "Aliens, Strangers, Outsiders, Immigrants",
    "antonyms": "Natives, Citizens, Locals, Inhabitants",
    "englishMeaning": "Persons born in or coming from another country.",
    "exampleSentence": "Foreigners should study local customs before visiting traditional households.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 61. Merely (vocab-38)
  {
    "id": "vocab-38",
    "word": "Merely",
    "bengaliMeaning": "কেবল / শুধুমাত্র / নিতান্তই",
    "partsOfSpeech": "Adverb",
    "synonyms": "Only, Simply, Just, Purely, Solely",
    "antonyms": "Completely, Entirely, Fully, Substantially",
    "englishMeaning": "Just; only; no more than.",
    "exampleSentence": "Politeness is not merely a formality; it is a sign of deep human respect.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 62. Extend (vocab-39)
  {
    "id": "vocab-39",
    "word": "Extend",
    "bengaliMeaning": "প্রসারিত করা / বাড়িয়ে দেওয়া / বিস্তার করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Stretch out, Reach out, Offer, Proffer, Prolong",
    "antonyms": "Withdraw, Retract, Shorten, Pull back",
    "englishMeaning": "To hold out something toward someone; offer.",
    "exampleSentence": "Always extend your right hand when offering a greeting or receiving a gift in Arab culture.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 63. Leisurely (vocab-40)
  {
    "id": "vocab-40",
    "word": "Leisurely",
    "bengaliMeaning": "ধীরস্থির / আয়েশি / শান্ত ও নিরুদ্বেগ",
    "partsOfSpeech": "Adjective / Adverb",
    "synonyms": "Unhurried, Relaxed, Easygoing, Casual, Slow-paced",
    "antonyms": "Hurried, Rushed, Hasty, Fast-paced",
    "englishMeaning": "Acting or done at leisure; unhurried or relaxed.",
    "exampleSentence": "South African greetings are leisurely and filled with warm conversation.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 64. Customary (vocab-41)
  {
    "id": "vocab-41",
    "word": "Customary",
    "bengaliMeaning": "প্রথাগত / ঐতিহ্যবাহী / প্রচলিত রীতিনীতি অনুযায়ী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Traditional, Usual, Conventional, Habitual, Routine",
    "antonyms": "Unusual, Unconventional, Rare, Strange",
    "englishMeaning": "According to the customs or usual practices associated with a particular society.",
    "exampleSentence": "It is customary in Britain to write a thank-you note to the host after a formal dinner.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Barishal Board Model"
  },

  // 65. Informal (vocab-42)
  {
    "id": "vocab-42",
    "word": "Informal",
    "bengaliMeaning": "ঘরোয়া / অনানুষ্ঠানিক / সাদামাটা পরিবেশ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Casual, Relaxed, Unofficial, Familiar, Easy",
    "antonyms": "Formal, Official, Ceremonial, Rigid",
    "englishMeaning": "Having a relaxed, friendly, or unofficial style, manner, or nature.",
    "exampleSentence": "An informal dinner with close friends doesn't require strict seating arrangements.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 66. Gratitude (vocab-43)
  {
    "id": "vocab-43",
    "word": "Gratitude",
    "bengaliMeaning": "কৃতজ্ঞতা / ধন্যবাদবোধ / উপকারের স্বীকৃতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Thankfulness, Appreciation, Gratefulness, Recognition",
    "antonyms": "Ingratitude, Unthankfulness, Indifference",
    "englishMeaning": "The quality of being thankful; readiness to show appreciation and return kindness.",
    "exampleSentence": "Expressing gratitude to your hosts is an essential element of good manners.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 67. Gesture (vocab-44)
  {
    "id": "vocab-44",
    "word": "Gesture",
    "bengaliMeaning": "অঙ্গভঙ্গি / মনোভাব প্রকাশের শারীরিক বা আচরণিক ভঙ্গি",
    "partsOfSpeech": "Noun",
    "synonyms": "Signal, Sign, Action, Motion, Movement",
    "antonyms": "Inaction, Immobility, Speechlessness",
    "englishMeaning": "A movement of part of the body, especially a hand or the head, to express an idea or meaning.",
    "exampleSentence": "In South Africa, a warm wave and smile is a common greeting gesture.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 68. Mutual (vocab-45)
  {
    "id": "vocab-45",
    "word": "Mutual",
    "bengaliMeaning": "পারস্পরিক / উভয়ের মধ্যে বিদ্যমান",
    "partsOfSpeech": "Adjective",
    "synonyms": "Reciprocal, Shared, Joint, Common, Bilateral",
    "antonyms": "One-sided, Unilateral, Individual, Single",
    "englishMeaning": "Held in common by two or more parties; shared.",
    "exampleSentence": "Mutual respect is the foundation of harmonious cross-cultural interactions.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 69. Forbidden (vocab-46)
  {
    "id": "vocab-46",
    "word": "Forbidden",
    "bengaliMeaning": "সম্পূর্ণ নিষিদ্ধ / অননুমোদিত / বর্জনীয়",
    "partsOfSpeech": "Adjective",
    "synonyms": "Prohibited, Banned, Disallowed, Barred, Taboo",
    "antonyms": "Allowed, Permitted, Lawful, Authorized",
    "englishMeaning": "Not allowed; banned.",
    "exampleSentence": "Public kissing is strictly forbidden in conservative Middle Eastern societies.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 70. Utensils (vocab-47)
  {
    "id": "vocab-47",
    "word": "Utensils",
    "bengaliMeaning": "তৈজসপত্র / খাবার তৈরি ও খাওয়ার সরঞ্জাম বা পাত্র",
    "partsOfSpeech": "Noun",
    "synonyms": "Cutlery, Implements, Tools, Tableware, Appliances",
    "antonyms": "",
    "englishMeaning": "Implements, containers, or other articles, especially for household or dining use.",
    "exampleSentence": "In traditional Middle Eastern dining, people often eat with their right hand using hardly any utensils.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam Model"
  },

  // 71. Receipt (vocab-48)
  {
    "id": "vocab-48",
    "word": "Receipt",
    "bengaliMeaning": "প্রাপ্তি / কোনো কিছু পাওয়ার মুহূর্ত",
    "partsOfSpeech": "Noun",
    "synonyms": "Receiving, Reception, Acceptance, Acquisition",
    "antonyms": "Dispatch, Sending, Delivery, Issuance",
    "englishMeaning": "The action of receiving something or the fact of its being received.",
    "exampleSentence": "Upon receipt of a gift in China, express sincere thanks even if you initially hesitated.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 72. Apathy (vocab-u10-l2-01)
  {
    "id": "vocab-u10-l2-01",
    "word": "Apathy",
    "bengaliMeaning": "অনীহা / উদাসীনতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Indifference, unconcern, disinterest, detachment",
    "antonyms": "Enthusiasm, passion, zeal, eagerness",
    "englishMeaning": "Lack of interest, enthusiasm, or concern for others.",
    "exampleSentence": "The selfish man was relieved of his apathy toward people's polite behavior.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dhaka Board Standard"
  },

  // 73. Blow (vocab-u10-l2-02)
  {
    "id": "vocab-u10-l2-02",
    "word": "Blow",
    "bengaliMeaning": "বাজানো / ভেঁপু বাজানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Honk, sound, blast, blare, toot",
    "antonyms": "Mute, silence, quiet",
    "englishMeaning": "To sound a horn, whistle, or instrument loudly.",
    "exampleSentence": "Do not blow the car horn unnecessarily in quiet residential neighborhoods.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 74. Caution (vocab-u10-l2-03)
  {
    "id": "vocab-u10-l2-03",
    "word": "Caution",
    "bengaliMeaning": "সতর্কতা / সাবধানতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Alertness, carefulness, prudence, vigilance",
    "antonyms": "Carelessness, negligence, recklessness, rashness",
    "englishMeaning": "Care taken to avoid danger or mistakes.",
    "exampleSentence": "The girls approached the mysterious machine with extreme caution.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 75. Choosy (vocab-u10-l2-04)
  {
    "id": "vocab-u10-l2-04",
    "word": "Choosy",
    "bengaliMeaning": "খুঁতখুঁতে / বাছাবাছিকারী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Picky, selective, fastidious, particular",
    "antonyms": "Indifferent, uncritical, easy-going, undemanding",
    "englishMeaning": "Having very specific requirements; hard to please.",
    "exampleSentence": "Being overly choosy about food when invited out can appear rude to your host.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Barishal Board Model"
  },

  // 76. Count (vocab-u10-l2-05)
  {
    "id": "vocab-u10-l2-05",
    "word": "Count",
    "bengaliMeaning": "বিবেচনা করা / হিসেবে ধরা",
    "partsOfSpeech": "Verb",
    "synonyms": "Include, consider, regard, reckon",
    "antonyms": "Exclude, disregard, ignore, overlook",
    "englishMeaning": "To take into account; consider or include.",
    "exampleSentence": "Small acts of politeness count heavily in building strong community bonds.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 77. Courteous (vocab-u10-l2-06)
  {
    "id": "vocab-u10-l2-06",
    "word": "Courteous",
    "bengaliMeaning": "বিনয়ী / ভদ্র / সদাচারী",
    "partsOfSpeech": "Adjective",
    "synonyms": "Polite, well-behaved, respectful, gracious, civil",
    "antonyms": "Impolite, disrespectful, rude, discourteous",
    "englishMeaning": "Polite, respectful, and considerate in manner.",
    "exampleSentence": "Always remain courteous even when expressing disagreement online or in person.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 78. Creep (vocab-u10-l2-07)
  {
    "id": "vocab-u10-l2-07",
    "word": "Creep",
    "bengaliMeaning": "গুঁড়ি মেরে চলা / চুপিচুপি যাওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Crawl, slither, sneak, tiptoe, glide",
    "antonyms": "Run, hustle, march, sprint",
    "englishMeaning": "To move slowly and carefully in order to avoid being heard or noticed.",
    "exampleSentence": "The girls tried to creep softly toward the laboratory without alerting the guard.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 79. Enormous (vocab-u10-l2-08)
  {
    "id": "vocab-u10-l2-08",
    "word": "Enormous",
    "bengaliMeaning": "প্রকাণ্ড / বিশালাকার / দানবাকৃতি",
    "partsOfSpeech": "Adjective",
    "synonyms": "Huge, massive, gigantic, colossal, immense",
    "antonyms": "Small, tiny, minute, miniature",
    "englishMeaning": "Very large in size, quantity, or extent.",
    "exampleSentence": "The scientist constructed an enormous machine inside the hilltop cave.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 80. Explode (vocab-u10-l2-09)
  {
    "id": "vocab-u10-l2-09",
    "word": "Explode",
    "bengaliMeaning": "বিস্ফোরিত হওয়া / ফেটে যাওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Blow up, burst, detonate, shatter, erupt",
    "antonyms": "Implode, stabilize, remain intact",
    "englishMeaning": "To burst or shatter violently and noisily.",
    "exampleSentence": "When overloaded with polite energy, the evil contraption exploded into dust.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 81. Expression (vocab-u10-l2-10)
  {
    "id": "vocab-u10-l2-10",
    "word": "Expression",
    "bengaliMeaning": "শব্দ / অভিব্যক্তি / প্রকাশভঙ্গি",
    "partsOfSpeech": "Noun",
    "synonyms": "Utterance, phrase, remark, statement, idiom",
    "antonyms": "Silence, inexpression, speechlessness",
    "englishMeaning": "A word or phrase used to express an idea or polite feeling.",
    "exampleSentence": "Phrases like 'please' and 'thank you' are vital expressions of social respect.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 82. Extravagant (vocab-u10-l2-11)
  {
    "id": "vocab-u10-l2-11",
    "word": "Extravagant",
    "bengaliMeaning": "অতিরিক্ত / অপব্যয়ী / বাড়াবাড়ি",
    "partsOfSpeech": "Adjective",
    "synonyms": "Wasteful, excessive, immoderate, lavish",
    "antonyms": "Reasonable, moderate, frugal, economical",
    "englishMeaning": "Lacking restraint in spending money or using resources; excessive.",
    "exampleSentence": "There is no need for extravagant gifts when a heartfelt thank-you card suffices.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 83. Eye contact (vocab-u10-l2-12)
  {
    "id": "vocab-u10-l2-12",
    "word": "Eye contact",
    "bengaliMeaning": "চোখাচোখি / দৃষ্টিবিনিময়",
    "partsOfSpeech": "Noun phrase",
    "synonyms": "Direct gaze, visual connection, eye-to-eye gaze",
    "antonyms": "Averted gaze, gaze avoidance, looking away",
    "englishMeaning": "The state in which two people look directly into each other's eyes.",
    "exampleSentence": "Maintaining warm eye contact during conversations conveys sincerity and confidence.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 84. Free-will agent (vocab-u10-l2-13)
  {
    "id": "vocab-u10-l2-13",
    "word": "Free-will agent",
    "bengaliMeaning": "স্বাধীনভাবে কাজ করার অধিকারপ্রাপ্ত ব্যক্তি",
    "partsOfSpeech": "Noun phrase",
    "synonyms": "Autonomous person, independent agent, self-governing individual",
    "antonyms": "Dependent, puppet, slave, subordinate",
    "englishMeaning": "An individual possessing the freedom and capacity to make their own ethical choices.",
    "exampleSentence": "As a free-will agent, every student is responsible for maintaining good online manners.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Barishal Board Model"
  },

  // 85. Forbid (vocab-u10-l2-14)
  {
    "id": "vocab-u10-l2-14",
    "word": "Forbid",
    "bengaliMeaning": "নিষেধ করা / বারণ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Prohibit, prevent, disallow, ban, bar",
    "antonyms": "Allow, permit, approve, authorize",
    "englishMeaning": "To refuse to allow something; prohibit.",
    "exampleSentence": "Netiquette rules forbid the use of insulting language in public forums.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 86. Gesture (vocab-u10-l2-15)
  {
    "id": "vocab-u10-l2-15",
    "word": "Gesture",
    "bengaliMeaning": "ইশারা বা ইঙ্গিত / শারীরিক অঙ্গভঙ্গি",
    "partsOfSpeech": "Noun",
    "synonyms": "Sign, motion, signal, body language, gesticulation",
    "antonyms": "Speech, vocal utterance, words",
    "englishMeaning": "A movement of part of the body to convey an attitude or polite message.",
    "exampleSentence": "A friendly waving gesture reassured the lost traveler in the foreign city.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 87. Gratefulness (vocab-u10-l2-16)
  {
    "id": "vocab-u10-l2-16",
    "word": "Gratefulness",
    "bengaliMeaning": "কৃতজ্ঞতা / ধন্যবাদ জ্ঞাপন",
    "partsOfSpeech": "Noun",
    "synonyms": "Thankfulness, appreciation, gratitude, acknowledgement",
    "antonyms": "Ingratitude, unthankfulness, thanklessness",
    "englishMeaning": "The feeling or quality of being grateful; appreciation.",
    "exampleSentence": "Expressing gratefulness makes both the giver and the receiver feel appreciated.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 88. Grocery (vocab-u10-l2-17)
  {
    "id": "vocab-u10-l2-17",
    "word": "Grocery",
    "bengaliMeaning": "নিত্যপণ্য দ্রব্য / মুদি মালামাল",
    "partsOfSpeech": "Noun",
    "synonyms": "Commodities, provisions, foodstuff, supplies",
    "antonyms": "",
    "englishMeaning": "Items of food and other essential household goods sold in a store.",
    "exampleSentence": "It is good etiquette to help elderly neighbors carry their heavy grocery bags.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 89. Honk (vocab-u10-l2-18)
  {
    "id": "vocab-u10-l2-18",
    "word": "Honk",
    "bengaliMeaning": "মোটরগাড়ির ভেঁপু বাজানো",
    "partsOfSpeech": "Verb / Noun",
    "synonyms": "Hoot, blow, blare, toot",
    "antonyms": "Silence, quietness, mute",
    "englishMeaning": "To emit or cause a car horn to emit a loud sound.",
    "exampleSentence": "Polite drivers do not honk aggressively at pedestrians in crosswalks.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 90. Invent (vocab-u10-l2-19)
  {
    "id": "vocab-u10-l2-19",
    "word": "Invent",
    "bengaliMeaning": "উদ্ভাবন করা / সৃষ্টি করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Create, devise, formulate, originate, design",
    "antonyms": "Destroy, shatter, demolish, ruin",
    "englishMeaning": "To create or design something that has not existed before.",
    "exampleSentence": "The man took a mission to invent a device that would steal polite words.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 91. Investigation (vocab-u10-l2-20)
  {
    "id": "vocab-u10-l2-20",
    "word": "Investigation",
    "bengaliMeaning": "তদন্ত / অনুসন্ধান / নিরীক্ষা",
    "partsOfSpeech": "Noun",
    "synonyms": "Inquiry, examination, probe, scrutiny, inspection",
    "antonyms": "Neglect, disregard, oversight, ignorance",
    "englishMeaning": "A formal inquiry or systematic search to discover facts and truth.",
    "exampleSentence": "Their clever investigation led the two girls to uncover the secret hilltop laboratory.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 92. Liberty (vocab-u10-l2-21)
  {
    "id": "vocab-u10-l2-21",
    "word": "Liberty",
    "bengaliMeaning": "স্বাধীনতা / স্বাধিকার",
    "partsOfSpeech": "Noun",
    "synonyms": "Freedom, autonomy, independence, emancipation",
    "antonyms": "Captivity, bondage, imprisonment, slavery",
    "englishMeaning": "The state of being free within society from oppressive restrictions.",
    "exampleSentence": "Online liberty comes with the moral responsibility to practice proper netiquette.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 93. Mission (vocab-u10-l2-22)
  {
    "id": "vocab-u10-l2-22",
    "word": "Mission",
    "bengaliMeaning": "বিশেষকার্য / সুনির্দিষ্ট লক্ষ্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Aim, purpose, goal, assignment, objective",
    "antonyms": "Aimlessness, purposelessness",
    "englishMeaning": "An important assignment given to a person or group.",
    "exampleSentence": "The students embarked on a mission to spread kindness across their school.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 94. Portion (vocab-u10-l2-23)
  {
    "id": "vocab-u10-l2-23",
    "word": "Portion",
    "bengaliMeaning": "পরিবেশিত খাবারের অংশ / ভাগ",
    "partsOfSpeech": "Noun",
    "synonyms": "Serving, share, allotment, helping, section",
    "antonyms": "Whole, entirety, totality",
    "englishMeaning": "A part of a whole; an amount of food served for one person.",
    "exampleSentence": "Take a moderate portion of food so that enough remains for other dinner guests.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 95. Rarely (vocab-u10-l2-24)
  {
    "id": "vocab-u10-l2-24",
    "word": "Rarely",
    "bengaliMeaning": "কদাচিৎ / খুব কমই",
    "partsOfSpeech": "Adverb",
    "synonyms": "Infrequently, hardly, seldom, scarcely",
    "antonyms": "Often, frequently, regularly, usually",
    "englishMeaning": "Not often; seldom.",
    "exampleSentence": "Courteous individuals rarely get involved in bitter online arguments.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Barishal Board Model"
  },

  // 96. Relieve (vocab-u10-l2-25)
  {
    "id": "vocab-u10-l2-25",
    "word": "Relieve",
    "bengaliMeaning": "পরিত্রাণ পাওয়া / লাঘব করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Alleviate, ease, soothe, unburden, lighten",
    "antonyms": "Aggravate, worsen, intensify, burden",
    "englishMeaning": "To release from a burdensome duty, pain, or discomfort.",
    "exampleSentence": "Saying 'excuse me' can instantly relieve awkward social tension.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 97. Rewind (vocab-u10-l2-26)
  {
    "id": "vocab-u10-l2-26",
    "word": "Rewind",
    "bengaliMeaning": "উল্টোদিকে চালিয়ে দেওয়া / পেছনের দিকে ঘোরানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Reverse, undo, roll back, turn back, invert",
    "antonyms": "Fast-forward, advance, proceed, accelerate",
    "englishMeaning": "To wind back toward the beginning or reverse an operation.",
    "exampleSentence": "The girls managed to rewind the machine's dial, restoring stolen polite phrases.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 98. Room (vocab-u10-l2-27)
  {
    "id": "vocab-u10-l2-27",
    "word": "Room",
    "bengaliMeaning": "জায়গা, স্থান / পরিসর",
    "partsOfSpeech": "Noun",
    "synonyms": "Space, capacity, clearance, expanse",
    "antonyms": "Crowdedness, congestion, lack of space",
    "englishMeaning": "Space that can be occupied or where something can be done.",
    "exampleSentence": "Make room for elderly and disabled passengers when boarding public transport.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 99. Satisfaction (vocab-u10-l2-28)
  {
    "id": "vocab-u10-l2-28",
    "word": "Satisfaction",
    "bengaliMeaning": "পরিতৃপ্তি / সন্তুষ্টি",
    "partsOfSpeech": "Noun",
    "synonyms": "Contentment, pleasure, fulfillment, gratification",
    "antonyms": "Discontent, dissatisfaction, displeasure, disappointment",
    "englishMeaning": "Fulfillment of one's wishes, expectations, or needs.",
    "exampleSentence": "Helping others with polite sincerity brings immense inner satisfaction.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 100. Scatter (vocab-u10-l2-29)
  {
    "id": "vocab-u10-l2-29",
    "word": "Scatter",
    "bengaliMeaning": "ছড়িয়ে পড়া / চারদিকে ছিটকে যাওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Disperse, spread, strew, disseminate, dissipate",
    "antonyms": "Gather, collect, assemble, cluster",
    "englishMeaning": "To throw in various random directions; disperse widely.",
    "exampleSentence": "When the machine exploded, stolen words began to scatter back to their owners.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },

  // 101. Seldom (vocab-u10-l2-30)
  {
    "id": "vocab-u10-l2-30",
    "word": "Seldom",
    "bengaliMeaning": "কদাচিৎ / কদাচ",
    "partsOfSpeech": "Adverb",
    "synonyms": "Rarely, infrequently, scarcely, hardly ever",
    "antonyms": "Often, frequently, constantly, always",
    "englishMeaning": "Not often; rarely.",
    "exampleSentence": "People who practice good manners seldom find themselves in unnecessary conflicts.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Dinajpur Board Model"
  },

  // 102. Showy (vocab-u10-l2-31)
  {
    "id": "vocab-u10-l2-31",
    "word": "Showy",
    "bengaliMeaning": "চটকদার / প্রদর্শনপ্রবণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Ostentatious, flashy, flamboyant, gaudy",
    "antonyms": "Restrained, modest, subtle, understated",
    "englishMeaning": "Having a striking appearance or style, often excessively ornate.",
    "exampleSentence": "True elegance lies in modesty rather than in wearing showy decorations.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 103. Spirit (vocab-u10-l2-32)
  {
    "id": "vocab-u10-l2-32",
    "word": "Spirit",
    "bengaliMeaning": "উদ্দীপনা / মনোভাব / আমেজ",
    "partsOfSpeech": "Noun",
    "synonyms": "Mood, feelings, attitude, atmosphere, enthusiasm",
    "antonyms": "Apathy, lifelessness, dullness",
    "englishMeaning": "The prevailing tone or tendency of what is said or done; mood.",
    "exampleSentence": "Polite greetings lift the spirit of everyone in the room.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 104. Take a hand (vocab-u10-l2-33)
  {
    "id": "vocab-u10-l2-33",
    "word": "Take a hand",
    "bengaliMeaning": "হস্তক্ষেপ করা / অংশ নেওয়া",
    "partsOfSpeech": "Idiom / Phrase",
    "synonyms": "Participate, step in, intervene, take part, lend a hand",
    "antonyms": "Stay out, withdraw, abstain, hold back",
    "englishMeaning": "To become actively involved or take part in solving a problem.",
    "exampleSentence": "The brave girls decided to take a hand in solving the mystery of the stolen words.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 105. Terribly (vocab-u10-l2-34)
  {
    "id": "vocab-u10-l2-34",
    "word": "Terribly",
    "bengaliMeaning": "অত্যন্ত / ভীষণভাবে / প্রচণ্ডভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Extremely, Exceedingly, Immensely, Very, Awfully",
    "antonyms": "Slightly, Barely, Mildly, Moderately",
    "englishMeaning": "Very much; extremely; to an intense degree.",
    "exampleSentence": "The man was terribly happy with his initial success before the girls intervened.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 106. Toil (vocab-u10-l2-35)
  {
    "id": "vocab-u10-l2-35",
    "word": "Toil",
    "bengaliMeaning": "কঠোর পরিশ্রম / অক্লান্ত খাটুনি",
    "partsOfSpeech": "Noun / Verb",
    "synonyms": "Labour, Hard work, Exertion, Drudgery, Struggle",
    "antonyms": "Idleness, Leisure, Laziness, Rest, Relaxation",
    "englishMeaning": "Extremely hard, exhausting, and continuous physical or mental effort.",
    "exampleSentence": "After much toil, the girls discovered where the wicked man was hiding.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "Sylhet Board Standard"
  },

  // 107. Trouble (vocab-u10-l2-36)
  {
    "id": "vocab-u10-l2-36",
    "word": "Trouble",
    "bengaliMeaning": "কষ্ট দেওয়া / বিরক্ত করা / উদ্বিগ্ন করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Bother, Disturb, Annoy, Afflict, Distress",
    "antonyms": "Comfort, Soothe, Calm, Assist, Reassure",
    "englishMeaning": "To cause distress, discomfort, pain, or inconvenience to someone.",
    "exampleSentence": "It troubled the man a lot when he saw smiling people using polite expressions.",
    "unit": "Unit 10: Lesson 2 (Etiquette Netquette)",
    "boardExamTag": "HSC Board Exam 2026"
  },

  // 108. Initially (vocab-74)
  {
    "id": "vocab-74",
    "word": "Initially",
    "bengaliMeaning": "শুরুতে / প্রাথমিকভাবে / প্রারম্ভে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Originally, At first, In the beginning, Primarily, Early on",
    "antonyms": "Finally, Ultimately, Eventually, Lastly, In the end",
    "englishMeaning": "At first; at the beginning or initial stage of an event.",
    "exampleSentence": "In China, a gift is initially refused out of courtesy before it is gratefully accepted.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam, Unit 10"
  },

  // 109. Greet (vocab-75)
  {
    "id": "vocab-75",
    "word": "Greet",
    "bengaliMeaning": "অভিবাদন জানানো / সম্ভাষণ করা / স্বাগত জানানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Welcome, Salute, Hail, Address, Acknowledge",
    "antonyms": "Ignore, Overlook, Snub, Avoid, Dismiss",
    "englishMeaning": "To give a polite word or sign of welcome or recognition upon meeting someone.",
    "exampleSentence": "In Chinese cultural tradition, you should greet the oldest or most senior person first.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 110. Cheek (vocab-76)
  {
    "id": "vocab-76",
    "word": "Cheek",
    "bengaliMeaning": "গাল / কপোল",
    "partsOfSpeech": "Noun",
    "synonyms": "Side of face, Jowl",
    "antonyms": "",
    "englishMeaning": "Either side of the face below the eye and above the jaw.",
    "exampleSentence": "Kissing on the cheek in greeting is common in Britain but strictly forbidden in public in the Middle East.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "NCTB Textbook Vocab, Unit 10"
  },

  // 111. Approach (vocab-u10-01)
  {
    "id": "vocab-u10-01",
    "word": "Approach",
    "bengaliMeaning": "দৃষ্টিভঙ্গি / কর্মপদ্ধতি / আগমন",
    "partsOfSpeech": "Noun",
    "synonyms": "Attitude, Method, Manner, Strategy, Advance",
    "antonyms": "Departure, Retreat, Withdrawal, Avoidance",
    "englishMeaning": "A way of dealing with situations or coming nearer to someone.",
    "exampleSentence": "A polite and humble approach helps foreigners adapt to different international customs.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam, Unit 10"
  },

  // 112. Arbitrary (vocab-u10-02)
  {
    "id": "vocab-u10-02",
    "word": "Arbitrary",
    "bengaliMeaning": "স্বেচ্ছাচারী / খামখেয়ালি / অযৌক্তিক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Random, Whimsical, Unreasonable, Capricious, Illogical",
    "antonyms": "Rational, Logical, Reasoned, Systematic",
    "englishMeaning": "Based on random choice or personal whim rather than reason.",
    "exampleSentence": "Some cultural dining rules may seem arbitrary to outsiders, but they carry deep traditional value.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 113. Bother (vocab-u10-03)
  {
    "id": "vocab-u10-03",
    "word": "Bother",
    "bengaliMeaning": "বিরক্ত করা / কষ্ট দেওয়া / ব্যতিব্যস্ত করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Trouble, Disturb, Annoy, Irritate, Pester",
    "antonyms": "Comfort, Please, Soothe, Reassure",
    "englishMeaning": "To take the trouble to do something or cause annoyance to someone.",
    "exampleSentence": "Never bother hostesses by asking inappropriate questions during formal dinner preparations.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper Textbook"
  },

  // 114. Caveman (vocab-u10-04)
  {
    "id": "vocab-u10-04",
    "word": "Caveman",
    "bengaliMeaning": "গুহামানব / আদিম মানুষ",
    "partsOfSpeech": "Noun",
    "synonyms": "Cave-dweller, Barbarian, Troglodyte, Primitive human",
    "antonyms": "Modern human, Civilized person, Gentleman",
    "englishMeaning": "A prehistoric person or a primitive, uncivilized individual.",
    "exampleSentence": "Table etiquette distinguishes a civilized society from primitive caveman behavior.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 115. Cheer (vocab-u10-05)
  {
    "id": "vocab-u10-05",
    "word": "Cheer",
    "bengaliMeaning": "উল্লাস / আনন্দ / শুভকামনা",
    "partsOfSpeech": "Noun",
    "synonyms": "Joy, Happiness, Merriment, Exultation, Good spirits",
    "antonyms": "Gloom, Sadness, Sorrow, Melancholy, Despair",
    "englishMeaning": "Shouts of joy or expressions of warm salutation and happiness.",
    "exampleSentence": "South African greetings are leisurely and marked by good cheer and laughter.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 116. Chew (vocab-u10-06)
  {
    "id": "vocab-u10-06",
    "word": "Chew",
    "bengaliMeaning": "চিবানো / চর্বণ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Masticate, Munch, Crunch, Grind",
    "antonyms": "Swallow whole, Gulp, Swallow",
    "englishMeaning": "To bite and grind food in the mouth with the teeth.",
    "exampleSentence": "Good manners dictate that you should chew your food quietly with your mouth closed.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Textbook Vocab, Unit 10"
  },

  // 117. Chomp (vocab-u10-07)
  {
    "id": "vocab-u10-07",
    "word": "Chomp",
    "bengaliMeaning": "শব্দ করে চিবানো / মচমচ করে চিবানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Munch, Crunch, Chew noisily, Bite",
    "antonyms": "Nibble, Sip",
    "englishMeaning": "To munch or chew loudly and vigorously.",
    "exampleSentence": "Don't chomp food loudly when dining at a formal Chinese banquet.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper Model"
  },

  // 118. Civilized (vocab-u10-08)
  {
    "id": "vocab-u10-08",
    "word": "Civilized",
    "bengaliMeaning": "সভ্য / মার্জিত / সুসংস্কৃত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Refined, Cultured, Enlightened, Polite, Courteous",
    "antonyms": "Barbaric, Savage, Uncivilized, Primitive",
    "englishMeaning": "Having an advanced culture, politeness, and refined social manners.",
    "exampleSentence": "Respecting local dining customs is the mark of a civilized traveler.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dhaka Board Standard"
  },

  // 119. Claim (vocab-u10-09)
  {
    "id": "vocab-u10-09",
    "word": "Claim",
    "bengaliMeaning": "দাবি করা / ঘোষণা দেওয়া / অভিমত প্রকাশ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Assert, Declare, State, Maintain, Profess",
    "antonyms": "Deny, Disclaim, Renounce, Disavow",
    "englishMeaning": "To state or assert that something is true or belongs to oneself.",
    "exampleSentence": "Anthropologists claim that dining rituals reflect a community's deepest values.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 120. Concerned (vocab-u10-10)
  {
    "id": "vocab-u10-10",
    "word": "Concerned",
    "bengaliMeaning": "উদ্বিগ্ন / চিন্তিত / যত্নবান",
    "partsOfSpeech": "Adjective",
    "synonyms": "Anxious, Worried, Caring, Attentive, Apprehensive",
    "antonyms": "Unconcerned, Indifferent, Carefree, Apathetic",
    "englishMeaning": "Feeling anxiety or showing thoughtful care about something.",
    "exampleSentence": "Hosts are concerned about the comfort and satisfaction of their guests.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 121. Conscientious (vocab-u10-11)
  {
    "id": "vocab-u10-11",
    "word": "Conscientious",
    "bengaliMeaning": "বিবেকবান / নিষ্ঠাবান / অত্যন্ত সতর্ক",
    "partsOfSpeech": "Adjective",
    "synonyms": "Meticulous, Scrupulous, Diligent, Careful, Dedicated",
    "antonyms": "Careless, Irresponsible, Negligent, Slack",
    "englishMeaning": "Wishing to do what is right and taking immense care in one's actions.",
    "exampleSentence": "A conscientious guest always remembers to send a thank-you note after dinner.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 122. Considerate (vocab-u10-12)
  {
    "id": "vocab-u10-12",
    "word": "Considerate",
    "bengaliMeaning": "সুবিবেচক / অন্যের প্রতি যত্নবান / সহানুভূতিশীল",
    "partsOfSpeech": "Adjective",
    "synonyms": "Thoughtful, Mindful, Attentive, Kind, Caring",
    "antonyms": "Inconsiderate, Thoughtless, Selfish, Unkind",
    "englishMeaning": "Careful not to cause inconvenience or hurt to others.",
    "exampleSentence": "It is considerate to offer help to the hostess with clearing up after the meal.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 123. Consider (vocab-u10-13)
  {
    "id": "vocab-u10-13",
    "word": "Consider",
    "bengaliMeaning": "বিবেচনা করা / ভেবে দেখা / গণ্য করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Contemplate, Deliberate, Ponder, Regard, Deem",
    "antonyms": "Ignore, Disregard, Overlook, Dismiss",
    "englishMeaning": "To think carefully about something, typically before making a decision.",
    "exampleSentence": "In China, a firm handshake might be considered a sign of unwanted aggression.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Sylhet Board Model"
  },

  // 124. Conversation (vocab-u10-14)
  {
    "id": "vocab-u10-14",
    "word": "Conversation",
    "bengaliMeaning": "কথোপকথন / আলাপচারিতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Dialogue, Discussion, Talk, Chat, Discourse",
    "antonyms": "Silence, Speechlessness, Taciturnity",
    "englishMeaning": "A talk, especially an informal one, between two or more people.",
    "exampleSentence": "South African greetings involve warm eye-contact and pleasant conversations.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Barishal Board Standard"
  },

  // 125. Cue (vocab-u10-15)
  {
    "id": "vocab-u10-15",
    "word": "Cue",
    "bengaliMeaning": "ইঙ্গিত / সংকেত / সূত্র",
    "partsOfSpeech": "Noun",
    "synonyms": "Signal, Hint, Prompt, Clue, Sign",
    "antonyms": "",
    "englishMeaning": "A signal or reminder for someone to do something.",
    "exampleSentence": "Wait for the host's cue before you begin eating dinner in Great Britain.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 126. Discreetly (vocab-u10-16)
  {
    "id": "vocab-u10-16",
    "word": "Discreetly",
    "bengaliMeaning": "সতর্কভাবে / বিচক্ষণতার সাথে / সাবধানে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Tactfully, Prudently, Cautiously, Carefully",
    "antonyms": "Indiscreetly, Blatantly, Recklessly, Rashly",
    "englishMeaning": "In a careful and prudent manner, especially in order to avoid causing offense.",
    "exampleSentence": "If you dislike a dish, discreetly leave it on your plate without drawing attention.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // 127. Disgusted (vocab-u10-17)
  {
    "id": "vocab-u10-17",
    "word": "Disgusted",
    "bengaliMeaning": "নিদারুণ বিরক্ত / বিতৃষ্ণ / অসন্তুষ্ট",
    "partsOfSpeech": "Adjective",
    "synonyms": "Repelled, Revolted, Sickened, Appalled, Offended",
    "antonyms": "Delighted, Pleased, Gratified, Charmed",
    "englishMeaning": "Feeling or showing strong disapproval, revulsion, or intense annoyance.",
    "exampleSentence": "Hosts may feel disgusted if guests violate basic table sanitation rules.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 128. Edge (vocab-u10-18)
  {
    "id": "vocab-u10-18",
    "word": "Edge",
    "bengaliMeaning": "কিনারা / প্রান্ত / ধার",
    "partsOfSpeech": "Noun",
    "synonyms": "Border, Rim, Margin, Brink, Boundary",
    "antonyms": "Center, Middle, Interior",
    "englishMeaning": "The outside limit of an object, surface, or area.",
    "exampleSentence": "Place your knife and fork on the edge of the plate when pausing during a meal.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 129. Entire (vocab-u10-19)
  {
    "id": "vocab-u10-19",
    "word": "Entire",
    "bengaliMeaning": "সম্পূর্ণ / সমগ্র / পুরো",
    "partsOfSpeech": "Adjective",
    "synonyms": "Whole, Complete, Total, Full, Absolute",
    "antonyms": "Partial, Incomplete, Fractional",
    "englishMeaning": "With no part left out; whole and complete.",
    "exampleSentence": "The entire family participates in receiving guests warmly in Middle Eastern households.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 130. Frequently (vocab-u10-20)
  {
    "id": "vocab-u10-20",
    "word": "Frequently",
    "bengaliMeaning": "বারবার / পুনঃপুনঃ / ঘনঘন / প্রায়শই",
    "partsOfSpeech": "Adverb",
    "synonyms": "Often, Regularly, Repeatedly, Recurrently",
    "antonyms": "Rarely, Seldom, Infrequently, Occasionally",
    "englishMeaning": "Regularly or habitually; occurring many times.",
    "exampleSentence": "Gifts are given frequently in the Middle East to show genuine love and mutual respect.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper Textbook"
  },

  // 131. Firm (vocab-u10-21)
  {
    "id": "vocab-u10-21",
    "word": "Firm",
    "bengaliMeaning": "দৃঢ় / শক্ত / মজবুত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Solid, Strong, Resolute, Sturdy, Stable",
    "antonyms": "Weak, Soft, Loose, Flexible, Feeble",
    "englishMeaning": "Solid, resolute, and strongly held or gripped.",
    "exampleSentence": "While a firm handshake is expected in the West, it may seem aggressive in China.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dhaka Board 2024"
  },

  // 132. Gristle (vocab-u10-22)
  {
    "id": "vocab-u10-22",
    "word": "Gristle",
    "bengaliMeaning": "তরুণাস্থি / নরম হাড়",
    "partsOfSpeech": "Noun",
    "synonyms": "Cartilage",
    "antonyms": "",
    "englishMeaning": "Cartilage, especially when present as a tough substance in cooked meat.",
    "exampleSentence": "Discreetly remove gristle from your mouth using a fork or napkin.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 133. Grab (vocab-u10-23)
  {
    "id": "vocab-u10-23",
    "word": "Grab",
    "bengaliMeaning": "ছোঁ মেরে নেওয়া / আঁকড়ে ধরা / কেড়ে নেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Seize, Grasp, Snatch, Clutch",
    "antonyms": "Release, Let go, Drop, Relinquish",
    "englishMeaning": "To grasp or seize something suddenly or roughly.",
    "exampleSentence": "Never grab food across the table; instead, ask someone politely to pass it.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Rajshahi Board Standard"
  },

  // 134. Gravy (vocab-u10-24)
  {
    "id": "vocab-u10-24",
    "word": "Gravy",
    "bengaliMeaning": "ঝোল / মাংসের রস থেকে তৈরি সুস্বাদু সস",
    "partsOfSpeech": "Noun",
    "synonyms": "Sauce, Broth, Meat juices, Dressing",
    "antonyms": "",
    "englishMeaning": "A sauce made from meat juices and seasonings used with roasted dishes.",
    "exampleSentence": "In Britain, use a piece of bread on a fork to soak up remaining sauce or gravy.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Textbook Vocab"
  },

  // 135. Gulp (vocab-u10-25)
  {
    "id": "vocab-u10-25",
    "word": "Gulp",
    "bengaliMeaning": "দ্রুত গিলে ফেলা / ঢকঢক করে গেলা",
    "partsOfSpeech": "Verb",
    "synonyms": "Swallow, Guzzle, Quaff, Drink hastily",
    "antonyms": "Sip, Nibble, Taste slowly",
    "englishMeaning": "To swallow food or liquid quickly and in large quantities.",
    "exampleSentence": "It is considered impolite to gulp drinks hastily during a formal dinner.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 136. Habitual (vocab-u10-26)
  {
    "id": "vocab-u10-26",
    "word": "Habitual",
    "bengaliMeaning": "স্বভাবগত / অভ্যাসগত / নিয়মিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Customary, Routine, Regular, Usual, Chronic",
    "antonyms": "Occasional, Rare, Infrequent, Unusual, Irregular",
    "englishMeaning": "Done or doing constantly as a habit; customary.",
    "exampleSentence": "Giving dates and sweets as gifts is a habitual practice in the Middle East.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Sylhet Board Question"
  },

  // 137. Hugging (vocab-u10-27)
  {
    "id": "vocab-u10-27",
    "word": "Hugging",
    "bengaliMeaning": "আলিঙ্গন করা / বুকে জড়িয়ে ধরা",
    "partsOfSpeech": "Noun",
    "synonyms": "Embracing, Clasping, Enfolding, Cuddling",
    "antonyms": "Releasing, Pushing away, Shunning",
    "englishMeaning": "Holding someone tightly in one's arms, typically to express affection.",
    "exampleSentence": "Hugging between same-sex friends is a common social greeting across Arab nations.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Barishal Board Standard"
  },

  // 138. Host (vocab-u10-28)
  {
    "id": "vocab-u10-28",
    "word": "Host",
    "bengaliMeaning": "নিমন্ত্রণকর্তা / মেজবান / গৃহকর্তা",
    "partsOfSpeech": "Noun",
    "synonyms": "Entertainer, Party-giver, Master of ceremonies",
    "antonyms": "Guest, Visitor, Invitee",
    "englishMeaning": "A person who receives or entertains other people as guests.",
    "exampleSentence": "Wait until your host indicates that it is time to start eating the meal.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 139. Identify (vocab-u10-29)
  {
    "id": "vocab-u10-29",
    "word": "Identify",
    "bengaliMeaning": "শনাক্ত করা / চিহ্নিত করা / চিনে নেওয়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Recognize, Distinguish, Spot, Discern, Determine",
    "antonyms": "Mistake, Confuse, Misidentify, Overlook",
    "englishMeaning": "To establish or indicate who or what someone or something is.",
    "exampleSentence": "Cross-cultural training helps travelers identify acceptable local social norms.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // 140. Inadvertently (vocab-u10-30)
  {
    "id": "vocab-u10-30",
    "word": "Inadvertently",
    "bengaliMeaning": "অসাবধানতাবশত / অনিচ্ছাকৃতভাবে / ভুলবশত",
    "partsOfSpeech": "Adverb",
    "synonyms": "Accidentally, Unintentionally, Unwittingly, Involuntarily",
    "antonyms": "Intentionally, Deliberately, Purposefully, Consciously",
    "englishMeaning": "Without intention; accidentally or by careless oversight.",
    "exampleSentence": "Avoid using your left hand so you do not inadvertently offend your host.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 141. Indicate (vocab-u10-31)
  {
    "id": "vocab-u10-31",
    "word": "Indicate",
    "bengaliMeaning": "নির্দেশ করা / ইঙ্গিত দেওয়া / প্রকাশ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Signal, Show, Suggest, Signify, Point out",
    "antonyms": "Conceal, Hide, Obscure, Mislead",
    "englishMeaning": "To point out, show, or suggest the necessity of an action.",
    "exampleSentence": "In Britain, wait until the host indicates that guests may take their seats.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper Textbook"
  },

  // 142. Indication (vocab-u10-32)
  {
    "id": "vocab-u10-32",
    "word": "Indication",
    "bengaliMeaning": "ইঙ্গিত / নির্দেশক সংকেত / লক্ষণ",
    "partsOfSpeech": "Noun",
    "synonyms": "Sign, Signal, Hint, Clue, Symptom",
    "antonyms": "Misdirection, Misguidance, Concealment",
    "englishMeaning": "A sign or piece of information indicating something.",
    "exampleSentence": "A smile and nod are common indications of polite recognition in South Africa.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Jashore Board Standard"
  },

  // 143. Insistent (vocab-u10-33)
  {
    "id": "vocab-u10-33",
    "word": "Insistent",
    "bengaliMeaning": "নাছোড়বান্দা / অবিচল / দৃঢ়প্রতিজ্ঞ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Persistent, Adamant, Firm, Tenacious, Unyielding",
    "antonyms": "Yielding, Flexible, Compliant, Undemanding",
    "englishMeaning": "Insisting or demanding something firmly; not allowing refusal.",
    "exampleSentence": "Hosts may be pleasantly insistent that you try every specialty on the table.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 144. Lack (vocab-u10-34)
  {
    "id": "vocab-u10-34",
    "word": "Lack",
    "bengaliMeaning": "ঘাটতি / অভাব / অপর্যাপ্ততা",
    "partsOfSpeech": "Noun",
    "synonyms": "Shortage, Deficiency, Scarcity, Dearth, Absence",
    "antonyms": "Abundance, Plenty, Sufficiency, Surplus",
    "englishMeaning": "The state of being without or not having enough of something.",
    "exampleSentence": "A lack of cultural awareness can lead to awkward dining misunderstandings.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dhaka Board Standard"
  },

  // 145. Lean (vocab-u10-35)
  {
    "id": "vocab-u10-35",
    "word": "Lean",
    "bengaliMeaning": "হেলান দেওয়া / কাত হওয়া / ঝুঁকে পড়া",
    "partsOfSpeech": "Verb",
    "synonyms": "Incline, Bend, Tilt, Slouch, Rest against",
    "antonyms": "Straighten, Stand upright, Sit up",
    "englishMeaning": "To be in or move into a sloping position; rest against support.",
    "exampleSentence": "Do not lean heavily on the dining table or put your elbows up during dinner.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Chattogram Board Standard"
  },

  // 146. Maintain (vocab-u10-36)
  {
    "id": "vocab-u10-36",
    "word": "Maintain",
    "bengaliMeaning": "বজায় রাখা / সংরক্ষণ করা / অব্যাহত রাখা",
    "partsOfSpeech": "Verb",
    "synonyms": "Sustain, Preserve, Keep, Continue, Uphold",
    "antonyms": "Discontinue, Abandon, Neglect, Drop",
    "englishMeaning": "To cause or enable a condition or state of affairs to continue.",
    "exampleSentence": "Maintain friendly eye-contact when greeting someone with a handshake in South Africa.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 147. Messy (vocab-u10-37)
  {
    "id": "vocab-u10-37",
    "word": "Messy",
    "bengaliMeaning": "অগোছালো / অপরিষ্কার / নোংরা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Untidy, Disordered, Dirty, Sloppy, Chaotic",
    "antonyms": "Neat, Tidy, Clean, Organized, Orderly",
    "englishMeaning": "Untidy or dirty; lacking order and neatness.",
    "exampleSentence": "Avoid leaving a messy plate when finishing your meal at a host's dinner table.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Rajshahi Board Exam"
  },

  // 148. Nod (vocab-u10-38)
  {
    "id": "vocab-u10-38",
    "word": "Nod",
    "bengaliMeaning": "মাথা নেড়ে সম্মতি দেওয়া / মাথা ঝুঁকানো",
    "partsOfSpeech": "Verb",
    "synonyms": "Incline head, Bow, Signal, Gesture, Acknowledge",
    "antonyms": "Shake head, Refuse, Disagree",
    "englishMeaning": "To lower and raise one's head slightly and briefly in greeting or agreement.",
    "exampleSentence": "Some South African women do not shake hands and merely nod their head in greeting.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper Textbook"
  },

  // 149. Offend (vocab-u10-39)
  {
    "id": "vocab-u10-39",
    "word": "Offend",
    "bengaliMeaning": "অসন্তুষ্ট করা / অপমানিত করা / ক্ষুব্ধ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Insult, Displease, Upset, Affront, Hurt",
    "antonyms": "Please, Delight, Gratify, Charm, Flatter",
    "englishMeaning": "To cause someone to feel hurt, angry, or upset by bad behavior.",
    "exampleSentence": "Offering gifts with only one hand may offend hosts in Chinese culture.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Sylhet Board Model"
  },

  // 150. Posture (vocab-u10-40)
  {
    "id": "vocab-u10-40",
    "word": "Posture",
    "bengaliMeaning": "দেহভঙ্গি / অঙ্গভঙ্গি / শারীরিক অবস্থান",
    "partsOfSpeech": "Noun",
    "synonyms": "Stance, Bearing, Pose, Position, Carriage",
    "antonyms": "Slouching, Deformity",
    "englishMeaning": "The position in which someone holds their body when standing or sitting.",
    "exampleSentence": "Sitting with an upright, graceful posture shows respect during an official dinner.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Cumilla Board Standard"
  },

  // 151. Potential (vocab-u10-41)
  {
    "id": "vocab-u10-41",
    "word": "Potential",
    "bengaliMeaning": "সম্ভাব্য / সুপ্ত / ভবিষ্যৎ সম্ভাবনাপূর্ণ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Possible, Prospective, Latent, Probable, Likely",
    "antonyms": "Impossible, Improbable, Actual, Unlikely",
    "englishMeaning": "Having or showing the capacity to develop into something in the future.",
    "exampleSentence": "Understanding cultural differences prevents potential embarrassment when traveling.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Barishal Board Standard"
  },

  // 152. Puff up (vocab-u10-42)
  {
    "id": "vocab-u10-42",
    "word": "Puff up",
    "bengaliMeaning": "ফুলে ওঠা / ফেঁপে ওঠা / স্ফীত হওয়া",
    "partsOfSpeech": "Verb phrase",
    "synonyms": "Inflate, Swell, Expand, Bloat",
    "antonyms": "Deflate, Shrink, Compress, Flatten",
    "englishMeaning": "To swell or become larger and fuller.",
    "exampleSentence": "Bread rolls served at British dinners often puff up delightfully during baking.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Dinajpur Board Standard"
  },

  // 153. Quietly (vocab-u10-43)
  {
    "id": "vocab-u10-43",
    "word": "Quietly",
    "bengaliMeaning": "নীরবে / শান্তভাবে / নিঃশব্দে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Silently, Softly, Calmly, Inaudibly, Peacefully",
    "antonyms": "Loudly, Noisily, Boisterously, Clamorously",
    "englishMeaning": "In a quiet manner; with little or no sound.",
    "exampleSentence": "Enjoy your food quietly without slurping or talking with your mouth full.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "Mymensingh Board Standard"
  },

  // 154. Refinement (vocab-u10-44)
  {
    "id": "vocab-u10-44",
    "word": "Refinement",
    "bengaliMeaning": "মার্জিত রূপ / সুরুচি / শিষ্টাচার / পরিশুদ্ধতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Sophistication, Elegance, Politeness, Cultivation, Polish",
    "antonyms": "Vulgarity, Coarseness, Rudeness, Crudeness",
    "englishMeaning": "The improvement or clarification of something with elegant taste and manner.",
    "exampleSentence": "Table manners were developed through centuries of social refinement.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Exam"
  },

  // 155. Refuse (vocab-u10-45)
  {
    "id": "vocab-u10-45",
    "word": "Refuse",
    "bengaliMeaning": "প্রত্যাখ্যান করা / অসম্মত হওয়া / নাকচ করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Decline, Reject, Turn down, Spurn, Deny",
    "antonyms": "Accept, Agree, Receive, Consent",
    "englishMeaning": "To indicate or show that one is not willing to do or accept something.",
    "exampleSentence": "In Chinese culture, guests politely refuse a gift several times before finally accepting it.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC Board Standard, Unit 10"
  },

  // 156. Scatter (vocab-u10-46)
  {
    "id": "vocab-u10-46",
    "word": "Scatter",
    "bengaliMeaning": "ছড়িয়ে দেওয়া / ছিটানো / ইতস্তত বিক্ষিপ্ত করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Disperse, Spread, Strew, Sprinkle, Dissipate",
    "antonyms": "Gather, Collect, Assemble, Concentrate",
    "englishMeaning": "To throw in various random directions; separate and disperse.",
    "exampleSentence": "Never scatter breadcrumbs on the tablecloth; keep your dining area tidy.",
    "unit": "Unit 10: Lesson 1 (Manners Around the World)",
    "boardExamTag": "HSC 1st Paper Model"
  }
];

// Generate JS file content
function generateFileContent() {
  const jsonString = JSON.stringify(hscVocabularyList, null, 2);
  
  return `/**
 * HSC English Vocabulary and MCQ Question Database
 * Unit 1: Education and Life | Lesson 1: The Parrot's Tale (46 Words)
 * Unit 10: Lifestyle | Lesson 1: Manners Around the World (74 Words)
 * Unit 10: Lifestyle | Lesson 2: Etiquette Netquette (36 Words)
 *
 * Total: 156 Vocabulary Words | 613 Board-Standard MCQs
 */

export const hscVocabularyList = ${jsonString};

// Generates question variations for each vocabulary word with authentic curriculum-based distractors and safe skip for empty fields
export function buildQuestionsDatabase() {
  const list = [];

  hscVocabularyList.forEach((item, index) => {
    const num = (index + 1).toString().padStart(2, '0');
    let prefix = 'hsc-u1-l1-' + num;
    if (item.unit.includes('Unit 10: Lesson 1') || item.unit.includes('Manners Around the World')) {
      prefix = 'hsc-u10-l1-' + num;
    } else if (item.unit.includes('Unit 10: Lesson 2') || item.unit.includes('Etiquette Netquette') || item.unit.includes('Good manners always wins') || item.unit.includes('Food and Culture')) {
      prefix = 'hsc-u10-l2-' + num;
    }

    const synList = item.synonyms ? item.synonyms.split(',').map(s => s.trim()).filter(Boolean) : [];
    const antList = item.antonyms ? item.antonyms.split(',').map(s => s.trim()).filter(Boolean) : [];

    const primarySyn = synList.length > 0 ? synList[0] : '';
    const primaryAnt = antList.length > 0 ? antList[0] : '';

    // Pick 3 realistic word distractors from nearby vocabulary
    const otherIdx1 = (index + 3) % hscVocabularyList.length;
    const otherIdx2 = (index + 7) % hscVocabularyList.length;
    const otherIdx3 = (index + 11) % hscVocabularyList.length;
    const distractorWord1 = hscVocabularyList[otherIdx1].word;
    const distractorWord2 = hscVocabularyList[otherIdx2].word;
    const distractorWord3 = hscVocabularyList[otherIdx3].word;

    // Pick 3 realistic definition distractors from other vocabulary words
    const defIdx1 = (index + 2) % hscVocabularyList.length;
    const defIdx2 = (index + 5) % hscVocabularyList.length;
    const defIdx3 = (index + 9) % hscVocabularyList.length;
    const defDistractor1 = hscVocabularyList[defIdx1].englishMeaning;
    const defDistractor2 = hscVocabularyList[defIdx2].englishMeaning;
    const defDistractor3 = hscVocabularyList[defIdx3].englishMeaning;

    // Pick 3 realistic Bengali meaning distractors
    const bngDistractor1 = hscVocabularyList[defIdx1].bengaliMeaning.split('/')[0].trim();
    const bngDistractor2 = hscVocabularyList[defIdx2].bengaliMeaning.split('/')[0].trim();
    const bngDistractor3 = hscVocabularyList[defIdx3].bengaliMeaning.split('/')[0].trim();

    // 1. SYNONYM QUESTION (Only generate if primarySyn is present)
    if (primarySyn) {
      const synOption2 = primaryAnt || distractorWord3;
      list.push({
        id: prefix + '-syn',
        vocabId: item.id,
        wordIndex: index,
        word: item.word,
        category: 'synonyms',
        categoryLabel: 'Synonym (সমার্থক শব্দ)',
        categoryIcon: '🔄',
        bengaliMeaning: item.bengaliMeaning,
        partsOfSpeech: item.partsOfSpeech,
        questionText: 'What is the closest SYNONYM of the word "' + item.word + '"?',
        options: [primarySyn, synOption2, distractorWord1, distractorWord2],
        correctOption: 0,
        synonyms: item.synonyms,
        antonyms: item.antonyms,
        exampleSentence: item.exampleSentence,
        unit: item.unit,
        boardExamTag: item.boardExamTag,
        difficulty: 'Medium'
      });
    }

    // 2. ANTONYM QUESTION (Only generate if primaryAnt is present)
    if (primaryAnt) {
      const antOption2 = primarySyn || distractorWord3;
      list.push({
        id: prefix + '-ant',
        vocabId: item.id,
        wordIndex: index,
        word: item.word,
        category: 'antonyms',
        categoryLabel: 'Antonym (বিপরীত শব্দ)',
        categoryIcon: '⚡',
        bengaliMeaning: item.bengaliMeaning,
        partsOfSpeech: item.partsOfSpeech,
        questionText: 'What is the ANTONYM (Opposite) of the word "' + item.word + '"?',
        options: [primaryAnt, antOption2, distractorWord1, distractorWord2],
        correctOption: 0,
        synonyms: item.synonyms,
        antonyms: item.antonyms,
        exampleSentence: item.exampleSentence,
        unit: item.unit,
        boardExamTag: item.boardExamTag,
        difficulty: 'Medium'
      });
    }

    // 3. WORD MEANING IN ENGLISH QUESTION (Only generate if englishMeaning is present)
    if (item.englishMeaning && item.englishMeaning.trim() !== '') {
      list.push({
        id: prefix + '-eng',
        vocabId: item.id,
        wordIndex: index,
        word: item.word,
        category: 'english_meaning',
        categoryLabel: 'Meaning in English (ইংরেজি অর্থ)',
        categoryIcon: '📖',
        bengaliMeaning: item.bengaliMeaning,
        partsOfSpeech: item.partsOfSpeech,
        questionText: 'What is the English meaning of the word "' + item.word + '"?',
        options: [
          item.englishMeaning,
          defDistractor1,
          defDistractor2,
          defDistractor3
        ],
        correctOption: 0,
        synonyms: item.synonyms,
        antonyms: item.antonyms,
        exampleSentence: item.exampleSentence,
        unit: item.unit,
        boardExamTag: item.boardExamTag,
        difficulty: 'Medium'
      });
    }

    // 4. WORD MEANING IN BANGLA QUESTION (Only generate if bengaliMeaning is present)
    if (item.bengaliMeaning && item.bengaliMeaning.trim() !== '') {
      const bngCorrect = item.bengaliMeaning.split('/')[0].trim();
      list.push({
        id: prefix + '-bng',
        vocabId: item.id,
        wordIndex: index,
        word: item.word,
        category: 'bangla_meaning',
        categoryLabel: 'Meaning in Bangla (বাংলা অর্থ)',
        categoryIcon: '🇧🇩',
        bengaliMeaning: item.bengaliMeaning,
        partsOfSpeech: item.partsOfSpeech,
        questionText: '"' + item.word + '" শব্দটির সঠিক বাংলা অর্থ কোনটি?',
        options: [
          bngCorrect,
          bngDistractor1,
          bngDistractor2,
          bngDistractor3
        ],
        correctOption: 0,
        synonyms: item.synonyms,
        antonyms: item.antonyms,
        exampleSentence: item.exampleSentence,
        unit: item.unit,
        boardExamTag: item.boardExamTag,
        difficulty: 'Easy'
      });
    }
  });

  return list;
}

export const hscQuestionsList = buildQuestionsDatabase();

/**
 * Smart question interleaver:
 * Ensures questions from different words are smoothly interleaved round-robin
 * so that no two consecutive questions share the same vocabulary word!
 */
export function smartInterleaveQuestions(rawQuestions = []) {
  if (!rawQuestions || rawQuestions.length <= 1) return rawQuestions;

  const wordBuckets = {};
  rawQuestions.forEach((q) => {
    const key = q.vocabId || q.word;
    if (!wordBuckets[key]) wordBuckets[key] = [];
    wordBuckets[key].push(q);
  });

  const keys = Object.keys(wordBuckets);
  const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);

  const interleaved = [];
  let hasMore = true;
  let round = 0;

  while (hasMore) {
    hasMore = false;
    for (const key of shuffledKeys) {
      if (wordBuckets[key].length > round) {
        interleaved.push(wordBuckets[key][round]);
        hasMore = true;
      }
    }
    round++;
  }

  return interleaved;
}

/**
 * Filter questions based on selected categories with smart interleaving
 */
export function getFilteredCategoryQuestions(
  categories = ['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning'],
  lessonId = null,
  unitNumber = null
) {
  const activeCategories = categories.length > 0
    ? categories
    : ['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning'];

  const matched = hscQuestionsList.filter((q) => {
    return activeCategories.includes(q.category);
  });

  return smartInterleaveQuestions(matched);
}
`;
}

// Write the file
const targetPath = path.resolve('src/data/questions/hscQuestionsData.js');
fs.writeFileSync(targetPath, generateFileContent(), 'utf-8');
console.log('Successfully wrote hscQuestionsData.js');

// Now verify
const questions = buildQuestionsDatabaseTest(hscVocabularyList);
console.log('Total vocabulary items:', hscVocabularyList.length);
console.log('Total questions generated:', questions.length);

const u1l1Questions = questions.filter(q => q.id.startsWith('hsc-u1-l1-'));
const u10l1Questions = questions.filter(q => q.id.startsWith('hsc-u10-l1-'));
const u10l2Questions = questions.filter(q => q.id.startsWith('hsc-u10-l2-'));

console.log('U1-L1 questions:', u1l1Questions.length, '(expected 180)');
console.log('U10-L1 questions:', u10l1Questions.length, '(expected 290)');
console.log('U10-L2 questions:', u10l2Questions.length, '(expected 143)');

let emptyOptionErrors = 0;
questions.forEach((q, idx) => {
  if (!q.options || q.options.length !== 4) {
    console.error('Question ' + q.id + ' does not have 4 options: ' + JSON.stringify(q.options));
    emptyOptionErrors++;
  }
  q.options.forEach((opt, oIdx) => {
    if (opt === undefined || opt === null || opt.trim() === '') {
      console.error('Question ' + q.id + ' option ' + oIdx + ' is empty: "' + opt + '"');
      emptyOptionErrors++;
    }
  });
});

if (emptyOptionErrors === 0) {
  console.log('All questions passed verification with ZERO empty options!');
} else {
  console.error('Encountered ' + emptyOptionErrors + ' option errors!');
}

function buildQuestionsDatabaseTest(vocabList) {
  const list = [];
  vocabList.forEach((item, index) => {
    const num = (index + 1).toString().padStart(2, '0');
    let prefix = 'hsc-u1-l1-' + num;
    if (item.unit.includes('Unit 10: Lesson 1') || item.unit.includes('Manners Around the World')) {
      prefix = 'hsc-u10-l1-' + num;
    } else if (item.unit.includes('Unit 10: Lesson 2') || item.unit.includes('Etiquette Netquette') || item.unit.includes('Good manners always wins') || item.unit.includes('Food and Culture')) {
      prefix = 'hsc-u10-l2-' + num;
    }

    const synList = item.synonyms ? item.synonyms.split(',').map(s => s.trim()).filter(Boolean) : [];
    const antList = item.antonyms ? item.antonyms.split(',').map(s => s.trim()).filter(Boolean) : [];

    const primarySyn = synList.length > 0 ? synList[0] : '';
    const primaryAnt = antList.length > 0 ? antList[0] : '';

    const otherIdx1 = (index + 3) % vocabList.length;
    const otherIdx2 = (index + 7) % vocabList.length;
    const otherIdx3 = (index + 11) % vocabList.length;
    const distractorWord1 = vocabList[otherIdx1].word;
    const distractorWord2 = vocabList[otherIdx2].word;
    const distractorWord3 = vocabList[otherIdx3].word;

    const defIdx1 = (index + 2) % vocabList.length;
    const defIdx2 = (index + 5) % vocabList.length;
    const defIdx3 = (index + 9) % vocabList.length;
    const defDistractor1 = vocabList[defIdx1].englishMeaning;
    const defDistractor2 = vocabList[defIdx2].englishMeaning;
    const defDistractor3 = vocabList[defIdx3].englishMeaning;

    const bngDistractor1 = vocabList[defIdx1].bengaliMeaning.split('/')[0].trim();
    const bngDistractor2 = vocabList[defIdx2].bengaliMeaning.split('/')[0].trim();
    const bngDistractor3 = vocabList[defIdx3].bengaliMeaning.split('/')[0].trim();

    if (primarySyn) {
      const synOption2 = primaryAnt || distractorWord3;
      list.push({
        id: prefix + '-syn',
        options: [primarySyn, synOption2, distractorWord1, distractorWord2]
      });
    }

    if (primaryAnt) {
      const antOption2 = primarySyn || distractorWord3;
      list.push({
        id: prefix + '-ant',
        options: [primaryAnt, antOption2, distractorWord1, distractorWord2]
      });
    }

    if (item.englishMeaning && item.englishMeaning.trim() !== '') {
      list.push({
        id: prefix + '-eng',
        options: [item.englishMeaning, defDistractor1, defDistractor2, defDistractor3]
      });
    }

    if (item.bengaliMeaning && item.bengaliMeaning.trim() !== '') {
      const bngCorrect = item.bengaliMeaning.split('/')[0].trim();
      list.push({
        id: prefix + '-bng',
        options: [bngCorrect, bngDistractor1, bngDistractor2, bngDistractor3]
      });
    }
  });
  return list;
}
