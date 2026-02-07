import React from 'react';

const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden h-screen w-screen">
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] opacity-20"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
  </div>
);

export default ScanlineOverlay;