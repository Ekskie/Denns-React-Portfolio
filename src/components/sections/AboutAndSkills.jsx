import React from 'react';
import { Mail, Github, Cpu, Zap, Gamepad2, Terminal } from 'lucide-react';
import { TECH_STACK } from '../../data/mockData';

const AboutAndSkills = () => {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fuchsia-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Character Bio */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-20 bg-cyan-500"></div>
            <h2 className="text-sm font-bold font-mono text-cyan-500 uppercase tracking-widest mb-2 ml-4">About Me</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-8 ml-4">
              CREATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">TECHNOLOGIST</span>
            </h3>
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 clip-polygon-card backdrop-blur-sm relative">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-fuchsia-500"></div>

              <div className="prose prose-invert text-gray-400 leading-relaxed space-y-4 font-mono text-sm md:text-base">
                <p>
                  I am a passionate developer who bridges the gap between <strong className="text-white">logic and creativity</strong>. 
                  I design, code, and create game art to build immersive digital experiences.
                </p>
                <p>
                  Whether it's crafting high-performance web applications or building interactive game worlds, 
                  my goal is to push the boundaries of what's possible in the digital realm.
                </p>
              </div>
              
              <div className="mt-8">
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Connect</h4>
                 <div className="flex gap-4">
                    <a href="mailto:dennrick05@gmail.com" className="p-2 bg-zinc-800 hover:bg-red-500 hover:text-white transition-colors rounded">
                      <Mail size={20} />
                    </a>
                    <a href="https://github.com/Ekskie" className="p-2 bg-zinc-800 hover:bg-white hover:text-black transition-colors rounded">
                      <Github size={20} />
                    </a>
                 </div>
              </div>
            </div>
          </div>

          {/* New Stats & Tech Stack (Replaces Proficiency Bars) */}
          <div className="relative">
            <div className="bg-black border border-zinc-800 p-8 clip-polygon relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Header HUD */}
              <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-sm text-gray-400 uppercase">My Arsenal</span>
                </div>
                <Cpu className="text-zinc-600 animate-spin-slow" />
              </div>

              {/* Works Counter */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-zinc-900/50 p-4 border-l-2 border-cyan-500">
                    <div className="text-4xl font-black text-white mb-1">20+</div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">Works Delivered</div>
                 </div>
                 <div className="bg-zinc-900/50 p-4 border-l-2 border-fuchsia-500">
                    <div className="text-4xl font-black text-white mb-1">3+</div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">Years Active</div>
                 </div>
              </div>

              {/* Current Focus */}
              <div className="mb-8">
                <h4 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Zap size={14} className="text-yellow-500" /> Current Focus
                </h4>
                <div className="space-y-3 text-sm text-gray-300 font-mono">
                   <div className="flex items-center gap-3">
                      <Gamepad2 size={16} className="text-blue-400" />
                      <span>Developing a game using <strong className="text-white">Godot 4.5</strong></span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Terminal size={16} className="text-green-400" />
                      <span>Building web apps with <strong className="text-white">Flask & Supabase</strong></span>
                   </div>
                </div>
              </div>

              {/* Tech Stack Grid */}
              <div>
                <h4 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TECH_STACK.map((tech) => (
                    <div key={tech.name} className={`bg-zinc-900 border ${tech.border} p-3 flex flex-col items-center justify-center gap-2 hover:bg-zinc-800 transition-colors group cursor-default`}>
                      <tech.icon size={24} className={`${tech.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-[10px] font-mono text-gray-400 uppercase text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutAndSkills;
