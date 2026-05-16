const fs = require('fs');
const { getHead, getHeader, getFooter } = require('./template.js');

const html = `
<!DOCTYPE html>
<html lang="en">
${getHead('Trading Ideas & Community - ChartPulse', 'Discover community-driven trading ideas, technical analysis, and market sentiment.')}
<body>
  ${getHeader('Community')}
  
  <div class="container mt-8">
    <div class="flex flex-between items-center mb-8">
      <h1>Trading Ideas</h1>
      <button class="btn btn-toggle" id="ideas-video-toggle">Videos only</button>
    </div>

    <!-- Filters -->
    <div class="tabs mb-8">
      <div class="tab active" data-target="feed-popular" data-group="ideas-feed">Popular</div>
      <div class="tab" data-target="feed-editors" data-group="ideas-feed">Editors' picks</div>
    </div>

    <!-- Idea Feed -->
    <div id="feed-popular" class="tab-content active" data-group="ideas-feed">
      <div class="grid-3">
        <div class="card">
          <div class="flex items-center gap-2 mb-4">
            <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--accent-blue);"></div>
            <div>
              <div style="font-weight: 600;">CryptoKing</div>
              <div class="text-secondary" style="font-size: 12px;">2 hours ago</div>
            </div>
          </div>
          <h3 class="mb-2">Bitcoin Dominance Testing Highs</h3>
          <span class="badge mb-4" style="display: inline-block;">BTCUSD</span>
          <div style="width: 100%; height: 150px; background-color: var(--bg-tertiary); border-radius: 4px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">[ Chart Image ]</div>
          <p class="text-secondary mb-4" style="font-size: 14px;">BTC dominance is sitting at 59.61%. If it breaks 60%, expect alts to bleed further before any potential altseason.</p>
          <div class="flex gap-4 text-secondary text-sm">
            <span>👍 1.2k</span>
            <span>💬 342</span>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center gap-2 mb-4">
            <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--up-color);"></div>
            <div>
              <div style="font-weight: 600;">TechTrader</div>
              <div class="text-secondary" style="font-size: 12px;">5 hours ago</div>
            </div>
          </div>
          <h3 class="mb-2">AAPL iPhone Shipments Surge</h3>
          <span class="badge mb-4" style="display: inline-block;">AAPL</span>
          <div style="width: 100%; height: 150px; background-color: var(--bg-tertiary); border-radius: 4px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">[ Chart Image ]</div>
          <p class="text-secondary mb-4" style="font-size: 14px;">Shipments in China rose 20% in Q1. Looking for a breakout above 270 resistance levels with strong volume confirmation.</p>
          <div class="flex gap-4 text-secondary text-sm">
            <span>👍 890</span>
            <span>💬 156</span>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center gap-2 mb-4">
            <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--down-color);"></div>
            <div>
              <div style="font-weight: 600;">MacroBear</div>
              <div class="text-secondary" style="font-size: 12px;">1 day ago</div>
            </div>
          </div>
          <h3 class="mb-2">SPX Head and Shoulders Formation</h3>
          <span class="badge mb-4" style="display: inline-block;">SPX</span>
          <div style="width: 100%; height: 150px; background-color: var(--bg-tertiary); border-radius: 4px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">[ Chart Image ]</div>
          <p class="text-secondary mb-4" style="font-size: 14px;">Clear H&S pattern forming on the daily chart. If we lose the neckline at 6950, next support is 6800. Stay cautious.</p>
          <div class="flex gap-4 text-secondary text-sm">
            <span>👍 2.4k</span>
            <span>💬 512</span>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="flex items-center justify-center mt-8 gap-2">
        <button class="btn btn-outline">&lt; Prev</button>
        <button class="btn">1</button>
        <button class="btn btn-outline">2</button>
        <button class="btn btn-outline">3</button>
        <span class="text-secondary">...</span>
        <button class="btn btn-outline">Next &gt;</button>
      </div>
    </div>

    <!-- Editor's Picks Feed -->
    <div id="feed-editors" class="tab-content" data-group="ideas-feed">
      <div class="grid-3">
        <!-- Editor Idea -->
        <div class="card" style="border-color: #f5b041;">
          <div class="flex flex-between mb-4">
            <div class="flex items-center gap-2">
              <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #f5b041;"></div>
              <div>
                <div style="font-weight: 600;">ChartPulse Team</div>
                <div class="text-secondary" style="font-size: 12px;">Featured</div>
              </div>
            </div>
            <span class="badge gold">Editor's Pick</span>
          </div>
          <h3 class="mb-2">Energy Sector Rotation</h3>
          <span class="badge mb-4" style="display: inline-block;">USOIL</span>
          <div style="width: 100%; height: 150px; background-color: var(--bg-tertiary); border-radius: 4px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">[ Chart Image ]</div>
          <p class="text-secondary mb-4" style="font-size: 14px;">With crude dropping 7.36% to 87.72, we are seeing a massive rotation out of energy stocks into tech and defensive sectors.</p>
          <div class="flex gap-4 text-secondary text-sm">
            <span>👍 4.5k</span>
            <span>💬 890</span>
          </div>
        </div>
      </div>
    </div>

  </div>
  
  ${getFooter()}
</body>
</html>
`;

fs.writeFileSync('/app/output/ideas.html', html);
