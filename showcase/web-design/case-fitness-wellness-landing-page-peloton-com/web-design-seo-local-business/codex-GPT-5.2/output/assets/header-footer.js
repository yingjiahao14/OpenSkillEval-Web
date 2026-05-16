window.WELLSTREAM = window.WELLSTREAM || {};

window.WELLSTREAM.renderHeader = function renderHeader(activePage){
  return `
  <header class="site-header">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="WellStream Platform home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>
          <span class="brand-name">WellStream Platform</span>
          <span class="brand-sub">Integrated energy data management</span>
        </span>
      </a>

      <nav class="nav" aria-label="Primary navigation" data-mobile-open="false">
        <div class="nav-links">
          <div class="dropdown" data-open="false">
            <button type="button" aria-expanded="false" aria-haspopup="true">
              Platform
              <svg class="caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="menu" role="menu">
              <a role="menuitem" href="platform-overview.html" data-nav="platform-overview">Platform Overview<span>Value props, lifecycle, implementation</span></a>
              <a role="menuitem" href="security.html" data-nav="security">Security<span>SOC controls, SSO, monitoring</span></a>
              <a role="menuitem" href="integration.html" data-nav="integration">Integration<span>ETL, APIs, dashboards</span></a>
            </div>
          </div>
          <a class="nav-link" href="platform-overview.html" data-nav="platform-overview">Overview</a>
          <a class="nav-link" href="security.html" data-nav="security">Security</a>
          <a class="nav-link" href="integration.html" data-nav="integration">Integration</a>
        </div>
        <a class="cta" href="request-demo.html" data-nav="request-demo">Request A Demo</a>
        <button id="mobileNavToggle" class="mobile-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
      </nav>
    </div>
  </header>`;
};

window.WELLSTREAM.renderFooter = function renderFooter(){
  return `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            <span class="brand-mark" aria-hidden="true" style="width:30px;height:30px;border-radius:10px"></span>
            <div>
              <div style="font-weight:700">WellStream Platform</div>
              <div style="color:var(--muted2);font-size:12px">Secure SaaS for well, production, and land data</div>
            </div>
          </div>
          <div class="help">Built for operators who demand reliability, auditability, and real-time visibility across the energy data lifecycle.</div>
        </div>

        <div>
          <h3>Platform</h3>
          <a href="platform-overview.html">Platform Overview</a>
          <a href="security.html">Security</a>
          <a href="integration.html">Integration</a>
          <a href="request-demo.html">Services + Support</a>
        </div>
        <div>
          <h3>Solutions</h3>
          <a href="index.html#industries">By Industry</a>
          <a href="index.html#use-cases">By Use Case</a>
          <a href="platform-overview.html#lifecycle">Data Lifecycle</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="platform-overview.html#company">About Us</a>
          <a href="platform-overview.html#careers">Careers</a>
          <a href="request-demo.html#support">Contact</a>
          <a href="#" onclick="try{localStorage.removeItem('wellstream_cookie_pref')}catch(e){};alert('Cookie preference cleared. Reload to see the banner.');return false;">Cookie Settings</a>
        </div>
      </div>

      <div class="fineprint">
        <span>© ${new Date().getFullYear()} WellStream Platform. All rights reserved.</span>
        <span style="color:var(--muted2)">Login portals: WellStream Platform • WellStream Frac • Locksmith</span>
      </div>
    </div>
  </footer>`;
};

