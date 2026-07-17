import { Link, useLocation } from 'react-router-dom';
import { Star, Menu, X, Settings, User } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Exams', to: '/exams' },
  { label: 'Practice', to: '/practice' },
  { label: 'Mock Tests', to: '/mock' },
  { label: 'PYQ Papers', to: '/pyq' },
  { label: 'AI Hub', to: '/ai' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Leaderboard', to: '/leaderboard' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xs sticky top-0 z-50 border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#10B981] flex items-center justify-center shadow-sm">
            <Star className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#2563EB] tracking-tight">
            ExamMaster <span className="text-[#10B981]">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`ag-nav-item px-3 py-2 rounded-lg text-sm font-medium transition ${
                pathname === link.to
                  ? 'bg-blue-50 text-[#2563EB]'
                  : 'text-gray-600 hover:text-[#2563EB] hover:bg-blue-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link to="/profile" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#2563EB] transition px-2 py-1.5 rounded-lg hover:bg-blue-50">
            <User className="w-4 h-4" /> Profile
          </Link>
          <Link to="/settings" className="hidden sm:flex items-center text-gray-500 hover:text-[#2563EB] transition p-2 rounded-lg hover:bg-blue-50">
            <Settings className="w-4 h-4" />
          </Link>
          <Link to="/login" className="hidden sm:inline-block text-sm font-medium text-[#2563EB] hover:underline px-2">Login</Link>
          <Link to="/login" className="bg-[#2563EB] text-white text-sm font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition shadow-sm">
            Sign Up Free
          </Link>
          {/* Mobile menu btn */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === link.to ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/profile" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600">Profile</Link>
          <Link to="/settings" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600">Settings</Link>
          <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600">Admin Panel</Link>
        </div>
      )}
    </nav>
  );
}
