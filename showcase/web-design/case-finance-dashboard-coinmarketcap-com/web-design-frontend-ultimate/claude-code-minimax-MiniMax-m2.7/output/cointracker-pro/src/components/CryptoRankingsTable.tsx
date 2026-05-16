import { useState, useMemo } from 'react'
import { cryptoData, indexData } from '../data/cryptoData'

interface CryptoRankingsTableProps {
  activeCategory: string
  activeNetwork: string
}

type SortKey = 'rank' | 'price' | 'change1h' | 'change24h' | 'change7d' | 'marketCap' | 'volume24h' | 'circulatingSupply'
type SortOrder = 'asc' | 'desc'

function formatCurrency(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1) return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${value.toFixed(6)}`
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 24
  const width = 60
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const isUp = data[data.length - 1] >= data[0]

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? '#16c784' : '#ea3943'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CryptoRankingsTable({ activeCategory, activeNetwork }: CryptoRankingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [showColumns, setShowColumns] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState({
    rank: true,
    name: true,
    price: true,
    change1h: true,
    change24h: true,
    change7d: true,
    marketCap: true,
    volume24h: true,
    circulatingSupply: true,
    sparkline: true
  })

  const filteredData = useMemo(() => {
    let data = [...cryptoData]

    if (activeNetwork !== 'All Networks') {
      data = data.filter(asset => asset.network.toLowerCase().includes(activeNetwork.toLowerCase()))
    }

    return data
  }, [activeCategory, activeNetwork])

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortKey] as string | number
      const bVal = b[sortKey] as string | number

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [filteredData, sortKey, sortOrder])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * 100
    return sortedData.slice(start, start + 100)
  }, [sortedData, currentPage])

  const totalPages = Math.ceil(sortedData.length / 100)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const toggleColumn = (col: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }))
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <span className="text-[#c4c9d4] ml-1">↕</span>
    return <span className="text-[#3861FB] ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div className="index-row bg-[#f8f9fb] border-b border-[#e5e7eb] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#0D1421]">{indexData.name}</span>
            <span className="text-sm text-[#808A9D]">({indexData.symbol})</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-sm">
            <span className="font-semibold text-[#0D1421]">${indexData.price.toLocaleString()}</span>
            <span className={indexData.change1h >= 0 ? 'text-[#16c784]' : 'text-[#ea3943]'}>
              {indexData.change1h >= 0 ? '+' : ''}{indexData.change1h}%
            </span>
            <span className={indexData.change24h >= 0 ? 'text-[#16c784]' : 'text-[#ea3943]'}>
              {indexData.change24h >= 0 ? '+' : ''}{indexData.change24h}%
            </span>
            <span className={indexData.change7d >= 0 ? 'text-[#16c784]' : 'text-[#ea3943]'}>
              {indexData.change7d >= 0 ? '+' : ''}{indexData.change7d}%
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-[#e5e7eb] flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowColumns(!showColumns)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#808A9D] border border-[#e5e7eb] rounded-lg hover:border-[#0D1421] hover:text-[#0D1421] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Columns
            </button>
            {showColumns && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-[#e5e7eb] rounded-lg shadow-lg p-3 z-10 min-w-[180px]">
                {Object.entries(visibleColumns).map(([col, visible]) => (
                  <label key={col} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={() => toggleColumn(col as keyof typeof visibleColumns)}
                      className="w-4 h-4 rounded border-[#e5e7eb] text-[#3861FB] focus:ring-[#3861FB]"
                    />
                    <span className="text-sm text-[#0D1421] capitalize">{col}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#808A9D] border border-[#e5e7eb] rounded-lg hover:border-[#0D1421] hover:text-[#0D1421] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
        <div className="text-sm text-[#808A9D]">
          Showing {((currentPage - 1) * 100) + 1}–{Math.min(currentPage * 100, sortedData.length)} of {sortedData.length.toLocaleString()} assets
        </div>
      </div>

      {showFilters && (
        <div className="px-4 py-3 border-b border-[#e5e7eb] bg-[#f8f9fb]">
          <div className="flex items-center gap-6">
            <div>
              <label className="text-xs text-[#808A9D] block mb-1">Price Range</label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-24 px-2 py-1 text-sm border border-[#e5e7eb] rounded focus:outline-none focus:border-[#3861FB]" />
                <span className="text-[#808A9D]">–</span>
                <input type="number" placeholder="Max" className="w-24 px-2 py-1 text-sm border border-[#e5e7eb] rounded focus:outline-none focus:border-[#3861FB]" />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#808A9D] block mb-1">Market Cap</label>
              <select className="px-2 py-1 text-sm border border-[#e5e7eb] rounded focus:outline-none focus:border-[#3861FB]">
                <option>All</option>
                <option>Large ($10B+)</option>
                <option>Mid ($1B–$10B)</option>
                <option>Small ($100M–$1B)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#808A9D] block mb-1">24h Volume</label>
              <select className="px-2 py-1 text-sm border border-[#e5e7eb] rounded focus:outline-none focus:border-[#3861FB]">
                <option>All</option>
                <option>High ($1B+)</option>
                <option>Mid ($100M–$1B)</option>
                <option>Low (Below $100M)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="bg-[#f8f9fb] border-b border-[#e5e7eb]">
              {visibleColumns.rank && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#808A9D] uppercase tracking-wider w-16">
                  #
                </th>
              )}
              {visibleColumns.name && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#808A9D] uppercase tracking-wider">
                  Name
                </th>
              )}
              {visibleColumns.price && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('price')}
                >
                  Price <SortIcon column="price" />
                </th>
              )}
              {visibleColumns.change1h && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('change1h')}
                >
                  1h % <SortIcon column="change1h" />
                </th>
              )}
              {visibleColumns.change24h && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('change24h')}
                >
                  24h % <SortIcon column="change24h" />
                </th>
              )}
              {visibleColumns.change7d && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('change7d')}
                >
                  7d % <SortIcon column="change7d" />
                </th>
              )}
              {visibleColumns.marketCap && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('marketCap')}
                >
                  Market Cap <SortIcon column="marketCap" />
                </th>
              )}
              {visibleColumns.volume24h && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('volume24h')}
                >
                  Volume(24h) <SortIcon column="volume24h" />
                </th>
              )}
              {visibleColumns.circulatingSupply && (
                <th
                  className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider cursor-pointer hover:text-[#0D1421]"
                  onClick={() => handleSort('circulatingSupply')}
                >
                  Circulating Supply <SortIcon column="circulatingSupply" />
                </th>
              )}
              {visibleColumns.sparkline && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#808A9D] uppercase tracking-wider">
                  Last 7 Days
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((asset) => (
              <tr key={asset.rank} className="border-b border-[#f3f4f6] hover:bg-[#f8f9fb] transition-colors">
                {visibleColumns.rank && (
                  <td className="px-4 py-3 text-sm text-[#808A9D] font-mono">
                    {asset.rank}
                  </td>
                )}
                {visibleColumns.name && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3861FB] to-[#6c8cff] flex items-center justify-center text-white text-xs font-bold">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#0D1421]">{asset.name}</span>
                        <span className="text-xs text-[#808A9D] ml-1">{asset.symbol}</span>
                      </div>
                    </div>
                  </td>
                )}
                {visibleColumns.price && (
                  <td className="px-4 py-3 text-sm text-[#0D1421] font-mono text-right">
                    {formatCurrency(asset.price)}
                  </td>
                )}
                {visibleColumns.change1h && (
                  <td className={`px-4 py-3 text-sm font-mono text-right ${asset.change1h >= 0 ? 'text-[#16c784]' : 'text-[#ea3943]'}`}>
                    {asset.change1h >= 0 ? '+' : ''}{asset.change1h}%
                  </td>
                )}
                {visibleColumns.change24h && (
                  <td className={`px-4 py-3 text-sm font-mono text-right ${asset.change24h >= 0 ? 'text-[#16c784]' : 'text-[#ea3943]'}`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </td>
                )}
                {visibleColumns.change7d && (
                  <td className={`px-4 py-3 text-sm font-mono text-right ${asset.change7d >= 0 ? 'text-[#16c784]' : 'text-[#ea3943]'}`}>
                    {asset.change7d >= 0 ? '+' : ''}{asset.change7d}%
                  </td>
                )}
                {visibleColumns.marketCap && (
                  <td className="px-4 py-3 text-sm text-[#0D1421] font-mono text-right">
                    {formatCurrency(asset.marketCap)}
                  </td>
                )}
                {visibleColumns.volume24h && (
                  <td className="px-4 py-3 text-sm text-[#0D1421] font-mono text-right">
                    {formatCurrency(asset.volume24h)}
                  </td>
                )}
                {visibleColumns.circulatingSupply && (
                  <td className="px-4 py-3 text-sm text-[#0D1421] font-mono text-right">
                    {asset.supply}
                  </td>
                )}
                {visibleColumns.sparkline && (
                  <td className="px-4 py-3 text-right">
                    <Sparkline data={asset.sparkline} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="text-sm text-[#808A9D]">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm font-medium text-[#808A9D] border border-[#e5e7eb] rounded-lg hover:bg-[#f8f9fb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
            let pageNum: number
            if (totalPages <= 10) {
              pageNum = i + 1
            } else if (currentPage <= 6) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 4) {
              pageNum = totalPages - 9 + i
            } else {
              pageNum = currentPage - 5 + i
            }
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[#3861FB] text-white'
                    : 'text-[#808A9D] border border-[#e5e7eb] hover:bg-[#f8f9fb]'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm font-medium text-[#808A9D] border border-[#e5e7eb] rounded-lg hover:bg-[#f8f9fb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
