import { Plane } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages (to be created)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import CreateTrip from './pages/CreateTrip';
import Explore from './pages/Explore';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="/trips/:id" element={
                <PrivateRoute>
                  <TripDetails />
                </PrivateRoute>
              } />
              
              <Route path="/create-trip" element={
                <PrivateRoute>
                  <CreateTrip />
                </PrivateRoute>
              } />
              
              <Route path="/explore" element={<Explore />} />
            </Routes>
          </main>
          <footer className="py-16 md:py-20 bg-text-main text-white relative overflow-hidden">
            <div className="container relative z-10 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 text-2xl font-extrabold mb-4 md:mb-6">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                      <Plane className="text-white" size={16} />
                    </div>
                    Traveloop
                  </div>
                  <p className="text-white/50 max-w-sm font-medium leading-relaxed text-sm md:text-base">
                    The world's most advanced travel intelligence platform. Plan, organize, and execute journeys with mathematical precision.
                  </p>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 text-primary">Platform</h4>
                  <ul className="space-y-3 md:space-y-4 text-sm font-bold text-white/70">
                    <li><Link to="/explore" className="hover:text-white transition-colors">Global Discovery</Link></li>
                    <li><Link to="/dashboard" className="hover:text-white transition-colors">Command Center</Link></li>
                    <li><Link to="/create-trip" className="hover:text-white transition-colors">Initiate Expedition</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 text-primary">Intelligence</h4>
                  <ul className="space-y-3 md:space-y-4 text-sm font-bold text-white/70">
                    <li><button className="hover:text-white transition-colors text-left">ML Insights</button></li>
                    <li><button className="hover:text-white transition-colors text-left">Budget Analytics</button></li>
                    <li><button className="hover:text-white transition-colors text-left">Security Vault</button></li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-center md:text-left">
                  &copy; 2026 Traveloop Intelligence Systems. All rights reserved.
                </p>
                <div className="flex gap-6 md:gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
                  <button className="hover:text-white transition-colors">Security</button>
                  <button className="hover:text-white transition-colors">Privacy</button>
                  <button className="hover:text-white transition-colors">Terms</button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[200px] md:h-[300px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full"></div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
