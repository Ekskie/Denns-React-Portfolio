import React, { useEffect, useState } from 'react';
// Using explicit paths from root to ensure resolution
import { supabase } from '../../../src/lib/supabaseClient.js';
import { Trash2, Plus, LogOut, LayoutGrid, MessageSquare, Pencil, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../../src/components/admin/ProjectForm.jsx';
import TestimonialForm from '../../../src/components/admin/TestimonialForm.jsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'testimonials'
  const [dataList, setDataList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Track item being edited
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Security Check & Initial Load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // No active session, redirect to login
          navigate('/admin');
        } else {
          // Session valid, allow access
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
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = async () => {
    const table = activeTab === 'projects' ? 'projects' : 'testimonials';
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (!error) setDataList(data);
  };

  const deleteItem = async (id) => {
    if(!confirm("Warning: Permanent deletion imminent. Proceed?")) return;
    
    const table = activeTab === 'projects' ? 'projects' : 'testimonials';
    const { error } = await supabase.from(table).delete().eq('id', id);
    
    if (!error) fetchData();
    else alert("Deletion failed: " + error.message);
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

  // Prevent rendering if not authenticated (extra safety layer)
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-zinc-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black text-cyan-400 tracking-tighter">ADMIN // CONSOLE</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest">System Management Interface</p>
          </div>
          
          <div className="flex gap-4 items-center">
             <div className="bg-zinc-900 border border-zinc-800 p-1 flex rounded">
               <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 text-xs font-bold uppercase flex items-center gap-2 transition-colors ${activeTab === 'projects' ? 'bg-cyan-600 text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 <LayoutGrid size={14} /> Projects
               </button>
               <button 
                onClick={() => setActiveTab('testimonials')}
                className={`px-4 py-2 text-xs font-bold uppercase flex items-center gap-2 transition-colors ${activeTab === 'testimonials' ? 'bg-fuchsia-600 text-white' : 'text-gray-400 hover:text-white'}`}
               >
                 <MessageSquare size={14} /> Feedback
               </button>
             </div>

            <button onClick={handleLogout} className="border border-zinc-700 hover:bg-red-500 hover:text-white hover:border-red-500 p-2 text-gray-400 transition-colors rounded">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold uppercase text-gray-300">
                Database: <span className={activeTab === 'projects' ? 'text-cyan-400' : 'text-fuchsia-500'}>{activeTab}</span>
            </h2>
            <button 
              onClick={handleAddNew}
              className={`px-4 py-2 text-sm font-bold flex items-center gap-2 clip-polygon transition-all hover:scale-105 ${activeTab === 'projects' ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-fuchsia-500 text-white hover:bg-fuchsia-400'}`}
            >
              <Plus size={16} /> Add Entry
            </button>
          </div>

          <div className="grid gap-3">
            {dataList.map((item) => (
              <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 p-4 flex justify-between items-center hover:border-zinc-600 transition-colors group">
                <div className="flex gap-4 items-center">
                  {/* Image preview only for projects */}
                  {activeTab === 'projects' && item.image_url && (
                    <img src={item.image_url} alt="" className="w-16 h-12 object-cover bg-black border border-zinc-700 grayscale group-hover:grayscale-0 transition-all" />
                  )}
                  
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {activeTab === 'projects' ? item.title : item.name}
                    </h3>
                    <div className="text-xs text-zinc-500 uppercase flex gap-2">
                       <span>ID: {item.id}</span>
                       <span>//</span>
                       <span>{activeTab === 'projects' ? item.category : item.role}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-3 text-cyan-500 hover:bg-cyan-500/10 rounded transition-colors"
                    title="Edit Entry"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            {dataList.length === 0 && (
              <div className="text-center py-20 border border-dashed border-zinc-800 text-gray-600">
                  NO ARTIFACTS FOUND IN SECTOR
              </div>
            )}
          </div>
        </div>
        
        {/* Modals */}
        {isModalOpen && activeTab === 'projects' && (
          <ProjectForm 
            onClose={() => setIsModalOpen(false)} 
            onSaved={fetchData} 
            initialData={editingItem} // Pass the item to edit
          />
        )}

        {isModalOpen && activeTab === 'testimonials' && (
          <TestimonialForm 
            onClose={() => setIsModalOpen(false)} 
            onSaved={fetchData}
            initialData={editingItem} // Pass the item to edit
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;