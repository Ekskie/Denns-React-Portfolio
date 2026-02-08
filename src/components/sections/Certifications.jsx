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
    <section id="certifications" className="py-24 bg-black relative overflow-hidden border-t border-zinc-900">
      {/* Background Atmosphere (Matching Projects.jsx) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-zinc-800/50 pb-8 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-cyan-500" />
              <h2 className="text-sm font-bold font-mono text-cyan-500 uppercase tracking-widest">Authorized Credentials</h2>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Certs</span>
            </h2>
          </div>
          
          <div className="text-right hidden md:block">
             <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Total Verified</div>
             <div className="text-3xl font-black text-white">{CERTIFICATIONS.length}</div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
                <div 
                    key={cert.id} 
                    className="group relative bg-zinc-900/40 border border-zinc-800 p-6 clip-polygon-card hover:border-cyan-500/50 transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-sm"
                >
                    {/* Hover Glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${cert.color}-500/10 rounded-full blur-3xl group-hover:bg-${cert.color}-500/20 transition-all pointer-events-none`}></div>
                    
                    {/* Header: Icon & Link */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className={`p-3 rounded bg-zinc-900 border border-zinc-700 group-hover:border-${cert.color === 'cyan' ? 'cyan-500' : cert.color === 'fuchsia' ? 'fuchsia-500' : 'green-500'} transition-colors`}>
                            <Award size={24} className={cert.color === 'cyan' ? 'text-cyan-400' : cert.color === 'fuchsia' ? 'text-fuchsia-400' : 'text-green-400'} />
                        </div>
                        <a href={cert.link} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded">
                            <ExternalLink size={18} />
                        </a>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 relative z-10 mb-6">
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                            {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                            <span className="uppercase tracking-wider">{cert.issuer}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                            <span className="text-zinc-500">{cert.date}</span>
                        </div>
                    </div>

                    {/* Footer: Skills/Tags */}
                    <div className="mt-auto border-t border-zinc-800/50 pt-4 relative z-10">
                        <div className="flex flex-wrap gap-2">
                            {cert.skills?.map(skill => (
                                <span key={skill} className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-950/50 px-2 py-1 rounded border border-zinc-800/50 flex items-center gap-1">
                                    <CheckCircle2 size={8} className="text-cyan-500" /> {skill}
                                </span>
                            ))}
                        </div>
                        
                        <div className="absolute bottom-0 right-0 p-2 opacity-20">
                            <FileBadge size={40} className="text-zinc-500" />
                        </div>
                    </div>
                    
                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;