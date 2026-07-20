import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, User, Moon, Sun, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Exams', to: '/exams' },
  { label: 'Practice', to: '/practice' },
  { label: 'Quant Syllabus', to: '/quant-aptitude' },
  { label: 'Mock Tests', to: '/mock' },
  { label: 'Previous Year Questions', to: '/previous-year-questions' },
  { label: 'AI Hub', to: '/ai' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Leaderboard', to: '/leaderboard' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Global dark mode toggle logic
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      window.dispatchEvent(new Event('theme-change'));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      window.dispatchEvent(new Event('theme-change'));
    }
  };

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  return (
    <nav className="h-[72px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50 flex items-center transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px] w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 select-none">
          <div className="w-[38px] h-[38px] rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.3)]">
            <GraduationCap className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="text-lg font-extrabold text-slate-850 dark:text-white tracking-tight font-poppins">
            ExamMaster <span className="text-blue-600 dark:text-blue-400">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative py-2 px-3 text-sm font-medium transition duration-300 select-none ${pathname === link.to
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                } group`}
            >
              {link.label}
              <span className={`absolute bottom-[-14px] left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-left ${pathname === link.to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                } shadow-[0_0_8px_rgba(37,99,235,0.6)]`} />
            </Link>
          ))}
        </div>

        {/* Right actions: 48px circle buttons, equal spacing */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/profile"
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 transition duration-300 shadow-xs shrink-0"
            title="Profile"
          >
            <User className="w-5.5 h-5.5" />
          </Link>

          <Link
            to="/settings"
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 transition duration-300 shadow-xs shrink-0"
            title="Settings"
          >
            <Settings className="w-5.5 h-5.5" />
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300 transition duration-300 shadow-xs cursor-pointer shrink-0"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5.5 h-5.5 text-amber-400" /> : <Moon className="w-5.5 h-5.5" />}
          </button>

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-[14px] border border-slate-200 dark:border-slate-800 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-300 shadow-xs select-none"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-[14px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-semibold text-white transition duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] select-none"
          >
            Sign Up Free
          </Link>
        </div>

        {/* Mobile menu and controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button onClick={() => setOpen(!open)} className="p-2 rounded-xl text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-6 py-4 flex flex-col gap-2 shadow-lg z-50">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium transition ${pathname === link.to
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
          <div className="flex flex-col gap-2">
            <Link to="/profile" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Profile</Link>
            <Link to="/settings" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Settings</Link>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-center border border-slate-200 dark:border-slate-850 text-xs font-semibold text-blue-600 dark:text-blue-400">Login</Link>
              <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-center bg-blue-600 text-xs font-semibold text-white">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
