/* GreenBean Coffee — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initFooterAccordion();
  initMobileMenu();
  initCarousels();
  initTabs();
  initStoreLocator();
});

/* Cookie Banner */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const agreeBtn = document.querySelector('[data-cookie-agree]');

  if (!banner || localStorage.getItem('cookieConsent')) {
    if (banner) banner.classList.remove('show');
    return;
  }

  banner.classList.add('show');

  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      banner.classList.remove('show');
    });
  }
}

/* Footer Accordion */
function initFooterAccordion() {
  const accordions = document.querySelectorAll('.footer-accordion');

  accordions.forEach(accordion => {
    const header = accordion.querySelector('.footer-accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        accordion.classList.toggle('active');
      });
    }
  });
}

/* Mobile Menu */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
}

/* Carousels */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = track.offsetWidth * 0.5;

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

/* Tabs */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const parent = container.closest('.tabs-container');
    const contents = parent ? parent.querySelectorAll('.tab-content') : [];

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(content => {
          content.classList.remove('active');
          if (content.dataset.tab === target) {
            content.classList.add('active');
          }
        });
      });
    });
  });
}

/* Store Locator */
function initStoreLocator() {
  const orderTypeToggle = document.querySelector('.toggle-group');
  const searchInput = document.querySelector('[data-store-search]');
  const filterBtn = document.querySelector('[data-filter-btn]');
  const filterPanel = document.querySelector('.filter-panel');

  if (orderTypeToggle) {
    orderTypeToggle.addEventListener('click', e => {
      const btn = e.target.closest('.toggle-btn');
      if (btn) {
        orderTypeToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('show');
    });
  }

  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = searchInput.value.toLowerCase();
        const results = document.querySelectorAll('.store-card');
        results.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? '' : 'none';
        });
      }, 300);
    });
  }
}
