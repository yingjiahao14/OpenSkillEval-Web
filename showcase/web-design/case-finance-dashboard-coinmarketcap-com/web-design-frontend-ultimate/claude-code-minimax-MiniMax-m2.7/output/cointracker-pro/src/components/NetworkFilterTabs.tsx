interface NetworkFilterTabsProps {
  activeNetwork: string
  onNetworkChange: (network: string) => void
}

const networks = ['All Networks', 'BSC', 'Solana', 'Base', 'Ethereum', 'More']

export function NetworkFilterTabs({ activeNetwork, onNetworkChange }: NetworkFilterTabsProps) {
  return (
    <div className="py-4 border-b border-[#e5e7eb]">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {networks.map((network) => (
          <button
            key={network}
            onClick={() => onNetworkChange(network)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeNetwork === network
                ? 'bg-[#0D1421] text-white'
                : 'bg-white text-[#808A9D] border border-[#e5e7eb] hover:border-[#0D1421] hover:text-[#0D1421]'
            }`}
          >
            {network}
          </button>
        ))}
      </div>
    </div>
  )
}
