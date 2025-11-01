import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'md',
  className,
  children,
  ...props 
}) => {
  const baseStyles = 'rounded font-medium transition-colors focus:outline-none';
  const variantStyles = {
    default: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border border-gray-300 hover:bg-gray-50',
    link: 'text-current underline hover:no-underline'
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
