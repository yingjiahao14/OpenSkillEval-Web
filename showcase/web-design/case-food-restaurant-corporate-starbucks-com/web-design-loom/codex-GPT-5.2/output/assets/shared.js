function gbHeader(activePage) {
  return `
  <div class="topbar">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="container header" role="banner">
      <a class="brand" href="index.html" aria-label="GreenBean Coffee home">
        <span class="logo" aria-hidden="true"></span>
        <span>GreenBean Coffee</span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a data-nav="menu" href="menu.html" ${activePage === 'menu' ? 'aria-current="page"' : ''}>Menu</a>
        <a data-nav="rewards" href="rewards.html" ${activePage === 'rewards' ? 'aria-current="page"' : ''}>Rewards</a>
        <a data-nav="gift" href="gift.html" ${activePage === 'gift' ? 'aria-current="page"' : ''}>Gift Cards</a>
        <a data-nav="store-locator" href="store-locator.html" ${activePage === 'store-locator' ? 'aria-current="page"' : ''}>Find a store</a>
      </nav>
      <div class="header-actions">
        <a class="btn btn-ghost" href="#" onclick="return false;">Sign in</a>
        <a class="btn btn-primary" href="menu.html">Join now</a>
      </div>
    </div>
  </div>
  `.trim();
}

function gbFooter() {
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

  return `
  <footer data-footer>
    <div class="container">
      <div class="footer-grid" role="contentinfo">
        ${cols
          .map((c, idx) => {
            return `
            <section class="footer-col" data-footer-section data-open="${idx === 0 ? 'true' : 'false'}">
              <button type="button" data-footer-toggle hidden aria-label="Toggle ${c.title} links">
                <h3>${c.title}</h3>
                <span aria-hidden="true">▾</span>
              </button>
              <h3 class="footer-desktop" style="margin:0 0 8px;">${c.title}</h3>
              <div class="footer-links" aria-label="${c.title} links">
                ${c.links.map((l) => `<a href="#" onclick="return false;">${l}</a>`).join('')}
              </div>
            </section>
          `.trim();
          })
          .join('')}
      </div>

      <div class="footer-bottom">
        <div class="legal">
          <strong style="color:var(--forest);">GreenBean Coffee</strong>
          <span>© ${new Date().getUTCFullYear()} GreenBean Coffee Company</span>
        </div>
        <div class="legal">
          <a href="#" onclick="return false;">Privacy</a>
          <a href="#" onclick="return false;">Terms</a>
          <a href="#" onclick="return false;">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
  `.trim();
}

function gbCookieBanner() {
  return `
  <div class="cookie" id="cookie-banner" data-open="true" role="dialog" aria-label="Cookie consent">
    <div class="cookie-inner">
      <div class="cookie-text">
        <strong>This site uses cookies, but not the kind you eat</strong>
        <span>We use cookies to remember log in details, provide secure log in, improve site functionality, and deliver personalized content.</span>
      </div>
      <div class="cookie-actions">
        <button class="btn btn-ghost" type="button" onclick="return false;">Change cookie settings</button>
        <button class="btn btn-primary" type="button" id="cookie-agree">Agree</button>
      </div>
    </div>
  </div>
  `.trim();
}

