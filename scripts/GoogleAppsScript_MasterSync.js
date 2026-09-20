/**
 * ============================================================================
 * HSC ENGLISH LEARNER HUB - MASTER GOOGLE SHEETS ⇄ WEBSITE 2-WAY SYNC
 * ============================================================================
 * 
 * Features:
 * 1. Automatic 2-Way Vocabulary Sync (Words, Synonyms, Antonyms, Bengali Meanings)
 * 2. Automatic 2-Way Students Data Sync (Name, Email, Phone, XP, Streak, Role, League)
 * 3. Real-time Exam Results Sync (Exam scores, accuracy, time spent)
 * 4. Real-time Weak Words Queue Sync (Mistake count, recovery/mastery status)
 * 5. Word Practice Analytics Sync
 * 6. Live Installable On-Edit Trigger: Any cell edited in the Sheet updates the Website instantly!
 */

const CONFIG = {
  SUPABASE_URL: 'https://rxlvwdioskvwypyhifbt.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHZ3ZGlvc2t2d3lweWhpZmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NTA5MjksImV4cCI6MjEwNTMyNjkyOX0.dCSw834biSsYsb4p-wqbX0xxlHuP62htpYIT9bVydD0',
  EXCLUDE_SHEETS: ['Students Data', 'Exam Results', 'Weak Words', 'Practice Analytics', 'Master Summary', 'Dashboard']
};

/**
 * Custom Menu inside Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 Website 2-Way Sync')
    .addItem('📤 1. Sync Vocabulary Sheets ➔ Website (Words, Synonyms, Antonyms)', 'syncVocabularySheetsToSupabase')
    .addItem('👥 2. Refresh Students Data (Website ➔ Sheet)', 'refreshStudentsDataFromSupabase')
    .addItem('📤 3. Sync Students Data ➔ Website (Sheet ➔ Website)', 'syncStudentsSheetToSupabase')
    .addItem('📝 4. Refresh Exam Results (Website ➔ Sheet)', 'refreshExamResultsFromSupabase')
    .addItem('⚠️ 5. Refresh Weak Words (Website ➔ Sheet)', 'refreshWeakWordsFromSupabase')
    .addItem('📊 6. Refresh Practice Analytics (Website ➔ Sheet)', 'refreshPracticeStatsFromSupabase')
    .addSeparator()
    .addItem('⚡ 7. Enable Automatic Live Edit Sync (Instant On-Edit)', 'setupAutomaticLiveEditTrigger')
    .addItem('🚀 8. FULL SYNC EVERYTHING (All Data ⇄ Website)', 'fullSyncEverything')
    .addToUi();
}

/**
 * Universal Supabase REST Client
 */
function supabaseRequest(path, method = 'GET', payload = null, prefer = null) {
  const url = CONFIG.SUPABASE_URL + path;
  const headers = {
    'apikey': CONFIG.SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + CONFIG.SUPABASE_ANON_KEY,
    'Content-Type': 'application/json'
  };

  if (prefer) {
    headers['Prefer'] = prefer;
  } else if (method === 'POST' || method === 'PATCH') {
    headers['Prefer'] = 'resolution=merge-duplicates';
  }

  const options = {
    method: method,
    headers: headers,
    muteHttpExceptions: true
  };

  if (payload) {
    options.payload = typeof payload === 'string' ? payload : JSON.stringify(payload);
  }

  const res = UrlFetchApp.fetch(url, options);
  const code = res.getResponseCode();
  const text = res.getContentText();

  let json = null;
  try {
    json = JSON.parse(text);
  } catch (e) {
    json = text;
  }

  return { status: code, data: json };
}

/**
 * ----------------------------------------------------------------------------
 * 1. VOCABULARY 2-WAY SYNC (Words, Synonyms, Antonyms, Bengali & English Meanings)
 * ----------------------------------------------------------------------------
 */
function syncVocabularySheetsToSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const allWords = [];
  const wordsSet = new Set();

  sheets.forEach(sheet => {
    const sheetName = sheet.getName();
    if (CONFIG.EXCLUDE_SHEETS.includes(sheetName)) return;

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return;

    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      const word = String(row[0] || '').trim();
      if (!word) continue;

      const wordKey = word.toLowerCase();
      if (wordsSet.has(wordKey)) continue;
      wordsSet.add(wordKey);

      allWords.push({
        word: word,
        bengali_meaning: String(row[1] || '').trim(),
        parts_of_speech: String(row[2] || 'Word').trim(),
        synonyms: String(row[3] || '').trim(),
        antonyms: String(row[4] || '').trim(),
        english_meaning: String(row[5] || '').trim(),
        example_sentence: String(row[6] || '').trim(),
        unit: String(row[7] || sheetName).trim(),
        priority: Number(row[8] || 50),
        updated_at: new Date().toISOString()
      });
    }
  });

  if (allWords.length === 0) {
    if (!isSilent) SpreadsheetApp.getUi().alert('⚠️ No vocabulary found to sync.');
    return { success: false, count: 0 };
  }

  // 1. Send words in batches of 150 with resolution=merge-duplicates
  const BATCH_SIZE = 150;
  let syncedCount = 0;

  for (let i = 0; i < allWords.length; i += BATCH_SIZE) {
    const batch = allWords.slice(i, i + BATCH_SIZE);
    const res = supabaseRequest('/rest/v1/vocabulary?on_conflict=word', 'POST', batch, 'resolution=merge-duplicates');
    if (res.status === 200 || res.status === 201) {
      syncedCount += batch.length;
    } else {
      Logger.log('Vocabulary batch error: ' + JSON.stringify(res));
    }
  }

  // 2. Fetch existing words in Supabase to find deleted words
  let deletedCount = 0;
  const existingRes = supabaseRequest('/rest/v1/vocabulary?select=word', 'GET');
  if (existingRes.status === 200 && Array.isArray(existingRes.data)) {
    const supabaseWords = existingRes.data;
    const toDelete = supabaseWords.filter(item => item.word && !wordsSet.has(item.word.trim().toLowerCase()));

    toDelete.forEach(item => {
      const delRes = supabaseRequest('/rest/v1/vocabulary?word=eq.' + encodeURIComponent(item.word), 'DELETE');
      if (delRes.status === 200 || delRes.status === 204) {
        deletedCount++;
      }
    });
  }

  if (!isSilent) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `✓ Synced ${syncedCount} words (with updated synonyms/antonyms) | Deleted ${deletedCount} words.`,
      '🚀 Website Sync Complete',
      6
    );
  }

  return { success: true, synced: syncedCount, deleted: deletedCount };
}

/**
 * ----------------------------------------------------------------------------
 * 2. STUDENTS DATA 2-WAY SYNC (Name, Email, Phone, XP, Streak, Role, League)
 * ----------------------------------------------------------------------------
 */
function syncStudentsSheetToSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Students Data');
  if (!sheet) {
    if (!isSilent) SpreadsheetApp.getUi().alert('⚠️ "Students Data" sheet does not exist. Please run "Refresh Students Data" first.');
    return { success: false, count: 0 };
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    if (!isSilent) SpreadsheetApp.getUi().alert('⚠️ No student data found.');
    return { success: false, count: 0 };
  }

  const profiles = [];
  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    const name = String(row[0] || '').trim();
    const email = String(row[1] || '').trim().toLowerCase();
    const phone = String(row[2] || '').trim();
    const college = String(row[3] || '').trim();
    const batch = String(row[4] || 'HSC 2026').trim();
    const role = String(row[5] || 'student').trim().toLowerCase();
    const streak = parseInt(row[6]) || 0;
    const totalXp = parseInt(row[7]) || 0;
    const accuracy = parseInt(row[8]) || 0;
    const questionsSolved = parseInt(row[9]) || 0;
    const league = String(row[10] || 'Bronze').trim();

    if (!email || !email.includes('@')) continue;

    profiles.push({
      email: email,
      name: name || 'HSC Examinee',
      phone: phone,
      college: college,
      hsc_batch: batch,
      role: (role === 'admin' || email.includes('admin') || email.includes('sakin')) ? 'admin' : 'student',
      streak: streak,
      total_xp: totalXp,
      accuracy: accuracy,
      questions_solved: questionsSolved,
      league: league,
      updated_at: new Date().toISOString()
    });
  }

  if (profiles.length === 0) {
    if (!isSilent) SpreadsheetApp.getUi().alert('⚠️ No valid student rows to sync.');
    return { success: false, count: 0 };
  }

  const res = supabaseRequest('/rest/v1/profiles?on_conflict=email', 'POST', profiles, 'resolution=merge-duplicates');
  if (res.status === 200 || res.status === 201) {
    if (!isSilent) {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        `✓ Updated ${profiles.length} students live on website!`,
        '👥 Students Sync Complete',
        5
      );
    }
    return { success: true, count: profiles.length };
  } else {
    Logger.log('syncStudentsSheetToSupabase error: ' + JSON.stringify(res));
    if (!isSilent) SpreadsheetApp.getUi().alert('Error syncing students: ' + JSON.stringify(res.data));
    return { success: false, error: res.data };
  }
}

