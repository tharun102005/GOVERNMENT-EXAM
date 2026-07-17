import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, MinusCircle, Clock, Trophy, BarChart2, RotateCcw, Home } from 'lucide-react';

export default function TestResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <p className="text-gray-500 mb-4">No test results found.</p>
        <button onClick={() => navigate('/mock')} className="bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold">Take a Mock Test</button>
      </div>
    </div>
  );

  const { score, maxScore, correct, wrong, skipped, timeTaken, accuracy, percentile, total, examName, answers, questions } = state;
  const pct = Math.round((score / maxScore) * 100);
  const grade = pct >= 85 ? 'Excellent' : pct >= 70 ? 'Good' : pct >= 50 ? 'Average' : 'Needs Improvement';
  const gradeColor = pct >= 85 ? 'text-[#10B981]' : pct >= 70 ? 'text-blue-600' : pct >= 50 ? 'text-yellow-600' : 'text-red-500';
  const formatTime = (s) => `${Math.floor(s/60)}m ${s%60}s`;
  const rank = Math.round(2000000 * (1 - percentile / 100));

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10B981] text-white text-3xl font-bold mb-4 shadow-lg">
            {pct}%
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{examName} — Test Completed!</h1>
          <p className={`text-xl font-semibold ${gradeColor}`}>{grade}</p>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: <Trophy className="w-6 h-6" />, label: 'Score', value: `${score}/${maxScore}`, color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
            { icon: <CheckCircle className="w-6 h-6 text-[#10B981]" />, label: 'Correct', value: correct, color: 'bg-green-50 border-green-200 text-[#10B981]' },
            { icon: <XCircle className="w-6 h-6 text-red-500" />, label: 'Wrong', value: wrong, color: 'bg-red-50 border-red-200 text-red-600' },
            { icon: <MinusCircle className="w-6 h-6 text-gray-400" />, label: 'Skipped', value: skipped, color: 'bg-gray-50 border-gray-200 text-gray-600' },
          ].map((c, i) => (
            <div key={i} className={`${c.color} border rounded-[20px] p-5 text-center`}>
              <div className="flex justify-center mb-2">{c.icon}</div>
              <div className="text-2xl font-bold">{c.value}</div>
              <div className="text-sm opacity-80">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <BarChart2 className="w-5 h-5" />, label: 'Accuracy', value: `${accuracy}%`, desc: 'of attempted questions' },
            { icon: <Clock className="w-5 h-5" />, label: 'Time Taken', value: formatTime(timeTaken), desc: `Avg ${Math.round(timeTaken / total)}s per question` },
            { icon: <Trophy className="w-5 h-5" />, label: 'Percentile', value: `${percentile}th`, desc: `Est. Rank: #${rank.toLocaleString()}` },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">{s.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-gray-500 text-xs">{s.label}</div>
                <div className="text-gray-400 text-xs">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#2563EB]" /> Detailed Question Review
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrect = userAns === q.answer;
              const isSkipped = userAns === undefined;
              return (
                <div key={i} className={`rounded-xl border p-4 ${isCorrect ? 'border-green-200 bg-green-50' : isSkipped ? 'border-gray-100 bg-gray-50' : 'border-red-100 bg-red-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isCorrect ? 'bg-[#10B981]' : isSkipped ? 'bg-gray-300' : 'bg-red-400'}`}>
                      {isCorrect ? <CheckCircle className="w-4 h-4 text-white" /> : isSkipped ? <MinusCircle className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm mb-2">Q{i+1}. {q.question}</p>
                      {!isSkipped && (
                        <p className={`text-xs mb-1 ${isCorrect ? 'text-[#10B981]' : 'text-red-600'}`}>
                          Your answer: {q.options[userAns]}
                        </p>
                      )}
                      {!isCorrect && (
                        <p className="text-xs text-[#10B981] mb-1">Correct answer: {q.options[q.answer]}</p>
                      )}
                      <p className="text-xs text-gray-500 italic mt-1">💡 {q.explanation}</p>
                    </div>
                    <span className={`shrink-0 text-sm font-bold ${isCorrect ? 'text-[#10B981]' : isSkipped ? 'text-gray-400' : 'text-red-500'}`}>
                      {isCorrect ? '+4' : isSkipped ? '0' : '-1'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/mock')} className="flex items-center justify-center gap-2 bg-[#2563EB] text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition shadow-sm">
            <RotateCcw className="w-4 h-4" /> Attempt Again
          </button>
          <button onClick={() => navigate('/analytics')} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition">
            <BarChart2 className="w-4 h-4" /> View Analytics
          </button>
          <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition">
            <Home className="w-4 h-4" /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
