// --- Data & Initialization ---

const initialCryptoData = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$75,612.78', change1h: '+0.45%', change24h: '+1.33%', change7d: '+4.84%', marketCap: '$1.51T', volume24h: '$42.82B', supply: '20.01M BTC', icon: 'icon-btc' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,356.00', change1h: '+0.51%', change24h: '+0.80%', change7d: '+6.29%', marketCap: '$284.35B', volume24h: '$21.36B', supply: '120.69M ETH', icon: 'icon-eth' },
  { rank: 3, name: 'Tether', symbol: 'USDT', price: '$1.00', change1h: '+0.01%', change24h: '+0.03%', change7d: '+0.01%', marketCap: '$185.84B', volume24h: '$138.79B', supply: '185.8B USDT', icon: 'icon-usdt' },
  { rank: 4, name: 'XRP', symbol: 'XRP', price: '$1.44', change1h: '+0.71%', change24h: '+2.71%', change7d: '+7.89%', marketCap: '$89.13B', volume24h: '$4.03B', supply: '61.56B XRP', icon: 'icon-xrp' },
  { rank: 5, name: 'BNB', symbol: 'BNB', price: '$632.59', change1h: '+0.38%', change24h: '+1.89%', change7d: '+4.98%', marketCap: '$85.27B', volume24h: '$1.95B', supply: '134.78M BNB', icon: 'icon-bnb' },
  { rank: 7, name: 'Solana', symbol: 'SOL', price: '$88.25', change1h: '+0.67%', change24h: '+3.74%', change7d: '+5.67%', marketCap: '$50.77B', volume24h: '$6.71B', supply: '575.26M SOL', icon: 'icon-sol' }
];

function generateMockData(count, startRank) {
  const data = [];
  const mockNames = ['Cardano', 'Avalanche', 'Dogecoin', 'TRON', 'Polkadot', 'Chainlink', 'Polygon', 'Shiba Inu', 'Litecoin', 'Bitcoin Cash', 'Uniswap', 'Cosmos', 'Monero', 'Stellar', 'Ethereum Classic'];
  
  for (let i = 0; i < count; i++) {
    const rank = startRank + i;
    const nameIndex = Math.floor(Math.random() * mockNames.length);
    const name = mockNames[nameIndex];
    const symbol = name.substring(0, 3).toUpperCase();
    const price = (Math.random() * 100).toFixed(2);
    const mcap = (Math.random() * 10).toFixed(2);
    const vol = (Math.random() * 1).toFixed(2);
    const supply = Math.floor(Math.random() * 1000) + 'M';
    
    // Generate random changes
    const c1h = (Math.random() * 2 - 1);
    const c24h = (Math.random() * 10 - 5);
    const c7d = (Math.random() * 20 - 10);
    
    data.push({
      rank: rank,
      name: name,
      symbol: symbol,
      price: `$${price}`,
      change1h: `${c1h > 0 ? '+' : ''}${c1h.toFixed(2)}%`,
      change24h: `${c24h > 0 ? '+' : ''}${c24h.toFixed(2)}%`,
      change7d: `${c7d > 0 ? '+' : ''}${c7d.toFixed(2)}%`,
      marketCap: `$${mcap}B`,
      volume24h: `$${vol}B`,
      supply: `${supply} ${symbol}`,
      icon: ''
    });
  }
  return data;
}

