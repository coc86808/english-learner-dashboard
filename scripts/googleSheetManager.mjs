import https from 'https';

const GOOGLE_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbz-pPmvkP0exKnziIqLLcTUypCUpCrGIyoboI4hIJnySlaM4lOjdaAy9R90ta2NZuNq/exec';

function followRedirects(url, options = {}, payload = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow Google redirect (switch to GET for 302 location)
        return resolve(followRedirects(res.headers.location, { method: 'GET' }, null));
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });

    req.on('error', reject);
    if (payload) {
      req.write(typeof payload === 'string' ? payload : JSON.stringify(payload));
    }
    req.end();
  });
}

/**
 * 1. Read all words directly from the Google Sheet
 */
export async function readAllWordsFromGoogleSheet() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=readAll', { method: 'GET' });
}

/**
 * 2. Trigger Google Sheet to sync all vocabulary sheets to Supabase / Website
 */
export async function triggerSheetSyncToWebsite() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=sync', { method: 'GET' });
}

/**
 * 3. Add new words to Google Sheet (automatically placed in correct Unit tab)
 */
export async function addWordsToGoogleSheet(wordsArray) {
  return await followRedirects(GOOGLE_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    action: 'addWords',
    words: wordsArray
  });
}

/**
 * 4. Delete words from Google Sheet across all Unit tabs
 */
export async function deleteWordsFromGoogleSheet(wordsArray) {
  return await followRedirects(GOOGLE_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    action: 'deleteWords',
    words: wordsArray
  });
}

/**
 * 5. Trigger Google Sheet to refresh 'Students Data' sheet from Supabase (Website -> Sheet)
 */
export async function refreshStudentsDataInGoogleSheet() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=syncStudents', { method: 'GET' });
}

/**
 * 6. Trigger Google Sheet to sync student edits back to Website / Supabase (Sheet -> Website)
 */
export async function syncStudentsSheetToWebsite() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=syncStudentsToSupabase', { method: 'GET' });
}

/**
 * 7. Trigger Google Sheet to refresh 'Exam Results' sheet from Supabase (Website -> Sheet)
 */
export async function refreshExamResultsInGoogleSheet() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=syncExamResults', { method: 'GET' });
}

/**
 * 8. Trigger Google Sheet to refresh 'Weak Words' sheet from Supabase (Website -> Sheet)
 */
export async function refreshWeakWordsInGoogleSheet() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=syncWeakWords', { method: 'GET' });
}

/**
 * 9. Trigger Google Sheet to sync weak word edits back to Supabase (Sheet -> Website)
 */
export async function syncWeakWordsToWebsite() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=syncWeakWordsToSupabase', { method: 'GET' });
}

/**
 * 10. Trigger Full 2-Way Sync of Everything
 */
export async function triggerFullSync() {
  return await followRedirects(GOOGLE_WEBAPP_URL + '?action=fullSync', { method: 'GET' });
}
