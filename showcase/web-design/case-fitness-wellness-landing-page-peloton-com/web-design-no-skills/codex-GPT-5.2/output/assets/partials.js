function wellstreamHeader(active){
  const is = (k)=>active===k ? ' aria-current="page"' : '';
  return `
  <header class="site-header">
    <div class="container">
      <div class="nav">
        <a class="brand" href="index.html" aria-label="WellStream Platform Home">
          <div class="logo" aria-hidden="true"></div>
          <div>
            <div class="name">WellStream Platform</div>
            <span class="tag">Integrated Energy Data Management</span>
          </div>
        </a>

        <nav class="nav-links" aria-label="Primary">
          <div class="nav-item">
            <a class="nav-link" href="#" aria-haspopup="true" aria-expanded="false">
              Platform
              <svg class="caret" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 7l5 6 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <div class="dropdown" role="menu" aria-label="Platform">
              <a href="platform-overview.html"${is('overview')}>
                <strong>Overview</strong>
                <span class="sub">Benefits, rollout, lifecycle</span>
              </a>
              <a href="security.html"${is('security')}>
                <strong>Security</strong>
                <span class="sub">SOC, SSO, monitoring</span>
              </a>
              <a href="integration.html"${is('integration')}>
                <strong>Integration</strong>
                <span class="sub">ETL, APIs, dashboards</span>
              </a>
            </div>
          </div>

          <a class="nav-link" href="platform-overview.html"${is('overview')}>Platform Overview</a>
          <a class="nav-link" href="security.html"${is('security')}>Security</a>
          <a class="nav-link" href="integration.html"${is('integration')}>Integration</a>
        </nav>

        <div class="nav-cta">
          <button class="btn btn-small btn-ghost mobile-toggle" data-mobile-toggle aria-expanded="false" aria-controls="mobile-panel">Menu</button>
          <a class="btn btn-primary" href="request-demo.html"${is('demo')}>Request A Demo</a>
        </div>
      </div>

      <div id="mobile-panel" class="mobile-panel" data-mobile-panel>
        <a href="platform-overview.html">Platform Overview</a>
        <a href="security.html">Security</a>
        <a href="integration.html">Integration</a>
        <a href="request-demo.html">Request A Demo</a>
      </div>
    </div>
  </header>`;
}

function wellstreamFooter(){
  return `
  <footer>
    <div class="container footer">
      <div class="footer-grid">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div class="logo" aria-hidden="true" style="width:32px;height:32px;border-radius:10px"></div>
            <div>
              <div style="font-weight:800">WellStream Platform</div>
              <div style="color:var(--muted);font-size:13px">SaaS data management for energy operators</div>
            </div>
          </div>
          <div class="lead" style="font-size:14px;max-width:520px">
            Integrated solutions for well, production, and land data—streamlining operations and enhancing decision-making from drilling to decommissioning.
          </div>
        </div>

        <div>
          <h4>Platform</h4>
          <a href="platform-overview.html">Platform Overview</a>
          <a href="security.html">Security</a>
          <a href="integration.html">Integration</a>
          <a href="request-demo.html">Services + Support</a>
        </div>

        <div>
          <h4>Solutions</h4>
          <a href="index.html#industries">By Industry</a>
          <a href="index.html#use-cases">By Use Case</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="platform-overview.html#company">About Us</a>
          <a href="platform-overview.html#careers">Careers</a>
          <a href="request-demo.html#support">Contact</a>
          <a href="#" onclick="localStorage.removeItem('wellstream_cookie_pref');alert('Cookie preference cleared. Reload the page to see the banner again.');return false;">Cookie Settings</a>
          <a href="#" onclick="alert('For privacy requests, contact support via the demo form.');return false;">Exercise Your Rights</a>
        </div>
      </div>

      <div class="legal">
        <span>© ${new Date().getFullYear()} WellStream. All rights reserved.</span>
        <span>Login: <a href="#" style="display:inline;color:var(--muted);padding:0" onclick="alert('Login portals are not included in this static demo.');return false;">WellStream Platform</a> · <a href="#" style="display:inline;color:var(--muted);padding:0" onclick="alert('Login portals are not included in this static demo.');return false;">WellStream Frac</a> · <a href="#" style="display:inline;color:var(--muted);padding:0" onclick="alert('Login portals are not included in this static demo.');return false;">Locksmith</a></span>
      </div>
    </div>
  </footer>`;
}

