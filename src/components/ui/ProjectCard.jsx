import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => (
  <div className="group relative bg-zinc-900 border border-zinc-800 clip-polygon overflow-hidden hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col">
    {/* Hover Overlay Effect */}
    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

    <div className="relative aspect-video overflow-hidden border-b border-zinc-800">
      <img 
        src={project.image_url} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-xs font-mono px-2 py-1 text-cyan-400 border border-cyan-500/30">
        {project.category}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow relative z-20">
      <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-6 font-mono leading-relaxed flex-grow">
        {project.description}
      </p>

      {/* Mini Stats for Project */}
      {project.stats && (
        <div className="grid grid-cols-2 gap-2 mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
          {Object.entries(project.stats).map(([key, val]) => (
            <div key={key} className="flex justify-between text-[10px] font-mono uppercase bg-black/30 px-2 py-1">
              <span className="text-gray-500">{key}</span>
              <span className="text-cyan-400">{val}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-end mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] font-bold uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors">
              #{t}
            </span>
          ))}
        </div>
        <a href={project.link} className="p-3 bg-zinc-800 hover:bg-white hover:text-black text-white clip-polygon transition-colors">
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;
