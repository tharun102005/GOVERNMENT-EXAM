import { TrendingUp, Target, Flame, Award, Calendar, Activity, Zap, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { weeklyProgress } from '../data/mockData';

export default function AnalyticsPage() {
  const cards = [
    { label: 'Study Streak', value: '42 Days', sub: 'Top 5% active users', icon: <Flame className="w-6 h-6" />, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50/50' },
    { label: 'Questions Solved', value: '3,421', sub: '92% completed of weekly goal', icon: <CheckCircle className="w-6 h-6" />, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50/50' },
    { label: 'Avg. Accuracy', value: '78.5%', sub: '+2.4% since last week', icon: <Target className="w-6 h-6" />, color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50/50' },
    { label: 'Current Rank', value: '#1,204', sub: 'Percentile: 96.2%', icon: <Award className="w-6 h-6" />, color: 'from-purple-500 to-fuchsia-500', bg: 'bg-purple-50/50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block bg-purple-100 text-purple-600 text-xs font-semibold px-4 py-1 rounded-full mb-3">
              Performance Insights
            </span>
            <h1 className="text-4xl font-bold text-gray-900">Your Growth Dashboard</h1>
            <p className="text-gray-500 mt-2">
              Track your preparation path, daily schedule, and predicted score metrics.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 px-4 py-2 flex items-center gap-2 text-sm text-gray-500 shadow-sm">
            <Calendar className="w-4 h-4 text-[#2563EB]" /> Last updated: Just now
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center`}>
                  {c.icon}
                </div>
                <span className="text-xs text-gray-400 font-medium">Metric</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{c.value}</div>
              <div className="font-semibold text-sm text-gray-900 mt-1">{c.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Analytics charts/bars section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Progress Visualizer */}
          <div className="lg:col-span-2 bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#2563EB]" /> Weekly Study Volume
              </h2>
              <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full">
                Active Streak
              </span>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2.5 pt-4">
              {weeklyProgress.map((wp, i) => {
                const maxQuestions = Math.max(...weeklyProgress.map(x => x.questions));
                const heightPercentage = (wp.questions / maxQuestions) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-t-xl relative flex justify-center group" style={{ height: `${heightPercentage}%` }}>
                      {/* Inner animated bar */}
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-xl transition-all duration-500 group-hover:opacity-90" style={{ height: '100%' }} />
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                        {wp.questions} questions ({wp.score}% avg)
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 font-semibold">{wp.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Performance predicted score */}
          <div className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#10B981]" /> AI Target Score
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">
                Based on your accuracy stats, test speed, and revision patterns, the AI forecasts your chance of clearing the next test.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Aptitude Speed', percent: 85, color: 'bg-blue-500' },
                  { label: 'GK Accuracy', percent: 72, color: 'bg-emerald-500' },
                  { label: 'English Score', percent: 90, color: 'bg-purple-500' },
                  { label: 'Time Management', percent: 78, color: 'bg-orange-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                      <span>{item.label}</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-lg shadow-sm">
                <Zap className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Expert Advice</div>
                <div className="text-[11px] text-gray-500">Practice GK questions for 20 mins to reach target rank.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
