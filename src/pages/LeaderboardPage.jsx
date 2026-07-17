import { useState } from 'react';
import { Flame, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { leaderboardData } from '../data/mockData';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('weekly');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-4 py-1 rounded-full mb-3">
            🏆 Global Arena
          </span>
          <h1 className="text-4xl font-bold text-gray-900">Leaderboard Rankings</h1>
          <p className="text-gray-500 mt-2">
            Compete with lakhs of students daily. Achieve high accuracy to top the weekly leaderboard.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 bg-white rounded-xl border border-gray-100 p-1.5 shadow-sm mb-6 max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'weekly' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly Rankings
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'monthly' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly Rankings
          </button>
        </div>

        {/* Your rank banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-[20px] p-6 shadow-sm mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <div className="text-xs text-blue-100 font-medium">Your Rank This Week</div>
              <div className="text-xl font-bold">#1,204 (Top 4%)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-100 font-medium">Accuracy</div>
            <div className="text-xl font-bold">78.5%</div>
          </div>
        </div>

        {/* Rankings list */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          {leaderboardData.map((p, i) => (
            <div
              key={i}
              className={`flex items-center px-6 py-4 transition ${
                i !== leaderboardData.length - 1 ? 'border-b border-gray-100' : ''
              } ${i < 3 ? 'bg-gradient-to-r from-yellow-50/20 to-white' : ''} hover:bg-blue-50/20`}
            >
              {/* Medal / Rank */}
              <span className="text-xl w-10 text-center font-bold text-gray-500">
                {p.medal || p.rank}
              </span>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] text-white font-bold flex items-center justify-center mr-4 text-sm shrink-0">
                {p.name.charAt(0)}
              </div>

              {/* Aspirant Details */}
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                  {p.name}
                  {p.rank === 1 && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  {p.state} • {p.exam}
                </div>
              </div>

              {/* Score / stats */}
              <div className="text-right flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <div className="text-[10px] text-gray-400 font-semibold uppercase">Daily Streak</div>
                  <div className="text-xs font-bold text-orange-500 flex items-center gap-0.5 justify-end">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {p.streak} days
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase">Accuracy</div>
                  <div className="text-[#10B981] font-bold text-base">{p.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
