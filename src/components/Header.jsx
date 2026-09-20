import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Flame,
  Bell,
  Languages,
  Sparkles,
  User,
  Shield,
  LogOut,
  Search,
  X,
  Settings,
  MoreVertical,
  Trophy,
  Maximize2,
  Minimize2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Scale,
  Palette
} from 'lucide-react';
import { getUserLeague } from '../services/scoreManager';
import { AVAILABLE_THEMES, applyTheme, getStoredTheme } from '../services/themeManager';

export default function Header({
  activeTabTitle = 'Dashboard',
  currentPath = '/dashboard',
  navigate,
  onToggleSidebar,
  lang = 'en',
  setLang,
  streakCount = 0,
  onOpenNotifications,
  onOpenStreakModal,
  onOpenAdmin,
  isAdminActive = false,
  currentUser,
  onLogout,
  onOpenProfile,
  onSearch
}) {
  const [isControlMenuOpen, setIsControlMenuOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(() => {
    try {
      return localStorage.getItem('hsc_focus_mode') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

  // Active theme state
  const [currentTheme, setCurrentTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    const handleThemeEvent = (e) => {
      if (e.detail?.theme) setCurrentTheme(e.detail.theme);
    };
    window.addEventListener('hsc_theme_changed', handleThemeEvent);
    return () => window.removeEventListener('hsc_theme_changed', handleThemeEvent);
  }, []);

  const handleThemeChange = (themeId) => {
    applyTheme(themeId);
    setCurrentTheme(themeId);
  };

  const isBn = lang === 'bn';
  const userXP = Number(currentUser?.points || currentUser?.xp || 0);
  const userLeague = getUserLeague(userXP);

  // Toggle Focus / Fullscreen Mode
  const toggleFocusMode = () => {
    const next = !isFocusMode;
    setIsFocusMode(next);
    try {
      localStorage.setItem('hsc_focus_mode', String(next));
    } catch (e) {}
  };

  // Breadcrumbs based on current route
  const getBreadcrumbs = () => {
    const norm = (currentPath || '').toLowerCase();
    if (norm.startsWith('/admin')) {
      return {
        sectionEn: 'Admin Portal',
        sectionBn: 'অ্যাডমিন পোর্টাল',
        titleEn: norm === '/admin/users' ? 'User Management'
          : norm === '/admin/questions' ? 'Question Bank'
          : norm === '/admin/analytics' ? 'Platform Analytics'
          : norm === '/admin/settings' ? 'Quiz Settings'
          : 'Dashboard Overview',
        titleBn: norm === '/admin/users' ? 'শিক্ষার্থী ব্যবস্থাপনা'
          : norm === '/admin/questions' ? 'প্রশ্ন ও শব্দভাণ্ডার'
          : norm === '/admin/analytics' ? 'প্ল্যাটফর্ম অ্যানালিটিক্স'
          : norm === '/admin/settings' ? 'কুইজ মেকার সেটিংস'
          : 'অ্যাডমিন ড্যাশবোর্ড'
      };
    }
    if (norm === '/textbook' || norm === '/vocabulary' || norm === '/vocabulary-bank' || norm === '/flashcards') {
      return {
        sectionEn: 'Study',
        sectionBn: 'পড়াশোনা',
        titleEn: norm === '/textbook' ? 'Textbook Reader'
          : norm === '/flashcards' ? '3D Flashcards'
          : 'Vocabulary Bank',
        titleBn: norm === '/textbook' ? 'পাঠ্যবই রিডার'
          : norm === '/flashcards' ? 'থ্রিডি ফ্ল্যাশকার্ড'
          : 'ভোকাবুলারি ব্যাংক'
      };
    }
    if (norm === '/practice' || norm === '/exam' || norm === '/exams' || norm === '/units' || norm === '/weak-words') {
      return {
        sectionEn: 'Practice',
        sectionBn: 'অনুশীলন',
        titleEn: norm === '/practice' ? 'Quick Practice'
          : norm === '/weak-words' ? 'Weak Words Hub'
          : 'Unit & Lesson MCQ Exam',
        titleBn: norm === '/practice' ? 'দ্রুত অনুশীলন'
          : norm === '/weak-words' ? 'দুর্বল শব্দ ভান্ডার'
          : 'ইউনিট ও লেসন MCQ পরীক্ষা'
      };
    }
    if (norm === '/progress' || norm === '/leaderboard' || norm === '/certificates') {
      return {
        sectionEn: 'Progress',
        sectionBn: 'অগ্রগতি',
        titleEn: norm === '/progress' ? 'Student Analytics'
          : norm === '/leaderboard' ? 'Leaderboard'
          : 'Certificates',
        titleBn: norm === '/progress' ? 'প্রগ্রেস ড্যাশবোর্ড'
          : norm === '/leaderboard' ? 'লিডারবোর্ড'
          : 'সার্টিফিকেট'
      };
    }
    if (norm === '/curriculum' || norm === '/teachers' || norm === '/faq') {
      return {
        sectionEn: 'Resources',
        sectionBn: 'রিসোর্স',
        titleEn: norm === '/curriculum' ? 'Curriculum Directory'
          : norm === '/teachers' ? 'Teachers Hub'
          : 'FAQ & Help',
        titleBn: norm === '/curriculum' ? 'পাঠ্যক্রম ডিরেক্টরি'
          : norm === '/teachers' ? 'শিক্ষক কর্নার'
          : 'প্রশ্নোত্তর ও সাহায্য'
      };
    }
    if (norm === '/settings' || norm === '/about' || norm === '/profile' || norm === '/terms' || norm === '/refund') {
      return {
        sectionEn: 'Account',
        sectionBn: 'অ্যাকাউন্ট',
        titleEn: norm === '/settings' ? 'Settings'
          : norm === '/about' ? 'About & Contact'
          : norm === '/refund' ? 'Refund Policy'
          : norm === '/terms' ? 'Terms & Privacy'
          : 'Profile',
        titleBn: norm === '/settings' ? 'সেটিংস'
          : norm === '/about' ? 'পরিচিতি ও যোগাযোগ'
          : norm === '/refund' ? 'রিফান্ড নীতিমালা'
          : norm === '/terms' ? 'শর্তাবলী ও নীতিমালা'
          : 'প্রোফাইল'
      };
    }
    return {
      sectionEn: 'Overview',
      sectionBn: 'ওভারভিউ',
      titleEn: 'Dashboard',
      titleBn: 'ড্যাশবোর্ড'
    };
  };

  const breadcrumbs = getBreadcrumbs();

  // Close control drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsControlMenuOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsControlMenuOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (typeof onSearch === 'function') {
      onSearch(searchQuery);
    } else if (typeof navigate === 'function') {
      navigate(`/vocabulary-bank?q=${encodeURIComponent(searchQuery)}`);
    }
    setIsControlMenuOpen(false);
  };

  return (
    <>
      {/* 1. If in Focus Mode: Top bar is hidden, only sleek floating 3-dot button appears */}
      {isFocusMode ? (
        <div className="fixed top-3.5 right-4 z-40 flex items-center gap-2">
          {/* Mobile sidebar toggle button in focus mode */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-[#0c0f17]/90 hover:bg-[#151c2a] border border-[#1e293b] text-slate-300 hover:text-white shadow-xl backdrop-blur-xl transition-all cursor-pointer active:scale-95"
            title="Open Sidebar"
          >
            <Menu size={18} />
          </button>

          {/* Floating Three-Dot Trigger */}
          <button
            onClick={() => setIsControlMenuOpen(true)}
            className="p-2.5 rounded-2xl bg-[#0c0f17]/95 hover:bg-[#161f30] border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-white shadow-2xl shadow-emerald-950/40 backdrop-blur-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 group"
            title={isBn ? 'সম্পূর্ণ ইন্টারফেস কন্ট্রোল (⋮)' : 'Full Interface Controls (⋮)'}
          >
            <span className="hidden sm:inline text-xs font-bold text-slate-300 group-hover:text-emerald-300 pl-1">
              {currentUser?.name?.split(' ')[0] || 'Menu'}
            </span>
            <MoreVertical size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
      ) : (
        /* 2. Standard Clean Minimal Top Bar (No cluttered 8 badges spanning across) */
        <header className="h-11 sm:h-12 bg-[#0c0f17]/90 backdrop-blur-xl border-b border-[#1e293b]/60 px-3.5 sm:px-5 lg:px-7 flex items-center justify-between sticky top-0 z-30 select-none transition-all">
          {/* Left: Sidebar Toggle & Clean Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2a] border border-transparent hover:border-[#1e293b] transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={18} />
            </button>

            {/* Subtle Breadcrumbs / Page Indicator */}
            <div className="min-w-0 flex items-center gap-2">
              <span className="hidden md:inline text-[11px] text-slate-500 font-medium">
                HSC 2026 /
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate leading-none">
                {isBn ? breadcrumbs.titleBn : breadcrumbs.titleEn}
              </h1>
            </div>
          </div>

          {/* Right: Theme Toggle & The Single, Powerful Three-Dot Menu Button (⋮) */}
          <div className="flex items-center gap-2">
            {/* Quick Theme Switcher Button with Sage Colors */}
            <button
              onClick={() => {
                const next = currentTheme === 'sage-cream' ? 'cyber-dark' : 'sage-cream';
                handleThemeChange(next);
              }}
              className="px-2 py-1.5 rounded-xl bg-[#111723] hover:bg-[#161f30] border border-[#1e293b] hover:border-emerald-500/50 text-slate-200 hover:text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer group active:scale-95"
              title={isBn ? 'থিম পরিবর্তন (সেজ ও ক্রিম / সাইবার ডার্ক)' : 'Toggle Theme (Sage & Cream / Cyber Dark)'}
            >
              <Palette size={15} className="text-emerald-400 group-hover:rotate-45 transition-transform" />
              <div className="flex items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-[#8FA28A] border border-black/20" />
                <span className="w-2 h-2 rounded-full bg-[#C7D3C0] border border-black/20" />
                <span className="w-2 h-2 rounded-full bg-[#F7F4ED] border border-black/20" />
                <span className="w-2 h-2 rounded-full bg-[#C8A96B] border border-black/20" />
              </div>
            </button>

            <button
              onClick={() => setIsControlMenuOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-[#111723] hover:bg-[#161f30] border border-[#1e293b] hover:border-emerald-500/50 text-slate-200 hover:text-white shadow-md transition-all flex items-center gap-2 cursor-pointer group active:scale-95"
              title={isBn ? 'সম্পূর্ণ ইন্টারফেস ও কন্ট্রোল মেনু (⋮)' : 'Full Interface & Controls (⋮)'}
            >
              {/* Quick glance user avatar badge */}
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-[10px] shadow-sm">
                {currentUser?.name 
                  ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
                  : 'ST'}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-300 group-hover:text-emerald-300 max-w-[100px] truncate">
                {currentUser?.name?.split(' ')[0] || (isBn ? 'মেনু' : 'Menu')}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold hidden md:inline">
                {userXP} XP
              </span>

              {/* The Three-Dot Icon */}
              <MoreVertical size={17} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </header>
      )}

      {/* 3. The Complete Interface & Control Center Drawer (Slide-Over Panel) */}
      <AnimatePresence>
        {isControlMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsControlMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-[#0c101a] border-l border-[#1f293d] shadow-2xl flex flex-col z-50 overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="px-5 py-4 bg-[#0a0d16] border-b border-[#1b2538] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="Learner Hub"
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-500/40 shadow-sm"
                  />
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                      {isBn ? 'সম্পূর্ণ ইন্টারফেস কন্ট্রোল' : 'Complete Control Center'}
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      {isBn ? 'অল-ইন-ওয়ান স্টুডেন্ট অপশনস' : 'All-in-One Student Options'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsControlMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2a] border border-transparent hover:border-[#1e293b] transition-all cursor-pointer"
                  title="Close Menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-[#1f2738]">
                {/* A. Student Profile Banner */}
                {currentUser ? (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#131a29] to-[#0f1422] border border-[#1e293b] flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white font-black text-base shadow-md shadow-emerald-950/60 border border-emerald-400/40">
                          {currentUser?.name 
                            ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
                            : 'ST'}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0f1422]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-white font-black text-sm truncate">
                            {currentUser?.name || 'HSC Candidate'}
                          </h4>
                          {currentUser?.role === 'admin' && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                              ADMIN
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {currentUser?.college || currentUser?.email || 'Notre Dame College, Dhaka'}
                        </p>
                        <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                          {currentUser?.hscBatch || 'HSC 2026 Batch'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block">{isBn ? 'অর্জিত স্কোর' : 'Total Score'}</span>
                      <span className="text-sm font-black text-emerald-400">{userXP} XP</span>
                    </div>
                  </div>
                ) : null}

                {/* B. Streak & League Dual Status Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Daily Streak Flame Card */}
                  <div
                    onClick={() => {
                      if (onOpenStreakModal) onOpenStreakModal();
                    }}
                    className="p-3 rounded-2xl bg-[#131826] border border-orange-500/30 hover:border-orange-500/60 transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-7 h-7 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Flame size={16} className="fill-orange-500 animate-flame" />
                      </div>
                      <span className="text-xs font-black text-orange-400">{streakCount} {isBn ? 'দিন' : 'Days'}</span>
                    </div>
                    <span className="text-xs font-bold text-white block">{isBn ? 'দৈনিক স্ট্রিক' : 'Daily Streak'}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{isBn ? 'অনুশীলন চালু রাখুন' : 'Keep practicing'}</span>
                  </div>

                  {/* League Division Card */}
                  <div
                    onClick={() => {
                      setIsControlMenuOpen(false);
                      if (typeof navigate === 'function') navigate('/leaderboard');
                    }}
                    className="p-3 rounded-2xl bg-[#131826] border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xl">{userLeague.icon}</span>
                      <span className="text-xs font-black text-amber-300">{userLeague.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white block">{isBn ? 'লীগ ডিভিশন' : 'League Tier'}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{isBn ? 'র‍্যাংক দেখুন →' : 'View ranks →'}</span>
                  </div>
                </div>

                {/* C. Quick Search Bar */}
                <div className="p-3 rounded-2xl bg-[#101420] border border-[#1e293b]">
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">
                    🔍 {isBn ? 'দ্রুত শব্দ বা লেসন অনুসন্ধান' : 'Quick Search (Vocabulary & Lessons)'}
                  </span>
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isBn ? 'শব্দ লিখুন... (Enter চাপুন)' : 'Type word... (Press Enter)'}
                      className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                    />
                  </form>
                </div>

                {/* D. Core Action Controls Grid */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    {isBn ? 'ইন্টারফেস নিয়ন্ত্রণ ও সেটিংস' : 'Interface Controls'}
                  </span>

                  {/* Language Switcher */}
                  <div className="p-2.5 rounded-xl bg-[#111724] border border-[#1e293b] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <Languages size={16} className="text-emerald-400" />
                      <span>{isBn ? 'ভাষার মাধ্যম' : 'Language'}</span>
                    </div>
                    <div className="flex items-center gap-1 p-0.5 bg-[#0c0f17] rounded-lg border border-[#1e293b]">
                      <button
                        onClick={() => setLang('bn')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                          lang === 'bn' 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        বাংলা
                      </button>
                      <button
                        onClick={() => setLang('en')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                          lang === 'en' 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </div>

                  {/* Theme Switcher with Sage & Cream Colors */}
                  <div className="p-2.5 rounded-xl bg-[#111724] border border-[#1e293b] space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <Palette size={16} className="text-emerald-400" />
                        <span>{isBn ? 'ওয়েবসাইট থিম' : 'Website Theme'}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {currentTheme === 'sage-cream' ? '🌿 Sage & Cream' : currentTheme === 'sage-dark' ? '🌲 Sage Dark' : '🌌 Cyber Dark'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {AVAILABLE_THEMES.map((th) => {
                        const isActive = currentTheme === th.id;
                        return (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => handleThemeChange(th.id)}
                            className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isActive
                                ? 'bg-[#182333] border-emerald-500/60 ring-1 ring-emerald-500/40'
                                : 'bg-[#0c0f17] border-[#1e293b] hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[11px] font-bold truncate ${isActive ? 'text-emerald-300' : 'text-slate-300'}`}>
                                {isBn ? th.nameBn : th.nameEn}
                              </span>
                              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />}
                            </div>
                            <div className="flex items-center gap-1">
                              {th.colors.map((c, i) => (
                                <span
                                  key={i}
                                  className="w-3 h-3 rounded-full border border-black/20 shadow-2xs shrink-0"
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Focus Mode (Hide Header) Toggle */}
                  <div className="p-2.5 rounded-xl bg-[#111724] border border-[#1e293b] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      {isFocusMode ? <Minimize2 size={16} className="text-cyan-400" /> : <Maximize2 size={16} className="text-cyan-400" />}
                      <div>
                        <span>{isBn ? 'সম্পূর্ণ স্ক্রিন ফোকাস মোড' : 'Full Focus Mode'}</span>
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {isFocusMode 
                            ? (isBn ? 'হেডার লুকানো রয়েছে' : 'Header is hidden') 
                            : (isBn ? 'হেডার বার লুকান' : 'Hide header for full view')}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={toggleFocusMode}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        isFocusMode
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                          : 'bg-[#182133] text-slate-300 border-[#223049] hover:text-white'
                      }`}
                    >
                      {isFocusMode ? (isBn ? 'চালু আছে' : 'ON') : (isBn ? 'বন্ধ' : 'OFF')}
                    </button>
                  </div>

                  {/* Notifications Center */}
                  <button
                    onClick={() => {
                      setIsControlMenuOpen(false);
                      if (onOpenNotifications) onOpenNotifications();
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#111724] hover:bg-[#161e2e] border border-[#1e293b] flex items-center justify-between transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <Bell size={16} className="text-amber-400" />
                      <span>{isBn ? 'নোটিফিকেশন ও আপডেট' : 'Notifications & Alerts'}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </button>

                  {/* Master Admin Portal (If admin) */}
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setIsControlMenuOpen(false);
                        if (navigate) navigate(isAdminActive ? '/dashboard' : '/admin');
                        else if (onOpenAdmin) onOpenAdmin();
                      }}
                      className="w-full p-2.5 rounded-xl bg-purple-950/30 hover:bg-purple-950/50 border border-purple-500/30 flex items-center justify-between transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2 text-xs text-purple-200 font-bold">
                        <Shield size={16} className="text-purple-400" />
                        <span>{isAdminActive ? (isBn ? 'শিক্ষার্থী ড্যাশবোর্ডে ফিরুন' : 'Back to Student Dashboard') : (isBn ? 'মাস্টার অ্যাডমিন পোর্টাল' : 'Master Admin Portal')}</span>
                      </div>
                      <ChevronRight size={15} className="text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

                {/* E. Quick Navigation Shortcuts */}
                <div className="space-y-1 pt-1 border-t border-[#1a2336]">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    {isBn ? 'শর্টকাট মেনু' : 'Quick Navigation'}
                  </span>

                  <button
                    onClick={() => {
                      setIsControlMenuOpen(false);
                      if (onOpenProfile) onOpenProfile();
                      else if (navigate) navigate('/profile');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#141c2c] rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <User size={15} className="text-emerald-400" />
                      <span>{isBn ? 'আমার প্রোফাইল' : 'My Profile'}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsControlMenuOpen(false);
                      if (navigate) navigate('/settings');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#141c2c] rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Settings size={15} className="text-slate-400" />
                      <span>{isBn ? 'অ্যাকাউন্ট সেটিংস' : 'Account Settings'}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsControlMenuOpen(false);
                      if (navigate) navigate('/terms');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#141c2c] rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Scale size={15} className="text-slate-400" />
                      <span>{isBn ? 'শর্তাবলী ও নীতিমালা' : 'Terms & Privacy'}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Drawer Footer: Logout */}
              {onLogout && (
                <div className="p-4 bg-[#0a0d16] border-t border-[#1b2538]">
                  <button
                    onClick={() => {
                      setIsControlMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <LogOut size={15} />
                    <span>{isBn ? 'অ্যাকাউন্ট থেকে লগআউট করুন' : 'Log Out from Account'}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