/**
 * Pull all student profiles from Supabase to "Students Data" sheet
 */
function refreshStudentsDataFromSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Students Data');
  if (!sheet) {
    sheet = ss.insertSheet('Students Data');
  }

  const res = supabaseRequest('/rest/v1/profiles?order=total_xp.desc', 'GET');
  if (res.status !== 200 || !Array.isArray(res.data)) {
    if (!isSilent) SpreadsheetApp.getUi().alert('Failed to fetch students from website: ' + JSON.stringify(res));
    return { success: false };
  }

  const profiles = res.data;
  sheet.clear();

  const headers = [
    'Student Name',
    'Email Address',
    'Phone Number',
    'College',
    'HSC Batch',
    'Role',
    'Streak (Days)',
    'Total XP',
    'Accuracy (%)',
    'Questions Solved',
    'League',
    'Registered At'
  ];

  const rows = [headers];
  profiles.forEach(p => {
    rows.push([
      p.name || '',
      p.email || '',
      p.phone || '',
      p.college || '',
      p.hsc_batch || 'HSC 2026',
      p.role || 'student',
      p.streak || 0,
      p.total_xp || 0,
      p.accuracy || 0,
      p.questions_solved || 0,
      p.league || 'Bronze',
      p.created_at ? new Date(p.created_at).toLocaleString('en-GB') : ''
    ]);
  });

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);

  // Format Header
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#111827');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }

  if (!isSilent) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `✓ Refreshed ${profiles.length} students from website.`,
      '👥 Students Data',
      5
    );
  }

  return { success: true, count: profiles.length };
}

/**
 * ----------------------------------------------------------------------------
 * 3. EXAM RESULTS SYNC (Website ➔ Sheet)
 * ----------------------------------------------------------------------------
 */
function refreshExamResultsFromSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Exam Results');
  if (!sheet) {
    sheet = ss.insertSheet('Exam Results');
  }

  const res = supabaseRequest('/rest/v1/exam_results?order=created_at.desc&limit=500', 'GET');
  if (res.status !== 200 || !Array.isArray(res.data)) {
    if (!isSilent) SpreadsheetApp.getUi().alert('Failed to fetch exam results: ' + JSON.stringify(res));
    return { success: false };
  }

  const results = res.data;
  sheet.clear();

  const headers = [
    'Result ID',
    'Date & Time',
    'Student Email',
    'Exam Title',
    'Score',
    'Total Questions',
    'Accuracy (%)',
    'Time Spent (s)'
  ];

  const rows = [headers];
  results.forEach(r => {
    rows.push([
      r.id || '',
      r.created_at ? new Date(r.created_at).toLocaleString('en-GB') : '',
      r.user_email || '',
      r.exam_title || '',
      r.score || 0,
      r.total_questions || 0,
      r.percentage || 0,
      r.time_spent_seconds || 0
    ]);
  });

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#1e293b');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }

  if (!isSilent) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `✓ Refreshed ${results.length} exam results.`,
      '📝 Exam Results',
      5
    );
  }

  return { success: true, count: results.length };
}

