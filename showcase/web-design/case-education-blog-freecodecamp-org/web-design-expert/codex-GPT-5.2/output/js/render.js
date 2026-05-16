(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function initials(name) {
    const clean = (name || '').trim();
    if (!clean || clean === '—') return '—';
    const parts = clean.split(/\s+/).filter(Boolean);
    const first = (parts[0] || '').slice(0, 1).toUpperCase();
    const last = (parts[parts.length - 1] || '').slice(0, 1).toUpperCase();
    return parts.length === 1 ? first : `${first}${last}`;
  }

  function makeThumbDataUri(seed) {
    // Inline SVG thumbnail to avoid assets/build steps.
    const s = String(seed || 'openlearnhub');
    const base = s.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const hue = base % 360;
    const hue2 = (hue + 40) % 360;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="hsl(${hue}, 60%, 22%)"/>
            <stop offset="1" stop-color="hsl(${hue2}, 70%, 18%)"/>
          </linearGradient>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0.35"/>
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.14"/>
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="1200" height="675" fill="url(#g)"/>
        <rect width="1200" height="675" filter="url(#n)" opacity="0.55"/>
        <g fill="rgba(254,172,50,.12)">
          <circle cx="980" cy="120" r="140"/>
          <circle cx="260" cy="540" r="180"/>
          <circle cx="640" cy="360" r="90"/>
        </g>
        <g font-family="Inter, system-ui, -apple-system" fill="rgba(255,255,255,.9)">
          <text x="56" y="86" font-size="28" font-weight="800" letter-spacing="0.5">OpenLearnHub</text>
          <text x="56" y="120" font-size="18" font-weight="600" fill="rgba(255,255,255,.75)">Free tutorials • Curriculum • Community</text>
        </g>
      </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function renderArticles(list, targetSel) {
    const target = qs(targetSel);
    if (!target || !Array.isArray(list)) return;
    target.innerHTML = '';

    const frag = document.createDocumentFragment();
    list.forEach((a) => {
      const el = document.createElement('article');
      el.className = 'card';
      el.dataset.articleCard = 'true';
      el.innerHTML = `
        <div class="thumb">
          <img alt="" loading="lazy" src="${makeThumbDataUri(a.thumbSeed)}"/>
          <div class="tag"><a href="${a.tagHref}">${a.tag}</a></div>
        </div>
        <div class="card-body">
          <div class="kicker">${a.tag.replace('#', '')}</div>
          <h3 class="card-title"><a href="#" aria-label="Open article: ${a.title}">${a.title}</a></h3>
          <div class="meta">
            <div class="avatar" aria-hidden="true">${initials(a.author)}</div>
            <div><strong>${a.author}</strong> <span class="dot">·</span> ${a.time}</div>
          </div>
        </div>`;
      frag.appendChild(el);
    });
    target.appendChild(frag);
  }

  function renderPopularTags(list, targetSel) {
    const target = qs(targetSel);
    if (!target || !Array.isArray(list)) return;
    target.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach((t) => {
      const el = document.createElement('a');
      el.className = 'pill';
      el.href = 'index.html';
      el.innerHTML = `${t.label} <small>${t.count.toLocaleString()}</small>`;
      frag.appendChild(el);
    });
    target.appendChild(frag);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const data = window.OLH || {};

    if (qs('[data-page="home"]')) {
      renderArticles(data.articlesHome || [], '[data-article-grid]');
    }
    if (qs('[data-page="tag-ai"]')) {
      renderPopularTags(data.popularTags || [], '[data-popular-tags]');
      renderArticles(data.articlesAI || [], '[data-article-grid]');
    }
    if (qs('[data-page="tag-web-scraping"]')) {
      renderPopularTags(data.popularTags || [], '[data-popular-tags]');
      renderArticles(data.articlesScraping || [], '[data-article-grid]');
    }
  });
})();

