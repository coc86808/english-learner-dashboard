import React, { useState } from 'react';
import { Users, UserPlus, Sparkles, Share2, Check } from 'lucide-react';

export default function FriendsWidget({ lang, onOpenFriendsModal }) {
  const [copied, setCopied] = useState(false);
  const isBn = lang === 'bn';

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-slate-400" />
          <h3 className="text-white font-bold text-sm md:text-base tracking-wide">
            {isBn ? 'অ্যাক্টিভ বন্ধু' : 'Active Study Buddies'}
          </h3>
        </div>

        <button
          onClick={onOpenFriendsModal}
          className="text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
        >
          {isBn ? 'সবাইকে দেখো' : 'View All'}
        </button>
      </div>

      {/* Empty State / Friends List matching screenshot */}
      <div className="py-4 px-2 text-center bg-[#0f1420] border border-[#1a2233] rounded-xl">
        <p className="text-xs text-slate-400 mb-3">
          {isBn ? 'এখনো কোনো অ্যাক্টিভ বন্ধু নেই।' : 'No study buddies active right now.'}
        </p>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#192233] hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 border border-[#27344d] hover:border-emerald-500/40 text-xs font-semibold transition-all duration-200"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span>{isBn ? 'লিংক কপি হয়েছে!' : 'Link Copied!'}</span>
            </>
          ) : (
            <>
              <UserPlus size={13} className="text-emerald-400" />
              <span>{isBn ? 'বন্ধুদের ইনভাইট করুন' : 'Invite Friends'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