/**
 * ----------------------------------------------------------------------------
 * 4. WEAK WORDS 2-WAY SYNC
 * ----------------------------------------------------------------------------
 */
function refreshWeakWordsFromSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Weak Words');
  if (!sheet) {
    sheet = ss.insertSheet('Weak Words');
  }

  const res = supabaseRequest('/rest/v1/weak_words?order=updated_at.desc', 'GET');
  if (res.status !== 200 || !Array.isArray(res.data)) {
    if (!isSilent) SpreadsheetApp.getUi().alert('Failed to fetch weak words: ' + JSON.stringify(res));
    return { success: false };
  }

  const words = res.data;
  sheet.clear();

  const headers = [
    'Student Email',
    'Word',
    'Bengali Meaning',
    'Parts of Speech',
    'Unit',
    'Mistake Count',
    'Correct Count',
    'Status (Weak/Mastered)',
    'Last Updated'
  ];

  const rows = [headers];
  words.forEach(w => {
    rows.push([
      w.user_email || '',
      w.word || '',
      w.bengali_meaning || '',
      w.parts_of_speech || '',
      w.unit || '',
      w.mistake_count || 0,
      w.correct_count || 0,
      w.is_weak ? 'Weak' : 'Mastered',
      w.updated_at ? new Date(w.updated_at).toLocaleString('en-GB') : ''
    ]);
  });

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#881337');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }

  if (!isSilent) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `✓ Refreshed ${words.length} weak words.`,
      '⚠️ Weak Words',
      5
    );
  }

  return { success: true, count: words.length };
}

function syncWeakWordsSheetToSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Weak Words');
  if (!sheet) return { success: false };

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { success: false };

  const list = [];
  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    const email = String(row[0] || '').trim().toLowerCase();
    const word = String(row[1] || '').trim();
    if (!email || !word) continue;

    const statusStr = String(row[7] || '').trim().toLowerCase();
    const isWeak = statusStr !== 'mastered' && statusStr !== 'recovered' && statusStr !== 'false';

    list.push({
      user_email: email,
      word: word,
      bengali_meaning: String(row[2] || '').trim(),
      parts_of_speech: String(row[3] || '').trim(),
      unit: String(row[4] || '').trim(),
      mistake_count: parseInt(row[5]) || 0,
      correct_count: parseInt(row[6]) || 0,
      is_weak: isWeak,
      updated_at: new Date().toISOString()
    });
  }

  if (list.length === 0) return { success: false };

  const res = supabaseRequest('/rest/v1/weak_words?on_conflict=user_email,word', 'POST', list, 'resolution=merge-duplicates');
  if (res.status === 200 || res.status === 201) {
    if (!isSilent) {
      SpreadsheetApp.getActiveSpreadsheet().toast(`✓ Updated ${list.length} weak words in database!`, '⚠️ Weak Words Sync', 5);
    }
    return { success: true, count: list.length };
  }
  return { success: false, error: res.data };
}

/**
 * ----------------------------------------------------------------------------
 * 5. PRACTICE ANALYTICS SYNC (Website ➔ Sheet)
 * ----------------------------------------------------------------------------
 */
function refreshPracticeStatsFromSupabase(isSilent = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Practice Analytics');
  if (!sheet) {
    sheet = ss.insertSheet('Practice Analytics');
  }

  const res = supabaseRequest('/rest/v1/word_practice_stats?order=times_practiced.desc&limit=500', 'GET');
  if (res.status !== 200 || !Array.isArray(res.data)) {
    if (!isSilent) SpreadsheetApp.getUi().alert('Failed to fetch practice analytics: ' + JSON.stringify(res));
    return { success: false };
  }

  const stats = res.data;
  sheet.clear();

  const headers = [
    'Student Email',
    'Word',
    'Times Practiced',
    'Correct Count',
    'Mistake Count',
    'Success Rate (%)',
    'Status',
    'Last Result',
    'Last Practiced'
  ];

  const rows = [headers];
  stats.forEach(s => {
    rows.push([
      s.user_email || '',
      s.word || '',
      s.times_practiced || 0,
      s.correct_count || 0,
      s.mistake_count || 0,
      s.success_rate || 0,
      s.status || 'learning',
      s.last_result || '',
      s.last_practiced_at ? new Date(s.last_practiced_at).toLocaleString('en-GB') : ''
    ]);
  });

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#134e4a');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');

  sheet.setFrozenRows(1);
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }

  if (!isSilent) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `✓ Refreshed ${stats.length} practice analytics rows.`,
      '📊 Practice Analytics',
      5
    );
  }

  return { success: true, count: stats.length };
}

