import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Brain, Calculator, Globe, BookOpen, Laptop, Code2, ArrowRight, CheckCircle2, Play } from 'lucide-react';

const subjects = [
  { id: 'quant', name: 'Quantitative Aptitude', questions: '4,500+ Questions', difficulty: 'Moderate - High', completion: 65, icon: Calculator, color: 'from-blue-600 to-indigo-600', link: '/quant-aptitude' },
  { id: 'reasoning', name: 'Reasoning Ability', questions: '3,800+ Questions', difficulty: 'Moderate', completion: 48, icon: Brain, color: 'from-purple-600 to-indigo-600', link: '/quiz' },
  { id: 'ga', name: 'General Awareness & GK', questions: '6,200+ Questions', difficulty: 'Easy - Moderate', completion: 82, icon: Globe, color: 'from-emerald-600 to-teal-600', link: '/quiz' },
  { id: 'english', name: 'English Comprehension', questions: '3,100+ Questions', difficulty: 'Moderate', completion: 30, icon: BookOpen, color: 'from-amber-600 to-orange-600', link: '/quiz' },
  { id: 'computer', name: 'Computer Knowledge', questions: '1,900+ Questions', difficulty: 'Easy', completion: 90, icon: Laptop, color: 'from-cyan-600 to-blue-600', link: '/quiz' },
  { id: 'programming', name: 'Programming & CS', questions: '2,400+ Questions', difficulty: 'High', completion: 25, icon: Code2, color: 'from-rose-600 to-purple-600', link: '/quiz' },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="mb-10">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
            🎯 Interactive Practice Arena
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Master Subjects Topic by Topic
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose a subject to practice questions tailored to TNPSC, UPSC, SSC, and Banking exams.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/20`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{s.difficulty}</span>
                  </div>

                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mt-4 group-hover:text-blue-600 transition">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{s.questions}</p>

                  {/* Progress bar */}
                  <div className="mt-6 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600 dark:text-slate-400">Syllabus Completion</span>
                      <span className="text-blue-600 dark:text-blue-400">{s.completion}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        style={{ width: `${s.completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to={s.link}
                  className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Continue Practice</span>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
