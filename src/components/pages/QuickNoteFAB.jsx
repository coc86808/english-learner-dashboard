import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool,
  Edit3,
  X,
  Check,
  FileText,
  Sparkles,
  ExternalLink,
  Tag,
  Layers
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

const QUICK_TAG_SUGGESTIONS = [
  'Passage Summary',
  'Vocabulary',
  'Grammar Rule',
  'Exam Tip',
  'Mistake Review'
];

export default function QuickNoteFAB({ lang = 'en', onNavigate }) {
  const isBn = lang === 'bn';
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [unitId, setUnitId] = useState('unit-1');
  const [lessonId, setLessonId] = useState('u1-l1');
  const [selectedTags, setSelectedTags] = useState(['Quick Capture']);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSaveQuickNote = (e) => {
    if (e) e.preventDefault();
    if (!content.trim() && !title.trim()) return;

    const newNote = {
      id: `note-quick-${Date.now()}`,
      title: title.trim() || (isBn ? 'কুইক ক্যাপচার নোট' : 'Quick Study Note'),
      content: content.trim(),
      unitId,
      lessonId,
      tags: selectedTags,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem('hsc_student_notes');
      let notesArray = [];
      if (existing) {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed)) notesArray = parsed;
      }
      const updated = [newNote, ...notesArray];
      localStorage.setItem('hsc_student_notes', JSON.stringify(updated));

      // Dispatch event to notify NotesPage and other open views
      window.dispatchEvent(new CustomEvent('hsc_student_notes_updated'));

      // Reset and show feedback
      setTitle('');
      setContent('');
      setSelectedTags(['Quick Capture']);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
        setIsOpen(false);
      }, 1200);
    } catch (err) {
      console.error('Error saving quick note:', err);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 lg:bottom-8 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(true)}
          title={isBn ? 'দ্রুত নোট নিন' : 'Quick Note Capture'}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-950/60 border-2 border-emerald-300/40 cursor-pointer group transition-all"
        >
          <Edit3 size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Quick Note</span>
        </motion.button>
      </div>

      {/* Slide-over / Modal for Quick Note */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full sm:max-w-md bg-[#131824] border border-[#223048] rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100 max-h-[90vh] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1f2b40]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <PenTool size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {isBn ? 'দ্রুত নোট নিন (Quick Note)' : 'Quick Note Capture'}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {isBn ? 'পড়ার মাঝেই ভাবনা ও পয়েন্ট সেভ করুন' : 'Capture study insights without leaving your page'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1b2538] hover:bg-[#25334d] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveQuickNote} className="space-y-3.5 flex-1 overflow-y-auto pr-1">
                {/* Unit & Lesson Quick Selectors */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">
                      {isBn ? 'ইউনিট:' : 'Unit:'}
                    </label>
                    <select
                      value={unitId}
                      onChange={(e) => setUnitId(e.target.value)}
                      className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      {hscUnits.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.unitNumber}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">
                      {isBn ? 'লেসন / ট্যাগ:' : 'Lesson Ref:'}
                    </label>
                    <input
                      type="text"
                      value={lessonId}
                      onChange={(e) => setLessonId(e.target.value)}
                      placeholder="e.g. Lesson 1"
                      className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'নোটের শিরোনাম:' : 'Note Title:'}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={isBn ? 'যেমন: The Parrot\'s Tale এর রূপক অর্থ...' : 'e.g. Key satire points...'}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'নোটের বিবরণ:' : 'Note Content:'}
                  </label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={isBn ? 'গুরুত্বপূর্ণ বাক্য, শব্দার্থ বা নিয়ম লিখুন...' : 'Type summary, grammar points, or difficult words here...'}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 resize-none font-sans leading-relaxed"
                  />
                </div>

                {/* Tag Pills */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1.5">
                    {isBn ? 'ট্যাগ নির্বাচন করুন:' : 'Suggested Tags:'}
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {QUICK_TAG_SUGGESTIONS.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleToggleTag(tag)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-[#182234] text-slate-400 hover:text-white border border-[#223048]'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Success Feedback Alert */}
                {showSuccessToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 justify-center"
                  >
                    <Check size={14} />
                    <span>{isBn ? 'নোটটি সফলভাবে সংরক্ষিত হয়েছে!' : 'Note saved successfully to storage!'}</span>
                  </motion.div>
                )}

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-[#1f2b40] flex items-center justify-between gap-2">
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate('/notes');
                      }}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <FileText size={12} />
                      <span>{isBn ? 'নোটস হাব খুলুন' : 'Open Notes Hub'}</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 rounded-xl bg-[#182234] hover:bg-[#202c42] text-slate-300 text-xs font-semibold"
                    >
                      {isBn ? 'বাতিল' : 'Cancel'}
                    </button>

                    <button
                      type="submit"
                      disabled={!content.trim() && !title.trim()}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Check size={14} />
                      <span>{isBn ? 'সেভ করুন' : 'Save Note'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
