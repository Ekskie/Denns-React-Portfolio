import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X, FileText, Download, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const NavBar = () => {
  // Destructure zenMode and toggleZenMode from the context
  const { theme, toggleTheme, zenMode, toggleZenMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Handle "Top" or missing IDs gracefully
    if (targetId === '' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Height of the navbar + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Feedback", href: "#testimonials" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 font-mono ${
      scrolled 
        ? 'bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-cyan-500/30 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Decorative Top Border Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 md:opacity-100"></div>

        <a 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, '#home')}
          className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2 group"
        >
          <Gamepad2 className="text-fuchsia-600 dark:text-fuchsia-500 group-hover:rotate-12 transition-transform" />
          <span>EKSKIE<span className="text-cyan-500 dark:text-cyan-400 animate-pulse">_</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-1 mr-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="relative px-4 py-2 text-sm uppercase tracking-widest text-zinc-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-900/20 skew-x-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            ))}
          </div>

          {/* Zen Mode Toggle (New) */}
          <button
            onClick={toggleZenMode}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 mr-1"
            title={zenMode ? "Enable Animations" : "Zen Mode (Reduced Motion)"}
          >
            {zenMode ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 mr-2"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Resume Button */}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:-translate-y-0.5"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            <FileText size={14} className="group-hover:rotate-12 transition-transform" />
            <span>Resume</span>
          </a>

          {/* Contact Button */}
          <a 
            href="#contact" 
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold uppercase tracking-widest clip-polygon transition-all hover:scale-105 shadow-[0_0_10px_rgba(192,38,211,0.3)]"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Nav Button */}
        <button className="md:hidden text-zinc-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col space-y-4 md:hidden animate-in slide-in-from-top-5 z-50 shadow-2xl">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-lg font-mono text-zinc-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 uppercase border-l-2 border-transparent hover:border-cyan-500 pl-3 transition-all"
              >
                {`> ${link.name}`}
              </a>
            ))}

            {/* Mobile Zen Toggle */}
            <button
                onClick={toggleZenMode}
                className="flex items-center gap-2 text-lg font-mono text-zinc-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 uppercase border-l-2 border-transparent hover:border-cyan-500 pl-3 transition-all text-left"
            >
                {zenMode ? <><EyeOff size={20} /> Animations Off</> : <><Eye size={20} /> Animations On</>}
            </button>

            <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-lg font-mono text-zinc-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 uppercase border-l-2 border-transparent hover:border-cyan-500 pl-3 transition-all text-left"
            >
                {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
            </button>
            
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2"></div>
            
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono transition-colors rounded-sm uppercase tracking-wider text-sm"
              onClick={() => setIsOpen(false)}
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;