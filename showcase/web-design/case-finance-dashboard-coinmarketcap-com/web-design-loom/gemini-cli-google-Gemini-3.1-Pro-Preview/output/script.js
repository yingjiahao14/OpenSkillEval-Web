// Market Summary Accordion
document.getElementById('read-more-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const moreText = document.getElementById('market-summary-more');
    if (moreText.style.display === 'none') {
        moreText.style.display = 'inline';
        this.textContent = 'Read Less';
    } else {
        moreText.style.display = 'none';
        this.textContent = 'Read More';
    }
});

// Promotional Banner Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

setInterval(() => {
    carouselItems[currentItem].classList.remove('active');
    currentItem = (currentItem + 1) % carouselItems.length;
    carouselItems[currentItem].classList.add('active');
}, 5000);

// Category Tabs
const categoryTabs = document.querySelectorAll('.category-tabs .tab');
categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // Filter table logic would go here
    });
});

// Network Filter Tabs
const networkTabs = document.querySelectorAll('.network-filters .filter-tab');
networkTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        networkTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // Filter table logic would go here
    });
});

// Toggles for Filters and Columns
const filtersBtn = document.getElementById('filters-btn');
const filtersPanel = document.getElementById('filters-panel');

const columnsBtn = document.getElementById('columns-btn');
const columnsPanel = document.getElementById('columns-panel');

filtersBtn.addEventListener('click', () => {
    filtersPanel.style.display = filtersPanel.style.display === 'none' ? 'block' : 'none';
    columnsPanel.style.display = 'none';
});

columnsBtn.addEventListener('click', () => {
    columnsPanel.style.display = columnsPanel.style.display === 'none' ? 'block' : 'none';
    filtersPanel.style.display = 'none';
});

// Pagination Controls
const pageBtns = document.querySelectorAll('.pagination-controls .page-btn:not(.next)');
pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        pageBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // Load page logic would go here
    });
});

// Populate Table with 100 rows
const baseData = [
    { name: "Bitcoin", symbol: "BTC", price: "$75,612.78", p1h: "+0.45%", p24h: "+1.33%", p7d: "+4.84%", mcap: "$1.51T", vol: "$42.82B", supply: "20.01M BTC", chart: "▁▂▃▅▆", c1h: "positive", c24h: "positive", c7d: "positive" },
    { name: "Ethereum", symbol: "ETH", price: "$2,356.00", p1h: "+0.51%", p24h: "+0.80%", p7d: "+6.29%", mcap: "$284.35B", vol: "$21.36B", supply: "120.69M ETH", chart: "▂▃▄▅▆", c1h: "positive", c24h: "positive", c7d: "positive" },
    { name: "Tether", symbol: "USDT", price: "$1.00", p1h: "+0.01%", p24h: "+0.03%", p7d: "+0.01%", mcap: "$185.84B", vol: "$138.79B", supply: "185.8B USDT", chart: "▅▅▅▅▅", c1h: "positive", c24h: "positive", c7d: "positive" },
    { name: "XRP", symbol: "XRP", price: "$1.44", p1h: "+0.71%", p24h: "+2.71%", p7d: "+7.89%", mcap: "$89.13B", vol: "$4.03B", supply: "61.56B XRP", chart: "▂▃▃▅▇", c1h: "positive", c24h: "positive", c7d: "positive" },
    { name: "BNB", symbol: "BNB", price: "$632.59", p1h: "+0.38%", p24h: "+1.89%", p7d: "+4.98%", mcap: "$85.27B", vol: "$1.95B", supply: "134.78M BNB", chart: "▃▃▄▅▆", c1h: "positive", c24h: "positive", c7d: "positive" },
    { name: "Solana", symbol: "SOL", price: "$88.25", p1h: "+0.67%", p24h: "+3.74%", p7d: "+5.67%", mcap: "$50.77B", vol: "$6.71B", supply: "575.26M SOL", chart: "▂▃▄▅▆", c1h: "positive", c24h: "positive", c7d: "positive" }
];

const tableBody = document.getElementById('table-body');
let rowsHTML = '';

for (let i = 1; i <= 100; i++) {
    // Pick from baseData cycling through
    const coin = baseData[(i - 1) % baseData.length];
    
    // For visual variance, let's randomly change a few to negative if i > 6
    let p1h = coin.p1h;
    let p24h = coin.p24h;
    let p7d = coin.p7d;
    let c1h = coin.c1h;
    let c24h = coin.c24h;
    let c7d = coin.c7d;
    let chartColor = "positive";

    if (i > 6) {
        if (i % 3 === 0) {
            p24h = "-1.24%";
            c24h = "negative";
        }
        if (i % 5 === 0) {
            p7d = "-4.50%";
            c7d = "negative";
            chartColor = "negative";
        }
    }

    rowsHTML += `
        <tr>
            <td class="col-rank">${i}</td>
            <td class="col-name text-left">
                <div class="coin-info">
                    <span class="coin-icon" style="background-color: hsl(${Math.random() * 360}, 70%, 50%)"></span>
                    <span class="coin-name">${coin.name}</span>
                    <span class="coin-symbol">${coin.symbol}</span>
                </div>
            </td>
            <td class="col-price text-right">${coin.price}</td>
            <td class="col-1h text-right ${c1h}">${p1h}</td>
            <td class="col-24h text-right ${c24h}">${p24h}</td>
            <td class="col-7d text-right ${c7d}">${p7d}</td>
            <td class="col-mcap text-right">${coin.mcap}</td>
            <td class="col-vol text-right">${coin.vol}</td>
            <td class="col-supply text-right">${coin.supply}</td>
            <td class="col-chart text-right"><div class="sparkline ${chartColor}">${coin.chart}</div></td>
        </tr>
    `;
}

tableBody.insertAdjacentHTML('beforeend', rowsHTML);
