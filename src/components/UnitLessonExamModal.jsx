import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  ChevronRight,
  BookOpen,
  Play,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Flame,
  Award
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import { hscQuestionsList } from '../data/questions';
import HSCExamInterface from './HSCExamInterface';

export default function UnitLessonExamModal({
  isOpen,
  onClose,
  initialUnit = null,
  initialLesson = null,
  lang = 'bn'
}) {
  const isBn = lang === 'bn';

  // Navigation steps: 'select-unit' -> 'select-lesson' -> 'exam'
  const [selectedUnit, setSelectedUnit] = useState(initialUnit || hscUnits[0]);
  const [selectedLesson, setSelectedLesson] = useState(initialLesson || null);
  const [isExamActive, setIsExamActive] = useState(false);

  if (!isOpen) return null;

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
  };

  const handleStartExam = (unit, lesson = null) => {
    setSelectedUnit(unit);
    setSelectedLesson(lesson);
    setIsExamActive(true);
  };

  const handleBackToSelection = () => {
    setIsExamActive(false);
  };

  // Filter questions for the selected unit and lesson
  const getFilteredQuestions = () => {
    if (!selectedUnit) return hscQuestionsList;

    // Filter questions matching unit
    const unitQuestions = hscQuestionsList.filter((q) => {
      if (!q.unit) return true;
      return (
        q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) ||
        q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())
      );
    });

    // If a specific lesson was picked and questions have lesson tags
    if (selectedLesson) {
      const lessonQuestions = unitQuestions.filter((q) => {
        return (
          q.unit &&
          (q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) ||
            q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))
        );
      });

      if (lessonQuestions.length > 0) return lessonQuestions;
    }

    return unitQuestions.length > 0 ? unitQuestions : hscQuestionsList;
  };

  const activeQuestions = getFilteredQuestions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto animate-in fade-in zoom-in duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-[#182030] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all"
        >
          <X size={18} />
        </button>

        {isExamActive ? (
          /* Step 3: Active Exam Screen */
          <div className="space-y-4">
            {/* Breadcrumb Navigation Bar */}
            <div className="bg-[#10141f] border border-[#1e2738] p-3 rounded-2xl flex items-center justify-between text-xs text-slate-300">
              <button
                onClick={handleBackToSelection}
                className="px-3 py-1.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-300 font-bold inline-flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft size={14} />
                <span>{isBn ? 'ইউনিট ও লেসন পরিবর্তন' : 'Change Unit/Lesson'}</span>
              </button>

              <div className="flex items-center gap-2 font-semibold truncate max-w-md">
                <span className="text-emerald-400 font-bold">{selectedUnit?.unitNumber}</span>
                <span>➔</span>
                <span className="text-white truncate">
                  {selectedLesson ? `${selectedLesson.number}: ${selectedLesson.title}` : selectedUnit?.unitTitle}
                </span>
              </div>
            </div>

            {/* Live HSC Spaced Repetition Exam Interface */}
            <HSCExamInterface
              questions={activeQuestions}
              onClose={onClose}
              lang={lang}
            />
          </div>
        ) : (
          /* Step 1 & 2: Unit ➔ Lesson Selector Screen */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-[#1f283a] pb-4">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
                <GraduationCap size={15} />
                <span>{isBn ? 'HSC ইউনিট ➔ লেসন ➔ মডেল টেস্ট' : 'Unit ➔ Lesson ➔ Exam System'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isBn ? 'অধ্যায় ও পাঠভিত্তিক পরীক্ষা নির্বাচন' : 'Select Unit & Lesson to Begin Exam'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isBn
                  ? 'প্রথমে ইউনিট সিলেক্ট করুন, এরপর নির্দিষ্ট লেসনের পরীক্ষা অথবা সম্পূর্ণ ইউনিট টেস্ট শুরু করুন।'
                  : 'Select a textbook unit, then pick an individual lesson or take a full unit exam.'}
              </p>
            </div>

            {/* 2-Column Grid: Left (12 Units List) | Right (Lessons of Selected Unit) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-hidden min-h-0">
              {/* Left 5 Cols: All 12 Units */}
              <div className="md:col-span-5 space-y-2.5 overflow-y-auto pr-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {isBn ? '১. ইউনিট সিলেক্ট করুন (১২টি অধ্যায়):' : '1. Select Unit (12 Units):'}
                </span>

                {hscUnits.map((unit) => {
                  const isSelected = selectedUnit?.id === unit.id;

                  return (
                    <div
                      key={unit.id}
                      onClick={() => handleSelectUnit(unit)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-[#182338] border-emerald-500 shadow-md shadow-emerald-950/40 text-white'
                          : 'bg-[#0f1420] border-[#1e2738] hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-[#192233] text-emerald-400 border border-[#232f44]'
                          }`}
                        >
                          {unit.unitNumber.replace('Unit ', 'U')}
                        </div>

                        <div>
                          <h4 className="font-bold text-xs sm:text-sm group-hover:text-emerald-300 transition-colors">
                            {isBn ? unit.unitTitleBn : unit.unitTitle}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            {unit.unitNumber} • {unit.lessons.length} Lessons
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={16}
                        className={`transition-transform ${
                          isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Right 7 Cols: Lessons under Selected Unit */}
              <div className="md:col-span-7 bg-[#0e131e] border border-[#1e2738] rounded-2xl p-4 md:p-5 flex flex-col justify-between overflow-hidden">
                <div className="overflow-y-auto pr-1 space-y-4">
                  {/* Selected Unit Title & Full Unit Test Trigger */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b2333]">
                    <div>
                      <span className="text-[10px] font-black text-emerald-400 bg-[#161c2b] px-2 py-0.5 rounded border border-[#232c3f] uppercase">
                        {selectedUnit?.unitNumber}
                      </span>
                      <h3 className="text-lg font-black text-white mt-1">
                        {isBn ? selectedUnit?.unitTitleBn : selectedUnit?.unitTitle}
                      </h3>
                      <span className="text-xs text-slate-400">{selectedUnit?.unitTitle}</span>
                    </div>

                    <button
                      onClick={() => handleStartExam(selectedUnit, null)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition-all shrink-0"
                    >
                      <Play size={13} className="fill-current" />
                      <span>{isBn ? 'সম্পূর্ণ ইউনিট টেস্ট' : 'Full Unit Exam'}</span>
                    </button>
                  </div>

                  {/* Lessons List */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isBn ? '২. নির্দিষ্ট লেসনের পরীক্ষা বেছে নিন:' : '2. Pick a Specific Lesson:'}
                    </span>

                    {selectedUnit?.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleStartExam(selectedUnit, lesson)}
                        className="p-3.5 rounded-xl bg-[#121826] border border-[#1f2a3e] hover:border-emerald-500/50 hover:bg-[#162033] transition-all flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <BookOpen size={15} />
                          </div>

                          <div>
                            <span className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-300 transition-colors block">
                              {lesson.number}: {lesson.title}
                            </span>
                            {isBn && (
                              <span className="text-[11px] text-slate-400 block mt-0.5">
                                {lesson.titleBn}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[10px] text-slate-400 bg-[#161c2b] px-2 py-0.5 rounded border border-[#232c3f]">
                            {lesson.wordsCount} words
                          </span>

                          <button className="px-3 py-1.5 rounded-lg bg-emerald-600 group-hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors shadow-sm">
                            <Play size={11} className="fill-current" />
                            <span>{isBn ? 'শুরু' : 'Start'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tip */}
                <div className="pt-3 border-t border-[#1a2233] text-[11px] text-slate-400 flex items-center justify-between">
                  <span>💡 {isBn ? '৩ বার সঠিক উত্তর দিলে শব্দ সম্পন্ন (Done) হবে' : '3 consecutive correct answers required to master words'}</span>
                  <span className="text-emerald-400 font-semibold">{selectedUnit?.lessons.length} Lessons Available</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
