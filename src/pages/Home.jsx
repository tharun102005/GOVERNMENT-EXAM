import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Target,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Brain,
  Star,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import studyIllustration from '../assets/study_illustration.png';

const featuredExams = [
  { id: 'tnpsc-g4', name: 'TNPSC Group 4 2026', category: 'State PSC', vacancies: '6,244', applicants: '12.4 Lakhs', color: 'from-blue-600 to-indigo-600' },
  { id: 'upsc-cse', name: 'UPSC CSE Prelims 2026', category: 'Union Services', vacancies: '1,056', applicants: '10.1 Lakhs', color: 'from-purple-600 to-indigo-600' },
  { id: 'ssc-cgl', name: 'SSC CGL Tier I 2026', category: 'Staff Selection', vacancies: '17,727', applicants: '24.8 Lakhs', color: 'from-emerald-600 to-teal-600' },
  { id: 'rrb-ntpc', name: 'RRB NTPC Graduate 2026', category: 'Railways', vacancies: '8,113', applicants: '18.3 Lakhs', color: 'from-orange-600 to-amber-600' },
];

const faqs = [
  { q: 'How does ExamMaster AI generate personalized practice plans?', a: 'ExamMaster AI tracks your question accuracy, time per question, and weak subject areas to automatically curate custom daily practice sets and mock recommendations.' },
  { q: 'Are Previous Year Questions (PYQs) updated with full solutions?', a: 'Yes! We cover PYQs from 2018 through 2026 across TNPSC, UPSC, SSC, Banking, and RRB with step-by-step AI explanations.' },
  { q: 'Can I practice offline or download PDFs?', a: 'You can download test solutions, topic formula cheat sheets, and PYQ paper PDFs directly to study anytime.' },
  { q: 'Is ExamMaster AI free for aspirants?', a: 'Yes! Core syllabus practice, topic trees, daily challenges, and basic mock tests are 100% free forever.' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/exams?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>India's #1 AI-Powered Exam Preparation Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Master Government Exams with{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Smart AI Guidance
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Practice 25M+ questions, take live mock tests, analyze weak topics with AI tutor insights, and secure your rank in UPSC, TNPSC, SSC, Banking & RRB.
              </p>

              {/* Instant Search Form */}
              <form onSubmit={handleSearch} className="relative max-w-xl">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exams e.g. TNPSC Group 4, UPSC, SSC CGL..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xl shadow-slate-200/50 dark:shadow-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Search
                </button>
              </form>

              {/* Quick Call to Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/practice">
                  <GradientButton size="lg" className="flex items-center gap-2">
                    <span>Start Free Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </GradientButton>
                </Link>
                <Link
                  to="/mock"
                  className="px-6 py-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold text-sm flex items-center gap-2 hover:bg-emerald-100 transition shadow-sm hover:shadow-md"
                >
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>Free Mock Tests</span>
                </Link>
              </div>

              {/* Learning Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="border-l-3 border-blue-600 pl-3">
                  <div className="text-xl font-black text-slate-900 dark:text-white">5,00,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Active Aspirants</div>
                </div>
                <div className="border-l-3 border-indigo-600 pl-3">
                  <div className="text-xl font-black text-slate-900 dark:text-white">120+</div>
                  <div className="text-xs text-slate-500 font-medium">Exams Covered</div>
                </div>
                <div className="border-l-3 border-purple-600 pl-3">
                  <div className="text-xl font-black text-slate-900 dark:text-white">25M+</div>
                  <div className="text-xs text-slate-500 font-medium">Solved Questions</div>
                </div>
                <div className="border-l-3 border-emerald-600 pl-3">
                  <div className="text-xl font-black text-slate-900 dark:text-white">98.4%</div>
                  <div className="text-xs text-slate-500 font-medium">Accuracy Boost</div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900">
                <img src={studyIllustration} alt="Student studying with ExamMaster AI" className="w-full h-auto block" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. CONTINUE LEARNING & DAILY STREAK BANNER */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-8 mb-16 relative z-10">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 text-2xl shrink-0">
                🔥
              </div>
              <div>
                <div className="text-xs font-bold text-blue-100 uppercase tracking-wider">Today's Streak & Goal</div>
                <h3 className="text-xl font-extrabold text-white">Daily Quant & Polity Practice (4/5 Completed)</h3>
                <p className="text-xs text-blue-100 mt-1">Keep up your 7-day streak to earn the Top Aspirant Badge!</p>
              </div>
            </div>
            <Link
              to="/practice"
              className="px-6 py-3 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs shadow-md shrink-0 transition"
            >
              Resume Practice →
            </Link>
          </div>
        </section>

        {/* 3. FEATURED EXAMS */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Featured Government Exams</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Select an exam to access syllabus, practice modules, and mock tests.</p>
            </div>
            <Link to="/exams" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              View All 120+ Exams <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredExams.map((exam, idx) => (
              <GlassCard
                key={exam.id}
                delay={idx * 0.1}
                className="flex flex-col justify-between group !p-0 overflow-hidden !bg-white/50 dark:!bg-slate-900/50"
              >
                <div className="p-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    {exam.category}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 transition">
                    {exam.name}
                  </h3>
                  <div className="space-y-1.5 mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between"><span>Vacancies:</span><span className="font-bold text-slate-800 dark:text-slate-200">{exam.vacancies}</span></div>
                    <div className="flex justify-between"><span>Applicants:</span><span className="font-bold text-slate-800 dark:text-slate-200">{exam.applicants}</span></div>
                  </div>
                </div>
                <Link
                  to={`/exams`}
                  className="mt-2 mx-4 mb-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs text-center transition"
                >
                  Explore Exam →
                </Link>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* 4. AI STUDY ASSISTANT BANNER */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-purple-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>AI Tutor Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Stuck on a Complex Quant Problem or Polity Article?
              </h2>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Upload images of any math problem, PDF question paper, or ask our ChatGPT-powered tutor for instant step-by-step explanations in Tamil & English.
              </p>
              <div className="pt-2">
                <Link
                  to="/ai"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 w-fit hover:scale-[1.02] transition"
                >
                  <span>Launch AI Hub Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-40 h-40 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 text-6xl flex items-center justify-center shadow-2xl animate-bounce">
                🤖
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION */}
        <section className="max-w-[1000px] mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Everything you need to know about ExamMaster AI platform.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <GlassCard
                key={idx}
                className="!p-5 !bg-white/50 dark:!bg-slate-900/50"
                hoverEffect={false}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white">
                  <span>{f.q}</span>
                  <span className="text-blue-600 text-lg">{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 leading-relaxed">
                    {f.a}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
