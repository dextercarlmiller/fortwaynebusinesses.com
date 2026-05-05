import { Link } from 'react-router-dom'
import type { Category } from '../../lib/types'

interface CategoryGridProps {
  categories: Category[]
  loading?: boolean
}

export default function CategoryGrid({ categories, loading = false }: CategoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-stone-100 p-4 animate-pulse">
            <div className="h-8 w-8 bg-stone-100 rounded mb-2" />
            <div className="h-4 bg-stone-100 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {categories.map(cat => (
        <Link
          key={cat.slug}
          to={`/category/${cat.slug}`}
          className="bg-white rounded-xl border border-stone-100 p-4 hover:border-forest-400 hover:-translate-y-0.5 hover:shadow-sm transition-all group"
        >
          <div className="text-2xl mb-2">{cat.icon}</div>
          <h3 className="font-sans font-semibold text-stone-800 text-sm group-hover:text-forest-600 transition-colors leading-tight">
            {cat.name}
          </h3>
          {cat.listing_count > 0 && (
            <p className="text-xs text-stone-400 mt-0.5">{cat.listing_count} listings</p>
          )}
        </Link>
      ))}
    </div>
  )
}
