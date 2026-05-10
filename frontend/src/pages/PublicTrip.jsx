import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tripService } from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Share2, Copy, Globe, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const PublicTrip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await tripService.getPublic(id);
        setTrip(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen">
        <div className="container max-w-4xl mx-auto">
          <div className="space-y-8 animate-pulse">
            <div className="h-12 bg-border rounded-2xl w-64"></div>
            <div className="h-64 bg-border rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-bg-sub rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <Globe size={48} className="text-text-muted" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-main mb-4">Trip Not Found</h1>
          <p className="text-text-sub font-medium mb-8">This trip doesn't exist or isn't shared publicly.</p>
          <Link to="/" className="btn btn-primary px-8 py-4">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-gradient-to-b from-bg-main via-white to-bg-sub min-h-screen">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Public Itinerary</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6 leading-tight">{trip.name}</h1>
          {trip.description && <p className="text-xl text-text-sub font-medium mb-8 leading-relaxed max-w-3xl">{trip.description}</p>}
          
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-2 bg-bg-sub px-5 py-3 rounded-2xl">
              <Calendar size={18} className="text-primary" />
              <span className="font-bold text-sm">{new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 bg-bg-sub px-5 py-3 rounded-2xl">
              <MapPin size={18} className="text-primary" />
              <span className="font-bold text-sm">{trip.Stops?.length || 0} Destinations</span>
            </div>
            <button onClick={copyLink} className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-3 rounded-2xl hover:bg-primary/20 transition-colors">
              <Copy size={18} />
              <span className="font-bold text-sm">Copy Link</span>
            </button>
          </div>
        </motion.div>

        {/* Stops Timeline */}
        <div className="space-y-8">
          {trip.Stops?.map((stop, index) => (
            <motion.div key={stop.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bento-item bg-white shadow-lg border-none p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-text-main mb-2">{stop.City?.name}, {stop.City?.country}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-text-sub font-bold mb-6">
                    <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {new Date(stop.start_date).toLocaleDateString()} — {new Date(stop.end_date).toLocaleDateString()}</span>
                  </div>
                  {stop.Activities?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stop.Activities.map(activity => (
                        <div key={activity.id} className="p-4 bg-bg-sub rounded-2xl">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-text-main">{activity.name}</h4>
                            {activity.cost > 0 && <span className="text-primary font-black text-sm">${activity.cost}</span>}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-text-muted font-bold">
                            {activity.type && <span className="bg-white px-3 py-1 rounded-full">{activity.type}</span>}
                            {activity.duration && <span className="flex items-center gap-1"><Clock size={12} /> {activity.duration}m</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-16 p-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-[3rem] border border-border">
          <h2 className="text-3xl font-extrabold text-text-main mb-4">Inspired by this trip?</h2>
          <p className="text-text-sub font-medium mb-8">Create your own personalized itinerary with Traveloop.</p>
          <Link to="/register" className="btn btn-primary px-12 py-5 text-lg shadow-xl">Start Planning</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicTrip;
