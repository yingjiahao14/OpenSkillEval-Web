import { useState, useEffect } from 'react'

const banners = [
  { id: 1, text: 'CTP Launch: Secure $GENIUS Airdrop — Join Now', highlight: true },
  { id: 2, text: 'Partner Promotion: Trade on Binance with 10% fee rebate', highlight: false },
  { id: 3, text: 'New Feature: Portfolio tracking with real-time alerts', highlight: false },
]

export function PromoBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#3861FB] text-white">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-center gap-4 py-2.5 relative">
          <button
            onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p className="text-sm font-medium text-center">
            {banners[currentBanner].highlight && (
              <span className="inline-block bg-white/20 px-2 py-0.5 rounded text-xs mr-2">NEW</span>
            )}
            {banners[currentBanner].text}
          </p>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute right-16 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentBanner ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
