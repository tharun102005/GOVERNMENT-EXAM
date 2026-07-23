import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Search, Filter, Bookmark } from 'lucide-react';

const examsData = [
  {
    id: 'tnpsc-g4',
    title: 'TNPSC Group 4 2026',
    category: 'TNPSC',
    state: 'Tamil Nadu',
    eligibility: '10th / SSLC Pass',
    age: '18 - 32 Years',
    vacancies: '6,244',
    appDate: '24 Feb 2026',
    examDate: '09 Jun 2026',
    difficulty: 'Moderate',
    popular: true,
    trending: true,
    logo: '🎓',
  },
  {
    id: 'upsc-cse',
    title: 'UPSC Civil Services Prelims 2026',
    category: 'UPSC',
    state: 'All India',
    eligibility: 'Bachelor Degree',
    age: '21 - 32 Years',
    vacancies: '1,056',
    appDate: '05 Mar 2026',
    examDate: '24 May 2026',
    difficulty: 'High',
    popular: true,
    trending: true,
    logo: '🏛️',
  },
  {
    id: 'ssc-cgl',
    title: 'SSC CGL Tier I 2026',
    category: 'SSC',
    state: 'All India',
    eligibility: 'Bachelor Degree',
    age: '18 - 30 Years',
    vacancies: '17,727',
    appDate: '12 Apr 2026',
    examDate: '15 Jul 2026',
    difficulty: 'Moderate',
    popular: true,
    trending: false,
    logo: '📊',
  },
  {
    id: 'rrb-ntpc',
    title: 'RRB NTPC Graduate Level 2026',
    category: 'RRB',
    state: 'All India',
    eligibility: 'Bachelor Degree',
    age: '18 - 36 Years',
    vacancies: '8,113',
    appDate: '20 May 2026',
    examDate: '28 Aug 2026',
    difficulty: 'Moderate',
    popular: false,
    trending: true,
    logo: '🚂',
  },
  {
    id: 'sbi-po',
    title: 'SBI Bank PO 2026',
    category: 'Banking',
    state: 'All India',
    eligibility: 'Graduate',
    age: '21 - 30 Years',
    vacancies: '2,000',
    appDate: '01 Jun 2026',
    examDate: '10 Sep 2026',
    difficulty: 'High',
    popular: true,
    trending: false,
    logo: '🏦',
  },
  {
    id: 'tn-police-si',
    title: 'TN Police Sub-Inspector (SI) 2026',
    category: 'Police',
    state: 'Tamil Nadu',
    eligibility: 'Degree Pass',
    age: '20 - 30 Years',
    vacancies: '1,290',
    appDate: '15 Jul 2026',
    examDate: '20 Oct 2026',
    difficulty: 'Moderate',
    popular: false,
    trending: true,
    logo: '👮',
  },
];

export default function ExamsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeTab, setActiveTab] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredExams = examsData.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase()) || exam.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || exam.difficulty === selectedDifficulty;
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Popular' && exam.popular) ||
      (activeTab === 'Trending' && exam.trending);
    return matchesSearch && matchesCategory && matchesDiff && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="mb-8">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
            🏛️ Government Exam Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Explore 120+ Competitive Examinations
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Filter exams by eligibility, vacancies, application deadlines, and difficulty level.
          </p>
        </div>

        {/* Search & Top Tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by exam name or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
            />
          </div>

          <div className="flex gap-2 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 w-full md:w-auto">
            {['All', 'Popular', 'Trending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                {tab} Exams
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Exam Cards Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => {
              const isBookmarked = bookmarkedIds.includes(exam.id);
              return (
                <div
                  key={exam.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-2xl flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900">
                          {exam.logo}
                        </div>
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                            {exam.category} • {exam.state}
                          </span>
                          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 transition">
                            {exam.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleBookmark(exam.id)}
                        className={`p-2 rounded-xl border transition cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-50 border-amber-200 text-amber-500'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                        }`}
                        title="Bookmark Exam"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Details Table Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Eligibility:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{exam.eligibility}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Age Limit:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{exam.age}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Vacancies:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{exam.vacancies}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Difficulty:</span>
                        <span className={`font-bold ${exam.difficulty === 'High' ? 'text-rose-500' : 'text-amber-500'}`}>
                          {exam.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>App Deadline: <strong className="text-slate-800 dark:text-slate-200">{exam.appDate}</strong></span>
                      <span>Exam: <strong className="text-blue-600">{exam.examDate}</strong></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <Link
                      to="/practice"
                      className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center shadow-md shadow-blue-500/20 transition"
                    >
                      Quick Apply
                    </Link>
                    <Link
                      to="/practice"
                      className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs text-center transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
