import { buildHead } from './seo.js';

const BUSINESS_NAME = 'Volta Studio';

// Static site context: use a canonical placeholder URL.
const SITE_URL = 'https://voltastudio.example';
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const GEO = {
  geoRegion: 'US',
  city: 'New York',
  latitude: 40.7128,
  longitude: -74.006,
};

export function renderPage({
  active,
  title,
  description,
  path,
  body,
  jsonLd,
}) {
  const canonicalUrl = `${SITE_URL}${path}`;
  return `<!doctype html>
<html lang="en">
<head>
${buildHead({
  pageTitle: title,
  businessName: BUSINESS_NAME,
  metaDescription: description,
  canonicalUrl,
  ogImageUrl: OG_IMAGE_URL,
  jsonLd,
  geo: GEO,
})}
</head>
<body>
  ${header(active)}
  ${overlayNav(active)}
  <main>
    ${body}
  </main>
  ${footer()}
  <script src="assets/site.js" defer></script>
</body>
</html>`;
}

function navLink(href, label, active, id) {
  const current = active === id ? ' aria-current="page"' : '';
  return `<a href="${href}"${current}>${label}</a>`;
}

function header(active) {
  return `
  <header class="site-header">
    <div class="container container--wide">
      <div class="site-header__inner">
        <a class="brand" href="index.html">Volta.</a>
        <nav class="nav" aria-label="Primary">
          ${navLink('neweno.html', 'Neweno', active, 'neweno')}
          ${navLink('services.html', 'Services', active, 'services')}
          ${navLink('clients.html', 'Clients', active, 'clients')}
          ${navLink('contact.html', 'Contact', active, 'contact')}
        </nav>
        <button class="menu-btn" type="button" data-menu-button aria-expanded="false" aria-controls="overlay-nav">
          <span class="sr-only">Menu</span>
          <span class="menu-btn__icon" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function overlayNav(active) {
  return `
  <div class="overlay" id="overlay-nav" data-overlay role="dialog" aria-modal="true" aria-label="Navigation">
    <div class="overlay__inner">
      ${navLink('index.html', 'Home', active, 'home')}
      ${navLink('neweno.html', 'Neweno', active, 'neweno')}
      ${navLink('services.html', 'Services', active, 'services')}
      ${navLink('clients.html', 'Clients', active, 'clients')}
      ${navLink('contact.html', 'Contact', active, 'contact')}
      <button class="link-pill" type="button" data-overlay-close style="margin-top:18px">Close</button>
      <div class="overlay__meta">Boutique strategic design and innovation agency. Function + Feeling.</div>
    </div>
  </div>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container container--wide">
      <div class="site-footer__inner">
        <div>© ${year} Volta Studio</div>
        <div>Function + Feeling</div>
      </div>
    </div>
  </footer>`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: OG_IMAGE_URL,
    description:
      'A boutique strategic design and innovation studio creating Function + Feeling for industry-leading clients.',
    email: 'hello@voltastudio.example',
    telephone: '+1-000-000-0000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '—',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.006,
    },
    areaServed: [{ '@type': 'City', name: 'New York' }],
  };
}

