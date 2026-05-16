import { useState } from "react";
import { marketSummary } from "../data/cryptoData";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function MarketSummary() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-t border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-[#58667E] leading-relaxed">
          The global crypto market cap is{" "}
          <span className="font-semibold text-[#0D1421]">{marketSummary.globalCap}</span>, a{" "}
          <span className="font-semibold text-[#16c784]">{marketSummary.globalCapChange} increase</span>{" "}
          over the last day. The total crypto market volume over the last 24 hours is{" "}
          <span className="font-semibold text-[#0D1421]">{marketSummary.volume24h}</span>, a{" "}
          <span className="font-semibold text-[#16c784]">{marketSummary.volumeChange} increase</span>.
          The total volume in DeFi is currently {marketSummary.defiVolume},{" "}
          {marketSummary.defiShare} of the total crypto market 24-hour volume. The volume of all stablecoins is{" "}
          {marketSummary.stablecoinVolume}, representing {marketSummary.stablecoinShare} of total 24-hour volume.
          Bitcoin&apos;s dominance is currently{" "}
          <span className="font-semibold text-[#0D1421]">{marketSummary.btcDominance}</span>, a decrease of{" "}
          {marketSummary.btcDominanceChange} over the day.
        </p>

        {expanded && (
          <div className="mt-4 p-4 bg-[#F8FAFD] rounded-lg border border-[#E5E7EB]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">DeFi Market Cap</div>
                <div className="text-sm font-semibold text-[#0D1421]">$92.4B</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">NFT Volume (24h)</div>
                <div className="text-sm font-semibold text-[#0D1421]">$28.7M</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">Total Value Locked</div>
                <div className="text-sm font-semibold text-[#0D1421]">$54.2B</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">Ethereum Gas (Gwei)</div>
                <div className="text-sm font-semibold text-[#0D1421]">12.4</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">ETH/BTC Ratio</div>
                <div className="text-sm font-semibold text-[#0D1421]">0.0312</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">Long/Short Ratio</div>
                <div className="text-sm font-semibold text-[#0D1421]">1.24</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">Funding Rate (BTC)</div>
                <div className="text-sm font-semibold text-[#16c784]">+0.01%</div>
              </div>
              <div>
                <div className="text-xs font-medium text-[#808A9D] mb-1">Open Interest</div>
                <div className="text-sm font-semibold text-[#0D1421]">$32.8B</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[#3861FB] hover:text-[#2A4ED0] transition-colors"
        >
          {expanded ? (
            <>
              Read Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
