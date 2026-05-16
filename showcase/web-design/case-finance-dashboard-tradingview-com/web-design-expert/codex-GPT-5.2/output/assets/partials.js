window.ChartPulsePartials = {
  nav: function(active){
    return `
<header class="topbar">
  <div class="container nav">
    <a class="brand" href="index.html" aria-label="ChartPulse Home">
      <span class="logo" aria-hidden="true"></span>
      <span>ChartPulse</span>
      <span class="pill"><span class="num">Live</span> • Track All Markets</span>
    </a>

    <nav class="navlinks" aria-label="Primary">
      <a data-nav href="index.html">Overview</a>
      <a data-nav href="chart.html">Supercharts</a>
      <a data-nav href="ideas.html">Ideas</a>
      <a data-nav href="markets.html">Markets</a>
      <a data-nav href="brokers.html">Brokers</a>
    </nav>

    <div class="actions">
      <button class="btn ghost" type="button">Sign in</button>
      <button class="btn primary" type="button">Get started</button>
    </div>
  </div>
</header>
`;
  },

  footer: function(){
    const cols = [
      {title:'Products', links:['Supercharts','Screeners','Pine Script','Heatmaps','Calendars']},
      {title:'Community', links:['Social Network','Ideas','Indicators & Strategies','Editors\' Picks']},
      {title:'Markets', links:['Stocks','ETFs','Crypto','Forex','Futures','Bonds','Economy']},
      {title:'Brokers', links:['Top Brokers','Broker Comparison','Special Offers']},
      {title:'Company', links:['About','Blog','Careers','Media Kit']},
      {title:'Legal', links:['Terms of Use','Privacy Policy','Cookies Policy','Disclaimer']},
    ];

    return `
<footer class="footer">
  <div class="container">
    <div class="cols">
      ${cols.map(c => `
        <div>
          <h4>${c.title}</h4>
          ${c.links.map(l => `<a href="#">${l}</a>`).join('')}
        </div>
      `).join('')}
    </div>
    <div style="margin-top:14px; display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
      <div>© ${new Date().getFullYear()} ChartPulse. Every trade a #ChartPulse trade.</div>
      <div class="muted">Dark-mode terminal UI • Static demo</div>
    </div>
  </div>
</footer>
`;
  },

  spark: function(dir){
    // dir: 'up' | 'down' | 'flat'
    const stroke = dir==='down' ? 'rgba(247,82,95,.9)' : (dir==='flat' ? 'rgba(210,220,240,.55)' : 'rgba(77,232,153,.9)');
    const fill = dir==='down' ? 'rgba(247,82,95,.12)' : (dir==='flat' ? 'rgba(210,220,240,.08)' : 'rgba(77,232,153,.12)');
    const d = dir==='down'
      ? 'M2,18 C18,6 28,24 44,10 S72,22 88,8'
      : (dir==='flat'
        ? 'M2,16 C16,14 28,18 44,16 S72,16 88,16'
        : 'M2,18 C14,20 26,6 40,10 S68,2 88,8');

    return `
<svg class="spark" viewBox="0 0 90 26" role="img" aria-label="sparkline">
  <path d="M2,24 L2,18 ${d.substring(1)} L88,24 Z" fill="${fill}" />
  <path d="${d}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
</svg>`;
  }
};
