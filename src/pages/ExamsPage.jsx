import { useState } from 'react';
import { Search, Filter, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import ExamCard from '../components/ExamCard';
import { exams } from '../data/mockData';

export default function ExamsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = exams.filter(e => {
    const q = search.toLowerCase();
    return (
      (e.name.toLowerCase().includes(q) || (e.desc || '').toLowerCase().includes(q)) &&
      (filter === 'All' || e.difficulty === filter)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-20 space-y-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-200/60">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Exam Catalog
          </span>
          <h1 className="text-[34px] font-bold text-slate-900 leading-tight tracking-tight">
            Explore Government Exams
          </h1>
          <p className="text-[16px] text-slate-500 max-w-2xl leading-relaxed">
            Choose your target competitive exam and start practice with updated materials,
            full-length test series, subject questions, and real-time performance tracking.
          </p>
        </div>

        {/* ── Filter bar ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 shadow-xs flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 min-w-[280px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search exams (e.g. TNPSC, UPSC, SSC, Banking...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-[13px] text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Difficulty:
            </span>
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition cursor-pointer ${
                  filter === d
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* ── Count & Grid ───────────────────────────────────────────────── */}
        <div className="space-y-6">
          <p className="text-[14px] text-slate-500 font-semibold">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> {filtered.length === 1 ? 'exam category' : 'exam categories'}
          </p>

          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-[22px] p-16 text-center shadow-xs">
              <p className="text-slate-500 font-semibold text-[16px] mb-4">No government exams match your search filters.</p>
              <button
                onClick={() => { setSearch(''); setFilter('All'); }}
                className="text-blue-600 text-[14px] font-bold bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            /* 4-column responsive desktop grid (lg:grid-cols-4), 2-column tablet, 1-column mobile with 24px gap (gap-6) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((exam, i) => (
                <ExamCard key={i} exam={exam} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

