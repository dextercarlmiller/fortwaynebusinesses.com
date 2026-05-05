import { formatDayLabel } from '../../lib/utils'

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

interface HoursDisplayProps {
  hours: Record<string, string>
}

export default function HoursDisplay({ hours }: HoursDisplayProps) {
  const days = DAY_ORDER.filter(d => hours[d] !== undefined)

  return (
    <dl className="space-y-1 text-sm">
      {days.map(day => (
        <div key={day} className="flex justify-between gap-4">
          <dt className="text-stone-500 w-24 shrink-0">{formatDayLabel(day)}</dt>
          <dd className="text-stone-800 text-right">{hours[day] || 'Closed'}</dd>
        </div>
      ))}
    </dl>
  )
}
