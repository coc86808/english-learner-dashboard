import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  Play,
  Bookmark,
  Share2,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { unit1Lesson1Textbook } from '../data/textbooks/unit1Lesson1Text';
import { unit1Lesson2Textbook } from '../data/textbooks/unit1Lesson2Text';
import { unit1Lesson3Textbook } from '../data/textbooks/unit1Lesson3Text';
import { unit1Lesson4Textbook } from '../data/textbooks/unit1Lesson4Text';
import { unit2Lesson1Textbook } from '../data/textbooks/unit2Lesson1Text';
import { unit2Lesson2Textbook } from '../data/textbooks/unit2Lesson2Text';
import { unit2Lesson3Textbook } from '../data/textbooks/unit2Lesson3Text';
import { unit2Lesson4Textbook } from '../data/textbooks/unit2Lesson4Text';
import { unit3Lesson1Textbook } from '../data/textbooks/unit3Lesson1Text';
import { unit3Lesson2Textbook } from '../data/textbooks/unit3Lesson2Text';
import { unit3Lesson3Textbook } from '../data/textbooks/unit3Lesson3Text';
import { unit3Lesson4Textbook } from '../data/textbooks/unit3Lesson4Text';
import { unit5Lesson1Textbook } from '../data/textbooks/unit5Lesson1Text';
import { unit5Lesson2Textbook } from '../data/textbooks/unit5Lesson2Text';
import { unit5Lesson3Textbook } from '../data/textbooks/unit5Lesson3Text';
import { unit5Lesson4Textbook } from '../data/textbooks/unit5Lesson4Text';
import { unit5Lesson5Textbook } from '../data/textbooks/unit5Lesson5Text';
import { unit6Lesson1Textbook } from '../data/textbooks/unit6Lesson1Text';
import { unit6Lesson2Textbook } from '../data/textbooks/unit6Lesson2Text';
import { unit7Lesson1Textbook } from '../data/textbooks/unit7Lesson1Text';
import { unit7Lesson2Textbook } from '../data/textbooks/unit7Lesson2Text';
import { unit7Lesson3Textbook } from '../data/textbooks/unit7Lesson3Text';
import { unit9Lesson1Textbook } from '../data/textbooks/unit9Lesson1Text';
import { unit10Lesson1Textbook } from '../data/textbooks/unit10Lesson1Text';
import { unit10Lesson2Textbook } from '../data/textbooks/unit10Lesson2Text';

