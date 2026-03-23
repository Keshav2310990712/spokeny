import React from 'react';

const Badge = ({ children, variant = 'primary', size = 'sm', className = '' }) => {
  const variants = {
    primary: 'bg-brand-500/20 text-brand-600 dark:text-brand-400',
    success: 'bg-green-500/20 text-green-600 dark:text-green-400',
    danger: 'bg-red-500/20 text-red-600 dark:text-red-400',
    warning: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    secondary: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
