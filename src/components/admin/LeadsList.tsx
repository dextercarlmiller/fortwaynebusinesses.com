import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { WebStudioLead } from '../../lib/types'

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'declined'] as const

export default function LeadsList() {
  const [leads, setLeads] = useState<WebStudioLead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('web_studio_leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data ?? [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('web_studio_leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: status as WebStudioLead['status'] } : l))
  }

  if (loading) return <p className="text-stone-400 text-sm">Loading leads…</p>
  if (leads.length === 0) return <p className="text-stone-400 text-sm">No leads yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200 text-left text-xs text-stone-500">
            <th className="pb-2 pr-4 font-medium">Business</th>
            <th className="pb-2 pr-4 font-medium">Contact</th>
            <th className="pb-2 pr-4 font-medium">Phone</th>
            <th className="pb-2 pr-4 font-medium">Date</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-stone-50">
              <td className="py-3 pr-4">
                <p className="font-medium text-stone-900">{lead.business_name ?? '—'}</p>
              </td>
              <td className="py-3 pr-4">
                <p className="text-stone-700">{lead.contact_name ?? '—'}</p>
                <p className="text-stone-400 text-xs">{lead.contact_email}</p>
              </td>
              <td className="py-3 pr-4 text-stone-500">{lead.contact_phone ?? '—'}</td>
              <td className="py-3 pr-4 text-stone-500 whitespace-nowrap">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="py-3">
                <select
                  value={lead.status}
                  onChange={e => updateStatus(lead.id, e.target.value)}
                  className="px-2 py-1 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-400"
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
