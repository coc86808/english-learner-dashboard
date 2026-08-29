import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Play,
  Layers,
  ChevronRight,
  BookMarked,
  CheckCircle,
  HelpCircle,
  BarChart2,
  Clock,
  Award
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import { hscQuestionsList } from '../data/questions/hscQuestionsData';
import HSCExamInterface from './HSCExamInterface';
import TextbookReaderModal from './TextbookReaderModal';

export default function UnitLessonExamModal({
  isOpen,
  onClose,
  initialUnit = null,
  initialLesson = null,
  lang = 'bn'
}) {
  const [selectedUnit, setSelectedUnit] = useState(initialUnit || hscUnits[0]);
  const [selectedLesson, setSelectedLesson] = useState(initialLesson || null);
  const [selectedCategories, setSelectedCategories] = useState([
    'synonyms',
    'antonyms',
    'english_meaning',
    'bangla_meaning'
  ]);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isTextbookOpen, setIsTextbookOpen] = useState(false);

  if (!isOpen) return null;

  const isBn = lang === 'bn';

  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const selectAllCategories = () => {
    setSelectedCategories(['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning']);
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsExamActive(false);
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  const getFilteredQuestions = () => {
    const categoryFiltered = hscQuestionsList.filter((q) =>
      selectedCategories.includes(q.category)
    );

    if (!selectedUnit) return categoryFiltered;

    const unitQuestions = categoryFiltered.filter((q) => {
      if (!q.unit) return true;
      return (
        q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) ||
        q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())
      );
    });

    if (selectedLesson && selectedLesson.id !== 'all') {
      const lessonQuestions = unitQuestions.filter((q) => {
        return (
          q.unit &&
          (q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) ||
            q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))
        );
      });
      if (lessonQuestions.length > 0) return lessonQuestions;
    }

    return unitQuestions.length > 0 ? unitQuestions : categoryFiltered;
  };

  const hasTextbook =
    (selectedUnit?.id === 'unit-1' && (!selectedLesson || selectedLesson.id === 'u1-l1' || selectedLesson.id === 'all')) ||
    (selectedUnit?.id === 'unit-10' && (!selectedLesson || selectedLesson.id === 'u10-l1' || selectedLesson.id === 'u10-l2' || selectedLesson.id === 'u10-l3' || selectedLesson.id === 'all'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto animate-in fade-in zoom-in duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-[#182030] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all"
        >
          <X size={18} />
        </button>

        {isExamActive && selectedUnit && selectedLesson ? (
          /* STEP 4: LIVE ACTIVE EXAM SCREEN */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f283a] text-xs text-slate-300">
              <button
                onClick={() => setIsExamActive(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-400 font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>{isBn ? 'অনুশীলন সেটিংসে ফিরে যান' : 'Back to Practice Setup'}</span>
              </button>

              <div className="flex items-center gap-2 font-semibold truncate max-w-md">
                <span className="text-emerald-400 font-bold">{selectedUnit?.unitNumber}</span>
                <span>➔</span>
                <span className="text-white truncate">
                  {selectedLesson.number}: {selectedLesson.title}
                </span>
              </div>

              {hasTextbook && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#182030] hover:bg-emerald-500/20 text-emerald-300 font-bold inline-flex items-center gap-1.5 border border-[#23334d] text-xs transition-all cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>{isBn ? 'টেক্সটবুক পড়ুন' : 'Read Textbook'}</span>
                </button>
              )}
            </div>

            <HSCExamInterface
              questions={getFilteredQuestions()}
              sessionKey={`u_${selectedUnit.id}_l_${selectedLesson.id}`}
              onClose={() => setIsExamActive(false)}
              lang={lang}
            />
          </div>
        ) : selectedUnit && selectedLesson ? (
          /* STEP 3: DEDICATED PRACTICE CATEGORIES SETUP SCREEN */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto max-w-3xl mx-auto">
            {/* Header with Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="p-2.5 rounded-xl bg-[#10141f] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
                  title="Back to lessons"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 uppercase">
                      {selectedUnit.unitNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedLesson.number}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                    {selectedLesson.title}
                  </h2>
                </div>
              </div>

              {hasTextbook && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-300 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
                >
                  <BookOpen size={14} />
                  <span>{isBn ? '📖 পাঠ্যবই পড়ুন' : '📖 Read Story'}</span>
                </button>
              )}
            </div>

            {/* Practice Categories Selection Card */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-xl">🎯</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {isBn ? 'অনুশীলনের ধরন বেছে নিন' : 'Select What You Want to Practice'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {isBn
                    ? 'নিচের ক্যাটাগরিগুলো থেকে আপনার পছন্দমতো বিষয়গুলো নির্বাচন করুন। প্রতিটি ক্যাটাগরিতে কতটি প্রশ্ন রয়েছে তা নিচে প্রদর্শিত হয়েছে।'
                    : 'Select one or more practice categories below. Available question counts are shown for each category.'}
                </p>
              </div>

              {/* 4 Category Cards with Available Question Counts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'synonyms',
                    label: isBn ? 'সমার্থক শব্দ (Synonyms)' : 'Synonyms',
                    icon: '🔄',
                    desc: isBn ? 'অনুরূপ ও সমার্থক শব্দের MCQ' : 'Closest meaning synonym MCQs',
                    available: hscQuestionsList.filter(q => q.category === 'synonyms' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                  },
                  {
                    id: 'antonyms',
                    label: isBn ? 'বিপরীত শব্দ (Antonyms)' : 'Antonyms',
                    icon: '⚡',
                    desc: isBn ? 'বিপরীতার্থক শব্দের MCQ' : 'Opposite meaning antonym MCQs',
                    available: hscQuestionsList.filter(q => q.category === 'antonyms' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                  },
                  {
                    id: 'english_meaning',
                    label: isBn ? 'ইংরেজি অর্থ (Meaning in English)' : 'Meaning in English',
                    icon: '📖',
                    desc: isBn ? 'ইংরেজি সংজ্ঞা ও অর্থভিত্তিক MCQ' : 'English definition & contextual MCQs',
                    available: hscQuestionsList.filter(q => q.category === 'english_meaning' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                  },
                  {
                    id: 'bangla_meaning',
                    label: isBn ? 'বাংলা অর্থ (Meaning in Bangla)' : 'Meaning in Bangla',
                    icon: '🇧🇩',
                    desc: isBn ? '৪টি বিকল্প বাংলা অপশনযুক্ত MCQ' : 'Bengali meaning MCQs with 4 options',
                    available: hscQuestionsList.filter(q => q.category === 'bangla_meaning' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                  }
                ].map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                        isSelected
                          ? 'bg-gradient-to-br from-emerald-950/60 to-[#0e1624] border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                          : 'bg-[#0b0e17] border-[#1f2738] text-slate-400 hover:bg-[#131926] hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl shrink-0 p-2 rounded-xl bg-[#172030] border border-[#232f45]">
                            {cat.icon}
                          </span>
                          <div>
                            <span className={`block text-sm sm:text-base font-bold ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                              {cat.label}
                            </span>
                            <span className="block text-xs text-slate-400 mt-0.5 leading-snug">
                              {cat.desc}
                            </span>
                          </div>
                        </div>

                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 transition-all ${
                            isSelected
                              ? 'bg-emerald-500 border-emerald-400 text-white font-black scale-110 shadow-md shadow-emerald-500/50'
                              : 'border-slate-600 bg-transparent'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </div>
                      </div>

                      {/* Available Questions Count Badge */}
                      <div className="pt-2 border-t border-[#1a2334] flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">
                          {isBn ? 'উপলব্ধ প্রশ্ন:' : 'Available Questions:'}
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded-md ${
                          cat.available > 0
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {cat.available} {isBn ? 'টি প্রশ্ন' : 'Questions'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Summary Bar: Total Selected + Quick Toggles */}
              <div className="p-4 rounded-2xl bg-[#0c1018] border border-[#1b2332] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium">{isBn ? 'মোট নির্বাচিত প্রশ্ন:' : 'Total Selected Questions:'}</span>
                  <span className="font-black text-emerald-400 text-base">
                    {getFilteredQuestions().length} {isBn ? 'টি' : 'Questions'}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({selectedCategories.length} {isBn ? 'টি ক্যাটাগরি সক্রিয়' : 'categories active'})
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <button
                    onClick={selectAllCategories}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    {isBn ? 'সবগুলো সিলেক্ট করুন' : 'Select All'}
                  </button>
                </div>
              </div>

              {/* Launch Practice Exam Button */}
              <button
                onClick={() => setIsExamActive(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/70 transition-all cursor-pointer active:scale-[0.98] hover:shadow-emerald-900/90"
              >
                <Play size={20} className="fill-current" />
                <span>{isBn ? '🚀 পরীক্ষা শুরু করুন (Start Exam Now)' : '🚀 Start Practice Exam Now'}</span>
              </button>
            </div>
          </div>
        ) : selectedUnit ? (
          /* STEP 2: LESSONS LIST SCREEN FOR SELECTED UNIT */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToUnits}
                  className="p-2.5 rounded-xl bg-[#10141f] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
                  title="Back to all units"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 uppercase tracking-wider">
                    {selectedUnit.unitNumber}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                    {selectedUnit.unitTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedUnit.unitTitleBn} • {selectedUnit.totalWords} Words Available
                  </p>
                </div>
              </div>

              {/* Read Full Unit Textbook */}
              {hasTextbook && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer shrink-0"
                >
                  <BookOpen size={15} />
                  <span>{isBn ? '📖 পাঠ্যবই রিডার খুলুন' : '📖 Open Textbook'}</span>
                </button>
              )}
            </div>

            {/* Lessons Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isBn ? 'লেসন নির্বাচন করুন:' : 'Select a Lesson to Practice:'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedUnit.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className="p-4 rounded-2xl bg-[#0e131f] hover:bg-[#151c2a] border border-[#1e2638] hover:border-emerald-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                          {lesson.number}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lesson.wordsCount} Words
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-2">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lesson.titleBn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1b2333] text-xs">
                      <span className="text-slate-400 font-medium">{lesson.questionsCount}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{isBn ? 'অনুশীলন করুন' : 'Practice'}</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STEP 1: ALL UNITS OVERVIEW GRID */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
                  <GraduationCap size={14} />
                  <span>HSC English For Today Curriculum</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isBn ? 'ইউনিটভিত্তিক পরীক্ষা ও প্রস্তুতি' : 'Unit-wise Exam & Practice'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {isBn ? 'আপনার কাঙ্ক্ষিত ইউনিট ও লেসন বেছে নিয়ে অনুশীলন শুরু করুন।' : 'Select any unit and lesson to start targeted MCQ practice.'}
                </p>
              </div>
            </div>

            {/* Units Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hscUnits.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`relative p-5 rounded-2xl border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between min-h-[170px] ${unit.bgClass}`}
                >
                  <div className="relative z-10">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-sm mb-2">
                      {unit.unitNumber}
                    </span>
                    <h3 className="text-lg font-black text-white tracking-tight drop-shadow-sm">
                      {unit.unitTitle}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                      {unit.unitTitleBn}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-white/80 pt-4">
                    <span>{unit.lessons.length} Lessons</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ChevronRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Watermark Number */}
                  <span className="absolute -bottom-2 -right-1 text-7xl sm:text-8xl font-black text-white/25 select-none pointer-events-none leading-none tracking-tighter">
                    {unit.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Textbook Reader Modal */}
        <TextbookReaderModal
          isOpen={isTextbookOpen}
          onClose={() => setIsTextbookOpen(false)}
          unitId={selectedUnit?.id || 'unit-1'}
          lessonId={selectedLesson?.id || 'u1-l1'}
          onStartExam={() => {
            setIsTextbookOpen(false);
            if (selectedUnit) {
              if (selectedLesson) {
                setIsExamActive(true);
              } else {
                handleSelectLesson(selectedUnit.lessons[0]);
              }
            }
          }}
          lang={lang}
        />
      </div>
    </div>
  );
}
