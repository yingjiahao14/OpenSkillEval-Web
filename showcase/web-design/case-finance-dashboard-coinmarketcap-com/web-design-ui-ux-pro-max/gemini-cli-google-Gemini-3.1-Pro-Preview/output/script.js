document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Generation
  const initialData = [
    { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$75,612.78', h1: '+0.45%', h24: '+1.33%', d7: '+4.84%', marketCap: '$1.51T', volume: '$42.82B', supply: '20.01M BTC', color: '#F7931A' },
    { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,356.00', h1: '+0.51%', h24: '+0.80%', d7: '+6.29%', marketCap: '$284.35B', volume: '$21.36B', supply: '120.69M ETH', color: '#627EEA' },
    { rank: 3, name: 'Tether', symbol: 'USDT', price: '$1.00', h1: '+0.01%', h24: '+0.03%', d7: '+0.01%', marketCap: '$185.84B', volume: '$138.79B', supply: '185.8B USDT', color: '#26A17B' },
    { rank: 4, name: 'XRP', symbol: 'XRP', price: '$1.44', h1: '+0.71%', h24: '+2.71%', d7: '+7.89%', marketCap: '$89.13B', volume: '$4.03B', supply: '61.56B XRP', color: '#23292F' },
    { rank: 5, name: 'BNB', symbol: 'BNB', price: '$632.59', h1: '+0.38%', h24: '+1.89%', d7: '+4.98%', marketCap: '$85.27B', volume: '$1.95B', supply: '134.78M BNB', color: '#F3BA2F' },
    { rank: 6, name: 'USDC', symbol: 'USDC', price: '$1.00', h1: '-0.01%', h24: '-0.02%', d7: '+0.01%', marketCap: '$34.12B', volume: '$4.50B', supply: '34.12B USDC', color: '#2775CA' },
    { rank: 7, name: 'Solana', symbol: 'SOL', price: '$88.25', h1: '+0.67%', h24: '+3.74%', d7: '+5.67%', marketCap: '$50.77B', volume: '$6.71B', supply: '575.26M SOL', color: '#14F195' },
  ];

  const generateMockData = () => {
    const data = [...initialData];
    const names = ['Cardano', 'Dogecoin', 'TRON', 'Toncoin', 'Chainlink', 'Polkadot', 'Polygon', 'Shiba Inu', 'Litecoin', 'Bitcoin Cash', 'Avalanche', 'Uniswap', 'Cosmos', 'Stellar', 'Monero', 'Ethereum Classic', 'Aptos', 'Filecoin', 'Arbitrum', 'VeChain', 'Maker', 'Render', 'Optimism', 'Injective', 'Sui'];
    const symbols = ['ADA', 'DOGE', 'TRX', 'TON', 'LINK', 'DOT', 'MATIC', 'SHIB', 'LTC', 'BCH', 'AVAX', 'UNI', 'ATOM', 'XLM', 'XMR', 'ETC', 'APT', 'FIL', 'ARB', 'VET', 'MKR', 'RNDR', 'OP', 'INJ', 'SUI'];
    
    for (let i = 8; i <= 100; i++) {
      const isPositive = Math.random() > 0.4;
      const randIdx = Math.floor(Math.random() * names.length);
      const h1Val = (Math.random() * 2).toFixed(2);
      const h24Val = (Math.random() * 8).toFixed(2);
      const d7Val = (Math.random() * 15).toFixed(2);
      const price = (Math.random() * 100).toFixed(2);
      const cap = (Math.random() * 10 + 1).toFixed(2);
      const vol = (Math.random() * 2).toFixed(2);

      data.push({
        rank: i,
        name: names[randIdx],
        symbol: symbols[randIdx],
        price: `$${price}`,
        h1: isPositive ? `+${h1Val}%` : `-${h1Val}%`,
        h24: (Math.random() > 0.5 ? '+' : '-') + `${h24Val}%`,
        d7: (Math.random() > 0.5 ? '+' : '-') + `${d7Val}%`,
        marketCap: `$${cap}B`,
        volume: `$${vol}B`,
        supply: `${(Math.random() * 900 + 10).toFixed(0)}M ${symbols[randIdx]}`,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }
    return data;
  };

  let cryptoData = generateMockData();

  const getPercentColor = (str) => {
    if (str.includes('+')) return 'text-green';
    if (str.includes('-')) return 'text-red';
    return '';
  };

  const generateSparkline = (isPositive) => {
    let bars = '';
    const colorClass = isPositive ? 'green' : 'red';
    let prevHeight = isPositive ? 20 : 80;
    
    for (let i = 0; i < 15; i++) {
      let height = prevHeight + (Math.random() * 30 - 15);
      height = Math.max(10, Math.min(100, height)); // clamp 10-100
      prevHeight = height;
      bars += `<div class="sparkline-bar ${colorClass}" style="height: ${height}%"></div>`;
    }
    return `<div class="sparkline">${bars}</div>`;
  };

  const renderTable = (data) => {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    data.forEach(coin => {
      const isPositive7d = !coin.d7.includes('-');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="rank">${coin.rank}</td>
        <td class="coin-name-cell">
          <div class="coin-icon flex items-center justify-center text-xs font-bold text-white" style="background:${coin.color}">${coin.symbol.charAt(0)}</div>
          <div class="coin-info">
            <span class="coin-name">${coin.name}</span>
            <span class="coin-symbol">${coin.symbol}</span>
          </div>
        </td>
        <td class="tabular-nums font-medium">${coin.price}</td>
        <td class="tabular-nums font-medium ${getPercentColor(coin.h1)}">${coin.h1}</td>
        <td class="tabular-nums font-medium ${getPercentColor(coin.h24)}">${coin.h24}</td>
        <td class="tabular-nums font-medium ${getPercentColor(coin.d7)}">${coin.d7}</td>
        <td class="tabular-nums font-medium">${coin.marketCap}</td>
        <td class="tabular-nums font-medium">${coin.volume}</td>
        <td class="tabular-nums">${coin.supply}</td>
        <td>${generateSparkline(isPositive7d)}</td>
      `;
      tbody.appendChild(tr);
    });
  };

  renderTable(cryptoData);

  // 2. Tab filtering
  const handleTabs = (selector, randomize = true) => {
    const tabs = document.querySelectorAll(selector);
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (randomize) {
          // Simulate fetching new data by scrambling the current array (except top 3 for effect)
          const top = cryptoData.slice(0, 3);
          const rest = cryptoData.slice(3).sort(() => Math.random() - 0.5);
          renderTable([...top, ...rest]);
        }
      });
    });
  };
  
  handleTabs('#categoryTabs .tab');
  handleTabs('#networkFilters .network-pill');

  // 3. Toggles
  const toggleBtn = (btnId, panelId) => {
    const btn = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    btn.addEventListener('click', () => {
      const isActive = panel.classList.contains('active');
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      if (!isActive) panel.classList.add('active');
    });
  };
  toggleBtn('toggleColumnsBtn', 'columnsPanel');
  toggleBtn('toggleFiltersBtn', 'filtersPanel');

  // 4. Read More
  const readMoreBtn = document.getElementById('readMoreBtn');
  const summaryExtra = document.getElementById('summaryExtra');
  readMoreBtn.addEventListener('click', () => {
    const isActive = summaryExtra.classList.contains('active');
    if (isActive) {
      summaryExtra.classList.remove('active');
      readMoreBtn.textContent = '[Read More]';
    } else {
      summaryExtra.classList.add('active');
      readMoreBtn.textContent = '[Read Less]';
    }
  });

  // 5. Promotional Banner Carousel
  const bannerMessages = [
    "CTP Launch: Secure $GENIUS Airdrop — Join Now",
    "Partner Feature: 0% Trading Fees on New Pairs",
    "Ecosystem Update: V2 API Now Available"
  ];
  let currentBannerIdx = 0;
  const promoText = document.getElementById('promoText');
  setInterval(() => {
    currentBannerIdx = (currentBannerIdx + 1) % bannerMessages.length;
    promoText.style.opacity = '0';
    setTimeout(() => {
      promoText.textContent = bannerMessages[currentBannerIdx];
      promoText.style.opacity = '1';
    }, 300);
  }, 4000);
  // Add simple fade transition to promo text
  promoText.style.transition = 'opacity 0.3s ease';

  // 6. Pagination
  const renderPagination = () => {
    const pages = [1, 2, 3, 4, '...', 84];
    const pagContainer = document.getElementById('pagination');
    let html = '';
    pages.forEach((p, idx) => {
      if (p === '...') {
        html += `<span class="page-ellipsis">...</span>`;
      } else {
        const activeClass = idx === 0 ? 'active' : '';
        html += `<button class="page-btn ${activeClass}">${p}</button>`;
      }
    });
    pagContainer.innerHTML = html;

    const pageBtns = pagContainer.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Simulate data load
        renderTable(cryptoData.sort(() => Math.random() - 0.5));
        window.scrollTo({ top: document.querySelector('.table-container').offsetTop - 100, behavior: 'smooth' });
      });
    });
  };
  
  renderPagination();
});