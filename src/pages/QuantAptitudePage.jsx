import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Sparkles, Bookmark, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import QuantTopicCard from '../components/quant/QuantTopicCard';
import QuantFormulaModal from '../components/quant/QuantFormulaModal';
import { quantTopicsList as initialTopics } from '../data/quantTopicsData';

export default function QuantAptitudePage() {
  const navigate = useNavigate();

  const [topics, setTopics] = useState(initialTopics);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All'); // 'All' | 'Easy' | 'Medium' | 'Hard'
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedFormulaTopic, setSelectedFormulaTopic] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter(topic => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || topic.name.toLowerCase().includes(q) || topic.summary.toLowerCase().includes(q);
      const matchesDiff = difficultyFilter === 'All' || topic.difficulty === difficultyFilter;
      const matchesBookmark = !onlyBookmarks || topic.bookmarked;
      return matchesSearch && matchesDiff && matchesBookmark;
    });
  }, [topics, searchQuery, difficultyFilter, onlyBookmarks]);

  // Overall stats
  const totalQuestions = useMemo(() => topics.reduce((acc, t) => acc + t.questionsCount, 0), [topics]);
  const totalPYQs = useMemo(() => topics.reduce((acc, t) => acc + t.pyqCount, 0), [topics]);
  const avgProgress = useMemo(() => Math.round(topics.reduce((acc, t) => acc + t.progress, 0) / topics.length), [topics]);
  const avgAccuracy = useMemo(() => Math.round(topics.reduce((acc, t) => acc + t.accuracy, 0) / topics.length), [topics]);

  const handleToggleBookmark = (id) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, bookmarked: !t.bookmarked } : t));
  };

  const handleStartPractice = (topic) => {
    navigate('/quiz', {
      state: {
        topicId: topic.id,
        subjectName: `Quant: ${topic.name}`,
        icon: '🧮',
        questionsCount: 20
      }
    });
  };

  const handleStartMock = (topic) => {
    navigate('/quiz', {
      state: {
        topicId: topic.id,
        subjectName: `Quant Mock: ${topic.name}`,
        icon: '🏆',
        questionsCount: 30
      }
    });
  };

  const handleOpenAI = (topic) => {
    setToastMessage(`AI Concept Assistant generating detailed step-by-step breakdown for ${topic.name}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased pb-20">
      <Navbar />

      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-10">

        {/* ── HERO BANNER ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white rounded-[24px] p-8 md:p-12 shadow-xl border border-blue-500/20">
          <div className="max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-amber-300">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Standard Government Exam Aptitude Syllabus (40 Topics)
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Quantitative Aptitude Master Syllabus
            </h1>

            <p className="text-base text-blue-100 leading-relaxed max-w-2xl">
              Complete coverage of all 40 quantitative aptitude topics for UPSC, TNPSC, SSC CGL/CHSL, RRB NTPC, Banking, Police & Defence exams. Practice 200–1000 questions per topic with formulas and shortcut tricks.
            </p>
          </div>
        </section>

        {/* ── OVERALL SYLLABUS STATS ─────────────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-2xl">
              40 Topics
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Full Quant Syllabus
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-2xl">
              {totalQuestions.toLocaleString()}+ Qs
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Topic Practice Bank
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-purple-600 dark:text-purple-400 font-extrabold text-2xl">
              {totalPYQs.toLocaleString()}+
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Solved PYQs Included
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-amber-500 dark:text-amber-400 font-extrabold text-2xl">
              {avgAccuracy}%
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Average Quant Accuracy
            </div>
          </div>
        </section>

        {/* ── SEARCH & FILTER CONTROLS ───────────────────────────────────────── */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[24px] p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topic name or concept (e.g. Boats, Profit, Permutation)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Difficulty Pills & Bookmarks Filter */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs">
              <span className="text-slate-400 font-bold shrink-0">Difficulty:</span>
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                    difficultyFilter === diff
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}

              <button
                onClick={() => setOnlyBookmarks(!onlyBookmarks)}
                className={`px-3.5 py-2 rounded-xl font-bold transition shrink-0 flex items-center gap-1 cursor-pointer ${
                  onlyBookmarks
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-white' : ''}`} />
                <span>Bookmarked</span>
              </button>
            </div>

          </div>
        </section>

        {/* ── TOPICS GRID (40 TOPICS) ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Quantitative Aptitude Topics ({filteredTopics.length} of 40)
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              Syllabus Completion: {avgProgress}%
            </span>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-12 text-center space-y-4">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching aptitude topics found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try clearing your search query or setting difficulty filter to "All".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('All');
                  setOnlyBookmarks(false);
                }}
                className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map(topic => (
                <QuantTopicCard
                  key={topic.id}
                  topic={topic}
                  onStartPractice={handleStartPractice}
                  onOpenMock={handleStartMock}
                  onOpenAI={handleOpenAI}
                  onOpenFormula={setSelectedFormulaTopic}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Formula Sheet Modal */}
      {selectedFormulaTopic && (
        <QuantFormulaModal
          topic={selectedFormulaTopic}
          onClose={() => setSelectedFormulaTopic(null)}
          onStartPractice={handleStartPractice}
        />
      )}
    </div>
  );
}
