import { motion } from 'framer-motion';
import { Target, BookOpen, GraduationCap, Shield, Landmark, Train, Flame, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'UPSC', icon: Landmark, color: 'from-blue-600 to-indigo-600', students: '1.2M+' },
  { name: 'TNPSC', icon: Target, color: 'from-purple-600 to-fuchsia-600', students: '2.5M+' },
  { name: 'SSC', icon: BookOpen, color: 'from-emerald-600 to-teal-600', students: '4.8M+' },
  { name: 'Banking', icon: Landmark, color: 'from-orange-600 to-amber-600', students: '3.1M+' },
  { name: 'Railway', icon: Train, color: 'from-rose-600 to-red-600', students: '5.2M+' },
  { name: 'Police', icon: Shield, color: 'from-cyan-600 to-blue-600', students: '1.8M+' },
  { name: 'Defence', icon: Shield, color: 'from-green-600 to-emerald-600', students: '800K+' },
  { name: 'TET', icon: GraduationCap, color: 'from-pink-600 to-rose-600', students: '1.5M+' },
  { name: 'GATE', icon: Flame, color: 'from-violet-600 to-purple-600', students: '900K+' },
  { name: 'State PSC', icon: Landmark, color: 'from-yellow-600 to-orange-600', students: '2.1M+' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
};

export default function ExamCategories() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Explore Exam Categories
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Choose your target exam to get personalized study material and mock tests.
          </p>
        </div>
        <button className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition-colors cursor-pointer">
          View All Exams <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-[24px] blur-xl" style={{ backgroundImage: `var(--tw-gradient-stops)` }}></div>
              <div className="glass h-full rounded-[24px] p-6 flex flex-col items-center justify-center text-center border-slate-200/50 dark:border-slate-700/50 hover:border-transparent transition-colors shadow-sm hover:shadow-xl bg-white dark:bg-slate-900 overflow-hidden relative z-10">
                <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center bg-gradient-to-tr ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {category.students} Aspirants
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
