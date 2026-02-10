import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { Trash2, Plus, LogOut, LayoutGrid, MessageSquare, Pencil, Loader2, Search, Activity, Database, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm.jsx';
import TestimonialForm from './TestimonialForm.jsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'testimonials'
  const [dataList, setDataList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dashboard Stats
  const [stats, setStats] = useState({ projects: 0, testimonials: 0 });

  const navigate = useNavigate();

  // Security Check & Initial Load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/admin');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  // Fetch data when tab changes or after auth is confirmed
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      fetchStats();
    }
  }, [activeTab, isAuthenticated]);

  const fetchStats = async () => {
    const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    const { count: testimonialCount } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });
    setStats({ projects: projectCount || 0, testimonials: testimonialCount || 0 });
  };

  const fetchData = async () => {
    const table = activeTab === 'projects' ? 'projects' : 'testimonials';
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (!error) setDataList(data || []);
  };

  const deleteItem = async (id) => {
    if(!confirm("Warning: Permanent deletion imminent. Proceed?")) return;
    
    const table = activeTab === 'projects' ? 'projects' : 'testimonials';
    const { error } = await supabase.from(table).delete().eq('id', id);
    
    if (!error) {
      fetchData();
      fetchStats();
    } else {
      alert("Deletion failed: " + error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // Filtered List based on Search
  const filteredList = dataList.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    if (activeTab === 'projects') {
      return item.title?.toLowerCase().includes(searchLower) || item.category?.toLowerCase().includes(searchLower);
    } else {
      return item.name?.toLowerCase().includes(searchLower) || item.role?.toLowerCase().includes(searchLower);
    }
  });

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
            <Loader2 size={32} className="animate-spin text-cyan-500" />
            <span className="text-zinc-500 text-sm tracking-widest">VERIFYING CREDENTIALS...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-mono relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-800 pb-6 gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
              ADMIN <span className="text-cyan-500">//</span> CONSOLE
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500 uppercase tracking-widest">
               <span className="flex items-center gap-1"><Server size={10} className="text-green-500" /> System Online</span>
               <span className="flex items-center gap-1"><Database size={10} className="text-cyan-500" /> DB Connected</span>
            </div>
          </div>
          
          <div className="flex gap-4 items-center w-full md:w-auto justify-between md:justify-end">
             {/* Stats HUD */}
             <div className="hidden md:flex gap-4 mr-4">
                <div className="text-right">
                   <p className="text-[10px] text-zinc-500 uppercase">Projects</p>
                   <p className="text-xl font-bold text-cyan-400 leading-none">{stats.projects}</p>
                </div>
                <div className="w-px bg-zinc-800 h-8"></div>
                <div className="text-right">
                   <p className="text-[10px] text-zinc-500 uppercase">Feedback</p>
                   <p className="text-xl font-bold text-fuchsia-500 leading-none">{stats.testimonials}</p>
                </div>
             </div>

            <button onClick={handleLogout} className="flex items-center gap-2 border border-zinc-800 hover:bg-red-950/30 hover:border-red-500/50 hover:text-red-400 p-2 px-4 text-zinc-400 transition-all rounded text-xs font-bold uppercase tracking-wider">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
           <div className="bg-zinc-900/50 border border-zinc-800 p-1 flex rounded-lg self-start">
               <button 
                onClick={() => setActiveTab('projects')}
                className={`px-6 py-2 text-xs font-bold uppercase flex items-center gap-2 transition-all rounded-md ${activeTab === 'projects' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
               >
                 <LayoutGrid size={14} /> Projects
               </button>
               <button 
                onClick={() => setActiveTab('testimonials')}
                className={`px-6 py-2 text-xs font-bold uppercase flex items-center gap-2 transition-all rounded-md ${activeTab === 'testimonials' ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/20' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
               >
                 <MessageSquare size={14} /> Feedback
               </button>
           </div>

           {/* Search Bar */}
           <div className="flex-grow relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-cyan-500 transition-colors">
                 <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/30 border border-zinc-800 focus:border-cyan-500 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all"
              />
           </div>
        </div>

        {/* Content Area */}
        <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-xl p-1 overflow-hidden min-h-[400px]">
          <div className="flex justify-between items-center p-4 border-b border-zinc-800/50 bg-zinc-900/30">
            <h2 className="text-sm font-bold uppercase text-zinc-400 flex items-center gap-2">
                <Activity size={14} className={activeTab === 'projects' ? 'text-cyan-500' : 'text-fuchsia-500'} />
                Active Records: <span className="text-white">{filteredList.length}</span>
            </h2>
            <button 
              onClick={handleAddNew}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded transition-all hover:scale-105 ${activeTab === 'projects' ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-fuchsia-500 text-white hover:bg-fuchsia-400'}`}
            >
              <Plus size={14} /> New Entry
            </button>
          </div>

          <div className="grid gap-1 p-1">
            {filteredList.map((item) => (
              <div key={item.id} className="bg-zinc-900/40 border border-zinc-800/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-zinc-800/40 hover:border-zinc-700 transition-all group rounded-lg gap-4">
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  {/* Image preview only for projects */}
                  {activeTab === 'projects' && (
                    <div className="w-16 h-12 bg-black border border-zinc-800 rounded overflow-hidden flex-shrink-0 relative">
                        {item.image_url ? (
                           <img src={item.image_url} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-zinc-700"><LayoutGrid size={16}/></div>
                        )}
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {activeTab === 'projects' ? item.title : item.name}
                    </h3>
                    <div className="text-[10px] text-zinc-500 uppercase flex flex-wrap gap-2 mt-1">
                       <span className="bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-800">ID: {item.id}</span>
                       <span className="text-zinc-600">//</span>
                       <span className={activeTab === 'projects' ? 'text-cyan-600' : 'text-fuchsia-600'}>
                          {activeTab === 'projects' ? item.category : item.role}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="px-3 py-2 text-xs font-bold uppercase bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-900 rounded transition-colors flex items-center gap-2"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="px-3 py-2 text-xs font-bold uppercase bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-900 rounded transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
            
            {filteredList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                  <div className="p-4 bg-zinc-900/50 rounded-full mb-4 border border-zinc-800 border-dashed">
                     <Search size={24} />
                  </div>
                  <p className="text-xs uppercase tracking-widest">No matching records found</p>
                  <p className="text-[10px] mt-1 text-zinc-700">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Modals */}
        {isModalOpen && activeTab === 'projects' && (
          <ProjectForm 
            onClose={() => setIsModalOpen(false)} 
            onSaved={() => { fetchData(); fetchStats(); }}
            initialData={editingItem}
          />
        )}

        {isModalOpen && activeTab === 'testimonials' && (
          <TestimonialForm 
            onClose={() => setIsModalOpen(false)} 
            onSaved={() => { fetchData(); fetchStats(); }}
            initialData={editingItem}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;