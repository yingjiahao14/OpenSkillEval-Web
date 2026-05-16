function iconChevron(dir) {
  const d = dir === 'left' ? 'M15 4 7 12l8 8' : 'M9 4l8 8-8 8';
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function renderTopNav(active) {
  const items = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'store', label: 'Store', href: 'store.html' },
    { id: 'laptops', label: 'Laptops', href: 'shop-laptops.html' },
    { id: 'tablets', label: 'Tablets', href: 'shop-tablets.html' },
  ];
  const links = items
    .map(
      (i) =>
        `<a href="${i.href}" ${i.id === active ? 'aria-current="page"' : ''}>${i.label}</a>`
    )
    .join('');

  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="topnav">
    <div class="topnav__inner">
      <a class="brand" href="index.html" aria-label="Orchard">
        <span class="brand__mark" aria-hidden="true"></span>
        <span>Orchard</span>
      </a>
      <nav class="navlinks" aria-label="Primary">${links}</nav>
    </div>
  </header>`;
}

function renderCarouselNav() {
  return `
    <div class="carousel__nav" aria-label="Carousel navigation">
      <button class="icon-btn" type="button" data-carousel-prev aria-label="Previous">
        ${iconChevron('left')}
      </button>
      <button class="icon-btn" type="button" data-carousel-next aria-label="Next">
        ${iconChevron('right')}
      </button>
    </div>`;
}

function renderFooter() {
  const cols = [
    {
      title: 'Shop and Learn',
      links: [
        'Store',
        'Laptop',
        'Tablet',
        'Phone',
        'Smartwatch',
        'Headphones',
        'Streaming Box',
        'Smart Speaker',
        'Tracker',
        'Accessories',
        'Gift Cards',
      ],
    },
    {
      title: 'Orchard Wallet',
      links: ['Wallet', 'Orchard Card', 'Orchard Pay', 'Orchard Cash'],
    },
    {
      title: 'Account',
      links: ['Manage Your Account', 'Orchard Store Account', 'Cloud Account'],
    },
    {
      title: 'Entertainment',
      links: [
        'Orchard One',
        'Orchard TV',
        'Orchard Music',
        'Orchard Arcade',
        'Orchard Fitness+',
        'Orchard News+',
        'Orchard Podcasts',
      ],
    },
    {
      title: 'Orchard Store',
      links: [
        'Find a Store',
        'Genius Bar',
        'Today at Orchard',
        'Certified Refurbished',
        'Orchard Trade In',
        'Financing',
        'Order Status',
        'Shopping Help',
      ],
    },
    {
      title: 'For Business',
      links: ['Orchard and Business', 'Shop for Business'],
    },
    {
      title: 'For Education',
      links: ['Orchard and Education', 'Shop for Education'],
    },
  ];

  const chevron = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const colHtml = cols
    .map((c, idx) => {
      const links = c.links
        .map((l) => `<a href="#" onclick="return false">${l}</a>`)
        .join('');
      return `
      <div class="footer__col" data-footer-col data-open="${idx === 0 ? 'true' : 'false'}">
        <button class="footer__title" type="button" data-footer-toggle aria-expanded="false">
          <span>${c.title}</span>${chevron}
        </button>
        <div class="footer__links">${links}</div>
      </div>`;
    })
    .join('');

  return `
  <footer class="footer" data-footer>
    <div class="container">
      <div class="footer__grid">${colHtml}</div>
      <div class="legal">
        <p style="margin:0 0 10px">
          0% APR installments are subject to credit approval and credit limit. Monthly pricing is available when you select installment checkout and may require an Orchard Card Monthly Installments account.
        </p>
        <p style="margin:0 0 10px">
          Trade-in values vary based on condition, year, and configuration. Promotional offers and subscription services require eligible plans.
        </p>
        <p style="margin:0">Copyright © ${new Date().getFullYear()} Orchard. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

window.OrchardShared = {
  renderTopNav,
  renderFooter,
  renderCarouselNav,
};

