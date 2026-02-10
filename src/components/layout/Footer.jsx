import React from 'react';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden transition-colors duration-500 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900">
      
      {/* Background Atmosphere 
          Light: Subtle Cyan Glow
          Dark: Deep Cyan/Void Glow
      */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.1)_0%,transparent_50%)]">
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            {/* Status Badge */}
            <div className="inline-block px-3 py-1 text-xs font-mono uppercase border mb-4 rounded-sm bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:border-fuchsia-500/30 dark:text-fuchsia-400">
              Status: Available for Hire
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-zinc-900 dark:text-white">
              READY TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-600 dark:from-cyan-400 dark:to-fuchsia-500">BUILD?</span>
            </h2>
            
            <p className="text-lg mb-8 max-w-md font-mono text-zinc-600 dark:text-gray-400">
              Let's turn ideas into reality. I'm ready to bring my expertise to your next project.
            </p>
            
            <div className="flex gap-4">
              <a href="mailto:dennrick05@gmail.com" className="px-8 py-4 font-black uppercase tracking-widest clip-polygon flex items-center gap-2 transition-all bg-zinc-900 text-white hover:bg-cyan-600 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-cyan-400 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <Mail size={18} /> Send Message
              </a>
            </div>
          </div>

          <div className="space-y-8 flex flex-col justify-end items-start md:items-end font-mono">
             <div className="text-right">
                <p className="text-xs mb-2 uppercase tracking-wider text-cyan-600 dark:text-cyan-500">Email Me</p>
                <a href="mailto:dennrick05@gmail.com" className="text-2xl transition-colors text-zinc-900 hover:text-fuchsia-600 dark:text-white dark:hover:text-fuchsia-500">
                  dennrick05@gmail.com
                </a>
             </div>
             
             <div className="flex gap-6">
               {[
                 { icon: Github, href: "https://github.com/Ekskie" },
                 { icon: Linkedin, href: "https://linkedin.com" }, // Add your LinkedIn URL
                 { icon: Instagram, href: "https://www.instagram.com/denden.nitsuga/" }
               ].map((social, index) => (
                 <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" 
                    className="transition-colors hover:scale-110 transform duration-300 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white">
                    <social.icon size={32} />
                 </a>
               ))}
             </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest border-zinc-200 text-zinc-500 dark:border-zinc-900 dark:text-zinc-600">
          <p>© 2026 DENNRICK AGUSTIN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/legal" className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Legal <ArrowUpRight size={10} />
            </a>
            <a href="/privacy" className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Privacy Policy <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;