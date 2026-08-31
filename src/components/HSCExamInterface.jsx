import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Check,
  Save,
  X,
  Bookmark,
  Play,
  Pause,
  Clock,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import CertificateModal from './CertificateModal';
import { smartInterleaveQuestions, hscVocabularyList } from '../data/questions/hscQuestionsData';

export default function HSCExamInterface({
  questions = [],
  sessionKey = null,
  onFinishExam,
  onClose,
  lang = 'en',
  studentInfo = { name: 'Tanvir Ahmed', college: 'Notre Dame College, Dhaka', batch: 'HSC 2026' }
}) {
  const isBn = lang === 'bn';
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [weakWordToast, setWeakWordToast] = useState(null);

  // Compute a unique key for this exam session
  const activeSessionKey = sessionKey || (questions[0]?.unit ? `exam_${questions[0].unit.replace(/[^a-zA-Z0-9]/g, '_')}` : 'default_exam');

  // Check if there is saved progress for this session in localStorage
  const [savedSessionNotice, setSavedSessionNotice] = useState(() => {
    try {
      const raw = localStorage.getItem(`hsc_saved_practice_${activeSessionKey}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.activeQueue && parsed.activeQueue.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return null;
  });

  // Initialize unique question tracker dictionary
  // id -> { consecutiveCorrect: 0, status: 'learning' | 'mistake' | 'done', totalAttempts: 0 }
  const [questionStats, setQuestionStats] = useState(() => {
    const initialMap = {};
    if (Array.isArray(questions)) {
      questions.forEach((q) => {
        if (q && q.id) {
          initialMap[q.id] = {
            consecutiveCorrect: 0,
            status: 'learning',
            totalAttempts: 0,
            lastAnswerWasCorrect: null
          };
        }
      });
    }
    return initialMap;
  });

  // The active running queue of questions
  const [activeQueue, setActiveQueue] = useState(() => {
    if (!Array.isArray(questions) || questions.length === 0) return [];
    return smartInterleaveQuestions(questions);
  });
  const [queueIndex, setQueueIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isNotSureClicked, setIsNotSureClicked] = useState(false);

  // Live Timer State
  const [timerSeconds, setTimerSeconds] = useState(() => {
    return savedSessionNotice?.timerSeconds || 0;
  });
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer Tick Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && activeQueue.length > 0 && queueIndex < activeQueue.length) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, activeQueue.length, queueIndex]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Safely resolve current question
  const currentQ =
    (activeQueue && activeQueue[queueIndex]) ||
    (Array.isArray(questions) && questions.find((q) => q && (questionStats[q.id]?.consecutiveCorrect || 0) < 3)) ||
    (Array.isArray(questions) && questions[0]) ||
    null;

  const currentStat = currentQ && currentQ.id
    ? questionStats[currentQ.id] || { consecutiveCorrect: 0, status: 'learning' }
    : { consecutiveCorrect: 0, status: 'learning' };

  // Shuffled display: each element is { text: string, originalIndex: number }
  const [shuffledOptions, setShuffledOptions] = useState(() => {
    if (!currentQ || !Array.isArray(currentQ.options)) return [];
    return currentQ.options.map((text, i) => ({ text, originalIndex: i }));
  });
  const [shuffledCorrectIndex, setShuffledCorrectIndex] = useState(() => {
    return currentQ ? (currentQ.correctOption || 0) : 0;
  });

  // Hint: user can reveal Bengali meaning before answering (marks as Learning)
  const [hintRevealed, setHintRevealed] = useState(false);
  const [hintUsedForCurrentQ, setHintUsedForCurrentQ] = useState(false);

  // Re-synchronize when questions prop or sessionKey changes
  useEffect(() => {
    if (Array.isArray(questions) && questions.length > 0) {
      const initialMap = {};
      questions.forEach((q) => {
        if (q && q.id) {
          initialMap[q.id] = {
            consecutiveCorrect: 0,
            status: 'learning',
            totalAttempts: 0,
            lastAnswerWasCorrect: null
          };
        }
      });
      setQuestionStats(initialMap);
      setActiveQueue(smartInterleaveQuestions(questions));
      setQueueIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsNotSureClicked(false);
      setHintRevealed(false);
      setHintUsedForCurrentQ(false);
    }
  }, [sessionKey, questions]);

  // Calculate live counters across all unique questions
  const totalUnique = Array.isArray(questions) ? questions.length : 0;
  const doneCount = Object.values(questionStats).filter(
    (s) => s && s.status === 'done'
  ).length;
  const mistakeCount = Object.values(questionStats).filter(
    (s) => s && s.status === 'mistake'
  ).length;
  const learningCount = Math.max(0, totalUnique - doneCount - mistakeCount);

  // Exam completes when all unique items in this session are marked as Done!
  const isAllDone = totalUnique > 0 && doneCount >= totalUnique;

  useEffect(() => {
    if (isAllDone) {
      setIsTimerRunning(false);
      if (isSoundOn) soundManager.playComplete();
      confetti({
        particleCount: 180,
        spread: 110,
        origin: { y: 0.5 }
      });
      if (onFinishExam) {
        onFinishExam({
          totalQuestions: totalUnique,
          doneCount,
          mistakeCount,
          timeSpentSeconds: timerSeconds
        });
      }
    }
  }, [isAllDone, isSoundOn]);

  // Shuffle options on every question appearance
  useEffect(() => {
    if (!currentQ || !Array.isArray(currentQ.options) || currentQ.options.length === 0) return;
    const indexed = currentQ.options.map((text, i) => ({ text, originalIndex: i }));
    // Fisher-Yates shuffle
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    setShuffledOptions(indexed);
    const newCorrectPos = indexed.findIndex(
      (o) => o.originalIndex === (currentQ.correctOption ?? 0)
    );
    setShuffledCorrectIndex(newCorrectPos >= 0 ? newCorrectPos : 0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
    setHintRevealed(false);
    setHintUsedForCurrentQ(false);
  }, [queueIndex, currentQ?.id]);

  const handleRevealHint = () => {
    setHintRevealed(true);
    setHintUsedForCurrentQ(true);
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
    if (!currentQ) return;
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
        newStatus = 'learning';
      } else {
        newStatus = 'done';
      }
    } else {
      // Wrong option or Not Sure -> marked as mistake
      newStatus = 'mistake';
      newConsecutive = 0;
      // Append mistake question to the end of the queue for spaced reinforcement
      setActiveQueue((prev) => [...prev, currentQ]);
    }

    setQuestionStats((prev) => ({
      ...prev,
      [qId]: {
        consecutiveCorrect: newConsecutive,
        status: newStatus,
        totalAttempts: prevStat.totalAttempts + 1,
        lastAnswerWasCorrect: isCorrect
      }
    }));

    // -------------------------------------------------------------
    // AUTOMATIC WEAK WORD & MASTERY ENGINE:
    // 1. Same word mistake 3 times in MCQ -> Auto mark as Weak Word
    // 2. Same word answered correctly 5 times -> Auto remove from Weak Words
    // -------------------------------------------------------------
    if (currentQ.word) {
      const wordKey = currentQ.word.trim();
      try {
        const perfRaw = localStorage.getItem('hsc_word_performance');
        const perfMap = perfRaw ? JSON.parse(perfRaw) : {};
        const wordPerf = perfMap[wordKey] || {
          mistakeCount: 0,
          correctCount: 0,
          totalMistakes: 0,
          totalCorrect: 0,
          isWeak: false
        };

        const weakRaw = localStorage.getItem('hsc_weak_words');
        let currentWeakList = weakRaw ? JSON.parse(weakRaw) : [];
        if (!Array.isArray(currentWeakList)) currentWeakList = [];

        if (isCorrect) {
          wordPerf.correctCount = (wordPerf.correctCount || 0) + 1;
          wordPerf.totalCorrect = (wordPerf.totalCorrect || 0) + 1;

          // Rule: 5 Right Answers -> Automatically Remove from Weak Words!
          if (wordPerf.correctCount >= 5) {
            const wasWeak = wordPerf.isWeak || currentWeakList.some((w) => w && w.word?.toLowerCase() === wordKey.toLowerCase());
            wordPerf.isWeak = false;
            wordPerf.mistakeCount = 0;

            if (wasWeak) {
              const updatedWeak = currentWeakList.filter((w) => w && w.word?.toLowerCase() !== wordKey.toLowerCase());
              localStorage.setItem('hsc_weak_words', JSON.stringify(updatedWeak));
              window.dispatchEvent(new CustomEvent('hsc_weak_words_updated', { detail: { word: wordKey, action: 'removed' } }));

              setWeakWordToast({
                type: 'mastered',
                word: wordKey,
                message: isBn
                  ? `🎉 "${wordKey}" ৫ বার সঠিক উত্তর দেওয়ায় দুর্বল তালিকা থেকে সফলভাবে উত্তীর্ণ (Mastered) হয়েছে!`
                  : `🎉 "${wordKey}" answered correctly 5 times & recovered from Weak Words list!`
              });
              setTimeout(() => setWeakWordToast(null), 4500);
            }
          }
        } else {
          // Wrong Answer / Not Sure
          wordPerf.mistakeCount = (wordPerf.mistakeCount || 0) + 1;
          wordPerf.totalMistakes = (wordPerf.totalMistakes || 0) + 1;
          wordPerf.correctCount = 0;

          // Rule: 3 Mistakes -> Automatically Mark as Weak Word!
          if (wordPerf.mistakeCount >= 3) {
            const alreadyWeak = currentWeakList.some((w) => w && w.word?.toLowerCase() === wordKey.toLowerCase());
            wordPerf.isWeak = true;

            if (!alreadyWeak) {
              const vocabItem = hscVocabularyList.find((v) => v.word.toLowerCase() === wordKey.toLowerCase()) || {
                id: currentQ.vocabId || `word-${wordKey.toLowerCase()}`,
                word: wordKey,
                bengaliMeaning: currentQ.bengaliMeaning || 'অর্থ',
                synonyms: currentQ.synonyms || '',
                antonyms: currentQ.antonyms || '',
                englishMeaning: currentQ.englishMeaning || '',
                unit: currentQ.unit || 'HSC English',
                boardExamTag: currentQ.boardExamTag || 'HSC Board Standard'
              };

              const updatedWeak = [vocabItem, ...currentWeakList];
              localStorage.setItem('hsc_weak_words', JSON.stringify(updatedWeak));
              window.dispatchEvent(new CustomEvent('hsc_weak_words_updated', { detail: { word: wordKey, action: 'added' } }));

              setWeakWordToast({
                type: 'weak',
                word: wordKey,
                message: isBn
                  ? `⚠️ "${wordKey}" ৩ বার ভুল করায় স্বয়ংক্রিয়ভাবে দুর্বল শব্দ তালিকায় যোগ করা হয়েছে!`
                  : `⚠️ "${wordKey}" made 3 mistakes & automatically marked as Weak Word!`
              });
              setTimeout(() => setWeakWordToast(null), 4500);
            }
          }
        }

        perfMap[wordKey] = wordPerf;
        localStorage.setItem('hsc_word_performance', JSON.stringify(perfMap));
      } catch (err) {
        console.warn('Word performance tracking error:', err);
      }
    }
  };

  const handleNext = () => {
    const nextIdx = queueIndex + 1;
    // If we reach the end of the current queue but not all words are Done, re-queue the unfinished ones
    if (nextIdx >= activeQueue.length && doneCount < totalUnique) {
      const unfinishedQuestions = (Array.isArray(questions) ? questions : []).filter(
        (q) => q && q.id && questionStats[q.id]?.status !== 'done'
      );
      if (unfinishedQuestions.length > 0) {
        setActiveQueue((prev) => [...prev, ...smartInterleaveQuestions(unfinishedQuestions)]);
      }
    }
    setQueueIndex(nextIdx);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
    setHintRevealed(false);
    setHintUsedForCurrentQ(false);
  };

  const handleSaveAndExit = () => {
    try {
      const saveData = {
        questionStats,
        activeQueue,
        queueIndex,
        timerSeconds,
        timestamp: Date.now(),
        unit: currentQ?.unit || 'HSC English',
        doneCount,
        mistakeCount,
        learningCount,
        totalUnique
      };
      localStorage.setItem(`hsc_saved_practice_${activeSessionKey}`, JSON.stringify(saveData));
      localStorage.setItem('hsc_last_saved_session_key', activeSessionKey);
    } catch (e) {}
    setIsSaveModalOpen(false);
    if (onClose) onClose();
  };

  const handleDiscardAndExit = () => {
    try {
      localStorage.removeItem(`hsc_saved_practice_${activeSessionKey}`);
      if (localStorage.getItem('hsc_last_saved_session_key') === activeSessionKey) {
        localStorage.removeItem('hsc_last_saved_session_key');
      }
    } catch (e) {}
    setIsSaveModalOpen(false);
    if (onClose) onClose();
  };

  const handleResumeSavedSession = () => {
    if (savedSessionNotice) {
      if (savedSessionNotice.questionStats) setQuestionStats(savedSessionNotice.questionStats);
      if (savedSessionNotice.activeQueue) setActiveQueue(savedSessionNotice.activeQueue);
      if (typeof savedSessionNotice.queueIndex === 'number') setQueueIndex(savedSessionNotice.queueIndex);
      if (typeof savedSessionNotice.timerSeconds === 'number') setTimerSeconds(savedSessionNotice.timerSeconds);
      setSavedSessionNotice(null);
      setIsTimerRunning(true);
    }
  };

  const handleStartFreshSession = () => {
    try {
      localStorage.removeItem(`hsc_saved_practice_${activeSessionKey}`);
    } catch (e) {}
    setSavedSessionNotice(null);
    setTimerSeconds(0);
    setIsTimerRunning(true);
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
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsNotSureClicked(false);
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto w-full bg-[#0c0f17]/95 border border-[#1e293b] rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-5 text-slate-100 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/40">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {isBn ? 'পাঠ্যবইয়ের প্রশ্ন লোড করার অপেক্ষায়...' : 'Ready for Textbook Questions'}
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          {isBn
            ? 'পাঠ্যবইয়ের ইউনিট ও লেসন থেকে স্ট্যান্ডার্ড বোর্ড এমসিকিউ লোড করা হচ্ছে।'
            : 'Board-standard MCQs are ready to load directly from your HSC English textbook.'}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#111723] hover:bg-[#161e2e] border border-[#1e293b] text-slate-300 text-sm font-bold transition-all cursor-pointer shadow-md"
          >
            {isBn ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}
          </button>
        )}
      </div>
    );
  }

  // Progress percentage calculation based on words marked Done
  const progressPercent = totalUnique > 0
    ? Math.min(100, Math.round((doneCount / totalUnique) * 100))
    : 0;

  return (
    <div className="max-w-3xl mx-auto w-full bg-[#0c0f17]/95 border border-[#1e293b] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden text-slate-100 backdrop-blur-xl">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Saved Session Restore Banner */}
      {savedSessionNotice && (
        <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/40 text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg relative z-20 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
              <Save size={16} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-200">
                {isBn ? 'পূর্বের সংরক্ষিত প্রগ্রেস পাওয়া গেছে!' : 'Saved Exam Session Found!'}
              </h4>
              <p className="text-[11px] text-slate-300">
                {isBn 
                  ? `প্রশ্ন নম্বর: ${savedSessionNotice.queueIndex + 1}/${savedSessionNotice.totalUnique || totalUnique} • সম্পন্ন: ${savedSessionNotice.doneCount || 0}`
                  : `Question: ${savedSessionNotice.queueIndex + 1}/${savedSessionNotice.totalUnique || totalUnique} • Done: ${savedSessionNotice.doneCount || 0}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResumeSavedSession}
              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Play size={13} className="fill-current" />
              <span>{isBn ? 'চালিয়ে যান (Resume)' : 'Resume Practice'}</span>
            </button>
            <button
              onClick={handleStartFreshSession}
              className="px-2.5 py-1.5 rounded-xl bg-[#111723] hover:bg-[#161e2e] border border-[#1e293b] text-slate-400 hover:text-white text-xs font-semibold cursor-pointer transition-all"
            >
              {isBn ? 'নতুন শুরু' : 'Start Fresh'}
            </button>
          </div>
        </div>
      )}

      {!isAllDone && currentQ ? (
        <div className="space-y-4 sm:space-y-6 relative z-10">
          {/* 1. Top Status Bar: Learning | Mistake | Done + Timer + Controls */}
          <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-[#1e293b]">
            <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm font-bold">
              {/* Learning counter */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 shadow-sm">
                <span className="text-slate-400 font-normal text-[11px] sm:text-xs">Learning</span>
                <span className="text-sm sm:text-base font-black text-blue-400">{learningCount}</span>
              </div>

              {/* Mistake counter */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 shadow-sm">
                <span className="text-slate-400 font-normal text-[11px] sm:text-xs">Mistake</span>
                <span className="text-sm sm:text-base font-black text-rose-400">{mistakeCount}</span>
              </div>

              {/* Done counter */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 shadow-sm">
                <span className="text-slate-400 font-normal text-[11px] sm:text-xs">Done</span>
                <span className="text-sm sm:text-base font-black text-emerald-400">{doneCount}</span>
              </div>
            </div>

            {/* Right Controls: Live Timer, Save & Exit, Sound, Close */}
            <div className="flex items-center gap-2">
              {/* Live Timer Widget with Pause/Resume & Warning state */}
              <div
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                title={isTimerRunning ? 'Click to Pause Timer' : 'Click to Resume Timer'}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-sm select-none ${
                  !isTimerRunning
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : timerSeconds > 600
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 animate-pulse'
                    : 'bg-[#111723] border-[#1e293b] text-slate-300 hover:border-emerald-500/40'
                }`}
              >
                <Clock size={13} className={isTimerRunning ? 'text-emerald-400' : 'text-amber-400'} />
                <span>{formatTimer(timerSeconds)}</span>
                {isTimerRunning ? (
                  <Pause size={10} className="text-slate-400 ml-0.5" />
                ) : (
                  <Play size={10} className="text-amber-400 ml-0.5 fill-current" />
                )}
              </div>

              {/* Save & Exit button */}
              <button
                onClick={() => setIsSaveModalOpen(true)}
                title={isBn ? 'প্রগ্রেস সংরক্ষণ করে পরবর্তীতে আবার শুরু করুন' : 'Save progress and continue later'}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Save size={14} />
                <span className="hidden sm:inline">{isBn ? 'সেভ ও প্রস্থান' : 'Save & Exit'}</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => setIsSoundOn(!isSoundOn)}
                title={isSoundOn ? 'Mute sound effects' : 'Enable sound effects'}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                  isSoundOn
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/35'
                    : 'bg-[#111723] text-slate-500 border-[#1e293b]'
                }`}
              >
                {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              {/* Exit X button */}
              {onClose && (
                <button
                  onClick={() => {
                    if (doneCount > 0 || mistakeCount > 0 || learningCount > 0 || queueIndex > 0) {
                      setIsSaveModalOpen(true);
                    } else {
                      onClose();
                    }
                  }}
                  title={isBn ? 'বন্ধ করুন' : 'Close Exam'}
                  className="p-1.5 rounded-xl bg-[#111723] hover:bg-rose-950/40 border border-[#1e293b] hover:border-rose-700 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Weak Word / Mastery Alert Toast Banner */}
          {weakWordToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between gap-3 shadow-xl ${
                weakWordToast.type === 'weak'
                  ? 'bg-rose-950/90 border-rose-500/60 text-rose-200 shadow-rose-950/50 ring-1 ring-rose-500/30'
                  : 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-950/50 ring-1 ring-emerald-500/30'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg">{weakWordToast.type === 'weak' ? '⚠️' : '🎉'}</span>
                <span className="leading-snug">{weakWordToast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setWeakWordToast(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X size={15} />
              </button>
            </motion.div>
          )}

          {/* Step Progress Breadcrumb & Question Dots */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium flex items-center gap-1.5">
                <span className="text-white font-bold">{isBn ? `প্রশ্ন ${queueIndex + 1}` : `Question ${queueIndex + 1}`}</span>
                <span>/ {activeQueue.length}</span>
                {totalUnique > 0 && (
                  <span className="text-slate-500 text-[11px]">({totalUnique} unique words)</span>
                )}
              </span>
              <span className="text-emerald-400 font-bold font-mono">{progressPercent}%</span>
            </div>

            {/* Gradient Progress Bar */}
            <div className="w-full h-2 bg-[#111723] border border-[#1e293b] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-300 shadow-sm"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>

            {/* Interactive Question Progress Dots Preview */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none opacity-85">
              {activeQueue.slice(Math.max(0, queueIndex - 5), queueIndex + 9).map((q, idx) => {
                const actualIdx = Math.max(0, queueIndex - 5) + idx;
                const isCurrent = actualIdx === queueIndex;
                const stat = q?.id ? questionStats[q.id] : null;
                const isItemDone = stat?.status === 'done';
                const isItemMistake = stat?.status === 'mistake';
                const isItemLearning = stat?.status === 'learning';

                let dotClass = 'bg-slate-700/60 border-slate-600/40 text-slate-400';
                if (isCurrent) {
                  dotClass = 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-400/40 scale-110';
                } else if (actualIdx < queueIndex) {
                  if (isItemDone) dotClass = 'bg-emerald-600/80 border-emerald-500 text-emerald-200';
                  else if (isItemMistake) dotClass = 'bg-rose-600/80 border-rose-500 text-rose-200';
                  else if (isItemLearning) dotClass = 'bg-blue-600/80 border-blue-500 text-blue-200';
                }

                return (
                  <span
                    key={actualIdx}
                    className={`w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center border transition-all shrink-0 ${dotClass}`}
                    title={`Q${actualIdx + 1}: ${q?.word || ''}`}
                  >
                    {actualIdx + 1}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Animated Question Transition Shell with Framer Motion */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${currentQ.id || 'q'}-${queueIndex}`}
              initial={{ opacity: 0, x: 20, filter: 'blur(3px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(3px)' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Question Header: Category Badge + Unit Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {currentQ.categoryLabel && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                      <span>{currentQ.categoryIcon || '🎯'}</span>
                      <span>{currentQ.categoryLabel}</span>
                    </span>
                  )}
                  {currentStat.consecutiveCorrect > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Flame size={12} className="text-amber-400 fill-amber-400" />
                      <span>{currentStat.consecutiveCorrect}/3 {isBn ? 'বার সঠিক' : 'Streak'}</span>
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-[#111723] text-cyan-300 border border-[#1e293b]">
                  {currentQ.unit || 'HSC English Textbook'}
                </span>
              </div>

              {/* Question Prompt Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#111723]/90 border border-[#1e293b] shadow-xl space-y-3.5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                      {currentQ.word}
                    </h3>
                    {currentQ.partsOfSpeech && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#161e2e] text-slate-300 border border-[#243048]">
                        {currentQ.partsOfSpeech}
                      </span>
                    )}
                  </div>

                  {/* Pronunciation Audio Button */}
                  <button
                    onClick={() => handleSpeak(currentQ.word)}
                    title="Listen Pronunciation"
                    className="p-2.5 rounded-xl bg-[#161e2e] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-[#1e293b] transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                  {currentQ.questionText || `Choose the correct meaning/synonym of "${currentQ.word}":`}
                </p>

                {/* Bengali Meaning / Hint Area */}
                {!isAnswered ? (
                  <div className="pt-2 border-t border-[#1e293b]">
                    {!hintRevealed ? (
                      <button
                        onClick={handleRevealHint}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>💡 {currentQ.category === 'bangla_meaning' ? 'হিন্ট দেখুন (হিন্ট নিলে এটি Learning হিসেবে চিহ্নিত হবে)' : 'বাংলা অর্থ দেখুন (হিন্ট নিলে এটি Learning হিসেবে চিহ্নিত হবে)'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between text-xs pt-1 flex-wrap gap-2">
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
                    <div className="pt-2 border-t border-[#1e293b] text-xs text-slate-300">
                      💡 <span className="font-semibold text-emerald-400">{isBn ? 'বাংলা অর্থ:' : 'Bengali Meaning:'}</span> {currentQ.bengaliMeaning}
                    </div>
                  )
                )}
              </div>

              {/* 4. Options List with Emerald Pulse & Rose Shake Animations */}
              <div className="space-y-3">
                {(shuffledOptions && shuffledOptions.length > 0
                  ? shuffledOptions
                  : (currentQ?.options || []).map((text, i) => ({ text, originalIndex: i }))
                ).map((opt, idx) => {
                  const isOptionCorrect = idx === shuffledCorrectIndex;
                  const isOptionSelected = idx === selectedOption;

                  let optionClasses =
                    'bg-[#111723] border-[#1e293b] text-slate-200 hover:bg-[#161e2e] hover:border-slate-600';
                  let motionProps = {};

                  if (isAnswered) {
                    if (isOptionCorrect) {
                      optionClasses =
                        'bg-emerald-950/90 border-emerald-500 text-emerald-100 font-bold shadow-[0_0_25px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/60';
                      motionProps = {
                        animate: { scale: [1, 1.025, 1] },
                        transition: { duration: 0.35 }
                      };
                    } else if (isOptionSelected) {
                      optionClasses =
                        'bg-rose-950/90 border-rose-500 text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.35)] ring-2 ring-rose-500/60 font-semibold';
                      motionProps = {
                        animate: { x: [0, -8, 8, -6, 6, -3, 3, 0] },
                        transition: { duration: 0.45 }
                      };
                    } else {
                      optionClasses =
                        'bg-[#090d15] border-[#182030] text-slate-500 opacity-40';
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      whileHover={!isAnswered ? { scale: 1.01, backgroundColor: '#161e2e' } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      {...motionProps}
                      className={`w-full p-4 rounded-2xl border text-sm sm:text-base transition-all duration-200 flex items-center justify-between text-left group cursor-pointer ${optionClasses}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isAnswered && isOptionCorrect
                              ? 'bg-emerald-500 text-white'
                              : isAnswered && isOptionSelected
                              ? 'bg-rose-500 text-white'
                              : 'bg-[#161e2e] text-slate-400 group-hover:text-white border border-[#243048]'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-medium leading-snug">{opt.text}</span>
                      </div>

                      {isAnswered && isOptionCorrect && (
                        <CheckCircle2 size={20} className="text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && isOptionSelected && !isOptionCorrect && (
                        <XCircle size={20} className="text-rose-400 shrink-0 ml-2" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom Action Area: "Not sure" / "Next Question" */}
              <div className="flex items-center justify-between pt-2 gap-3">
                <div className="text-xs text-slate-400 hidden sm:block">
                  {currentQ.boardExamTag && (
                    <span className="bg-[#111723] px-3 py-1.5 rounded-xl border border-[#1e293b] text-slate-300">
                      📌 {currentQ.boardExamTag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  {!isAnswered ? (
                    <button
                      onClick={handleNotSure}
                      className="px-5 py-3 rounded-2xl bg-[#111723] hover:bg-[#161e2e] border-2 border-slate-700 hover:border-amber-500/60 text-slate-300 hover:text-amber-300 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      <HelpCircle size={17} className="text-amber-400" />
                      <span>{isBn ? 'Not sure (নিশ্চিত নই)' : 'Not sure'}</span>
                    </button>
                  ) : (
                    <motion.button
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer active:scale-95"
                    >
                      <span>{isBn ? 'পরবর্তী প্রশ্ন' : 'Next Question'}</span>
                      <ArrowRight size={17} />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Context Explanation Box */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#111723] border border-emerald-500/30 text-xs sm:text-sm text-slate-300 space-y-2.5 shadow-xl"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                      <Sparkles size={16} />
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
                  <div className="text-[11px] text-amber-300/90 font-medium bg-[#161524] p-2.5 rounded-xl border border-amber-500/25 flex items-center gap-2">
                    <RefreshCw size={14} className="text-amber-400 shrink-0" />
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
                    <div className="p-3 bg-[#161e2e] rounded-xl border border-[#1e293b] italic text-slate-300">
                      "{currentQ.exampleSentence}"
                    </div>
                  )}

                  {(currentQ.synonyms || currentQ.antonyms) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                      {currentQ.synonyms && (
                        <div className="text-slate-300 bg-[#161e2e]/60 p-2.5 rounded-xl border border-[#1e293b]">
                          <span className="font-bold text-emerald-400">Synonyms: </span>
                          {currentQ.synonyms}
                        </div>
                      )}
                      {currentQ.antonyms && (
                        <div className="text-slate-300 bg-[#161e2e]/60 p-2.5 rounded-xl border border-[#1e293b]">
                          <span className="font-bold text-rose-400">Antonyms: </span>
                          {currentQ.antonyms}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Final 100% Mastery Screen - ONLY shown when isAllDone is TRUE */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 sm:py-10 space-y-6 relative z-10"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-white mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/60 border border-emerald-400/40">
            <Award size={44} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'অভিনন্দন! সম্পূর্ণ ভোকাবুলারি ১০০% সম্পন্ন হয়েছে!' : 'Congratulations! 100% Words Mastered!'}
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              {isBn
                ? 'আপনি প্রতিটি শব্দ ও প্রশ্নের উত্তর সফলভাবে ৩ বার সঠিকভাবে দিয়ে সম্পন্ন (Done) করেছেন।'
                : 'You have answered every question correctly 3 consecutive times and completed the entire lesson!'}
            </p>
          </div>

          {/* Stats Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#111723] border border-emerald-500/30 text-center">
              <span className="text-xs text-slate-400 block mb-1">Mastered</span>
              <span className="text-2xl font-black text-emerald-400">{doneCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111723] border border-blue-500/30 text-center">
              <span className="text-xs text-slate-400 block mb-1">Total Unique</span>
              <span className="text-2xl font-black text-blue-400">{totalUnique}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111723] border border-amber-500/30 text-center">
              <span className="text-xs text-slate-400 block mb-1">Time Spent</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{formatTimer(timerSeconds)}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#111723] border border-purple-500/30 text-center">
              <span className="text-xs text-slate-400 block mb-1">Mastery Score</span>
              <span className="text-2xl font-black text-purple-400">100% ⭐</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-sm font-black inline-flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95"
            >
              <RotateCcw size={16} />
              <span>{isBn ? 'পুনরায় পরীক্ষা দিন' : 'Practice Again'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-950/50 cursor-pointer active:scale-95"
              >
                {isBn ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Save & Exit Confirmation Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-slate-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
              <Save size={28} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isBn ? 'প্রগ্রেস সংরক্ষণ করে বের হবেন?' : 'Save Practice Progress & Exit?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBn 
                  ? 'আপনার বর্তমান অগ্রগতি ও টাইমার সংরক্ষণ করা হবে। পরবর্তীতে পুনরায় প্রবেশ করলে আপনি ঠিক এই প্রশ্ন ও স্কোর থেকেই প্র্যাকটিস চালিয়ে যেতে পারবেন।'
                  : 'Your progress and live timer will be saved. When you return, you can resume right from this exact question.'}
              </p>
            </div>

            {/* Live stats summary preview */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#0c0f17] border border-[#1e293b] rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">{isBn ? 'প্রশ্ন নম্বর' : 'Question'}</span>
                <span className="font-bold text-white text-sm">{queueIndex + 1}/{activeQueue.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Done</span>
                <span className="font-bold text-emerald-400 text-sm">{doneCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Mistake</span>
                <span className="font-bold text-rose-400 text-sm">{mistakeCount}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {/* Save & Exit Button */}
              <button
                onClick={handleSaveAndExit}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer active:scale-95"
              >
                <Save size={16} />
                <span>{isBn ? '💾 সংরক্ষণ করে প্রস্থান (Save & Exit)' : '💾 Save Progress & Exit'}</span>
              </button>

              {/* Continue Practice */}
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#161e2e] hover:bg-[#1f2a3f] text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#1e293b]"
              >
                <span>{isBn ? '↩️ অনুশীলন চালিয়ে যান (Continue)' : '↩️ Continue Practicing'}</span>
              </button>

              {/* Discard & Exit */}
              <button
                onClick={handleDiscardAndExit}
                className="w-full py-1.5 text-rose-400 hover:text-rose-300 text-xs font-medium underline underline-offset-2 transition-colors cursor-pointer"
              >
                {isBn ? 'সংরক্ষণ ছাড়াই মুছে প্রস্থান' : 'Discard & Exit Without Saving'}
              </button>
            </div>
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
