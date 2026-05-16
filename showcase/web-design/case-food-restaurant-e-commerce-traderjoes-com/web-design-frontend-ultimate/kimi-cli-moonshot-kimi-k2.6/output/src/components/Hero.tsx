import { MapPin, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4A261]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Neighborhood Grocery, Reimagined
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2D6A4F] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Discover Everyday{" "}
              <span className="text-[#F4A261]">Deliciousness</span>
            </h1>
            <p className="text-base md:text-lg text-[#2D6A4F]/70 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
              Unique flavors, quality ingredients, and unbeatable prices — all
              waiting for you at your neighborhood Fresh Pantry.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <a
                href="#stores"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D6A4F] text-white font-bold text-sm hover:bg-[#245c43] transition-colors shadow-lg shadow-[#2D6A4F]/20"
              >
                <MapPin className="w-4 h-4" />
                Find a Store Near You
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4A261] text-white font-bold text-sm hover:bg-[#e08c4f] transition-colors shadow-lg shadow-[#F4A261]/20"
              >
                <Sparkles className="w-4 h-4" />
                Explore This Week&apos;s Picks
              </a>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#2D6A4F]/20 to-[#F4A261]/20 rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop&q=80"
                alt="Bright grocery store produce display"
                className="relative rounded-[2rem] w-full h-full object-cover shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl border border-[#2D6A4F]/10">
                <p className="text-xs text-[#2D6A4F]/60 font-semibold uppercase tracking-wide">Starting at</p>
                <p className="text-2xl font-black text-[#2D6A4F]">$1.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
