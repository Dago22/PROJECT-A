import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Clearances from './pages/Clearances'
import CreateClearance from './pages/CreateClearance'
import Profile from './pages/Profile'
import UploadDocument from './pages/UploadDocument'
import AdminDocuments from './pages/AdminDocuments'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard/></ProtectedRoute>} />
            <Route path="/admin/documents" element={<ProtectedRoute adminOnly><AdminDocuments/></ProtectedRoute>} />
            <Route path="/clearances" element={<ProtectedRoute><Clearances/></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateClearance/></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><UploadDocument/></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}
