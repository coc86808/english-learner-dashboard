/**
 * PDF Generator for HSC English Weak Words Revision Sheet
 * Format: Word | Meaning (Bangla) | Synonyms | Antonyms
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
      <td class="word-cell">
        ${idx + 1}. ${item.word}
        ${item.partsOfSpeech ? `<br><span class="pos-badge">${item.partsOfSpeech}</span>` : ''}
      </td>
      <td class="meaning-cell">
        ${item.bengaliMeaning || '-'}
      </td>
      <td class="synonym-cell">
        ${item.synonyms || '-'}
      </td>
      <td class="antonym-cell">
        ${item.antonyms || '-'}
      </td>
    </tr>
  `).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>HSC English - Weak Words Revision Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@400;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 12mm 10mm 12mm 10mm;
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
      padding: 16px;
      font-size: 11.5px;
      line-height: 1.35;
    }

    .header-container {
      border-bottom: 2.5px solid #059669;
      padding-bottom: 10px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #065f46;
      margin: 0 0 2px 0;
      letter-spacing: -0.5px;
    }

    .brand-subtitle {
      font-size: 12px;
      font-weight: 600;
      color: #047857;
      margin: 0;
    }

    .meta-box {
      text-align: right;
      font-size: 10.5px;
      color: #475569;
    }

    .meta-box strong {
      color: #0f172a;
    }

    .student-badge-card {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
    }

    .summary-pill {
      background-color: #059669;
      color: #ffffff;
      padding: 3px 8px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 10.5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 6px;
      font-size: 11px;
    }

    th {
      background-color: #065f46;
      color: #ffffff;
      text-align: left;
      padding: 8px 10px;
      font-weight: 700;
      font-size: 10.5px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border: 1px solid #065f46;
    }

    td {
      padding: 8px 10px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    .word-cell {
      font-weight: 700;
      color: #0f172a;
      font-size: 12px;
    }

    .pos-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 600;
      padding: 1px 4px;
      border-radius: 3px;
      background-color: #e2e8f0;
      color: #475569;
      margin-top: 2px;
    }

    .meaning-cell {
      color: #047857;
      font-weight: 600;
      font-family: 'Hind Siliguri', 'Inter', sans-serif;
      font-size: 11.5px;
    }

    .synonym-cell {
      color: #1e293b;
    }

    .antonym-cell {
      color: #b91c1c;
      font-weight: 500;
    }

    .footer {
      margin-top: 20px;
      padding-top: 10px;
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
        <th style="width: 18%;">Word</th>
        <th style="width: 32%;">Meaning (Bangla)</th>
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
      }, 400);
    };
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank', 'width=900,height=750');
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
    }, 400);
  }
}
