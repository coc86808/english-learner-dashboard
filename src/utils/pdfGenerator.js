/**
 * PDF Generator for HSC English Weak Words Revision Sheet & Vocabulary Bank
 * Format: Word meaning | Synonym | Antonym
 * Styled authentically after NCTB HSC English Guide Book Pages
 */

export function generateWeakWordsPDF({ words = [], studentInfo = {}, lang = 'en' }) {
  const isBn = lang === 'bn';
  const name = studentInfo.name || 'Tanvir Ahmed';
  const college = studentInfo.college || 'Notre Dame College, Dhaka';
  const batch = studentInfo.batch || 'HSC 2026';
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const tableRows = words.map((item, idx) => `
    <tr>
      <td class="word-meaning-cell">
        <span class="eng-word">${item.word}</span>
        ${item.partsOfSpeech ? `<span class="pos-tag">(${item.partsOfSpeech})</span>` : ''}
        <span class="hyphen">-</span>
        <span class="bn-meaning">${item.bengaliMeaning || '-'}</span>
      </td>
      <td class="synonym-cell">
        ${item.synonyms || '-'}
      </td>
      <td class="antonym-cell">
        ${item.antonyms && item.antonyms.trim() !== '' && item.antonyms.trim() !== '-' ? item.antonyms : '-'}
      </td>
    </tr>
  `).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>HSC English - Weak Words Revision Sheet</title>
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
      padding: 12px;
      font-size: 11px;
      line-height: 1.35;
    }

    .guide-header {
      border: 1.5px solid #1e293b;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 12px;
      background: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-title {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .brand-subtitle {
      font-size: 11px;
      font-weight: 600;
      color: #059669;
      margin: 0;
    }

    .meta-badge {
      font-size: 10px;
      font-weight: 700;
      background: #059669;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 6px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      border: 1.5px solid #1e293b;
    }

    thead th {
      background-color: #e2e8f0;
      color: #0f172a;
      text-align: left;
      padding: 6px 10px;
      font-weight: 800;
      font-size: 11px;
      border: 1px solid #64748b;
      letter-spacing: 0.3px;
    }

    tbody tr {
      page-break-inside: avoid;
    }

    tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }

    tbody td {
      padding: 5px 9px;
      border: 1px solid #94a3b8;
      vertical-align: middle;
    }

    .word-meaning-cell {
      width: 38%;
    }

    .eng-word {
      font-weight: 800;
      color: #0f172a;
      font-size: 11.5px;
    }

    .pos-tag {
      font-size: 9px;
      color: #64748b;
      font-weight: 600;
      margin-left: 2px;
    }

    .hyphen {
      margin: 0 3px;
      font-weight: 800;
      color: #334155;
    }

    .bn-meaning {
      font-family: 'Hind Siliguri', sans-serif;
      font-weight: 500;
      color: #1e293b;
    }

    .synonym-cell {
      width: 31%;
      color: #1e293b;
      font-weight: 500;
    }

    .antonym-cell {
      width: 31%;
      color: #334155;
      font-weight: 500;
    }

    .guide-footer {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      text-align: center;
      font-size: 9px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-quote {
      font-family: 'Hind Siliguri', sans-serif;
      font-weight: 600;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="guide-header">
    <div>
      <h1 class="brand-title">HSC English 1st Paper — Weak Words Bank</h1>
      <p class="brand-subtitle">Student: ${name} (${college} • ${batch})</p>
    </div>
    <div class="meta-badge">
      Total Words: ${words.length}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 38%;">Word meaning</th>
        <th style="width: 31%;">Synonym</th>
        <th style="width: 31%;">Antonym</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <div class="guide-footer">
    <span>English Learner Dashboard</span>
    <span class="footer-quote">এইচএসসি ও এডমিশনে সাফল্যের পথে, চলো একসাথে...</span>
    <span>Date: ${currentDate}</span>
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

/**
 * Authentic Guide-Book Sheet PDF Generator for Vocabulary Bank
 */
export function generateVocabularyBankPDF({
  words = [],
  unitTitle = 'All Units',
  lessonTitle = 'All Lessons',
  lang = 'en'
}) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const tableRows = words.map((item, idx) => `
    <tr>
      <td class="word-meaning-cell">
        <span class="eng-word">${item.word}</span>
        ${item.partsOfSpeech ? `<span class="pos-tag">(${item.partsOfSpeech})</span>` : ''}
        <span class="hyphen">-</span>
        <span class="bn-meaning">${item.bengaliMeaning || '-'}</span>
      </td>
      <td class="synonym-cell">
        ${item.synonyms || '-'}
      </td>
      <td class="antonym-cell">
        ${item.antonyms && item.antonyms.trim() !== '' && item.antonyms.trim() !== '-' ? item.antonyms : '-'}
      </td>
    </tr>
  `).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>HSC English 1st Paper - Vocabulary Bank</title>
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
      padding: 10px;
      font-size: 11px;
      line-height: 1.35;
    }

    /* Textbook Guide Running Top Bar */
    .top-running-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 8px;
      font-size: 10px;
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Main Guide Header Box */
    .guide-header-box {
      border: 1.5px solid #0f172a;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 10px;
      background: #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .main-title {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.2px;
    }

    .sub-title {
      font-size: 10.5px;
      font-weight: 600;
      color: #047857;
      margin: 0;
    }

    .count-tag {
      font-size: 10px;
      font-weight: 800;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      border-radius: 4px;
    }

    /* Exact 3-Column Textbook Guide Table */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      border: 1.5px solid #0f172a;
    }

    thead th {
      background-color: #e2e8f0;
      color: #0f172a;
      text-align: left;
      padding: 6px 9px;
      font-weight: 800;
      font-size: 11px;
      border: 1px solid #475569;
      letter-spacing: 0.3px;
    }

    tbody tr {
      page-break-inside: avoid;
    }

    tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }

    tbody td {
      padding: 5px 8px;
      border: 1px solid #94a3b8;
      vertical-align: middle;
    }

    .word-meaning-cell {
      width: 38%;
      white-space: normal;
    }

    .eng-word {
      font-weight: 800;
      color: #0f172a;
      font-size: 11px;
    }

    .pos-tag {
      font-size: 8.5px;
      color: #64748b;
      font-weight: 600;
      margin-left: 2px;
    }

    .hyphen {
      margin: 0 3px;
      font-weight: 800;
      color: #0f172a;
    }

    .bn-meaning {
      font-family: 'Hind Siliguri', sans-serif;
      font-weight: 500;
      color: #1e293b;
      font-size: 10.5px;
    }

    .synonym-cell {
      width: 31%;
      color: #1e293b;
      font-weight: 500;
      font-size: 10px;
      line-height: 1.3;
    }

    .antonym-cell {
      width: 31%;
      color: #334155;
      font-weight: 500;
      font-size: 10px;
      line-height: 1.3;
    }

    /* Textbook Guide Bottom Banner */
    .guide-footer-bar {
      margin-top: 12px;
      padding-top: 6px;
      border-top: 1.5px solid #0f172a;
      text-align: center;
      font-size: 9px;
      color: #475569;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .guide-quote {
      font-family: 'Hind Siliguri', sans-serif;
      font-weight: 700;
      color: #0f172a;
      font-size: 9.5px;
    }

    @media print {
      body {
        padding: 0;
      }
      .guide-header-box {
        background: #f1f5f9 !important;
      }
      thead th {
        background-color: #e2e8f0 !important;
      }
      tbody tr:nth-child(even) {
        background-color: #f8fafc !important;
      }
    }
  </style>
</head>
<body>
  <div class="top-running-bar">
    <span>English 1st Paper</span>
    <span>${unitTitle}</span>
    <span>Vocabulary Sheet</span>
  </div>

  <div class="guide-header-box">
    <div>
      <h1 class="main-title">HSC English 1st Paper — Vocabulary Bank</h1>
      <p class="sub-title">${unitTitle} • ${lessonTitle}</p>
    </div>
    <div class="count-tag">
      Total: ${words.length} Words
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 38%;">Word meaning</th>
        <th style="width: 31%;">Synonym</th>
        <th style="width: 31%;">Antonym</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <div class="guide-footer-bar">
    <span>English Learner Dashboard</span>
    <span class="guide-quote">এইচএসসি ও এডমিশনে সাফল্যের পথে, চলো একসাথে...</span>
    <span>NCTB Board Standard</span>
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
