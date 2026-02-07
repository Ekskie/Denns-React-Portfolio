import React from 'react';

const GlitchText = ({ text, subtext }) => {
  return (
    <div className="relative group cursor-default">
      <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-2 relative z-10 mix-blend-screen leading-[0.85]">
        {text}
      </h1>
      <h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-black tracking-tighter text-cyan-400 opacity-0 group-hover:opacity-70 animate-glitch-1 leading-[0.85] pointer-events-none">
        {text}
      </h1>
      <h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-black tracking-tighter text-fuchsia-500 opacity-0 group-hover:opacity-70 animate-glitch-2 leading-[0.85] pointer-events-none">
        {text}
      </h1>
    </div>
  );
};

export default GlitchText;