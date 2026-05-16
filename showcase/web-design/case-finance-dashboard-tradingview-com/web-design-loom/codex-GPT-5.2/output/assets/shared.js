function chartPulseHeader(current){
  return `
  <header class="topbar">
    <div class="container">
      <div class="topbarInner">
        <a class="brand" href="index.html" aria-label="ChartPulse home">
          <div class="logo" aria-hidden="true"></div>
          <div class="brandTitle">
            <strong>ChartPulse</strong>
            <div>Track all markets</div>
          </div>
        </a>
        <nav class="nav" aria-label="Primary">
          <a href="chart.html" ${current==='chart'?'aria-current="page"':''}>Products</a>
          <a href="ideas.html" ${current==='ideas'?'aria-current="page"':''}>Community</a>
          <a href="markets.html" ${current==='markets'?'aria-current="page"':''}>Markets</a>
          <a href="brokers.html" ${current==='brokers'?'aria-current="page"':''}>Brokers</a>
        </nav>
        <div class="topbarRight">
          <div class="search" role="search">
            <span class="tiny" aria-hidden="true">⌘K</span>
            <input type="search" placeholder="Search tickers, ideas, brokers…" aria-label="Search" />
          </div>
          <span class="chip" title="Demo mode">
            <span aria-hidden="true">●</span>
            Live snapshot
          </span>
          <a class="btn secondary" href="ideas.html">Explore features</a>
          <a class="btn" href="brokers.html">Get started for free</a>
        </div>
      </div>
    </div>
  </header>`;
}

function chartPulseFooter(){
  return `
  <footer class="footer">
    <div class="container">
      <div class="footerInner">
        <div class="footerCols">
          <div>
            <h4>Products</h4>
            <a href="chart.html">Supercharts</a>
            <a href="markets.html">Screeners</a>
            <a href="chart.html">Pine Script</a>
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
        <div class="tiny">Every trade a #ChartPulse trade · © ${new Date().getFullYear()} ChartPulse</div>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', function(){
  var headerMount = document.getElementById('cpHeader');
  if(headerMount){
    headerMount.innerHTML = chartPulseHeader(headerMount.getAttribute('data-current')||'home');
  }
  var footerMount = document.getElementById('cpFooter');
  if(footerMount){
    footerMount.innerHTML = chartPulseFooter();
  }
});

