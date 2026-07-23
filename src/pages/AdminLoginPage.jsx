import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { showToast } from '../components/Toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@exammaster.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [role, setRole] = useState('Super Admin');
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!show2FA) {
      setShow2FA(true);
      return;
    }

    // Authenticate and redirect to Super Admin Dashboard
    localStorage.setItem('exammaster_admin_token', 'super_admin_verified_token_2026');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      <Navbar />

      <main className="flex-1 max-w-[1200px] mx-auto px-6 py-12 w-full flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
              🛡️
            </div>
            <h1 className="text-2xl font-extrabold text-white">Super Admin Portal</h1>
            <p className="text-xs text-slate-400">Secure enterprise access control for ExamMaster AI</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-8 text-xs">
            {!show2FA ? (
              <>
                <div>
                  <label className="font-bold text-slate-400 block mb-2 uppercase tracking-wider text-[10px]">Admin Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-2 uppercase tracking-wider text-[10px]">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-2 uppercase tracking-wider text-[10px]">Admin Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Super Admin">Super Admin (Full Permission)</option>
                    <option value="Admin">System Admin</option>
                    <option value="Question Editor">Question Bank Editor</option>
                    <option value="Moderator">Community Moderator</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded"
                    />
                    <span className="text-slate-400 font-medium">Remember session</span>
                  </label>
                  <button type="button" onClick={() => showToast('Password reset link dispatched to admin email.', 'info')} className="text-purple-400 font-bold hover:underline cursor-pointer">
                    Forgot password?
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-800 text-purple-200 text-center space-y-1">
                  <span className="font-bold block text-sm">Two-Factor Authentication</span>
                  <p className="text-[11px] text-purple-300">Enter the 6-digit authenticator code from your 2FA app.</p>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-2 uppercase tracking-wider text-[10px]">Authenticator Code</label>
                  <input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="123 456"
                    maxLength={6}
                    required
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono font-bold text-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{show2FA ? 'Verify 2FA & Enter Console' : 'Proceed to 2FA Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
