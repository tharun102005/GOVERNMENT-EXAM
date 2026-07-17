import { useState } from 'react';
import { Bell, User, Shield, Trash2, Save, Moon, Sun } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [themeMode, setThemeMode] = useState('light');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1 rounded-full mb-3">
            System Preferences
          </span>
          <h1 className="text-4xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 mt-2">
            Configure your notifications, study audio sounds, security preferences, and interface themes.
          </p>
        </div>

        <div className="space-y-6">
          {/* General section */}
          <div className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-3">
              <User className="w-5 h-5 text-[#2563EB]" /> Study Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5 font-bold">App Theme Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setThemeMode('light')}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition cursor-pointer ${
                      themeMode === 'light' ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB]' : 'border-gray-200 text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition cursor-pointer ${
                      themeMode === 'dark' ? 'border-[#2563EB] bg-blue-50/50 text-[#2563EB]' : 'border-gray-200 text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications toggles */}
          <div className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-3">
              <Bell className="w-5 h-5 text-emerald-500" /> Notification Options
            </h2>
            
            <div className="space-y-3">
              {[
                { state: emailAlerts, setState: setEmailAlerts, title: 'Email Notifications', desc: 'Receive weekly exam alerts and performance report digests.' },
                { state: studyReminders, setState: setStudyReminders, title: 'Daily Study Reminders', desc: 'Get HMR push alerts when your targeted streak time starts.' },
                { state: soundEffects, setState: setSoundEffects, title: 'Audio Sound Effects', desc: 'Play positive sound tones when submitting correct quiz options.' },
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-xs font-bold text-gray-900">{opt.title}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</div>
                  </div>
                  <button
                    onClick={() => opt.setState(!opt.state)}
                    className={`w-10 h-6 rounded-full transition relative shrink-0 ${opt.state ? 'bg-[#10B981]' : 'bg-gray-200'}`}
                  >
                    <span className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.75 transition-all shadow-sm ${opt.state ? 'right-0.75' : 'left-0.75'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dangerous Zone */}
          <div className="bg-white rounded-[20px] border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-3">
              <Shield className="w-5 h-5 text-red-500" /> Account Security & Actions
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-xs font-bold text-gray-900">Delete Account</div>
                <p className="text-[10px] text-gray-500 mt-0.5">This will delete all your study history, custom tests, and streaks forever.</p>
              </div>
              <button className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 cursor-pointer shrink-0">
                <Trash2 className="w-4 h-4" /> Permanent Delete
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button className="border border-gray-200 hover:bg-slate-50 text-gray-600 text-xs font-bold py-3 px-6 rounded-xl transition cursor-pointer">
              Cancel
            </button>
            <button onClick={handleSave} className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold py-3 px-8 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm">
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
