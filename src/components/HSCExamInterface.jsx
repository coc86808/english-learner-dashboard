import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Volume2,
  BookOpen,
  Calendar,
  Timer,
  AlertTriangle,
  Sparkles,
  BookmarkPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HSCExamInterface({
  questions = [],
  onFinishExam,
  onClose,
  lang = 'bn'
}) {
  const isBn = lang === 'bn';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isNotSureClicked, setIsNotSureClicked] = useState(false);

  // Counters matching sketch: Learning, Mistake, Done
  const [learningCount, setLearningCount] = useState(questions.length);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  // Mistake questions bucket for re-test
  const [mistakeList, setMistakeList] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 mins

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQ = questions[currentIndex] || questions[0];

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctOption;

    if (isCorrect) {
      setDoneCount((prev) => prev + 1);
      setLearningCount((prev) => Math.max(0, prev - 1));
    } else {
      setMistakeCount((prev) => prev + 1);
      setLearningCount((prev) => Math.max(0, prev - 1));
      setMistakeList((prev) => [...prev, currentQ]);
    }
  };

  const handleNotSure = () => {
    if (isAnswered) return;
    setIsNotSureClicked(true);
    setIsAnswered(true);
    setSelectedOption(null);

    // "Not sure" adds to mistake/review bucket
    setMistakeCount((prev) => prev + 1);
    setLearningCount((prev) => Math.max(0, prev - 1));
    setMistakeList((prev) => [...prev, currentQ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsNotSureClicked(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
    setLearningCount(questions.length);
    setMistakeCount(0);
    setDoneCount(0);
    setMistakeList([]);
    setIsFinished(false);
    setSecondsLeft(600);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full bg-[#131824] border border-[#1d2536] rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {!isFinished ? (
        <div className="space-y-6 relative z-10">
          {/* 1. Top Status Bar matching hand-drawn sketch: Learning | Mistake | Done + Date/Timer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#1d2536]">
            {/* Learning / Mistake / Done Counters */}
            <div className="flex items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-bold">
              {/* Learning counter */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
                <span className="text-slate-400 font-normal">Learning</span>
                <span className="text-base font-black text-blue-400">{learningCount}</span>
              </div>

              {/* Mistake counter */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
                <span className="text-slate-400 font-normal">Mistake</span>
                <span className="text-base font-black text-rose-400">{mistakeCount}</span>
              </div>

              {/* Done counter */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <span className="text-slate-400 font-normal">Done</span>
                <span className="text-base font-black text-emerald-400">{doneCount}</span>
              </div>
            </div>

            {/* Date / Timer badge */}
            <div className="flex items-center gap-2 text-xs font-semibold bg-[#0e121a] px-3.5 py-1.5 rounded-xl border border-[#232c3f] text-slate-300">
              <Timer size={14} className="text-amber-400" />
              <span>{formatTimer(secondsLeft)}</span>
              <span className="text-slate-600">|</span>
              <Calendar size={14} className="text-slate-400" />
              <span className="text-slate-400">29-Aug-2026</span>
            </div>
          </div>

          {/* 2. Question Number Header matching sketch: Question: 13 */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Question : {currentIndex + 1}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                / {questions.length}
              </span>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#1a2336] text-cyan-300 border border-[#2c3a54]">
              {currentQ.unit || 'HSC English Textbook'}
            </span>
          </div>

          {/* 3. Question Prompt Box matching sketch */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e131e] border border-[#232c3f] shadow-inner space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
                  {currentQ.word}
                </h3>
                {currentQ.partsOfSpeech && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {currentQ.partsOfSpeech}
                  </span>
                )}
              </div>

              {/* Pronunciation Audio Button */}
              <button
                onClick={() => handleSpeak(currentQ.word)}
                title="Listen Pronunciation"
                className="p-2 rounded-xl bg-[#192233] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-[#26334a] transition-all"
              >
                <Volume2 size={18} />
              </button>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
              {currentQ.questionText || `Choose the correct meaning/synonym of "${currentQ.word}":`}
            </p>

            {currentQ.bengaliMeaning && (
              <span className="text-xs text-slate-400 block pt-1 border-t border-[#1a2233]">
                💡 <span className="font-semibold text-slate-300">বাংলা অর্থ:</span> {currentQ.bengaliMeaning}
              </span>
            )}
          </div>

          {/* 4. Options List matching sketch: Option 1, Option 2, Option 3, Option 4 */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isOptionCorrect = idx === currentQ.correctOption;
              const isOptionSelected = idx === selectedOption;

              let optionStyle =
                'bg-[#0f1420] border-[#222c40] text-slate-200 hover:bg-[#161c2b] hover:border-slate-600';

              if (isAnswered) {
                if (isOptionCorrect) {
                  optionStyle =
                    'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50';
                } else if (isOptionSelected) {
                  optionStyle =
                    'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/50';
                } else {
                  optionStyle =
                    'bg-[#0a0d14] border-[#182030] text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-sm sm:text-base transition-all duration-200 flex items-center justify-between text-left group ${optionStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isAnswered && isOptionCorrect
                          ? 'bg-emerald-500 text-white'
                          : isAnswered && isOptionSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-[#182030] text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>

                  {isAnswered && isOptionCorrect && (
                    <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isOptionSelected && !isOptionCorrect && (
                    <XCircle size={20} className="text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 5. Bottom Action Area with "Not sure" button from sketch */}
          <div className="flex items-center justify-between pt-3 gap-3">
            {/* Textbook Context / Hint pill */}
            <div className="text-xs text-slate-400 hidden sm:block">
              {currentQ.boardExamTag && (
                <span className="bg-[#0e121a] px-3 py-1.5 rounded-xl border border-[#232c3f]">
                  📌 {currentQ.boardExamTag}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Special "Not sure" button directly matching sketch */}
              {!isAnswered ? (
                <button
                  onClick={handleNotSure}
                  className="px-5 py-3 rounded-2xl bg-[#181a28] hover:bg-[#202438] border-2 border-slate-700 hover:border-amber-500/60 text-slate-300 hover:text-amber-300 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <HelpCircle size={17} className="text-amber-400" />
                  <span>{isBn ? 'Not sure (নিশ্চিত নই)' : 'Not sure'}</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all transform active:scale-95"
                >
                  <span>
                    {currentIndex + 1 === questions.length
                      ? isBn ? 'ফলাফল দেখুন' : 'Finish & View Score'
                      : isBn ? 'পরবর্তী প্রশ্ন' : 'Next Question'}
                  </span>
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>

          {/* 6. Contextual Explanation Box when answered or "Not sure" is clicked */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-[#0e131e] border border-emerald-500/30 text-xs text-slate-300 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <Sparkles size={15} />
                  <span>
                    {isNotSureClicked
                      ? isBn ? 'সঠিক উত্তর ও বিস্তারিত ব্যাখ্যা:' : 'Correct Answer & Explanation:'
                      : isBn ? 'পাঠ্যবইয়ের প্রাসঙ্গিক ব্যাখ্যা:' : 'Textbook Context Explanation:'}
                  </span>
                </span>
                <span className="text-emerald-300 font-bold">
                  Correct: {String.fromCharCode(65 + currentQ.correctOption)} ({currentQ.options[currentQ.correctOption]})
                </span>
              </div>

              {currentQ.exampleSentence && (
                <div className="p-2.5 bg-[#141b29] rounded-xl border border-[#1f2a3e] italic text-slate-300">
                  {currentQ.exampleSentence}
                </div>
              )}

              {(currentQ.synonyms || currentQ.antonyms) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {currentQ.synonyms && (
                    <div className="text-slate-300">
                      <span className="font-bold text-emerald-400">Synonyms: </span>
                      {currentQ.synonyms}
                    </div>
                  )}
                  {currentQ.antonyms && (
                    <div className="text-slate-300">
                      <span className="font-bold text-rose-400">Antonyms: </span>
                      {currentQ.antonyms}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Final Score / Results Screen */
        <div className="text-center py-8 space-y-6 relative z-10 animate-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/60 border border-emerald-400/30">
            <Award size={44} />
          </div>

          <div>
            <h2 className="text-3xl font-black text-white">
              {isBn ? 'পরীক্ষা সম্পন্ন হয়েছে!' : 'Exam Completed!'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {isBn ? 'আপনার অর্জিত ফলাফল ও ভুল শব্দগুলোর তালিকা:' : 'Here is your overall performance breakdown:'}
            </p>
          </div>

          {/* Stats Summary Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-emerald-500/30 text-center">
              <span className="text-xs text-slate-400 block">Done (সঠিক)</span>
              <span className="text-2xl font-black text-emerald-400">{doneCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-rose-500/30 text-center">
              <span className="text-xs text-slate-400 block">Mistake (ভুল)</span>
              <span className="text-2xl font-black text-rose-400">{mistakeCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-amber-500/30 text-center">
              <span className="text-xs text-slate-400 block">Accuracy</span>
              <span className="text-2xl font-black text-amber-400">
                {questions.length > 0 ? Math.round((doneCount / questions.length) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-[#192233] hover:bg-[#222e44] text-slate-300 text-sm font-bold inline-flex items-center gap-2 transition-all"
            >
              <RotateCcw size={16} />
              <span>{isBn ? 'পুনরায় পরীক্ষা দিন' : 'Retake Exam'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-950/50"
              >
                {isBn ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
