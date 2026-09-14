/**
 * PDF Generator for HSC English Vocabulary Bank & Weak Words Revision Sheet
 * Styled with Emerald Header, Color-Coded Bangla Meanings & Antonyms, and Dynamic Student Profile
 */

export function resolveStudentDetails(studentInfo = {}) {
  const dummyNames = ['Tanvir Ahmed', 'HSC Candidate'];
  const dummyColleges = ['Notre Dame College, Dhaka', 'Notre Dame College / Dhaka College', 'HSC College'];

  let name = '';
  let college = '';
  let batch = '';

  // 1. Check passed studentInfo
  if (studentInfo && typeof studentInfo === 'object') {
    if (studentInfo.name && !dummyNames.includes(studentInfo.name.trim())) {
      name = studentInfo.name.trim();
    }
    if (studentInfo.college && !dummyColleges.includes(studentInfo.college.trim())) {
      college = studentInfo.college.trim();
    }
    if (studentInfo.batch || studentInfo.hscBatch) {
      batch = (studentInfo.batch || studentInfo.hscBatch).trim();
    }
  }

  // 2. Check localStorage auth user
  if (!name || !college || !batch) {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('hsc_auth_user');
        if (raw) {
          const authUser = JSON.parse(raw);
          if (!name && authUser?.name && !dummyNames.includes(authUser.name.trim())) {
            name = authUser.name.trim();
          }
          if (!college && authUser?.college && !dummyColleges.includes(authUser.college.trim())) {
            college = authUser.college.trim();
          }
          if (!batch && (authUser?.hscBatch || authUser?.batch)) {
            batch = (authUser.hscBatch || authUser.batch).trim();
          }
        }
      }
    } catch (e) {}
  }

  // 3. Check localStorage custom PDF info
  if (!name || !college || !batch) {
    try {
      if (typeof window !== 'undefined') {
        const rawPdfInfo = localStorage.getItem('hsc_student_pdf_info');
        if (rawPdfInfo) {
          const pdfInfo = JSON.parse(rawPdfInfo);
          if (!name && pdfInfo?.name && !dummyNames.includes(pdfInfo.name.trim())) {
            name = pdfInfo.name.trim();
          }
          if (!college && pdfInfo?.college && !dummyColleges.includes(pdfInfo.college.trim())) {
            college = pdfInfo.college.trim();
          }
          if (!batch && pdfInfo?.batch) {
            batch = pdfInfo.batch.trim();
          }
        }
      }
    } catch (e) {}
  }

  // 4. Clean sensible defaults (never hardcoded fake names or colleges)
  if (!name) name = studentInfo?.name?.trim() || 'HSC Examinee';
  if (!batch) batch = 'HSC 2026';

  return { name, college, batch };
}

