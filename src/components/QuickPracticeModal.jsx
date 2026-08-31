import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import HSCExamInterface from './HSCExamInterface';
import { hscQuestionsList, smartInterleaveQuestions } from '../data/questions';

export default function QuickPracticeModal({ isOpen, onClose, lang, dynamicQuestions }) {
  if (!isOpen) return null;

  // Exactly 10 questions session
  const tenQuestionsList = useMemo(() => {
    const base = dynamicQuestions && dynamicQuestions.length > 0 ? dynamicQuestions : hscQuestionsList;
    return smartInterleaveQuestions(base).slice(0, 10);
  }, [dynamicQuestions, isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto animate-in fade-in zoom-in duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-[#182030] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
          title="Close Quiz"
        >
          <X size={18} />
        </button>

        {/* HSC Exam Interface for exactly 10 questions */}
        <HSCExamInterface
          questions={tenQuestionsList}
          sessionKey={`quick_practice_10_${isOpen ? 'active' : 'idle'}`}
          onClose={onClose}
          lang={lang}
        />
      </div>
    </div>
  );
}
