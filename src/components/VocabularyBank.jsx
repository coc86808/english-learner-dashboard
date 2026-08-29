import React, { useState, useMemo } from 'react';
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
  BookMarked,
  FileText
} from 'lucide-react';
import { hscVocabularyList } from '../data/questions';
import { hscUnits } from '../data/hscUnitsData';
import { generateVocabularyBankPDF } from '../utils/pdfGenerator';

export default function VocabularyBank({
  lang = 'en',
  onStartExam,
  onOpenFlashcards,
  weakWords = [],
  onToggleWeakWord
}) {
  const isBn = lang === 'bn';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState('all');
  const [selectedLessonId, setSelectedLessonId] = useState('all');
  const [selectedPosFilter, setSelectedPosFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'az' | 'za'
  const [speakingWord, setSpeakingWord] = useState(null);

  // Play Native TTS English Pronunciation
  const handleSpeak = (word) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    setSpeakingWord(word);
    utterance.onend = () => setSpeakingWord(null);
    utterance.onerror = () => setSpeakingWord(null);
    window.speechSynthesis.speak(utterance);
  };

  // Find currently selected unit object
  const activeUnitObj = useMemo(() => {
    if (selectedUnitId === 'all') return null;
    return hscUnits.find((u) => u.id === selectedUnitId);
  }, [selectedUnitId]);

  // Lessons available under currently selected unit
  const availableLessons = useMemo(() => {
    if (!activeUnitObj) return [];
    return activeUnitObj.lessons;
  }, [activeUnitObj]);

  // Handle Unit Selection Change (resets lesson to 'all')
  const handleUnitChange = (unitId) => {
    setSelectedUnitId(unitId);
    setSelectedLessonId('all');
  };

  // Filtered vocabulary list
  const filteredList = useMemo(() => {
    return hscVocabularyList.filter((item) => {
      // 1. Unit & Lesson filter
      if (selectedUnitId !== 'all') {
        const unitNumberStr = activeUnitObj ? activeUnitObj.unitNumber.toLowerCase() : '';
        const unitTitleStr = activeUnitObj ? activeUnitObj.unitTitle.toLowerCase() : '';
        const matchesUnit =
          item.unit &&
          (item.unit.toLowerCase().includes(unitNumberStr) ||
            item.unit.toLowerCase().includes(unitTitleStr));

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

      // 2. Part of speech filter
      if (selectedPosFilter !== 'all') {
        if (
          !item.partsOfSpeech ||
          !item.partsOfSpeech.toLowerCase().includes(selectedPosFilter.toLowerCase())
        ) {
          return false;
        }
      }

      // 3. Search Query filter (Word, Bengali meaning, Synonym, Antonym, English definition)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(q);
        const matchBn = item.bengaliMeaning.toLowerCase().includes(q);
        const matchSyn = item.synonyms && item.synonyms.toLowerCase().includes(q);
        const matchAnt = item.antonyms && item.antonyms.toLowerCase().includes(q);
        const matchEng = item.englishMeaning && item.englishMeaning.toLowerCase().includes(q);
        if (!matchWord && !matchBn && !matchSyn && !matchAnt && !matchEng) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'az') return a.word.localeCompare(b.word);
      if (sortBy === 'za') return b.word.localeCompare(a.word);
      return 0;
    });
  }, [searchQuery, selectedUnitId, selectedLessonId, selectedPosFilter, sortBy, activeUnitObj, availableLessons]);

  const handleDownloadPDF = () => {
    const unitTitle = selectedUnitId === 'all'
      ? (isBn ? 'সকল ইউনিট' : 'All Units')
      : (activeUnitObj?.unitNumber + ': ' + activeUnitObj?.unitTitle);
    
    const lessonObj = availableLessons.find(l => l.id === selectedLessonId);
    const lessonTitle = selectedLessonId === 'all'
      ? (selectedUnitId === 'all' ? (isBn ? 'সকল লেসন' : 'All Lessons') : `${isBn ? 'সকল লেসন' : 'All Lessons'} (${activeUnitObj?.unitNumber})`)
      : (lessonObj ? `${lessonObj.number}: ${lessonObj.title}` : 'Selected Lesson');

    generateVocabularyBankPDF({
      words: filteredList,
      unitTitle,
      lessonTitle,
      studentInfo: {
        name: 'Tanvir Ahmed',
        college: 'Notre Dame College, Dhaka',
        batch: 'HSC 2026'
      },
      lang
    });
  };

  const isWeak = (item) => {
    return weakWords.some((w) => w.id === item.id || w.word === item.word);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="no-print p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#131a29] via-[#0f1523] to-[#121927] border border-[#222e44] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={14} />
              <span>{isBn ? 'অফিসিয়াল এনসিটিবি শিট' : 'Official NCTB Guide Sheet'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {isBn ? 'ভোকাবুলারি ব্যাংক (Vocabulary Bank)' : 'Vocabulary Bank'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isBn
                ? 'বোর্ড ও পাঠ্যবইয়ের গাইড ফরম্যাটে সকল ইউনিট ও লেসনের শব্দার্থ, সমার্থক শব্দ (Synonym) ও বিপরীত শব্দ (Antonym)-এর সম্পূর্ণ শিট।'
                : 'Complete textbook guide sheet with Word Meanings, Synonyms, and Antonyms for all Units and Lessons.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer transition-all active:scale-95"
            >
              <Download size={16} />
              <span>{isBn ? 'PDF ডাউনলোড / প্রিন্ট' : 'Download PDF / Print Sheet'}</span>
            </button>

            {onStartExam && (
              <button
                onClick={onStartExam}
                className="px-4 py-2.5 rounded-xl bg-[#1a2334] hover:bg-[#25324a] text-slate-200 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#2b3952] cursor-pointer transition-all"
              >
                <GraduationCap size={16} className="text-emerald-400" />
                <span>{isBn ? 'MCQ পরীক্ষা দিন' : 'Take MCQ Exam'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 2-Level Dynamic Unit & Lesson Selector Controls */}
        <div className="mt-6 pt-6 border-t border-[#1d273a] space-y-4">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none font-medium"
                >
                  <option value="all">
                    {isBn ? 'সকল ইউনিট (১২২টি শব্দ)' : 'All Units (122 Words)'}
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

            {/* 2. SELECT LESSON (Dynamically populated based on selected Unit) */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen size={12} className="text-blue-400" />
                <span>{isBn ? '২. লেসন নির্বাচন করুন' : '2. Select Lesson'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedLessonId}
                  onChange={(e) => setSelectedLessonId(e.target.value)}
                  disabled={selectedUnitId === 'all'}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border text-xs sm:text-sm outline-none cursor-pointer appearance-none font-medium ${
                    selectedUnitId === 'all'
                      ? 'border-[#1b2332] text-slate-500 cursor-not-allowed'
                      : 'border-[#232f45] text-slate-200 focus:border-emerald-500'
                  }`}
                >
                  {selectedUnitId === 'all' ? (
                    <option value="all">{isBn ? 'সকল লেসনের শব্দ' : 'All Lessons'}</option>
                  ) : (
                    <>
                      <option value="all">
                        {isBn ? `সকল লেসন (${activeUnitObj?.totalWords || 0} শব্দ)` : `All Lessons in ${activeUnitObj?.unitNumber} (${activeUnitObj?.totalWords || 0} Words)`}
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
                  placeholder={isBn ? 'শব্দ, অর্থ বা সিনোনিম...' : 'Word, synonym, meaning...'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors font-medium"
                />
              </div>
            </div>

            {/* 4. PART OF SPEECH & SORT */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Filter size={12} className="text-purple-400" />
                <span>{isBn ? '৪. পার্টস অব স্পিচ' : '4. Part of Speech'}</span>
              </label>
              <div className="relative">
                <select
                  value={selectedPosFilter}
                  onChange={(e) => setSelectedPosFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none font-medium"
                >
                  <option value="all">{isBn ? 'সকল পার্টস অব স্পিচ' : 'All Parts of Speech'}</option>
                  <option value="noun">Noun (বিশেষ্য)</option>
                  <option value="verb">Verb (ক্রিয়া)</option>
                  <option value="adjective">Adjective (বিশেষণ)</option>
                  <option value="adverb">Adverb (ভাব বিশেষণ)</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Badges & Quick Switchers */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-semibold">{isBn ? 'সক্রিয় নির্বাচন:' : 'Active Selection:'}</span>
              
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                {selectedUnitId === 'all'
                  ? (isBn ? 'সকল ইউনিট' : 'All Units')
                  : activeUnitObj?.unitNumber + ': ' + activeUnitObj?.unitTitle}
              </span>

              {selectedLessonId !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold">
                  {availableLessons.find(l => l.id === selectedLessonId)?.number}: {availableLessons.find(l => l.id === selectedLessonId)?.title}
                </span>
              )}

              {selectedPosFilter !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold uppercase">
                  {selectedPosFilter}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span>
                {isBn ? 'মোট প্রদর্শিত শব্দ: ' : 'Showing: '}
                <strong className="text-emerald-400 font-bold">{filteredList.length}</strong> / {hscVocabularyList.length} {isBn ? 'টি শব্দ' : 'words'}
              </span>
              {(searchQuery || selectedUnitId !== 'all' || selectedLessonId !== 'all' || selectedPosFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedUnitId('all');
                    setSelectedLessonId('all');
                    setSelectedPosFilter('all');
                  }}
                  className="text-amber-400 hover:underline cursor-pointer font-bold ml-2"
                >
                  {isBn ? 'রিসেট করুন' : 'Reset All'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Vocabulary Sheet (Designed with 4 Columns & Emerald Header) */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl shadow-xl overflow-hidden">
        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#065f46] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 w-[22%] border-r border-[#047857]">
                  <span>WORD</span>
                </th>
                <th className="py-3.5 px-4 sm:px-6 w-[30%] border-r border-[#047857]">
                  <span>MEANING (BANGLA)</span>
                </th>
                <th className="py-3.5 px-4 sm:px-6 w-[24%] border-r border-[#047857]">
                  <span>SYNONYMS</span>
                </th>
                <th className="py-3.5 px-4 sm:px-6 w-[24%]">
                  <span>ANTONYMS</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2537] text-xs sm:text-sm">
              {filteredList.length > 0 ? (
                filteredList.map((item, index) => {
                  const weak = isWeak(item);
                  const isAudioActive = speakingWord === item.word;

                  return (
                    <tr
                      key={item.id || index}
                      className="hover:bg-[#161f2e] transition-colors group"
                    >
                      {/* Column 1: WORD */}
                      <td className="py-3.5 px-4 sm:px-6 align-middle border-r border-[#1b2537]">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-500 font-mono text-xs select-none">
                                {index + 1}.
                              </span>
                              <span className="text-white font-bold text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
                                {item.word}
                              </span>
                            </div>

                            {item.partsOfSpeech && (
                              <div className="mt-1">
                                <span className="px-2 py-0.5 rounded bg-[#1e2a3d] border border-[#2b3b55] text-slate-300 text-[10px] font-semibold">
                                  {item.partsOfSpeech}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quick Audio & Bookmark Action buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleSpeak(item.word)}
                              title="Listen pronunciation"
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isAudioActive
                                  ? 'bg-emerald-500 text-white animate-pulse'
                                  : 'text-slate-400 hover:text-emerald-400 hover:bg-[#1a2538]'
                              }`}
                            >
                              <Volume2 size={14} />
                            </button>

                            {onToggleWeakWord && (
                              <button
                                onClick={() => onToggleWeakWord(item)}
                                title={weak ? 'Remove from Weak Words' : 'Add to Weak Words'}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  weak
                                    ? 'text-rose-400 bg-rose-500/15'
                                    : 'text-slate-500 hover:text-rose-400 hover:bg-[#1a2538]'
                                }`}
                              >
                                <Bookmark size={14} className={weak ? 'fill-rose-400' : ''} />
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Column 2: MEANING (BANGLA) */}
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-400 font-bold align-middle font-bengali leading-relaxed border-r border-[#1b2537]">
                        {item.bengaliMeaning || '-'}
                      </td>

                      {/* Column 3: SYNONYMS */}
                      <td className="py-3.5 px-4 sm:px-6 text-slate-200 font-normal align-middle leading-relaxed border-r border-[#1b2537]">
                        {item.synonyms ? (
                          <span>{item.synonyms}</span>
                        ) : (
                          <span className="text-slate-500 font-bold">-</span>
                        )}
                      </td>

                      {/* Column 4: ANTONYMS */}
                      <td className="py-3.5 px-4 sm:px-6 text-rose-400 font-medium align-middle leading-relaxed">
                        {item.antonyms && item.antonyms.trim() !== '-' && item.antonyms.trim() !== '' ? (
                          <span>{item.antonyms}</span>
                        ) : (
                          <span className="text-slate-500 font-bold">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    <p className="text-base font-semibold">
                      {isBn ? 'এই ইউনিট বা লেসনে কোনো শব্দ পাওয়া যায়নি।' : 'No vocabulary words found for this selection.'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {isBn ? 'অন্য কোনো ইউনিট বা লেসন নির্বাচন করুন।' : 'Try selecting another Unit or Lesson.'}
                    </p>
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
