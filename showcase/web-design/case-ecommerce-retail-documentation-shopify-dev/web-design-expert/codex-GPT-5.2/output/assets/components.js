function cfTopbar(activePage) {
  return `
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="index.html" aria-label="CommerceForge Dev Docs">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>CommerceForge</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="apps-build.html" data-page="apps-build">Apps</a>
        <a href="storefronts.html" data-page="storefronts">Storefronts</a>
        <a href="agents.html" data-page="agents">Agents</a>
        <a href="support.html" data-page="support">Help</a>
      </nav>

      <div class="utility">
        <button class="btn btn-ghost desktop-only" type="button" data-open-assistant>
          Ask assistant <span class="kbd">Ctrl K</span>
        </button>
        <button class="btn btn-ghost mobile-only" type="button" data-open-assistant aria-label="Ask assistant">
          Search
        </button>
        <a class="btn" href="#" aria-label="Log in (placeholder)">Log in</a>
      </div>
    </div>
  </header>
  `;
}

function cfFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand" style="margin-bottom:12px;">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>CommerceForge Dev Docs</span>
          </div>
          <div class="muted">Professional, modern, minimal docs for apps, storefronts, and agentic commerce.</div>
        </div>

        <div>
          <h4>Updates</h4>
          <ul>
            <li><a href="#">Developer changelog</a></li>
            <li><a href="#">CommerceForge Editions</a></li>
          </ul>
        </div>

        <div>
          <h4>Business growth</h4>
          <ul>
            <li><a href="#">CommerceForge Partners Program</a></li>
            <li><a href="#">CommerceForge App Marketplace</a></li>
            <li><a href="#">CommerceForge Academy</a></li>
          </ul>
        </div>

        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">API terms of use</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Partners Program Agreement</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  `;
}

function cfAssistantModal() {
  return `
  <div class="modal" data-assistant-modal aria-hidden="false">
    <div class="modal-card" role="dialog" aria-label="Ask assistant">
      <div class="modal-head">
        <div style="display:flex; flex-direction:column; gap:2px;">
          <strong style="letter-spacing:-0.02em;">Ask assistant</strong>
          <span class="muted" style="font-size:13px;">Quick search across the docs (static index).</span>
        </div>
        <button class="btn btn-ghost" type="button" data-close-assistant>Close</button>
      </div>
      <div class="modal-body">
        <div class="search" style="width:100%; margin-bottom:12px;">
          <span class="muted" aria-hidden="true">⌕</span>
          <input data-assistant-input type="text" placeholder="Search docs (e.g., CLI, UCP, GraphQL, Hydrogen)" />
          <span class="kbd">Esc</span>
        </div>
        <div data-assistant-results></div>
      </div>
    </div>
  </div>
  `;
}