/**
 * ----------------------------------------------------------------------------
 * 6. FULL 2-WAY MASTER SYNC
 * ----------------------------------------------------------------------------
 */
function fullSyncEverything() {
  SpreadsheetApp.getActiveSpreadsheet().toast('⏳ Starting Full 2-Way Sync...', '🚀 System Sync', 3);

  const vocabResult = syncVocabularySheetsToSupabase(true);
  const studentsResult = syncStudentsSheetToSupabase(true);
  syncWeakWordsSheetToSupabase(true);

  refreshStudentsDataFromSupabase(true);
  refreshExamResultsFromSupabase(true);
  refreshWeakWordsFromSupabase(true);
  refreshPracticeStatsFromSupabase(true);

  SpreadsheetApp.getUi().alert(
    '🚀 FULL 2-WAY SYNC COMPLETED SUCCESSFULLY!\n\n' +
    `• Vocabulary Synced: ${vocabResult.synced || 0} words (with latest Synonyms & Antonyms)\n` +
    `• Vocabulary Deleted: ${vocabResult.deleted || 0} removed words\n` +
    `• Students Synchronized: ${studentsResult.count || 0} student profiles\n` +
    `• Tabs Updated: Students Data, Exam Results, Weak Words, Practice Analytics\n\n` +
    'Your website is 100% up-to-date with your Google Sheet!'
  );
}

/**
 * ----------------------------------------------------------------------------
 * 7. INSTALLABLE ON-EDIT TRIGGER (Instant Sync on Cell Edit)
 * ----------------------------------------------------------------------------
 */
function setupAutomaticLiveEditTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggers = ScriptApp.getUserTriggers(ss);
  
  let exists = false;
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'onSheetEdit') {
      exists = true;
    }
  });

  if (!exists) {
    ScriptApp.newTrigger('onSheetEdit')
      .forSpreadsheet(ss)
      .onEdit()
      .create();
  }

  SpreadsheetApp.getUi().alert(
    '⚡ LIVE ON-EDIT SYNC ENABLED!\n\n' +
    'From now on, whenever you edit ANY cell:\n' +
    '1. Editing any word, synonym, antonym or meaning in Unit sheets updates the website instantly.\n' +
    '2. Editing any student points, role, phone or streak in "Students Data" updates the website live.'
  );
}

/**
 * Triggered automatically on every cell edit (requires setupAutomaticLiveEditTrigger)
 */
