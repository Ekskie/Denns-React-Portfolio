import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-widest flex items-center justify-center gap-3">
           <span className="text-fuchsia-500">Client</span> Feedback
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 clip-polygon-card relative hover:border-fuchsia-500/30 transition-colors group">
              <div className="absolute top-2 right-2 text-fuchsia-800 font-mono text-xs opacity-50">Ref: 00{i+1}</div>
              <p className="text-gray-400 mb-6 italic leading-relaxed text-sm font-mono group-hover:text-gray-200 transition-colors">
                "{t.text}"
              </p>
              <div>
                <h4 className="text-white font-bold uppercase">{t.name}</h4>
                <p className="text-cyan-500 text-xs uppercase tracking-wide font-mono mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
