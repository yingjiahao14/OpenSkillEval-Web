function renderTopNav(active) {
  const map = {
    home: 'index.html',
    store: 'store.html',
    laptops: 'shop-laptops.html',
    tablets: 'shop-tablets.html'
  };
  const isActive = (key) => (active === key ? 'active' : '');
  return `
  <div class="topnav">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="container">
      <div class="bar">
        <a class="brand" href="${map.home}" aria-label="Orchard Home">
          <span class="mark" aria-hidden="true"></span>
          <span>Orchard</span>
        </a>
        <nav class="navlinks" aria-label="Primary">
          <a class="${isActive('store')}" href="${map.store}">Store</a>
          <a class="${isActive('laptops')}" href="${map.laptops}">Laptops</a>
          <a class="${isActive('tablets')}" href="${map.tablets}">Tablets</a>
        </nav>
      </div>
    </div>
  </div>`;
}

function renderFooter() {
  const columns = [
    {
      title: 'Shop and Learn',
      links: ['Store', 'Laptop', 'Tablet', 'Phone', 'Smartwatch', 'Headphones', 'Streaming Box', 'Smart Speaker', 'Tracker', 'Accessories', 'Gift Cards']
    },
    {
      title: 'Orchard Wallet',
      links: ['Wallet', 'Orchard Card', 'Orchard Pay', 'Orchard Cash']
    },
    {
      title: 'Account',
      links: ['Manage Your Account', 'Orchard Store Account', 'Cloud Account']
    },
    {
      title: 'Entertainment',
      links: ['Orchard One', 'Orchard TV', 'Orchard Music', 'Orchard Arcade', 'Orchard Fitness+', 'Orchard News+', 'Orchard Podcasts']
    },
    {
      title: 'Orchard Store',
      links: ['Find a Store', 'Genius Bar', 'Today at Orchard', 'Certified Refurbished', 'Orchard Trade In', 'Financing', 'Order Status', 'Shopping Help']
    },
    {
      title: 'For Business',
      links: ['Orchard and Business', 'Shop for Business']
    },
    {
      title: 'For Education',
      links: ['Orchard and Education', 'Shop for Education']
    }
  ];

  const colHtml = columns
    .map(
      (c, idx) => `
      <div class="footer-col">
        <h5>${c.title}</h5>
        ${c.links.map((l) => `<a href="#">${l}</a>`).join('')}
      </div>`
    )
    .join('');

  const accordionHtml = columns
    .map(
      (c, idx) => `
      <div class="footer-col">
        <button data-accordion-trigger aria-expanded="false" aria-controls="footer-panel-${idx}">
          <span>${c.title}</span>
          <span aria-hidden="true">+</span>
        </button>
        <div class="panel" id="footer-panel-${idx}">
          ${c.links.map((l) => `<a href="#">${l}</a>`).join('')}
        </div>
      </div>`
    )
    .join('');

  return `
  <footer>
    <div class="container">
      <div class="footer-inner">
        <p class="footnote">* 0% APR installments subject to credit approval and selection of eligible products. Trade-in values vary based on condition, year, and configuration. Subscription required for Orchard entertainment services.</p>

        <div class="footer-cols" aria-label="Footer links">
          ${colHtml}
        </div>

        <div class="footer-cols footer-accordion" data-footer-accordion aria-label="Footer links (mobile)">
          ${accordionHtml}
        </div>

        <div class="legal">
          <div class="small">Copyright © ${new Date().getFullYear()} Orchard. All rights reserved.</div>
          <div class="small">United States · English</div>
        </div>
      </div>
    </div>
  </footer>`;
}

