import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService, budgetService, checklistService, noteService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, DollarSign, CheckSquare, FileText, Plus, 
  ChevronLeft, Trash2, Check, Clock, Zap, Globe, TrendingUp,
  Plane, Wallet, CreditCard, Utensils, Activity, Edit3,
  Share2, MoreVertical, X
} from 'lucide-react';
import { GlassCard, Timeline, GradientButton, ProgressRing, BudgetChart, BudgetCard } from '../components/ui';
import toast from 'react-hot-toast';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('itinerary');
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [budget, setBudget] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [notes, setNotes] = useState([]);
  
  const [newCheckItem, setNewCheckItem] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchTripData();
  }, [id]);

  const fetchTripData = async () => {
    try {
      const tripRes = await tripService.getById(id);
      setTrip(tripRes.data);

      const [budgetRes, checkRes, noteRes] = await Promise.all([
        budgetService.getByTrip(id).catch(() => ({ data: null })),
        checklistService.getByTrip(id).catch(() => ({ data: {} })),
        noteService.getByTrip(id).catch(() => ({ data: [] }))
      ]);
      
      setBudget(budgetRes.data);
      const checkData = checkRes.data;
      if (checkData && typeof checkData === 'object' && !Array.isArray(checkData)) {
        const flat = Object.values(checkData).flat();
        setChecklist(flat);
      } else {
        setChecklist(Array.isArray(checkData) ? checkData : []);
      }
      setNotes(Array.isArray(noteRes.data) ? noteRes.data : []);
    } catch (error) {
      toast.error('Failed to load trip details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await tripService.delete(id);
      toast.success('Trip deleted');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to delete trip');
    }
  };

  const handleAddCheckItem = async (e) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    try {
      const res = await checklistService.addItem(id, { label: newCheckItem, category: 'other' });
      setChecklist([...checklist, res.data]);
      setNewCheckItem('');
      toast.success('Item added');
    } catch {
      toast.error('Failed to add item');
    }
  };

  const toggleCheckItem = async (item) => {
    try {
      const res = await checklistService.updateItem(item.id, { is_packed: !item.is_packed });
      setChecklist(checklist.map(i => i.id === item.id ? res.data : i));
    } catch {
      toast.error('Update failed');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      const res = await noteService.addNote(id, { content: newNote });
      setNotes([res.data, ...notes]);
      setNewNote('');
      toast.success('Note added');
    } catch {
      toast.error('Failed to add note');
    }
  };

  const packedCount = checklist.filter(i => i.is_packed).length;
  const packingProgress = checklist.length > 0 ? (packedCount / checklist.length) * 100 : 0;

  const tabs = [
    { id: 'itinerary', icon: MapPin, label: 'Itinerary' },
    { id: 'budget', icon: DollarSign, label: 'Budget' },
    { id: 'checklist', icon: CheckSquare, label: 'Checklist' },
    { id: 'notes', icon: FileText, label: 'Notes' },
  ];

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-surface-secondary">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="space-y-6">
            <div className="skeleton h-64 rounded-3xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-12 rounded-xl" />)}
            </div>
            <div className="skeleton h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-surface-secondary">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ═══════════════════════════════════════════════════════════════
            BACK BUTTON
            ═══════════════════════════════════════════════════════════════ */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 group"
        >
          <div className="w-10 h-10 rounded-xl bg-surface border border-border-default flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
            <ChevronLeft size={20} />
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </motion.button>

        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-8"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600"
              alt={trip.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-4"
                >
                  <Plane size={14} />
                  <span>{trip.Stops?.length || 0} Destinations</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24))} Days</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold font-[Poppins] text-white mb-4"
                >
                  {trip.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/60 text-lg mb-6"
                >
                  {trip.description || 'An amazing journey awaits!'}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Calendar size={18} className="text-accent-cyan" />
                    <span className="text-white text-sm">
                      {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  {trip.is_public && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30">
                      <Share2 size={16} className="text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-medium">Public</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-3"
              >
                <GradientButton variant="secondary" icon={Edit3} className="backdrop-blur-sm bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Edit
                </GradientButton>
                <GradientButton 
                  variant="primary" 
                  icon={Share2}
                  onClick={() => toast.success('Link copied to clipboard!')}
                >
                  Share
                </GradientButton>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            TABS
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 p-2 bg-surface rounded-2xl border border-border-default overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25' 
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface-tertiary'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.id === 'checklist' && checklist.length > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? 'bg-white/20' : 'bg-primary/10 text-primary'
                    }`}>
                      {packedCount}/{checklist.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            TAB CONTENT
            ═══════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          
          {/* ITINERARY TAB */}
          {activeTab === 'itinerary' && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-foreground">Trip Timeline</h3>
                      <GradientButton variant="primary" size="sm" icon={Plus}>
                        Add Stop
                      </GradientButton>
                    </div>

                    {trip.Stops?.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-2xl bg-surface-tertiary flex items-center justify-center mx-auto mb-4">
                          <MapPin size={32} className="text-foreground-faint" />
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">No stops yet</h4>
                        <p className="text-foreground-muted mb-4">Add your first destination to start building your itinerary</p>
                        <GradientButton variant="primary" icon={Plus}>
                          Add First Stop
                        </GradientButton>
                      </div>
                    ) : (
                      <Timeline 
                        items={trip.Stops.map((stop, i) => ({
                          title: `${stop.City?.name}, ${stop.City?.country}`,
                          description: `Day ${i + 1} of your journey`,
                          date: new Date(stop.start_date).toLocaleDateString(),
                          location: stop.City?.country,
                          image: `https://images.unsplash.com/photo-${['1519046904884', '1502602898657', '1476514525535'][i % 3]}?auto=format&fit=crop&q=80&w=400`,
                        }))} 
                      />
                    )}
                  </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <GlassCard className="p-6">
                    <h4 className="font-semibold text-foreground mb-4">Quick Stats</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-tertiary">
                        <span className="text-sm text-foreground-muted">Total Days</span>
                        <span className="font-bold text-foreground">
                          {Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-tertiary">
                        <span className="text-sm text-foreground-muted">Destinations</span>
                        <span className="font-bold text-foreground">{trip.Stops?.length || 0}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-tertiary">
                        <span className="text-sm text-foreground-muted">Countries</span>
                        <span className="font-bold text-foreground">
                          {new Set(trip.Stops?.map(s => s.City?.country)).size || 0}
                        </span>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h4 className="font-semibold text-foreground mb-4">Weather Forecast</h4>
                    <div className="space-y-3">
                      {['Today', 'Tomorrow', 'Wed', 'Thu'].map((day, i) => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm text-foreground-muted">{day}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{['☀️', '⛅', '🌤️', '☀️'][i]}</span>
                            <span className="text-sm font-medium">{[24, 22, 25, 26][i]}°C</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {/* BUDGET TAB */}
          {activeTab === 'budget' && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <GlassCard className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-foreground">Budget Overview</h3>
                      <GradientButton variant="secondary" icon={Edit3} size="sm">
                        Edit Budget
                      </GradientButton>
                    </div>

                    {!budget ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-2xl bg-surface-tertiary flex items-center justify-center mx-auto mb-4">
                          <Wallet size={40} className="text-foreground-faint" />
                        </div>
                        <h4 className="text-xl font-semibold text-foreground mb-2">No budget set</h4>
                        <p className="text-foreground-muted mb-6">Start tracking your expenses for this trip</p>
                        <GradientButton variant="primary" icon={Plus}>
                          Set Budget
                        </GradientButton>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-8">
                        <BudgetChart 
                          budget={budget} 
                          total={parseFloat(budget.total || 0)} 
                        />
                        <div className="space-y-4">
                          <BudgetCard
                            title="Transport"
                            amount={parseFloat(budget.transport || 0)}
                            budget={parseFloat(budget.total || 0) * 0.3}
                            icon={Plane}
                            color="primary"
                            delay={0.1}
                          />
                          <BudgetCard
                            title="Stay"
                            amount={parseFloat(budget.stay || 0)}
                            budget={parseFloat(budget.total || 0) * 0.4}
                            icon={CreditCard}
                            color="secondary"
                            delay={0.2}
                          />
                          <BudgetCard
                            title="Meals"
                            amount={parseFloat(budget.meals || 0)}
                            budget={parseFloat(budget.total || 0) * 0.2}
                            icon={Utensils}
                            color="cyan"
                            delay={0.3}
                          />
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </div>

                <div>
                  <GlassCard className="p-6 sticky top-24">
                    <h4 className="font-semibold text-foreground mb-4">Budget Tips</h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={16} className="text-amber-500" />
                          <span className="font-medium text-foreground">Smart Spending</span>
                        </div>
                        <p className="text-sm text-foreground-muted">
                          Budget accommodations can save up to 40% on your trip costs.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap size={16} className="text-primary" />
                          <span className="font-medium text-foreground">Pro Tip</span>
                        </div>
                        <p className="text-sm text-foreground-muted">
                          Book flights 6-8 weeks in advance for the best deals.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHECKLIST TAB */}
          {activeTab === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Packing Checklist</h3>
                        <p className="text-sm text-foreground-muted mt-1">
                          {packedCount} of {checklist.length} items packed
                        </p>
                      </div>
                      <ProgressRing progress={packingProgress} size={80} strokeWidth={6} />
                    </div>

                    <form onSubmit={handleAddCheckItem} className="flex gap-3 mb-6">
                      <input
                        type="text"
                        value={newCheckItem}
                        onChange={(e) => setNewCheckItem(e.target.value)}
                        placeholder="Add new item..."
                        className="flex-1 form-input"
                      />
                      <GradientButton variant="primary" type="submit" icon={Plus}>
                        Add
                      </GradientButton>
                    </form>

                    <div className="space-y-3">
                      {checklist.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                            item.is_packed 
                              ? 'bg-surface-tertiary border-transparent' 
                              : 'bg-surface border-border-default hover:border-primary/30'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => toggleCheckItem(item)}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                item.is_packed
                                  ? 'bg-primary border-primary text-white'
                                  : 'border-border-default hover:border-primary'
                              }`}
                            >
                              {item.is_packed && <Check size={14} />}
                            </button>
                            <span className={`font-medium ${item.is_packed ? 'text-foreground-muted line-through' : 'text-foreground'}`}>
                              {item.label}
                            </span>
                          </div>
                          <button
                            onClick={() => setChecklist(checklist.filter(i => i.id !== item.id))}
                            className="text-foreground-faint hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </motion.div>
                      ))}
                      
                      {checklist.length === 0 && (
                        <div className="text-center py-12">
                          <CheckSquare size={48} className="mx-auto text-foreground-faint mb-4" />
                          <p className="text-foreground-muted">No items yet. Add your first packing item!</p>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>

                <div>
                  <GlassCard className="p-6 sticky top-24">
                    <h4 className="font-semibold text-foreground mb-4">Categories</h4>
                    <div className="space-y-3">
                      {['Essentials', 'Clothing', 'Electronics', 'Documents', 'Toiletries'].map((cat, i) => (
                        <div key={cat} className="flex items-center justify-between p-3 rounded-xl bg-surface-tertiary">
                          <span className="text-sm text-foreground">{cat}</span>
                          <span className="text-xs font-medium text-foreground-muted bg-surface px-2 py-1 rounded-full">
                            {[3, 5, 2, 4, 3][i]} items
                          </span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {/* NOTES TAB */}
          {activeTab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    {notes.map((note, index) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard className="p-5 h-full">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs text-foreground-muted">
                              {note.created_at ? new Date(note.created_at).toLocaleDateString() : 'Just now'}
                            </span>
                            <button
                              onClick={async () => {
                                await noteService.deleteNote(note.id);
                                setNotes(notes.filter(n => n.id !== note.id));
                                toast.success('Note deleted');
                              }}
                              className="text-foreground-faint hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-foreground whitespace-pre-wrap">{note.content}</p>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                  
                  {notes.length === 0 && (
                    <div className="text-center py-16">
                      <FileText size={48} className="mx-auto text-foreground-faint mb-4" />
                      <h4 className="text-lg font-semibold text-foreground mb-2">No notes yet</h4>
                      <p className="text-foreground-muted">Add your first travel note</p>
                    </div>
                  )}
                </div>

                <div>
                  <GlassCard className="p-6 sticky top-24">
                    <h4 className="font-semibold text-foreground mb-4">Add Note</h4>
                    <form onSubmit={handleAddNote} className="space-y-4">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write your note here..."
                        className="form-input min-h-[150px] resize-none"
                      />
                      <GradientButton variant="primary" type="submit" className="w-full justify-center">
                        Save Note
                      </GradientButton>
                    </form>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dark/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Trash2 size={24} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Delete Trip?</h4>
                  <p className="text-sm text-foreground-muted">This action cannot be undone.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <GradientButton 
                  variant="secondary" 
                  className="flex-1" 
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </GradientButton>
                <GradientButton 
                  variant="primary" 
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </GradientButton>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TripDetails;
