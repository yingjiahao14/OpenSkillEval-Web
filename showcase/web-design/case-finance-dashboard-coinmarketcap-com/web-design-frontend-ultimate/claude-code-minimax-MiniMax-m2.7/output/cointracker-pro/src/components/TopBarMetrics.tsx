import { marketStats } from '../data/cryptoData'

export function TopBarMetrics() {
  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="bg-[#0D1421] text-white">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center gap-8 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[#808A9D] text-sm">Market Cap:</span>
            <span className="font-semibold font-mono">{formatCurrency(marketStats.totalMarketCap)}</span>
            <span className="text-[#16c784] text-sm font-mono">↑ {marketStats.marketCapChange24h}%</span>
          </div>
          <div className="h-4 w-px bg-[#2a2f3c] shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[#808A9D] text-sm">CTP20:</span>
            <span className="font-semibold font-mono">${marketStats.ctp20Index.toLocaleString()}</span>
            <span className="text-[#16c784] text-sm font-mono">↑ {marketStats.ctp20Change}%</span>
          </div>
          <div className="h-4 w-px bg-[#2a2f3c] shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[#808A9D] text-sm">Fear & Greed:</span>
            <span className="font-semibold font-mono">{marketStats.fearGreedIndex}</span>
            <span className="text-[#f59e0b] text-sm">{marketStats.fearGreedLabel}</span>
          </div>
          <div className="h-4 w-px bg-[#2a2f3c] shrink-0" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[#808A9D] text-sm">Altcoin Season:</span>
            <span className="font-semibold font-mono">{marketStats.altcoinSeason}/100</span>
            <span className="text-[#ea3943] text-sm">{marketStats.altcoinSeasonLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
