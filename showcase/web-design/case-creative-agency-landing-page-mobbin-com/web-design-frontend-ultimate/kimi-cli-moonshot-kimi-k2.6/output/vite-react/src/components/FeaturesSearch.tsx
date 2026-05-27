import { useState } from "react";
import { siteConfig } from "../config/site";
import { Search, Image, Layers, FileText, Type } from "lucide-react";

const tabIcons: Record<string, React.ReactNode> = {
  Screens: <Image className="w-4 h-4" />,
  "UI Elements": <Layers className="w-4 h-4" />,
  Flows: <FileText className="w-4 h-4" />,
  "Text in Screenshot": <Type className="w-4 h-4" />,
};

const placeholderColors = [
  "bg-rose-100",
  "bg-orange-100",
  "bg-amber-100",
  "bg-green-100",
  "bg-emerald-100",
  "bg-teal-100",
  "bg-cyan-100",
  "bg-sky-100",
  "bg-blue-100",
  "bg-indigo-100",
  "bg-violet-100",
  "bg-purple-100",
  "bg-fuchsia-100",
  "bg-pink-100",
  "bg-rose-100",
];

function ScreenshotGrid({ activeTab, activeFilter }: { activeTab: string; activeFilter: string }) {
  const seed = activeTab.length + activeFilter.length;
  const items = Array.from({ length: 12 }, (_, i) => {
    const colorIndex = (seed + i) % placeholderColors.length;
    const aspect = i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-square";
    return { color: placeholderColors[colorIndex], aspect };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
      {items.map((item, i) => (
        <div
          key={`${activeTab}-${activeFilter}-${i}`}
          className={`${item.color} ${item.aspect} rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
          style={{
            animation: `fade-in-up 0.4s ease-out ${i * 40}ms both`,
          }}
        />
      ))}
    </div>
  );
}

export default function FeaturesSearch() {
  const [activeTab, setActiveTab] = useState(siteConfig.search.tabs[0]);
  const [activeFilter, setActiveFilter] = useState(siteConfig.search.filters[0]);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141414]">
            {siteConfig.search.title}
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg">
            {siteConfig.search.description}
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search designs..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-all"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            {siteConfig.search.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-[#141414] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tabIcons[tab]}
                <span className="hidden sm:inline">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter pills */}
        <div className="mb-10 overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex items-center gap-2 min-w-max">
            {siteConfig.search.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-[#141414] text-white border-[#141414]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Screenshot grid */}
        <ScreenshotGrid activeTab={activeTab} activeFilter={activeFilter} />
      </div>
    </section>
  );
}
