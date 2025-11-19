import React from 'react'
import AnimatedCard from '../components/AnimatedCard'
export default function Dashboard(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnimatedCard>
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="mt-2 text-sm text-gray-600">Quick statistics and charts can sit here.</p>
      </AnimatedCard>
      <AnimatedCard>
        <h3>Recent Submissions</h3>
        <p className="text-sm text-gray-600">List of latest clearances</p>
      </AnimatedCard>
      <AnimatedCard>
        <h3>Actions</h3>
        <p className="text-sm text-gray-600">Create new clearance, assign, change status</p>
      </AnimatedCard>
    </div>
  )
}
