import fs from 'fs';

const unit1Lesson3Words = [
  {
    "id": "vocab-u1-l3-01",
    "word": "Consisted",
    "bengaliMeaning": "গঠিত হয়েছিল / অন্তর্ভুক্ত ছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Comprised, composed, constituted, formed, included",
    "antonyms": "Excluded, lacked, omitted",
    "englishMeaning": "Was made up or composed of specific parts or elements.",
    "exampleSentence": "The gate of Tomoe Gakuen simply consisted of two living tree posts with twigs and leaves.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dhaka Board 1st Paper, Unit 1"
  },
  {
    "id": "vocab-u1-l3-02",
    "word": "Askew",
    "bengaliMeaning": "বাঁকাভাবে / তির্যকভাবে / একপাশে হেলে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Crooked, slanted, tilted, awry, obliquely",
    "antonyms": "Straight, aligned, symmetrical, upright",
    "englishMeaning": "Not in a straight or level position; crookedly or to one side.",
    "exampleSentence": "The morning wind had blown the school signboard askew across the tree trunk.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "HSC Board Exam, Unit 1"
  },
  {
    "id": "vocab-u1-l3-03",
    "word": "Glimpse",
    "bengaliMeaning": "একপলক দেখা / ক্ষণিক দৃষ্টি",
    "partsOfSpeech": "Noun",
    "synonyms": "Peek, glance, sighting, peep, quick look",
    "antonyms": "Gaze, stare, scrutiny, observation",
    "englishMeaning": "A momentary or partial view of someone or something.",
    "exampleSentence": "Totto-chan caught a glimpse of real railroad cars resting in the school playground.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l3-04",
    "word": "Squatted",
    "bengaliMeaning": "উবু হয়ে বসল / হাঁটু ভেঙে বসল",
    "partsOfSpeech": "Verb",
    "synonyms": "Crouched, hunkered, bent, stooped",
    "antonyms": "Stood upright, straightened, rose",
    "englishMeaning": "Crouched or sat with the knees bent and the heels close to or touching the buttocks.",
    "exampleSentence": "She squatted down near the hedge to peer through the green bushes.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l3-05",
    "word": "Peered",
    "bengaliMeaning": "উঁকি দিয়ে বা তীক্ষ্ণ দৃষ্টিতে তাকাল",
    "partsOfSpeech": "Verb",
    "synonyms": "Gazed, squinted, inspected, searched, probed",
    "antonyms": "Ignored, glanced away, overlooked",
    "englishMeaning": "Looked with concentration, curiosity, or difficulty through an opening.",
    "exampleSentence": "The young girl peered excitedly through the shrubbery to verify the train cars.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l3-06",
    "word": "Shrubbery",
    "bengaliMeaning": "ঝোপঝাড় / গুল্মবাগান / ঝোপের বেষ্টনী",
    "partsOfSpeech": "Noun",
    "synonyms": "Bushes, foliage, greenery, thicket, undergrowth",
    "antonyms": "Clearing, wasteland, desert, open field",
    "englishMeaning": "An area in a garden or park planted with shrubs and green bushes.",
    "exampleSentence": "Colorful flowers and neat shrubbery surrounded the natural school boundaries.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l3-07",
    "word": "Abandoned",
    "bengaliMeaning": "পরিত্যক্ত / অব্যবহৃত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Deserted, discarded, forsaken, derelict, unused",
    "antonyms": "Inhabited, occupied, utilized, maintained",
    "englishMeaning": "Having been deserted or left behind by former owners or users.",
    "exampleSentence": "The innovative school converted six abandoned railroad cars into cozy classrooms.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Barishal Board Exam"
  },
  {
    "id": "vocab-u1-l3-08",
    "word": "Sparkled",
    "bengaliMeaning": "চকচক করছিল / উজ্জ্বলভাবে জ্বলছিল",
    "partsOfSpeech": "Verb",
    "synonyms": "Shimmered, glinted, twinkled, shone, glistened",
    "antonyms": "Dimmed, faded, dulled, darkened",
    "englishMeaning": "Shone with flashes of light; glittered brightly in the sun.",
    "exampleSentence": "The clean glass windows of the train cars sparkled brilliantly in the morning sunlight.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u1-l3-09",
    "word": "Rosy-cheeked",
    "bengaliMeaning": "গোলাপী গালবিশিষ্ট / স্বাস্থ্যোজ্জ্বল",
    "partsOfSpeech": "Adjective",
    "synonyms": "Blooming, radiant, healthy, flushed, rubicund",
    "antonyms": "Pale, pallid, sickly, anemic, wan",
    "englishMeaning": "Having healthy pink or reddish cheeks indicating vibrant youth.",
    "exampleSentence": "The rosy-cheeked child smiled with unbound excitement upon seeing her new school.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l3-10",
    "word": "Spacious",
    "bengaliMeaning": "প্রশস্ত / সুবিশাল / খোলামেলা",
    "partsOfSpeech": "Adjective",
    "synonyms": "Roomy, expansive, commodious, capacious, large",
    "antonyms": "Cramped, narrow, confined, restricted",
    "englishMeaning": "Having ample space; commodious and roomy.",
    "exampleSentence": "The not very spacious school grounds felt lively and welcoming with green plants.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l3-11",
    "word": "Semicircular",
    "bengaliMeaning": "অর্ধবৃত্তাকার",
    "partsOfSpeech": "Adjective",
    "synonyms": "Half-round, crescent, curved, arched",
    "antonyms": "Linear, straight, rectangular, square",
    "englishMeaning": "Having the shape of a half-circle.",
    "exampleSentence": "A semicircular flight of seven stone steps led up to the headmaster's office door.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "HSC Board Standard, Unit 1"
  },
  {
    "id": "vocab-u1-l3-12",
    "word": "Abruptly",
    "bengaliMeaning": "হঠাৎ করে / আকস্মিকভাবে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Suddenly, unexpectedly, precipitously, sharply",
    "antonyms": "Gradually, slowly, steadily, progressively",
    "englishMeaning": "Suddenly and unexpectedly; without warning.",
    "exampleSentence": "Totto-chan stopped abruptly on the top stair, making her mother nearly bump into her.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u1-l3-13",
    "word": "Stationmaster",
    "bengaliMeaning": "স্টেশনমাস্টার / ট্রেন স্টেশনের কর্মকর্তা",
    "partsOfSpeech": "Noun",
    "synonyms": "Station manager, railway official, depot master",
    "antonyms": "Passenger, traveler, commuter",
    "englishMeaning": "A railway official in charge of a railway station.",
    "exampleSentence": "Seeing all the train carriages, Totto-chan innocently assumed the headmaster was a stationmaster.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l3-14",
    "word": "Shabby",
    "bengaliMeaning": "জীর্ণশীর্ণ / মলিন / পরাতন ধাঁচের",
    "partsOfSpeech": "Adjective",
    "synonyms": "Threadbare, worn-out, ragged, scruffy, faded",
    "antonyms": "Smart, elegant, pristine, immaculate, luxurious",
    "englishMeaning": "In poor condition through long use or lack of care; worn.",
    "exampleSentence": "Headmaster Kobayashi wore a rather shabby but neatly kept black three-piece suit.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l3-15",
    "word": "Spiritedly",
    "bengaliMeaning": "উদ্যমীভাবে / প্রাণবন্তভাবে / সতেজে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Energetically, vividly, enthusiastically, vivaciously",
    "antonyms": "Lifelessly, sluggishly, apathetically, weakly",
    "englishMeaning": "In a lively, enthusiastic, and animated manner.",
    "exampleSentence": "The young girl spiritedly asked whether the gentleman was a principal or a train master.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l3-16",
    "word": "Embarrassed",
    "bengaliMeaning": "লজ্জিত / অপ্রস্তুত / বিব্রত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Ashamed, awkward, humiliated, mortified, self-conscious",
    "antonyms": "Confident, proud, composed, unabashed",
    "englishMeaning": "Feeling awkward, self-conscious, or ashamed by a social blunder.",
    "exampleSentence": "Mother felt embarrassed by her daughter's direct and blunt question.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l3-17",
    "word": "Uneasiness",
    "bengaliMeaning": "অস্বস্তি / উৎকণ্ঠা / অস্থিরতা",
    "partsOfSpeech": "Noun",
    "synonyms": "Anxiety, apprehension, restlessness, discomfort, perturbation",
    "antonyms": "Calmness, ease, serenity, comfort, tranquility",
    "englishMeaning": "A feeling of anxiety, restlessness, or apprehension.",
    "exampleSentence": "Totto-chan felt a brief moment of uneasiness when her mother stepped out of the office.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u1-l3-18",
    "word": "Straight away",
    "bengaliMeaning": "অবিলম্বে / সাথে সাথে / কালবিলম্ব না করে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Immediately, instantly, promptly, forthwith, right away",
    "antonyms": "Eventually, later, subsequently, sluggishly",
    "englishMeaning": "Without delay; immediately and readily.",
    "exampleSentence": "Given permission to speak freely, Totto-chan began narrating her life straight away.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u1-l3-19",
    "word": "Higgledy-piggledy",
    "bengaliMeaning": "এলোমেলোভাবে / বিশৃঙ্খলভাবে / তালগোল পাকিয়ে",
    "partsOfSpeech": "Adverb",
    "synonyms": "Chaotic, disorderly, topsy-turvy, jumbled, haphazardly",
    "antonyms": "Orderly, systematic, organized, neat",
    "englishMeaning": "In confusion or disorderly disorder; topsy-turvy.",
    "exampleSentence": "Her lively childhood stories tumbled out in a higgledy-piggledy, charming stream of thought.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l3-20",
    "word": "Racking",
    "bengaliMeaning": "তীব্রভাবে চিন্তা করা / মাথা খাটানো / তোলপাড় করা",
    "partsOfSpeech": "Verb",
    "synonyms": "Straining, agonizing, searching, tormenting, pondering deeply",
    "antonyms": "Relaxing, resting, easing, soothing",
    "englishMeaning": "Subjecting someone or one's mind to extreme mental effort or strain.",
    "exampleSentence": "Racking her brains for new topics to share, she remembered her torn play dresses.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l3-21",
    "word": "Shreds",
    "bengaliMeaning": "টুকরো টুকরো / ছিন্নভিন্ন অবস্থা",
    "partsOfSpeech": "Noun",
    "synonyms": "Tatters, scraps, fragments, ribbons, bits",
    "antonyms": "Whole, entirety, fullness, unity",
    "englishMeaning": "Strips of some material torn off or ragged fragments.",
    "exampleSentence": "Her outdoor adventures crawling under fences often reduced her dresses to shreds.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dhaka Board 1st Paper"
  },
  {
    "id": "vocab-u1-l3-22",
    "word": "Burrowed",
    "bengaliMeaning": "নিচ দিয়ে ঢুকল / সুড়ঙ্গ কেটে ঢোকার মতো প্রবেশ করল",
    "partsOfSpeech": "Verb",
    "synonyms": "Tunneled, crawled, snaked, squeezed, wiggled",
    "antonyms": "Climbed over, leaped, ascended",
    "englishMeaning": "Made a hole or passage through or beneath an obstacle.",
    "exampleSentence": "She burrowed beneath barbed wire fencing around vacant neighborhood gardens.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Rajshahi Board Exam"
  },
  {
    "id": "vocab-u1-l3-23",
    "word": "Embroidered",
    "bengaliMeaning": "নকশা করা / কারুকার্যখচিত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Stitched, decorated, patterned, embellished, ornate",
    "antonyms": "Plain, unadorned, undecorated, bare",
    "englishMeaning": "Decorated with needlework patterns using colored thread.",
    "exampleSentence": "Her jersey dress featured small red flowers neatly embroidered on the collar.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Cumilla Board Standard"
  },
  {
    "id": "vocab-u1-l3-24",
    "word": "Astonished",
    "bengaliMeaning": "বিস্ময়াভিভূত / অত্যন্ত তাজ্জব",
    "partsOfSpeech": "Adjective",
    "synonyms": "Amazed, astounded, flabbergasted, stunned, bewildered",
    "antonyms": "Unimpressed, indifferent, unconcerned, expected",
    "englishMeaning": "Greatly surprised, impressed, or struck with wonder.",
    "exampleSentence": "She would have been astonished to realize she had spoken continuously for four hours.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Chattogram Board Exam"
  },
  {
    "id": "vocab-u1-l3-25",
    "word": "Grateful",
    "bengaliMeaning": "কৃতজ্ঞ / ধন্যবাদশীল",
    "partsOfSpeech": "Adjective",
    "synonyms": "Thankful, appreciative, obliged, indebted",
    "antonyms": "Ungrateful, thankless, unappreciative",
    "englishMeaning": "Feeling or showing an appreciation of kindness; thankful.",
    "exampleSentence": "Totto-chan felt deeply grateful to find an adult who truly listened to her voice.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Jashore Board Exam"
  },
  {
    "id": "vocab-u1-l3-26",
    "word": "Solid",
    "bengaliMeaning": "একটানা / নিরবচ্ছিন্ন / পূর্ণাঙ্গ",
    "partsOfSpeech": "Adjective",
    "synonyms": "Continuous, unbroken, uninterrupted, whole, substantial",
    "antonyms": "Interrupted, sporadic, broken, intermittent",
    "englishMeaning": "Entire and uninterrupted; continuous in time without a break.",
    "exampleSentence": "The patient headmaster listened to the seven-year-old for four solid hours.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Barishal Board Standard"
  },
  {
    "id": "vocab-u1-l3-27",
    "word": "Expelled",
    "bengaliMeaning": "বহিষ্কৃত / বরখাস্ত / বিতাড়িত",
    "partsOfSpeech": "Adjective",
    "synonyms": "Dismissed, evicted, banished, discharged, ousted",
    "antonyms": "Admitted, accepted, enrolled, welcomed",
    "englishMeaning": "Officially forced to leave a school or other organization.",
    "exampleSentence": "The young girl had no idea she had been expelled from her former traditional school.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Sylhet Board Standard"
  },
  {
    "id": "vocab-u1-l3-28",
    "word": "Disposition",
    "bengaliMeaning": "স্বভাব / মানসিক মেজাজ / প্রকৃতি",
    "partsOfSpeech": "Noun",
    "synonyms": "Temperament, nature, personality, character, mood",
    "antonyms": "Attitude shift, disinclination",
    "englishMeaning": "A person's inherent qualities of mind and character; natural temperament.",
    "exampleSentence": "Her cheerful, sunny disposition allowed her to see beauty and wonder in everything.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dinajpur Board Standard"
  },
  {
    "id": "vocab-u1-l3-29",
    "word": "Absent-minded",
    "bengaliMeaning": "অন্যমনস্ক / আনমনা / ভাবুক স্বভাবের",
    "partsOfSpeech": "Adjective",
    "synonyms": "Inattentive, distracted, preoccupied, oblivious, daydreaming",
    "antonyms": "Attentive, alert, focused, mindful, observant",
    "englishMeaning": "Having or showing a habitually forgetful or inattentive disposition.",
    "exampleSentence": "Being delightfully absent-minded gave the child an innocent and endearing charm.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Mymensingh Board Standard"
  },
  {
    "id": "vocab-u1-l3-30",
    "word": "Innocence",
    "bengaliMeaning": "সরলতা / নিষ্পাপতা / সারল্য",
    "partsOfSpeech": "Noun",
    "synonyms": "Naivety, purity, guiltlessness, harmlessness, simplicity",
    "antonyms": "Guilt, culpability, malice, corruption, cunning",
    "englishMeaning": "The state, quality, or fact of being innocent of evil, deceit, or wrongdoing.",
    "exampleSentence": "Her pure innocence and natural curiosity finally found a welcoming home at Tomoe Gakuen.",
    "unit": "Unit 1: Lesson 3 (Children in School)",
    "boardExamTag": "Dhaka Board 1st Paper, Unit 1"
  }
];

