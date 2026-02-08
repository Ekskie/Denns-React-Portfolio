import React from 'react';

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group select-none">
      {/* Main Text Layer 
        - Light Mode: Dark Zinc (Laboratory feel)
        - Dark Mode: White (Cyberpunk feel)
        - Removed mix-blend-screen to ensure visibility on light backgrounds
      */}
      <span className="relative z-10 block text-5xl md:text-8xl font-black tracking-tighter 
        text-zinc-900 dark:text-white transition-colors duration-300 leading-[0.85]">
        {text}
      </span>
      
      {/* Glitch Layer 1 
        - Light Mode: Technical Blue
        - Dark Mode: Neon Cyan
      */}
      <span className="absolute top-0 left-0 -z-10 block text-5xl md:text-8xl font-black tracking-tighter 
        text-blue-600 dark:text-cyan-400 
        opacity-0 group-hover:opacity-100 animate-glitch-1 
        leading-[0.85] pointer-events-none transition-opacity duration-200" 
        aria-hidden="true">
        {text}
      </span>
      
      {/* Glitch Layer 2 
        - Light Mode: Alert Red
        - Dark Mode: Neon Fuchsia
      */}
      <span className="absolute top-0 left-0 -z-10 block text-5xl md:text-8xl font-black tracking-tighter 
        text-red-500 dark:text-fuchsia-500 
        opacity-0 group-hover:opacity-100 animate-glitch-2 
        leading-[0.85] pointer-events-none transition-opacity duration-200" 
        aria-hidden="true">
        {text}
      </span>

      {/* Embedded Styles for Glitch Animations to ensure they work immediately */}
      <style>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(15% 0 80% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(55% 0 10% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 1px); }
        }
        .animate-glitch-1 {
          animation: glitch-1 2.5s infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-2 3s infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default GlitchText;