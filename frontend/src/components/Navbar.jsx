import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'
export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()
  return (
    <motion.nav className="bg-white shadow p-4" initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Clearance Management</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/clearances">Clearances</Link>
              <Link to="/create">Create</Link>
              <Link to="/upload">Upload</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              {user.role === 'admin' && <Link to="/admin/documents">Documents</Link>}
              <Link to="/profile">{user.name}</Link>
              <button onClick={()=>{ logout(); nav('/login') }} className="ml-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
