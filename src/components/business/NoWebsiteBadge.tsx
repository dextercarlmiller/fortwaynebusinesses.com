interface NoWebsiteBadgeProps {
  onClick?: () => void
  className?: string
}

export default function NoWebsiteBadge({ onClick, className = '' }: NoWebsiteBadgeProps) {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600'
  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} hover:bg-red-200 transition-colors cursor-pointer ${className}`}>
        <span>⚠️</span> No website yet
      </button>
    )
  }
  return (
    <span className={`${base} ${className}`}>
      <span>⚠️</span> No website yet
    </span>
  )
}
