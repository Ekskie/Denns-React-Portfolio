import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/admin/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 p-8 w-full max-w-md clip-polygon-card relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
        <div className="flex items-center gap-2 mb-6 text-cyan-600 dark:text-cyan-400 font-mono">
          <Terminal size={24} />
          <span className="text-xl font-bold tracking-wider">SYSTEM ACCESS</span>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-600 dark:text-zinc-500 text-xs uppercase tracking-widest mb-2">Identifier</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 dark:bg-black border border-gray-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-white focus:border-cyan-600 dark:focus:border-cyan-500 outline-none transition-colors font-mono"
              placeholder="admin@ekskie.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-zinc-500 text-xs uppercase tracking-widest mb-2">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 dark:bg-black border border-gray-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-white focus:border-fuchsia-600 dark:focus:border-fuchsia-500 outline-none transition-colors font-mono"
              placeholder="••••••••"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 uppercase tracking-widest transition-all clip-polygon flex justify-center gap-2 items-center"
          >
            {loading ? 'Authenticating...' : <><Lock size={16} /> Unlock Console</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;