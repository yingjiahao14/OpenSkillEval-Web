(function(){
  function topbar(){
    return `
<header class="topbar">
  <div class="container topbar-inner">
    <a class="brand" href="index.html" aria-label="ChartPulse home">
      <span class="logo" aria-hidden="true"></span>
      <span>ChartPulse</span>
      <span class="badge" title="Dark-mode first"><span class="dot" style="color: var(--brand2)"></span>All Markets</span>
    </a>

    <nav class="nav" aria-label="Primary navigation">
      <a data-nav href="chart.html">Products</a>
      <a data-nav href="ideas.html">Community</a>
      <a data-nav href="markets.html">Markets</a>
      <a data-nav href="brokers.html">Brokers</a>
    </nav>

    <div class="topbar-actions">
      <label class="search" aria-label="Search markets">
        <span style="opacity:.9" data-lucide="search" aria-hidden="true"></span>
        <input placeholder="Search symbol, market, or idea…" />
        <span class="kbd">⌘ K</span>
      </label>
      <a class="btn ghost" href="ideas.html">Explore</a>
      <a class="btn primary" href="chart.html">Get started</a>
    </div>
  </div>
</header>`;
  }

  function footer(){
    return `
<footer class="footer">
  <div class="container">
    <div class="card pad" style="box-shadow:none">
      <div class="footer-grid">
        <div>
          <h4>Products</h4>
          <a href="chart.html">Supercharts</a>
          <a href="markets.html#screeners">Screeners</a>
          <a href="ideas.html#pine">Pine Script</a>
          <a href="markets.html#heatmaps">Heatmaps</a>
          <a href="markets.html#calendars">Calendars</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="ideas.html">Social Network</a>
          <a href="ideas.html">Ideas</a>
          <a href="ideas.html#indicators">Indicators &amp; Strategies</a>
          <a href="ideas.html#editors">Editors' Picks</a>
        </div>
        <div>
          <h4>Markets</h4>
          <a href="markets.html#indices">Stocks</a>
          <a href="markets.html#crypto">Crypto</a>
          <a href="markets.html#forex">Forex</a>
          <a href="markets.html#futures">Futures</a>
          <a href="markets.html#bonds">Bonds</a>
          <a href="markets.html#economy">Economy</a>
        </div>
        <div>
          <h4>Brokers</h4>
          <a href="brokers.html">Top Brokers</a>
          <a href="brokers.html#compare">Broker Comparison</a>
          <a href="brokers.html#offers">Special Offers</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Media Kit</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies Policy</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap; margin-top:1rem; padding-top:1rem; border-top:1px solid var(--stroke2)">
        <div style="display:flex; align-items:center; gap:.65rem">
          <span class="logo" aria-hidden="true" style="width:22px;height:22px;border-radius:8px"></span>
          <div>
            <div style="font-weight:900">ChartPulse</div>
            <div style="color:var(--faint); font-size:.85rem">Every trade a #ChartPulse trade</div>
          </div>
        </div>
        <div style="color:var(--faint); font-size:.85rem">\u00a9 ${new Date().getUTCFullYear()} ChartPulse. Data shown is sample for UI.</div>
      </div>
    </div>
  </div>
</footer>`;
  }

  window.ChartPulseComponents = { topbar, footer };
})();