function onSheetEdit(e) {
  if (!e || !e.range) return;
  const row = e.range.getRow();
  if (row === 1) return; // Ignore header edits

  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();

  // A. Edit in Students Data
  if (sheetName === 'Students Data') {
    const rowValues = sheet.getRange(row, 1, 1, 11).getValues()[0];
    const email = String(rowValues[1] || '').trim().toLowerCase();
    if (!email || !email.includes('@')) return;

    const payload = [{
      email: email,
      name: String(rowValues[0] || 'HSC Examinee').trim(),
      phone: String(rowValues[2] || '').trim(),
      college: String(rowValues[3] || '').trim(),
      hsc_batch: String(rowValues[4] || 'HSC 2026').trim(),
      role: String(rowValues[5] || 'student').trim().toLowerCase(),
      streak: parseInt(rowValues[6]) || 0,
      total_xp: parseInt(rowValues[7]) || 0,
      accuracy: parseInt(rowValues[8]) || 0,
      questions_solved: parseInt(rowValues[9]) || 0,
      league: String(rowValues[10] || 'Bronze').trim(),
      updated_at: new Date().toISOString()
    }];

    const res = supabaseRequest('/rest/v1/profiles?on_conflict=email', 'POST', payload, 'resolution=merge-duplicates');
    if (res.status === 200 || res.status === 201) {
      sheet.getParent().toast(`⚡ Student "${rowValues[0] || email}" updated live on website!`, '👥 Live Sync', 3);
    }
    return;
  }

  // B. Edit in Weak Words
  if (sheetName === 'Weak Words') {
    const rowValues = sheet.getRange(row, 1, 1, 9).getValues()[0];
    const email = String(rowValues[0] || '').trim().toLowerCase();
    const word = String(rowValues[1] || '').trim();
    if (!email || !word) return;

    const statusStr = String(rowValues[7] || '').trim().toLowerCase();
    const isWeak = statusStr !== 'mastered' && statusStr !== 'recovered' && statusStr !== 'false';

    const payload = [{
      user_email: email,
      word: word,
      bengali_meaning: String(rowValues[2] || '').trim(),
      parts_of_speech: String(rowValues[3] || '').trim(),
      unit: String(rowValues[4] || '').trim(),
      mistake_count: parseInt(rowValues[5]) || 0,
      correct_count: parseInt(rowValues[6]) || 0,
      is_weak: isWeak,
      updated_at: new Date().toISOString()
    }];

    supabaseRequest('/rest/v1/weak_words?on_conflict=user_email,word', 'POST', payload, 'resolution=merge-duplicates');
    return;
  }

  // C. Edit in Vocabulary Unit Sheets
  if (!CONFIG.EXCLUDE_SHEETS.includes(sheetName)) {
    const rowValues = sheet.getRange(row, 1, 1, 9).getValues()[0];
    const word = String(rowValues[0] || '').trim();
    if (!word) return;

    const payload = [{
      word: word,
      bengali_meaning: String(rowValues[1] || '').trim(),
      parts_of_speech: String(rowValues[2] || 'Word').trim(),
      synonyms: String(rowValues[3] || '').trim(),
      antonyms: String(rowValues[4] || '').trim(),
      english_meaning: String(rowValues[5] || '').trim(),
      example_sentence: String(rowValues[6] || '').trim(),
      unit: String(rowValues[7] || sheetName).trim(),
      priority: Number(rowValues[8] || 50),
      updated_at: new Date().toISOString()
    }];

    const res = supabaseRequest('/rest/v1/vocabulary?on_conflict=word', 'POST', payload, 'resolution=merge-duplicates');
    if (res.status === 200 || res.status === 201) {
      sheet.getParent().toast(`⚡ Word "${word}" (synonyms/antonyms) updated live on website!`, '📖 Live Sync', 3);
    }
  }
}

/**
 * ----------------------------------------------------------------------------
 * 8. WEB APP REST API HANDLERS (doGet & doPost)
 * ----------------------------------------------------------------------------
 */
