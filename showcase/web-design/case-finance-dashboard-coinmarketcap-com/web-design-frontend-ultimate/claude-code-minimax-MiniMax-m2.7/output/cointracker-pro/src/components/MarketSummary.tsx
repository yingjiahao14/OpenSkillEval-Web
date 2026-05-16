import { useState } from 'react'
import { marketSummaryData } from '../data/cryptoData'

export function MarketSummary() {
  const [expanded, setExpanded] = useState(false)

  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    return `$${value.toLocaleString()}`
  }

  return (
    <section className="mt-12 bg-white rounded-xl border border-[#e5e7eb] p-6">
      <h2 className="text-lg font-semibold text-[#0D1421] mb-4">Market Summary</h2>
      <div className="text-sm text-[#808A9D] leading-relaxed">
        <p>
          The global crypto market cap is <span className="font-semibold text-[#0D1421]">{formatCurrency(marketSummaryData.globalMarketCap)}</span>,
          a <span className="font-semibold text-[#16c784]">{marketSummaryData.marketCapChange24h}% increase</span> over the last day. The total
          crypto market volume over the last 24 hours is <span className="font-semibold text-[#0D1421]">{formatCurrency(marketSummaryData.totalVolume24h)}</span>,
          a <span className="font-semibold text-[#16c784]">{marketSummaryData.volumeChange24h}% increase</span>. The total volume in DeFi is
          currently {formatCurrency(marketSummaryData.defiVolume)}, {marketSummaryData.defiVolumeShare}% of the total crypto market 24-hour volume.
          The volume of all stablecoins is {formatCurrency(marketSummaryData.stablecoinVolume)}, representing {marketSummaryData.stablecoinVolumeShare}%
          of total 24-hour volume. Bitcoin's dominance is currently <span className="font-semibold text-[#0D1421]">{marketSummaryData.btcDominance}%</span>,
          a decrease of {marketSummaryData.btcDominanceChange}% over the day.
        </p>
        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-xs text-[#808A9D] block">DeFi Volume</span>
                <span className="text-sm font-semibold text-[#0D1421]">{formatCurrency(marketSummaryData.defiVolume)}</span>
              </div>
              <div>
                <span className="text-xs text-[#808A9D] block">Stablecoin Volume</span>
                <span className="text-sm font-semibold text-[#0D1421]">{formatCurrency(marketSummaryData.stablecoinVolume)}</span>
              </div>
              <div>
                <span className="text-xs text-[#808A9D] block">Bitcoin Dominance</span>
                <span className="text-sm font-semibold text-[#0D1421]">{marketSummaryData.btcDominance}%</span>
              </div>
              <div>
                <span className="text-xs text-[#808A9D] block">24h Change</span>
                <span className="text-sm font-semibold text-[#16c784]">+{marketSummaryData.marketCapChange24h}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm font-medium text-[#3861FB] hover:text-[#2d4edb] transition-colors"
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </section>
  )
}
