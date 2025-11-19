import React, { useState, useContext } from 'react'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post('/auth/register', { name, email, password })
      login(res.data)
      nav('/')
    }catch(err){ alert(err?.response?.data?.msg || 'Register failed') }
  }
  return (
    <div className="max-w-md mx-auto mt-12">
      <form className="space-y-4 p-6 bg-white rounded-2xl shadow" onSubmit={submit}>
        <h2 className="text-2xl font-bold">Create account</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-3 rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 rounded" />
        <button className="w-full py-3 rounded bg-indigo-600 text-white">Register</button>
      </form>
    </div>
  )
}
