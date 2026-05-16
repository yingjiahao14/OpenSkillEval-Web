import { marketStats } from "../data/cryptoData";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

export default function StatsBar() {
  return (
    <div className="bg-[#F8FAFD] border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 py-2.5 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 shrink-0">
            <BarChart3 className="w-4 h-4 text-[#3861FB]" />
            <span className="text-xs font-medium text-[#808A9D]">Market Cap</span>
            <span className="text-sm font-semibold text-[#0D1421]">{marketStats.marketCap}</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-[#16c784]">
              <TrendingUp className="w-3 h-3" /> {marketStats.marketCapChange}
            </span>
          </div>

          <div className="w-px h-4 bg-[#E5E7EB] shrink-0" />

          <div className="flex items-center gap-2 shrink-0">
            <Activity className="w-4 h-4 text-[#3861FB]" />
            <span className="text-xs font-medium text-[#808A9D]">CTP20</span>
            <span className="text-sm font-semibold text-[#0D1421]">{marketStats.ctp20Index}</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-[#16c784]">
              <TrendingUp className="w-3 h-3" /> {marketStats.ctp20Change}
            </span>
          </div>

          <div className="w-px h-4 bg-[#E5E7EB] shrink-0" />

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-[#808A9D]">Fear & Greed</span>
            <span className="text-sm font-semibold text-[#0D1421]">{marketStats.fearGreed}</span>
            <span className="text-xs font-medium text-[#F7931A]">{marketStats.fearGreedLabel}</span>
          </div>

          <div className="w-px h-4 bg-[#E5E7EB] shrink-0" />

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-[#808A9D]">Altcoin Season</span>
            <span className="text-sm font-semibold text-[#0D1421]">{marketStats.altcoinSeason}</span>
            <span className="text-xs font-medium text-[#808A9D]">{marketStats.altcoinSeasonLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
