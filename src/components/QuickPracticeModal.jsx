import React, { useState } from 'react';
import { X, Zap, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockQuickQuestions } from '../data/mockData';

export default function QuickPracticeModal({ isOpen, onClose, lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const isBn = lang === 'bn';
  const currentQ = mockQuickQuestions[currentIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < mockQuickQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <Zap size={20} className="fill-yellow-400" />
            <span>{isBn ? 'দ্রুত প্র্যাকটিস' : 'Quick Practice Challenge'}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isFinished ? (
            <div>
              {/* Progress & Category */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="bg-[#1c2436] px-2.5 py-1 rounded-md text-emerald-400 font-semibold">
                  {currentQ.subject}
                </span>
                <span>
                  {isBn
                    ? `প্রশ্ন ${currentIndex + 1} / ${mockQuickQuestions.length}`
                    : `Question ${currentIndex + 1} of ${mockQuickQuestions.length}`}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-white font-bold text-base md:text-lg mb-5 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = 'bg-[#182030] border-[#222c40] text-slate-200 hover:bg-[#1e283d]';

                  if (isAnswered) {
                    if (idx === currentQ.correct) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-semibold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#141a27] border-[#1f2738] text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && idx === currentQ.correct && (
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correct && (
                        <XCircle size={18} className="text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {isAnswered && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#0e131e] border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-emerald-400 block mb-1">
                    {isBn ? '💡 ব্যাখ্যা / Explanation:' : '💡 Explanation:'}
                  </span>
                  {currentQ.explanation}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="mt-5 text-right">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/50"
                  >
                    <span>{currentIndex + 1 === mockQuickQuestions.length ? (isBn ? 'ফলাফল দেখো' : 'View Results') : (isBn ? 'পরবর্তী প্রশ্ন' : 'Next Question')}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4 border border-emerald-500/30">
                <Award size={36} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                {isBn ? 'দারুণ প্র্যাকটিস!' : 'Awesome Practice!'}
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                {isBn
                  ? `আপনি ${mockQuickQuestions.length} টি প্রশ্নের মধ্যে ${score} টি সঠিক উত্তর দিয়েছেন!`
                  : `You scored ${score} out of ${mockQuickQuestions.length} questions!`}
              </p>

              <div className="bg-[#0e131e] p-4 rounded-xl border border-slate-800 max-w-xs mx-auto mb-6">
                <span className="text-xs text-slate-400 block">
                  {isBn ? 'অর্জিত পয়েন্ট' : 'Points Earned'}
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  +{score * 15} pts
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-[#192233] hover:bg-[#202b40] text-slate-300 text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw size={15} />
                  <span>{isBn ? 'আবার চেষ্টা করো' : 'Practice Again'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                >
                  {isBn ? 'সম্পন্ন' : 'Done'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
