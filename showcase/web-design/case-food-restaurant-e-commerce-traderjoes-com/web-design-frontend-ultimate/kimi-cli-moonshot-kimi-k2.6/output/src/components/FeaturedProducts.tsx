import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const products = [
  {
    name: "Organic Maple Granola",
    desc: "Crunchy clusters with real maple syrup and toasted oats",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1517093157656-b9ec7904a550?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Everything But The Bagel Seasoning",
    desc: "A savory blend of sesame, garlic, onion & poppy seeds",
    price: "$2.49",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Dark Chocolate Peanut Butter Cups",
    desc: "Rich dark chocolate with creamy peanut butter filling",
    price: "$3.49",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Cauliflower Gnocchi",
    desc: "Light, pillowy gnocchi made with real cauliflower",
    price: "$2.99",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Mandarin Orange Chicken",
    desc: "Crispy chicken bites in a sweet & tangy mandarin sauce",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Unexpected Cheddar Cheese",
    desc: "Aged cheddar with crystalline crunch and complex flavor",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1486297678749-2d5a9f6f9f4e?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Spicy Mango Lemonade",
    desc: "Tropical mango with a kick of chili and fresh lemon",
    price: "$2.79",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Truffle Marcona Almonds",
    desc: "Roasted marcona almonds dusted with black truffle salt",
    price: "$4.49",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop&q=80",
  },
]

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="text-3xl md:text-4xl font-black text-[#2D6A4F] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Staff Favorites
            </h2>
            <p className="text-[#2D6A4F]/60 text-sm md:text-base">
              Hand-picked gems our team can&apos;t stop raving about
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border-2 border-[#2D6A4F]/20 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full border-2 border-[#2D6A4F]/20 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="carousel-scroll flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {products.map((product) => (
            <div
              key={product.name}
              className="snap-start flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#2D6A4F]/5 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#F4A261] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#2D6A4F] text-sm mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-[#2D6A4F]/60 leading-relaxed">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
