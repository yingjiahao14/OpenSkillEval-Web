import { useState } from 'react'
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react'

const newsItems = [
  {
    id: 1,
    title: 'Hurricane Response Update',
    excerpt:
      'Global Aid Alliance teams are providing shelter and supplies to over 15,000 families displaced by Hurricane Marlena along the Gulf Coast. Relief operations are ongoing across 12 counties.',
    category: 'Disaster Relief',
    image:
      'https://images.unsplash.com/photo-1529797228130-fe918ce0d5f5?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Wildfire Relief Efforts',
    excerpt:
      'Emergency shelters have been opened in three western states as crews battle record-breaking wildfires. Volunteers are distributing meals, water, and comfort kits to evacuees.',
    category: 'Emergency Response',
    image:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Blood Drive Campaign',
    excerpt:
      'Our summer blood drive campaign has collected over 120,000 units so far, but hospitals still face critical shortages. New donation sites have been added nationwide.',
    category: 'Health',
    image:
      'https://images.unsplash.com/photo-1615461066842-32561977e3d8?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Volunteer Spotlight',
    excerpt:
      'Meet Daniela Torres, a disaster response volunteer who has deployed to seven emergencies in three years. Her story of service inspires communities across the country.',
    category: 'Volunteers',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&q=80',
  },
]

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 1 // mobile
  const totalSlides = newsItems.length

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className="py-16 sm:py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-2">
              <Newspaper className="w-4 h-4" />
              Latest Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900 tracking-tight">
              News & Stories
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-warm-300 bg-white hover:bg-warm-100 flex items-center justify-center transition-colors"
              aria-label="Previous news"
            >
              <ChevronLeft className="w-5 h-5 text-warm-700" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-warm-300 bg-white hover:bg-warm-100 flex items-center justify-center transition-colors"
              aria-label="Next news"
            >
              <ChevronRight className="w-5 h-5 text-warm-700" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2"
              >
                <article className="bg-white rounded-xl overflow-hidden border border-warm-200 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-warm-700 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-warm-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-warm-600 leading-relaxed line-clamp-3 flex-1">
                      {item.excerpt}
                    </p>
                    <a
                      href="#"
                      className="mt-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      Read more →
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav + dots */}
        <div className="flex items-center justify-between sm:justify-center mt-6 gap-4">
          <button
            onClick={prev}
            className="sm:hidden w-10 h-10 rounded-full border border-warm-300 bg-white hover:bg-warm-100 flex items-center justify-center transition-colors"
            aria-label="Previous news"
          >
            <ChevronLeft className="w-5 h-5 text-warm-700" />
          </button>

          <div className="flex gap-2">
            {newsItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-warm-300 hover:bg-warm-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="sm:hidden w-10 h-10 rounded-full border border-warm-300 bg-white hover:bg-warm-100 flex items-center justify-center transition-colors"
            aria-label="Next news"
          >
            <ChevronRight className="w-5 h-5 text-warm-700" />
          </button>
        </div>
      </div>
    </section>
  )
}
