import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Download, Sparkles, Bookmark, Search, Eye, Filter, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const pyqList = [
  { id: 1, year: 2025, exam: 'TNPSC Group 4', subject: 'General Studies & Tamil', questions: 200, pdfSize: '3.4 MB', downloads: '1.2 Lakh' },
  { id: 2, year: 2024, exam: 'UPSC CSE Prelims', subject: 'GS Paper 1 & CSAT', questions: 180, pdfSize: '4.1 MB', downloads: '98,000' },
  { id: 3, year: 2024, exam: 'SSC CGL Tier I', subject: 'All 4 Shifts Combined', questions: 100, pdfSize: '2.8 MB', downloads: '1.5 Lakh' },
  { id: 4, year: 2023, exam: 'TNPSC Group 2', subject: 'Prelims General Studies', questions: 200, pdfSize: '3.8 MB', downloads: '85,000' },
  { id: 5, year: 2022, exam: 'IBPS Bank PO', subject: 'Prelims & Mains Memory Based', questions: 150, pdfSize: '2.2 MB', downloads: '64,000' },
];

export default function PYQPage() {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedPyq, setSelectedPyq] = useState(null);

  const filtered = pyqList.filter((p) => {
    const matchYear = selectedYear === 'All' || p.year.toString() === selectedYear;
    const matchExam = selectedExam === 'All' || p.exam.includes(selectedExam);
    return matchYear && matchExam;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Header */}
        <div className="mb-8">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
            📂 Previous Year Question Papers (2018 - 2026)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Official Exam Papers with AI Explanations
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Download solved PDFs or practice shift-wise previous year papers online.
          </p>
        </div>

        {/* Timeline & Filters Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Year Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['All', '2025', '2024', '2023', '2022'].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Exam Category Filter */}
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full md:w-60 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="All">All Exams</option>
            <option value="TNPSC">TNPSC</option>
            <option value="UPSC">UPSC</option>
            <option value="SSC">SSC</option>
            <option value="Bank">Banking</option>
          </select>
        </div>

        {/* PYQ List */}
        <div className="space-y-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-lg transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 border border-blue-100 dark:border-blue-900">
                  {p.year}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      {p.exam}
                    </span>
                    <span className="text-xs text-slate-400">📥 {p.downloads} Downloads</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-1">{p.subject}</h3>
                  <p className="text-xs text-slate-500 mt-1">{p.questions} Questions • PDF File ({p.pdfSize})</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setSelectedPyq(p)}
                  className="px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-900 text-xs font-bold flex items-center gap-1.5 hover:bg-purple-100 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>AI Explanation</span>
                </button>

                <Link
                  to="/quiz"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Practice Shift</span>
                </Link>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading ${p.exam} ${p.year} Solved Paper PDF...`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* AI Solution Modal */}
        {selectedPyq && (
          <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
                  <Sparkles className="w-4 h-4" /> AI Explanation Engine
                </div>
                <button onClick={() => setSelectedPyq(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                  ✕
                </button>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {selectedPyq.exam} {selectedPyq.year} Solution Insights
              </h3>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-xs text-purple-900 dark:text-purple-200 space-y-2 leading-relaxed">
                <p><strong>AI Pattern Note:</strong> 34% of questions in this paper focused on Quantitative Time & Distance and Constitutional Amendments.</p>
                <p>Recommended revision strategy: Solve chapter-wise Quant tree questions before taking full length test.</p>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  to="/ai"
                  onClick={() => setSelectedPyq(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-md"
                >
                  Open AI Tutor Chat →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
