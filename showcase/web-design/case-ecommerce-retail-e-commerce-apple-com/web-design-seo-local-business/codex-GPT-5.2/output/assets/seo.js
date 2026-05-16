function buildHead({
  pageTitle,
  businessName,
  description,
  canonicalUrl,
  ogImageUrl,
  geoRegion,
  city,
  latitude,
  longitude,
  jsonLd,
}) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}</title>
  <meta name="title" content="${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}">
  <meta name="description" content="${escapeHtml(description)}">

  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}">

  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="twitter:title" content="${escapeHtml(pageTitle)} | ${escapeHtml(businessName)}">
  <meta property="twitter:description" content="${escapeHtml(description)}">
  <meta property="twitter:image" content="${escapeHtml(ogImageUrl)}">

  <meta name="geo.region" content="${escapeHtml(geoRegion)}">
  <meta name="geo.placename" content="${escapeHtml(city)}">
  <meta name="geo.position" content="${escapeHtml(latitude)};${escapeHtml(longitude)}">
  <meta name="ICBM" content="${escapeHtml(latitude)}, ${escapeHtml(longitude)}">

  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">

  <link rel="stylesheet" href="assets/site.css">
  <script defer src="assets/site.js"></script>

  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
`;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

module.exports = { buildHead };

