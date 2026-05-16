/* ============================================
   GreenBean Coffee — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initFooterAccordion();
  initMobileNav();
  initSmoothScroll();
});

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  // Check if already dismissed
  if (sessionStorage.getItem('cookieBannerDismissed')) {
    banner.setAttribute('aria-hidden', 'true');
    return;
  }

  const agreeBtn = banner.querySelector('.js-cookie-agree');
  const settingsBtn = banner.querySelector('.js-cookie-settings');

  agreeBtn?.addEventListener('click', () => {
    banner.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('cookieBannerDismissed', 'true');
  });

  settingsBtn?.addEventListener('click', () => {
    // Would open detailed cookie settings in production
    banner.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem('cookieBannerDismissed', 'true');
  });
}

/* --- Footer Accordion (Mobile) --- */
function initFooterAccordion() {
  const triggers = document.querySelectorAll('.footer-accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      trigger.setAttribute('aria-expanded', !isExpanded);
      content.setAttribute('aria-hidden', isExpanded);
    });
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.js-mobile-nav-toggle');
  const nav = document.querySelector('.js-mobile-nav');
  const overlay = document.querySelector('.js-nav-overlay');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.getAttribute('aria-hidden') === 'false';
    nav.setAttribute('aria-hidden', isOpen);
    overlay?.setAttribute('aria-hidden', isOpen);
    toggleBtn.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  overlay?.addEventListener('click', () => {
    nav.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('aria-hidden') === 'false') {
      nav.setAttribute('aria-hidden', 'true');
      overlay?.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* --- Tabs Helper --- */
window.GreenBeanTabs = {
  switchTab(tabList, tabId) {
    const parent = tabList.closest('[data-tabs]');
    if (!parent) return;

    // Update triggers
    parent.querySelectorAll('.tab-trigger').forEach(t => {
      t.setAttribute('aria-selected', t.getAttribute('data-tab') === tabId);
    });

    // Update content panels
    parent.querySelectorAll('.tab-content').forEach(c => {
      c.setAttribute('aria-hidden', c.getAttribute('data-tab') !== tabId);
    });
  }
};

/* --- Carousel Helper --- */
window.GreenBeanCarousel = {
  init(carouselEl) {
    const track = carouselEl.querySelector('.carousel-track');
    const prevBtn = carouselEl.querySelector('.carousel-btn-prev');
    const nextBtn = carouselEl.querySelector('.carousel-btn-next');
    if (!track || !prevBtn || !nextBtn) return;

    const items = track.children;
    let currentIndex = 0;

    function getVisibleCount() {
      const w = carouselEl.offsetWidth;
      if (w < 480) return 1;
      if (w < 768) return 2;
      if (w < 1024) return 3;
      return 4;
    }

    function update() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visible);
      const itemWidth = carouselEl.offsetWidth / visible;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

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
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visible);
      if (currentIndex < maxIndex) {
        currentIndex++;
        update();
      }
    });

    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentIndex = Math.min(currentIndex, Math.max(0, items.length - getVisibleCount()));
        update();
      }, 150);
    });

    update();
    return { update, next: () => { currentIndex++; update(); }, prev: () => { currentIndex--; update(); } };
  }
};

/* --- Toggle Group Helper --- */
window.GreenBeanToggle = {
  init(group) {
    const options = group.querySelectorAll('.toggle-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.setAttribute('aria-pressed', 'false'));
        opt.setAttribute('aria-pressed', 'true');
        group.dispatchEvent(new CustomEvent('toggle-change', {
          detail: { value: opt.getAttribute('data-value') }
        }));
      });
    });
  }
};
