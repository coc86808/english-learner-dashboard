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
  ChevronDown
} from 'lucide-react';
import { hscVocabularyList } from '../data/questions';

export default function VocabularyBank({
  lang = 'en',
  onStartExam,
  onOpenFlashcards,
  weakWords = [],
  onToggleWeakWord
}) {
  const isBn = lang === 'bn';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState('all');
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

  // Filtered list
  const filteredList = useMemo(() => {
    return hscVocabularyList.filter((item) => {
      // Unit filter
      if (selectedUnitFilter === 'u10-l1') {
        if (!item.unit.includes('Unit 10: Lesson 1') && !item.unit.includes('Manners Around the World')) return false;
      } else if (selectedUnitFilter === 'u10-l2') {
        if (!item.unit.includes('Unit 10: Lesson 2') && !item.unit.includes('Food and Culture')) return false;
      } else if (selectedUnitFilter === 'u1-l1') {
        if (!item.unit.includes('Unit 1: Lesson 1') && !item.unit.includes("The Parrot's Tale")) return false;
      }

      // Part of speech filter
      if (selectedPosFilter !== 'all') {
        if (!item.partsOfSpeech || !item.partsOfSpeech.toLowerCase().includes(selectedPosFilter.toLowerCase())) {
          return false;
        }
      }

      // Search Query
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
  }, [searchQuery, selectedUnitFilter, selectedPosFilter, sortBy]);

  const handlePrintSheet = () => {
    window.print();
  };

  const isWeak = (item) => {
    return weakWords.some((w) => w.id === item.id || w.word === item.word);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Printable Sheet CSS Styling */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-vocab-bank, #printable-vocab-bank * {
            visibility: visible;
          }
          #printable-vocab-bank {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 11pt !important;
            color: black !important;
          }
          .print-table th, .print-table td {
            border: 1px solid #333 !important;
            padding: 6px 10px !important;
            text-align: left !important;
            background: transparent !important;
            color: black !important;
          }
          .print-table th {
            background-color: #f2f2f2 !important;
            font-weight: bold !important;
          }
        }
      `}</style>

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
                ? 'বোর্ড ও পাঠ্যবইয়ের গাইড ফরম্যাটে শব্দার্থ, সমার্থক শব্দ (Synonym) ও বিপরীত শব্দ (Antonym)-এর সম্পূর্ণ শিট।'
                : 'Complete textbook guide sheet with Word Meanings, Synonyms, and Antonyms formatted for board exams.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrintSheet}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer transition-all active:scale-95"
            >
              <Printer size={16} />
              <span>{isBn ? 'প্রিন্ট / PDF ডাউনলোড' : 'Print / Download PDF'}</span>
            </button>

            {onStartExam && (
              <button
                onClick={onStartExam}
                className="px-4 py-2.5 rounded-xl bg-[#1a2334] hover:bg-[#25324a] text-slate-200 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#2b3952] cursor-pointer transition-all"
              >
                <GraduationCap size={16} className="text-emerald-400" />
                <span>{isBn ? 'পরীক্ষা শুরু করুন' : 'Take Exam'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Controls */}
        <div className="mt-6 pt-6 border-t border-[#1d273a] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 1. Search Box */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'শব্দ, অর্থ বা সিনোনিম খুঁজুন...' : 'Search word, meaning, synonym...'}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* 2. Unit & Lesson Filter */}
          <div className="relative">
            <select
              value={selectedUnitFilter}
              onChange={(e) => setSelectedUnitFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none"
            >
              <option value="all">All Units & Lessons (122 Words)</option>
              <option value="u10-l1">Unit 10: Lesson 1 - Manners Around the World (74 Words)</option>
              <option value="u10-l2">Unit 10: Lesson 2 - Food and Culture (25 Words)</option>
              <option value="u1-l1">Unit 1: Lesson 1 - The Parrot's Tale (23 Words)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* 3. Part of Speech Filter */}
          <div className="relative">
            <select
              value={selectedPosFilter}
              onChange={(e) => setSelectedPosFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none"
            >
              <option value="all">All Parts of Speech</option>
              <option value="noun">Noun (বিশেষ্য)</option>
              <option value="verb">Verb (ক্রিয়া)</option>
              <option value="adjective">Adjective (বিশেষণ)</option>
              <option value="adverb">Adverb (ভাব বিশেষণ)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* 4. Sort Order */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d121c] border border-[#232f45] text-xs sm:text-sm text-slate-200 outline-none focus:border-emerald-500 cursor-pointer appearance-none"
            >
              <option value="default">Default Textbook Order</option>
              <option value="az">Alphabetical (A → Z)</option>
              <option value="za">Alphabetical (Z → A)</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Counter Summary */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>
            {isBn ? 'মোট প্রদর্শিত শব্দ: ' : 'Showing: '}
            <strong className="text-emerald-400 font-bold">{filteredList.length}</strong> / {hscVocabularyList.length} {isBn ? 'টি শব্দ' : 'words'}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              {isBn ? 'সার্চ ক্লিয়ার করুন' : 'Clear search'}
            </button>
          )}
        </div>
      </div>

      {/* Main Vocabulary Sheet (Designed identically to user guide photo) */}
      <div id="printable-vocab-bank" className="bg-[#111723] border border-[#1e293b] rounded-3xl shadow-xl overflow-hidden">
        {/* Printable Header (Visible only when printed) */}
        <div className="hidden print:block p-6 text-center border-b border-black">
          <h2 className="text-xl font-bold uppercase tracking-wider text-black">HSC English 1st Paper — Vocabulary Bank</h2>
          <p className="text-xs text-black mt-1">
            {selectedUnitFilter === 'u10-l1'
              ? 'Unit 10: Lifestyle — Lesson 1: Manners Around the World'
              : selectedUnitFilter === 'u10-l2'
              ? 'Unit 10: Lifestyle — Lesson 2: Food and Culture (Syed Mujtaba Ali)'
              : selectedUnitFilter === 'u1-l1'
              ? "Unit 1: Education and Life — Lesson 1: The Parrot's Tale"
              : 'Complete HSC Vocabulary Guide Sheet'}
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse print-table">
            <thead>
              <tr className="bg-[#172030] text-slate-200 border-b border-[#24334a] text-xs sm:text-sm font-bold uppercase tracking-wider">
                <th className="py-4 px-4 sm:px-6 w-[38%] sm:w-[35%]">
                  <div className="flex items-center gap-2">
                    <span>{isBn ? 'Word meaning (শব্দ ও বাংলা অর্থ)' : 'Word meaning'}</span>
                  </div>
                </th>
                <th className="py-4 px-4 sm:px-6 w-[31%] sm:w-[32%]">
                  <span>{isBn ? 'Synonym (সমার্থক শব্দ)' : 'Synonym'}</span>
                </th>
                <th className="py-4 px-4 sm:px-6 w-[31%] sm:w-[33%]">
                  <span>{isBn ? 'Antonym (বিপরীত শব্দ)' : 'Antonym'}</span>
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
                      {/* Column 1: Word meaning */}
                      <td className="py-3.5 px-4 sm:px-6 align-top">
                        <div className="flex items-start gap-2.5">
                          <span className="no-print text-slate-500 font-mono text-[11px] pt-0.5 select-none w-5">
                            {index + 1}.
                          </span>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-white font-bold text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
                                {item.word}
                              </span>

                              {/* Hyphen and Bengali Meaning (Exactly like photo: Word- বাংলা অর্থ) */}
                              <span className="text-slate-300 font-medium">
                                - {item.bengaliMeaning}
                              </span>
                            </div>

                            {/* Part of Speech & Audio Pills (Screen only) */}
                            <div className="no-print flex items-center gap-2 pt-0.5">
                              {item.partsOfSpeech && (
                                <span className="px-2 py-0.5 rounded-md bg-[#1e2a3d] border border-[#2b3b55] text-slate-300 text-[10px] font-semibold">
                                  {item.partsOfSpeech}
                                </span>
                              )}

                              <button
                                onClick={() => handleSpeak(item.word)}
                                title="Listen pronunciation"
                                className={`p-1 rounded-md transition-colors cursor-pointer ${
                                  isAudioActive
                                    ? 'bg-emerald-500 text-white animate-pulse'
                                    : 'text-slate-400 hover:text-emerald-400 hover:bg-[#1a2538]'
                                }`}
                              >
                                <Volume2 size={13} />
                              </button>

                              {onToggleWeakWord && (
                                <button
                                  onClick={() => onToggleWeakWord(item)}
                                  title={weak ? 'Remove from Weak Words' : 'Add to Weak Words'}
                                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                                    weak
                                      ? 'text-rose-400 bg-rose-500/15'
                                      : 'text-slate-500 hover:text-rose-400 hover:bg-[#1a2538]'
                                  }`}
                                >
                                  <Bookmark size={13} className={weak ? 'fill-rose-400' : ''} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Synonym */}
                      <td className="py-3.5 px-4 sm:px-6 text-slate-200 font-normal align-top leading-relaxed">
                        {item.synonyms ? (
                          <span className="text-slate-200">{item.synonyms}</span>
                        ) : (
                          <span className="text-slate-500 font-bold">-</span>
                        )}
                      </td>

                      {/* Column 3: Antonym */}
                      <td className="py-3.5 px-4 sm:px-6 text-slate-200 font-normal align-top leading-relaxed">
                        {item.antonyms && item.antonyms.trim() !== '-' && item.antonyms.trim() !== '' ? (
                          <span className="text-slate-200">{item.antonyms}</span>
                        ) : (
                          <span className="text-slate-500 font-bold">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-slate-400">
                    <p className="text-base font-semibold">
                      {isBn ? 'কোনো শব্দ পাওয়া যায়নি।' : 'No vocabulary words found.'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {isBn ? 'অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try changing your search query or unit filter.'}
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
