import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
export default function Profile(){
  const { user } = useContext(AuthContext)
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl">Profile</h3>
      <p className="mt-2">Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  )
}
