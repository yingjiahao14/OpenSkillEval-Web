import { useState } from "react";
import { aiSuggestions } from "../data/cryptoData";
import { Sparkles, Send } from "lucide-react";

export default function AIAlerts() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#3861FB]" />
            <span className="text-sm font-semibold text-[#0D1421]">
              Stablecoin issuer eyes Solana DeFi expansion 👀
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1.5 text-xs font-medium text-[#58667E] bg-[#F8FAFD] hover:bg-[#EFF2F5] border border-[#E5E7EB] hover:border-[#CFD6E4] rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          {query && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3861FB]/20 focus:border-[#3861FB]"
                placeholder="Ask anything about crypto..."
              />
              <button className="p-2 bg-[#3861FB] text-white rounded-md hover:bg-[#2A4ED0] transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
