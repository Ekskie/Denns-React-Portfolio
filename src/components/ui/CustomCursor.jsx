import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable on touch devices immediately to save resources
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    
    // State for position
    let mouseX = -100;
    let mouseY = -100;
    
    // Trailer position (interpolated)
    let trailerX = -100;
    let trailerY = -100;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // 1. Instant update for the center dot (No lag)
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) rotate(45deg)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const target = e.target;
      // Expanded detection for interactive elements
      const isClickable = 
        target.matches('a, button, input, textarea, select, [role="button"]') ||
        target.closest('a, button, [role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    // Animation Loop
    let animationFrameId;
    
    const animate = () => {
      // 2. Faster Lerp (0.35) for a snappier, responsive feel. 
      // Lower numbers = floaty/laggy. Higher numbers = tight/responsive.
      const speed = 0.35; 
      
      trailerX += (mouseX - trailerX) * speed;
      trailerY += (mouseY - trailerY) * speed;
      
      if (trailer) {
        trailer.style.transform = `translate3d(${trailerX}px, ${trailerY}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* 1. Primary Precision Pointer (Diamond Shape) */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className={`
          w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]
          transition-all duration-200 ease-out
          ${isHovering ? 'scale-0' : 'scale-100'} 
        `} />
      </div>
      
      {/* 2. Secondary HUD/Reticle (Follows with slight physics) */}
      <div 
        ref={trailerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className={`
          border border-cyan-500/80 transition-all duration-300 ease-out relative
          ${isHovering ? 'w-12 h-12 bg-cyan-500/10 rotate-90 rounded-none border-dashed' : 'w-6 h-6 rotate-45 rounded-sm'}
          ${isClicking ? 'scale-75 bg-cyan-400/30 border-cyan-400' : 'scale-100'}
        `}>
          {/* Corner accents for tech feel */}
          <div className={`absolute -top-1 -left-1 w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Crosshair lines */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/50 transition-all duration-300 
            ${isHovering ? 'w-[140%] h-[1px]' : 'w-0 h-0'}`} 
          />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/50 transition-all duration-300 
            ${isHovering ? 'w-[1px] h-[140%]' : 'w-0 h-0'}`} 
          />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;