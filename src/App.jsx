import React from 'react';
import { Zap } from 'lucide-react';

// Layout Components
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScanlineOverlay from './components/layout/ScanlineOverlay';

// Section Components
import Hero from './components/sections/Hero';
import AboutAndSkills from './components/sections/AboutAndSkills';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';

// Styles
import { globalStyles } from './styles/globals';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-fuchsia-500 selection:text-white">
      <ScanlineOverlay />
      <NavBar />
      <Hero />
      <AboutAndSkills />
      
      {/* HUD Strip */}
      <div className="bg-cyan-900/20 border-y border-cyan-500/20 py-4 overflow-hidden relative z-20 backdrop-blur-sm">
        <div className="whitespace-nowrap animate-marquee flex gap-12 text-cyan-500/50 font-mono text-sm uppercase tracking-[0.3em]">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-4"><Zap size={14} /> Design & Code</span>
              <span>::</span>
              <span className="flex items-center gap-4">Performance First</span>
              <span>::</span>
              <span className="flex items-center gap-4">Immersive UX</span>
              <span>::</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Projects />
      <Testimonials />
      <Footer />
      
      {/* Custom Styles */}
      <style>{globalStyles}</style>
    </div>
  );
}
