import { Download, Play, Eye, CheckCircle2, HelpCircle } from 'lucide-react';

export default function PYQCard({ paper, onView, onPractice, onDownload }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-[22px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5 relative overflow-hidden group">
      
      {/* Top Bar: Icon, Title, Year Badge */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${paper.color} text-white flex items-center justify-center text-2xl shadow-xs shrink-0`}>
              {paper.emoji}
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200/50 dark:border-blue-800/40">
                {paper.category}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-[18px] leading-snug mt-1 line-clamp-2">
                {paper.title}
              </h3>
            </div>
          </div>
          <span className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-black px-3 py-1 rounded-xl shrink-0">
            {paper.year}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
          {paper.description}
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2.5 py-1 rounded-lg">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            {paper.questionsCount} Qs ({paper.durationMinutes} min)
          </span>

          <span className={`font-bold px-2.5 py-1 rounded-lg ${
            paper.difficulty === 'Hard' 
              ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300' 
              : paper.difficulty === 'Medium'
              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
          }`}>
            {paper.difficulty}
          </span>

          {paper.languages.map((lang, idx) => (
            <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium px-2 py-0.5 rounded-md text-[11px]">
              {lang}
            </span>
          ))}
        </div>

        {/* Feature Checkmarks */}
        <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
          {paper.hasAnswerKey && (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Answer Key
            </span>
          )}
          {paper.hasDetailedSolution && (
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> AI Solutions
            </span>
          )}
          <span className="ml-auto text-slate-400">
            {paper.downloadsCount.toLocaleString()} downloads
          </span>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onDownload(paper)}
          className="py-2.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
          title="Download PDF Paper"
        >
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </button>

        <button
          onClick={() => onView(paper)}
          className="py-2.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
          title="View Online Details & Solutions"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>

        <button
          onClick={() => onPractice(paper)}
          className="py-2.5 px-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
          title="Start Practice Test"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Practice</span>
        </button>
      </div>
    </div>
  );
}
