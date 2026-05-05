import type { Business } from '../../lib/types'
import BusinessGrid from '../listings/BusinessGrid'
import { Link } from 'react-router-dom'

interface FeaturedListingsProps {
  businesses: Business[]
  loading?: boolean
}

export default function FeaturedListings({ businesses, loading = false }: FeaturedListingsProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Businesses</h2>
        <Link to="/browse" className="text-sm text-forest-600 hover:underline font-sans">
          View all →
        </Link>
      </div>
      <BusinessGrid businesses={businesses} loading={loading} />
    </section>
  )
}
