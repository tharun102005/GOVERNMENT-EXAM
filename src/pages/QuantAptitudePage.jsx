import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { ChevronDown, ChevronRight, Lock, CheckCircle, Clock, Play, BookOpen, Calculator } from 'lucide-react';

const quantModules = [
  {
    category: 'Arithmetic & Commercial Math',
    topics: [
      { id: 'time-work', name: 'Time & Work', questions: 120, estTime: '45 mins', difficulty: 'Moderate', completed: true, locked: false },
      { id: 'boats-streams', name: 'Boats & Streams', questions: 85, estTime: '30 mins', difficulty: 'Moderate', completed: true, locked: false },
      { id: 'ages', name: 'Problems on Ages', questions: 95, estTime: '35 mins', difficulty: 'Easy', completed: true, locked: false },
      { id: 'profit-loss', name: 'Profit, Loss & Discount', questions: 150, estTime: '60 mins', difficulty: 'High', completed: false, locked: false },
    ],
  },
  {
    category: 'Number Systems & Algebra',
    topics: [
      { id: 'num-sys', name: 'Number System & HCF/LCM', questions: 210, estTime: '50 mins', difficulty: 'Easy', completed: true, locked: false },
      { id: 'avg', name: 'Average & Percentages', questions: 180, estTime: '40 mins', difficulty: 'Moderate', completed: false, locked: false },
      { id: 'simp', name: 'Simplification & Approximation', questions: 140, estTime: '30 mins', difficulty: 'Easy', completed: false, locked: false },
    ],
  },
  {
    category: 'Advanced Math & Geometry',
    topics: [
      { id: 'stats', name: 'Statistics & Data Interpretation', questions: 190, estTime: '60 mins', difficulty: 'High', completed: false, locked: false },
      { id: 'mensuration', name: 'Mensuration 2D & 3D', questions: 160, estTime: '75 mins', difficulty: 'High', completed: false, locked: true },
      { id: 'trig', name: 'Trigonometry & Heights/Distances', questions: 110, estTime: '55 mins', difficulty: 'High', completed: false, locked: true },
    ],
  },
];

export default function QuantAptitudePage() {
  const [expanded, setExpanded] = useState(['Arithmetic & Commercial Math', 'Number Systems & Algebra']);

  const toggleCategory = (cat) => {
    setExpanded((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
              📘 Quantitative Aptitude Syllabus Tree
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Topic-wise Interactive Roadmap
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Complete each topic in sequence to unlock advanced modules and formula cheat sheets.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center gap-6">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Overall Progress</span>
              <div className="text-xl font-extrabold text-blue-600">4 / 10 Topics (40%)</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-sm">
              40%
            </div>
          </div>
        </div>

        {/* Tree View Modules */}
        <div className="space-y-6">
          {quantModules.map((module) => {
            const isOpen = expanded.includes(module.category);
            return (
              <div
                key={module.category}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleCategory(module.category)}
                  className="w-full p-5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/60 transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 font-extrabold text-base text-slate-900 dark:text-white">
                    {isOpen ? <ChevronDown className="w-5 h-5 text-blue-600" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                    <span>{module.category}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{module.topics.length} Topics</span>
                </button>

                {/* Module Topics List */}
                {isOpen && (
                  <div className="p-4 sm:p-6 space-y-3 border-t border-slate-100 dark:border-slate-800">
                    {module.topics.map((t) => (
                      <div
                        key={t.id}
                        className={`p-4 rounded-2xl border ${
                          t.locked
                            ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 opacity-60'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                        } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                      >
                        <div className="flex items-center gap-3">
                          {t.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : t.locked ? (
                            <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-blue-600 shrink-0" />
                          )}
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                              <span>{t.questions} Questions</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.estTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                              t.difficulty === 'Easy'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                                : t.difficulty === 'Moderate'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                            }`}
                          >
                            {t.difficulty}
                          </span>

                          {!t.locked ? (
                            <Link
                              to="/quiz"
                              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Practice Topic</span>
                            </Link>
                          ) : (
                            <span className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs flex items-center gap-1">
                              <Lock className="w-3.5 h-3.5" /> Locked
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
