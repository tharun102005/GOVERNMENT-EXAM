import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import studyIllustration from '../../assets/study_illustration.png';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 bg-gradient-premium text-white">
      {/* Background Particles/Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* Mouse Parallax Glass Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-20 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
      ></motion.div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-xs font-bold text-white shadow-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            #1 Learning Platform in India
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-heading drop-shadow-md">
            Prepare for Government Exams with <span className="text-amber-300">Confidence</span>
          </h1>

          <p className="text-base sm:text-xl text-blue-50 max-w-xl leading-relaxed drop-shadow-sm font-medium">
            Practice Mock Tests, PYQs, Study Notes, Daily Quizzes and AI-powered Learning.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white text-blue-700 font-bold text-base shadow-xl hover:shadow-2xl transition flex items-center gap-2 cursor-pointer"
            >
              Start Learning <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl glass border-white/30 text-white font-bold text-base hover:bg-white/20 transition flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <PlayCircle className="w-5 h-5 text-amber-300" /> Take Mock Test
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative rounded-[24px] overflow-hidden shadow-2xl glass p-2 border-white/20">
            <img src={studyIllustration} alt="Student studying with ExamMaster AI" className="w-full h-auto rounded-[18px] block" />
            
            {/* Floating Stats Card inside Hero */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-[18px] shadow-2xl flex items-center gap-4"
            >
              <div className="text-4xl">🏆</div>
              <div>
                <div className="text-sm font-bold text-blue-100">Success Rate</div>
                <div className="text-2xl font-extrabold text-white">98.4%</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
