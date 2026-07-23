import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import {
  Users, BookOpen, Activity, Sparkles, Plus, Search, Filter, Trash2,
  Edit, Download, Upload, Shield, Bell, FileText, Settings, Database,
  CheckCircle2, XCircle, Clock, AlertTriangle, Eye, Lock, RefreshCw,
  BarChart3, Folder, FolderPlus, Layers, Calendar, Server, Key,
  ChevronLeft, ChevronRight, Zap, TrendingUp, Cpu, HardDrive, Wifi,
  Globe, MessageSquare, Terminal, AlertCircle, Copy, Play
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();

  // Sidebar & View States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchMenuQuery, setSearchMenuQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [tableSearch, setTableSearch] = useState('');

  // Maintenance & Modal States
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Live Clock Update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enterprise Stats Data
  const statsData = [
    { title: 'Total Registered Users', value: '5,24,180', change: '+14.2%', color: 'from-blue-600 to-indigo-600', icon: Users, isUp: true },
    { title: 'Active Sessions Today', value: '42,850', change: '+8.6%', color: 'from-emerald-600 to-teal-600', icon: Activity, isUp: true },
    { title: 'Premium Pro Users', value: '12,400', change: '+22.1%', color: 'from-purple-600 to-pink-600', icon: Shield, isUp: true },
    { title: 'Total Government Exams', value: '124', change: '6 Boards', color: 'from-amber-600 to-orange-600', icon: BookOpen, isUp: true },
    { title: 'Question Bank Items', value: '45,280', change: '+1,200', color: 'from-indigo-600 to-blue-600', icon: FileText, isUp: true },
    { title: 'Live Mock Tests', value: '120 Tests', change: 'Active', color: 'from-cyan-600 to-blue-600', icon: Layers, isUp: true },
    { title: 'AI OCR & Chat Queries', value: '1.2M Today', change: '+34%', color: 'from-fuchsia-600 to-purple-600', icon: Sparkles, isUp: true },
    { title: 'Storage Volume Used', value: '42.8 GB', change: '100 GB Max', color: 'from-slate-700 to-slate-900', icon: HardDrive, isUp: true },
  ];

  // Quick Action Handlers
  const handleQuickAction = (actionName) => {
    alert(`Triggered Enterprise Action: ${actionName}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* ENTERPRISE TOP HEADER BAR */}
      <header className="h-16 bg-slate-900/90 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              🛡️
            </div>
            <span className="font-extrabold text-lg text-white hidden sm:inline">
              ExamMaster <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Enterprise Console</span>
            </span>
          </Link>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 pl-4 border-l border-slate-800">
            <span>Admin Portal</span>
            <span>/</span>
            <span className="text-purple-400 font-bold">{activeTab}</span>
          </div>
        </div>

        {/* Right Header Widget Group */}
        <div className="flex items-center gap-3">
          {/* Live Clock Badge */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-slate-300 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>UTC+05:30 • {currentTime || '15:05:41'}</span>
          </div>

          {/* Global Search Bar */}
          <div className="relative hidden sm:block w-48 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search console logs, users, exams..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Notification Indicator */}
          <button
            onClick={() => setActiveTab('Notifications')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 relative transition cursor-pointer"
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 animate-ping" />
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
              SA
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-100">Super Admin</div>
              <div className="text-[10px] text-purple-400 font-semibold">Root Clearance</div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY LAYOUT: COLLAPSIBLE SIDEBAR + MAIN CONTENT + RIGHT PANEL */}
      <div className="flex-1 flex w-full items-stretch overflow-hidden">
        
        {/* LEFT COLLAPSIBLE SIDEBAR */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0 p-3 z-30`}>
          <div className="space-y-4">
            {/* Search Filter Menu (Expanded mode only) */}
            {!sidebarCollapsed && (
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchMenuQuery}
                  onChange={(e) => setSearchMenuQuery(e.target.value)}
                  placeholder="Filter menu items..."
                  className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>
            )}

            {/* Nav Links List */}
            <nav className="space-y-1">
              {[
                { id: 'Overview', icon: BarChart3, label: 'Overview Dashboard' },
                { id: 'Users', icon: Users, label: 'User Directory', badge: '524K' },
                { id: 'Exams', icon: BookOpen, label: 'Exam Management' },
                { id: 'Questions', icon: FileText, label: 'Question Bank & AI' },
                { id: 'MockTests', icon: Layers, label: 'Mock Test Simulator' },
                { id: 'PYQs', icon: Folder, label: 'Previous Year Papers' },
                { id: 'AIManagement', icon: Sparkles, label: 'AI Usage & Logs' },
                { id: 'Notifications', icon: Bell, label: 'Push Notifications', badge: '3' },
                { id: 'FileManager', icon: FolderPlus, label: 'System File Vault' },
                { id: 'Security', icon: Shield, label: 'Security & Audit Logs' },
                { id: 'Backup', icon: Database, label: 'Database Backup' },
                { id: 'Settings', icon: Settings, label: 'Platform Settings' },
              ]
                .filter((item) => item.label.toLowerCase().includes(searchMenuQuery.toLowerCase()))
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                        activeTab === item.id
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                      }`}
                      title={sidebarCollapsed ? item.label : ''}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon className="w-4 h-4 shrink-0" />
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!sidebarCollapsed && item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          activeTab === item.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-purple-400 border border-slate-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
            </nav>
          </div>

          {/* Sidebar Footer Info */}
          {!sidebarCollapsed && (
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-extrabold text-emerald-400 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Cluster Healthy
              </span>
              <p className="text-[10px] text-slate-500">PostgreSQL 16 • Node v20</p>
            </div>
          )}
        </aside>

        {/* MAIN DISPLAY AREA (Fills all space with zero empty gap!) */}
        <main className="flex-1 p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-64px)]">

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'Overview' && (
            <div className="space-y-8">
              
              {/* TOP ENTERPRISE KPI CARDS GRID (8 CARDS) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Subtle Top Gradient Accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />

                      <div>
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider">{stat.title}</span>
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="text-2xl sm:text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left">
                          {stat.value}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> {stat.change}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">vs last month</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LARGE QUICK ACTIONS GRID */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Enterprise Quick Actions Console
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Add New Exam', icon: Plus, color: 'bg-blue-600 hover:bg-blue-500', action: 'Add Exam' },
                    { label: 'Add Questions', icon: FileText, color: 'bg-purple-600 hover:bg-purple-500', action: 'Add Questions' },
                    { label: 'Create Mock Test', icon: Layers, color: 'bg-emerald-600 hover:bg-emerald-500', action: 'Create Mock Test' },
                    { label: 'Upload PYQ PDF', icon: Upload, color: 'bg-indigo-600 hover:bg-indigo-500', action: 'Upload PYQ PDF' },
                    { label: 'Broadcast Notification', icon: Bell, color: 'bg-amber-600 hover:bg-amber-500', action: 'Send Notification' },
                    { label: 'Add System Admin', icon: Shield, color: 'bg-pink-600 hover:bg-pink-500', action: 'Add Admin' },
                    { label: 'Generate Reports', icon: BarChart3, color: 'bg-cyan-600 hover:bg-cyan-500', action: 'Generate Reports' },
                    { label: 'System Settings', icon: Settings, color: 'bg-slate-800 hover:bg-slate-700', action: 'System Settings' },
                  ].map((qa, idx) => {
                    const Icon = qa.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(qa.action)}
                        className={`p-4 rounded-2xl ${qa.color} text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{qa.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LIVE SYSTEM STATUS (Vercel / AWS Style Panel) */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-purple-400" /> Infrastructure Cluster Health
                  </h3>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                    🟢 100% Operational
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'PostgreSQL Database', status: 'Operational', latency: '4ms', load: '12%' },
                    { name: 'API Gateway', status: 'Operational', latency: '18ms', load: '24%' },
                    { name: 'S3 File Vault', status: 'Operational', latency: '12ms', load: '42.8 GB' },
                    { name: 'AI GPT-4o OCR', status: 'Operational', latency: '340ms', load: '1.2M reqs' },
                  ].map((sys, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{sys.name}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Latency: <strong className="text-slate-200">{sys.latency}</strong></span>
                        <span>Load: <strong className="text-purple-400">{sys.load}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: USER DIRECTORY */}
          {activeTab === 'Users' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-lg text-white">User Directory & Authorization</h3>
                  <p className="text-xs text-slate-400">Search 524,180 registered candidates across all exam modules.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Exporting user roster CSV...')}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Aspirant
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search user by name, email, or exam target..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* User Directory Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">User Details</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Exam Focus</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      { id: 1, name: 'Karthik Raja', email: 'karthik@exammaster.ai', role: 'Super Admin', exam: 'TNPSC Group 4', status: 'Active' },
                      { id: 2, name: 'Ananya S.', email: 'ananya@gmail.com', role: 'Aspirant', exam: 'UPSC CSE', status: 'Active' },
                      { id: 3, name: 'Priya Sharma', email: 'priya@gmail.com', role: 'Aspirant', exam: 'SSC CGL Tier I', status: 'Active' },
                      { id: 4, name: 'Venkatesh M.', email: 'venkat@gmail.com', role: 'Question Editor', exam: 'IBPS Bank PO', status: 'Suspended' },
                    ]
                      .filter((u) => u.name.toLowerCase().includes(tableSearch.toLowerCase()) || u.email.toLowerCase().includes(tableSearch.toLowerCase()))
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/40">
                          <td className="p-3 font-bold">
                            <div className="text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 text-slate-300 font-semibold">{u.exam}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                              u.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => alert(`Password reset link sent to ${u.email}`)} className="px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-bold text-slate-300 hover:bg-slate-800 cursor-pointer">
                              Reset Pass
                            </button>
                            <button onClick={() => alert(`Viewing analytics for ${u.name}`)} className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 text-[11px] font-bold hover:bg-blue-900 cursor-pointer">
                              Analytics
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: QUESTION BANK & AI GENERATOR */}
          {activeTab === 'Questions' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-lg text-white">Question Bank & AI Generation Studio</h3>
                  <p className="text-xs text-slate-400">Manage 45,280 validated questions with instant formula and OCR indexing.</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => alert('AI Question Generator invoked! 10 new Quant items added.')} className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" /> AI Question Generator
                  </button>
                  <button onClick={() => alert('Bulk CSV import triggered...')} className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> Bulk CSV Import
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Quant Aptitude</span>
                  <div className="text-xl font-black text-blue-400">14,200 Questions</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Reasoning Ability</span>
                  <div className="text-xl font-black text-purple-400">12,850 Questions</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">General Awareness</span>
                  <div className="text-xl font-black text-emerald-400">18,230 Questions</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM SETTINGS & MAINTENANCE */}
          {activeTab === 'Settings' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="font-extrabold text-lg text-white">System Settings & Infrastructure Controls</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <h4 className="font-bold text-xs text-white">System Maintenance Mode</h4>
                    <p className="text-[11px] text-slate-400">Temporarily restrict candidate logins during scheduled database upgrades.</p>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                      maintenanceMode ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {maintenanceMode ? 'Maintenance ACTIVE' : 'Enable Maintenance'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <h4 className="font-bold text-xs text-white">Database Snapshot & Cloud Restore</h4>
                    <p className="text-[11px] text-slate-400">Create real-time backup copy of PostgreSQL databases.</p>
                  </div>
                  <button onClick={() => alert('Full database backup snapshot created!')} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition cursor-pointer">
                    Backup Database Now
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* RIGHT SIDE PANEL: TASKS, MAINTENANCE & AI SUGGESTIONS */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 shrink-0">
          
          {/* Today's Tasks */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-white">Admin Tasks</h3>
              <span className="text-[10px] font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded-full border border-purple-800">3 Pending</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { title: 'Approve TNPSC G4 2026 Shift Paper 2', priority: 'High' },
                { title: 'Review 14 Flagged User Comments', priority: 'Medium' },
                { title: 'Verify UPSC Prelims Key Solutions', priority: 'High' },
              ].map((t, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <span className="font-bold text-slate-200">{t.title}</span>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions Card */}
          <div className="bg-gradient-to-br from-purple-950/80 to-slate-900 border border-purple-800/60 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-purple-300 font-extrabold text-xs">
              <Sparkles className="w-4 h-4 text-purple-400" /> AI Insights & Recommendations
            </div>
            <p className="text-xs text-purple-100 leading-relaxed">
              Candidate engagement in <strong>Quantitative Aptitude</strong> increased by <strong>+34%</strong> this week. We recommend adding 50 new Data Interpretation questions.
            </p>
          </div>

        </aside>

      </div>

      <Footer />
      <AiWidget />
    </div>
  );
}
