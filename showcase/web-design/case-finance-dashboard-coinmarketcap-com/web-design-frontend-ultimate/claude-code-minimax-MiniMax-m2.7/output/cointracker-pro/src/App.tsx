import { useState } from 'react'
import { TopBarMetrics } from './components/TopBarMetrics'
import { PromoBanner } from './components/PromoBanner'
import { AIAlertsBar } from './components/AIAlertsBar'
import { Navigation } from './components/Navigation'
import { NetworkFilterTabs } from './components/NetworkFilterTabs'
import { CategoryTabs } from './components/CategoryTabs'
import { CryptoRankingsTable } from './components/CryptoRankingsTable'
import { MarketSummary } from './components/MarketSummary'
import { InfoContent } from './components/InfoContent'
import { Footer } from './components/Footer'

function App() {
  const [activeCategory, setActiveCategory] = useState('Top')
  const [activeNetwork, setActiveNetwork] = useState('All Networks')

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <TopBarMetrics />
      <PromoBanner />
      <AIAlertsBar />
      <Navigation />
      <main className="max-w-[1600px] mx-auto px-4 pb-12">
        <NetworkFilterTabs
          activeNetwork={activeNetwork}
          onNetworkChange={setActiveNetwork}
        />
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <CryptoRankingsTable
          activeCategory={activeCategory}
          activeNetwork={activeNetwork}
        />
        <MarketSummary />
        <InfoContent />
      </main>
      <Footer />
    </div>
  )
}

export default App
