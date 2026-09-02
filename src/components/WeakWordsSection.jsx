import React, { useState, useEffect } from 'react';
import { 
  FileDown, 
  AlertCircle, 
  Search, 
  Volume2, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Play, 
  Sparkles,
  BookOpen,
  Printer,
  X
} from 'lucide-react';
import { generateWeakWordsPDF } from '../utils/pdfGenerator';
import { hscVocabularyList } from '../data/questions/hscQuestionsData';

export default function WeakWordsSection({ 
  weakWords = [], 
  onRemoveWeakWord, 
  onStartWeakWordsExam,
  onOpenFlashcards,
  lang = 'en',
  studentInfo = {},
  currentUser = null
}) {
  const isBn = lang === 'bn';
  const [searchQuery, setSearchQuery] = useState('');

  // PDF Export Customization Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfStudentName, setPdfStudentName] = useState(() => {
    try {
      if (currentUser?.name && currentUser.name !== 'Tanvir Ahmed' && currentUser.name !== 'HSC Candidate') {
        return currentUser.name;
      }
      if (studentInfo?.name && studentInfo.name !== 'Tanvir Ahmed' && studentInfo.name !== 'HSC Candidate') {
        return studentInfo.name;
      }
      const savedPdf = localStorage.getItem('hsc_student_pdf_info');
      if (savedPdf) {
        const p = JSON.parse(savedPdf);
        if (p.name) return p.name;
      }
      const savedAuth = localStorage.getItem('hsc_auth_user');
      if (savedAuth) {
        const a = JSON.parse(savedAuth);
        if (a.name && a.name !== 'Tanvir Ahmed') return a.name;
      }
    } catch (e) {}
    return '';
  });

  const [pdfCollege, setPdfCollege] = useState(() => {
    try {
      if (currentUser?.college && !currentUser.college.includes('Notre Dame College')) {
        return currentUser.college;
      }
      if (studentInfo?.college && !studentInfo.college.includes('Notre Dame College')) {
        return studentInfo.college;
      }
      const savedPdf = localStorage.getItem('hsc_student_pdf_info');
      if (savedPdf) {
        const p = JSON.parse(savedPdf);
        if (p.college) return p.college;
      }
      const savedAuth = localStorage.getItem('hsc_auth_user');
      if (savedAuth) {
        const a = JSON.parse(savedAuth);
        if (a.college && !a.college.includes('Notre Dame College')) return a.college;
      }
    } catch (e) {}
    return '';
  });

  const [pdfBatch, setPdfBatch] = useState(() => {
    return currentUser?.hscBatch || currentUser?.batch || studentInfo?.batch || 'HSC 2026';
  });

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name && currentUser.name !== 'Tanvir Ahmed' && currentUser.name !== 'HSC Candidate') {
        setPdfStudentName(currentUser.name);
      }
      if (currentUser.college && !currentUser.college.includes('Notre Dame College')) {
        setPdfCollege(currentUser.college);
      }
      if (currentUser.hscBatch || currentUser.batch) {
        setPdfBatch(currentUser.hscBatch || currentUser.batch);
      }
    }
  }, [currentUser]);

  // Use only genuine weak words tracked for this student (no fake fallback)
  const effectiveWeakWords = (Array.isArray(weakWords) ? weakWords : []).filter(
    (item) => Boolean(item && item.word)
  );

  const filteredWords = effectiveWeakWords.filter(item => {
    if (!item || !item.word) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.word && item.word.toLowerCase().includes(q)) ||
      (item.bengaliMeaning && item.bengaliMeaning.includes(q)) ||
      (item.synonyms && item.synonyms.toLowerCase().includes(q)) ||
      (item.antonyms && item.antonyms.toLowerCase().includes(q))
    );
  });

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDownloadPDF = () => {
    setIsPdfModalOpen(true);
  };

  const confirmDownloadPDF = (e) => {
    if (e) e.preventDefault();
    const chosenName = pdfStudentName.trim() || currentUser?.name || 'HSC Examinee';
    const chosenCollege = pdfCollege.trim() || currentUser?.college || '';
    const chosenBatch = pdfBatch.trim() || 'HSC 2026';

    try {
      localStorage.setItem('hsc_student_pdf_info', JSON.stringify({
        name: chosenName,
        college: chosenCollege,
        batch: chosenBatch
      }));
    } catch (err) {}

    generateWeakWordsPDF({
      words: effectiveWeakWords,
      studentInfo: {
        name: chosenName,
        college: chosenCollege,
        batch: chosenBatch
      },
      lang
    });

    setIsPdfModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#171b26] via-[#1a1824] to-[#171320] border border-[#2b2438] rounded-3xl p-5 sm:p-7 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
            <AlertCircle size={14} />
            <span>{isBn ? 'ব্যক্তিগত দুর্বল শব্দ তালিকা' : 'Personal Weak Words Collection'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isBn ? 'দুর্বল শব্দ ও রিভিশন শিট' : 'Weak Words & Revision Sheet'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            {isBn
              ? 'পরীক্ষায় ভুল হওয়া বা ফ্ল্যাশকার্ডে চিহ্নিত শব্দগুলো এখানে স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে। এক ক্লিকে বাংলা অর্থ, Synonyms ও Antonyms সহ PDF ডাউনলোড করুন।'
              : 'Words missed during exams or marked in flashcards are stored here. Download a clean PDF sheet with Bengali meanings, synonyms, and antonyms.'}
          </p>
        </div>

        {/* Action Buttons: Download PDF & Practice */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-rose-950/60 transition-all cursor-pointer active:scale-95"
            title="Download PDF format: Word | Meaning Bangla | Synonym | Antonym"
          >
            <FileDown size={17} />
            <span>{isBn ? '📄 PDF ডাউনলোড করুন' : '📄 Download PDF Sheet'}</span>
          </button>

          {/* Practice in Flashcards */}
          {onOpenFlashcards && (
            <button
              onClick={onOpenFlashcards}
              className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-[#1d2232] hover:bg-[#262f45] border border-[#2b374f] text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Layers size={16} />
              <span>{isBn ? 'ফ্ল্যাশকার্ডে পড়ুন' : 'Practice in Flashcards'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'শব্দ, অর্থ বা সমার্থক শব্দ খুঁজুন...' : 'Search word, meaning or synonym...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111622] border border-[#1e2738] text-slate-200 text-xs sm:text-sm placeholder:text-slate-500 outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold self-end sm:self-center">
          <span>{isBn ? 'মোট দুর্বল শব্দ:' : 'Total Weak Words:'}</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-sm">
            {effectiveWeakWords.length}
          </span>
        </div>
      </div>

      {/* Weak Words Table / Cards Display */}
      {filteredWords.length > 0 ? (
        <div className="bg-[#10141f] border border-[#1e2738] rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#151c2a] border-b border-[#212b3d] text-slate-300 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">{isBn ? 'শব্দ (Word)' : 'Word'}</th>
                  <th className="py-3.5 px-4">{isBn ? 'বাংলা অর্থ (Meaning)' : 'Meaning (Bangla)'}</th>
                  <th className="py-3.5 px-4">{isBn ? 'সমার্থক শব্দ (Synonyms)' : 'Synonyms'}</th>
                  <th className="py-3.5 px-4">{isBn ? 'বিপরীত শব্দ (Antonyms)' : 'Antonyms'}</th>
                  <th className="py-3.5 px-3 text-center">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172030]">
                {filteredWords.map((item, index) => (
                  <tr 
                    key={item.id || index}
                    className="hover:bg-[#151b28] transition-colors group"
                  >
                    {/* Word + POS */}
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(item.word)}
                          className="p-1 rounded bg-[#1b2333] hover:bg-emerald-500/20 text-emerald-400 border border-[#27354d] transition-all"
                          title="Speak"
                        >
                          <Volume2 size={13} />
                        </button>
                        <span>{item.word}</span>
                        {item.partsOfSpeech && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#1c2436] text-slate-400">
                            {item.partsOfSpeech}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Bengali Meaning */}
                    <td className="py-3 px-4 text-emerald-300 font-semibold font-siliguri leading-snug">
                      {item.bengaliMeaning || '-'}
                    </td>

                    {/* Synonyms */}
                    <td className="py-3 px-4 text-slate-300 leading-snug">
                      {item.synonyms || '-'}
                    </td>

                    {/* Antonyms */}
                    <td className="py-3 px-4 text-rose-300 leading-snug">
                      {item.antonyms || '-'}
                    </td>

                    {/* Action (Remove / Mark Mastered) */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {onRemoveWeakWord && (
                        <button
                          onClick={() => onRemoveWeakWord(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all cursor-pointer"
                          title="Remove from weak list"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-[#10141f] border border-[#1e2738] rounded-2xl p-6">
          <CheckCircle2 size={40} className="mx-auto text-emerald-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            {isBn ? 'কোনো দুর্বল শব্দ নেই!' : 'No Weak Words Found!'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isBn
              ? 'আপনার সব ভোকাবুলারি আয়ত্তে রয়েছে। ফ্ল্যাশকার্ড বা পরীক্ষা দেওয়ার সময় ভুল হওয়া শব্দগুলো এখানে দেখাবে।'
              : 'You have mastered all tracked words! Any missed words from exams or flashcards will appear here.'}
          </p>
        </div>
      )}

      {/* PDF Export Customization Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#111723] border border-rose-500/40 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                  <Printer size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {isBn ? 'দুর্বল শব্দ PDF মুদ্রণ' : 'Weak Words PDF Export'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? 'আপনার নাম ও কলেজের তথ্য অনুযায়ী শিট প্রিন্ট হবে' : 'Personalize student name and college on the PDF'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={confirmDownloadPDF} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>{isBn ? 'শিক্ষার্থীর নাম (Student Name):' : 'Student Name:'}</span>
                  {currentUser?.name && (
                    <span className="text-[10px] text-emerald-400 font-semibold">{isBn ? '✓ সংরক্ষিত' : '✓ Synced'}</span>
                  )}
                </label>
                <input
                  type="text"
                  value={pdfStudentName}
                  onChange={(e) => setPdfStudentName(e.target.value)}
                  placeholder={isBn ? 'আপনার নাম লিখুন' : 'Enter student full name'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-white text-xs outline-none focus:border-rose-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isBn ? 'কলেজের নাম (College Name):' : 'College Name:'}
                </label>
                <input
                  type="text"
                  value={pdfCollege}
                  onChange={(e) => setPdfCollege(e.target.value)}
                  placeholder={isBn ? 'যেমন: ঢাকা কলেজ / নটর ডেম কলেজ' : 'e.g. Dhaka College / Notre Dame'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-white text-xs outline-none focus:border-rose-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isBn ? 'এইচএসসি ব্যাচ:' : 'HSC Batch:'}
                  </label>
                  <input
                    type="text"
                    value={pdfBatch}
                    onChange={(e) => setPdfBatch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-white text-xs outline-none focus:border-rose-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isBn ? 'দুর্বল শব্দ:' : 'Weak Words:'}
                  </label>
                  <div className="px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-rose-400 font-bold text-xs flex items-center">
                    {effectiveWeakWords.length} {isBn ? 'টি শব্দ' : 'Words'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-950/60 cursor-pointer active:scale-95 transition-all"
                >
                  <Printer size={15} />
                  <span>{isBn ? '📄 PDF তৈরি ও প্রিন্ট করুন' : 'Generate & Print PDF'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
