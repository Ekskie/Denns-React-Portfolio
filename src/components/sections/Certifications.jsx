import React from 'react';
import { Award, ShieldCheck, ExternalLink, FileBadge, CheckCircle2 } from 'lucide-react';

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Meta Front-End Developer",
    issuer: "Coursera / Meta",
    date: "Issued 2023",
    type: "Professional License",
    link: "#", 
    color: "cyan",
    skills: ["React", "UX/UI", "JavaScript"]
  },
  {
    id: 2,
    title: "Game Development Patterns",
    issuer: "Unity Learn",
    date: "Issued 2024",
    type: "Specialization",
    link: "#",
    color: "fuchsia",
    skills: ["C#", "Unity", "Design Patterns"]
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    issuer: "IBM",
    date: "Issued 2023",
    type: "Security Badge",
    link: "#",
    color: "green",
    skills: ["Network Security", "Risk Mgmt"]
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden transition-colors duration-500
      bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900">
      
      {/* Background Atmosphere - Grid Pattern 
          Light: Subtle gray grid
          Dark: Subtle dark gray grid
      */}
      <div className="absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-30
        bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
        dark:bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)]">
      </div>
      
      {/* Top Gradient Fade (Matching Projects.jsx) */}
      <div className="absolute top-0 left-0 w-full h-32 z-10
        bg-gradient-to-b from-zinc-50 to-transparent
        dark:from-black dark:to-transparent">
      </div>

      {/* Decorative Side Elements */}
      <div className="absolute top-1/4 left-0 w-1 h-32 opacity-50
        bg-gradient-to-b from-transparent via-cyan-600 to-transparent
        dark:via-cyan-500">
      </div>
      <div className="absolute bottom-1/4 right-0 w-1 h-32 opacity-50
        bg-gradient-to-b from-transparent via-fuchsia-600 to-transparent
        dark:via-fuchsia-500">
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b pb-8 gap-8
          border-zinc-200 dark:border-zinc-800/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-cyan-600 dark:text-cyan-500" />
              <h2 className="text-sm font-bold font-mono uppercase tracking-widest
                text-cyan-700 dark:text-cyan-500">
                Authorized Credentials
              </h2>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter
              text-zinc-900 dark:text-white">
              Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r 
                from-cyan-600 to-fuchsia-600
                dark:from-cyan-400 dark:to-fuchsia-500">Certs</span>
            </h2>
          </div>
          
          <div className="text-right hidden md:block">
             <div className="text-[10px] font-mono uppercase tracking-widest mb-1
               text-zinc-500 dark:text-zinc-500">
               Total Verified
             </div>
             <div className="text-3xl font-black
               text-zinc-900 dark:text-white">
               {CERTIFICATIONS.length}
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
                <div 
                    key={cert.id} 
                    className="group relative border p-6 clip-polygon-card transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-sm
                      bg-white border-zinc-200 hover:border-cyan-600/50 hover:shadow-[0_0_30px_rgba(8,145,178,0.15)]
                      dark:bg-zinc-900/40 dark:border-zinc-800 dark:hover:border-cyan-500/50 dark:hover:shadow-none"
                >
                    {/* Hover Glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-all pointer-events-none opacity-0 group-hover:opacity-100
                      bg-${cert.color}-500/10`}>
                    </div>
                    
                    {/* Header: Icon & Link */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className={`p-3 rounded border transition-colors
                          bg-zinc-100 border-zinc-200 group-hover:border-${cert.color === 'cyan' ? 'cyan-600' : cert.color === 'fuchsia' ? 'fuchsia-600' : 'green-600'}
                          dark:bg-zinc-900 dark:border-zinc-700 dark:group-hover:border-${cert.color === 'cyan' ? 'cyan-500' : cert.color === 'fuchsia' ? 'fuchsia-500' : 'green-500'}`}>
                            <Award size={24} className={
                              cert.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' : 
                              cert.color === 'fuchsia' ? 'text-fuchsia-600 dark:text-fuchsia-400' : 
                              'text-green-600 dark:text-green-400'} 
                            />
                        </div>
                        <a href={cert.link} target="_blank" rel="noreferrer" className="transition-colors p-2 rounded
                          text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100
                          dark:text-zinc-600 dark:hover:text-white dark:hover:bg-zinc-800">
                            <ExternalLink size={18} />
                        </a>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 relative z-10 mb-6">
                        <h3 className="text-xl font-bold mb-2 leading-tight transition-colors
                          text-zinc-900 group-hover:text-cyan-600
                          dark:text-white dark:group-hover:text-cyan-400">
                            {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-mono
                          text-zinc-500 dark:text-zinc-400">
                            <span className="uppercase tracking-wider">{cert.issuer}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                            <span className="text-zinc-400 dark:text-zinc-500">{cert.date}</span>
                        </div>
                    </div>

                    {/* Footer: Skills/Tags */}
                    <div className="mt-auto border-t pt-4 relative z-10
                      border-zinc-100 dark:border-zinc-800/50">
                        <div className="flex flex-wrap gap-2">
                            {cert.skills?.map(skill => (
                                <span key={skill} className="text-[10px] uppercase font-bold px-2 py-1 rounded border flex items-center gap-1
                                  bg-zinc-100 text-zinc-600 border-zinc-200
                                  dark:bg-zinc-950/50 dark:text-zinc-500 dark:border-zinc-800/50">
                                    <CheckCircle2 size={8} className="text-cyan-600 dark:text-cyan-500" /> {skill}
                                </span>
                            ))}
                        </div>
                        
                        <div className="absolute bottom-0 right-0 p-2 opacity-10 dark:opacity-20">
                            <FileBadge size={40} className="text-zinc-400 dark:text-zinc-500" />
                        </div>
                    </div>
                    
                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;