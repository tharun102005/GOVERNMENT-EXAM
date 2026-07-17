import { X, BookOpen, Zap, Sparkles } from 'lucide-react';

export default function QuantFormulaModal({ topic, onClose, onStartPractice }) {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-blue-50/50 dark:bg-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-xs shrink-0 font-black">
              📐
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 px-2.5 py-0.5 rounded-md">
                Official Formula Sheet & Tricks
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {topic.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-100 text-xs">
          
          {/* Key Formulas */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-blue-600">
              <BookOpen className="w-4 h-4" /> Important Formulas ({topic.formulas.length})
            </h3>
            <div className="space-y-2">
              {topic.formulas.map((formula, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100 font-semibold">
                  {idx + 1}. {formula}
                </div>
              ))}
            </div>
          </div>

          {/* Shortcut Tricks */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-amber-600">
              <Zap className="w-4 h-4 text-amber-500" /> Exam Time-Saving Shortcut Tricks
            </h3>
            <div className="space-y-2">
              {topic.tricks.map((trick, idx) => (
                <div key={idx} className="bg-amber-50/60 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-800 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  ⚡ {trick}
                </div>
              ))}
            </div>
          </div>

          {/* AI Concept Notes */}
          <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 space-y-1 text-purple-900 dark:text-purple-200">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" /> Quick Exam Preparation Strategy
            </div>
            <p className="leading-relaxed text-[11px]">
              Master these formulas before attempting the 200+ topic questions. Always solve simple cases first to verify formula bounds.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <span className="text-slate-400 font-medium text-xs">
            {topic.questionsCount} Questions Ready
          </span>

          <button
            onClick={() => {
              onClose();
              onStartPractice(topic);
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition cursor-pointer"
          >
            Start Practice Now →
          </button>
        </div>

      </div>
    </div>
  );
}
