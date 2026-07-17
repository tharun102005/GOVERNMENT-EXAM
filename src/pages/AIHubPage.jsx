import { useState } from 'react';
import { Brain, Sparkles, Send, Calendar, MessageSquare, ShieldAlert } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function AIHubPage() {
  const [activeFeature, setActiveFeature] = useState('Doubt Solver');
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { role: 'assistant', text: 'Hello! I am your AI Exam Assistant. Ask me any competitive exam doubt, or select another tool from the side panel.' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    setChatLog(prev => [...prev, userMessage]);
    setChatInput('');

    // Generate custom mock reply based on text
    setTimeout(() => {
      let replyText = "That's a great question. Let me solve that using step-by-step reasoning...";
      if (chatInput.toLowerCase().includes('syllogism') || chatInput.toLowerCase().includes('reasoning')) {
        replyText = "Syllogism questions can be easily solved using Euler circles or Venn diagrams. Let's draw circles for 'All A are B' and 'Some B are C'. Would you like a step-by-step example?";
      } else if (chatInput.toLowerCase().includes('tnpsc') || chatInput.toLowerCase().includes('gk')) {
        replyText = "For TNPSC GK, prioritize Unit 8 (Tamil Society History) and Unit 9 (Development Administration). The current mock test database contains 3,000+ targeted TNPSC questions.";
      }
      setChatLog(prev => [...prev, { role: 'assistant', text: replyText }]);
    }, 1000);
  };

  const features = [
    { title: 'AI Study Planner', icon: '📅', desc: 'Create custom daily study plans according to your target exam dates.', color: 'from-blue-500 to-indigo-600' },
    { title: 'AI Doubt Solver', icon: '💬', desc: 'Ask doubts in Math, Reasoning, GK, and get step-by-step explanations.', color: 'from-emerald-500 to-teal-600' },
    { title: 'AI Quiz Generator', icon: '🎲', desc: 'Generate customized practice test questions for your weakest chapters.', color: 'from-purple-500 to-pink-600' },
    { title: 'Performance Analysis', icon: '📊', desc: 'Deep-dive audit report highlighting weak subjects and score trends.', color: 'from-amber-500 to-yellow-600' },
    { title: 'Interview Prep', icon: '🎤', desc: 'Simulate mock board interviews with personality questions.', color: 'from-rose-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-white/20 text-[#2563EB] bg-blue-100 text-xs font-semibold px-4 py-1 rounded-full mb-3">
            🤖 AI-Powered Suite
          </span>
          <h1 className="text-4xl font-bold text-gray-900">Your AI Study Partner</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Access intelligent features designed to help you prepare smarter and crack competitive exams fast.
          </p>
        </div>

        {/* Console layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature list selector */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-2">Select AI Tool</h2>
            {features.map((f, i) => (
              <div
                key={i}
                onClick={() => setActiveFeature(f.title)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                  activeFeature === f.title
                    ? 'border-[#2563EB] bg-blue-50/50 shadow-sm'
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Console Screen */}
          <div className="lg:col-span-2 bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[520px]">
            {/* Console Header */}
            <div className="bg-slate-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                  <Brain className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">{activeFeature} Console</h2>
                  <span className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-ping" /> Online & Active
                  </span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            </div>

            {/* Console Viewport */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {activeFeature === 'AI Study Planner' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 text-[#2563EB] rounded-xl p-4 text-xs font-semibold flex gap-2">
                    <Calendar className="w-5 h-5 shrink-0" /> Configure details below to generate a study calendar.
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 font-bold">Target Exam</label>
                      <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500">
                        <option>TNPSC Group 4</option>
                        <option>UPSC CSE Prelims</option>
                        <option>SSC CGL</option>
                        <option>Banking PO</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 font-bold">Daily Study Hours</label>
                      <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500">
                        <option>2 Hours</option>
                        <option>4 Hours</option>
                        <option>6 Hours</option>
                        <option>8+ Hours</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-sm cursor-pointer mt-2">
                    Generate Study Plan
                  </button>
                </div>
              )}

              {activeFeature === 'AI Doubt Solver' && (
                <div className="flex flex-col h-full justify-between gap-4">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                    {chatLog.map((log, li) => (
                      <div key={li} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                          log.role === 'user'
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {log.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-gray-100 pt-3">
                    <input
                      type="text"
                      placeholder="Ask anything (e.g. 'Solve: If 20% of X = 60, find 35% of X')"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-[#2563EB] text-white p-2.5 rounded-xl hover:bg-blue-700 transition cursor-pointer">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {activeFeature === 'AI Quiz Generator' && (
                <div className="space-y-4">
                  <div className="bg-purple-50 text-purple-600 rounded-xl p-4 text-xs font-semibold flex gap-2">
                    <Sparkles className="w-5 h-5 shrink-0" /> Instantly build customized testing quizzes on your weak chapters.
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1 font-bold">Choose Topic</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500">
                      <option>Quantitative Aptitude - Simplification</option>
                      <option>General Knowledge - Indian Polity</option>
                      <option>Logical Reasoning - Syllogism</option>
                      <option>English - Grammar & Comprehension</option>
                    </select>
                  </div>
                  <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-sm cursor-pointer">
                    Build Quiz Now
                  </button>
                </div>
              )}

              {activeFeature === 'Performance Analysis' && (
                <div className="space-y-4 text-xs">
                  <div className="bg-amber-50 text-amber-700 rounded-xl p-4 flex gap-2">
                    <ShieldAlert className="w-5 h-5 shrink-0" /> AI identified 2 critical weakness areas in Quantitative Aptitude.
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Simplification Practice</span>
                      <span className="text-red-500 font-bold">Weak (48% accuracy)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Fundamental Rights</span>
                      <span className="text-green-600 font-bold">Strong (85% accuracy)</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-sm cursor-pointer">
                    Download Full PDF Audit
                  </button>
                </div>
              )}

              {activeFeature === 'Interview Prep' && (
                <div className="space-y-4">
                  <div className="bg-rose-50 text-rose-600 rounded-xl p-4 text-xs font-semibold flex gap-2">
                    <MessageSquare className="w-5 h-5 shrink-0" /> Practice simulated voice or text responses for TNPSC/UPSC board questions.
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                    <p className="text-gray-700 font-bold text-xs mb-2">"Why do you want to join the civil services?"</p>
                    <textarea
                      placeholder="Type your answer response here (minimum 20 words)..."
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 bg-white h-24"
                    />
                  </div>
                  <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-sm cursor-pointer">
                    Analyze Answer Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
