import React from 'react';

const ProfileAvatar = () => (
  <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group perspective-[1000px]">
    {/* Rotating Outer Rings */}
    <div className="absolute inset-[-10px] rounded-full border border-cyan-500/20 border-t-cyan-500 animate-spin-slow"></div>
    <div className="absolute inset-[-4px] rounded-full border border-fuchsia-500/20 border-b-fuchsia-500 animate-spin-reverse-slow"></div>
    
    {/* Main Container */}
    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500">
      
      {/* Glitch/Hologram Overlay */}
      <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
      
      {/* Scanline Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.8)] z-20 animate-scan opacity-0 group-hover:opacity-100"></div>

      {/* THE IMAGE SLOT: Replace the src below with your actual image path */}
      <img 
        src="/Agustin, Denn 8R-1.jpg"
        alt="Dennrick Agustin" 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
      />
    </div>

    {/* Decorative Badge */}
    <div className="absolute bottom-0 right-0 bg-black border border-cyan-500 px-3 py-1 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider transform rotate-[-5deg] z-30 shadow-lg">
      PRO DEV
    </div>
  </div>
);

export default ProfileAvatar;
