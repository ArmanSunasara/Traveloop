import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Globe, Save, Trash2, ChevronLeft, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    language: 'en',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await userService.getProfile();
        setFormData({
          name: res.data.name || '',
          photo: res.data.photo || '',
          language: res.data.language || 'en',
        });
      } catch {
        toast.error('Failed to load profile');
      }
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.updateProfile(formData);
      toast.success('Profile updated!');
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      stored.name = formData.name;
      localStorage.setItem('user', JSON.stringify(stored));
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure? This permanently deletes your account and all trips.')) return;
    setDeleting(true);
    try {
      await userService.deleteAccount();
      logout();
      navigate('/');
      toast.success('Account deleted');
    } catch {
      toast.error('Failed to delete account');
      setDeleting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-gradient-to-br from-bg-main via-white to-bg-sub min-h-screen">
      <div className="container max-w-3xl mx-auto px-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-text-sub hover:text-text-main font-bold mb-8 transition-colors group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Avatar Section */}
          <div className="text-center mb-12">
            <div className="w-28 h-28 bg-gradient-to-br from-primary to-accent rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl text-white text-4xl font-black relative group">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
              <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera size={28} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-2">{user?.name}</h1>
            <p className="text-text-sub font-medium">{user?.email}</p>
          </div>

          {/* Profile Form */}
          <div className="bento-item bg-white shadow-xl border-none p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-extrabold text-text-main mb-8">Profile Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="input-group">
                <label className="input-label" htmlFor="prof-name">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                  <input id="prof-name" type="text" className="form-input pl-12 py-4" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="prof-photo">Photo URL</label>
                <div className="relative">
                  <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                  <input id="prof-photo" type="text" className="form-input pl-12 py-4" placeholder="https://example.com/photo.jpg" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="prof-lang">Language</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                  <select id="prof-lang" className="form-input pl-12 py-4 appearance-none" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className={`btn btn-primary w-full py-5 text-base justify-center shadow-lg ${loading ? 'btn-loading' : ''}`}>
                <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bento-item bg-white shadow-lg border-2 border-red-100 p-8 md:p-12">
            <h2 className="text-2xl font-extrabold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-text-sub font-medium mb-8">Permanently delete your account and all associated data. This cannot be undone.</p>
            <button onClick={handleDelete} disabled={deleting} className="btn bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 font-bold transition-all">
              <Trash2 size={18} /> {deleting ? 'Deleting...' : 'Delete My Account'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
