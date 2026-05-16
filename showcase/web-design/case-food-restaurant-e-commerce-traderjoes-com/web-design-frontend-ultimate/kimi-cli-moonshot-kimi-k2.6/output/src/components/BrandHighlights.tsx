import { Leaf, DollarSign, Smile } from "lucide-react"

const stats = [
  {
    icon: Leaf,
    value: "100%",
    label: "Organic produce sourced from local farms",
  },
  {
    icon: DollarSign,
    value: "$0",
    label: "Membership fees — no card required",
  },
  {
    icon: Smile,
    value: "4.9",
    label: "Average customer happiness score",
  },
]

export default function BrandHighlights() {
  return (
    <section className="py-16 md:py-20 bg-[#2D6A4F] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                  <Icon className="w-7 h-7 text-[#F4A261]" />
                </div>
                <p
                  className="text-4xl md:text-5xl font-black text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm max-w-xs mx-auto">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
