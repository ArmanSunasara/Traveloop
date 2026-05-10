import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Plane } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    setLoading(true);
    const success = await register(formData);
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left side: Immersive Image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200" 
          alt="Travel landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 to-transparent"></div>
        <div className="absolute top-16 lg:top-20 left-8 lg:left-20">
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-white hover:text-primary transition-colors">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xl hover:bg-primary transition-colors">
              <Plane className="text-text-main" size={20} />
            </div>
            Traveloop
          </Link>
        </div>
        <div className="absolute bottom-16 lg:bottom-20 left-8 lg:left-20 right-8 lg:right-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 lg:mb-6 leading-tight text-balance">
              Start your next <br />great story with us.
            </h2>
            <p className="text-white/80 text-lg lg:text-xl max-w-md font-medium">
              Join 50,000+ travelers planning their dream journeys with precision.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-white min-h-screen">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-3">Create account</h1>
            <p className="text-text-sub font-medium text-base md:text-lg">Join our global community of modern explorers.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                <input 
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="form-input pl-12 py-4"
                  placeholder="Johnathan Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                <input 
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input pl-12 py-4"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                <input 
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="form-input pl-12 py-4"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <p className="text-xs text-text-muted mt-2 font-medium">Must be at least 6 characters</p>
            </div>

            <div className="flex items-start gap-3 text-sm text-text-sub mb-8">
              <input 
                type="checkbox" 
                id="terms"
                required 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 w-4 h-4 cursor-pointer flex-shrink-0" 
              />
              <label htmlFor="terms" className="font-medium cursor-pointer">
                I agree to the <button type="button" onClick={() => alert('Terms of Service would be displayed here')} className="text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Terms of Service</button> and <button type="button" onClick={() => alert('Privacy Policy would be displayed here')} className="text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Privacy Policy</button>.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading || !agreedToTerms}
              className={`btn btn-primary w-full py-5 text-base justify-center shadow-lg shadow-blue-100 ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? 'Creating account...' : 'Create My Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-sub font-medium">
              Already have an account? {' '}
              <Link to="/login" className="text-primary hover:underline font-extrabold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
