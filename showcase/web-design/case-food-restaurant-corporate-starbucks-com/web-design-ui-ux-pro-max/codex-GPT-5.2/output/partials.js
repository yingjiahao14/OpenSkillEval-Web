function gbHeader(active) {
  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="nav" role="banner">
    <div class="container nav-inner">
      <a class="brand" href="index.html" aria-label="GreenBean Coffee home">
        <span class="logo" aria-hidden="true"></span>
        <span>
          <strong>GreenBean Coffee</strong>
          <span>Your Daily Coffee Ritual</span>
        </span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <a data-nav href="menu.html">Menu</a>
        <a data-nav href="rewards.html">Rewards</a>
        <a data-nav href="gift.html">Gift Cards</a>
        <a data-nav href="store-locator.html">Find a store</a>
      </nav>

      <div class="nav-actions" aria-label="Account">
        <a class="btn link" href="#" aria-label="Sign in">Sign in</a>
        <a class="btn ghost" href="#" aria-label="Join now">Join now</a>
        <span class="sep" aria-hidden="true"></span>
        <a class="btn primary" href="#" aria-label="Start an order">Start an order</a>
      </div>

      <button class="btn ghost mobile-toggle" type="button" data-mobile-toggle aria-expanded="false" aria-controls="mobile-drawer">
        <span class="sr-only">Open menu</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <div id="mobile-drawer" class="mobile-drawer" data-mobile-drawer hidden>
      <a href="menu.html">Menu</a>
      <a href="rewards.html">Rewards</a>
      <a href="gift.html">Gift Cards</a>
      <a href="store-locator.html">Find a store</a>
      <hr style="border:0;border-top:1px solid rgba(20,32,21,0.12); margin:8px 6px" />
      <a href="#">Sign in</a>
      <a href="#">Join now</a>
      <a href="#">Start an order</a>
    </div>
  </header>`;
}

function gbFooter() {
  const groups = [
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
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        ${groups
          .map(
            (g, i) => `
          <section class="footer-section" data-footer-section data-open="${i === 0 ? 'true' : 'false'}">
            <button type="button" data-footer-toggle aria-expanded="${i === 0 ? 'true' : 'false'}">
              <span>${g.title}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <h3>${g.title}</h3>
            <div class="footer-links">
              ${g.links.map((l) => `<a href="#">${l}</a>`).join('')}
            </div>
          </section>`
          )
          .join('')}
      </div>

      <div class="footer-bottom">
        <div>© ${new Date().getFullYear()} GreenBean Coffee. All rights reserved.</div>
        <div>Warm cups · Better mornings · Cozy corners.</div>
      </div>
    </div>
  </footer>`;
}

function gbCookieBanner() {
  return `
  <div class="cookie" data-cookie-banner role="dialog" aria-live="polite" aria-label="Cookie consent">
    <div class="container">
      <div class="card">
        <div>
          <h3>This site uses cookies, but not the kind you eat</h3>
          <p>We use cookies to remember log in details, provide secure log in, improve site functionality, and deliver personalized content.</p>
        </div>
        <div class="actions">
          <button class="btn ghost" type="button">Change cookie settings</button>
          <button class="btn primary" type="button" data-cookie-agree>Agree</button>
        </div>
      </div>
    </div>
  </div>`;
}

