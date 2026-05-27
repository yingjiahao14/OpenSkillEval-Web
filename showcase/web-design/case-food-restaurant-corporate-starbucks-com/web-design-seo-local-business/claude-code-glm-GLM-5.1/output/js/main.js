/* ============================================
   GreenBean Coffee — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initMobileNav();
  initFooterAccordion();
  initRewardsTabs();
  initCarousels();
  initStoreLocator();
  initFAQ();
});

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  if (localStorage.getItem('cookieConsent') === 'agreed') {
    banner.remove();
    return;
  }

  setTimeout(() => banner.classList.add('visible'), 800);

  banner.querySelector('.cookie-agree')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'agreed');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  });

  banner.querySelector('.cookie-settings')?.addEventListener('click', () => {
    alert('Cookie settings would open here.');
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Footer Accordion (mobile) --- */
function initFooterAccordion() {
  const headings = document.querySelectorAll('.footer-accordion-heading');
  if (!headings.length) return;

  headings.forEach(heading => {
    heading.addEventListener('click', () => {
      const content = heading.nextElementSibling;
      const isOpen = heading.classList.contains('open');

      headings.forEach(h => {
        h.classList.remove('open');
        h.nextElementSibling?.classList.remove('open');
      });

      if (!isOpen) {
        heading.classList.add('open');
        content?.classList.add('open');
      }
    });
  });
}

/* --- Rewards Tabs --- */
function initRewardsTabs() {
  const tabContainer = document.querySelector('.redemption-tabs');
  if (!tabContainer) return;

  const buttons = tabContainer.querySelectorAll('.tab-btn');
  const panels = tabContainer.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      tabContainer.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
    });
  });
}

/* --- Gift Card Carousels --- */
function initCarousels() {
  document.querySelectorAll('.carousel-section').forEach(section => {
    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.carousel-prev');
    const nextBtn = section.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    let position = 0;
    const card = track.querySelector('.gift-card');
    if (!card) return;

    const cardWidth = card.offsetWidth + 16; // card width + gap
    const visibleWidth = track.parentElement.offsetWidth;
    const totalWidth = track.scrollWidth;
    const maxScroll = Math.max(0, totalWidth - visibleWidth);

    function updateCarousel() {
      track.style.transform = `translateX(-${position}px)`;
      prevBtn.style.opacity = position <= 0 ? '0.4' : '1';
      nextBtn.style.opacity = position >= maxScroll ? '0.4' : '1';
    }

    prevBtn.addEventListener('click', () => {
      position = Math.max(0, position - cardWidth * 2);
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      position = Math.min(maxScroll, position + cardWidth * 2);
      updateCarousel();
    });

    updateCarousel();
  });
}

/* --- Store Locator --- */
function initStoreLocator() {
  const searchInput = document.querySelector('.search-input');
  const suggestions = document.querySelector('.search-suggestions');
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  const orderTypeBtns = document.querySelectorAll('.order-type-btn');

  // Search suggestions
  if (searchInput && suggestions) {
    const sampleSuggestions = [
      'New York, NY',
      'Los Angeles, CA',
      'Chicago, IL',
      'San Francisco, CA',
      'Seattle, WA',
      'Portland, OR',
      'Austin, TX',
      'Denver, CO'
    ];

    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      if (val.length < 2) {
        suggestions.classList.remove('visible');
        return;
      }

      const matches = sampleSuggestions.filter(s => s.toLowerCase().includes(val));
      if (matches.length) {
        suggestions.innerHTML = matches.map(m => `<li>${m}</li>`).join('');
        suggestions.classList.add('visible');
      } else {
        suggestions.classList.remove('visible');
      }
    });

    suggestions.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        searchInput.value = e.target.textContent;
        suggestions.classList.remove('visible');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-input-wrapper')) {
        suggestions.classList.remove('visible');
      }
    });
  }

  // Filter panel toggle
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
      filterBtn.classList.toggle('active');
    });

    // Filter chips
    filterPanel.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
      });
    });
  }

  // Order type toggle
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* --- FAQ Accordion --- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });
}
