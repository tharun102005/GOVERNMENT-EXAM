import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Send, BookmarkPlus, ChevronLeft, Flag, ChevronRight,
  Sun, Moon, Maximize, Minimize, FileText, Calculator, HelpCircle, Eye,
  RotateCcw, ShieldCheck, ArrowRight, Bookmark, AlertCircle, Sparkles, CheckCircle2
} from 'lucide-react';
import { exams } from '../data/mockData';
import { generateExamQuestions, examSections } from '../data/extendedMockQuestions';

import Navbar from '../components/Navbar';
import QuestionPalette from '../components/mock/QuestionPalette';
import ExamCalculator from '../components/calculator/ExamCalculator';
import NotesDrawer from '../components/mock/NotesDrawer';
import QuestionReportModal from '../components/mock/QuestionReportModal';
import ImageZoomModal from '../components/mock/ImageZoomModal';
import KeyboardShortcutsModal from '../components/mock/KeyboardShortcutsModal';

export default function MockTestPage() {
  const navigate = useNavigate();

  // Test setup states
  const [started, setStarted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [questionCountChoice, setQuestionCountChoice] = useState(100); // 100 or 200 questions
  const [language, setLanguage] = useState('English'); // English | Tamil

  // Test session states
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeSection, setActiveSection] = useState('quant');
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [visited, setVisited] = useState({ 0: true });
  const [notes, setNotes] = useState({});
  const [timeLeft, setTimeLeft] = useState(120 * 60); // default 2 hours for 100 questions
  const [submitted, setSubmitted] = useState(false);

  // UI Utilities
  const [darkMode, setDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoSavedTime, setAutoSavedTime] = useState('Just now');
  const [showPaletteMobile, setShowPaletteMobile] = useState(false);

  // Modals
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Initializing questions on selection
  useEffect(() => {
    if (selectedExam) {
      const generated = generateExamQuestions(questionCountChoice, selectedExam.name);
      setQuestions(generated);
      // Duration: 120 mins for 100 Qs, 180 mins for 200 Qs
      setTimeLeft(questionCountChoice === 200 ? 180 * 60 : 120 * 60);
    }
  }, [selectedExam, questionCountChoice]);

  // Dark mode class sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track visited state when current question changes
  useEffect(() => {
    if (started) {
      setVisited(prev => ({ ...prev, [current]: true }));
      // Sync section tab with question section
      if (questions[current]) {
        setActiveSection(questions[current].sectionId);
      }
    }
  }, [current, started, questions]);

  // Auto-save heartbeat simulator
  useEffect(() => {
    if (!started || submitted) return;
    const interval = setInterval(() => {
      const now = new Date();
      setAutoSavedTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    }, 5000);
    return () => clearInterval(interval);
  }, [started, submitted]);

  // Timer countdown
  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const correct = questions.filter((q, i) => answers[i] === q.answer).length;
    const wrong = Object.keys(answers).length - correct;
    const skipped = questions.length - Object.keys(answers).length;
    const totalDuration = questionCountChoice === 200 ? 180 * 60 : 120 * 60;
    const timeTaken = totalDuration - timeLeft;
    const accuracy = Object.keys(answers).length > 0 ? Math.round((correct / Object.keys(answers).length) * 100) : 0;
    const score = correct * 4 - wrong * 1;
    const maxScore = questions.length * 4;
    const percentile = Math.min(99, Math.round(50 + (correct / questions.length) * 49));

    navigate('/results', {
      state: {
        score, maxScore, correct, wrong, skipped, timeTaken, accuracy, percentile,
        total: questions.length, examName: selectedExam?.name || 'Government Mock Exam',
        answers, questions
      }
    });
  }, [answers, timeLeft, selectedExam, navigate, questions, questionCountChoice]);

  useEffect(() => {
    if (!started || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted, handleSubmit]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    if (!started || submitted) return;

    const handleKeyDown = (e) => {
      // Ignore key events if focused on input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', '1'].includes(key)) { setAnswers(a => ({ ...a, [current]: 0 })); }
      else if (['B', '2'].includes(key)) { setAnswers(a => ({ ...a, [current]: 1 })); }
      else if (['C', '3'].includes(key)) { setAnswers(a => ({ ...a, [current]: 2 })); }
      else if (['D', '4'].includes(key)) { setAnswers(a => ({ ...a, [current]: 3 })); }
      else if (e.key === 'ArrowLeft') { setCurrent(c => Math.max(0, c - 1)); }
      else if (e.key === 'ArrowRight') { setCurrent(c => Math.min(questions.length - 1, c + 1)); }
      else if (key === 'M') { setMarked(m => ({ ...m, [current]: !m[current] })); }
      else if (key === 'S') {
        if (window.confirm('Are you sure you want to submit the test?')) handleSubmit();
      }
      else if (key === 'N') { setIsNotesOpen(prev => !prev); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started, submitted, current, questions.length, handleSubmit]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentQ = questions[current] || {};

  // Quick jump to next unanswered
  const jumpToUnanswered = () => {
    const nextUnans = questions.findIndex((_, i) => i > current && answers[i] === undefined);
    if (nextUnans !== -1) {
      setCurrent(nextUnans);
    } else {
      const firstUnans = questions.findIndex((_, i) => answers[i] === undefined);
      if (firstUnans !== -1) setCurrent(firstUnans);
    }
  };

  // ═════════════════════════════════════════════════════════════
  // 1. PRE-TEST SELECTION & TCS iON INSTRUCTIONS LANDING
  // ═════════════════════════════════════════════════════════════
  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors font-sans">
        <Navbar />

        <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-10">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-[24px] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-blue-500/20">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-widest border border-blue-400/30 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Standardized Government Exam Simulator
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Official Government Competitive Mock Test Engine
                </h1>
                <p className="text-blue-100 text-[15px] md:text-[16px] leading-relaxed max-w-2xl">
                  Real-time exam portal interface matching Testbook, Oliveboard, and Adda247 with official TCS iON layout, negative marking options, bilingual questions, and full question palette analytics.
                </p>
              </div>

            </div>
          </div>

          {/* Exam Selection Grid (4-column responsive) */}
          <div className="space-y-4">
            <h2 className="text-[28px] font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-blue-600" /> Select Target Examination
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {exams.map((exam) => {
                const isSelected = selectedExam?.name === exam.name;
                return (
                  <div
                    key={exam.name}
                    onClick={() => {
                      setSelectedExam(exam);
                      setStarted(true);
                    }}
                    className={`bg-white dark:bg-slate-900 rounded-[22px] border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-500/10 ring-4 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl shadow-xs">
                        Selected Target
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exam.color} flex items-center justify-center text-3xl shadow-md text-white shrink-0`}>
                          {exam.emoji}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-[22px] leading-tight truncate">{exam.name}</h3>
                          <p className="text-[12px] text-slate-400 truncate">{exam.desc}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exam.subjects.map((sub, sIdx) => (
                          <span key={sIdx} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[12px]">
                      <span className={`px-2.5 py-1 rounded-full font-bold ${exam.difficulty === 'Hard' ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400' : exam.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'}`}>
                        {exam.difficulty}
                      </span>
                      <span className="text-slate-500 font-semibold">{exam.questions.toLocaleString()} Q Bank</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Instructions Card with Generous Breathing Space & Equal-Width Stats */}
          {selectedExam && (
            <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 p-8 md:p-12 shadow-xl my-10 space-y-8">
              {/* Header Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 gap-4">
                <div className="space-y-1">
                  <h3 className="text-[28px] font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                    Official General Instructions: {selectedExam.name} Mock Test
                  </h3>
                  <p className="text-[16px] text-slate-500">Read all operational instructions carefully before launching the test window</p>
                </div>
                <div className="flex items-center gap-2 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuestionCountChoice(100)}
                    className={`px-3.5 py-2 font-extrabold rounded-xl border transition text-sm cursor-pointer ${
                      questionCountChoice === 100
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border-blue-200/60 hover:bg-blue-100'
                    }`}
                  >
                    100 Qs (120 min)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionCountChoice(200)}
                    className={`px-3.5 py-2 font-extrabold rounded-xl border transition text-sm cursor-pointer ${
                      questionCountChoice === 200
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 border-purple-200/60 hover:bg-purple-100'
                    }`}
                  >
                    200 Qs (180 min)
                  </button>
                </div>
              </div>

              {/* Equal-Width Premium Statistics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:bg-slate-800/60 border border-blue-200/70 dark:border-blue-800/40 rounded-[20px] p-6 text-center shadow-xs space-y-1">
                  <div className="text-blue-600 dark:text-blue-400 font-extrabold text-[28px] leading-tight">
                    {questionCountChoice} Qs
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                    Total Questions
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/50 dark:bg-slate-800/60 border border-purple-200/70 dark:border-purple-800/40 rounded-[20px] p-6 text-center shadow-xs space-y-1">
                  <div className="text-purple-600 dark:text-purple-400 font-extrabold text-[28px] leading-tight">
                    {questionCountChoice === 200 ? '180 Mins' : '120 Mins'}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                    Time Duration
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50/80 to-rose-50/50 dark:bg-slate-800/60 border border-red-200/70 dark:border-red-800/40 rounded-[20px] p-6 text-center shadow-xs space-y-1">
                  <div className="text-red-600 dark:text-red-400 font-extrabold text-[28px] leading-tight">
                    -1.0 Mark
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                    Negative Mark
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:bg-slate-800/60 border border-emerald-200/70 dark:border-emerald-800/40 rounded-[20px] p-6 text-center shadow-xs space-y-1">
                  <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[28px] leading-tight">
                    {questions.length * 4} Marks
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                    Maximum Marks
                  </div>
                </div>
              </div>

              {/* Instructions Rules List */}
              <div className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-[20px] p-6 space-y-3 text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-slate-100 text-[15px] mb-2">Detailed Candidate Exam Guidelines:</p>
                <p>1. The clock will be synchronized at the server. The countdown timer on top right displays remaining time.</p>
                <p>2. Use the Question Palette on the right sidebar to navigate directly between sections and individual questions.</p>
                <p>3. Click <strong>Mark for Review & Next</strong> to save option selection while bookmarking questions for secondary review.</p>
                <p>4. Keyboard Shortcuts: Use <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold">A/B/C/D</kbd> or <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold">1/2/3/4</kbd> to select options, <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold">←</kbd> / <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold">→</kbd> to navigate.</p>
                <p>5. An on-screen floating calculator is enabled for quantitative aptitude and numerical calculations.</p>
              </div>

              {/* Agreement checkbox */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-4">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 cursor-pointer shrink-0"
                />
                <label htmlFor="agree" className="text-[14px] text-slate-700 dark:text-slate-300 font-semibold cursor-pointer select-none leading-relaxed">
                  I have read and understood all the official test guidelines and marking regulations. I confirm that I am taking this test in a quiet, undisturbed test environment without external assistance.
                </label>
              </div>

              {/* Large Centered Full-Width Blue Gradient Start Button */}
              <div className="pt-4">
                <button
                  onClick={() => agreedToTerms && setStarted(true)}
                  disabled={!agreedToTerms}
                  className={`w-full py-4 px-8 rounded-2xl font-extrabold text-[18px] transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                    agreedToTerms
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.01] cursor-pointer active:scale-98'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Start {selectedExam.name} Mock Test</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════
  // 2. LIVE TEST ENVIRONMENT (Testbook / Oliveboard / Adda247 UI)
  // ═════════════════════════════════════════════════════════════
  const totalAttempted = Object.keys(answers).length;
  const progressPercent = Math.round((totalAttempted / questions.length) * 100);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col font-sans select-none`}>
      {/* ── TOP STICKY TEST HEADER ── */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs px-4 py-2.5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Exam Title & Subject Tabs */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-r border-slate-200 dark:border-slate-800 pr-4">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${selectedExam.color} flex items-center justify-center text-lg text-white shadow-sm shrink-0`}>
                {selectedExam.emoji}
              </div>
              <div className="hidden sm:block">
                <h1 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm leading-tight">
                  {selectedExam.name} Full Length Test
                </h1>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Q {current + 1} of {questions.length}</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Saved {autoSavedTime}</span>
                </div>
              </div>
            </div>

            {/* Subject Section Tabs Header */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              {examSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    // Find first question of this section
                    const firstQ = questions.findIndex(q => q.sectionId === sec.id);
                    if (firstQ !== -1) setCurrent(firstQ);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeSection === sec.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Header Toolbar: Timer & Tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Timer Ticker */}
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl font-mono font-bold text-sm sm:text-base border ${
              timeLeft < 300
                ? 'bg-red-50 dark:bg-red-950/50 border-red-200 text-red-600 dark:text-red-400 animate-pulse'
                : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(l => (l === 'English' ? 'Tamil' : 'English'))}
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 transition border border-slate-200 dark:border-slate-700"
              title="Toggle Language"
            >
              🌐 {language}
            </button>

            {/* Calculator trigger */}
            <button
              onClick={() => setIsCalcOpen(prev => !prev)}
              className={`p-2 rounded-xl text-xs font-bold transition border ${
                isCalcOpen
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
              title="Floating Scientific Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="hidden sm:block p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Shortcuts guide */}
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700"
              title="Keyboard Shortcuts"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Mobile palette toggle */}
            <button
              onClick={() => setShowPaletteMobile(prev => !prev)}
              className="lg:hidden p-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
            >
              Palette
            </button>

            {/* Final Submit Button Header CTA */}
            <button
              onClick={() => {
                if (window.confirm('Submit test and view comprehensive score analysis?')) handleSubmit();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit
            </button>
          </div>
        </div>
      </header>

      {/* ── TOP OVERALL PROGRESS BAR ── */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5">
        <div
          className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 h-1.5 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left/Main Column: Question Display Card */}
        <main className="flex-1 flex flex-col space-y-4 min-w-0">

          {/* Quick Metrics Bar above Question */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-xl">
                Section: {currentQ.sectionName || 'General'}
              </span>
              <span className="text-slate-500 hidden sm:inline">
                Attempted: <strong className="text-slate-800 dark:text-slate-200">{totalAttempted}/{questions.length}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={jumpToUnanswered}
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50 flex items-center gap-1"
              >
                <Flag className="w-3 h-3" /> Jump to Unanswered
              </button>

              <button
                onClick={() => setIsNotesOpen(true)}
                className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-200 dark:border-slate-700"
              >
                <FileText className="w-3 h-3 text-blue-500" /> Notes {notes[current] ? '•' : ''}
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-8 flex-1 flex flex-col justify-between">
            <div
              key={current}
              className="space-y-6"
            >
                {/* Question Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-xs">
                      Q {current + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Single Choice Correct</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bookmark toggle */}
                    <button
                      onClick={() => setBookmarks(b => ({ ...b, [current]: !b[current] }))}
                      className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        bookmarks[current]
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-600'
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarks[current] ? 'fill-amber-500' : ''}`} />
                      <span className="hidden sm:inline">{bookmarks[current] ? 'Bookmarked' : 'Bookmark'}</span>
                    </button>

                    {/* Report question button */}
                    <button
                      onClick={() => setIsReportOpen(true)}
                      className="p-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition"
                      title="Report Faulty Question"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-3">
                  <p className="text-slate-900 dark:text-slate-100 font-medium text-base md:text-lg leading-relaxed">
                    {language === 'Tamil' ? currentQ.questionTa || currentQ.question : currentQ.question}
                  </p>

                  {/* Question Image / Diagram (if attached) */}
                  {currentQ.hasImage && (
                    <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-md">
                      <div className="relative group overflow-hidden rounded-xl">
                        <img
                          src={currentQ.imageUrl}
                          alt="Question diagram"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => setIsZoomOpen(true)}
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs gap-1.5"
                        >
                          <Eye className="w-5 h-5" /> Click to Zoom Diagram
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                        {currentQ.imageCaption}
                      </div>
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3 pt-2">
                  {currentQ.options?.map((optText, optionIdx) => {
                    const isSelected = answers[current] === optionIdx;
                    const optionLetter = ['A', 'B', 'C', 'D'][optionIdx];

                    return (
                      <button
                        key={optionIdx}
                        onClick={() => setAnswers(a => ({ ...a, [current]: optionIdx }))}
                        className={`w-full text-left p-4 rounded-2xl border-2 font-medium transition-all duration-150 flex items-center justify-between text-sm md:text-base cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex w-8 h-8 rounded-xl items-center justify-center text-xs font-bold transition ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600'
                          }`}>
                            {optionLetter}
                          </span>
                          <span>{optText}</span>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
            </div>

            {/* Clear Selection bar */}
            {answers[current] !== undefined && (
              <div className="pt-4 flex justify-start">
                <button
                  onClick={() => setAnswers(a => { const copy = { ...a }; delete copy[current]; return copy; })}
                  className="text-xs font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Selected Option
                </button>
              </div>
            )}
          </div>

          {/* ── BOTTOM FIXED ACTION NAVIGATION TOOLBAR ── */}
          <footer className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                disabled={current === 0}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 font-bold rounded-2xl text-xs transition flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => {
                  setMarked(m => ({ ...m, [current]: !m[current] }));
                  setCurrent(c => Math.min(questions.length - 1, c + 1));
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ${
                  marked[current]
                    ? 'bg-purple-800 text-white hover:bg-purple-900'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{marked[current] ? 'Marked & Next' : 'Mark for Review & Next'}</span>
              </button>
            </div>

            {/* Right Primary Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-xs transition shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </main>

        {/* Right Column: Question Palette & Analytics (Desktop) */}
        <aside className="hidden lg:block w-80 shrink-0 space-y-4">
          <QuestionPalette
            totalQuestions={questions.length}
            current={current}
            answers={answers}
            marked={marked}
            visited={visited}
            onSelectQuestion={(idx) => setCurrent(idx)}
            onSubmitTest={() => {
              if (window.confirm('Submit test and complete session?')) handleSubmit();
            }}
          />
        </aside>
      </div>

      {/* Mobile Palette Sheet Modal */}
      {showPaletteMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full p-4 overflow-y-auto">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowPaletteMobile(false)}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-bold"
              >
                Close Palette
              </button>
            </div>
            <QuestionPalette
              totalQuestions={questions.length}
              current={current}
              answers={answers}
              marked={marked}
              visited={visited}
              onSelectQuestion={(idx) => { setCurrent(idx); setShowPaletteMobile(false); }}
              onSubmitTest={handleSubmit}
            />
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <ExamCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

      <NotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        questionIndex={current}
        noteText={notes[current] || ''}
        onSaveNote={(idx, val) => setNotes(n => ({ ...n, [idx]: val }))}
        onClearNote={(idx) => setNotes(n => { const c = { ...n }; delete c[idx]; return c; })}
      />

      <QuestionReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        questionIndex={current}
      />

      <ImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageUrl={currentQ.imageUrl}
        imageCaption={currentQ.imageCaption}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
