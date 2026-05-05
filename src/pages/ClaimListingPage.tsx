import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Business } from '../lib/types'
import ClaimRequestForm from '../components/forms/ClaimRequestForm'
import SearchBar from '../components/listings/SearchBar'

export default function ClaimListingPage() {
  const { businessId } = useParams<{ businessId?: string }>()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Business[]>([])
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState<Business | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!businessId) return
    async function load() {
      const { data } = await supabase.from('businesses').select('*').eq('id', businessId).single()
      if (data) setSelected(data)
    }
    load()
  }, [businessId])

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setSearching(true)
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(8)
      setResults(data ?? [])
      setSearching(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  if (submitted) {
    return (
      <main className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-5xl mb-4">✅</p>
        <h1 className="font-serif text-2xl font-bold text-stone-900 mb-3">Claim request submitted!</h1>
        <p className="text-stone-500 text-sm">We'll review your request within 1–2 business days and contact you to verify ownership.</p>
      </main>
    )
  }

  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Claim your listing</h1>
      <p className="text-stone-500 text-sm mb-8">
        Find your business in the directory and claim it for free to keep your info up to date.
      </p>

      {!selected && (
        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search for your business…"
          />
          {searching && <p className="text-xs text-stone-400 mt-2">Searching…</p>}
          {results.length > 0 && (
            <ul className="mt-2 border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
              {results.map(b => (
                <li key={b.id}>
                  <button
                    onClick={() => { setSelected(b); setQuery('') }}
                    className="w-full text-left px-4 py-3 hover:bg-forest-50 transition-colors"
                  >
                    <p className="font-medium text-stone-900 text-sm">{b.name}</p>
                    <p className="text-xs text-stone-400">{b.category} · {b.address ?? 'Fort Wayne, IN'}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {query.length >= 2 && !searching && results.length === 0 && (
            <p className="text-xs text-stone-400 mt-2">
              No results. <a href="/add-business" className="text-forest-600 hover:underline">Add your business →</a>
            </p>
          )}
        </div>
      )}

      {selected && (
        <>
          {!businessId && (
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-stone-400 hover:text-stone-600 mb-4 flex items-center gap-1"
            >
              ← Search again
            </button>
          )}
          <ClaimRequestForm
            businessId={selected.id}
            businessName={selected.name}
            onSuccess={() => setSubmitted(true)}
          />
        </>
      )}
    </main>
  )
}
