import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tripService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, MapPin, Calendar, ArrowRight, Globe, Compass, 
  Sparkles, TrendingUp, Map, Clock, Plane, Zap, Heart,
  ChevronRight, Star, Users, Wallet, CheckCircle2
} from 'lucide-react';
import { GlassCard, TripCard, StatsCard, GradientButton } from '../components/ui';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await tripService.getAll();
        setTrips(res.data);
      } catch { 
        toast.error('Failed to load trips'); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchTrips();
  }, []);

  const upcomingTrips = trips.filter(t => new Date(t.start_date) > new Date());
  const pastTrips = trips.filter(t => new Date(t.end_date) < new Date());
  const upcomingTrip = upcomingTrips[0];
  const displayedTrips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    { icon: Map, label: 'Total Trips', value: trips.length, color: 'primary' },
    { icon: MapPin, label: 'Destinations', value: trips.reduce((s, t) => s + (t.stopCount || 0), 0), color: 'secondary' },
    { icon: Globe, label: 'Upcoming', value: upcomingTrips.length, color: 'cyan', trend: 'up', trendValue: '+2' },
    { icon: CheckCircle2, label: 'Completed', value: pastTrips.length, color: 'emerald' },
  ];

  const quickActions = [
    { to: '/create-trip', icon: Plus, label: 'Create Trip', desc: 'Plan new adventure', gradient: 'from-primary to-secondary' },
    { to: '/explore', icon: Compass, label: 'Explore', desc: 'Discover destinations', gradient: 'from-accent-cyan to-primary' },
    { to: '/my-trips', icon: Map, label: 'My Trips', desc: 'View all trips', gradient: 'from-secondary to-accent-rose' },
    { to: '/profile', icon: Wallet, label: 'Budget', desc: 'Track expenses', gradient: 'from-accent-amber to-orange-500' },
  ];

  const featuredDestinations = [
    { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400', rating: 4.9 },
    { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400', rating: 4.8 },
    { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400', rating: 4.9 },
  ];

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-surface-secondary">
        <div className="container max-w-7xl mx-auto space-y-6">
          <div className="skeleton h-16 w-80 rounded-2xl"></div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 skeleton h-80 rounded-3xl"></div>
            <div className="skeleton h-80 rounded-3xl"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-32 rounded-2xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-surface-secondary">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ═══════════════════════════════════════════════════════════════
            HEADER SECTION
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-6"
        >
          <div>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="text-sm font-medium text-foreground-faint mb-1"
            >
              {getGreeting()}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold font-[Poppins] text-foreground tracking-tight"
            >
              {user?.name?.split(' ')[0]} 
              <span className="inline-block animate-bounce-subtle ml-2">👋</span>
            </motion.h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GradientButton 
              variant="primary" 
              size="lg"
              icon={Plus}
              onClick={() => navigate('/create-trip')}
              className="shadow-xl shadow-primary/30"
            >
              New Trip
            </GradientButton>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            BENTO GRID HERO
            ═══════════════════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Hero Card - Upcoming Trip */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {upcomingTrip ? (
              <Link to={`/trips/${upcomingTrip.id}`}>
                <GlassCard 
                  variant="dark" 
                  className="relative overflow-hidden min-h-[320px] flex flex-col justify-end p-8 group cursor-pointer"
                  hover={true}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
                      alt="Travel"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-transparent" />
                  </div>

                  {/* Animated Orbs */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[100px] animate-float-delayed" />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium mb-4"
                    >
                      <Sparkles size={14} className="text-accent-amber" />
                      <span>Next Adventure</span>
                      <Zap size={14} className="text-accent-cyan" />
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] text-white mb-3 group-hover:text-primary-light transition-colors duration-300">
                      {upcomingTrip.name}
                    </h2>
                    
                    <p className="text-white/60 text-base max-w-xl mb-6 line-clamp-2">
                      {upcomingTrip.description || 'Your upcoming trip awaits! Get ready for an amazing journey.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm">
                        <Calendar size={16} />
                        {new Date(upcomingTrip.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm">
                        <MapPin size={16} />
                        {upcomingTrip.stopCount || 0} destinations
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-sm text-white text-sm font-medium ml-auto group-hover:translate-x-1 transition-transform">
                        View Trip <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ) : (
              <GlassCard variant="dark" className="min-h-[320px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                  <Plane size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No upcoming trips</h3>
                <p className="text-white/50 mb-6 max-w-sm">Start planning your next adventure today!</p>
                <GradientButton 
                  variant="primary" 
                  size="lg"
                  icon={Plus}
                  onClick={() => navigate('/create-trip')}
                >
                  Create Your First Trip
                </GradientButton>
              </GlassCard>
            )}
          </motion.div>

          {/* Side Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <GlassCard className="h-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">Your Stats</h3>
                <span className="text-xs text-foreground-muted bg-surface-tertiary px-3 py-1 rounded-full">This Month</span>
              </div>
              
              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-tertiary transition-colors cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : stat.color === 'cyan' ? 'cyan-500' : stat.color === 'emerald' ? 'emerald-500' : 'primary'}/10 flex items-center justify-center text-${stat.color === 'primary' ? 'primary' : stat.color === 'secondary' ? 'secondary' : stat.color === 'cyan' ? 'cyan-500' : stat.color === 'emerald' ? 'emerald-500' : 'primary'}`}>
                      <stat.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-foreground-muted">{stat.label}</p>
                    </div>
                    {stat.trend && (
                      <div className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.trendValue}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border-default">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Travel Streak</p>
                    <p className="text-xs text-foreground-muted">Keep exploring!</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-2 h-8 rounded-full ${i <= 3 ? 'bg-gradient-to-t from-primary to-secondary' : 'bg-surface-tertiary'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            QUICK ACTIONS - BENTO GRID
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Link to={action.to}>
                  <div className="group relative overflow-hidden rounded-2xl bg-surface p-5 border border-border-default hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${action.gradient}`} />
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{action.label}</h4>
                    <p className="text-xs text-foreground-muted">{action.desc}</p>
                    <ArrowRight size={16} className="absolute bottom-5 right-5 text-foreground-faint opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            TRIPS SECTION WITH TABS
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">Your Trips</h3>
              <p className="text-sm text-foreground-muted mt-1">{displayedTrips.length} {activeTab} adventures</p>
            </div>
            
            <div className="flex items-center gap-2 p-1 bg-surface-tertiary rounded-xl">
              {['upcoming', 'past'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-surface text-foreground shadow-sm' 
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {displayedTrips.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-3xl border-2 border-dashed border-border-default p-12 text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-surface-tertiary flex items-center justify-center mx-auto mb-5">
                  <Globe size={40} className="text-foreground-faint" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No {activeTab} trips</h3>
                <p className="text-foreground-muted text-sm mb-6 max-w-sm mx-auto">
                  {activeTab === 'upcoming' 
                    ? "Start planning your next adventure!" 
                    : "Your travel history will appear here."}
                </p>
                {activeTab === 'upcoming' && (
                  <GradientButton 
                    variant="primary"
                    icon={Plus}
                    onClick={() => navigate('/create-trip')}
                  >
                    Create Trip
                  </GradientButton>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="trips"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayedTrips.slice(0, 6).map((trip, i) => (
                  <TripCard 
                    key={trip.id} 
                    trip={trip} 
                    index={i}
                    onClick={() => navigate(`/trips/${trip.id}`)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {displayedTrips.length > 6 && (
            <div className="text-center mt-8">
              <Link to="/my-trips">
                <GradientButton variant="secondary" icon={ChevronRight} iconPosition="right">
                  View All Trips
                </GradientButton>
              </Link>
            </div>
          )}
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            FEATURED DESTINATIONS
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">Trending Destinations</h3>
              <p className="text-sm text-foreground-muted mt-1">Popular places to explore</p>
            </div>
            <Link to="/explore" className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1">
              Explore all <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {featuredDestinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/30 to-transparent" />
                
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">
                  <Star size={12} className="fill-accent-amber text-accent-amber" />
                  {dest.rating}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-lg font-bold text-white mb-0.5">{dest.name}</h4>
                  <p className="text-sm text-white/70">{dest.country}</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Plus size={24} className="text-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