export function generateWeakWordsPDF({ words = [], studentInfo = {}, lang = 'en' }) {
  const isBn = lang === 'bn';
  const { name, college, batch } = resolveStudentDetails(studentInfo);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const tableRows = words.map((item, idx) => `
    <tr>
      <td class="word-cell" style="width: 20%;">
        <div class="word-title">${idx + 1}. ${item.word}</div>
        ${item.partsOfSpeech ? `<span class="pos-badge">${item.partsOfSpeech}</span>` : ''}
      </td>
      <td class="meaning-cell" style="width: 30%;">
        ${item.bengaliMeaning || '-'}
      </td>
      <td class="synonym-cell" style="width: 25%;">
        ${item.synonyms || '-'}
      </td>
      <td class="antonym-cell" style="width: 25%;">
        ${item.antonyms && item.antonyms.trim() !== '' && item.antonyms.trim() !== '-' ? item.antonyms : '-'}
      </td>
    </tr>
  `).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>${name} - HSC English Weak Words Revision Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 10mm 10mm 10mm 10mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Inter', 'Hind Siliguri', sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      margin: 0;
      padding: 14px;
      font-size: 11px;
      line-height: 1.35;
    }

    .header-container {
      border-bottom: 2.5px solid #059669;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .brand-title {
      font-size: 18px;
      font-weight: 800;
      color: #065f46;
      margin: 0 0 2px 0;
      letter-spacing: -0.3px;
    }

    .brand-subtitle {
      font-size: 11px;
      font-weight: 600;
      color: #047857;
      margin: 0;
    }

    .meta-box {
      text-align: right;
      font-size: 10px;
      color: #475569;
    }

    .meta-box strong {
      color: #0f172a;
    }

    .student-badge-card {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 8px 14px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #1e293b;
    }

    .student-badge-card strong {
      color: #0f172a;
    }

    .summary-pill {
      background-color: #059669;
      color: #ffffff;
      padding: 3px 10px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 10.5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      border: 1px solid #cbd5e1;
    }

    thead th {
      background-color: #065f46 !important;
      color: #ffffff !important;
      text-align: left;
      padding: 8px 12px;
      font-weight: 700;
      font-size: 10.5px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border: 1px solid #065f46;
    }

    tbody tr {
      page-break-inside: avoid;
    }

    tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }

    tbody td {
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      vertical-align: middle;
    }

    .word-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.2;
    }

    .pos-badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 600;
      padding: 1px 5px;
      border-radius: 4px;
      background-color: #e2e8f0;
      color: #475569;
      margin-top: 3px;
    }

    .meaning-cell {
      color: #047857;
      font-weight: 600;
      font-family: 'Hind Siliguri', 'Inter', sans-serif;
      font-size: 11.5px;
    }

    .synonym-cell {
      color: #1e293b;
      font-size: 11px;
    }

    .antonym-cell {
      color: #b91c1c;
      font-weight: 500;
      font-size: 11px;
    }

    .footer {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 9.5px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }

    @media print {
      body {
        padding: 0;
      }
      thead th {
        background-color: #065f46 !important;
        color: #ffffff !important;
      }
      tbody tr:nth-child(even) {
        background-color: #f8fafc !important;
      }
      .meaning-cell {
        color: #047857 !important;
      }
      .antonym-cell {
        color: #b91c1c !important;
      }
    }
  </style>