export default function TextbookReaderModal({
  isOpen,
  onClose,
  onStartExam,
  unitId = 'unit-1',
  lessonId = 'u1-l1',
  lang = 'bn'
}) {
  const [selectedVocab, setSelectedVocab] = useState(null);
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  let currentTextbook = unit1Lesson1Textbook;
  if (lessonId === 'u7-l1' || (unitId === 'unit-7' && (!lessonId || lessonId === 'u7-l1'))) {
    currentTextbook = unit7Lesson1Textbook;
  } else if (lessonId === 'u7-l2') {
    currentTextbook = unit7Lesson2Textbook;
  } else if (lessonId === 'u7-l3') {
    currentTextbook = unit7Lesson3Textbook;
  } else if (lessonId === 'u6-l1' || (unitId === 'unit-6' && (!lessonId || lessonId === 'u6-l1'))) {
    currentTextbook = unit6Lesson1Textbook;
  } else if (lessonId === 'u6-l2') {
    currentTextbook = unit6Lesson2Textbook;
  } else if (lessonId === 'u5-l1' || (unitId === 'unit-5' && (!lessonId || lessonId === 'u5-l1'))) {
    currentTextbook = unit5Lesson1Textbook;
  } else if (lessonId === 'u5-l2') {
    currentTextbook = unit5Lesson2Textbook;
  } else if (lessonId === 'u5-l3') {
    currentTextbook = unit5Lesson3Textbook;
  } else if (lessonId === 'u5-l4') {
    currentTextbook = unit5Lesson4Textbook;
  } else if (lessonId === 'u5-l5') {
    currentTextbook = unit5Lesson5Textbook;
  } else if (lessonId === 'u3-l1' || (unitId === 'unit-3' && (!lessonId || lessonId === 'u3-l1'))) {
    currentTextbook = unit3Lesson1Textbook;
  } else if (lessonId === 'u3-l2') {
    currentTextbook = unit3Lesson2Textbook;
  } else if (lessonId === 'u3-l3') {
    currentTextbook = unit3Lesson3Textbook;
  } else if (lessonId === 'u3-l4') {
    currentTextbook = unit3Lesson4Textbook;
  } else if (lessonId === 'u2-l1' || (unitId === 'unit-2' && (!lessonId || lessonId === 'u2-l1'))) {
    currentTextbook = unit2Lesson1Textbook;
  } else if (lessonId === 'u2-l2') {
    currentTextbook = unit2Lesson2Textbook;
  } else if (lessonId === 'u2-l3') {
    currentTextbook = unit2Lesson3Textbook;
  } else if (lessonId === 'u2-l4') {
    currentTextbook = unit2Lesson4Textbook;
  } else if (lessonId === 'u1-l4') {
    currentTextbook = unit1Lesson4Textbook;
  } else if (lessonId === 'u1-l3') {
    currentTextbook = unit1Lesson3Textbook;
  } else if (lessonId === 'u1-l2') {
    currentTextbook = unit1Lesson2Textbook;
  } else if (unitId === 'unit-9' || (lessonId && lessonId.includes('u9'))) {
    currentTextbook = unit9Lesson1Textbook;
  } else if (lessonId === 'u10-l2' || lessonId === 'u10-l3') {
    currentTextbook = unit10Lesson2Textbook;
  } else if (unitId === 'unit-10' || (lessonId && lessonId.includes('u10'))) {
    currentTextbook = unit10Lesson1Textbook;
  }

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

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

        <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
                <BookOpen size={14} />
                <span>NCTB HSC English For Today Textbook</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentTextbook.title} ({currentTextbook.titleBn})
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {currentTextbook.unitTitle} • Author: <span className="text-slate-200 font-semibold">{currentTextbook.author}</span>
              </p>
            </div>

            {/* Quick Launch Exam Trigger */}
            <button
              onClick={() => {
                if (onStartExam) onStartExam();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all shrink-0 active:scale-95"
            >
              <Play size={14} className="fill-current" />
              <span>{isBn ? 'এই লেসনের পরীক্ষা শুরু করুন' : 'Start Lesson MCQ Exam'}</span>
            </button>
          </div>

          {/* Story Summary Card */}
          <div className="p-4 rounded-2xl bg-[#0e131e] border border-[#202b3d] text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>{isBn ? 'গল্পের সারসংক্ষেপ ও মূলভাব (Theme):' : 'Story Theme & Context:'}</span>
            </span>
            <p className="leading-relaxed text-slate-300">
              {currentTextbook.summaryBn}
            </p>
          </div>

          {/* Scrollable Story Content */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm sm:text-base leading-relaxed text-slate-200">
            {currentTextbook.sections.map((sec) => (
              <div
                key={sec.paraNumber}
                className="p-5 rounded-2xl bg-[#0e131e]/70 border border-[#1d2638] space-y-3 hover:border-emerald-500/30 transition-all group"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-[#1b2333] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-black flex items-center justify-center">
                      {sec.paraNumber}
                    </span>
                    <h4 className="font-bold text-white text-sm">
                      {sec.heading}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleSpeak(sec.content)}
                    title="Listen Paragraph Narration"
                    className="p-1.5 rounded-lg bg-[#182030] hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all text-xs flex items-center gap-1"
                  >
                    <Volume2 size={14} />
                    <span className="text-[10px] hidden sm:inline">শুনুন</span>
                  </button>
                </div>

                {/* Paragraph Body Text */}
                <div className="whitespace-pre-line text-slate-300 leading-relaxed font-normal">
                  {sec.content}
                </div>

                {/* Bengali Translation if present */}
                {sec.bengaliTranslation && (
                  <div className="p-3.5 rounded-xl bg-[#141b2a] border border-[#223048] text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-medium">
                    <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                      🇧🇩 {isBn ? 'বাংলা অনুবাদ:' : 'Bengali Meaning:'}
                    </span>
                    <div className="whitespace-pre-line text-slate-300/90">
                      {sec.bengaliTranslation}
                    </div>
                  </div>
                )}

                {/* Key Vocabulary Pills */}
                {sec.keyVocab && sec.keyVocab.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#182030] text-xs">
                    <span className="text-[11px] text-slate-500 font-semibold">
                      🔑 {isBn ? 'গুরুত্বপূর্ণ শব্দসমূহ:' : 'Key Vocab:'}
                    </span>
                    {sec.keyVocab.map((w, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-[#162033] border border-[#23334d] text-emerald-300 font-medium text-xs"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="pt-3 border-t border-[#1a2233] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>📖 {currentTextbook.sections.length} টি প্যারাগ্রাফ সম্পন্ন</span>

            <button
              onClick={() => {
                if (onStartExam) onStartExam();
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
            >
              <span>{isBn ? 'ভোকাবুলারি MCQ পরীক্ষা শুরু করুন' : 'Start Vocabulary MCQ Exam'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
