import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Compass, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${isHome ? 'bg-transparent' : 'bg-white/90 backdrop-blur-xl border-b border-border shadow-sm'}`}>
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className={`flex items-center gap-2 text-2xl font-extrabold transition-colors ${isHome ? 'text-white' : 'text-text-main'}`}
          aria-label="Traveloop Home"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isHome ? 'bg-white text-text-main' : 'bg-text-main text-white'} shadow-lg`}>
            <Plane size={20} />
          </div>
          <span className="hidden sm:inline">Traveloop</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/explore" 
            className={`flex items-center gap-2 text-sm font-bold transition-all ${isHome ? 'text-white/80 hover:text-white' : 'text-text-sub hover:text-primary'}`}
            aria-label="Explore destinations"
          >
            <Compass size={18} />
            Explore
          </Link>

          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 text-sm font-bold transition-all ${isHome ? 'text-white/80 hover:text-white' : 'text-text-sub hover:text-primary'}`}
                aria-label="Go to dashboard"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <div className={`h-6 w-px mx-2 ${isHome ? 'bg-white/20' : 'bg-border'}`} aria-hidden="true"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-md transition-all ${isHome ? 'bg-white/10 border-white/30 text-white' : 'bg-bg-sub border-border text-text-main'}`}
                    aria-label={`User ${user.name}`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`font-bold text-sm hidden lg:block ${isHome ? 'text-white' : 'text-text-main'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className={`p-2 rounded-lg transition-all ${isHome ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-text-muted hover:text-red-500 hover:bg-red-50'}`}
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className={`text-sm font-bold transition-all px-4 py-2 rounded-lg ${isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-text-sub hover:text-text-main hover:bg-bg-sub'}`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`btn ${isHome ? 'bg-white text-text-main hover:bg-primary hover:text-white' : 'btn-primary'} shadow-lg`}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-all ${isHome ? 'text-white hover:bg-white/10' : 'text-text-main hover:bg-bg-sub'}`}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className={`container mt-4 pb-4 ${isHome ? 'bg-slate-900/95' : 'bg-white'} rounded-2xl shadow-xl border ${isHome ? 'border-white/10' : 'border-border'} backdrop-blur-xl`}>
              <div className="flex flex-col gap-2 p-4">
                <Link 
                  to="/explore" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isHome ? 'text-white hover:bg-white/10' : 'text-text-main hover:bg-bg-sub'}`}
                >
                  <Compass size={20} />
                  Explore
                </Link>

                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isHome ? 'text-white hover:bg-white/10' : 'text-text-main hover:bg-bg-sub'}`}
                    >
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>
                    <div className={`h-px my-2 ${isHome ? 'bg-white/10' : 'bg-border'}`} aria-hidden="true"></div>
                    <div className={`px-4 py-3 rounded-xl ${isHome ? 'bg-white/5' : 'bg-bg-sub'}`}>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isHome ? 'text-white/50' : 'text-text-muted'}`}>
                        Signed in as
                      </p>
                      <p className={`font-bold ${isHome ? 'text-white' : 'text-text-main'}`}>
                        {user.name}
                      </p>
                      <p className={`text-sm ${isHome ? 'text-white/60' : 'text-text-sub'}`}>
                        {user.email}
                      </p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-xl font-bold text-center transition-all ${isHome ? 'text-white hover:bg-white/10' : 'text-text-main hover:bg-bg-sub'}`}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={closeMobileMenu}
                      className="btn btn-primary w-full justify-center py-3"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
