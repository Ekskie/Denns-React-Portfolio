import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';

// Public Components
import NavBar from './components/layout/NavBar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScanlineOverlay from './components/layout/ScanlineOverlay.jsx';
import Hero from './components/sections/Hero.jsx';
import AboutAndSkills from './components/sections/AboutAndSkills.jsx';
import Projects from './components/sections/Projects.jsx';
import Certifications from './components/sections/Certifications.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import TerminalSection from './components/sections/TerminalSection.jsx';

// Pages
import NotFound from './components/pages/NotFound.jsx';

// Admin Components
import Login from './components/admin/Login.jsx';
import Dashboard from './components/admin/Dashboard.jsx';

// UI Components
import CustomCursor from './components/ui/CustomCursor.jsx';

const PublicPortfolio = () => (
  <div className="min-h-screen font-sans transition-colors duration-300 bg-gray-50 text-zinc-900 dark:bg-black dark:text-white selection:bg-cyan-200 selection:text-cyan-900 dark:selection:bg-fuchsia-500/30 dark:selection:text-fuchsia-200">
    <ScanlineOverlay />
    <NavBar />
    <main>
        <Hero />
        <AboutAndSkills />
        <Projects />
        <Certifications />
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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      
      {loading ? (
        <div className="fixed inset-0 bg-gray-50 dark:bg-black flex items-center justify-center z-50 transition-colors duration-300">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="font-mono text-cyan-600 dark:text-cyan-500 animate-pulse">INITIALIZING SYSTEM...</div>
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

            {/* 404 Route - Catch All */}
            <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
}