/**
 * GreenBean Coffee — Global JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCookieBanner();
  initFooterAccordion();
  initTabs();
  initCarousels();
  initStoreLocator();
  initFAQ();
});

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });
}

/* ============================================
   Cookie Banner
   ============================================ */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Check if already dismissed
  if (localStorage.getItem('greenbean-cookies-accepted')) {
    banner.classList.add('hidden');
    return;
  }

  const agreeBtn = banner.querySelector('.cookie-agree');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('greenbean-cookies-accepted', 'true');
      banner.classList.add('hidden');
    });
  }
}

/* ============================================
   Footer Accordion (Mobile)
   ============================================ */
function initFooterAccordion() {
  const columns = document.querySelectorAll('.footer-column');
  const isMobile = () => window.innerWidth < 768;

  columns.forEach(col => {
    const heading = col.querySelector('h4');
    if (!heading) return;

    heading.addEventListener('click', () => {
      if (!isMobile()) return;
      col.classList.toggle('open');
    });
  });
}

/* ============================================
   Tabs
   ============================================ */
function initTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');

  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = group.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ============================================
   Carousels
   ============================================ */
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    if (!track) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    let currentIndex = 0;
    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    function getSlidesPerView() {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    }

    function update() {
      const spv = getSlidesPerView();
      const gapPercent = 1.5; // gap as % of slide width approximation
      const slideWidth = 100 / spv;
      const offset = currentIndex * (slideWidth + gapPercent / spv);
      track.style.transform = `translateX(-${offset}%)`;

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= Math.max(0, slides.length - spv);

      if (dotsContainer) {
        const dots = dotsContainer.children;
        Array.from(dots).forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          update();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const spv = getSlidesPerView();
        if (currentIndex < slides.length - spv) {
          currentIndex++;
          update();
        }
      });
    }

    // Create dots if container exists
    if (dotsContainer) {
      const spv = getSlidesPerView();
      const dotCount = Math.max(0, slides.length - spv + 1);
      dotsContainer.innerHTML = '';
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          update();
        });
        dotsContainer.appendChild(dot);
      }
    }

    window.addEventListener('resize', () => {
      const spv = getSlidesPerView();
      currentIndex = Math.min(currentIndex, Math.max(0, slides.length - spv));
      update();
    });

    update();
  });
}

/* ============================================
   Store Locator
   ============================================ */
function initStoreLocator() {
  const filterBtn = document.querySelector('[data-filter-toggle]');
  const filterPanel = document.querySelector('[data-filter-panel]');
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  const orderToggles = document.querySelectorAll('[data-order-type]');
  orderToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      orderToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // In a real app, this would refresh store results
      const type = btn.dataset.orderType;
      console.log('Order type switched to:', type);
    });
  });

  const searchInput = document.querySelector('[data-store-search]');
  const suggestions = document.querySelector('[data-search-suggestions]');
  if (searchInput && suggestions) {
    const demoLocations = [
      'Seattle, WA',
      'San Francisco, CA',
      'Los Angeles, CA',
      'Portland, OR',
      'New York, NY',
      'Chicago, IL',
      'Austin, TX',
      'Denver, CO'
    ];

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      if (val.length < 2) {
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
        return;
      }

      const matches = demoLocations.filter(loc => loc.toLowerCase().includes(val));
      if (matches.length > 0) {
        suggestions.innerHTML = matches.map(loc =>
          `<div class="suggestion-item" style="padding:0.5rem 1rem;cursor:pointer;font-size:0.9375rem;color:var(--color-gray-700);">${loc}</div>`
        ).join('');
        suggestions.style.display = 'block';

        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
          item.addEventListener('click', () => {
            searchInput.value = item.textContent;
            suggestions.style.display = 'none';
          });
        });
      } else {
        suggestions.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = 'none';
      }
    });
  }
}

/* ============================================
   FAQ Accordion
   ============================================ */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close others (optional accordion behavior)
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
