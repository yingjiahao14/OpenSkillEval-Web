window.WELLSTREAM = window.WELLSTREAM || {};

window.WELLSTREAM.buildSeo = function buildSeo(opts){
  const {
    pageTitle,
    description,
    canonicalPath,
    siteName,
    ogImage,
    pageType = 'website',
    geo = null,
    schema = null,
  } = opts;

  const origin = '';
  const canonicalUrl = canonicalPath;
  const ogImageUrl = ogImage || 'assets/og-image.svg';

  const geoTags = geo ? `
  <meta name="geo.region" content="${geo.region}">
  <meta name="geo.placename" content="${geo.city}">
  <meta name="geo.position" content="${geo.lat};${geo.lng}">
  <meta name="ICBM" content="${geo.lat}, ${geo.lng}">` : '';

  const schemaJson = schema ? JSON.stringify(schema, null, 2) : null;
  const schemaBlock = schemaJson ? `
  <script type="application/ld+json">${schemaJson}</script>` : '';

  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">

  <title>${pageTitle} | ${siteName}</title>
  <meta name="title" content="${pageTitle} | ${siteName}">
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <meta property="og:type" content="${pageType}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${pageTitle} | ${siteName}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:site_name" content="${siteName}">

  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonicalUrl}">
  <meta property="twitter:title" content="${pageTitle} | ${siteName}">
  <meta property="twitter:description" content="${description}">
  <meta property="twitter:image" content="${ogImageUrl}">
  ${geoTags}
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  ${schemaBlock}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css">`;
};

window.WELLSTREAM.applySeo = function applySeo(opts){
  const head = document.head;
  if (!head) return;
  head.insertAdjacentHTML('afterbegin', window.WELLSTREAM.buildSeo(opts));
};
