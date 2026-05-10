import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Map, DollarSign, CheckCircle, Users, Sparkles, Star, Plane, MapPin, Calendar, Shield, Zap } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }) };

const features = [
  { icon: Map, title: 'Smart Itineraries', desc: 'Build multi-city travel plans with drag-and-drop timeline builder.', color: 'from-primary to-secondary' },
  { icon: DollarSign, title: 'Budget Tracking', desc: 'Track transport, stay, and meal expenses with visual breakdowns.', color: 'from-accent-cyan to-primary' },
  { icon: CheckCircle, title: 'Packing Lists', desc: 'Never forget essentials with categorized checklists and progress tracking.', color: 'from-secondary to-pink-500' },
  { icon: Users, title: 'Share Publicly', desc: 'Generate public links to share your itinerary with friends & family.', color: 'from-accent-amber to-orange-500' },
  { icon: Globe, title: 'City Explorer', desc: 'Discover 20+ global destinations with curated activities and cost guides.', color: 'from-emerald-500 to-accent-cyan' },
  { icon: Sparkles, title: 'Trip Journal', desc: 'Capture thoughts and notes throughout your journey for lasting memories.', color: 'from-primary to-accent-cyan' },
];

const stats = [
  { value: '20+', label: 'Destinations' },
  { value: '60+', label: 'Activities' },
  { value: '100%', label: 'Free to Use' },
  { value: '∞', label: 'Adventures' },
];

const destinations = [
  { name: 'Tokyo', country: 'Japan', emoji: '🗼' },
  { name: 'Paris', country: 'France', emoji: '🗼' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴' },
  { name: 'Santorini', country: 'Greece', emoji: '🏛️' },
  { name: 'Dubai', country: 'UAE', emoji: '🏙️' },
  { name: 'London', country: 'UK', emoji: '🎡' },
];

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-surface-dark via-[#1a1f3a] to-surface-dark-secondary overflow-hidden">
        {/* Animated BG Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px]"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>

        <div className="container relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 font-medium backdrop-blur-sm mb-8">
                <Sparkles size={14} className="text-accent-amber" />
                Your Personal Travel Companion
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Poppins] text-white leading-[1.1] tracking-tight mb-6"
            >
              Plan Your Dream
              <br />
              <span className="bg-gradient-to-r from-primary-light via-accent-cyan to-primary bg-clip-text text-transparent animate-gradient">
                Journey Today
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Build multi-city itineraries, track budgets, discover activities, and share
              your travel plans — all in one beautiful platform.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register" className="btn btn-primary px-8 py-3.5 text-base shadow-xl shadow-primary/20 group">
                Start Planning Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/explore" className="btn bg-white/5 text-white border border-white/10 hover:bg-white/10 px-8 py-3.5 text-base backdrop-blur-sm">
                <Globe size={18} /> Explore Destinations
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 pt-10 border-t border-white/5"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
            <path fill="#F8FAFC" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="py-20 sm:py-28 bg-surface-secondary">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold text-primary tracking-wide uppercase">Why Traveloop</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-foreground mt-3 mb-4 tracking-tight">
              Everything You Need to Travel Smart
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-foreground-muted text-lg max-w-2xl mx-auto">
              From planning to packing, Traveloop covers every step of your journey.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-white rounded-2xl p-6 border border-border-default hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DESTINATIONS PREVIEW ═══════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-sm font-semibold text-accent-cyan tracking-wide uppercase">Popular Destinations</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-foreground mt-3 mb-4 tracking-tight">
              Where Will You Go Next?
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative bg-gradient-to-br from-surface-tertiary to-white rounded-2xl p-6 text-center border border-border-default hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-4xl mb-3">{d.emoji}</div>
                <h3 className="font-semibold text-foreground text-sm">{d.name}</h3>
                <p className="text-xs text-foreground-faint mt-0.5">{d.country}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/explore" className="btn btn-secondary px-6 py-3 group">
              View All Destinations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-20 sm:py-28 bg-surface-secondary">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold text-secondary tracking-wide uppercase">How It Works</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-foreground mt-3 tracking-tight">
              Three Simple Steps
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: MapPin, title: 'Choose Destinations', desc: 'Browse our curated collection of cities and pick your dream destinations.' },
              { step: '02', icon: Calendar, title: 'Build Your Itinerary', desc: 'Add stops, activities, and set budgets for each day of your trip.' },
              { step: '03', icon: Plane, title: 'Pack & Go', desc: 'Use the packing checklist, share with friends, and hit the road!' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-xl shadow-primary/20 mb-6">
                  <item.icon size={24} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-amber text-surface-dark text-xs font-bold flex items-center justify-center shadow-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground-muted text-sm max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-dark via-[#1a1f3a] to-surface-dark-secondary p-10 sm:p-16 text-center"
          >
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-secondary/15 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Poppins] text-white mb-4 tracking-tight">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
                Join thousands of travelers who plan smarter with Traveloop.
              </p>
              <Link to="/register" className="btn btn-primary px-10 py-4 text-base shadow-2xl shadow-primary/30 group">
                Create Free Account
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
