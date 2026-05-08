import { LaptopIcon } from '../Icons'

export default function WebStudioCTA() {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <LaptopIcon size={28} className="text-amber-500 mb-2" />
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">No website? Let's change that.</h3>
        <p className="text-stone-600 text-sm">We build affordable, professional websites for Fort Wayne small businesses. No monthly contracts.</p>
      </div>
      <a
        href="https://web.fortwaynebusinesses.com"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors text-sm font-sans"
      >
        Learn more →
      </a>
    </div>
  )
}
