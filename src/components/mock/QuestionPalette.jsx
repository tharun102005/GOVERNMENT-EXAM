import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, ChevronRight, Filter, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionPalette({
  totalQuestions,
  currentIndex,
  answers,
  skipped,
  marked,
  onSelectQuestion,
  onSubmitTest,
  timeLeft, // in seconds
  totalTime // in seconds
}) {
  const [jumpInput, setJumpInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showConfirm, setShowConfirm] = useState(false);
  const scrollRef = useRef(null);
  const questionRefs = useRef({});

  // Status mapping
  const getStatus = useCallback((idx) => {
    if (answers[idx] !== undefined) return 'answered';
    if (marked[idx]) return 'marked';
    if (skipped[idx]) return 'skipped';
    return 'not-visited';
  }, [answers, marked, skipped]);

  // Derived stats
  const stats = useMemo(() => {
    let answered = 0, skippedCount = 0, markedCount = 0, notVisited = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const s = getStatus(i);
      if (s === 'answered') answered++;
      else if (s === 'marked') markedCount++;
      else if (s === 'skipped') skippedCount++;
      else notVisited++;
    }
    return {
      total: totalQuestions,
      answered,
      skipped: skippedCount,
      marked: markedCount,
      notVisited,
      remaining: totalQuestions - answered
    };
  }, [totalQuestions, getStatus]);

  const filteredIndexes = useMemo(() => {
    const indexes = [];
    for (let i = 0; i < totalQuestions; i++) {
      const s = getStatus(i);
      if (searchInput && !(i + 1).toString().includes(searchInput)) continue;

      if (activeFilter === 'All') indexes.push(i);
      else if (activeFilter === 'Answered' && s === 'answered') indexes.push(i);
      else if (activeFilter === 'Skipped' && s === 'skipped') indexes.push(i);
      else if (activeFilter === 'Marked' && s === 'marked') indexes.push(i);
      else if (activeFilter === 'Not Visited' && s === 'not-visited') indexes.push(i);
    }
    return indexes;
  }, [totalQuestions, activeFilter, getStatus, searchInput]);

  // Auto scroll to current
  useEffect(() => {
    const el = questionRefs.current[currentIndex];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentIndex]);

  const handleJump = (e) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= totalQuestions) {
      onSelectQuestion(num - 1);
      setJumpInput('');
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 20 * 60) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (timeLeft > 5 * 60) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20 animate-pulse';
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round((stats.answered / totalQuestions) * 100) || 0;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[18px] border border-white/40 dark:border-slate-700/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5 sticky top-24 flex flex-col max-h-[calc(100vh-7rem)] overflow-hidden font-sans">
      
      {/* Header & Timer */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] shadow-[0_0_10px_rgba(79,70,229,0.5)]"></span>
          Question Palette
        </h2>
        <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-sm font-black ${getTimerColor()}`}>
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Circular Progress & Stats Overview */}
      <div className="flex items-center gap-5 bg-slate-50/50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/30 mb-5">
        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
          <svg className="w-14 h-14 -rotate-90 transform">
            <circle cx="28" cy="28" r="24" fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="4" />
            <circle 
              cx="28" cy="28" r="24" fill="none" 
              className="stroke-[#06B6D4] transition-all duration-1000 ease-out" 
              strokeWidth="4" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-extrabold text-slate-800 dark:text-white">{progressPercent}%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 flex-1">
          <div className="text-[11px] font-bold text-slate-500 flex justify-between">
            <span>Completed</span> <span className="text-slate-800 dark:text-slate-200">{stats.answered}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-500 flex justify-between">
            <span>Remaining</span> <span className="text-slate-800 dark:text-slate-200">{stats.remaining}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-500 flex justify-between">
            <span>Skipped</span> <span className="text-orange-500">{stats.skipped}</span>
          </div>
          <div className="text-[11px] font-bold text-slate-500 flex justify-between">
            <span>Marked</span> <span className="text-[#7C3AED]">{stats.marked}</span>
          </div>
        </div>
      </div>

      {/* Quick Search & Jump */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Q..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 text-slate-800 dark:text-slate-100"
          />
        </div>
        <form onSubmit={handleJump} className="flex gap-2 w-[110px]">
          <input
            type="number"
            min="1"
            max={totalQuestions}
            placeholder="Jump"
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            className="w-full px-2 py-1.5 text-xs text-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 text-slate-800 dark:text-slate-100"
          />
          <button type="submit" className="bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl hover:opacity-90 transition shadow-sm cursor-pointer">
            Go
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-2">
        {['All', 'Answered', 'Skipped', 'Marked', 'Not Visited'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === f 
                ? 'bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/30' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Question Grid */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 pb-4 -mr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700"
      >
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {filteredIndexes.length === 0 ? (
            <div className="col-span-full text-center py-10 text-sm text-slate-400 font-medium">
              No questions found.
            </div>
          ) : (
            <AnimatePresence>
              {filteredIndexes.map((idx) => {
                const s = getStatus(idx);
                const isCurrent = idx === currentIndex;
                
                // Colors matching requirements
                let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (s === 'answered') bgClass = 'bg-emerald-500 text-white shadow-emerald-500/30';
                else if (s === 'skipped') bgClass = 'bg-orange-500 text-white shadow-orange-500/30';
                else if (s === 'marked') bgClass = 'bg-[#7C3AED] text-white shadow-[#7C3AED]/30';

                const borderClass = isCurrent ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-[#06B6D4] border-transparent' : 'border border-transparent';

                return (
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: isCurrent ? 1.05 : 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    ref={(el) => questionRefs.current[idx] = el}
                    onClick={() => onSelectQuestion(idx)}
                    className={`h-11 rounded-xl text-[13px] font-black transition-all flex items-center justify-center cursor-pointer shadow-sm relative ${bgClass} ${borderClass}`}
                  >
                    {idx + 1}
                    {isCurrent && (
                      <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Floating Submit Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-black text-[13px] shadow-lg shadow-[#4F46E5]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
        >
          Submit Final Test
        </button>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl max-w-sm w-full border border-slate-100 dark:border-slate-800"
            >
              <div className="w-14 h-14 rounded-full bg-[#4F46E5]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-[#4F46E5]" />
              </div>
              <h3 className="text-xl font-extrabold text-center text-slate-900 dark:text-white mb-2">Submit Test?</h3>
              <p className="text-sm text-center text-slate-500 mb-6">
                You have answered <strong className="text-emerald-500">{stats.answered}</strong> out of {totalQuestions} questions. Are you sure you want to finish now?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { setShowConfirm(false); onSubmitTest(); }}
                  className="flex-1 py-3 rounded-xl bg-[#4F46E5] text-white font-bold hover:bg-[#4338ca] transition shadow-md shadow-[#4F46E5]/30 cursor-pointer"
                >
                  Yes, Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
