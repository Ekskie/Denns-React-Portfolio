import React from 'react';
import { ChevronRight } from 'lucide-react';
import GlitchText from '../ui/GlitchText';
import ProfileAvatar from '../ui/ProfileAvatar'; // Assumed you extract Avatar too


const Hero = () => {
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black pt-28 pb-10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      {/* Grid Floor Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(6,182,212,0.1))] transform perspective-[500px] rotate-x-60 origin-bottom">
        <div className="w-full h-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#0e749020_1px,transparent_1px),linear-gradient(to_bottom,#0e749020_1px,transparent_1px)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Profile Picture Slot */}
        <ProfileAvatar />

        <div className="inline-flex items-center space-x-3 bg-zinc-900/80 border border-cyan-500/30 rounded px-4 py-2 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">Portfolio Online // Welcome</span>
        </div>
        
        <div className="mb-4">
          <GlitchText text="DENNRICK" />
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 leading-[0.85]">
            AGUSTIN
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-mono mt-8">
          <span className="text-cyan-400">&lt;Dev&gt;</span> Architecting scalable webs. <br className="hidden md:block"/>
          <span className="text-fuchsia-500">&lt;Game&gt;</span> Crafting immersive worlds.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href="#projects"
            className="group relative px-10 py-4 bg-cyan-500 text-black font-black text-lg clip-polygon transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <span className="relative flex items-center gap-2 uppercase tracking-widest">
              View Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="#contact"
            className="group px-10 py-4 bg-transparent border-2 border-zinc-700 text-white font-bold text-lg clip-polygon hover:border-fuchsia-500 hover:text-fuchsia-500 transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]"
          >
            <span className="uppercase tracking-widest">Get In Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;