import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Sparkles, BookOpen, FileText, 
  Award, TrendingUp, RotateCcw, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import PYQCard from '../components/pyq/PYQCard';
import PYQViewModal from '../components/pyq/PYQViewModal';
import PYQAIGeneratorModal from '../components/pyq/PYQAIGeneratorModal';
import { 
  pyqPapers, 
  pyqCategories,
  pyqSubjects, 
  pyqYears, 
  pyqLanguages, 
  pyqDifficulties, 
  pyqStatsSummary 
} from '../data/pyqData';

export default function PYQPage() {
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'oldest' | 'popular'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Modals state
  const [activeViewPaper, setActiveViewPaper] = useState(null);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter logic
  const filteredPapers = useMemo(() => {
    return pyqPapers.filter(paper => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        paper.title.toLowerCase().includes(query) ||
        paper.exam.toLowerCase().includes(query) ||
        paper.category.toLowerCase().includes(query) ||
        String(paper.year).includes(query);

      const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
      const matchesYear = selectedYear === 'All Years' || String(paper.year) === selectedYear;
      const matchesSubject = selectedSubject === 'All Subjects' || paper.subject === selectedSubject;
      const matchesLanguage = selectedLanguage === 'All Languages' || paper.languages.includes(selectedLanguage);
      const matchesDifficulty = selectedDifficulty === 'All Difficulties' || paper.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesYear && matchesSubject && matchesLanguage && matchesDifficulty;
    }).sort((a, b) => {
      if (sortBy === 'latest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedYear, selectedSubject, selectedLanguage, selectedDifficulty, sortBy]);

  // Paginated items
  const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE) || 1;
  const paginatedPapers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPapers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPapers, currentPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedYear('All Years');
    setSelectedSubject('All Subjects');
    setSelectedLanguage('All Languages');
    setSelectedDifficulty('All Difficulties');
    setSortBy('latest');
    setCurrentPage(1);
  };

  const handleDownload = (paper) => {
    setToastMessage(`Downloading official PDF for ${paper.title}...`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleStartPractice = (paper) => {
    navigate('/mock', { state: { selectedExamName: paper.exam, paperYear: paper.year } });
  };

  const handleAIMockGenerated = (config) => {
    setToastMessage(`Generated ${config.questionCount} Qs AI Mock Test for ${config.category} (${config.yearRange})! Launching test...`);
    setTimeout(() => {
      setToastMessage(null);
      navigate('/mock');
    }, 1500);
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
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Official Past Examination Papers (2015–2026)
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Previous Year Question Papers Repository
            </h1>

            <p className="text-base text-blue-100 leading-relaxed max-w-2xl">
              Access 1,480+ official question papers for UPSC, TNPSC, SSC, Banking, Railway, Police, Defence, TET, NEET, JEE & State Exams with verified answer keys and step-by-step AI solutions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsAIGeneratorOpen(true)}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Custom Mock Test Generator</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('pyq-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-6 rounded-xl border border-white/20 transition cursor-pointer"
              >
                Browse All Papers ↓
              </button>
            </div>
          </div>
        </section>

        {/* ── STATISTICS SECTION ─────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-2xl">
              {pyqStatsSummary.totalPapers.toLocaleString()}+
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Total Official Papers
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-2xl">
              {pyqStatsSummary.totalQuestions.toLocaleString()}+
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Solved Questions Bank
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-purple-600 dark:text-purple-400 font-extrabold text-2xl">
              {pyqStatsSummary.mostRepeatedCount.toLocaleString()}+
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Most Repeated Qs Tagged
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 text-center shadow-xs space-y-1">
            <div className="text-amber-500 dark:text-amber-400 font-extrabold text-2xl">
              +{pyqStatsSummary.successRateIncrease}
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wider uppercase">
              Avg Score Growth via PYQ
            </div>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED TOPICS & REPEATED QUESTIONS PREVIEW ────────────── */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[24px] p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 uppercase tracking-widest">
                PYQ Analytics Insights
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                Frequently Asked Topics & High-Yield Questions
              </h2>
            </div>
            <button
              onClick={() => setIsAIGeneratorOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Run AI Trend Analysis →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* Frequently Asked Topics */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Top 5 High-Weightage Exam Topics
              </h3>
              <div className="space-y-2">
                {pyqStatsSummary.frequentlyAskedTopics.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.topic}</div>
                      <div className="text-[11px] text-slate-400">{item.frequency}</div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold px-2.5 py-1 rounded-lg">
                      {item.avgWeightage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Repeated Questions */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                Verified Repeated Exam Questions
              </h3>
              <div className="space-y-2">
                {pyqStatsSummary.mostRepeatedQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{q.exam}</span>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">{q.year}</span>
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug">{q.question}</p>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Ans: {q.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SEARCH & FILTER CONTROLS ───────────────────────────────────────── */}
        <section id="pyq-grid" className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[24px] p-6 shadow-xs space-y-6">
          
          {/* Top Search Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search exam name or year (e.g. TNPSC, 2024, UPSC)..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
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

            {/* Category Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none text-xs">
              <span className="text-slate-400 font-bold shrink-0">Category:</span>
              {pyqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Select Filters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Year Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={e => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                {pyqYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Subject Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={e => { setSelectedSubject(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                {pyqSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Language Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Language</label>
              <select
                value={selectedLanguage}
                onChange={e => { setSelectedLanguage(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                {pyqLanguages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Difficulty Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={e => { setSelectedDifficulty(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                {pyqDifficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Sort Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                <option value="latest">Latest Year</option>
                <option value="oldest">Oldest Year</option>
                <option value="popular">Most Downloads</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── PAPERS CARDS GRID ──────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Available PYQ Question Papers ({filteredPapers.length})
            </h2>
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {paginatedPapers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[24px] p-12 text-center space-y-4">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching question papers found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try clearing your search filters or selecting another exam category to view available papers.
              </p>
              <button
                onClick={resetFilters}
                className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPapers.map(paper => (
                <PYQCard
                  key={paper.id}
                  paper={paper}
                  onView={setActiveViewPaper}
                  onPractice={handleStartPractice}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                    currentPage === idx + 1
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

      </main>

      {/* View Detail Modal */}
      {activeViewPaper && (
        <PYQViewModal
          paper={activeViewPaper}
          onClose={() => setActiveViewPaper(null)}
          onPractice={handleStartPractice}
          onDownload={handleDownload}
        />
      )}

      {/* AI Generator Modal */}
      <PYQAIGeneratorModal
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
        onGenerateMock={handleAIMockGenerated}
      />
    </div>
  );
}
