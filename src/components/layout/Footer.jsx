import React from 'react';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-300 dark:border-zinc-900 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="inline-block px-3 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/30 border border-fuchsia-300 dark:border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-mono mb-4 uppercase">
              Status: Available for Hire
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white mb-8 tracking-tighter leading-none">
              READY TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">BUILD?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md font-mono">
              Let's turn ideas into reality. I'm ready to bring my expertise to your next project.
            </p>
            <div className="flex gap-4">
              <a href="mailto:dennrick05@gmail.com" className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors clip-polygon flex items-center gap-2">
                <Mail size={18} /> Send Message
              </a>
            </div>
          </div>

          <div className="space-y-8 flex flex-col justify-end items-start md:items-end font-mono">
             <div className="text-right">
                <p className="text-cyan-500 text-xs mb-2 uppercase tracking-wider">Email Me</p>
                <a href="mailto:dennrick05@gmail.com" className="text-2xl text-zinc-900 dark:text-white hover:text-fuchsia-500 transition-colors">dennrick05@gmail.com</a>
             </div>
             
             <div className="flex gap-6">
               <a href="https://github.com/Ekskie" className="text-gray-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors hover:scale-110 transform"><Github size={32} /></a>
               <a href="https://linkedin.com" className="text-gray-400 dark:text-zinc-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hover:scale-110 transform"><Linkedin size={32} /></a>
               <a href="https://instagram.com" className="text-gray-400 dark:text-zinc-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 transition-colors hover:scale-110 transform"><Instagram size={32} /></a>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-zinc-600 text-xs font-mono uppercase tracking-widest">
          <p>© 2026 DENNRICK AGUSTIN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400">Legal</a>
            <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
