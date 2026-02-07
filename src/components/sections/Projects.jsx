import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient'; // Import client
// import { PROJECTS } from '../../data/mockData'; // DELETE THIS LINE
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]); // State for real data
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
  
  const categories = ['All', 'Web Dev', 'Game/App', 'Product Design'];
  
  // Filter logic
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category.includes(filter) || (filter === 'Game/App' && (p.category.includes('Game') || p.category.includes('3D'))));

  return (
    <section id="projects" className="py-24 bg-black relative">
      {/* ... keep existing background JSX ... */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ... keep existing header JSX ... */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers size={20} className="text-fuchsia-500" />
              <h2 className="text-sm font-bold font-mono text-fuchsia-500 uppercase tracking-widest">Featured Works</h2>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Project <span className="text-zinc-600">Gallery</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest clip-polygon transition-all ${
                  filter === cat 
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                    : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
           <div className="text-cyan-500 font-mono text-center">INITIALIZING DATABASE CONNECTION...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;