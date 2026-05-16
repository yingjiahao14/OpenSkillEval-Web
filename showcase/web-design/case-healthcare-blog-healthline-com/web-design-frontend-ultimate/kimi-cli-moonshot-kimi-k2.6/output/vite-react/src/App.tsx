import Header from "./components/Header";
import StatsTicker from "./components/StatsTicker";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import NewsletterCta from "./components/NewsletterCta";
import HealthTopics from "./components/HealthTopics";
import ToolsSection from "./components/ToolsSection";
import RecommendedReads from "./components/RecommendedReads";
import TrustPillars from "./components/TrustPillars";
import FeaturedPrograms from "./components/FeaturedPrograms";
import LatestVideos from "./components/LatestVideos";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50 text-charcoal">
      <Header />
      <StatsTicker />
      <main>
        <Hero />
        <Trending />
        <NewsletterCta />
        <HealthTopics />
        <ToolsSection />
        <RecommendedReads />
        <TrustPillars />
        <FeaturedPrograms />
        <LatestVideos />
      </main>
      <Footer />
    </div>
  );
}
