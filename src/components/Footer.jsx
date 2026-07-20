import { Link } from 'react-router-dom';
import { GraduationCap, Send, Heart, Shield, FileText, HelpCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20 select-none">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight font-poppins">
              ExamMaster <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">AI</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            India's premier AI-powered learning and preparation platform for UPSC, TNPSC, SSC, Banking, RRB, and state government competitive examinations.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200">
              🌐
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200">
              📱
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200">
              💬
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200">
              ▶️
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Exam Hub</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li><Link to="/exams" className="hover:text-blue-400 transition-colors">UPSC Civil Services</Link></li>
            <li><Link to="/exams" className="hover:text-blue-400 transition-colors">TNPSC Group 1, 2 & 4</Link></li>
            <li><Link to="/exams" className="hover:text-blue-400 transition-colors">SSC CGL & CHSL</Link></li>
            <li><Link to="/exams" className="hover:text-blue-400 transition-colors">IBPS & SBI Bank PO</Link></li>
            <li><Link to="/exams" className="hover:text-blue-400 transition-colors">RRB NTPC & ALP</Link></li>
          </ul>
        </div>

        {/* Learning Resources */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li><Link to="/practice" className="hover:text-blue-400 transition-colors">Subject Practice</Link></li>
            <li><Link to="/quant-aptitude" className="hover:text-blue-400 transition-colors">Quant Syllabus Tree</Link></li>
            <li><Link to="/mock" className="hover:text-blue-400 transition-colors">Live Mock Tests</Link></li>
            <li><Link to="/pyq" className="hover:text-blue-400 transition-colors">Previous Year Questions</Link></li>
            <li><Link to="/ai" className="hover:text-blue-400 transition-colors">AI Study Assistant</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Stay Informed</h4>
          <p className="text-xs text-slate-400 mb-3">Get exam notification alerts and daily practice questions sent to your email.</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-xs hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Subscribe Updates</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 ExamMaster AI. All rights reserved. Crafted with care for aspirants.</p>
        <div className="flex items-center gap-6">
          <Link to="/settings" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link to="/settings" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link to="/settings" className="hover:text-slate-300 transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
}
