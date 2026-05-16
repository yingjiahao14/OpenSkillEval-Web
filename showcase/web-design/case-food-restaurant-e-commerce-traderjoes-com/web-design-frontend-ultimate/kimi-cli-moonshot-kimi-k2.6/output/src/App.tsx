import Header from "./components/Header"
import Hero from "./components/Hero"
import FeaturedProducts from "./components/FeaturedProducts"
import SeasonalPicks from "./components/SeasonalPicks"
import Categories from "./components/Categories"
import BrandHighlights from "./components/BrandHighlights"
import StoreLocator from "./components/StoreLocator"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <SeasonalPicks />
        <Categories />
        <BrandHighlights />
        <StoreLocator />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
