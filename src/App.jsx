import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components - Using absolute paths to fix resolution errors
import NavBar from '/src/components/layout/NavBar.jsx';
import Footer from '/src/components/layout/Footer.jsx';
import ScanlineOverlay from '/src/components/layout/ScanlineOverlay.jsx';
import Hero from '/src/components/sections/Hero.jsx';
import AboutAndSkills from '/src/components/sections/AboutAndSkills.jsx';
import Projects from '/src/components/sections/Projects.jsx';
import Testimonials from '/src/components/sections/Testimonials.jsx';

// Admin Components
import Login from '/src/components/admin/Login.jsx';
import Dashboard from '/src/components/admin/Dashboard.jsx';

// UI Components
import CustomCursor from '/src/components/ui/CustomCursor.jsx';

// Styles
import { globalStyles } from '/src/styles/globals.js';

const PublicPortfolio = () => (
  <div className="bg-black min-h-screen text-white font-sans selection:bg-fuchsia-500 selection:text-white">
    <ScanlineOverlay />
    <NavBar />
    <Hero />
    <AboutAndSkills />
    <Projects />
    <Testimonials />
    <Footer />
  </div>
);

export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <CustomCursor />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicPortfolio />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}