import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/api';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Plus, ArrowRight, Search, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const response = await tripService.getAll();
      setTrips(response.data);
    } catch (error) {
      toast.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned': return 'bg-blue-500/20 text-blue-400';
      case 'Ongoing': return 'bg-green-500/20 text-green-400';
      case 'Completed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen">
        <div className="container">
          <div className="space-y-8 animate-pulse">
            <div className="h-12 bg-border rounded-2xl w-64"></div>
            <div className="h-8 bg-border rounded-2xl w-96"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bento-item h-64 bg-bg-sub"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-gradient-to-br from-bg-main via-white to-bg-sub min-h-screen">
      <div className="container max-w-7xl mx-auto">
        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16"
        >
          <div className="flex-1">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-4 leading-tight"
            >
              Hello, {user?.name?.split(' ')[0]} 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-text-sub font-medium"
            >
              You have <span className="text-primary font-black">{trips.length}</span> active {trips.length === 1 ? 'journey' : 'journeys'} in your pipeline.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto"
          >
            <div className="relative sm:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={20} />
              <input 
                type="text" 
                className="form-input pl-14 pr-6 py-4 text-base bg-white border-border w-full shadow-lg hover:shadow-xl transition-shadow"
                placeholder="Search your trips..."
                aria-label="Search trips"
              />
            </div>
            <Link to="/create-trip" className="btn btn-primary px-8 py-4 text-base shadow-xl hover:shadow-2xl justify-center whitespace-nowrap">
              <Plus size={20} />
              Plan New Trip
            </Link>
          </motion.div>
        </motion.div>

        {trips.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white via-bg-sub to-white border-2 border-dashed border-border shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            
            <div className="relative text-center py-32 px-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <MapPin className="text-white" size={64} />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-text-main mb-4">No active itineraries</h2>
              <p className="text-xl text-text-sub max-w-2xl mx-auto mb-12 leading-relaxed">
                Start your next adventure by creating a new trip itinerary with our smart planning tools.
              </p>
              <Link to="/create-trip" className="btn btn-primary px-12 py-5 text-lg inline-flex shadow-2xl hover:scale-105 transition-transform">
                <Plus size={24} />
                Create My First Trip
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {/* Spotlight Section (Next Trip) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-8 relative overflow-hidden rounded-[2.5rem] group border-none min-h-[450px] shadow-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1400" 
                    className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    alt="Trip Spotlight"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12">
                  <div className="flex items-start justify-between">
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="bg-primary/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-2xl border border-white/20"
                    >
                      ✨ Coming Up Next
                    </motion.span>
                  </div>

                  <div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-balance drop-shadow-2xl"
                    >
                      {trips[0].name}
                    </motion.h2>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap items-center gap-6 mb-8"
                    >
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                        <Calendar size={20} className="text-primary" /> 
                        <span className="text-white font-bold">
                          {new Date(trips[0].start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                        <MapPin size={20} className="text-primary" /> 
                        <span className="text-white font-bold">
                          {trips[0].Stops?.length || 0} Stops
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link 
                        to={`/trips/${trips[0].id}`} 
                        className="btn bg-white text-text-main hover:bg-primary hover:text-white px-10 py-4 text-lg font-black inline-flex shadow-2xl hover:scale-105 transition-all"
                      >
                        Resume Planning <ArrowRight size={20} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 flex flex-col gap-6"
              >
                {/* Quick Stats Card */}
                <div className="bg-gradient-to-br from-primary to-accent rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-black uppercase tracking-wider">Quick Stats</h3>
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Globe size={20} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/70 text-sm font-bold mb-1">Total Budget</p>
                        <p className="text-4xl font-black">$12,450</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-white/70 text-xs font-bold mb-1">Countries</p>
                          <p className="text-2xl font-black">08</p>
                        </div>
                        <div className="h-8 w-px bg-white/20"></div>
                        <div>
                          <p className="text-white/70 text-xs font-bold mb-1">Cities</p>
                          <p className="text-2xl font-black">24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Traveler Status Card */}
                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-border">
                  <h3 className="text-lg font-black text-text-main mb-6">Traveler Status</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                      65%
                    </div>
                    <div className="flex-1">
                      <p className="text-text-main font-black text-xl mb-1">Explorer</p>
                      <p className="text-text-sub text-sm font-medium">Level 3</p>
                    </div>
                  </div>
                  <div className="relative h-3 bg-bg-sub rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-text-muted text-xs font-bold mt-3">35% to next level</p>
                </div>
              </motion.div>
            </div>

            {/* Other Trips Grid */}
            {trips.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-text-main">All Journeys</h2>
                  <span className="text-text-muted font-bold">{trips.length - 1} more</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {trips.slice(1).map((trip, i) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="group relative"
                    >
                      <Link to={`/trips/${trip.id}`} className="block">
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary">
                          {/* Card Header with Icon */}
                          <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
                            </div>
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="relative w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl"
                            >
                              <Globe size={40} />
                            </motion.div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black text-text-main">
                              {new Date(trip.start_date).getFullYear()}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-8">
                            <h3 className="text-2xl font-black mb-3 text-text-main group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {trip.name}
                            </h3>
                            <p className="text-text-sub text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                              {trip.description || 'No description provided for this itinerary.'}
                            </p>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-6 border-t border-border">
                              <div className="flex items-center gap-2 text-text-muted">
                                <MapPin size={16} />
                                <span className="text-sm font-bold">
                                  {trip.Stops?.length || 0} {trip.Stops?.length === 1 ? 'Stop' : 'Stops'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-primary font-black text-sm group-hover:gap-3 transition-all">
                                View <ArrowRight size={16} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
