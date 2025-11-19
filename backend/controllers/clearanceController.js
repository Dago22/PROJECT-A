const Clearance = require('../models/Clearance');
exports.createClearance = async (req, res) => {
  try {
    const c = new Clearance({ ...req.body });
    await c.save();
    res.json(c);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};
exports.getClearances = async (req, res) => {
  try {
    const list = await Clearance.find().populate('assignedTo','name email').populate('documents');
    res.json(list);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};
exports.getClearance = async (req, res) => {
  try {
    const c = await Clearance.findById(req.params.id).populate('assignedTo','name').populate('documents');
    if (!c) return res.status(404).json({ msg: 'Not found' });
    res.json(c);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};
exports.updateClearance = async (req, res) => {
  try {
    const c = await Clearance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};
exports.deleteClearance = async (req, res) => {
  try {
    await Clearance.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};
