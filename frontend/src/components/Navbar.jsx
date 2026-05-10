import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Compass, LayoutDashboard, LogOut, Menu, X, Map, User, Plus, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/explore', icon: Compass, label: 'Explore' },
    ...(user ? [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/my-trips', icon: Map, label: 'My Trips' },
    ] : []),
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'py-2 bg-white/80 backdrop-blur-xl border-b border-border-default shadow-sm'
          : 'py-4 bg-transparent'
      }`}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Traveloop Home">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              isHome && !scrolled
                ? 'bg-white/20 backdrop-blur-md text-white border border-white/20'
                : 'bg-gradient-to-br from-primary to-secondary text-white'
            }`}>
              <Plane size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className={`text-xl font-bold font-[Poppins] tracking-tight transition-colors ${
              isHome && !scrolled ? 'text-white' : 'text-foreground'
            }`}>
              Traveloop
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary'
                    : isHome && !scrolled
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface-tertiary'
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/create-trip"
                  className="btn-primary btn text-sm px-4 py-2 rounded-lg"
                >
                  <Plus size={16} />
                  <span className="hidden lg:inline">New Trip</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-full transition-all duration-200 ${
                      isHome && !scrolled
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-surface-tertiary hover:bg-surface-secondary border border-border-default'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={14} className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-border-default p-1.5 z-50"
                      >
                        <div className="px-3 py-2.5 border-b border-border-light mb-1">
                          <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-foreground-faint truncate">{user.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground-secondary hover:bg-surface-tertiary transition-colors">
                          <Settings size={15} /> Settings
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-error hover:bg-red-50 transition-colors w-full">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  isHome && !scrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-foreground-secondary hover:text-foreground hover:bg-surface-tertiary'
                }`}>
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary text-sm px-5 py-2">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all ${
              isHome && !scrolled ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-surface-tertiary'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="container pb-4 pt-2">
                <div className="bg-white rounded-2xl shadow-2xl border border-border-default p-3 space-y-1">
                  {navLinks.map(link => (
                    <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-surface-tertiary'
                      }`}>
                      <link.icon size={18} /> {link.label}
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link to="/create-trip" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 transition-all">
                        <Plus size={18} /> Create Trip
                      </Link>
                      <div className="border-t border-border-light my-2"></div>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-foreground-faint truncate">{user.email}</p>
                        </div>
                      </div>
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground-secondary hover:bg-surface-tertiary transition-all">
                        <Settings size={18} /> Settings
                      </Link>
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-red-50 transition-all w-full">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="border-t border-border-light my-2"></div>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center py-3 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors">
                        Sign In
                      </Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}
                        className="btn btn-primary w-full justify-center py-3 text-sm">
                        Get Started Free
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Click-away overlay for profile dropdown */}
      {profileOpen && <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />}
    </>
  );
};

export default Navbar;
