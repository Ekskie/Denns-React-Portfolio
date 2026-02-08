import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, WifiOff, Terminal } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-red-500/30">
      
      {/* 1. Background Scanlines & Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-0 pointer-events-none"></div>

      <div className="relative z-10 text-center px-6 max-w-2xl w-full">
         
         {/* 2. Glitch 404 Title */}
         <div className="relative mb-12">
            <h1 className="text-9xl md:text-[12rem] font-black text-white tracking-tighter relative z-10 leading-none">
                4<span className="text-red-600 animate-pulse">0</span>4
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-cyan-500 opacity-40 blur-[2px] animate-glitch-1 leading-none">404</div>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500 opacity-40 blur-[2px] animate-glitch-2 leading-none">404</div>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-full mt-4 flex items-center justify-center gap-2 text-red-500 font-bold tracking-[0.5em] uppercase text-sm animate-pulse">
                <WifiOff size={16} /> Signal Lost
            </div>
         </div>

         {/* 3. Terminal Error Log */}
         <div className="bg-zinc-950/80 border border-zinc-800 p-6 rounded-lg backdrop-blur-md text-left shadow-[0_0_50px_rgba(220,38,38,0.1)] relative overflow-hidden group">
            {/* Red alert bar at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-zinc-500" />
                    <span className="text-xs text-zinc-500 font-mono">ERROR_LOG_DUMP</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                </div>
            </div>

            <div className="space-y-2 text-xs md:text-sm font-mono text-zinc-400">
                <p> <span className="text-zinc-600">{'>'}</span> Initiating nav_sequence.exe...</p>
                <p> <span className="text-zinc-600">{'>'}</span> Target coordinates unavailable.</p>
                <p> <span className="text-zinc-600">{'>'}</span> <span className="text-red-400">CRITICAL ERROR: Vector not found in local sector.</span></p>
                <p> <span className="text-zinc-600">{'>'}</span> User has drifted into the void.</p>
                <p className="mt-4 text-cyan-500 animate-pulse">
                    <span className="text-zinc-600">{'>'}</span> Recommendation: Return to base immediately_<span className="animate-blink">|</span>
                </p>
            </div>
         </div>

         {/* 4. Action Buttons */}
         <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <button
                onClick={() => navigate('/')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all clip-polygon hover:scale-105"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
            >
                <Home size={18} />
                <span>Return to Home</span>
            </button>
            
            <button
                onClick={() => window.history.back()}
                className="group inline-flex items-center gap-2 px-8 py-4 border border-zinc-700 text-zinc-400 font-bold uppercase tracking-widest hover:text-white hover:border-white transition-all"
            >
                <span>Go Back</span>
            </button>
         </div>
      </div>

      {/* 5. Custom Styles for this page */}
      <style>{`
        @keyframes glitch-1 {
          0% { transform: translate(0); clip-path: inset(20% 0 80% 0); }
          20% { transform: translate(-4px, 4px); clip-path: inset(60% 0 10% 0); }
          40% { transform: translate(-4px, -4px); clip-path: inset(40% 0 50% 0); }
          60% { transform: translate(4px, 4px); clip-path: inset(80% 0 5% 0); }
          80% { transform: translate(4px, -4px); clip-path: inset(10% 0 60% 0); }
          100% { transform: translate(0); clip-path: inset(20% 0 80% 0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0); clip-path: inset(10% 0 60% 0); }
          20% { transform: translate(4px, -4px); clip-path: inset(30% 0 20% 0); }
          40% { transform: translate(4px, 4px); clip-path: inset(10% 0 80% 0); }
          60% { transform: translate(-4px, -4px); clip-path: inset(70% 0 10% 0); }
          80% { transform: translate(-4px, 4px); clip-path: inset(50% 0 30% 0); }
          100% { transform: translate(0); clip-path: inset(10% 0 60% 0); }
        }
        .animate-glitch-1 { animation: glitch-1 3s infinite linear alternate-reverse; }
        .animate-glitch-2 { animation: glitch-2 2.5s infinite linear alternate-reverse; }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default NotFound;