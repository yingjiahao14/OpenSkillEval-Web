export function buildHead({
  pageTitle,
  businessName,
  metaDescription,
  canonicalUrl,
  ogImageUrl,
  jsonLd,
  geo = {},
}) {
  const {
    geoRegion = 'US',
    city = 'New York',
    latitude = 40.7128,
    longitude = -74.006,
  } = geo;

  const safeJsonLd = JSON.stringify(jsonLd, null, 2);
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
  <meta name="geo.position" content="${latitude};${longitude}">
  <meta name="ICBM" content="${latitude}, ${longitude}">

  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css">

  <script type="application/ld+json">\n${safeJsonLd}\n  </script>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(s) {
  return escapeHtml(s);
}

