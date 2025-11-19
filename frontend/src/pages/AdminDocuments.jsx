import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDocuments = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ category:'', tag:'', uploader:'' });
  const [categories, setCategories] = useState(['Building','Environmental','Finance','Academic','Personal','Uncategorized']);

  const fetchDocs = async (q={}) => {
    const params = new URLSearchParams();
    if (q.category) params.append('category', q.category);
    if (q.tag) params.append('tag', q.tag);
    if (q.uploader) params.append('uploader', q.uploader);
    const res = await axios.get('/api/upload?' + params.toString());
    setDocs(res.data);
    setLoading(false);
  };

  useEffect(()=>{ fetchDocs(); }, []);

  const deleteDoc = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    await axios.delete(`/api/upload/${id}`);
    setDocs(docs.filter((d) => d._id !== id));
  };

  const applyFilter = () => { setLoading(true); fetchDocs(query); };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📂 Uploaded Documents</h2>

      <div className="flex gap-2 mb-4">
        <select className="p-2 border rounded" value={query.category} onChange={e=>setQuery({...query, category:e.target.value})}>
          <option value=''>All Categories</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="Tag" value={query.tag} onChange={e=>setQuery({...query, tag:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Uploader ID" value={query.uploader} onChange={e=>setQuery({...query, uploader:e.target.value})} className="p-2 border rounded" />
        <button onClick={applyFilter} className="bg-indigo-600 text-white px-3 py-1 rounded">Filter</button>
        <button onClick={()=>{ setQuery({category:'',tag:'',uploader:''}); fetchDocs(); }} className="bg-gray-200 px-3 py-1 rounded">Reset</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <motion.div key={doc._id} whileHover={{ scale: 1.03 }} className="bg-white shadow-lg p-4 rounded-xl border border-gray-100">
            <p className="font-medium">{doc.filename}</p>
            <p className="text-sm text-gray-500">Category: {doc.category}</p>
            <p className="text-sm text-gray-500">Tags: {doc.tags?.join(', ')}</p>
            <p className="text-sm text-gray-500">Uploaded by: {doc.uploadedBy?.name || 'Unknown'}</p>
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mt-2">View</a>
            <button onClick={() => deleteDoc(doc._id)} className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDocuments;
