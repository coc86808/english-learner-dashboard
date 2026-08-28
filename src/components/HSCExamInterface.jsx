import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Volume2,
  Calendar,
  Timer,
  Sparkles,
  RefreshCw,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HSCExamInterface({
  questions = [],
  onFinishExam,
  onClose,
  lang = 'bn'
}) {
  const isBn = lang === 'bn';

  // Initialize unique question tracker dictionary
  // id -> { consecutiveCorrect: 0, status: 'unseen' | 'learning' | 'mistake' | 'done', totalAttempts: 0 }
  const [questionStats, setQuestionStats] = useState(() => {
    const initialMap = {};
    questions.forEach((q) => {
      initialMap[q.id] = {
        consecutiveCorrect: 0,
        status: 'learning',
        totalAttempts: 0,
        lastAnswerWasCorrect: null
      };
    });
    return initialMap;
  });

  // The active running queue of questions
  const [activeQueue, setActiveQueue] = useState([...questions]);
  const [queueIndex, setQueueIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isNotSureClicked, setIsNotSureClicked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(900); // 15 mins

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const currentQ = activeQueue[queueIndex] || questions[0];
  const currentStat = currentQ ? questionStats[currentQ.id] || { consecutiveCorrect: 0, status: 'learning' } : { consecutiveCorrect: 0, status: 'learning' };

  // Calculate live counters across all unique questions
  const totalUnique = questions.length;
  const doneCount = Object.values(questionStats).filter((s) => s.status === 'done').length;
  const mistakeCount = Object.values(questionStats).filter((s) => s.status === 'mistake').length;
  const learningCount = Object.values(questionStats).filter((s) => s.status === 'learning').length;

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctOption;
    processAnswer(isCorrect, false);
  };

  const handleNotSure = () => {
    if (isAnswered || !currentQ) return;
    setIsNotSureClicked(true);
    setIsAnswered(true);
    setSelectedOption(null);

    // "Not sure" is treated as mistake for spaced review
    processAnswer(false, true);
  };

  const processAnswer = (isCorrect, isNotSure) => {
    const qId = currentQ.id;
    const prevStat = questionStats[qId] || { consecutiveCorrect: 0, status: 'learning', totalAttempts: 0 };

    let newConsecutive = isCorrect ? prevStat.consecutiveCorrect + 1 : 0;
    let newStatus = prevStat.status;

    if (isCorrect) {
      if (newConsecutive >= 3) {
        newStatus = 'done'; // Mastered after 3 correct answers!
      } else {
        newStatus = 'learning'; // 1 or 2 correct answers
      }
    } else {
      newStatus = 'mistake'; // Wrong or Not Sure resets to mistake
    }

    // Update global question stats
    setQuestionStats((prev) => ({
      ...prev,
      [qId]: {
        consecutiveCorrect: newConsecutive,
        status: newStatus,
        totalAttempts: prevStat.totalAttempts + 1,
        lastAnswerWasCorrect: isCorrect
      }
    }));

    // If not yet completed 3 times (not 'done'), re-insert into queue with 3-4 question gap!
    if (newConsecutive < 3) {
      scheduleReappearance(currentQ);
    }
  };

  // Spaced Repetition Insertion: ensures at least 3-4 questions in between
  const scheduleReappearance = (questionToRepeat) => {
    setActiveQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      // Target insert index: at least current position + 4 (3 questions in middle)
      const minGap = 4;
      const targetIndex = Math.min(newQueue.length, queueIndex + minGap + Math.floor(Math.random() * 2));

      // Insert question at target position
      newQueue.splice(targetIndex, 0, questionToRepeat);
      return newQueue;
    });
  };

  const handleNext = () => {
    const nextIdx = queueIndex + 1;

    // Check if all unique questions are in 'done' state
    const allDone = questions.every((q) => {
      const s = questionStats[q.id];
      return s && s.status === 'done';
    });

    if (allDone || nextIdx >= activeQueue.length) {
      if (allDone) {
        setIsFinished(true);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 }
        });
      } else {
        // More reviews needed, continue through queue
        setQueueIndex(nextIdx);
        setSelectedOption(null);
        setIsAnswered(false);
        setIsNotSureClicked(false);
      }
    } else {
      setQueueIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsNotSureClicked(false);
    }
  };

  const handleRestart = () => {
    const initialMap = {};
    questions.forEach((q) => {
      initialMap[q.id] = {
        consecutiveCorrect: 0,
        status: 'learning',
        totalAttempts: 0,
        lastAnswerWasCorrect: null
      };
    });
    setQuestionStats(initialMap);
    setActiveQueue([...questions]);
    setQueueIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
    setIsFinished(false);
    setSecondsLeft(900);
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
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {!isFinished && currentQ ? (
        <div className="space-y-6 relative z-10">
          {/* 1. Top Status Bar matching sketch: Learning | Mistake | Done + Timer/Date */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#1d2536]">
            <div className="flex items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-bold">
              {/* Learning counter */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 shadow-sm">
                <span className="text-slate-400 font-normal">Learning</span>
                <span className="text-base font-black text-blue-400">{learningCount}</span>
              </div>

              {/* Mistake counter */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 shadow-sm">
                <span className="text-slate-400 font-normal">Mistake</span>
                <span className="text-base font-black text-rose-400">{mistakeCount}</span>
              </div>

              {/* Done counter */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-sm">
                <span className="text-slate-400 font-normal">Done</span>
                <span className="text-base font-black text-emerald-400">{doneCount}</span>
                <span className="text-[10px] text-slate-500 font-normal">/{totalUnique}</span>
              </div>
            </div>

            {/* Timer & Date badge */}
            <div className="flex items-center gap-2 text-xs font-semibold bg-[#0e121a] px-3.5 py-1.5 rounded-xl border border-[#232c3f] text-slate-300">
              <Timer size={14} className="text-amber-400" />
              <span>{formatTimer(secondsLeft)}</span>
              <span className="text-slate-600">|</span>
              <Calendar size={14} className="text-slate-400" />
              <span className="text-slate-400">29-Aug-2026</span>
            </div>
          </div>

          {/* Mastery Progress Bar (3 Correct Checks to Master) */}
          <div className="bg-[#0e131e] p-3 rounded-2xl border border-[#1b2333] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">
                {isBn ? 'এই শব্দের দক্ষতা (Mastery):' : 'Word Mastery Level:'}
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] transition-all ${
                      currentStat.consecutiveCorrect >= step
                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/40'
                        : 'bg-[#182030] text-slate-600 border border-[#232c3f]'
                    }`}
                  >
                    {currentStat.consecutiveCorrect >= step ? <Check size={12} /> : step}
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              {currentStat.consecutiveCorrect === 3
                ? '✅ Mastered (Done)'
                : currentStat.consecutiveCorrect > 0
                ? `${currentStat.consecutiveCorrect}/3 Correct (Appears in 3-4 Qs)`
                : '🔁 Repeat after 3-4 Qs'}
            </span>
          </div>

          {/* 2. Question Header matching sketch: Question: 13 */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Question : {queueIndex + 1}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                (Queue: {queueIndex + 1}/{activeQueue.length})
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
            <div className="text-xs text-slate-400 hidden sm:block">
              {currentQ.boardExamTag && (
                <span className="bg-[#0e121a] px-3 py-1.5 rounded-xl border border-[#232c3f]">
                  📌 {currentQ.boardExamTag}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
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
                    {isBn ? 'পরবর্তী প্রশ্ন' : 'Next Question'}
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
                      ? isBn ? 'সঠিক উত্তর ও পুনরাবৃত্তি নোট:' : 'Correct Answer & Repetition Note:'
                      : isBn ? 'পাঠ্যবইয়ের প্রাসঙ্গিক ব্যাখ্যা:' : 'Textbook Context Explanation:'}
                  </span>
                </span>
                <span className="text-emerald-300 font-bold">
                  Correct: {String.fromCharCode(65 + currentQ.correctOption)} ({currentQ.options[currentQ.correctOption]})
                </span>
              </div>

              {/* Spaced repetition indicator note */}
              <div className="text-[11px] text-amber-300/90 font-medium bg-[#1a1726] p-2 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                <RefreshCw size={13} className="text-amber-400" />
                <span>
                  {isNotSureClicked || selectedOption !== currentQ.correctOption
                    ? (isBn ? '⚠️ ভুল হয়েছে / নিশ্চিত ছিলেন না। ৩-৪টি প্রশ্নের পর এই প্রশ্নটি পুনরায় আসবে।' : '⚠️ Marked as mistake. This question will reappear after 3-4 questions.')
                    : (currentStat.consecutiveCorrect + 1 >= 3
                        ? (isBn ? '🎉 দারুণ! ৩ বার সঠিক উত্তর দিয়ে এই শব্দটি সম্পন্ন (Done) হয়েছে!' : '🎉 Awesome! Answered correctly 3 times. Marked as Done!')
                        : (isBn ? `👍 সঠিক উত্তর (${currentStat.consecutiveCorrect + 1}/3)! নিশ্চিত করতে ৩-৪টি প্রশ্নের পর আবার আসবে।` : `👍 Correct (${currentStat.consecutiveCorrect + 1}/3)! Will reappear after 3-4 questions to master.`))}
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
        /* Final Mastery Screen */
        <div className="text-center py-8 space-y-6 relative z-10 animate-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/60 border border-emerald-400/30">
            <Award size={44} />
          </div>

          <div>
            <h2 className="text-3xl font-black text-white">
              {isBn ? 'অভিনন্দন! সম্পূর্ণ ভোকাবুলারি আয়ত্ত হয়েছে!' : 'Congratulations! All Words Mastered!'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {isBn
                ? 'আপনি প্রতিটি শব্দ ও প্রশ্নের উত্তর সফলভাবে অন্তত ৩ বার সঠিকভাবে দিয়েছেন।'
                : 'You have successfully answered every word correctly at least 3 times!'}
            </p>
          </div>

          {/* Stats Summary Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-emerald-500/30 text-center">
              <span className="text-xs text-slate-400 block">Mastered (Done)</span>
              <span className="text-2xl font-black text-emerald-400">{doneCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-blue-500/30 text-center">
              <span className="text-xs text-slate-400 block">Total Unique</span>
              <span className="text-2xl font-black text-blue-400">{totalUnique}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-amber-500/30 text-center">
              <span className="text-xs text-slate-400 block">Retention</span>
              <span className="text-2xl font-black text-amber-400">100% ⭐</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-[#192233] hover:bg-[#222e44] text-slate-300 text-sm font-bold inline-flex items-center gap-2 transition-all"
            >
              <RotateCcw size={16} />
              <span>{isBn ? 'পুনরায় প্র্যাকটিস করুন' : 'Practice Again'}</span>
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
