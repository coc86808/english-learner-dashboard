import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Flame,
  Moon,
  Sun,
  Bell,
  Languages,
  Sparkles,
  User,
  Shield,
  LogOut,
  Search,
  ChevronDown,
  Award,
  FileText,
  Settings,
  HelpCircle,
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  const isBn = lang === 'bn';

  // Breadcrumb generator based on current route
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
    if (norm === '/units' || norm === '/textbook' || norm === '/vocabulary' || norm === '/vocabulary-bank' || norm === '/flashcards') {
      return {
        sectionEn: 'Study',
        sectionBn: 'পড়াশোনা',
        titleEn: norm === '/units' ? 'Units & Lessons'
          : norm === '/textbook' ? 'Textbook Reader'
          : norm === '/flashcards' ? '3D Flashcards'
          : 'Vocabulary Bank',
        titleBn: norm === '/units' ? 'ইউনিট ও লেসন'
          : norm === '/textbook' ? 'পাঠ্যবই রিডার'
          : norm === '/flashcards' ? 'থ্রিডি ফ্ল্যাশকার্ড'
          : 'ভোকাবুলারি ব্যাংক'
      };
    }
    if (norm === '/practice' || norm === '/exam' || norm === '/exams' || norm === '/weak-words') {
      return {
        sectionEn: 'Practice',
        sectionBn: 'অনুশীলন',
        titleEn: norm === '/practice' ? 'Quick Practice'
          : norm === '/weak-words' ? 'Weak Words Hub'
          : 'Board Standard Exam',
        titleBn: norm === '/practice' ? 'দ্রুত অনুশীলন'
          : norm === '/weak-words' ? 'দুর্বল শব্দ ভান্ডার'
          : 'বোর্ড পরীক্ষা'
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
    if (norm === '/notes' || norm === '/settings' || norm === '/about' || norm === '/profile' || norm === '/history') {
      return {
        sectionEn: 'Account',
        sectionBn: 'অ্যাকাউন্ট',
        titleEn: norm === '/notes' ? 'Personal Notes'
          : norm === '/settings' ? 'Settings'
          : norm === '/about' ? 'About & Contact'
          : norm === '/profile' ? 'Profile'
          : 'Exam History',
        titleBn: norm === '/notes' ? 'ব্যক্তিগত নোটস'
          : norm === '/settings' ? 'সেটিংস'
          : norm === '/about' ? 'পরিচিতি ও যোগাযোগ'
          : norm === '/profile' ? 'প্রোফাইল'
          : 'পরীক্ষার হিস্ট্রি'
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (typeof onSearch === 'function') {
      onSearch(searchQuery);
    } else if (typeof navigate === 'function') {
      navigate(`/vocabulary-bank?q=${encodeURIComponent(searchQuery)}`);
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="h-16 bg-[#0c0f17]/90 backdrop-blur-xl border-b border-[#1e293b] px-3.5 sm:px-5 lg:px-7 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* 1. Left: Hamburger & Dynamic Breadcrumb Hierarchy */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2a] border border-transparent hover:border-[#1e293b] transition-all cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Dynamic Breadcrumbs */}
        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium leading-none">
            <span className="text-emerald-400 font-semibold">HSC 2026</span>
            <span>/</span>
            <span className="truncate">{isBn ? breadcrumbs.sectionBn : breadcrumbs.sectionEn}</span>
          </div>
          <h1 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-tight truncate leading-tight mt-0.5">
            {isBn ? breadcrumbs.titleBn : breadcrumbs.titleEn}
          </h1>
        </div>
      </div>

      {/* 2. Center/Right: Quick Search Bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'শব্দ বা প্রশ্ন খুঁজুন... (Ctrl+K)' : 'Search vocab, lessons... (Ctrl+K)'}
            className="w-full bg-[#111723] border border-[#1e293b] focus:border-emerald-500/60 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X size={13} />
            </button>
          )}
        </form>
      </div>

      {/* 3. Right Action Tools */}
      <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2a] transition-all"
          title="Search"
        >
          <Search size={18} />
        </button>

        {/* Daily Streak Flame Counter */}
        <button
          onClick={onOpenStreakModal || (() => {
            alert(isBn 
              ? `🔥 আপনার সক্রিয় স্ট্রিক: ${streakCount} দিন!\nপ্রতিদিন MCQ পরীক্ষা দিলে স্ট্রিক বজায় থাকবে।` 
              : `🔥 Your Active Streak: ${streakCount} Days!\nKeep practicing daily to build your retention streak.`
            );
          })}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#18131e] border border-orange-500/30 hover:border-orange-500/60 text-orange-400 font-bold text-xs shadow-sm hover:scale-105 transition-all cursor-pointer group"
          title={isBn ? `স্ট্রিক: ${streakCount} দিন` : `Streak: ${streakCount} Days`}
        >
          <Flame size={15} className="text-orange-500 fill-orange-500 animate-flame" />
          <span>{streakCount}</span>
          <span className="hidden sm:inline text-[10px] text-orange-400/80 font-normal">
            {isBn ? 'দিন' : 'd'}
          </span>
        </button>

        {/* Language Switcher Button */}
        <button
          onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#111723] border border-[#1e293b] hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          title={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
        >
          <Languages size={14} className="text-emerald-400" />
          <span>{lang === 'bn' ? 'বাং' : 'EN'}</span>
        </button>

        {/* Master Admin Portal Toggle */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => {
              if (typeof navigate === 'function') {
                navigate(isAdminActive ? '/dashboard' : '/admin');
              } else if (onOpenAdmin) {
                onOpenAdmin();
              }
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              isAdminActive
                ? 'bg-purple-600 border-purple-400 text-white shadow-purple-950/60'
                : 'bg-[#181326] border-purple-500/30 text-purple-300 hover:border-purple-500/60 hover:text-white'
            }`}
            title="Toggle Admin Control Panel"
          >
            <Shield size={14} className={isAdminActive ? 'text-white' : 'text-purple-400'} />
            <span className="hidden sm:inline">
              {isAdminActive ? (isBn ? 'অ্যাডমিন মোড' : 'Admin Active') : (isBn ? 'অ্যাডমিন' : 'Admin')}
            </span>
          </button>
        )}

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications || (() => {
            alert(isBn 
              ? '📢 নোটিফিকেশন: ১৫৬টি শব্দ এবং ৬১৩টি বোর্ড স্ট্যান্ডার্ড MCQ সম্পূর্ণ সক্রিয় আছে।' 
              : '📢 Notifications: 156 Textbook Vocabulary words and 613 Board Standard MCQs are ready for practice!'
            );
          })}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151c2a] border border-transparent hover:border-[#1e293b] transition-all cursor-pointer"
          title={isBn ? 'নোটিফিকেশন' : 'Notifications'}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        {/* User Profile Menu Dropdown */}
        {currentUser ? (
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-[#111723] hover:bg-[#161e2e] border border-[#1e293b] hover:border-emerald-500/40 transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-emerald-950/50">
                {currentUser?.name 
                  ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
                  : 'ST'}
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <span className="block text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate max-w-[100px]">
                  {currentUser?.name || 'Student'}
                </span>
                <span className="block text-[9px] text-emerald-400 font-semibold leading-none">
                  {currentUser?.points || 0} XP
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-200" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#111723] border border-[#1e293b] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User Info Header */}
                <div className="px-4 py-2.5 border-b border-[#1e293b] mb-1">
                  <span className="block text-xs font-bold text-white truncate">
                    {currentUser?.name || 'Student'}
                  </span>
                  <span className="block text-[11px] text-slate-400 truncate">
                    {currentUser?.email || currentUser?.college || 'HSC 2026 Candidate'}
                  </span>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] bg-[#0c0f17] px-2 py-1 rounded-lg border border-[#1e293b]">
                    <span className="text-slate-400">{isBn ? 'মোট পয়েন্ট' : 'Total Score'}</span>
                    <span className="text-emerald-400 font-bold">{currentUser?.points || 0} XP</span>
                  </div>
                </div>

                {/* Menu Actions */}
                <div className="px-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (onOpenProfile) onOpenProfile();
                      else if (navigate) navigate('/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#161e2e] rounded-xl transition-all"
                  >
                    <User size={15} className="text-emerald-400" />
                    <span>{isBn ? 'আমার প্রোফাইল' : 'My Profile'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (navigate) navigate('/notes');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#161e2e] rounded-xl transition-all"
                  >
                    <FileText size={15} className="text-cyan-400" />
                    <span>{isBn ? 'ব্যক্তিগত নোটস' : 'Study Notes'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (navigate) navigate('/certificates');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#161e2e] rounded-xl transition-all"
                  >
                    <Award size={15} className="text-yellow-400" />
                    <span>{isBn ? 'সার্টিফিকেট' : 'Certificates'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (navigate) navigate('/settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#161e2e] rounded-xl transition-all"
                  >
                    <Settings size={15} className="text-slate-400" />
                    <span>{isBn ? 'অ্যাকাউন্ট সেটিংস' : 'Account Settings'}</span>
                  </button>

                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        if (navigate) navigate('/admin');
                        else if (onOpenAdmin) onOpenAdmin();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-purple-300 hover:text-white hover:bg-purple-950/40 rounded-xl transition-all border border-purple-500/20 my-1"
                    >
                      <Shield size={15} className="text-purple-400" />
                      <span>{isBn ? 'মাস্টার অ্যাডমিন পোর্টাল' : 'Master Admin Portal'}</span>
                    </button>
                  )}

                  <div className="pt-1 border-t border-[#1e293b] mt-1">
                    {onLogout && (
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-all"
                      >
                        <LogOut size={15} />
                        <span>{isBn ? 'লগআউট করুন' : 'Log Out'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Mobile Search Modal/Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 p-3 bg-[#0c0f17] border-b border-[#1e293b] shadow-2xl md:hidden z-40">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'ভোকাবুলারি বা লেসন খুঁজুন...' : 'Search vocabulary, lessons...'}
              className="w-full bg-[#111723] border border-emerald-500/50 rounded-xl pl-9 pr-9 py-2 text-xs text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
