import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => (
  <div className="group relative clip-polygon overflow-hidden transition-all duration-300 h-full flex flex-col border
    bg-white border-zinc-200 hover:border-cyan-600/50 hover:shadow-[0_0_30px_rgba(8,145,178,0.15)]
    dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-cyan-500/50 dark:hover:shadow-none">
    
    {/* Hover Overlay Effect 
        Light: Very subtle tint
        Dark: Visible glow tint
    */}
    <div className="absolute inset-0 transition-opacity z-10 pointer-events-none opacity-0 group-hover:opacity-100
      bg-cyan-600/5 dark:bg-cyan-500/10">
    </div>
    
    {/* Bottom Gradient Line 
        Light: Cyan to Fuchsia (Saturated)
        Dark: Cyan to Fuchsia (Neon)
    */}
    <div className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20
      bg-gradient-to-r from-cyan-600 to-fuchsia-600
      dark:from-cyan-500 dark:to-fuchsia-500">
    </div>

    <div className="relative aspect-video overflow-hidden border-b
      border-zinc-200 dark:border-zinc-800">
      <img 
        src={project.image_url} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 
          grayscale opacity-90 group-hover:opacity-100
          dark:opacity-80 dark:group-hover:opacity-100"
      />
      
      {/* Category Badge */}
      <div className="absolute top-2 right-2 backdrop-blur text-xs font-mono px-2 py-1 border
        bg-white/90 text-cyan-700 border-cyan-600/30
        dark:bg-black/80 dark:text-cyan-400 dark:border-cyan-500/30">
        {project.category}
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow relative z-20">
      <h3 className="text-2xl font-black mb-2 uppercase italic tracking-wider
        text-zinc-900 dark:text-white">
        {project.title}
      </h3>
      
      <p className="text-sm mb-6 font-mono leading-relaxed flex-grow
        text-zinc-600 dark:text-gray-400">
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
          {project.tech.map(t => (
            <span key={t} className="text-[10px] font-bold uppercase transition-colors
              text-zinc-400 group-hover:text-zinc-800
              dark:text-zinc-500 dark:group-hover:text-zinc-300">
              #{t}
            </span>
          ))}
        </div>
        
        {/* Link Button */}
        <a href={project.link} className="p-3 clip-polygon transition-colors
          bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-900
          dark:bg-zinc-800 dark:hover:bg-white dark:hover:text-black dark:text-white">
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;