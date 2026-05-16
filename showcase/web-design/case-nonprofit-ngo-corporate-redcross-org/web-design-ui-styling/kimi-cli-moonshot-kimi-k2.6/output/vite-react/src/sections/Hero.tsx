import { ArrowRight, Heart } from 'lucide-react'

interface HeroProps {
  onDonate: () => void
}

export default function Hero({ onDonate }: HeroProps) {
  return (
    <section className="relative bg-warm-50 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            Responding to emergencies worldwide since 1947
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-warm-900 tracking-tight leading-tight mb-6">
            When Disaster Strikes,{' '}
            <span className="text-primary">We're There</span>
          </h1>

          <p className="text-lg sm:text-xl text-warm-600 leading-relaxed mb-8 max-w-2xl">
            From hurricanes and wildfires to global health emergencies, Global Aid
            Alliance delivers immediate relief and long-term recovery support to
            communities in crisis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onDonate}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors shadow-lg shadow-primary/20"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </button>
            <a
              href="#get-involved"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-warm-100 text-navy font-semibold text-base px-8 py-4 rounded-lg border border-warm-200 transition-colors"
            >
              Become a Volunteer
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="mt-12 lg:mt-0 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-2/5">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80"
              alt="Relief workers providing aid to a diverse community after a disaster"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium bg-navy/60 backdrop-blur-sm px-3 py-1.5 rounded-md inline-block">
                Emergency response team on the ground within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
