import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Stats from "./components/Stats";
import FeaturesSearch from "./components/FeaturesSearch";
import FeaturesFlows from "./components/FeaturesFlows";
import FeaturesTools from "./components/FeaturesTools";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#141414]">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Stats />
        <FeaturesSearch />
        <FeaturesFlows />
        <FeaturesTools />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
