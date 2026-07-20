import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { User, Lock, Bell, Moon, Globe, Shield, Trash2, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [darkTheme, setDarkTheme] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const next = !darkTheme;
    setDarkTheme(next);
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Settings & Preferences</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your account security, notification alerts, and application theme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Settings Nav Sidebar */}
          <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-1">
            {[
              { id: 'Account', icon: User },
              { id: 'Privacy & Security', icon: Lock },
              { id: 'Notifications', icon: Bell },
              { id: 'Theme & Language', icon: Moon },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-3 cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.id}</span>
                </button>
              );
            })}
          </aside>

          {/* Settings Form Container */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {activeTab === 'Account' && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Account Details</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Aspirant User"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-500 block mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue="aspirant@exammaster.ai"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Notification Preferences</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-xs">Email Exam Notifications</h4>
                    <p className="text-[11px] text-slate-400">Receive alerts when new TNPSC or UPSC applications open.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={(e) => setEmailNotifs(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'Theme & Language' && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Theme & Display</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-xs">Dark Mode</h4>
                    <p className="text-[11px] text-slate-400">Toggle dark themes for low-light night study.</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
                  >
                    {darkTheme ? 'Switch to Light' : 'Switch to Dark'}
                  </button>
                </div>
              </div>
            )}

            {/* Danger Zone */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-rose-500 uppercase tracking-wider">Danger Zone</h4>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete your ExamMaster AI account?')) {
                    alert('Account delete request submitted.');
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-2 hover:bg-rose-100 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Account Permanently
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
