import WebStudioLeadForm from '../components/forms/WebStudioLeadForm'

export default function WebStudioPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-cream py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl mb-4 block">💻</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Your business deserves<br />a real website.
          </h1>
          <p className="text-lg text-stone-600 font-sans">
            We build professional, affordable websites for Fort Wayne small businesses — no monthly contracts, no tech headaches.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          <div className="bg-white border border-stone-100 rounded-xl p-6 text-center">
            <span className="text-3xl mb-3 block">💰</span>
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">Affordable one-time fee</h3>
            <p className="text-stone-500 text-sm">Pay once. Own it forever. No surprise monthly bills.</p>
          </div>
          <div className="bg-white border border-stone-100 rounded-xl p-6 text-center">
            <span className="text-3xl mb-3 block">🌳</span>
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">Built for Fort Wayne</h3>
            <p className="text-stone-500 text-sm">We're local. We know this market and we care about your success.</p>
          </div>
          <div className="bg-white border border-stone-100 rounded-xl p-6 text-center">
            <span className="text-3xl mb-3 block">📱</span>
            <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">No monthly contracts</h3>
            <p className="text-stone-500 text-sm">Professional, mobile-friendly design with no lock-in.</p>
          </div>
        </div>

        {/* Lead form */}
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-stone-900 text-center mb-2">
            Get a free quote
          </h2>
          <p className="text-stone-500 text-sm text-center mb-8">
            Tell us about your business and we'll be in touch within 1 business day.
          </p>
          <div className="bg-white border border-stone-100 rounded-xl p-6 sm:p-8">
            <WebStudioLeadForm />
          </div>
        </div>
      </section>
    </main>
  )
}
