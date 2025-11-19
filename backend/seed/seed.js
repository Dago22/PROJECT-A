require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Clearance = require('../models/Clearance');
const Document = require('../models/Document');
const bcrypt = require('bcryptjs');

(async () => {
  await connectDB(process.env.MONGO_URI);
  await User.deleteMany();
  await Clearance.deleteMany();
  await Document.deleteMany();

  const adminPass = await bcrypt.hash('AdminPass123', 10);
  const userPass = await bcrypt.hash('UserPass123', 10);

  const admin = new User({ name: 'Super Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
  const alice = new User({ name: 'Alice Mwanga', email: 'alice@example.com', password: userPass, role: 'user' });
  const bob = new User({ name: 'Bob Chuma', email: 'bob@example.com', password: userPass, role: 'user' });

  await admin.save(); await alice.save(); await bob.save();

  // sample documents (note: these won't have actual cloudinary urls in local seed)
  const d1 = new Document({ filename: 'building.pdf', url: 'https://res.cloudinary.com/demo/image/upload/sample.pdf', public_id: 'sample', category: 'Building', tags: ['building','permit'], uploadedBy: admin._id });
  const d2 = new Document({ filename: 'env.docx', url: 'https://res.cloudinary.com/demo/image/upload/sample2.pdf', public_id: 'sample2', category: 'Environmental', tags: ['environment','report'], uploadedBy: alice._id });
  await d1.save(); await d2.save();

  const c1 = new Clearance({ title: 'Building Clearance - Plot 12', description: 'Request for building clearance', applicantName: 'Alice Mwanga', status: 'pending', assignedTo: admin._id, documents: [d1._id] });
  const c2 = new Clearance({ title: 'Environmental Clearance - Farm', description: 'Environmental impact review', applicantName: 'Bob Chuma', status: 'approved', assignedTo: admin._id, documents: [d2._id] });
  await c1.save(); await c2.save();

  console.log('Seeded users, clearances and documents');
  process.exit(0);
})();
