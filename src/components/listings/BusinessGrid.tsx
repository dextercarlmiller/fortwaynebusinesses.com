import type { Business } from '../../lib/types'
import BusinessCard from './BusinessCard'
import { Link } from 'react-router-dom'

interface BusinessGridProps {
  businesses: Business[]
  loading?: boolean
  emptyMessage?: string
}

export default function BusinessGrid({ businesses, loading = false, emptyMessage }: BusinessGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-100 p-5 animate-pulse">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-stone-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-stone-100 rounded w-3/4" />
                <div className="h-3 bg-stone-100 rounded w-1/2" />
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-3 bg-stone-100 rounded" />
              <div className="h-3 bg-stone-100 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-16 text-stone-500">
        <p className="text-4xl mb-3">🏙️</p>
        <p className="font-serif text-lg text-stone-700 mb-1">{emptyMessage ?? 'No businesses found'}</p>
        <p className="text-sm">
          Want to add one?{' '}
          <Link to="/add-business" className="text-forest-600 hover:underline">
            Submit a listing →
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {businesses.map(b => (
        <BusinessCard key={b.id} business={b} />
      ))}
    </div>
  )
}
