// Creates SVG data-URI placeholders (no external requests).
// Usage: <img data-ph="city" data-seed="Tokyo" data-w="1200" data-h="750" alt="...">
(function () {
  function colorFromSeed(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
    // OKLCH-ish via HSL output for SVG (stable, simple).
    return { h, s: 70, l: 52 };
  }

  function svgDataUri(svg) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function make(seed, w, h, label) {
    const c = colorFromSeed(seed);
    const bg1 = `hsl(${c.h} ${c.s}% ${Math.min(70, c.l + 12)}%)`;
    const bg2 = `hsl(${(c.h + 35) % 360} ${Math.max(45, c.s - 10)}% ${Math.max(30, c.l - 14)}%)`;
    const ink = `rgba(255,255,255,.92)`;
    const muted = `rgba(255,255,255,.70)`;

    const safeLabel = (label || seed || 'StayQuest').replace(/[<>]/g, '');

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.12"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#noise)" opacity=".45"/>
  <g fill="none" stroke="rgba(255,255,255,.22)" stroke-width="2">
    <path d="M ${w * 0.08} ${h * 0.72} C ${w * 0.22} ${h * 0.50}, ${w * 0.30} ${h * 0.88}, ${w * 0.46} ${h * 0.64} S ${w * 0.78} ${h * 0.52}, ${w * 0.92} ${h * 0.70}"/>
    <path d="M ${w * 0.12} ${h * 0.38} C ${w * 0.24} ${h * 0.22}, ${w * 0.36} ${h * 0.52}, ${w * 0.52} ${h * 0.30} S ${w * 0.80} ${h * 0.20}, ${w * 0.90} ${h * 0.36}"/>
  </g>
  <g>
    <text x="${w * 0.06}" y="${h * 0.18}" font-family="Inter, ui-sans-serif, system-ui" font-size="${Math.max(20, Math.round(w * 0.045))}" font-weight="800" fill="${ink}">${safeLabel}</text>
    <text x="${w * 0.06}" y="${h * 0.28}" font-family="Inter, ui-sans-serif, system-ui" font-size="${Math.max(14, Math.round(w * 0.020))}" font-weight="650" fill="${muted}">StayQuest travel preview</text>
  </g>
  <g opacity=".85">
    <circle cx="${w * 0.86}" cy="${h * 0.24}" r="${Math.max(24, Math.round(w * 0.055))}" fill="rgba(255,255,255,.14)"/>
    <circle cx="${w * 0.86}" cy="${h * 0.24}" r="${Math.max(14, Math.round(w * 0.030))}" fill="rgba(255,255,255,.16)"/>
  </g>
</svg>`;
    return svgDataUri(svg);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-ph]').forEach((img) => {
      const seed = img.getAttribute('data-seed') || img.alt || 'StayQuest';
      const w = Number(img.getAttribute('data-w') || 1200);
      const h = Number(img.getAttribute('data-h') || 750);
      const label = img.getAttribute('data-label') || img.alt || seed;
      img.src = make(seed, w, h, label);
    });
  });
})();

