import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AiWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am your ExamMaster AI tutor. Ask me any exam question or quantitative formula!' }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Great question regarding "${userMsg}"! I have loaded personalized practice questions and AI explanations in the AI Hub.`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Trigger Button */}
      {!open && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white shadow-xl shadow-blue-500/35 flex items-center justify-center cursor-pointer group border-2 border-white/20"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500 border-2 border-white" />
          </span>
        </motion.button>
      )}

      {/* Floating Popup Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[360px] sm:w-[400px] h-[480px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">ExamMaster AI Tutor</h4>
                  <p className="text-[11px] text-blue-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950/50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask any question..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white hover:shadow-md transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <button
              onClick={() => {
                setOpen(false);
                navigate('/ai');
              }}
              className="py-2 text-[11px] font-bold text-center text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:underline border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1"
            >
              <span>Open Full AI Hub Workspace</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
