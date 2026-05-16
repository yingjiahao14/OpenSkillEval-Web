const fs = require('fs');
const { getHead, getHeader, getFooter } = require('./template.js');

const html = `
<!DOCTYPE html>
<html lang="en">
${getHead('Home - Track All Markets', 'Where the world charts, chats, and trades markets. Join 100 million traders and investors.')}
<body>
  ${getHeader('Home')}
  
  <div class="container mt-8">
    <div class="text-center mb-8">
      <h1 style="font-size: 48px; font-weight: 800; margin-bottom: 16px;">The best trades require research, then commitment.</h1>
      <p style="font-size: 20px; color: var(--text-secondary); max-width: 800px; margin: 0 auto 32px;">Where the world charts, chats, and trades markets. A supercharged super-charting platform and social network for traders and investors.</p>
      <div class="flex flex-center gap-4" style="justify-content: center;">
        <button class="btn" style="padding: 12px 24px; font-size: 16px;">Get started for free</button>
        <button class="btn btn-outline" style="padding: 12px 24px; font-size: 16px;">Explore features</button>
      </div>
    </div>

    <!-- Market Summary -->
    <div class="card mb-8">
      <div class="tabs">
        <div class="tab active" data-target="home-us-stocks" data-group="home-markets">US stocks</div>
        <div class="tab" data-target="home-crypto" data-group="home-markets">Crypto</div>
        <div class="tab" data-target="home-futures" data-group="home-markets">Futures</div>
      </div>
      
      <div id="home-us-stocks" class="tab-content active" data-group="home-markets">
        <div class="grid-4">
          <div class="flex flex-col gap-2">
            <span class="text-secondary">S&P 500</span>
            <span style="font-size: 24px; font-weight: 600;">7,041.29</span>
            <span class="up">+0.26%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Nasdaq 100</span>
            <span style="font-size: 24px; font-weight: 600;">26,333.00</span>
            <span class="up">+0.49%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Japan 225</span>
            <span style="font-size: 24px; font-weight: 600;">58,475.90</span>
            <span class="down">−1.75%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">FTSE 100</span>
            <span style="font-size: 24px; font-weight: 600;">10,562.63</span>
            <span class="down">−0.26%</span>
          </div>
        </div>
      </div>
      
      <div id="home-crypto" class="tab-content" data-group="home-markets">
        <div class="grid-4">
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Crypto market cap</span>
            <span style="font-size: 24px; font-weight: 600;">2.54 T USD</span>
            <span class="up">+1.37%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Bitcoin (BTCUSD)</span>
            <span style="font-size: 24px; font-weight: 600;">75,593</span>
            <span class="up">+0.55%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Ethereum (ETHUSD)</span>
            <span style="font-size: 24px; font-weight: 600;">2,355.7</span>
            <span class="up">+0.28%</span>
          </div>
        </div>
      </div>

      <div id="home-futures" class="tab-content" data-group="home-markets">
        <div class="grid-4">
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Light crude oil</span>
            <span style="font-size: 24px; font-weight: 600;">87.72</span>
            <span class="down">−7.36%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Natural gas</span>
            <span style="font-size: 24px; font-weight: 600;">2.692</span>
            <span class="up">+1.70%</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-secondary">Gold</span>
            <span style="font-size: 24px; font-weight: 600;">4,818.6</span>
            <span class="up">+0.21%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Community Trending Stocks & Ideas -->
    <div class="grid-2 mb-8">
      <!-- Trending Stocks -->
      <div class="card">
        <h3 class="mb-4">Community Trending Stocks</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><a href="chart.html">NFLX</a></td><td>107.79</td><td class="up">+0.07%</td></tr>
              <tr><td><a href="chart.html">AMD</a></td><td>278.26</td><td class="up">+7.80%</td></tr>
              <tr><td><a href="chart.html">RKLB</a></td><td>82.93</td><td class="up">+12.68%</td></tr>
              <tr><td><a href="chart.html">PBM</a></td><td>5.87</td><td class="up">+103.82%</td></tr>
              <tr><td><a href="chart.html">ONFO</a></td><td>1.50</td><td class="up">+124.89%</td></tr>
              <tr><td><a href="chart.html">AXTI</a></td><td>81.78</td><td class="up">+29.95%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Community Ideas -->
      <div class="card">
        <h3 class="mb-4">Community Ideas</h3>
        <div class="tabs">
          <div class="tab active" data-target="ideas-editors" data-group="home-ideas">Editors' picks</div>
          <div class="tab" data-target="ideas-popular" data-group="home-ideas">Popular</div>
        </div>
        <div id="ideas-editors" class="tab-content active" data-group="home-ideas">
          <div class="flex flex-col gap-4">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
              <h4>Apple's iPhone shipments in China rose 20% in Q1</h4>
              <p class="text-secondary mt-2">Strongest growth among major smartphone vendors...</p>
            </div>
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
              <h4>SPX Target Reached</h4>
              <p class="text-secondary mt-2">Technical analysis showing SPX hitting major resistance...</p>
            </div>
          </div>
        </div>
        <div id="ideas-popular" class="tab-content" data-group="home-ideas">
          <div class="flex flex-col gap-4">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
              <h4>Bitcoin Dominance Testing Highs</h4>
              <p class="text-secondary mt-2">BTC dominance at 59.61%. What it means for alts...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  ${getFooter()}
</body>
</html>
`;

fs.writeFileSync('/app/output/index.html', html);