</head>
<body>
  <div class="header-container">
    <div>
      <h1 class="brand-title">HSC English For Today</h1>
      <p class="brand-subtitle">Weak Words Revision & Mastery Sheet (দুর্বল শব্দ তালিকা)</p>
    </div>
    <div class="meta-box">
      <div><strong>Date:</strong> ${currentDate}</div>
      <div><strong>Curriculum:</strong> NCTB HSC 2026</div>
    </div>
  </div>

  <div class="student-badge-card">
    <div>
      <strong>Student Name:</strong> ${name}
      ${college ? ` &nbsp;|&nbsp; <strong>College:</strong> ${college}` : ''}
      &nbsp;|&nbsp; <strong>Batch:</strong> ${batch}
    </div>
    <div class="summary-pill">
      Total Weak Words: ${words.length}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Word</th>
        <th style="width: 30%;">Meaning (Bangla)</th>
        <th style="width: 25%;">Synonyms</th>
        <th style="width: 25%;">Antonyms</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <div class="footer">
    <span>Learner Hub • Spaced Repetition Vocabulary Engine</span>
    <span>Personalized Revision Sheet</span>
  </div>

  <script>
    window.onload = function() {
      setTimeout(() => {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

  openPrintWindow(htmlContent);
}

/**
 * Vocabulary Bank PDF Generator matching the preferred Emerald Header & Color-Coded Table Style
 */
export function generateVocabularyBankPDF({
  words = [],
  unitTitle = 'All Units',
  lessonTitle = 'All Lessons',
  studentInfo = {},
  lang = 'en'
}) {
  const isBn = lang === 'bn';
  const { name, college, batch } = resolveStudentDetails(studentInfo);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const tableRows = words.map((item, idx) => `
    <tr>
      <td class="word-cell" style="width: 20%;">
        <div class="word-title">${idx + 1}. ${item.word}</div>
        ${item.partsOfSpeech ? `<span class="pos-badge">${item.partsOfSpeech}</span>` : ''}
      </td>
      <td class="meaning-cell" style="width: 30%;">
        ${item.bengaliMeaning || '-'}
      </td>
      <td class="synonym-cell" style="width: 25%;">
        ${item.synonyms || '-'}
      </td>
      <td class="antonym-cell" style="width: 25%;">
        ${item.antonyms && item.antonyms.trim() !== '' && item.antonyms.trim() !== '-' ? item.antonyms : '-'}
      </td>
    </tr>
  `).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>${name} - HSC English Vocabulary Bank (${unitTitle})</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 10mm 10mm 10mm 10mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Inter', 'Hind Siliguri', sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      margin: 0;
      padding: 14px;
      font-size: 11px;
      line-height: 1.35;
    }

    /* Top Brand Header */
    .header-container {
      border-bottom: 2.5px solid #059669;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .brand-title {
      font-size: 18px;
      font-weight: 800;
      color: #065f46;
      margin: 0 0 2px 0;
      letter-spacing: -0.3px;
    }

    .brand-subtitle {
      font-size: 11.5px;
      font-weight: 600;
      color: #047857;
      margin: 0;
    }

    .meta-box {
      text-align: right;
      font-size: 10px;
      color: #475569;
    }

    .meta-box strong {
      color: #0f172a;
    }

    /* Student & Selection Info Card */
    .student-badge-card {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 8px 14px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #1e293b;
    }

    .student-badge-card strong {
      color: #0f172a;
    }

    .summary-pill {
      background-color: #059669;
      color: #ffffff;
      padding: 3px 12px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 10.5px;
    }

    /* 4-Column Table with Emerald Header */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      border: 1px solid #cbd5e1;
    }

    thead th {
      background-color: #065f46 !important;
      color: #ffffff !important;
      text-align: left;
      padding: 8px 12px;
      font-weight: 700;
      font-size: 10.5px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border: 1px solid #065f46;
    }

    tbody tr {
      page-break-inside: avoid;
    }

    tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }

    tbody td {
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      vertical-align: middle;
    }

    .word-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 12px;
      line-height: 1.2;
    }

    .pos-badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 600;
      padding: 1px 5px;
      border-radius: 4px;
      background-color: #e2e8f0;
      color: #475569;
      margin-top: 3px;
    }

    .meaning-cell {
      color: #047857;
      font-weight: 600;
      font-family: 'Hind Siliguri', 'Inter', sans-serif;
      font-size: 11.5px;
    }

    .synonym-cell {
      color: #1e293b;
      font-size: 11px;
    }

    .antonym-cell {
      color: #b91c1c;
      font-weight: 500;
      font-size: 11px;
    }

    /* Clean Footer */
    .footer {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 9.5px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-quote {
      font-family: 'Hind Siliguri', sans-serif;
      font-weight: 600;
      color: #065f46;
    }

    @media print {
      body {
        padding: 0;
      }
      .student-badge-card {
        background-color: #f0fdf4 !important;
        border: 1px solid #bbf7d0 !important;
      }
      .summary-pill {
        background-color: #059669 !important;
        color: #ffffff !important;
      }
      thead th {
        background-color: #065f46 !important;
        color: #ffffff !important;
      }
      tbody tr:nth-child(even) {
        background-color: #f8fafc !important;
      }
      .meaning-cell {
        color: #047857 !important;
      }
      .antonym-cell {
        color: #b91c1c !important;
      }
    }
  </style>
</head>
<body>
  <div class="header-container">
    <div>
      <h1 class="brand-title">HSC English 1st Paper — Vocabulary Bank</h1>
      <p class="brand-subtitle">${unitTitle} • ${lessonTitle}</p>
    </div>
    <div class="meta-box">
      <div><strong>Curriculum:</strong> NCTB HSC 2026</div>
      <div><strong>Date:</strong> ${currentDate}</div>
    </div>
  </div>

  <div class="student-badge-card">
    <div>
      <strong>Student:</strong> ${name}
      ${college ? ` &nbsp;|&nbsp; <strong>College:</strong> ${college}` : ''}
      &nbsp;|&nbsp; <strong>Batch:</strong> ${batch}
    </div>
    <div class="summary-pill">
      Total Words: ${words.length}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Word</th>
        <th style="width: 30%;">Meaning (Bangla)</th>
        <th style="width: 25%;">Synonyms</th>
        <th style="width: 25%;">Antonyms</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <div class="footer">
    <span>Learner Hub • Spaced Repetition Vocabulary Engine</span>
    <span class="footer-quote">এইচএসসি ও এডমিশনে সাফল্যের পথে, চলো একসাথে...</span>
    <span>Official HSC Textbook Sheet</span>
  </div>

  <script>
    window.onload = function() {
      setTimeout(() => {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

  openPrintWindow(htmlContent);
}

/**
 * Printable Double-Sided (Duplex) Flashcards PDF Generator
 * Designed for standard A4 paper with exact front-to-back mirrored alignment for cutting.
 * 8 cards per sheet (2 cols x 4 rows). Front page has words; Back page has meanings/synonyms/antonyms.
 */
export function generatePrintableFlashcardsPDF({
  words = [],
  unitTitle = 'All Units',
  lessonTitle = 'All Lessons',
  studentInfo = {},
  lang = 'en'
}) {
  const isBn = lang === 'bn';
  const { name, college, batch } = resolveStudentDetails(studentInfo);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const CARDS_PER_PAGE = 8;
  const COLS = 2;
  const ROWS = 4;
  const totalSheets = Math.ceil(words.length / CARDS_PER_PAGE) || 1;

  // Render individual front card HTML
  const renderFrontCard = (item) => {
    if (!item) {
      return `
        <div class="flashcard card-front card-empty">
          <div class="cut-guide-corner top-left">✂</div>
          <div class="empty-inner"></div>
        </div>
      `;
    }

    const posTag = item.partsOfSpeech ? `<span class="pos-badge">${escapeHtml(item.partsOfSpeech)}</span>` : '';
    const boardTag = item.boardExamTag || item.unit || 'HSC English';

    return `
      <div class="flashcard card-front">
        <div class="cut-guide-corner top-left">✂</div>
        <div class="card-header">
          <span class="card-unit-tag">${escapeHtml(boardTag)}</span>
          ${posTag}
        </div>
        <div class="card-front-body">
          <div class="card-word">${escapeHtml(item.word)}</div>
          ${item.phonetic ? `<div class="card-phonetic">${escapeHtml(item.phonetic)}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-brand-sub">HSC English 1st Paper</span>
          <span class="card-duplex-hint">Front Side • শব্দ</span>
        </div>
      </div>
    `;
  };

  // Render individual back card HTML
  const renderBackCard = (item) => {
    if (!item) {
      return `
        <div class="flashcard card-back card-empty">
          <div class="cut-guide-corner top-left">✂</div>
          <div class="empty-inner"></div>
        </div>
      `;
    }

    const hasSynonyms = item.synonyms && item.synonyms.trim() !== '' && item.synonyms.trim() !== '-';
    const hasAntonyms = item.antonyms && item.antonyms.trim() !== '' && item.antonyms.trim() !== '-';
    const hasMeaning = item.bengaliMeaning && item.bengaliMeaning.trim() !== '';
    const hasEngMeaning = item.englishMeaning && item.englishMeaning.trim() !== '';
    const hasExample = item.exampleSentence && item.exampleSentence.trim() !== '';

    return `
      <div class="flashcard card-back">
        <div class="cut-guide-corner top-left">✂</div>
        <div class="card-header-back">
          <div class="card-word-sm">${escapeHtml(item.word)}</div>
          ${item.partsOfSpeech ? `<span class="pos-badge-sm">${escapeHtml(item.partsOfSpeech)}</span>` : ''}
        </div>
        
        <div class="card-back-body">
          ${hasMeaning ? `<div class="bangla-meaning">${escapeHtml(item.bengaliMeaning)}</div>` : ''}
          ${hasEngMeaning ? `<div class="english-definition">${escapeHtml(item.englishMeaning)}</div>` : ''}
          
          <div class="relations-grid">
            ${hasSynonyms ? `
              <div class="relation-row syn-row">
                <span class="rel-label syn-label">Syn:</span>
                <span class="rel-text syn-text">${escapeHtml(item.synonyms)}</span>
              </div>
            ` : ''}
            ${hasAntonyms ? `
              <div class="relation-row ant-row">
                <span class="rel-label ant-label">Ant:</span>
                <span class="rel-text ant-text">${escapeHtml(item.antonyms)}</span>
              </div>
            ` : ''}
          </div>

          ${hasExample ? `
            <div class="example-box">
              <span class="ex-quote">“${escapeHtml(item.exampleSentence.length > 110 ? item.exampleSentence.slice(0, 107) + '...' : item.exampleSentence)}”</span>
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <span class="card-brand-sub">Learner Hub Flashcards</span>
          <span class="card-duplex-hint">Back Side • অর্থ ও সম্পর্ক</span>
        </div>
      </div>
    `;
  };

  // Generate Sheets (Each sheet has 1 Front Page + 1 Back Page with Mirrored Columns for Duplex)
  let pagesHtml = '';

  for (let s = 0; s < totalSheets; s++) {
    const sheetCards = [];
    for (let c = 0; c < CARDS_PER_PAGE; c++) {
      const wordIdx = s * CARDS_PER_PAGE + c;
      sheetCards.push(wordIdx < words.length ? words[wordIdx] : null);
    }

    // 1. Front Page: Rows 0..3, Cols 0..1
    const frontCardsHtml = sheetCards.map((card) => renderFrontCard(card)).join('');

    // 2. Back Page: Rows 0..3, Mirrored Cols (Col 1, Col 0) so long-edge duplex printing aligns front & back
    const backCardsMirrored = [];
    for (let r = 0; r < ROWS; r++) {
      const leftIndex = r * COLS + 0;
      const rightIndex = r * COLS + 1;
      // On the back page of a long-edge flip, the right card on front flips to the left
      backCardsMirrored.push(sheetCards[rightIndex]);
      backCardsMirrored.push(sheetCards[leftIndex]);
    }
    const backCardsHtml = backCardsMirrored.map((card) => renderBackCard(card)).join('');

    pagesHtml += `
      <!-- Sheet ${s + 1} - Front Page -->
      <div class="sheet-page sheet-front">
        <div class="sheet-watermark-guide">Sheet ${s + 1} of ${totalSheets} • FRONT (Words)</div>
        <div class="cards-grid">
          ${frontCardsHtml}
        </div>
      </div>

      <!-- Sheet ${s + 1} - Back Page (Duplex Mirrored) -->
      <div class="sheet-page sheet-back">
        <div class="sheet-watermark-guide">Sheet ${s + 1} of ${totalSheets} • BACK (Meanings / Synonyms / Antonyms)</div>
        <div class="cards-grid">
          ${backCardsHtml}
        </div>
      </div>
    `;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(name)} - HSC Flashcards (${escapeHtml(unitTitle)})</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
      margin: 6mm 6mm 6mm 6mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html, body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: 'Plus Jakarta Sans', 'Inter', 'Hind Siliguri', sans-serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Preview Control Bar (Hidden in Print) */
    .no-print-bar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .no-print-bar .title-grp {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .no-print-bar .main-title {
      font-size: 15px;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .no-print-bar .sub-title {
      font-size: 11.5px;
      color: #94a3b8;
    }

    .no-print-bar .tip-badge {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 11.5px;
      color: #fde047;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .no-print-bar .btn-print {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 10px rgba(16,185,129,0.4);
      transition: transform 0.15s ease;
    }

    .no-print-bar .btn-print:hover {
      transform: translateY(-1px);
    }

    /* Print Sheets Layout */
    .print-container {
      margin: 0 auto;
      padding: 12px 0;
    }

    .sheet-page {
      width: 198mm;
      height: 285mm;
      max-height: 285mm;
      margin: 0 auto 16px auto;
      background: #ffffff;
      padding: 3mm;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      break-after: page;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
    }

    .sheet-watermark-guide {
      font-size: 8.5px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: right;
      padding-bottom: 2mm;
      font-weight: 600;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 2.5mm;
      flex: 1;
      height: calc(100% - 4mm);
    }

    /* Flashcard Style */
    .flashcard {
      border: 1.2px dashed #94a3b8;
      border-radius: 6px;
      background: #ffffff;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
    }

    .card-empty {
      background: #fafafa;
      border-color: #e2e8f0;
    }

    .cut-guide-corner {
      position: absolute;
      top: 1px;
      left: 3px;
      font-size: 8px;
      color: #cbd5e1;
      pointer-events: none;
      line-height: 1;
    }

    /* Front Card Styling */
    .card-front {
      background: #ffffff;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }

    .card-unit-tag {
      font-size: 9px;
      font-weight: 600;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 65%;
      letter-spacing: -0.2px;
    }

    .pos-badge {
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      color: #0369a1;
      background: #e0f2fe;
      border: 0.8px solid #bae6fd;
      padding: 1.5px 5px;
      border-radius: 4px;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }

    .card-front-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 4px 0;
      text-align: center;
    }

    .card-word {
      font-size: 21px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.4px;
      line-height: 1.15;
      word-break: break-word;
    }

    .card-phonetic {
      font-size: 10px;
      color: #64748b;
      font-family: monospace;
      margin-top: 3px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.8px solid #f1f5f9;
      padding-top: 3px;
      margin-top: 2px;
    }

    .card-brand-sub {
      font-size: 8px;
      font-weight: 600;
      color: #94a3b8;
    }

    .card-duplex-hint {
      font-size: 7.5px;
      color: #cbd5e1;
      font-weight: 500;
    }

    /* Back Card Styling */
    .card-back {
      background: #fafcff;
    }

    .card-header-back {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
      border-bottom: 0.8px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }

    .card-word-sm {
      font-size: 11.5px;
      font-weight: 800;
      color: #1e293b;
      letter-spacing: -0.2px;
    }

    .pos-badge-sm {
      font-size: 8px;
      font-weight: 700;
      color: #0369a1;
      background: #e0f2fe;
      padding: 1px 4px;
      border-radius: 3px;
    }

    .card-back-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 2.5px;
    }

    .bangla-meaning {
      font-family: 'Hind Siliguri', 'Inter', sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      color: #047857;
      line-height: 1.25;
      letter-spacing: -0.1px;
    }

    .english-definition {
      font-size: 9.5px;
      color: #334155;
      line-height: 1.25;
      font-style: italic;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .relations-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: #f8fafc;
      border: 0.8px solid #e2e8f0;
      border-radius: 4px;
      padding: 3px 5px;
    }

    .relation-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      font-size: 9px;
      line-height: 1.25;
    }

    .rel-label {
      font-weight: 800;
      font-size: 8.5px;
      flex-shrink: 0;
    }

    .syn-label {
      color: #1d4ed8;
    }

    .syn-text {
      color: #1e3a8a;
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .ant-label {
      color: #b91c1c;
    }

    .ant-text {
      color: #991b1b;
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .example-box {
      font-size: 8.5px;
      color: #64748b;
      font-style: italic;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding-top: 1px;
    }

    .ex-quote {
      color: #475569;
    }

    /* Print Overrides */
    @media print {
      body {
        background-color: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .no-print, .no-print-bar {
        display: none !important;
      }

      .print-container {
        padding: 0 !important;
        margin: 0 !important;
      }

      .sheet-page {
        margin: 0 !important;
        width: 100% !important;
        height: 100% !important;
        max-height: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
      }

      .sheet-page:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }

      .flashcard {
        border-color: #94a3b8 !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar no-print">
    <div class="title-grp">
      <div class="main-title">
        <span>🖨️ HSC English Flashcards Printable PDF</span>
        <span style="font-size: 11px; font-weight: normal; color: #a7f3d0; background: #064e3b; padding: 2px 8px; border-radius: 6px;">
          ${escapeHtml(unitTitle)}
        </span>
      </div>
      <div class="sub-title">
        Total Words: <strong>${words.length}</strong> • Total Sheets: <strong>${totalSheets}</strong> (${totalSheets * 2} Pages Duplex)
      </div>
    </div>

    <div class="tip-badge">
      💡 <strong>প্রিন্ট টিপস:</strong> Two-Sided Printing সেটিংসে <strong>'Flip on Long Edge'</strong> নির্বাচন করুন। প্রিন্ট শেষে দাগ বরাবর কেটে নিন।
    </div>

    <div style="display: flex; gap: 8px;">
      <button class="btn-print" onclick="window.print()">
        <span>প্রিন্ট করুন (Print)</span>
      </button>
    </div>
  </div>

  <div class="print-container">
    ${pagesHtml}
  </div>

  <script>
    window.onload = function() {
      setTimeout(() => {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>`;

  openPrintWindow(htmlContent);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function openPrintWindow(htmlContent) {
  const printWindow = window.open('', '_blank', 'width=950,height=800');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();
    
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 2000);
    }, 350);
  }
}

