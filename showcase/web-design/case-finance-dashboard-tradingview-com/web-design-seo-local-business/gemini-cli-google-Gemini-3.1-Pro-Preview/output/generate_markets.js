const fs = require('fs');
const { getHead, getHeader, getFooter } = require('./template.js');

const html = `
<!DOCTYPE html>
<html lang="en">
${getHead('Markets Overview - ChartPulse', 'Live market quotes, financial charts, earnings calendars, and global index data.')}
<body>
  ${getHeader('Markets')}
  
  <div class="container mt-8">
    <h1 class="mb-4">Markets Overview</h1>

    <div class="tabs mb-8" style="border-bottom: 2px solid var(--border-color);">
      <a href="#indices" class="tab active" style="text-decoration: none;">Indices</a>
      <a href="#us-stocks" class="tab" style="text-decoration: none;">US stocks</a>
      <a href="#crypto" class="tab" style="text-decoration: none;">Crypto</a>
      <a href="#futures" class="tab" style="text-decoration: none;">Futures</a>
      <a href="#forex" class="tab" style="text-decoration: none;">Forex</a>
      <a href="#bonds" class="tab" style="text-decoration: none;">Bonds</a>
      <a href="#etfs" class="tab" style="text-decoration: none;">ETFs</a>
      <a href="#economy" class="tab" style="text-decoration: none;">Economy</a>
    </div>

    <div class="flex flex-between mb-4">
      <h3>Chart View</h3>
      <div class="tabs" style="border: none; margin: 0; gap: 8px;">
        <div class="tab active" style="padding: 4px 8px; font-size: 12px; background: var(--bg-tertiary); border-radius: 4px;">1D</div>
        <div class="tab" style="padding: 4px 8px; font-size: 12px; border-radius: 4px;">1M</div>
        <div class="tab" style="padding: 4px 8px; font-size: 12px; border-radius: 4px;">3M</div>
        <div class="tab" style="padding: 4px 8px; font-size: 12px; border-radius: 4px;">1Y</div>
        <div class="tab" style="padding: 4px 8px; font-size: 12px; border-radius: 4px;">5Y</div>
        <div class="tab" style="padding: 4px 8px; font-size: 12px; border-radius: 4px;">All</div>
        <div style="width: 1px; background: var(--border-color); margin: 0 4px;"></div>
        <div class="tab active" style="padding: 4px 8px; font-size: 12px; background: var(--bg-tertiary); border-radius: 4px;">Area</div>
        <div class="tab" style="padding: 4px 8px; font-size: 12px; border-radius: 4px;">Candles</div>
      </div>
    </div>

    <!-- US Market Indices -->
    <div id="indices" class="card mb-8">
      <h3 class="mb-4">US Market Indices</h3>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Change</th>
              <th>Chart</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S&P 500</td><td>SPX</td><td>7,041.29</td><td>USD</td><td class="up">+0.26%</td>
              <td><div class="sparkline up-line"></div></td>
            </tr>
            <tr>
              <td>Nasdaq 100</td><td>NDX</td><td>26,333.00</td><td>USD</td><td class="up">+0.49%</td>
              <td><div class="sparkline up-line"></div></td>
            </tr>
            <tr>
              <td>Dow 30</td><td>DJI</td><td>48,578.73</td><td>USD</td><td class="up">+0.24%</td>
              <td><div class="sparkline up-line"></div></td>
            </tr>
            <tr>
              <td>VIX</td><td>VIX</td><td>17.87</td><td>POINT</td><td class="down">−0.39%</td>
              <td><div class="sparkline down-line"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid-2 mb-8">
      <!-- World Stocks -->
      <div id="us-stocks" class="card">
        <h3 class="mb-4">World Stocks</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr><th>Company</th><th>Price</th><th>Change</th></tr>
            </thead>
            <tbody>
              <tr><td>NVIDIA (NVDA)</td><td>198.35</td><td class="down">−0.26%</td></tr>
              <tr><td>Apple (AAPL)</td><td>263.40</td><td class="down">−1.14%</td></tr>
              <tr><td>Microsoft (MSFT)</td><td>420.26</td><td class="up">+2.20%</td></tr>
              <tr><td>Tesla (TSLA)</td><td>388.90</td><td class="down">−0.78%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Stock Movers -->
      <div class="card">
        <h3 class="mb-4">Stock Movers</h3>
        <div class="tabs" style="font-size: 12px; gap: 8px;">
          <div class="tab active" data-target="movers-reg" data-group="movers">Regular hours</div>
          <div class="tab" data-target="movers-pre" data-group="movers">Pre-market</div>
          <div class="tab" data-target="movers-after" data-group="movers">After-hours</div>
        </div>
        <div id="movers-reg" class="tab-content active" data-group="movers">
          <div class="grid-2">
            <div>
              <h4 class="text-secondary text-sm mb-2">Gainers</h4>
              <ul style="font-size: 13px; line-height: 2;">
                <li class="flex flex-between"><span>Myseum</span><span class="up">+129.17%</span></li>
                <li class="flex flex-between"><span>Psyence Biomedical</span><span class="up">+103.82%</span></li>
                <li class="flex flex-between"><span>Mega Fortune</span><span class="up">+53.96%</span></li>
              </ul>
            </div>
            <div>
              <h4 class="text-secondary text-sm mb-2">Losers</h4>
              <ul style="font-size: 13px; line-height: 2;">
                <li class="flex flex-between"><span>Texxon</span><span class="down">−44.96%</span></li>
                <li class="flex flex-between"><span>Allbirds</span><span class="down">−35.79%</span></li>
                <li class="flex flex-between"><span>MMTec, Inc.</span><span class="down">−33.66%</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div id="movers-pre" class="tab-content" data-group="movers">
          <p class="text-secondary mt-4">Pre-market data loading...</p>
        </div>
        <div id="movers-after" class="tab-content" data-group="movers">
          <p class="text-secondary mt-4">After-hours data loading...</p>
        </div>
      </div>
    </div>

    <!-- Forex & Crypto -->
    <div class="grid-2 mb-8">
      <div id="forex" class="card">
        <h3 class="mb-4">Forex Pairs</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr><th>Pair</th><th>Rate</th><th>Change</th></tr>
            </thead>
            <tbody>
              <tr><td>EUR to USD</td><td>1.17932</td><td class="up">+0.13%</td></tr>
              <tr><td>GBP to USD</td><td>1.3529</td><td class="up">+0.06%</td></tr>
              <tr><td>USD to JPY</td><td>159.210</td><td class="up">+0.06%</td></tr>
              <tr><td>USD to CHF</td><td>0.78260</td><td class="down">−0.05%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div id="crypto" class="card">
        <h3 class="mb-4">Earnings Calendar</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr><th>Company</th><th>Actual EPS</th><th>Est EPS</th></tr>
            </thead>
            <tbody>
              <tr><td>Autoliv</td><td>Actual 2.05</td><td>Estimate 1.83</td></tr>
              <tr><td>Regions Financial</td><td>Actual 0.62</td><td>Estimate 0.60</td></tr>
              <tr><td>Fifth Third Bancorp</td><td>Actual 0.15</td><td>Estimate −0.10</td></tr>
              <tr><td>State Street Corp</td><td>—</td><td>Estimate 2.64</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Bonds -->
    <div id="bonds" class="grid-2 mb-8">
      <div class="card">
        <h3 class="mb-4">Government Bonds (Yield)</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr><th>Bond</th><th>Yield</th></tr>
            </thead>
            <tbody>
              <tr><td>US 2Y</td><td>3.767%</td></tr>
              <tr><td>US 10Y</td><td>4.295%</td></tr>
              <tr><td>US 30Y</td><td>4.919%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="card">
        <h3 class="mb-4">Corporate Bonds</h3>
        <div class="table-responsive">
          <table>
            <thead>
              <tr><th>Coupon</th><th>YTM</th><th>Maturity</th></tr>
            </thead>
            <tbody>
              <tr><td>7.69%</td><td>Yield to maturity 8.60%</td><td>Jan 23, 2050</td></tr>
              <tr><td>6.125%</td><td>Yield to maturity 8.59%</td><td>Jan 31, 2046</td></tr>
              <tr><td>5.0%</td><td>Yield to maturity 8.43%</td><td>May 13, 2045</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
  
  ${getFooter()}
</body>
</html>
`;

fs.writeFileSync('/app/output/markets.html', html);
