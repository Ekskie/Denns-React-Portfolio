import React, { useState, useEffect } from 'react';
import { Layers, Code, Gamepad2, PenTool, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient.js'; 
import ProjectCard from '../ui/ProjectCard.jsx';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Fetch data on load
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error) {
        setProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);
  
  const categories = [
    { id: 'All', label: 'All Systems', icon: Layers },
    { id: 'Web Dev', label: 'Web Apps', icon: Code },
    { id: 'Game/App', label: 'Game Dev', icon: Gamepad2 },
    { id: 'Product Design', label: 'Design', icon: PenTool },
  ];
  
  // Filter logic
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(filter) || (filter === 'Game/App' && (p.category.includes('Game') || p.category.includes('3D'))));

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-black relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      
      {/* Decorative Side Elements */}
      <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
      <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800/50 pb-8 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers size={20} className="text-cyan-500" />
              <h2 className="text-sm font-bold font-mono text-cyan-500 uppercase tracking-widest">System Worklog</h2>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Works</span>
            </h2>
          </div>
          
          {/* HUD Filter Control */}
          <div className="bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 backdrop-blur-sm flex flex-wrap gap-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`
                    relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-2 transition-all duration-300
                    ${filter === cat.id 
                        ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }
                `}
              >
                <cat.icon size={14} className={filter === cat.id ? 'text-cyan-400' : 'text-zinc-600'} />
                {cat.label}
                {filter === cat.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_rgba(6,182,212,0.8)]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 mb-6 uppercase tracking-widest">
            <Filter size={10} />
            <span>Filter Active: {filter}</span>
            <span className="text-zinc-800">|</span>
            <span>Count: {filteredProjects.length}</span>
        </div>

        {/* Loading State */}
        {loading ? (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
               <div className="w-10 h-10 border-t-2 border-r-2 border-cyan-500 rounded-full animate-spin mb-4"></div>
               <div className="text-cyan-500 font-mono text-xs animate-pulse tracking-widest">ESTABLISHING DATABASE UPLINK...</div>
            </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {!loading && filteredProjects.length === 0 && (
                <div className="col-span-full h-48 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl">
                    <div className="text-zinc-500 font-mono">NO ENTRIES FOUND FOR FILTER: "{filter}"</div>
                    <button onClick={() => setFilter('All')} className="text-cyan-500 text-sm mt-2 hover:underline">RESET PROTOCOLS</button>
                </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;