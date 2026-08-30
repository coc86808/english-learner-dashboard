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
  BookMarked,
  FileText,
  X,
  Award,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { hscVocabularyList } from '../data/questions';
import { hscUnits } from '../data/hscUnitsData';
import { generateVocabularyBankPDF } from '../utils/pdfGenerator';

export default function VocabularyBank({
  lang = 'en',
  onStartExam,
  onOpenFlashcards,
  weakWords = [],
  onToggleWeakWord,
  navigate
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

  const expandAll = () => {
    const allIds = new Set(filteredList.map((item) => item.id || item.word));
    setExpandedWordIds(allIds);
  };

  const collapseAll = () => {
    setExpandedWordIds(new Set());
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
    const boards = [
      { id: 'all', label: isBn ? 'সকল বোর্ড (All Boards)' : 'All Board Standards' },
      { id: 'dhaka', label: 'Dhaka Board' },
      { id: 'chattogram', label: 'Chattogram Board' },
      { id: 'rajshahi', label: 'Rajshahi Board' },
      { id: 'sylhet', label: 'Sylhet Board' },
      { id: 'cumilla', label: 'Cumilla Board' },
      { id: 'barishal', label: 'Barishal Board' },
      { id: 'jashore', label: 'Jashore Board' },
      { id: 'mymensingh', label: 'Mymensingh Board' },
      { id: 'dinajpur', label: 'Dinajpur Board' },
      { id: 'standard', label: 'HSC Board Standard' }
    ];
    return boards;
  }, [isBn]);

  // Filtered vocabulary list
  const filteredList = useMemo(() => {
    return hscVocabularyList.filter((item) => {
      // 1. Unit & Lesson filter
      if (selectedUnitId !== 'all') {
        const unitNumberStr = activeUnitObj ? activeUnitObj.unitNumber.toLowerCase() : '';
        const unitTitleStr = activeUnitObj ? activeUnitObj.unitTitle.toLowerCase() : '';
        const matchesUnit =
          item.unit &&
          ((unitNumberStr && (item.unit.toLowerCase().includes(unitNumberStr + ':') || new RegExp(`\\b${unitNumberStr}\\b`, 'i').test(item.unit))) ||
            (unitTitleStr && item.unit.toLowerCase().includes(unitTitleStr)));

        if (!matchesUnit) return false;

        // Specific Lesson filter under this unit
        if (selectedLessonId !== 'all') {
          const lessonObj = availableLessons.find((l) => l.id === selectedLessonId);
          if (lessonObj) {
            const lessonNumStr = lessonObj.number.toLowerCase().replace('-', ' ');
            const lessonTitleStr = lessonObj.title.toLowerCase();
            const matchesLesson =
              item.unit &&
              (item.unit.toLowerCase().includes(lessonNumStr) ||
                item.unit.toLowerCase().includes(lessonTitleStr) ||
                (selectedLessonId === 'u10-l1' && item.unit.includes('Lesson 1')) ||
                (selectedLessonId === 'u10-l2' && item.unit.includes('Lesson 2')) ||
                (selectedLessonId === 'u1-l1' && item.unit.includes('Lesson 1')));

            if (!matchesLesson) return false;
          }
        }
      }

      // 2. Board Exam Filter
      if (selectedBoardFilter !== 'all') {
        const tag = (item.boardExamTag || '').toLowerCase();
        if (selectedBoardFilter === 'dhaka' && !tag.includes('dhaka')) return false;
        if (selectedBoardFilter === 'chattogram' && !tag.includes('chattogram')) return false;
        if (selectedBoardFilter === 'rajshahi' && !tag.includes('rajshahi')) return false;
        if (selectedBoardFilter === 'sylhet' && !tag.includes('sylhet')) return false;
        if (selectedBoardFilter === 'cumilla' && !tag.includes('cumilla')) return false;
        if (selectedBoardFilter === 'barishal' && !tag.includes('barishal')) return false;
        if (selectedBoardFilter === 'jashore' && !tag.includes('jashore')) return false;
        if (selectedBoardFilter === 'mymensingh' && !tag.includes('mymensingh')) return false;
        if (selectedBoardFilter === 'dinajpur' && !tag.includes('dinajpur')) return false;
        if (selectedBoardFilter === 'standard' && !tag.includes('standard') && !tag.includes('model')) return false;
      }

      // 3. Status Filter (Weak Words vs Clean/Mastered)
      if (selectedStatusFilter === 'weak') {
        if (!isWeak(item)) return false;
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

  const handleDownloadPDF = () => {
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

    generateVocabularyBankPDF({
      words: filteredList,
      unitTitle,
      lessonTitle,
      studentInfo: {
        name: 'HSC Candidate',
        college: 'Notre Dame College / Dhaka College',
        batch: 'HSC 2026'
      },
      lang
    });
  };

  const hasActiveFilters =
    searchQuery ||
    selectedUnitId !== 'all' ||
    selectedLessonId !== 'all' ||
    selectedBoardFilter !== 'all' ||
    selectedStatusFilter !== 'all' ||
    selectedPosFilter !== 'all' ||
    sortBy !== 'default';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedUnitId('all');
    setSelectedLessonId('all');
    setSelectedBoardFilter('all');
    setSelectedStatusFilter('all');
    setSelectedPosFilter('all');
    setSortBy('default');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      {/* Top Banner & NCTB Header Card with Glassmorphic Gradient */}
      <div className="no-print p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111723] via-[#0d1320] to-[#121927] border border-[#1e293b] shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={14} />
              <span>{isBn ? 'অফিসিয়াল এনসিটিবি শিট' : 'Official NCTB Guide Sheet'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {isBn ? 'ভোকাবুলারি ব্যাংক (Vocabulary Bank)' : 'HSC Vocabulary Bank'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isBn
                ? 'পাঠ্যবই ও বোর্ড স্ট্যান্ডার্ড প্রতিটি শব্দের বাংলা অর্থ, সমার্থক শব্দ (Synonyms), বিপরীত শব্দ (Antonyms), ইংরেজি সংজ্ঞা ও বাক্যে প্রয়োগের পূর্ণাঙ্গ শিট।'
                : 'Interactive 4-column textbook sheet with Bengali Meanings, Synonyms, Antonyms, English Definitions, Example Sentences, and Board Exam Tags.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
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
        <div className="mt-6 pt-6 border-t border-[#1e293b] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. SELECT UNIT */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookMarked size={12} className="text-emerald-400" />
                <span>{isBn ? '১. ইউনিট নির্বাচন করুন' : '1. Select Unit'}</span>
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
                <span>{isBn ? '২. লেসন নির্বাচন করুন' : '2. Select Lesson'}</span>
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

            {/* 3. SEARCH BAR */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Search size={12} className="text-amber-400" />
                <span>{isBn ? '৩. শব্দ বা অর্থ অনুসন্ধান' : '3. Search Word / Meaning'}</span>
              </label>
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? 'শব্দ, অর্থ, সিনোনিম, বা বোর্ড...' : 'Word, synonym, meaning, board...'}
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

            {/* 4. BOARD EXAM & STATUS FILTER */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Award size={12} className="text-purple-400" />
                <span>{isBn ? '৪. বোর্ড ও স্ট্যাটাস ফিল্টার' : '4. Board & Status Filter'}</span>
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

          {/* Quick Filter Chips & Status Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-[#1a2334]/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-semibold">{isBn ? 'কুইক ফিল্টার:' : 'Quick Filters:'}</span>

              {/* Status Toggles */}
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
                        ? 'bg-emerald-500 text-slate-950 font-bold'
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
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-[#141b2a] text-slate-400 border-[#1e293b] hover:text-slate-200'
                }`}
              >
                <ArrowUpDown size={12} />
                <span>{sortBy === 'az' ? 'A → Z' : sortBy === 'za' ? 'Z → A' : (isBn ? 'সাজান (A-Z)' : 'Sort A-Z')}</span>
              </button>
            </div>

            {/* Expand / Collapse All & Showing Counter */}
            <div className="flex items-center gap-3 text-slate-300">
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  onClick={expandAll}
                  className="px-2 py-1 rounded bg-[#162033] hover:bg-[#1f2d48] border border-[#233148] text-slate-300 hover:text-white transition-all font-semibold"
                >
                  {isBn ? 'সব প্রসারিত করুন' : 'Expand All'}
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2 py-1 rounded bg-[#162033] hover:bg-[#1f2d48] border border-[#233148] text-slate-300 hover:text-white transition-all font-semibold"
                >
                  {isBn ? 'সব গুটিয়ে নিন' : 'Collapse All'}
                </button>
              </div>

              <span>
                {isBn ? 'প্রদর্শিত: ' : 'Showing: '}
                <strong className="text-emerald-400 font-bold">{filteredList.length}</strong> / {hscVocabularyList.length}{' '}
                {isBn ? 'শব্দ' : 'words'}
              </span>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-amber-400 hover:underline cursor-pointer font-bold ml-1"
                >
                  {isBn ? 'রিসেট' : 'Reset All'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Vocabulary Sheet (Sticky Emerald Header + Dark Glassmorphic Alternating Rows) */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto max-h-[780px] overflow-y-auto relative">
          <table className="w-full text-left border-collapse">
            {/* Sticky Emerald Header */}
            <thead className="sticky top-0 z-20 bg-[#065f46] text-white shadow-lg backdrop-blur-md">
              <tr className="text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                <th className="py-4 px-4 sm:px-6 w-[24%] border-r border-[#047857]">
                  <div className="flex items-center gap-1.5">
                    <span>Word / Term</span>
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
              {filteredList.length > 0 ? (
                filteredList.map((item, index) => {
                  const weak = isWeak(item);
                  const isAudioActive = speakingWord === item.word;
                  const isExpanded = expandedWordIds.has(item.id || item.word);

                  return (
                    <React.Fragment key={item.id || index}>
                      {/* Main Table Row */}
                      <tr
                        onClick={() => toggleRowExpansion(item.id || item.word)}
                        className={`transition-colors cursor-pointer group select-text ${
                          index % 2 === 0 ? 'bg-[#111723]' : 'bg-[#141d2c]'
                        } hover:bg-[#1a2538] ${isExpanded ? 'border-b-0 bg-[#162033]' : ''}`}
                      >
                        {/* Column 1: WORD + Audio + Bookmark + Expand Indicator */}
                        <td className="py-4 px-4 sm:px-6 align-middle border-r border-[#1b2537]">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-mono text-[11px] select-none">
                                  {index + 1}.
                                </span>
                                <span className="text-white font-black text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
                                  {item.word}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {item.partsOfSpeech && (
                                  <span className="px-2 py-0.5 rounded bg-[#1e2a3d] border border-[#2b3b55] text-slate-300 text-[10px] font-bold">
                                    {item.partsOfSpeech}
                                  </span>
                                )}
                                {item.boardExamTag && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[9px] font-semibold truncate max-w-[120px]">
                                    {item.boardExamTag.split(',')[0]}
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
                                  /* Animated Audio Wave Indicator */
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
                                className="p-1 text-slate-400 hover:text-white transition-colors"
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
                                    <span className="text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                      <Award size={12} />
                                      <span>{item.boardExamTag}</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleSpeak(item.word)}
                                    className="text-xs text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg transition-colors"
                                  >
                                    <Volume2 size={13} />
                                    <span>{isBn ? 'উচ্চারণ শুনুন' : 'Pronounce'}</span>
                                  </button>
                                </div>
                              </div>

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
      </div>
    </div>
  );
}
