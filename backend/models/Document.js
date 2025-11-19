const mongoose = require('mongoose');
const DocumentSchema = new mongoose.Schema({
  filename: String,
  url: String,
  public_id: String,
  category: { type: String, default: 'Uncategorized' },
  tags: [String],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});
module.exports = require('mongoose').model('Document', DocumentSchema);
