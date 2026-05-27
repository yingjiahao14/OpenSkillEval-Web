/* ========================================
   ClipCast — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPricingToggle();
  initTeamSlider();
  initFaqAccordion();
  initCookieConsent();
  initScrollAnimations();
  initComparisonTable();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    toggle.classList.toggle('active');
  });
}

/* Pricing Toggle (Monthly / Annual) */
function initPricingToggle() {
  const toggleSwitch = document.querySelector('.pricing-toggle .toggle-switch');
  const monthlyLabel = document.querySelector('.toggle-label[data-plan="monthly"]');
  const annualLabel = document.querySelector('.toggle-label[data-plan="annual"]');
  const priceEls = document.querySelectorAll('[data-monthly]');

  if (!toggleSwitch) return;

  let isAnnual = false;

  function updatePrices() {
    isAnnual = !isAnnual;
    toggleSwitch.classList.toggle('active', isAnnual);
    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

    priceEls.forEach(el => {
      const monthly = el.dataset.monthly;
      const annual = el.dataset.annual;
      if (monthly && annual) {
        el.textContent = isAnnual ? annual : monthly;
      }
    });
  }

  toggleSwitch.addEventListener('click', updatePrices);
  if (monthlyLabel) monthlyLabel.addEventListener('click', () => { if (isAnnual) updatePrices(); });
  if (annualLabel) annualLabel.addEventListener('click', () => { if (!isAnnual) updatePrices(); });
}

/* Team Size Slider */
function initTeamSlider() {
  const slider = document.querySelector('.slider-input');
  const valueEl = document.querySelector('.slider-value');
  const teamPriceEls = document.querySelectorAll('[data-team-price]');

  if (!slider) return;

  function updateSlider() {
    const val = parseInt(slider.value, 10);
    if (valueEl) valueEl.textContent = val + (val === 1 ? ' person' : ' people');

    teamPriceEls.forEach(el => {
      const base = parseFloat(el.dataset.teamPrice);
      const isAnnual = document.querySelector('.pricing-toggle .toggle-switch')?.classList.contains('active');
      const multiplier = isAnnual ? 0.83 : 1;
      const total = Math.round(base * val * multiplier);
      el.textContent = '$' + total + '/mo';
    });
  }

  slider.addEventListener('input', updateSlider);
  updateSlider();
}

/* FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* Cookie Consent */
function initCookieConsent() {
  const banner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-accept');
  const rejectBtn = document.querySelector('.cookie-reject');
  const manageBtn = document.querySelector('.cookie-manage');
  const modal = document.querySelector('.cookie-modal');
  const closeModalBtn = document.querySelector('.cookie-modal-close');
  const savePrefsBtn = document.querySelector('.cookie-save-prefs');
  const categoryToggles = document.querySelectorAll('.cookie-category .toggle-btn');

  if (!banner) return;

  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    setTimeout(() => banner.classList.add('show'), 800);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', JSON.stringify({ all: true, date: new Date().toISOString() }));
      banner.classList.remove('show');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', JSON.stringify({ all: false, date: new Date().toISOString() }));
      banner.classList.remove('show');
    });
  }

  if (manageBtn && modal) {
    manageBtn.addEventListener('click', () => {
      modal.classList.add('show');
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  if (savePrefsBtn && modal) {
    savePrefsBtn.addEventListener('click', () => {
      const prefs = {};
      categoryToggles.forEach(t => {
        prefs[t.dataset.category] = t.classList.contains('active');
      });
      localStorage.setItem('cookieConsent', JSON.stringify({ preferences: prefs, date: new Date().toISOString() }));
      modal.classList.remove('show');
      banner.classList.remove('show');
    });
  }

  categoryToggles.forEach(t => {
    t.addEventListener('click', () => {
      t.classList.toggle('active');
    });
  });

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }
}

/* Scroll Animations */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.feature-card, .use-case-card, .testimonial-card, .pricing-card, .stat-card, .benefit-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/* Comparison Table Expand */
function initComparisonTable() {
  const expandBtns = document.querySelectorAll('.expand-features');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) {
        target.classList.toggle('expanded');
        btn.textContent = target.classList.contains('expanded') ? 'Show less' : 'See all features';
      }
    });
  });
}
