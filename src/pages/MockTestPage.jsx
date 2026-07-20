import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Play, Trophy, Clock, CheckCircle, Flame, Calendar, Award, ArrowRight, BarChart2 } from 'lucide-react';

const mockTests = [
  { id: 1, title: 'TNPSC Group 4 Full Length Mock Test 01', exam: 'TNPSC', questions: 200, marks: 300, time: '180 mins', status: 'Live', takers: '45,210', rankAvg: '#1,420' },
  { id: 2, title: 'UPSC Prelims GS Paper 1 All-India Mock 04', exam: 'UPSC', questions: 100, marks: 200, time: '120 mins', status: 'Live', takers: '28,100', rankAvg: '#890' },
  { id: 3, title: 'SSC CGL Tier I Speed Model Test 08', exam: 'SSC', questions: 100, marks: 200, time: '60 mins', status: 'Available', takers: '19,450', rankAvg: '#2,100' },
  { id: 4, title: 'IBPS Bank PO Prelims Grand Mock 02', exam: 'Banking', questions: 100, marks: 100, time: '60 mins', status: 'Completed', takers: '32,600', score: '78.5 / 100' },
  { id: 5, title: 'RRB NTPC CBT 1 Stage Mock Test 05', exam: 'RRB', questions: 100, marks: 100, time: '90 mins', status: 'Upcoming', takers: 'Starts Tomorrow' },
];

export default function MockTestPage() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const filtered = activeTab === 'All' ? mockTests : mockTests.filter((t) => t.status === activeTab);

  const handleStartTest = (test) => {
    // Navigates to quiz / mock mode
    navigate('/quiz', { state: { testId: test.id, testName: test.title } });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
              📝 All-India Mock Test Arena
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Real Exam Simulator & Rank Predictor
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Simulate actual examination timing, negative marking, and instant percentile analytics.
            </p>
          </div>

          {/* Leaderboard Preview Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 font-bold text-xl">
              🏆
            </div>
            <div>
              <div className="text-[11px] text-blue-100 font-medium">Your All-India Rank</div>
              <div className="text-lg font-black">#1,204 (Top 4%)</div>
            </div>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-fit">
          {['All', 'Live', 'Available', 'Completed', 'Upcoming'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              {tab} Tests
            </button>
          ))}
        </div>

        {/* Mock Tests List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    {test.exam}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                      test.status === 'Live'
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 animate-pulse'
                        : test.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    ● {test.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-4 group-hover:text-blue-600 transition">
                  {test.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Questions</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{test.questions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Marks</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{test.marks}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Duration</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{test.time}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">👥 {test.takers}</span>

                {test.status === 'Completed' ? (
                  <Link
                    to="/results"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <BarChart2 className="w-3.5 h-3.5" /> View Analysis
                  </Link>
                ) : test.status === 'Upcoming' ? (
                  <span className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs">
                    Notify Me
                  </span>
                ) : (
                  <button
                    onClick={() => handleStartTest(test)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Start Test
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
