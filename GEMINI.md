# Antigravity Pair-Programming & HSC MCQ Rules

## 1. User Profile & Telegram Notifications
- **Telegram Bot Token**: `8881426939:AAETXYAJFY2szUoWoam7mlntbqvbP0L0-5o`
- **Telegram Username**: `@sakin7112`
- **Telegram Bot**: `@sdsdbvshvbot`
- **Rule Change Notification Action**: Whenever rules are added, modified, or updated, immediately dispatch a notification summary to the user's Telegram via `node scripts/notifyTelegram.mjs`.

## 2. Vocabulary & MCQ Ingestion Rules
Whenever the user uploads or provides vocabulary (via photo or text):
1. **Deduplication Check (Mandatory)**:
   - Check if each word is ALREADY present in `src/data/questions/hscQuestionsData.js`.
   - If a word was already added before, explicitly notify the user:
     *"You have already added the word '[Word]' before."*
2. **Dual Addition (Vocabulary + MCQ)**:
   - Every single word provided by the user MUST be added to `hscVocabularyList` in `src/data/questions/hscQuestionsData.js` with:
     - Exact Bengali meaning from the textbook.
     - Primary and secondary synonyms.
     - Primary and secondary antonyms.
     - Concise English definition.
     - Example sentence matching curriculum context.
     - Board Exam tag.
   - The engine automatically generates **Board-Standard MCQs** per word in the 4 formats:
     - 🔄 **Synonym Question**
     - 🔀 **Antonym Question**
     - 📖 **English Definition Question**
     - 🇧🇩 **Bangla Meaning Question**
   - **Conditional MCQ Skipping Rule (Mandatory)**:
     - If a word does NOT have any synonyms (empty, blank, "-", "None"), skip the Synonym MCQ for that word only.
     - If a word does NOT have any antonyms (empty, blank, "-", "None"), skip the Antonym MCQ for that word only.
     - Never generate artificial, placeholder, or bogus questions/distractors for missing synonyms or antonyms.
3. **Curriculum & Explorer Synchronization**:
   - Update `totalWords` and `wordsCount` in `src/data/hscUnitsData.js`.
   - Update `questionsCount` (wordsCount × 4) in Bengali numerals in `src/data/hscUnitsData.js`.
   - Update word count options in `src/components/FlashcardsExplorer.jsx`.
   - Run `npm run build` to verify clean build with 0 errors.

## 3. Persistent Memory Reminders
- Review and apply these rules on every task involving vocabulary, MCQs, or curriculum additions.

## 4. User Authentication & Authorization Rules
1. **Master Admin Credentials & Aliases**:
   - Master Admin Emails/Usernames: `sakin@gmail.com`, `sakin7112`, `sakinadmin`, `admin@learnerhub.com`, `admin`.
   - Master Admin Passwords: `AdminHSC@2026!`, `Abc@#123`, `Z%#91V4PrG`.
   - Logging in with any of these credentials in the standard login form unlocks full `role: 'admin'` Master Admin access.
2. **Student Authentication & Authorization**:
   - Mandatory registration for new students (Full Name, College, Email/Phone, Password).
   - Only registered students with correct passwords can log in.
   - Master Admin has 1-click Account Authorization controls (Authorize / Approve, Ban, Role Switch, Password Reset) in the Admin Panel.

## 5. Automatic Weak Word & Mastery Rules
1. **3 Mistakes Threshold (Auto Weak Word)**:
   - If a student makes a mistake on the **same word 3 times in MCQ**, that word is automatically flagged as a **Weak Word** and added to the student's `weakWords` list and saved in storage/cloud.
2. **5 Correct Answers Threshold (Auto Mastery / Recovery)**:
   - If a student answers that word correctly **5 times in MCQ**, the word is automatically **removed from Weak Words** (marked as Mastered/Recovered) and cleared from the weak word queue.

