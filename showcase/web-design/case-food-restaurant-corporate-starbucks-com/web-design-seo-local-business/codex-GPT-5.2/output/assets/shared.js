function buildSeoHead(opts) {
  const {
    pageTitle,
    businessName,
    metaDescription,
    canonicalUrl,
    ogImageUrl,
    geoRegion,
    city,
    latitude,
    longitude,
    jsonLd,
  } = opts;

  // Note: Canonical is still emitted even for file:// usage.
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}</title>
  <meta name="title" content="${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}">
  <meta name="description" content="${escapeHtml(metaDescription)}">

  <link rel="canonical" href="${escapeAttr(canonicalUrl)}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeAttr(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:image" content="${escapeAttr(ogImageUrl)}">

  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${escapeAttr(canonicalUrl)}">
  <meta property="twitter:title" content="${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}">
  <meta property="twitter:description" content="${escapeHtml(metaDescription)}">
  <meta property="twitter:image" content="${escapeAttr(ogImageUrl)}">

  <meta name="geo.region" content="${escapeAttr(geoRegion)}">
  <meta name="geo.placename" content="${escapeAttr(city)}">
  <meta name="geo.position" content="${escapeAttr(latitude)};${escapeAttr(longitude)}">
  <meta name="ICBM" content="${escapeAttr(latitude)}, ${escapeAttr(longitude)}">

  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@450;600;700;800&family=DM+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css">

  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(str) {
  return escapeHtml(str);
}

function navHtml(current) {
  const items = [
    { href: 'menu.html', label: 'Menu', id: 'menu' },
    { href: 'rewards.html', label: 'Rewards', id: 'rewards' },
    { href: 'gift.html', label: 'Gift Cards', id: 'gift' },
    { href: 'store-locator.html', label: 'Find a store', id: 'store' },
  ];
  const primary = items
    .map(
      (i) =>
        `<a href="${i.href}" ${i.id === current ? 'aria-current="page"' : ''}>${i.label}</a>`
    )
    .join('');

  const mobile = items.map((i) => `<a href="${i.href}">${i.label}</a>`).join('');

  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="GreenBean Coffee home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-name">GreenBean Coffee</span>
        </a>

        <nav class="nav" aria-label="Primary">
          ${primary}
        </nav>

        <div class="header-actions">
          <div class="auth-links">
            <a class="btn btn-small btn-ghost" href="#" aria-label="Sign in">Sign in</a>
            <a class="btn btn-small btn-primary" href="#" aria-label="Join rewards">Join now</a>
          </div>
          <button class="btn btn-small mobile-toggle" data-action="nav-toggle" aria-expanded="false" aria-controls="mobile-menu">
            Menu
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="mobile-menu" data-ui="mobile-menu" data-open="false" aria-label="Mobile navigation">
        ${mobile}
      </div>
    </div>
  </header>
`;
}

function footerHtml() {
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

  const htmlGroups = groups
    .map((g) => {
      const links = g.links.map((l) => `<a href="#">${escapeHtml(l)}</a>`).join('');
      return `
        <section class="footer-group" data-ui="footer-group" data-open="false">
          <h4 tabindex="0">${escapeHtml(g.title)}</h4>
          <div class="links">${links}</div>
        </section>
      `;
    })
    .join('');

  const year = new Date().getFullYear();
  return `
  <footer class="site-footer" data-ui="footer">
    <div class="container">
      <div class="footer-card">
        <div class="footer-top">
          <div>
            <div class="brand" style="gap: 12px;">
              <span class="brand-mark" aria-hidden="true"></span>
              <div>
                <div style="font-weight: 900; letter-spacing: -0.02em;">GreenBean Coffee</div>
                <p>Your daily coffee ritual — warm, modern, a little playful.</p>
              </div>
            </div>
          </div>
          <div style="display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap;">
            <a class="btn btn-primary" href="#">Start an order</a>
            <a class="btn" href="rewards.html">Join Rewards</a>
          </div>
        </div>

        <div class="footer-links">${htmlGroups}</div>

        <div class="footer-bottom">
          <span>© ${year} GreenBean Coffee. All rights reserved.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </div>
  </footer>
`;
}

function cookieBannerHtml() {
  return `
  <section class="cookie" data-ui="cookie-banner" aria-label="Cookie consent">
    <div class="cookie-inner">
      <div>
        <h3>This site uses cookies, but not the kind you eat</h3>
        <p>We use cookies to remember log in details, provide secure log in, improve site functionality, and deliver personalized content.</p>
      </div>
      <div class="cookie-actions">
        <button class="btn" type="button">Change cookie settings</button>
        <button class="btn btn-primary" type="button" data-action="cookie-agree">Agree</button>
      </div>
    </div>
  </section>
`;
}
