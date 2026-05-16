// Shared HTML helpers (string templates) for static pages.
// Kept tiny so pages can remain plain HTML.

window.ChartPulse = window.ChartPulse || {};

window.ChartPulse.partials = {
  topbar(active) {
    const is = (k) => (active === k ? ' aria-current="page"' : '');
    return `
      <div class="topbar">
        <div class="container">
          <div class="topbar-inner">
            <a class="brand" href="./index.html" aria-label="ChartPulse home">
              <span class="logo" aria-hidden="true"></span>
              <span>ChartPulse</span>
            </a>

            <nav class="nav" aria-label="Primary">
              <a href="./chart.html"${is('chart')}>Chart</a>
              <a href="./ideas.html"${is('ideas')}>Ideas</a>
              <a href="./markets.html"${is('markets')}>Markets</a>
              <a href="./brokers.html"${is('brokers')}>Brokers</a>
            </nav>

            <div class="topbar-right">
              <div class="search" role="search">
                <span class="faint" aria-hidden="true">⌕</span>
                <input aria-label="Search symbols" placeholder="Search symbols, markets…" />
                <kbd>⌘K</kbd>
              </div>
              <a class="btn ghost" href="./ideas.html">Explore</a>
              <a class="btn primary" href="./chart.html">Open Terminal</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  footer() {
    const groups = [
      {
        title: "Products",
        items: ["Supercharts", "Screeners", "Pine Script", "Heatmaps", "Calendars"],
      },
      {
        title: "Community",
        items: ["Social Network", "Ideas", "Indicators & Strategies", "Editors' Picks"],
      },
      {
        title: "Markets",
        items: ["Stocks", "ETFs", "Crypto", "Forex", "Futures", "Bonds", "Economy"],
      },
      {
        title: "Brokers",
        items: ["Top Brokers", "Broker Comparison", "Special Offers"],
      },
      {
        title: "Company",
        items: ["About", "Blog", "Careers", "Media Kit"],
      },
      {
        title: "Legal",
        items: ["Terms of Use", "Privacy Policy", "Cookies Policy", "Disclaimer"],
      },
    ];

    const col = (g) => `
      <div>
        <h4>${g.title}</h4>
        ${g.items
          .map((t) => `<a href="#" onclick="return false" aria-label="${t}">${t}</a>`)
          .join("")}
      </div>
    `;

    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            ${groups.map(col).join("")}
          </div>
          <div class="footer-bottom">
            <div class="brand"><span class="logo" aria-hidden="true"></span><span>ChartPulse</span></div>
            <div>Every trade a <b>#ChartPulse</b> trade</div>
          </div>
        </div>
      </footer>
    `;
  },
};

