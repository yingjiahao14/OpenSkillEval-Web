const fs = require('fs');
const { getHead, getHeader, getFooter } = require('./template.js');

const html = `
<!DOCTYPE html>
<html lang="en">
${getHead('Supercharts - ChartPulse', 'Advanced charting workspace. Analyze SPX, AAPL, BTCUSD, and more with pro tools.')}
<body style="display: flex; flex-direction: column; height: 100vh; overflow: hidden;">
  ${getHeader('Products')}
  
  <div style="display: flex; flex: 1; overflow: hidden;">
    <!-- Main Chart Area -->
    <div style="flex: 1; display: flex; flex-direction: column; border-right: 1px solid var(--border-color);">
      <!-- Toolbar -->
      <div style="height: 50px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; padding: 0 16px; gap: 16px;">
        <div style="font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 8px;">
          <img src="favicon.svg" width="20" height="20" style="border-radius: 50%;" alt="Apple" onerror="this.style.display='none'"> 
          AAPL <span class="text-secondary" style="font-size: 12px; font-weight: normal;">1D</span>
        </div>
        <div style="width: 1px; height: 24px; background-color: var(--border-color);"></div>
        <div class="tabs" style="margin: 0; border: none;">
          <div class="tab">1D</div>
          <div class="tab">5D</div>
          <div class="tab">1M</div>
          <div class="tab">3M</div>
          <div class="tab">6M</div>
          <div class="tab">YTD</div>
          <div class="tab active">1Y</div>
          <div class="tab">5Y</div>
          <div class="tab">All</div>
        </div>
        <div style="width: 1px; height: 24px; background-color: var(--border-color);"></div>
        <button class="btn btn-outline" style="padding: 4px 12px; font-size: 12px;">Indicators</button>
      </div>
      
      <!-- Chart Canvas Placeholder -->
      <div style="flex: 1; background-color: #131722; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <!-- Faux Candlesticks -->
        <div style="position: absolute; inset: 0; background-image: linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px); background-size: 100px 50px; opacity: 0.2;"></div>
        <div style="color: var(--text-secondary); z-index: 1;">[ Interactive Candlestick Chart Workspace ]</div>
      </div>
    </div>

    <!-- Right Sidebar Panel -->
    <div style="width: 340px; display: flex; flex-direction: column; background-color: var(--bg-secondary); overflow-y: auto;">
      <!-- Stock Detail Header -->
      <div style="padding: 20px; border-bottom: 1px solid var(--border-color);">
        <h2 style="font-size: 24px; font-weight: 700;">AAPL</h2>
        <div class="text-secondary mb-2">Apple Inc — NASDAQ</div>
        <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 32px; font-weight: 700;">263.40</span>
          <span class="text-secondary">USD</span>
        </div>
        <div class="down" style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">−3.03 (−1.14%)</div>
        <div style="display: flex; gap: 16px; font-size: 12px;">
          <div><span class="text-secondary">Pre-market:</span> 267.14 USD <span class="up">(+1.42%)</span></div>
        </div>
        <div class="mt-4 text-secondary" style="font-size: 12px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <strong>Headline:</strong> Apple's iPhone shipments in China rose 20% in Q1, the strongest growth among major smartphone vendors.
        </div>
      </div>

      <!-- Watchlist -->
      <div style="padding: 10px 0;">
        <div style="padding: 0 20px; margin-bottom: 10px; display: flex; justify-content: space-between;">
          <h3 style="font-size: 14px; text-transform: uppercase;">Watchlist</h3>
          <span style="cursor: pointer;">+</span>
        </div>

        <!-- Indices Accordion -->
        <div class="accordion">
          <div class="accordion-header" style="padding: 8px 20px; background-color: var(--bg-tertiary); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600;">
            <span class="toggle-icon">▼</span> Indices
          </div>
          <div class="accordion-content">
            <table style="font-size: 12px; font-weight: 500;">
              <tbody>
                <tr><td>SPX</td><td>7,041.29</td><td class="up">+0.26%</td></tr>
                <tr><td>NDQ</td><td>26,333.00</td><td class="up">+0.49%</td></tr>
                <tr><td>DJI</td><td>48,578.72</td><td class="up">+0.24%</td></tr>
                <tr><td>VIX</td><td>17.86</td><td class="down">−0.45%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Stocks Accordion -->
        <div class="accordion mt-2">
          <div class="accordion-header" style="padding: 8px 20px; background-color: var(--bg-tertiary); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600;">
            <span class="toggle-icon">▼</span> Stocks
          </div>
          <div class="accordion-content">
            <table style="font-size: 12px; font-weight: 500;">
              <tbody>
                <tr><td>AAPL</td><td>263.40</td><td class="down">−1.14%</td></tr>
                <tr><td>TSLA</td><td>388.90</td><td class="down">−0.78%</td></tr>
                <tr><td>NFLX</td><td>107.79</td><td class="up">+0.07%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Crypto Accordion -->
        <div class="accordion mt-2">
          <div class="accordion-header" style="padding: 8px 20px; background-color: var(--bg-tertiary); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600;">
            <span class="toggle-icon">▼</span> Crypto
          </div>
          <div class="accordion-content">
            <table style="font-size: 12px; font-weight: 500;">
              <tbody>
                <tr><td>BTCUSD</td><td>75,585</td><td class="up">+0.54%</td></tr>
                <tr><td>ETHUSD</td><td>2,355.1</td><td class="up">+0.25%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Futures Accordion -->
        <div class="accordion mt-2">
          <div class="accordion-header" style="padding: 8px 20px; background-color: var(--bg-tertiary); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600;">
            <span class="toggle-icon">▼</span> Futures
          </div>
          <div class="accordion-content">
            <table style="font-size: 12px; font-weight: 500;">
              <tbody>
                <tr><td>USOIL</td><td>87.53</td><td class="down">−6.06%</td></tr>
                <tr><td>GOLD</td><td>4,801.92</td><td class="up">+0.30%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Key Stats & Financials -->
      <div style="padding: 20px; border-top: 1px solid var(--border-color);">
        <h3 class="mb-4">Key Statistics</h3>
        <div class="grid-2 mb-4 text-secondary text-sm">
          <div>Volume</div><div class="text-right text-primary">43.32 M</div>
          <div>Avg Volume (30D)</div><div class="text-right text-primary">40.70 M</div>
          <div>Market capitalization</div><div class="text-right text-primary">3.87 T</div>
          <div>Next earnings report</div><div class="text-right text-primary">In 14 days</div>
        </div>

        <h3 class="mb-4 mt-8">Financials</h3>
        <div class="tabs mb-4">
          <div class="tab active" data-target="fin-annual" data-group="fin">Annual</div>
          <div class="tab" data-target="fin-quarterly" data-group="fin">Quarterly</div>
        </div>
        <div id="fin-annual" class="tab-content active" data-group="fin">
          <div class="grid-2 mb-2 text-secondary text-sm">
            <div>Dividend yield TTM</div><div class="text-right text-primary">0.39%</div>
            <div>Payout ratio (TTM)</div><div class="text-right text-primary">13.03%</div>
            <div>Last dividend payment</div><div class="text-right text-primary">0.26</div>
            <div>Analyst rating</div><div class="text-right text-primary">Neutral</div>
            <div>1 year price target</div><div class="text-right text-primary">300.40</div>
            <div>Performance 1Y</div><div class="text-right up">+32.79%</div>
          </div>
        </div>
        <div id="fin-quarterly" class="tab-content" data-group="fin">
          <div class="grid-2 mb-2 text-secondary text-sm">
            <div>Performance 1W</div><div class="text-right up">+1.70%</div>
            <div>Performance 1M</div><div class="text-right up">+4.13%</div>
            <div>Technicals</div><div class="text-right text-primary">Neutral</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('/app/output/chart.html', html);
