import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { siteConfig, marketData, watchlistData, stockDetail, usIndices, worldStocks, stockMovers, forexPairs, govBonds, corpBonds, earnings, brokers, ideas } from './config/site';
import './styles/main.css';

// Icons as inline SVGs
const Icons = {
  TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendingDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Heart: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  MessageCircle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>,
  Star: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

// Navigation Component
const Navigation: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="index.html" className="nav-logo">
          Chart<span>Pulse</span>
        </a>
        <div className="nav-links">
          <div className="nav-dropdown">
            <a href="chart.html" className={`nav-link ${currentPage === 'chart' ? 'active' : ''}`}>Products</a>
            <div className="nav-dropdown-content">
              <a href="chart.html" className="nav-dropdown-item">Supercharts</a>
              <a href="markets.html" className="nav-dropdown-item">Screeners</a>
              <a href="#" className="nav-dropdown-item">Pine Script</a>
              <a href="#" className="nav-dropdown-item">Heatmaps</a>
              <a href="markets.html" className="nav-dropdown-item">Calendars</a>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="ideas.html" className={`nav-link ${currentPage === 'ideas' ? 'active' : ''}`}>Community</a>
            <div className="nav-dropdown-content">
              <a href="ideas.html" className="nav-dropdown-item">Social Network</a>
              <a href="ideas.html" className="nav-dropdown-item">Ideas</a>
              <a href="#" className="nav-dropdown-item">Indicators & Strategies</a>
              <a href="ideas.html" className="nav-dropdown-item">Editors' Picks</a>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="markets.html" className={`nav-link ${currentPage === 'markets' ? 'active' : ''}`}>Markets</a>
            <div className="nav-dropdown-content">
              <a href="markets.html" className="nav-dropdown-item">Stocks</a>
              <a href="markets.html" className="nav-dropdown-item">ETFs</a>
              <a href="markets.html" className="nav-dropdown-item">Crypto</a>
              <a href="markets.html" className="nav-dropdown-item">Forex</a>
              <a href="markets.html" className="nav-dropdown-item">Futures</a>
              <a href="markets.html" className="nav-dropdown-item">Bonds</a>
            </div>
          </div>
          <a href="brokers.html" className={`nav-link ${currentPage === 'brokers' ? 'active' : ''}`}>Brokers</a>
        </div>
        <div className="nav-actions">
          <button className="btn btn-secondary btn-sm">Log in</button>
          <button className="btn btn-primary btn-sm">Sign up</button>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-title">Products</div>
          <div className="footer-links">
            {siteConfig.footer.products.map(link => (
              <a href="#" key={link} className="footer-link">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-title">Community</div>
          <div className="footer-links">
            {siteConfig.footer.community.map(link => (
              <a href="#" key={link} className="footer-link">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-title">Markets</div>
          <div className="footer-links">
            {siteConfig.footer.markets.map(link => (
              <a href="#" key={link} className="footer-link">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-title">Brokers</div>
          <div className="footer-links">
            {siteConfig.footer.brokers.map(link => (
              <a href="#" key={link} className="footer-link">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-title">Company</div>
          <div className="footer-links">
            {siteConfig.footer.company.map(link => (
              <a href="#" key={link} className="footer-link">{link}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 ChartPulse. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          {siteConfig.footer.legal.map(link => (
            <a href="#" key={link} className="footer-link">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// Market Summary Bar Component
const MarketSummaryBar: React.FC = () => (
  <div className="market-summary-bar">
    <div className="container">
      <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
        {marketData.indices.slice(0, 6).map(index => (
          <div key={index.ticker} className="market-summary-item">
            <span className="market-summary-name">{index.ticker}</span>
            <span className="market-summary-price">{index.price}</span>
            <span className={`market-summary-change ${index.change.startsWith('+') ? 'text-positive' : 'text-negative'}`}>
              {index.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ==========================================
// HOME PAGE
// ==========================================
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('us-stocks');
  const [ideasTab, setIdeasTab] = useState('popular');
  const [indicatorsTab, setIndicatorsTab] = useState('popular');

  const tabs = ['US stocks', 'Crypto', 'Futures', 'Forex', 'Economy', 'Brokers'];

  return (
    <div>
      <HeroSection />
      <MarketSummaryBar />
      <TabSection activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <CommunityIdeasSection activeTab={ideasTab} setActiveTab={setIdeasTab} />
      <IndicatorsSection activeTab={indicatorsTab} setActiveTab={setIndicatorsTab} />
      <TopStoriesSection />
      <TrendingStocksSection />
      <TradeIdeasSection />
      <Footer />
    </div>
  );
};

// Hero Section
const HeroSection: React.FC = () => (
  <section className="hero">
    <div className="container">
      <div className="hero-badge">{siteConfig.hero.badge}</div>
      <h1 className="hero-title">{siteConfig.hero.title}</h1>
      <p className="hero-subtitle">{siteConfig.hero.subtitle}</p>
      <div className="hero-actions">
        <a href="#" className="btn btn-primary">{siteConfig.hero.cta.text}</a>
        <a href="#features" className="btn btn-secondary">{siteConfig.hero.secondaryCta.text}</a>
      </div>
    </div>
  </section>
);

// Tab Section (Market Summary)
const TabSection: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; tabs: string[] }> = ({ activeTab, setActiveTab, tabs }) => (
  <section className="section">
    <div className="container">
      <div className="tabs" style={{ marginBottom: '24px' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'US stocks' && <USStocksContent />}
      {activeTab === 'Crypto' && <CryptoContent />}
      {activeTab === 'Futures' && <FuturesContent />}
      {activeTab === 'Forex' && <ForexContent />}
      {activeTab === 'Economy' && <EconomyContent />}
      {activeTab === 'Brokers' && <BrokersPreviewContent />}
    </div>
  </section>
);

// US Stocks Content
const USStocksContent: React.FC = () => (
  <div className="grid-3">
    <div className="card">
      <div className="card-header">
        <span className="card-title">Top Indices</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketData.indices.slice(0, 4).map(index => (
              <tr key={index.ticker}>
                <td><strong>{index.ticker}</strong></td>
                <td className="mono">{index.price}</td>
                <td className={index.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{index.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Tech Stocks</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {worldStocks.slice(0, 4).map(stock => (
              <tr key={stock.ticker}>
                <td><strong>{stock.ticker}</strong></td>
                <td className="mono">{stock.price}</td>
                <td className={stock.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Stock Movers</span>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <div className="text-sm text-muted" style={{ marginBottom: '8px' }}>Top Gainers</div>
        {stockMovers.gainers.slice(0, 2).map(gainer => (
          <div key={gainer.company} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span className="text-sm">{gainer.company}</span>
            <span className="text-positive mono text-sm">{gainer.change}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="text-sm text-muted" style={{ marginBottom: '8px' }}>Top Losers</div>
        {stockMovers.losers.slice(0, 2).map(loser => (
          <div key={loser.company} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <span className="text-sm">{loser.company}</span>
            <span className="text-negative mono text-sm">{loser.change}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Crypto Content
const CryptoContent: React.FC = () => (
  <div className="grid-3">
    <div className="card">
      <div className="card-header">
        <span className="card-title">Crypto Market</span>
      </div>
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="stat-card">
          <div className="stat-label">Market Cap</div>
          <div className="stat-value">{marketData.crypto.marketCap}</div>
          <div className="stat-change text-positive">{marketData.crypto.marketCapChange}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">BTC Dominance</div>
          <div className="stat-value">{marketData.crypto.btcDominance}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">ETH Share</div>
          <div className="stat-value">{marketData.crypto.ethShare}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">ETH Price</div>
          <div className="stat-value">${marketData.crypto.eth.price}</div>
          <div className="stat-change text-positive">{marketData.crypto.eth.change}</div>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Bitcoin</span>
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div className="text-3xl font-bold mono">${marketData.crypto.btc.price}</div>
        <div className="text-positive mono text-lg" style={{ marginTop: '8px' }}>{marketData.crypto.btc.change}</div>
        <div className="text-muted text-sm" style={{ marginTop: '8px' }}>Last 24h</div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Ethereum</span>
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div className="text-3xl font-bold mono">${marketData.crypto.eth.price}</div>
        <div className="text-positive mono text-lg" style={{ marginTop: '8px' }}>{marketData.crypto.eth.change}</div>
        <div className="text-muted text-sm" style={{ marginTop: '8px' }}>Last 24h</div>
      </div>
    </div>
  </div>
);

// Futures Content
const FuturesContent: React.FC = () => (
  <div className="card">
    <div className="card-header">
      <span className="card-title">Commodities & Futures</span>
    </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Commodity</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {marketData.commodities.map(commodity => (
            <tr key={commodity.ticker}>
              <td><strong>{commodity.name}</strong></td>
              <td className="mono">{commodity.ticker}</td>
              <td className="mono">{commodity.price}</td>
              <td className="text-muted">{commodity.unit}</td>
              <td className={commodity.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{commodity.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Forex Content
const ForexContent: React.FC = () => (
  <div className="card">
    <div className="card-header">
      <span className="card-title">Forex Pairs</span>
    </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Rate</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {forexPairs.map(pair => (
            <tr key={pair.pair}>
              <td><strong>{pair.pair}</strong></td>
              <td className="mono">{pair.rate}</td>
              <td className={pair.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{pair.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Economy Content
const EconomyContent: React.FC = () => (
  <div className="grid-2">
    <div className="card">
      <div className="card-header">
        <span className="card-title">Government Bonds</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Bond</th>
              <th>Yield</th>
            </tr>
          </thead>
          <tbody>
            {govBonds.map(bond => (
              <tr key={bond.ticker}>
                <td><strong>{bond.bond}</strong></td>
                <td className="mono text-positive">{bond.yield}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Today's Earnings</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Actual</th>
              <th>Estimate</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earn, i) => (
              <tr key={i}>
                <td><strong>{earn.company}</strong></td>
                <td className="mono">{earn.actual}</td>
                <td className="mono text-muted">{earn.estimate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Brokers Preview Content
const BrokersPreviewContent: React.FC = () => (
  <div className="grid-3">
    {brokers.slice(0, 3).map(broker => (
      <div key={broker.name} className="broker-card">
        <div className="broker-header">
          <div>
            <div className="broker-name">{broker.name}</div>
            <span className={`badge badge-${broker.tier.toLowerCase()}`}>{broker.tier}</span>
          </div>
          <div className="broker-rating">
            <span className="broker-rating-value">{broker.rating}</span>
            <span className="broker-rating-label">{broker.ratingLabel}</span>
          </div>
        </div>
        <div className="broker-stats">
          <div className="broker-stat">
            <div className="broker-stat-value">{broker.reviews}</div>
            <div className="broker-stat-label">Reviews</div>
          </div>
          <div className="broker-stat">
            <div className="broker-stat-value">{broker.accounts}</div>
            <div className="broker-stat-label">Accounts</div>
          </div>
        </div>
        {broker.promotion && <div className="broker-promotion">{broker.promotion}</div>}
      </div>
    ))}
  </div>
);

// Community Ideas Section
const CommunityIdeasSection: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => (
  <section className="section" style={{ background: 'var(--dark-secondary)' }}>
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Community Ideas</h2>
        <a href="ideas.html" className="btn btn-ghost btn-sm">View all</a>
      </div>
      <div className="tabs" style={{ marginBottom: '24px' }}>
        <button className={`tab ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => setActiveTab('popular')}>Popular</button>
        <button className={`tab ${activeTab === 'editors' ? 'active' : ''}`} onClick={() => setActiveTab('editors')}>Editors' picks</button>
      </div>
      <div className="grid-2">
        {ideas.slice(0, 4).map(idea => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  </section>
);

// Indicators Section
const IndicatorsSection: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => (
  <section className="section">
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Indicators & Strategies</h2>
        <a href="#" className="btn btn-ghost btn-sm">Browse all</a>
      </div>
      <div className="tabs" style={{ marginBottom: '24px' }}>
        <button className={`tab ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => setActiveTab('popular')}>Popular</button>
        <button className={`tab ${activeTab === 'editors' ? 'active' : ''}`} onClick={() => setActiveTab('editors')}>Editors' picks</button>
      </div>
      <div className="grid-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--dark-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.Chart />
              </div>
              <div>
                <div className="font-semibold text-sm">MA Cross Strategy</div>
                <div className="text-xs text-muted">by Trader{i}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-blue">Moving Average</span>
              <span className="badge badge-neutral">Strategy</span>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="text-xs text-muted"><Icons.Star /> 234</span>
              <span className="text-xs text-muted"><Icons.Eye /> 1.2K</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Top Stories Section
const TopStoriesSection: React.FC = () => (
  <section className="section" style={{ background: 'var(--dark-secondary)' }}>
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Top Stories</h2>
        <a href="#" className="btn btn-ghost btn-sm">View all</a>
      </div>
      <div className="grid-3">
        {[
          { title: "Fed signals potential rate cuts in 2024", source: "Reuters", time: "2h ago", image: true },
          { title: "Apple unveils new AI features for iPhone", source: "Bloomberg", time: "4h ago", image: true },
          { title: "Bitcoin surges past $75,000 milestone", source: "CNBC", time: "6h ago", image: true },
        ].map((story, i) => (
          <div key={i} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ height: '120px', background: 'var(--dark-tertiary)', borderRadius: '6px', marginBottom: '12px' }} />
            <h3 className="font-semibold text-sm" style={{ marginBottom: '8px' }}>{story.title}</h3>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <span>{story.source}</span>
              <span>•</span>
              <span>{story.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Trending Stocks Section
const TrendingStocksSection: React.FC = () => (
  <section className="section">
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Trending Stocks</h2>
        <a href="markets.html" className="btn btn-ghost btn-sm">View all</a>
      </div>
      <div className="grid-6">
        {marketData.trendingStocks.map(stock => (
          <div key={stock.ticker} className="card" style={{ padding: '12px', textAlign: 'center' }}>
            <div className="font-semibold mono text-sm" style={{ marginBottom: '4px' }}>{stock.ticker}</div>
            <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>{stock.company.split(',')[0]}</div>
            <div className="font-bold mono">{stock.price}</div>
            <div className={stock.change.startsWith('+') ? 'text-positive mono text-xs' : 'text-negative mono text-xs'}>
              {stock.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Trade Ideas Section
const TradeIdeasSection: React.FC = () => (
  <section className="section" style={{ background: 'var(--dark-secondary)' }}>
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Trade Ideas</h2>
        <a href="ideas.html" className="btn btn-ghost btn-sm">View all</a>
      </div>
      <div className="grid-2">
        {ideas.slice(0, 2).map(idea => (
          <div key={idea.id} className="idea-card" style={{ cursor: 'pointer' }}>
            <div className="idea-header">
              <div className="idea-avatar">{idea.avatar}</div>
              <div className="idea-meta">
                <div className="idea-author">{idea.author}</div>
                <div className="idea-time">{idea.time}</div>
              </div>
              <span className={`idea-type ${idea.bullish ? 'bullish' : 'bearish'}`}>{idea.bullish ? 'BULLISH' : 'BEARISH'}</span>
            </div>
            <h3 className="idea-title">
              {idea.title}
              <span className="idea-symbol">{idea.symbol}</span>
            </h3>
            <p className="idea-description">{idea.description}</p>
            <div className="idea-footer">
              <span className="idea-stat"><Icons.Heart /> {idea.likes}</span>
              <span className="idea-stat"><Icons.MessageCircle /> {idea.comments}</span>
              <span className="idea-stat"><Icons.Eye /> {idea.views}</span>
              <span style={{ marginLeft: 'auto' }} className="text-muted">{idea.timeframe}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Idea Card Component
const IdeaCard: React.FC<{ idea: typeof ideas[0] }> = ({ idea }) => (
  <div className="idea-card" style={{ cursor: 'pointer' }}>
    <div className="idea-header">
      <div className="idea-avatar">{idea.avatar}</div>
      <div className="idea-meta">
        <div className="idea-author">{idea.author}</div>
        <div className="idea-time">{idea.time}</div>
      </div>
      <span className={`idea-type ${idea.bullish ? 'bullish' : 'bearish'}`}>{idea.bullish ? 'BULLISH' : 'BEARISH'}</span>
    </div>
    <h3 className="idea-title">
      {idea.title}
      <span className="idea-symbol">{idea.symbol}</span>
    </h3>
    <p className="idea-description">{idea.description}</p>
    <div className="idea-footer">
      <span className="idea-stat"><Icons.Heart /> {idea.likes}</span>
      <span className="idea-stat"><Icons.MessageCircle /> {idea.comments}</span>
      <span className="idea-stat"><Icons.Eye /> {idea.views}</span>
    </div>
  </div>
);

// ==========================================
// CHART PAGE
// ==========================================
const ChartPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('1D');
  const [activeDetailTab, setActiveDetailTab] = useState('annual');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Indices', 'Stocks', 'Futures', 'Forex', 'Crypto']);
  const timeframes = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navigation currentPage="chart" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Main Chart Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Toolbar */}
          <div className="chart-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-bold text-lg">AAPL</span>
                <span className="badge badge-neutral">NASDAQ</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span className="text-2xl font-bold mono">263.40</span>
                <span className="text-negative mono">−3.03 (−1.14%)</span>
              </div>
            </div>
            <div className="chart-timeframes">
              {timeframes.map(tf => (
                <button
                  key={tf}
                  className={`chart-timeframe ${timeframe === tf ? 'active' : ''}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm">Indicators</button>
              <button className="btn btn-ghost btn-sm">Drawings</button>
              <button className="btn btn-secondary btn-sm">Full screen</button>
            </div>
          </div>

          {/* Chart Canvas */}
          <div style={{ flex: 1, background: 'var(--dark-primary)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CandlestickChart />
          </div>
        </div>

        {/* Watchlist Sidebar */}
        <div style={{ width: '320px', borderLeft: '1px solid var(--border)', background: 'var(--dark-secondary)', overflowY: 'auto' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
            <h3 className="font-semibold">Watchlist</h3>
          </div>
          <div className="watchlist-category">
            {watchlistData.map(cat => (
              <div key={cat.category} className="watchlist-category">
                <div className="watchlist-header" onClick={() => toggleCategory(cat.category)}>
                  <span className="watchlist-category-name">{cat.category}</span>
                  {expandedCategories.includes(cat.category) ? <Icons.ChevronDown /> : <Icons.ChevronUp />}
                </div>
                {expandedCategories.includes(cat.category) && (
                  <div className="watchlist-items">
                    {cat.items.map(item => (
                      <div key={item.symbol} className="watchlist-item">
                        <span className="watchlist-symbol">{item.symbol}</span>
                        <span className="watchlist-price">{item.last}</span>
                        <span className={`watchlist-change ${item.chgPct.startsWith('+') ? 'text-positive' : 'text-negative'}`}>
                          {item.chgPct}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Detail Panel */}
      <StockDetailPanel activeTab={activeDetailTab} setActiveTab={setActiveDetailTab} />
    </div>
  );
};

// Candlestick Chart SVG
const CandlestickChart: React.FC = () => {
  const candles = [
    { open: 262, high: 265, low: 260, close: 264, vol: 45 },
    { open: 264, high: 267, low: 263, close: 265, vol: 52 },
    { open: 265, high: 268, low: 264, close: 266, vol: 48 },
    { open: 266, high: 269, low: 265, close: 263, vol: 55 },
    { open: 263, high: 266, low: 261, close: 262, vol: 60 },
    { open: 262, high: 265, low: 260, close: 264, vol: 42 },
    { open: 264, high: 267, low: 263, close: 266, vol: 38 },
    { open: 266, high: 270, low: 265, close: 268, vol: 50 },
    { open: 268, high: 271, low: 267, close: 265, vol: 47 },
    { open: 265, high: 268, low: 264, close: 263, vol: 53 },
    { open: 263, high: 266, low: 262, close: 264, vol: 41 },
    { open: 264, high: 267, low: 263, close: 265, vol: 44 },
    { open: 265, high: 268, low: 264, close: 262, vol: 56 },
    { open: 262, high: 265, low: 261, close: 263, vol: 49 },
  ];

  const maxPrice = 271;
  const minPrice = 260;
  const priceRange = maxPrice - minPrice;
  const chartHeight = 250;
  const candleWidth = 20;
  const spacing = 15;

  return (
    <svg width="100%" height={chartHeight + 60} viewBox={`0 0 ${candles.length * (candleWidth + spacing) + 40} ${chartHeight + 60}`}>
      {/* Grid lines */}
      {[260, 263, 266, 269, 272].map(price => (
        <g key={price}>
          <line x1="30" y1={chartHeight - ((price - minPrice) / priceRange) * chartHeight + 10} x2={candles.length * (candleWidth + spacing) + 30} y2={chartHeight - ((price - minPrice) / priceRange) * chartHeight + 10} stroke="#2a2a3e" strokeDasharray="4" />
          <text x="25" y={chartHeight - ((price - minPrice) / priceRange) * chartHeight + 14} fill="#6b7280" fontSize="10" textAnchor="end" fontFamily="DM Mono">{price}</text>
        </g>
      ))}

      {/* Candles */}
      {candles.map((candle, i) => {
        const x = 40 + i * (candleWidth + spacing);
        const yHigh = chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight + 10;
        const yLow = chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight + 10;
        const yOpen = chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight + 10;
        const yClose = chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight + 10;
        const isGreen = candle.close >= candle.open;
        const color = isGreen ? '#00C853' : '#F7525F';

        return (
          <g key={i}>
            {/* Wick */}
            <line x1={x + candleWidth / 2} y1={yHigh} x2={x + candleWidth / 2} y2={yLow} stroke={color} strokeWidth="1" />
            {/* Body */}
            <rect x={x} y={Math.min(yOpen, yClose)} width={candleWidth} height={Math.max(Math.abs(yClose - yOpen), 1)} fill={color} rx="2" />
          </g>
        );
      })}
    </svg>
  );
};

// Stock Detail Panel
const StockDetailPanel: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => (
  <div style={{ background: 'var(--dark-secondary)', borderTop: '1px solid var(--border)', padding: '20px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
        {/* Stock Info */}
        <div>
          <div className="stock-header">
            <div>
              <div className="stock-ticker">{stockDetail.ticker}</div>
              <div className="stock-name">{stockDetail.name}</div>
              <div className="stock-exchange">{stockDetail.exchange}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <span className="stock-price">${stockDetail.price}</span>
            <span className={`stock-change ${stockDetail.change.startsWith('+') ? 'text-positive' : 'text-negative'}`}>
              {stockDetail.change} ({stockDetail.changePct})
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="text-sm">
              <span className="text-muted">Volume:</span> <span className="mono">{stockDetail.volume}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted">Avg Vol:</span> <span className="mono">{stockDetail.avgVolume}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted">Mkt Cap:</span> <span className="mono">{stockDetail.marketCap}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted">Earnings:</span> <span className="mono">{stockDetail.nextEarnings}</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div>
          <h4 className="font-semibold text-sm" style={{ marginBottom: '12px' }}>Key Statistics</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="text-sm"><span className="text-muted">Div Yield:</span> <span className="mono">{stockDetail.financials.dividendYield}</span></div>
            <div className="text-sm"><span className="text-muted">Payout:</span> <span className="mono">{stockDetail.financials.payoutRatio}</span></div>
            <div className="text-sm"><span className="text-muted">Price Target:</span> <span className="mono text-positive">{stockDetail.financials.priceTarget}</span></div>
            <div className="text-sm"><span className="text-muted">Rating:</span> <span className="mono">{stockDetail.financials.analystRating}</span></div>
            <div className="text-sm"><span className="text-muted">1W:</span> <span className="mono text-positive">{stockDetail.financials.perf1W}</span></div>
            <div className="text-sm"><span className="text-muted">1M:</span> <span className="mono text-positive">{stockDetail.financials.perf1M}</span></div>
            <div className="text-sm"><span className="text-muted">1Y:</span> <span className="mono text-positive">{stockDetail.financials.perf1Y}</span></div>
            <div className="text-sm"><span className="text-muted">Technicals:</span> <span className="mono">{stockDetail.financials.technicals}</span></div>
          </div>
        </div>

        {/* Financials */}
        <div>
          <h4 className="font-semibold text-sm" style={{ marginBottom: '12px' }}>Financials</h4>
          <div className="tabs" style={{ marginBottom: '12px' }}>
            <button className={`tab ${activeTab === 'annual' ? 'active' : ''}`} onClick={() => setActiveTab('annual')}>Annual</button>
            <button className={`tab ${activeTab === 'quarterly' ? 'active' : ''}`} onClick={() => setActiveTab('quarterly')}>Quarterly</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem' }}>
            <div className="text-muted">Revenue</div>
            <div className="mono">391.0B</div>
            <div className="text-muted">Net Income</div>
            <div className="mono">97.4B</div>
            <div className="text-muted">EPS</div>
            <div className="mono">6.14</div>
            <div className="text-muted">PE Ratio</div>
            <div className="mono">42.9</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// IDEAS PAGE
// ==========================================
const IdeasPage: React.FC = () => {
  const [filterTab, setFilterTab] = useState('popular');
  const [videoOnly, setVideoOnly] = useState(false);

  return (
    <div>
      <Navigation currentPage="ideas" />
      <MarketSummaryBar />
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 className="text-3xl font-bold">Trading Ideas</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className={`btn btn-sm ${videoOnly ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setVideoOnly(!videoOnly)}>
              Videos only
            </button>
          </div>
        </div>

        <div className="tabs" style={{ marginBottom: '24px' }}>
          <button className={`tab ${filterTab === 'popular' ? 'active' : ''}`} onClick={() => setFilterTab('popular')}>Popular</button>
          <button className={`tab ${filterTab === 'editors' ? 'active' : ''}`} onClick={() => setFilterTab('editors')}>Editors' picks</button>
          <button className={`tab ${filterTab === 'recent' ? 'active' : ''}`} onClick={() => setFilterTab('recent')}>Recent</button>
        </div>

        <div>
          {ideas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
          <button className="btn btn-secondary btn-sm">Previous</button>
          <button className="btn btn-secondary btn-sm">1</button>
          <button className="btn btn-secondary btn-sm">2</button>
          <button className="btn btn-secondary btn-sm">3</button>
          <button className="btn btn-secondary btn-sm">Next</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ==========================================
// MARKETS PAGE
// ==========================================
const MarketsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Indices');
  const [chartType, setChartType] = useState('1M');
  const [sessionTab, setSessionTab] = useState('regular');
  const tabs = ['Indices', 'US stocks', 'Crypto', 'Futures', 'Forex', 'Bonds', 'ETFs', 'Economy'];
  const chartTypes = ['1D', '1M', '3M', '1Y', '5Y', 'All', 'Area', 'Candles'];

  return (
    <div>
      <Navigation currentPage="markets" />
      <MarketSummaryBar />
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 className="text-3xl font-bold" style={{ marginBottom: '24px' }}>Markets</h1>

        {/* Asset Type Tabs */}
        <div className="tabs" style={{ marginBottom: '32px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chart Type Toggle */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginBottom: '20px' }}>
          {chartTypes.map(ct => (
            <button
              key={ct}
              className={`chart-timeframe ${chartType === ct ? 'active' : ''}`}
              onClick={() => setChartType(ct)}
            >
              {ct}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'Indices' && <IndicesSection />}
        {activeTab === 'US stocks' && <USStocksSection sessionTab={sessionTab} setSessionTab={setSessionTab} />}
        {activeTab === 'Crypto' && <CryptoMarketsSection />}
        {activeTab === 'Futures' && <FuturesMarketsSection />}
        {activeTab === 'Forex' && <ForexMarketsSection />}
        {activeTab === 'Bonds' && <BondsSection />}
      </div>
      <Footer />
    </div>
  );
};

// Indices Section
const IndicesSection: React.FC = () => (
  <div>
    <div className="card">
      <div className="card-header">
        <span className="card-title">US Market Indices</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {usIndices.map(index => (
              <tr key={index.ticker}>
                <td><strong>{index.name}</strong></td>
                <td className="mono">{index.ticker}</td>
                <td className="mono">{index.price}</td>
                <td className="text-muted">{index.currency}</td>
                <td className={index.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{index.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="card" style={{ marginTop: '24px' }}>
      <div className="card-header">
        <span className="card-title">World Indices</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketData.indices.map(index => (
              <tr key={index.ticker}>
                <td><strong>{index.name}</strong></td>
                <td className="mono">{index.ticker}</td>
                <td className="mono">{index.price}</td>
                <td className="text-muted">{index.currency}</td>
                <td className={index.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{index.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// US Stocks Section
const USStocksSection: React.FC<{ sessionTab: string; setSessionTab: (tab: string) => void }> = ({ sessionTab, setSessionTab }) => (
  <div>
    <div className="grid-2" style={{ marginBottom: '24px' }}>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Top Stocks</span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Ticker</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {worldStocks.map(stock => (
                <tr key={stock.ticker}>
                  <td><strong>{stock.name}</strong></td>
                  <td className="mono">{stock.ticker}</td>
                  <td className="mono">{stock.price}</td>
                  <td className={stock.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{stock.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Stock Movers</span>
          <div className="tabs btn-xs">
            <button className={`tab ${sessionTab === 'regular' ? 'active' : ''}`} onClick={() => setSessionTab('regular')} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Regular</button>
            <button className={`tab ${sessionTab === 'pre' ? 'active' : ''}`} onClick={() => setSessionTab('pre')} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Pre-market</button>
            <button className={`tab ${sessionTab === 'after' ? 'active' : ''}`} onClick={() => setSessionTab('after')} style={{ padding: '4px 8px', fontSize: '0.7rem' }}>After-hours</button>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div className="text-sm text-muted" style={{ marginBottom: '8px' }}>Gainers</div>
          {stockMovers.gainers.map(gainer => (
            <div key={gainer.company} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span className="text-sm">{gainer.company}</span>
              <span className="text-positive mono text-sm">{gainer.change}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-sm text-muted" style={{ marginBottom: '8px' }}>Losers</div>
          {stockMovers.losers.map(loser => (
            <div key={loser.company} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span className="text-sm">{loser.company}</span>
              <span className="text-negative mono text-sm">{loser.change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Earnings Calendar</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Actual EPS</th>
              <th>Estimate EPS</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earn, i) => (
              <tr key={i}>
                <td className="mono">{earn.date}</td>
                <td><strong>{earn.company}</strong></td>
                <td className="mono">{earn.actual}</td>
                <td className="mono text-muted">{earn.estimate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Crypto Markets Section
const CryptoMarketsSection: React.FC = () => (
  <div className="grid-3">
    <div className="card">
      <div className="card-header">
            <span className="card-title">Market Overview</span>
          </div>
          <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="stat-card">
              <div className="stat-label">Total Market Cap</div>
              <div className="stat-value">{marketData.crypto.marketCap}</div>
              <div className="stat-change text-positive">{marketData.crypto.marketCapChange}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">BTC Dominance</div>
              <div className="stat-value">{marketData.crypto.btcDominance}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Bitcoin</span>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="text-3xl font-bold mono">${marketData.crypto.btc.price}</div>
            <div className="text-positive mono text-lg" style={{ marginTop: '8px' }}>{marketData.crypto.btc.change}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Ethereum</span>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="text-3xl font-bold mono">${marketData.crypto.eth.price}</div>
            <div className="text-positive mono text-lg" style={{ marginTop: '8px' }}>{marketData.crypto.eth.change}</div>
          </div>
        </div>
      </div>
);

// Futures Markets Section
const FuturesMarketsSection: React.FC = () => (
  <div className="card">
    <div className="card-header">
      <span className="card-title">Commodities & Futures</span>
    </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Commodity</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {marketData.commodities.map(commodity => (
            <tr key={commodity.ticker}>
              <td><strong>{commodity.name}</strong></td>
              <td className="mono">{commodity.ticker}</td>
              <td className="mono">{commodity.price}</td>
              <td className="text-muted">{commodity.unit}</td>
              <td className={commodity.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{commodity.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Forex Markets Section
const ForexMarketsSection: React.FC = () => (
  <div className="card">
    <div className="card-header">
      <span className="card-title">Forex Pairs</span>
    </div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Rate</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {forexPairs.map(pair => (
            <tr key={pair.pair}>
              <td><strong>{pair.pair}</strong></td>
              <td className="mono">{pair.rate}</td>
              <td className={pair.change.startsWith('+') ? 'text-positive mono' : 'text-negative mono'}>{pair.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Bonds Section
const BondsSection: React.FC = () => (
  <div className="grid-2">
    <div className="card">
      <div className="card-header">
        <span className="card-title">Government Bonds</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Bond</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Yield</th>
            </tr>
          </thead>
          <tbody>
            {govBonds.map(bond => (
              <tr key={bond.ticker}>
                <td><strong>{bond.bond}</strong></td>
                <td className="mono">{bond.ticker}</td>
                <td className="mono">{bond.price}</td>
                <td className="mono text-positive">{bond.yield}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <span className="card-title">Corporate Bonds</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Issuer</th>
              <th>Coupon</th>
              <th>YTM</th>
              <th>Maturity</th>
            </tr>
          </thead>
          <tbody>
            {corpBonds.map((bond, i) => (
              <tr key={i}>
                <td><strong>{bond.issuer}</strong></td>
                <td className="mono">{bond.coupon}</td>
                <td className="mono text-positive">{bond.ytm}</td>
                <td className="text-muted">{bond.maturity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ==========================================
// BROKERS PAGE
// ==========================================
const BrokersPage: React.FC = () => {
  const [categoryTab, setCategoryTab] = useState('all');
  const [ratingTab, setRatingTab] = useState('best');

  const categories = ['All brokers', 'Stocks', 'Crypto', 'Forex', 'Futures', 'ETFs', 'Options'];
  const ratings = ['Best rated', 'All brokers'];

  return (
    <div>
      <Navigation currentPage="brokers" />
      <MarketSummaryBar />

      {/* Hero */}
      <section style={{ background: 'var(--dark-secondary)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 className="text-4xl font-bold" style={{ marginBottom: '16px' }}>Find Your Perfect Broker</h1>
          <p className="text-lg text-secondary" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
            Compare verified brokers, read real reviews, and find the best platform for your trading style.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-primary">Compare brokers</button>
            <button className="btn btn-secondary">View all reviews</button>
          </div>
        </div>
      </section>

      {/* Broker Listings */}
      <section className="section">
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div className="tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`tab ${categoryTab === cat.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
                  onClick={() => setCategoryTab(cat.toLowerCase().replace(' ', '-'))}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="tabs">
              {ratings.map(rating => (
                <button
                  key={rating}
                  className={`tab ${ratingTab === rating.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
                  onClick={() => setRatingTab(rating.toLowerCase().replace(' ', '-'))}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Broker Cards */}
          {brokers.map(broker => (
            <div key={broker.name} className="broker-card">
              <div className="broker-header">
                <div>
                  <div className="broker-name">{broker.name}</div>
                  <div className="broker-tier" style={{ marginTop: '8px' }}>
                    <span className={`badge badge-${broker.tier.toLowerCase()}`}>{broker.tier}</span>
                  </div>
                </div>
                <div className="broker-rating">
                  <span className="broker-rating-value">{broker.rating}</span>
                  <div>
                    <div className="broker-rating-label">{broker.ratingLabel}</div>
                    <div className="text-xs text-muted">{broker.reviews} reviews</div>
                  </div>
                </div>
              </div>
              <div className="broker-stats">
                <div className="broker-stat">
                  <div className="broker-stat-value">{broker.reviews}</div>
                  <div className="broker-stat-label">Reviews</div>
                </div>
                <div className="broker-stat">
                  <div className="broker-stat-value">{broker.accounts}</div>
                  <div className="broker-stat-label">Accounts</div>
                </div>
              </div>
              {broker.promotion && <div className="broker-promotion">{broker.promotion}</div>}
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary btn-sm">Open account</button>
                <button className="btn btn-secondary btn-sm">Read review</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="section" style={{ background: 'var(--dark-secondary)' }}>
        <div className="container">
          <div className="stats-banner">
            <div className="stats-banner-value">{siteConfig.stats.traders}</div>
            <div className="stats-banner-label">{siteConfig.stats.tagline}</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// ==========================================
// APP ENTRY POINT
// ==========================================
type Page = 'home' | 'chart' | 'ideas' | 'markets' | 'brokers';

// Parse URL to determine which page to render
const getPage = (): Page => {
  const path = window.location.pathname;
  if (path.includes('chart')) return 'chart';
  if (path.includes('ideas')) return 'ideas';
  if (path.includes('markets')) return 'markets';
  if (path.includes('brokers')) return 'brokers';
  return 'home';
};

export const App: React.FC = () => {
  const [page] = useState<Page>(getPage);

  switch (page) {
    case 'chart':
      return <ChartPage />;
    case 'ideas':
      return <IdeasPage />;
    case 'markets':
      return <MarketsPage />;
    case 'brokers':
      return <BrokersPage />;
    default:
      return <HomePage />;
  }
};

// Mount app
ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
export default App;
