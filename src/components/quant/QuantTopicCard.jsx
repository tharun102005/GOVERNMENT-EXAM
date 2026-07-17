import { useState } from 'react';
import { 
  Play, FileText, Video, Sparkles, ChevronDown, 
  ChevronUp, Bookmark, Clock, Award, Zap, HelpCircle 
} from 'lucide-react';

export default function QuantTopicCard({ 
  topic, 
  onStartPractice, 
  onOpenMock, 
  onOpenAI, 
  onOpenFormula, 
  onToggleBookmark 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-[22px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 relative overflow-hidden group">
      
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-200/50">
                Aptitude Topic
              </span>
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md ${
                topic.difficulty === 'Hard'
                  ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                  : topic.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
              }`}>
                {topic.difficulty}
              </span>
            </div>

            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-lg leading-tight mt-1">
              {topic.name}
            </h3>
          </div>

          <button
            onClick={() => onToggleBookmark(topic.id)}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              topic.bookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
            }`}
            title={topic.bookmarked ? 'Remove Bookmark' : 'Bookmark Topic'}
          >
            <Bookmark className={`w-4 h-4 ${topic.bookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Summary Description */}
        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
          {topic.summary}
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2.5 py-1 rounded-lg">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            {topic.questionsCount} Questions
          </span>

          <span className="inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold px-2.5 py-1 rounded-lg">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            {topic.pyqCount} PYQ Papers
          </span>

          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Avg: {topic.avgTime}
          </span>
        </div>

        {/* Progress Tracker Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[11px] font-extrabold text-slate-500">
            <span>Syllabus Progress: {topic.progress}%</span>
            <span className="text-emerald-600">Accuracy: {topic.accuracy}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${topic.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expandable Resources Drawer */}
      {isExpanded && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-4 text-xs">
          
          {/* Formulas Preview */}
          <div className="space-y-1.5">
            <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-1 text-blue-600">📐 Formulas ({topic.formulas.length})</span>
              <button 
                onClick={() => onOpenFormula(topic)}
                className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View Full Formula Sheet →
              </button>
            </div>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 font-mono text-[11px]">
              {topic.formulas.slice(0, 2).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Shortcut Tricks Preview */}
          <div className="space-y-1.5">
            <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 text-amber-600">
              <Zap className="w-3.5 h-3.5" /> Shortcut Tricks
            </div>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 text-[11px]">
              {topic.tricks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Action Links Bar: Video & PDF */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={topic.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl flex items-center gap-1.5 hover:bg-slate-100 transition"
            >
              <Video className="w-3.5 h-3.5 text-red-500" /> Video Lesson
            </a>

            <a
              href={topic.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl flex items-center gap-1.5 hover:bg-slate-100 transition"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" /> Download PDF Notes
            </a>

            <button
              onClick={() => onOpenAI(topic)}
              className="py-2 px-3 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-bold rounded-xl flex items-center gap-1.5 hover:bg-purple-100 transition cursor-pointer ml-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Explainer
            </button>
          </div>
        </div>
      )}

      {/* Accordion Toggle Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1 py-1 cursor-pointer"
      >
        <span>{isExpanded ? 'Hide Topic Formulas & Lessons' : 'View Formulas, Shortcuts & Lessons'}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Main Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onOpenMock(topic)}
          className="py-3 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Award className="w-4 h-4 text-blue-600" />
          <span>Topic Mock Test</span>
        </button>

        <button
          onClick={() => onStartPractice(topic)}
          className="py-3 px-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Practice</span>
        </button>
      </div>

    </div>
  );
}
