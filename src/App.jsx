import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ActionCards from './components/ActionCards';
import SubjectReport from './components/SubjectReport';
import RecentExams from './components/RecentExams';
import StreakWidget from './components/StreakWidget';
import FriendsWidget from './components/FriendsWidget';
import DailyPointsChart from './components/DailyPointsChart';
import QuickPracticeModal from './components/QuickPracticeModal';
import QuestionBankModal from './components/QuestionBankModal';
import MockExamModal from './components/MockExamModal';
import AuthModal from './components/AuthModal';
import { Trophy, History as HistoryIcon, TrendingUp, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('bn'); // 'bn' | 'en'

  // Modals state
  const [isQuickPracticeOpen, setIsQuickPracticeOpen] = useState(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const [isMockExamOpen, setIsMockExamOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const isBn = lang === 'bn';

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return isBn ? 'ড্যাশবোর্ড' : 'Dashboard';
      case 'question-bank':
        return isBn ? 'প্রশ্নব্যাংক' : 'Question Bank';
      case 'exams':
        return isBn ? 'পরীক্ষা ও টেস্ট সিরিজ' : 'Exams & Test Series';
      case 'history':
        return isBn ? 'পরীক্ষার হিস্ট্রি' : 'Exam History';
      case 'leaderboard':
        return isBn ? 'লিডারবোর্ড' : 'Leaderboard';
      case 'progress':
        return isBn ? 'প্রগ্রেস রিপোর্ট' : 'Progress Report';
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
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 2. Top Header Navigation */}
        <Header
          activeTabTitle={getTabTitle()}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          lang={lang}
          setLang={setLang}
          streakCount={2}
          onOpenNotifications={() => alert(isBn ? 'নতুন ৩টি প্র্যাকটিস টেস্ট যুক্ত হয়েছে!' : '3 new practice tests added!')}
          onOpenStreakModal={() => alert(isBn ? 'আপনার স্ট্রিক ২ দিন বজায় রয়েছে!' : 'Your 2-day streak is active!')}
        />

        {/* 3. Main Dashboard Scrollable Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="max-w-[1550px] mx-auto space-y-6">
              {/* Top 3 Action Feature Cards */}
              <ActionCards
                lang={lang}
                onOpenQuestionBank={() => setIsQuestionBankOpen(true)}
                onOpenQuickPractice={() => setIsQuickPracticeOpen(true)}
                onOpenMockExam={() => setIsMockExamOpen(true)}
              />

              {/* Main Content Grid: 2/3 Main Reports + 1/3 Side Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Side: Subject Report & Recent Exams (8 Columns) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subject-Wise Report Card */}
                  <SubjectReport
                    lang={lang}
                    onOpenAllSubjects={() => setIsQuestionBankOpen(true)}
                  />

                  {/* Recent Exams Card */}
                  <RecentExams
                    lang={lang}
                    onOpenAllExams={() => setIsMockExamOpen(true)}
                    onStartExam={handleStartExam}
                  />
                </div>

                {/* Right Side: Stats Panel (4 Columns) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Streak Widget */}
                  <StreakWidget
                    lang={lang}
                    streakCount={2}
                    freezesLeft={0}
                    onStreakAction={() => setIsQuickPracticeOpen(true)}
                  />

                  {/* Active Friends Widget */}
                  <FriendsWidget
                    lang={lang}
                    onOpenFriendsModal={() => alert(isBn ? 'বন্ধু তালিকা শীঘ্রই আসছে!' : 'Friends system coming soon!')}
                  />

                  {/* Daily Points Chart */}
                  <DailyPointsChart lang={lang} />
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs Views */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-4xl mx-auto bg-[#131824] border border-[#1d2536] rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1d2536]">
                <Trophy size={26} className="text-yellow-400" />
                <h2 className="text-xl font-bold text-white">
                  {isBn ? 'সাপ্তাহিক লিডারবোর্ড' : 'Weekly Leaderboard'}
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { rank: '1 🥇', name: 'Tanvir Ahmed', points: '1,450 pts', badge: 'Master' },
                  { rank: '2 🥈', name: 'Sadia Rahman', points: '1,280 pts', badge: 'Diamond' },
                  { rank: '3 🥉', name: 'Nafis Iqbal', points: '1,120 pts', badge: 'Gold' },
                  { rank: '4', name: 'You (আপনি)', points: '890 pts', badge: 'Silver', isUser: true },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl flex items-center justify-between border ${
                      row.isUser
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : 'bg-[#182030] border-[#222c40] text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-base w-8">{row.rank}</span>
                      <span className="font-semibold text-sm">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-[#121722] px-2.5 py-1 rounded-md text-slate-400">
                        {row.badge}
                      </span>
                      <span className="font-bold text-emerald-400 text-sm">
                        {row.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'question-bank' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {isBn ? 'প্রশ্নব্যাংক ও আর্কাইভ' : 'Question Bank & Archive'}
                </h2>
                <button
                  onClick={() => setIsQuestionBankOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl"
                >
                  {isBn ? 'ক্যাটাগরি ব্রাউজ করুন' : 'Browse Categories'}
                </button>
              </div>
              <SubjectReport
                lang={lang}
                onOpenAllSubjects={() => setIsQuestionBankOpen(true)}
              />
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {isBn ? 'পরীক্ষা ও টেস্ট সিরিজ' : 'Exams & Test Series'}
                </h2>
                <button
                  onClick={() => setIsMockExamOpen(true)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl"
                >
                  {isBn ? 'নতুন মক টেস্ট' : 'New Mock Test'}
                </button>
              </div>
              <RecentExams
                lang={lang}
                onOpenAllExams={() => setIsMockExamOpen(true)}
                onStartExam={handleStartExam}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <RecentExams
                lang={lang}
                onOpenAllExams={() => setIsMockExamOpen(true)}
                onStartExam={handleStartExam}
              />
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubjectReport
                lang={lang}
                onOpenAllSubjects={() => setIsQuestionBankOpen(true)}
              />
              <div className="space-y-6">
                <StreakWidget
                  lang={lang}
                  streakCount={2}
                  freezesLeft={0}
                  onStreakAction={() => setIsQuickPracticeOpen(true)}
                />
                <DailyPointsChart lang={lang} />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 4. Interactive Modals */}
      <QuickPracticeModal
        isOpen={isQuickPracticeOpen}
        onClose={() => setIsQuickPracticeOpen(false)}
        lang={lang}
      />

      <QuestionBankModal
        isOpen={isQuestionBankOpen}
        onClose={() => setIsQuestionBankOpen(false)}
        lang={lang}
      />

      <MockExamModal
        isOpen={isMockExamOpen}
        onClose={() => setIsMockExamOpen(false)}
        lang={lang}
        onStartExamDirect={handleStartExam}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
      />
    </div>
  );
}
