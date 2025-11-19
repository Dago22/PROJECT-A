import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ClearanceCard from '../components/ClearanceCard'
export default function Clearances(){
  const [list, setList] = useState([])
  useEffect(()=>{ api.get('/clearances').then(r=>setList(r.data)).catch(()=>{}) }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {list.map(c=> <ClearanceCard key={c._id} c={c} />)}
    </div>
  )
}
