import { useNavigate } from 'react-router-dom';
import { Star, Zap, Users, BookOpen, Target, Trophy, ArrowRight, ShieldCheck, CheckCircle2, Bell, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import ExamCard from '../components/ExamCard';
import { exams, subjects } from '../data/mockData';

const stats = [
  { icon: <Users className="w-6 h-6 text-amber-400" />, value: '2M+', label: 'Active Students' },
  { icon: <BookOpen className="w-6 h-6 text-blue-400" />, value: '50K+', label: 'Practice Questions' },
  { icon: <Target className="w-6 h-6 text-emerald-400" />, value: '500+', label: 'Mock Tests' },
  { icon: <Trophy className="w-6 h-6 text-purple-400" />, value: '95%', label: 'Success Rate' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-12">

        {/* ── HERO BANNER (Full-width container with 24px radius) ───────────── */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white rounded-[24px] p-8 md:p-14 shadow-2xl border border-blue-500/20"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

          {/* Static Emojis */}
          {['📚','🏆','📝','🎯','💡','🔥','⭐','🚀'].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-3xl opacity-20 pointer-events-none"
              style={{
                top: `${12 + (i * 11) % 75}%`,
                left: `${4 + (i * 13) % 92}%`
              }}
            >
              {emoji}
            </span>
          ))}

          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-semibold text-amber-300 shadow-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>India's #1 Government Exam Preparation Portal</span>
            </div>

            {/* Main Heading (34px Bold requirement fulfilled) */}
            <h1 className="text-[34px] md:text-[52px] font-extrabold leading-tight tracking-tight text-white">
              Prepare Smarter.<br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                Crack Government Exams
              </span><br />
              with Confidence.
            </h1>

            {/* Description (16px requirement) */}
            <p className="text-[16px] md:text-[18px] text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Practice thousands of high-yield questions, attempt full-length TCS iON style mock tests, analyze weak areas with AI, and land your dream government position.
            </p>

            <p className="text-[14px] text-blue-200/90 font-medium tracking-wide">
              TNPSC • UPSC • SSC • RRB • Banking • Police • TET • TRB • TNUSRB • Railway • Defence & State PSC
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                data-antigrav="button"
                onClick={() => navigate('/practice')}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-amber-500/20 text-[16px] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🚀 Start Learning Free</span>
              </button>

              <button
                data-antigrav="button"
                onClick={() => navigate('/exams')}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 text-[16px] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📋 Explore Exam Catalog</span>
              </button>

              <button
                data-antigrav="button"
                onClick={() => navigate('/mock')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/20 text-[16px] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>📝 Free Mock Test</span>
              </button>
            </div>
          </div>

          {/* Equal Width Quick Stats Grid */}
          <div className="relative max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                data-antigrav="card"
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 text-center transition-all hover:bg-white/15"
              >
                <div data-antigrav="icon" className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-[26px] font-extrabold text-white">{s.value}</div>
                <div className="text-blue-200 text-[13px] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ALL EXAMS SECTION (4-column grid on desktop with 24px gap) ─────── */}
        <section
          id="exams"
          className="space-y-8 py-4"
        >
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-200/60">
              <ShieldCheck className="w-3.5 h-3.5" /> Exam Catalog
            </span>
            <h2 className="text-[28px] font-semibold text-slate-900 tracking-tight">
              Target Competitive Examinations
            </h2>
            <p className="text-[16px] text-slate-500 max-w-xl mx-auto leading-relaxed">
              Curated preparation packages with updated syllabus, full mock test papers, and subject practice questions.
            </p>
          </div>

          {/* 4-column desktop grid (lg:grid-cols-4), 2-column tablet (md:grid-cols-2), 1-column mobile with 24px gap (gap-6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exams.map((exam, i) => (
              <ExamCard key={i} exam={exam} />
            ))}
          </div>
        </section>

        {/* ── PRACTICE ARENA ───────────────────────────────────────────────── */}
        <section
          id="practice"
          className="bg-white border border-slate-200/80 rounded-[24px] p-8 md:p-10 shadow-sm space-y-8"
        >
          <div className="text-center space-y-3">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-emerald-200/60">
              Practice Arena
            </span>
            <h2 className="text-[28px] font-semibold text-slate-900">
              Practice Subject-wise Questions
            </h2>
            <p className="text-[16px] text-slate-500 max-w-xl mx-auto leading-relaxed">
              Master individual subjects with detailed topic questions, step-by-step solutions, and instant explanation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {subjects.map((sub, i) => (
              <div
                key={i}
                data-antigrav="card"
                className="bg-slate-50/70 hover:bg-white border border-slate-200/80 rounded-[20px] shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden group p-5 space-y-4"
                onClick={() => navigate('/practice')}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] shrink-0 shadow-xs border border-slate-200/60 bg-white group-hover:scale-105 transition-transform"
                >
                  {sub.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {sub.name}
                  </h3>
                  <p className="text-[13px] text-slate-400 font-semibold">
                    {sub.topics} Topics • {sub.questions.toLocaleString()} Qs
                  </p>
                </div>
                <div className="flex-1" />
                <button
                  className="w-full py-2.5 font-bold text-[13px] text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white rounded-xl border border-blue-200/60 transition-all duration-200 cursor-pointer"
                >
                  Practice Now →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── MOCK TEST SECTION ────────────────────────────────────────────── */}
        <section
          id="mock"
          className="space-y-8 py-4"
        >
          <div className="text-center space-y-3">
            <span className="inline-block bg-blue-50 text-blue-600 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-200/60">
              Mock Tests
            </span>
            <h2 className="text-[28px] font-semibold text-slate-900">
              Full-Length Mock Test Series
            </h2>
            <p className="text-[16px] text-slate-500 max-w-xl mx-auto leading-relaxed">
              Experience authentic exam pressure with exact TCS iON exam portal UI, timer, and detailed scorecard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {([
              { title: 'Full-Length Mock Test',   icon: '📝', desc: 'Complete exam simulation with real-time timer and negative marking', badge: 'Most Popular', color: 'border-blue-500' },
              { title: 'Subject-wise Mock Test',  icon: '📚', desc: 'Focus on specific weak subjects for targeted practice', badge: 'Recommended', color: 'border-emerald-500' },
              { title: 'Chapter-wise Test',       icon: '📖', desc: 'Master one chapter at a time with instant Q&A feedback', badge: 'Chapter Prep', color: 'border-purple-500' },
              { title: 'Daily Speed Quiz',         icon: '⚡',  desc: '10 quick questions daily to keep your exam mindset sharp', badge: 'Daily New', color: 'border-amber-500' },
              { title: 'Weekly All-India Test',   icon: '🏆', desc: 'Compete live with over 100,000 aspirants across India', badge: 'Live Event', color: 'border-orange-500' },
              { title: 'Previous Year Papers',    icon: '🔴', desc: 'Attempt official past paper questions with detailed solutions', badge: 'PYQ Series', color: 'border-red-500' },
            ]).map((t, i) => (
              <div
                key={i}
                data-antigrav="card"
                className="bg-white border border-slate-200/90 rounded-[22px] p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col group space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-[28px] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {t.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
                    {t.badge}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-[22px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-[16px] text-slate-500 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="flex-1" />
                <button
                  onClick={() => navigate('/mock')}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-[15px] rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI FEATURES BANNER ───────────────────────────────────────────── */}
        <section
          id="ai"
          className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 text-white rounded-[24px] p-8 md:p-12 shadow-2xl space-y-8 border border-indigo-500/30"
        >
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-amber-300 text-[12px] font-bold px-4 py-1.5 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI-Powered Intelligence
            </span>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-white">
              Your Personal AI Exam Mentor
            </h2>
            <p className="text-[16px] text-blue-200 max-w-xl mx-auto leading-relaxed">
              Accelerate your preparation with personalized daily roadmaps, instant doubt solving, and intelligent rank prediction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: '📅', title: 'AI Study Planner', desc: 'Custom daily study schedules tailored to your target exam date' },
              { icon: '💬', title: 'AI Doubt Solver', desc: 'Get step-by-step solutions to complex math & reasoning problems 24/7' },
              { icon: '🎲', title: 'AI Quiz Generator', desc: 'Generate customized practice tests based on your personal weak spots' },
              { icon: '📊', title: 'Gap Analytics', desc: 'Detailed metric insights pinpointing syllabus speed & accuracy gaps' },
              { icon: '🎤', title: 'Interview Simulator', desc: 'AI-assisted viva and personality development practice modules' },
            ].map((f, i) => (
              <div
                key={i}
                data-antigrav="card"
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 flex flex-col space-y-3 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="font-bold text-white text-[17px] leading-snug">{f.title}</h3>
                <p className="text-blue-200 text-[14px] leading-relaxed flex-1">{f.desc}</p>
                <button
                  onClick={() => navigate('/ai')}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-[13px] font-extrabold py-2.5 rounded-xl transition cursor-pointer"
                >
                  Try Now →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── ANALYTICS PREVIEW ────────────────────────────────────────────── */}
        <section
          className="bg-white border border-slate-200/80 rounded-[24px] p-8 md:p-12 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <span className="inline-block bg-purple-50 text-purple-600 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-purple-200/60">
                Performance Engine
              </span>
              <h2 className="text-[28px] md:text-[34px] font-bold text-slate-900 leading-tight">
                Track Your Score Growth with Smart Analytics
              </h2>
              <p className="text-[16px] text-slate-500 leading-relaxed">
                Gain actionable insights into your syllabus coverage with progress heatmaps, weak area diagnostics, and national rank prediction.
              </p>
              <ul className="space-y-3">
                {[
                  'Daily Study Streak & Clock Time Tracker',
                  'Weak Subject & Chapter Identification Engine',
                  'Weekly Score Growth & Accuracy Metrics',
                  'All-India Percentile & Rank Estimation'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/analytics')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md transition-all duration-200 cursor-pointer text-[15px]"
              >
                Open Analytics Dashboard
              </button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {[
                { label: 'Current Streak', value: '42 Days', icon: '🔥', bg: 'bg-amber-50 border-amber-200' },
                { label: 'Solved Questions', value: '3,421 Qs', icon: '✅', bg: 'bg-emerald-50 border-emerald-200' },
                { label: 'Avg. Accuracy', value: '78.5%', icon: '🎯', bg: 'bg-blue-50 border-blue-200' },
                { label: 'Predicted Rank', value: '#1,204', icon: '🏆', bg: 'bg-purple-50 border-purple-200' },
              ].map((card, i) => (
                <div key={i} data-antigrav="card" className={`${card.bg} border rounded-[20px] p-6 text-center space-y-2`}>
                  <div className="text-3xl">{card.icon}</div>
                  <div className="text-[26px] font-extrabold text-slate-900">{card.value}</div>
                  <div className="text-[13px] font-semibold text-slate-500">{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERBOARD SECTION ─────────────────────────────────────────── */}
        <section
          className="bg-gradient-to-b from-slate-50 to-blue-50/50 border border-slate-200/70 rounded-[24px] p-8 md:p-12 text-center space-y-8"
        >
          <div className="space-y-3">
            <span className="inline-block bg-amber-100 text-amber-800 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-amber-300/60">
              🏆 National Leaderboard
            </span>
            <h2 className="text-[28px] font-semibold text-slate-900">
              Top Performers This Week
            </h2>
            <p className="text-[16px] text-slate-500 max-w-xl mx-auto leading-relaxed">
              Consistent study pays off. See where you rank among thousands of active test candidates.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[22px] shadow-sm border border-slate-200/80 overflow-hidden divide-y divide-slate-100">
            {[
              { rank: 1, name: 'Arunachalam K.', state: 'Tamil Nadu', score: '98.5%', exam: 'TNPSC', medal: '🥇' },
              { rank: 2, name: 'Priya Sharma', state: 'Delhi', score: '97.2%', exam: 'UPSC', medal: '🥈' },
              { rank: 3, name: 'Ravi Kumar', state: 'Karnataka', score: '96.8%', exam: 'SSC CGL', medal: '🥉' },
              { rank: 4, name: 'Meena Devi', state: 'Tamil Nadu', score: '95.5%', exam: 'TNPSC', medal: '4️⃣' },
              { rank: 5, name: 'Suresh Babu', state: 'Andhra Pradesh', score: '94.9%', exam: 'Banking', medal: '5️⃣' },
            ].map((p, i) => (
              <div key={i} className="flex items-center px-6 py-4 hover:bg-blue-50/40 transition-colors">
                <span className="text-xl w-10 text-left">{p.medal}</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 text-white font-bold flex items-center justify-center mr-4 text-sm shrink-0">
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-slate-900 text-[15px]">{p.name}</div>
                  <div className="text-slate-500 text-[13px]">{p.state} • {p.exam}</div>
                </div>
                <div className="text-emerald-600 font-extrabold text-[18px]">{p.score}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/leaderboard')}
            className="border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-2xl hover:bg-blue-600 hover:text-white transition cursor-pointer text-[15px]"
          >
            View Full Leaderboard →
          </button>
        </section>

        {/* ── LATEST NOTIFICATIONS & ALERTS ────────────────────────────────── */}
        <section
          className="space-y-8 py-4"
        >
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-red-200/60">
              <Bell className="w-3.5 h-3.5" /> Latest Updates
            </span>
            <h2 className="text-[28px] font-semibold text-slate-900">
              Official Job Notifications & Exam Alerts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { category: 'Exam Notifications', color: 'bg-blue-50/60 border-blue-200', badge: 'Jobs', items: ['TNPSC Group 4 Notification - 6,000 Vacancies', 'SSC CHSL 2025 Application Window Open', 'RRB NTPC 2025 Exam Schedule Announced', 'IBPS Clerk 2025 - 5,000 Posts Released'] },
              { category: 'Admit Cards', color: 'bg-emerald-50/60 border-emerald-200', badge: 'Hall Tickets', items: ['TNPSC Group 2A Hall Ticket Download Direct Link', 'SSC CGL 2025 Admit Card Out', 'IBPS PO Mains Exam Call Letter Available', 'RRB Group D Hall Ticket Released'] },
              { category: 'Final Results', color: 'bg-amber-50/60 border-amber-200', badge: 'Declared', items: ['TNPSC Group 4 Final Marks & Cutoff Released', 'SSC CHSL Final Result 2024 Declared', 'IBPS Clerk Prelims Scorecard Link Active', 'TNUSRB Constable Final Merit List'] },
            ].map((sec, i) => (
              <div key={i} className={`${sec.color} border rounded-[22px] p-6 space-y-4 shadow-xs`}>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <h3 className="font-bold text-slate-900 text-[18px]">{sec.category}</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    {sec.badge}
                  </span>
                </div>
                <ul className="space-y-3">
                  {sec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[14px] text-slate-700 hover:text-blue-600 cursor-pointer transition">
                      <span className="text-emerald-600 font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CALL TO ACTION ───────────────────────────────────────────────── */}
        <section
          className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white rounded-[24px] p-10 md:p-14 text-center space-y-6 shadow-xl"
        >
          <h2 className="text-[34px] md:text-[42px] font-extrabold leading-tight">
            Start Your Government Job Journey Today
          </h2>
          <p className="text-[16px] text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Join 2 million aspirants already building speed, accuracy, and confidence to crack top competitive exams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-700 font-extrabold py-4 px-8 rounded-2xl hover:bg-slate-100 transition shadow-lg text-[16px] cursor-pointer"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/mock')}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-blue-700 transition text-[16px] cursor-pointer"
            >
              Take Free Mock Test
            </button>
          </div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center text-sm border-t border-slate-800 mt-16">
        <div className="max-w-[1600px] mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">ExamMaster AI</span>
          </div>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Standardized Competitive Preparation for TNPSC • UPSC • SSC • RRB • Banking • Police • TET • TRB • Defence
          </p>
          <p className="text-slate-500 text-xs">
            © 2025 ExamMaster AI. All rights reserved. Designed for excellence in Indian competitive exams.
          </p>
        </div>
      </footer>
    </div>
  );
}

