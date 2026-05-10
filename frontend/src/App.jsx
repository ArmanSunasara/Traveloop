import { Plane } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import CreateTrip from './pages/CreateTrip';
import Explore from './pages/Explore';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile';
import PublicTrip from './pages/PublicTrip';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/shared/:id" element={<PublicTrip />} />
              
              <Route path="/dashboard" element={
                <PrivateRoute><Dashboard /></PrivateRoute>
              } />
              <Route path="/trips/:id" element={
                <PrivateRoute><TripDetails /></PrivateRoute>
              } />
              <Route path="/create-trip" element={
                <PrivateRoute><CreateTrip /></PrivateRoute>
              } />
              <Route path="/my-trips" element={
                <PrivateRoute><MyTrips /></PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute><Profile /></PrivateRoute>
              } />
            </Routes>
          </main>
          <footer style={{ padding: '4rem 0 5rem', backgroundColor: 'var(--text-main)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                    <div style={{ width: '2rem', height: '2rem', background: 'var(--primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plane style={{ color: 'white' }} size={16} />
                    </div>
                    Traveloop
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '20rem', fontWeight: 500, lineHeight: 1.6, fontSize: '0.875rem' }}>
                    Plan, organize, and experience your dream journeys with our intelligent travel platform.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', color: 'var(--primary)' }}>Platform</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                    <li><Link to="/explore" style={{ color: 'inherit', textDecoration: 'none' }}>Explore</Link></li>
                    <li><Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Dashboard</Link></li>
                    <li><Link to="/create-trip" style={{ color: 'inherit', textDecoration: 'none' }}>Plan a Trip</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', color: 'var(--primary)' }}>Account</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                    <li><Link to="/my-trips" style={{ color: 'inherit', textDecoration: 'none' }}>My Trips</Link></li>
                    <li><Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Settings</Link></li>
                  </ul>
                </div>
              </div>
              <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  &copy; 2026 Traveloop. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
