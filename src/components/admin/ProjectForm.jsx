import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { X, Plus, Trash2, Image, Save, Layers, List, Loader2, Upload } from 'lucide-react';

const ProjectForm = ({ onClose, onSaved, initialData }) => {
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Dev',
    image_url: '',
    link: '',
    repo_link: '',
    story: '',
  });

  // Array/Complex States
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState([]);
  
  const [galleryInput, setGalleryInput] = useState('');
  const [gallery, setGallery] = useState([]);

  // Stats is an array of objects for easier editing: [{ key: 'Role', value: 'Lead' }]
  const [stats, setStats] = useState([]);
  const [newStat, setNewStat] = useState({ key: '', value: '' });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Initialize Data on Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Web Dev',
        image_url: initialData.image_url || '',
        link: initialData.link || '',
        repo_link: initialData.repo_link || '',
        story: initialData.story || '',
      });
      setTechStack(initialData.tech || []);
      setGallery(initialData.gallery || []);
      
      // Convert stats object { Role: 'Dev' } to array [{key:'Role', value:'Dev'}]
      if (initialData.stats) {
        setStats(Object.entries(initialData.stats).map(([key, value]) => ({ key, value })));
      }
    }
  }, [initialData]);

  // --- Helpers ---
  const uploadFile = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // --- Handlers ---

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload Handlers
  const handleMainImageUpload = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const publicUrl = await uploadFile(file);
      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryImageUpload = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const publicUrl = await uploadFile(file);
      setGallery([...gallery, publicUrl]);
    } catch (error) {
      alert('Error uploading gallery image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Tech Stack Handlers
  const addTech = (e) => {
    e.preventDefault();
    if (techInput.trim()) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };
  const removeTech = (idx) => {
    setTechStack(techStack.filter((_, i) => i !== idx));
  };

  // Gallery Handlers
  const addGalleryImage = (e) => {
    e.preventDefault();
    if (galleryInput.trim()) {
      setGallery([...gallery, galleryInput.trim()]);
      setGalleryInput('');
    }
  };
  const removeGalleryImage = (idx) => {
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  // Stats Handlers
  const addStat = (e) => {
    e.preventDefault();
    if (newStat.key && newStat.value) {
      setStats([...stats, { ...newStat }]);
      setNewStat({ key: '', value: '' });
    }
  };
  const removeStat = (idx) => {
    setStats(stats.filter((_, i) => i !== idx));
  };

  // Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert stats array back to object
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    const payload = {
      ...formData,
      tech: techStack,
      gallery: gallery,
      stats: statsObject
    };

    let error;
    if (initialData?.id) {
      // Update
      const { error: updateError } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', initialData.id);
      error = updateError;
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('projects')
        .insert([payload]);
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
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/90 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-cyan-400 font-mono uppercase">
            {initialData ? `Editing: ${initialData.title}` : 'New Project Protocol'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* Section 1: Core Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Project Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none" placeholder="e.g. Neon E-Commerce" />
              </div>
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none">
                  <option value="Web Dev">Web Development</option>
                  <option value="Game/App">Game / App</option>
                  <option value="Product Design">Product Design</option>
                  <option value="System Tool">System Tool</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs uppercase text-zinc-500 mb-1">Main Image</label>
                 <div className="flex flex-col gap-2">
                   <div className="flex gap-2">
                      <input name="image_url" value={formData.image_url} onChange={handleChange}
                        className="flex-grow bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none text-sm" placeholder="https://..." />
                      <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded flex items-center justify-center border border-zinc-700">
                          <Upload size={18} />
                          <input type="file" accept="image/*" onChange={handleMainImageUpload} className="hidden" />
                      </label>
                   </div>
                   {uploading && <span className="text-xs text-cyan-500 animate-pulse">Uploading asset...</span>}
                 </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-1">Short Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={6} required
                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none resize-none" placeholder="Brief overview for the card..." />
            </div>
          </div>

          <hr className="border-zinc-800" />

          {/* Section 2: Deep Dive Content */}
          <div className="space-y-6">
             <h3 className="text-cyan-400 font-bold uppercase text-sm flex items-center gap-2">
               <Layers size={16} /> Deep Dive Content
             </h3>

             {/* Story */}
             <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Full Story (Mission Brief)</label>
                <textarea name="story" value={formData.story} onChange={handleChange} rows={6}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none font-mono text-sm" 
                  placeholder="Detailed breakdown of the problem, solution, and execution..." />
             </div>

             {/* Gallery Management */}
             <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">System Visuals (Gallery)</label>
                <div className="flex gap-2 mb-3">
                  <input value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)}
                    className="flex-grow bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm" placeholder="Image URL..." />
                  
                  {/* Upload Button */}
                  <label className="cursor-pointer px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-white flex items-center border border-zinc-700">
                     <Upload size={16} />
                     <input type="file" accept="image/*" onChange={handleGalleryImageUpload} className="hidden" />
                  </label>

                  {/* Add URL Button */}
                  <button type="button" onClick={addGalleryImage} className="px-4 bg-zinc-800 hover:bg-zinc-700 rounded text-white border border-zinc-700"><Plus size={16} /></button>
                </div>
                
                {gallery.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-zinc-950 p-2 rounded border border-zinc-800">
                    {gallery.map((url, idx) => (
                      <div key={idx} className="relative group aspect-video bg-black rounded overflow-hidden border border-zinc-800">
                         <img src={url} alt="Gallery" className="w-full h-full object-cover opacity-70" />
                         <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute inset-0 bg-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500 font-bold">
                            <Trash2 size={20} />
                         </button>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>

          <hr className="border-zinc-800" />

          {/* Section 3: Technical Specs */}
          <div className="grid md:grid-cols-2 gap-8">
             
             {/* Tech Stack */}
             <div>
               <label className="block text-xs uppercase text-zinc-500 mb-2 flex items-center gap-2"><List size={14}/> Tech Stack</label>
               <div className="flex gap-2 mb-2">
                  <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                    className="flex-grow bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm" placeholder="React, Three.js..." />
                  <button type="button" onClick={addTech} className="px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-white border border-zinc-700"><Plus size={16}/></button>
               </div>
               <div className="flex flex-wrap gap-2">
                 {techStack.map((tech, idx) => (
                   <span key={idx} className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded border border-cyan-900/50 flex items-center gap-2">
                     {tech}
                     <button type="button" onClick={() => removeTech(idx)} className="hover:text-red-400"><X size={12}/></button>
                   </span>
                 ))}
               </div>
             </div>

             {/* Stats (Key-Value) */}
             <div>
               <label className="block text-xs uppercase text-zinc-500 mb-2 flex items-center gap-2"><List size={14}/> Project Stats</label>
               <div className="flex gap-2 mb-2">
                  <input value={newStat.key} onChange={(e) => setNewStat({...newStat, key: e.target.value})}
                    className="w-1/3 bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm" placeholder="Label" />
                  <input value={newStat.value} onChange={(e) => setNewStat({...newStat, value: e.target.value})}
                    className="flex-grow bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm" placeholder="Value" />
                  <button type="button" onClick={addStat} className="px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-white border border-zinc-700"><Plus size={16}/></button>
               </div>
               <div className="space-y-1">
                 {stats.map((stat, idx) => (
                   <div key={idx} className="flex justify-between items-center bg-zinc-950 px-3 py-1 rounded border border-zinc-800 text-xs">
                      <span className="text-zinc-500 uppercase">{stat.key}:</span>
                      <span className="text-white font-mono flex items-center gap-2">
                        {stat.value}
                        <button type="button" onClick={() => removeStat(idx)} className="text-zinc-600 hover:text-red-500"><X size={12}/></button>
                      </span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
          
          <hr className="border-zinc-800" />
          
          {/* Section 4: Links */}
          <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Live Demo URL</label>
                <input name="link" value={formData.link} onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-1">Repo URL</label>
                <input name="repo_link" value={formData.repo_link} onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded text-white focus:border-cyan-500 outline-none" placeholder="https://github.com/..." />
              </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6 -mx-6 -mb-6 flex justify-end gap-4">
             <button type="button" onClick={onClose} className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">CANCEL</button>
             <button type="submit" disabled={loading} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 disabled:opacity-50">
                {loading || uploading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {initialData ? 'Update System' : 'Initialize'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;