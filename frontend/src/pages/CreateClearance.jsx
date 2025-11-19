import React, { useState } from 'react'
import api from '../services/api'
export default function CreateClearance(){
  const [title, setTitle] = useState('')
  const [applicantName, setApplicantName] = useState('')
  const [description, setDescription] = useState('')
  const submit = async (e) => {
    e.preventDefault();
    try{
      await api.post('/clearances', { title, applicantName, description })
      alert('Created')
    }catch(err){ alert('Error') }
  }
  return (
    <form className="max-w-xl mx-auto space-y-4 p-6 bg-white rounded-2xl shadow" onSubmit={submit}>
      <h3 className="text-xl font-semibold">Create Clearance</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-3 rounded" />
      <input value={applicantName} onChange={e=>setApplicantName(e.target.value)} placeholder="Applicant name" className="w-full p-3 rounded" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-3 rounded" />
      <button className="py-3 px-6 rounded bg-indigo-600 text-white">Create</button>
    </form>
  )
}
