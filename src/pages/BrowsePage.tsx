import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useBusinesses } from '../hooks/useBusinesses'
import { useCategories } from '../hooks/useCategories'
import SearchBar from '../components/listings/SearchBar'
import CategoryFilter from '../components/listings/CategoryFilter'
import NeighborhoodFilter from '../components/listings/NeighborhoodFilter'
import BusinessGrid from '../components/listings/BusinessGrid'

const PAGE_SIZE = 20

type SortOption = 'featured' | 'az' | 'newest'

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [sort, setSort] = useState<SortOption>('featured')
  const [page, setPage] = useState(1)

  const { businesses, loading } = useBusinesses({
    category: selectedCategory || undefined,
    neighborhood: selectedNeighborhood || undefined,
    search: query || undefined,
  })
  const { categories } = useCategories()

  useEffect(() => {
    if (query) {
      setSearchParams({ q: query })
    } else {
      setSearchParams({})
    }
    setPage(1)
  }, [query, setSearchParams])

  useEffect(() => {
    setPage(1)
  }, [selectedCategory, selectedNeighborhood])

  const sorted = [...businesses].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name)
    if (sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    // featured first
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  const paginated = sorted.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < sorted.length

  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedNeighborhood ? 1 : 0)

  function clearFilters() {
    setSelectedCategory('')
    setSelectedNeighborhood('')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-6">Browse Fort Wayne Businesses</h1>

      <div className="space-y-3 mb-8">
        <SearchBar value={query} onChange={setQuery} />

        <div>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Category</p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 overflow-x-auto">
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="shrink-0 px-3 py-1.5 rounded-full border border-stone-200 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest-400"
            >
              <option value="featured">Featured first</option>
              <option value="az">A–Z</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Area</p>
          <div className="overflow-x-auto">
            <NeighborhoodFilter
              selected={selectedNeighborhood}
              onSelect={setSelectedNeighborhood}
            />
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-stone-500">
              {activeFilterCount === 1
                ? '1 filter active'
                : `${activeFilterCount} filters active`}
            </span>
            <button
              onClick={clearFilters}
              className="text-forest-600 hover:text-forest-700 font-medium underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* TODO: Insert ad provider script here */}
      <div id="ad-slot-category-top" className="mb-6" />

      <BusinessGrid
        businesses={paginated}
        loading={loading}
        emptyMessage={query ? `No results for "${query}"` : 'No businesses found'}
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
    </main>
  )
}
