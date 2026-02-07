import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Feedback", href: "#testimonials" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 font-mono ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/30' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Decorative Top Border Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 md:opacity-100"></div>

        <a href="#" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 group">
          <Gamepad2 className="text-fuchsia-500 group-hover:rotate-12 transition-transform" />
          <span>EKSKIE<span className="text-cyan-400 animate-pulse">_</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="relative px-4 py-2 text-sm uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-colors group overflow-hidden"
            >
              <span className="relative z-10">{link.name}</span>
              <div className="absolute inset-0 bg-cyan-900/20 skew-x-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          ))}
          <a href="#contact" className="ml-6 px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold uppercase tracking-widest clip-polygon transition-all hover:scale-105">
            Contact Me
          </a>
        </div>

        {/* Mobile Nav Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-zinc-800 p-6 flex flex-col space-y-4 md:hidden animate-in slide-in-from-top-5 z-50">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-mono text-gray-300 hover:text-cyan-400 uppercase"
                onClick={() => setIsOpen(false)}
              >
                {`> ${link.name}`}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
