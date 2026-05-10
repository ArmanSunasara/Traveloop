import { useState, useEffect } from 'react';
import { cityService, activityService } from '../services/api';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Zap, Clock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Explore = () => {
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [citiesRes, activitiesRes] = await Promise.all([
        cityService.getAll(),
        activityService.getAll()
      ]);
      setCities(citiesRes.data);
      setActivities(activitiesRes.data);
    } catch (error) {
      toast.error('Failed to load explore data');
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = cities.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen">
        <div className="container">
          <div className="space-y-8 animate-pulse">
            <div className="h-16 bg-border rounded-2xl w-full max-w-2xl mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-border rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-gradient-to-b from-bg-main via-white to-bg-sub min-h-screen">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-5xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest mb-8">
              Discover Destinations
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-main mb-8 leading-tight text-balance">
              Where to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">next?</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-sub font-medium mb-14 max-w-3xl mx-auto leading-relaxed">
              Browse our curated selection of global destinations and thousands of activities designed for the modern explorer.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-3xl mx-auto group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-[2rem] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity"></div>
            <div className="relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-text-muted transition-all group-focus-within:text-primary pointer-events-none z-10" size={24} />
              <input 
                type="text" 
                className="form-input pl-20 pr-8 py-7 text-lg shadow-2xl border-2 border-transparent focus:border-primary bg-white transition-all w-full rounded-[2rem]"
                placeholder="Search by city, country or interest..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search destinations"
              />
            </div>
          </motion.div>
        </div>

        {/* Popular Cities Section */}
        <section className="mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main mb-4 leading-tight">
                Curated Cities
              </h2>
              <p className="text-text-sub font-medium text-lg md:text-xl">Hand-picked locations with the highest traveler satisfaction.</p>
            </div>
            <button className="btn btn-ghost font-black text-primary hover:bg-primary/10 transition-all text-sm uppercase tracking-widest px-8 py-4 w-full sm:w-auto justify-center sm:justify-start group">
              View All Destinations 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCities.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-border hover:border-primary">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800`} 
                      alt={`${city.name}, ${city.country}`}
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl">
                      Featured
                    </div>

                    {/* City Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-black text-white mb-2 drop-shadow-2xl">{city.name}</h3>
                      <p className="text-white/80 text-sm font-bold uppercase tracking-wider">{city.country}</p>
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="p-6 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-accent">
                        <Star size={18} fill="currentColor" />
                        <span className="font-black text-lg">{city.popularity_score}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-text-muted uppercase tracking-wider">Cost</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-1.5 h-4 rounded-full ${idx < city.cost_index ? 'bg-primary' : 'bg-border'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section className="bg-text-main -mx-4 md:-mx-10 px-4 md:px-10 py-20 md:py-32 rounded-[2rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[100px] md:blur-[150px] rounded-full"></div>
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6 md:gap-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight text-balance">
                  Unforgettable <br />Experiences
                </h2>
                <p className="text-white/50 text-lg md:text-xl font-medium">Discover unique activities verified by our global intelligence network.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="btn bg-white/5 text-white hover:bg-white hover:text-text-main px-6 md:px-8 py-3 md:py-4 font-black text-xs uppercase tracking-widest border border-white/10 transition-all w-full md:w-auto justify-center">
                  Filter by Intelligence Type
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {activities.slice(0, 9).map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:scale-[1.02] duration-500"
                >
                  <div className="flex justify-between items-start mb-8 md:mb-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-6 transition-transform">
                      <Zap size={window.innerWidth < 768 ? 28 : 32} />
                    </div>
                    <span className="text-2xl md:text-3xl font-black text-primary">${activity.cost}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold mb-3 md:mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {activity.name}
                  </h3>
                  <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed mb-10 md:mb-12 line-clamp-3">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 md:gap-3 text-[10px] font-black uppercase tracking-widest text-white/30">
                      <Clock size={16} />
                      <span>{activity.duration} MIN</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{activity.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
