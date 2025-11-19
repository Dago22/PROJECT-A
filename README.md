# Clearance Management System - Full Package (Cloudinary)

This bundle contains a MERN application with:
- Cloudinary uploads (document categories & tags)
- Admin-only listing, filtering, and deletion
- Animated frontend UI (Framer Motion + Tailwind)

Seeded accounts:
- admin@example.com / AdminPass123 (admin)
- alice@example.com / UserPass123 (user)
- bob@example.com / UserPass123 (user)

Backend: /backend
Frontend: /frontend

Usage:
- Fill backend/.env with your MongoDB and Cloudinary credentials
- cd backend && npm install && npm run seed && npm run dev
- cd frontend && npm install && npm run dev

Note about multer
------------------
The backend dependency `multer` was upgraded to the 2.x series to address known security issues affecting 1.x releases. If you run into any compatibility issues, the upload middleware is in `backend/middleware/uploadMiddleware.js` and currently uses `multer-storage-cloudinary` for Cloudinary-backed storage. Review and test uploads after pulling changes.

Environment setup
-----------------
Create a `backend/.env` file from `backend/.env.example` and fill in your MongoDB connection string and Cloudinary credentials. Example:

```bash
cd backend
cp .env.example .env
# then edit .env and set MONGO_URI, CLOUDINARY_* and JWT_SECRET
```
