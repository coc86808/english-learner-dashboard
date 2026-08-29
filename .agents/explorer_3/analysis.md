# Comprehensive Audit & Analysis: HSC Vocabulary Entries 105–156 & MCQ Generator Engine

**Author**: `explorer_3` (Read-only Investigation Agent)  
**Target File**: `src/data/questions/hscQuestionsData.js`  
**Related Files**: `src/data/hscUnitsData.js`, `src/components/FlashcardsExplorer.jsx`  
**Audit Scope**: Items 105 to 156 (52 vocabulary words: `vocab-u10-l2-34` to `vocab-u10-46`)  
**Date**: 2026-08-29  

---

## 1. Executive Summary & Audit Statistics

A thorough, line-by-line audit of entries 105 through 156 of `hscVocabularyList` in `src/data/questions/hscQuestionsData.js` was conducted. The audit revealed multiple critical data inaccuracies, part-of-speech mismatches, nonsensical antonyms, typographical redundancies, and a fundamental flaw in the MCQ generator engine `generateHscQuestions()` / `buildQuestionsDatabase()`.

### Key Metrics for Items 105–156:
- **Total Audited Entries**: 52 words (Items 105 to 156)
- **Entries with Fatal / Nonsensical Antonym Errors**: 5 entries (e.g., `Cheek`, `Cue`, `Concerned`, `Gristle`, `Gravy`)
- **Entries with Part-of-Speech (POS) Mismatches**: 6 entries (e.g., `Caveman`, `Trouble`, `Gulp`, `Lack`, `Puff up`, `Nod`)
- **Entries with Typo / Text Redundancies**: 1 entry (`Maintain` duplicate string)
- **Entries Requiring Empty String `""` for Antonyms**: 4 entries (`Cheek`, `Cue`, `Gristle`, `Gravy`)
- **Duplicate Word Detected Across Lessons**: 1 word (`Scatter` at #100 in Unit 10 Lesson 2 and #156 in Unit 10 Lesson 1)
- **MCQ Generator Engine Status**: **Unsafe** — does not check for empty string `""` in `synonyms` or `antonyms`, generating blank MCQ options (`""`) and corrupted distractor arrays.

---

## 2. Detailed Audit Table (Entries 105 to 156)

Below is the complete item-by-item verification against NCTB English For Today textbook context, Google Translate, Cambridge/Oxford English-Bengali dictionaries, and HSC Board Exam standards.

| # | ID | Word | Part of Speech | Current Bengali Meaning | Proposed Accurate Bengali Meaning | Current Synonyms | Proposed Synonyms (HSC Standard) | Current Antonyms | Proposed Antonyms (HSC Standard) | Issues & Rationale |
|---|---|---|---|---|---|---|---|---|---|---|
| **105** | `vocab-u10-l2-34` | **Terribly** | Adverb | চরম / অত্যন্ত / ভীষণভাবে | অত্যন্ত / ভীষণভাবে / প্রচণ্ডভাবে | Very, immensely, extremely, exceedingly | Extremely, Exceedingly, Immensely, Very, Awfully | Slightly, barely, mildly | Slightly, Barely, Mildly, Moderately | Minor polish: "চরম" is an adjective; "অত্যন্ত / ভীষণভাবে / প্রচণ্ডভাবে" are proper adverbs. Primary synonym `Extremely` is Board standard. |
| **106** | `vocab-u10-l2-35` | **Toil** | Noun / Verb | কঠোর পরিশ্রম / অক্লান্ত খাটুনি | কঠোর পরিশ্রম / অক্লান্ত খাটুনি | Hard work, effort, labour, exertion, drudgery | Labour, Hard work, Exertion, Drudgery, Struggle | Laziness, idleness, leisure, relaxation | Idleness, Leisure, Laziness, Rest, Relaxation | In context ("After much toil"): Noun. Set primary synonym to single-word standard `Labour`. Primary antonym: `Idleness`. |
| **107** | `vocab-u10-l2-36` | **Trouble** | Verb / Noun | যন্ত্রণা দেওয়া / কষ্ট দেওয়া / ব্যতিব্যস্ত করা | কষ্ট দেওয়া / বিরক্ত করা / উদ্বিগ্ন করা | Bother, disturb, annoy, afflict, distress | Bother, Disturb, Annoy, Afflict, Distress | Relief, comfort, soothe, calm | Comfort, Soothe, Calm, Assist, Reassure | **POS Mismatch**: `Relief` is a noun, while `Trouble` is used as a verb ("It troubled the man a lot"). Antonym must be verbs (`Comfort, Soothe`). |
| **108** | `vocab-74` | **Initially** | Adverb | শুরুতে / প্রাথমিকভাবে / প্রারম্ভে | শুরুতে / প্রাথমিকভাবে / প্রারম্ভে | At first, Originally, In the beginning, Primarily, Early on | Originally, At first, In the beginning, Primarily | Finally, Ultimately, Eventually, Lastly, In the end | Finally, Ultimately, Eventually, Lastly | Accurate. Set primary synonym to `Originally` or `At first`. |
| **109** | `vocab-75` | **Greet** | Verb | অভিবাদন জানানো / সম্ভাষণ করা / স্বাগত জানানো | অভিবাদন জানানো / সম্ভাষণ করা / স্বাগত জানানো | Welcome, Salute, Hail, Address, Acknowledge | Welcome, Salute, Hail, Address, Acknowledge | Ignore, Overlook, Snub, Avoid, Dismiss | Ignore, Overlook, Snub, Avoid, Dismiss | High Board exam frequency. Clean and accurate. |
| **110** | `vocab-76` | **Cheek** | Noun | গাল / কপোল / মুখের পাশের অংশ | গাল / কপোল | Side of face, Jowl, Jawline | Side of face, Jowl | Forehead, Chin | **`""`** | **Nonsensical Antonym**: Body parts / anatomical nouns do NOT have antonyms (`Forehead, Chin` is absurd). Must set `antonyms: ""`. |
| **111** | `vocab-u10-01` | **Approach** | Noun / Verb | আগমন / দৃষ্টিভঙ্গি / আচরণরীতি | দৃষ্টিভঙ্গি / কর্মপদ্ধতি / আগমন | Attitude, Manner, Advance, Access | Attitude, Method, Manner, Strategy, Advance | Leave, Departure, Retreat | Departure, Retreat, Withdrawal, Avoidance | In context ("A polite approach"): Noun. Current antonym `Leave` is sloppy. Use `Departure, Retreat`. |
| **112** | `vocab-u10-02` | **Arbitrary** | Adjective | অযৌক্তিক / স্বেচ্ছাচারী / খামখেয়ালি | স্বেচ্ছাচারী / খামখেয়ালি / অযৌক্তিক | Unreasonable, Illogical, Random, Whimsical | Random, Whimsical, Unreasonable, Capricious, Illogical | Rational, Reasoned, Logical, Systematic | Rational, Logical, Reasoned, Systematic | Accurate. Primary synonym `Random` or `Whimsical` matches Board exam usage. |
| **113** | `vocab-u10-03` | **Bother** | Verb | বিরক্ত করা / দুশ্চিন্তাগ্রস্ত করা | বিরক্ত করা / কষ্ট দেওয়া / ব্যতিব্যস্ত করা | Trouble, Disturb, Annoy, Irritate, Pester | Trouble, Disturb, Annoy, Irritate, Pester | Comfort, Please, Soothe, Reassure | Comfort, Please, Soothe, Reassure | Accurate verbs. |
| **114** | `vocab-u10-04` | **Caveman** | Noun | গুহা-মানব / আদিম বর্বর মানুষ | গুহামানব / আদিম মানুষ | Primitive, Brutal, Cave-dweller, Barbarian | Cave-dweller, Barbarian, Troglodyte, Primitive human | Civilized, Cultured, Modern human | Modern human, Civilized person, Gentleman | **POS Mismatch**: `Primitive, Brutal` and `Civilized, Cultured` are adjectives for a noun headword. Corrected to nouns. |
| **115** | `vocab-u10-05` | **Cheer** | Noun / Verb | শুভকামনা ব্যক্ত করা / উল্লাস প্রকাশ | উল্লাস / আনন্দ / শুভকামনা | Salutation, Applause, Joy, Exultation | Joy, Happiness, Merriment, Exultation, Good spirits | Gloom, Disapproval, Sorrow | Gloom, Sadness, Sorrow, Melancholy, Despair | In context ("good cheer"): Noun. Replaced verbal phrases with standard nouns. |
| **116** | `vocab-u10-06` | **Chew** | Verb | চিবানো / খাদ্য চর্বণ করা | চিবানো / চর্বণ করা | Masticate, Munch, Bite, Crunch | Masticate, Munch, Crunch, Grind | Swallow whole, Gulp | Swallow whole, Gulp, Swallow | Accurate. |
| **117** | `vocab-u10-07` | **Chomp** | Verb | শব্দ করে কিছু চিবানো | শব্দ করে চিবানো / মচমচ করে চিবানো | Bite, Chew noisily, Munch, Crunch | Munch, Crunch, Chew noisily, Bite | Sip, Nibble gently | Nibble, Sip | Accurate. Primary synonym `Munch` / `Crunch`. |
| **118** | `vocab-u10-08` | **Civilized** | Adjective | সভ্য / মার্জিত / সুসংস্কৃত | সভ্য / মার্জিত / সুসংস্কৃত | Courteous, Enlightened, Refined, Cultured, Polite | Refined, Cultured, Enlightened, Polite, Courteous | Uncivilized, Savage, Barbaric, Rude | Barbaric, Savage, Uncivilized, Primitive | Accurate. |
| **119** | `vocab-u10-09` | **Claim** | Verb / Noun | দাবি করা / ঘোষণা দেওয়া | দাবি করা / ঘোষণা দেওয়া / অভিমত প্রকাশ করা | Declare, Assert, Maintain, State | Assert, Declare, State, Maintain, Profess | Disclaim, Deny, Renounce | Deny, Disclaim, Renounce, Disavow | In context: Verb ("Anthropologists claim that..."). Primary synonym: `Assert`. |
| **120** | `vocab-u10-10` | **Concerned** | Adjective | উদ্বিগ্ন / চিন্তিত / সহানুভূতিশীল | উদ্বিগ্ন / চিন্তিত / যত্নবান | Disturbed, Anxious, Mindful, Caring | Anxious, Worried, Caring, Attentive, Apprehensive | Fascinated, Unconcerned, Carefree, Indifferent | Unconcerned, Indifferent, Carefree, Apathetic | **FATAL ERROR**: Current primary antonym is `Fascinated`! Fascinated has no antonymic relationship with Concerned. Replaced with `Unconcerned`. |
| **121** | `vocab-u10-11` | **Conscientious** | Adjective | বিবেকবুদ্ধিপূর্ণ / নিষ্ঠাবান / অত্যন্ত সতর্ক | বিবেকবান / নিষ্ঠাবান / অতীব যত্নবান | Diligent, Careful, Dedicated, Meticulous, Scrupulous | Meticulous, Scrupulous, Diligent, Careful, Dedicated | Unconcerned, Relaxed, Careless, Irresponsible | Careless, Irresponsible, Negligent, Slack | Set primary antonym to direct Board standard `Careless`. |
| **122** | `vocab-u10-12` | **Considerate** | Adjective | সহানুভূতিশীল / সুবিবেচক / অন্যের প্রতি মনোযোগী | সুবিবেচক / অন্যের প্রতি যত্নবান / সহানুভূতিশীল | Concerned, Mindful, Thoughtful, Attentive, Kind | Thoughtful, Mindful, Attentive, Kind, Caring | Inconsiderate, Careless, Thoughtless, Selfish | Inconsiderate, Thoughtless, Selfish, Unkind | Primary synonym: `Thoughtful`. Primary antonym: `Inconsiderate`. |
| **123** | `vocab-u10-13` | **Consider** | Verb | বিবেচনা করা / ভেবে দেখা | বিবেচনা করা / ভেবে দেখা / গণ্য করা | Ponder, Think about, Deliberate, Contemplate | Contemplate, Deliberate, Ponder, Regard, Deem | Disregard, Ignore, Overlook | Ignore, Disregard, Overlook, Dismiss | Accurate verbs. |
| **124** | `vocab-u10-14` | **Conversation** | Noun | কথোপকথন / আলাপচারিতা | কথোপকথন / আলাপচারিতা | Discussion, Talk, Dialogue, Chat, Discourse | Dialogue, Discussion, Talk, Chat, Discourse | Silence, Speechlessness | Silence, Speechlessness, Taciturnity | Accurate. |
| **125** | `vocab-u10-15` | **Cue** | Noun | ইঙ্গিত / সংকেত / সূত্র | ইঙ্গিত / সংকেত / সূত্র | Hint, Signal, Prompt, Clue, Reminder | Signal, Hint, Prompt, Clue, Sign | Nowhere, Blindness | **`""`** | **FATAL ERROR**: Current antonym is `Nowhere, Blindness` (`Nowhere` is completely nonsensical). A cue has no direct opposite noun. Set `antonyms: ""`. |
| **126** | `vocab-u10-16` | **Discreetly** | Adverb | সতর্কভাবে / বিচক্ষণতার সাথে / সাবধানে | সতর্কভাবে / বিচক্ষণতার সাথে / সাবধানে | Carefully, Cautiously, Tactfully, Prudently | Tactfully, Prudently, Cautiously, Carefully | Incautiously, Rashly, Recklessly, Blatantly | Indiscreetly, Blatantly, Recklessly, Rashly | Primary antonym set to direct morphological antonym `Indiscreetly`. |
| **127** | `vocab-u10-17` | **Disgusted** | Adjective | নিদারুণ বিরক্ত / ক্ষুব্ধ / অসন্তুষ্ট | নিদারুণ বিরক্ত / বিতৃষ্ণ / অসন্তুষ্ট | Repelled, Revolted, Sickened, Offended | Repelled, Revolted, Sickened, Appalled, Offended | Pleased, Delighted, Satisfied | Delighted, Pleased, Gratified, Charmed | Accurate. |
| **128** | `vocab-u10-18` | **Edge** | Noun | কিনারা / প্রান্তসীমা | কিনারা / প্রান্ত / ধার | Side, Border, Rim, Margin, Brink | Border, Rim, Margin, Brink, Boundary | Middle, Center, Interior | Center, Middle, Interior | Primary synonym `Border`, primary antonym `Center`. |
| **129** | `vocab-u10-19` | **Entire** | Adjective | সম্পূর্ণ / সমগ্র / পুরো | সম্পূর্ণ / সমগ্র / পুরো | Whole, Complete, Total, Full, Absolute | Whole, Complete, Total, Full, Absolute | Partial, Incomplete, Fragmented | Partial, Incomplete, Fractional | Accurate. |
| **130** | `vocab-u10-20` | **Frequently** | Adverb | বারংবার / পুনঃপুনঃ / ঘনঘন | বারবার / পুনঃপুনঃ / ঘনঘন / প্রায়শই | Often, Regularly, Repeatedly, Recurrently | Often, Regularly, Repeatedly, Recurrently | Rarely, Seldom, Infrequently | Rarely, Seldom, Infrequently, Occasionally | Accurate. |
| **131** | `vocab-u10-21` | **Firm** | Adjective | দৃঢ় / শক্তপোক্ত / সুদৃঢ় | দৃঢ় / শক্ত / মজবুত | Strong, Stable, Solid, Resolute, Sturdy | Solid, Strong, Resolute, Sturdy, Stable | Soft, Light, Weak, Flexible | Weak, Soft, Loose, Flexible, Feeble | Primary antonym: `Weak`. |
| **132** | `vocab-u10-22` | **Gristle** | Noun | নরম হাড় / তরুণাস্থি | তরুণাস্থি / চিবানো যায় না এমন নরম হাড় | Cartilage, Tough connective tissue | Cartilage | Tender meat, Soft flesh | **`""`** | **Nonsensical Antonym**: `Tender meat, Soft flesh` is not an antonym. Cartilage / tissue has no direct opposite. Set `antonyms: ""`. |
| **133** | `vocab-u10-23` | **Grab** | Verb | কোন কিছু আঁকড়ে ধরা বা টেনে নেওয়া | ছোঁ মেরে নেওয়া / আঁকড়ে ধরা / কেড়ে নেওয়া | Grasp, Seize, Clutch, Snatch, Take | Seize, Grasp, Snatch, Clutch | Throw, Release, Drop, Let go | Release, Let go, Drop, Relinquish | Current primary antonym `Throw` is inaccurate (opposite of grab is release/let go). Corrected to `Release`. |
| **134** | `vocab-u10-24` | **Gravy** | Noun | ঝোল / খাবারের সুস্বাদু রস | ঝোল / মাংসের রস থেকে তৈরি সুস্বাদু সস | Seasoning, Sauce, Broth, Meat juices | Sauce, Broth, Meat juices, Dressing | Dry seasoning | **`""`** | **Nonsensical Antonym & Bad Synonym**: `Seasoning` means spices (not gravy); `Dry seasoning` as antonym is invalid. Gravy is a culinary noun. Set `antonyms: ""`. |
| **135** | `vocab-u10-25` | **Gulp** | Verb / Noun | এক ঢোকে গলাধঃকরণ / দ্রুত গিলে ফেলা | দ্রুত গিলে ফেলা / ঢকঢক করে গেলা | Mouthful, Swallow, Guzzle, Quaff | Swallow, Guzzle, Quaff, Drink hastily | Sip, Nibble, Taste slowly | Sip, Nibble, Taste slowly | **POS Mismatch**: `Mouthful` is a noun, but `Gulp` is used as a verb ("to gulp drinks hastily"). Primary synonym must be `Swallow`. |
| **136** | `vocab-u10-26` | **Habitual** | Adjective | নিয়মিত / স্বভাবগত / সচরাচর ঘটা | স্বভাবগত / অভ্যাসগত / নিয়মিত | Common, Regular, Typical, Customary, Routine | Customary, Routine, Regular, Usual, Chronic | Irregular, Occasional, Rare, Unaccustomed | Occasional, Rare, Infrequent, Unusual, Irregular | Primary synonym: `Customary`. |
| **137** | `vocab-u10-27` | **Hugging** | Noun / Participle | দৃঢ় আলিঙ্গন / বুকে জড়িয়ে ধরা | আলিঙ্গন করা / বুকে জড়িয়ে ধরা | Embracing, Cuddling, Clasping, Enfolding | Embracing, Clasping, Enfolding, Cuddling | Releasing, Pushing away, Shunning | Releasing, Pushing away, Shunning | Accurate. Primary synonym `Embracing`. |
| **138** | `vocab-u10-28` | **Host** | Noun | নিমন্ত্রণকর্তা / মেজবান / গৃহকর্তা | নিমন্ত্রণকর্তা / মেজবান / গৃহকর্তা | Party-giver, Entertainer, Master of ceremonies | Entertainer, Party-giver, Master of ceremonies | Guest, Visitor, Invitee | Guest, Visitor, Invitee | Accurate. |
| **139** | `vocab-u10-29` | **Identify** | Verb | শনাক্ত করা / চিহ্নিত করা | শনাক্ত করা / চিহ্নিত করা / চিনে নেওয়া | Point out, Discover, Recognize, Distinguish, Spot | Recognize, Distinguish, Spot, Discern, Determine | Conceal, Hide, Mistake, Confuse | Mistake, Confuse, Misidentify, Overlook | Primary synonym changed from phrasal `Point out` to Board standard `Recognize`. Antonyms updated to true cognitive opposites (`Mistake, Confuse`). |
| **140** | `vocab-u10-30` | **Inadvertently** | Adverb | অসাবধানতাবশত / অনিচ্ছাকৃতভাবে | অসাবধানতাবশত / অনিচ্ছাকৃতভাবে / ভুলবশত | Accidentally, Unintentionally, Unwittingly, Involuntarily | Accidentally, Unintentionally, Unwittingly, Involuntarily | Intentionally, Deliberately, Purposefully | Intentionally, Deliberately, Purposefully, Consciously | Accurate adverbs. |
| **141** | `vocab-u10-31` | **Indicate** | Verb | ইঙ্গিত দেওয়া / নির্দেশ করা | নির্দেশ করা / ইঙ্গিত দেওয়া / প্রকাশ করা | Point out, Signal, Suggest, Show, Signify | Signal, Show, Suggest, Signify, Point out | Mislead, Obscure, Conceal | Conceal, Hide, Obscure, Mislead | Primary synonym: `Signal` or `Show`. |
| **142** | `vocab-u10-32` | **Indication** | Noun | ইঙ্গিত / নির্দেশক সংকেত | ইঙ্গিত / নির্দেশক সংকেত / লক্ষণ | Signal, Hint, Clue, Sign, Marker | Sign, Signal, Hint, Clue, Symptom | Misdirection, Misguidance | Misdirection, Misguidance, Concealment | Accurate nouns. |
| **143** | `vocab-u10-33` | **Insistent** | Adjective | জেদকারী / নাছোড়বান্দা / অবিচল | নাছোড়বান্দা / অবিচল / দৃঢ়প্রতিজ্ঞ | Adamant, Persistent, Firm, Unyielding, Tenacious | Persistent, Adamant, Firm, Tenacious, Unyielding | Undemanding, Yielding, Flexible, Compliant | Yielding, Flexible, Compliant, Undemanding | Primary synonym: `Persistent`. Primary antonym: `Yielding`. |
| **144** | `vocab-u10-34` | **Lack** | Verb / Noun | অভাব থাকা / ঘাটতি হওয়া | ঘাটতি / অভাব / অপর্যাপ্ততা | Need, Require, Scarcity, Deficiency, Shortage | Shortage, Deficiency, Scarcity, Dearth, Absence | Possess, Own, Abundance, Plenty | Abundance, Plenty, Sufficiency, Surplus | **POS Mismatch**: Context ("A lack of cultural awareness") is a Noun. Current lists verb synonyms `Need, Require` and verb antonyms `Possess, Own`. Corrected to pure noun sets. |
| **145** | `vocab-u10-35` | **Lean** | Verb | হেলান বা ঠেস দিয়ে বসা | হেলান দেওয়া / কাত হওয়া / ঝুঁকে পড়া | Bend, Sway, Incline, Slouch, Rest against | Incline, Bend, Tilt, Slouch, Rest against | Stand-up, Sit up, Straighten | Straighten, Stand upright, Sit up | Primary synonym `Incline`. |
| **146** | `vocab-u10-36` | **Maintain** | Verb | বজায় রাখা / সংরক্ষণ করা / বজায় রাখা | বজায় রাখা / সংরক্ষণ করা / অব্যাহত রাখা | Continue, Keep, Carry on, Sustain, Preserve | Sustain, Preserve, Keep, Continue, Uphold | Break-off, Discontinue, Abandon, Neglect | Discontinue, Abandon, Neglect, Drop | **Typo / Redundancy**: Current Bengali text repeats "বজায় রাখা" twice. Corrected. Primary synonym: `Sustain`. |
| **147** | `vocab-u10-37` | **Messy** | Adjective | অপরিষ্কার / অগোছালো / অপরিচ্ছন্ন | অগোছালো / অপরিষ্কার / নোংরা | Untidy, Dirty, Disordered, Chaotic, Sloppy | Untidy, Disordered, Dirty, Sloppy, Chaotic | Clean, Organized, Neat, Tidy | Neat, Tidy, Clean, Organized, Orderly | Primary antonym: `Neat`. |
| **148** | `vocab-u10-38` | **Nod** | Verb / Noun | মাথা নাড়ানো বা দোলানো / সম্মতির সংকেত | মাথা নেড়ে সম্মতি দেওয়া / মাথা ঝুঁকানো | Greet, Signal, Gesture, Incline head, Bow | Incline head, Bow, Signal, Gesture, Acknowledge | Recede, Shake head, Refuse | Shake head, Refuse, Disagree | **Nonsensical Antonym**: `Recede` (which means move back/retreat) is completely invalid. Replaced with `Shake head`. |
| **149** | `vocab-u10-39` | **Offend** | Verb | অসন্তুষ্ট করা / আঘাত দেওয়া / অনুভূতিতে আঘাত করা | অসন্তুষ্ট করা / অপমানিত করা / ক্ষুব্ধ করা | Displease, Aggravate, Insult, Upset, Hurt | Insult, Displease, Upset, Affront, Hurt | Please, Delight, Charm, Gratify | Please, Delight, Gratify, Charm, Flatter | Primary synonym: `Insult` or `Displease`. |
| **150** | `vocab-u10-40` | **Posture** | Noun | দেহ ভঙ্গি / অঙ্গভঙ্গি / শারীরিক বসার ধরন | দেহভঙ্গি / অঙ্গভঙ্গি / শারীরিক অবস্থান | Position, Pose, Stance, Bearing, Carriage | Stance, Bearing, Pose, Position, Carriage | Slouching, Deformity | Slouching, Deformity | Accurate. |
| **151** | `vocab-u10-41` | **Potential** | Adjective / Noun | সম্ভাব্য / সুপ্ত সম্ভাবনাযুক্ত | সম্ভাব্য / সুপ্ত / ভবিষ্যৎ সম্ভাবনাপূর্ণ | Promising, Aspiring, Possible, Latent, Likely | Possible, Prospective, Latent, Probable, Likely | Unpromising, Impossible, Improbable | Impossible, Improbable, Actual, Unlikely | In context ("potential embarrassment"): Adjective. Primary synonym: `Possible`. Primary antonym: `Impossible`. |
| **152** | `vocab-u10-42` | **Puff up** | Verb phrase | ফুলে যাওয়া / গর্বে ফেঁপে ওঠা | ফুলে ওঠা / ফেঁপে ওঠা / স্ফীত হওয়া | Bulk, Inflate, Swell, Expand, Bloat | Inflate, Swell, Expand, Bloat | Squeeze, Deflate, Shrink, Compress | Deflate, Shrink, Compress, Flatten | **POS / Semantic Mismatch**: Current primary synonym `Bulk` is awkward/noun; current primary antonym `Squeeze` is not the direct opposite. Corrected to `Inflate` (syn) and `Deflate` (ant). |
| **153** | `vocab-u10-43` | **Quietly** | Adverb | শান্তভাবে / নীরবে / নিঃশব্দে | নীরবে / শান্তভাবে / নিঃশব্দে | Silently, Softly, Calmly, Peacefully, Inaudibly | Silently, Softly, Calmly, Inaudibly, Peacefully | Loudly, Noisily, Boisterously | Loudly, Noisily, Boisterously, Clamorously | Primary synonym: `Silently`. Primary antonym: `Loudly`. |
| **154** | `vocab-u10-44` | **Refinement** | Noun | শিষ্টাচার / সুরুচি / মার্জিত স্বভাব | মার্জিত রূপ / সুরুচি / শিষ্টাচার / পরিশুদ্ধতা | Politeness, Sophistication, Elegance, Cultivation | Sophistication, Elegance, Politeness, Cultivation, Polish | Rudeness, Vulgarity, Coarseness | Vulgarity, Coarseness, Rudeness, Crudeness | Primary synonym: `Sophistication`. Primary antonym: `Vulgarity`. |
| **155** | `vocab-u10-45` | **Refuse** | Verb | অসম্মত হওয়া / প্রত্যাখ্যান করা / বর্জন করা | প্রত্যাখ্যান করা / অসম্মত হওয়া / নাকচ করা | Reject, Deny, Decline, Turn down, Spurn | Decline, Reject, Turn down, Spurn, Deny | Accept, Grant, Agree, Receive | Accept, Agree, Receive, Consent | Primary synonym: `Decline`. Primary antonym: `Accept`. |
| **156** | `vocab-u10-46` | **Scatter** | Verb | ছড়ানো / ইতস্তত ছড়িয়ে দেওয়া | ছড়িয়ে দেওয়া / ছিটানো / ইতস্তত বিক্ষিপ্ত করা | Disperse, Dissipate, Strew, Spread, Sprinkle | Disperse, Spread, Strew, Sprinkle, Dissipate | Collect, Gather, Assemble, Concentrate | Gather, Collect, Assemble, Concentrate | **Duplicate Entry**: Note that `Scatter` also appears at #100 (`vocab-u10-l2-29`) in Unit 10 Lesson 2. Standardized for Lesson 1 context. |

---

## 3. Detailed Breakdown of High-Severity Issues & Anomalies

### Issue A: Nonsensical & Unscientific Antonyms
1. **`Cheek` (Item 110)**: Current antonyms are `"Forehead, Chin"`. Anatomical body parts do not possess polar opposites. A student faced with an MCQ asking *"What is the opposite of Cheek?"* with answer *"Forehead"* will learn invalid linguistic concepts. **Remedy**: `antonyms: ""` and safely skip Antonym MCQ generation.
2. **`Cue` (Item 125)**: Current antonyms are `"Nowhere, Blindness"`. `"Nowhere"` is an adverb/pronoun of place, not an opposite of the noun `"Cue"` (a prompt or hint). **Remedy**: `antonyms: ""` and skip Antonym MCQ generation.
3. **`Gristle` (Item 132)**: Current antonyms are `"Tender meat, Soft flesh"`. Gristle is cartilage tissue in meat. It has no antonym. **Remedy**: `antonyms: ""` and skip Antonym MCQ generation.
4. **`Gravy` (Item 134)**: Current antonym is `"Dry seasoning"`. Gravy is a sauce made from meat juices. Food items do not have antonyms. **Remedy**: `antonyms: ""` and skip Antonym MCQ generation.
5. **`Concerned` (Item 120)**: Current primary antonym is `"Fascinated"`. In the MCQ generator, option 0 for Antonym becomes `"Fascinated"`, which is completely incorrect (`Unconcerned` or `Indifferent` is required).

### Issue B: Parts of Speech (POS) Mismatches
1. **`Caveman` (Item 114)**: The word is a Noun. Synonyms listed `Primitive, Brutal` (adjectives), and antonyms listed `Civilized, Cultured` (adjectives).
2. **`Trouble` (Item 107)**: Used as a Verb in context (`"It troubled the man a lot"`). Antonym listed `Relief` (noun) as primary. Must be `Comfort` or `Soothe` (verbs).
3. **`Gulp` (Item 135)**: Used as a Verb (`"to gulp drinks hastily"`). Primary synonym listed `Mouthful` (noun). Must be `Swallow` or `Guzzle` (verbs).
4. **`Lack` (Item 144)**: Used as a Noun (`"A lack of cultural awareness"`). Synonyms mixed verbs `Need, Require` with nouns `Scarcity, Deficiency`. Antonyms mixed verbs `Possess, Own` with nouns `Abundance, Plenty`.
5. **`Puff up` (Item 152)**: Phrasal verb. Primary synonym listed `Bulk` (noun/adjective) and primary antonym `Squeeze` (action of pressing, not opposite of swelling).

### Issue C: Redundant Text & Formatting
1. **`Maintain` (Item 146)**: Bengali meaning contains duplicate string: `"বজায় রাখা / সংরক্ষণ করা / বজায় রাখা"`.

---

## 4. Comprehensive Analysis of MCQ Generator `generateHscQuestions()`

### Current Engine Vulnerabilities (`src/data/questions/hscQuestionsData.js` lines 1885–2020)

```javascript
// CURRENT CODE:
const primarySyn = item.synonyms.split(',')[0].trim();
const primaryAnt = item.antonyms.split(',')[0].trim();

// 1. SYNONYM QUESTION (Unconditionally generated!)
list.push({
  id: prefix + '-syn',
  ...
  options: [primarySyn, primaryAnt, distractorWord1, distractorWord2],
  correctOption: 0,
  ...
});

// 2. ANTONYM QUESTION (Unconditionally generated!)
list.push({
  id: prefix + '-ant',
  ...
  options: [primaryAnt, primarySyn, distractorWord1, distractorWord2],
  correctOption: 0,
  ...
});
```

### Why This Fails:
1. **Empty String Generation**: If `item.antonyms` is `""`, `primaryAnt` is `""`. An Antonym question is generated where option 0 is `""`, and the question asks: *"What is the ANTONYM (Opposite) of the word 'Cheek'?"* with answer `""`.
2. **Corrupted Distractor Array in Synonym Questions**: If `item.antonyms` is `""`, then in the Synonym question, `options: [primarySyn, primaryAnt, distractorWord1, distractorWord2]` produces `options: ["Side of face", "", "Distractor1", "Distractor2"]` — Option B is a blank string!
3. **Safe Skip Contract Violation**: The system must only push a question if the target field is non-empty, and ensure all 4 options are populated with valid non-empty distractors.

### Proposed Engine Fix (`proposed_buildQuestionsDatabase`):

```javascript
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
```

---

## 5. Curriculum & Component Synchronization Impact

### Impact on `src/data/hscUnitsData.js`:
- Unit 10: Lesson 1 has 74 words.
- If 4 words (`Cheek`, `Cue`, `Gristle`, `Gravy`) have `antonyms: ""` and 0 skipped synonyms/meanings:
  - Unit 10: Lesson 1 questions count = `74 * 4 - 4 = 292` questions.
  - In `src/data/hscUnitsData.js`, `questionsCount` for `u10-l1` changes from `'২৯৬ টি প্রশ্ন'` to `'২৯২ টি প্রশ্ন'` (or whatever exact number of questions is generated).
  - Unit 1: Lesson 1: 46 words = 184 questions (`'১৮৪ টি প্রশ্ন'`).
  - Unit 10: Lesson 2: 36 words = 144 questions (`'১৪৪ টি প্রশ্ন'`).
- Total words across the application remain `156 Words` (`totalWords: 156`).
- Total Mastered/Active Question count changes from `624` to `620` (or dynamically computed).

### Impact on `src/components/FlashcardsExplorer.jsx`:
- Word counts in the dropdown `<option>` tags are based on `wordsCount` (46, 74, 36, 156), which remain completely unchanged because all 156 words remain active in the curriculum.

---

## 6. Proposed Exact Replacement Objects (Items 105–156)

```javascript
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
```
