import React from 'react';
import {
  LayoutDashboard,
  FolderArchive,
  GraduationCap,
  Bot,
  History,
  Trophy,
  TrendingUp,
  Sparkles,
  LogIn,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  lang,
  onOpenAuth
}) {
  const isBn = lang === 'bn';

  const menuItems = [
    {
      id: 'dashboard',
      label: isBn ? 'ড্যাশবোর্ড' : 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      activeColor: 'bg-emerald-500/15 text-emerald-400 border-l-4 border-emerald-500'
    },
    {
      id: 'question-bank',
      label: isBn ? 'প্রশ্নব্যাংক' : 'Question Bank',
      icon: FolderArchive,
      badge: 'PRO',
      badgeColor: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'exams',
      label: isBn ? 'পরীক্ষা' : 'Mock Exams',
      icon: GraduationCap,
      badge: null
    },
    {
      id: 'history',
      label: isBn ? 'হিস্ট্রি' : 'History',
      icon: History,
      badge: null
    },
    {
      id: 'leaderboard',
      label: isBn ? 'লিডারবোর্ড' : 'Leaderboard',
      icon: Trophy,
      badge: 'TOP 5%',
      badgeColor: 'bg-yellow-500/20 text-yellow-300'
    },
    {
      id: 'progress',
      label: isBn ? 'প্রগ্রেস' : 'Progress',
      icon: TrendingUp,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-[#0c0f17] border-r border-[#192030] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding Section */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-[#192030]">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Learner Hub"
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-emerald-900/30 border border-emerald-500/30"
              />
              <div>
                <span className="text-white font-bold text-lg tracking-tight block">
                  {isBn ? 'লার্নার হাব' : 'Learner Hub'}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium tracking-wide">
                  {isBn ? 'স্মার্ট প্র্যাকটিস' : 'Smart Practice'}
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-170px)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#151c2a] text-emerald-400 shadow-md border-l-[3px] border-emerald-500'
                      : 'text-slate-300 hover:text-white hover:bg-[#131926]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive
                          ? 'text-emerald-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        item.badgeColor || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Auth / Profile Section */}
        <div className="p-4 border-t border-[#192030] bg-[#090c13]/50">
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/40 transition-all duration-200 transform active:scale-95"
          >
            <LogIn size={17} />
            <span>{isBn ? 'Sign Up / লগইন' : 'Sign Up / Log In'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
