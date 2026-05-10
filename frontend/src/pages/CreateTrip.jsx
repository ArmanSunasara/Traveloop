import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, FileText, Type, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await tripService.create(formData);
      toast.success('Trip created successfully!');
      navigate(`/trips/${response.data.id}`);
    } catch (err) {
      console.error('Failed to create trip:', err);
      toast.error('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-bg-main min-h-screen">
      <div className="container flex justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bento-item bg-white p-6 md:p-10 lg:p-12 shadow-xl border-none"
        >
          <div className="mb-8 md:mb-10">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 text-text-sub hover:text-text-main font-bold mb-6 md:mb-8 transition-colors group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Cancel
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-3">Initiate Journey</h1>
            <p className="text-text-sub font-medium text-base md:text-lg">Define the core parameters for your upcoming expedition.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="input-group">
              <label className="input-label" htmlFor="trip-name">Journey Identifier (Name)</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                <input 
                  id="trip-name"
                  type="text" 
                  required
                  autoComplete="off"
                  className="form-input text-base md:text-lg py-4 pl-12"
                  placeholder="E.g. Summer Solstice in Tokyo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <label className="input-label" htmlFor="start-date">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                  <input 
                    id="start-date"
                    type="date" 
                    required
                    className="form-input pl-12 py-4"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="end-date">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                  <input 
                    id="end-date"
                    type="date" 
                    required
                    className="form-input pl-12 py-4"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="description">Mission Description</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-text-muted pointer-events-none" size={18} />
                <textarea 
                  id="description"
                  className="form-input min-h-[120px] resize-none pl-12 pt-4"
                  placeholder="Briefly describe the objectives and vibe of this trip..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`btn btn-primary w-full py-4 md:py-5 text-base md:text-lg justify-center shadow-lg shadow-slate-200 ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? 'Synchronizing...' : 'Generate Itinerary Base'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateTrip;
