import React from 'react';

const ProfileAvatar = () => (
  <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group perspective-[1000px]">
    {/* Rotating Outer Rings 
        Light: Darker, sharper tech blue/purple
        Dark: Glowing neon cyan/fuchsia
    */}
    <div className="absolute inset-[-10px] rounded-full border animate-spin-slow
      border-cyan-600/30 border-t-cyan-600
      dark:border-cyan-500/20 dark:border-t-cyan-500">
    </div>
    <div className="absolute inset-[-4px] rounded-full border animate-spin-reverse-slow
      border-fuchsia-600/30 border-b-fuchsia-600
      dark:border-fuchsia-500/20 dark:border-b-fuchsia-500">
    </div>
    
    {/* Main Container 
        Light: White/Zinc clean look
        Dark: Black/Zinc dark look
    */}
    <div className="relative w-full h-full rounded-full overflow-hidden border-2 transition-all duration-500
      bg-zinc-100 border-zinc-200 shadow-[0_0_20px_rgba(0,0,0,0.1)]
      dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]
      hover:shadow-[0_0_40px_rgba(8,145,178,0.3)] dark:hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
      
      {/* Glitch/Hologram Overlay */}
      <div className="absolute inset-0 mix-blend-overlay z-10 pointer-events-none
        bg-cyan-600/10 dark:bg-cyan-500/10">
      </div>
      
      {/* Scanline Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-20 animate-scan opacity-0 group-hover:opacity-100
        bg-cyan-600/80 shadow-[0_0_10px_rgba(8,145,178,0.8)]
        dark:bg-cyan-400/80 dark:shadow-[0_0_10px_rgba(6,182,212,0.8)]">
      </div>

      {/* THE IMAGE SLOT: Replace the src below with your actual image path */}
      <img 
        src="/denn.png"
        alt="Dennrick Agustin" 
        className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
      />
    </div>

    {/* Decorative Badge 
        Light: White card with dark text
        Dark: Black card with neon text
    */}
    <div className="absolute bottom-0 right-0 border px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider transform rotate-[-5deg] z-30 shadow-lg
      bg-white border-cyan-600 text-cyan-700
      dark:bg-black dark:border-cyan-500 dark:text-cyan-400">
      PRO DEV
    </div>
  </div>
);

export default ProfileAvatar;