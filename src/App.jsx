import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ActionCards from './components/ActionCards';
import SubjectReport from './components/SubjectReport';
import RecentExams from './components/RecentExams';
import QuickPracticeModal from './components/QuickPracticeModal';
import QuestionBankModal from './components/QuestionBankModal';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/admin/AdminDashboard';
import HSCUnitsExplorer from './components/HSCUnitsExplorer';
import UnitLessonExamModal from './components/UnitLessonExamModal';
import MobileBottomNav from './components/MobileBottomNav';
import FlashcardsExplorer from './components/FlashcardsExplorer';
import WeakWordsSection from './components/WeakWordsSection';
import UserProfileModal from './components/UserProfileModal';
import LandingPage from './components/LandingPage';
import VocabularyBank from './components/VocabularyBank';
import { usersList } from './data/users';
import { hscQuestionsList, hscVocabularyList } from './data/questions';
import { Trophy, GraduationCap, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'bn' (default English)

  // Mandatory Authentication Gate State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null; // Guest visitor sees Home Page by default
  });
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('hsc_auth_user', JSON.stringify(user));
    } catch (e) {}
    setIsAuthOpen(false);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Tanvir Ahmed',
      college: 'Notre Dame College, Dhaka',
      batch: 'HSC 2026',
      email: 'tanvir.demo@hsc2026.edu',
      role: 'student',
      points: 0,
      streak: 0
    };
    handleAuthSuccess(demoUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('hsc_auth_user');
    } catch (e) {}
  };

  // Admin Data State (Users and HSC Questions)
  const [users, setUsers] = useState(usersList);
  const [questions, setQuestions] = useState(hscQuestionsList);

  // Weak Words State (Tracked across Flashcards & Exams)
  const [weakWords, setWeakWords] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_weak_words');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.filter(w => w && w.word);
      }
    } catch (e) {}
    return [];
  });

  const handleToggleWeakWord = (wordItem) => {
    setWeakWords((prev) => {
      const exists = prev.some(w => w.id === wordItem.id || w.word === wordItem.word);
      let updated;
      if (exists) {
        updated = prev.filter(w => w.id !== wordItem.id && w.word !== wordItem.word);
      } else {
        updated = [...prev, wordItem];
      }
      try {
        localStorage.setItem('hsc_weak_words', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleRemoveWeakWord = (wordItem) => {
    setWeakWords((prev) => {
      const updated = prev.filter(w => w.id !== wordItem.id && w.word !== wordItem.word);
      try {
        localStorage.setItem('hsc_weak_words', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Modals state
  const [isQuickPracticeOpen, setIsQuickPracticeOpen] = useState(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const [isUnitLessonModalOpen, setIsUnitLessonModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [selectedExamUnit, setSelectedExamUnit] = useState(null);
  const [selectedExamLesson, setSelectedExamLesson] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isBn = lang === 'bn';

  // MANDATORY HOME PAGE & AUTH GATE:
  // If user is not authenticated, show Public Home / Landing Page
  if (!currentUser) {
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
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          lang={lang}
          isSignUpDefault={isSignUpMode}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return isBn ? 'ড্যাশবোর্ড' : 'Dashboard';
      case 'vocab_bank':
        return isBn ? 'ভোকাবুলারি ব্যাংক' : 'Vocabulary Bank';
      case 'flashcards':
        return isBn ? 'ফ্ল্যাশকার্ড' : 'Flashcards';
      case 'exams':
        return isBn ? 'পরীক্ষা' : 'Exam';
      case 'history':
        return isBn ? 'পরীক্ষার হিস্ট্রি' : 'Exam History';
      case 'leaderboard':
        return isBn ? 'লিডারবোর্ড' : 'Leaderboard';
      case 'progress':
        return isBn ? 'প্রগ্রেস ও দুর্বল শব্দ' : 'Progress & Weak Words';
      case 'admin':
        return isBn ? 'অ্যাডমিন প্যানেল' : 'Admin Control Panel';
      default:
        return isBn ? 'ড্যাশবোর্ড' : 'Dashboard';
    }
  };

  const handleStartExam = (exam) => {
    setIsQuickPracticeOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#0e111a] text-slate-100 font-bengali overflow-hidden">
      {/* 1. Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        lang={lang}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsUserProfileOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 2. Top Header Navigation */}
        <Header
          activeTabTitle={getTabTitle()}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          lang={lang}
          setLang={setLang}
          streakCount={currentUser?.streak || 0}
          isAdminActive={activeTab === 'admin'}
          onOpenAdmin={() => setActiveTab(activeTab === 'admin' ? 'dashboard' : 'admin')}
          onOpenNotifications={() => alert(isBn ? '১৫৬টি শব্দ এবং ৬১৩টি বোর্ড স্ট্যান্ডার্ড MCQ অনুশীলনের জন্য প্রস্তুত!' : '156 Vocabulary words and 613 Board Standard MCQs are ready!')}
          onOpenStreakModal={() => alert(isBn ? `আপনার স্ট্রিক: ${currentUser?.streak || 0} দিন। প্রতিদিন পরীক্ষা দিয়ে স্ট্রিক ধরে রাখুন!` : `Your streak: ${currentUser?.streak || 0} days. Practice daily to build your streak!`)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenProfile={() => setIsUserProfileOpen(true)}
        />

        {/* 3. Main Dashboard Scrollable Canvas with mobile bottom safe padding */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-6 lg:p-7 pb-24 lg:pb-7 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="max-w-[1550px] mx-auto space-y-6">
              {/* Top 4 Action Feature Cards */}
              <ActionCards
                lang={lang}
                onOpenVocabBank={() => setActiveTab('vocab_bank')}
                onOpenFlashcards={() => setActiveTab('flashcards')}
                onOpenQuickPractice={() => setIsQuickPracticeOpen(true)}
                onOpenMockExam={() => setIsUnitLessonModalOpen(true)}
              />

              {/* Main Content Grid: 2/3 Main Reports + 1/3 Side Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Side: Subject Report & Recent Exams (8 Columns) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subject-Wise Report Card */}
                  <SubjectReport
                    lang={lang}
                    onOpenAllSubjects={() => setActiveTab('exams')}
                    onSelectLesson={(lesson, unit) => {
                      setSelectedExamUnit(unit);
                      setSelectedExamLesson(lesson);
                      setIsUnitLessonModalOpen(true);
                    }}
                  />

                  {/* Recent Exams Card */}
                  <RecentExams
                    lang={lang}
                    onOpenAllExams={() => setIsUnitLessonModalOpen(true)}
                    onStartExam={() => setIsUnitLessonModalOpen(true)}
                  />
                </div>

                {/* Right Side: English Learning Summary Panel */}
                <div className="lg:col-span-4 space-y-6">
                  {/* How to Use Card */}
                  <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap size={18} className="text-emerald-400" />
                      <h3 className="text-white font-bold text-sm">
                        {isBn ? 'কীভাবে শিখবেন?' : 'How to Learn?'}
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                      {[
                        { step: '1', text: isBn ? 'বাঁ দিকে ইউনিট ও লেসন নির্বাচন করুন' : 'Select a Unit & Lesson from the left', color: 'bg-emerald-500' },
                        { step: '2', text: isBn ? '"📖 পাঠ্যবই পড়ুন" এ ক্লিক করে গল্পটি পড়ুন' : 'Click "Read Textbook" to read the story', color: 'bg-blue-500' },
                        { step: '3', text: isBn ? 'MCQ পরীক্ষা শুরু করুন — ভুল হলে বারবার আসবে' : 'Start MCQ Exam — wrong answers repeat until mastered', color: 'bg-violet-500' },
                        { step: '4', text: isBn ? 'প্রতিটি প্রশ্নে ৩ বার সঠিক উত্তর দিলে Done হবে' : 'Answer 3 times correctly to mark as Done', color: 'bg-amber-500' },
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
                      className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all active:scale-95"
                    >
                      {isBn ? '▶ এখনই পরীক্ষা শুরু করুন' : '▶ Start Exam Now'}
                    </button>
                  </div>

                  {/* Textbook Coverage Summary */}
                  <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 space-y-3">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <BookOpen size={16} className="text-blue-400" />
                      {isBn ? 'পাঠ্যবই কভারেজ' : 'Textbook Coverage'}
                    </h3>

                    <div className="space-y-2.5 text-xs">
                      {[
                        { label: isBn ? "Unit 1: The Parrot's Tale" : "Unit 1: The Parrot's Tale", done: 46, total: 46, color: 'bg-emerald-500' },
                        { label: isBn ? 'Unit 10: Lifestyle & Manners' : 'Unit 10: Lifestyle & Manners', done: 110, total: 110, color: 'bg-teal-500' },
                        { label: isBn ? 'Unit 2 – 9, 11 – 14 (আসছে)' : 'Units 2 – 9, 11 – 14 (Coming Soon)', done: 0, total: 0, color: 'bg-slate-700' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-slate-300 mb-1">
                            <span className="truncate max-w-[180px]">{item.label}</span>
                            <span className="text-slate-400 shrink-0 ml-2">
                              {item.total > 0 ? `${item.done}/${item.total} words` : isBn ? 'শীঘ্রই' : 'Soon'}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#1c2436] rounded-full">
                            <div
                              className={`h-full rounded-full ${item.color} transition-all duration-700`}
                              style={{ width: item.total > 0 ? `${Math.round((item.done / item.total) * 100)}%` : '0%' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-500 pt-1">
                      {isBn
                        ? '* পাঠ্যবইয়ের টেক্সট দিলে বাকি ইউনিটগুলো যোগ হবে।'
                        : '* Provide textbook text to unlock remaining units.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs Views */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-4xl mx-auto bg-[#131824] border border-[#1d2536] rounded-2xl p-6 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1d2536]">
                <div className="flex items-center gap-3">
                  <Trophy size={26} className="text-yellow-400" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isBn ? 'HSC ২০২৬ লিডারবোর্ড' : 'HSC 2026 Student Leaderboard'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {isBn ? 'সাপ্তাহিক MCQ অনুশীলন ও স্পেসড রিপিটিশন স্কোরের ভিত্তিতে র‍্যাঙ্কিং' : 'Rankings based on active quiz attempts & spaced repetition accuracy'}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
                  {isBn ? 'লাইভ ট্র্যাকিং' : 'Live Sync'}
                </div>
              </div>

              {/* Current Student Standing Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#162132] to-[#121824] border border-emerald-500/30 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-950/60">
                    {(currentUser?.name || 'S').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{currentUser?.name || 'Student'}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {isBn ? 'আপনি' : 'You'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{currentUser?.college || 'HSC 2026 Candidate'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{isBn ? 'আপনার অর্জিত পয়েন্ট' : 'Your Points'}</span>
                    <span className="text-lg font-black text-emerald-400">{currentUser?.points || 0} pts</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('exams')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {isBn ? 'MCQ দিয়ে পয়েন্ট বাড়ান' : 'Earn Points in Exams'}
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e131e] border border-[#1b2434] text-center space-y-2">
                <p className="text-sm font-semibold text-slate-200">
                  {isBn ? '💡 নিয়মিত পরীক্ষা দিয়ে পয়েন্ট সংগ্রহ করুন!' : '💡 Complete chapter MCQ exams to earn mastery points!'}
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {isBn 
                    ? 'প্রতিটি লেসনের ভুল প্রশ্ন টানা ৩ বার সঠিক উত্তর দিয়ে Mastery অর্জন করলে পয়েন্ট যুক্ত হবে।'
                    : 'Mastering missed questions with 3 consecutive correct answers adds to your verified score.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'vocab_bank' && (
            <div className="max-w-6xl mx-auto">
              <VocabularyBank
                lang={lang}
                onStartExam={() => setActiveTab('exams')}
                onOpenFlashcards={() => setActiveTab('flashcards')}
                weakWords={weakWords}
                onToggleWeakWord={handleToggleWeakWord}
              />
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="max-w-4xl mx-auto">
              <FlashcardsExplorer
                lang={lang}
                weakWords={weakWords}
                onToggleWeakWord={handleToggleWeakWord}
                onStartExamFromCards={() => setActiveTab('exams')}
              />
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="max-w-6xl mx-auto">
              <HSCUnitsExplorer
                lang={lang}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <RecentExams
                lang={lang}
                onOpenAllExams={() => setIsUnitLessonModalOpen(true)}
                onStartExam={() => setIsUnitLessonModalOpen(true)}
              />
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Progress Summary Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <SubjectReport
                    lang={lang}
                    onOpenAllSubjects={() => setActiveTab('exams')}
                    onSelectLesson={(lesson, unit) => {
                      setSelectedExamUnit(unit);
                      setSelectedExamLesson(lesson);
                      setIsUnitLessonModalOpen(true);
                    }}
                  />
                </div>
                <div className="lg:col-span-5 space-y-6">
                  {/* Overall Textbook Mastery Summary */}
                  <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-6 shadow-card space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#1d2536]">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">
                          {isBn ? 'HSC পাঠ্যবই ভোকাবুলারি অগ্রগতি' : 'HSC Textbook Mastery'}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isBn ? '১২টি ইউনিট ও সকল লেসন' : '12 Units & All Lessons'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-[#0e131e] border border-[#222c40] text-center">
                        <span className="text-xs text-slate-400 block mb-1">
                          {isBn ? 'মোট শব্দ সংখ্যা' : 'Total Words'}
                        </span>
                        <span className="text-xl font-black text-emerald-400">
                          {hscVocabularyList.length}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0e131e] border border-[#222c40] text-center">
                        <span className="text-xs text-slate-400 block mb-1">
                          {isBn ? 'দুর্বল শব্দ' : 'Weak Words'}
                        </span>
                        <span className="text-xl font-black text-rose-400">
                          {weakWords.length}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                        <span>{isBn ? 'সর্বমোট সিলেবাস সম্পন্ন' : 'Overall Syllabus Covered'}</span>
                        <span className="font-bold text-emerald-400">০%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0e131e] rounded-full overflow-hidden border border-[#1c2436]">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-0" />
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('exams')}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      {isBn ? '▶ পরীক্ষা দিয়ে অগ্রগতি বাড়ান' : '▶ Take Exam to Increase Progress'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Weak Words Section & PDF Download Table */}
              <div className="pt-4 border-t border-[#1a2233]">
                <WeakWordsSection
                  weakWords={weakWords}
                  onRemoveWeakWord={handleRemoveWeakWord}
                  onOpenFlashcards={() => setActiveTab('flashcards')}
                  lang={lang}
                />
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            currentUser?.role === 'admin' ? (
              <AdminDashboard
                users={users}
                setUsers={setUsers}
                questions={questions}
                setQuestions={setQuestions}
                onExitAdmin={() => setActiveTab('dashboard')}
                lang={lang}
              />
            ) : (
              <div className="p-8 text-center bg-[#131824] border border-[#1d2536] rounded-2xl space-y-3">
                <Shield size={36} className="mx-auto text-rose-500" />
                <h3 className="text-lg font-bold text-white">Access Denied (অ্যাক্সেস সংরক্ষিত)</h3>
                <p className="text-xs text-slate-400">This section is restricted to administrators only.</p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            )
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
        />
      </div>

      {/* 4. Interactive Modals */}
      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        lang={lang}
        weakWords={weakWords}
        onRemoveWeakWord={handleRemoveWeakWord}
        currentUser={currentUser}
        onOpenFlashcards={() => {
          setIsUserProfileOpen(false);
          setActiveTab('flashcards');
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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
      />
    </div>
  );
}
