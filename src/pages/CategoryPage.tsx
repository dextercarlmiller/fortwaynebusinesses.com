import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'
import { useBusinesses } from '../hooks/useBusinesses'
import BusinessGrid from '../components/listings/BusinessGrid'
import SearchBar from '../components/listings/SearchBar'

const PAGE_SIZE = 20

type SortOption = 'featured' | 'az' | 'newest'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { categories } = useCategories()
  const category = categories.find(c => c.slug === slug)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOption>('featured')
  const [page, setPage] = useState(1)

  const { businesses, loading } = useBusinesses({ category: category?.name })

  const filtered = query
    ? businesses.filter(b =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.description?.toLowerCase().includes(query.toLowerCase())
      )
    : businesses

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name)
    if (sort === 'newest')
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  const paginated = sorted.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < sorted.length

  const categoryName = category?.name ?? slug ?? 'Category'

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-400 mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-forest-600 transition-colors">Home</Link>
        <span>›</span>
        <Link to="/browse" className="hover:text-forest-600 transition-colors">Browse</Link>
        <span>›</span>
        <span className="text-stone-600">{categoryName}</span>
      </nav>

      {/* Category header */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-8">
        <div className="flex items-start gap-4">
          {category?.icon && (
            <div className="text-5xl leading-none shrink-0 mt-0.5">{category.icon}</div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {categoryName}
            </h1>
            {category?.description && (
              <p className="text-stone-500 mt-1.5 text-base">{category.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-stone-400">
              {!loading && (
                <span>
                  <span className="font-semibold text-forest-600">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'business' : 'businesses'} in Fort Wayne
                </span>
              )}
              {loading && <span className="animate-pulse">Loading…</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar
            value={query}
            onChange={v => { setQuery(v); setPage(1) }}
            placeholder={`Search ${categoryName.toLowerCase()}…`}
          />
        </div>
        <select
          value={sort}
          onChange={e => { setSort(e.target.value as SortOption); setPage(1) }}
          className="shrink-0 px-4 py-2.5 rounded-full border border-stone-200 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-forest-400"
        >
          <option value="featured">Featured first</option>
          <option value="az">A–Z</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <BusinessGrid
        businesses={paginated}
        loading={loading}
        emptyMessage={
          query
            ? `No results for "${query}" in ${categoryName}`
            : `No businesses listed under ${categoryName} yet`
        }
      />

      {hasMore && !loading && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2.5 rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-forest-400 hover:text-forest-600 transition-colors"
          >
            Load more
          </button>
        </div>
      )}

      {/* Browse other categories */}
      <div className="mt-14 pt-10 border-t border-stone-100">
        <h2 className="font-serif text-xl font-bold text-stone-800 mb-1">Browse other categories</h2>
        <p className="text-sm text-stone-400 mb-4">Explore everything Fort Wayne has to offer</p>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter(c => c.slug !== slug)
            .map(c => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 text-sm text-stone-600 hover:border-forest-400 hover:text-forest-600 hover:bg-forest-50 transition-all"
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </main>
  )
}
