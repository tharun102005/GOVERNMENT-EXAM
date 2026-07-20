import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { BarChart3, TrendingUp, Flame, Clock, Award, Target, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AnalyticsPage() {
  const [reportRange, setReportRange] = useState('Weekly');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
              📊 Diagnostic Analytics Dashboard
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Performance & Accuracy Insights
            </h1>
          </div>

          <div className="flex gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            {['Weekly', 'Monthly', 'All Time'].map((r) => (
              <button
                key={r}
                onClick={() => setReportRange(r)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  reportRange === r
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                {r} Report
              </button>
            ))}
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
              🎯
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Overall Accuracy</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">84.2%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950 text-orange-500 flex items-center justify-center font-bold text-xl shrink-0">
              🔥
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Daily Streak</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">14 Days</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
              ⏱️
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Study Time</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">38.5 Hrs</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center font-bold text-xl shrink-0">
              🏆
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Questions Solved</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">1,420</div>
            </div>
          </div>
        </div>

        {/* Charts & Subject Accuracy Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Subject Accuracy Bar Visualizer */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Subject Accuracy Breakdown</h3>

            <div className="space-y-4">
              {[
                { subject: 'Quantitative Aptitude', accuracy: 88, questions: 420 },
                { subject: 'Indian Polity & Constitution', accuracy: 92, questions: 380 },
                { subject: 'General Reasoning', accuracy: 76, questions: 310 },
                { subject: 'English Comprehension', accuracy: 68, questions: 210 },
                { subject: 'Indian Economy & History', accuracy: 82, questions: 100 },
              ].map((s) => (
                <div key={s.subject} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{s.subject}</span>
                    <span className="text-blue-600 dark:text-blue-400">{s.accuracy}% ({s.questions} Solved)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        s.accuracy >= 85 ? 'bg-emerald-500' : s.accuracy >= 75 ? 'bg-blue-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${s.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong vs Weak Topics Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Strong Topics (High Accuracy)
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Time & Work', 'Percentages', 'Preamble & Articles', 'Simplification', 'Syllogism'].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-900">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Focus Weak Topics
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Trigonometry Heights', 'Reading Comprehension', 'May 2026 Current Affairs'].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-900">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Heatmap Simulation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Daily Practice Heatmap (2026)</h3>
            <span className="text-xs text-slate-400">Higher intensity = More questions solved</span>
          </div>

          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 pt-2">
            {Array.from({ length: 48 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-6 rounded-md ${
                  idx % 5 === 0
                    ? 'bg-blue-600'
                    : idx % 3 === 0
                    ? 'bg-blue-400'
                    : idx % 2 === 0
                    ? 'bg-blue-200 dark:bg-blue-900'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}
                title={`Day ${idx + 1}: ${idx * 4} questions`}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
