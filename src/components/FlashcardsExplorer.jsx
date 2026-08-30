import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Layers,
  ArrowRight,
  Award,
  Trophy,
  Star,
  Zap,
  Flame,
  Check,
  RefreshCw,
  X,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { hscVocabularyList } from '../data/questions/hscQuestionsData';
import { hscUnits } from '../data/hscUnitsData';

export default function FlashcardsExplorer({ 
  lang = 'en', 
  weakWords = [], 
  onToggleWeakWord, 
  onStartExamFromCards 
}) {
  const isBn = lang === 'bn';

  // Load saved flashcards session progress if available
  const savedFC = (() => {
    try {
      const raw = localStorage.getItem('hsc_flashcards_progress');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  })();

  const [selectedLessonId, setSelectedLessonId] = useState(savedFC?.selectedLessonId || 'u1-l1');
  const [currentIndex, setCurrentIndex] = useState(savedFC?.currentIndex || 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [cardsList, setCardsList] = useState(hscVocabularyList);
  const [masteredWords, setMasteredWords] = useState(savedFC?.masteredWords || []);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  // Touch gesture state
  const touchState = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    isSwiping: false
  });

  // Filter or shuffle cards based on selected lesson
  useEffect(() => {
    let list = [...hscVocabularyList];
    if (selectedLessonId === 'weak_only') {
      if (weakWords.length > 0) {
        list = hscVocabularyList.filter((item) =>
          weakWords.some((w) => w && (w.id === item.id || w.word?.toLowerCase() === item.word?.toLowerCase()))
        );
      } else {
        list = [];
      }
    } else if (selectedLessonId === 'u1-l1') {
      list = hscVocabularyList.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
    } else if (selectedLessonId === 'u10-l1') {
      list = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
    } else if (selectedLessonId === 'u10-l2') {
      list = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));
    }
    if (isShuffled) {
      list = [...list].sort(() => Math.random() - 0.5);
    }
    setCardsList(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedLessonId, isShuffled, weakWords]);

  // Persist flashcards progress on change
  useEffect(() => {
    try {
      localStorage.setItem('hsc_flashcards_progress', JSON.stringify({
        currentIndex,
        masteredWords,
        selectedLessonId
      }));
    } catch (e) {}
  }, [currentIndex, masteredWords, selectedLessonId]);

  const currentCard = cardsList[currentIndex] || cardsList[0] || {};
  const isWeak = currentCard ? weakWords.some(w => w.id === currentCard.id || w.word === currentCard.word) : false;
  const isMastered = currentCard ? masteredWords.includes(currentCard.id) : false;

  // Text-To-Speech Pronunciation with visual state
  const handleSpeak = (e, text) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'en-US';
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (cardsList.length > 0) {
        if (currentIndex === cardsList.length - 1) {
          // Reached the end of the lesson! Trigger completion celebration
          triggerCompletionCelebration();
        } else {
          setCurrentIndex((prev) => (prev + 1) % cardsList.length);
        }
      }
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (cardsList.length > 0) {
        setCurrentIndex((prev) => (prev - 1 + cardsList.length) % cardsList.length);
      }
    }, 150);
  };

  const triggerCompletionCelebration = () => {
    setIsCompletionModalOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.2, y: 0.5 }
      });
    }, 250);
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.8, y: 0.5 }
      });
    }, 400);
  };

  const handleMarkMastered = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard || !currentCard.id) return;
    if (!masteredWords.includes(currentCard.id)) {
      setMasteredWords([...masteredWords, currentCard.id]);
    }
    // If was marked weak, toggle it off
    if (isWeak && onToggleWeakWord) {
      onToggleWeakWord(currentCard);
    }
    handleNext();
  };

  const handleMarkWeak = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard || !currentCard.id) return;
    if (onToggleWeakWord) {
      onToggleWeakWord(currentCard);
    }
    setMasteredWords(masteredWords.filter(id => id !== currentCard.id));
    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'm' || e.key === 'M') {
        handleMarkMastered();
      } else if (e.key === 'w' || e.key === 'W') {
        handleMarkWeak();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardsList.length, currentIndex, currentCard, masteredWords, isWeak]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isSwiping: true
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchState.current.isSwiping) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;
    const deltaTime = Date.now() - touchState.current.startTime;
    touchState.current.isSwiping = false;

    // Minimum swipe thresholds
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3 && deltaTime < 600) {
      if (deltaX < 0) {
        // Swiped Left -> Next Card
        handleNext();
      } else {
        // Swiped Right -> Previous Card
        handlePrev();
      }
    } else if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX) * 1.3 && deltaTime < 600) {
      // Swiped Up / Down -> Flip
      setIsFlipped(prev => !prev);
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      // Clean tap -> Flip
      setIsFlipped(prev => !prev);
    }
  };

  // Mastery percentage calculation
  const totalCards = cardsList.length || 1;
  const currentProgressPercent = Math.min(100, Math.round(((currentIndex + 1) / totalCards) * 100));
  const masteredInLesson = cardsList.filter(c => masteredWords.includes(c.id)).length;
  const masteryRatio = Math.min(100, Math.round((masteredInLesson / totalCards) * 100));

  // Determine Milestone Level Badge
  const milestone = useMemo(() => {
    if (masteryRatio >= 80) return { label: isBn ? 'মাস্টার (Mastered)' : 'Mastered', badge: '👑', color: 'from-amber-400 to-yellow-500', tier: 3 };
    if (masteryRatio >= 40) return { label: isBn ? 'পরিচিত (Familiar)' : 'Familiar', badge: '⚡', color: 'from-cyan-400 to-blue-500', tier: 2 };
    return { label: isBn ? 'নতুন শিক্ষার্থী (Beginner)' : 'Beginner', badge: '🌟', color: 'from-emerald-400 to-teal-500', tier: 1 };
  }, [masteryRatio, isBn]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* 1. Top Header & Glassmorphic Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111723]/90 border border-[#1e293b] p-4 sm:p-5 rounded-3xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-950/50 border border-amber-400/30">
            <Layers size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide flex items-center gap-2">
              <span>{isBn ? '৩ডি ফ্ল্যাশকার্ড এক্সপ্লোরার' : '3D Interactive Flashcards'}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                <Sparkles size={11} /> 3D Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {isBn ? 'স্পেসড-রিপিটিশন সক্রিয় রিভিশন ও উচ্চারণ সহ' : 'Active Recall & Spaced Repetition Flashcard Engine'}
            </p>
          </div>
        </div>

        {/* Lesson Selector & Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="bg-[#161e2e] border border-[#1e293b] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-500 cursor-pointer font-medium shadow-inner hover:border-slate-600 transition-colors"
          >
            <option value="all">All Words (156 Words)</option>
            <option value="u1-l1">Unit 1: The Parrot's Tale (46 Words)</option>
            <option value="u10-l1">Unit 10: Manners Around the World (74 Words)</option>
            <option value="u10-l2">Unit 10: Etiquette Netquette (36 Words)</option>
            {weakWords.length > 0 && (
              <option value="weak_only">⚠️ Weak Words Queue ({weakWords.length} Words)</option>
            )}
          </select>

          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
              isShuffled
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-amber-950/30'
                : 'bg-[#161e2e] border-[#1e293b] text-slate-400 hover:text-white hover:border-slate-600'
            }`}
            title="Shuffle Flashcards"
          >
            <Shuffle size={15} />
            <span className="hidden sm:inline">{isBn ? 'শাফল' : 'Shuffle'}</span>
          </button>
        </div>
      </div>

      {/* 2. Enhanced Mastery Progress Bar with Milestone Badges */}
      <div className="bg-[#111723]/90 border border-[#1e293b] p-4 rounded-2xl space-y-2.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">
              {isBn ? 'কার্ড নম্বর:' : 'Card:'} <strong className="text-white font-bold text-sm">{cardsList.length > 0 ? currentIndex + 1 : 0}</strong> / {cardsList.length}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-[#161e2e] border border-[#1e293b] text-[11px] font-semibold text-cyan-300">
              {milestone.badge} {milestone.label}
            </span>
          </div>

          <div className="flex items-center gap-3 font-semibold">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={13} /> {masteredInLesson} {isBn ? 'আয়ত্ত' : 'Mastered'}
            </span>
            <span className="text-rose-400 flex items-center gap-1">
              <AlertCircle size={13} /> {weakWords.length} {isBn ? 'দুর্বল' : 'Weak'}
            </span>
            <span className="text-amber-400 font-bold font-mono">
              {masteryRatio}%
            </span>
          </div>
        </div>

        {/* Glowing Gradient Progress Bar */}
        <div className="w-full h-2.5 bg-[#0c0f17] border border-[#1e293b] rounded-full overflow-hidden p-0.5 relative">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
            style={{ width: `${Math.max(3, currentProgressPercent)}%` }}
          />
        </div>

        {/* Milestone Indicator Badges */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span className={`flex items-center gap-1 ${masteryRatio >= 0 ? 'text-emerald-400 font-semibold' : ''}`}>
            🌟 Beginner (0%)
          </span>
          <span className={`flex items-center gap-1 ${masteryRatio >= 40 ? 'text-cyan-300 font-semibold' : 'text-slate-500'}`}>
            ⚡ Familiar (40%)
          </span>
          <span className={`flex items-center gap-1 ${masteryRatio >= 80 ? 'text-amber-300 font-semibold' : 'text-slate-500'}`}>
            👑 Mastered (80%+)
          </span>
        </div>
      </div>

      {/* Empty State */}
      {cardsList.length === 0 ? (
        <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-10 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isBn ? 'এই ফিল্টারে কোনো কার্ড পাওয়া যায়নি' : 'No Cards Found in This Filter'}
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            {selectedLessonId === 'weak_only'
              ? (isBn ? 'আপনার কোনো দুর্বল শব্দ সংরক্ষিত নেই! আপনি সব শব্দ আয়ত্ত করেছেন।' : 'No weak words flagged! You have mastered all words.')
              : (isBn ? 'অন্য ইউনিট বা লেসন সিলেক্ট করুন।' : 'Please select another unit or lesson.')}
          </p>
          <button
            onClick={() => setSelectedLessonId('all')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
          >
            {isBn ? 'সকল শব্দ দেখুন' : 'Show All Words'}
          </button>
        </div>
      ) : (
        /* 3. True 3D Dual-Sided Flip Interactive Card Container */
        <div 
          className="w-full [perspective:1200px] min-h-[400px] sm:min-h-[440px] select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            onClick={() => setIsFlipped(prev => !prev)}
            className={`w-full min-h-[400px] sm:min-h-[440px] relative transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer ${
              isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
            }`}
          >
            {/* ==================== FRONT OF CARD ==================== */}
            <div 
              className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)] rounded-3xl bg-gradient-to-b from-[#111723] via-[#0e1420] to-[#0c0f17] border border-[#1e293b] hover:border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all"
            >
              {/* Card Header Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25 shadow-sm">
                  {currentCard.unit || "Unit 1: The Parrot's Tale"}
                </span>

                <div className="flex items-center gap-2">
                  {currentCard.partsOfSpeech && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#161e2e] border border-[#243048] text-slate-300">
                      {currentCard.partsOfSpeech}
                    </span>
                  )}
                  {/* Front Audio Button */}
                  <button
                    onClick={(e) => handleSpeak(e, currentCard.word)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                      isSpeaking
                        ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-400/50 animate-pulse'
                        : 'bg-[#161e2e] hover:bg-emerald-500/20 text-emerald-400 border-[#1e293b]'
                    }`}
                    title="Audio Pronunciation"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>

              {/* Center Main Word */}
              <div className="text-center my-auto py-8">
                <motion.h1 
                  key={currentCard.word}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-3 drop-shadow-md"
                >
                  {currentCard.word}
                </motion.h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-center gap-1.5">
                  <span>{isBn ? 'অর্থ ও বিস্তারিত দেখতে কার্ডে ট্যাপ করুন' : 'Tap card or press Space to flip & reveal meaning'}</span>
                  <span className="text-emerald-400">👆</span>
                </p>
              </div>

              {/* Card Footer Status Badges & Flip Hint */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1e293b] text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <RotateCw size={13} className="text-emerald-400" />
                  <span className="hidden sm:inline">{isBn ? 'স্পেসবার বা ট্যাপ করে উল্টান' : 'Space / Tap / Swipe to flip'}</span>
                  <span className="sm:hidden">{isBn ? 'ট্যাপ করে উল্টান' : 'Tap / Swipe to flip'}</span>
                </span>

                <div className="flex items-center gap-2">
                  {isWeak && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold shadow-sm">
                      {isBn ? 'দুর্বল শব্দ' : 'Weak Word'}
                    </span>
                  )}
                  {isMastered && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold shadow-sm">
                      {isBn ? 'আয়ত্ত' : 'Mastered'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ==================== BACK OF CARD ==================== */}
            <div 
              className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-gradient-to-b from-[#131926] via-[#0e1420] to-[#0c0f17] border border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-emerald-950/40 overflow-y-auto"
            >
              {/* Back Header */}
              <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-emerald-400">
                    {currentCard.word}
                  </h3>
                  {currentCard.partsOfSpeech && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#161e2e] text-slate-300 border border-[#243048]">
                      {currentCard.partsOfSpeech}
                    </span>
                  )}
                </div>
                {/* Back Audio Button */}
                <button
                  onClick={(e) => handleSpeak(e, `${currentCard.word}. ${currentCard.englishMeaning || ''}. ${currentCard.bengaliMeaning || ''}`)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm ${
                    isSpeaking
                      ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-400/50 animate-pulse'
                      : 'bg-[#161e2e] hover:bg-emerald-500/20 text-emerald-400 border-[#1e293b]'
                  }`}
                  title="Listen Full Explanation"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              {/* Meaning, Synonyms, Antonyms Grid */}
              <div className="space-y-3 text-xs sm:text-sm my-auto py-2">
                {/* Bengali Meaning */}
                <div className="bg-[#0c0f17]/90 border border-emerald-500/30 p-3.5 rounded-2xl shadow-inner">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-0.5">
                    🇧🇩 {isBn ? 'বাংলা অর্থ (Bengali Meaning):' : 'Bangla Meaning:'}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-white font-bengali">
                    {currentCard.bengaliMeaning}
                  </p>
                </div>

                {/* English Meaning */}
                {currentCard.englishMeaning && (
                  <div className="bg-[#0c0f17]/90 border border-[#1e293b] p-3 rounded-2xl shadow-inner">
                    <span className="text-[11px] font-bold text-blue-400 block mb-0.5">
                      📖 {isBn ? 'ইংরেজি সংজ্ঞা (English Meaning):' : 'English Definition:'}
                    </span>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {currentCard.englishMeaning}
                    </p>
                  </div>
                )}

                {/* Synonyms & Antonyms Two Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentCard.synonyms && (
                    <div className="bg-[#0c0f17]/90 border border-[#1e293b] p-3 rounded-2xl shadow-inner">
                      <span className="text-[11px] font-bold text-emerald-300 block mb-0.5">
                        🔄 {isBn ? 'সমার্থক শব্দ (Synonyms):' : 'Synonyms:'}
                      </span>
                      <p className="text-slate-300 font-medium leading-snug">
                        {currentCard.synonyms}
                      </p>
                    </div>
                  )}

                  {currentCard.antonyms && (
                    <div className="bg-[#0c0f17]/90 border border-[#1e293b] p-3 rounded-2xl shadow-inner">
                      <span className="text-[11px] font-bold text-rose-400 block mb-0.5">
                        ⚡ {isBn ? 'বিপরীত শব্দ (Antonyms):' : 'Antonyms:'}
                      </span>
                      <p className="text-slate-300 font-medium leading-snug">
                        {currentCard.antonyms}
                      </p>
                    </div>
                  )}
                </div>

                {/* Example sentence from textbook */}
                {currentCard.exampleSentence && (
                  <div className="bg-[#161e2e]/90 border border-[#1e293b] p-3 rounded-2xl text-slate-300 italic text-xs">
                    <strong className="text-amber-400 not-italic font-bold">Textbook Context: </strong>
                    "{currentCard.exampleSentence}"
                  </div>
                )}
              </div>

              {/* Back Footer */}
              <div className="pt-2 text-center text-slate-500 text-[11px] border-t border-[#1e293b]">
                {isBn ? 'পুনরায় কার্ড উল্টাতে ট্যাপ করুন' : 'Tap anywhere to flip back to front'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Action Buttons: Prev, Weak, Mastered, Next */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-[#111723] hover:bg-[#161e2e] text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-[#1e293b] transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft size={16} />
            <span>{isBn ? 'পূর্ববর্তী' : 'Previous'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-[#111723] hover:bg-[#161e2e] text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-[#1e293b] transition-all cursor-pointer shadow-md active:scale-95"
          >
            <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Quality Rating Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Mark as Weak Word button */}
          <button
            onClick={handleMarkWeak}
            className={`flex-1 sm:flex-initial px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer shadow-md active:scale-95 ${
              isWeak
                ? 'bg-rose-600 border-rose-400 text-white shadow-rose-950/50'
                : 'bg-rose-950/40 hover:bg-rose-900/60 border-rose-800/60 text-rose-300'
            }`}
          >
            <AlertCircle size={15} />
            <span>{isWeak ? (isBn ? 'দুর্বল শব্দে সংরক্ষিত' : 'Marked Weak') : (isBn ? 'দুর্বল শব্দে যোগ করুন' : 'Mark as Weak Word')}</span>
          </button>

          {/* Mark Mastered button */}
          <button
            onClick={handleMarkMastered}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer active:scale-95"
          >
            <CheckCircle2 size={15} />
            <span>{isBn ? 'আয়ত্ত হয়েছে (Mastered)' : 'Mastered & Next'}</span>
          </button>
        </div>
      </div>

      {/* 5. Completion Celebration Modal */}
      {isCompletionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111723] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-slate-100 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/30 border border-yellow-300">
              <Trophy size={34} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isBn ? 'অভিনন্দন! লেসন রিভিশন সম্পন্ন!' : 'Lesson Revision Complete!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBn 
                  ? `আপনি "${selectedLessonId}" এর সমস্ত ফ্ল্যাশকার্ড সফলভাবে শেষ করেছেন। এখন বোর্ড স্ট্যান্ডার্ড এমসিকিউ দিয়ে নিজেকে যাচাই করুন!`
                  : `You have completed all flashcards in this set. Ready to test your mastery in the Board MCQ Exam?`}
              </p>
            </div>

            {/* Live stats summary preview */}
            <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#0c0f17] border border-[#1e293b] rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">{isBn ? 'মোট শব্দ' : 'Total'}</span>
                <span className="font-black text-white text-base">{cardsList.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{isBn ? 'আয়ত্ত' : 'Mastered'}</span>
                <span className="font-black text-emerald-400 text-base">{masteredInLesson}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">{isBn ? 'স্কোর' : 'Score'}</span>
                <span className="font-black text-amber-400 text-base">{masteryRatio}% ⭐</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {/* Start MCQ Board Exam Button */}
              {onStartExamFromCards && (
                <button
                  onClick={() => {
                    setIsCompletionModalOpen(false);
                    onStartExamFromCards(cardsList);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer active:scale-95"
                >
                  <Play size={16} className="fill-current" />
                  <span>{isBn ? '🎯 বোর্ড স্ট্যান্ডার্ড MCQ পরীক্ষা শুরু করুন' : '🎯 Start Board Standard MCQ Exam'}</span>
                </button>
              )}

              {/* Review / Practice Again */}
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setIsFlipped(false);
                  setIsCompletionModalOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#161e2e] hover:bg-[#1f2a3f] text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#1e293b]"
              >
                <RefreshCw size={14} />
                <span>{isBn ? 'পুনরায় ফ্ল্যাশকার্ড রিভিশন দিন' : 'Review Flashcards Again'}</span>
              </button>

              {/* Close Modal */}
              <button
                onClick={() => setIsCompletionModalOpen(false)}
                className="w-full py-1 text-slate-400 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
