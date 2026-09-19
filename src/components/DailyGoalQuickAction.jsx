import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { getUserLeague } from '../services/scoreManager';

export default function DailyGoalQuickAction({
  lang = 'en',
  currentUser,
  weakWords = [],
  onOpenQuickPractice,
  onOpenMockExam,
  navigate = () => {}
}) {
  const isBn = lang === 'bn';

  const userXP = currentUser?.points || currentUser?.xp || 0;
  const league = getUserLeague ? getUserLeague(userXP) : { name: 'Bronze', nameBn: 'ব্রোঞ্জ', icon: '🥉' };

  // Calculate daily goal progress (target: 20 MCQs/day)
  // Check localStorage or mock for today's solved count
  let todaySolved = 0;
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`hsc_daily_solved_${todayStr}`);
    if (saved) todaySolved = parseInt(saved, 10) || 0;
    else if (userXP > 0) todaySolved = Math.min(20, Math.floor(userXP / 10));
  } catch (e) {}

  const dailyTarget = 20;
  const progressPercent = Math.min(100, Math.round((todaySolved / dailyTarget) * 100));

  return (
    <div className="bg-[#111723] border border-[#1e293b] rounded-2xl p-5 shadow-card space-y-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Header: Daily Goal */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <Target size={18} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm leading-tight">
              {isBn ? 'আজকের লক্ষ্য' : "Today's Target"}
            </h3>
            <p className="text-[11px] text-slate-400">
              {isBn ? 'প্রতিদিন ২০টি MCQ প্র্যাকটিস' : 'Daily 20 MCQs Practice'}
            </p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
          {todaySolved}/{dailyTarget}
        </span>
      </div>

      {/* 2. Progress Bar */}
      <div className="space-y-1.5 relative z-10">
        <div className="w-full h-2 rounded-full bg-[#1a2333] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{progressPercent}% {isBn ? 'সম্পন্ন' : 'Completed'}</span>
          <span>
            {todaySolved >= dailyTarget 
              ? (isBn ? '🎉 লক্ষ্য অর্জিত!' : '🎉 Goal Achieved!') 
              : (isBn ? `আর ${dailyTarget - todaySolved}টি বাকি` : `${dailyTarget - todaySolved} remaining`)}
          </span>
        </div>
      </div>

      {/* 3. Primary Action Button: 1-Click Quick Practice */}
      <div className="space-y-2 relative z-10">
        <button
          onClick={onOpenQuickPractice}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group"
        >
          <Zap size={16} className="fill-white group-hover:scale-110 transition-transform" />
          <span>{isBn ? '⚡ দ্রুত ১০টি MCQ প্র্যাকটিস করুন' : '⚡ Quick Practice (10 MCQs)'}</span>
        </button>

        <button
          onClick={onOpenMockExam}
          className="w-full py-2.5 px-3 rounded-xl bg-[#161d2c] hover:bg-[#1f283d] border border-[#263249] text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
        >
          <BookOpen size={14} className="text-emerald-400" />
          <span>{isBn ? 'অধ্যায়ভিত্তিক পরীক্ষা দিন' : 'Chapter-wise Exam'}</span>
          <ChevronRight size={14} className="text-slate-400" />
        </button>
      </div>

      {/* 4. Weak Words Status Card */}
      <div className="pt-2 border-t border-[#1c2538] relative z-10">
        {weakWords.length > 0 ? (
          <div 
            onClick={() => navigate('/weak-words')}
            className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 hover:border-amber-500/40 flex items-center justify-between gap-2 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-amber-300">
                {isBn 
                  ? `${weakWords.length}টি দুর্বল শব্দ রিভিশন প্রয়োজন` 
                  : `${weakWords.length} Weak Words need review`}
              </span>
            </div>
            <ArrowRight size={13} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-medium text-slate-300">
              {isBn 
                ? 'সব ভোকাবুলারি আয়ত্তে আছে • দুর্বল শব্দ নেই ✨' 
                : 'All vocabulary mastered • 0 weak words ✨'}
            </span>
          </div>
        )}
      </div>

      {/* 5. League Standing Glance */}
      <div 
        onClick={() => navigate('/leaderboard')}
        className="p-2.5 rounded-xl bg-[#0e1320] border border-[#1d263a] hover:border-[#2d3a54] flex items-center justify-between cursor-pointer group transition-all relative z-10"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{league?.icon || '🥉'}</span>
          <div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
              {isBn ? league?.nameBn : league?.name} {isBn ? 'লীগ' : 'League'}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              {userXP} XP • {isBn ? 'র‌্যাংক দেখুন' : 'View Rank'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-emerald-400 font-medium transition-colors">
          <span>{isBn ? 'লিডারবোর্ড' : 'Leaderboard'}</span>
          <ChevronRight size={13} />
        </div>
      </div>
    </div>
  );
}
