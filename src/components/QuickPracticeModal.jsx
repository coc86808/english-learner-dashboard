import React, { useMemo } from 'react';
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
      <div className="relative w-full max-w-3xl my-auto">
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
