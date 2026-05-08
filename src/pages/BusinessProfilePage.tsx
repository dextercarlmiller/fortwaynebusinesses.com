import { useParams, Link } from 'react-router-dom'
import { useBusiness } from '../hooks/useBusinesses'
import { useDocumentHead } from '../hooks/useDocumentHead'
import ContactInfo from '../components/business/ContactInfo'
import HoursDisplay from '../components/business/HoursDisplay'
import NoWebsiteBadge from '../components/business/NoWebsiteBadge'
import ClaimButton from '../components/business/ClaimButton'
import WebStudioUpsellCard from '../components/business/WebStudioUpsellCard'

function scrollToUpsell() {
  document.getElementById('web-studio-upsell')?.scrollIntoView({ behavior: 'smooth' })
}

export default function BusinessProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const { business, loading, error } = useBusiness(slug ?? '')

  const pageTitle = business
    ? `${business.name} — ${business.category} in Fort Wayne, IN | FortWayneBusinesses.com`
    : 'Business | FortWayneBusinesses.com'

  const metaDescription = business
    ? `${business.name} is a ${business.category} business${business.neighborhood ? ` in ${business.neighborhood}` : ''} in Fort Wayne, IN.${business.description ? ' ' + business.description.slice(0, 120) + '…' : ''}`
    : undefined

  useDocumentHead(loading ? undefined : pageTitle, loading ? undefined : metaDescription)

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-stone-100 rounded w-1/3" />
          <div className="h-4 bg-stone-100 rounded w-1/4" />
          <div className="h-32 bg-stone-100 rounded mt-6" />
        </div>
      </main>
    )
  }

  if (error || !business) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-4xl mb-3">🏙️</p>
        <h1 className="font-serif text-2xl font-bold text-stone-900 mb-2">Business not found</h1>
        <p className="text-stone-500 mb-4 text-sm">{error}</p>
        <Link to="/browse" className="text-forest-600 hover:underline text-sm">Browse all businesses →</Link>
      </main>
    )
  }

  const initials = business.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  const categorySlug = business.category.toLowerCase().replace(/\s+/g, '-')
  const locationLabel = [business.neighborhood, business.city, business.state].filter(Boolean).join(', ')

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-stone-400 mb-6 flex items-center gap-1.5">
        <Link to="/" className="hover:text-forest-600">Home</Link>
        <span>›</span>
        <Link to={`/category/${categorySlug}`} className="hover:text-forest-600">
          {business.category}
        </Link>
        <span>›</span>
        <span className="text-stone-600 truncate">{business.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-16 h-16 rounded-xl bg-forest-50 flex items-center justify-center text-forest-600 font-bold text-lg overflow-hidden">
              {business.logo_url ? (
                <img src={business.logo_url} alt={business.name} className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-stone-900 leading-tight">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm text-stone-500">{business.category}</span>
                {business.neighborhood && (
                  <span className="text-sm text-stone-400">·</span>
                )}
                {business.neighborhood && (
                  <span className="text-sm text-stone-500">{locationLabel}</span>
                )}
                {business.is_featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-forest-50 text-forest-600 border border-forest-200">
                    ⭐ Featured
                  </span>
                )}
                {business.is_verified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                    ✓ Verified
                  </span>
                )}
                {!business.website_url && (
                  <NoWebsiteBadge onClick={scrollToUpsell} />
                )}
              </div>
            </div>
          </div>

          {/* About */}
          {business.description && (
            <section>
              <h2 className="font-serif text-lg font-semibold text-stone-900 mb-2">About</h2>
              <p className="text-stone-600 leading-relaxed text-sm">{business.description}</p>
            </section>
          )}

          {/* Tags */}
          {business.tags && business.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {business.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Photos (premium only) */}
          {business.tier !== 'free' && business.photos && business.photos.length > 0 && (
            <section>
              <h2 className="font-serif text-lg font-semibold text-stone-900 mb-2">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {business.photos.map((url, i) => (
                  <img key={i} src={url} alt={`${business.name} photo ${i + 1}`} className="rounded-lg object-cover aspect-square" />
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA section */}
          <div className="space-y-4 pt-2">
            {!business.is_claimed && <ClaimButton businessId={business.id} />}

            {!business.website_url && (
              <WebStudioUpsellCard businessId={business.id} businessName={business.name} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-stone-100 rounded-xl p-5">
            <h3 className="font-semibold text-stone-900 text-sm mb-3">Contact</h3>
            <ContactInfo
              phone={business.phone}
              address={business.address}
              city={business.city}
              state={business.state}
              websiteUrl={business.website_url}
            />
            {business.neighborhood && (
              <p className="mt-3 text-xs text-stone-400 flex items-center gap-1">
                <span>🏘️</span>
                <span>{business.neighborhood} neighborhood</span>
              </p>
            )}
            {!business.website_url && (
              <button
                onClick={scrollToUpsell}
                className="mt-3 text-xs text-amber-600 font-medium hover:underline"
              >
                No website — we can build one! →
              </button>
            )}
          </div>

          {business.hours && Object.keys(business.hours).length > 0 && (
            <div className="bg-white border border-stone-100 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 text-sm mb-3">Hours</h3>
              <HoursDisplay hours={business.hours} />
            </div>
          )}

          {/* TODO: Insert ad provider script here */}
          <div id="ad-slot-sidebar" />
        </aside>
      </div>
    </main>
  )
}
