import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 w-5 h-5" />
        )}
        <input
          className={`w-full px-4 ${Icon ? 'pl-12' : ''} py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-brand-500 focus:outline-none transition-colors duration-200 ${
            error ? 'border-red-500 focus:border-red-500' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 dark:text-red-400 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default InputField;
