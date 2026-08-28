import React from 'react';
import {
  LayoutDashboard,
  FolderArchive,
  GraduationCap,
  Trophy,
  TrendingUp,
  Shield
} from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  lang
}) {
  const isBn = lang === 'bn';

  const navItems = [
    {
      id: 'dashboard',
      label: isBn ? 'হোম' : 'Home',
      icon: LayoutDashboard
    },
    {
      id: 'question-bank',
      label: isBn ? 'প্রশ্নব্যাংক' : 'Bank',
      icon: FolderArchive
    },
    {
      id: 'exams',
      label: isBn ? 'পরীক্ষা' : 'Exams',
      icon: GraduationCap,
      isPrimary: true
    },
    {
      id: 'leaderboard',
      label: isBn ? 'র‍্যাংক' : 'Rank',
      icon: Trophy
    },
    {
      id: 'progress',
      label: isBn ? 'প্রগ্রেস' : 'Progress',
      icon: TrendingUp
    }
  ];

  return (
    <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0c0f17]/95 backdrop-blur-xl border-t border-[#192030] px-2 py-1.5 shadow-2xl safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-3.5 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-950/80 scale-110 ring-4 ring-[#0c0f17]'
                      : 'bg-[#182236] text-emerald-400 border border-emerald-500/30 hover:scale-105'
                  }`}
                >
                  <Icon size={22} className="stroke-[2.3]" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-transform ${
                    isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
