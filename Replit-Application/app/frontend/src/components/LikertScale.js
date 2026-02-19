import React from 'react';
import { motion } from 'framer-motion';
import { Frown, Meh, Smile } from 'lucide-react';

const LikertScale = ({ questionId, value, onChange }) => {
  const options = [
    { value: 1, label: 'Strongly Disagree', color: 'from-red-400 to-red-500', icon: Frown },
    { value: 2, label: 'Disagree', color: 'from-orange-400 to-orange-500', icon: Frown },
    { value: 3, label: 'Neutral', color: 'from-slate-400 to-slate-500', icon: Meh },
    { value: 4, label: 'Agree', color: 'from-teal-400 to-teal-500', icon: Smile },
    { value: 5, label: 'Strongly Agree', color: 'from-green-400 to-green-500', icon: Smile },
  ];

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-slate-600 px-2">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const Icon = option.icon;
          
          return (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`likert-option relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`likert-option-${questionId}-${option.value}`}
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mb-2 ${
                  isSelected ? 'shadow-lg' : ''
                }`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-medium text-center ${
                isSelected ? 'text-indigo-900' : 'text-slate-600'
              }`}>
                {option.label}
              </span>
              {isSelected && (
                <motion.div
                  layoutId={`selected-${questionId}`}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default LikertScale;