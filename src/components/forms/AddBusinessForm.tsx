import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { generateSlug, generateClaimToken } from '../../lib/utils'
import type { Category } from '../../lib/types'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_LABELS: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

interface AddBusinessFormProps {
  categories: Category[]
  onSuccess: () => void
}

export default function AddBusinessForm({ categories, onSuccess }: AddBusinessFormProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [hours, setHours] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function setHourForDay(day: string, value: string) {
    setHours(prev => ({ ...prev, [day]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !category) return
    setLoading(true)
    setError('')
    try {
      const slug = generateSlug(name)
      const claimToken = generateClaimToken()
      const { error: err } = await supabase.from('businesses').insert({
        name,
        slug,
        category,
        description,
        address,
        phone,
        email,
        website_url: website || null,
        hours: Object.keys(hours).length > 0 ? hours : null,
        city: 'Fort Wayne',
        state: 'IN',
        is_claimed: false,
        is_featured: false,
        is_verified: false,
        tier: 'free',
        claim_token: claimToken,
      })
      if (err) throw err
      onSuccess()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Business name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Category *</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
          >
            <option value="">Select a category…</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          placeholder="Tell people what makes your business special…"
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="123 Main St"
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Website URL</label>
        <input
          type="url"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          placeholder="https://yourbusiness.com (leave blank if none)"
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
        {!website && (
          <p className="text-xs text-amber-600 mt-1">
            No website? <a href="https://web.fortwaynebusinesses.com" target="_blank" rel="noopener noreferrer" className="underline">We can build one for you.</a>
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Business hours</label>
        <div className="space-y-2">
          {DAYS.map(day => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-8 text-xs font-medium text-stone-500">{DAY_LABELS[day]}</span>
              <input
                type="text"
                value={hours[day] ?? ''}
                onChange={e => setHourForDay(day, e.target.value)}
                placeholder="e.g. 9am–5pm or Closed"
                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest-600 text-white font-semibold py-3 rounded-full hover:bg-forest-800 transition-colors disabled:opacity-50"
      >
        {loading ? 'Submitting…' : 'Submit listing'}
      </button>
    </form>
  )
}
