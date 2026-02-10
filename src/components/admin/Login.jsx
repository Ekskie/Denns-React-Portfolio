import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, ArrowLeft, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
    } else {
      navigate('/admin/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Return Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-zinc-500 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400 transition-colors font-mono uppercase tracking-widest text-xs font-bold group z-10"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Return to Portfolio
      </button>

      <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 p-8 w-full max-w-md clip-polygon-card relative shadow-2xl z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
        
        <div className="flex items-center gap-2 mb-8 text-cyan-600 dark:text-cyan-400 font-mono border-b border-gray-200 dark:border-zinc-800 pb-4">
          <div className="p-2 bg-cyan-500/10 rounded">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold tracking-wider">SYSTEM ACCESS</span>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-500 dark:text-zinc-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Identifier</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-white focus:border-cyan-600 dark:focus:border-cyan-500 outline-none transition-all font-mono rounded-sm focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              placeholder="admin@ekskie.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-zinc-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-white focus:border-fuchsia-600 dark:focus:border-fuchsia-500 outline-none transition-all font-mono rounded-sm focus:shadow-[0_0_15px_rgba(192,38,211,0.15)]"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 uppercase tracking-widest transition-all clip-polygon flex justify-center gap-2 items-center text-sm shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> 
                Authenticating...
              </>
            ) : (
              <>
                <Lock size={16} /> 
                Unlock Console
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
           <p className="text-[10px] text-zinc-400 font-mono">AUTHORIZED PERSONNEL ONLY</p>
        </div>
      </div>
    </div>
  );
};

export default Login;