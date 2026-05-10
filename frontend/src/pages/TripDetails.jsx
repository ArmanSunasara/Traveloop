import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService, budgetService, checklistService, noteService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, DollarSign, CheckSquare, FileText, 
  Plus, Loader2, ChevronLeft, Trash2, Check, Clock, Zap, Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stops');
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [budget, setBudget] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [notes, setNotes] = useState([]);
  
  // Form states
  const [newCheckItem, setNewCheckItem] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchTripData();
  }, [id]);

  const fetchTripData = async () => {
    try {
      const [tripRes, budgetRes, checkRes, noteRes] = await Promise.all([
        tripService.getById(id),
        budgetService.getByTrip(id).catch(() => ({ data: null })),
        checklistService.getByTrip(id).catch(() => ({ data: [] })),
        noteService.getByTrip(id).catch(() => ({ data: [] }))
      ]);
      
      setTrip(tripRes.data);
      setBudget(budgetRes.data);
      setChecklist(checkRes.data || []);
      setNotes(noteRes.data || []);
    } catch (error) {
      toast.error('Failed to load trip details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCheckItem = async (e) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;
    try {
      const res = await checklistService.addItem({ trip_id: id, task: newCheckItem });
      setChecklist([...checklist, res.data]);
      setNewCheckItem('');
      toast.success('Task added');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const toggleCheckItem = async (item) => {
    try {
      const res = await checklistService.updateItem(item.id, { is_completed: !item.is_completed });
      setChecklist(checklist.map(i => i.id === item.id ? res.data : i));
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;
    try {
      const res = await noteService.addNote({ trip_id: id, ...newNote });
      setNotes([...notes, res.data]);
      setNewNote({ title: '', content: '' });
      toast.success('Note added');
    } catch (error) {
      toast.error('Failed to add note');
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-bg-main min-h-screen">
        <div className="container">
          <div className="space-y-8 animate-pulse">
            <div className="h-12 bg-border rounded-2xl w-48"></div>
            <div className="bento-item h-64 bg-bg-sub"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-border rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-bg-main min-h-screen">
      <div className="container px-4">
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 mb-10 md:mb-12">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 text-text-sub hover:text-text-main font-bold transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Return to Command Center
          </button>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <button 
              className="btn btn-ghost text-red-500 hover:bg-red-50 font-bold justify-center sm:justify-start" 
              onClick={async () => {
                if (window.confirm('Are you sure you want to archive this journey? This action cannot be undone.')) {
                  await tripService.delete(id);
                  navigate('/dashboard');
                }
              }}
            >
              <Trash2 size={18} />
              Archive Expedition
            </button>
            <button className="btn btn-primary px-6 md:px-8 py-3 shadow-lg shadow-blue-100 justify-center sm:justify-start">
              <Plus size={18} />
              Add Activity
            </button>
          </div>
        </div>

        {/* Trip Header Card */}
        <div className="bento-item bg-white mb-10 md:mb-12 overflow-hidden relative border-none shadow-xl">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12 p-6 md:p-8 lg:p-10">
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight text-balance">
                  {trip.name}
                </h1>
                <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap w-fit">
                  {trip.status || 'Active Expedition'}
                </span>
              </div>
              <p className="text-text-sub font-medium text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 max-w-3xl">
                {trip.description || 'No detailed briefing provided for this expedition. Start documenting your travel goals to optimize your experience.'}
              </p>
              <div className="flex flex-wrap gap-6 md:gap-10">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-sub rounded-xl md:rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <Calendar size={window.innerWidth < 768 ? 20 : 24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Timeframe</p>
                    <p className="text-sm md:text-base font-extrabold text-text-main">
                      {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-sub rounded-xl md:rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <MapPin size={window.innerWidth < 768 ? 20 : 24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Logistics</p>
                    <p className="text-sm md:text-base font-extrabold text-text-main">
                      {trip.Stops?.length || 0} Critical Waypoints
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 h-48 md:h-64 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0">
               <img 
                 src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800" 
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                 alt="Expedition Visual"
                 loading="lazy"
               />
            </div>
          </div>
        </div>

        {/* Tab System */}
        <div className="flex items-center gap-6 md:gap-10 mb-8 md:mb-10 border-b border-border overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'stops', icon: MapPin, label: 'Itinerary' },
            { id: 'budget', icon: DollarSign, label: 'Financials' },
            { id: 'checklist', icon: CheckSquare, label: 'Preparation' },
            { id: 'notes', icon: FileText, label: 'Briefing' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 md:pb-5 text-sm font-extrabold transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-primary' : 'text-text-muted hover:text-text-main'}`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
              {activeTab === tab.id && <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[500px]">
          {activeTab === 'stops' && (
            <div className="max-w-4xl mx-auto py-10">
              <div className="relative space-y-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {trip.Stops?.length === 0 ? (
                  <div className="text-center py-20 bento-item border-dashed bg-bg-sub/50">
                    <p className="text-text-sub font-bold">Your itinerary timeline is empty. Add your first destination to begin.</p>
                  </div>
                ) : (
                  trip.Stops?.map((stop, index) => (
                    <motion.div 
                      key={stop.id} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-16 group"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-white border-2 border-border flex items-center justify-center text-text-main font-black group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        {index + 1}
                      </div>
                      
                      <div className="bento-item bg-white flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden bg-bg-sub flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=300`} className="w-full h-full object-cover" alt="Destination" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-extrabold text-text-main">{stop.City?.name}, {stop.City?.country}</h3>
                            <div className="flex items-center gap-1">
                              <button className="p-2 text-text-muted hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-text-sub uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> Arrival: {new Date(stop.start_date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> Departure: {new Date(stop.end_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="w-full md:w-auto">
                          <button className="btn btn-ghost border border-border w-full md:w-auto font-bold px-6">Manage Activities</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                <div className="pl-16">
                  <button className="btn btn-primary bg-bg-sub text-text-main hover:bg-primary hover:text-white border-dashed border-border py-6 w-full flex justify-center text-lg shadow-none">
                    <Plus size={24} /> Add Destination
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <div className="bento-item bg-white shadow-lg border-none p-10">
                  <h2 className="text-3xl font-extrabold text-text-main mb-12">Financial Summary</h2>
                  {!budget ? (
                    <div className="text-center py-20 bg-bg-sub/30 rounded-[3rem] border-2 border-dashed border-border">
                      <p className="text-text-sub font-bold mb-10">No budget tracking active for this journey.</p>
                      <button className="btn btn-primary px-12 py-4">Initialize Ledger</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="p-10 bg-text-main rounded-[3rem] text-white flex flex-col justify-between min-h-[250px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] group-hover:bg-primary/40 transition-all duration-700"></div>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Total Liquidity</span>
                        <div className="text-6xl font-black mb-6">${budget.total_budget.toLocaleString()}</div>
                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                           <Zap size={14} /> Within Projected Limits
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="p-8 bg-bg-sub rounded-[2.5rem] flex justify-between items-center group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-border">
                          <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Transit</p>
                            <p className="text-2xl font-black text-text-main">${budget.transport_cost.toLocaleString()}</p>
                          </div>
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors"><Clock size={24} /></div>
                        </div>
                        <div className="p-8 bg-bg-sub rounded-[2.5rem] flex justify-between items-center group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-border">
                          <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Accommodation</p>
                            <p className="text-2xl font-black text-text-main">${budget.accommodation_cost.toLocaleString()}</p>
                          </div>
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors"><Globe size={24} /></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bento-item bg-white border-none shadow-lg p-10 h-fit sticky top-32">
                 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm">
                    <Zap size={32} />
                 </div>
                 <h3 className="text-2xl font-black text-text-main mb-6 leading-tight">Expert <br />Budgetary Insight</h3>
                 <p className="text-text-sub font-medium leading-relaxed mb-10">Based on your waypoints, we recommend an additional <span className="text-primary font-black">$450 safety buffer</span> for local experiences and contingencies in {trip.Stops?.[0]?.City?.name || 'this region'}.</p>
                 <button className="btn btn-primary w-full py-4 justify-center">View Suggestions</button>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="max-w-4xl mx-auto py-10">
              <div className="bento-item bg-white shadow-xl border-none p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="text-3xl font-extrabold text-text-main mb-2">Preparation Pipeline</h2>
                    <p className="text-text-sub font-medium">Coordinate your pre-departure operations.</p>
                  </div>
                  <div className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                    {checklist.filter(i => i.is_completed).length} / {checklist.length} Finalized
                  </div>
                </div>
                
                <form onSubmit={handleAddCheckItem} className="flex gap-4 mb-12">
                  <input 
                    type="text" 
                    className="form-input flex-grow py-5 px-6 text-base" 
                    placeholder="E.g. Secure visa documentation for Japan..."
                    value={newCheckItem}
                    onChange={(e) => setNewCheckItem(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary px-10 shadow-lg shadow-blue-100">Add Task</button>
                </form>

                <div className="space-y-4">
                  {checklist.map((item) => (
                    <motion.div 
                      key={item.id} 
                      className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${item.is_completed ? 'bg-bg-sub/50 border-transparent opacity-60' : 'bg-white border-border hover:border-primary shadow-sm'}`}
                    >
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => toggleCheckItem(item)} 
                          className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${item.is_completed ? 'bg-primary border-primary text-white' : 'border-border bg-white group-hover:border-primary'}`}
                        >
                          {item.is_completed && <Check size={18} strokeWidth={4} />}
                        </button>
                        <span className={`text-lg font-bold ${item.is_completed ? 'line-through text-text-muted' : 'text-text-main'}`}>{item.task}</span>
                      </div>
                      <button className="text-text-muted opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all p-3"><Trash2 size={20} /></button>
                    </motion.div>
                  ))}
                  {checklist.length === 0 && (
                    <div className="text-center py-20 bg-bg-sub/30 rounded-[3rem] border-2 border-dashed border-border">
                      <p className="text-text-muted font-bold text-sm uppercase tracking-widest">No active preparation tasks</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {notes.map((note) => (
                  <motion.div key={note.id} className="bento-item bg-white shadow-lg hover:shadow-2xl hover:border-primary transition-all flex flex-col p-8">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="font-black text-text-main text-xl">{note.title}</h3>
                      <button className="text-text-muted hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
                    </div>
                    <p className="text-text-sub font-medium text-base leading-relaxed whitespace-pre-wrap mb-10 flex-grow">{note.content}</p>
                    <div className="pt-6 border-t border-border flex justify-between items-center">
                       <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Internal Intelligence</span>
                       <div className="w-8 h-8 bg-bg-sub rounded-lg flex items-center justify-center text-text-muted">
                        <FileText size={16} />
                       </div>
                    </div>
                  </motion.div>
                ))}
                {notes.length === 0 && (
                  <div className="md:col-span-2 text-center py-24 bg-bg-sub/30 rounded-[3rem] border-2 border-dashed border-border">
                    <p className="text-text-sub font-bold">No intelligence recorded for this expedition.</p>
                  </div>
                )}
              </div>
              
              <div className="bento-item bg-white border-none shadow-2xl p-10 h-fit sticky top-32">
                <h3 className="text-2xl font-black text-text-main mb-3">Record Intelligence</h3>
                <p className="text-text-sub font-medium mb-10 text-sm">Document critical observations for your team.</p>
                <form onSubmit={handleAddNote} className="space-y-8">
                  <div className="input-group">
                    <label className="input-label">Memo Header</label>
                    <input 
                      type="text" 
                      className="form-input py-4" 
                      placeholder="E.g. Logistics & Customs"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Content Intelligence</label>
                    <textarea 
                      className="form-input min-h-[200px] resize-none py-4" 
                      placeholder="Enter detailed observation data..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-5 text-base justify-center shadow-lg shadow-blue-100">Commit to Intel Record</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
