import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Save, Loader2 } from 'lucide-react';

const TestimonialForm = ({ onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('testimonials').insert([formData]);
      if (error) throw error;
      onSaved();
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-fuchsia-500/30 p-6 w-full max-w-md clip-polygon-card relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X /></button>
        
        <h2 className="text-xl font-bold text-fuchsia-500 mb-6 font-mono uppercase border-b border-zinc-800 pb-2">Log Feedback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Client Name</label>
            <input required type="text" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-fuchsia-500 outline-none" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Role / Company</label>
            <input required type="text" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-fuchsia-500 outline-none" 
              value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
          </div>

          <div>
             <label className="block text-xs text-gray-500 uppercase mb-1">Testimonial Text</label>
             <textarea required rows="4" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-fuchsia-500 outline-none"
               value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 mt-4 flex justify-center items-center gap-2 uppercase tracking-widest clip-polygon">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Archive Data</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;