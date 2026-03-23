import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const SectionHeader = ({ 
  title, 
  description, 
  subtitle,
  centered = true,
  actionButton,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 font-semibold mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          <span className="text-sm">{subtitle}</span>
        </div>
      )}
      
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      
      {description && (
        <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}

      {actionButton && (
        <div className={`mt-6 ${centered ? 'flex justify-center' : ''}`}>
          {actionButton}
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeader;
