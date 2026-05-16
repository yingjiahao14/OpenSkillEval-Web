function renderHeader(activePage) {
  function isActive(id) {
    return activePage === id ? ' aria-current="page"' : "";
  }

  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container">
    <div class="nav">
      <a class="brand" href="index.html" aria-label="WellStream home">
        <div class="brand-mark" aria-hidden="true"></div>
        <div>
          <div class="brand-title">WellStream Platform</div>
          <div class="brand-sub">Integrated Energy Data Management</div>
        </div>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <div class="dropdown" data-dropdown data-open="false">
          <button type="button" class="nav-pill" aria-expanded="false" aria-haspopup="true">
            Platform
            <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-arrow" /></svg>
          </button>
          <div class="dropdown-panel" role="menu">
            <a class="dropdown-item" role="menuitem" href="platform-overview.html">
              <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-chip" /></svg>
              <div>
                <div><strong>Overview</strong></div>
                <small>Benefits, implementation, lifecycle</small>
              </div>
            </a>
            <a class="dropdown-item" role="menuitem" href="security.html">
              <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-shield" /></svg>
              <div>
                <div><strong>Security</strong></div>
                <small>SOC controls, monitoring, SSO</small>
              </div>
            </a>
            <a class="dropdown-item" role="menuitem" href="integration.html">
              <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-chip" /></svg>
              <div>
                <div><strong>Integration</strong></div>
                <small>ETL, APIs, dashboards</small>
              </div>
            </a>
          </div>
        </div>

        <a class="nav-pill" href="index.html"${isActive("home")}>Home</a>
        <a class="nav-pill" href="platform-overview.html"${isActive("platform")}>Platform Overview</a>
        <a class="nav-pill" href="security.html"${isActive("security")}>Security</a>
        <a class="nav-pill" href="integration.html"${isActive("integration")}>Integration</a>
      </nav>

      <div style="display:flex;gap:10px;align-items:center">
        <a class="cta" href="request-demo.html">
          Request A Demo
          <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-arrow" /></svg>
        </a>
        <button class="menu-btn" type="button" data-menu-btn aria-expanded="false" aria-label="Open menu">
          <svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-menu" /></svg>
        </button>
      </div>
    </div>

    <div class="mobile-panel" data-mobile-panel>
      <a href="index.html">Home</a>
      <a href="platform-overview.html">Platform Overview</a>
      <a href="security.html">Security</a>
      <a href="integration.html">Integration</a>
      <a href="request-demo.html">Request A Demo</a>
    </div>
  </div>
</header>
  `.trim();
}

function renderFooter() {
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="brand" style="gap:12px">
          <div class="brand-mark" aria-hidden="true"></div>
          <div>
            <div class="brand-title">WellStream Platform</div>
            <div class="brand-sub">End-to-end energy data integration</div>
          </div>
        </div>
        <p class="lead" style="margin:14px 0 0;max-width:48ch">
          Integrated SaaS solutions for operators who demand speed, security, and visibility across the well data lifecycle.
        </p>
      </div>
      <div class="footer-col">
        <h4>Platform</h4>
        <a href="platform-overview.html">Platform Overview</a>
        <a href="security.html">Security</a>
        <a href="integration.html">Integration</a>
        <a href="request-demo.html">Services + Support</a>
      </div>
      <div class="footer-col">
        <h4>Solutions</h4>
        <a href="index.html#industries">By Industry</a>
        <a href="index.html#use-cases">By Use Case</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="platform-overview.html#company">About Us</a>
        <a href="platform-overview.html#careers">Careers</a>
        <a href="request-demo.html#support">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="index.html#cookie-settings" id="cookie-settings">Cookie Settings</a>
        <a href="index.html#rights">Exercise Your Rights</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© ${new Date().getFullYear()} WellStream. All rights reserved.</div>
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        <span>Login portals:</span>
        <a href="#" aria-disabled="true" style="opacity:.75">WellStream Platform</a>
        <a href="#" aria-disabled="true" style="opacity:.75">WellStream Frac</a>
        <a href="#" aria-disabled="true" style="opacity:.75">Locksmith</a>
      </div>
    </div>
  </div>
</footer>
  `.trim();
}

function mountShared(activePage) {
  var header = document.getElementById("site-header");
  var footer = document.getElementById("site-footer");
  if (header) header.innerHTML = renderHeader(activePage);
  if (footer) footer.innerHTML = renderFooter();
}

