import React from 'react'
import AnimatedCard from './AnimatedCard'
import { motion } from 'framer-motion'
export default function ClearanceCard({ c }){
  return (
    <AnimatedCard>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{c.title}</h3>
          <p className="text-sm text-gray-600">Applicant: {c.applicantName}</p>
        </div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}>
          <span className={`px-3 py-1 rounded-full text-sm ${c.status === 'approved' ? 'bg-green-100 text-green-700' : c.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span>
        </motion.div>
      </div>
    </AnimatedCard>
  )
}
