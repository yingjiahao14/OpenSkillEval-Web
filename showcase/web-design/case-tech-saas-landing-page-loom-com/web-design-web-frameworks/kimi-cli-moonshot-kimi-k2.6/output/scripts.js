// ============================================
// ClipCast — Global Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initFAQ();
  initPricingToggle();
  initTeamSlider();
  initComparisonExpand();
  initMobileNav();
});

// Cookie Banner
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  if (!banner) return;

  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    banner.classList.add('show');
  }

  document.getElementById('acceptCookies')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'all');
    banner.classList.remove('show');
  });

  document.getElementById('rejectCookies')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'essential');
    banner.classList.remove('show');
  });

  document.getElementById('manageCookies')?.addEventListener('click', () => {
    modal?.classList.add('show');
  });

  document.getElementById('closeCookieModal')?.addEventListener('click', () => {
    modal?.classList.remove('show');
  });

  document.getElementById('saveCookiePrefs')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'custom');
    modal?.classList.remove('show');
    banner.classList.remove('show');
  });

  // Toggle switches in modal
  document.querySelectorAll('.cookie-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// Pricing Toggle
function initPricingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;

  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  let isAnnual = false;

  function updatePrices() {
    const prices = document.querySelectorAll('.plan-price');
    prices.forEach(el => {
      const monthly = el.dataset.monthly;
      const annual = el.dataset.annual;
      if (!monthly || !annual) return;
      el.textContent = isAnnual ? annual : monthly;
    });
  }

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('active', isAnnual);
    monthlyLabel?.classList.toggle('active', !isAnnual);
    annualLabel?.classList.toggle('active', isAnnual);
    updatePrices();
  });
}

// Team Size Slider
function initTeamSlider() {
  const slider = document.getElementById('teamSlider');
  const display = document.getElementById('teamSizeDisplay');
  if (!slider || !display) return;

  slider.addEventListener('input', () => {
    display.textContent = slider.value;
    updateTeamPricing(parseInt(slider.value));
  });
}

function updateTeamPricing(size) {
  const cards = document.querySelectorAll('.pricing-card');
  cards.forEach(card => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });

  // Highlight recommended plan based on team size
  let recommendedIndex = 0;
  if (size <= 3) recommendedIndex = 0;
  else if (size <= 15) recommendedIndex = 1;
  else if (size <= 50) recommendedIndex = 2;
  else recommendedIndex = 3;

  const target = cards[recommendedIndex];
  if (target) {
    target.style.transform = 'scale(1.02)';
    target.style.boxShadow = '0 12px 40px rgba(24,104,219,0.15)';
  }
}

// Comparison Table Expand
function initComparisonExpand() {
  document.querySelectorAll('.expand-features').forEach(btn => {
    btn.addEventListener('click', () => {
      const table = document.getElementById('comparisonTable');
      if (table) {
        table.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Mobile nav
function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const menu = document.getElementById('mobileNavMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

// Carousel
function initCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (!track) return;

  let index = 0;
  const items = track.children;
  const itemWidth = items[0]?.offsetWidth + 24 || 344;

  function update() {
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  prevBtn?.addEventListener('click', () => {
    if (index > 0) { index--; update(); }
  });

  nextBtn?.addEventListener('click', () => {
    if (index < items.length - 1) { index++; update(); }
  });
}

// Expose for inline onclick
window.initCarousel = initCarousel;
