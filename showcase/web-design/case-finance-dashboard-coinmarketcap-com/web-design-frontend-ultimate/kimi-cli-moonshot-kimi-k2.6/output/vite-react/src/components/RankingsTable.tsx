import { useState, useMemo } from "react";
import { allAssets, indexTracker, type CryptoAsset } from "../data/cryptoData";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Columns3,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = ["Top", "Trending", "Watchlist", "Prediction Markets", "Most Visited", "New"];

const networkMap: Record<string, string[]> = {
  "All Networks": [],
  BSC: ["BSC"],
  Solana: ["Solana"],
  Base: ["Base"],
  Ethereum: ["Ethereum"],
  More: ["Bitcoin", "Cardano", "Avalanche", "TRON", "TON", "Polkadot", "XRP Ledger", "Dogecoin", "Litecoin", "Stellar"],
};

type SortKey = "rank" | "price" | "change1h" | "change24h" | "change7d" | "marketCap" | "volume24h" | "circulatingSupply";
type SortDir = "asc" | "desc";

const columnOptions = [
  { key: "rank", label: "#", align: "left" as const },
  { key: "name", label: "Name", align: "left" as const },
  { key: "price", label: "Price", align: "right" as const },
  { key: "change1h", label: "1h %", align: "right" as const },
  { key: "change24h", label: "24h %", align: "right" as const },
  { key: "change7d", label: "7d %", align: "right" as const },
  { key: "marketCap", label: "Market Cap", align: "right" as const },
  { key: "volume24h", label: "Volume(24h)", align: "right" as const },
  { key: "circulatingSupply", label: "Circulating Supply", align: "right" as const },
  { key: "sparkline", label: "Last 7 Days", align: "center" as const },
];

