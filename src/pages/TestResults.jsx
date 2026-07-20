import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Trophy, Award, CheckCircle2, XCircle, Clock, Sparkles, Download, ArrowRight, RotateCcw } from 'lucide-react';

export default function TestResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const mockState = state || {
    examName: 'TNPSC Group 4 Full Length Mock Test 01',
    score: 242,
    maxScore: 300,
    correct: 81,
    wrong: 12,
    skipped: 7,
    timeTaken: '142 mins',
    accuracy: '87.1%',
    percentile: '96.4%',
  };

  const { examName, score, maxScore, correct, wrong, skipped, timeTaken, accuracy, percentile } = mockState;
  const pct = Math.round((score / maxScore) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-10 w-full">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
              🎉 Test Submission Successful
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{examName}</h1>
            <p className="text-xs text-blue-100">Performance report generated with AI accuracy diagnostics.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert('Certificate generated and downloaded successfully!')}
              className="px-5 py-3 rounded-xl bg-white text-blue-600 font-bold text-xs shadow-md hover:bg-blue-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Certificate
            </button>
            <Link
              to="/mock"
              className="px-5 py-3 rounded-xl bg-blue-900/40 text-white font-bold text-xs border border-white/20 hover:bg-blue-900/60 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Retake Test
            </Link>
          </div>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-center">
            <span className="text-xs text-slate-400 font-medium block">Total Score</span>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {score} <span className="text-xs text-slate-400 font-semibold">/ {maxScore}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-center">
            <span className="text-xs text-slate-400 font-medium block">Accuracy</span>
            <div className="text-2xl font-black text-emerald-500 mt-1">{accuracy}</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-center">
            <span className="text-xs text-slate-400 font-medium block">Percentile</span>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{percentile}</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-center">
            <span className="text-xs text-slate-400 font-medium block">Time Spent</span>
            <div className="text-2xl font-black text-amber-500 mt-1">{timeTaken}</div>
          </div>
        </div>

        {/* AI Diagnostics & Question Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Feedback */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-purple-500" /> AI Diagnostic Feedback
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Excellent performance! You scored in the <strong>top 4th percentile</strong> nationwide. Your speed in Quantitative Aptitude was 15% faster than average aspirants.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
              <span className="font-bold block">💪 Strong Topics:</span>
              <p>Time & Work, Indian Polity Articles, Ancient History.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <span className="font-bold block">⚠️ Focus Area for Improvement:</span>
              <p>Trigonometry Heights & Distances and Current Affairs (May 2026 Shift).</p>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Question Summary</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Correct Answers</span>
                <span>{correct} Questions</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 font-bold text-rose-700 dark:text-rose-400">
                <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Incorrect Answers</span>
                <span>{wrong} Questions</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Unattempted</span>
                <span>{skipped} Questions</span>
              </div>
            </div>

            <Link
              to="/leaderboard"
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs text-center shadow-md flex items-center justify-center gap-2"
            >
              <span>View Global Leaderboard Rank</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
