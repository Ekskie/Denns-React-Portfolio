import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScanlineOverlay from './components/ui/ScanlineOverlay';
import Hero from './components/sections/Hero';
import AboutAndSkills from './components/sections/AboutAndSkills';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';

// Admin Components
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';

// Styles
import { globalStyles } from './styles/globals';

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