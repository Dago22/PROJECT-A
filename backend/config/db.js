/**
 * Database connection helper
 *
 * If you have a MongoDB connection string (example provided below), do NOT paste
 * credentials directly into source files. Instead create `backend/.env` from
 * `backend/.env.example` and set the MONGO_URI environment variable there.
 *
 * Example connection string format (do not commit actual credentials):
 *
 * mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.87fgdxx.mongodb.net/<DBNAME>?retryWrites=true&w=majority&appName=Cluster0
 *
 * Note: If your password contains special characters (for example `@`) you must
 * URL-encode them (for example `@` becomes `%40`).
 *
 * Example (URL-encoded password):
 * mongodb+srv://ALLY:%40K111213@cluster0.87fgdxx.mongodb.net/<DBNAME>?retryWrites=true&w=majority&appName=Cluster0
 */
const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
