function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function iconChevronRight() {
  return `
    <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function iconChevronLeft() {
  return `
    <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function iconSparkle() {
  return `
    <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l1.4 5.2L19 9l-5.6 1.8L12 16l-1.4-5.2L5 9l5.6-1.8L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M5 14l.8 2.8L9 18l-3.2 1.2L5 22l-.8-2.8L1 18l3.2-1.2L5 14Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `;
}

function headerNav(current) {
  const items = [
    { id: 'menu', label: 'Menu', href: 'menu.html' },
    { id: 'rewards', label: 'Rewards', href: 'rewards.html' },
    { id: 'gift', label: 'Gift Cards', href: 'gift.html' },
    { id: 'store-locator', label: 'Find a store', href: 'store-locator.html' },
  ];

  const links = items
    .map((it) => {
      const currentAttr = it.id === current ? ' aria-current="page"' : '';
      return `<a href="${it.href}"${currentAttr}>${it.label}</a>`;
    })
    .join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="topbar">
      <div class="container">
        <nav class="nav" aria-label="Primary">
          <a class="brand" href="index.html" aria-label="GreenBean Coffee home">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-name">
              <strong>GreenBean Coffee</strong>
              <span>Your daily coffee ritual</span>
            </span>
          </a>
          <div class="nav-links" role="navigation" aria-label="Site">
            ${links}
          </div>
          <div class="nav-actions">
            <a class="btn btn-ghost btn-sm" href="store-locator.html">Stores</a>
            <a class="btn btn-primary" href="#order">Start an order</a>
          </div>
        </nav>
      </div>
    </header>
  `;
}

function footerLinks() {
  const cols = [
    {
      title: 'About Us',
      links: ['Our Company', 'Our Coffee', 'About GreenBean', 'GreenBean Archive', 'Investor Relations', 'Customer Service', 'Contact Us'],
    },
    {
      title: 'Careers',
      links: ['Culture and Values', 'Belonging at GreenBean', 'College Achievement Plan', 'Alumni Community', 'U.S. Careers', 'International Careers'],
    },
    {
      title: 'Social Impact',
      links: ['Communities', 'GreenBean Foundation', 'Sustainability', 'Environmental and Social Impact Reporting'],
    },
    {
      title: 'For Business Partners',
      links: ['Landlord Support Center', 'Suppliers', 'Corporate Gift Card Sales', 'Office and Foodservice Coffee'],
    },
    {
      title: 'Order and Pick Up',
      links: ['Order on the App', 'Order on the Web', 'Delivery', 'Order and Pick Up Options', 'Explore and Find Coffee for Home'],
    },
  ];

  const html = cols
    .map((c) => {
      const links = c.links
        .map((l) => `<a href="#" aria-label="${escapeHtml(l)} link">${escapeHtml(l)}</a>`)
        .join('');
      return `
        <div class="footer-col" data-footer-col data-open="true">
          <button class="accordion-btn" type="button" data-footer-accordion aria-expanded="true">
            <span>${escapeHtml(c.title)}</span>
            ${iconChevronRight()}
          </button>
          <h4>${escapeHtml(c.title)}</h4>
          ${links}
        </div>
      `;
    })
    .join('');

  return `
    <footer>
      <div class="container">
        <div class="footer-grid" aria-label="Footer links">
          ${html}
        </div>
        <div class="footer-bottom">
          <div>© ${new Date().getUTCFullYear()} GreenBean Coffee</div>
          <div>Warm. Modern. Just a touch playful.</div>
        </div>
      </div>
    </footer>
  `;
}

