import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, Send, Mic, Image, FileText, Plus, Languages } from 'lucide-react';
import { showToast } from '../components/Toast';

const initialChats = [
  { id: 1, title: 'TNPSC Polity Articles 14 to 32 Summary' },
  { id: 2, title: 'Quant Time & Work Shortcut Tricks' },
  { id: 3, title: 'UPSC CSE 2026 Strategy Guide' },
];

export default function AIHubPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to ExamMaster AI Hub! Ask me to explain any topic, generate a 10-question quiz, summarize PDFs, or translate notes.' }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `AI Tutor Output for: "${userText}"\n\n1. Key Concept Summary\n2. Exam Weightage (2-3 Questions in Prelims)\n3. Shortcut Formula: (A * B) / (A + B)`,
        },
      ]);
    }, 600);
  };

  const handleAction = (actionName) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: `Trigger Action: ${actionName}` },
      { role: 'assistant', text: `Generated ${actionName} successfully! You can bookmark this note or attempt the practice quiz.` }
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Chat Sidebar */}
        <aside className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col justify-between">
          <div>
            <button
              onClick={() => {
                const newId = Date.now();
                setChats([{ id: newId, title: 'New Conversation' }, ...chats]);
                setActiveChat(newId);
                setMessages([{ role: 'assistant', text: 'New Chat Session Started! What topic are we mastering today?' }]);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer mb-4 hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" /> New AI Chat Session
            </button>

            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Recent AI Chats</h4>
            <div className="space-y-1 overflow-y-auto max-h-[360px] no-scrollbar">
              {chats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChat(c.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold truncate transition flex items-center justify-between cursor-pointer ${
                    activeChat === c.id
                      ? 'bg-slate-800 text-blue-400 border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{c.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
            ExamMaster AI Engine v4.2 • GPT-4o Powered
          </div>
        </aside>

        {/* Main ChatGPT Interface */}
        <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Quick Action Tools */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleAction('Generate Notes')}
              className="px-3.5 py-1.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 text-xs font-bold hover:bg-blue-900 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" /> Generate Notes
            </button>
            <button
              onClick={() => handleAction('Generate Quiz')}
              className="px-3.5 py-1.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800/60 text-xs font-bold hover:bg-purple-900 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" /> Generate Quiz
            </button>
            <button
              onClick={() => handleAction('Translate to Tamil')}
              className="px-3.5 py-1.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800/60 text-xs font-bold hover:bg-teal-900 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Languages className="w-3.5 h-3.5" /> Translate
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[500px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-800 text-slate-100 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition" title="Upload Image Question">
                <Image className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" onChange={() => showToast('Image uploaded for AI parsing!', 'success')} />
              </label>
              <label className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition" title="Upload PDF Notes">
                <FileText className="w-4 h-4" />
                <input type="file" accept=".pdf" className="hidden" onChange={() => showToast('PDF uploaded for AI notes generation!', 'info')} />
              </label>
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2.5 rounded-xl transition cursor-pointer ${
                  isRecording ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Voice Query"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything or paste question text..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
