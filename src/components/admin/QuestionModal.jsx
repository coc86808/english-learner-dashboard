import React, { useState, useEffect } from 'react';
import { X, Save, BookOpen, HelpCircle, Check, Sparkles } from 'lucide-react';

export default function QuestionModal({ isOpen, onClose, onSave, editingQuestion, lang }) {
  const isBn = lang === 'bn';

  const [formData, setFormData] = useState({
    word: '',
    bengaliMeaning: '',
    unit: 'Unit 1: Lesson 1 (Nelson Mandela)',
    partsOfSpeech: 'Noun',
    questionText: '',
    options: ['', '', '', ''],
    correctOption: 0,
    synonyms: '',
    antonyms: '',
    exampleSentence: '',
    boardExamTag: 'HSC Board Exam 2026',
    difficulty: 'Medium'
  });

  useEffect(() => {
    if (editingQuestion) {
      setFormData(editingQuestion);
    } else {
      setFormData({
        word: '',
        bengaliMeaning: '',
        unit: 'Unit 1: Lesson 1 (Nelson Mandela)',
        partsOfSpeech: 'Noun',
        questionText: '',
        options: ['', '', '', ''],
        correctOption: 0,
        synonyms: '',
        antonyms: '',
        exampleSentence: '',
        boardExamTag: 'HSC Board Exam 2026',
        difficulty: 'Medium'
      });
    }
  }, [editingQuestion, isOpen]);

  if (!isOpen) return null;

  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index] = value;
    setFormData({ ...formData, options: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.questionText.trim()) {
      alert(isBn ? 'অনুগ্রহ করে শব্দ এবং প্রশ্নের বিবরণ পূরণ করুন' : 'Please fill in the Word and Question text');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base md:text-lg">
            <BookOpen size={20} />
            <span>
              {editingQuestion
                ? isBn ? 'প্রশ্ন / শব্দ সম্পাদনা করুন' : 'Edit HSC Vocab & Question'
                : isBn ? 'নতুন HSC শব্দ ও প্রশ্ন যুক্ত করুন' : 'Add New HSC Vocab & Question'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Word & Bengali Meaning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'মূল শব্দ (Word)' : 'Target Word'} *
              </label>
              <input
                type="text"
                required
                value={formData.word}
                onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                placeholder="e.g., Emancipation"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'বাংলা অর্থ (Bengali Meaning)' : 'Bengali Meaning'} *
              </label>
              <input
                type="text"
                required
                value={formData.bengaliMeaning}
                onChange={(e) => setFormData({ ...formData, bengaliMeaning: e.target.value })}
                placeholder="e.g., মুক্তি / স্বাধীনতা"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>
          </div>

          {/* Row 2: Unit & Parts of Speech */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'পাঠ্যবইয়ের অধ্যায় (Unit & Lesson)' : 'Textbook Unit & Lesson'}
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., Unit 1: Lesson 1 (Nelson Mandela)"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'Parts of Speech' : 'Parts of Speech'}
              </label>
              <select
                value={formData.partsOfSpeech}
                onChange={(e) => setFormData({ ...formData, partsOfSpeech: e.target.value })}
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-white outline-none"
              >
                <option value="Noun">Noun</option>
                <option value="Verb">Verb</option>
                <option value="Adjective">Adjective</option>
                <option value="Adverb">Adverb</option>
                <option value="Preposition">Preposition</option>
                <option value="Phrase / Idiom">Phrase / Idiom</option>
              </select>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isBn ? 'MCQ প্রশ্ন / Quiz Prompt' : 'MCQ Question Text'} *
            </label>
            <input
              type="text"
              required
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
              placeholder="e.g., What is the closest SYNONYM of the word 'Emancipation'?"
              className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
            />
          </div>

          {/* 4 Options & Correct Answer Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {isBn ? '৪টি অপশন (সঠিক উত্তরে টিক দিন)' : '4 Options (Click radio on the correct answer)'} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2 rounded-xl border ${
                    formData.correctOption === idx
                      ? 'bg-emerald-950/50 border-emerald-500'
                      : 'bg-[#161c2b] border-[#232c3f]'
                  }`}
                >
                  <input
                    type="radio"
                    name="correctOptionRadio"
                    checked={formData.correctOption === idx}
                    onChange={() => setFormData({ ...formData, correctOption: idx })}
                    className="w-4 h-4 text-emerald-500 focus:ring-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    required
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                    className="flex-1 bg-transparent text-sm text-white outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Synonyms & Antonyms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'সমার্থক শব্দসমূহ (Synonyms)' : 'Synonyms (comma separated)'}
              </label>
              <input
                type="text"
                value={formData.synonyms}
                onChange={(e) => setFormData({ ...formData, synonyms: e.target.value })}
                placeholder="Liberation, Freedom, Independence"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'বিপরীত শব্দসমূহ (Antonyms)' : 'Antonyms (comma separated)'}
              </label>
              <input
                type="text"
                value={formData.antonyms}
                onChange={(e) => setFormData({ ...formData, antonyms: e.target.value })}
                placeholder="Bondage, Slavery, Captivity"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>
          </div>

          {/* Row 5: Textbook Example Sentence */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isBn ? 'পাঠ্যবইয়ের উদাহরণ বাক্য (Textbook Example Sentence)' : 'Textbook Context Sentence'}
            </label>
            <textarea
              rows={2}
              value={formData.exampleSentence}
              onChange={(e) => setFormData({ ...formData, exampleSentence: e.target.value })}
              placeholder="e.g., 'We have, at last, achieved our political emancipation.'"
              className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
            />
          </div>

          {/* Row 6: Board Exam Tag & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'বোর্ড পরীক্ষার ট্যাগ (Board Tag)' : 'Board Exam Tag'}
              </label>
              <input
                type="text"
                value={formData.boardExamTag}
                onChange={(e) => setFormData({ ...formData, boardExamTag: e.target.value })}
                placeholder="Dhaka Board 2024, HSC 1st Paper"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'কঠিনতার মাত্রা (Difficulty)' : 'Difficulty Level'}
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-white outline-none"
              >
                <option value="Easy">Easy (সহজ)</option>
                <option value="Medium">Medium (মাঝারি)</option>
                <option value="Hard">Hard (কঠিন)</option>
              </select>
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-[#1f2738] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-950/40 inline-flex items-center gap-2 transition-all"
            >
              <Save size={16} />
              <span>{isBn ? 'সংরক্ষণ করুন' : 'Save Question'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
