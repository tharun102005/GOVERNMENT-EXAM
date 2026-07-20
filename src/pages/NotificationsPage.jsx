import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { Bell, CheckCheck, Trash2, Trophy, BookOpen, AlertCircle } from 'lucide-react';

const initialNotifs = [
  { id: 1, type: 'Alert', title: 'TNPSC Group 4 Notification Released!', desc: '6,244 vacancies announced. Online application starts tomorrow.', time: '10 mins ago', read: false, icon: AlertCircle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950' },
  { id: 2, type: 'Achievement', title: 'Weekly Leaderboard Updated!', desc: 'You ranked #1,204 overall in Quantitative Aptitude.', time: '2 hours ago', read: false, icon: Trophy, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950' },
  { id: 3, type: 'Test', title: 'New All-India Mock Test Live', desc: 'UPSC Prelims GS Paper 1 Full Length Mock 05 is now available.', time: '1 day ago', read: true, icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950' },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotif = (id) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto px-6 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold mb-2">
              <Bell className="w-3.5 h-3.5" /> Notifications Center
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Updates & Alerts</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={markAllRead}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 flex items-center gap-1.5 transition cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-emerald-500" />
              <span>Mark All Read</span>
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {notifs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto my-12">
            <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Notifications</h3>
            <p className="text-xs text-slate-500 mt-1">You are all caught up! Check back later for exam alerts.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifs.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`bg-white dark:bg-slate-900 border ${
                    n.read ? 'border-slate-200 dark:border-slate-800 opacity-75' : 'border-blue-200 dark:border-blue-900/60 shadow-sm'
                  } rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 transition`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${n.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.desc}</p>
                      <span className="text-[11px] text-slate-400 block pt-1">{n.time}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteNotif(n.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
