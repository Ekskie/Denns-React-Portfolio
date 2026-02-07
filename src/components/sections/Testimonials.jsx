import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { MessageSquare, Quote, Star, User, Terminal, Wifi, ShieldCheck } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid & Atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-xs font-mono text-cyan-500 uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Incoming Transmissions
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                CLIENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">FEEDBACK</span>
            </h2>
            
            <div className="flex items-center justify-center gap-4 text-zinc-500 font-mono text-sm">
                <span>/// DECRYPTING USER LOGS</span>
                <span className="w-16 h-px bg-zinc-800"></span>
                <span>VERIFIED SOURCES ONLY</span>
            </div>
        </div>

        {/* Loading State */}
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="relative">
                   <div className="w-16 h-16 border-4 border-zinc-800 rounded-full"></div>
                   <div className="absolute top-0 left-0 w-16 h-16 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
               </div>
               <div className="font-mono text-cyan-500 animate-pulse tracking-widest text-sm">SCANNING NETWORK...</div>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t, i) => (
              <div 
                key={t.id || i} 
                className="group relative bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm p-8 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Tech Decoration Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-zinc-800 group-hover:border-fuchsia-500/50 transition-colors duration-500 rounded-br-xl"></div>

                {/* Card Content */}
                <div className="relative z-10">
                    
                    {/* Header: ID & Icon */}
                    <div className="flex justify-between items-start mb-6">
                        <Quote size={40} className="text-zinc-800 group-hover:text-cyan-500/20 transition-colors duration-500" />
                        <div className="font-mono text-[10px] text-zinc-600 bg-black/40 px-2 py-1 rounded border border-zinc-800/50">
                            LOG_ID: {String(t.id).padStart(4, '0') || 'UNK'}
                        </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-300 leading-relaxed mb-8 font-sans text-lg relative">
                        "{t.text}"
                    </p>

                    {/* Footer: Author Info */}
                    <div className="flex items-center gap-4 border-t border-zinc-800/50 pt-6 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {t.name ? t.name.charAt(0) : <User size={16} />}
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors">{t.name || 'Anonymous User'}</h4>
                            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                                {t.role || 'Client'} 
                                <span className="w-1 h-1 rounded-full bg-green-500"></span>
                            </p>
                        </div>
                        <div className="ml-auto">
                           <ShieldCheck size={16} className="text-zinc-700 group-hover:text-green-500 transition-colors" />
                        </div>
                    </div>

                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && testimonials.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
             <Wifi size={48} className="mx-auto text-zinc-700 mb-4" />
             <div className="text-zinc-500 font-mono text-lg mb-2">NO SIGNALS DETECTED</div>
             <p className="text-zinc-600 text-sm">Be the first to establish a connection.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;