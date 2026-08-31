import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  GraduationCap,
  BookOpen,
  Layers,
  Zap,
  AlertTriangle,
  Award,
  FileText,
  Settings as SettingsIcon,
  Info,
  Shield,
  Users,
  TrendingUp,
  Activity,
  Sliders,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  Download,
  Search,
  Volume2,
  Sparkles,
  RefreshCw,
  Clock,
  Send,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
  Bookmark
} from 'lucide-react';

// Navigation Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';

// Core Feature Views & Modals
import ActionCards from './components/ActionCards';
import SubjectReport from './components/SubjectReport';
import RecentExams from './components/RecentExams';
import QuickPracticeModal from './components/QuickPracticeModal';
import QuestionBankModal from './components/QuestionBankModal';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/admin/AdminDashboard';
import HSCUnitsExplorer from './components/HSCUnitsExplorer';
import UnitLessonExamModal from './components/UnitLessonExamModal';
import FlashcardsExplorer from './components/FlashcardsExplorer';
import WeakWordsSection from './components/WeakWordsSection';
import UserProfileModal from './components/UserProfileModal';
import LandingPage from './components/LandingPage';
import VocabularyBank from './components/VocabularyBank';
import CertificateModal from './components/CertificateModal';
import StreakWidget from './components/StreakWidget';
import DailyPointsChart from './components/DailyPointsChart';

// Milestone 2 & 3 Dedicated Page Views & FAB
import ProgressPage from './components/pages/ProgressPage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import TextbookPage from './components/pages/TextbookPage';
import CertificatesPage from './components/pages/CertificatesPage';
import NotesPage from './components/pages/NotesPage';
import SettingsPage from './components/pages/SettingsPage';
import AboutPage from './components/pages/AboutPage';
import QuickNoteFAB from './components/pages/QuickNoteFAB';

// Data Layers
import { usersList } from './data/users';
import { hscQuestionsList, hscVocabularyList } from './data/questions';
import { hscUnits } from './data/hscUnitsData';

// Services & Analytics
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { 
  saveUserToFirestore, 
  listenToFirestoreUsers 
} from './services/firebase';

// Canonical Route Constants for all 20+ Routes
export const ROUTES = {
  // Public
  LANDING: '/',
  ABOUT: '/about',
  AUTH: '/auth',

  // Student Zone
  DASHBOARD: '/dashboard',
  UNITS: '/units',
  VOCABULARY: '/vocabulary',
  VOCABULARY_BANK: '/vocabulary-bank',
  FLASHCARDS: '/flashcards',
  PRACTICE: '/practice',
  EXAM: '/exam',
  EXAMS: '/exams',
  WEAK_WORDS: '/weak-words',
  TEXTBOOK: '/textbook',
  PROGRESS: '/progress',
  LEADERBOARD: '/leaderboard',
  NOTES: '/notes',
  CERTIFICATES: '/certificates',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  HISTORY: '/history',

  // Admin Zone
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_QUESTIONS: '/admin/questions',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings'
};

// Route Normalization Helper
const normalizePath = (rawPath) => {
  if (!rawPath) return '/';
  const clean = rawPath.trim().toLowerCase().replace(/\/+$/, '') || '/';
  if (clean === '/home') return '/dashboard';
  if (clean === '/vocab' || clean === '/vocabulary') return '/vocabulary-bank';
  if (clean === '/exams') return '/exam';
  if (clean === '/admin-panel') return '/admin';
  if (clean === '/admin/quiz-settings') return '/admin/settings';
  return clean;
};

