import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, ArrowRight, Plane } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - Immersive */}
      <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=2400" 
            alt="Travel Hero"
            className="w-full h-full object-cover scale-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="container relative z-10 py-32">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-10 shadow-2xl"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-white text-xs font-black uppercase tracking-[0.2em]">Version 2.0 Now Live</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-[1.05] text-balance"
            >
              Expeditions planned <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                with precision.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-14 max-w-3xl font-medium leading-relaxed"
            >
              Experience the next generation of travel orchestration. Synchronize waypoints, automate budgeting, and secure your intelligence.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link 
                to="/register" 
                className="btn btn-primary px-14 py-6 text-xl font-black shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all inline-flex group"
              >
                Initiate First Expedition
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/explore" 
                className="text-white font-black text-base uppercase tracking-widest flex items-center gap-4 hover:gap-6 transition-all group px-6 py-4 rounded-2xl hover:bg-white/10 backdrop-blur-sm"
              >
                Browse Discovery Hub 
                <ArrowRight size={20} className="text-primary group-hover:text-white transition-colors" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Bento Grid - Popular Destinations */}
      <section className="section bg-bg-main">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6 md:gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4 md:mb-6 leading-tight text-balance">
                Curated <br />Global Waypoints
              </h2>
              <p className="text-lg md:text-xl text-text-sub font-medium">Strategically selected locations for the modern traveler.</p>
            </div>
            <Link to="/explore" className="btn btn-ghost font-black text-primary border border-primary/20 px-6 md:px-8 py-3 md:py-4 hover:bg-primary/5">
              View All Destinations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:gap-8 md:h-[800px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="md:col-span-2 md:row-span-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[400px] md:min-h-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                alt="Kyoto, Japan"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3 md:mb-4">Ancient Tradition</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3">Kyoto, Japan</h3>
                <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed max-w-sm">Experience the soul of Japan through timeless temples and serene zen gardens.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 min-h-[250px] md:min-h-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=800" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="London, UK"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-extrabold text-white">London, UK</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -10 }}
              className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 min-h-[250px] md:min-h-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Venice, Italy"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-extrabold text-white">Venice, Italy</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="md:col-span-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 min-h-[250px] md:min-h-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Paris, France"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Paris, France</h3>
                <p className="text-white/70 font-medium text-sm md:text-base">The global capital of art, fashion, and gastronomy.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Toolset */}
      <section className="section bg-gradient-to-b from-white via-bg-sub to-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-text-main mb-8 leading-[1.1] text-balance">
                Precision tools for the <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">modern wanderer</span>
              </h2>
              <p className="text-xl md:text-2xl text-text-sub font-medium leading-relaxed">
                We provide the infrastructure. You provide the adventure.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-7xl mx-auto">
            {[
              { 
                icon: Globe, 
                title: 'Network Synchronization', 
                desc: 'Real-time intelligence updates across all authorized devices. Your data, always current.',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Zap, 
                title: 'Instant Orchestration', 
                desc: 'Generate complex expedition timelines in milliseconds with our predictive engine.',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                icon: Shield, 
                title: 'Intelligence Vault', 
                desc: 'Military-grade encryption for all travel briefings and financial data. Secure by design.',
                color: 'from-orange-500 to-red-500'
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-[2.5rem] p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border hover:border-transparent overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${f.color} rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <f.icon size={window.innerWidth < 768 ? 36 : 44} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-black mb-6 group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-text-sub font-medium leading-relaxed text-base md:text-lg">
                    {f.desc}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <Link 
              to="/register" 
              className="btn btn-primary px-12 py-5 text-lg shadow-2xl hover:scale-105 transition-transform inline-flex"
            >
              Explore System Capabilities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 md:py-48 bg-slate-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[600px] md:h-[800px]">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-12 shadow-2xl"
            >
              <Plane className="text-primary" size={20} />
              <span className="text-white text-sm font-black uppercase tracking-widest">Start Your Journey</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-12 leading-tight text-balance"
            >
              Ready for <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                takeoff?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of travelers who trust Traveloop to orchestrate their perfect journeys.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="/register" 
                className="btn btn-primary bg-white text-text-main hover:bg-primary hover:text-white px-16 md:px-20 py-6 md:py-8 text-xl md:text-2xl font-black shadow-2xl hover:scale-105 transition-all inline-flex group"
              >
                Initialize Your Expedition
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
