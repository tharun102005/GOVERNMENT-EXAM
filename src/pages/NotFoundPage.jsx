import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-extrabold text-4xl flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6">
          404
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
          The page or route you are looking for does not exist or has been moved. Let's get you back to your exam preparation!
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/practice"
            className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Practice</span>
          </Link>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
