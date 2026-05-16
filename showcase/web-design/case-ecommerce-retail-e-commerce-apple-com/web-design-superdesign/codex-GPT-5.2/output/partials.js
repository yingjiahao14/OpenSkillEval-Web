function orchardHeader(active) {
  const is = (id) => (active === id ? ' aria-current="page"' : '');
  return `
  <header class="site-header">
    <div class="container">
      <nav class="nav" aria-label="Primary">
        <a class="brand" href="index.html" aria-label="Orchard Home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>Orchard</span>
        </a>
        <div class="nav-links" role="navigation">
          <a href="store.html"${is('store')}>Store</a>
          <a href="shop-laptops.html"${is('laptops')}>Laptops</a>
          <a href="shop-tablets.html"${is('tablets')}>Tablets</a>
        </div>
        <div class="nav-cta">
          <a class="btn ghost" href="store.html">Shop</a>
          <a class="btn primary" href="store.html">Buy now</a>
        </div>
      </nav>
    </div>
  </header>`;
}

function orchardFooter() {
  const groups = [
    {
      title: 'Shop and Learn',
      links: ['Store', 'Laptop', 'Tablet', 'Phone', 'Smartwatch', 'Headphones', 'Streaming Box', 'Smart Speaker', 'Tracker', 'Accessories', 'Gift Cards'],
    },
    { title: 'Orchard Wallet', links: ['Wallet', 'Orchard Card', 'Orchard Pay', 'Orchard Cash'] },
    { title: 'Account', links: ['Manage Your Account', 'Orchard Store Account', 'Cloud Account'] },
    { title: 'Entertainment', links: ['Orchard One', 'Orchard TV', 'Orchard Music', 'Orchard Arcade', 'Orchard Fitness+', 'Orchard News+', 'Orchard Podcasts'] },
    { title: 'Orchard Store', links: ['Find a Store', 'Genius Bar', 'Today at Orchard', 'Certified Refurbished', 'Orchard Trade In', 'Financing', 'Order Status', 'Shopping Help'] },
    { title: 'For Business', links: ['Orchard and Business', 'Shop for Business'] },
    { title: 'For Education', links: ['Orchard and Education', 'Shop for Education'] },
  ];

  const sections = groups
    .map((g, i) => {
      const id = `footer-panel-${i}`;
      return `
      <section class="footer-section">
        <button class="footer-head" data-footer-toggle aria-expanded="false" aria-controls="${id}">
          <span>${g.title}</span>
          <span class="chev" aria-hidden="true">▾</span>
        </button>
        <div class="footer-links" id="${id}" hidden>
          ${g.links.map((t) => `<a href="#">${t}</a>`).join('')}
        </div>
      </section>`;
    })
    .join('');

  return `
  <footer data-footer>
    <div class="container">
      <div class="footer-grid">${sections}</div>
      <div class="legal">
        <p style="margin:0 0 8px;">0% APR installments subject to credit approval and eligible device purchase. Terms apply.</p>
        <p style="margin:0 0 8px;">Trade-in values vary based on condition, year, and configuration of eligible devices.</p>
        <p style="margin:0;">Entertainment subscriptions require a subscription. Offer eligibility varies by product and service.</p>
      </div>
    </div>
  </footer>`;
}

