import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, PiggyBank } from 'lucide-react';

export const BudgetChart = ({ 
  budget = {}, 
  total = 0,
  className = '' 
}) => {
  const categories = [
    { key: 'transport', label: 'Transport', color: '#5B67F1', icon: TrendingUp },
    { key: 'stay', label: 'Stay', color: '#7C3AED', icon: Wallet },
    { key: 'meals', label: 'Meals', color: '#06B6D4', icon: CreditCard },
    { key: 'activities', label: 'Activities', color: '#F59E0B', icon: PiggyBank },
  ];

  const values = categories.map(cat => ({
    ...cat,
    value: budget[cat.key] || 0,
    percentage: total > 0 ? ((budget[cat.key] || 0) / total) * 100 : 0,
  }));

  // Calculate SVG chart dimensions
  const size = 200;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  let accumulatedOffset = 0;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />
          
          {/* Segments */}
          {values.map((item, index) => {
            if (item.percentage === 0) return null;
            
            const segmentLength = (item.percentage / 100) * circumference;
            const offset = circumference - accumulatedOffset;
            accumulatedOffset += segmentLength;

            return (
              <motion.circle
                key={item.key}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset - segmentLength }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-foreground-muted uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-foreground">${total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6 w-full">
        {values.filter(v => v.value > 0).map((item) => (
          <motion.div
            key={item.key}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-tertiary transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ x: 4 }}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-foreground-secondary flex-1">{item.label}</span>
            <span className="text-sm font-semibold text-foreground">${item.value.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const BudgetCard = ({ 
  title,
  amount,
  budget,
  icon: Icon,
  color = 'primary',
  delay = 0 
}) => {
  const colorClasses = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', bar: 'from-primary to-secondary' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', bar: 'from-cyan-500 to-primary' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', bar: 'from-amber-500 to-orange-500' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', bar: 'from-emerald-500 to-cyan-500' },
  };

  const colors = colorClasses[color];
  const percentage = budget > 0 ? Math.min((amount / budget) * 100, 100) : 0;
  const isOverBudget = amount > budget;

  return (
    <motion.div
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text}`}>
          {Icon && <Icon size={24} />}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">${amount.toLocaleString()}</p>
          <p className="text-xs text-foreground-muted">of ${budget.toLocaleString()}</p>
        </div>
      </div>
      
      <p className="text-sm font-medium text-foreground-secondary mb-3">{title}</p>
      
      {/* Progress bar */}
      <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-foreground-faint">{Math.round(percentage)}% used</span>
        {isOverBudget && (
          <span className="text-xs font-medium text-red-500">Over budget!</span>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetChart;
