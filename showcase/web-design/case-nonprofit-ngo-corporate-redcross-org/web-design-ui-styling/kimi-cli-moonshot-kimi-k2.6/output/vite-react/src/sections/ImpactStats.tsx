import { useCountUp } from '../hooks/useCountUp'

function StatItem({
  end,
  prefix,
  suffix,
  label,
  duration = 2000,
}: {
  end: number
  prefix?: string
  suffix?: string
  label: string
  duration?: number
}) {
  const { ref, formatted, inView } = useCountUp(end, duration, prefix, suffix)
  return (
    <div ref={ref} className="text-center">
      <div
        className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-2 transition-opacity duration-500 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {formatted}
        <span className="text-primary-light">{suffix === 'M' ? 'M' : suffix === 'K' ? 'K' : ''}</span>
      </div>
      <p className="text-white/80 text-sm sm:text-base font-medium">{label}</p>
    </div>
  )
}

export default function ImpactStats() {
  return (
    <section className="relative bg-navy py-16 sm:py-20 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Our Impact
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            These figures represent real lives changed — families sheltered after
            storms, blood delivered to hospitals, and communities rebuilt stronger
            than before.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatItem end={12} suffix="M" label="People assisted annually" />
          <StatItem end={50} suffix="K" label="Active volunteers" />
          <StatItem end={190} suffix="" label="Countries served" />
          <StatItem end={850} prefix="$" suffix="M" label="Raised last fiscal year" />
        </div>
      </div>
    </section>
  )
}
