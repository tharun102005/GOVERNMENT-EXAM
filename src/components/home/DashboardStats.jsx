import { motion } from 'framer-motion';
import { Users, FileEdit, BookOpen, Clock, Trophy } from 'lucide-react';

const stats = [
  { label: 'Students', value: '2.5M+', icon: Users, color: 'text-blue-500' },
  { label: 'Mock Tests', value: '15,000+', icon: FileEdit, color: 'text-purple-500' },
  { label: 'Courses', value: '350+', icon: BookOpen, color: 'text-emerald-500' },
  { label: 'Daily Quizzes', value: '1M+', icon: Clock, color: 'text-amber-500' },
  { label: 'Success Rate', value: '94%', icon: Trophy, color: 'text-rose-500' },
];

export default function DashboardStats() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12 relative">
      <div className="absolute inset-0 bg-blue-50/50 dark:bg-slate-900/50 rounded-[40px] -z-10"></div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
          Trusted by Millions of Aspirants
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Join the fastest growing community of government exam aspirants in India.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-4 shadow-inner">
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