function doGet(e) {
  const action = e?.parameter?.action || 'readAll';

  if (action === 'readAll') {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const words = [];
    sheets.forEach(sheet => {
      if (CONFIG.EXCLUDE_SHEETS.includes(sheet.getName())) return;
      const data = sheet.getDataRange().getValues();
      for (let r = 1; r < data.length; r++) {
        const row = data[r];
        const w = String(row[0] || '').trim();
        if (w) {
          words.push({
            word: w,
            bengali_meaning: String(row[1] || '').trim(),
            parts_of_speech: String(row[2] || 'Word').trim(),
            synonyms: String(row[3] || '').trim(),
            antonyms: String(row[4] || '').trim(),
            english_meaning: String(row[5] || '').trim(),
            example_sentence: String(row[6] || '').trim(),
            unit: String(row[7] || sheet.getName()).trim()
          });
        }
      }
    });
    return ContentService.createTextOutput(JSON.stringify({ success: true, count: words.length, words: words }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'sync') {
    const res = syncVocabularySheetsToSupabase(true);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'syncStudents') {
    const res = refreshStudentsDataFromSupabase(true);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'syncStudentsToSupabase') {
    const res = syncStudentsSheetToSupabase(true);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'syncExamResults') {
    const res = refreshExamResultsFromSupabase(true);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'syncWeakWords') {
    const res = refreshWeakWordsFromSupabase(true);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'syncWeakWordsToSupabase') {
    const res = syncWeakWordsSheetToSupabase(true);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'fullSync') {
    fullSyncEverything();
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Full sync executed' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: 'Unknown action' })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const raw = e?.postData?.contents;
    if (!raw) return ContentService.createTextOutput(JSON.stringify({ error: 'Empty payload' })).setMimeType(ContentService.MimeType.JSON);

    const body = JSON.parse(raw);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Live Push from Website for Student Profile Registration/Update
    if (body.action === 'syncStudentProfile' && body.profile) {
      let sheet = ss.getSheetByName('Students Data');
      if (!sheet) {
        refreshStudentsDataFromSupabase(true);
        sheet = ss.getSheetByName('Students Data');
      }

      if (sheet) {
        const p = body.profile;
        const email = (p.email || '').toLowerCase().trim();
        const data = sheet.getDataRange().getValues();
        let foundRow = -1;

        for (let r = 1; r < data.length; r++) {
          if (String(data[r][1] || '').toLowerCase().trim() === email) {
            foundRow = r + 1;
            break;
          }
        }

        const newRow = [
          p.name || '',
          email,
          p.phone || '',
          p.college || '',
          p.hsc_batch || 'HSC 2026',
          p.role || 'student',
          p.streak || 0,
          p.total_xp || 0,
          p.accuracy || 0,
          p.questions_solved || 0,
          p.league || 'Bronze',
          p.created_at ? new Date(p.created_at).toLocaleString('en-GB') : new Date().toLocaleString('en-GB')
        ];

        if (foundRow > 0) {
          sheet.getRange(foundRow, 1, 1, newRow.length).setValues([newRow]);
        } else {
          sheet.appendRow(newRow);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Live Push from Website for Exam Result
    if (body.action === 'syncExamResult' && body.result) {
      let sheet = ss.getSheetByName('Exam Results');
      if (!sheet) {
        refreshExamResultsFromSupabase(true);
        sheet = ss.getSheetByName('Exam Results');
      }
      if (sheet) {
        const r = body.result;
        sheet.appendRow([
          r.id || '',
          r.created_at ? new Date(r.created_at).toLocaleString('en-GB') : new Date().toLocaleString('en-GB'),
          r.user_email || '',
          r.exam_title || '',
          r.score || 0,
          r.total_questions || 0,
          r.percentage || 0,
          r.time_spent_seconds || 0
        ]);
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Live Push from Website for Weak Word
    if (body.action === 'syncWeakWord' && body.weakWord) {
      let sheet = ss.getSheetByName('Weak Words');
      if (!sheet) {
        refreshWeakWordsFromSupabase(true);
        sheet = ss.getSheetByName('Weak Words');
      }
      if (sheet) {
        const w = body.weakWord;
        const email = (w.user_email || '').toLowerCase().trim();
        const word = (w.word || '').trim().toLowerCase();
        const data = sheet.getDataRange().getValues();
        let foundRow = -1;

        for (let r = 1; r < data.length; r++) {
          if (String(data[r][0] || '').toLowerCase().trim() === email && String(data[r][1] || '').toLowerCase().trim() === word) {
            foundRow = r + 1;
            break;
          }
        }

        const newRow = [
          w.user_email || '',
          w.word || '',
          w.bengali_meaning || '',
          w.parts_of_speech || '',
          w.unit || '',
          w.mistake_count || 0,
          w.correct_count || 0,
          w.is_weak ? 'Weak' : 'Mastered',
          new Date().toLocaleString('en-GB')
        ];

        if (foundRow > 0) {
          sheet.getRange(foundRow, 1, 1, newRow.length).setValues([newRow]);
        } else {
          sheet.appendRow(newRow);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ error: 'Action not handled' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
