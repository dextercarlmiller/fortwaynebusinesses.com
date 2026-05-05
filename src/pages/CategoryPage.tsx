import { useParams, Link } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'
import { useBusinesses } from '../hooks/useBusinesses'
import BusinessGrid from '../components/listings/BusinessGrid'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { categories } = useCategories()
  const category = categories.find(c => c.slug === slug)
  const { businesses, loading } = useBusinesses({ category: category?.name })

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-stone-400 mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-forest-600">Home</Link>
        <span>›</span>
        <span className="text-stone-600">{category?.name ?? slug}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        {category?.icon && <span className="text-4xl">{category.icon}</span>}
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            {category?.name ?? slug}
          </h1>
          {businesses.length > 0 && (
            <p className="text-stone-400 text-sm mt-0.5">{businesses.length} businesses</p>
          )}
        </div>
      </div>

      {/* TODO: Insert ad provider script here */}
      <div id="ad-slot-category-top" className="mb-6" />

      <BusinessGrid
        businesses={businesses}
        loading={loading}
        emptyMessage={`No businesses listed under ${category?.name ?? slug} yet`}
      />
    </main>
  )
}
