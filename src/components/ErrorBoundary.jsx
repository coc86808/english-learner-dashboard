import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI Exception caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('hsc_last_saved_session_key');
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] p-6 sm:p-10 rounded-3xl bg-[#131824] border border-rose-500/30 text-center space-y-4 max-w-xl mx-auto my-8 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center">
            <AlertTriangle size={28} />
          </div>
          <h3 className="text-xl font-bold text-white">অনুশীলন পেজ লোড হতে সাময়িক সমস্যা হয়েছে</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            কোনো সংরক্ষিত ডেটা বা ব্রাউজার ক্যাশে কারণে সমস্যা হতে পারে। নিচের বাটনে ক্লিক করে পুনরায় চালু করুন।
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>রিলোড করে পুনরায় শুরু করুন</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
