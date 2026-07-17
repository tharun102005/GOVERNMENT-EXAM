import { Keyboard, X } from 'lucide-react';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['A', 'B', 'C', 'D'], desc: 'Select Option 1, 2, 3, or 4' },
    { keys: ['1', '2', '3', '4'], desc: 'Alternative numerical option selection' },
    { keys: ['←'], desc: 'Go to Previous Question' },
    { keys: ['→'], desc: 'Save & Go to Next Question' },
    { keys: ['M'], desc: 'Toggle Mark for Review' },
    { keys: ['S'], desc: 'Submit Test Modal' },
    { keys: ['N'], desc: 'Open / Close Notes Drawer' },
    { keys: ['C'], desc: 'Toggle On-Screen Calculator' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Keyboard className="w-5 h-5" /> Keyboard Shortcuts Guide
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Use keyboard hotkeys to answer faster during competitive exams:
          </p>

          <div className="space-y-2">
            {shortcuts.map((sc, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-700 dark:text-slate-300 font-medium">{sc.desc}</span>
                <div className="flex gap-1">
                  {sc.keys.map((k, j) => (
                    <kbd key={j} className="px-2 py-1 rounded bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-mono font-bold shadow-xs border border-slate-200 dark:border-slate-600">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-950">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
