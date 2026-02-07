import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

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
    <section id="testimonials" className="py-24 bg-zinc-950YZ relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-widest flex items-center justify-center gap-3">
           <span className="text-fuchsia-500">Client</span> Feedback
        </h2>

        {loading ? (
           <div className="text-center text-cyan-500 font-mono animate-pulse">LOADING FEED DATA...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id} className="bg-zinc-900/50 border border-zinc-800 p-8 clip-polygon-card relative hover:border-fuchsia-500/30 transition-colors group">
                <div className="absolute top-2 right-2 text-fuchsia-800 font-mono text-xs opacity-50">Ref: {t.id}</div>
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
        )}
        
        {!loading && testimonials.length === 0 && (
          <div className="text-center text-zinc-600 font-mono">No testimonials archived.</div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;