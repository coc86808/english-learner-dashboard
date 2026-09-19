import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
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
import DailyGoalQuickAction from './components/DailyGoalQuickAction';

// Milestone 2 & 3 Dedicated Page Views
import ProgressPage from './components/pages/ProgressPage';
import LeaderboardPage from './components/pages/LeaderboardPage';
import TextbookPage from './components/pages/TextbookPage';
import CertificatesPage from './components/pages/CertificatesPage';
import SettingsPage from './components/pages/SettingsPage';
import AboutPage from './components/pages/AboutPage';
import TermsPage from './components/pages/TermsPage';

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
import { 
  syncUserProfileToPostgres, 
  syncWeakWordToPostgres, 
  fetchWeakWordsFromPostgres 
} from './services/supabase';

// Canonical Route Constants for all 20+ Routes
export const ROUTES = {
  // Public
  LANDING: '/',
  ABOUT: '/about',
  TERMS: '/terms',
  REFUND: '/refund',
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
  const clean = rawPath.trim().replace(/\/+$/, '') || '/';
  const lower = clean.toLowerCase();
  if (lower === '/home' || lower === '/notes') return '/dashboard';
  if (lower === '/vocab' || lower === '/vocabulary') return '/vocabulary-bank';
  if (lower === '/exams') return '/exam';
  if (lower.startsWith('/exams/')) return `/exam/${clean.slice(7)}`;
  if (lower === '/admin-panel') return '/admin';
  if (lower === '/admin/quiz-settings') return '/admin/settings';
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

  // ─── STRICT WHITELIST ────────────────────────────────────────────────────────
  // Only these 3 real people may exist on the website. Every other account —
  // no matter where it came from (localStorage, Firestore, Supabase) — is
  // permanently removed on every app load.
  const isRealAccount = (u) => {
    if (!u) return false;
    const uName  = String(u.name  || '').toLowerCase().trim();
    const uEmail = String(u.email || '').toLowerCase().trim();
    const uRole  = String(u.role  || '').toLowerCase();

    // Blacklist: Instantly drop any account matching known fake/AI generated student profiles
    const FAKE_PATTERNS = [
      'tanvir', 'sadia', 'nafis', 'mehedi', 'fariha', 'zubair',
      'abrar', 'tasnim', 'samiul', 'ishrat', 'candidate', 'guest'
    ];
    if (FAKE_PATTERNS.some((p) => uName.includes(p) || uEmail.includes(p))) {
      return false;
    }

    // Admin: Sakin only
    if (uRole === 'admin') {
      return uName.includes('sakin') || uEmail.includes('sakin') || uEmail === 'admin@learnerhub.com' || uEmail === 'admin';
    }

    // Students: ONLY Mohammad Nasim, Riad Sarkar, or Sakin
    const isNasim = uName.includes('nasim') || uEmail === 'learnermcq@gmail.com' || uEmail === 'mohammad.nasim@gmail.com';
    const isRiad  = uName.includes('riad')  || uEmail === 'sarkarriad92@gmail.com' || uEmail === 'riad.sarkar@gmail.com';
    const isSakin = uName.includes('sakin') || uEmail.includes('sakin');

    return isNasim || isRiad || isSakin;
  };

  /** Purge every non-whitelisted account from localStorage right now */
  const purgeNonRealAccounts = () => {
    try {
      // 1. Clean registered users
      const raw = localStorage.getItem('hsc_registered_users');
      if (raw) {
        const all = JSON.parse(raw);
        if (Array.isArray(all)) {
          const kept = all.filter(isRealAccount);
          localStorage.setItem('hsc_registered_users', JSON.stringify(kept));
        }
      }
      // 2. Clean current authenticated user if fake
      const rawAuth = localStorage.getItem('hsc_auth_user');
      if (rawAuth) {
        const authUser = JSON.parse(rawAuth);
        if (!isRealAccount(authUser)) {
          localStorage.removeItem('hsc_auth_user');
        }
      }
      return null;
    } catch (e) { return null; }
  };

  // 3. Admin Registered Users State & Firestore Realtime Sync
  const [users, setUsers] = useState(() => {
    purgeNonRealAccounts();
    try {
      const saved = localStorage.getItem('hsc_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.filter(isRealAccount);
      }
    } catch (e) {}
    return usersList;
  });

  useEffect(() => {
    // Run purge again on mount (catches cached data from previous sessions)
    const purged = purgeNonRealAccounts();
    if (purged) setUsers(purged.length > 0 ? purged : usersList);

    const unsubscribe = listenToFirestoreUsers((cloudUsers) => {
      if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        setUsers((prev) => {
          const map = new Map();
          // Only keep whitelisted entries from all sources
          [...usersList, ...prev, ...cloudUsers].forEach((u) => {
            if (isRealAccount(u)) {
              map.set((u.email || u.id || '').toLowerCase(), u);
            }
          });
          const merged = Array.from(map.values());
          try { localStorage.setItem('hsc_registered_users', JSON.stringify(merged)); } catch (e) {}
          return merged;
        });
      }
    });
    const handleUserStatsSync = (e) => {
      if (e && e.detail) {
        setCurrentUser(e.detail);
      } else {
        try {
          const saved = localStorage.getItem('hsc_auth_user');
          if (saved) setCurrentUser(JSON.parse(saved));
        } catch (err) {}
      }
    };
    window.addEventListener('hsc_user_stats_updated', handleUserStatsSync);
    window.addEventListener('storage', handleUserStatsSync);

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      window.removeEventListener('hsc_user_stats_updated', handleUserStatsSync);
      window.removeEventListener('storage', handleUserStatsSync);
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

  // Sync currentUser to PostgreSQL whenever points, streak, or user changes
  useEffect(() => {
    if (currentUser?.email) {
      syncUserProfileToPostgres(currentUser);
      fetchWeakWordsFromPostgres(currentUser.email).then((cloudWords) => {
        if (Array.isArray(cloudWords) && cloudWords.length > 0) {
          setWeakWords((prev) => {
            const map = new Map();
            prev.forEach((w) => map.set(w.word, w));
            cloudWords.forEach((w) => map.set(w.word, {
              ...w,
              bengaliMeaning: w.bengali_meaning,
              partsOfSpeech: w.parts_of_speech,
              mistakeCount: w.mistake_count,
              correctCount: w.correct_count
            }));
            const merged = Array.from(map.values());
            try {
              localStorage.setItem('hsc_weak_words', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      });
    }
  }, [currentUser?.email, currentUser?.points, currentUser?.streak]);

  const handleToggleWeakWord = (wordItem) => {
    setWeakWords((prev) => {
      const exists = prev.some((w) => (w.id && w.id === wordItem.id) || (w.word && w.word === wordItem.word));
      let updated;
      if (exists) {
        updated = prev.filter((w) => w.id !== wordItem.id && w.word !== wordItem.word);
        if (currentUser?.email) {
          syncWeakWordToPostgres(currentUser.email, { ...wordItem, isWeak: false });
        }
      } else {
        updated = [...prev, wordItem];
        if (currentUser?.email) {
          syncWeakWordToPostgres(currentUser.email, { ...wordItem, isWeak: true });
        }
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
      if (currentUser?.email) {
        syncWeakWordToPostgres(currentUser.email, { ...wordItem, isWeak: false });
      }
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

    // Guard 1: Public Routes (/ and /about and /terms and /refund and /auth)
    const isPublic = target === '/' || target === '/about' || target === '/terms' || target === '/refund' || target === '/auth';

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
      const isPublic = target === '/' || target === '/about' || target === '/terms' || target === '/refund' || target === '/auth';

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
      name: 'HSC Candidate',
      college: 'Notre Dame College, Dhaka',
      batch: 'HSC 2026',
      email: 'candidate.demo@hsc2026.edu',
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
    if (currentPath.startsWith('/units') || currentPath.startsWith('/exam') || currentPath.startsWith('/exams')) return 'exams';
    if (currentPath.startsWith('/vocabulary-bank') || currentPath.startsWith('/vocabulary')) return 'vocab_bank';
    if (currentPath.startsWith('/flashcards')) return 'flashcards';
    if (currentPath.startsWith('/practice')) return 'practice';
    if (currentPath.startsWith('/weak-words')) return 'weak-words';
    if (currentPath.startsWith('/textbook')) return 'textbook';
    if (currentPath.startsWith('/progress')) return 'progress';
    if (currentPath.startsWith('/leaderboard')) return 'leaderboard';
    if (currentPath.startsWith('/certificates')) return 'certificates';
    if (currentPath.startsWith('/settings')) return 'settings';
    if (currentPath.startsWith('/profile')) return 'profile';
    if (currentPath.startsWith('/history')) return 'history';
    if (currentPath.startsWith('/about')) return 'about';
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
          onNavigateTerms={() => navigate('/terms')}
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

  // If user is unauthenticated and visiting /about or /terms or /refund directly
  if (!currentUser && (currentPath === '/about' || currentPath === '/terms' || currentPath === '/refund')) {
    return (
      <div className="bg-[#0c0f17] text-slate-100 min-h-screen p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-[#2b3b59] text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              ← {isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}
            </button>
            <button
              onClick={() => {
                setIsSignUpMode(false);
                setIsAuthOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              {isBn ? 'লগইন করুন' : 'Sign In'}
            </button>
          </div>

          {currentPath === '/about' ? (
            <AboutPage lang={lang} onNavigate={navigate} currentUser={currentUser} />
          ) : (
            <TermsPage
              lang={lang}
              onNavigate={navigate}
              initialSection={currentPath === '/refund' ? 'refund' : null}
            />
          )}

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
          onOpenNotifications={() => alert(isBn ? '৮৫৮টি পাঠ্যবই শব্দ এবং ৩,৪৩২টি বোর্ড স্ট্যান্ডার্ড MCQ অনুশীলনের জন্য প্রস্তুত!' : '858 Textbook Vocabulary words and 3,432 Board Standard MCQs are ready for practice!')}
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
              {/* 4 Feature Action Cards */}
              <ActionCards
                lang={lang}
                onOpenVocabBank={() => navigate('/vocabulary-bank')}
                onOpenFlashcards={() => navigate('/flashcards')}
                onOpenQuickPractice={() => setIsQuickPracticeOpen(true)}
                onOpenMockExam={() => navigate('/exam')}
                onNavigate={navigate}
              />

              {/* Main Content Grid: 8 cols left + 4 cols right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-6">
                  {/* Subject Report & Recent Exams */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SubjectReport
                      lang={lang}
                      onOpenAllSubjects={() => navigate('/exam')}
                      onSelectLesson={(lesson, unit) => {
                        setSelectedExamUnit(unit);
                        setSelectedExamLesson(lesson);
                        setIsUnitLessonModalOpen(true);
                      }}
                    />

                    <RecentExams
                      lang={lang}
                      onOpenAllExams={() => navigate('/exam')}
                      onStartExam={() => navigate('/exam')}
                    />
                  </div>

                  {/* Daily Points Chart */}
                  <DailyPointsChart lang={lang} />
                </div>

                <div className="lg:col-span-4 space-y-6">
                  {/* Streak Widget */}
                  <StreakWidget lang={lang} streakCount={currentUser?.streak || 0} />

                  {/* Daily Goal & Quick Practice Widget */}
                  <DailyGoalQuickAction
                    lang={lang}
                    currentUser={currentUser}
                    weakWords={weakWords}
                    onOpenQuickPractice={() => setIsQuickPracticeOpen(true)}
                    onOpenMockExam={() => navigate('/exam')}
                    navigate={navigate}
                  />
                </div>
              </div>

              {/* Dashboard Bottom Footer */}
              <div className="pt-6 pb-2 border-t border-[#1a2335] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>
                  © 2026 Learner Hub • NCTB HSC English Learning Platform
                </p>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <button
                    onClick={() => navigate('/about')}
                    className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {isBn ? 'আমাদের পরিচিতি (About Us)' : 'About Us'}
                  </button>
                  <span className="text-slate-700">•</span>
                  <button
                    onClick={() => navigate('/terms')}
                    className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {isBn ? 'শর্তাবলী ও নীতিমালা (Terms & Policy)' : 'Terms & Policy'}
                  </button>
                </div>
              </div>
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
                currentUser={currentUser}
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

          {/* Route: /exam or /exams or /units (Supports dynamic subpaths like /exam/UNIT-1_Education_and_Life/lesson_1) */}
          {(currentPath.startsWith('/exam') || currentPath.startsWith('/exams') || currentPath.startsWith('/units')) && (
            <div className="max-w-6xl mx-auto">
              <HSCUnitsExplorer
                lang={lang}
                currentPath={currentPath}
                navigate={navigate}
              />
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
                currentUser={currentUser}
                studentInfo={currentUser}
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

          {/* Route: /terms and /refund */}
          {(currentPath === '/terms' || currentPath === '/refund') && (
            <div className="max-w-6xl mx-auto space-y-6">
              <TermsPage
                lang={lang}
                onNavigate={navigate}
                currentUser={currentUser}
                initialSection={currentPath === '/refund' ? 'refund' : null}
              />
            </div>
          )}

          {/* Route: /certificates */}
          {currentPath === '/certificates' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <CertificatesPage
                lang={lang}
                currentUser={currentUser}
                navigate={navigate}
                onStartExam={(unit) => {
                  setSelectedExamUnit(unit);
                  setIsUnitLessonModalOpen(true);
                }}
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

      {/* 5. Global Interactive Modals */}
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
        studentName={currentUser?.name || 'HSC Examinee'}
        collegeName={currentUser?.college || ''}
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
