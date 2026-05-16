import { Heart, Check } from 'lucide-react'

interface DonateCTAProps {
  onDonate: () => void
}

const impacts = [
  { amount: '$25', impact: 'Provides 5 emergency blankets for displaced families' },
  { amount: '$50', impact: 'Supplies a family with food and water for one week' },
  { amount: '$100', impact: 'Funds emergency shelter materials for a household' },
  { amount: '$250', impact: 'Equips a volunteer with disaster response training' },
]

export default function DonateCTA({ onDonate }: DonateCTAProps) {
  return (
    <section className="py-16 sm:py-24 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Your Gift Makes a Difference
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              A donation of any size helps us respond to disasters, train
              volunteers, and support communities in crisis. 91 cents of every
              dollar goes directly to humanitarian services.
            </p>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Check className="w-4 h-4 text-primary-light" />
              Tax-deductible 501(c)(3) donation
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-bold text-warm-900 mb-5">Choose your impact</h3>
            <div className="space-y-3 mb-6">
              {impacts.map((item) => (
                <button
                  key={item.amount}
                  onClick={onDonate}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-warm-200 hover:border-primary hover:bg-primary-light/30 transition-colors text-left group"
                >
                  <span className="text-xl font-bold text-primary group-hover:text-primary-dark">
                    {item.amount}
                  </span>
                  <span className="text-sm text-warm-600">{item.impact}</span>
                </button>
              ))}
              <button
                onClick={onDonate}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-warm-200 hover:border-primary hover:bg-primary-light/30 transition-colors text-left group"
              >
                <span className="text-xl font-bold text-primary group-hover:text-primary-dark">
                  Custom
                </span>
                <span className="text-sm text-warm-600">
                  Every dollar counts toward saving lives
                </span>
              </button>
            </div>
            <button
              onClick={onDonate}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
