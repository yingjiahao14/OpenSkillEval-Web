function headerHTML(active = '') {
  // active: index|platform|security|integration|demo
  const isActive = (key) => (active === key ? 'active' : '');
  return `
  <header class="header">
    <div class="header-inner container">
      <a class="brand" href="index.html" aria-label="WellStream Platform home">
        <span class="logo" aria-hidden="true"></span>
        <span>WellStream <span style="color:var(--muted)">Platform</span></span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a data-nav href="index.html" class="${isActive('index')}" aria-label="Home">Home</a>

        <div class="dropdown" data-dropdown>
          <button type="button" aria-haspopup="true" aria-expanded="false">
            Platform
            <span aria-hidden="true" style="opacity:.7">▾</span>
          </button>
          <div class="dropdown-menu" role="menu" aria-label="Platform">
            <a data-nav href="platform-overview.html" class="${isActive('platform')}" role="menuitem">Platform Overview</a>
            <a data-nav href="security.html" class="${isActive('security')}" role="menuitem">Security</a>
            <a data-nav href="integration.html" class="${isActive('integration')}" role="menuitem">Integration</a>
          </div>
        </div>

        <a data-nav href="request-demo.html" class="${isActive('demo')}">Support</a>
      </nav>

      <div class="nav-cta">
        <a class="btn primary small" href="request-demo.html">Request A Demo</a>
        <button class="btn ghost small mobile-toggle" type="button" data-mobile-toggle aria-expanded="false" aria-controls="mobile-panel">Menu</button>
      </div>
    </div>

    <div class="mobile-panel" id="mobile-panel" data-mobile-panel>
      <div class="mobile-panel-inner container">
        <a class="btn ghost" href="index.html">Home</a>
        <a class="btn ghost" href="platform-overview.html">Platform Overview</a>
        <a class="btn ghost" href="security.html">Security</a>
        <a class="btn ghost" href="integration.html">Integration</a>
        <a class="btn ghost" href="request-demo.html">Request A Demo</a>
      </div>
    </div>
  </header>
  `;
}

function footerHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="margin-bottom:10px">
            <span class="logo" aria-hidden="true"></span>
            <span>WellStream <span style="color:var(--muted)">Platform</span></span>
          </div>
          <small>Integrated energy data management across the well, production, and land lifecycle.</small>
          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <a class="btn ghost small" href="platform-overview.html">Explore the Platform</a>
            <a class="btn primary small" href="request-demo.html">Request A Demo</a>
          </div>
        </div>

        <div>
          <h4>Platform</h4>
          <div class="feature-list">
            <a href="platform-overview.html">Platform Overview</a>
            <a href="security.html">Security</a>
            <a href="integration.html">Integration</a>
            <a href="request-demo.html">Services + Support</a>
          </div>
        </div>

        <div>
          <h4>Solutions</h4>
          <div class="feature-list">
            <a href="index.html#industry">By Industry</a>
            <a href="index.html#use-cases">By Use Case</a>
          </div>
        </div>

        <div>
          <h4>Company</h4>
          <div class="feature-list">
            <a href="platform-overview.html#company">About Us</a>
            <a href="platform-overview.html#careers">Careers</a>
            <a href="request-demo.html#contact">Contact</a>
          </div>
        </div>

        <div>
          <h4>Legal</h4>
          <div class="feature-list">
            <a href="index.html#cookie">Cookie Settings</a>
            <a href="#">Exercise Your Rights</a>
          </div>
          <div style="margin-top:14px">
            <small>Login portals: WellStream Platform · WellStream Frac · Locksmith</small>
          </div>
        </div>
      </div>
      <div style="margin-top:22px; display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <small>© ${new Date().getFullYear()} WellStream. All rights reserved.</small>
        <small>Built for reliability, security, and scale.</small>
      </div>
    </div>
  </footer>
  `;
}

function baseHead(title) {
  return `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="WellStream delivers integrated SaaS solutions for energy operators to manage well data, production, and land assets." />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/styles.css" />
    <style>body{font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial}</style>
  `;
}
