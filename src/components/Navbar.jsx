import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Target,
  BookOpen,
  FileEdit,
  FolderArchive,
  Sparkles,
  BarChart3,
  Trophy,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  TrendingUp,
  Heart,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

const navLinks = [
  { label: 'Exams', to: '/exams', icon: Target },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Mock Tests', to: '/mock', icon: FileEdit },
  { label: 'PYQs', to: '/pyq', icon: FolderArchive },
  { label: 'Notes', to: '/notes', icon: FileEdit },
  { label: 'Current Affairs', to: '/current-affairs', icon: TrendingUp },
  { label: 'AI Assistant', to: '/ai', icon: Sparkles, isAi: true },
  { label: 'Dashboard', to: '/analytics', icon: BarChart3 },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  // Global dark mode state
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
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLinkActive = (linkTo) => {
    if (pathname === linkTo) return true;
    if (linkTo === '/previous-year-questions' && (pathname === '/pyq' || pathname === '/previous-year-questions')) return true;
    if (linkTo === '/quant-aptitude' && (pathname === '/quant-aptitude' || pathname === '/practice/quant')) return true;
    if (linkTo === '/mock' && (pathname === '/mock' || pathname === '/results' || pathname === '/quiz')) return true;
    if (linkTo === '/practice' && pathname.startsWith('/practice') && pathname !== '/practice/quant') return true;
    return false;
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="h-[72px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-[20px] sticky top-0 z-50 border-b border-[#E5E7EB] dark:border-slate-800 shadow-xs select-none"
    >
      <div className="max-w-[1440px] mx-auto px-4 xl:px-8 h-full flex items-center justify-between gap-4">
        {/* 1. Logo */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0 group whitespace-nowrap">
          <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-[1.03] transition-all duration-300">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1E293B] dark:text-white font-poppins">
            ExamMaster{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </NavLink>

        {/* 2. Center Navigation Links (Single Line - No Wrapping) */}
        <nav className="hidden xl:flex items-center gap-2 2xl:gap-4 shrink-0 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to);
            const Icon = link.icon;

            // AI Hub Special Button Styling
            if (link.isAi) {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-1.5 rounded-[14px] font-semibold text-sm xl:text-[15px] transition-all duration-300 flex items-center gap-1.5 shrink-0 whitespace-nowrap group hover:-translate-y-[2px] ${
                    active
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/40 text-[#7C3AED] dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40 hover:shadow-[0_0_12px_rgba(124,58,237,0.3)]'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] text-[#7C3AED] dark:text-purple-300 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent font-bold">
                    AI Hub
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]" />
                  </span>
                </NavLink>
              );
            }

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 text-[14px] 2xl:text-[15px] font-semibold transition-all duration-300 flex items-center gap-2 rounded-[10px] shrink-0 whitespace-nowrap group hover:-translate-y-[2px] ${
                  active
                    ? 'bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-blue-500/25'
                    : 'text-[#1E293B] dark:text-slate-200 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-[#EFF6FF] dark:hover:bg-blue-950/40'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] transition-transform duration-300 group-hover:rotate-6 ${
                    active
                      ? 'text-white'
                      : link.isLeaderboard
                      ? 'text-amber-500 fill-amber-400/20 group-hover:text-amber-400'
                      : 'text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400'
                  }`}
                />
                <span>{link.label}</span>

                {/* Animated Underline Expands from Center on Hover (Inactive) */}
                {!active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2563EB] dark:bg-blue-400 rounded-full scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* 3. Right Side Actions (Equal Spacing, Vertically Centered) */}
        <div className="hidden xl:flex items-center gap-3.5 shrink-0">
          {/* Quick Search */}
          <NavLink
            to="/exams"
            className="w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-[#EFF6FF] dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#2563EB] shadow-xs hover:shadow-md hover:scale-[1.03] transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="Quick Search"
          >
            <Search className="w-5 h-5" />
          </NavLink>

          {/* Notification Bell with Badge */}
          <button
            onClick={() => setHasUnread(false)}
            className="relative w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-[#EFF6FF] dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#2563EB] shadow-xs hover:shadow-md hover:scale-[1.03] transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-[#EFF6FF] dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-500 shadow-xs hover:shadow-md hover:scale-[1.03] transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-[#E5E7EB] dark:bg-slate-800 mx-1" />

          {/* Login and Register Buttons */}
          <NavLink
            to="/login"
            className="hidden lg:flex px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="hidden lg:flex px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
          >
            Register
          </NavLink>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-[#E5E7EB] dark:bg-slate-800 mx-1" />

          {/* Circular Avatar + Modern Floating Dropdown Card (280px) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-[#E5E7EB] dark:border-slate-700 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                A
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating Dropdown Card (280px width, rounded 18px, shadow 0 20px 50px rgba(0,0,0,.15)) */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 mt-3 w-[280px] bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-3 z-50 text-[#1E293B] dark:text-slate-100"
                >
                  {/* Top Profile Header */}
                  <div className="flex items-center gap-3 p-2 mb-2 border-b border-gray-100 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md">
                      A
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm text-[#1E293B] dark:text-white truncate">
                        Aspirant User
                      </p>
                      <p className="text-xs text-slate-400 truncate">aspirant@exammaster.ai</p>
                    </div>
                  </div>

                  {/* Menu Items (48px height, rounded 12px, blue hover background, icon left, arrow right) */}
                  <div className="space-y-1">
                    <NavLink
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span>My Profile</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </NavLink>

                    <NavLink
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                        <span>Settings</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </NavLink>

                    <NavLink
                      to="/analytics"
                      onClick={() => setDropdownOpen(false)}
                      className="h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                        <span>Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </NavLink>

                    <NavLink
                      to="/practice"
                      onClick={() => setDropdownOpen(false)}
                      className="h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                        <span>Saved Questions</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </NavLink>

                    <button
                      onClick={() => {
                        toggleDarkMode();
                        setDropdownOpen(false);
                      }}
                      className="w-full h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all duration-200 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <NavLink
                      to="/ai"
                      onClick={() => setDropdownOpen(false)}
                      className="h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800 hover:text-[#2563EB] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
                        <span>Help & AI Assistant</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </NavLink>

                    <div className="h-px bg-gray-100 dark:bg-slate-800 my-1" />

                    <NavLink
                      to="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="h-[48px] px-3.5 rounded-[12px] flex items-center justify-between text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
                    </NavLink>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Mobile Hamburger Menu Trigger (<1280px) */}
        <div className="flex xl:hidden items-center gap-2 shrink-0">
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 5. Mobile Slide-out Sidebar & Backdrop Blur */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-40 xl:hidden"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white dark:bg-slate-900 border-l border-[#E5E7EB] dark:border-slate-800 shadow-2xl p-6 z-50 flex flex-col justify-between overflow-y-auto xl:hidden"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      ExamMaster <span className="text-[#2563EB]">AI</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="py-4 space-y-1.5">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.to);
                    const Icon = link.icon;

                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          active
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-blue-500/25'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                          <span className="whitespace-nowrap">{link.label}</span>
                        </div>
                        {link.isAi && (
                          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-[#7C3AED] text-white">
                            AI
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                <NavLink
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User className="w-5 h-5 text-[#2563EB]" /> My Profile
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-3 rounded-xl text-center font-bold text-sm text-white bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] shadow-md shadow-blue-500/30"
                >
                  Sign In / Register
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
