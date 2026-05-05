import type { Category } from '../../lib/types'

interface CategoryFilterProps {
  categories: Category[]
  selected: string
  onSelect: (slug: string) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      <button
        onClick={() => onSelect('')}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          selected === ''
            ? 'bg-forest-600 text-white border-forest-600'
            : 'bg-white text-stone-700 border-stone-200 hover:border-forest-400'
        }`}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.name)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5 ${
            selected === cat.name
              ? 'bg-forest-600 text-white border-forest-600'
              : 'bg-white text-stone-700 border-stone-200 hover:border-forest-400'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  )
}
