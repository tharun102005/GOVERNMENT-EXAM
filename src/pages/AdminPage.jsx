import { useState } from 'react';
import { Users, Terminal, ShieldCheck, Database, Bell, Play, FileText, Upload, Plus, Trash2, CheckCircle2, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import { pyqPapers as initialPyqPapers } from '../data/pyqData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('pyq'); // 'pyq' | 'system'
  const [pyqPapers, setPyqPapers] = useState(initialPyqPapers);
  
  // New paper modal form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newExam, setNewExam] = useState('TNPSC');
  const [newYear, setNewYear] = useState('2025');
  const [newSubject, setNewSubject] = useState('General Knowledge & Polity');
  const [newQuestions, setNewQuestions] = useState('100');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [newLanguage, setNewLanguage] = useState('English');
  const [isUploading, setIsUploading] = useState(false);

  const stats = [
    { label: 'Registered Students', value: '2.4M', icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: 'PYQ Papers Uploaded', value: `${pyqPapers.length} Papers`, icon: <FileText className="w-5 h-5 text-indigo-500" /> },
    { label: 'Total Paper Downloads', value: '715.4K', icon: <Download className="w-5 h-5 text-emerald-500" /> },
    { label: 'Server API Health', value: '99.98%', icon: <ShieldCheck className="w-5 h-5 text-yellow-500" /> },
  ];

  const handleAddPaper = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const created = {
        id: `pyq-custom-${Date.now()}`,
        title: newTitle,
        exam: newExam,
        category: newExam,
        year: Number(newYear),
        subject: newSubject,
        languages: [newLanguage],
        difficulty: newDifficulty,
        questionsCount: Number(newQuestions),
        durationMinutes: 120,
        downloadsCount: 0,
        hasAnswerKey: true,
        hasDetailedSolution: true,
        pdfUrl: '#',
        emoji: '📄',
        color: 'from-blue-600 to-indigo-600',
        description: `Official ${newExam} ${newYear} question paper uploaded via Admin Console.`
      };

      setPyqPapers(prev => [created, ...prev]);
      setIsUploading(false);
      setIsAddModalOpen(false);
      setNewTitle('');
    }, 1000);
  };

  const handleDeletePaper = (id) => {
    if (confirm('Are you sure you want to delete this question paper?')) {
      setPyqPapers(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-4 py-1 rounded-full mb-3">
              Admin & Content Control Panel
            </span>
            <h1 className="text-4xl font-bold text-gray-900">System & PYQ Management</h1>
            <p className="text-gray-500 mt-2">
              Upload official PDF papers, manage answer keys, monitor database health and download statistics.
            </p>
          </div>

          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setActiveTab('pyq')}
              className={`px-4 py-2.5 font-bold rounded-xl transition cursor-pointer ${
                activeTab === 'pyq'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              📄 PYQ Paper Manager
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2.5 font-bold rounded-xl transition cursor-pointer ${
                activeTab === 'system'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              🖥️ System Diagnostics
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500 font-semibold">{s.label}</span>
                {s.icon}
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>

        {/* TAB 1: PYQ MANAGEMENT */}
        {activeTab === 'pyq' && (
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Previous Year Question Papers Management</h2>
                <p className="text-xs text-gray-500">Upload new PDF question papers, attach answer keys, and manage existing paper metadata.</p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold py-3 px-5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Upload New Question Paper
              </button>
            </div>

            {/* PYQ Papers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-500 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Exam & Title</th>
                    <th className="p-3.5">Year</th>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5">Questions</th>
                    <th className="p-3.5">Downloads</th>
                    <th className="p-3.5">Answer Key</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {pyqPapers.map(paper => (
                    <tr key={paper.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-gray-900">{paper.title}</div>
                        <div className="text-[11px] text-gray-400">{paper.exam} • {paper.difficulty}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-md text-[11px]">
                          {paper.year}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-600">{paper.subject}</td>
                      <td className="p-3.5 font-bold text-gray-900">{paper.questionsCount} Qs</td>
                      <td className="p-3.5 text-blue-600 font-bold">{paper.downloadsCount.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Attached
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeletePaper(paper.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Delete Paper"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SYSTEM DIAGNOSTICS */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Tasks */}
            <div className="lg:col-span-1 bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-[#2563EB]" /> Database Ops
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                  <Play className="w-3.5 h-3.5" /> Rebuild Search Index
                </button>
                <button className="w-full border border-gray-200 hover:bg-slate-50 text-gray-600 text-xs font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                  <Bell className="w-3.5 h-3.5 text-orange-500" /> Send System Alert
                </button>
              </div>
            </div>

            {/* System Terminal Console */}
            <div className="lg:col-span-2 bg-[#0F172A] rounded-[20px] shadow-lg overflow-hidden border border-slate-800">
              <div className="bg-[#1E293B] border-b border-slate-800 px-5 py-3.5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-300">diagnostic_console.sh</span>
              </div>
              <div className="p-5 font-mono text-xs text-emerald-400 space-y-2 h-48 overflow-y-auto leading-relaxed">
                <div>[SYSTEM] Boot sequence loaded successfully.</div>
                <div>[DATABASE] Connecting to PostgreSQL pool... OK.</div>
                <div>[PYQ_ENGINE] 1,480 question papers indexed in memory.</div>
                <div>[REDIS] Active subscriber count: 12 clients.</div>
                <div>[API] GET /api/v1/pyq/papers - 200 OK (8ms)</div>
                <div>[API] POST /api/v1/pyq/upload - 201 Created (65ms)</div>
                <div className="animate-pulse text-white">_ (Console awaiting command...)</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Upload Paper Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-lg w-full p-6 space-y-5 border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-gray-900 text-base">Upload New Question Paper PDF</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">×</button>
            </div>

            <form onSubmit={handleAddPaper} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Paper Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TNPSC Group 4 2025 Official Question Paper"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Exam Category</label>
                  <select value={newExam} onChange={e => setNewExam(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium">
                    {['UPSC', 'TNPSC', 'SSC CGL', 'SSC CHSL', 'RRB NTPC', 'Banking', 'Police', 'TET', 'Defence', 'NEET', 'JEE'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Year</label>
                  <select value={newYear} onChange={e => setNewYear(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium">
                    {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Subject</label>
                  <select value={newSubject} onChange={e => setNewSubject(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium">
                    <option value="General Knowledge & Polity">General Knowledge & Polity</option>
                    <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                    <option value="Logical Reasoning">Logical Reasoning</option>
                    <option value="General English">General English</option>
                    <option value="General Science">General Science</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Difficulty</label>
                  <select value={newDifficulty} onChange={e => setNewDifficulty(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Questions Count</label>
                  <input
                    type="number"
                    value={newQuestions}
                    onChange={e => setNewQuestions(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Language</label>
                  <select value={newLanguage} onChange={e => setNewLanguage(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 font-medium">
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Upload PDF File</label>
                <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-6 text-center bg-gray-50/50 cursor-pointer space-y-2">
                  <Upload className="w-6 h-6 text-blue-500 mx-auto" />
                  <div className="font-bold text-gray-700">Click to select PDF paper file</div>
                  <div className="text-[11px] text-gray-400">PDF, ZIP up to 50MB</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-xs"
                >
                  {isUploading ? 'Uploading & Indexing...' : 'Publish Paper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
