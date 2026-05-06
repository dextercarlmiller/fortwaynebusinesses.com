import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'
import AddBusinessForm from '../components/forms/AddBusinessForm'

export default function AddBusinessPage() {
  const { categories } = useCategories()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-3">Your listing is submitted!</h1>
        <p className="text-stone-500 mb-6 text-sm leading-relaxed">
          Thanks for adding your business. Your listing will appear in the directory shortly.<br />
          Check your email for next steps on claiming and verifying your listing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/browse"
            className="px-6 py-2.5 bg-forest-600 text-white rounded-full text-sm font-semibold hover:bg-forest-800 transition-colors"
          >
            Browse listings →
          </Link>
          <a
            href="https://web.fortwaynebusinesses.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-amber-400 text-white rounded-full text-sm font-semibold hover:bg-amber-600 transition-colors"
          >
            Get a website →
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Add your business</h1>
      <p className="text-stone-500 text-sm mb-8">
        It's free to list your business in the Fort Wayne directory. Fill in as much as you know — you can always update it later.
      </p>
      <AddBusinessForm categories={categories} onSuccess={() => setSubmitted(true)} />
    </main>
  )
}