export default function App() {
  // 1. Unified Browser History Routing State
  const [currentPath, setCurrentPathState] = useState(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'bn'
  const isBn = lang === 'bn';

  // Access Alert Toast state for Admin Guard
  const [accessAlert, setAccessAlert] = useState('');

  // 2. Authentication State with Persistent Local Storage & Firestore
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [pendingRedirect, setPendingRedirect] = useState(null);

  // 3. Admin Registered Users State & Firestore Realtime Sync
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return usersList;
  });

  useEffect(() => {
    const unsubscribe = listenToFirestoreUsers((cloudUsers) => {
      if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        setUsers((prev) => {
          const map = new Map();
          usersList.forEach((u) => map.set(u.email?.toLowerCase(), u));
          prev.forEach((u) => map.set(u.email?.toLowerCase(), u));
          cloudUsers.forEach((u) => map.set(u.email?.toLowerCase(), u));
          const merged = Array.from(map.values());
          try {
            localStorage.setItem('hsc_registered_users', JSON.stringify(merged));
          } catch (e) {}
          return merged;
        });
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleUpdateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    try {
      localStorage.setItem('hsc_registered_users', JSON.stringify(updatedUsers));
      if (Array.isArray(updatedUsers)) {
        updatedUsers.forEach((u) => {
          if (u && u.email) saveUserToFirestore(u);
        });
      }
    } catch (e) {}
  };

  const handleUpdateProfile = (updatedProfile) => {
    if (!updatedProfile) return;
    setCurrentUser(updatedProfile);
    try {
      localStorage.setItem('hsc_auth_user', JSON.stringify(updatedProfile));
      saveUserToFirestore(updatedProfile);
      setUsers((prev) => {
        const next = prev.map((u) => 
          (u.email && u.email.toLowerCase() === updatedProfile.email?.toLowerCase()) || (u.id === updatedProfile.id)
            ? { ...u, ...updatedProfile }
            : u
        );
        try {
          localStorage.setItem('hsc_registered_users', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
    } catch (e) {
      console.warn('Profile update error:', e);
    }
  };

  const [questions, setQuestions] = useState(hscQuestionsList);

  // 4. Weak Words Realtime Sync
  const [weakWords, setWeakWords] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_weak_words');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.filter((w) => w && w.word);
      }
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    const handleWeakWordsSync = () => {
      try {
        const saved = localStorage.getItem('hsc_weak_words');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setWeakWords(parsed.filter((w) => w && w.word));
        } else {
          setWeakWords([]);
        }
      } catch (e) {}
    };

    window.addEventListener('hsc_weak_words_updated', handleWeakWordsSync);
    window.addEventListener('storage', handleWeakWordsSync);
    return () => {
      window.removeEventListener('hsc_weak_words_updated', handleWeakWordsSync);
      window.removeEventListener('storage', handleWeakWordsSync);
    };
  }, []);

  const handleToggleWeakWord = (wordItem) => {
    setWeakWords((prev) => {
      const exists = prev.some((w) => (w.id && w.id === wordItem.id) || (w.word && w.word === wordItem.word));
      let updated;
      if (exists) {
        updated = prev.filter((w) => w.id !== wordItem.id && w.word !== wordItem.word);
      } else {
        updated = [...prev, wordItem];
      }
      try {
        localStorage.setItem('hsc_weak_words', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('hsc_weak_words_updated'));
      } catch (e) {}
      return updated;
    });
  };

  const handleRemoveWeakWord = (wordItem) => {
    setWeakWords((prev) => {
      const updated = prev.filter((w) => w.id !== wordItem.id && w.word !== wordItem.word);
      try {
        localStorage.setItem('hsc_weak_words', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('hsc_weak_words_updated'));
      } catch (e) {}
      return updated;
    });
  };

  // Modals state
  const [isQuickPracticeOpen, setIsQuickPracticeOpen] = useState(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const [isUnitLessonModalOpen, setIsUnitLessonModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [selectedExamUnit, setSelectedExamUnit] = useState(null);
  const [selectedExamLesson, setSelectedExamLesson] = useState(null);

  // 5. Global Router Navigation Engine with Auth and Admin Guards
  const navigate = useCallback((toPath, replace = false) => {
    const target = normalizePath(toPath);

    // Guard 1: Public Routes (/ and /about and /auth)
    const isPublic = target === '/' || target === '/about' || target === '/auth';

    // Guard 2: Unauthenticated User attempting Protected Route
    if (!currentUser && !isPublic) {
      setPendingRedirect(target);
      setIsAuthOpen(true);
      if (typeof window !== 'undefined') {
        window.history.pushState({ path: '/' }, '', '/');
      }
      setCurrentPathState('/');
      return;
    }

    // Guard 3: Student User attempting Admin Route
    if (target.startsWith('/admin') && currentUser?.role !== 'admin') {
      setAccessAlert(isBn ? '❌ অ্যাক্সেস সংরক্ষিত: কেবল মাস্টার অ্যাডমিন প্রবেশ করতে পারবেন।' : '❌ Access Denied: Master Admin privileges required.');
      setTimeout(() => setAccessAlert(''), 5000);
      if (typeof window !== 'undefined') {
        window.history.pushState({ path: '/dashboard' }, '', '/dashboard');
      }
      setCurrentPathState('/dashboard');
      return;
    }

    // Direct URL navigation state push
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({ path: target }, '', target);
      } else if (window.location.pathname !== target) {
        window.history.pushState({ path: target }, '', target);
      }
    }
    setCurrentPathState(target);
  }, [currentUser, isBn]);

  // Sync with browser Back and Forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      const target = normalizePath(window.location.pathname);
      const isPublic = target === '/' || target === '/about' || target === '/auth';

      if (!currentUser && !isPublic) {
        setIsAuthOpen(true);
        setCurrentPathState('/');
        window.history.replaceState({ path: '/' }, '', '/');
      } else if (target.startsWith('/admin') && currentUser?.role !== 'admin') {
        setAccessAlert(isBn ? '❌ অ্যাক্সেস সংরক্ষিত: কেবল মাস্টার অ্যাডমিন প্রবেশ করতে পারবেন।' : '❌ Access Denied: Master Admin privileges required.');
        setCurrentPathState('/dashboard');
        window.history.replaceState({ path: '/dashboard' }, '', '/dashboard');
      } else {
        setCurrentPathState(target);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentUser, isBn]);

  // Auth Success Handler
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('hsc_auth_user', JSON.stringify(user));
    } catch (e) {}
    setIsAuthOpen(false);

    // Redirect to pending route or default dashboard
    const dest = pendingRedirect || (user.role === 'admin' ? '/admin' : '/dashboard');
    setPendingRedirect(null);
    navigate(dest, true);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Tanvir Ahmed',
      college: 'Notre Dame College, Dhaka',
      batch: 'HSC 2026',
      email: 'tanvir.demo@hsc2026.edu',
      role: 'student',
      points: 120,
      streak: 5
    };
    handleAuthSuccess(demoUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('hsc_auth_user');
    } catch (e) {}
    navigate('/', true);
  };

  // Map route to active tab id for sidebar/header compatibility
  const activeTab = useMemo(() => {
    if (currentPath === '/dashboard') return 'dashboard';
    if (currentPath === '/units') return 'units';
    if (currentPath === '/vocabulary-bank' || currentPath === '/vocabulary') return 'vocab_bank';
    if (currentPath === '/flashcards') return 'flashcards';
    if (currentPath === '/practice') return 'practice';
    if (currentPath === '/exam' || currentPath === '/exams') return 'exams';
    if (currentPath === '/weak-words') return 'weak-words';
    if (currentPath === '/textbook') return 'textbook';
    if (currentPath === '/progress') return 'progress';
    if (currentPath === '/leaderboard') return 'leaderboard';
    if (currentPath === '/notes') return 'notes';
    if (currentPath === '/certificates') return 'certificates';
    if (currentPath === '/settings') return 'settings';
    if (currentPath === '/profile') return 'profile';
    if (currentPath === '/history') return 'history';
    if (currentPath === '/about') return 'about';
    if (currentPath.startsWith('/admin')) return 'admin';
    return 'dashboard';
  }, [currentPath]);

  // If user is unauthenticated and on public route (Landing or Auth)
  if (!currentUser && (currentPath === '/' || currentPath === '/auth')) {
    return (
      <div className="bg-[#0a0d14] text-slate-100 min-h-screen">
        <LandingPage
          onOpenAuth={(isSignUp = true) => {
            setIsSignUpMode(isSignUp);
            setIsAuthOpen(true);
          }}
          onDirectLogin={handleDemoLogin}
          lang={lang}
          setLang={setLang}
          onNavigateAbout={() => navigate('/about')}
        />

        <AuthModal
          isOpen={isAuthOpen || currentPath === '/auth'}
          onClose={() => {
            setIsAuthOpen(false);
            if (currentPath === '/auth') navigate('/');
          }}
          lang={lang}
          isSignUpDefault={isSignUpMode}
          onAuthSuccess={handleAuthSuccess}
          registeredUsers={users}
          onUpdateUsers={handleUpdateUsers}
        />
        <Analytics />
      </div>
    );
  }

  // If user is unauthenticated and visiting /about directly
  if (!currentUser && currentPath === '/about') {
    return (
      <div className="bg-[#0c0f17] text-slate-100 min-h-screen p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-[#2b3b59] text-slate-200 text-xs font-bold transition-all"
            >
              ← {isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}
            </button>
            <button
              onClick={() => {
                setIsSignUpMode(false);
                setIsAuthOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
            >
              {isBn ? 'লগইন করুন' : 'Sign In'}
            </button>
          </div>

          <AboutPage lang={lang} onNavigate={navigate} currentUser={currentUser} />

          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            lang={lang}
            isSignUpDefault={isSignUpMode}
            onAuthSuccess={handleAuthSuccess}
            registeredUsers={users}
            onUpdateUsers={handleUpdateUsers}
          />
          <Analytics />
        </div>
      </div>
    );
  }

  // Authenticated Student & Admin App Shell
  return (
    <div className="flex h-screen bg-[#0c0f17] text-slate-100 font-bengali overflow-hidden select-none">
      {/* Access Denied Alert Toast */}
      {accessAlert && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-2xl bg-rose-950/95 border border-rose-500/50 text-rose-200 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200 flex items-center gap-3">
          <AlertTriangle size={18} className="text-rose-400 shrink-0" />
          <span>{accessAlert}</span>
        </div>
      )}

      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        activeTab={activeTab}
        navigate={navigate}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        lang={lang}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsUserProfileOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        weakWordsCount={weakWords.length}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 2. Top Header Navigation */}
        <Header
          currentPath={currentPath}
          activeTabTitle={activeTab}
          navigate={navigate}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          lang={lang}
          setLang={setLang}
          streakCount={currentUser?.streak || 0}
          isAdminActive={currentPath.startsWith('/admin')}
          onOpenAdmin={() => navigate(currentPath.startsWith('/admin') ? '/dashboard' : '/admin')}
          onOpenNotifications={() => alert(isBn ? '১৫৬টি শব্দ এবং ৬১৩টি বোর্ড স্ট্যান্ডার্ড MCQ অনুশীলনের জন্য প্রস্তুত!' : '156 Vocabulary words and 613 Board Standard MCQs are ready!')}
          onOpenStreakModal={() => alert(isBn ? `আপনার স্ট্রিক: ${currentUser?.streak || 0} দিন। প্রতিদিন পরীক্ষা দিয়ে স্ট্রিক ধরে রাখুন!` : `Your streak: ${currentUser?.streak || 0} days. Practice daily to build your streak!`)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenProfile={() => setIsUserProfileOpen(true)}
        />

        {/* 3. Main View Dispatcher */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-6 lg:p-7 pb-24 lg:pb-7 space-y-6">
          {/* Route: /dashboard */}
          {currentPath === '/dashboard' && (
            <div className="max-w-[1550px] mx-auto space-y-6">
              {/* Contextual Smart Card: Resume Learning */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#141b2c] via-[#111726] to-[#0c101a] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-950/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-extrabold text-sm sm:text-base">
                        {isBn ? 'পড়াশোনা চালিয়ে যান: Unit 1 • The Parrot\'s Tale' : 'Resume Learning: Unit 1 • The Parrot\'s Tale'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        NCTB 2026
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBn ? '৪৬টি শব্দ • ১৮৪টি বোর্ড MCQ • তোতাকাহিনী (রবীন্দ্রনাথ ঠাকুর)' : '46 Words • 184 Board MCQs • Interactive Passage & Active Recall'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => navigate('/textbook')}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#1a2233] hover:bg-[#222e44] border border-[#2b3952] text-slate-200 hover:text-white text-xs font-bold transition-all active:scale-95 text-center"
                  >
                    {isBn ? '📖 পাঠ্যবই পড়ুন' : '📖 Read Passage'}
                  </button>
                  <button
                    onClick={() => setIsUnitLessonModalOpen(true)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{isBn ? '▶ পরীক্ষা দিন' : '▶ Start Exam'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* 4 Feature Action Cards */}
              <ActionCards
                lang={lang}
                onOpenVocabBank={() => navigate('/vocabulary-bank')}
                onOpenFlashcards={() => navigate('/flashcards')}
                onOpenQuickPractice={() => setIsQuickPracticeOpen(true)}
                onOpenMockExam={() => setIsUnitLessonModalOpen(true)}
              />

              {/* Main Content Grid: 8 cols left + 4 cols right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-6">
                  {/* Subject Report & Recent Exams */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SubjectReport
                      lang={lang}
                      onOpenAllSubjects={() => navigate('/units')}
                      onSelectLesson={(lesson, unit) => {
                        setSelectedExamUnit(unit);
                        setSelectedExamLesson(lesson);
                        setIsUnitLessonModalOpen(true);
                      }}
                    />

                    <RecentExams
                      lang={lang}
                      onOpenAllExams={() => setIsUnitLessonModalOpen(true)}
                      onStartExam={() => setIsUnitLessonModalOpen(true)}
                    />
                  </div>

                  {/* Daily Points Chart */}
                  <DailyPointsChart lang={lang} />
                </div>

                <div className="lg:col-span-4 space-y-6">
                  {/* Streak Widget */}
                  <StreakWidget lang={lang} streakCount={currentUser?.streak || 0} />

                  {/* How to Learn Step Card */}
                  <div className="bg-[#111723] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-card">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap size={18} className="text-emerald-400" />
                      <h3 className="text-white font-bold text-sm">
                        {isBn ? 'কীভাবে শিখবেন?' : 'How to Learn?'}
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                      {[
                        { step: '1', text: isBn ? 'ইউনিট ও লেসন নির্বাচন করুন' : 'Select a Unit & Lesson', color: 'bg-emerald-500' },
                        { step: '2', text: isBn ? '"📖 পাঠ্যবই পড়ুন" এ ক্লিক করে গল্পটি বুঝুন' : 'Read the NCTB passage text', color: 'bg-blue-500' },
                        { step: '3', text: isBn ? 'MCQ পরীক্ষা শুরু করুন — ভুল হলে ৩ বার রিপিট হবে' : 'Start MCQ exam — spaced repetition active', color: 'bg-violet-500' },
                        { step: '4', text: isBn ? 'টানা ৩ বার সঠিক উত্তর দিলে Done হবে' : 'Answer 3 consecutive times correctly for Done', color: 'bg-amber-500' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full ${item.color} text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5`}>
                            {item.step}
                          </span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsUnitLessonModalOpen(true)}
                      className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all active:scale-95 shadow-md shadow-emerald-950/40"
                    >
                      {isBn ? '▶ এখনই পরীক্ষা শুরু করুন' : '▶ Start Exam Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Route: /units */}
          {currentPath === '/units' && (
            <div className="max-w-6xl mx-auto">
              <HSCUnitsExplorer lang={lang} />
            </div>
          )}

          {/* Route: /vocabulary-bank or /vocabulary */}
          {(currentPath === '/vocabulary-bank' || currentPath === '/vocabulary') && (
            <div className="max-w-6xl mx-auto">
              <VocabularyBank
                lang={lang}
                onStartExam={() => navigate('/exam')}
                onOpenFlashcards={() => navigate('/flashcards')}
                weakWords={weakWords}
                onToggleWeakWord={handleToggleWeakWord}
                navigate={navigate}
              />
            </div>
          )}

          {/* Route: /flashcards */}
          {currentPath === '/flashcards' && (
            <div className="max-w-4xl mx-auto">
              <FlashcardsExplorer
                lang={lang}
                weakWords={weakWords}
                onToggleWeakWord={handleToggleWeakWord}
                onStartExamFromCards={() => navigate('/exam')}
              />
            </div>
          )}

          {/* Route: /practice */}
          {currentPath === '/practice' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-card">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 mx-auto">
                  <Zap size={28} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isBn ? 'দ্রুত MCQ অনুশীলন (Quick Practice)' : 'Quick MCQ Practice Session'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  {isBn 
                    ? 'যেকোনো ইউনিট থেকে নির্বাচিত ১০টি বোর্ড স্ট্যান্ডার্ড MCQ প্রশ্ন দিয়ে নিজের দক্ষতা যাচাই করুন।'
                    : 'Test your vocabulary and board readiness with 10 random interleaved questions across all active units.'}
                </p>
                <button
                  onClick={() => setIsQuickPracticeOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-teal-950/50 active:scale-95 transition-all"
                >
                  {isBn ? '▶ ১০টি প্রশ্নের কুইজ শুরু করুন' : '▶ Launch 10-Question Quiz'}
                </button>
              </div>
            </div>
          )}

          {/* Route: /exam or /exams */}
          {(currentPath === '/exam' || currentPath === '/exams') && (
            <div className="max-w-6xl mx-auto">
              <HSCUnitsExplorer lang={lang} />
            </div>
          )}

          {/* Route: /weak-words */}
          {currentPath === '/weak-words' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <WeakWordsSection
                weakWords={weakWords}
                onRemoveWeakWord={handleRemoveWeakWord}
                onOpenFlashcards={() => navigate('/flashcards')}
                lang={lang}
              />
            </div>
          )}

          {/* Route: /textbook (Interactive NCTB Passage Reader) */}
          {currentPath === '/textbook' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <TextbookPage
                lang={lang}
                onStartExam={(unitId, lessonId) => {
                  const targetUnit = hscUnits.find(u => u.id === unitId) || hscUnits[0];
                  const targetLesson = targetUnit?.lessons?.find(l => l.id === lessonId) || targetUnit?.lessons?.[0];
                  setSelectedExamUnit(targetUnit);
                  setSelectedExamLesson(targetLesson);
                  setIsUnitLessonModalOpen(true);
                }}
                onNavigate={navigate}
              />
            </div>
          )}

          {/* Route: /progress */}
          {currentPath === '/progress' && (
            <ProgressPage
              lang={lang}
              currentUser={currentUser}
              weakWords={weakWords}
              navigate={navigate}
              onStartExam={(unit) => {
                setSelectedExamUnit(unit);
                setIsUnitLessonModalOpen(true);
              }}
            />
          )}

          {/* Route: /leaderboard */}
          {currentPath === '/leaderboard' && (
            <LeaderboardPage
              lang={lang}
              currentUser={currentUser}
              registeredUsers={users}
              navigate={navigate}
            />
          )}

          {/* Route: /notes */}
          {currentPath === '/notes' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <NotesPage lang={lang} onNavigate={navigate} />
            </div>
          )}

          {/* Route: /certificates */}
          {currentPath === '/certificates' && (
            <CertificatesPage
              lang={lang}
              currentUser={currentUser}
              navigate={navigate}
              onStartExam={(unit) => {
                setSelectedExamUnit(unit);
                setIsUnitLessonModalOpen(true);
              }}
            />
          )}

          {/* Route: /settings */}
          {currentPath === '/settings' && (
            <SettingsPage
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
              lang={lang}
              onToggleLang={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              onLogout={handleLogout}
              onNavigate={navigate}
            />
          )}

          {/* Route: /about */}
          {currentPath === '/about' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <AboutPage
                lang={lang}
                onNavigate={navigate}
                currentUser={currentUser}
              />
            </div>
          )}

          {/* Route: /history */}
          {currentPath === '/history' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <RecentExams
                lang={lang}
                onOpenAllExams={() => setIsUnitLessonModalOpen(true)}
                onStartExam={() => setIsUnitLessonModalOpen(true)}
              />
            </div>
          )}

          {/* Route: /profile */}
          {currentPath === '/profile' && (
            <div className="max-w-3xl mx-auto">
              <UserProfileModal
                isOpen={true}
                onClose={() => navigate('/dashboard')}
                lang={lang}
                weakWords={weakWords}
                onRemoveWeakWord={handleRemoveWeakWord}
                currentUser={currentUser}
                onUpdateProfile={handleUpdateProfile}
                onOpenAuth={() => setIsAuthOpen(true)}
                onOpenFlashcards={() => navigate('/flashcards')}
              />
            </div>
          )}

          {/* Route: /admin and /admin/* Sub-routes */}
          {currentPath.startsWith('/admin') && (
            currentUser?.role === 'admin' ? (
              <AdminDashboard
                key={currentPath}
                users={users}
                setUsers={setUsers}
                questions={questions}
                setQuestions={setQuestions}
                onExitAdmin={() => navigate('/dashboard')}
                currentPath={currentPath}
                navigate={navigate}
                lang={lang}
              />
            ) : (
              <div className="p-8 text-center bg-[#111723] border border-[#1e293b] rounded-3xl space-y-4 max-w-md mx-auto my-12 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
                  <Shield size={28} />
                </div>
                <h3 className="text-lg font-bold text-white">Access Denied (অ্যাক্সেস সংরক্ষিত)</h3>
                <p className="text-xs text-slate-400">This section is restricted to Master Administrators only.</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  Return to Dashboard
                </button>
              </div>
            )
          )}
        </main>

        {/* 4. Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          currentPath={currentPath}
          activeTab={activeTab}
          navigate={navigate}
          lang={lang}
          onOpenMenu={() => setSidebarOpen(true)}
        />
      </div>

      {/* 5. Globally Mounted QuickNote Floating Action Button for Students */}
      {currentUser && (
        <QuickNoteFAB lang={lang} onNavigate={navigate} />
      )}

      {/* 6. Global Interactive Modals */}
      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        lang={lang}
        weakWords={weakWords}
        onRemoveWeakWord={handleRemoveWeakWord}
        currentUser={currentUser}
        onUpdateProfile={handleUpdateProfile}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenFlashcards={() => {
          setIsUserProfileOpen(false);
          navigate('/flashcards');
        }}
      />

      <UnitLessonExamModal
        isOpen={isUnitLessonModalOpen}
        onClose={() => {
          setIsUnitLessonModalOpen(false);
          setSelectedExamLesson(null);
        }}
        initialUnit={selectedExamUnit}
        initialLesson={selectedExamLesson}
        lang={lang}
      />

      <QuickPracticeModal
        isOpen={isQuickPracticeOpen}
        onClose={() => setIsQuickPracticeOpen(false)}
        lang={lang}
        dynamicQuestions={questions}
      />

      <QuestionBankModal
        isOpen={isQuestionBankOpen}
        onClose={() => setIsQuestionBankOpen(false)}
        lang={lang}
        onSelectUnit={(unit) => {
          setSelectedExamUnit(unit);
          setSelectedExamLesson(null);
          setIsUnitLessonModalOpen(true);
        }}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        studentName={currentUser?.name || 'Tanvir Ahmed'}
        collegeName={currentUser?.college || 'Notre Dame College, Dhaka'}
        lang={lang}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
        isSignUpDefault={isSignUpMode}
        onAuthSuccess={handleAuthSuccess}
        registeredUsers={users}
        onUpdateUsers={handleUpdateUsers}
      />

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
