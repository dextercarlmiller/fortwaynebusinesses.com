import { Link } from 'react-router-dom'
import type { Business } from '../../lib/types'
import NoWebsiteBadge from '../business/NoWebsiteBadge'
import { PhoneIcon, StarIcon } from '../Icons'
import { truncate, formatPhone } from '../../lib/utils'

interface BusinessCardProps {
  business: Business
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const initials = business.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <Link
      to={`/business/${business.slug}`}
      className={`block bg-white rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md ${
        business.is_featured ? 'border-forest-400' : 'border-stone-100'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-12 h-12 rounded-lg bg-forest-50 flex items-center justify-center text-forest-600 font-bold text-sm font-sans overflow-hidden">
            {business.logo_url ? (
              <img src={business.logo_url} alt={business.name} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <h3 className="font-serif font-semibold text-stone-900 text-base leading-tight truncate">
                {business.name}
              </h3>
            </div>
            <p className="text-xs text-stone-400 mb-1">
              {business.category}
              {business.neighborhood && (
                <span className="text-stone-300"> · {business.neighborhood}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {business.is_featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-forest-50 text-forest-600 border border-forest-200">
                  <StarIcon size={10} />
                  Featured
                </span>
              )}
              {!business.website_url && <NoWebsiteBadge />}
            </div>
          </div>
        </div>

        {business.description && (
          <p className="mt-3 text-sm text-stone-600 leading-relaxed line-clamp-2">
            {truncate(business.description, 120)}
          </p>
        )}

        {business.phone && (
          <p className="mt-2 text-xs text-stone-400 flex items-center gap-1.5">
            <PhoneIcon size={11} />
            {formatPhone(business.phone)}
          </p>
        )}
      </div>
    </Link>
  )
}
