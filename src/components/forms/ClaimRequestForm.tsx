import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface ClaimRequestFormProps {
  businessId: string
  businessName: string
  onSuccess: () => void
}

export default function ClaimRequestForm({ businessId, businessName, onSuccess }: ClaimRequestFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('claim_requests').insert({
        business_id: businessId,
        claimant_name: name,
        claimant_email: email,
        claimant_phone: phone,
        verification_method: method,
        status: 'pending',
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-forest-50 border border-forest-200 rounded-lg px-4 py-3 text-sm text-stone-700">
        Claiming: <strong>{businessName}</strong>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Your name *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Email address *</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Phone number</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Preferred verification method *</label>
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        >
          <option value="email">Email verification</option>
          <option value="phone">Phone call</option>
          <option value="postcard">Postcard to business address</option>
        </select>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest-600 text-white font-semibold py-2.5 rounded-full hover:bg-forest-800 transition-colors text-sm disabled:opacity-50"
      >
        {loading ? 'Submitting…' : 'Submit claim request'}
      </button>
    </form>
  )
}
