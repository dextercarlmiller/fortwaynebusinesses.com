import { Link } from 'react-router-dom'

export default function ClaimCTABanner() {
  return (
    <div className="bg-forest-600 rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-serif text-xl font-bold mb-1">Is your business listed?</h3>
        <p className="text-forest-100 text-sm">Claim your free listing and take control of how you appear in Fort Wayne.</p>
      </div>
      <Link
        to="/claim"
        className="shrink-0 bg-white text-forest-600 font-semibold px-5 py-2.5 rounded-full hover:bg-forest-50 transition-colors text-sm font-sans"
      >
        Claim your listing →
      </Link>
    </div>
  )
}
