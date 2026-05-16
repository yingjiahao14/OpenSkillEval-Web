/* HTML partial helpers for GlobalStone pages */

(function(){
  function escapeHtml(s){
    return String(s)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#39;');
  }

  function navLink(href, label, current){
    const isCurrent = current === href;
    return `<a href="${href}" ${isCurrent ? 'aria-current="page"' : ''}>${escapeHtml(label)}</a>`;
  }

  function headerHTML(current){
    // Mega menu content matches required categories.
    return `
<div class="top-banner">
  <div class="container">
    <div class="wrap">
      <div class="small">Record Data Center Demand Drives Vacancy to New Lows</div>
      <a class="cta" href="index.html#announcement">Explore the Report <span aria-hidden="true">→</span></a>
    </div>
  </div>
</div>
<header class="site-header" data-site-header>
  <div class="container">
    <div class="navbar">
      <a class="brand" href="index.html" aria-label="GlobalStone home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-name">
          <strong>GlobalStone</strong>
          <span>Global Commercial Real Estate Services</span>
        </span>
      </a>

      <nav class="nav" aria-label="Primary">
        ${navLink('index.html','Home',current)}
        <a href="services.html" data-mega-trigger aria-haspopup="true" aria-expanded="false">Services</a>
        ${navLink('services-invest-finance-value.html','Invest',current)}
        ${navLink('services-plan-lease-occupy.html','Occupiers',current)}
        ${navLink('services-design-build.html','Design & Build',current)}
      </nav>

      <div class="nav-cta">
        <a class="btn btn-secondary" href="services.html">Explore Services</a>
        <a class="btn btn-primary" href="index.html#newsletter">Subscribe</a>
      </div>

      <button class="nav-btn" data-mobile-toggle aria-label="Open menu" aria-expanded="false">
        <span aria-hidden="true">☰</span>
      </button>
    </div>
  </div>

  <!-- Mega menu (desktop) -->
  <div class="mega" data-mega data-open="false" aria-label="Services mega menu">
    <div class="mega-panel">
      <div class="mega-inner">
        <div class="mega-grid">
          <div class="mega-col">
            <h4>Needs</h4>
            <div class="mega-links">
              <a class="mega-item" href="services-invest-finance-value.html">
                <strong>Invest, Finance &amp; Value</strong>
                <span>Investment lifecycle advisory and execution.</span>
              </a>
              <a class="mega-item" href="services-plan-lease-occupy.html">
                <strong>Plan, Lease &amp; Occupy</strong>
                <span>Transaction services and portfolio strategy.</span>
              </a>
              <a class="mega-item" href="services-design-build.html">
                <strong>Design &amp; Build</strong>
                <span>Plan, design, develop, and deliver projects.</span>
              </a>
              <a class="mega-item" href="services.html#manage">
                <strong>Manage Properties &amp; Portfolios</strong>
                <span>Facilities and property management at scale.</span>
              </a>
              <a class="mega-item" href="services.html#transform">
                <strong>Transform Business Outcomes</strong>
                <span>Consulting and technology-driven solutions.</span>
              </a>
              <a class="mega-item" href="services.html#real-assets">
                <strong>Invest in Real Assets</strong>
                <span>Investment management across real asset strategies.</span>
              </a>
            </div>
          </div>
          <div class="mega-col">
            <h4>Property Types</h4>
            <div class="mega-side">
              <a href="services.html#office">
                <div>
                  <div class="tag">Office</div>
                  <div class="title">Modern workplace + tenant demand</div>
                  <div class="meta">Strategy, leasing, experience.</div>
                </div>
                <div aria-hidden="true">→</div>
              </a>
              <a href="services.html#retail">
                <div>
                  <div class="tag">Retail</div>
                  <div class="title">Footfall, brand, and mixed-use</div>
                  <div class="meta">Locations, format, portfolio moves.</div>
                </div>
                <div aria-hidden="true">→</div>
              </a>
              <a href="services.html#industrial">
                <div>
                  <div class="tag">Industrial</div>
                  <div class="title">Logistics and supply chain velocity</div>
                  <div class="meta">Site selection, build-to-suit.</div>
                </div>
                <div aria-hidden="true">→</div>
              </a>
              <a href="services.html#multifamily">
                <div>
                  <div class="tag">Multifamily</div>
                  <div class="title">Living demand and yield strategy</div>
                  <div class="meta">Investment, management, valuation.</div>
                </div>
                <div aria-hidden="true">→</div>
              </a>
              <a href="services.html#hotels">
                <div>
                  <div class="tag">Hotels</div>
                  <div class="title">Performance, brand, and capital</div>
                  <div class="meta">Transactions and repositioning.</div>
                </div>
                <div aria-hidden="true">→</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile panel -->
  <div class="mobile" data-mobile-panel data-open="false">
    <div class="container">
      <div class="panel">
        <div class="accordion" role="navigation" aria-label="Mobile navigation">
          <div data-acc>
            <button class="acc-btn" data-acc-btn aria-expanded="false">Browse <span aria-hidden="true">▾</span></button>
            <div class="acc-panel" data-acc-panel data-open="false">
              <div class="acc-links">
                <a href="index.html">Home</a>
                <a href="services.html">Services Overview</a>
              </div>
            </div>
          </div>
          <div class="sep"></div>
          <div data-acc>
            <button class="acc-btn" data-acc-btn aria-expanded="false">Services (Needs) <span aria-hidden="true">▾</span></button>
            <div class="acc-panel" data-acc-panel data-open="false">
              <div class="acc-links">
                <a href="services-invest-finance-value.html">Invest, Finance &amp; Value</a>
                <a href="services-plan-lease-occupy.html">Plan, Lease &amp; Occupy</a>
                <a href="services-design-build.html">Design &amp; Build</a>
                <a href="services.html#manage">Manage Properties &amp; Portfolios</a>
                <a href="services.html#transform">Transform Business Outcomes</a>
                <a href="services.html#real-assets">Invest in Real Assets</a>
              </div>
            </div>
          </div>
          <div class="sep"></div>
          <div data-acc>
            <button class="acc-btn" data-acc-btn aria-expanded="false">Property Types <span aria-hidden="true">▾</span></button>
            <div class="acc-panel" data-acc-panel data-open="false">
              <div class="acc-links">
                <a href="services.html#office">Office</a>
                <a href="services.html#retail">Retail</a>
                <a href="services.html#industrial">Industrial</a>
                <a href="services.html#multifamily">Multifamily</a>
                <a href="services.html#hotels">Hotels</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
`;
  }

  function footerHTML(){
    return `
<footer class="footer">
  <div class="container">
    <div class="grid">
      <div>
        <div class="brand" style="min-width:auto">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-name">
            <strong>GlobalStone</strong>
            <span>Global Commercial Real Estate Services</span>
          </span>
        </div>
        <p class="small" style="margin:14px 0 0; max-width: 70ch; color: rgba(255,255,255,.72)">
          Integrated, data-led commercial real estate services and investments across every sector and geography.
        </p>
      </div>
      <div>
        <div class="h-eyebrow" style="color: rgba(255,255,255,.62)">Navigate</div>
        <div class="links" style="margin-top:12px">
          <a href="services.html">Services</a>
          <a href="services-invest-finance-value.html">Invest, Finance &amp; Value</a>
          <a href="services-plan-lease-occupy.html">Plan, Lease &amp; Occupy</a>
          <a href="services-design-build.html">Design &amp; Build</a>
          <a href="index.html#insights">Insights</a>
          <a href="index.html#newsletter">Newsletter</a>
        </div>
      </div>
    </div>
    <div class="fine">© ${new Date().getFullYear()} GlobalStone. All rights reserved.</div>
  </div>
</footer>
`;
  }

  window.GlobalStonePartials = {
    headerHTML,
    footerHTML
  };
})();
