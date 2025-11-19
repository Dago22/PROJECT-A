const Document = require('../models/Document');
const cloudinary = require('../config/cloudinary');
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file || !req.file.path) return res.status(400).json({ message: 'No file uploaded' });
    const newDoc = await Document.create({
      filename: req.file.originalname || req.file.filename || 'file',
      url: req.file.path,
      public_id: req.file.filename || req.file.public_id || null,
      category: req.body.category || 'Uncategorized',
      tags: req.body.tags ? req.body.tags.split(',').map(t=>t.trim()).filter(Boolean) : [],
      uploadedBy: req.user._id
    });
    res.status(200).json({ message: 'File uploaded', document: newDoc });
  } catch (err) { res.status(500).json({ message: 'Upload error', error: err.message }); }
};
exports.listDocuments = async (req, res) => {
  const q = {};
  // filtering by category or tag or uploader
  if (req.query.category) q.category = req.query.category;
  if (req.query.tag) q.tags = req.query.tag;
  if (req.query.uploader) q.uploadedBy = req.query.uploader;
  const docs = await Document.find(q).populate('uploadedBy','name email').sort({ createdAt: -1 });
  res.json(docs);
};
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    // public_id stored may be null; try to extract from url as fallback
    const publicId = doc.public_id || (doc.url && doc.url.split('/').slice(-1)[0].split('.')[0]);
    if (publicId) await cloudinary.uploader.destroy(`clearance_documents/${publicId}`);
    await doc.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Delete error', error: err.message }); }
};
