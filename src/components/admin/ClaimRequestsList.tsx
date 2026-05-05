import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { ClaimRequest } from '../../lib/types'

export default function ClaimRequestsList() {
  const [requests, setRequests] = useState<ClaimRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('claim_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests(data ?? [])
    setLoading(false)
  }

  async function approve(req: ClaimRequest) {
    await supabase.from('claim_requests').update({ status: 'approved' }).eq('id', req.id)
    await supabase.from('businesses').update({ is_claimed: true }).eq('id', req.business_id)
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'approved' as const } : r))
  }

  async function reject(id: string) {
    await supabase.from('claim_requests').update({ status: 'rejected' }).eq('id', id)
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r))
  }

  if (loading) return <p className="text-stone-400 text-sm">Loading requests…</p>
  if (requests.length === 0) return <p className="text-stone-400 text-sm">No claim requests yet.</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200 text-left text-xs text-stone-500">
            <th className="pb-2 pr-4 font-medium">Claimant</th>
            <th className="pb-2 pr-4 font-medium">Verification</th>
            <th className="pb-2 pr-4 font-medium">Date</th>
            <th className="pb-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {requests.map(req => (
            <tr key={req.id} className="hover:bg-stone-50">
              <td className="py-3 pr-4">
                <p className="font-medium text-stone-900">{req.claimant_name}</p>
                <p className="text-stone-400 text-xs">{req.claimant_email}</p>
                {req.claimant_phone && <p className="text-stone-400 text-xs">{req.claimant_phone}</p>}
              </td>
              <td className="py-3 pr-4 text-stone-500">{req.verification_method ?? '—'}</td>
              <td className="py-3 pr-4 text-stone-500 whitespace-nowrap">
                {new Date(req.created_at).toLocaleDateString()}
              </td>
              <td className="py-3">
                {req.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approve(req)}
                      className="px-3 py-1 bg-forest-600 text-white text-xs rounded-full hover:bg-forest-800 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(req.id)}
                      className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className={`text-xs font-medium ${req.status === 'approved' ? 'text-forest-600' : 'text-red-600'}`}>
                    {req.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
