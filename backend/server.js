const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const clearanceRoutes = require('./routes/clearances');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json({ limit: '20mb' }));

if (!process.env.MONGO_URI) {
	console.error('Missing MONGO_URI environment variable. Create a backend/.env file from backend/.env.example and set MONGO_URI.');
	process.exit(1);
}
connectDB(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/clearances', clearanceRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
