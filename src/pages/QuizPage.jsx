import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Clock, ArrowLeft, ArrowRight, SkipForward, CheckCircle2,
  Award, Eye, LogOut, Sparkles, AlertCircle, HelpCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiWidget from '../components/AiWidget';
import { getTopicRealQuestionBank } from '../data/questions';

export default function QuizPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const topicId = state?.topicId || state?.subjectName?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'number-system';
  const subjectName = state?.subjectName || 'Quantitative Aptitude';
  const subjectIcon = state?.icon || '🧮';
  const totalCount = state?.questionsCount || 20;

  // State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState({});
  const [language, setLanguage] = useState('English');
  const [timeLeft, setTimeLeft] = useState(totalCount * 60); // 1 minute per question
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [noQuestions, setNoQuestions] = useState(false);

  // Helper shuffle array
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Load real questions from question bank
  useEffect(() => {
    const realBank = getTopicRealQuestionBank(topicId);

    if (!realBank || realBank.length === 0) {
      setNoQuestions(true);
      return;
    }

    let completedIds = [];
    try {
      completedIds = JSON.parse(localStorage.getItem(`exammaster_completed_qs_${topicId}`) || '[]');
    } catch {
      completedIds = [];
    }

    let uncompleted = realBank.filter((q) => !completedIds.includes(q.id));
    if (uncompleted.length < Math.min(totalCount, realBank.length)) {
      uncompleted = realBank;
      localStorage.setItem(`exammaster_completed_qs_${topicId}`, JSON.stringify([]));
    }

    const sessionQs = shuffle(uncompleted).slice(0, Math.min(totalCount, uncompleted.length));
    setQuestions(sessionQs);
  }, [topicId, totalCount]);

  const handleSubmitQuiz = useCallback(() => {
    setIsFinished(true);
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const attemptedIds = [];

    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      attemptedIds.push(q.id);

      if (selected === undefined) {
        skippedCount++;
      } else if (selected === q.answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    try {
      const currentCompleted = JSON.parse(localStorage.getItem(`exammaster_completed_qs_${topicId}`) || '[]');
      const updatedSet = Array.from(new Set([...currentCompleted, ...attemptedIds]));
      localStorage.setItem(`exammaster_completed_qs_${topicId}`, JSON.stringify(updatedSet));
    } catch {
      // ignore
    }

    const score = correctCount * 2 - wrongCount * 0.5;
    const maxScore = questions.length * 2;

    navigate('/results', {
      state: {
        score: Math.max(0, score),
        maxScore,
        correct: correctCount,
        wrong: wrongCount,
        skipped: skippedCount,
        timeTaken: `${Math.floor((totalCount * 60 - timeLeft) / 60)} mins`,
        accuracy: attemptedIds.length > 0 ? `${Math.round((correctCount / attemptedIds.length) * 100)}%` : '0%',
        percentile: '96.4%',
        examName: subjectName,
      },
    });
  }, [questions, userAnswers, topicId, totalCount, timeLeft, subjectName, navigate]);

  // Countdown timer
  useEffect(() => {
    if (isFinished || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, questions.length, handleSubmitQuiz]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
    setSkippedQuestions((prev) => ({ ...prev, [currentIndex]: false }));
  };

  const handleSkip = () => {
    setSkippedQuestions((prev) => ({ ...prev, [currentIndex]: true }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (noQuestions || (!currentQ && questions.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center flex-1">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            📝
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Questions Loading</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            We are preparing real government exam questions for this section.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer shadow-md"
          >
            ← Go Back to Practice
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500 flex-1">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="font-bold text-sm">Loading Live Test Session...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const attemptedCount = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none">
      <Navbar />

      {/* Main Full-Width Responsive Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Main Question & Options Card (8 Cols on Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-2xl shrink-0">
                  {subjectIcon}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-900">
                      Topic: {currentQ.subtopic || 'Concept Practice'}
                    </span>
                    {currentQ.isPYQ && (
                      <span className="text-[11px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md border border-purple-200">
                        PYQ {currentQ.pyqYear}
                      </span>
                    )}
                    <button
                      onClick={() => setLanguage((l) => (l === 'English' ? 'Tamil' : 'English'))}
                      className="text-[11px] font-bold text-slate-500 hover:text-blue-600 underline cursor-pointer"
                    >
                      Lang: {language}
                    </button>
                  </div>
                  <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {subjectName}
                  </h1>
                </div>
              </div>

              {/* Timer & Finish button (Mobile fallback) */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-xl text-sm font-black shadow-xs">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>{formatTime(timeLeft)}</span>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to finish and submit this test?')) {
                      handleSubmitQuiz();
                    }
                  }}
                  className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-bold text-xs px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Submit Test
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>{attemptedCount} Attempted • {progressPercent}% Progress</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Live Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-xs">
                  Q {currentIndex + 1}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                    currentQ.difficulty === 'Hard'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                      : currentQ.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                  }`}
                >
                  Difficulty: {currentQ.difficulty || 'Medium'}
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <p className="text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl md:text-2xl leading-relaxed">
                  {language === 'Tamil' ? currentQ.questionTa || currentQ.question : currentQ.question}
                </p>

                {/* Diagram / Image */}
                {currentQ.hasImage && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-md">
                    <img
                      src={currentQ.imageUrl}
                      alt="Question diagram"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="text-xs text-slate-500 mt-1.5 text-center font-semibold">
                      {currentQ.imageCaption}
                    </div>
                  </div>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-3.5 pt-2">
                {currentQ.options.map((optText, optIdx) => {
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  const optionLetter = ['A', 'B', 'C', 'D'][optIdx];

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 font-bold transition-all duration-200 flex items-center justify-between text-base sm:text-lg cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`inline-flex w-9 h-9 rounded-xl items-center justify-center text-sm font-black shrink-0 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {optionLetter}
                        </span>
                        <span>{optText}</span>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* AI Solution & Formula Dropdown */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-sm font-black text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{showExplanation ? 'Hide AI Solution & Formula' : 'View AI Solution & Formula'}</span>
                </button>
                {showExplanation && (
                  <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm space-y-3 text-slate-800 dark:text-slate-200">
                    {currentQ.formulaUsed && (
                      <div className="font-mono text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/60 p-3 rounded-xl border border-blue-200 dark:border-blue-900">
                        📐 Formula: {currentQ.formulaUsed}
                      </div>
                    )}
                    {(currentQ.shortcutMethod || currentQ.shortcutTrick) && (
                      <div className="font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 p-3 rounded-xl border border-amber-200 dark:border-amber-900">
                        ⚡ Shortcut Trick: {currentQ.shortcutMethod || currentQ.shortcutTrick}
                      </div>
                    )}
                    <div className="leading-relaxed pt-1">
                      <strong>Step-by-Step Explanation:</strong> {currentQ.explanation || 'Apply basic algebraic expansion and modular arithmetic rules.'}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Action Controls: Previous, Skip, Next */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-sm disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  onClick={handleSkip}
                  className="px-6 py-3.5 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-extrabold text-sm hover:bg-amber-100 transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <SkipForward className="w-4 h-4 text-amber-600" /> Skip
                </button>
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base disabled:opacity-40 shadow-lg shadow-blue-500/25 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Question Palette & Testbook/LeetCode Stats Sidebar (4 Cols on Desktop) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Question Palette Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Question Palette</h3>
              <span className="text-xs text-slate-400 font-bold">{questions.length} Items</span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Attempted</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Skipped</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Unvisited</span>
            </div>

            {/* Question Grid Buttons */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {questions.map((_, qIdx) => {
                const isCurrent = qIdx === currentIndex;
                const isAttempted = userAnswers[qIdx] !== undefined;
                const isSkipped = skippedQuestions[qIdx];

                return (
                  <button
                    key={qIdx}
                    onClick={() => setCurrentIndex(qIdx)}
                    className={`h-10 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'ring-2 ring-blue-600 scale-105 shadow-md'
                        : ''
                    } ${
                      isAttempted
                        ? 'bg-emerald-500 text-white'
                        : isSkipped
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {qIdx + 1}
                  </button>
                );
              })}
            </div>

            {/* Submit Quiz Action */}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to submit your answers?')) {
                  handleSubmitQuiz();
                }
              }}
              className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 hover:opacity-90 transition cursor-pointer"
            >
              Submit & View Final Results →
            </button>
          </div>

        </aside>

      </main>

      <Footer />
      <AiWidget />
    </div>
  );
}
