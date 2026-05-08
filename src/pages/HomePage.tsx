import { useBusinesses } from '../hooks/useBusinesses'
import { useCategories } from '../hooks/useCategories'
import HeroSection from '../components/home/HeroSection'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedListings from '../components/home/FeaturedListings'
import ClaimCTABanner from '../components/home/ClaimCTABanner'
import WebStudioCTA from '../components/home/WebStudioCTA'

export default function HomePage() {
  const { businesses, loading: bizLoading } = useBusinesses({ featured: true })
  const { categories, loading: catLoading } = useCategories()

  return (
    <main>
      <HeroSection
        totalListings={businesses.length}
        totalCategories={categories.length}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Primary navigation: category grid */}
        <section>
          <div className="mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              What are you looking for?
            </h2>
            <p className="text-stone-500 mt-1 text-sm sm:text-base">
              Browse Fort Wayne businesses by category
            </p>
          </div>
          <CategoryGrid categories={categories} loading={catLoading} />
        </section>

        <FeaturedListings businesses={businesses} loading={bizLoading} />

        <ClaimCTABanner />

        <WebStudioCTA />

      </div>
    </main>
  )
}
