import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Trash2, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (!error) setProjects(data);
  };

  const deleteProject = async (id) => {
    if(!confirm("Destroy this project artifact?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) fetchProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-black text-cyan-400">ADMIN // CONSOLE</h1>
          <div className="flex gap-4">
            <button className="bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 text-sm font-bold flex items-center gap-2">
              <Plus size={16} /> New Project
            </button>
            <button onClick={handleLogout} className="border border-zinc-700 hover:bg-zinc-800 px-4 py-2 text-sm text-gray-400">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-zinc-900 border border-zinc-800 p-4 flex justify-between items-center hover:border-cyan-500/30 transition-colors">
              <div className="flex gap-4 items-center">
                <img src={project.image_url} alt="" className="w-16 h-16 object-cover bg-black" />
                <div>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <span className="text-xs text-zinc-500 uppercase">{project.category}</span>
                </div>
              </div>
              <button 
                onClick={() => deleteProject(project.id)}
                className="p-3 text-red-500 hover:bg-red-500/10 rounded transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">No projects found in database.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
