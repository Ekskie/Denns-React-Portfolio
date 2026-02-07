import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
// Using explicit relative paths from the sections folder back to root components
import GlitchText from '../../components/ui/GlitchText.jsx';
import ProfileAvatar from '../../components/ui/ProfileAvatar.jsx';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black pt-28 pb-10">
      
      {/* Dynamic Background - Spotlight follows mouse */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, #1a1a1a 0%, #000000 100%)`
        }}
      ></div>

      {/* Scanlines / Noise Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none animate-scan-slow opacity-60"></div>
      
      {/* Grid Floor Effect - Reacts to Mouse Y (Tilt) and Mouse X (Pan) */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(6,182,212,0.1))] origin-bottom transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `perspective(500px) rotateX(${60 + mousePos.y * 5}deg) translateX(${mousePos.x * -20}px)`
        }}
      >
        <div className="w-full h-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#0e749020_1px,transparent_1px),linear-gradient(to_bottom,#0e749020_1px,transparent_1px)] animate-grid-flow"></div>
      </div>

      {/* Main Content - Subtle Parallax Opposite to Mouse */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}
      >
        
        {/* Profile Picture Slot - Entrance Animation */}
        <div className="animate-in-up">
            <ProfileAvatar />
        </div>

        {/* Status Bar */}
        <div className="animate-in-up delay-100 inline-flex items-center space-x-3 bg-zinc-900/80 border border-cyan-500/30 rounded px-4 py-2 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-shadow duration-300">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">Portfolio Online // Welcome</span>
        </div>
        
        {/* Main Title - Text Shine Animation */}
        <div className="mb-4 animate-in-up delay-200">
          <GlitchText text="DENNRICK" />
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 leading-[0.85] animate-text-shine bg-[length:200%_auto]">
            AGUSTIN
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-mono mt-8 animate-in-up delay-300">
          <span className="text-cyan-400 inline-block hover:scale-110 transition-transform cursor-crosshair">&lt;Dev&gt;</span> Architecting scalable webs. <br className="hidden md:block"/>
          <span className="text-fuchsia-500 inline-block hover:scale-110 transition-transform cursor-crosshair">&lt;Game&gt;</span> Crafting immersive worlds.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in-up delay-500">
          <a 
            href="#projects"
            className="group relative px-10 py-4 bg-cyan-500 text-black font-black text-lg clip-polygon transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1"
          >
            <span className="relative flex items-center gap-2 uppercase tracking-widest">
              View Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="#contact"
            className="group px-10 py-4 bg-transparent border-2 border-zinc-700 text-white font-bold text-lg clip-polygon hover:border-fuchsia-500 hover:text-fuchsia-500 transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:-translate-y-1"
          >
            <span className="uppercase tracking-widest">Get In Touch</span>
          </a>
        </div>
      </div>
      
      {/* New Animation Styles */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shine {
          animation: shine 3s linear infinite;
        }
        
        @keyframes gridFlow {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        .animate-grid-flow {
          animation: gridFlow 2s linear infinite;
        }

        @keyframes scanSlow {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .animate-scan-slow {
           animation: scanSlow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;