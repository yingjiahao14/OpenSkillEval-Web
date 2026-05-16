import { cn } from "@/lib/utils";

const networks = ["All Networks", "BSC", "Solana", "Base", "Ethereum", "More"];

interface NetworkTabsProps {
  active: string;
  onChange: (network: string) => void;
}

export default function NetworkTabs({ active, onChange }: NetworkTabsProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {networks.map((network) => (
            <button
              key={network}
              onClick={() => onChange(network)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
                active === network
                  ? "bg-[#EFF2F5] text-[#0D1421]"
                  : "text-[#58667E] hover:text-[#0D1421] hover:bg-[#F8FAFD]"
              )}
            >
              {network}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
