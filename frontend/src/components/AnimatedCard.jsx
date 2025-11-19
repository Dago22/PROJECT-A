import React from 'react'
import { motion } from 'framer-motion'
export default function AnimatedCard({ children }){
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-4 rounded-2xl shadow">
      {children}
    </motion.div>
  )
}
