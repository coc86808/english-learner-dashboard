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
import { usersList } from './data/users';
import { hscQuestionsList } from './data/questions';
import { Trophy, GraduationCap, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('bn'); // 'bn' | 'en'

  // Admin Data State (Users and HSC Questions)
  const [users, setUsers] = useState(usersList);
  const [questions, setQuestions] = useState(hscQuestionsList);

  // Modals state
  const [isQuickPracticeOpen, setIsQuickPracticeOpen] = useState(false);
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const [isUnitLessonModalOpen, setIsUnitLessonModalOpen] = useState(false);
  const [selectedExamUnit, setSelectedExamUnit] = useState(null);
  const [selectedExamLesson, setSelectedExamLesson] = useState(null);
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
          isAdminActive={activeTab === 'admin'}
          onOpenAdmin={() => setActiveTab(activeTab === 'admin' ? 'dashboard' : 'admin')}
          onOpenNotifications={() => alert(isBn ? 'নতুন ৩টি প্র্যাকটিস টেস্ট যুক্ত হয়েছে!' : '3 new practice tests added!')}
          onOpenStreakModal={() => alert(isBn ? 'আপনার স্ট্রিক ২ দিন বজায় রয়েছে!' : 'Your 2-day streak is active!')}
        />

        {/* 3. Main Dashboard Scrollable Canvas with mobile bottom safe padding */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-6 lg:p-7 pb-24 lg:pb-7 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="max-w-[1550px] mx-auto space-y-6">
              {/* Top 3 Action Feature Cards */}
              <ActionCards
                lang={lang}
                onOpenQuestionBank={() => setIsQuestionBankOpen(true)}
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
                    onOpenAllSubjects={() => setIsQuestionBankOpen(true)}
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
                        { label: isBn ? 'Unit 1: The Parrot\'s Tale' : 'Unit 1: The Parrot\'s Tale', done: 23, total: 23, color: 'bg-emerald-500' },
                        { label: isBn ? 'Unit 1: Education & Technology' : 'Unit 1: Education & Technology', done: 0, total: 0, color: 'bg-slate-700' },
                        { label: isBn ? 'Unit 2 – 12 (আসছে)' : 'Units 2 – 12 (Coming Soon)', done: 0, total: 0, color: 'bg-slate-700' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-slate-300 mb-1">
                            <span className="truncate max-w-[180px]">{item.label}</span>
                            <span className="text-slate-400 shrink-0 ml-2">
                              {item.total > 0 ? `${item.done}/${item.total}` : isBn ? 'শীঘ্রই' : 'Soon'}
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
            <div className="max-w-6xl mx-auto">
              <HSCUnitsExplorer
                lang={lang}
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
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <SubjectReport
                  lang={lang}
                  onOpenAllSubjects={() => setActiveTab('question-bank')}
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
                      <span className="text-xs text-slate-400 block mb-1">মোট শব্দ সংখ্যা</span>
                      <span className="text-xl font-black text-emerald-400">২৩ টি</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0e131e] border border-[#222c40] text-center">
                      <span className="text-xs text-slate-400 block mb-1">সম্পূর্ণ আয়ত্ত (Done)</span>
                      <span className="text-xl font-black text-blue-400">০ টি</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <span>সর্বমোট সিলেবাস সম্পন্ন</span>
                      <span className="font-bold text-emerald-400">০%</span>
                    </div>
                    <div className="w-full h-2 bg-[#0e131e] rounded-full overflow-hidden border border-[#1c2436]">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-0" />
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('exams')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95"
                  >
                    {isBn ? '▶ পরীক্ষা দিয়ে অগ্রগতি বাড়ান' : '▶ Take Exam to Increase Progress'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              users={users}
              setUsers={setUsers}
              questions={questions}
              setQuestions={setQuestions}
              onExitAdmin={() => setActiveTab('dashboard')}
              lang={lang}
            />
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
