/**
 * GreenBean Coffee — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCookieBanner();
  initFooterAccordion();
  initRedemptionTabs();
  initCarousels();
  initStoreLocator();
  initFAQ();
  initSmoothScroll();
});

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-open');
  });

  // Close on link click
  document.querySelectorAll('.nav-primary a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-menu-open');
    });
  });
}

/* ============================================
   Cookie Banner
   ============================================ */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Check if already dismissed
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    banner.classList.add('hidden');
    return;
  }

  const agreeBtn = banner.querySelector('.cookie-agree');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.classList.add('hidden');
    });
  }
}

/* ============================================
   Footer Accordion (Mobile)
   ============================================ */
function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-accordion-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const column = toggle.closest('.footer-column');
      const isOpen = column.classList.contains('open');

      // Close all others
      document.querySelectorAll('.footer-column').forEach(c => c.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        column.classList.add('open');
      }
    });
  });
}

/* ============================================
   Rewards Redemption Tabs
   ============================================ */
function initRedemptionTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const panels = document.querySelectorAll('.redemption-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.querySelector(`.redemption-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ============================================
   Carousels
   ============================================ */
function initCarousels() {
  document.querySelectorAll('.carousel-section').forEach(section => {
    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.carousel-prev');
    const nextBtn = section.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.carousel-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // gap
    const visibleCount = Math.floor(track.parentElement.offsetWidth / cardWidth);
    const maxIndex = Math.max(0, cards.length - visibleCount);

    function update() {
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        update();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        update();
      }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
      const newVisible = Math.floor(track.parentElement.offsetWidth / cardWidth);
      const newMax = Math.max(0, cards.length - newVisible);
      if (currentIndex > newMax) currentIndex = newMax;
      update();
    });

    update();
  });
}

/* ============================================
   Store Locator
   ============================================ */
function initStoreLocator() {
  // Order type toggle
  const orderToggle = document.querySelector('.order-type-toggle');
  if (orderToggle) {
    orderToggle.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        orderToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // In a real app, this would refresh store results
        console.log('Order type:', btn.dataset.type);
      });
    });
  }

  // Filter panel toggle
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // Search suggestions (placeholder)
  const searchInput = document.querySelector('.search-input-wrapper input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      // In a real app, this would fetch suggestions
      console.log('Search:', val);
    });
  }

  // Result item click
  document.querySelectorAll('.result-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.result-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ============================================
   FAQ Accordion
   ============================================ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
