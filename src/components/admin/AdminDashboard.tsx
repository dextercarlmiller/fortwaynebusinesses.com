import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { Business } from '../../lib/types'
import LeadsList from './LeadsList'
import ClaimRequestsList from './ClaimRequestsList'

type Tab = 'leads' | 'claims' | 'businesses'

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('leads')
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tab !== 'businesses') return
    setLoading(true)
    supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setBusinesses(data ?? [])
        setLoading(false)
      })
  }, [tab])

  async function toggleField(id: string, field: 'is_featured' | 'is_verified', value: boolean) {
    await supabase.from('businesses').update({ [field]: value }).eq('id', id)
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  async function updateTier(id: string, tier: Business['tier']) {
    await supabase.from('businesses').update({ tier }).eq('id', id)
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, tier } : b))
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'leads', label: 'Web Studio Leads' },
    { key: 'claims', label: 'Claim Requests' },
    { key: 'businesses', label: 'Businesses' },
  ]

  return (
    <div>
      <div className="flex gap-1 mb-8 border-b border-stone-200">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-forest-600 text-forest-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'leads' && <LeadsList />}
      {tab === 'claims' && <ClaimRequestsList />}
      {tab === 'businesses' && (
        loading ? (
          <p className="text-stone-400 text-sm">Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs text-stone-500">
                  <th className="pb-2 pr-4 font-medium">Business</th>
                  <th className="pb-2 pr-4 font-medium">Category</th>
                  <th className="pb-2 pr-4 font-medium">Tier</th>
                  <th className="pb-2 pr-4 font-medium">Featured</th>
                  <th className="pb-2 font-medium">Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {businesses.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-stone-900">{b.name}</p>
                      <p className="text-stone-400 text-xs">{b.slug}</p>
                    </td>
                    <td className="py-3 pr-4 text-stone-500">{b.category}</td>
                    <td className="py-3 pr-4">
                      <select
                        value={b.tier}
                        onChange={e => updateTier(b.id, e.target.value as Business['tier'])}
                        className="px-2 py-1 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-400"
                      >
                        <option value="free">free</option>
                        <option value="premium">premium</option>
                        <option value="featured">featured</option>
                      </select>
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="checkbox"
                        checked={b.is_featured}
                        onChange={e => toggleField(b.id, 'is_featured', e.target.checked)}
                        className="accent-forest-600 w-4 h-4"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="checkbox"
                        checked={b.is_verified}
                        onChange={e => toggleField(b.id, 'is_verified', e.target.checked)}
                        className="accent-forest-600 w-4 h-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}
