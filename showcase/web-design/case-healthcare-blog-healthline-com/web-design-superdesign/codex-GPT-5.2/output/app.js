/* WellSource interactions: mega-menu, tabs, carousel, newsletter */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function setAriaExpanded(btn, expanded) {
  btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function initMegaMenu() {
  const overlay = $('#menuOverlay');
  const mega = $('#megaMenu');
  const mobilePanel = $('#mobilePanel');
  const hamburger = $('#hamburger');
  const primaryButtons = $$('.nav-btn[data-menu]');
  const mobileButtons = $$('.nav-btn[data-menu][data-mobile="true"]');
  const allButtons = [...primaryButtons, ...mobileButtons];

  let openKey = null;

  function closeAll() {
    openKey = null;
    overlay?.setAttribute('data-open', 'false');
    mega?.setAttribute('data-open', 'false');
    mobilePanel?.setAttribute('data-open', 'false');
    allButtons.forEach((b) => setAriaExpanded(b, false));
  }

  function openMenu(key, sourceBtn) {
    openKey = key;
    overlay?.setAttribute('data-open', 'true');
    if (window.matchMedia('(max-width: 980px)').matches) {
      mobilePanel?.setAttribute('data-open', 'true');
      mega?.setAttribute('data-open', 'false');
    } else {
      mega?.setAttribute('data-open', 'true');
      mobilePanel?.setAttribute('data-open', 'false');
    }
    allButtons.forEach((b) => setAriaExpanded(b, b === sourceBtn));
    renderMega(key);
  }

  function toggleMenu(btn) {
    const key = btn.getAttribute('data-menu');
    if (!key) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeAll();
    else openMenu(key, btn);
  }

  function renderMega(key) {
    const data = window.WELLSOURCE_NAV?.[key];
    if (!data) return;

    $('#megaTitle').textContent = data.title;
    $('#megaDesc').textContent = data.description;
    const grid = $('#megaGrid');
    grid.innerHTML = '';
    data.items.forEach((item) => {
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'mega-link focus-ring';
      a.innerHTML = `<span>${item.label}</span><small>Explore</small>`;
      grid.appendChild(a);
    });

    $('#megaFeatureTitle').textContent = data.feature.title;
    $('#megaFeatureBody').textContent = data.feature.body;
    const cta = $('#megaFeatureCta');
    cta.textContent = data.feature.cta;
    cta.setAttribute('href', data.feature.href);
  }

  overlay?.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  allButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu(btn);
    });
  });

  hamburger?.addEventListener('click', () => {
    const open = mobilePanel?.getAttribute('data-open') === 'true';
    if (open) {
      closeAll();
    } else {
      overlay?.setAttribute('data-open', 'true');
      mobilePanel?.setAttribute('data-open', 'true');
    }
  });

  window.addEventListener('resize', () => {
    // If menu open, swap between mega and mobile panel.
    if (!openKey) return;
    if (window.matchMedia('(max-width: 980px)').matches) {
      mobilePanel?.setAttribute('data-open', 'true');
      mega?.setAttribute('data-open', 'false');
    } else {
      mega?.setAttribute('data-open', 'true');
      mobilePanel?.setAttribute('data-open', 'false');
    }
  });
}

function initRecommendedTabs() {
  const tabs = $$('.tab[data-tab]');
  const grid = $('#readsGrid');
  if (!tabs.length || !grid) return;

  function render(key) {
    const items = window.WELLSOURCE_READS?.[key] ?? [];
    grid.innerHTML = '';
    items.forEach((a) => {
      const card = document.createElement('a');
      card.href = a.href;
      card.className = 'card article focus-ring';
      card.innerHTML = `
        <div class="tag">${a.tag}</div>
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <div class="by"><span>${a.readTime}</span><span style="display:inline-flex; align-items:center; gap:8px"><span class="dot"></span>${a.level}</span></div>
      `;
      grid.appendChild(card);
    });
  }

  function setActive(btn) {
    const key = btn.getAttribute('data-tab');
    tabs.forEach((t) => t.setAttribute('aria-selected', t === btn ? 'true' : 'false'));
    render(key);
  }

  tabs.forEach((t) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      setActive(t);
    });
  });

  // Default
  const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  setActive(initial);
}

function initCarousel() {
  const track = $('#topicsTrack');
  const left = $('#topicsLeft');
  const right = $('#topicsRight');
  if (!track || !left || !right) return;

  function scrollByCard(dir) {
    const card = track.querySelector('.topic');
    const step = card ? card.getBoundingClientRect().width + 14 : 180;
    track.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  }

  left.addEventListener('click', () => scrollByCard(-1));
  right.addEventListener('click', () => scrollByCard(1));

  // Keyboard support
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollByCard(-1);
    if (e.key === 'ArrowRight') scrollByCard(1);
  });
}

function initNewsletters() {
  function attach(formId, statusId) {
    const form = $(formId);
    const status = $(statusId);
    if (!form || !status) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = new FormData(form).get('email');
      const ok = typeof email === 'string' && email.includes('@') && email.includes('.');
      status.textContent = ok
        ? 'Thanks — you’re in! Please check your inbox to confirm.'
        : 'Please enter a valid email address.';
      status.style.color = ok ? 'color-mix(in oklab, var(--teal-5) 80%, var(--text))' : 'color-mix(in oklab, var(--accent) 75%, var(--text))';
      if (ok) form.reset();
    });
  }

  attach('#newsletterForm', '#newsletterStatus');
  attach('#footerForm', '#footerStatus');
}

function initTickerIcons() {
  // Inline SVG-like icons via simple paths (no external libs).
  $$('.stat i').forEach((node) => {
    const type = node.getAttribute('data-ico');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const paths = {
      shield: ['M12 2l7 4v6c0 5-3 9-7 10C8 21 5 17 5 12V6l7-4z'],
      users: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
      clock: ['M12 8v5l3 2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'],
      spark: ['M12 2l1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2z', 'M19 14l.7 2.5L22 18l-2.3 1.1L19 22l-.7-2.5L16 18l2.3-1.5L19 14z'],
    };
    (paths[type] || paths.shield).forEach((d) => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      svg.appendChild(p);
    });
    node.replaceWith(svg);
  });
}

function init() {
  initTickerIcons();
  initMegaMenu();
  initRecommendedTabs();
  initCarousel();
  initNewsletters();
}

document.addEventListener('DOMContentLoaded', init);

