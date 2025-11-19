const mongoose = require('mongoose');
const ClearanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  applicantName: { type: String, required: true },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}, { timestamps: true });
module.exports = mongoose.model('Clearance', ClearanceSchema);
