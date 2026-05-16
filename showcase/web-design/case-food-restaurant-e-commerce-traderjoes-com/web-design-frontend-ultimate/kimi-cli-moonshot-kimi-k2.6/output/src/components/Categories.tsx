import { useState } from "react"
import { Utensils, Salad, Cookie, Wine } from "lucide-react"

const categories = [
  {
    name: "Prepared Meals",
    desc: "Ready-to-eat & heat-and-serve",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop&q=80",
    color: "#2D6A4F",
  },
  {
    name: "Fresh Produce",
    desc: "Organic fruits & vegetables",
    icon: Salad,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&q=80",
    color: "#2D6A4F",
  },
  {
    name: "Snacks & Treats",
    desc: "Chips, cookies & indulgences",
    icon: Cookie,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&q=80",
    color: "#F4A261",
  },
  {
    name: "Wine & Beverages",
    desc: "Curated drinks for every meal",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop&q=80",
    color: "#F4A261",
  },
]

export default function Categories() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-black text-[#2D6A4F] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Shop by Category
          </h2>
          <p className="text-[#2D6A4F]/60 text-sm md:text-base max-w-xl mx-auto">
            Explore our aisles and find exactly what you&apos;re craving
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            const isHovered = hovered === i
            return (
              <div
                key={cat.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/5]"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isHovered ? "opacity-80" : "opacity-50"
                  }`}
                  style={{ backgroundColor: cat.color }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div
                    className={`p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4 transition-transform duration-300 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3
                    className="text-xl font-black mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className={`text-sm text-white/80 transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    {cat.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
