function siteTopbar(active) {
  const is = (id) => (active === id ? 'aria-current="page"' : '');
  return `
  <header class="topbar">
    <div class="container">
      <div class="nav">
        <a class="brand" href="index.html" aria-label="ChartPulse Home">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 14.5 9 9.5l3 3 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 19h16" stroke="white" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <span>ChartPulse</span>
          <span class="pill" style="margin-left:6px"><span class="dot teal"></span>Track All Markets</span>
        </a>

        <nav class="navlinks" aria-label="Primary">
          <a href="chart.html" ${is('chart')}>Supercharts</a>
          <a href="markets.html" ${is('markets')}>Markets</a>
          <a href="ideas.html" ${is('ideas')}>Community</a>
          <a href="brokers.html" ${is('brokers')}>Brokers</a>
        </nav>

        <div class="navright">
          <div class="search" role="search">
            <span aria-hidden="true">${icon('search')}</span>
            <input aria-label="Search markets" placeholder="Search tickers, ideas, brokers…" />
            <span class="kbd">Ctrl K</span>
          </div>
          <a class="btn ghost" href="ideas.html">Explore features</a>
          <a class="btn primary" href="chart.html">Get started for free</a>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footerGrid">
        <div>
          <div class="brand" style="margin-bottom:10px">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>ChartPulse</span>
          </div>
          <div class="muted" style="max-width:360px; font-size:13px; line-height:1.55">
            Every trade a #ChartPulse trade. A supercharged charting platform and social network for traders and investors to analyze, discuss, and trade global markets.
          </div>
          <div class="copyright">© 2026 ChartPulse. Data shown is for demo only.</div>
        </div>

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
          <a href="ideas.html">Indicators & Strategies</a>
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
          <h4 style="margin-top:12px">Legal</h4>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies Policy</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>`;
}

