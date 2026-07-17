import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Clock, ArrowLeft, ArrowRight, SkipForward, CheckCircle2, 
  Award, Eye, LogOut 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { generateSubjectQuiz } from '../data/extendedMockQuestions';
import { generateUniqueTopicQuestionBank } from '../data/topicQuestionBanks';

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

  // Helper shuffle array
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initialize unique non-overlapping question bank for topic with completed question tracking
  useEffect(() => {
    let rawBank = [];
    if (topicId && (topicId.includes('-') || topicId.length > 2)) {
      rawBank = generateUniqueTopicQuestionBank(topicId, 500);
    }
    if (!rawBank || rawBank.length === 0) {
      rawBank = generateSubjectQuiz(subjectName, 100);
    }

    // Get completed question IDs from localStorage
    let completedIds = [];
    try {
      completedIds = JSON.parse(localStorage.getItem(`exammaster_completed_qs_${topicId}`) || '[]');
    } catch {
      completedIds = [];
    }

    // Filter uncompleted questions
    let uncompleted = rawBank.filter(q => !completedIds.includes(q.id));
    if (uncompleted.length < totalCount) {
      // Reset completed list if full bank has been completed once
      uncompleted = rawBank;
      localStorage.setItem(`exammaster_completed_qs_${topicId}`, JSON.stringify([]));
    }

    // Shuffle and pick session questions
    const sessionQs = shuffle(uncompleted).slice(0, totalCount);
    setQuestions(sessionQs);
  }, [topicId, subjectName, totalCount]);

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

    // Update completed questions tracking in localStorage
    try {
      const currentCompleted = JSON.parse(localStorage.getItem(`exammaster_completed_qs_${topicId}`) || '[]');
      const updatedSet = Array.from(new Set([...currentCompleted, ...attemptedIds]));
      localStorage.setItem(`exammaster_completed_qs_${topicId}`, JSON.stringify(updatedSet));
    } catch {
      // ignore
    }

    const score = (correctCount * 2) - (wrongCount * 0.5);
    const maxScore = questions.length * 2;
    const totalAttempted = Object.keys(userAnswers).length;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    const timeTaken = (totalCount * 60) - timeLeft;

    const resultPayload = {
      score: Math.max(0, Math.round(score * 10) / 10),
      maxScore,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      accuracy,
      percentile: Math.min(99, Math.max(60, Math.round(accuracy * 1.1))),
      total: questions.length,
      timeTaken,
      examName: `${subjectName} Practice Test`,
      answers: userAnswers,
      questions
    };

    // Save history
    try {
      const history = JSON.parse(localStorage.getItem('exammaster_quiz_history') || '[]');
      history.unshift({
        ...resultPayload,
        date: new Date().toISOString()
      });
      localStorage.setItem('exammaster_quiz_history', JSON.stringify(history.slice(0, 20)));
    } catch {
      // ignore
    }

    // Navigate to Results page
    navigate('/results', { state: resultPayload });
  }, [questions, userAnswers, totalCount, timeLeft, subjectName, topicId, navigate]);

  // Countdown timer
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, timeLeft, handleSubmitQuiz]);

  const currentQ = questions[currentIndex];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
    if (skippedQuestions[currentIndex]) {
      setSkippedQuestions(prev => {
        const copy = { ...prev };
        delete copy[currentIndex];
        return copy;
      });
    }
  };

  const handleSkip = () => {
    setSkippedQuestions(prev => ({
      ...prev,
      [currentIndex]: true
    }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold text-sm">Generating Unique Topic Questions Bank...</p>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const attemptedCount = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-none">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 flex flex-col space-y-6">
        
        {/* Top Header & Progress Bar Card */}
        <div className="bg-white rounded-[22px] border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl shrink-0">
                {subjectIcon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                    Topic: {currentQ.subtopic || 'Concept Practice'}
                  </span>
                  {currentQ.isPYQ && (
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      PYQ {currentQ.pyqYear}
                    </span>
                  )}
                  <button
                    onClick={() => setLanguage(l => l === 'English' ? 'Tamil' : 'English')}
                    className="text-[11px] font-bold text-slate-500 hover:text-blue-600 underline cursor-pointer"
                  >
                    Lang: {language}
                  </button>
                </div>
                <h1 className="text-xl font-extrabold text-gray-900 mt-0.5">
                  {subjectName}
                </h1>
              </div>
            </div>

            {/* Timer & Finish button */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-sm font-black shadow-xs">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to finish and exit this quiz?')) {
                    handleSubmitQuiz();
                  }
                }}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-4 py-2.5 rounded-xl border border-red-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Finish & Exit
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs text-gray-500 font-semibold">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{attemptedCount} Attempted • {progressPercent}% Progress</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Question Card */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-xs">
                Q {currentIndex + 1}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                currentQ.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : currentQ.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                Difficulty: {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <p className="text-gray-900 font-bold text-base md:text-lg leading-relaxed">
                {language === 'Tamil' ? currentQ.questionTa || currentQ.question : currentQ.question}
              </p>

              {/* Diagram / Image if present */}
              {currentQ.hasImage && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 max-w-md">
                  <img
                    src={currentQ.imageUrl}
                    alt="Question diagram"
                    className="w-full h-44 object-cover rounded-xl"
                  />
                  <div className="text-[11px] text-gray-500 mt-1 text-center font-medium">
                    {currentQ.imageCaption}
                  </div>
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optText, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                const optionLetter = ['A', 'B', 'C', 'D'][optIdx];

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 font-semibold transition flex items-center justify-between text-sm md:text-base cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-gray-200/90 bg-gray-50/50 text-gray-800 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex w-8 h-8 rounded-xl items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-gray-600 border border-gray-300'
                      }`}>
                        {optionLetter}
                      </span>
                      <span>{optText}</span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Solution Toggle */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                {showExplanation ? 'Hide AI Solution & Formula' : 'View AI Solution & Formula'}
              </button>
              {showExplanation && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-800">
                  {currentQ.formulaUsed && (
                    <div className="font-mono text-blue-700 font-bold bg-blue-50 p-2 rounded-lg border border-blue-200">
                      📐 Formula: {currentQ.formulaUsed}
                    </div>
                  )}
                  {currentQ.shortcutTrick && (
                    <div className="font-medium text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      ⚡ Shortcut Trick: {currentQ.shortcutTrick}
                    </div>
                  )}
                  <div className="leading-relaxed">
                    <strong>Step-by-Step AI Solution:</strong> {currentQ.explanation}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Action Control Buttons Bar: Previous, Skip, Next, Submit */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs disabled:opacity-40 hover:bg-gray-50 transition flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleSkip}
                className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 font-bold text-xs hover:bg-amber-100 transition flex items-center gap-1 cursor-pointer"
              >
                <SkipForward className="w-4 h-4 text-amber-600" /> Skip
              </button>
            </div>

            <div className="flex items-center gap-2">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition flex items-center gap-1 cursor-pointer"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" /> Submit Quiz
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
