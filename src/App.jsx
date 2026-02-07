import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components
// Using explicit relative paths from root to ensure resolution in this environment
import NavBar from '../src/components/layout/NavBar.jsx';
import Footer from '../src/components/layout/Footer.jsx';
import ScanlineOverlay from '../src/components/layout/ScanlineOverlay.jsx';
import Hero from '../src/components/sections/Hero.jsx';
import AboutAndSkills from '../src/components/sections/AboutAndSkills.jsx';
import Projects from '../src/components/sections/Projects.jsx';
import Testimonials from '../src/components/sections/Testimonials.jsx';
import TerminalSection from '../src/components/sections/TerminalSection.jsx';

// Admin Components
import Login from '../src/components/admin/Login.jsx';
import Dashboard from '../src/components/admin/Dashboard.jsx';

// UI Components
import CustomCursor from '../src/components/ui/CustomCursor.jsx';

// Styles
import { globalStyles } from '../src/styles/globals.js';
// import '../src/App.css';

const PublicPortfolio = () => (
  <div className="bg-black min-h-screen text-white font-sans selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
    <ScanlineOverlay />
    <NavBar />
    <main>
        <Hero />
        <AboutAndSkills />
        
        <Projects />
        <Testimonials />
        <TerminalSection />
    </main>
    <Footer />
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <CustomCursor />
      
      {loading ? (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="font-mono text-cyan-500 animate-pulse">INITIALIZING SYSTEM...</div>
          </div>
        </div>
      ) : (
        <Router>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicPortfolio />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
      )}
    </>
  );
}