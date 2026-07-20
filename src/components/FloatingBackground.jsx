import { motion } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Calculator, Landmark, Bot, 
  BarChart3, LineChart, Medal, Trophy, FileText 
} from 'lucide-react';

const eduIcons = [
  { icon: GraduationCap, left: '5%', top: '12%', size: 40, delay: 0, duration: 8 },
  { icon: BookOpen, left: '85%', top: '18%', size: 44, delay: 1, duration: 9 },
  { icon: Calculator, left: '12%', top: '65%', size: 36, delay: 2, duration: 7 },
  { icon: Landmark, left: '90%', top: '75%', size: 48, delay: 0.5, duration: 10 },
  { icon: Bot, left: '48%', top: '8%', size: 38, delay: 1.5, duration: 8.5 },
  { icon: BarChart3, left: '3%', top: '42%', size: 42, delay: 2.5, duration: 9.5 },
  { icon: LineChart, left: '92%', top: '45%', size: 40, delay: 1.2, duration: 7.5 },
  { icon: Medal, left: '38%', top: '82%', size: 44, delay: 0.8, duration: 11 },
  { icon: Trophy, left: '68%', top: '88%', size: 46, delay: 2.2, duration: 8.8 },
  { icon: FileText, left: '75%', top: '10%', size: 36, delay: 1.8, duration: 9.2 },
];

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-20" />

      {/* Blue Gradient Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/15 via-indigo-400/10 to-transparent blur-[120px] dark:from-blue-600/8 dark:via-indigo-600/5"
      />

      {/* Purple Gradient Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-purple-400/15 via-pink-400/8 to-transparent blur-[140px] dark:from-purple-600/8 dark:via-indigo-800/5"
      />

      {/* Cyan Glow Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 left-[25%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-cyan-400/15 via-teal-300/8 to-transparent blur-[130px] dark:from-cyan-600/8"
      />

      {/* Floating Education Icons (Opacity 8-10%) */}
      {eduIcons.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.08, 0.10, 0.08],
              y: [0, -18, 0],
              rotate: [0, idx % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{ 
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
            }}
            className="text-blue-600/30 dark:text-blue-400/20 select-none"
          >
            <IconComponent size={item.size} strokeWidth={1.5} />
          </motion.div>
        );
      })}

      {/* Glass Floating Circles */}
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[22%] left-[15%] w-24 h-24 rounded-full border border-blue-200/40 dark:border-blue-700/20 bg-white/20 dark:bg-white/5 backdrop-blur-md"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[12%] w-36 h-36 rounded-full border border-purple-200/40 dark:border-purple-700/20 bg-white/20 dark:bg-white/5 backdrop-blur-md"
      />
    </div>
  );
}
