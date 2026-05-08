import { getMapsUrl, formatPhone } from '../../lib/utils'
import { PhoneIcon, MapPinIcon, GlobeIcon } from '../Icons'

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
        <li className="flex items-center gap-2">
          <PhoneIcon size={14} className="shrink-0 text-stone-400" />
          <a href={`tel:${phone}`} className="text-forest-600 hover:underline">
            {formatPhone(phone)}
          </a>
        </li>
      )}
      {address && (
        <li className="flex items-start gap-2">
          <MapPinIcon size={14} className="shrink-0 mt-0.5 text-stone-400" />
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
        <li className="flex items-center gap-2">
          <GlobeIcon size={14} className="shrink-0 text-stone-400" />
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
