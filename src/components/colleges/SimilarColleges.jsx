import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, IndianRupee, TrendingUp, Users } from 'lucide-react'
import CollegeCard from './CollegeCard'

function SimilarColleges({ currentCollege, allColleges = [] }) {
  if (!currentCollege || allColleges.length === 0) return null

  const similar = allColleges
    .filter(c => c.id !== currentCollege.id)
    .slice(0, 4)

  if (similar.length === 0) return null

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-bold text-lg">Similar Colleges</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similar.map(college => (
          <CollegeCard key={college.id} college={college} compact />
        ))}
      </div>
    </section>
  )
}

export default SimilarColleges