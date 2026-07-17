import { User, Mail, BookOpen, TrendingUp, Award, ShieldCheck, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const profileInfo = {
    name: 'Aspirant Kumar',
    email: 'aspirant.kumar@example.com',
    targetExam: 'TNPSC Group 4 & SSC CGL',
    membership: 'Free Tier Basic',
    avatarLetter: 'A'
  };

  const metrics = [
    { label: 'Completed Tests', value: '14 Tests', sub: 'Last: TNPSC Mock Test 3', icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
    { label: 'Avg Accuracy', value: '78.5%', sub: 'Target: 85% for selection', icon: <TrendingUp className="w-5 h-5 text-emerald-500" /> },
    { label: 'Current Level', value: 'Lvl 8', sub: 'XP: 4,820 / 5,000', icon: <Award className="w-5 h-5 text-yellow-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-[20px] border border-gray-100 p-6 md:p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#10B981] text-white text-3xl font-extrabold flex items-center justify-center shadow-md shrink-0">
              {profileInfo.avatarLetter}
            </div>

            {/* Profile detail text */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                <h1 className="text-2xl font-bold text-gray-900">{profileInfo.name}</h1>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#10B981] text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit mx-auto md:mx-0">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Aspirant
                </span>
              </div>

              <div className="text-sm text-gray-500 space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-1.5">
                  <Mail className="w-4 h-4 text-gray-400" /> {profileInfo.email}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1.5">
                  <User className="w-4 h-4 text-gray-400" /> Target: <span className="font-semibold text-gray-700">{profileInfo.targetExam}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <button className="flex items-center gap-2 border border-gray-200 hover:bg-slate-50 transition text-xs font-semibold px-4 py-2.5 rounded-xl text-gray-600 shadow-sm cursor-pointer">
              <Settings className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500 font-semibold">{m.label}</span>
                {m.icon}
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{m.value}</div>
              <div className="text-xs text-gray-500 mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Account Details / Sub Panel */}
        <div className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Membership Plan</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
            <div>
              <div className="font-bold text-gray-900 text-sm">{profileInfo.membership}</div>
              <p className="text-xs text-gray-500 mt-0.5">Upgrade for unlimited custom mock tests and AI solutions.</p>
            </div>
            <button className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition shadow-sm cursor-pointer whitespace-nowrap">
              Upgrade to Premium Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
