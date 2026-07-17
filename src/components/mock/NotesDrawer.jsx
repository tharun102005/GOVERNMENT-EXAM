import { FileText, Save, Trash2, X } from 'lucide-react';

export default function NotesDrawer({
  isOpen,
  onClose,
  questionIndex,
  noteText,
  onSaveNote,
  onClearNote
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Notes for Question #{questionIndex + 1}</h3>
              <p className="text-xs text-slate-500">Private rough notes & scratchpad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 flex flex-col space-y-4">
          <textarea
            value={noteText || ''}
            onChange={(e) => onSaveNote(questionIndex, e.target.value)}
            placeholder="Write formulas, calculations, or key steps here... (Auto-saved)"
            className="flex-1 w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm leading-relaxed resize-none"
          />

          <div className="flex justify-between items-center text-xs text-slate-400 px-1">
            <span>Character count: {(noteText || '').length}</span>
            <span className="text-emerald-500 font-medium">✓ Saved locally</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3 bg-slate-50 dark:bg-slate-950">
          <button
            onClick={() => onClearNote(questionIndex)}
            className="flex-1 py-2.5 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Note
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <Save className="w-3.5 h-3.5" /> Done
          </button>
        </div>
      </div>
    </div>
  );
}
