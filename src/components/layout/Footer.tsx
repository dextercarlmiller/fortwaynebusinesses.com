import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌳</span>
              <span className="font-serif font-bold text-white text-lg">FortWayneBusinesses.com</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              The go-to directory for Fort Wayne, Indiana. Discover and support local businesses in your community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 font-sans text-sm uppercase tracking-wide">Directory</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link to="/browse" className="hover:text-white transition-colors">Browse All Businesses</Link></li>
              <li><Link to="/add-business" className="hover:text-white transition-colors">Add Your Business</Link></li>
              <li><Link to="/claim" className="hover:text-white transition-colors">Claim a Listing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 font-sans text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link to="/web-studio" className="hover:text-white transition-colors">Fort Wayne Web Studio</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} FortWayneBusinesses.com. All rights reserved.</p>
          <p>Made with ❤️ in Fort Wayne, Indiana</p>
        </div>
      </div>
    </footer>
  )
}
