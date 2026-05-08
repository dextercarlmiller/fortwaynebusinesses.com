import { Link } from 'react-router-dom'
import type { Category } from '../../lib/types'

interface CategoryGridProps {
  categories: Category[]
  loading?: boolean
}

export default function CategoryGrid({ categories, loading = false }: CategoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-stone-100 p-5 animate-pulse">
            <div className="h-10 w-10 bg-stone-100 rounded-xl mb-3" />
            <div className="h-4 bg-stone-100 rounded w-4/5 mb-1.5" />
            <div className="h-3 bg-stone-50 rounded w-3/5" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
      {categories.map(cat => (
        <Link
          key={cat.slug}
          to={`/category/${cat.slug}`}
          className="group bg-white rounded-2xl border border-stone-100 p-5 hover:border-forest-400 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
        >
          <div className="text-3xl mb-3 leading-none">{cat.icon}</div>
          <h3 className="font-sans font-semibold text-stone-800 text-sm group-hover:text-forest-600 transition-colors leading-snug flex-1">
            {cat.name}
          </h3>
          {cat.description && (
            <p className="text-xs text-stone-400 mt-1 leading-snug line-clamp-1">
              {cat.description}
            </p>
          )}
          {cat.listing_count > 0 && (
            <p className="text-xs font-medium text-forest-600 mt-2">
              {cat.listing_count} listings
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
