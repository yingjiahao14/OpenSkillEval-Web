/* ============================================================
   GreenBean Coffee — Shared JavaScript
   Cookie banner • Footer accordion • Tabs • Carousels
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCookieBanner();
  initFooterAccordion();
  initRedemptionTabs();
  initGiftCarousels();
  initCategoryTabs();
  initStoreLocator();
  initFAQ();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-primary');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const agreeBtn = banner.querySelector('[data-action="agree"]');
  const settingsBtn = banner.querySelector('[data-action="settings"]');

  function dismiss() {
    banner.classList.add('hidden');
    sessionStorage.setItem('cookie-consent', 'true');
  }

  // Check prior consent
  if (sessionStorage.getItem('cookie-consent') === 'true') {
    banner.classList.add('hidden');
  }

  agreeBtn.addEventListener('click', dismiss);
  settingsBtn.addEventListener('click', () => {
    alert('Cookie settings would open here. You can customize your preferences.');
  });
}

/* --- Footer Accordion (Mobile) --- */
function initFooterAccordion() {
  const cols = document.querySelectorAll('.footer-col');
  if (!cols.length) return;

  cols.forEach(col => {
    const header = col.querySelector('.footer-col-header');
    if (!header) return;

    header.addEventListener('click', () => {
      // Only toggle on mobile
      if (window.innerWidth > 768) return;
      col.classList.toggle('open');
    });
  });
}

/* --- Rewards Redemption Tabs --- */
function initRedemptionTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const panels = document.querySelectorAll('.redemption-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* --- Gift Card Carousels --- */
function initGiftCarousels() {
  document.querySelectorAll('.carousel-section').forEach(section => {
    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.carousel-prev');
    const nextBtn = section.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    let position = 0;
    const items = track.children;
    const itemWidth = items[0]?.offsetWidth || 0;
    const gap = 24; // 1.5rem gap
    const visibleItems = getVisibleItems();

    function getVisibleItems() {
      const w = window.innerWidth;
      if (w <= 480) return 2;
      if (w <= 768) return 2;
      if (w <= 1024) return 3;
      return 4;
    }

    function updateButtons() {
      prevBtn.disabled = position <= 0;
      nextBtn.disabled = position >= items.length - visibleItems;
    }

    function slide(direction) {
      const vis = getVisibleItems();
      const step = direction === 'next' ? vis : -vis;
      const maxPos = items.length - vis;

      position = Math.max(0, Math.min(maxPos, position + step));
      const translateX = -(position * (itemWidth + gap));
      track.style.transform = `translateX(${translateX}px)`;
      updateButtons();
    }

    prevBtn.addEventListener('click', () => slide('prev'));
    nextBtn.addEventListener('click', () => slide('next'));

    // Handle resize
    window.addEventListener('resize', () => {
      position = 0;
      track.style.transform = 'translateX(0)';
      updateButtons();
    });

    updateButtons();
  });
}

/* --- Gift Category Tabs --- */
function initCategoryTabs() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const categoryCarousels = document.querySelectorAll('.category-carousel');
  if (!categoryTabs.length || !categoryCarousels.length) return;

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      categoryTabs.forEach(t => t.classList.remove('active'));
      categoryCarousels.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const carousel = document.getElementById(target);
      if (carousel) carousel.classList.add('active');
    });
  });
}

/* --- Store Locator --- */
function initStoreLocator() {
  const searchInput = document.getElementById('store-search');
  const suggestions = document.getElementById('store-suggestions');
  const filterBtn = document.getElementById('filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  const orderOptions = document.querySelectorAll('.order-type-option');
  const resultsContainer = document.getElementById('store-results');

  // Search with suggestions
  if (searchInput && suggestions) {
    const mockLocations = [
      '123 Main Street, Brooklyn, NY 11201',
      '456 Park Avenue, New York, NY 10022',
      '789 Broadway, New York, NY 10003',
      '321 Green Lane, Chicago, IL 60614',
      '654 Lake Shore Drive, Chicago, IL 60611',
      '987 Sunset Blvd, Los Angeles, CA 90028',
      '147 Ocean Avenue, Santa Monica, CA 90401',
      '258 Market Street, San Francisco, CA 94105',
    ];

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      suggestions.innerHTML = '';

      if (query.length < 2) {
        suggestions.classList.remove('show');
        return;
      }

      const matches = mockLocations.filter(loc =>
        loc.toLowerCase().includes(query)
      );

      if (matches.length) {
        matches.forEach(loc => {
          const item = document.createElement('div');
          item.className = 'suggestion-item';
          item.textContent = loc;
          item.addEventListener('click', () => {
            searchInput.value = loc;
            suggestions.classList.remove('show');
            updateResults(loc);
          });
          suggestions.appendChild(item);
        });
        suggestions.classList.add('show');
      } else {
        suggestions.classList.remove('show');
      }
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.remove('show');
      }
    });
  }

  // Filter toggle
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  // Order type toggle
  orderOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      orderOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // Initial results population
  if (resultsContainer) {
    updateResults();
  }
}

function updateResults(location) {
  const container = document.getElementById('store-results');
  if (!container) return;

  const stores = [
    { name: 'GreenBean Coffee — Broadway', addr: '789 Broadway, New York, NY 10003', distance: '0.3 mi', hours: 'Open until 9:00 PM', open: true, features: ['Mobile Order', 'Drive-Thru', 'Wi-Fi'] },
    { name: 'GreenBean Coffee — Park Ave', addr: '456 Park Avenue, New York, NY 10022', distance: '0.7 mi', hours: 'Open until 8:00 PM', open: true, features: ['Mobile Order', 'Wi-Fi', 'Outdoor Seating'] },
    { name: 'GreenBean Coffee — Brooklyn', addr: '123 Main Street, Brooklyn, NY 11201', distance: '1.2 mi', hours: 'Open until 10:00 PM', open: true, features: ['Mobile Order', 'Drive-Thru', 'Wi-Fi', 'Nitro Cold Brew'] },
    { name: 'GreenBean Coffee — SoHo', addr: '55 Spring Street, New York, NY 10012', distance: '1.5 mi', hours: 'Closed', open: false, features: ['Mobile Order', 'Wi-Fi'] },
    { name: 'GreenBean Coffee — Midtown', addr: '350 Fifth Avenue, New York, NY 10118', distance: '1.8 mi', hours: 'Open until 7:00 PM', open: true, features: ['Mobile Order', 'Wi-Fi', 'Outdoor Seating'] },
  ];

  container.innerHTML = stores.map(store => `
    <div class="store-result-card">
      <div class="store-result-name">${store.name}</div>
      <div class="store-result-addr">${store.addr}</div>
      <div class="store-result-meta">
        <span>📍 ${store.distance}</span>
        <span>🕐 ${store.hours}</span>
        <span class="store-status ${store.open ? 'open' : 'closed'}">${store.open ? 'Open' : 'Closed'}</span>
        ${store.features.map(f => `<span>✓ ${f}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      // Close others
      items.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
}
