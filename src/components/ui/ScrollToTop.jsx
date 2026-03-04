import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center
        clip-polygon transition-all duration-300 shadow-lg
        bg-zinc-900 text-white hover:bg-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]
        dark:bg-zinc-800 dark:text-white dark:hover:bg-cyan-500 dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
