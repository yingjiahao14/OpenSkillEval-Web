// GlobalStone — Shared Components

function renderHeader(activePage) {
  const pages = {
    home: 'index.html',
    services: 'services.html',
  };

  return `
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">GS</div>
          Global<span>Stone</span>
        </a>
        <nav class="main-nav">
          <div class="nav-item">
            <a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">
              Services
              <svg class="icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>
            </a>
            <div class="mega-menu">
              <div class="mega-menu-grid">
                <div class="mega-menu-col">
                  <h4>By Need</h4>
                  <div class="mega-menu-links">
                    <a href="services-invest-finance-value.html"><span class="dot"></span>Invest, Finance & Value</a>
                    <a href="services-plan-lease-occupy.html"><span class="dot"></span>Plan, Lease & Occupy</a>
                    <a href="services-design-build.html"><span class="dot"></span>Design & Build</a>
                    <a href="services.html"><span class="dot"></span>Manage Properties & Portfolios</a>
                    <a href="services.html"><span class="dot"></span>Transform Business Outcomes</a>
                  </div>
                </div>
                <div class="mega-menu-col">
                  <h4>By Property Type</h4>
                  <div class="mega-menu-links">
                    <a href="services.html"><span class="dot"></span>Office</a>
                    <a href="services.html"><span class="dot"></span>Retail</a>
                    <a href="services.html"><span class="dot"></span>Industrial</a>
                    <a href="services.html"><span class="dot"></span>Multifamily</a>
                    <a href="services.html"><span class="dot"></span>Hotels</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item">
            <a href="#" class="nav-link">Insights & Research</a>
          </div>
          <div class="nav-item">
            <a href="#" class="nav-link">Properties</a>
          </div>
          <div class="nav-item">
            <a href="#" class="nav-link">People & Offices</a>
          </div>
          <div class="nav-item">
            <a href="#" class="nav-link">Careers</a>
          </div>
          <div class="nav-item">
            <a href="#" class="nav-link">About Us</a>
          </div>
        </nav>
        <div class="header-actions">
          <button class="header-search-btn" aria-label="Search">
            <svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <a href="#" class="header-cta">Contact Us</a>
        </div>
        <button class="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <nav class="mobile-nav" aria-label="Mobile navigation">
    <div class="mobile-nav-item">
      <button class="mobile-nav-btn">
        Services
        <svg class="icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>
      </button>
      <div class="mobile-nav-sub">
        <h5>By Need</h5>
        <a href="services-invest-finance-value.html">Invest, Finance & Value</a>
        <a href="services-plan-lease-occupy.html">Plan, Lease & Occupy</a>
        <a href="services-design-build.html">Design & Build</a>
        <a href="services.html">Manage Properties & Portfolios</a>
        <a href="services.html">Transform Business Outcomes</a>
        <h5>By Property Type</h5>
        <a href="services.html">Office</a>
        <a href="services.html">Retail</a>
        <a href="services.html">Industrial</a>
        <a href="services.html">Multifamily</a>
        <a href="services.html">Hotels</a>
      </div>
    </div>
    <div class="mobile-nav-simple">
      <a href="#">Insights & Research</a>
      <a href="#">Properties</a>
      <a href="#">People & Offices</a>
      <a href="#">Careers</a>
      <a href="#">About Us</a>
      <a href="#">Contact Us</a>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-icon">GS</div>
            Global<span>Stone</span>
          </a>
          <p>GlobalStone is the global leader in commercial real estate services and investments, providing integrated, data-led solutions across every dimension of real estate.</p>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About GlobalStone</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Corporate Responsibility</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Newsroom</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="services-invest-finance-value.html">Invest, Finance & Value</a></li>
            <li><a href="services-plan-lease-occupy.html">Plan, Lease & Occupy</a></li>
            <li><a href="services-design-build.html">Design & Build</a></li>
            <li><a href="services.html">Manage Properties</a></li>
            <li><a href="services.html">Transform Outcomes</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Insights</h5>
          <ul>
            <li><a href="#">Research Reports</a></li>
            <li><a href="#">Market Outlook</a></li>
            <li><a href="#">Podcast</a></li>
            <li><a href="#">Newsletter</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Property Types</h5>
          <ul>
            <li><a href="#">Office</a></li>
            <li><a href="#">Retail</a></li>
            <li><a href="#">Industrial</a></li>
            <li><a href="#">Multifamily</a></li>
            <li><a href="#">Hotels</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-legal">&copy; 2026 GlobalStone. All rights reserved.</div>
        <div class="footer-legal-links">
          <a href="#">Contact Us</a>
          <a href="#">Privacy & Cookie Notice</a>
          <a href="#">Terms of Use</a>
          <a href="#">Digital Accessibility</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// Auto-inject header and footer
document.addEventListener('DOMContentLoaded', function() {
  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');
  const activePage = document.body.dataset.page || 'home';

  if (headerSlot) headerSlot.innerHTML = renderHeader(activePage);
  if (footerSlot) footerSlot.innerHTML = renderFooter();

  // Re-run main.js behaviors after injection
  if (typeof initComponents === 'function') initComponents();
});
