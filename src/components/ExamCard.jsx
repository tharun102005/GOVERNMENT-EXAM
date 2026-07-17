import { useNavigate } from 'react-router-dom';

/* ── Per-category color palette & vivid gradients ── */
const CATEGORY_THEMES = {
  SSC:               { border: '#16A34A', btn: 'bg-emerald-600 hover:bg-emerald-700', iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200', numColor: '#16A34A' },
  Banking:           { border: '#EA580C', btn: 'bg-orange-600 hover:bg-orange-700', iconBg: 'bg-orange-50 text-orange-600 border-orange-200', numColor: '#EA580C' },
  TET:               { border: '#059669', btn: 'bg-teal-600 hover:bg-teal-700', iconBg: 'bg-teal-50 text-teal-600 border-teal-200', numColor: '#059669' },
  TRB:               { border: '#7C3AED', btn: 'bg-purple-600 hover:bg-purple-700', iconBg: 'bg-purple-50 text-purple-600 border-purple-200', numColor: '#7C3AED' },
  Insurance:         { border: '#DB2777', btn: 'bg-pink-600 hover:bg-pink-700', iconBg: 'bg-pink-50 text-pink-600 border-pink-200', numColor: '#DB2777' },
  'State PSC':       { border: '#0891B2', btn: 'bg-cyan-600 hover:bg-cyan-700', iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200', numColor: '#0891B2' },
  TNPSC:             { border: '#2563EB', btn: 'bg-blue-600 hover:bg-blue-700', iconBg: 'bg-blue-50 text-blue-600 border-blue-200', numColor: '#2563EB' },
  UPSC:              { border: '#4F46E5', btn: 'bg-indigo-600 hover:bg-indigo-700', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200', numColor: '#4F46E5' },
  'RRB Railway':     { border: '#DC2626', btn: 'bg-red-600 hover:bg-red-700', iconBg: 'bg-red-50 text-red-600 border-red-200', numColor: '#DC2626' },
  'Police (TNUSRB)': { border: '#0284C7', btn: 'bg-sky-600 hover:bg-sky-700', iconBg: 'bg-sky-50 text-sky-600 border-sky-200', numColor: '#0284C7' },
  Defence:           { border: '#475569', btn: 'bg-slate-700 hover:bg-slate-800', iconBg: 'bg-slate-100 text-slate-700 border-slate-300', numColor: '#475569' },
  LIC:               { border: '#D97706', btn: 'bg-amber-600 hover:bg-amber-700', iconBg: 'bg-amber-50 text-amber-600 border-amber-200', numColor: '#D97706' },
};

const FALLBACK_THEME = { border: '#2563EB', btn: 'bg-blue-600 hover:bg-blue-700', iconBg: 'bg-blue-50 text-blue-600 border-blue-200', numColor: '#2563EB' };

const DIFFICULTY_STYLES = {
  Easy:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Hard:   'bg-red-50 text-red-700 border-red-200',
};

export default function ExamCard({ exam }) {
  const navigate = useNavigate();

  const theme = CATEGORY_THEMES[exam.name] || FALLBACK_THEME;
  const diffStyle = DIFFICULTY_STYLES[exam.difficulty] || DIFFICULTY_STYLES.Medium;

  return (
    <div
      data-antigrav="card"
      className="bg-white border border-slate-200/90 rounded-[22px] shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col h-full group hover:-translate-y-1.5"
    >
      {/* Category Colored Accent Bar */}
      <div style={{ height: '5px', backgroundColor: theme.border }} className="w-full shrink-0" />

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 gap-4">

        {/* Top Header: Colorful Category Icon + Title + Difficulty Tag */}
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] shrink-0 shadow-xs border transition-transform duration-300 group-hover:scale-105 ${theme.iconBg}`}
          >
            {exam.emoji}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[24px] font-bold text-slate-900 leading-tight tracking-tight truncate group-hover:text-blue-600 transition-colors">
                {exam.name}
              </h3>
              <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${diffStyle}`}>
                {exam.difficulty}
              </span>
            </div>
            <p className="text-[12px] text-slate-400 font-semibold tracking-wide uppercase">
              Official Competitive Exam
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[16px] text-slate-500 leading-relaxed line-clamp-2">
          {exam.desc || 'Comprehensive syllabus preparation with full mock test series, study notes, and targeted subject practice.'}
        </p>

        {/* Subject Tags Badges */}
        {exam.subjects && exam.subjects.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {exam.subjects.slice(0, 3).map((sub, sIdx) => (
              <span key={sIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60">
                {sub}
              </span>
            ))}
            {exam.subjects.length > 3 && (
              <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-blue-50 text-blue-600">
                +{exam.subjects.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats — Equal Width 2 Columns */}
        <div className="grid grid-cols-2 gap-3 my-1">
          <div className="bg-slate-50/90 border border-slate-100 rounded-xl p-3 text-center">
            <div className="text-[18px] font-extrabold leading-none mb-1" style={{ color: theme.numColor }}>
              {exam.questions ? exam.questions.toLocaleString() : '10,000+'}
            </div>
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Question Bank
            </div>
          </div>
          <div className="bg-slate-50/90 border border-slate-100 rounded-xl p-3 text-center">
            <div className="text-[18px] font-extrabold text-slate-900 leading-none mb-1">
              {exam.tests || 50}
            </div>
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Mock Tests
            </div>
          </div>
        </div>

        {/* Spacer for vertical consistency */}
        <div className="flex-1" />

        {/* Full-width CTA Button */}
        <button
          onClick={() => navigate('/mock')}
          className={`w-full font-bold text-white text-[15px] py-3.5 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-sm transition-all duration-200 group-hover:shadow-md ${theme.btn}`}
        >
          <span>Start Practice</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>

      </div>
    </div>
  );
}
