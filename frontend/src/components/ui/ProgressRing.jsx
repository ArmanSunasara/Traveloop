import { motion } from 'framer-motion';

export const ProgressRing = ({ 
  progress = 0, 
  size = 120, 
  strokeWidth = 8,
  color = '#5B67F1',
  bgColor = '#E2E8F0',
  children,
  className = '' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          <div className="text-center">
            <span className="text-2xl font-bold text-foreground">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProgressBar = ({ 
  progress = 0, 
  color = 'primary',
  height = 8,
  animated = true,
  label,
  className = '' 
}) => {
  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary',
    secondary: 'bg-gradient-to-r from-secondary to-accent-rose',
    cyan: 'bg-gradient-to-r from-accent-cyan to-primary',
    amber: 'bg-gradient-to-r from-accent-amber to-orange-500',
    emerald: 'bg-gradient-to-r from-emerald-500 to-accent-cyan',
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground-secondary">{label}</span>
          <span className="text-sm font-bold text-foreground">{Math.round(progress)}%</span>
        </div>
      )}
      <div 
        className="w-full bg-surface-tertiary rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className={`h-full rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: animated ? 1 : 0, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

export const CircularProgress = ({ 
  value, 
  max = 100,
  size = 60,
  strokeWidth = 4,
  color = '#5B67F1'
}) => {
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
};

export default ProgressRing;
