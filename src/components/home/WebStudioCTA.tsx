import { Link } from 'react-router-dom'

export default function WebStudioCTA() {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <span className="text-2xl">💻</span>
        <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-1">No website? Let's change that.</h3>
        <p className="text-stone-600 text-sm">We build affordable, professional websites for Fort Wayne small businesses. No monthly contracts.</p>
      </div>
      <Link
        to="/web-studio"
        className="shrink-0 bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors text-sm font-sans"
      >
        Learn more →
      </Link>
    </div>
  )
}
