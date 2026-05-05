import { useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-2xl font-bold text-stone-900 text-center mb-6">Admin Access</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 ${
                error ? 'border-red-400 bg-red-50' : 'border-stone-200'
              }`}
              autoFocus
            />
            {error && <p className="text-xs text-red-600">Incorrect password. Try again.</p>}
            <button
              type="submit"
              className="w-full bg-forest-600 text-white font-semibold py-3 rounded-full hover:bg-forest-800 transition-colors text-sm"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Admin Panel</h1>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-xs text-stone-400 hover:text-stone-600"
        >
          Sign out
        </button>
      </div>
      <AdminDashboard />
    </main>
  )
}
