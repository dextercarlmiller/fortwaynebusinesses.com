import { useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 30_000

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  )
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil
  const secondsLeft = isLocked ? Math.ceil((lockedUntil! - Date.now()) / 1000) : 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLocked) return

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      setAuthenticated(true)
    } else {
      const next = attempts + 1
      setAttempts(next)
      if (next >= MAX_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_MS)
        setAttempts(0)
      }
      setError(true)
      setPassword('')
    }
  }

  function handleSignOut() {
    sessionStorage.removeItem('admin_auth')
    setAuthenticated(false)
    setAttempts(0)
    setLockedUntil(null)
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
              disabled={isLocked}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                error ? 'border-red-400 bg-red-50' : 'border-stone-200'
              }`}
              autoFocus
            />
            {isLocked && (
              <p className="text-xs text-red-600">
                Too many failed attempts. Try again in {secondsLeft}s.
              </p>
            )}
            {error && !isLocked && (
              <p className="text-xs text-red-600">
                Incorrect password. {MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? 's' : ''} remaining.
              </p>
            )}
            <button
              type="submit"
              disabled={isLocked}
              className="w-full bg-forest-600 text-white font-semibold py-3 rounded-full hover:bg-forest-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
          onClick={handleSignOut}
          className="text-xs text-stone-400 hover:text-stone-600"
        >
          Sign out
        </button>
      </div>
      <AdminDashboard />
    </main>
  )
}
