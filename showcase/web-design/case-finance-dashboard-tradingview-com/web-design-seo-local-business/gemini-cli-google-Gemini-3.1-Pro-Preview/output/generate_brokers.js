const fs = require('fs');
const { getHead, getHeader, getFooter } = require('./template.js');

const html = `
<!DOCTYPE html>
<html lang="en">
${getHead('Verified Brokers - ChartPulse', 'Compare top verified brokers, read reviews, and find special offers for traders.')}
<body>
  ${getHeader('Brokers')}
  
  <!-- Stats Banner -->
  <div style="background-color: var(--bg-secondary); border-bottom: 1px solid var(--border-color); padding: 40px 20px; text-align: center;">
    <div class="container">
      <h1 class="mb-4">Trade with Verified Brokers</h1>
      <p class="text-secondary mb-8" style="font-size: 18px;">Seamlessly execute trades directly from ChartPulse with our trusted partners.</p>
      <div class="flex items-center justify-center gap-8" style="flex-wrap: wrap;">
        <div class="text-center">
          <div style="font-size: 36px; font-weight: 800; color: var(--up-color);">100M+</div>
          <div class="text-secondary text-sm">Traders connected through us</div>
        </div>
        <div style="width: 1px; height: 40px; background-color: var(--border-color);"></div>
        <div class="text-center">
          <div style="font-size: 36px; font-weight: 800; color: var(--up-color);">Millions daily</div>
          <div class="text-secondary text-sm">Successfully executed live orders</div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-8">
    
    <!-- Broker Filters -->
    <div class="flex flex-between mb-8 items-center" style="flex-wrap: wrap; gap: 20px;">
      <div class="tabs" style="margin: 0;">
        <div class="tab active" data-target="cat-all" data-group="broker-cat">All brokers</div>
        <div class="tab" data-target="cat-stocks" data-group="broker-cat">Stocks</div>
        <div class="tab" data-target="cat-crypto" data-group="broker-cat">Crypto</div>
        <div class="tab" data-target="cat-forex" data-group="broker-cat">Forex</div>
        <div class="tab" data-target="cat-futures" data-group="broker-cat">Futures</div>
      </div>
      
      <div class="tabs" style="margin: 0; border: none;">
        <div class="tab active" style="padding: 4px 12px; background: var(--bg-tertiary); border-radius: 4px;">Best rated</div>
        <div class="tab" style="padding: 4px 12px; border-radius: 4px;">All brokers</div>
      </div>
    </div>

    <!-- Broker Listings -->
    <div id="cat-all" class="tab-content active" data-group="broker-cat">
      <div class="flex flex-col gap-4">
        
        <!-- OKX -->
        <div class="card flex flex-between items-center" style="flex-wrap: wrap; gap: 20px;">
          <div class="flex items-center gap-4">
            <div style="width: 64px; height: 64px; background-color: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700;">OKX</div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 style="font-size: 18px;">OKX</h3>
                <span class="badge platinum">Platinum</span>
              </div>
              <div class="text-secondary text-sm flex items-center gap-4" style="flex-wrap: wrap;">
                <span><strong class="text-primary">4.9</strong> Excellent</span>
                <span><strong class="text-primary">22.5K</strong> Reviews</span>
                <span><strong class="text-primary">239.9K</strong> Accounts</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-secondary" style="max-width: 200px; padding-right: 20px; border-right: 1px solid var(--border-color);">
              <strong style="color: #f5b041;">Special Offer</strong><br>
              Unlock ChartPulse Plus!
            </div>
            <button class="btn">Trade</button>
          </div>
        </div>

        <!-- Interactive Brokers -->
        <div class="card flex flex-between items-center" style="flex-wrap: wrap; gap: 20px;">
          <div class="flex items-center gap-4">
            <div style="width: 64px; height: 64px; background-color: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700;">IBKR</div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 style="font-size: 18px;">Interactive Brokers</h3>
                <span class="badge platinum">Platinum</span>
              </div>
              <div class="text-secondary text-sm flex items-center gap-4" style="flex-wrap: wrap;">
                <span><strong class="text-primary">4.2</strong> Good</span>
                <span><strong class="text-primary">36.4K</strong> Reviews</span>
                <span><strong class="text-primary">343.2K</strong> Accounts</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-secondary" style="max-width: 200px; padding-right: 20px; border-right: 1px solid var(--border-color);">
              No current promotions available.
            </div>
            <button class="btn">Trade</button>
          </div>
        </div>

        <!-- moomoo -->
        <div class="card flex flex-between items-center" style="flex-wrap: wrap; gap: 20px;">
          <div class="flex items-center gap-4">
            <div style="width: 64px; height: 64px; background-color: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700;">moomoo</div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 style="font-size: 18px;">moomoo</h3>
                <span class="badge gold">Gold</span>
              </div>
              <div class="text-secondary text-sm flex items-center gap-4" style="flex-wrap: wrap;">
                <span><strong class="text-primary">4.6</strong> Excellent</span>
                <span><strong class="text-primary">4K</strong> Reviews</span>
                <span><strong class="text-primary">81.7K</strong> Accounts</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-secondary" style="max-width: 200px; padding-right: 20px; border-right: 1px solid var(--border-color);">
              <strong style="color: #f5b041;">Special Offer</strong><br>
              8.1% APY + Free Premium
            </div>
            <button class="btn">Trade</button>
          </div>
        </div>

        <!-- OANDA -->
        <div class="card flex flex-between items-center" style="flex-wrap: wrap; gap: 20px;">
          <div class="flex items-center gap-4">
            <div style="width: 64px; height: 64px; background-color: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700;">OANDA</div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 style="font-size: 18px;">OANDA</h3>
                <span class="badge platinum">Platinum</span>
              </div>
              <div class="text-secondary text-sm flex items-center gap-4" style="flex-wrap: wrap;">
                <span><strong class="text-primary">4.5</strong> Great</span>
                <span><strong class="text-primary">31.3K</strong> Reviews</span>
                <span><strong class="text-primary">296.7K</strong> Accounts</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-secondary" style="max-width: 200px; padding-right: 20px; border-right: 1px solid var(--border-color);">
              <strong style="color: #f5b041;">Special Offer</strong><br>
              Free ChartPulse plan
            </div>
            <button class="btn">Trade</button>
          </div>
        </div>

        <!-- FOREX.com -->
        <div class="card flex flex-between items-center" style="flex-wrap: wrap; gap: 20px;">
          <div class="flex items-center gap-4">
            <div style="width: 64px; height: 64px; background-color: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700;">FOREX</div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 style="font-size: 18px;">FOREX.com</h3>
                <span class="badge platinum">Platinum</span>
              </div>
              <div class="text-secondary text-sm flex items-center gap-4" style="flex-wrap: wrap;">
                <span><strong class="text-primary">4.5</strong> Great</span>
                <span><strong class="text-primary">13.7K</strong> Reviews</span>
                <span><strong class="text-primary">175.7K</strong> Accounts</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-secondary" style="max-width: 200px; padding-right: 20px; border-right: 1px solid var(--border-color);">
              No current promotions available.
            </div>
            <button class="btn">Trade</button>
          </div>
        </div>

      </div>
    </div>
  </div>
  
  ${getFooter()}
</body>
</html>
`;

fs.writeFileSync('/app/output/brokers.html', html);
