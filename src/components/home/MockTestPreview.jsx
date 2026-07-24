import { motion } from 'framer-motion';
import { Clock, HelpCircle, Target, Trophy, PlayCircle } from 'lucide-react';

const mocks = [
  { name: 'UPSC CSE Prelims Full Mock 1', questions: 100, duration: '120 min', difficulty: 'Hard', marks: 200 },
  { name: 'TNPSC Group 4 General Studies', questions: 200, duration: '180 min', difficulty: 'Medium', marks: 300 },
  { name: 'SSC CGL Tier 1 All India Mock', questions: 100, duration: '60 min', difficulty: 'Medium', marks: 200 },
];

export default function MockTestPreview() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Live All-India Mock Tests
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Test your preparation level with our real-exam simulated mock tests and detailed analytics.
          </p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer">
          View All Mocks
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mocks.map((mock, idx) => (
          <motion.div
            key={mock.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-xl border border-slate-200/50 dark:border-slate-800 flex flex-col relative overflow-hidden group hover:border-blue-500/50 transition-colors"
          >
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-md">
              Live Now
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pr-16 leading-snug">
              {mock.name}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{mock.questions} Questions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="font-medium">{mock.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Target className="w-4 h-4 text-amber-500" />
                <span className="font-medium">{mock.marks} Marks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Trophy className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">{mock.difficulty}</span>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition transform group-hover:scale-[1.02]">
                <PlayCircle className="w-5 h-5" /> Start Mock Test
              </button>
              
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span className="hover:text-blue-500 cursor-pointer">Attempt History</span>
                <span className="hover:text-blue-500 cursor-pointer">Leaderboard</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
