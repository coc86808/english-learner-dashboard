import React, { useState } from 'react';
import {
  Sliders,
  Timer,
  Volume2,
  Shuffle,
  Award,
  ShieldAlert,
  Save,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export default function QuizMakerSettings({ lang = 'bn' }) {
  const isBn = lang === 'bn';

  const [settings, setSettings] = useState({
    quizTimerMinutes: 15,
    soundEffects: true,
    randomizeQuestions: true,
    randomizeOptions: true,
    passingScorePercent: 80,
    enableCertificate: true,
    negativeMarking: false,
    negativeMarkValue: 0.25,
    spacedRepetitionRounds: 3,
    spacedRepetitionGap: 4,
    showInstantExplanation: true,
    pronunciationAudio: true
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131824] border border-[#1d2536] p-5 rounded-2xl">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-1">
            <Sliders size={14} />
            <span>Quiz Maker Pro v21.7.5 Engine Settings</span>
          </div>
          <h2 className="text-white font-bold text-lg md:text-xl">
            {isBn ? 'কুইজ মেকার সেটিংস ও লার্নিং অ্যালগরিদম কনফিগারেশন' : 'Quiz Maker & Learning Engine Configuration'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? 'টাইমার, সাউন্ড ইফেক্ট, স্পেসড রিপিটেশন অ্যালগরিদম, সার্টিফিকেট জেনারেটর ও নেগেটিভ মার্কিং কন্ট্রোল।'
              : 'Configure timer, audio effects, 3x repetition rules, certificates, and grading policies.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
        >
          <Save size={16} />
          <span>{isBn ? 'সেটিংস সেভ করুন' : 'Save Changes'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{isBn ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Quiz Maker settings saved successfully!'}</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Section 1: Spaced Repetition Rules */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 md:p-6 rounded-2xl shadow-card space-y-4">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <RotateCcw className="text-emerald-400" size={18} />
            <span>{isBn ? 'স্পেসড রিপিটেশন অ্যালগরিদম (Spaced Repetition)' : 'Spaced Repetition Rules'}</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isBn ? 'সম্পন্ন (Done) করতে প্রয়োজনীয় ধারাবাহিক সঠিক উত্তর' : 'Consecutive Correct Answers for "Done"'}
              </label>
              <select
                value={settings.spacedRepetitionRounds}
                onChange={(e) => handleChange('spacedRepetitionRounds', Number(e.target.value))}
                className="w-full bg-[#0e131e] border border-[#232c3f] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500"
              >
                <option value={2}>2 Times Correct</option>
                <option value={3}>3 Times Correct (Standard Rule)</option>
                <option value={4}>4 Times Correct (Deep Retention)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isBn ? 'প্রশ্ন পুনরাবৃত্তির ব্যবধান (Gap Buffer)' : 'Spacing Gap Buffer between Repeats'}
              </label>
              <select
                value={settings.spacedRepetitionGap}
                onChange={(e) => handleChange('spacedRepetitionGap', Number(e.target.value))}
                className="w-full bg-[#0e131e] border border-[#232c3f] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500"
              >
                <option value={3}>3 Questions Gap</option>
                <option value={4}>3 to 4 Questions Gap (Recommended)</option>
                <option value={5}>5 Questions Gap</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Audio & Sound Effects */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 md:p-6 rounded-2xl shadow-card space-y-4">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Volume2 className="text-amber-400" size={18} />
            <span>{isBn ? 'সাউন্ড ও অডিও ইফেক্টস (Sound Effects)' : 'Sound & Audio Effects'}</span>
          </h3>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e131e] border border-[#1b2333]">
              <div>
                <span className="font-semibold text-white text-xs block">
                  {isBn ? 'সঠিক ও ভুল উত্তরের সাউন্ড ইফেক্ট' : 'Interactive Sound Synthesizer'}
                </span>
                <span className="text-[10px] text-slate-400">Play chime on correct and buzz on mistake</span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={() => handleToggle('soundEffects')}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e131e] border border-[#1b2333]">
              <div>
                <span className="font-semibold text-white text-xs block">
                  {isBn ? 'ইংরেজি শব্দের অডিও উচ্চারণ (Text-to-Speech)' : 'Pronunciation Audio'}
                </span>
                <span className="text-[10px] text-slate-400">Web Speech API pronunciation</span>
              </div>
              <input
                type="checkbox"
                checked={settings.pronunciationAudio}
                onChange={() => handleToggle('pronunciationAudio')}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Timer & Randomization */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 md:p-6 rounded-2xl shadow-card space-y-4">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Timer className="text-cyan-400" size={18} />
            <span>{isBn ? 'টাইমার ও র‍্যান্ডমাইজেশন' : 'Timer & Randomization'}</span>
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1">
                {isBn ? 'মডেল টেস্ট সময়কাল (মিনিট)' : 'Exam Timer (Minutes)'}
              </label>
              <input
                type="number"
                value={settings.quizTimerMinutes}
                onChange={(e) => handleChange('quizTimerMinutes', Number(e.target.value))}
                className="w-full bg-[#0e131e] border border-[#232c3f] rounded-xl px-3.5 py-2 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e131e] border border-[#1b2333]">
              <div>
                <span className="font-semibold text-white text-xs block">
                  {isBn ? 'অপশন এলোমেলো করা (Shuffle Options)' : 'Randomize Answer Options'}
                </span>
                <span className="text-[10px] text-slate-400">Prevents answer guessing pattern</span>
              </div>
              <input
                type="checkbox"
                checked={settings.randomizeOptions}
                onChange={() => handleToggle('randomizeOptions')}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Certificate of Mastery Generator */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 md:p-6 rounded-2xl shadow-card space-y-4">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Award className="text-yellow-400" size={18} />
            <span>{isBn ? 'সার্টিফিকেট অব মাস্টারি জেনারেটর' : 'Mastery Certificate Generator'}</span>
          </h3>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e131e] border border-[#1b2333]">
              <div>
                <span className="font-semibold text-white text-xs block">
                  {isBn ? '১০০% মাস্টারি হলে সার্টিফিকেট প্রদান' : 'Award Certificate on 100% Mastery'}
                </span>
                <span className="text-[10px] text-slate-400">Official printable certificate with verified seal</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableCertificate}
                onChange={() => handleToggle('enableCertificate')}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e131e] border border-[#1b2333]">
              <div>
                <span className="font-semibold text-white text-xs block">
                  {isBn ? 'তাৎক্ষণিক পাঠ্যবই ব্যাখ্যা প্রদর্শন' : 'Instant Contextual Explanation'}
                </span>
                <span className="text-[10px] text-slate-400">Show synonyms, antonyms & textbook quote</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showInstantExplanation}
                onChange={() => handleToggle('showInstantExplanation')}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
