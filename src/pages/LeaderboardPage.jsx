import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Trophy, Flame } from 'lucide-react';

const topPodium = [
  { rank: 2, name: 'Ananya S.', xp: '14,820 XP', exam: 'UPSC CSE', state: 'Tamil Nadu', avatar: '👩‍🎓', medal: '🥈' },
  { rank: 1, name: 'Karthik Raja', xp: '16,450 XP', exam: 'TNPSC G4', state: 'Tamil Nadu', avatar: '👨‍🎓', medal: '👑' },
  { rank: 3, name: 'Priya Sharma', xp: '13,990 XP', exam: 'SSC CGL', state: 'Delhi', avatar: '👩‍💻', medal: '🥉' },
];

const ranksList = [
  { rank: 4, name: 'Venkatesh M.', xp: '12,400 XP', accuracy: '94.2%', streak: '21 days', exam: 'TNPSC G4' },
  { rank: 5, name: 'Deepak V.', xp: '11,850 XP', accuracy: '91.8%', streak: '18 days', exam: 'Banking PO' },
  { rank: 6, name: 'Sneha R.', xp: '11,200 XP', accuracy: '90.5%', streak: '14 days', exam: 'RRB NTPC' },
  { rank: 7, name: 'Arun Kumar', xp: '10,950 XP', accuracy: '89.1%', streak: '12 days', exam: 'UPSC CSE' },
  { rank: 8, name: 'Meena P.', xp: '10,400 XP', accuracy: '88.4%', streak: '10 days', exam: 'TNPSC G2' },
];

export default function LeaderboardPage() {
  const [filterScope, setFilterScope] = useState('Global');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold inline-flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" /> All-India Aspirant Leaderboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Compete & Climb the Weekly Ranks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Earn XP by solving daily practice sets, mock tests, and maintain active streaks.
          </p>

          {/* Scope Filters */}
          <div className="flex justify-center gap-2 mt-6 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-fit mx-auto">
            {['Global', 'Friends', 'State (TN)', 'College'].map((scope) => (
              <button
                key={scope}
                onClick={() => setFilterScope(scope)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filterScope === scope
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium Display */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto items-end mb-12">
          {/* 2nd Place */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 text-center shadow-md flex flex-col items-center">
            <div className="text-3xl mb-1">{topPodium[0].avatar}</div>
            <span className="text-2xl font-black text-slate-400">{topPodium[0].medal}</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">{topPodium[0].name}</h4>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">{topPodium[0].xp}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">{topPodium[0].exam}</span>
          </div>

          {/* 1st Place (Center Higher) */}
          <div className="bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-900 border-2 border-amber-400 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center transform -translate-y-4">
            <div className="text-5xl mb-2">{topPodium[1].avatar}</div>
            <span className="text-3xl font-black text-amber-500">{topPodium[1].medal}</span>
            <h4 className="font-black text-base text-slate-900 dark:text-white mt-1">{topPodium[1].name}</h4>
            <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-1">{topPodium[1].xp}</span>
            <span className="text-xs text-slate-500 font-bold mt-0.5">{topPodium[1].exam}</span>
          </div>

          {/* 3rd Place */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 text-center shadow-md flex flex-col items-center">
            <div className="text-3xl mb-1">{topPodium[2].avatar}</div>
            <span className="text-2xl font-black text-amber-700">{topPodium[2].medal}</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">{topPodium[2].name}</h4>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">{topPodium[2].xp}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">{topPodium[2].exam}</span>
          </div>
        </div>

        {/* Your Rank Card Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 shadow-xl mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <div>
              <div className="text-xs text-blue-100 font-medium">Your Current Rank</div>
              <div className="text-xl font-extrabold">#1,204 (Top 4% Nationwide)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-100 font-medium">Earned XP</div>
            <div className="text-xl font-extrabold">8,950 XP</div>
          </div>
        </div>

        {/* Ranks Table List */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
          {ranksList.map((r, idx) => (
            <div
              key={r.rank}
              className={`p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 ${
                idx % 2 === 0 ? 'bg-slate-50/40 dark:bg-slate-950/40' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-extrabold text-sm text-slate-400">#{r.rank}</span>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{r.name}</h4>
                  <span className="text-xs text-slate-400">{r.exam}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Streak</span>
                  <span className="text-xs font-bold text-orange-500 flex items-center gap-0.5 justify-end">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {r.streak}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Score XP</span>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{r.xp}</span>
                </div>
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
