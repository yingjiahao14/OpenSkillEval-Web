import { Sun } from "lucide-react"

const seasonalItems = [
  {
    name: "Watermelon Mint Sparkling Water",
    desc: "Refreshing fizz with real watermelon essence and a hint of mint.",
    price: "$1.99",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Grilled Peach & Burrata Salad Kit",
    desc: "Everything you need for a summer salad in one box.",
    price: "$5.49",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Coconut Cold Brew Concentrate",
    desc: "Smooth, creamy cold brew with natural coconut flavor.",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Mango Sticky Rice Spring Rolls",
    desc: "A sweet twist on a classic, ready in minutes.",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=400&fit=crop&q=80",
  },
]

export default function SeasonalPicks() {
  return (
    <section className="py-16 md:py-24 bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4A261]/10 text-[#F4A261] text-xs font-bold uppercase tracking-wider mb-4">
            <Sun className="w-3.5 h-3.5" />
            Limited Time
          </div>
          <h2
            className="text-3xl md:text-4xl font-black text-[#2D6A4F] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Summer Favorites Are Here 🌞
          </h2>
          <p className="text-[#2D6A4F]/60 text-sm md:text-base max-w-xl mx-auto">
            Limited-time flavors crafted for the season — grab them before
            they&apos;re gone!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {seasonalItems.map((item) => (
            <div
              key={item.name}
              className="group bg-[#FEFAE0] rounded-2xl overflow-hidden border border-[#2D6A4F]/5 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-[#2D6A4F] text-sm leading-tight flex-1 pr-2">
                    {item.name}
                  </h3>
                  <span className="text-[#F4A261] font-black text-sm whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs text-[#2D6A4F]/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