function formatCurrency(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1) return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toExponential(2)}`;
}

function formatPrice(value: number): string {
  if (value >= 1) {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (value >= 0.01) {
    return `$${value.toFixed(4)}`;
  }
  return `$${value.toExponential(2)}`;
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const color = positive ? "#16c784" : "#ea3943";

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChangeCell({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-medium",
        positive ? "text-[#16c784]" : "text-[#ea3943]"
      )}
    >
      {positive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

export default function RankingsTable() {
  const [activeCategory, setActiveCategory] = useState("Top");
  const [activeNetwork, setActiveNetwork] = useState("All Networks");
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState<Set<number>>(new Set());
  const [showColumns, setShowColumns] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Set<string>>(new Set(columnOptions.map((c) => c.key)));
  const [minMarketCap, setMinMarketCap] = useState("");
  const [maxMarketCap, setMaxMarketCap] = useState("");

  const perPage = 100;
  const totalPages = 84;

  const filtered = useMemo(() => {
    let data = [...allAssets];

    if (activeCategory === "Watchlist") {
      data = data.filter((a) => watchlist.has(a.rank));
    } else if (activeCategory !== "Top") {
      data = data.filter((a) => a.category.includes(activeCategory));
    }

    const networks = networkMap[activeNetwork];
    if (networks.length > 0) {
      data = data.filter((a) => networks.includes(a.network));
    }

    if (minMarketCap) {
      data = data.filter((a) => a.marketCap >= Number(minMarketCap) * 1e9);
    }
    if (maxMarketCap) {
      data = data.filter((a) => a.marketCap <= Number(maxMarketCap) * 1e9);
    }

    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return data;
  }, [activeCategory, activeNetwork, sortKey, sortDir, watchlist, minMarketCap, maxMarketCap]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const toggleWatchlist = (rank: number) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(rank)) next.delete(rank);
      else next.add(rank);
      return next;
    });
  };

  const toggleColumn = (key: string) => {
    setVisibleCols((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 3) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const SortIcon = ({ colKey }: { colKey: SortKey }) => {
    if (sortKey !== colKey) return <ChevronDown className="w-3 h-3 text-[#CFD6E4]" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-[#3861FB]" />
    ) : (
      <ChevronDown className="w-3 h-3 text-[#3861FB]" />
    );
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setPage(1);
              }}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                activeCategory === cat
                  ? "bg-[#EFF2F5] text-[#0D1421]"
                  : "text-[#58667E] hover:text-[#0D1421] hover:bg-[#F8FAFD]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Network Tabs */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide">
          {Object.keys(networkMap).map((net) => (
            <button
              key={net}
              onClick={() => {
                setActiveNetwork(net);
                setPage(1);
              }}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
                activeNetwork === net
                  ? "bg-[#EFF2F5] text-[#0D1421]"
                  : "text-[#58667E] hover:text-[#0D1421] hover:bg-[#F8FAFD]"
              )}
            >
              {net}
            </button>
          ))}
        </div>

        {/* Index Tracker */}
        <div className="flex items-center gap-4 mb-4 p-3 bg-[#F8FAFD] rounded-lg border border-[#E5E7EB]">
          <span className="text-sm font-semibold text-[#0D1421]">{indexTracker.name}</span>
          <span className="text-sm font-medium text-[#0D1421]">${indexTracker.price.toFixed(2)}</span>
          <ChangeCell value={indexTracker.change1h} />
          <ChangeCell value={indexTracker.change24h} />
          <ChangeCell value={indexTracker.change7d} />
        </div>

        {/* Table Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSort("marketCap")}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                sortKey === "marketCap"
                  ? "bg-[#EFF2F5] text-[#0D1421]"
                  : "text-[#58667E] hover:bg-[#F8FAFD]"
              )}
            >
              Market Cap <SortIcon colKey="marketCap" />
            </button>
            <button
              onClick={() => handleSort("volume24h")}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                sortKey === "volume24h"
                  ? "bg-[#EFF2F5] text-[#0D1421]"
                  : "text-[#58667E] hover:bg-[#F8FAFD]"
              )}
            >
              Volume(24h) <SortIcon colKey="volume24h" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors",
                  showFilters
                    ? "bg-[#EFF2F5] border-[#CFD6E4] text-[#0D1421]"
                    : "border-[#E5E7EB] text-[#58667E] hover:bg-[#F8FAFD]"
                )}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </button>
              {showFilters && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E5E7EB] p-4 z-50">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#58667E] mb-1">Min Market Cap (B)</label>
                      <input
                        type="number"
                        value={minMarketCap}
                        onChange={(e) => setMinMarketCap(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3861FB]/20 focus:border-[#3861FB]"
                        placeholder="e.g. 1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#58667E] mb-1">Max Market Cap (B)</label>
                      <input
                        type="number"
                        value={maxMarketCap}
                        onChange={(e) => setMaxMarketCap(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3861FB]/20 focus:border-[#3861FB]"
                        placeholder="e.g. 1000"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setMinMarketCap("");
                        setMaxMarketCap("");
                      }}
                      className="w-full px-3 py-2 text-sm font-medium text-[#3861FB] bg-[#EFF2F5] hover:bg-[#E5E7EB] rounded-md transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowColumns(!showColumns)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border transition-colors",
                  showColumns
                    ? "bg-[#EFF2F5] border-[#CFD6E4] text-[#0D1421]"
                    : "border-[#E5E7EB] text-[#58667E] hover:bg-[#F8FAFD]"
                )}
              >
                <Columns3 className="w-3.5 h-3.5" />
                Columns
              </button>
              {showColumns && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E7EB] p-3 z-50">
                  <div className="space-y-1.5">
                    {columnOptions.map((col) => (
                      <label
                        key={col.key}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={visibleCols.has(col.key)}
                          onChange={() => toggleColumn(col.key)}
                          className="w-4 h-4 rounded border-[#CFD6E4] text-[#3861FB] focus:ring-[#3861FB]"
                        />
                        <span className="text-sm text-[#58667E]">{col.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-[#E5E7EB]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFD] border-b border-[#E5E7EB]">
                {visibleCols.has("rank") && (
                  <th
                    className="px-4 py-3 text-left font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("rank")}
                  >
                    <span className="flex items-center gap-1"># <SortIcon colKey="rank" /></span>
                  </th>
                )}
                {visibleCols.has("name") && (
                  <th className="px-4 py-3 text-left font-semibold text-[#58667E]">Name</th>
                )}
                {visibleCols.has("price") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("price")}
                  >
                    <span className="flex items-center justify-end gap-1">Price <SortIcon colKey="price" /></span>
                  </th>
                )}
                {visibleCols.has("change1h") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("change1h")}
                  >
                    <span className="flex items-center justify-end gap-1">1h % <SortIcon colKey="change1h" /></span>
                  </th>
                )}
                {visibleCols.has("change24h") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("change24h")}
                  >
                    <span className="flex items-center justify-end gap-1">24h % <SortIcon colKey="change24h" /></span>
                  </th>
                )}
                {visibleCols.has("change7d") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("change7d")}
                  >
                    <span className="flex items-center justify-end gap-1">7d % <SortIcon colKey="change7d" /></span>
                  </th>
                )}
                {visibleCols.has("marketCap") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("marketCap")}
                  >
                    <span className="flex items-center justify-end gap-1">Market Cap <SortIcon colKey="marketCap" /></span>
                  </th>
                )}
                {visibleCols.has("volume24h") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("volume24h")}
                  >
                    <span className="flex items-center justify-end gap-1">Volume(24h) <SortIcon colKey="volume24h" /></span>
                  </th>
                )}
                {visibleCols.has("circulatingSupply") && (
                  <th
                    className="px-4 py-3 text-right font-semibold text-[#58667E] cursor-pointer hover:text-[#0D1421]"
                    onClick={() => handleSort("circulatingSupply")}
                  >
                    <span className="flex items-center justify-end gap-1">Circulating Supply <SortIcon colKey="circulatingSupply" /></span>
                  </th>
                )}
                {visibleCols.has("sparkline") && (
                  <th className="px-4 py-3 text-center font-semibold text-[#58667E]">Last 7 Days</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginated.map((asset) => (
                <tr
                  key={asset.rank}
                  className="border-b border-[#F1F4F9] hover:bg-[#F8FAFD] transition-colors"
                >
                  {visibleCols.has("rank") && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleWatchlist(asset.rank)}
                          className="text-[#CFD6E4] hover:text-[#F7931A] transition-colors"
                        >
                          <Star
                            className={cn(
                              "w-3.5 h-3.5",
                              watchlist.has(asset.rank) && "fill-[#F7931A] text-[#F7931A]"
                            )}
                          />
                        </button>
                        <span className="text-[#58667E] font-medium tabular-nums">{asset.rank}</span>
                      </div>
                    </td>
                  )}
                  {visibleCols.has("name") && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3861FB] to-[#5B7FFF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#0D1421]">{asset.name}</div>
                          <div className="text-xs text-[#808A9D]">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleCols.has("price") && (
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-[#0D1421] tabular-nums">{formatPrice(asset.price)}</span>
                    </td>
                  )}
                  {visibleCols.has("change1h") && (
                    <td className="px-4 py-3 text-right">
                      <ChangeCell value={asset.change1h} />
                    </td>
                  )}
                  {visibleCols.has("change24h") && (
                    <td className="px-4 py-3 text-right">
                      <ChangeCell value={asset.change24h} />
                    </td>
                  )}
                  {visibleCols.has("change7d") && (
                    <td className="px-4 py-3 text-right">
                      <ChangeCell value={asset.change7d} />
                    </td>
                  )}
                  {visibleCols.has("marketCap") && (
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-[#0D1421] tabular-nums">{formatCurrency(asset.marketCap)}</span>
                    </td>
                  )}
                  {visibleCols.has("volume24h") && (
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-[#0D1421] tabular-nums">{formatCurrency(asset.volume24h)}</span>
                    </td>
                  )}
                  {visibleCols.has("circulatingSupply") && (
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-[#0D1421] tabular-nums">
                        {asset.circulatingSupply.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                        {asset.supplyUnit}
                      </span>
                    </td>
                  )}
                  {visibleCols.has("sparkline") && (
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <Sparkline data={asset.sparkline} positive={asset.change7d >= 0} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-[#808A9D]">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} assets
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md text-[#58667E] hover:bg-[#F8FAFD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors",
                  page === p
                    ? "bg-[#3861FB] text-white"
                    : "text-[#58667E] hover:bg-[#F8FAFD]"
                )}
              >
                {p}
              </button>
            ))}
            <span className="text-sm text-[#808A9D] px-1">...</span>
            <button
              onClick={() => setPage(totalPages)}
              className={cn(
                "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors",
                page === totalPages
                  ? "bg-[#3861FB] text-white"
                  : "text-[#58667E] hover:bg-[#F8FAFD]"
              )}
            >
              {totalPages}
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md text-[#58667E] hover:bg-[#F8FAFD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
