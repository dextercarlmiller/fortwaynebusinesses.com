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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        <section>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">Browse by Category</h2>
          <CategoryGrid categories={categories} loading={catLoading} />
        </section>

        <FeaturedListings businesses={businesses} loading={bizLoading} />

        <ClaimCTABanner />

        <WebStudioCTA />

        {/* TODO: Insert ad provider script here */}
        <div id="ad-slot-sidebar" />
      </div>
    </main>
  )
}
