import React from 'react';
import { Mail, Github, Cpu, Zap, Gamepad2, Terminal } from 'lucide-react';
import { TECH_STACK } from '../../data/mockData';

const AboutAndSkills = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden transition-colors duration-500
      bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900">
      
      {/* Background Atmosphere - Grid Pattern 
          Light: Subtle gray grid
          Dark: Subtle dark gray grid
      */}
      <div className="absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-30
        bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
        dark:bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)]">
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none
        bg-gradient-to-l from-fuchsia-100/50 to-transparent
        dark:from-fuchsia-900/10">
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none
        bg-cyan-100/50 dark:bg-cyan-900/10">
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Character Bio */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-20 
              bg-cyan-600 dark:bg-cyan-500">
            </div>
            <h2 className="text-sm font-bold font-mono uppercase tracking-widest mb-2 ml-4
              text-cyan-700 dark:text-cyan-500">
              About Me
            </h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 ml-4
              text-zinc-900 dark:text-white">
              CREATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r 
                from-cyan-600 to-fuchsia-600
                dark:from-cyan-400 dark:to-fuchsia-500">TECHNOLOGIST</span>
            </h3>
            
            <div className="border p-8 clip-polygon-card backdrop-blur-sm relative transition-colors duration-300
              bg-white/80 border-zinc-200
              dark:bg-zinc-900/50 dark:border-zinc-800">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 
                border-cyan-600 dark:border-cyan-500">
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 
                border-fuchsia-600 dark:border-fuchsia-500">
              </div>

              <div className="prose dark:prose-invert leading-relaxed space-y-4 font-mono text-sm md:text-base
                text-zinc-600 dark:text-gray-400">
                <p>
                  I am a passionate developer who bridges the gap between <strong className="text-zinc-900 dark:text-white">logic and creativity</strong>. 
                  I design, code, and create game art to build immersive digital experiences.
                </p>
                <p>
                  Whether it's crafting high-performance web applications or building interactive game worlds, 
                  my goal is to push the boundaries of what's possible in the digital realm.
                </p>
              </div>
              
              <div className="mt-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3
                    text-zinc-500 dark:text-zinc-500">Connect</h4>
                  <div className="flex gap-4">
                    <a href="mailto:dennrick05@gmail.com" className="p-2 transition-colors rounded
                      bg-zinc-100 text-zinc-600 hover:bg-red-500 hover:text-white
                      dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-red-500 dark:hover:text-white">
                      <Mail size={20} />
                    </a>
                    <a href="https://github.com/Ekskie" className="p-2 transition-colors rounded
                      bg-zinc-100 text-zinc-600 hover:bg-black hover:text-white
                      dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-white dark:hover:text-black">
                      <Github size={20} />
                    </a>
                  </div>
              </div>
            </div>
          </div>

          {/* New Stats & Tech Stack */}
          <div className="relative">
            <div className="border p-8 clip-polygon relative shadow-lg
              bg-white border-zinc-200 shadow-zinc-200/50
              dark:bg-black dark:border-zinc-800 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              
              {/* Header HUD */}
              <div className="flex justify-between items-center mb-8 border-b pb-4
                border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full animate-pulse
                    bg-cyan-600 dark:bg-cyan-500"></div>
                  <span className="font-mono text-sm uppercase
                    text-zinc-500 dark:text-gray-400">My Arsenal</span>
                </div>
                <Cpu className="animate-spin-slow
                  text-zinc-400 dark:text-zinc-600" />
              </div>

              {/* Works Counter */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="p-4 border-l-2
                   bg-zinc-50 border-cyan-600
                   dark:bg-zinc-900/50 dark:border-cyan-500">
                    <div className="text-4xl font-black mb-1
                      text-zinc-900 dark:text-white">20+</div>
                    <div className="text-xs font-mono uppercase tracking-wider
                      text-zinc-500 dark:text-gray-500">Works Delivered</div>
                 </div>
                 <div className="p-4 border-l-2
                   bg-zinc-50 border-fuchsia-600
                   dark:bg-zinc-900/50 dark:border-fuchsia-500">
                    <div className="text-4xl font-black mb-1
                      text-zinc-900 dark:text-white">3+</div>
                    <div className="text-xs font-mono uppercase tracking-wider
                      text-zinc-500 dark:text-gray-500">Years Active</div>
                 </div>
              </div>

              {/* Current Focus */}
              <div className="mb-8">
                <h4 className="text-xs font-bold font-mono uppercase tracking-widest mb-4 flex items-center gap-2
                  text-zinc-500 dark:text-gray-500">
                   <Zap size={14} className="text-yellow-500" /> Current Focus
                </h4>
                <div className="space-y-3 text-sm font-mono
                  text-zinc-600 dark:text-gray-300">
                   <div className="flex items-center gap-3">
                      <Gamepad2 size={16} className="text-blue-500 dark:text-blue-400" />
                      <span>Developing a game using <strong className="text-zinc-900 dark:text-white">Godot 4.5</strong></span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Terminal size={16} className="text-green-600 dark:text-green-400" />
                      <span>Building web apps with <strong className="text-zinc-900 dark:text-white">Flask & Supabase</strong></span>
                   </div>
                </div>
              </div>

              {/* Tech Stack Grid */}
              <div>
                <h4 className="text-xs font-bold font-mono uppercase tracking-widest mb-4
                  text-zinc-500 dark:text-gray-500">Tech Stack</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TECH_STACK.map((tech) => (
                    <div key={tech.name} className={`border ${tech.border} p-3 flex flex-col items-center justify-center gap-2 transition-colors group cursor-default
                      bg-zinc-50 hover:bg-zinc-100
                      dark:bg-zinc-900 dark:hover:bg-zinc-800`}>
                      <tech.icon size={24} className={`${tech.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-[10px] font-mono uppercase text-center
                        text-zinc-600 dark:text-gray-400">{tech.name}</span>
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