function renderTable(data) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  
  data.forEach(coin => {
    const tr = document.createElement('tr');
    
    const isPos1h = coin.change1h.startsWith('+');
    const isPos24h = coin.change24h.startsWith('+');
    const isPos7d = coin.change7d.startsWith('+');
    
    const change1hClass = isPos1h ? 'positive' : 'negative';
    const change24hClass = isPos24h ? 'positive' : 'negative';
    const change7dClass = isPos7d ? 'positive' : 'negative';

    const icon1h = isPos1h ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';
    const icon24h = isPos24h ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';
    const icon7d = isPos7d ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';

    // Simple pseudo sparkline generation based on 7d trend
    const strokeColor = isPos7d ? '#16c784' : '#ea3943';
    
    tr.innerHTML = `
      <td class="col-center"><i class="ri-star-line" style="color: var(--text-secondary); cursor: pointer;"></i></td>
      <td class="col-center">${coin.rank}</td>
      <td class="col-left">
        <div class="coin-name-cell">
          <div class="coin-icon ${coin.icon}">${coin.icon ? '' : coin.name.charAt(0)}</div>
          <strong>${coin.name}</strong>
          <span class="coin-symbol">${coin.symbol}</span>
        </div>
      </td>
      <td class="col-right coin-price">${coin.price}</td>
      <td class="col-right change-cell ${change1hClass}"><i class="${icon1h}"></i> ${coin.change1h.replace('+', '').replace('-', '')}</td>
      <td class="col-right change-cell ${change24hClass}"><i class="${icon24h}"></i> ${coin.change24h.replace('+', '').replace('-', '')}</td>
      <td class="col-right change-cell ${change7dClass}"><i class="${icon7d}"></i> ${coin.change7d.replace('+', '').replace('-', '')}</td>
      <td class="col-right">${coin.marketCap}</td>
      <td class="col-right">
        <div>${coin.volume24h}</div>
      </td>
      <td class="col-right">
        <div>${coin.supply}</div>
      </td>
      <td class="col-center">
        <div class="sparkline">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0,15 Q25,${Math.random() * 30} 50,15 T100,${isPos7d ? 5 : 25}" fill="none" stroke="${strokeColor}" stroke-width="2"/>
          </svg>
        </div>
      </td>
      <td class="col-center"><i class="ri-more-2-fill" style="color: var(--text-secondary); cursor: pointer;"></i></td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Populate Table (6 initial + 94 mock)
  const fullData = [...initialCryptoData, ...generateMockData(94, 8)];
  renderTable(fullData);

  // Interaction 1: Category Tabs
  const categoryTabs = document.querySelectorAll('.category-tabs .tab-btn');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      // Re-render mock data to simulate state change
      renderTable([...initialCryptoData, ...generateMockData(94, 8)]);
    });
  });

  // Interaction 2: Network Filter Tabs
  const networkTabs = document.querySelectorAll('.network-tabs .net-btn');
  networkTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      networkTabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      // Re-render mock data to simulate state change
      renderTable([...initialCryptoData, ...generateMockData(40, 1)]);
    });
  });

  // Interaction 3 & 4: Toggle Columns and Filters
  const btnColumns = document.querySelector('.toggle-columns');
  const panelColumns = document.querySelector('.columns-panel');
  const btnFilters = document.querySelector('.toggle-filters');
  const panelFilters = document.querySelector('.filters-panel');

  btnColumns.addEventListener('click', () => {
    panelColumns.classList.toggle('hidden');
    panelFilters.classList.add('hidden'); // Close the other
  });

  btnFilters.addEventListener('click', () => {
    panelFilters.classList.toggle('hidden');
    panelColumns.classList.add('hidden'); // Close the other
  });

  // Interaction 5: Carousel Promo Banner
  const bannerCarousel = document.querySelector('.banner-carousel');
  const bannerTexts = [
    '<span class="badge">Airdrop</span> CTP Launch: Secure $GENIUS Airdrop — Join Now <i class="ri-arrow-right-line"></i>',
    '<span class="badge" style="background:#16c784;">Partner</span> New Partnership with Solana ecosystem <i class="ri-arrow-right-line"></i>',
    '<span class="badge" style="background:#ea3943;">Update</span> Platform maintenance scheduled for tomorrow <i class="ri-arrow-right-line"></i>'
  ];
  let bannerIndex = 0;
  
  if (bannerCarousel) {
    setInterval(() => {
      bannerIndex = (bannerIndex + 1) % bannerTexts.length;
      bannerCarousel.innerHTML = `<div class="banner-slide">${bannerTexts[bannerIndex]}</div>`;
    }, 4000);
  }

  // Interaction 6: Pagination Table
  const pageBtns = document.querySelectorAll('.pagination-controls .page-btn:not(.next-btn)');
  pageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('page-dots')) return;
      pageBtns.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      // Re-render mock data
      renderTable(generateMockData(100, parseInt(e.currentTarget.textContent) * 100));
    });
  });

  // Interaction 7: Accordion Market Summary
  const readMoreBtn = document.getElementById('read-more-btn');
  const expandedSummary = document.getElementById('expanded-summary');
  
  if (readMoreBtn && expandedSummary) {
    readMoreBtn.addEventListener('click', () => {
      if (expandedSummary.classList.contains('hidden')) {
        expandedSummary.classList.remove('hidden');
        readMoreBtn.textContent = '[Read Less]';
      } else {
        expandedSummary.classList.add('hidden');
        readMoreBtn.textContent = '[Read More]';
      }
    });
  }
});
