import { useState } from "react"
import { Search, MapPin, Clock, Phone } from "lucide-react"

const mockStores = [
  {
    name: "Fresh Pantry — Downtown",
    address: "142 Market Street, Downtown",
    hours: "7:00 AM – 10:00 PM",
    phone: "(555) 123-4567",
  },
  {
    name: "Fresh Pantry — Westside",
    address: "88 Oak Avenue, Westside",
    hours: "8:00 AM – 9:00 PM",
    phone: "(555) 234-5678",
  },
  {
    name: "Fresh Pantry — Eastlake",
    address: "320 Lakeview Road, Eastlake",
    hours: "7:00 AM – 10:00 PM",
    phone: "(555) 345-6789",
  },
]

export default function StoreLocator() {
  const [zip, setZip] = useState("")
  const [results, setResults] = useState<typeof mockStores | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    if (zip.trim().length >= 3) {
      setResults(mockStores)
    } else {
      setResults([])
    }
  }

  return (
    <section id="stores" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-black text-[#2D6A4F] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Your Fresh Pantry
          </h2>
          <p className="text-[#2D6A4F]/60 text-sm md:text-base">
            Enter your ZIP code to discover stores near you
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="max-w-md mx-auto flex items-center gap-2 mb-10"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D6A4F]/40" />
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter ZIP code"
              className="w-full pl-9 pr-4 py-3 rounded-full border-2 border-[#2D6A4F]/15 bg-white text-sm font-medium text-[#2D6A4F] placeholder:text-[#2D6A4F]/30 focus:outline-none focus:border-[#2D6A4F]/40 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#2D6A4F] text-white font-bold text-sm hover:bg-[#245c43] transition-colors shadow-lg shadow-[#2D6A4F]/20"
          >
            Search
          </button>
        </form>

        {searched && results && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {results.map((store) => (
              <div
                key={store.name}
                className="bg-white rounded-2xl p-5 border border-[#2D6A4F]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-[#2D6A4F]/10">
                    <MapPin className="w-4 h-4 text-[#2D6A4F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2D6A4F] text-sm">
                      {store.name}
                    </h3>
                    <p className="text-xs text-[#2D6A4F]/60">{store.address}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-[3.25rem]">
                  <div className="flex items-center gap-2 text-xs text-[#2D6A4F]/70">
                    <Clock className="w-3.5 h-3.5" />
                    {store.hours}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#2D6A4F]/70">
                    <Phone className="w-3.5 h-3.5" />
                    {store.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searched && results && results.length === 0 && (
          <p className="text-center text-sm text-[#2D6A4F]/50">
            No stores found. Try a different ZIP code.
          </p>
        )}
      </div>
    </section>
  )
}
