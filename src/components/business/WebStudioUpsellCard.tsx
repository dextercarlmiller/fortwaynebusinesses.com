import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { LaptopIcon, CheckIcon } from '../Icons'

interface WebStudioUpsellCardProps {
  businessId: string
  businessName: string
}

export default function WebStudioUpsellCard({ businessId, businessName }: WebStudioUpsellCardProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('web_studio_leads').insert({
        business_id: businessId,
        business_name: businessName,
        contact_name: name,
        contact_email: email,
        contact_phone: phone,
        status: 'new',
      })
      if (err) throw err
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Affordable one-time fee — no monthly contracts',
    'Built specifically for Fort Wayne small businesses',
    'Professional, mobile-friendly design',
  ]

  return (
    <div id="web-studio-upsell" className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <LaptopIcon size={22} className="text-amber-500" />
        <h3 className="font-serif font-bold text-stone-900 text-lg">No website yet? We can fix that.</h3>
      </div>
      <ul className="text-sm text-stone-600 space-y-1.5 mb-4">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2">
            <CheckIcon size={13} className="shrink-0 mt-0.5 text-forest-600" />
            {f}
          </li>
        ))}
      </ul>

      {submitted ? (
        <div className="bg-white rounded-lg p-4 text-center text-sm text-stone-700">
          <p className="text-2xl mb-2">🎉</p>
          <p className="font-semibold">Thanks! We'll be in touch soon.</p>
          <p className="text-stone-400 text-xs mt-1">We typically respond within 1 business day.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address *"
            required
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-white font-semibold py-2.5 rounded-full hover:bg-amber-600 transition-colors text-sm disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Get a free quote →'}
          </button>
        </form>
      )}
    </div>
  )
}
