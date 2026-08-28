import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Volume2,
  VolumeX,
  Calendar,
  Timer,
  Sparkles,
  RefreshCw,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import CertificateModal from './CertificateModal';

export default function HSCExamInterface({
  questions = [],
  onFinishExam,
  onClose,
  lang = 'bn',
  studentInfo = { name: 'Tanvir Ahmed', college: 'Notre Dame College, Dhaka', batch: 'HSC 2026' }
}) {
  const isBn = lang === 'bn';
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Initialize unique question tracker dictionary
  // id -> { consecutiveCorrect: 0, status: 'learning' | 'mistake' | 'done', totalAttempts: 0 }
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
  const [activeQueue, setActiveQueue] = useState(() => [...questions]);
  const [queueIndex, setQueueIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isNotSureClicked, setIsNotSureClicked] = useState(false);

  // Shuffled display: each element is { text: string, originalIndex: number }
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [shuffledCorrectIndex, setShuffledCorrectIndex] = useState(0);

  // Hint: user can reveal Bengali meaning before answering (marks as Learning)
  const [hintRevealed, setHintRevealed] = useState(false);
  const [hintUsedForCurrentQ, setHintUsedForCurrentQ] = useState(false);

  // Calculate live counters across all unique questions
  const totalUnique = questions.length;
  const doneCount = Object.values(questionStats).filter(
    (s) => s.status === 'done'
  ).length;
  const mistakeCount = Object.values(questionStats).filter(
    (s) => s.status === 'mistake'
  ).length;
  const learningCount = Object.values(questionStats).filter(
    (s) => s.status === 'learning'
  ).length;

  // STRICT 100% DONE INVARIANT: Exam NEVER ends until EVERY single question has 3 consecutive correct answers
  const isAllDone =
    totalUnique > 0 &&
    questions.every((q) => (questionStats[q.id]?.consecutiveCorrect || 0) >= 3);

  useEffect(() => {
    if (isAllDone) {
      if (isSoundOn) soundManager.playComplete();
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  }, [isAllDone, isSoundOn]);

  // Safely resolve the current question
  const currentQ =
    activeQueue[queueIndex] ||
    questions.find((q) => (questionStats[q.id]?.consecutiveCorrect || 0) < 3) ||
    questions[0];

  const currentStat = currentQ
    ? questionStats[currentQ.id] || { consecutiveCorrect: 0, status: 'learning' }
    : { consecutiveCorrect: 0, status: 'learning' };

  // Shuffle options on every question appearance (including spaced-repetition re-tests of the same question)
  useEffect(() => {
    if (!currentQ || !currentQ.options) return;
    const indexed = currentQ.options.map((text, i) => ({ text, originalIndex: i }));
    // Fisher-Yates shuffle
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    setShuffledOptions(indexed);
    const newCorrectPos = indexed.findIndex(
      (o) => o.originalIndex === currentQ.correctOption
    );
    setShuffledCorrectIndex(newCorrectPos);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
    setHintRevealed(false);
    setHintUsedForCurrentQ(false);
  }, [queueIndex]); // Re-shuffle every time queue position advances, not just on id change

  const handleRevealHint = () => {
    setHintRevealed(true);
    setHintUsedForCurrentQ(true);
    // Mark as learning immediately in questionStats if not in mistake
    if (!currentQ) return;
    const qId = currentQ.id;
    setQuestionStats((prev) => {
      const prevStat = prev[qId] || {
        consecutiveCorrect: 0,
        status: 'learning',
        totalAttempts: 0
      };
      return {
        ...prev,
        [qId]: {
          ...prevStat,
          status: prevStat.status === 'mistake' ? 'mistake' : 'learning'
        }
      };
    });
  };

  const handleSelectOption = (shuffledIndex) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(shuffledIndex);
    setIsAnswered(true);

    const isCorrect = shuffledIndex === shuffledCorrectIndex;
    if (isSoundOn) {
      if (isCorrect) soundManager.playCorrect();
      else soundManager.playWrong();
    }
    processAnswer(isCorrect, false, hintUsedForCurrentQ);
  };

  const handleNotSure = () => {
    if (isAnswered || !currentQ) return;
    setIsNotSureClicked(true);
    setIsAnswered(true);
    setSelectedOption(null);

    if (isSoundOn) {
      soundManager.playWrong();
    }

    // "Not sure" is treated as mistake for spaced review
    processAnswer(false, true);
  };

  /**
   * EXACT MCQ STATE ENGINE:
   * 1. 1st time correct (no hint) -> mark as Done, re-schedule for 2 more re-tests after 3/4 questions.
   * 2. Correct BUT hint was used -> mark as Learning (not Done), re-schedule.
   * 3. If wrong / Not sure at any point -> removed from Done or Learning, added to Mistake, resets count to 0.
   * 4. When Mistake question returns:
   *    - If wrong again -> stays in Mistake, repeats after 3/4 questions.
   *    - If correct on 2nd time -> marked as Learning, repeats after 3/4 questions.
   * 5. When Learning question returns:
   *    - If correct -> marked as Done, repeats after 3/4 questions until 3 consecutive correct are achieved.
   *    - If wrong -> removed and added to Mistake.
   */
  const processAnswer = (isCorrect, isNotSure, usedHint = false) => {
    const qId = currentQ.id;
    const prevStat = questionStats[qId] || {
      consecutiveCorrect: 0,
      status: 'learning',
      totalAttempts: 0
    };

    let newConsecutive = 0;
    let newStatus = 'learning';

    if (isCorrect) {
      newConsecutive = prevStat.consecutiveCorrect + 1;

      if (usedHint) {
        // Used hint before answering → treat as Learning regardless of correctness
        newStatus = 'learning';
        newConsecutive = Math.min(newConsecutive, 1); // cap to max 1 when hint used
      } else if (prevStat.status === 'mistake') {
        // Correct on retry from mistake -> marked as Learning
        newStatus = 'learning';
      } else if (newConsecutive >= 3) {
        // 3rd consecutive correct -> fully Mastered & Done
        newStatus = 'done';
      } else {
        // 1st or 2nd correct without hint -> marked as Done
        newStatus = 'done';
      }
    } else {
      // Wrong option or Not Sure -> removed from Done or Learning and added to Mistake
      newStatus = 'mistake';
      newConsecutive = 0;
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

    // If not yet completed 3 consecutive times, schedule reappearance after at least 3-4 questions in middle
    if (newConsecutive < 3) {
      scheduleReappearance(currentQ);
    }
  };


  // Spaced Repetition Insertion: guarantees at least 3-4 other questions in between
  const scheduleReappearance = (questionToRepeat) => {
    setActiveQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      // Insert at least current position + 4 (ensuring 3-4 questions in middle)
      const minGap = 4;
      const targetIndex = Math.min(
        newQueue.length,
        queueIndex + minGap + Math.floor(Math.random() * 2)
      );

      newQueue.splice(targetIndex, 0, questionToRepeat);
      return newQueue;
    });
  };

  const handleNext = () => {
    const nextIdx = queueIndex + 1;

    // Check if queue needs replenishment with remaining non-mastered questions
    if (nextIdx >= activeQueue.length) {
      const remainingQuestions = questions.filter(
        (q) => (questionStats[q.id]?.consecutiveCorrect || 0) < 3
      );

      if (remainingQuestions.length > 0) {
        // Shuffle and append remaining to guarantee non-stop practice
        const shuffled = [...remainingQuestions].sort(() => Math.random() - 0.5);
        setActiveQueue((prev) => [...prev, ...shuffled]);
      }
    }

    setQueueIndex(nextIdx);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
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
    setSecondsLeft(900);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto w-full bg-[#131824] border border-[#1d2536] rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-5 text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {isBn ? 'পাঠ্যবইয়ের প্রশ্ন লোড করার অপেক্ষায়...' : 'Ready for Textbook Questions'}
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          {isBn
            ? 'সব ফেক প্রশ্ন এবং প্রগ্রেস সফলভাবে মুছে ফেলা হয়েছে। আপনি টেক্সটবুক দিলে সাথে সাথে প্রশ্ন তৈরি হয়ে এই অধ্যায়ে যুক্ত হয়ে যাবে।'
            : 'All fake questions and progress have been cleared. Ready to learn directly from your textbook.'}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#192233] hover:bg-[#222e44] text-slate-300 text-sm font-bold transition-all"
          >
            {isBn ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full bg-[#131824] border border-[#1d2536] rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {!isAllDone && currentQ ? (
        <div className="space-y-6 relative z-10">
          {/* 1. Top Status Bar matching hand sketch: Learning | Mistake | Done + Timer/Date (NO counting bar) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1d2536]">
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
              </div>
            </div>

            {/* Sound Toggle only (timer removed) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSoundOn(!isSoundOn)}
                title={isSoundOn ? 'Mute sound effects' : 'Enable sound effects'}
                className={`p-1.5 rounded-xl border transition-all ${
                  isSoundOn
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-[#182030] text-slate-500 border-slate-700'
                }`}
              >
                {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>

          {/* 2. Question Header: Question Number + Category Badge + Unit Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Question : {queueIndex + 1}
              </span>

              {currentQ.categoryLabel && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                  <span>{currentQ.categoryIcon || '🎯'}</span>
                  <span>{currentQ.categoryLabel}</span>
                </span>
              )}
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

            {/* Bengali Meaning / Hint area: Hidden before answer with Hint button; revealed if hint clicked or once answered */}
            {!isAnswered ? (
              <div className="pt-2 border-t border-[#1a2233]">
                {!hintRevealed ? (
                  <button
                    onClick={handleRevealHint}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>💡 {currentQ.category === 'bangla_meaning' ? 'হিন্ট দেখুন (হিন্ট নিলে এটি Learning হিসেবে চিহ্নিত হবে)' : 'বাংলা অর্থ দেখুন (হিন্ট নিলে এটি Learning হিসেবে চিহ্নিত হবে)'}</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-amber-300 font-medium">
                      💡 <span className="font-semibold text-amber-200">{isBn ? 'বাংলা অর্থ (হিন্ট):' : 'Bengali Meaning (Hint):'}</span> {currentQ.bengaliMeaning}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Learning চিহ্নিত
                    </span>
                  </div>
                )}
              </div>
            ) : (
              currentQ.bengaliMeaning && (
                <div className="pt-2 border-t border-[#1a2233] text-xs text-slate-300">
                  💡 <span className="font-semibold text-emerald-400">{isBn ? 'বাংলা অর্থ:' : 'Bengali Meaning:'}</span> {currentQ.bengaliMeaning}
                </div>
              )
            )}
          </div>

          {/* 4. Options List — shuffled randomly every question */}
          <div className="space-y-3">
            {shuffledOptions.map((opt, idx) => {
              const isOptionCorrect = idx === shuffledCorrectIndex;
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
                    <span className="font-medium">{opt.text}</span>
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
                  <span>{isBn ? 'পরবর্তী প্রশ্ন' : 'Next Question'}</span>
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
                  Correct: {String.fromCharCode(65 + shuffledCorrectIndex)} ({shuffledOptions[shuffledCorrectIndex]?.text})
                </span>
              </div>

              {/* Spaced repetition indicator note */}
              <div className="text-[11px] text-amber-300/90 font-medium bg-[#1a1726] p-2 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                <RefreshCw size={13} className="text-amber-400 shrink-0" />
                <span>
                  {isNotSureClicked || selectedOption !== shuffledCorrectIndex
                    ? (isBn ? '⚠️ ভুল হয়েছে / নিশ্চিত ছিলেন না। ৩-৪টি প্রশ্নের পর এই প্রশ্নটি পুনরায় আসবে।' : '⚠️ Marked as mistake. This question will reappear after 3-4 questions.')
                    : hintUsedForCurrentQ
                    ? (isBn ? '💡 হিন্ট ব্যবহার করেছিলেন। শব্দটি ভালোমতো মুখস্থ করতে ৩-৪টি প্রশ্নের পর আবার আসবে।' : '💡 Hint was used. Marked as Learning. Will reappear after 3-4 questions for re-test.')
                    : (currentStat.consecutiveCorrect + 1 >= 3
                        ? (isBn ? '🎉 দারুণ! ৩ বার সফলভাবে সম্পন্ন হয়েছে!' : '🎉 Awesome! Completed 3 consecutive times.')
                        : (isBn ? `👍 সঠিক উত্তর! আরও নিশ্চিত করতে ৩-৪টি প্রশ্নের পর আবার আসবে।` : `👍 Correct! Will reappear after 3-4 questions for re-test.`))}
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
        /* Final 100% Mastery Screen - ONLY shown when isAllDone is TRUE */
        <div className="text-center py-8 space-y-6 relative z-10 animate-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/60 border border-emerald-400/30">
            <Award size={44} />
          </div>

          <div>
            <h2 className="text-3xl font-black text-white">
              {isBn ? 'অভিনন্দন! সম্পূর্ণ ভোকাবুলারি ১০০% সম্পন্ন হয়েছে!' : 'Congratulations! 100% Words Mastered!'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {isBn
                ? 'আপনি প্রতিটি শব্দ ও প্রশ্নের উত্তর সফলভাবে ৩ বার সঠিকভাবে দিয়ে সম্পন্ন (Done) করেছেন।'
                : 'You have answered EVERY question correctly 3 times and marked all as Done!'}
            </p>
          </div>

          {/* Stats Summary Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-emerald-500/30 text-center">
              <span className="text-xs text-slate-400 block">Done (সম্পূর্ণ)</span>
              <span className="text-2xl font-black text-emerald-400">{doneCount} / {totalUnique}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-blue-500/30 text-center">
              <span className="text-xs text-slate-400 block">Total Unique</span>
              <span className="text-2xl font-black text-blue-400">{totalUnique}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0e131e] border border-amber-500/30 text-center">
              <span className="text-xs text-slate-400 block">Mastery Score</span>
              <span className="text-2xl font-black text-amber-400">100% ⭐</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-sm font-black inline-flex items-center gap-2 transition-all shadow-lg shadow-amber-500/30"
            >
              <Award size={18} />
              <span>{isBn ? 'সার্টিফিকেট ডাউনলোড করুন' : 'Download Certificate'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-[#192233] hover:bg-[#222e44] text-slate-300 text-sm font-bold inline-flex items-center gap-2 transition-all"
            >
              <RotateCcw size={16} />
              <span>{isBn ? 'পুনরায় প্র্যাকটিস শুরু করুন' : 'Practice Again'}</span>
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

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={studentInfo.name}
        collegeName={studentInfo.college}
        hscBatch={studentInfo.batch}
        totalMastered={totalUnique}
        lang={lang}
      />
    </div>
  );
}
