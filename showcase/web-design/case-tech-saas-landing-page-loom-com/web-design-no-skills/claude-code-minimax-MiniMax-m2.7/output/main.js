// Cookie consent
const COOKIE_KEY = 'clipcast_cookies';
let cookiePreferences = {
  accepted: false,
  categories: {
    necessary: true,
    functional: false,
    performance: false,
    targeting: false
  }
};

function showCookieBanner() {
  const saved = localStorage.getItem(COOKIE_KEY);
  if (!saved) {
    document.getElementById('cookieBanner').classList.add('show');
  }
}

function hideCookieBanner() {
  document.getElementById('cookieBanner').classList.remove('show');
}

function acceptAllCookies() {
  cookiePreferences.accepted = true;
  cookiePreferences.categories.functional = true;
  cookiePreferences.categories.performance = true;
  cookiePreferences.categories.targeting = true;
  localStorage.setItem(COOKIE_KEY, JSON.stringify(cookiePreferences));
  hideCookieBanner();
}

function rejectAllCookies() {
  cookiePreferences.accepted = true;
  localStorage.setItem(COOKIE_KEY, JSON.stringify(cookiePreferences));
  hideCookieBanner();
}

function openCookieModal() {
  document.getElementById('cookieModal').classList.add('show');
  // Sync toggles with current preferences
  const prefs = JSON.parse(localStorage.getItem(COOKIE_KEY) || JSON.stringify(cookiePreferences));
  document.getElementById('toggleFunctional').checked = prefs.categories.functional;
  document.getElementById('togglePerformance').checked = prefs.categories.performance;
  document.getElementById('toggleTargeting').checked = prefs.categories.targeting;
}

function closeCookieModal() {
  document.getElementById('cookieModal').classList.remove('show');
}

function saveCookiePreferences() {
  cookiePreferences.categories.functional = document.getElementById('toggleFunctional').checked;
  cookiePreferences.categories.performance = document.getElementById('togglePerformance').checked;
  cookiePreferences.categories.targeting = document.getElementById('toggleTargeting').checked;
  cookiePreferences.accepted = true;
  localStorage.setItem(COOKIE_KEY, JSON.stringify(cookiePreferences));
  closeCookieModal();
  hideCookieBanner();
}

// Pricing interactions
let billingPeriod = 'monthly';
let teamSize = 10;

function initPricing() {
  updatePricingCards();

  const toggleBtns = document.querySelectorAll('.pricing-toggle button');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      billingPeriod = btn.dataset.period;
      updatePricingCards();
    });
  });

  const slider = document.getElementById('teamSizeSlider');
  if (slider) {
    slider.addEventListener('input', () => {
      teamSize = parseInt(slider.value);
      document.getElementById('teamSizeValue').textContent = teamSize;
      updatePricingCards();
    });
  }
}

function updatePricingCards() {
  const prices = {
    starter: 0,
    business: billingPeriod === 'annual' ? 15 : 18,
    businessPro: billingPeriod === 'annual' ? 20 : 24
  };

  document.querySelectorAll('[data-price]').forEach(el => {
    const plan = el.dataset.price;
    const price = prices[plan];
    el.textContent = price === 0 ? '$0' : `$${price}`;
  });

  document.querySelectorAll('[data-price-period]').forEach(el => {
    el.textContent = billingPeriod === 'annual' ? '/user/mo\n(billed annually)' : '/user/mo';
  });

  // Update save badge visibility
  const saveBadges = document.querySelectorAll('.save-badge');
  saveBadges.forEach(badge => {
    badge.style.display = billingPeriod === 'annual' ? 'inline' : 'none';
  });
}

// FAQ accordion
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
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

// Comparison table expand
function initComparisonTable() {
  document.querySelectorAll('.pricing-see-all').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.pricing-card');
      const tableId = section.dataset.table;
      const table = document.getElementById(tableId);
      if (table) {
        table.classList.toggle('expanded');
        btn.textContent = table.classList.contains('expanded') ? 'Show less' : 'See all features';
      }
    });
  });
}

// Scroll reveal
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initPricing();
  initFaq();
  initComparisonTable();
  initScrollReveal();
  showCookieBanner();
});
