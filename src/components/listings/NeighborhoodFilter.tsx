export const NEIGHBORHOODS = [
  'Downtown',
  'Southwest Fort Wayne',
  'Northwest Fort Wayne',
  'Northeast Fort Wayne',
  'Southeast Fort Wayne',
  'New Haven',
  'Grabill',
  'Huntertown',
  'Leo-Cedarville',
  'Aboite',
] as const

export type Neighborhood = typeof NEIGHBORHOODS[number]

interface NeighborhoodFilterProps {
  selected: string
  onSelect: (neighborhood: string) => void
}

export default function NeighborhoodFilter({ selected, onSelect }: NeighborhoodFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      <button
        onClick={() => onSelect('')}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          selected === ''
            ? 'bg-amber-600 text-white border-amber-600'
            : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
        }`}
      >
        All areas
      </button>
      {NEIGHBORHOODS.map(area => (
        <button
          key={area}
          onClick={() => onSelect(area)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === area
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
          }`}
        >
          {area}
        </button>
      ))}
    </div>
  )
}
