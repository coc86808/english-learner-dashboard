/**
 * PDF Generator for HSC English Vocabulary Bank & Weak Words Revision Sheet
 * Styled with Emerald Header, Color-Coded Bangla Meanings & Antonyms, and Student/Curriculum Badge
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
      <strong>Student Name:</strong> ${name} &nbsp;|&nbsp; 
      <strong>College:</strong> ${college} &nbsp;|&nbsp; 
      <strong>Batch:</strong> ${batch}
    </div>
    <div class="summary-pill">
      Total Weak Words: ${words.length}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 20%;">WORD</th>
        <th style="width: 30%;">MEANING (BANGLA)</th>
        <th style="width: 25%;">SYNONYMS</th>
        <th style="width: 25%;">ANTONYMS</th>
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
      <strong>Student:</strong> ${name} &nbsp;|&nbsp; 
      <strong>College:</strong> ${college} &nbsp;|&nbsp; 
      <strong>Batch:</strong> ${batch}
    </div>
    <div class="summary-pill">
      Total Words: ${words.length}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 20%;">WORD</th>
        <th style="width: 30%;">MEANING (BANGLA)</th>
        <th style="width: 25%;">SYNONYMS</th>
        <th style="width: 25%;">ANTONYMS</th>
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
