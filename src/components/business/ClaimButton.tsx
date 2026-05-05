import { Link } from 'react-router-dom'

interface ClaimButtonProps {
  businessId: string
}

export default function ClaimButton({ businessId }: ClaimButtonProps) {
  return (
    <div className="bg-forest-50 border border-forest-200 rounded-xl p-5">
      <p className="font-semibold text-stone-900 mb-1 text-sm">Is this your business?</p>
      <p className="text-stone-500 text-xs mb-3">Claim this listing for free and keep your info up to date.</p>
      <Link
        to={`/claim/${businessId}`}
        className="inline-block text-sm font-semibold text-forest-600 hover:text-forest-800 transition-colors"
      >
        Claim it for free →
      </Link>
    </div>
  )
}
