import { useState } from 'react';
import { X, Sparkles, Brain, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

export default function PYQAIGeneratorModal({ isOpen, onClose, onGenerateMock }) {
  const [selectedCategory, setSelectedCategory] = useState('UPSC');
  const [yearRange, setYearRange] = useState('2020-2025');
  const [questionCount, setQuestionCount] = useState(50);
  const [focusTopic, setFocusTopic] = useState('All High-Weightage Topics');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'trends' | 'analysis'

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onGenerateMock({
        category: selectedCategory,
        yearRange,
        questionCount,
        focusTopic
      });
      onClose();
    }, 1200);
  };

  const topicTrends = [
    { topic: 'Indian Constitution & Amendments', weightage: '14%', frequency: 'High', repeatedYear: '2019, 2021, 2023, 2025' },
    { topic: 'Modern History & Freedom Struggle', weightage: '12%', frequency: 'High', repeatedYear: '2018, 2020, 2022, 2024' },
    { topic: 'Percentage & Compound Interest', weightage: '10%', frequency: 'Very High', repeatedYear: 'Every Year (2015-2025)' },
    { topic: 'Syllogism & Direction Sense', weightage: '9%', frequency: 'High', repeatedYear: '2020, 2022, 2024' },
    { topic: 'Sangam Literature & Tamil Scholars', weightage: '18% (TNPSC)', frequency: 'Very High', repeatedYear: 'Every Year (2016-2025)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 text-white flex items-start justify-between relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI PYQ Intelligence Suite
            </span>
            <h2 className="text-2xl font-extrabold text-white">
              AI PYQ Custom Test Generator
            </h2>
            <p className="text-xs text-blue-200">
              Generate targeted mock tests from 10 years of official previous papers with smart AI weightage algorithm.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition cursor-pointer relative z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-2 gap-4 bg-white dark:bg-slate-900 text-xs">
          {[
            { id: 'generator', label: 'Generate Custom Mock Test' },
            { id: 'trends', label: '10-Year Topic Trends & Weightage' },
            { id: 'analysis', label: 'AI Weak Spot Analyzer' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-bold border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-slate-800 dark:text-slate-100">
          
          {/* TAB 1: Generator */}
          {activeTab === 'generator' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Category Select */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Target Exam Category</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-blue-600"
                  >
                    {['UPSC', 'TNPSC', 'SSC CGL', 'RRB NTPC', 'Banking', 'Police', 'TET', 'Defence', 'NEET', 'JEE'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Year Range */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">PYQ Year Span</label>
                  <select
                    value={yearRange}
                    onChange={e => setYearRange(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-blue-600"
                  >
                    <option value="2020-2025">Last 5 Years (2020-2025)</option>
                    <option value="2015-2025">Last 10 Years (2015-2025)</option>
                    <option value="2024-2025">Latest Papers (2024-2025)</option>
                  </select>
                </div>

                {/* Question Count */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Number of Questions</label>
                  <select
                    value={questionCount}
                    onChange={e => setQuestionCount(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-blue-600"
                  >
                    <option value={25}>25 Questions (Quick Quiz)</option>
                    <option value={50}>50 Questions (Standard Mock)</option>
                    <option value={100}>100 Questions (Full Mock Paper)</option>
                  </select>
                </div>

                {/* Focus Topic */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Topic Focus Mode</label>
                  <select
                    value={focusTopic}
                    onChange={e => setFocusTopic(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none focus:border-blue-600"
                  >
                    <option value="All High-Weightage Topics">All High-Weightage Topics</option>
                    <option value="Most Repeated Questions Only">Most Repeated Questions Only</option>
                    <option value="Weak Concept Strengthening">Weak Concept Strengthening</option>
                  </select>
                </div>
              </div>

              {/* Summary Pill */}
              <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-3">
                <Brain className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <div className="font-bold">AI Exam Intelligence Configured</div>
                  <div>Generating test with {questionCount} questions from {selectedCategory} ({yearRange}) focusing on {focusTopic}.</div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing 10 Years PYQ Database...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI PYQ Mock Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 2: Trends */}
          {activeTab === 'trends' && (
            <div className="space-y-4 text-xs">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Top 5 Repeated Topics Across 10 Years</div>
              <div className="space-y-2.5">
                {topicTrends.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{item.topic}</div>
                      <div className="text-slate-500 text-[11px]">Repeated in: {item.repeatedYear}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 font-extrabold px-2.5 py-1 rounded-lg">
                        {item.weightage} Marks
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 font-extrabold px-2.5 py-1 rounded-lg">
                        {item.frequency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Weak Spot */}
          {activeTab === 'analysis' && (
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-sm">AI Diagnostic Ready</div>
                  <div>Based on your test attempts, AI recommends prioritizing <strong>Polity Constitutional Amendments</strong> and <strong>Math Ratio & Proportion</strong>.</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
