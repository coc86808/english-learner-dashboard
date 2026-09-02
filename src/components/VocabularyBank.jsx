import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Volume2,
  Download,
  Printer,
  Sparkles,
  Filter,
  Bookmark,
  Check,
  GraduationCap,
  Layers,
  ArrowUpDown,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  FileText,
  X,
  Award,
  AlertCircle,
  Play,
  RotateCcw,
  ListFilter,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { hscVocabularyList, matchesUnitAndLesson } from '../data/questions';
import { hscUnits } from '../data/hscUnitsData';
import { generateVocabularyBankPDF } from '../utils/pdfGenerator';

export default function VocabularyBank({
  lang = 'en',
  onStartExam,
  onOpenFlashcards,
  weakWords = [],
  onToggleWeakWord,
  navigate,
  currentUser = null
}) {
  const isBn = lang === 'bn';

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState('all');
  const [selectedLessonId, setSelectedLessonId] = useState('all');
  const [selectedBoardFilter, setSelectedBoardFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all'); // 'all' | 'weak' | 'clean'
  const [selectedPosFilter, setSelectedPosFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'az' | 'za'

  // Words to Learn Limit State (DEFAULT = 10)
  const [wordsLimit, setWordsLimit] = useState(10); // 10 | 20 | 30 | 50 | 'all'
  const [currentPage, setCurrentPage] = useState(1);

  // View Mode State ('card' on mobile by default, user can switch to 'table')
  const [viewMode, setViewMode] = useState('card');
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);

  // PDF Export Customization Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfStudentName, setPdfStudentName] = useState(() => {
    try {
      if (currentUser?.name && currentUser.name !== 'Tanvir Ahmed' && currentUser.name !== 'HSC Candidate') {
        return currentUser.name;
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
    return currentUser?.hscBatch || currentUser?.batch || 'HSC 2026';
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

  // Interactive Expandable Rows State
  const [expandedWordIds, setExpandedWordIds] = useState(new Set());

  // Audio Pronunciation State
  const [speakingWord, setSpeakingWord] = useState(null);

  // Play Native TTS English Pronunciation
  const handleSpeak = (word, e) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    setSpeakingWord(word);
    utterance.onend = () => setSpeakingWord(null);
    utterance.onerror = () => setSpeakingWord(null);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle Row Expansion
  const toggleRowExpansion = (id) => {
    setExpandedWordIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Find currently selected unit object
  const activeUnitObj = useMemo(() => {
    if (selectedUnitId === 'all') return null;
    return hscUnits.find((u) => u.id === selectedUnitId);
  }, [selectedUnitId]);

  // Lessons available under currently selected unit
  const availableLessons = useMemo(() => {
    if (!activeUnitObj) return [];
    return activeUnitObj.lessons || [];
  }, [activeUnitObj]);

  // Handle Unit Selection Change (resets lesson to 'all')
  const handleUnitChange = (unitId) => {
    setSelectedUnitId(unitId);
    setSelectedLessonId('all');
  };

  // Check if a word is in weak words list
  const isWeak = (item) => {
    return weakWords.some(
      (w) => (w.id && w.id === item.id) || (w.word && w.word.toLowerCase() === item.word.toLowerCase())
    );
  };

  // Extract unique boards available in the dataset for filtering
  const boardFilterOptions = useMemo(() => {
    return [
      { id: 'all', label: isBn ? 'সকল শব্দাবলী (All Words)' : 'All Words (Full Bank)' },
      { id: 'redMark', label: isBn ? '🔥 রেড মার্ক শব্দ (২০৬টি)' : '🔥 Red Mark Inter-Unit (206)' },
      { id: 'multiSource', label: isBn ? '📚 একাধিক লেসনে উপস্থিত শব্দ' : '📚 Multi-Lesson Words' },
      { id: 'weak', label: isBn ? '⚠️ দুর্বল শব্দাবলী (Weak Words)' : '⚠️ Weak Words Queue' }
    ];
  }, [isBn]);

  // Words limit options
  const limitOptions = useMemo(() => {
    return [
      { value: 10, label: isBn ? '১০টি শব্দ (ডিফল্ট)' : '10 Words (Default)' },
      { value: 20, label: isBn ? '২০টি শব্দ' : '20 Words' },
      { value: 30, label: isBn ? '৩০টি শব্দ' : '30 Words' },
      { value: 50, label: isBn ? '৫০টি শব্দ' : '50 Words' },
      { value: 'all', label: isBn ? 'সকল শব্দ (All Words)' : 'All Words' }
    ];
  }, [isBn]);

  // Filtered vocabulary list (full pool matching filters)
  const filteredList = useMemo(() => {
    return hscVocabularyList.filter((item) => {
      // 1. Unit & Lesson filter
      if (!matchesUnitAndLesson(item, selectedUnitId, selectedLessonId)) {
        return false;
      }

      // 2. Word Status / Category Filter
      if (selectedBoardFilter === 'redMark') {
        if (!item.isCrossReferenced) return false;
      } else if (selectedBoardFilter === 'multiSource') {
        if (!item.sources || item.sources.length <= 1) return false;
      } else if (selectedBoardFilter === 'weak') {
        if (!isWeak(item)) return false;
      }

      // 3. Status Filter (Weak Words vs Red Mark vs Clean/Mastered)
      if (selectedStatusFilter === 'weak') {
        if (!isWeak(item)) return false;
      } else if (selectedStatusFilter === 'redMark') {
        if (!item.isCrossReferenced) return false;
      } else if (selectedStatusFilter === 'clean') {
        if (isWeak(item)) return false;
      }

      // 4. Part of Speech filter
      if (selectedPosFilter !== 'all') {
        if (
          !item.partsOfSpeech ||
          !item.partsOfSpeech.toLowerCase().includes(selectedPosFilter.toLowerCase())
        ) {
          return false;
        }
      }

      // 5. Search Query filter (Word, Bengali meaning, Synonym, Antonym, English definition, Example, Board tag)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchWord = item.word && item.word.toLowerCase().includes(q);
        const matchBn = item.bengaliMeaning && item.bengaliMeaning.toLowerCase().includes(q);
        const matchSyn = item.synonyms && item.synonyms.toLowerCase().includes(q);
        const matchAnt = item.antonyms && item.antonyms.toLowerCase().includes(q);
        const matchEng = item.englishMeaning && item.englishMeaning.toLowerCase().includes(q);
        const matchEx = item.exampleSentence && item.exampleSentence.toLowerCase().includes(q);
        const matchTag = item.boardExamTag && item.boardExamTag.toLowerCase().includes(q);
        if (!matchWord && !matchBn && !matchSyn && !matchAnt && !matchEng && !matchEx && !matchTag) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Prioritize Red-Marked words with inter-unit connections to the top
      if (sortBy === 'default' || sortBy === 'redMark') {
        if (a.isCrossReferenced && !b.isCrossReferenced) return -1;
        if (!a.isCrossReferenced && b.isCrossReferenced) return 1;
        if (a.isCrossReferenced && b.isCrossReferenced) {
          return (b.crossRefMatchCount || 0) - (a.crossRefMatchCount || 0);
        }
      }
      if (sortBy === 'az') return a.word.localeCompare(b.word);
      if (sortBy === 'za') return b.word.localeCompare(a.word);
      return 0;
    });
  }, [
    searchQuery,
    selectedUnitId,
    selectedLessonId,
    selectedBoardFilter,
    selectedStatusFilter,
    selectedPosFilter,
    sortBy,
    activeUnitObj,
    availableLessons,
    weakWords
  ]);

  // Reset page to 1 whenever filters or limit change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedUnitId, selectedLessonId, selectedBoardFilter, selectedStatusFilter, selectedPosFilter, sortBy, wordsLimit]);

  // Pagination & Displayed Slice Logic
  const totalFilteredCount = filteredList.length;
  const isLimitAll = wordsLimit === 'all';
  const limitNum = isLimitAll ? totalFilteredCount : Number(wordsLimit) || 10;
  const totalPages = isLimitAll ? 1 : Math.max(1, Math.ceil(totalFilteredCount / limitNum));

  // Safe current page within range
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = isLimitAll ? 0 : (safeCurrentPage - 1) * limitNum;
  const endIndex = isLimitAll ? totalFilteredCount : Math.min(startIndex + limitNum, totalFilteredCount);

  const displayedList = useMemo(() => {
    if (isLimitAll) return filteredList;
    return filteredList.slice(startIndex, endIndex);
  }, [filteredList, isLimitAll, startIndex, endIndex]);

  const expandAll = () => {
    const allIds = new Set(displayedList.map((item) => item.id || item.word));
    setExpandedWordIds(allIds);
  };

  const collapseAll = () => {
    setExpandedWordIds(new Set());
  };

  const handleDownloadPDF = () => {
    setIsPdfModalOpen(true);
  };

  const confirmDownloadPDF = (e) => {
    if (e) e.preventDefault();
    const unitTitle =
      selectedUnitId === 'all'
        ? isBn
          ? 'সকল ইউনিট'
          : 'All Units'
        : activeUnitObj?.unitNumber + ': ' + activeUnitObj?.unitTitle;

    const lessonObj = availableLessons.find((l) => l.id === selectedLessonId);
    const lessonTitle =
      selectedLessonId === 'all'
        ? selectedUnitId === 'all'
          ? isBn
            ? 'সকল লেসন'
            : 'All Lessons'
          : `${isBn ? 'সকল লেসন' : 'All Lessons'} (${activeUnitObj?.unitNumber})`
        : lessonObj
        ? `${lessonObj.number}: ${lessonObj.title}`
        : 'Selected Lesson';

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

    // Export the currently active filtered set with authentic student details
    generateVocabularyBankPDF({
      words: filteredList,
      unitTitle,
      lessonTitle,
      studentInfo: {
        name: chosenName,
        college: chosenCollege,
        batch: chosenBatch
      },
      lang
    });

    setIsPdfModalOpen(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedUnitId !== 'all' ||
    selectedLessonId !== 'all' ||
    selectedBoardFilter !== 'all' ||
    selectedStatusFilter !== 'all' ||
    selectedPosFilter !== 'all' ||
    sortBy !== 'default' ||
    wordsLimit !== 10;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedUnitId('all');
    setSelectedLessonId('all');
    setSelectedBoardFilter('all');
    setSelectedStatusFilter('all');
    setSelectedPosFilter('all');
    setSortBy('default');
    setWordsLimit(10);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      {/* Top Banner & NCTB Header Card with Glassmorphic Gradient */}
      <div className="no-print p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#111723] via-[#0d1320] to-[#121927] border border-[#1e293b] shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <BookOpen size={13} />
              <span>{isBn ? 'অফিসিয়াল এনসিটিবি শিট' : 'Official NCTB Guide Sheet'}</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {isBn ? 'ভোকাবুলারি ব্যাংক (Vocabulary Bank)' : 'HSC Vocabulary Bank'}
            </h1>
            <p className="hidden sm:block text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isBn
                ? 'পাঠ্যবই ও বোর্ড স্ট্যান্ডার্ড প্রতিটি শব্দের বাংলা অর্থ, সমার্থক শব্দ (Synonyms), বিপরীত শব্দ (Antonyms), ইংরেজি সংজ্ঞা ও বাক্যে প্রয়োগের পূর্ণাঙ্গ শিট। একবারে কতটি শব্দ শিখবেন তা পছন্দ করুন (ডিফল্ট: ১০টি)।'
                : 'Interactive 4-column textbook sheet with Bengali Meanings, Synonyms, Antonyms, English Definitions, and Board Exam Tags. Choose how many words to learn at a time (Default: 10).'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer transition-all active:scale-95"
            >
              <Download size={16} />
              <span>{isBn ? 'PDF ডাউনলোড / প্রিন্ট' : 'Download PDF / Print'}</span>
            </button>

            {onStartExam && (
              <button
                onClick={onStartExam}
                className="px-4 py-2.5 rounded-xl bg-[#162033] hover:bg-[#1f2d48] text-slate-200 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#2b3b59] cursor-pointer transition-all active:scale-95 shadow-md"
              >
                <GraduationCap size={16} className="text-emerald-400" />
                <span>{isBn ? 'MCQ পরীক্ষা দিন' : 'Take MCQ Exam'}</span>
              </button>
            )}

            {onOpenFlashcards && (
              <button
                onClick={onOpenFlashcards}
                className="px-4 py-2.5 rounded-xl bg-[#141b2a] hover:bg-[#1c273c] text-amber-300 text-xs sm:text-sm font-bold flex items-center gap-2 border border-amber-500/30 cursor-pointer transition-all active:scale-95 shadow-md"
              >
                <Layers size={16} />
                <span>{isBn ? 'ফ্ল্যাশকার্ড' : 'Flashcards'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-Level Filter Controls */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#1e293b] space-y-3.5">
          {/* Mobile Filter Toggle Header (Visible only on mobile) */}
          <div className="flex sm:hidden items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'শব্দ বা অর্থ খুঁজুন...' : 'Search word or meaning...'}
                className="w-full pl-8 pr-7 py-2 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowMobileFilterDrawer(!showMobileFilterDrawer)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                showMobileFilterDrawer || selectedUnitId !== 'all' || selectedStatusFilter !== 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-[#141b2a] text-slate-300 border-[#1e293b]'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>{isBn ? 'ফিল্টার' : 'Filters'}</span>
              {(selectedUnitId !== 'all' || selectedStatusFilter !== 'all') && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          </div>

          {/* Filter Dropdowns Grid (Always visible on desktop, toggleable on mobile) */}
          <div className={`${showMobileFilterDrawer ? 'grid' : 'hidden sm:grid'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3`}>
            {/* 1. SELECT UNIT */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookMarked size={12} className="text-emerald-400" />
                <span>{isBn ? '১. ইউনিট নির্বাচন' : '1. Select Unit'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedUnitId}
                  onChange={(e) => handleUnitChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none font-medium"
                >
                  <option value="all">
                    {isBn ? `সকল ইউনিট (${hscVocabularyList.length}টি শব্দ)` : `All Units (${hscVocabularyList.length} Words)`}
                  </option>
                  {hscUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.unitNumber}: {u.unitTitle} ({u.totalWords} {isBn ? 'শব্দ' : 'Words'})
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 2. SELECT LESSON */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen size={12} className="text-cyan-400" />
                <span>{isBn ? '২. লেসন নির্বাচন' : '2. Select Lesson'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  disabled={selectedUnitId === 'all'}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border text-xs sm:text-sm outline-none cursor-pointer appearance-none font-medium ${
                    selectedUnitId === 'all'
                      ? 'border-[#1a2333] text-slate-500 cursor-not-allowed'
                      : 'border-[#1e293b] text-slate-200 focus:border-emerald-500'
                  }`}
                >
                  {selectedUnitId === 'all' ? (
                    <option value="all">{isBn ? 'সকল লেসনের শব্দ' : 'All Lessons'}</option>
                  ) : (
                    <>
                      <option value="all">
                        {isBn
                          ? `সকল লেসন (${activeUnitObj?.totalWords || 0} শব্দ)`
                          : `All Lessons in ${activeUnitObj?.unitNumber} (${activeUnitObj?.totalWords || 0} Words)`}
                      </option>
                      {availableLessons.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.number}: {l.title} ({l.wordsCount || 0} {isBn ? 'শব্দ' : 'Words'})
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 3. WORDS TO LEARN LIMIT SELECTOR (Default 10) */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ListFilter size={12} className="text-emerald-400" />
                <span>{isBn ? '৩. পড়ার শব্দ সংখ্যা' : '3. Words to Learn'}</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-black">
                  {isBn ? 'ডিফল্ট ১০' : 'Def 10'}
                </span>
              </label>
              <div className="relative">
                <select
                  value={wordsLimit}
                  onChange={(e) => {
                    const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                    setWordsLimit(val);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 outline-none focus:border-emerald-400 cursor-pointer appearance-none font-bold shadow-inner"
                >
                  {limitOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none" />
              </div>
            </div>

            {/* 4. SEARCH BAR (Desktop) */}
            <div className="hidden sm:block relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Search size={12} className="text-amber-400" />
                <span>{isBn ? '৪. শব্দ অনুসন্ধান' : '4. Search Word'}</span>
              </label>
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? 'শব্দ, অর্থ, সিনোনিম...' : 'Word, synonym, meaning...'}
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* 5. BOARD EXAM & STATUS FILTER */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-purple-400" />
                <span>{isBn ? '৫. ফিল্টার ও ধরন' : '5. Filter & Status'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedBoardFilter}
                  onChange={(e) => setSelectedBoardFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none font-medium"
                >
                  {boardFilterOptions.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Filter Chips & Words Limit Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-[#1a2334]/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-semibold">{isBn ? 'পড়ার সংখ্যা:' : 'Words Limit:'}</span>

              {/* Quick Word Limit Pills */}
              <div className="inline-flex rounded-lg bg-[#0c0f17] border border-emerald-500/30 p-0.5">
                {[10, 20, 30, 50, 'all'].map((lim) => (
                  <button
                    key={lim}
                    onClick={() => setWordsLimit(lim)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      wordsLimit === lim
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-emerald-300'
                    }`}
                  >
                    {lim === 'all' ? (isBn ? 'সব' : 'All') : lim}
                    {lim === 10 && <span className="ml-1 text-[9px] opacity-75">★</span>}
                  </button>
                ))}
              </div>

              {/* Status Toggles: Weak Words & Task 2 Red Mark */}
              <button
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'weak' ? 'all' : 'weak')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  selectedStatusFilter === 'weak'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50 ring-1 ring-rose-400'
                    : 'bg-[#141b2a] text-rose-300 hover:bg-rose-950/30 border border-rose-500/30'
                }`}
              >
                <Bookmark size={12} className="fill-current" />
                <span>{isBn ? `দুর্বল শব্দ (${weakWords.length})` : `Weak Words (${weakWords.length})`}</span>
              </button>

              <button
                onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'redMark' ? 'all' : 'redMark')}
                className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  selectedStatusFilter === 'redMark'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/60 ring-2 ring-rose-400'
                    : 'bg-[#1a121c] text-rose-300 hover:bg-rose-950/40 border border-rose-500/40'
                }`}
              >
                <span className="text-xs">🔥</span>
                <span>{isBn ? 'রেড মার্ক শব্দাবলী' : 'Red Mark Key Words'}</span>
              </button>

              {/* Part of Speech Quick Filter */}
              <div className="inline-flex rounded-lg bg-[#0c0f17] border border-[#1e293b] p-0.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'noun', label: 'Noun' },
                  { id: 'verb', label: 'Verb' },
                  { id: 'adjective', label: 'Adj' },
                  { id: 'adverb', label: 'Adv' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setSelectedPosFilter(pos.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      selectedPosFilter === pos.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {/* Sort A-Z */}
              <button
                onClick={() => setSortBy(sortBy === 'az' ? (sortBy === 'za' ? 'default' : 'za') : 'az')}
                className={`px-3 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all ${
                  sortBy !== 'default'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-[#141b2a] text-slate-400 border-[#1e293b] hover:text-slate-200'
                }`}
              >
                <ArrowUpDown size={12} />
                <span>{sortBy === 'az' ? 'A → Z' : sortBy === 'za' ? 'Z → A' : (isBn ? 'সাজান (A-Z)' : 'Sort A-Z')}</span>
              </button>
            </div>

            {/* View Mode Switcher: Cards vs Table */}
            <div className="inline-flex rounded-xl bg-[#0c0f17] border border-[#1e293b] p-0.5 shadow-inner">
              <button
                onClick={() => setViewMode('card')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'card'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>{isBn ? 'কার্ড' : 'Cards'}</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={13} />
                <span>{isBn ? 'টেবিল' : 'Table'}</span>
              </button>
            </div>

            {/* Expand / Collapse All & Showing Counter */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-slate-300">
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  onClick={expandAll}
                  className="px-2 py-1 rounded bg-[#162033] hover:bg-[#1f2d48] border border-[#233148] text-slate-300 hover:text-white transition-all font-semibold cursor-pointer text-[10px] sm:text-[11px]"
                >
                  {isBn ? 'সব প্রসারিত' : 'Expand All'}
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2 py-1 rounded bg-[#162033] hover:bg-[#1f2d48] border border-[#233148] text-slate-300 hover:text-white transition-all font-semibold cursor-pointer text-[10px] sm:text-[11px]"
                >
                  {isBn ? 'সব গুটিয়ে' : 'Collapse All'}
                </button>
              </div>

              <span className="font-medium text-slate-300 text-xs">
                {isBn ? 'প্রদর্শিত: ' : 'Showing: '}
                <strong className="text-emerald-400 font-bold">
                  {totalFilteredCount > 0 ? `${startIndex + 1} - ${endIndex}` : 0}
                </strong>{' '}
                / {totalFilteredCount} {isBn ? 'শব্দ' : 'words'}
                {!isLimitAll && totalPages > 1 && (
                  <span className="text-slate-400 text-[11px] ml-1 hidden sm:inline">
                    ({isBn ? `পৃষ্ঠা ${safeCurrentPage}/${totalPages}` : `Page ${safeCurrentPage}/${totalPages}`})
                  </span>
                )}
              </span>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-amber-400 hover:underline cursor-pointer font-bold ml-1 text-xs"
                >
                  {isBn ? 'রিসেট' : 'Reset All'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Vocabulary Container (Cards View or Sticky Table View) */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {viewMode === 'card' ? (
          <div className="p-3 sm:p-5">
            {displayedList.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 sm:gap-4">
                {displayedList.map((item, index) => {
                  const serialNum = startIndex + index + 1;
                  const weak = isWeak(item);
                  const isAudioActive = speakingWord === item.word;

                  return (
                    <div
                      key={item.id || index}
                      className={`p-4 rounded-2xl border transition-all duration-200 ${
                        item.isCrossReferenced
                          ? 'bg-gradient-to-b from-[#1a1322] via-[#121622] to-[#121622] border-rose-500/40 shadow-lg shadow-rose-950/20'
                          : 'bg-[#131926] border-[#1e293b] hover:border-emerald-500/40'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            <span className="text-xs font-mono text-slate-500 font-bold">#{serialNum}</span>
                            <h3 className="text-lg font-black text-white tracking-tight">{item.word}</h3>
                            {item.partsOfSpeech && (
                              <span className="px-2 py-0.5 rounded-md bg-[#1e2a3d] border border-[#2b3b55] text-slate-300 text-[10px] font-bold">
                                {item.partsOfSpeech}
                              </span>
                            )}
                            {item.boardExamTag && (
                              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[10px] font-bold flex items-center gap-1">
                                <BookOpen size={10} />
                                <span>{item.boardExamTag}</span>
                              </span>
                            )}
                          </div>

                          {item.isCrossReferenced && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-bold mb-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                              <span>{isBn ? 'রেড মার্ক: আন্তঃসম্পর্কিত' : 'Red Mark: Inter-Unit'}</span>
                            </div>
                          )}
                          {item.sources && item.sources.length > 1 && (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[9px] font-bold mb-1 ml-1">
                              📚 {item.sources.length} {isBn ? 'লেসনে' : 'lessons'}
                            </span>
                          )}
                        </div>

                        {/* Quick Audio & Bookmark */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => handleSpeak(item.word, e)}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                              isAudioActive
                                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300 shadow-md'
                                : 'bg-[#1a2334] text-emerald-400 hover:bg-[#22314a] border border-[#273752]'
                            }`}
                            title="Pronounce"
                          >
                            <Volume2 size={16} />
                          </button>
                          {onToggleWeakWord && (
                            <button
                              onClick={() => onToggleWeakWord(item)}
                              className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                                weak
                                  ? 'bg-rose-500 text-white shadow-md'
                                  : 'bg-[#1a2334] text-slate-400 hover:text-amber-400 hover:bg-[#22314a] border border-[#273752]'
                              }`}
                              title={weak ? 'Remove from weak words' : 'Mark as weak word'}
                            >
                              <Bookmark size={16} className={weak ? 'fill-current' : ''} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Bengali Meaning */}
                      <div className="mt-2.5 p-3 rounded-xl bg-[#0c121e] border border-emerald-500/25">
                        <span className="text-[10px] uppercase font-bold text-emerald-400/80 tracking-wider block mb-0.5">
                          🇧🇩 {isBn ? 'বাংলা অর্থ' : 'Bangla Meaning'}
                        </span>
                        <p className="text-base sm:text-lg font-black text-emerald-300 leading-snug">
                          {item.bengaliMeaning}
                        </p>
                      </div>

                      {/* Synonyms & Antonyms */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                        <div className="p-2.5 rounded-xl bg-[#0c121e] border border-[#1a2538]">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                            🔄 {isBn ? 'সমার্থক শব্দ (Synonyms)' : 'Synonyms'}
                          </span>
                          <p className="text-xs text-slate-200 font-medium leading-relaxed">
                            {item.synonyms || '—'}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#0c121e] border border-rose-950/50">
                          <span className="text-[10px] uppercase font-bold text-rose-400/80 tracking-wider block mb-0.5">
                            🔀 {isBn ? 'বিপরীত শব্দ (Antonyms)' : 'Antonyms'}
                          </span>
                          <p className="text-xs text-rose-300 font-medium leading-relaxed">
                            {item.antonyms || '—'}
                          </p>
                        </div>
                      </div>

                      {/* English Definition */}
                      {item.englishMeaning && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-[#0c121e]/60 border border-[#1a2538]">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                            📖 {isBn ? 'ইংরেজি সংজ্ঞা' : 'English Definition'}
                          </span>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            {item.englishMeaning}
                          </p>
                        </div>
                      )}

                      {/* Verbatim Textbook Example Sentence */}
                      {item.exampleSentence && (
                        <div className="mt-2.5 p-3 rounded-xl bg-[#090f18] border border-cyan-950/60">
                          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-1 flex items-center gap-1">
                            <BookOpen size={11} />
                            <span>{isBn ? 'পাঠ্যবইয়ের প্রামাণিক বাক্য' : 'Textbook Passage Sentence'}</span>
                          </span>
                          <p className="text-xs text-slate-300 italic leading-relaxed">
                            "{item.exampleSentence}"
                          </p>
                        </div>
                      )}

                      {/* Card Footer */}
                      <div className="mt-3 pt-2.5 border-t border-[#1a2538] flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                          {item.unit}
                        </span>
                        {onStartExam && (
                          <button
                            onClick={() => onStartExam(item.unit, item.lesson)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
                          >
                            <span>{isBn ? 'MCQ পরীক্ষা' : 'Practice MCQ'}</span>
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                    <Filter size={24} />
                  </div>
                  <p className="text-base font-bold text-white">
                    {isBn ? 'এই ফিল্টারে কোনো শব্দ পাওয়া যায়নি।' : 'No vocabulary words found for this selection.'}
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {isBn ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[780px] overflow-y-auto relative">
            <table className="w-full text-left border-collapse">
            {/* Sticky Emerald Header */}
            <thead className="sticky top-0 z-20 bg-[#065f46] text-white shadow-lg backdrop-blur-md">
              <tr className="text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                <th className="py-4 px-4 sm:px-6 w-[24%] border-r border-[#047857]">
                  <div className="flex items-center gap-1.5">
                    <span>Word</span>
                  </div>
                </th>
                <th className="py-4 px-4 sm:px-6 w-[28%] border-r border-[#047857]">
                  <div className="flex items-center gap-1.5">
                    <span>Meaning (Bangla)</span>
                  </div>
                </th>
                <th className="py-4 px-4 sm:px-6 w-[24%] border-r border-[#047857]">
                  <div className="flex items-center gap-1.5">
                    <span>Synonyms</span>
                  </div>
                </th>
                <th className="py-4 px-4 sm:px-6 w-[24%]">
                  <div className="flex items-center gap-1.5">
                    <span>Antonyms</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Alternating Shaded Rows with Expandable Details */}
            <tbody className="divide-y divide-[#1b2537] text-xs sm:text-sm font-sans">
              {displayedList.length > 0 ? (
                displayedList.map((item, index) => {
                  const serialNum = startIndex + index + 1;
                  const weak = isWeak(item);
                  const isAudioActive = speakingWord === item.word;
                  const isExpanded = expandedWordIds.has(item.id || item.word);

                  return (
                    <React.Fragment key={item.id || index}>
                      {/* Main Table Row */}
                      <tr
                        onClick={() => toggleRowExpansion(item.id || item.word)}
                        className={`transition-colors cursor-pointer group select-text ${
                          item.isCrossReferenced
                            ? 'bg-rose-950/20 hover:bg-rose-950/30 border-l-4 border-l-rose-500'
                            : index % 2 === 0 ? 'bg-[#111723]' : 'bg-[#141d2c]'
                        } hover:bg-[#1a2538] ${isExpanded ? 'border-b-0 bg-[#162033]' : ''}`}
                      >
                        {/* Column 1: WORD + Audio + Bookmark + Expand Indicator */}
                        <td className="py-4 px-4 sm:px-6 align-middle border-r border-[#1b2537]">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-mono text-[11px] select-none w-5 shrink-0">
                                  {serialNum}.
                                </span>
                                <span className="text-white font-black text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
                                  {item.word}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {item.isCrossReferenced && (
                                  <span className="px-2 py-0.5 rounded-full bg-rose-500/25 border border-rose-500/50 text-rose-300 text-[10px] font-black inline-flex items-center gap-1 shadow-sm shadow-rose-950/50">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                                    {isBn ? 'রেড মার্ক: আন্তঃসম্পর্কিত' : 'Red Mark: Inter-Unit'}
                                  </span>
                                )}
                                {item.sources && item.sources.length > 1 && (
                                  <span className="px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[9px] font-bold">
                                    📚 {item.sources.length} লেসনে
                                  </span>
                                )}
                                {item.partsOfSpeech && (
                                  <span className="px-2 py-0.5 rounded bg-[#1e2a3d] border border-[#2b3b55] text-slate-300 text-[10px] font-bold">
                                    {item.partsOfSpeech}
                                  </span>
                                )}
                                {item.boardExamTag && (
                                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-bold truncate max-w-[140px] flex items-center gap-1 shadow-sm">
                                    <BookOpen size={10} />
                                    <span>{item.boardExamTag}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quick Audio & Action Buttons */}
                            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                              {/* Audio button with animated wave indicator */}
                              <button
                                onClick={(e) => handleSpeak(item.word, e)}
                                title="Listen pronunciation"
                                className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                                  isAudioActive
                                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300 shadow-md shadow-emerald-950/60'
                                    : 'text-slate-400 hover:text-emerald-400 hover:bg-[#1a2538]'
                                }`}
                              >
                                {isAudioActive ? (
                                  <div className="flex items-end gap-[2px] h-3.5 w-3.5 px-0.5 justify-center">
                                    <span className="w-1 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                                    <span className="w-1 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
                                    <span className="w-1 bg-slate-950 rounded-full animate-bounce h-3.5" />
                                  </div>
                                ) : (
                                  <Volume2 size={15} />
                                )}
                              </button>

                              {/* Weak Word Bookmark Button */}
                              {onToggleWeakWord && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleWeakWord(item);
                                  }}
                                  title={weak ? 'Remove from Weak Words' : 'Add to Weak Words'}
                                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                                    weak
                                      ? 'text-rose-400 bg-rose-500/20 border border-rose-500/40'
                                      : 'text-slate-500 hover:text-rose-400 hover:bg-[#1a2538]'
                                  }`}
                                >
                                  <Bookmark size={15} className={weak ? 'fill-rose-400' : ''} />
                                </button>
                              )}

                              {/* Expand / Collapse Indicator */}
                              <button
                                onClick={() => toggleRowExpansion(item.id || item.word)}
                                title={isExpanded ? 'Collapse details' : 'Expand full details'}
                                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              >
                                {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Column 2: MEANING (BANGLA) - Emerald Coding */}
                        <td className="py-4 px-4 sm:px-6 text-emerald-400 font-bold align-middle font-bengali text-sm sm:text-base leading-relaxed border-r border-[#1b2537]">
                          {item.bengaliMeaning || '-'}
                        </td>

                        {/* Column 3: SYNONYMS - Slate/Cyan Coding */}
                        <td className="py-4 px-4 sm:px-6 text-slate-200 font-normal align-middle leading-relaxed border-r border-[#1b2537]">
                          {item.synonyms ? (
                            <span className="leading-snug">{item.synonyms}</span>
                          ) : (
                            <span className="text-slate-500 font-bold">-</span>
                          )}
                        </td>

                        {/* Column 4: ANTONYMS - Rose Red Coding */}
                        <td className="py-4 px-4 sm:px-6 text-rose-400 font-medium align-middle leading-relaxed">
                          {item.antonyms && item.antonyms.trim() !== '-' && item.antonyms.trim() !== '' ? (
                            <span className="leading-snug">{item.antonyms}</span>
                          ) : (
                            <span className="text-slate-500 font-bold">-</span>
                          )}
                        </td>
                      </tr>

                      {/* Expandable Row Details View (English Definition, Example Sentence, Board Tag) */}
                      {isExpanded && (
                        <tr className="bg-[#0e1422] border-b border-[#1b2537]">
                          <td colSpan="4" className="p-4 sm:p-6">
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded-2xl bg-[#080d16] border border-[#1e2a3f] p-4 sm:p-5 space-y-3.5 shadow-inner"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1a2336] pb-2.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                                    {item.word} ({item.partsOfSpeech || 'Word'})
                                  </span>
                                  {item.unit && (
                                    <span className="text-xs font-semibold text-slate-300 bg-[#162033] px-2.5 py-0.5 rounded-md border border-[#24334a]">
                                      {item.unit}
                                    </span>
                                  )}
                                  {item.boardExamTag && (
                                    <span className="text-xs font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                      <BookOpen size={12} />
                                      <span>{item.boardExamTag}</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleSpeak(item.word)}
                                    className="text-xs text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Volume2 size={13} />
                                    <span>{isBn ? 'উচ্চারণ শুনুন' : 'Pronounce'}</span>
                                  </button>
                                </div>
                              </div>

                              {/* Task 2: Red Mark Inter-Unit Cross-Reference Box */}
                              {item.isCrossReferenced && item.crossReferencedWords && item.crossReferencedWords.length > 0 && (
                                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-2.5">
                                  <span className="text-rose-400 font-bold text-xs shrink-0 flex items-center gap-1">
                                    🔥 {isBn ? 'রেড মার্ক আন্তঃসংযোগ:' : 'Red Mark Inter-Unit Link:'}
                                  </span>
                                  <div className="text-xs text-rose-200 leading-relaxed">
                                    {isBn ? 'এই শব্দটির সমার্থক / বিপরীতার্থক শব্দ বইটির অন্যান্য পাঠের প্রধান শব্দ হিসেবে বিদ্যমান:' : 'This word connects as a synonym or antonym to other main words in the textbook:'}{' '}
                                    <span className="font-bold text-white underline">{item.crossReferencedWords.join(', ')}</span>
                                  </div>
                                </div>
                              )}

                              {/* Multi-Sources Box */}
                              {item.sources && item.sources.length > 1 && (
                                <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200 flex items-center gap-2">
                                  <span className="font-bold text-blue-400 shrink-0">📚 {isBn ? 'উপস্থিতির উৎসসমূহ:' : 'Sources:'}</span>
                                  <span>{item.sources.join(' • ')}</span>
                                </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                                {/* English Definition */}
                                <div className="p-3.5 rounded-xl bg-[#111724] border border-[#1d2638] space-y-1">
                                  <span className="text-[11px] font-bold text-slate-400 block flex items-center gap-1">
                                    <FileText size={12} className="text-cyan-400" />
                                    <span>{isBn ? 'ইংরেজি সংজ্ঞা (English Definition):' : 'English Definition:'}</span>
                                  </span>
                                  <p className="text-slate-200 leading-relaxed font-normal">
                                    {item.englishMeaning || 'Contextual vocabulary item for HSC board curriculum.'}
                                  </p>
                                </div>

                                {/* Context Example Sentence */}
                                <div className="p-3.5 rounded-xl bg-[#111724] border border-[#1d2638] space-y-1">
                                  <span className="text-[11px] font-bold text-slate-400 block flex items-center gap-1">
                                    <Sparkles size={12} className="text-amber-400" />
                                    <span>{isBn ? 'পাঠ্যবইয়ের বাক্য (Textbook Example):' : 'Textbook Example Sentence:'}</span>
                                  </span>
                                  <p className="text-slate-200 italic leading-relaxed">
                                    "{item.exampleSentence || 'Example sentence featured in the official NCTB textbook.'}"
                                  </p>
                                </div>
                              </div>

                              {/* Detailed Synonyms & Antonyms Breakdown */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101726] border border-[#1c273c]">
                                  <span className="font-bold text-emerald-400 shrink-0">🔄 Synonyms:</span>
                                  <span className="text-slate-200 truncate">{item.synonyms || 'None'}</span>
                                </div>
                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101726] border border-[#1c273c]">
                                  <span className="font-bold text-rose-400 shrink-0">🔀 Antonyms:</span>
                                  <span className="text-slate-200 truncate">{item.antonyms || 'None'}</span>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-16 text-center text-slate-400 bg-[#111723]">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                        <Filter size={24} />
                      </div>
                      <p className="text-base font-bold text-white">
                        {isBn ? 'এই ফিল্টারে কোনো শব্দ পাওয়া যায়নি।' : 'No vocabulary words found for this selection.'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {isBn
                          ? 'অন্য কোনো ইউনিট, লেসন বা বোর্ড ফিল্টার নির্বাচন করুন।'
                          : 'Try changing your search keywords or reset active filters.'}
                      </p>
                      <button
                        onClick={resetAllFilters}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        {isBn ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}

        {/* Pagination & Next Slice Learning Controls */}
        {!isLimitAll && totalPages > 1 && (
          <div className="p-4 sm:p-5 bg-[#0e1422] border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 font-medium">
              <span>
                {isBn ? 'পৃষ্ঠা ' : 'Page '}
                <strong className="text-white font-bold">{safeCurrentPage}</strong> {isBn ? 'এর' : 'of'}{' '}
                <strong className="text-white font-bold">{totalPages}</strong> •{' '}
                {isBn
                  ? `শব্দ ${startIndex + 1} থেকে ${endIndex} (মোট ${totalFilteredCount}টি)`
                  : `Words ${startIndex + 1} to ${endIndex} of ${totalFilteredCount}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Previous Page */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                  safeCurrentPage === 1
                    ? 'border-[#1b2434] text-slate-600 cursor-not-allowed bg-[#0c101a]'
                    : 'border-[#24334a] text-slate-200 hover:bg-[#1c273c] hover:text-white bg-[#131b29] cursor-pointer'
                }`}
              >
                <ChevronLeft size={14} />
                <span>{isBn ? 'পূর্ববর্তী' : 'Previous'}</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Show first, last, and current +/- 1
                    return p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 1;
                  })
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && p - prev > 1;

                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && <span className="px-1 text-slate-500 text-xs">...</span>}
                        <button
                          onClick={() => setCurrentPage(p)}
                          className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            safeCurrentPage === p
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/60'
                              : 'bg-[#131b29] border border-[#24334a] text-slate-300 hover:bg-[#1a2538] hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              {/* Next Page */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                  safeCurrentPage === totalPages
                    ? 'border-[#1b2434] text-slate-600 cursor-not-allowed bg-[#0c101a]'
                    : 'border-[#24334a] text-slate-200 hover:bg-[#1c273c] hover:text-white bg-[#131b29] cursor-pointer'
                }`}
              >
                <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
                <ChevronRight size={14} />
              </button>

              {/* Jump to Next 10 Words Direct Action */}
              {safeCurrentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="ml-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-950/50 cursor-pointer transition-all active:scale-95"
                >
                  <span>{isBn ? `পরবর্তী ${limitNum}টি পড়ুন` : `Learn Next ${limitNum}`}</span>
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* PDF Export Customization Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#111723] border border-emerald-500/40 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Printer size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {isBn ? 'PDF মুদ্রণ ও শিক্ষার্থীর তথ্য' : 'PDF Export & Student Details'}
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-white text-xs outline-none focus:border-emerald-500 font-medium"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-white text-xs outline-none focus:border-emerald-500 font-medium"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-white text-xs outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isBn ? 'শব্দ সংখ্যা:' : 'Words Count:'}
                  </label>
                  <div className="px-3.5 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-emerald-400 font-bold text-xs flex items-center">
                    {filteredList.length} {isBn ? 'টি শব্দ' : 'Words'}
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-95 transition-all"
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
