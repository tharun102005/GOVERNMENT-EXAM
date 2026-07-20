import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { User, Mail, Award, Trophy, Bookmark, BookOpen, Camera, CheckCircle2, Shield, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [targetExam, setTargetExam] = useState('TNPSC Group 4 & UPSC Prelims');
  const [dailyGoal, setDailyGoal] = useState('50 Questions / Day');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-10 w-full">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
                A
              </div>
              <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-900 text-white cursor-pointer hover:bg-blue-600 transition" title="Change Avatar">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" className="hidden" onChange={() => alert('Profile photo updated!')} />
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Aspirant User</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 text-[10px] font-extrabold">
                  PRO MEMBER
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">aspirant@exammaster.ai • Joined Jan 2026</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-1">🎯 Target: {targetExam}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              to="/settings"
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 transition"
            >
              <Settings className="w-4 h-4" /> Edit Profile
            </Link>
          </div>
        </div>

        {/* Study Goals & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Goals */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Active Preparation Goals</h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-500 block">Target Exam Focus</span>
                <input
                  type="text"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-500 block">Daily Question Target</span>
                <input
                  type="text"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Earned Badges & Certificates */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Earned Badges & Achievements</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-center space-y-1">
                <span className="text-3xl block">🏆</span>
                <span className="font-extrabold text-amber-800 dark:text-amber-300 block">Top 5% Percentile</span>
                <span className="text-[10px] text-amber-600">Mock Test Master</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-center space-y-1">
                <span className="text-3xl block">🔥</span>
                <span className="font-extrabold text-purple-800 dark:text-purple-300 block">14-Day Streak</span>
                <span className="text-[10px] text-purple-600">Consistent Scholar</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
