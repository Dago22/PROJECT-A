const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const uploadController = require('../controllers/uploadController');

router.post('/', auth, upload.single('document'), uploadController.uploadDocument);
// list & delete - admin only
router.get('/', auth, async (req,res,next)=>{ await auth(req,res,next); if (req.user.role!=='admin') return res.status(403).json({message:'Forbidden'}); next(); }, uploadController.listDocuments);
router.delete('/:id', auth, async (req,res,next)=>{ await auth(req,res,next); if (req.user.role!=='admin') return res.status(403).json({message:'Forbidden'}); next(); }, uploadController.deleteDocument);

module.exports = router;
