import { motion } from 'framer-motion';

export const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'light',
  hover = true,
  glow = false,
  onClick,
  ...props 
}) => {
  const baseClasses = variant === 'dark' 
    ? 'card-glass-dark' 
    : 'card-glass';
  
  const hoverClasses = hover 
    ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl' 
    : '';
  
  const glowClasses = glow 
    ? 'animate-pulse-glow' 
    : '';

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const GradientCard = ({
  children,
  className = '',
  gradient = 'from-primary to-secondary',
  ...props
}) => (
  <motion.div
    className={`relative overflow-hidden rounded-2xl p-[2px] ${className}`}
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
    <div className="relative bg-surface rounded-[14px] p-6 h-full">
      {children}
    </div>
  </motion.div>
);

export const TripCard = ({ 
  trip, 
  index = 0,
  onClick,
  imageUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
}) => {
  const gradients = [
    'from-primary to-secondary',
    'from-accent-cyan to-primary',
    'from-secondary to-accent-rose',
    'from-accent-amber to-orange-500',
    'from-emerald-500 to-accent-cyan',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-surface shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={trip.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-surface-dark/20 to-transparent" />
        
        {/* Floating Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold shadow-lg`}>
          {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short' })}
        </div>
        
        {/* Hover Action Button */}
        <motion.div 
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradient} mb-3`} />
        <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {trip.name}
        </h3>
        <p className="text-sm text-foreground-muted line-clamp-2 mb-4">
          {trip.description || 'No description'}
        </p>
        
        {/* Footer Stats */}
        <div className="flex items-center justify-between text-xs text-foreground-faint">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {trip.stopCount || 0} stops
            </span>
          </div>
          <svg className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
