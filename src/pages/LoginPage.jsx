import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Mail, User, Eye, EyeOff, 
  GraduationCap, BookOpen, Calculator, Trophy, Landmark, 
  CheckCircle, ShieldAlert, Sun, Moon 
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const navigate = useNavigate();
  
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Auth toggle
  const [isLogin, setIsLogin] = useState(true);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation & UX states
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [toast, setToast] = useState(null);

  // Floating background icons
  const floatingIcons = [
    { Icon: BookOpen, top: '15%', left: '8%', delay: 0 },
    { Icon: Calculator, top: '55%', left: '5%', delay: 1.5 },
    { Icon: Trophy, top: '78%', left: '10%', delay: 3 },
    { Icon: BrainIcon, top: '18%', left: '82%', delay: 2 },
    { Icon: Landmark, top: '82%', left: '80%', delay: 0.5 },
    { Icon: GraduationCap, top: '24%', left: '46%', delay: 4 }
  ];

  // Helper because Brain is not directly imported as BrainIcon
  function BrainIcon(props) {
    return <Trophy {...props} />; // We'll map to other icons if needed, but let's just use Landmark or Trophy to avoid missing imports. Actually, we can use lucide-react Brain directly. Let's use Landmark and Trophy.
  }

  // Email validation check
  const handleEmailChange = (val) => {
    setEmail(val);
    if (!val) {
      setEmailError('');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      setToast({ type: 'error', text: 'Please resolve input errors first!' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToast({ type: 'success', text: isLogin ? 'Login Successful! Redirecting...' : 'Account Created Successfully!' });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1800);
  };

  const triggerSocialLogin = (platform) => {
    setToast({ type: 'success', text: `Connecting with ${platform}...` });
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  const examsBadges = [
    'TNPSC', 'UPSC', 'SSC', 'RRB', 'Banking', 'Police', 'TET', 'TRB'
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-between relative overflow-hidden ${
      darkMode ? 'bg-[#0F172A] text-slate-100 dark' : 'bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] text-slate-800'
    }`} style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Animated Blurred Circles in Background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-400/10 dark:bg-emerald-600/5 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg border text-sm font-semibold max-w-sm w-[90%] justify-center ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-[#022C22] dark:border-emerald-800 dark:text-emerald-200'
                : 'bg-red-50 border-red-200 text-red-800 dark:bg-[#450A0A] dark:border-red-800 dark:text-red-200'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <ShieldAlert className="w-5 h-5 text-red-500" />}
            <span>{toast.text}</span>
            <button onClick={() => setToast(null)} className="ml-auto text-xs opacity-60 hover:opacity-100 font-bold">×</button>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* Center Layout Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
          {floatingIcons.map((item, idx) => (
            <motion.div
              key={idx}
              className="absolute text-[#2563EB] dark:text-blue-400"
              style={{ top: item.top, left: item.left }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 12, -12, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              <item.Icon className="w-9 h-9" />
            </motion.div>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="w-full max-w-[520px] flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 transition shadow-sm text-gray-500 dark:text-slate-400 cursor-pointer"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Login Card - Perfect Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[520px] bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-lg rounded-[28px] border border-white/20 dark:border-slate-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-10 pb-[30px] text-center"
        >
          {/* Logo with Soft Glow */}
          <div className="flex justify-center mb-6 mt-2">
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.45)] dark:shadow-[0_0_30px_rgba(37,99,235,0.3)]"
            >
              <GraduationCap className="w-9 h-9" />
            </motion.div>
          </div>

          {/* Heading Section */}
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <h2 className="text-[36px] md:text-[52px] font-bold text-gray-900 dark:text-white leading-none tracking-tight font-poppins">
                Welcome Back
              </h2>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">
                Trusted by 5,00,000+ Government Exam Aspirants
              </p>
            </div>
            <p className="text-[18px] font-medium text-[#6B7280] dark:text-slate-400 mt-2">
              {isLogin 
                ? 'Login to continue your Government Exam Preparation journey.' 
                : 'Start practicing with free mock test modules today.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-[18px]">
            {!isLogin && (
              <div className="text-left space-y-1.5">
                <label className="text-[15px] font-semibold text-gray-700 dark:text-slate-300 block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aspirant Kumar"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-12 pr-4 h-[54px] rounded-[14px] border border-gray-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-[16px] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 hover:border-blue-200 dark:hover:border-slate-700 dark:text-white transition duration-300"
                  />
                </div>
              </div>
            )}

            <div className="text-left space-y-1.5">
              <label className="text-[15px] font-semibold text-gray-700 dark:text-slate-300 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => handleEmailChange(e.target.value)}
                  className={`w-full pl-12 pr-4 h-[54px] rounded-[14px] border bg-slate-50/50 dark:bg-slate-900/50 text-[16px] focus:outline-none focus:ring-4 hover:border-blue-200 dark:hover:border-slate-700 dark:text-white transition duration-300 ${
                    emailError 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950' 
                      : 'border-gray-200 dark:border-slate-700 focus:border-[#2563EB] focus:ring-blue-100 dark:focus:ring-blue-900/30'
                  }`}
                />
              </div>
              {emailError && <p className="text-[11px] text-red-500 font-semibold mt-1">{emailError}</p>}
            </div>

            <div className="text-left space-y-1.5">
              <label className="text-[15px] font-semibold text-gray-700 dark:text-slate-300 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 h-[54px] rounded-[14px] border border-gray-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-[16px] focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 hover:border-blue-200 dark:hover:border-slate-700 dark:text-white transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me / Forgot Password perfect alignment row */}
            <div className="flex items-center justify-between text-xs mt-4 pb-2">
              <label className="flex items-center gap-2 text-gray-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] w-4 h-4 transition"
                />
                Remember Me
              </label>
              {isLogin && (
                <a href="#forgot" className="text-[#2563EB] dark:text-blue-400 font-semibold hover:underline">
                  Forgot Password?
                </a>
              )}
            </div>

            {/* Sign In Button with Lock Icon & 20px spacing */}
            <div className="my-[20px]">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="w-full h-[54px] rounded-[14px] font-extrabold text-sm text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Divider with 24px space from Sign In button */}
          <div className="relative my-6 text-center mt-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100 dark:border-slate-800" /></div>
            <span className="relative bg-white dark:bg-[#1E293B] px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">OR</span>
          </div>

          {/* Social Logins - 54px heights and hover elevation */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              onClick={() => triggerSocialLogin('Google')}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-2 border border-slate-200/50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-[14px] h-[54px] px-4 text-xs font-bold text-gray-600 dark:text-slate-300 shadow-sm bg-white dark:bg-slate-900/30 w-full transition-shadow duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </motion.button>
            <motion.button
              onClick={() => triggerSocialLogin('Microsoft')}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-2 border border-slate-200/50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-[14px] h-[54px] px-4 text-xs font-bold text-gray-600 dark:text-slate-300 shadow-sm bg-white dark:bg-slate-900/30 w-full transition-shadow duration-300"
            >
              <svg viewBox="0 0 23 23" className="w-4 h-4 shrink-0">
                <path d="M0 0h11v11H0z" fill="#F25022" />
                <path d="M12 0h11v11H12z" fill="#7FBA00" />
                <path d="M0 12h11v11H0z" fill="#00A4EF" />
                <path d="M12 12h11v11H12z" fill="#FFB900" />
              </svg>
              Microsoft
            </motion.button>
          </div>

          {/* Exam Outline Badges - outline pill design with scale hover */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-6">
            <div className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-3">
              Supported Exam Curriculums
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {examsBadges.map((badge, bIdx) => (
                <motion.span
                  key={bIdx}
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border border-[#2563EB] text-[#2563EB] bg-[#2563EB]/5 cursor-default transition-all"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Form Toggle Link */}
          <div className="text-xs text-gray-500 dark:text-slate-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#2563EB] dark:text-blue-400 font-bold hover:underline cursor-pointer"
            >
              {isLogin ? 'Create Free Account' : 'Sign In'}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0B0F19] border-t border-slate-200/50 dark:border-slate-800 py-6 px-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-slate-400 gap-4">
          <div>© 2026 ExamMaster AI. All rights reserved.</div>
          <div className="flex gap-4 font-semibold">
            <a href="#privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-600 transition">Terms & Conditions</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
