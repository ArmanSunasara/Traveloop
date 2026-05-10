import { useState, useEffect } from 'react';
import { cityService, activityService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, DollarSign, Clock, Filter, Globe, Sparkles, ArrowRight, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Explore = () => {
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [regionFilter, setRegionFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesRes, activitiesRes] = await Promise.all([
          cityService.getAll(),
          activityService.getAll(),
        ]);
        setCities(citiesRes.data);
        setActivities(activitiesRes.data);
      } catch { toast.error('Failed to load data'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const regions = [...new Set(cities.map(c => c.region).filter(Boolean))];

  const filtered = cities.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase());
    const matchRegion = !regionFilter || c.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const cityActivities = selectedCity ? activities.filter(a => a.city_id === selectedCity.id) : [];

  const costBars = (n) => Array.from({ length: 5 }, (_, i) => (
    <div key={i} className={`w-1.5 rounded-full ${i < n ? 'bg-accent-amber h-3' : 'bg-border-default h-2'}`}></div>
  ));

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-surface-secondary">
        <div className="container max-w-6xl mx-auto">
          <div className="skeleton h-12 w-80 rounded-xl mb-6"></div>
          <div className="skeleton h-12 rounded-xl mb-8"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="skeleton h-44 rounded-2xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-surface-secondary">
      <div className="container max-w-6xl mx-auto pt-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">Discover</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[Poppins] text-foreground tracking-tight mt-1 mb-2">
            Where will you go?
          </h1>
          <p className="text-foreground-muted mb-6">Explore destinations and activities around the world.</p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-faint pointer-events-none" size={18} />
            <input type="text" className="form-input pl-11 py-3 bg-white shadow-sm" placeholder="Search cities or countries..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="form-input py-3 w-full sm:w-48 bg-white shadow-sm" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </motion.div>

        {/* Cities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filtered.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
              className={`group cursor-pointer bg-white rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                selectedCity?.id === city.id ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border-default hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{city.name}</h3>
                  <p className="text-xs text-foreground-faint">{city.country}</p>
                </div>
                <span className="text-xs font-medium text-foreground-faint bg-surface-tertiary px-2 py-1 rounded-md">{city.region}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="text-accent-amber fill-accent-amber" />
                  <span className="text-sm font-semibold text-foreground">{city.popularity_score}</span>
                </div>
                <div className="flex items-end gap-0.5">{costBars(city.cost_index)}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Globe size={48} className="text-foreground-faint mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No cities found</h3>
            <p className="text-foreground-muted text-sm">Try a different search or filter.</p>
          </div>
        )}

        {/* Activities Panel */}
        <AnimatePresence>
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl border border-border-default shadow-xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-[Poppins] text-foreground">
                    Activities in {selectedCity.name}
                  </h2>
                  <p className="text-sm text-foreground-faint mt-1">{cityActivities.length} experiences available</p>
                </div>
                <button onClick={() => setSelectedCity(null)} className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors text-foreground-muted">
                  <X size={20} />
                </button>
              </div>

              {cityActivities.length === 0 ? (
                <p className="text-foreground-muted text-sm py-8 text-center">No activities found for this city.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {cityActivities.map(activity => (
                    <div key={activity.id} className="p-4 rounded-xl border border-border-default hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors pr-2">{activity.name}</h4>
                        {activity.cost > 0 && (
                          <span className="text-sm font-bold text-primary whitespace-nowrap">${activity.cost}</span>
                        )}
                      </div>
                      <p className="text-xs text-foreground-faint line-clamp-2 mb-3">{activity.description}</p>
                      <div className="flex items-center gap-2">
                        {activity.type && (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-primary/5 text-primary">{activity.type}</span>
                        )}
                        {activity.duration && (
                          <span className="text-[10px] font-medium text-foreground-faint flex items-center gap-1"><Clock size={10} /> {activity.duration}m</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Explore;
