function globalStoneHead(opts = {}) {
  const title = opts.title ? `${opts.title} — GlobalStone` : 'GlobalStone — Global Commercial Real Estate Services';
  const desc = opts.description || 'GlobalStone is a global leader in commercial real estate services and investments, delivering integrated, data-led solutions across every sector and geography.';
  return `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${escapeHtml(desc)}" />
  <title>${escapeHtml(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/site.css" />
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function globalStoneHeader(activePage) {
  const isActive = (id) => (id === activePage ? 'is-active' : '');
  return `
  <header class="site-header" role="banner">
    <div class="container">
      <div class="row">
        <a class="brand" href="index.html" aria-label="GlobalStone Home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>
            <span class="brand-name">GlobalStone</span>
            <span class="brand-sub">Commercial Real Estate</span>
          </span>
        </a>

        <nav class="nav" aria-label="Primary">
          <a class="${isActive('services')}" href="services.html" data-mega-trigger aria-expanded="false" aria-haspopup="true">
            <span class="nav-trigger">Services
              <svg class="chev" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>
          <a class="${isActive('insights')}" href="index.html#latest-insights">Insights &amp; Research</a>
          <a class="${isActive('properties')}" href="services.html#property-types">Properties</a>
          <a class="${isActive('people')}" href="services.html#people-offices">People &amp; Offices</a>
          <a class="${isActive('careers')}" href="index.html#careers">Careers</a>
          <a class="${isActive('about')}" href="services.html#about">About Us</a>
        </nav>

        <div class="nav-actions">
          <a class="btn btn-ghost" href="index.html#newsletter">Our Take Newsletter</a>
          <a class="btn btn-primary" href="services.html">Explore Services</a>
        </div>

        <button class="menu-btn" type="button" data-drawer-open aria-expanded="false" aria-controls="mobile-drawer">
          <span class="sr-only">Open menu</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          Menu
        </button>
      </div>
    </div>

    ${globalStoneMegaMenu()}
    ${globalStoneMobileDrawer()}
  </header>
  `;
}

function globalStoneMegaMenu() {
  return `
  <div class="mega" data-mega aria-label="Services mega menu">
    <div class="panel" role="region" aria-label="Services">
      <div class="panel-inner">
        <div class="col">
          <h3>By Need</h3>
          <div class="links">
            <a class="link" href="services-invest-finance-value.html">
              <div>
                <strong>Invest, Finance &amp; Value</strong>
                <span>Capital markets, valuation, forecasting and investment strategy.</span>
              </div>
              <span class="badge">Explore</span>
            </a>
            <a class="link" href="services-plan-lease-occupy.html">
              <div>
                <strong>Plan, Lease &amp; Occupy</strong>
                <span>Transactions, workplace, experience services and portfolio strategy.</span>
              </div>
              <span class="badge">Explore</span>
            </a>
            <a class="link" href="services-design-build.html">
              <div>
                <strong>Design &amp; Build</strong>
                <span>Program management and sourcing to deliver with confidence.</span>
              </div>
              <span class="badge">Explore</span>
            </a>
            <a class="link" href="services.html#manage">
              <div>
                <strong>Manage Properties &amp; Portfolios</strong>
                <span>Integrated operations that maximize asset value and performance.</span>
              </div>
              <span class="badge">Overview</span>
            </a>
            <a class="link" href="services.html#transform">
              <div>
                <strong>Transform Business Outcomes</strong>
                <span>Technology-enabled consulting aligned to enterprise goals.</span>
              </div>
              <span class="badge">Overview</span>
            </a>
          </div>
        </div>
        <div class="col">
          <h3>By Property Type</h3>
          <div class="links">
            <a class="link" href="services.html#property-types"><div><strong>Office</strong><span>Workplace strategy and prime assets.</span></div><span class="badge">View</span></a>
            <a class="link" href="services.html#property-types"><div><strong>Retail</strong><span>High-street, malls and mixed-use.</span></div><span class="badge">View</span></a>
            <a class="link" href="services.html#property-types"><div><strong>Industrial</strong><span>Logistics, last-mile and manufacturing.</span></div><span class="badge">View</span></a>
            <a class="link" href="services.html#property-types"><div><strong>Multifamily</strong><span>Residential investment and operations.</span></div><span class="badge">View</span></a>
            <a class="link" href="services.html#property-types"><div><strong>Hotels</strong><span>Hospitality advisory and capital markets.</span></div><span class="badge">View</span></a>
          </div>
          <div class="rule"></div>
          <p class="fine" style="margin:0;color:var(--slate-700)">Looking for a full overview? Explore all service categories.</p>
          <div style="margin-top:12px"><a class="btn btn-secondary" href="services.html">Services Overview</a></div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function globalStoneMobileDrawer() {
  return `
  <div class="drawer-backdrop" data-drawer-backdrop aria-hidden="true"></div>
  <aside class="drawer" id="mobile-drawer" aria-label="Mobile navigation">
    <div class="top">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="brand-mark" aria-hidden="true" style="width:30px;height:30px;border-radius:12px"></span>
        <strong style="color:var(--navy);letter-spacing:.01em">GlobalStone</strong>
      </div>
      <button class="menu-btn" type="button" data-drawer-close style="display:inline-flex">
        <span class="sr-only">Close menu</span>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        Close
      </button>
    </div>
    <div class="content">
      <div class="group" data-accordion aria-expanded="false">
        <button type="button" aria-controls="m-services">
          Services
          <svg class="chev" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="items" id="m-services">
          <a href="services.html">Services Overview</a>
          <a href="services-invest-finance-value.html">Invest, Finance &amp; Value</a>
          <a href="services-plan-lease-occupy.html">Plan, Lease &amp; Occupy</a>
          <a href="services-design-build.html">Design &amp; Build</a>
          <a href="services.html#manage">Manage Properties &amp; Portfolios</a>
          <a href="services.html#transform">Transform Business Outcomes</a>
        </div>
      </div>

      <div class="group" data-accordion aria-expanded="false">
        <button type="button" aria-controls="m-insights">
          Insights &amp; Research
          <svg class="chev" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="items" id="m-insights">
          <a href="index.html#featured-insights">Featured Insights</a>
          <a href="index.html#latest-insights">Latest Insights</a>
          <a href="index.html#newsletter">Our Take Newsletter</a>
        </div>
      </div>

      <div class="group" data-accordion aria-expanded="false">
        <button type="button" aria-controls="m-company">
          Company
          <svg class="chev" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="items" id="m-company">
          <a href="services.html#about">About Us</a>
          <a href="services.html#people-offices">People &amp; Offices</a>
          <a href="index.html#careers">Careers</a>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <a class="btn btn-secondary" href="services.html" style="width:100%;justify-content:center">Explore Services</a>
        <a class="btn btn-primary" href="index.html#newsletter" style="width:100%;justify-content:center">Subscribe</a>
      </div>
    </div>
  </aside>
  `;
}

function globalStoneFooter() {
  return `
  <footer class="site-footer" role="contentinfo">
    <div class="top">
      <div class="container">
        <div class="cols">
          <div>
            <div class="brand" style="color:white">
              <span class="brand-mark" aria-hidden="true" style="box-shadow:none"></span>
              <span>
                <span class="brand-name">GlobalStone</span>
                <span class="brand-sub" style="color:rgba(255,255,255,.72)">Global CRE Services</span>
              </span>
            </div>
            <p style="margin-top:14px;color:rgba(255,255,255,.78)">Integrated, data-led real estate services and investment solutions across every sector and geography.</p>
          </div>
          <div>
            <h3>Company</h3>
            <div class="links">
              <a href="services.html#about">About GlobalStone</a>
              <a href="index.html#careers">Careers</a>
              <a href="index.html#commitment">Corporate Responsibility</a>
              <a href="#">Investor Relations</a>
              <a href="#">Newsroom</a>
            </div>
          </div>
          <div>
            <h3>Legal</h3>
            <div class="links">
              <a href="#">Contact Us</a>
              <a href="#">Global Privacy and Cookie Notice</a>
              <a href="#">Terms of Use</a>
              <a href="#">Digital Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="container">
        <div class="split">
          <span>© ${new Date().getFullYear()} GlobalStone. All rights reserved.</span>
          <span class="muted" style="color:rgba(255,255,255,.72)">GlobalStone is a fictional benchmark brand for this demo.</span>
        </div>
      </div>
    </div>
  </footer>
  <script src="assets/site.js"></script>
  `;
}

