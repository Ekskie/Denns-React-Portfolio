import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Upload, X, Save, Loader2 } from 'lucide-react';

const ProjectForm = ({ onClose, onSaved, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Dev',
    description: '',
    link: '#',
    techInput: '', 
    statsJson: '{"ux": 90, "code": 85}' 
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Web Dev',
        description: initialData.description || '',
        link: initialData.link || '#',
        techInput: initialData.tech ? initialData.tech.join(', ') : '',
        statsJson: initialData.stats ? JSON.stringify(initialData.stats, null, 2) : '{}'
      });
      if (initialData.image_url) {
        setPreviewUrl(initialData.image_url);
      }
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = initialData?.image_url || '';

      // 1. Upload Image (only if a new file is selected)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio') 
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      // 2. Parse Data
      const techArray = formData.techInput.split(',').map(t => t.trim()).filter(t => t);
      let statsObj = {};
      try {
        statsObj = JSON.parse(formData.statsJson);
      } catch (err) {
        alert("Invalid JSON for Stats");
        setLoading(false);
        return;
      }

      const projectPayload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        link: formData.link,
        image_url: imageUrl,
        tech: techArray,
        stats: statsObj
      };

      // 3. Insert or Update DB
      if (initialData) {
        // Update existing record
        const { error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('projects')
          .insert([projectPayload]);
        if (error) throw error;
      }

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
      <div className="bg-zinc-900 border border-cyan-500/30 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto clip-polygon-card relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X /></button>
        
        <h2 className="text-xl font-bold text-cyan-400 mb-6 font-mono uppercase border-b border-zinc-800 pb-2">
          {initialData ? `Edit Project: ${initialData.id}` : 'Initialize New Project'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-1">Title</label>
              <input required type="text" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-cyan-500 outline-none" 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-1">Category</label>
              <select className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-cyan-500 outline-none"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option>Web Dev</option>
                <option>Game/App</option>
                <option>Product Design</option>
                <option>3D/Art</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Project Image</label>
            <div className="border border-dashed border-zinc-700 p-4 text-center hover:border-cyan-500 transition-colors cursor-pointer relative group">
               <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
               <div className="flex flex-col items-center gap-2 text-zinc-500">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-32 object-contain" />
                  ) : (
                    <>
                      <Upload size={20} />
                      <span className="text-xs">Drag or Click to Upload</span>
                    </>
                  )}
               </div>
               {previewUrl && <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-cyan-400 text-xs">Change Image</span></div>}
            </div>
          </div>

          <div>
             <label className="block text-xs text-gray-500 uppercase mb-1">Description</label>
             <textarea required rows="3" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-cyan-500 outline-none"
               value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
               <label className="block text-xs text-gray-500 uppercase mb-1">Tech Stack (comma separated)</label>
               <input type="text" placeholder="React, CSS, Node" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-cyan-500 outline-none"
                 value={formData.techInput} onChange={e => setFormData({...formData, techInput: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs text-gray-500 uppercase mb-1">Live Link</label>
               <input type="text" className="w-full bg-black border border-zinc-700 p-2 text-white focus:border-cyan-500 outline-none"
                 value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
          </div>

          <div>
             <label className="block text-xs text-gray-500 uppercase mb-1">Stats (JSON Format)</label>
             <textarea rows="4" className="w-full bg-black border border-zinc-700 p-2 text-green-400 font-mono text-xs focus:border-cyan-500 outline-none"
               value={formData.statsJson} onChange={e => setFormData({...formData, statsJson: e.target.value})} />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 mt-4 flex justify-center items-center gap-2 uppercase tracking-widest clip-polygon">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> {initialData ? 'Update Data' : 'Compile & Save'}</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;