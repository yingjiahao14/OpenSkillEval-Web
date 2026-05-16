function chartPulseHeader(current){
  var page = current || '';
  return `
  <header class="topbar">
    <div class="container-wide">
      <div class="topbar-inner">
        <a class="brand" href="index.html" aria-label="ChartPulse home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>
            ChartPulse
            <small>Track All Markets</small>
          </span>
        </a>

        <nav class="nav" aria-label="Primary">
          <a href="chart.html" ${page==='chart' ? 'aria-current="page"' : ''}>Supercharts</a>
          <a href="markets.html" ${page==='markets' ? 'aria-current="page"' : ''}>Markets</a>
          <a href="ideas.html" ${page==='ideas' ? 'aria-current="page"' : ''}>Ideas</a>
          <a href="brokers.html" ${page==='brokers' ? 'aria-current="page"' : ''}>Brokers</a>
        </nav>

        <div class="header-actions">
          <div class="search" role="search">
            <span aria-hidden="true">⌕</span>
            <input aria-label="Search symbols" placeholder="Search symbols… (AAPL, BTCUSD, EURUSD)" />
          </div>
          <a class="btn btn-ghost" href="chart.html">Open chart</a>
          <a class="btn btn-primary" href="chart.html">Get started</a>
        </div>
      </div>
    </div>
  </header>`;
}

function chartPulseFooter(){
  return `
  <footer class="footer">
    <div class="container-wide footer-inner">
      <div class="footer-grid">
        <div>
          <h4>Products</h4>
          <a href="chart.html">Supercharts</a>
          <a href="markets.html">Screeners</a>
          <a href="ideas.html">Pine Script</a>
          <a href="markets.html">Heatmaps</a>
          <a href="markets.html">Calendars</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="ideas.html">Social Network</a>
          <a href="ideas.html">Ideas</a>
          <a href="ideas.html">Indicators &amp; Strategies</a>
          <a href="ideas.html">Editors' Picks</a>
        </div>
        <div>
          <h4>Markets</h4>
          <a href="markets.html">Stocks</a>
          <a href="markets.html">ETFs</a>
          <a href="markets.html">Crypto</a>
          <a href="markets.html">Forex</a>
          <a href="markets.html">Futures</a>
          <a href="markets.html">Bonds</a>
          <a href="markets.html">Economy</a>
        </div>
        <div>
          <h4>Brokers</h4>
          <a href="brokers.html">Top Brokers</a>
          <a href="brokers.html">Broker Comparison</a>
          <a href="brokers.html">Special Offers</a>
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
      <div class="footer-bottom">
        <div>© ${new Date().getUTCFullYear()} ChartPulse. Every trade a #ChartPulse trade.</div>
        <div class="mono">Dark mode first · Data-dense dashboard · Static demo</div>
      </div>
    </div>
  </footer>`;
}

