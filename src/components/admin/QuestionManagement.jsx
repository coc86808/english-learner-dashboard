import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit3, Trash2, UploadCloud, Tag, CheckCircle2, Filter } from 'lucide-react';
import QuestionModal from './QuestionModal';
import BulkUploadModal from './BulkUploadModal';

export default function QuestionManagement({ questions, onUpdateQuestions, lang }) {
  const isBn = lang === 'bn';
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState('All');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const units = ['All', ...new Set(questions.map((q) => q.unit))];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.bengaliMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.synonyms && q.synonyms.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesUnit = unitFilter === 'All' || q.unit === unitFilter;
    return matchesSearch && matchesUnit;
  });

  const handleSaveQuestion = (questionData) => {
    if (editingQuestion) {
      const updated = questions.map((q) => (q.id === editingQuestion.id ? { ...q, ...questionData } : q));
      onUpdateQuestions(updated);
    } else {
      const created = {
        ...questionData,
        id: `q-${Date.now()}`
      };
      onUpdateQuestions([created, ...questions]);
    }
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm(isBn ? 'আপনি কি নিশ্চিত এই প্রশ্ন ও শব্দটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this question?')) {
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  const handleBulkImport = (newQuestionsList) => {
    onUpdateQuestions([...newQuestionsList, ...questions]);
  };

  const handleOpenEdit = (q) => {
    setEditingQuestion(q);
    setIsQuestionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131824] border border-[#1d2536] p-5 rounded-2xl">
        <div>
          <h2 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
            <BookOpen className="text-amber-400" size={22} />
            <span>{isBn ? 'HSC ভোকাবুলারি ও প্রশ্নব্যাংক ব্যবস্থাপনা' : 'HSC Vocab & Question Bank Manager'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? `মোট প্রশ্ন ও শব্দ ভাণ্ডার: ${questions.length} টি`
              : `Total questions & vocabulary items: ${questions.length}`}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-[#1a2336] hover:bg-[#222e47] border border-[#2c3a54] text-cyan-300 font-semibold text-xs md:text-sm inline-flex items-center gap-1.5 transition-all shadow-md"
          >
            <UploadCloud size={16} />
            <span>{isBn ? 'বাল্ক ইমপোর্ট' : 'Bulk Import'}</span>
          </button>

          <button
            onClick={() => {
              setEditingQuestion(null);
              setIsQuestionModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs md:text-sm inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-all"
          >
            <Plus size={16} />
            <span>{isBn ? 'নতুন প্রশ্ন যোগ' : 'Add Question'}</span>
          </button>
        </div>
      </div>

      {/* Search & Unit Filter */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? 'শব্দ, অর্থ বা প্রশ্ন দিয়ে খুঁজুন...' : 'Search by word, Bengali meaning, or question...'}
            className="w-full bg-[#131824] border border-[#1d2536] focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="w-full md:w-72">
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="w-full bg-[#131824] border border-[#1d2536] focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none"
          >
            {units.map((u, i) => (
              <option key={i} value={u}>
                {u === 'All' ? (isBn ? 'সকল অধ্যায় / Units' : 'All Units') : u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions Cards / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-[#131824] border border-[#1d2536] hover:border-[#2a364d] rounded-2xl p-5 shadow-card flex flex-col justify-between group transition-all"
          >
            <div>
              {/* Header: Word & Unit Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-extrabold text-base md:text-lg tracking-tight group-hover:text-emerald-400 transition-colors">
                      {q.word}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {q.partsOfSpeech}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                    {q.bengaliMeaning}
                  </span>
                </div>

                <span className="text-[10px] font-medium bg-[#192233] text-cyan-300 px-2.5 py-1 rounded-md border border-[#27344d] text-right shrink-0">
                  {q.unit}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-xs text-slate-300 font-medium my-3 p-2.5 bg-[#0f1420] rounded-xl border border-[#1b2333]">
                {q.questionText}
              </p>

              {/* Options list */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                      q.correctOption === idx
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold'
                        : 'bg-[#161c2b] border-[#222c40] text-slate-400'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1e2738] flex items-center justify-center text-[10px] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="truncate">{opt}</span>
                  </div>
                ))}
              </div>

              {/* Synonyms & Antonyms */}
              {(q.synonyms || q.antonyms) && (
                <div className="text-[11px] text-slate-400 space-y-1 mb-2">
                  {q.synonyms && (
                    <div>
                      <span className="text-emerald-400 font-semibold">Synonyms: </span>
                      <span>{q.synonyms}</span>
                    </div>
                  )}
                  {q.antonyms && (
                    <div>
                      <span className="text-rose-400 font-semibold">Antonyms: </span>
                      <span>{q.antonyms}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions & Tags */}
            <div className="pt-3 border-t border-[#1d2536] flex items-center justify-between mt-2">
              <span className="text-[10px] text-slate-500 font-medium">
                {q.boardExamTag}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(q)}
                  title="Edit Question"
                  className="px-2.5 py-1 rounded-lg bg-[#192233] hover:bg-[#222e44] text-slate-300 hover:text-emerald-400 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <Edit3 size={13} />
                  <span>{isBn ? 'এডিট' : 'Edit'}</span>
                </button>

                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  title="Delete Question"
                  className="p-1.5 rounded-lg bg-[#192233] hover:bg-rose-950 text-slate-300 hover:text-rose-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Question Modal */}
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onSave={handleSaveQuestion}
        editingQuestion={editingQuestion}
        lang={lang}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onBulkImport={handleBulkImport}
        lang={lang}
      />
    </div>
  );
}
