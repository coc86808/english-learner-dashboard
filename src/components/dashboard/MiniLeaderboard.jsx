import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Medal, 
  ArrowRight, 
  Zap, 
  Flame, 
  TrendingUp, 
  Users, 
  Sparkles,
  Award
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * MiniLeaderboard Component
 * 
 * Secondary social proof & competitive motivation widget for the Student Command Center:
 * - Top 3 peer students with authentic Gold, Silver, Bronze badges
 * - Pinned current user standing row (#12 You) with XP score and rank trend
 * - Clean initials/avatar rendering
 * - High-visibility [ View Full Leaderboard → ] navigation trigger
 * 
 * Strictly follows Educational SaaS Design Tokens:
 * Surface: #FFFFFF, Border: 1px solid #E5E7EB, Radius: 22px,
 * Text: #172033 & #64748B, Min touch target: 44px
 */
export default function MiniLeaderboard({
  topStudents,
  topUsers,
  currentUserStudent,
  currentUserRank,
  currentUser,
  lang = 'en',
  onViewFullLeaderboard,
  className = ''
}) {
  const isBn = lang === 'bn';

  // 1. Authoritative Top 3 Peers (with fallback demo candidates from top colleges)
  const defaultTopPeers = [
    {
      id: 'peer-1',
      rank: 1,
      name: 'Nafis Iqbal',
      college: 'Dhaka College',
      points: 2840,
      xp: 2840,
      streak: 18,
      avatarInitials: 'NI',
      avatarBg: 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'
    },
    {
      id: 'peer-2',
      rank: 2,
      name: 'Sadia Rahman',
      college: 'Viqarunnisa Noon College',
      points: 2610,
      xp: 2610,
      streak: 15,
      avatarInitials: 'SR',
      avatarBg: 'bg-gradient-to-br from-slate-400 to-slate-600 text-white'
    },
    {
      id: 'peer-3',
      rank: 3,
      name: 'Mehedi Hasan',
      college: 'Rajuk Uttara Model College',
      points: 2390,
      xp: 2390,
      streak: 12,
      avatarInitials: 'MH',
      avatarBg: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
    }
  ];

  // Resolve peer list
  const rawPeers = topStudents || topUsers;
  const peersList = (Array.isArray(rawPeers) && rawPeers.length >= 3)
    ? rawPeers.slice(0, 3).map((p, idx) => ({
        ...defaultTopPeers[idx],
        ...p,
        rank: idx + 1,
        xp: p.xp || p.points || defaultTopPeers[idx].xp,
        avatarInitials: p.avatarInitials || (p.name ? p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'HS')
      }))
    : defaultTopPeers;

  // 2. Resolve Current User Rank Card
  const userName = currentUser?.name || 'Tanvir Ahmed';
  const userCollege = currentUser?.college || 'Notre Dame College';
  const userPoints = Number(currentUser?.points || currentUserRank?.points || currentUserRank?.xp || 1450);
  const userRankNum = Number(currentUserRank?.rank || currentUserStudent?.rank || 12);
  const userStreak = Number(currentUser?.streak || 7);
  const userTrend = currentUserRank?.trend || (isBn ? 'এই সপ্তাহে ৩ ধাপ অগ্রগতি' : '+3 ranks this week');

  const userInitials = userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  // Helper for rank badges
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return {
        label: '1',
        icon: Crown,
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 font-extrabold',
        crownColor: 'text-amber-500 fill-amber-500'
      };
    }
    if (rank === 2) {
      return {
        label: '2',
        icon: Medal,
        badgeClass: 'bg-slate-200 text-slate-800 border-slate-300 font-extrabold',
        crownColor: 'text-slate-500 fill-slate-500'
      };
    }
    return {
      label: '3',
      icon: Medal,
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300 font-extrabold',
      crownColor: 'text-amber-600 fill-amber-600'
    };
  };

  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between ${className}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#F59E0B] shadow-xs">
              <Trophy className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172033] leading-tight">
                {isBn ? 'সাপ্তাহিক লিডারবোর্ড' : 'Weekly Leaderboard'}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isBn ? 'শীর্ষ এইচএসসি শিক্ষার্থী ও আপনার অবস্থান' : 'Top HSC examinees & your current standing'}
              </p>
            </div>
          </div>

          {/* Live indicator badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-green-200 text-[#16A34A] text-xs font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{isBn ? 'লাইভ' : 'Live'}</span>
          </div>
        </div>

        {/* Top 3 Peers List */}
        <div className="space-y-2.5 mb-4">
          {peersList.map((peer) => {
            const rankMeta = getRankBadge(peer.rank);
            const Icon = rankMeta.icon;

            return (
              <div
                key={peer.id || peer.rank}
                className="bg-[#F8FAFC] hover:bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 rounded-2xl p-3 transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs"
              >
                {/* Left: Rank & Avatar & Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Rank Badge */}
                  <div className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 text-xs ${rankMeta.badgeClass}`}>
                    <span className="font-extrabold">{peer.rank}</span>
                  </div>

                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${peer.avatarBg || 'bg-blue-600 text-white'}`}>
                    {peer.avatarInitials || 'HS'}
                  </div>

                  {/* Name & College */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-[#172033] truncate">
                        {peer.name}
                      </h4>
                      {peer.rank === 1 && (
                        <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {peer.college}
                    </p>
                  </div>
                </div>

                {/* Right: XP & Streak */}
                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-[#172033] tabular-nums justify-end">
                    <Zap className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />
                    <span>{isBn ? `${toBnNum(peer.xp || peer.points)} XP` : `${peer.xp || peer.points} XP`}</span>
                  </div>
                  {peer.streak && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[#F59E0B] justify-end mt-0.5">
                      <Flame className="w-2.5 h-2.5 fill-current" />
                      <span>{isBn ? `${toBnNum(peer.streak)} দিন` : `${peer.streak}d`}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pinned Current User Rank Card */}
        <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-3.5 mb-5 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Your Rank & Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="px-2.5 py-1 rounded-xl bg-[#2563EB] text-white text-xs font-extrabold shrink-0 shadow-xs">
                {isBn ? `#${toBnNum(userRankNum)} আপনি` : `#${userRankNum} You`}
              </div>

              <div className="w-9 h-9 rounded-full bg-white border border-blue-200 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                {userInitials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#172033] truncate">
                    {userName}
                  </h4>
                  <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-[#2563EB]">
                    {isBn ? 'আপনার প্রোফাইল' : 'You'}
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] truncate">
                  {userCollege}
                </p>
              </div>
            </div>

            {/* Right: User XP & Trend */}
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-[#2563EB] tabular-nums justify-end">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{isBn ? `${toBnNum(userPoints)} XP` : `${userPoints} XP`}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 justify-end mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>{userTrend}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Button */}
      <button
        type="button"
        onClick={onViewFullLeaderboard}
        className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] hover:border-slate-300 text-[#172033] font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
      >
        <span>{isBn ? 'পূর্ণাঙ্গ লিডারবোর্ড দেখুন →' : 'View Full Leaderboard →'}</span>
        <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
