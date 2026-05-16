/* ================================================================
   GreenBean Coffee — Shared JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCookieBanner();
  initFooterAccordion();
  initActiveNavLink();
  initRewardsTabs();
  initCarousels();
  initStoreLocator();
});

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

/* ---- Cookie Banner ---- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  const isHidden = localStorage.getItem('cookie-banner-dismissed');
  if (!isHidden) {
    requestAnimationFrame(() => banner.classList.add('visible'));
  }
  banner.querySelectorAll('[data-cookie-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      banner.classList.remove('visible');
      localStorage.setItem('cookie-banner-dismissed', '1');
      setTimeout(() => banner.classList.add('hidden'), 400);
    });
  });
}

/* ---- Footer Accordion (Mobile) ---- */
function initFooterAccordion() {
  const cols = document.querySelectorAll('.footer-col');
  if (window.innerWidth > 768) {
    cols.forEach(c => c.classList.add('open'));
    return;
  }
  cols.forEach(col => {
    const h4 = col.querySelector('h4');
    const links = col.querySelector('.footer-col-links');
    if (!h4 || !links) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'footer-col-links';
    links.childNodes.forEach(n => wrapper.appendChild(n));
    links.replaceWith(wrapper);

    h4.addEventListener('click', () => {
      col.classList.toggle('open');
    });
  });
}

/* ---- Active Nav Link Highlighting ---- */
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && (href === '/' || href === './' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });
}

/* ---- Rewards Redemption Tabs ---- */
function initRewardsTabs() {
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  const contents = document.querySelectorAll('.redemption-content');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      contents.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-content') === target);
      });
    });
  });
  // Activate first tab by default
  if (!document.querySelector('.tab-btn.active')) {
    tabs[0].click();
  }
}

/* ---- Gift Card Carousels ---- */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prev = wrapper.querySelector('.carousel-btn.prev');
    const next = wrapper.querySelector('.carousel-btn.next');
    if (!track) return;
    const scrollAmount = 280;
    if (prev) prev.addEventListener('click', () => { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
    if (next) next.addEventListener('click', () => { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
  });
}

/* ---- Store Locator ---- */
function initStoreLocator() {
  initOrderTypeToggle();
  initStoreSearch();
  initFilterPanel();
}

function initOrderTypeToggle() {
  const btns = document.querySelectorAll('.locator-toggle button');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initStoreSearch() {
  const input = document.querySelector('.locator-search-box input');
  const suggestions = document.querySelector('.search-suggestions');
  if (!input || !suggestions) return;

  const mockLocations = [
    'New York, NY 10001', 'Brooklyn, NY 11201', 'Manhattan, NY 10010',
    'Los Angeles, CA 90001', 'Chicago, IL 60601', 'San Francisco, CA 94102',
    'Seattle, WA 98101', 'Portland, OR 97201', 'Austin, TX 78701',
    'Denver, CO 80201', 'Boston, MA 02101', 'Philadelphia, PA 19101'
  ];

  input.addEventListener('focus', () => {
    if (input.value.length >= 1) showSuggestions(input.value);
  });
  input.addEventListener('input', () => showSuggestions(input.value));
  document.addEventListener('click', (e) => {
    if (!input.parentElement.parentElement.contains(e.target)) {
      suggestions.classList.remove('open');
    }
  });

  suggestions.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
      input.value = item.textContent;
      suggestions.classList.remove('open');
      updateStoreResults(item.textContent);
    }
  });

  function showSuggestions(query) {
    const filtered = query.length >= 1
      ? mockLocations.filter(l => l.toLowerCase().includes(query.toLowerCase()))
      : mockLocations;
    suggestions.innerHTML = filtered.map(l =>
      `<div class="suggestion-item" role="option">${l}</div>`
    ).join('');
    suggestions.classList.toggle('open', filtered.length > 0);
  }
}

function initFilterPanel() {
  const filterBtn = document.querySelector('.locator-filter-btn');
  const filterPanel = document.querySelector('.locator-filter-panel');
  if (!filterBtn || !filterPanel) return;
  filterBtn.addEventListener('click', () => {
    filterPanel.classList.toggle('open');
  });
}

function updateStoreResults(location) {
  const resultsEl = document.querySelector('.locator-results');
  if (!resultsEl) return;
  const orderType = document.querySelector('.locator-toggle button.active')?.textContent?.trim() || 'Pickup';

  const mockStores = [
    { name: 'GreenBean Coffee — Downtown', addr: '245 Broadway, New York, NY 10007', hours: 'Open until 9:00 PM', dist: '0.3 mi', features: ['Drive-Thru', 'Mobile Order', 'Wi-Fi'] },
    { name: 'GreenBean Coffee — Midtown', addr: '680 5th Avenue, New York, NY 10019', hours: 'Open until 10:00 PM', dist: '0.8 mi', features: ['Mobile Order', 'Wi-Fi', 'Outdoor Seating'] },
    { name: 'GreenBean Coffee — SoHo', addr: '120 Prince Street, New York, NY 10012', hours: 'Open until 8:00 PM', dist: '1.2 mi', features: ['Wi-Fi', 'Outdoor Seating'] },
    { name: 'GreenBean Coffee — Chelsea', addr: '200 8th Avenue, New York, NY 10011', hours: 'Open until 9:30 PM', dist: '1.5 mi', features: ['Drive-Thru', 'Mobile Order'] },
    { name: 'GreenBean Coffee — Upper East', addr: '1150 3rd Avenue, New York, NY 10065', hours: 'Open until 8:00 PM', dist: '2.1 mi', features: ['Mobile Order', 'Wi-Fi', 'Outdoor Seating'] },
  ];

  resultsEl.innerHTML = mockStores.map(store => `
    <div class="locator-result">
      <h4>${store.name}</h4>
      <p>${store.addr} · ${store.dist}</p>
      <p>${store.hours}</p>
      <div class="features">
        ${store.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
        <span class="feature-tag" style="background:#fdf3e8;color:#b8860b;">${orderType} Available</span>
      </div>
    </div>
  `).join('');
}
