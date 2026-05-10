import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Plus, ArrowRight, Trash2, Edit3, Eye, Globe, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

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

  const handleDelete = async (tripId, tripName) => {
    if (!window.confirm(`Delete "${tripName}"? This cannot be undone.`)) return;
    try {
      await tripService.delete(tripId);
      setTrips(trips.filter(t => t.id !== tripId));
      toast.success('Trip deleted');
    } catch {
      toast.error('Failed to delete trip');
    }
  };

  const filtered = trips.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen">
        <div className="container max-w-5xl mx-auto">
          <div className="space-y-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-border rounded-3xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-gradient-to-br from-bg-main via-white to-bg-sub min-h-screen">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-2">My Trips</h1>
            <p className="text-text-sub font-medium text-lg">{trips.length} {trips.length === 1 ? 'journey' : 'journeys'} planned</p>
          </div>
          <Link to="/create-trip" className="btn btn-primary px-8 py-4 text-base shadow-xl">
            <Plus size={20} /> Create Trip
          </Link>
        </motion.div>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={20} />
          <input type="text" className="form-input pl-14 pr-6 py-4 text-base bg-white w-full shadow-lg" placeholder="Search your trips..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-bg-sub/30 rounded-[3rem] border-2 border-dashed border-border">
            <Globe size={48} className="text-text-muted mx-auto mb-6" />
            <h2 className="text-2xl font-extrabold text-text-main mb-3">{search ? 'No trips match your search' : 'No trips yet'}</h2>
            <p className="text-text-sub font-medium mb-8">{search ? 'Try a different search term' : 'Start your first adventure!'}</p>
            {!search && <Link to="/create-trip" className="btn btn-primary px-10 py-4"><Plus size={20} /> Create First Trip</Link>}
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((trip, i) => (
              <motion.div key={trip.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-[2rem] shadow-lg hover:shadow-xl border border-border hover:border-primary transition-all p-6 md:p-8 group">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Globe size={28} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-extrabold text-text-main truncate">{trip.name}</h3>
                      {trip.is_public && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Public</span>}
                    </div>
                    <p className="text-text-sub text-sm font-medium line-clamp-2 mb-3">{trip.description || 'No description'}</p>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-text-muted">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {trip.stopCount || 0} stops</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Link to={`/trips/${trip.id}`} className="btn btn-primary px-6 py-3 text-sm shadow-md">
                      <Eye size={16} /> View
                    </Link>
                    <button onClick={() => handleDelete(trip.id, trip.name)} className="p-3 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
