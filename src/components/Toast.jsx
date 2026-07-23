import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

let showToastFunction = null;

export function showToast(message, type = 'success') {
  if (showToastFunction) {
    showToastFunction(message, type);
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showToastFunction = (message, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };

    return () => {
      showToastFunction = null;
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-center justify-between gap-3 text-xs font-bold transition-all duration-300 transform translate-y-0 ${
            t.type === 'success'
              ? 'bg-slate-900 border-emerald-500/50 text-emerald-300 shadow-emerald-500/10'
              : t.type === 'warning'
              ? 'bg-slate-900 border-amber-500/50 text-amber-300 shadow-amber-500/10'
              : 'bg-slate-900 border-purple-500/50 text-purple-300 shadow-purple-500/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {t.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : t.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-purple-400 shrink-0" />
            )}
            <span>{t.message}</span>
          </div>

          <button
            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
            className="text-slate-500 hover:text-slate-300 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
