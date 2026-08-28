import React, { useState, useEffect } from 'react';
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
  ArrowRight
} from 'lucide-react';
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

  // Filter or shuffle cards based on selected lesson
  useEffect(() => {
    let list = [...hscVocabularyList];
    if (selectedLessonId !== 'all') {
      list = hscVocabularyList.filter(item => item.unit.includes("Lesson 1") || item.unit.includes("The Parrot's Tale"));
    }
    if (isShuffled) {
      list = [...list].sort(() => Math.random() - 0.5);
    }
    setCardsList(list);
    setIsFlipped(false);
  }, [selectedLessonId, isShuffled]);

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

  // Text-To-Speech Pronunciation
  const handleSpeak = (e, text) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardsList.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cardsList.length) % cardsList.length);
    }, 150);
  };

  const handleMarkMastered = (e) => {
    e.stopPropagation();
    if (!currentCard) return;
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
    e.stopPropagation();
    if (!currentCard) return;
    if (onToggleWeakWord) {
      onToggleWeakWord(currentCard);
    }
    setMasteredWords(masteredWords.filter(id => id !== currentCard.id));
    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardsList.length]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#10141f] border border-[#1e2738] p-4 sm:p-5 rounded-2xl shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-950/50">
            <Layers size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <span>{isBn ? 'ইন্টারেক্টিভ ফ্ল্যাশকার্ড' : 'Interactive Flashcards'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                PRO Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {isBn ? 'স্পেসড-রিপিটিশন ভোকাবুলারি রিভিশন' : 'Spaced Repetition Active Recall'}
            </p>
          </div>
        </div>

        {/* Lesson Selector & Shuffle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="bg-[#172030] border border-[#26334a] text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500 cursor-pointer font-medium"
          >
            <option value="u1-l1">Unit 1: The Parrot's Tale (23 Words)</option>
            <option value="all">All Available Words (23 Words)</option>
          </select>

          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isShuffled
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-[#172030] border-[#26334a] text-slate-400 hover:text-white'
            }`}
            title="Shuffle Flashcards"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">{isBn ? 'শাফল' : 'Shuffle'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Card Counter Indicator */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-400 font-medium">
        <span>
          {isBn ? 'কার্ড নম্বর:' : 'Card:'} <strong className="text-white font-bold">{currentIndex + 1}</strong> / {cardsList.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 size={13} /> {masteredWords.length} {isBn ? 'আয়ত্ত' : 'Mastered'}
          </span>
          <span className="text-rose-400 flex items-center gap-1 font-semibold">
            <AlertCircle size={13} /> {weakWords.length} {isBn ? 'দুর্বল শব্দ' : 'Weak'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#172030] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cardsList.length) * 100}%` }}
        />
      </div>

      {/* 3D Interactive Flashcard with Flip Animation */}
      <div className="perspective-1000 min-h-[380px] sm:min-h-[420px]">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full h-full min-h-[380px] sm:min-h-[420px] rounded-3xl border transition-all duration-500 transform-style-3d cursor-pointer relative shadow-2xl ${
            isFlipped ? 'rotate-y-180 bg-[#131926] border-emerald-500/50 shadow-emerald-950/30' : 'bg-gradient-to-b from-[#121724] to-[#0c1018] border-[#222c40] hover:border-slate-600'
          }`}
        >
          {/* ==================== FRONT OF CARD ==================== */}
          {!isFlipped ? (
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[420px]">
              {/* Card Header Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {currentCard.unit || "Unit 1: The Parrot's Tale"}
                </span>

                <div className="flex items-center gap-2">
                  {currentCard.partsOfSpeech && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#192234] border border-[#25334d] text-slate-300">
                      {currentCard.partsOfSpeech}
                    </span>
                  )}
                  <button
                    onClick={(e) => handleSpeak(e, currentCard.word)}
                    className="p-2 rounded-xl bg-[#1a2336] hover:bg-emerald-500/20 text-emerald-400 border border-[#253550] transition-all"
                    title="Audio Pronunciation"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

              {/* Center Main Word */}
              <div className="text-center my-auto py-8">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                  {currentCard.word}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {isBn ? 'অর্থ ও বিস্তারিত জানতে কার্ডে ট্যাপ করুন 👆' : 'Tap anywhere on card to flip & reveal meaning 👆'}
                </p>
              </div>

              {/* Card Footer Status Badges */}
              <div className="flex items-center justify-between pt-4 border-t border-[#182132] text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <RotateCw size={13} className="text-slate-400" />
                  {isBn ? 'স্পেসবার বা ট্যাপ করে উল্টান' : 'Space / Tap to flip'}
                </span>

                <div className="flex items-center gap-2">
                  {isWeak && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
                      {isBn ? 'দুর্বল শব্দ' : 'Weak Word'}
                    </span>
                  )}
                  {isMastered && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                      {isBn ? 'আয়ত্ত' : 'Mastered'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ==================== BACK OF CARD ==================== */
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[420px] space-y-4">
              {/* Back Header */}
              <div className="flex items-center justify-between border-b border-[#1f2a3e] pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {currentCard.word}
                  </h3>
                  {currentCard.partsOfSpeech && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1c273c] text-slate-300">
                      {currentCard.partsOfSpeech}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => handleSpeak(e, `${currentCard.word}. ${currentCard.englishMeaning}`)}
                  className="p-2 rounded-xl bg-[#1a2336] hover:bg-emerald-500/20 text-emerald-400 border border-[#253550] transition-all"
                  title="Audio Pronunciation"
                >
                  <Volume2 size={16} />
                </button>
              </div>

              {/* Meaning, Synonyms, Antonyms Grid */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                {/* Bengali Meaning */}
                <div className="bg-[#0e1420] border border-[#1e293c] p-3 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-0.5">
                    🇧🇩 {isBn ? 'বাংলা অর্থ (Bengali Meaning):' : 'Bangla Meaning:'}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white font-siliguri">
                    {currentCard.bengaliMeaning}
                  </p>
                </div>

                {/* English Meaning */}
                {currentCard.englishMeaning && (
                  <div className="bg-[#0e1420] border border-[#1e293c] p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-blue-400 block mb-0.5">
                      📖 {isBn ? 'ইংরেজি সংজ্ঞা (English Meaning):' : 'English Definition:'}
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {currentCard.englishMeaning}
                    </p>
                  </div>
                )}

                {/* Synonyms & Antonyms Two Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-[#0e1420] border border-[#1e293c] p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-emerald-300 block mb-0.5">
                      🔄 {isBn ? 'সমার্থক শব্দ (Synonyms):' : 'Synonyms:'}
                    </span>
                    <p className="text-slate-300 font-medium leading-snug">
                      {currentCard.synonyms}
                    </p>
                  </div>

                  <div className="bg-[#0e1420] border border-[#1e293c] p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-rose-400 block mb-0.5">
                      ⚡ {isBn ? 'বিপরীত শব্দ (Antonyms):' : 'Antonyms:'}
                    </span>
                    <p className="text-slate-300 font-medium leading-snug">
                      {currentCard.antonyms}
                    </p>
                  </div>
                </div>

                {/* Example sentence from textbook */}
                {currentCard.exampleSentence && (
                  <div className="bg-[#121927] border border-[#202c42] p-2.5 rounded-xl text-slate-300 italic text-[11px]">
                    <strong className="text-amber-400 not-italic">Textbook Context: </strong>
                    "{currentCard.exampleSentence}"
                  </div>
                )}
              </div>

              {/* Back Footer */}
              <div className="pt-2 text-center text-slate-500 text-[11px]">
                {isBn ? 'পুনরায় কার্ড উল্টাতে ট্যাপ করুন' : 'Tap to flip back'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Prev, Weak, Mastered, Next */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-[#141b29] hover:bg-[#1e273a] text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-[#232f45] transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft size={16} />
            <span>{isBn ? 'পূর্ববর্তী' : 'Previous'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-[#141b29] hover:bg-[#1e273a] text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-[#232f45] transition-all cursor-pointer shadow-sm"
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
            className={`flex-1 sm:flex-initial px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer shadow-sm active:scale-95 ${
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
    </div>
  );
}
