import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function WebStudioLeadForm() {
  const [businessName, setBusinessName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('web_studio_leads').insert({
        business_name: businessName,
        contact_name: name,
        contact_email: email,
        contact_phone: phone,
        notes: message,
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

  if (submitted) {
    return (
      <div className="text-center py-10">
        <p className="text-4xl mb-3">🎉</p>
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">We'll be in touch!</h3>
        <p className="text-stone-500 text-sm">Expect a response within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Business name *</label>
        <input
          type="text"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Your name *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Email address *</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Phone number</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Tell us about your business</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          placeholder="What does your business do? Any specific needs for your website?"
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-400 text-white font-semibold py-3 rounded-full hover:bg-amber-600 transition-colors text-sm disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Get a free quote →'}
      </button>
    </form>
  )
}
