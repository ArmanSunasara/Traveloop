import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';

export const Timeline = ({ items, className = '' }) => (
  <div className={`relative ${className}`}>
    {/* Vertical Line */}
    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent-cyan" />
    
    <div className="space-y-8">
      {items.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  </div>
);

export const TimelineItem = ({ item, index }) => {
  const gradients = [
    'from-primary to-secondary',
    'from-secondary to-accent-rose',
    'from-accent-cyan to-primary',
    'from-accent-amber to-orange-500',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      className="relative pl-16"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node */}
      <motion.div
        className={`absolute left-0 top-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-sm font-bold">{index + 1}</span>
      </motion.div>

      {/* Content Card */}
      <div className="card hover-lift group cursor-pointer">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          {item.image && (
            <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground-muted mt-1">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-faint opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-foreground-faint">
              {item.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              )}
              {item.time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </span>
              )}
              {item.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TimelineCompact = ({ items, className = '' }) => (
  <div className={`relative ${className}`}>
    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border-default" />
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative pl-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className={`absolute left-0 w-6 h-6 rounded-full border-2 ${
            item.completed 
              ? 'bg-primary border-primary' 
              : 'bg-surface border-border-default'
          }`}>
            {item.completed && (
              <svg className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${item.completed ? 'text-foreground line-through' : 'text-foreground'}`}>
              {item.title}
            </p>
            {item.time && (
              <p className="text-xs text-foreground-faint">{item.time}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Timeline;