// Append to hscVocabularyList in src/data/questions/hscQuestionsData.js
const qPath = './src/data/questions/hscQuestionsData.js';
let qContent = fs.readFileSync(qPath, 'utf8');

const listStartMarker = 'export const hscVocabularyList = [\n';
const listEndMarker = '\n];\n\n// Generates question variations';

const startIdx = qContent.indexOf(listStartMarker);
const endIdx = qContent.indexOf(listEndMarker);

if (startIdx !== -1 && endIdx !== -1) {
  import('../src/data/questions/hscQuestionsData.js').then((m) => {
    // Filter out old unit 1 lesson 3 words if any
    const existingOtherWords = m.hscVocabularyList.filter(w => !w.unit.includes('Unit 1: Lesson 3'));
    const combined = [...existingOtherWords, ...unit1Lesson3Words];

    const formattedAll = combined.map(w => '  ' + JSON.stringify(w, null, 2).replace(/\n/g, '\n  ')).join(',\n');

    let newContent = qContent.slice(0, startIdx + listStartMarker.length) + formattedAll + qContent.slice(endIdx);

    // Ensure prefix generation handles Unit 1 Lesson 3
    newContent = newContent.replace(
      /let prefix = 'hsc-u1-l1-' \+ num;[\s\S]*?if \(item\.unit\.includes\('Unit 1: Lesson 2'\)/,
      `let prefix = 'hsc-u1-l1-' + num;
    if (item.unit.includes('Unit 1: Lesson 3') || item.unit.includes('Children in School')) {
      prefix = 'hsc-u1-l3-' + num;
    } else if (item.unit.includes('Unit 1: Lesson 2')`
    );

    fs.writeFileSync(qPath, newContent, 'utf8');
    console.log(`Successfully updated hscQuestionsData.js with ${combined.length} total words!`);
    console.log(`Unit 1 Lesson 3 added ${unit1Lesson3Words.length} words.`);

    // Update hscUnitsData.js for Unit 1 Lesson 3
    const uPath = './src/data/hscUnitsData.js';
    let uContent = fs.readFileSync(uPath, 'utf8');

    uContent = uContent.replace(
      /id:\s*'unit-1',[\s\S]*?totalWords:\s*\d+,[\s\S]*?lessons:\s*\[\s*\{\s*id:\s*'u1-l1',[\s\S]*?wordsCount:\s*46,[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u1-l2',[\s\S]*?wordsCount:\s*34,[\s\S]*?progress:\s*0\s*\},[\s\S]*?\{\s*id:\s*'u1-l3',[\s\S]*?progress:\s*0\s*\},/,
      `id: 'unit-1',
    number: 1,
    unitNumber: 'Unit 1',
    unitTitle: 'Education and Life',
    unitTitleBn: 'শিক্ষা ও জীবন',
    bgClass: 'bg-[#1b8a43] hover:bg-[#1f9c4c]',
    gradient: 'from-[#1e9649] to-[#146e33]',
    progress: 0,
    totalWords: 110,
    masteredWords: 0,
    lessons: [
      { id: 'u1-l1', number: 'Lesson 1', title: "The Parrot's Tale", titleBn: 'তোতাকাহিনী', questionsCount: '১৮৪ টি প্রশ্ন', wordsCount: 46, progress: 0 },
      { id: 'u1-l2', number: 'Lesson 2', title: 'Education and Technology', titleBn: 'শিক্ষা ও প্রযুক্তি', questionsCount: '১৩৬ টি প্রশ্ন', wordsCount: 34, progress: 0 },
      { id: 'u1-l3', number: 'Lesson 3', title: 'Children in School', titleBn: 'বিদ্যালয়ে শিশু (তোত্তো-চান)', questionsCount: '১২০ টি প্রশ্ন', wordsCount: 30, progress: 0 },`
    );

    fs.writeFileSync(uPath, uContent, 'utf8');
    console.log('Successfully updated hscUnitsData.js for Unit 1 Lesson 3!');
  });
}
