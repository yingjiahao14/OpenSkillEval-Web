const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.chartpulse.com';
const BUSINESS_NAME = 'ChartPulse';
const PHONE = '+61-2-4900-1234';
const LATITUDE = '-32.9283';
const LONGITUDE = '151.7817';

function getHead(pageTitle, metaDescription) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "ChartPulse",
    "image": `${SITE_URL}/og-image.jpg`,
    "description": "A supercharged charting platform and social network for traders and investors to analyze, discuss, and trade global markets.",
    "@id": `${SITE_URL}/#organization`,
    "url": SITE_URL,
    "telephone": PHONE,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Hunter Street",
      "addressLocality": "Newcastle",
      "addressRegion": "NSW",
      "postalCode": "2300",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": parseFloat(LATITUDE),
      "longitude": parseFloat(LONGITUDE)
    },
    "areaServed": [
      { "@type": "City", "name": "Global" }
    ],
    "sameAs": [
      "https://www.facebook.com/chartpulse",
      "https://www.twitter.com/chartpulse"
    ]
  };

  return `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${pageTitle} | ${BUSINESS_NAME}</title>
    <meta name="title" content="${pageTitle} | ${BUSINESS_NAME}">
    <meta name="description" content="${metaDescription}">

    <link rel="canonical" href="${SITE_URL}">

    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_URL}">
    <meta property="og:title" content="${pageTitle} | ${BUSINESS_NAME}">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:image" content="${SITE_URL}/og-image.jpg">

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${SITE_URL}">
    <meta property="twitter:title" content="${pageTitle} | ${BUSINESS_NAME}">
    <meta property="twitter:description" content="${metaDescription}">
    <meta property="twitter:image" content="${SITE_URL}/og-image.jpg">

    <meta name="geo.region" content="AU-NSW">
    <meta name="geo.placename" content="Newcastle">
    <meta name="geo.position" content="${LATITUDE};${LONGITUDE}">
    <meta name="ICBM" content="${LATITUDE}, ${LONGITUDE}">

    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <link rel="stylesheet" href="styles.css">

    <script type="application/ld+json">
      ${JSON.stringify(schema, null, 2)}
    </script>
    <script src="script.js"></script>
  </head>
  `;
}

function getHeader(activePage) {
  return `
  <header>
    <a href="index.html" class="logo">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="#2962FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 9L14 14L10 10L4 16" stroke="#2962FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ChartPulse
    </a>
    <nav class="nav-links">
      <a href="chart.html" class="${activePage === 'Products' ? 'active' : ''}">Products</a>
      <a href="ideas.html" class="${activePage === 'Community' ? 'active' : ''}">Community</a>
      <a href="markets.html" class="${activePage === 'Markets' ? 'active' : ''}">Markets</a>
      <a href="brokers.html" class="${activePage === 'Brokers' ? 'active' : ''}">Brokers</a>
    </nav>
    <div class="nav-actions">
      <button class="btn btn-outline" style="margin-right: 8px;">Log In</button>
      <button class="btn">Get started</button>
    </div>
  </header>
  `;
}

function getFooter() {
  return `
  <footer>
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="chart.html">Supercharts</a></li>
          <li><a href="#">Screeners</a></li>
          <li><a href="#">Pine Script</a></li>
          <li><a href="#">Heatmaps</a></li>
          <li><a href="#">Calendars</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Community</h4>
        <ul>
          <li><a href="ideas.html">Social Network</a></li>
          <li><a href="ideas.html">Ideas</a></li>
          <li><a href="#">Indicators & Strategies</a></li>
          <li><a href="#">Editors' Picks</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Markets</h4>
        <ul>
          <li><a href="markets.html">Stocks</a></li>
          <li><a href="markets.html">ETFs</a></li>
          <li><a href="markets.html">Crypto</a></li>
          <li><a href="markets.html">Forex</a></li>
          <li><a href="markets.html">Futures</a></li>
          <li><a href="markets.html">Bonds</a></li>
          <li><a href="markets.html">Economy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Brokers</h4>
        <ul>
          <li><a href="brokers.html">Top Brokers</a></li>
          <li><a href="brokers.html">Broker Comparison</a></li>
          <li><a href="brokers.html">Special Offers</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Media Kit</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Cookies Policy</a></li>
          <li><a href="#">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="container text-center" style="margin-top: 40px; border-top: 1px solid var(--border-color); padding-top: 20px;">
      <p style="color: var(--text-secondary);">&copy; 2026 ChartPulse. Every trade a #ChartPulse trade.</p>
    </div>
  </footer>
  `;
}

module.exports = { getHead, getHeader, getFooter };
