import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Plane, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
              <Plane size={18} />
            </div>
            <span className="text-xl font-bold font-[Poppins] text-foreground">Traveloop</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold font-[Poppins] text-foreground tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-foreground-muted mb-8">
            Sign in to continue planning your adventures.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-error text-sm font-medium px-4 py-3 rounded-xl border border-red-100 mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="input-label" htmlFor="login-email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-faint pointer-events-none" size={18} />
                <input
                  id="login-email"
                  type="email"
                  className="form-input pl-11 py-3"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="login-pass">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-faint pointer-events-none" size={18} />
                <input
                  id="login-pass"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input pl-11 pr-11 py-3"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-faint hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full py-3.5 text-base justify-center group ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-foreground-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-surface-dark via-[#1a1f3a] to-surface-dark-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-secondary/15 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 text-center p-12 max-w-lg">
          <div className="text-7xl mb-6">🌍</div>
          <h2 className="text-3xl font-bold font-[Poppins] text-white mb-4">Your next adventure awaits</h2>
          <p className="text-white/50 leading-relaxed">
            Plan multi-city itineraries, track budgets, and share your travel plans with the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
