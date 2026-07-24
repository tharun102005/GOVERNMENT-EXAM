import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/exams?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative z-20 -mt-10 max-w-[1000px] mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-3xl p-3 shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
      >
        <form onSubmit={handleSearch} className="relative flex items-center w-full bg-white dark:bg-slate-900 rounded-[18px] overflow-hidden">
          <div className="pl-6 pr-3 py-4 flex items-center justify-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search UPSC, SSC, TNPSC, Banking, Railway..."
            className="w-full py-4 px-2 text-lg text-slate-900 dark:text-white bg-transparent outline-none placeholder-slate-400 font-medium"
          />
          <div className="flex items-center gap-2 pr-4 pl-2">
            <button
              type="button"
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              title="Voice Search"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
