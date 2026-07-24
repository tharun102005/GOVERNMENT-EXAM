import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Brain, Calculator, Globe, BookOpen, Laptop, Code2, Play, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const subjects = [
  { id: 'quant', name: 'Quantitative Aptitude', questions: '4,500+ Questions', difficulty: 'Moderate - High', completion: 65, icon: Calculator, color: 'from-[#4F46E5] to-[#7C3AED]', glow: 'shadow-[#4F46E5]/30', link: '/quant-aptitude' },
  { id: 'reasoning', name: 'Reasoning Ability', questions: '3,800+ Questions', difficulty: 'Moderate', completion: 48, icon: Brain, color: 'from-[#7C3AED] to-purple-600', glow: 'shadow-[#7C3AED]/30', link: '/quiz' },
  { id: 'ga', name: 'General Awareness & GK', questions: '6,200+ Questions', difficulty: 'Easy - Moderate', completion: 82, icon: Globe, color: 'from-[#06B6D4] to-teal-500', glow: 'shadow-[#06B6D4]/30', link: '/quiz' },
  { id: 'english', name: 'English Comprehension', questions: '3,100+ Questions', difficulty: 'Moderate', completion: 30, icon: BookOpen, color: 'from-orange-500 to-rose-500', glow: 'shadow-orange-500/30', link: '/quiz' },
  { id: 'computer', name: 'Computer Knowledge', questions: '1,900+ Questions', difficulty: 'Easy', completion: 90, icon: Laptop, color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/30', link: '/quiz' },
  { id: 'programming', name: 'Programming & CS', questions: '2,400+ Questions', difficulty: 'High', completion: 25, icon: Code2, color: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', link: '/quiz' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#4F46E5]/5 dark:from-[#4F46E5]/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-12 w-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md mb-6"
          >
            <Target className="w-4 h-4 text-[#4F46E5]" />
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
              Interactive Practice Arena
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4"
          >
            Master Subjects <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">
              Topic by Topic
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
          >
            Choose a subject to practice highly curated questions tailored to TNPSC, UPSC, SSC, and Banking exams. Track your progress and conquer the syllabus.
          </motion.p>
        </div>

        {/* Subjects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-800 rounded-[24px] p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300"
              >
                <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 h-full flex flex-col justify-between">
                  <div>
                    {/* Card Top */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-lg ${s.glow} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400">
                        {s.difficulty}
                      </span>
                    </div>

                    {/* Card Content */}
                    <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white mb-2 group-hover:text-[#4F46E5] dark:group-hover:text-[#818cf8] transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-8">
                      {s.questions}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2.5 mb-8">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600 dark:text-slate-400">Completion</span>
                        <span className="text-[#4F46E5] dark:text-[#818cf8]">{s.completion}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.completion}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                          className={`h-full rounded-full bg-gradient-to-r ${s.color} relative`}
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={s.link}
                    className="mt-auto w-full py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-[#4F46E5] hover:text-white dark:hover:bg-[#4F46E5] text-slate-700 dark:text-slate-300 font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-[#4F46E5] dark:hover:border-[#4F46E5] group-hover:shadow-md"
                  >
                    <span>Start Practice</span>
                    <Play className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
