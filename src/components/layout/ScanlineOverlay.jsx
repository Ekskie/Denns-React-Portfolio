import React from 'react';

const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden h-screen w-screen">
    {/* Scanlines
        Light: Very subtle dark lines on transparent background (Clean Lab Monitor)
        Dark: Stronger lines on dark background (CRT Screen)
    */}
    <div className="absolute inset-0 bg-[size:100%_4px] opacity-20
      bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.05)_50%)]
      dark:bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)]">
    </div>
    
    {/* Vignette 
        Light: Subtle clean corner darkening
        Dark: Heavy immersive corner darkening
    */}
    <div className="absolute inset-0 
      bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.1)_100%)]
      dark:bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]">
    </div>
  </div>
);

export default ScanlineOverlay;