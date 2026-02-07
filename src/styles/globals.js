/**
 * App-wide styles and animations
 * Import this in App.jsx
 */

export const globalStyles = `
  .clip-polygon {
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  }

  .clip-polygon-card {
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  @keyframes glitch-1 {
    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
    20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
    40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
    80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
    100% { clip-path: inset(30% 0 20% 0); transform: translate(1px, -1px); }
  }

  @keyframes glitch-2 {
    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
    20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
    40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
    60% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, -2px); }
    80% { clip-path: inset(40% 0 10% 0); transform: translate(2px, 1px); }
    100% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, -1px); }
  }

  .animate-glitch-1 {
    animation: glitch-1 2.5s infinite linear alternate-reverse;
  }

  .animate-glitch-2 {
    animation: glitch-2 3s infinite linear alternate-reverse;
  }

  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }

  .animate-spin-reverse-slow {
    animation: spin-reverse 12s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes scan {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  .animate-scan {
    animation: scan 3s linear infinite;
  }
`;
