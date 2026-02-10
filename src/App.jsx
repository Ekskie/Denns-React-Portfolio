import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';

// Public Components
import NavBar from './components/layout/NavBar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScanlineOverlay from './components/layout/ScanlineOverlay.jsx';
import Hero from './components/sections/Hero.jsx';
import AboutAndSkills from './components/sections/AboutAndSkills.jsx';
import Process from './components/sections/Process.jsx';
import Projects from './components/sections/Projects.jsx';
import Certifications from './components/sections/Certifications.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import TerminalSection from './components/sections/TerminalSection.jsx';

// Pages
import NotFound from './components/pages/NotFound.jsx';
import SitePolicy from './components/pages/SitePrivacy.jsx';
import Legal from './components/pages/Legal.jsx';

// Admin Components
import Login from './components/admin/Login.jsx';
import Dashboard from './components/admin/Dashboard.jsx';

// UI Components
import CustomCursor from './components/ui/CustomCursor.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';

// Inner component for the public portfolio layout
// Now uses useTheme to check for Zen Mode
const PublicPortfolio = () => {
  const { zenMode } = useTheme();

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-gray-50 text-zinc-900 dark:bg-black dark:text-white selection:bg-cyan-200 selection:text-cyan-900 dark:selection:bg-fuchsia-500/30 dark:selection:text-fuchsia-200">
      <ScrollProgress />
      {/* Conditionally render Scanlines based on Zen Mode */}
      {!zenMode && <ScanlineOverlay />}
      <NavBar />
      <main>
          <Hero />
          <AboutAndSkills />
          <Process /> {/* New Workflow Section */}
          <Projects />
          <Certifications />
          <Testimonials />
          <TerminalSection />
      </main>
      <Footer />
    </div>
  );
};

// Main Content Wrapper to handle Global Context consumers (Cursor, Loading, etc.)
const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const { zenMode } = useTheme();

  useEffect(() => {
    // Simulate initial loading for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Conditionally render Custom Cursor based on Zen Mode */}
      {!zenMode && <CustomCursor />}
      
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
            <Route path="/privacy" element={<SitePolicy />} />
            <Route path="/legal" element={<Legal />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />

            {/* 404 Route - Catch All */}
            <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
      )}
    </>
  );
};

// Top-level App Component
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}