import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Menu,
  Sparkles
} from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  currentPath = '/dashboard',
  navigate,
  setActiveTab,
  lang = 'en',
  onOpenMenu
}) {
  const isBn = lang === 'bn';

  // 5 core student items optimized for high-yield mobile learning
  const navItems = [
    {
      id: 'dashboard',
      path: '/dashboard',
      labelEn: 'Home',
      labelBn: 'হোম',
      icon: LayoutDashboard
    },
    {
      id: 'vocabulary',
      path: '/vocabulary',
      labelEn: 'Vocab',
      labelBn: 'ভোকাব',
      icon: BookOpen
    },
    {
      id: 'exams',
      path: '/exam',
      labelEn: 'Exam',
      labelBn: 'পরীক্ষা',
      icon: GraduationCap,
      isPrimary: true
    },
    {
      id: 'flashcards',
      path: '/flashcards',
      labelEn: 'Cards',
      labelBn: 'কার্ড',
      icon: Sparkles
    },
    {
      id: 'menu',
      path: '/units',
      labelEn: 'Menu',
      labelBn: 'মেনু',
      icon: Menu,
      isMenu: true
    }
  ];

  const handleItemClick = (item) => {
    if (item.isMenu && typeof onOpenMenu === 'function') {
      onOpenMenu();
      return;
    }
    if (typeof navigate === 'function') {
      navigate(item.path);
    } else if (typeof setActiveTab === 'function') {
      setActiveTab(item.id);
    }
  };

  const isItemActive = (item) => {
    if (item.isMenu) return false;
    const normPath = (currentPath || '').toLowerCase();
    const normItemPath = item.path.toLowerCase();
    if (normPath === normItemPath) return true;
    if (item.id === 'vocabulary' && (normPath === '/vocabulary' || normPath === '/vocabulary-bank')) {
      return true;
    }
    if (item.id === 'flashcards' && normPath === '/flashcards') {
      return true;
    }
    if (item.id === 'exams' && (normPath === '/exam' || normPath === '/exams' || normPath === '/practice')) {
      return true;
    }
    if (item.id === 'dashboard' && (normPath === '/dashboard' || normPath === '/')) {
      return true;
    }
    return false;
  };

  return (
    <nav 
      aria-label="Mobile Navigation Bar" 
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0c0f17]/95 backdrop-blur-xl border-t border-[#1e293b] px-3 py-1.5 shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.8)] select-none safe-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(item);

          // Center Raised Action Button (Exam)
          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="relative -top-4 flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 text-white shadow-emerald-950/90 scale-110 ring-4 ring-[#0c0f17] shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : 'bg-[#141b29] text-emerald-400 border border-emerald-500/40 hover:scale-105 shadow-md shadow-emerald-950/30'
                  }`}
                >
                  <Icon size={22} className="stroke-[2.4]" />
                </div>
                <span
                  className={`text-[10px] font-extrabold mt-1 tracking-tight transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {isBn ? item.labelBn : item.labelEn}
                </span>
              </button>
            );
          }

          // Standard Nav Items
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 ${
                isActive
                  ? 'text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  size={19}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight font-medium">
                {isBn ? item.labelBn : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
