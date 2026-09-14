import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Printer, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  SlidersHorizontal,
  FileText,
  User,
  Building,
  GraduationCap,
  Scissors,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { hscVocabularyList, matchesUnitAndLesson } from '../data/questions/hscQuestionsData';
import { hscUnits } from '../data/hscUnitsData';
import { generatePrintableFlashcardsPDF } from '../utils/pdfGenerator';

export default function FlashcardPrintModal({
  isOpen,
  onClose,
  initialUnitId = 'all',
  initialLessonId = 'all',
  lang = 'bn',
  currentUser = null,
  weakWords = []
}) {
  const isBn = lang === 'bn';

  const [selectedUnitId, setSelectedUnitId] = useState(initialUnitId);
  const [selectedLessonId, setSelectedLessonId] = useState(initialLessonId);

  // Student details for personalization (saved to localStorage)
  const [pdfStudentName, setPdfStudentName] = useState(() => {
    try {
      const raw = localStorage.getItem('hsc_student_pdf_info');
      if (raw) return JSON.parse(raw).name || '';
    } catch (e) {}
    return currentUser?.name || '';
  });

  const [pdfCollege, setPdfCollege] = useState(() => {
    try {
      const raw = localStorage.getItem('hsc_student_pdf_info');
      if (raw) return JSON.parse(raw).college || '';
    } catch (e) {}
    return currentUser?.college || '';
  });

  const [pdfBatch, setPdfBatch] = useState(() => {
    try {
      const raw = localStorage.getItem('hsc_student_pdf_info');
      if (raw) return JSON.parse(raw).batch || 'HSC 2026';
    } catch (e) {}
    return currentUser?.hscBatch || currentUser?.batch || 'HSC 2026';
  });

  // Sync state when modal opens with initial props
  useEffect(() => {
    if (isOpen) {
      if (initialUnitId) setSelectedUnitId(initialUnitId);
      if (initialLessonId) setSelectedLessonId(initialLessonId);
      if (currentUser?.name && !pdfStudentName) setPdfStudentName(currentUser.name);
      if (currentUser?.college && !pdfCollege) setPdfCollege(currentUser.college);
      if ((currentUser?.hscBatch || currentUser?.batch) && !pdfBatch) setPdfBatch(currentUser.hscBatch || currentUser.batch);
    }
  }, [isOpen, initialUnitId, initialLessonId, currentUser]);

  // Find active unit object
  const activeUnitObj = useMemo(() => {
    if (selectedUnitId === 'all' || selectedUnitId === 'weak_only') return null;
    return hscUnits.find((u) => u.id === selectedUnitId) || null;
  }, [selectedUnitId]);

  // Lessons under selected unit
  const availableLessons = useMemo(() => {
    if (!activeUnitObj) return [];
    return activeUnitObj.lessons || [];
  }, [activeUnitObj]);

  // Handle unit selection change
  const handleUnitChange = (unitId) => {
    setSelectedUnitId(unitId);
    setSelectedLessonId('all');
  };

  // Filter vocabulary list based on selection
  const filteredWords = useMemo(() => {
    if (selectedUnitId === 'weak_only') {
      if (weakWords.length > 0) {
        return hscVocabularyList.filter((item) =>
          weakWords.some((w) => w && (w.id === item.id || w.word?.toLowerCase() === item.word?.toLowerCase()))
        );
      }
      return [];
    }
    return hscVocabularyList.filter((item) =>
      matchesUnitAndLesson(item, selectedUnitId, selectedLessonId)
    );
  }, [selectedUnitId, selectedLessonId, weakWords]);

  // Calculate pages and sheets
  const CARDS_PER_SHEET = 8;
  const totalSheets = Math.ceil(filteredWords.length / CARDS_PER_SHEET) || 1;
  const totalPages = totalSheets * 2;

  // Selected title labels for PDF header
  const unitTitleLabel = useMemo(() => {
    if (selectedUnitId === 'all') return isBn ? 'সবগুলো ইউনিট (All Units)' : 'All Units';
    if (selectedUnitId === 'weak_only') return isBn ? 'ব্যক্তিগত দুর্বল শব্দ তালিকা' : 'Weak Words Queue';
    if (activeUnitObj) {
      return `${activeUnitObj.unitNumber}: ${isBn ? activeUnitObj.unitTitleBn : activeUnitObj.unitTitle}`;
    }
    return 'HSC English';
  }, [selectedUnitId, activeUnitObj, isBn]);

  const lessonTitleLabel = useMemo(() => {
    if (selectedLessonId === 'all') return isBn ? 'সবগুলো লেসন' : 'All Lessons';
    const lObj = availableLessons.find((l) => l.id === selectedLessonId);
    if (lObj) return `${lObj.number}: ${isBn ? lObj.titleBn : lObj.title}`;
    return '';
  }, [selectedLessonId, availableLessons, isBn]);

  // Handle PDF Generation
  const handleGeneratePDF = (e) => {
    if (e) e.preventDefault();
    if (filteredWords.length === 0) return;

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

    generatePrintableFlashcardsPDF({
      words: filteredWords,
      unitTitle: unitTitleLabel,
      lessonTitle: lessonTitleLabel,
      studentInfo: {
        name: chosenName,
        college: chosenCollege,
        batch: chosenBatch
      },
      lang
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111724] border border-[#1e293b] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1e293b] flex items-center justify-between bg-gradient-to-r from-[#162032] via-[#111724] to-[#151c2d]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50">
              <Printer size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{isBn ? 'প্রিন্ট করার ফ্ল্যাশকার্ড পিডিএফ' : 'Printable Flashcards PDF'}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Duplex / এপিঠ-ওপিঠ
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn ? 'কাটার দাগ সহ এপিঠ-ওপিঠ প্রিন্ট করার রেডিমেড ফ্ল্যাশকার্ড' : 'Double-sided printable flashcards with crop cutting guides'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-slate-200 text-sm">
          
          {/* 1. Unit & Lesson Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-emerald-400" />
              <span>{isBn ? 'ইউনিট ও লেসন নির্বাচন করুন' : 'Select Unit & Lesson'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Unit Select */}
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">
                  {isBn ? '১. ইউনিট:' : '1. Unit:'}
                </span>
                <select
                  value={selectedUnitId}
                  onChange={(e) => handleUnitChange(e.target.value)}
                  className="w-full bg-[#161f30] border border-[#24334a] text-white text-xs rounded-xl px-3.5 py-3 outline-none focus:border-emerald-500 cursor-pointer font-medium shadow-inner"
                >
                  <option value="all">{isBn ? `সবগুলো ইউনিট (${hscVocabularyList.length} টি শব্দ)` : `All Units (${hscVocabularyList.length} Words)`}</option>
                  {weakWords.length > 0 && (
                    <option value="weak_only">⚠️ {isBn ? `ব্যক্তিগত দুর্বল শব্দসমূহ (${weakWords.length} টি)` : `Weak Words Queue (${weakWords.length} Words)`}</option>
                  )}
                  {hscUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.unitNumber}: {isBn ? u.unitTitleBn : u.unitTitle} ({u.totalWords} {isBn ? 'শব্দ' : 'words'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson Select */}
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">
                  {isBn ? '২. লেসন:' : '2. Lesson:'}
                </span>
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  disabled={selectedUnitId === 'all' || selectedUnitId === 'weak_only'}
                  className="w-full bg-[#161f30] border border-[#24334a] text-white text-xs rounded-xl px-3.5 py-3 outline-none focus:border-emerald-500 cursor-pointer font-medium shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="all">{isBn ? 'সবগুলো লেসন (All Lessons)' : 'All Lessons'}</option>
                  {availableLessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.number}: {isBn ? l.titleBn : l.title} ({l.wordsCount} {isBn ? 'শব্দ' : 'words'})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Visual Flashcard Specs & Stats Banner */}
          <div className="bg-[#0f1724] border border-[#1e2d44] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 font-semibold">
                <Layers size={14} className="text-cyan-400" />
                {isBn ? 'নির্বাচিত ফিল্টার সারসংক্ষেপ:' : 'Selected Filter Summary:'}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-xs">
                  {filteredWords.length} {isBn ? 'টি শব্দ' : 'Words'}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold font-mono text-xs">
                  {totalSheets} {isBn ? 'টি শীট' : 'Sheets'} ({totalPages} {isBn ? 'পেজ' : 'Pages'})
                </span>
              </div>
            </div>

            {/* Flashcard Duplex Anatomy Diagram */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#151e2d] border border-[#23334c] rounded-xl p-3 text-center space-y-1">
                <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <span>📄 বিজোড় পৃষ্ঠা (Front)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  বড় হরফে <strong>Word</strong> ও Part of Speech
                </p>
                <span className="text-[10px] text-slate-500 block">
                  (কোন সিরিয়াল নম্বর থাকবে না)
                </span>
              </div>

              <div className="bg-[#151e2d] border border-[#23334c] rounded-xl p-3 text-center space-y-1">
                <div className="text-[11px] font-bold text-cyan-400 flex items-center justify-center gap-1">
                  <span>🔄 জোড় পৃষ্ঠা (Back / Mirrored)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  <strong>বাংলা অর্থ</strong>, Synonyms, Antonyms ও Ex.
                </p>
                <span className="text-[10px] text-slate-500 block">
                  (এপিঠ-ওপিঠ মিলে যাওয়ার জন্য মিরর বিন্যাস)
                </span>
              </div>
            </div>
          </div>

          {/* 3. Optional Student Personalization */}
          <div className="space-y-3 pt-1">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User size={14} className="text-emerald-400" />
              <span>{isBn ? 'শিক্ষার্থীর পরিচিতি (ঐচ্ছিক)' : 'Student Details (Optional)'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">
                  {isBn ? 'নাম:' : 'Name:'}
                </span>
                <input
                  type="text"
                  value={pdfStudentName}
                  onChange={(e) => setPdfStudentName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-[#161f30] border border-[#24334a] text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">
                  {isBn ? 'কলেজ:' : 'College:'}
                </span>
                <input
                  type="text"
                  value={pdfCollege}
                  onChange={(e) => setPdfCollege(e.target.value)}
                  placeholder="e.g. Notre Dame College"
                  className="w-full bg-[#161f30] border border-[#24334a] text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-1">
                  {isBn ? 'ব্যাচ:' : 'Batch:'}
                </span>
                <input
                  type="text"
                  value={pdfBatch}
                  onChange={(e) => setPdfBatch(e.target.value)}
                  placeholder="HSC 2026"
                  className="w-full bg-[#161f30] border border-[#24334a] text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 4. Printing Instructions Callout */}
          <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-3.5 flex items-start gap-3">
            <Scissors size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-emerald-300">
                {isBn ? 'সহজ ৩ ধাপে নিজস্ব ফ্ল্যাশকার্ড তৈরি করুন:' : 'How to make your flashcards:'}
              </p>
              <ol className="list-decimal list-inside text-slate-400 space-y-0.5 text-[11px]">
                <li>{isBn ? 'পিডিএফ ওপেন করে প্রিন্টার সেটিংসে Two-Sided (Duplex): Flip on Long Edge সিলেক্ট করুন।' : 'In print dialog, enable Two-Sided Printing with Flip on Long Edge.'}</li>
                <li>{isBn ? 'এপিঠ-ওপিঠ প্রিন্ট শেষে কাঁচি দিয়ে প্রতিটি কার্ডের ড্যাশড বর্ডার বরাবর কেটে নিন।' : 'Print double-sided, then cut along the dashed lines with scissors.'}</li>
                <li>{isBn ? 'সামনে ওয়ার্ড দেখে রিভিশন দিন এবং পিছনে উল্টে অর্থ ও সিনোনিম মিলিয়ে নিন।' : 'Study the word on front and test recall against meaning/synonyms on back!'}</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#1e293b] bg-[#0c1017] flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#24334a] text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            onClick={handleGeneratePDF}
            disabled={filteredWords.length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <Printer size={15} />
            <span>
              {isBn 
                ? `🖨️ ফ্ল্যাশকার্ড পিডিএফ প্রিন্ট করুন (${filteredWords.length} টি শব্দ)` 
                : `Generate Flashcards PDF (${filteredWords.length} Words)`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}