import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { X, Save, Loader2, MessageSquare, User, Briefcase } from 'lucide-react';

const TestimonialForm = ({ onClose, onSaved, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        role: initialData.role || '',
        text: initialData.text || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let error;
    if (initialData?.id) {
      // Update
      const { error: updateError } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', initialData.id);
      error = updateError;
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('testimonials')
        .insert([formData]);
      error = insertError;
    }

    setLoading(false);
    if (error) {
      alert("Error saving: " + error.message);
    } else {
      onSaved();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-lg shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/90 rounded-t-lg">
          <h2 className="text-xl font-bold text-fuchsia-500 font-mono uppercase flex items-center gap-2">
            <MessageSquare size={20} />
            {initialData ? 'Edit Feedback' : 'New Feedback'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-1 flex items-center gap-1">
                <User size={12} /> Name
              </label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-fuchsia-500 outline-none transition-colors" 
                placeholder="e.g. Sarah Connor" 
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-1 flex items-center gap-1">
                <Briefcase size={12} /> Role / Company
              </label>
              <input 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                required
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-fuchsia-500 outline-none transition-colors" 
                placeholder="e.g. CTO @ Skynet" 
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-1">Testimonial Text</label>
              <textarea 
                name="text" 
                value={formData.text} 
                onChange={handleChange} 
                rows={4} 
                required
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-fuchsia-500 outline-none resize-none transition-colors" 
                placeholder="Enter feedback here..." 
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
             <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase"
             >
                Cancel
             </button>
             <button 
                type="submit" 
                disabled={loading} 
                className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 disabled:opacity-50 text-sm shadow-[0_0_15px_rgba(192,38,211,0.3)]"
             >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {initialData ? 'Update Record' : 'Save Record'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;