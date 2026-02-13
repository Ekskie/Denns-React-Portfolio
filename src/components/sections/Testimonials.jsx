import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { MessageSquare, Quote, Star, User, Terminal, Wifi, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

// Helper component for text truncation
const TestimonialContent = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120; // Character limit
  const content = text || "";
  const shouldTruncate = content.length > maxLength;

  return (
    <div className="leading-relaxed mb-8 font-sans text-lg relative flex-grow text-zinc-600 dark:text-gray-300">
      "{shouldTruncate && !isExpanded 
        ? `${content.slice(0, maxLength)}...` 
        : content}"
      
      {shouldTruncate && (
        <div className="mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors focus:outline-none"
          >
            {isExpanded ? 'See less' : 'Read more'}
          </button>
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
  const INITIAL_COUNT = 3;
  const LOAD_INCREMENT = 3;
  
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: true });

        let dataToProcess = [];

        if (!error && data && data.length > 0) {
          dataToProcess = data;
        } 

        const shuffled = shuffleArray(dataToProcess);
        setAllTestimonials(shuffled);

      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setAllTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Update displayed items when count or data changes
  useEffect(() => {
    if (allTestimonials.length > 0) {
      setDisplayedTestimonials(allTestimonials.slice(0, visibleCount));
    } else {
      setDisplayedTestimonials([]);
    }
  }, [allTestimonials, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + LOAD_INCREMENT);
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
    // Optional: smooth scroll back to top of list if needed
    const section = document.getElementById('testimonials');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden transition-colors duration-500
      bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900">
      
      {/* Background Grid & Atmosphere */}
      <div className="absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none opacity-30
         bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
         dark:bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]">
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none
         bg-fuchsia-200/40 dark:bg-fuchsia-900/10">
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-sm border
              bg-white border-zinc-200 text-cyan-700
              dark:bg-zinc-900/80 dark:border-zinc-800 dark:text-cyan-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Incoming Transmissions
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4
               text-zinc-900 dark:text-white">
               CLIENT <span className="text-transparent bg-clip-text bg-gradient-to-r 
                 from-fuchsia-600 to-cyan-600
                 dark:from-fuchsia-500 dark:to-cyan-500">FEEDBACK</span>
            </h2>
            
            <div className="flex items-center justify-center gap-4 font-mono text-sm
              text-zinc-500 dark:text-zinc-500">
                <span>/// DECRYPTING USER LOGS</span>
                <span className="w-16 h-px bg-zinc-300 dark:bg-zinc-800"></span>
                <span>VERIFIED SOURCES ONLY</span>
            </div>
        </div>

        {/* Loading State */}
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="relative">
                   <div className="w-16 h-16 border-4 rounded-full
                     border-zinc-200 dark:border-zinc-800"></div>
                   <div className="absolute top-0 left-0 w-16 h-16 border-4 rounded-full border-t-transparent animate-spin
                     border-cyan-600 dark:border-cyan-500"></div>
               </div>
               <div className="font-mono animate-pulse tracking-widest text-sm
                 text-cyan-700 dark:text-cyan-500">
                 SCANNING NETWORK...
               </div>
           </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedTestimonials.map((t, i) => (
                <div 
                  key={t.id || i} 
                  className="group relative rounded-xl overflow-hidden transition-all duration-500 border backdrop-blur-sm flex flex-col
                    bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-xl
                    dark:bg-zinc-900/30 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                >
                  {/* Hover Gradient Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                     bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5">
                  </div>
                  
                  {/* Tech Decoration Lines */}
                  <div className="absolute top-0 left-0 w-full h-1 transition-all duration-500
                     bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-600/50 dark:group-hover:via-cyan-500/50">
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors duration-500 rounded-br-xl
                     border-zinc-200 group-hover:border-fuchsia-600/50
                     dark:border-zinc-800 dark:group-hover:border-fuchsia-500/50">
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                      
                      {/* Header: ID & Icon */}
                      <div className="flex justify-between items-start mb-6">
                          <Quote size={40} className="transition-colors duration-500
                             text-zinc-200 group-hover:text-cyan-600/20
                             dark:text-zinc-800 dark:group-hover:text-cyan-500/20" />
                          <div className="font-mono text-[10px] px-2 py-1 rounded border
                             bg-zinc-100 text-zinc-500 border-zinc-200
                             dark:bg-black/40 dark:text-zinc-600 dark:border-zinc-800/50">
                              LOG_ID: {String(t.id).padStart(4, '0') || 'UNK'}
                          </div>
                      </div>

                      {/* Review Text */}
                      <TestimonialContent text={t.text || t.content} />

                      {/* Footer: Author Info */}
                      <div className="flex items-center gap-4 border-t pt-6 mt-auto
                         border-zinc-100 dark:border-zinc-800/50">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg text-white overflow-hidden
                             bg-gradient-to-br from-cyan-600 to-blue-700
                             dark:from-cyan-500 dark:to-blue-600">
                              {t.avatar ? (
                                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                              ) : (
                                t.name ? t.name.charAt(0) : <User size={16} />
                              )}
                          </div>
                          <div>
                              <h4 className="font-bold text-sm uppercase tracking-wide transition-colors
                                 text-zinc-900 group-hover:text-cyan-700
                                 dark:text-white dark:group-hover:text-cyan-400">
                                 {t.name || 'Anonymous User'}
                              </h4>
                              <p className="text-xs font-mono uppercase tracking-wider flex items-center gap-2
                                 text-zinc-500">
                                  {t.role || 'Client'} 
                                  <span className="w-1 h-1 rounded-full bg-green-500"></span>
                              </p>
                          </div>
                          <div className="ml-auto">
                             <ShieldCheck size={16} className="transition-colors
                                text-zinc-300 group-hover:text-green-600
                                dark:text-zinc-700 dark:group-hover:text-green-500" />
                          </div>
                      </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {(visibleCount < allTestimonials.length || visibleCount > INITIAL_COUNT) && (
              <div className="mt-16 flex flex-wrap justify-center gap-4">
                
                {/* Load More Button */}
                {visibleCount < allTestimonials.length && (
                  <button
                    onClick={handleShowMore}
                    className="group inline-flex items-center gap-2 px-8 py-3 rounded-full 
                      bg-white border border-zinc-200 text-zinc-700 shadow-sm
                      hover:border-cyan-500 hover:text-cyan-600
                      dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300
                      dark:hover:border-cyan-500 dark:hover:text-cyan-400
                      transition-all duration-300"
                  >
                    <span className="font-medium tracking-wide">LOAD MORE LOGS</span>
                    <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  </button>
                )}

                {/* Show Less Button */}
                {visibleCount > INITIAL_COUNT && (
                  <button
                    onClick={handleShowLess}
                    className="group inline-flex items-center gap-2 px-8 py-3 rounded-full 
                      bg-white border border-zinc-200 text-zinc-700 shadow-sm
                      hover:border-fuchsia-500 hover:text-fuchsia-600
                      dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300
                      dark:hover:border-fuchsia-500 dark:hover:text-fuchsia-400
                      transition-all duration-300"
                  >
                    <span className="font-medium tracking-wide">SHOW LESS</span>
                    <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
        
        {/* Empty State */}
        {!loading && allTestimonials.length === 0 && (
          <div className="text-center py-20 border border-dashed rounded-xl
              border-zinc-300 bg-zinc-100/50
              dark:border-zinc-800 dark:bg-zinc-900/20">
             <Wifi size={48} className="mx-auto mb-4
                text-zinc-400 dark:text-zinc-700" />
             <div className="font-mono text-lg mb-2
                text-zinc-500">
                NO SIGNALS DETECTED
             </div>
             <p className="text-sm
                text-zinc-400 dark:text-zinc-600">
                Be the first to establish a connection.
             </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;