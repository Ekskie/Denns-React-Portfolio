import React from 'react';

const HeroScanner = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg select-none z-10">
      {/* The Scanning Line 
        - Moves from top to bottom
        - Has a glowing gradient trail
      */}
      <div className="animate-scan w-full h-[100px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent absolute -top-[100px] left-0 right-0">
        <div className="absolute bottom-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_2px_rgba(34,211,238,0.6)]"></div>
      </div>

      {/* Optional: Grid overlay for extra "Tech" feel 
        (Remove this div if you want just the line)
      */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

      <style>{`
        @keyframes scan {
          0% { top: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default HeroScanner;