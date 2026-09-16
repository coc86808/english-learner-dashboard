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
 * Designed for standard A4 paper (210mm x 297mm) with 100% exact front-to-back mirrored alignment for cutting.
 * Supports 16 cards per sheet (4 cols x 4 rows) [Default] or 8 cards per sheet (2 cols x 4 rows).
 */
export function generatePrintableFlashcardsPDF({
  words = [],
  unitTitle = 'All Units',
  lessonTitle = 'All Lessons',
  studentInfo = {},
  cardsPerPage = 16,
  lang = 'en'
}) {
  const isBn = lang === 'bn';
  const { name, college, batch } = resolveStudentDetails(studentInfo);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const is16Grid = Number(cardsPerPage) === 16;
  const CARDS_PER_PAGE = is16Grid ? 16 : 8;
  const COLS = is16Grid ? 4 : 2;
  const ROWS = 4;
  const totalSheets = Math.ceil(words.length / CARDS_PER_PAGE) || 1;

  // Render individual front card HTML
  const renderFrontCard = (item) => {
    if (!item) {
      return `
        <div class="flashcard ${is16Grid ? 'flashcard-16' : 'flashcard-8'} card-front card-empty">
          <div class="empty-inner"></div>
        </div>
      `;
    }

    const posTag = item.partsOfSpeech ? `<span class="pos-badge ${is16Grid ? 'pos-badge-sm' : ''}">${escapeHtml(item.partsOfSpeech)}</span>` : '';
    const boardTag = Array.isArray(item.sources) && item.sources.length > 1
      ? item.sources.slice(0, 2).join(' • ')
      : (item.boardExamTag || item.unit || 'HSC English');

    const wordLength = item.word ? item.word.length : 0;
    const wordClass = is16Grid
      ? (wordLength > 12 ? 'word-long-16' : (wordLength > 9 ? 'word-med-16' : 'word-std-16'))
      : (wordLength > 12 ? 'word-long-8' : 'word-std-8');

    return `
      <div class="flashcard ${is16Grid ? 'flashcard-16' : 'flashcard-8'} card-front">
        <div class="card-header">
          <span class="card-unit-tag">${escapeHtml(boardTag)}</span>
          ${posTag}
        </div>
        <div class="card-front-body">
          <div class="card-word ${wordClass}">${escapeHtml(item.word)}</div>
          ${item.phonetic ? `<div class="card-phonetic">${escapeHtml(item.phonetic)}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-brand-sub">HSC English 1st</span>
          <span class="card-duplex-hint">FRONT • শব্দ</span>
        </div>
      </div>
    `;
  };

  // Render individual back card HTML
  const renderBackCard = (item) => {
    if (!item) {
      return `
        <div class="flashcard ${is16Grid ? 'flashcard-16' : 'flashcard-8'} card-back card-empty">
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
      <div class="flashcard ${is16Grid ? 'flashcard-16' : 'flashcard-8'} card-back">
        <div class="card-header-back">
          <div class="card-word-sm">${escapeHtml(item.word)}</div>
          ${item.partsOfSpeech ? `<span class="pos-badge-back">${escapeHtml(item.partsOfSpeech)}</span>` : ''}
        </div>
        
        <div class="card-back-body">
          ${hasMeaning ? `<div class="bangla-meaning ${is16Grid ? 'bn-16' : 'bn-8'}">${escapeHtml(item.bengaliMeaning)}</div>` : ''}
          ${hasEngMeaning ? `<div class="english-definition ${is16Grid ? 'eng-16' : 'eng-8'}">${escapeHtml(item.englishMeaning)}</div>` : ''}
          
          ${(hasSynonyms || hasAntonyms) ? `
            <div class="relations-grid ${is16Grid ? 'rel-16' : 'rel-8'}">
              ${hasSynonyms ? `
                <div class="relation-row">
                  <span class="rel-label syn-label">Syn:</span>
                  <span class="rel-text syn-text">${escapeHtml(item.synonyms)}</span>
                </div>
              ` : ''}
              ${hasAntonyms ? `
                <div class="relation-row">
                  <span class="rel-label ant-label">Ant:</span>
                  <span class="rel-text ant-text">${escapeHtml(item.antonyms)}</span>
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${hasExample ? `
            <div class="example-box ${is16Grid ? 'ex-16' : 'ex-8'}">
              <span class="ex-quote">“${escapeHtml(item.exampleSentence)}”</span>
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <span class="card-brand-sub">Learner Hub</span>
          <span class="card-duplex-hint">BACK • অর্থ</span>
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

    // 1. Front Page: Rows 0..3, Cols 0..COLS-1
    const frontCardsHtml = sheetCards.map((card) => renderFrontCard(card)).join('');

    // 2. Back Page: Rows 0..3, Mirrored Columns so Long-Edge Duplex flips with 100% millimeter alignment
    const backCardsMirrored = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Col c on Back receives Front Card from mirrored column (COLS - 1 - c)
        const mirroredCol = COLS - 1 - c;
        const sourceIndex = r * COLS + mirroredCol;
        backCardsMirrored.push(sheetCards[sourceIndex]);
      }
    }
    const backCardsHtml = backCardsMirrored.map((card) => renderBackCard(card)).join('');

    const sheetNum = s + 1;

    pagesHtml += `
      <!-- Sheet ${sheetNum} - Front Page (Words) -->
      <div class="sheet-page">
        <div class="sheet-watermark-guide">Sheet ${sheetNum} of ${totalSheets} • FRONT</div>
        <div class="cards-grid ${is16Grid ? 'cards-grid-16' : 'cards-grid-8'}">
          ${frontCardsHtml}
        </div>
      </div>

      <!-- Sheet ${sheetNum} - Back Page (Meanings / Duplex Mirrored) -->
      <div class="sheet-page">
        <div class="sheet-watermark-guide">Sheet ${sheetNum} of ${totalSheets} • BACK</div>
        <div class="cards-grid ${is16Grid ? 'cards-grid-16' : 'cards-grid-8'}">
          ${backCardsHtml}
        </div>
      </div>
    `;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(name)} - HSC Flashcards (${escapeHtml(unitTitle)} - ${CARDS_PER_PAGE} Cards/Page)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html {
      background-color: #334155;
      min-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: #334155;
      font-family: 'Plus Jakarta Sans', 'Inter', 'Hind Siliguri', sans-serif;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Preview Control Bar (Hidden in Print) */
    .no-print-bar {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      font-family: 'Plus Jakarta Sans', sans-serif;
      box-sizing: border-box;
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
      font-size: 11px;
      color: #fde047;
      display: flex;
      align-items: center;
      gap: 6px;
      max-width: 580px;
      line-height: 1.3;
    }

    .no-print-bar .btn-print {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      padding: 8px 22px;
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

    /* Print Sheets Container - Centered on Screen */
    .print-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      box-sizing: border-box;
    }

    /* Exact A4 Physical Dimension (210mm x 297mm) Centered Page */
    .sheet-page {
      width: 210mm;
      height: 297mm;
      min-height: 297mm;
      max-height: 297mm;
      margin: 0 auto 20px auto;
      background: #ffffff;
      padding: 3.5mm;
      position: relative;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      border-radius: 2px;
      overflow: hidden;
      box-sizing: border-box;
    }

    .sheet-watermark-guide {
      position: absolute;
      top: 1mm;
      right: 4mm;
      font-size: 6.5px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 700;
      line-height: 1;
      pointer-events: none;
    }

    /* 16-Cards Grid Layout (4 cols x 4 rows) - Uniform 2mm gap between cards */
    .cards-grid-16 {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 2mm 2mm;
      box-sizing: border-box;
    }

    .flashcard-16 {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1.5px dashed #94a3b8;
      border-radius: 6px;
      background: #ffffff;
      padding: 3.5mm 3mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    /* 8-Cards Grid Layout (2 cols x 4 rows) - Uniform 2.5mm gap between cards */
    .cards-grid-8 {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 2.5mm 2.5mm;
      box-sizing: border-box;
    }

    .flashcard-8 {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1.5px dashed #94a3b8;
      border-radius: 8px;
      background: #ffffff;
      padding: 5mm 6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .card-empty {
      background: #fafafa !important;
      border-style: dotted !important;
      border-color: #cbd5e1 !important;
    }

    /* Card Header */
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      line-height: 1;
    }

    .card-unit-tag {
      font-size: 8px;
      font-weight: 700;
      color: #475569;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 65%;
      letter-spacing: -0.2px;
    }

    .pos-badge {
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      color: #0369a1;
      background: #e0f2fe;
      border: 0.5px solid #bae6fd;
      padding: 1px 4.5px;
      border-radius: 3px;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }

    .pos-badge-sm {
      font-size: 7px;
      padding: 0.5px 3.5px;
    }

    /* Card Front Center Word Body */
    .card-front-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: 2px 0;
      text-align: center;
    }

    .card-word {
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.4px;
      line-height: 1.15;
      word-break: break-word;
      text-align: center;
    }

    .word-std-16 { font-size: 16.5px; }
    .word-med-16 { font-size: 14px; }
    .word-long-16 { font-size: 12px; }

    .word-std-8 { font-size: 24px; }
    .word-long-8 { font-size: 18px; }

    .card-phonetic {
      font-size: 8px;
      color: #64748b;
      font-family: monospace;
      margin-top: 2px;
    }

    /* Card Footer */
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #f1f5f9;
      padding-top: 2px;
      line-height: 1;
    }

    .card-brand-sub {
      font-size: 6.8px;
      font-weight: 700;
      color: #94a3b8;
    }

    .card-duplex-hint {
      font-size: 6.8px;
      color: #cbd5e1;
      font-weight: 700;
    }

    /* Back Card Layout & Elements */
    .card-back {
      background: #fafcff;
    }

    .card-header-back {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      border-bottom: 0.5px solid #e2e8f0;
      padding-bottom: 2px;
      line-height: 1;
    }

    .card-word-sm {
      font-size: 10.5px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 68%;
    }

    .pos-badge-back {
      font-size: 7.5px;
      font-weight: 800;
      color: #0369a1;
      background: #e0f2fe;
      padding: 1px 4px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    .card-back-body {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex: 1;
      min-height: 0;
      gap: 3px;
      padding: 2px 0 1px 0;
    }

    .bangla-meaning {
      font-family: 'Hind Siliguri', 'Inter', sans-serif;
      font-weight: 700;
      color: #047857;
      letter-spacing: -0.1px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bn-16 {
      font-size: 12px;
      line-height: 1.25;
      -webkit-line-clamp: 3;
    }

    .bn-8 {
      font-size: 15px;
      line-height: 1.3;
      -webkit-line-clamp: 3;
    }

    .english-definition {
      color: #334155;
      font-style: italic;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .eng-16 {
      font-size: 8px;
      line-height: 1.2;
      -webkit-line-clamp: 2;
    }

    .eng-8 {
      font-size: 10.5px;
      line-height: 1.25;
      -webkit-line-clamp: 2;
    }

    .relations-grid {
      display: flex;
      flex-direction: column;
      background: #f8fafc;
      border: 0.5px solid #e2e8f0;
      border-radius: 4px;
    }

    .rel-16 {
      padding: 2px 3.5px;
      gap: 2px;
    }

    .rel-8 {
      padding: 3.5px 6px;
      gap: 3px;
    }

    .relation-row {
      display: flex;
      align-items: flex-start;
      gap: 3.5px;
      line-height: 1.2;
    }

    .rel-label {
      font-weight: 800;
      flex-shrink: 0;
      line-height: 1.2;
    }

    .syn-label {
      color: #1d4ed8;
      font-size: 8px;
    }

    .syn-text {
      color: #1e3a8a;
      font-weight: 600;
      font-size: 8px;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    }

    .ant-label {
      color: #b91c1c;
      font-size: 8px;
    }

    .ant-text {
      color: #991b1b;
      font-weight: 600;
      font-size: 8px;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    }

    .example-box {
      font-style: italic;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .ex-16 {
      font-size: 7.8px;
      line-height: 1.22;
      color: #475569;
      -webkit-line-clamp: 3;
    }

    .ex-8 {
      font-size: 9.5px;
      line-height: 1.28;
      color: #475569;
      -webkit-line-clamp: 3;
    }

    .ex-quote {
      color: #334155;
    }

    /* Print Overrides - 100% Exact A4 Sizing */
    @media print {
      html, body {
        width: 210mm !important;
        height: 297mm !important;
        background-color: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        display: block !important;
      }

      .no-print, .no-print-bar {
        display: none !important;
      }

      .print-container {
        width: 210mm !important;
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
      }

      .sheet-page {
        margin: 0 !important;
        width: 210mm !important;
        height: 297mm !important;
        max-height: 297mm !important;
        min-height: 297mm !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        padding: 3.5mm !important;
        box-sizing: border-box !important;
        display: block !important;
        background: #ffffff !important;
      }

      .sheet-page:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }

      .cards-grid-16 {
        width: 100% !important;
        height: 100% !important;
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        grid-template-rows: repeat(4, 1fr) !important;
        gap: 2mm 2mm !important;
        box-sizing: border-box !important;
      }

      .cards-grid-8 {
        width: 100% !important;
        height: 100% !important;
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        grid-template-rows: repeat(4, 1fr) !important;
        gap: 2.5mm 2.5mm !important;
        box-sizing: border-box !important;
      }

      .flashcard-16, .flashcard-8 {
        width: 100% !important;
        height: 100% !important;
        box-sizing: border-box !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar no-print">
    <div class="title-grp">
      <div class="main-title">
        <span>🖨️ HSC English Flashcards (A4 Duplex • ${CARDS_PER_PAGE} Words/Page)</span>
        <span style="font-size: 11px; font-weight: normal; color: #a7f3d0; background: #064e3b; padding: 2px 8px; border-radius: 6px;">
          ${escapeHtml(unitTitle)}
        </span>
      </div>
      <div class="sub-title">
        Total Words: <strong>${words.length}</strong> • Total Sheets: <strong>${totalSheets}</strong> (${totalSheets * 2} Pages Duplex)
      </div>
    </div>

    <div class="tip-badge">
      💡 <strong>নিখুঁত A4 প্রিন্ট সেটিংস:</strong> Paper Size: <strong>A4</strong> | Margins: <strong>None (বা 0mm)</strong> | Scale: <strong>100% (Default)</strong> | Two-Sided: <strong>Flip on Long Edge</strong>
    </div>

    <div style="display: flex; gap: 8px;">
      <button class="btn-print" onclick="window.print()">
        <span>প্রিন্ট করুন (Print A4)</span>
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
  const printWindow = window.open('', '_blank', 'width=1020,height=900');
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



