import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Users, BookOpen, Activity, Sparkles } from 'lucide-react';

export default function AdminPage() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold">
              🛡️ Admin Control Panel
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              System Health & Metric Console
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">All Servers Operational</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Total Users</span>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">5,24,180</div>
            <span className="text-[11px] text-emerald-500 font-bold">↑ +12% this week</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Active Exams</span>
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">124</div>
            <span className="text-[11px] text-slate-400">Published across 6 boards</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">AI Token Usage</span>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">4.2M / Day</div>
            <span className="text-[11px] text-purple-500 font-bold">GPT-4o Engine</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">System Uptime</span>
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">99.98%</div>
            <span className="text-[11px] text-emerald-500 font-bold">Optimal Speed</span>
          </div>
        </div>

        {/* Admin Content Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Recent System Activity & Reports</h3>

          <div className="space-y-2 text-xs">
            {[
              { time: '14:20:05', event: 'New TNPSC Group 4 Model Test 04 Published', status: 'Success' },
              { time: '14:15:32', event: 'AI Tutor Processed 1,240 Image OCR Questions', status: 'Success' },
              { time: '13:58:10', event: 'UPSC CSE Prelims Solved PDF Auto-Indexed', status: 'Success' },
            ].map((e, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-between font-mono">
                <span className="text-slate-400">{e.time}</span>
                <span className="text-slate-800 dark:text-slate-200 font-sans font-bold">{e.event}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-sans font-bold">
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
