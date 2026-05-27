/* ============================================
   ClipCast — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initFAQAccordion();
  initPricingToggle();
  initTeamSizeSlider();
  initMobileNav();
  initComparisonExpand();
});

/* ============================================
   Cookie Banner
   ============================================ */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal');
  if (!banner) return;

  const consent = localStorage.getItem('cookie-consent');
  if (!consent) {
    setTimeout(() => banner.classList.add('show'), 800);
  }

  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const manageBtn = document.getElementById('cookie-manage');
  const modalClose = document.getElementById('cookie-modal-close');
  const modalSave = document.getElementById('cookie-modal-save');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'all');
      banner.classList.remove('show');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'essential');
      banner.classList.remove('show');
    });
  }

  if (manageBtn) {
    manageBtn.addEventListener('click', () => {
      if (modal) modal.classList.add('show');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  if (modalSave) {
    modalSave.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'custom');
      modal.classList.remove('show');
      banner.classList.remove('show');
    });
  }

  // Toggle switches in modal
  document.querySelectorAll('.cookie-category .toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');
    });
  });

  // Close modal on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }
}

/* ============================================
   FAQ Accordion
   ============================================ */
function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all others (optional accordion behavior)
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ============================================
   Pricing Toggle (Monthly / Annual)
   ============================================ */
function initPricingToggle() {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;

  const monthlyBtn = document.getElementById('btn-monthly');
  const annualBtn = document.getElementById('btn-annual');

  const prices = {
    starter: { monthly: '$0', annual: '$0' },
    business: { monthly: '$18', annual: '$15' },
    businessAi: { monthly: '$24', annual: '$20' },
    enterprise: { monthly: 'Contact Sales', annual: 'Contact Sales' }
  };

  function updatePrices(isAnnual) {
    const starter = document.getElementById('price-starter');
    const business = document.getElementById('price-business');
    const businessAi = document.getElementById('price-business-ai');
    const enterprise = document.getElementById('price-enterprise');

    if (starter) starter.textContent = prices.starter[isAnnual ? 'annual' : 'monthly'];
    if (business) business.textContent = prices.business[isAnnual ? 'annual' : 'monthly'];
    if (businessAi) businessAi.textContent = prices.businessAi[isAnnual ? 'annual' : 'monthly'];
    if (enterprise) enterprise.textContent = prices.enterprise[isAnnual ? 'annual' : 'monthly'];

    const suffixes = document.querySelectorAll('.price-suffix');
    suffixes.forEach(s => {
      s.style.display = (isAnnual && s.dataset.plan !== 'enterprise') ? 'inline' : 'none';
    });
  }

  if (monthlyBtn) {
    monthlyBtn.addEventListener('click', () => {
      monthlyBtn.classList.add('active');
      annualBtn.classList.remove('active');
      updatePrices(false);
    });
  }

  if (annualBtn) {
    annualBtn.addEventListener('click', () => {
      annualBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
      updatePrices(true);
    });
  }
}

/* ============================================
   Team Size Slider
   ============================================ */
function initTeamSizeSlider() {
  const slider = document.getElementById('team-size-slider');
  const display = document.getElementById('team-size-value');
  if (!slider || !display) return;

  slider.addEventListener('input', () => {
    const val = parseInt(slider.value);
    display.textContent = val === 1 ? '1 person' : `${val} people`;

    // Highlight recommended plan based on size
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach(c => c.style.transform = '');

    if (val <= 3 && cards[0]) {
      cards[0].style.transform = 'translateY(-4px)';
    } else if (val <= 10 && cards[1]) {
      cards[1].style.transform = 'translateY(-4px)';
    } else if (val <= 50 && cards[2]) {
      cards[2].style.transform = 'translateY(-4px)';
    } else if (cards[3]) {
      cards[3].style.transform = 'translateY(-4px)';
    }
  });
}

/* ============================================
   Mobile Navigation
   ============================================ */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('show');
  });
}

/* ============================================
   Comparison Table Expand
   ============================================ */
function initComparisonExpand() {
  document.querySelectorAll('[data-expand-plan]').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.expandPlan;
      const rows = document.querySelectorAll(`[data-plan-row="${plan}"]`);
      rows.forEach(row => {
        row.classList.toggle('hidden');
      });
      btn.textContent = rows[0]?.classList.contains('hidden') ? 'Show all features' : 'Hide features';
    });
  });
}
