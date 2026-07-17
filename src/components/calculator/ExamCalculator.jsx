import { useState } from 'react';
import { X, Delete, RotateCcw, Calculator, Minus, Plus } from 'lucide-react';

export default function ExamCalculator({ isOpen, onClose }) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);

  if (!isOpen) return null;

  const handleNum = (val) => {
    if (isEvaluated) {
      setDisplay(val);
      setIsEvaluated(false);
    } else {
      setDisplay(prev => (prev === '0' ? val : prev + val));
    }
  };

  const handleOp = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
    setIsEvaluated(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsEvaluated(false);
  };

  const handleBackspace = () => {
    if (isEvaluated) {
      setDisplay('0');
      setIsEvaluated(false);
    } else {
      setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    }
  };

  const handleSqrt = () => {
    try {
      const num = parseFloat(display);
      if (num < 0) {
        setDisplay('Invalid Input');
      } else {
        setDisplay(String(Math.sqrt(num)));
      }
      setIsEvaluated(true);
    } catch {
      setDisplay('Error');
    }
  };

  const handlePercent = () => {
    try {
      const num = parseFloat(display);
      setDisplay(String(num / 100));
      setIsEvaluated(true);
    } catch {
      setDisplay('Error');
    }
  };

  const handleEquals = () => {
    try {
      const fullExp = equation + display;
      // Sanitize input safely for basic math arithmetic
      const sanitized = fullExp.replace(/×/g, '*').replace(/÷/g, '/');
      // Simple evaluator for standard math expressions
      const result = Function(`'use strict'; return (${sanitized})`)();
      setEquation(fullExp + ' =');
      setDisplay(String(Number(result.toFixed(6))));
      setIsEvaluated(true);
    } catch {
      setDisplay('Error');
      setIsEvaluated(true);
    }
  };

  const buttons = [
    { label: 'C', action: handleClear, bg: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold' },
    { label: '√', action: handleSqrt, bg: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200' },
    { label: '%', action: handlePercent, bg: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200' },
    { label: '÷', action: () => handleOp('÷'), bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' },

    { label: '7', action: () => handleNum('7'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '8', action: () => handleNum('8'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '9', action: () => handleNum('9'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '×', action: () => handleOp('×'), bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' },

    { label: '4', action: () => handleNum('4'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '5', action: () => handleNum('5'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '6', action: () => handleNum('6'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '-', action: () => handleOp('-'), bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' },

    { label: '1', action: () => handleNum('1'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '2', action: () => handleNum('2'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '3', action: () => handleNum('3'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '+', action: () => handleOp('+'), bg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold' },

    { label: '0', action: () => handleNum('0'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '.', action: () => handleNum('.'), bg: 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100' },
    { label: '⌫', action: handleBackspace, bg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
    { label: '=', action: handleEquals, bg: 'bg-blue-600 text-white font-bold hover:bg-blue-700' },
  ];

  return (
    <div className="fixed bottom-20 right-6 z-50 w-72 md:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
      {/* Title bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white px-4 py-2.5 flex items-center justify-between cursor-move select-none">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
          <Calculator className="w-4 h-4" /> Exam Calculator
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="text-right text-xs font-mono text-slate-400 min-h-[1.25rem] truncate">
          {equation}
        </div>
        <div className="text-right text-2xl font-mono font-bold text-slate-800 dark:text-slate-100 truncate mt-1">
          {display}
        </div>
      </div>

      {/* Grid */}
      <div className="p-3 grid grid-cols-4 gap-2 bg-slate-100/50 dark:bg-slate-900">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            className={`h-11 rounded-xl font-medium text-sm transition-all duration-150 active:scale-95 shadow-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center select-none ${btn.bg}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
