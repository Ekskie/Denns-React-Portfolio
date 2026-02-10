import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Maximize2, Terminal, Code2, Layers, Github, Cpu } from 'lucide-react';
import { createPortal } from 'react-dom';

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 selection:bg-cyan-500/30">
        {children}
      </div>
    </div>,
    document.body
  );
};

// --- Main Project Card ---
const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to handle external link click without opening modal
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* --- Card View (Your Custom Design) --- */}
      <div 
        className="group relative clip-polygon overflow-hidden transition-all duration-300 h-full flex flex-col border
          bg-white border-zinc-200 hover:border-cyan-600/50 hover:shadow-[0_0_30px_rgba(8,145,178,0.15)]
          dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-cyan-500/50 dark:hover:shadow-none cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        
        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 transition-opacity z-10 pointer-events-none opacity-0 group-hover:opacity-100
          bg-cyan-600/5 dark:bg-cyan-500/10">
        </div>
        
        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20
          bg-gradient-to-r from-cyan-600 to-fuchsia-600
          dark:from-cyan-500 dark:to-fuchsia-500">
        </div>

        <div className="relative aspect-video overflow-hidden border-b
          border-zinc-200 dark:border-zinc-800">
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 
              opacity-90 group-hover:opacity-100
              dark:opacity-80 dark:group-hover:opacity-100"
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 right-2 backdrop-blur text-xs font-mono px-2 py-1 border
            bg-white/90 text-cyan-700 border-cyan-600/30
            dark:bg-black/80 dark:text-cyan-400 dark:border-cyan-500/30 z-20">
            {project.category}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/50 text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                 <Maximize2 size={14} /> View Case Study
              </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow relative z-20">
          <h3 className="text-2xl font-black mb-2 uppercase italic tracking-wider
            text-zinc-900 dark:text-white">
            {project.title}
          </h3>
          
          <p className="text-sm mb-6 font-mono leading-relaxed flex-grow
            text-zinc-600 dark:text-gray-400 line-clamp-3">
            {project.description}
          </p>

          {/* Mini Stats for Project */}
          {project.stats && (
            <div className="grid grid-cols-2 gap-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              {Object.entries(project.stats).map(([key, val]) => (
                <div key={key} className="flex justify-between text-[10px] font-mono uppercase px-2 py-1
                  bg-zinc-100 dark:bg-black/30">
                  <span className="text-zinc-500 dark:text-gray-500">{key}</span>
                  <span className="font-bold text-cyan-700 dark:text-cyan-400">{val}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-end mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.tech && project.tech.map(t => (
                <span key={t} className="text-[10px] font-bold uppercase transition-colors
                  text-zinc-400 group-hover:text-zinc-800
                  dark:text-zinc-500 dark:group-hover:text-zinc-300">
                  #{t}
                </span>
              ))}
            </div>
            
            {/* Link Button */}
            <a 
              href={project.link} 
              onClick={handleLinkClick}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 clip-polygon transition-colors
              bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-900
              dark:bg-zinc-800 dark:hover:bg-white dark:hover:text-black dark:text-white"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* --- Modal View --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col relative bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white min-h-full">
          
          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-xl font-bold font-mono tracking-tight uppercase">
                Project_Log: <span className="text-cyan-600 dark:text-cyan-400">{project.title}</span>
              </h2>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-0">
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 w-full overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-black to-transparent z-10" />
               <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 md:left-10 z-20">
                 <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech && project.tech.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-black/70 backdrop-blur text-cyan-400 border border-cyan-500/30 rounded text-xs font-mono uppercase tracking-wider shadow-lg">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-8 p-6 md:p-10 -mt-20 relative z-20">
              
              {/* Main Story Column */}
              <div className="md:col-span-2 space-y-8">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-xl">
                  <div className="flex items-center gap-2 mb-6 text-zinc-400 font-mono text-sm uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <Layers size={16} />
                    <span>Mission Brief</span>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-line text-zinc-700 dark:text-zinc-300">
                      {project.story || project.description}
                    </p>
                  </div>
                </div>

                {/* Gallery Grid - Checks if gallery exists, otherwise could show placeholders or nothing */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="space-y-4">
                     <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <Maximize2 size={16} /> System Visuals
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.gallery.map((img, idx) => (
                          <div key={idx} className="group relative aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                             <img 
                              src={img} 
                              alt={`Gallery ${idx}`} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                             />
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              {/* Sidebar / Actions */}
              <div className="space-y-6">
                <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sticky top-24">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Code2 size={20} className="text-fuchsia-500" />
                    Deployment Status
                  </h3>
                  
                  {project.stats && (
                    <div className="mb-6 space-y-2">
                       {Object.entries(project.stats).map(([key, val]) => (
                         <div key={key} className="flex justify-between items-center text-sm font-mono border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0">
                           <span className="text-zinc-500 uppercase">{key}</span>
                           <span className="text-zinc-900 dark:text-white font-bold">{val}</span>
                         </div>
                       ))}
                    </div>
                  )}

                  <div className="space-y-4">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider rounded transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                    >
                      <ExternalLink size={18} />
                      Initialize Demo
                    </a>
                    
                    {project.repo_link && (
                        <a 
                        href={project.repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold uppercase tracking-wider rounded transition-all border border-zinc-300 dark:border-zinc-700"
                        >
                        <Github size={18} />
                        Access Source
                        </a>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                       <div className="flex items-center gap-2 text-zinc-500">
                          <Cpu size={14} />
                          <span className="text-xs uppercase">Stack Analysis</span>
                       </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                         {project.tech && project.tech.map(t => (
                            <span key={t} className="text-[10px] px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400 font-mono">
                                {t}
                            </span>
                         ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;