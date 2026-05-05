import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchBar from '../listings/SearchBar'

interface HeroSectionProps {
  totalListings: number
  totalCategories: number
}

export default function HeroSection({ totalListings, totalCategories }: HeroSectionProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="bg-gradient-to-br from-forest-50 to-amber-50 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
          Support local.<br />Find it here first.
        </h1>
        <p className="text-lg text-stone-600 mb-8 font-sans">
          The go-to directory for Fort Wayne, Indiana
        </p>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search restaurants, plumbers, salons…"
          />
        </form>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-forest-600 font-serif">{totalListings}</span>
            <span>local businesses</span>
          </div>
          <div className="text-stone-300">•</div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-forest-600 font-serif">{totalCategories}</span>
            <span>categories</span>
          </div>
          <div className="text-stone-300">•</div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-forest-600 font-serif">Free</span>
            <span>to list</span>
          </div>
        </div>
      </div>
    </section>
  )
}
