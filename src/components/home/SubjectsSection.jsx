import { motion } from 'framer-motion';
import { Calculator, Brain, BookA, Globe, Newspaper, Monitor, ChevronRight } from 'lucide-react';

const subjects = [
  { name: 'Quantitative Aptitude', icon: Calculator, progress: 65, lessons: 142, difficulty: 'High', color: 'blue' },
  { name: 'Reasoning Ability', icon: Brain, progress: 80, lessons: 98, difficulty: 'Medium', color: 'purple' },
  { name: 'English Language', icon: BookA, progress: 45, lessons: 85, difficulty: 'Medium', color: 'emerald' },
  { name: 'General Knowledge', icon: Globe, progress: 30, lessons: 210, difficulty: 'High', color: 'amber' },
  { name: 'Current Affairs', icon: Newspaper, progress: 90, lessons: 45, difficulty: 'Low', color: 'rose' },
  { name: 'Computer Awareness', icon: Monitor, progress: 15, lessons: 30, difficulty: 'Low', color: 'cyan' },
];

export default function SubjectsSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Master Every Subject
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">
            Structured learning paths designed by top educators to help you ace every section of your exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, idx) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-${subject.color}-50 dark:bg-${subject.color}-950/30 flex items-center justify-center text-${subject.color}-600 dark:text-${subject.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300`}>
                    {subject.difficulty} Difficulty
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {subject.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">
                  {subject.lessons} Interactive Lessons
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Course Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-${subject.color}-500 rounded-full`}
                    />
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  Continue Learning <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
