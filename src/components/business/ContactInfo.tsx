import { getMapsUrl } from '../../lib/utils'

interface ContactInfoProps {
  phone?: string
  address?: string
  city: string
  state: string
  websiteUrl?: string | null
}

export default function ContactInfo({ phone, address, city, state, websiteUrl }: ContactInfoProps) {
  return (
    <ul className="space-y-3 text-sm">
      {phone && (
        <li className="flex items-start gap-2">
          <span className="shrink-0">📞</span>
          <a href={`tel:${phone}`} className="text-forest-600 hover:underline">
            {phone}
          </a>
        </li>
      )}
      {address && (
        <li className="flex items-start gap-2">
          <span className="shrink-0">📍</span>
          <a
            href={getMapsUrl(address, city, state)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest-600 hover:underline"
          >
            {address}, {city}, {state}
          </a>
        </li>
      )}
      {websiteUrl && (
        <li className="flex items-start gap-2">
          <span className="shrink-0">🌐</span>
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest-600 hover:underline truncate"
          >
            {websiteUrl.replace(/^https?:\/\//, '')}
          </a>
        </li>
      )}
    </ul>
  )
}
