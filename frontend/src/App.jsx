import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Clearances from './pages/Clearances'
import CreateClearance from './pages/CreateClearance'
import Profile from './pages/Profile'
import UploadDocument from './pages/UploadDocument'
import AdminDocuments from './pages/AdminDocuments'

// Components
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <SignedIn>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          <Route
            path="/admin"
            element={
              <SignedIn>
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          <Route
            path="/admin/documents"
            element={
              <SignedIn>
                <ProtectedRoute adminOnly>
                  <AdminDocuments />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          <Route
            path="/clearances"
            element={
              <SignedIn>
                <ProtectedRoute>
                  <Clearances />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          <Route
            path="/create"
            element={
              <SignedIn>
                <ProtectedRoute>
                  <CreateClearance />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          <Route
            path="/profile"
            element={
              <SignedIn>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          <Route
            path="/upload"
            element={
              <SignedIn>
                <ProtectedRoute>
                  <UploadDocument />
                </ProtectedRoute>
              </SignedIn>
            }
          />

          {/* Catch-all redirect if not signed in */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
      </div>
    </div>
  )
}
