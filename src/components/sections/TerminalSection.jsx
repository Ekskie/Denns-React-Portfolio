import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Command } from 'lucide-react';

const TerminalSection = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', content: 'EkskieOS v2.6.0 [Secure Connection]' },
    { type: 'system', content: 'Copyright (c) 2026 Dennrick Agustin' },
    { type: 'info', content: 'Type "help" to see available commands.' },
  ]);
  
  // Game State
  const [gameState, setGameState] = useState({
    active: false,
    target: 0,
    attempts: 0
  });

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  // Handle intersection observer to focus input when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
            // Only focus when the user actually looks at the terminal
            inputRef.current?.focus({ preventScroll: true });
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
        observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const handleGameInput = (cmd) => {
    const command = cmd.trim().toLowerCase();

    // Allow exit
    if (command === 'exit' || command === 'quit') {
        setGameState({ active: false, target: 0, attempts: 0 });
        setOutput(prev => [...prev, 
            { type: 'command', content: cmd },
            { type: 'system', content: 'Decryption aborted. Returning to shell...' }
        ]);
        return;
    }

    const guess = parseInt(command);
    
    if (isNaN(guess)) {
        setOutput(prev => [...prev, 
            { type: 'command', content: cmd },
            { type: 'error', content: 'Invalid input. Enter a number (0-100) or type "exit".' }
        ]);
        return;
    }

    const newAttempts = gameState.attempts + 1;
    let response;
    let type = 'text';

    if (guess === gameState.target) {
        response = `SUCCESS: Decryption key [${gameState.target}] verified. Firewall bypassed in ${newAttempts} attempts.`;
        type = 'success';
        setGameState({ active: false, target: 0, attempts: 0 });
    } else if (guess < gameState.target) {
        response = `Error: Key fragment [${guess}] is too LOW. Signal strength weak.`;
        setGameState(prev => ({ ...prev, attempts: newAttempts }));
    } else {
        response = `Error: Key fragment [${guess}] is too HIGH. Signal overload.`;
        setGameState(prev => ({ ...prev, attempts: newAttempts }));
    }

    setOutput(prev => [...prev, 
        { type: 'command', content: cmd },
        { type: type, content: response }
    ]);
  };

  const handleCommand = (cmd) => {
    // Intercept input if game is active
    if (gameState.active) {
        handleGameInput(cmd);
        return;
    }

    const command = cmd.trim().toLowerCase();
    let response = null;
    let type = 'text';

    switch (command) {
      case 'help':
        response = (
          <div className="space-y-1 mt-2 mb-2">
            <p className="text-zinc-600 dark:text-zinc-300">Available commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:w-2/3">
              <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">about</span> <span className="text-zinc-400 dark:text-zinc-500">-</span> <span className="text-zinc-500 dark:text-zinc-400">Who is Dennrick?</span></div>
              <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">skills</span> <span className="text-zinc-400 dark:text-zinc-500">-</span> <span className="text-zinc-500 dark:text-zinc-400">View tech stack</span></div>
              <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">projects</span> <span className="text-zinc-400 dark:text-zinc-500">-</span> <span className="text-zinc-500 dark:text-zinc-400">Navigate to work</span></div>
              <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">contact</span> <span className="text-zinc-400 dark:text-zinc-500">-</span> <span className="text-zinc-500 dark:text-zinc-400">Send a signal</span></div>
              <div><span className="text-cyan-600 dark:text-cyan-400 font-bold">clear</span> <span className="text-zinc-400 dark:text-zinc-500">-</span> <span className="text-zinc-500 dark:text-zinc-400">Clear screen</span></div>
              <div><span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold">play game</span> <span className="text-zinc-400 dark:text-zinc-500">-</span> <span className="text-zinc-500 dark:text-zinc-400">Start minigame</span></div>
            </div>
            <p className="text-zinc-500 dark:text-zinc-600 mt-2 text-xs">Tip: Try finding hidden commands...</p>
          </div>
        );
        break;
      case 'about':
        response = "I'm Dennrick, a developer who loves blending creativity with logic. I build immersive web experiences and explore game development in my free time.";
        break;
      case 'skills':
        response = (
          <div className="flex flex-wrap gap-2 mt-1">
            {['React', 'Node.js', 'Three.js', 'TailwindCSS', 'Godot', 'Python', 'Firebase'].map(skill => (
                <span key={skill} className="px-2 py-0.5 rounded text-xs font-mono border
                  bg-cyan-100 text-cyan-700 border-cyan-200
                  dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800/50">
                    {skill}
                </span>
            ))}
          </div>
        );
        break;
      case 'projects':
        response = "Initiating jump to [Projects] sector...";
        type = 'system';
        setTimeout(() => {
           const section = document.getElementById('projects');
           if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 800);
        break;
      case 'contact':
        response = "Opening secure channel to [Contact] sector...";
        type = 'system';
        setTimeout(() => {
           const section = document.getElementById('contact');
           if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 800);
        break;
      case 'play game':
      case 'game':
        const target = Math.floor(Math.random() * 100) + 1;
        setGameState({ active: true, target: target, attempts: 0 });
        response = (
            <div className="text-fuchsia-600 dark:text-fuchsia-300">
                <p>⚠️ SECURITY PROTOCOL INITIATED</p>
                <p>Firewall detected. To bypass, you must guess the decryption key (Number between 1-100).</p>
                <p className="mt-1 text-zinc-500 dark:text-zinc-500 text-xs">Type 'exit' to quit anytime.</p>
            </div>
        );
        break;
      case 'clear':
        setOutput([]);
        return;
      
      // Easter Eggs
      case 'sudo':
        response = "Permission denied: You are not an Admin. Nice try though.";
        type = 'error';
        break;
      case 'ls':
        response = (
            <div className="grid grid-cols-3 gap-4 text-fuchsia-600 dark:text-fuchsia-400">
                <span>secret_plans.txt</span>
                <span>world_domination.sh</span>
                <span>cat_photos/</span>
            </div>
        );
        break;
      case 'cat':
        response = "Meow. 🐱";
        break;
      case 'matrix':
        response = <span className="text-green-600 dark:text-green-500 animate-pulse">Wake up, Neo... The Matrix has you...</span>;
        break;
      case '':
        response = null;
        break;
      default:
        response = `Command not found: '${command}'. Type 'help' for a list of commands.`;
        type = 'error';
    }

    if (command) {
        setOutput(prev => [...prev, 
            { type: 'command', content: cmd },
            { type: type, content: response }
        ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <section ref={containerRef} className="py-24 relative flex justify-center items-center px-4 overflow-hidden transition-colors duration-500
      bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900">
        
        {/* Background Effects (Grid from other sections) */}
        <div className="absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-30
            bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
            dark:bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)]">
        </div>
        
        <div className="absolute bottom-0 w-full h-px 
            bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
        </div>

        <div className="w-full max-w-3xl relative z-10 group">
            
            {/* Glow Effect behind terminal */}
            <div className="absolute -inset-1 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000
                bg-gradient-to-r from-cyan-400/30 to-fuchsia-500/30
                dark:from-cyan-500/20 dark:to-fuchsia-500/20">
            </div>

            {/* Terminal Window */}
            <div className="relative backdrop-blur-xl border rounded-lg overflow-hidden shadow-2xl flex flex-col h-[500px] transition-colors duration-500
                bg-white/90 border-zinc-200
                dark:bg-[#0c0c0c] dark:border-zinc-800">
                
                {/* Header Bar */}
                <div className="px-4 py-3 flex items-center justify-between border-b transition-colors duration-500
                    bg-zinc-100/80 border-zinc-200
                    dark:bg-zinc-900/80 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                        </div>
                        <div className="flex items-center gap-2 ml-2 px-3 py-1 rounded-md border text-xs font-mono
                            bg-zinc-200/50 text-zinc-600 border-zinc-300/50
                            dark:bg-black/30 dark:text-zinc-400 dark:border-zinc-800/50">
                            <Terminal size={12} className="text-cyan-600 dark:text-cyan-500" />
                            <span>guest@denn-portfolio:~</span>
                        </div>
                    </div>
                </div>

                {/* Terminal Content */}
                <div 
                    ref={terminalBodyRef}
                    className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                    onClick={() => inputRef.current?.focus()}
                >
                    {output.map((line, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                            {line.type === 'command' ? (
                                 <div className="flex items-start gap-2 mt-4
                                    text-zinc-400">
                                    <span className="shrink-0 text-fuchsia-600 dark:text-fuchsia-500">➜</span>
                                    <span className="shrink-0 text-zinc-400 dark:text-zinc-500">~</span>
                                    <span className="font-bold text-zinc-900 dark:text-white">{line.content}</span>
                                 </div>
                            ) : line.type === 'system' ? (
                                <div className="text-xs uppercase tracking-widest mb-1
                                    text-cyan-700 dark:text-cyan-500/60">{line.content}</div>
                            ) : line.type === 'info' ? (
                                <div className="italic mb-2
                                    text-zinc-500 dark:text-zinc-400">{line.content}</div>
                            ) : line.type === 'error' ? (
                                <div className="inline-block px-2 py-0.5 rounded border
                                    text-red-600 bg-red-100/50 border-red-200
                                    dark:text-red-400 dark:bg-red-900/10 dark:border-red-900/30">{line.content}</div>
                            ) : line.type === 'success' ? (
                                <div className="font-bold ml-6
                                    text-green-600 dark:text-green-400">{line.content}</div>
                            ) : (
                                <div className="ml-6 leading-relaxed
                                    text-zinc-700 dark:text-zinc-300">{line.content}</div>
                            )}
                        </div>
                    ))}
                    
                    {/* Active Input Line */}
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 text-zinc-300">
                        <span className="animate-pulse text-fuchsia-600 dark:text-fuchsia-500">➜</span>
                        <span className="text-cyan-600 dark:text-cyan-500">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent border-none outline-none w-full font-mono
                                text-zinc-900 placeholder-zinc-400
                                dark:text-white dark:placeholder-zinc-700"
                            placeholder={gameState.active ? "Enter decryption key..." : "Type command..."}
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </form>
                </div>
            </div>

            {/* Decorative Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2
                text-zinc-500 dark:text-zinc-600">
                 <Command size={12} /> Interactive Playground Area
            </div>
        </div>
    </section>
  );
};

export default TerminalSection;