import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, className = '', type = 'button', size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl font-medium text-white shadow-lg shadow-primary-600/20 bg-gradient-to-r from-primary-600 to-purple-600 hover:shadow-primary-600/40 transition-shadow ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary-600 opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
};

export default GradientButton;
