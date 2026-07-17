import { Users, Terminal, ShieldCheck, AlertCircle, Database, Bell, Play, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  const stats = [
    { label: 'Registered Students', value: '2.4M', icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: 'Active Sessions', value: '14,820', icon: <Cpu className="w-5 h-5 text-emerald-500" /> },
    { label: 'Server API Health', value: '99.98%', icon: <ShieldCheck className="w-5 h-5 text-yellow-500" /> },
    { label: 'Pending Logs', value: '0 Errors', icon: <AlertCircle className="w-5 h-5 text-green-600" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-4 py-1 rounded-full mb-3">
            Admin Panel
          </span>
          <h1 className="text-4xl font-bold text-gray-900">System Administration</h1>
          <p className="text-gray-500 mt-2">
            Monitor infrastructure health, database queries, and active student session statistics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div>[REDIS] Active subscriber count: 12 clients.</div>
              <div>[VITE] HMR enabled on port 5173.</div>
              <div>[API] GET /api/v1/mock/stats - 200 OK (14ms)</div>
              <div>[API] POST /api/v1/user/results - 201 Created (42ms)</div>
              <div className="animate-pulse text-white">_ (Console awaiting command...)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
