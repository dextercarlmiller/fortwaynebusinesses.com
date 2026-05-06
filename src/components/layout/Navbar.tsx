import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌳</span>
            <div>
              <span className="font-serif font-bold text-forest-600 text-lg leading-tight block">
                FortWayne
              </span>
              <span className="text-xs text-stone-400 leading-tight block -mt-0.5">
                Businesses.com
              </span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search businesses..."
                className="w-full pl-4 pr-10 py-1.5 rounded-full border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-forest-600"
              >
                🔍
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/browse" className="text-sm text-stone-700 hover:text-forest-600 font-sans">
              Browse
            </Link>
            <Link to="/add-business" className="text-sm text-stone-700 hover:text-forest-600 font-sans">
              Add Business
            </Link>
            <a
              href="https://web.fortwaynebusinesses.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-amber-400 text-white px-3 py-1.5 rounded-full hover:bg-amber-600 transition-colors font-sans"
            >
              Get a Website
            </a>
          </div>

          <button
            className="md:hidden p-2 text-stone-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search businesses..."
              className="flex-1 pl-4 pr-3 py-1.5 rounded-l-full border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-forest-600 text-white rounded-r-full text-sm"
            >
              Go
            </button>
          </form>
          <Link to="/browse" className="text-sm text-stone-700 py-1" onClick={() => setMenuOpen(false)}>Browse</Link>
          <Link to="/add-business" className="text-sm text-stone-700 py-1" onClick={() => setMenuOpen(false)}>Add Business</Link>
          <a href="https://web.fortwaynebusinesses.com" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 py-1 font-semibold" onClick={() => setMenuOpen(false)}>Get a Website</a>
        </div>
      )}
    </nav>
  )
}
