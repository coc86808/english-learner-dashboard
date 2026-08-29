import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Building, 
  FileDown, 
  Flame, 
  Trophy, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Edit3,
  Save,
  Phone,
  Sparkles,
  Camera
} from 'lucide-react';
import WeakWordsSection from './WeakWordsSection';
import { generateWeakWordsPDF } from '../utils/pdfGenerator';
import { hscVocabularyList } from '../data/questions/hscQuestionsData';

const avatarOptions = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
];

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  lang = 'en', 
  weakWords = [], 
  onRemoveWeakWord,
  onOpenFlashcards,
  currentUser,
  onUpdateProfile
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [batch, setBatch] = useState('HSC 2026');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setCollege(currentUser.college || '');
      setBatch(currentUser.hscBatch || currentUser.batch || 'HSC 2026');
      setPhone(currentUser.phone || '');
      setAvatar(currentUser.avatar || avatarOptions[0]);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const isBn = lang === 'bn';
  const studentInfo = {
    name: currentUser?.name || 'HSC Student',
    college: currentUser?.college || 'HSC College',
    batch: currentUser?.hscBatch || currentUser?.batch || 'HSC 2026',
    streak: currentUser?.streak || 0,
    points: currentUser?.points || 0,
    rank: currentUser?.rank || '-'
  };

  const effectiveWeakWords = Array.isArray(weakWords) ? weakWords : [];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      college: college.trim() || 'HSC College',
      hscBatch: batch,
      batch: batch,
      phone: phone.trim(),
      avatar: avatar || currentUser?.avatar
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedUser);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-[#0d121c] border border-[#1e283b] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-[#161e2e] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
          title="Close Profile"
        >
          <X size={18} />
        </button>

        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2536]">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-500/40">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  (studentInfo.name || 'S').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                )}
              </div>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-[#141c2c] border border-emerald-500/50 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all shadow-md cursor-pointer"
                  title="Edit Profile"
                >
                  <Edit3 size={12} />
                </button>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {studentInfo.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 uppercase">
                  {studentInfo.batch}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <Building size={13} className="text-slate-500" />
                <span>{studentInfo.college}</span>
              </div>
            </div>
          </div>

          {/* Action & Key Stat Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Edit3 size={13} />
                <span>{isBn ? 'প্রোফাইল এডিট' : 'Edit Profile'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                👑 Master Admin
              </span>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141b28] border border-orange-500/30 text-orange-400 text-xs font-bold">
              <Flame size={15} className="fill-orange-500" />
              <span>{studentInfo.streak} Days</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141b28] border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Trophy size={14} />
              <span>{studentInfo.points} pts</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* EDIT PROFILE FORM (TOGGLEABLE)                                 */}
        {/* ------------------------------------------------------------- */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-[#131a29] border border-[#223049] space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Sparkles size={16} />
                <span>{isBn ? 'প্রোফাইল তথ্য সম্পাদনা করুন' : 'Edit Profile Information'}</span>
              </h3>
              {saveSuccess && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 size={14} />
                  {isBn ? 'আপডেট সম্পন্ন হয়েছে!' : 'Updated successfully!'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#182133] border border-[#2c3d5c] focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'কলেজের নাম *' : 'College Name *'}
                </label>
                <div className="relative">
                  <Building size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-[#182133] border border-[#2c3d5c] focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                    placeholder="e.g. Notre Dame College, Dhaka"
                  />
                </div>
              </div>

              {/* HSC Batch */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'এইচএসসি ব্যাচ *' : 'HSC Batch *'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['HSC 2025', 'HSC 2026', 'HSC 2027'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBatch(b)}
                      className={`py-2 px-2 rounded-xl font-bold text-xs border transition-all cursor-pointer text-center ${
                        batch === b
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                          : 'bg-[#182133] text-slate-400 border-[#2c3d5c] hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'ফোন নম্বর (ঐচ্ছিক)' : 'Phone Number (Optional)'}
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#182133] border border-[#2c3d5c] focus:border-emerald-500 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                    placeholder="017xxxxxxxx"
                  />
                </div>
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {isBn ? 'অ্যাভাটার ছবি পরিবর্তন করুন' : 'Select Avatar Picture'}
              </label>
              <div className="flex items-center gap-3">
                {avatarOptions.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatar(opt)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      avatar === opt ? 'border-emerald-400 scale-110 shadow-lg ring-2 ring-emerald-500/30' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={opt} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer active:scale-95"
              >
                <Save size={14} />
                <span>{isBn ? '💾 পরিবর্তন সংরক্ষণ করুন' : '💾 Save Changes'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Weak Words Section with PDF Export */}
        <WeakWordsSection
          weakWords={effectiveWeakWords}
          onRemoveWeakWord={onRemoveWeakWord}
          onOpenFlashcards={() => {
            onClose();
            if (onOpenFlashcards) onOpenFlashcards();
          }}
          lang={lang}
          studentInfo={studentInfo}
        />
      </div>
    </div>
  );
}
