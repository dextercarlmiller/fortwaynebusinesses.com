import { AlertTriangleIcon } from '../Icons'

interface NoWebsiteBadgeProps {
  onClick?: () => void
  className?: string
}

export default function NoWebsiteBadge({ onClick, className = '' }: NoWebsiteBadgeProps) {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100'
  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} hover:bg-red-100 transition-colors cursor-pointer ${className}`}>
        <AlertTriangleIcon size={11} />
        No website yet
      </button>
    )
  }
  return (
    <span className={`${base} ${className}`}>
      <AlertTriangleIcon size={11} />
      No website yet
    </span>
  )
}
