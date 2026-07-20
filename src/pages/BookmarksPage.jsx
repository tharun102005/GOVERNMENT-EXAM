import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Bookmark, BookOpen, FileText, HelpCircle, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialBookmarks = [
  { id: 1, type: 'Question', title: 'Quantitative Aptitude: Time & Work Problem #42', subject: 'Quant', date: 'Saved yesterday' },
  { id: 2, type: 'Mock Test', title: 'TNPSC Group 4 Full Length Model Test 03', subject: 'TNPSC', date: 'Saved 3 days ago' },
  { id: 3, type: 'Note', title: 'Indian Polity Key Constitutional Amendments Cheat Sheet', subject: 'Polity', date: 'Saved 1 week ago' },
  { id: 4, type: 'PYQ', title: 'UPSC Prelims 2024 General Studies Paper 1 Question 14', subject: 'UPSC', date: 'Saved 2 weeks ago' },
];

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const filtered = filter === 'All' ? bookmarks : bookmarks.filter((b) => b.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
              <Bookmark className="w-3.5 h-3.5" /> Saved Items
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Your Bookmarks</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Quick access to questions, tests, and study notes you saved for revision.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Question', 'Mock Test', 'Note', 'PYQ'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto my-12">
            <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Bookmarks Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">You haven't saved any items under this filter yet.</p>
            <Link to="/practice" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold">
              Explore Practice Questions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                      {b.type}
                    </span>
                    <span className="text-xs text-slate-400">{b.subject} • {b.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{b.title}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/practice"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition"
                    title="View Item"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-500 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
