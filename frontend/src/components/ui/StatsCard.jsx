import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  trend = null,
  trendValue = null,
  color = 'primary',
  delay = 0,
  className = '',
  onClick,
  ...props 
}) => {
  const colorClasses = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', icon: 'text-primary' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary', icon: 'text-secondary' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', icon: 'text-cyan-500' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: 'text-amber-500' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: 'text-emerald-500' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-500', icon: 'text-rose-500' },
  };

  const colors = colorClasses[color] || colorClasses.primary;

  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-foreground-muted';

  return (
    <motion.div
      className={`card p-5 cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.icon}`}>
          {Icon && <Icon size={24} />}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon size={14} />
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-sm text-foreground-muted mt-1">{title}</p>
      </div>
    </motion.div>
  );
};

export const StatsRow = ({ stats, className = '' }) => (
  <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    {stats.map((stat, index) => (
      <StatsCard key={index} {...stat} delay={index * 0.1} />
    ))}
  </div>
);

export const MiniStat = ({ 
  label, 
  value, 
  icon: Icon,
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    cyan: 'text-cyan-500 bg-cyan-500/10',
    amber: 'text-amber-500 bg-amber-500/10',
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
        {Icon && <Icon size={18} />}
      </div>
      <div>
        <p className="text-lg font-bold text-foreground">{value}</p>
        <p className="text-xs text-foreground-muted">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
