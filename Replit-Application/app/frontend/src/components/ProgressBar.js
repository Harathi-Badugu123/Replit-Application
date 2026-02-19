import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">Your Progress</span>
          <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        {progress > 0 && progress < 100 && (
          <p className="text-xs text-slate-600 mt-2 text-center">
            {progress < 50 
              ? "You're off to a great start! 🌟" 
              : progress < 75 
              ? "Halfway to your future! Keep going! 💪"
              : "Almost there! Your career insights await! 🎯"
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;