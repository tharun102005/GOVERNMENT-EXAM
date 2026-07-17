import { useState, useMemo, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function QuestionPalette({
  totalQuestions,
  current,
  answers,
  marked,
  visited,
  onSelectQuestion,
  onSubmitTest
}) {
  const [jumpInput, setJumpInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [pageRange, setPageRange] = useState(0); // 0 = 1-50, 1 = 51-100, 2 = 101-150, 3 = 151-200

  const PAGE_SIZE = 50;
  const totalPages = Math.ceil(totalQuestions / PAGE_SIZE);

  // Status computation for each question index
  const getStatus = useCallback((index) => {
    const isAnswered = answers[index] !== undefined;
    const isMarked = !!marked[index];
    const isVisited = !!visited[index];

    if (isAnswered && isMarked) return 'answered-marked';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    if (isVisited) return 'not-answered';
    return 'not-visited';
  }, [answers, marked, visited]);

  // Color mappings matching exact specifications
  const getButtonStyle = (index) => {
    const status = getStatus(index);
    const isCurrent = index === current;

    if (isCurrent) {
      return 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800 font-black shadow-lg scale-105 z-10';
    }

    switch (status) {
      case 'answered':
        return 'bg-emerald-500 hover:bg-emerald-600 text-white font-bold border-emerald-600';
      case 'marked':
        return 'bg-purple-600 hover:bg-purple-700 text-white font-bold border-purple-700';
      case 'answered-marked':
        return 'bg-purple-800 hover:bg-purple-900 text-white font-bold border-2 border-emerald-400 relative';
      case 'not-answered':
        return 'bg-amber-500 hover:bg-amber-600 text-white font-bold border-amber-600';
      case 'not-visited':
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700';
    }
  };

  const handleJump = (e) => {
    e.preventDefault();
    const qNum = parseInt(jumpInput, 10);
    if (!isNaN(qNum) && qNum >= 1 && qNum <= totalQuestions) {
      onSelectQuestion(qNum - 1);
      // Auto switch page range to match question
      setPageRange(Math.floor((qNum - 1) / PAGE_SIZE));
      setJumpInput('');
    }
  };

  // Filter logic
  const filteredIndexes = useMemo(() => {
    const indexes = [];
    const start = pageRange * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, totalQuestions);

    for (let i = start; i < end; i++) {
      const status = getStatus(i);
      if (activeFilter === 'All') {
        indexes.push(i);
      } else if (activeFilter === 'Answered' && (status === 'answered' || status === 'answered-marked')) {
        indexes.push(i);
      } else if (activeFilter === 'Not Answered' && status === 'not-answered') {
        indexes.push(i);
      } else if (activeFilter === 'Marked' && (status === 'marked' || status === 'answered-marked')) {
        indexes.push(i);
      } else if (activeFilter === 'Not Visited' && status === 'not-visited') {
        indexes.push(i);
      }
    }
    return indexes;
  }, [totalQuestions, pageRange, activeFilter, getStatus]);

  // Summaries
  const stats = useMemo(() => {
    let answered = 0;
    let markedCount = 0;
    let answeredMarked = 0;
    let notAnswered = 0;
    let notVisited = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const s = getStatus(i);
      if (s === 'answered') answered++;
      else if (s === 'marked') markedCount++;
      else if (s === 'answered-marked') { answeredMarked++; markedCount++; }
      else if (s === 'not-answered') notAnswered++;
      else notVisited++;
    }

    return { answered: answered + answeredMarked, marked: markedCount, notAnswered, notVisited };
  }, [totalQuestions, getStatus]);


  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 sticky top-20 flex flex-col max-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm tracking-wide uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Question Palette ({totalQuestions})
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setPageRange(p => Math.max(0, p - 1))}
              disabled={pageRange === 0}
              className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5">{pageRange * PAGE_SIZE + 1}–{Math.min((pageRange + 1) * PAGE_SIZE, totalQuestions)}</span>
            <button
              onClick={() => setPageRange(p => Math.min(totalPages - 1, p + 1))}
              disabled={pageRange === totalPages - 1}
              className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded disabled:opacity-30"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Jump & Filter */}
      <div className="space-y-2 mb-3">
        <form onSubmit={handleJump} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="number"
              min="1"
              max={totalQuestions}
              placeholder="Jump to Q# (e.g. 45)"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition"
          >
            Go
          </button>
        </form>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <Filter className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
          {['All', 'Answered', 'Not Answered', 'Marked', 'Not Visited'].map((filterName) => (
            <button
              key={filterName}
              onClick={() => setActiveFilter(filterName)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                activeFilter === filterName
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-[11px] border border-slate-100 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
          <span className="text-slate-600 dark:text-slate-300">Answered ({stats.answered})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
          <span className="text-slate-600 dark:text-slate-300">Not Answered ({stats.notAnswered})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-600 shrink-0"></span>
          <span className="text-slate-600 dark:text-slate-300">Marked ({stats.marked})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-800 ring-1 ring-emerald-400 shrink-0"></span>
          <span className="text-slate-600 dark:text-slate-300">Ans & Marked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shrink-0"></span>
          <span className="text-slate-600 dark:text-slate-300">Not Visited ({stats.notVisited})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-300 shrink-0"></span>
          <span className="text-slate-600 dark:text-slate-300 font-bold">Current</span>
        </div>
      </div>

      {/* 10-column Question Button Grid */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pb-2">
          {filteredIndexes.length === 0 ? (
            <div className="col-span-10 text-center py-6 text-xs text-slate-400">
              No questions match "{activeFilter}" filter in this range.
            </div>
          ) : (
            filteredIndexes.map((idx) => {
              const isAnsMarked = getStatus(idx) === 'answered-marked';
              return (
                <button
                  key={idx}
                  onClick={() => onSelectQuestion(idx)}
                  className={`h-8 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center relative cursor-pointer ${getButtonStyle(idx)}`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                  {isAnsMarked && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-purple-900"></span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
        <button
          onClick={onSubmitTest}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs hover:from-emerald-600 hover:to-teal-700 transition shadow-md shadow-emerald-500/20 active:scale-98 flex items-center justify-center gap-1.5"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
