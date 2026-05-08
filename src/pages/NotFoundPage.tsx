import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 text-center">
      <div>
        <p className="font-serif text-8xl font-bold text-stone-100 select-none mb-2">404</p>
        <h1 className="font-serif text-2xl font-bold text-stone-900 mb-2">Page not found</h1>
        <p className="text-stone-500 text-sm mb-8">
          We couldn't find what you were looking for. It may have moved or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-forest-600 text-white rounded-full text-sm font-semibold hover:bg-forest-800 transition-colors"
          >
            Go home
          </Link>
          <Link
            to="/browse"
            className="px-5 py-2.5 border border-stone-200 text-stone-700 rounded-full text-sm font-semibold hover:border-forest-400 hover:text-forest-600 transition-colors"
          >
            Browse businesses
          </Link>
        </div>
      </div>
    </main>
  )
}
