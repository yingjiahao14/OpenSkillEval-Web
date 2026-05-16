// Minimal SEO helpers derived from seo-local-business skill.
// For a product dashboard (not a local business), we emit Organization/WebSite schema.

function chartpulseSchema(page) {
  const siteUrl = './';
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ChartPulse',
    url: siteUrl,
    description:
      'A supercharged charting platform and social network for traders and investors to analyze, discuss, and trade global markets.',
    publisher: {
      '@type': 'Organization',
      name: 'ChartPulse',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: 'assets/og-image.svg'
      }
    }
  };
  if (page && page.path) {
    base.potentialAction = {
      '@type': 'SearchAction',
      target: `${page.path}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    };
  }
  return base;
}

function seoHead({
  title,
  description,
  canonical,
  ogImage
}) {
  const t = title || 'ChartPulse — Track All Markets';
  const d =
    description ||
    'Real-time markets, interactive charts, community ideas, and broker comparisons — all in one pro-grade dashboard.';
  const c = canonical || '';
  const img = ogImage || 'assets/og-image.svg';

  return `\
  <meta charset="UTF-8">\
  <meta name="viewport" content="width=device-width, initial-scale=1.0">\
  <title>${escapeHtml(t)}</title>\
  <meta name="title" content="${escapeHtml(t)}">\
  <meta name="description" content="${escapeHtml(d)}">\
  ${c ? `<link rel=\"canonical\" href=\"${escapeHtml(c)}\">` : ''}\
  <meta property="og:type" content="website">\
  <meta property="og:title" content="${escapeHtml(t)}">\
  <meta property="og:description" content="${escapeHtml(d)}">\
  <meta property="og:image" content="${escapeHtml(img)}">\
  <meta property="twitter:card" content="summary_large_image">\
  <meta property="twitter:title" content="${escapeHtml(t)}">\
  <meta property="twitter:description" content="${escapeHtml(d)}">\
  <meta property="twitter:image" content="${escapeHtml(img)}">\
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">\
  <link rel="stylesheet" href="assets/styles.css">\
  <script type="application/ld+json">${JSON.stringify(chartpulseSchema({ path: c || './' }))}</script>\
`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

window.ChartPulseSEO = { seoHead };

