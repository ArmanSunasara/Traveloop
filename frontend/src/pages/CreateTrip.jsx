import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService, cityService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Calendar, MapPin, FileText, Plus, X, 
  Globe, Sparkles, Check, Plane, Camera, Users, Lock, Eye,
  Search, Map, Compass
} from 'lucide-react';
import { GlassCard, GradientButton, GradientCard } from '../components/ui';
import toast from 'react-hot-toast';

const steps = [
  { id: 'details', label: 'Trip Details', icon: FileText },
  { id: 'destinations', label: 'Destinations', icon: MapPin },
  { id: 'review', label: 'Review', icon: Check },
];

const CreateTrip = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  const [formData, setFormData] = useState({
    name: '', description: '', start_date: '', end_date: '', is_public: false,
  });
  const [selectedStops, setSelectedStops] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {
    cityService.getAll().then(res => setCities(res.data)).catch(() => {});
  }, []);

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) || 
    c.country.toLowerCase().includes(citySearch.toLowerCase())
  );

  const addStop = (city) => {
    if (selectedStops.find(s => s.city_id === city.id)) return;
    setSelectedStops([...selectedStops, {
      city_id: city.id,
      cityName: city.name,
      cityCountry: city.country,
      start_date: formData.start_date,
      end_date: formData.end_date,
      order: selectedStops.length + 1,
    }]);
    toast.success(`${city.name} added!`);
  };

  const removeStop = (cityId) => {
    setSelectedStops(selectedStops.filter(s => s.city_id !== cityId));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.start_date || !formData.end_date) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const tripRes = await tripService.create(formData);
      const tripId = tripRes.data.id;
      for (const stop of selectedStops) {
        await tripService.addStop(tripId, {
          city_id: stop.city_id,
          start_date: stop.start_date,
          end_date: stop.end_date,
          order: stop.order,
        });
      }
      toast.success('Trip created successfully!');
      navigate(`/trips/${tripId}`);
    } catch {
      toast.error('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  const canNext = step === 0 ? formData.name && formData.start_date && formData.end_date : true;
  const tripDuration = formData.start_date && formData.end_date 
    ? Math.ceil((new Date(formData.end_date) - new Date(formData.start_date)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="pt-20 pb-20 min-h-screen bg-surface-secondary">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
              <Plane size={20} />
            </div>
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">Create New Trip</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[Poppins] text-foreground tracking-tight">
            Plan Your Next Adventure
          </h1>
          <p className="text-foreground-muted mt-2">Follow the steps below to create your perfect trip</p>
        </motion.div>

        {/* Modern Stepper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-tertiary rounded-full -translate-y-1/2" />
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full -translate-y-1/2"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isComplete = i < step;
                
                return (
                  <motion.div 
                    key={s.id}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        isComplete 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30' 
                          : isActive 
                            ? 'bg-surface border-2 border-primary text-primary shadow-lg' 
                            : 'bg-surface-tertiary text-foreground-faint border-2 border-transparent'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isComplete ? <Check size={20} /> : <Icon size={20} />}
                    </motion.div>
                    <span className={`mt-3 text-sm font-medium ${isActive || isComplete ? 'text-foreground' : 'text-foreground-muted'}`}>
                      {s.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -50 }} 
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step 1: Details */}
            {step === 0 && (
              <div className="grid lg:grid-cols-2 gap-8">
                <GlassCard className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <FileText size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Trip Details</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="input-label mb-2 block">Trip Name *</label>
                      <input 
                        type="text" 
                        className="form-input py-3.5" 
                        placeholder="e.g., Summer in Europe"
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      />
                    </div>

                    <div>
                      <label className="input-label mb-2 block">Description</label>
                      <textarea 
                        className="form-input py-3.5 min-h-[120px] resize-none" 
                        placeholder="Tell us about your trip..."
                        value={formData.description} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="input-label mb-2 block">Start Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-faint" size={18} />
                          <input 
                            type="date" 
                            className="form-input pl-11 py-3.5"
                            value={formData.start_date} 
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="input-label mb-2 block">End Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-faint" size={18} />
                          <input 
                            type="date" 
                            className="form-input pl-11 py-3.5"
                            value={formData.end_date} 
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-tertiary">
                      <button
                        onClick={() => setFormData({ ...formData, is_public: !formData.is_public })}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          formData.is_public 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-surface border border-border-default text-foreground-muted'
                        }`}
                      >
                        {formData.is_public ? <Eye size={20} /> : <Lock size={20} />}
                      </button>
                      <div>
                        <p className="font-medium text-foreground">
                          {formData.is_public ? 'Public Trip' : 'Private Trip'}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {formData.is_public 
                            ? 'Anyone with the link can view your itinerary' 
                            : 'Only you can see this trip'}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Preview Card */}
                <div className="space-y-4">
                  <GlassCard 
                    variant="dark" 
                    className="p-6 relative overflow-hidden min-h-[300px] flex flex-col justify-end"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
                        alt="Travel"
                        className="w-full h-full object-cover opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs mb-3">
                        <Sparkles size={12} />
                        <span>Preview</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {formData.name || 'Your Trip Name'}
                      </h3>
                      
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        {formData.description || 'Trip description will appear here...'}
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        {formData.start_date && (
                          <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs">
                            {new Date(formData.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {tripDuration > 0 && (
                          <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs">
                            {tripDuration} days
                          </span>
                        )}
                        {formData.is_public && (
                          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs">
                            Public
                          </span>
                        )}
                      </div>
                    </div>
                  </GlassCard>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-surface border border-border-default">
                      <Camera size={24} className="text-primary mb-2" />
                      <p className="text-sm font-medium text-foreground">Add Photos</p>
                      <p className="text-xs text-foreground-muted">Coming soon</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface border border-border-default">
                      <Users size={24} className="text-secondary mb-2" />
                      <p className="text-sm font-medium text-foreground">Invite Friends</p>
                      <p className="text-xs text-foreground-muted">Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Destinations */}
            {step === 1 && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">Select Destinations</h2>
                        <p className="text-sm text-foreground-muted">{selectedStops.length} cities selected</p>
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-faint" size={20} />
                      <input 
                        type="text" 
                        className="form-input pl-12 py-4 text-base" 
                        placeholder="Search cities or countries..."
                        value={citySearch} 
                        onChange={(e) => setCitySearch(e.target.value)} 
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto scrollbar-hide">
                      {filteredCities.slice(0, 18).map(city => {
                        const added = selectedStops.some(s => s.city_id === city.id);
                        return (
                          <motion.button
                            key={city.id}
                            onClick={() => !added && addStop(city)}
                            disabled={added}
                            onMouseEnter={() => setHoveredCity(city.id)}
                            onMouseLeave={() => setHoveredCity(null)}
                            className={`relative text-left p-4 rounded-2xl border transition-all duration-200 ${
                              added 
                                ? 'bg-primary/5 border-primary/30 text-primary' 
                                : 'bg-surface border-border-default hover:border-primary/40 hover:shadow-md'
                            }`}
                            whileHover={!added ? { y: -2 } : {}}
                            whileTap={!added ? { scale: 0.98 } : {}}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-semibold text-sm">{city.name}</p>
                              {added && <Check size={16} className="text-primary" />}
                            </div>
                            <p className="text-xs text-foreground-faint">{city.country}</p>
                            
                            {hoveredCity === city.id && !added && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl pointer-events-none"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </GlassCard>
                </div>

                {/* Selected Stops Panel */}
                <div>
                  <GlassCard className="p-6 sticky top-24">
                    <h3 className="font-semibold text-foreground mb-4">Your Route</h3>
                    
                    {selectedStops.length === 0 ? (
                      <div className="text-center py-8">
                        <MapPin size={40} className="mx-auto text-foreground-faint mb-3" />
                        <p className="text-sm text-foreground-muted">No destinations selected yet</p>
                        <p className="text-xs text-foreground-faint mt-1">Click cities to add them</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedStops.map((stop, i) => (
                          <motion.div
                            key={stop.city_id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-surface-tertiary group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{stop.cityName}</p>
                              <p className="text-xs text-foreground-muted">{stop.cityCountry}</p>
                            </div>
                            <button 
                              onClick={() => removeStop(stop.city_id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-faint hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <X size={16} />
                            </button>
                          </motion.div>
                        ))}
                        
                        {/* Route Connector */}
                        <div className="flex items-center gap-2 py-2 px-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                          <Plane size={14} className="text-secondary" />
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 2 && (
              <div className="max-w-2xl mx-auto">
                <GlassCard className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Check size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Review Your Trip</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Trip Card Preview */}
                    <div className="relative rounded-2xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
                        alt="Trip"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-2xl font-bold text-white mb-1">{formData.name}</h3>
                        <p className="text-white/70 text-sm">{formData.description || 'No description'}</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-surface-tertiary">
                        <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Start Date</p>
                        <p className="font-semibold text-foreground">
                          {formData.start_date ? new Date(formData.start_date).toLocaleDateString() : '-'}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-tertiary">
                        <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">End Date</p>
                        <p className="font-semibold text-foreground">
                          {formData.end_date ? new Date(formData.end_date).toLocaleDateString() : '-'}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-tertiary">
                        <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Duration</p>
                        <p className="font-semibold text-foreground">{tripDuration} days</p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-tertiary">
                        <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Visibility</p>
                        <p className={`font-semibold ${formData.is_public ? 'text-emerald-500' : 'text-foreground'}`}>
                          {formData.is_public ? 'Public' : 'Private'}
                        </p>
                      </div>
                    </div>

                    {/* Destinations */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Destinations ({selectedStops.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStops.map((stop, i) => (
                          <motion.span
                            key={stop.city_id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-medium border border-primary/20"
                          >
                            <MapPin size={14} />
                            {stop.cityName}
                          </motion.span>
                        ))}
                        {selectedStops.length === 0 && (
                          <span className="text-sm text-foreground-muted">No destinations added</span>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mt-10"
        >
          <GradientButton
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => step > 0 ? setStep(step - 1) : navigate('/dashboard')}
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </GradientButton>

          {step < steps.length - 1 ? (
            <GradientButton
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => setStep(step + 1)}
              disabled={!canNext}
            >
              Continue
            </GradientButton>
          ) : (
            <GradientButton
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {!loading && <Sparkles size={18} className="mr-2" />}
              {loading ? 'Creating...' : 'Create Trip'}
            </GradientButton>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default CreateTrip;
