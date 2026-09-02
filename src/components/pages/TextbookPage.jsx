import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  ExternalLink,
  Search,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Award,
  BookMarked,
  Languages,
  Sliders,
  Type,
  X,
  Share2
} from 'lucide-react';

import { hscUnits } from '../../data/hscUnitsData';
import { hscVocabularyList } from '../../data/questions/hscQuestionsData';
import { ALL_TEXTBOOKS as TEXTBOOK_REGISTRY } from '../../data/textbooks/index';

export default function TextbookPage({
  lang = 'en',
  onStartExam,
  onNavigate,
  selectedUnitId = 'unit-1',
  selectedLessonId = 'u1-l1'
}) {
  const isBn = lang === 'bn';

  // Navigation / Selection State
  const [activeUnitId, setActiveUnitId] = useState(selectedUnitId);
  const [activeLessonId, setActiveLessonId] = useState(selectedLessonId);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fontSize, setFontSize] = useState('text-base'); // 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
  const [showTranslations, setShowTranslations] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  // Vocab Popup State
  const [selectedVocab, setSelectedVocab] = useState(null);
  const [bookmarkedWords, setBookmarkedWords] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_bookmarked_words');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // TTS State
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isPausedTTS, setIsPausedTTS] = useState(false);
  const [currentReadingSection, setCurrentReadingSection] = useState(null);
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

  // Sync props if changed from parent
  useEffect(() => {
    if (selectedUnitId) setActiveUnitId(selectedUnitId);
    if (selectedLessonId) setActiveLessonId(selectedLessonId);
  }, [selectedUnitId, selectedLessonId]);

  // Clean up TTS on unmount or lesson change
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [activeLessonId]);

  // Find active unit object
  const currentUnit = useMemo(() => {
    return hscUnits.find((u) => u.id === activeUnitId) || hscUnits[0];
  }, [activeUnitId]);

  // Find active textbook content
  const currentTextbook = useMemo(() => {
    if (TEXTBOOK_REGISTRY[activeLessonId]) {
      return TEXTBOOK_REGISTRY[activeLessonId];
    }
    if (TEXTBOOK_REGISTRY[activeUnitId]) {
      return TEXTBOOK_REGISTRY[activeUnitId];
    }
    // Fallback: Generate structured placeholder curriculum reader for units without full text yet
    const lessonObj = currentUnit?.lessons?.find((l) => l.id === activeLessonId) || currentUnit?.lessons?.[0];
    return {
      unitId: currentUnit.id,
      unitTitle: `${currentUnit.unitNumber}: ${currentUnit.unitTitle}`,
      unitTitleBn: currentUnit.unitTitleBn,
      lessonId: lessonObj?.id || 'l-overview',
      lessonNumber: lessonObj?.number || 'Lesson 1',
      title: lessonObj?.title || currentUnit.unitTitle,
      titleBn: lessonObj?.titleBn || currentUnit.unitTitleBn,
      author: 'National Curriculum and Textbook Board (NCTB)',
      summaryBn: `এই পাঠটি এনসিটিবি এইচএসসি ২০২৬ ইংলিশ ফার্স্ট পেপার পাঠ্যবইয়ের "${currentUnit.unitTitleBn}" ইউনিটের অন্তর্ভুক্ত। এখানে ইংরেজি ভাষার প্রয়োগ, রিডিং কম্প্রিহেনশন এবং বোর্ড স্ট্যান্ডার্ড ভোকাবুলারি অনুশীলনের নির্দেশনা রয়েছে।`,
      sections: [
        {
          paraNumber: 1,
          heading: 'Overview & Learning Objectives',
          headingBn: 'পাঠের মূল উদ্দেশ্য ও প্রেক্ষাপট',
          content: `Welcome to ${lessonObj?.title || currentUnit.unitTitle}. This official NCTB curriculum lesson focuses on reading comprehension, critical analysis, and contextual vocabulary acquisition.\n\nStudents are expected to read the text attentively, analyze the thematic undertones, and master the key vocabulary words for the upcoming HSC Board Examination.`,
          bengaliTranslation: `এই পাঠটি মনোযোগ সহকারে পড়ুন। পাঠ্যের মূলভাব অনুধাবন এবং বোর্ড পরীক্ষার উপযোগী গুরুত্বপূর্ণ শব্দার্থ ও ব্যাকরণগত কাঠামো আয়ত্ত করাই এই পাঠের মূল লক্ষ্য।`,
          keyVocab: ['Comprehension', 'Contextual', 'Acquisition', 'Thematic']
        },
        {
          paraNumber: 2,
          heading: 'Board Exam Preparation Strategy',
          headingBn: 'বোর্ড পরীক্ষা প্রস্তুতি ও কৌশল',
          content: `To achieve an A+ in HSC English 1st Paper, candidates must practice active recall on synonyms, antonyms, and multiple-choice questions derived directly from this lesson.\n\nUse the Spaced Repetition MCQ Exam tool to test your mastery across all four question archetypes.`,
          bengaliTranslation: `এইচএসসি ইংরেজি ১ম পত্রে সর্বোচ্চ ফলাফলের জন্য এই পাঠের প্রতিটি শব্দের সমার্থক ও বিপরীতার্থক শব্দ মুখস্থ করার পাশাপাশি নিয়মিত এমসিকিউ পরীক্ষা দেওয়া আবশ্যক।`,
          keyVocab: ['Strategy', 'Candidates', 'Archetypes', 'Mastery']
        }
      ]
    };
  }, [activeLessonId, activeUnitId, currentUnit]);

  // Fast vocabulary lookup map (lowercase word -> vocab item)
  const vocabMap = useMemo(() => {
    const map = new Map();
    hscVocabularyList.forEach((v) => {
      if (v && v.word) {
        map.set(v.word.toLowerCase().trim(), v);
      }
    });
    return map;
  }, []);

  // Text-to-Speech Engine Handlers
  const handlePlayTTS = (text, sectionIndex = null) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = ttsSpeed;

    utterance.onstart = () => {
      setIsPlayingTTS(true);
      setIsPausedTTS(false);
      if (sectionIndex !== null) setCurrentReadingSection(sectionIndex);
    };

    utterance.onend = () => {
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
      setCurrentReadingSection(null);
    };

    utterance.onerror = () => {
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
      setCurrentReadingSection(null);
    };

    synthRef.current.speak(utterance);
  };

  const handlePauseTTS = () => {
    if (synthRef.current && isPlayingTTS) {
      if (isPausedTTS) {
        synthRef.current.resume();
        setIsPausedTTS(false);
      } else {
        synthRef.current.pause();
        setIsPausedTTS(true);
      }
    }
  };

  const handleStopTTS = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
      setCurrentReadingSection(null);
    }
  };

  // Pronounce a single vocabulary word
  const handleSpeakWord = (wordText) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(wordText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    synthRef.current.speak(utterance);
  };

  // Toggle Bookmark for Word
  const handleToggleBookmark = (wordObj) => {
    if (!wordObj) return;
    let next;
    const exists = bookmarkedWords.some((w) => w.word.toLowerCase() === wordObj.word.toLowerCase());
    if (exists) {
      next = bookmarkedWords.filter((w) => w.word.toLowerCase() !== wordObj.word.toLowerCase());
    } else {
      next = [...bookmarkedWords, wordObj];
    }
    setBookmarkedWords(next);
    try {
      localStorage.setItem('hsc_bookmarked_words', JSON.stringify(next));
    } catch (e) {}
  };

  // Open rich vocab popup
  const handleWordClick = (rawWord) => {
    const clean = rawWord.replace(/[^a-zA-Z]/g, '').toLowerCase().trim();
    if (!clean) return;

    const matched = vocabMap.get(clean);
    if (matched) {
      setSelectedVocab(matched);
    } else {
      // Create on-the-fly dictionary entry
      setSelectedVocab({
        word: rawWord.charAt(0).toUpperCase() + rawWord.slice(1),
        partsOfSpeech: 'Contextual Word',
        bengaliMeaning: 'পাঠ্যবইয়ের প্রাসঙ্গিক শব্দ',
        synonyms: 'Relevant term, textbook expression',
        antonyms: 'N/A',
        englishMeaning: `A key vocabulary word appearing in ${currentTextbook.title}.`,
        exampleSentence: `"${rawWord}" is an essential term in the NCTB curriculum.`,
        unit: currentTextbook.unitTitle,
        boardExamTag: 'NCTB Board Exam'
      });
    }
  };

  // Helper to render paragraph with interactive highlight tokens
  const renderHighlightedContent = (content) => {
    // Split by words while keeping delimiters
    const tokens = content.split(/(\s+|[.,!?;:()""'—–])/);
    return tokens.map((token, idx) => {
      const clean = token.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const isVocab = clean.length > 2 && vocabMap.has(clean);

      if (isVocab) {
        return (
          <span
            key={idx}
            onClick={() => handleWordClick(token)}
            title="Click for Bengali Meaning & Synonyms"
            className="inline-block font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/30 border-b border-emerald-400 px-1 py-0.5 rounded cursor-pointer transition-colors"
          >
            {token}
          </span>
        );
      }
      return <span key={idx}>{token}</span>;
    });
  };

  // Filter lessons for drawer
  const filteredUnits = useMemo(() => {
    if (!searchFilter.trim()) return hscUnits;
    const query = searchFilter.toLowerCase();
    return hscUnits.filter((u) =>
      u.unitTitle.toLowerCase().includes(query) ||
      u.unitTitleBn.toLowerCase().includes(query) ||
      u.lessons.some((l) => l.title.toLowerCase().includes(query) || l.titleBn.toLowerCase().includes(query))
    );
  }, [searchFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header & Breadcrumbs Card */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-7 shadow-card space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <BookOpen size={14} />
              <span>{isBn ? 'এনসিটিবি এইচএসসি পাঠ্যবই রিডার' : 'NCTB HSC English Textbook Reader'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{currentTextbook.title}</span>
              <span className="text-emerald-400 font-bold text-lg sm:text-2xl font-bengali">
                ({currentTextbook.titleBn})
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {currentTextbook.unitTitle} • {currentTextbook.lessonNumber} • Author:{' '}
              <span className="text-slate-200 font-semibold">{currentTextbook.author}</span>
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Unit/Lesson Selector Drawer Toggle */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-[#2b3b59] text-slate-200 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              <Layers size={15} className="text-emerald-400" />
              <span>{isBn ? 'অন্য লেসন বাছুন' : 'Select Lesson'}</span>
            </button>

            {/* Translation Toggle */}
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                showTranslations
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-[#162033] border-[#2b3b59] text-slate-400 hover:text-white'
              }`}
            >
              <Languages size={15} />
              <span>{isBn ? (showTranslations ? 'অনুবাদ চালু' : 'অনুবাদ বন্ধ') : (showTranslations ? 'BN Meaning On' : 'BN Meaning Off')}</span>
            </button>

            {/* Launch Exam CTA */}
            <button
              onClick={() => {
                if (onStartExam) {
                  onStartExam(activeUnitId, activeLessonId);
                } else if (onNavigate) {
                  onNavigate('/exam');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all"
            >
              <Play size={14} className="fill-current" />
              <span>{isBn ? 'এই লেসনের পরীক্ষা শুরু করুন' : 'Launch Practice Exam'}</span>
            </button>
          </div>
        </div>

        {/* TTS Toolbar & Reading Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1e293b]/70 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Volume2 size={15} className="text-cyan-400" />
              <span>{isBn ? 'অডিও রিডার (TTS):' : 'Audio Narration:'}</span>
            </span>

            {/* Full Story Play/Pause */}
            {!isPlayingTTS ? (
              <button
                onClick={() => {
                  const fullStory = currentTextbook.sections.map((s) => s.content).join(' ');
                  handlePlayTTS(fullStory);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5 transition-all"
              >
                <Play size={13} className="fill-current" />
                <span>{isBn ? 'সম্পূর্ণ প্যাসেজ শুনুন' : 'Listen Full Story'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePauseTTS}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5 transition-all"
                >
                  {isPausedTTS ? <Play size={13} className="fill-current" /> : <Pause size={13} />}
                  <span>{isPausedTTS ? (isBn ? 'পুনরায় চালান' : 'Resume') : (isBn ? 'থামান' : 'Pause')}</span>
                </button>
                <button
                  onClick={handleStopTTS}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 font-bold flex items-center gap-1 transition-all"
                >
                  <RotateCcw size={13} />
                  <span>{isBn ? 'বন্ধ' : 'Stop'}</span>
                </button>
              </div>
            )}

            {/* Speed Selector */}
            <div className="hidden sm:flex items-center gap-1 ml-2 bg-[#0c0f17] border border-[#1e293b] rounded-lg p-0.5">
              {[0.85, 1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    setTtsSpeed(speed);
                    if (isPlayingTTS) {
                      const fullStory = currentTextbook.sections.map((s) => s.content).join(' ');
                      handlePlayTTS(fullStory);
                    }
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    ttsSpeed === speed
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1.5">
            <Type size={14} className="text-slate-400" />
            <span className="text-[11px] text-slate-400">{isBn ? 'ফন্ট সাইজ:' : 'Font Size:'}</span>
            <div className="flex items-center gap-1 bg-[#0c0f17] border border-[#1e293b] rounded-lg p-0.5">
              {[
                { label: 'A-', val: 'text-sm' },
                { label: 'A', val: 'text-base' },
                { label: 'A+', val: 'text-lg' },
                { label: 'A++', val: 'text-xl' }
              ].map((f) => (
                <button
                  key={f.val}
                  onClick={() => setFontSize(f.val)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    fontSize === f.val
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Summary Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-[#111723] to-[#0c0f17] border border-emerald-500/25 space-y-2 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="font-bold text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
            <Sparkles size={16} />
            <span>{isBn ? 'গল্পের সারসংক্ষেপ ও মূলভাব (Theme & Analysis):' : 'NCTB Lesson Summary & Literary Theme:'}</span>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            HSC 2026 Curriculum
          </span>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-bengali">
          {currentTextbook.summaryBn}
        </p>
      </div>

      {/* Main Passage Paragraphs Stream */}
      <div className="space-y-6">
        {currentTextbook.sections.map((sec, idx) => {
          const isThisReading = currentReadingSection === idx;
          return (
            <motion.div
              key={sec.paraNumber}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className={`p-5 sm:p-7 rounded-3xl bg-[#111723] border transition-all space-y-4 shadow-card ${
                isThisReading
                  ? 'border-cyan-500 shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'border-[#1e293b] hover:border-emerald-500/30'
              }`}
            >
              {/* Paragraph Header */}
              <div className="flex items-center justify-between border-b border-[#1b2436] pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-xs flex items-center justify-center">
                    {sec.paraNumber}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {sec.heading}
                    </h3>
                    {sec.headingBn && (
                      <span className="text-xs text-slate-400 font-bengali">{sec.headingBn}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {sec.flag && (
                    <span className="text-base px-2 py-0.5 rounded-lg bg-[#162033] border border-[#24334a]">
                      {sec.flag} {sec.region}
                    </span>
                  )}
                  <button
                    onClick={() => handlePlayTTS(sec.content, idx)}
                    title="Listen to this section"
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isThisReading
                        ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                        : 'bg-[#162033] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border-[#26354d]'
                    }`}
                  >
                    <Volume2 size={15} />
                    <span className="text-[11px] hidden sm:inline">
                      {isThisReading ? (isBn ? 'পড়ছে...' : 'Reading...') : (isBn ? 'শুনুন' : 'Listen')}
                    </span>
                  </button>
                </div>
              </div>

              {/* Body Text with Clickable Emerald Vocab */}
              <div className={`${fontSize} leading-relaxed text-slate-200 whitespace-pre-line font-sans`}>
                {renderHighlightedContent(sec.content)}
              </div>

              {/* Collapsible Bengali Translation */}
              {showTranslations && sec.bengaliTranslation && (
                <div className="p-4 rounded-2xl bg-[#0c101a] border border-[#1e2a3e] text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-bengali space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>{isBn ? 'বাংলা ভাবানুবাদ:' : 'Bengali Translation:'}</span>
                  </span>
                  <div className="whitespace-pre-line text-slate-300">
                    {sec.bengaliTranslation}
                  </div>
                </div>
              )}

              {/* Key Vocabulary Chips */}
              {sec.keyVocab && sec.keyVocab.length > 0 && (
                <div className="pt-2 border-t border-[#182030] flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <Sparkles size={13} className="text-emerald-400" />
                    <span>{isBn ? 'গুরুত্বপূর্ণ শব্দসমূহ (ক্লিক করুন):' : 'Key Vocabulary (Click):'}</span>
                  </span>
                  {sec.keyVocab.map((w, vIdx) => (
                    <button
                      key={vIdx}
                      onClick={() => handleWordClick(w)}
                      className="px-2.5 py-1 rounded-lg bg-[#141c2c] hover:bg-emerald-500/20 border border-[#212f46] hover:border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-all active:scale-95"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Sticky Exam Launch Bar */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#131b2b] via-[#101726] to-[#131b2b] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <Award size={18} className="text-yellow-400" />
            <span>{isBn ? 'প্যাসেজটি পড়া শেষ করেছেন?' : 'Finished reading the passage?'}</span>
          </h4>
          <p className="text-xs text-slate-400">
            {isBn
              ? 'বোর্ড স্ট্যান্ডার্ড ১৫টি এমসিকিউ দিয়ে আপনার শিখন দক্ষতা যাচাই করুন।'
              : 'Test your retention and board mastery with curated spaced-repetition MCQs.'}
          </p>
        </div>

        <button
          onClick={() => {
            if (onStartExam) {
              onStartExam(activeUnitId, activeLessonId);
            } else if (onNavigate) {
              onNavigate('/exam');
            }
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all shrink-0"
        >
          <span>{isBn ? 'MCQ পরীক্ষা শুরু করুন' : 'Launch MCQ Exam Now'}</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Interactive Word Definition Modal */}
      <AnimatePresence>
        {selectedVocab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#131824] border border-[#24334c] rounded-3xl p-6 shadow-2xl space-y-5 text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVocab(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1c2638] hover:bg-rose-950 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>

              {/* Word Header */}
              <div className="flex items-start justify-between pr-8">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {selectedVocab.word}
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {selectedVocab.partsOfSpeech || 'Vocab'}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-emerald-400 mt-1 font-bengali">
                    {selectedVocab.bengaliMeaning}
                  </p>
                </div>
              </div>

              {/* Audio Pronunciation Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleSpeakWord(selectedVocab.word)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Volume2 size={15} />
                  <span>{isBn ? 'সঠিক উচ্চারণ শুনুন' : 'Pronounce Word'}</span>
                </button>

                <button
                  onClick={() => handleToggleBookmark(selectedVocab)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    bookmarkedWords.some((w) => w.word.toLowerCase() === selectedVocab.word.toLowerCase())
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-[#1a2334] border-[#293852] text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark size={14} />
                  <span>
                    {bookmarkedWords.some((w) => w.word.toLowerCase() === selectedVocab.word.toLowerCase())
                      ? (isBn ? 'বুকমার্কড' : 'Bookmarked')
                      : (isBn ? 'বুকমার্ক করুন' : 'Bookmark')}
                  </span>
                </button>
              </div>

              {/* Rich Details Grid */}
              <div className="space-y-3 text-xs sm:text-sm">
                {/* English Definition */}
                {selectedVocab.englishMeaning && (
                  <div className="p-3.5 rounded-2xl bg-[#0c101a] border border-[#1e2a3e] space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 block">
                      📖 {isBn ? 'ইংরেজি সংজ্ঞা (English Meaning):' : 'English Definition:'}
                    </span>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {selectedVocab.englishMeaning}
                    </p>
                  </div>
                )}

                {/* Synonyms & Antonyms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#0e1422] border border-[#1f2b40] space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 block">
                      🔄 {isBn ? 'সমার্থক শব্দ (Synonyms):' : 'Synonyms:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedVocab.synonyms || 'N/A'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1422] border border-[#1f2b40] space-y-1">
                    <span className="text-[11px] font-bold text-rose-400 block">
                      🔀 {isBn ? 'বিপরীত শব্দ (Antonyms):' : 'Antonyms:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedVocab.antonyms || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Example Sentence */}
                {selectedVocab.exampleSentence && (
                  <div className="p-3 rounded-xl bg-[#0e1422] border border-[#1f2b40] space-y-1">
                    <span className="text-[11px] font-bold text-cyan-400 block">
                      ✍️ {isBn ? 'বাক্যে প্রয়োগ (Example Sentence):' : 'Example Sentence:'}
                    </span>
                    <p className="text-slate-300 italic">
                      "{selectedVocab.exampleSentence}"
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-2 border-t border-[#1e2a3e] flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 truncate">
                  Tag: {selectedVocab.boardExamTag || 'HSC 2026'}
                </span>
                <button
                  onClick={() => {
                    setSelectedVocab(null);
                    if (onStartExam) {
                      onStartExam(activeUnitId, activeLessonId);
                    } else if (onNavigate) {
                      onNavigate('/exam');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <span>{isBn ? 'এই শব্দের MCQ দিন' : 'Test on this Word'}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unit & Lesson Drawer Selector */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#111723] border-l border-[#1e293b] p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                  <div className="flex items-center gap-2">
                    <Layers className="text-emerald-400" size={20} />
                    <h3 className="font-bold text-white text-lg">
                      {isBn ? 'ইউনিট ও লেসন নির্বাচন' : 'Select Unit & Lesson'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#182030] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Search in Syllabus */}
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={isBn ? 'ইউনিট বা লেসন খুঁজুন...' : 'Search unit or lesson...'}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Units & Lessons List */}
              <div className="flex-1 overflow-y-auto pr-1 my-4 space-y-3">
                {filteredUnits.map((u) => {
                  const isCurrentUnit = u.id === activeUnitId;
                  return (
                    <div
                      key={u.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrentUnit
                          ? 'bg-[#162033] border-emerald-500/40'
                          : 'bg-[#0c0f17] border-[#1e293b]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-emerald-400">
                          {u.unitNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {u.lessons.length} {isBn ? 'লেসন' : 'Lessons'}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-2">{u.unitTitle}</h4>

                      {/* Lessons in this unit */}
                      <div className="space-y-1.5 pl-2 border-l border-[#24334c]">
                        {u.lessons.map((l) => {
                          const isCurrentLesson = l.id === activeLessonId;
                          return (
                            <button
                              key={l.id}
                              onClick={() => {
                                setActiveUnitId(u.id);
                                setActiveLessonId(l.id);
                                setIsDrawerOpen(false);
                              }}
                              className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                                isCurrentLesson
                                  ? 'bg-emerald-500 text-slate-950 font-bold'
                                  : 'text-slate-300 hover:bg-[#1f2d48] hover:text-white'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <span className="block truncate">{l.number}: {l.title}</span>
                                <span className="text-[10px] opacity-80 font-bengali truncate block">{l.titleBn}</span>
                              </div>
                              <ChevronRight size={13} className="shrink-0 opacity-70" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
                <span>12 NCTB Units • 40+ Lessons</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#182030] text-slate-200 font-bold text-xs"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
