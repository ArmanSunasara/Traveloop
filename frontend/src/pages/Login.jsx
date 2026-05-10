import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(formData);
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left side: Immersive Image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200" 
          alt="Travel background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute bottom-16 lg:bottom-20 left-8 lg:left-20 right-8 lg:right-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 lg:mb-6 leading-tight text-balance">
              "Travel is the only thing you buy that makes you richer."
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full"></div>
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
            <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-text-main mb-10 md:mb-12 hover:text-primary transition-colors">
              <div className="w-10 h-10 bg-text-main rounded-xl flex items-center justify-center shadow-lg hover:bg-primary transition-colors">
                <LogIn className="text-white" size={20} />
              </div>
              Traveloop
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-3">Welcome back</h1>
            <p className="text-text-sub font-medium text-base md:text-lg">Please enter your credentials to access your journey pipeline.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-group">
              <label className="input-label" htmlFor="email">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                <input 
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input pl-12 py-4"
                  placeholder="alex.voyager@traveloop.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                <input 
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="form-input pl-12 py-4"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-8">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0 w-4 h-4 cursor-pointer" 
                />
                <span className="text-text-sub font-bold group-hover:text-text-main transition-colors">Keep me signed in</span>
              </label>
              <button 
                type="button"
                onClick={() => alert('Password reset functionality would be implemented here')}
                className="text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
              >
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`btn btn-primary w-full py-5 text-base justify-center shadow-lg shadow-blue-100 ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign in to Dashboard'}
            </button>
          </form>

          <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-border text-center">
            <p className="text-text-sub font-medium">
              New to the platform? {' '}
              <Link to="/register" className="text-primary hover:underline font-extrabold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1">
                Initiate Onboarding
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
