import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const predefinedCategories = ['Building','Environmental','Finance','Academic','Personal','Uncategorized'];

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('category', category);
    formData.append('tags', tags);
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFileUrl(res.data.document.url);
      alert('Uploaded');
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Upload Clearance Document</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="mb-3 p-2 rounded border">
          {predefinedCategories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags (comma separated)" className="w-full p-3 rounded mb-3" />
        <button onClick={handleUpload} disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {fileUrl && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-600"><p>✅ Uploaded successfully!</p><a href={fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Document</a></motion.div>)}
      </motion.div>
    </div>
  );
};

export default UploadDocument;
