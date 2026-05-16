import { useState } from "react";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import PromoBanner from "./components/PromoBanner";
import AIAlerts from "./components/AIAlerts";
import NetworkTabs from "./components/NetworkTabs";
import RankingsTable from "./components/RankingsTable";
import MarketSummary from "./components/MarketSummary";
import InfoContent from "./components/InfoContent";
import Footer from "./components/Footer";

export default function App() {
  const [activeNetwork, setActiveNetwork] = useState("All Networks");

  return (
    <div className="min-h-svh bg-white">
      <Header />
      <StatsBar />
      <PromoBanner />
      <AIAlerts />
      <NetworkTabs active={activeNetwork} onChange={setActiveNetwork} />
      <RankingsTable />
      <MarketSummary />
      <InfoContent />
      <Footer />
    </div>
  );
}
