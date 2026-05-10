import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const GradientButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'btn';
  
  const variantClasses = {
    primary: 'btn-primary btn-shine',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline: 'btn-secondary',
    gradient: 'bg-gradient-to-r from-primary via-secondary to-accent-cyan text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-8 py-3.5 text-base rounded-xl',
    xl: 'px-10 py-4 text-lg rounded-2xl',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </motion.button>
  );
};

export const FloatingActionButton = ({
  children,
  onClick,
  className = '',
  ...props
}) => (
  <motion.button
    className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/40 flex items-center justify-center z-40 ${className}`}
    whileHover={{ scale: 1.1, rotate: 90 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    {...props}
  >
    {children}
  </motion.button>
);

export const IconButton = ({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  onClick,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <motion.button
      className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all duration-200 ${
        variant === 'ghost' 
          ? 'text-foreground-muted hover:text-foreground hover:bg-surface-tertiary' 
          : variant === 'primary'
          ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
          : 'bg-surface border border-border-default text-foreground hover:border-primary hover:text-primary'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      <Icon size={iconSizes[size]} />
    </motion.button>
  );
};

export default GradientButton;
