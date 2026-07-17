import { useState } from 'react';
import { X, Download, Play, CheckCircle2, Sparkles } from 'lucide-react';

export default function PYQViewModal({ paper, onClose, onPractice, onDownload }) {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'key' | 'solutions'
  const [expandedSolution, setExpandedSolution] = useState(null);

  if (!paper) return null;

  // Mock sample question entries from paper
  const sampleQuestions = [
    {
      id: 1,
      question: 'Which Article of the Constitution of India provides for the Election Commission of India?',
      options: ['Article 324', 'Article 315', 'Article 280', 'Article 148'],
      correctAnswer: 0,
      explanation: 'Article 324 of the Constitution provides that the power of superintendence, direction and control of elections to Parliament, State Legislatures, office of President, and Vice-President shall be vested in the Election Commission.'
    },
    {
      id: 2,
      question: 'If 15 men can complete a piece of work in 20 days, how many men are needed to complete the same work in 12 days?',
      options: ['20 men', '25 men', '30 men', '18 men'],
      correctAnswer: 1,
      explanation: 'Total man-days required = 15 * 20 = 300 man-days. Number of men needed for 12 days = 300 / 12 = 25 men.'
    },
    {
      id: 3,
      question: 'Find the odd word out: (A) Keyboard (B) Mouse (C) Monitor (D) Scanner',
      options: ['Keyboard', 'Mouse', 'Monitor', 'Scanner'],
      correctAnswer: 2,
      explanation: 'Monitor is an output device, whereas Keyboard, Mouse, and Scanner are all input devices.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${paper.color} text-white flex items-center justify-center text-2xl shadow-xs shrink-0`}>
              {paper.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                  {paper.exam} {paper.year}
                </span>
                <span className="text-xs text-slate-400 font-medium">Official Exam Paper</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {paper.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-2 gap-4 bg-white dark:bg-slate-900">
          {[
            { id: 'questions', label: 'Paper Preview' },
            { id: 'key', label: 'Official Answer Key' },
            { id: 'solutions', label: 'AI Step-by-Step Solutions' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-bold text-xs border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100">
          
          {/* TAB 1: Questions Preview */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 text-xs text-blue-800 dark:text-blue-200 flex items-center justify-between">
                <span>Displaying 3 sample questions from this {paper.questionsCount}-question paper. Launch practice mode for full mock test window.</span>
                <span className="font-bold">{paper.questionsCount} Total Qs</span>
              </div>

              {sampleQuestions.map((q, idx) => (
                <div key={q.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/60 px-2.5 py-1 rounded-lg">
                      Question {idx + 1}
                    </span>
                    <span className="text-xs text-slate-400">Single Choice Correct</span>
                  </div>

                  <p className="font-medium text-sm text-slate-900 dark:text-slate-100">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl border font-medium flex items-center justify-between ${
                          oIdx === q.correctAnswer
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-200 font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                        {oIdx === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                    ))}
                  </div>

                  {/* Toggle Explanation */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <button
                      onClick={() => setExpandedSolution(expandedSolution === q.id ? null : q.id)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {expandedSolution === q.id ? 'Hide Solution' : 'View AI Solution'}
                    </button>
                    {expandedSolution === q.id && (
                      <p className="mt-2 text-xs bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-200 dark:border-blue-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Official Answer Key */}
          {activeTab === 'key' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Official Exam Board Answer Key</h4>
                <span className="text-xs text-slate-400">Verified by Exam Board</span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center text-xs">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-bold">Q{i + 1}</div>
                    <div className="font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {['A', 'B', 'C', 'D'][i % 4]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AI Solutions */}
          {activeTab === 'solutions' && (
            <div className="space-y-4 text-xs">
              <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 text-purple-900 dark:text-purple-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <div className="font-bold text-sm">AI Step-by-Step Explanations Active</div>
                  <div>Every question in this paper has been solved with formulas, shortcut tricks, and syllabus mapping.</div>
                </div>
              </div>

              <div className="space-y-3">
                {sampleQuestions.map((q, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-2">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Q{i + 1}. {q.question}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">Correct Answer: {q.options[q.correctAnswer]}</div>
                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onDownload(paper)}
            className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Full PDF Paper
          </button>

          <button
            onClick={() => {
              onClose();
              onPractice(paper);
            }}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" /> Launch Live Practice Window
          </button>
        </div>

      </div>
    </div>
  );
}
