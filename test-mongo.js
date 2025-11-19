// test-mongo.js — run from project root: node test-mongo.js
require('dotenv').config({ path: require('path').join(__dirname, 'backend', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not set in backend/.env');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB with URI:', uri.replace(/(:)([^@]+)@/, '$1<redacted>@'));

mongoose.connect(uri, { connectTimeoutMS: 10000 })
  .then(() => {
    console.log('Connected OK');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('Connection error:', err.message);
    // print stack for more details but careful not to expose credentials
    console.error(err);
    process.exit(1);
  });
