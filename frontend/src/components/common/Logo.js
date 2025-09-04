import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Logo = ({ size = 'md', variant = 'full', className = '', theme = 'default' }) => {
  const sizes = {
    xs: {
      text: 'text-sm',
      icon: 'h-4 w-4',
      spacing: 'space-x-1'
    },
    sm: {
      text: 'text-lg',
      icon: 'h-5 w-5',
      spacing: 'space-x-1.5'
    },
    md: {
      text: 'text-2xl',
      icon: 'h-6 w-6',
      spacing: 'space-x-2'
    },
    lg: {
      text: 'text-3xl',
      icon: 'h-8 w-8',
      spacing: 'space-x-3'
    },
    xl: {
      text: 'text-4xl',
      icon: 'h-10 w-10',
      spacing: 'space-x-3'
    }
  };

  const themes = {
    default: {
      icon: 'text-indigo-600',
      accent: 'bg-orange-500',
      text: 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
    },
    light: {
      icon: 'text-white',
      accent: 'bg-orange-400',
      text: 'text-white'
    },
    dark: {
      icon: 'text-indigo-400',
      accent: 'bg-orange-500',
      text: 'bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'
    }
  };

  const sizeClasses = sizes[size];
  const themeClasses = themes[theme];

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative">
          <ShoppingBag className={`${sizeClasses.icon} ${themeClasses.icon}`} />
          <div className={`absolute -top-1 -right-1 w-2 h-2 ${themeClasses.accent} rounded-full animate-pulse`}></div>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span className={`${sizeClasses.text} font-bold ${themeClasses.text} ${className}`}>
        NexaShop
      </span>
    );
  }

  return (
    <div className={`flex items-center ${sizeClasses.spacing} ${className}`}>
      <div className="relative">
        <ShoppingBag className={`${sizeClasses.icon} ${themeClasses.icon}`} />
        <div className={`absolute -top-1 -right-1 w-2 h-2 ${themeClasses.accent} rounded-full animate-pulse`}></div>
      </div>
      <span className={`${sizeClasses.text} font-bold ${themeClasses.text}`}>
        NexaShop
      </span>
    </div>
  );
};

export default Logo;
