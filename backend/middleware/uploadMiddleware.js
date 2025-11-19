const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'clearance_documents',
    allowed_formats: ['pdf','png','jpg','jpeg','doc','docx'],
  },
});
const upload = multer({ storage });
module.exports = upload;
