import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowDown, Terminal, Code2, Gamepad2, Zap } from 'lucide-react';
// Corrected relative paths for sibling directories (sections -> ui)
import GlitchText from '../ui/GlitchText.jsx';
import ProfileAvatar from '../ui/ProfileAvatar.jsx';

// --- Typewriter Hook (Internal) ---
const useTypewriter = (words, speed = 100, pause = 2000) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout = setTimeout(() => setBlink(!blink), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), pause);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(words[index].substring(0, subIndex));
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, speed, pause]);

  return { text, blink };
};

// --- Exaggerated Starfield/Particle Canvas Component ---
const StarfieldCanvas = ({ mousePos }) => {
  const canvasRef = useRef(null);
  // Use a ref for mouse position to avoid restarting the effect on every mouse move
  const mousePosRef = useRef(mousePos);

  // Keep the ref updated with the latest prop
  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      // Exaggerated count: 150 particles on desktop, 60 on mobile
      const count = isMobile ? 60 : 150; 
      
      for (let i = 0; i < count; i++) {
        // Z-index simulates depth (0.2 is far away/slow, 2.0 is close/fast)
        const z = Math.random() * 1.8 + 0.2; 
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: z,
          // Size is relative to depth - closer stars are bigger
          size: Math.random() * (isMobile ? 1.5 : 3) * z * 0.6,
          // Base Velocity (ambient drift)
          baseVx: (Math.random() - 0.5) * 0.5 * z,
          baseVy: (Math.random() - 0.5) * 0.5 * z,
          // Physics Velocity (explosion force)
          vx: 0,
          vy: 0,
          // Randomize colors: mostly cyan, some fuchsia, rare white
          hue: Math.random() > 0.6 ? 'cyan' : (Math.random() > 0.3 ? 'fuchsia' : 'white'),
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseDir: 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate actual pixel coordinates of mouse from normalized (-1 to 1) values
      const currentMouse = mousePosRef.current;
      const mouseX = (currentMouse.x + 1) * (canvas.width / 2);
      const mouseY = (currentMouse.y + 1) * (canvas.height / 2);

      // 1. Draw Particles
      particles.forEach(p => {
        // Pulse Opacity for "Twinkling"
        p.opacity += p.pulseSpeed * p.pulseDir;
        if (p.opacity > 0.9 || p.opacity < 0.2) p.pulseDir *= -1;

        // --- PHYSICS ENGINE: EXPLOSION / AVOIDANCE ---
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150; // Radius where explosion triggers

        if (dist < repulsionRadius) {
            // Calculate vector away from mouse
            const angle = Math.atan2(dy, dx);
            // Force is stronger when closer to center
            const force = (repulsionRadius - dist) / repulsionRadius; 
            const explosionStrength = 2.5; // How violent the explosion is

            // Add explosive force to velocity
            p.vx += Math.cos(angle) * force * explosionStrength;
            p.vy += Math.sin(angle) * force * explosionStrength;
        }

        // Apply Friction (slow down the explosion over time)
        p.vx *= 0.94; 
        p.vy *= 0.94;

        // Update Position: (Base Drift + Physics Velocity)
        p.x += p.baseVx + p.vx;
        p.y += p.baseVy + p.vy;

        // Infinite Wrap around screen
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        // Draw Star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Color & Glow Logic
        if (p.hue === 'cyan') {
            ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
            ctx.shadowColor = `rgba(6, 182, 212, ${p.opacity})`;
        } else if (p.hue === 'fuchsia') {
            ctx.fillStyle = `rgba(217, 70, 239, ${p.opacity})`;
            ctx.shadowColor = `rgba(217, 70, 239, ${p.opacity})`;
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.shadowColor = `rgba(255, 255, 255, ${p.opacity})`;
        }
        
        // Only glow if it's moving fast (active explosion) or really close
        ctx.shadowBlur = (Math.abs(p.vx) + Math.abs(p.vy)) > 1 ? p.size * 4 : 0; 
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance on lines
      });

      // 2. Draw Connection Lines (Neural Mesh)
      // We limit connections to prevent performance hits
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        // Only connect stars that are close in 2D space AND similar in 3D depth
        if (particles[i].opacity < 0.3) continue; 

        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connections > 2) break; // Max connections per star

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection threshold - connections break if particles explode too far apart
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.2;
            
            // Create gradient line between the two stars' colors
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, particles[i].hue === 'fuchsia' ? `rgba(217, 70, 239, ${opacity})` : `rgba(6, 182, 212, ${opacity})`);
            grad.addColorStop(1, particles[j].hue === 'fuchsia' ? `rgba(217, 70, 239, ${opacity})` : `rgba(6, 182, 212, ${opacity})`);

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Run once! mousePos updates are handled via Ref

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { text: typeText, blink } = useTypewriter([
    "Architecting Scalable Webs",
    "Crafting Immersive Worlds",
    "Designing Digital Products",
    "Building The Future"
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black pt-20 pb-28 perspective-1000">
      
      {/* 1. Dynamic Lighting (Spotlight) - Exaggerated Intensity */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, #1a1a1a 0%, #000000 85%)`
        }}
      />

      {/* 2. Interactive Canvas Background (Stars/Connections) */}
      <StarfieldCanvas mousePos={mousePos} />

      {/* 3. Scanlines & Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none animate-scan-slow opacity-30 mix-blend-overlay"></div>
      
      {/* 4. 3D Grid Floor - Exaggerated Perspective */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[60%] bg-[linear-gradient(to_bottom,transparent,rgba(6,182,212,0.08))] origin-bottom transition-transform duration-75 ease-out will-change-transform pointer-events-none"
        style={{
          transform: `perspective(1000px) rotateX(${65 + mousePos.y * 5}deg) translateZ(0) translateX(${mousePos.x * -20}px)`
        }}
      >
        <div className="w-full h-full bg-[size:60px_60px] bg-[linear-gradient(to_right,#0e749030_1px,transparent_1px),linear-gradient(to_bottom,#0e749030_1px,transparent_1px)] animate-grid-flow [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      </div>

      {/* 5. Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Floating Avatar - Faster Float */}
        <div className="animate-float mb-6 relative group">
            <div className="absolute -inset-6 bg-cyan-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ProfileAvatar />
        </div>

        {/* Status Badge */}
        <div className="animate-in-up delay-100 inline-flex items-center space-x-3 bg-zinc-900/90 border border-zinc-700/50 rounded-full px-5 py-2 mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-mono font-bold text-gray-300 tracking-[0.2em] uppercase">
            System Online <span className="text-zinc-600 mx-2">|</span> v2.6.0
          </span>
        </div>
        
        {/* Name Title with Background Icons */}
        <div className="mb-6 animate-in-up delay-200 relative">
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 text-cyan-500 animate-pulse">
             <Code2 size={64} />
          </div>
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 text-fuchsia-500 animate-pulse" style={{animationDelay: '1s'}}>
             <Gamepad2 size={64} />
          </div>
          
          <GlitchText text="DENNRICK" />
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 leading-[0.9] animate-text-shine bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            AGUSTIN
          </h1>
        </div>
        
        {/* Typewriter Subtitle */}
        <div className="h-8 md:h-12 mb-10 font-mono text-lg md:text-2xl text-gray-400 flex items-center gap-2 animate-in-up delay-300">
          <Terminal size={20} className="text-fuchsia-500" />
          <span>I am</span>
          <span className="text-cyan-400 font-bold min-w-[200px] text-left">
            {typeText}
            <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity text-white`}>_</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-auto animate-in-up delay-500">
          <a 
            href="#projects"
            className="group relative w-full md:w-auto px-8 py-4 bg-cyan-500 text-black font-black text-lg clip-polygon transition-all hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center justify-center gap-2 uppercase tracking-widest">
              View Projects <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="#contact"
            className="group w-full md:w-auto px-8 py-4 bg-transparent border border-zinc-700 text-white font-bold text-lg clip-polygon hover:border-fuchsia-500 hover:text-fuchsia-500 transition-all hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:-translate-y-1 bg-zinc-900/50 backdrop-blur-sm"
          >
            <span className="uppercase tracking-widest">Contact Me</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator - Moved Up */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 animate-bounce delay-1000 opacity-0 animate-fade-in z-20">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="text-cyan-500" />
      </div>

      {/* HUD Strip - Added at Bottom */}
      <div className="absolute bottom-0 w-full bg-cyan-900/20 border-y border-cyan-500/20 py-3 overflow-hidden z-20 backdrop-blur-sm">
        <div className="whitespace-nowrap animate-marquee flex gap-12 text-cyan-500/50 font-mono text-xs md:text-sm uppercase tracking-[0.3em]">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-4"><Zap size={14} className="text-fuchsia-500" /> Design & Code</span>
              <span className="text-zinc-700">::</span>
              <span className="flex items-center gap-4">Performance First</span>
              <span className="text-zinc-700">::</span>
              <span className="flex items-center gap-4">Immersive UX</span>
              <span className="text-zinc-700">::</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Styles */}
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
          100% { background-position: 0 60px; }
        }
        .animate-grid-flow {
          animation: gridFlow 2s linear infinite;
        }

        @keyframes scanSlow {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .animate-scan-slow {
           animation: scanSlow 6s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;