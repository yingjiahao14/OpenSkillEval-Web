interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = ['Top', 'Trending', 'Watchlist', 'Prediction Markets', 'Most Visited', 'New', 'More']

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-[#3861FB] text-white'
                : 'text-[#808A9D] hover:text-[#0D1421] hover:bg-[#f8f9fb]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
