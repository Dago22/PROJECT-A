const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, auth denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) { res.status(401).json({ msg: 'Token is not valid' }); }
};
module.exports.adminOnly = function(req,res,next){
  if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};
