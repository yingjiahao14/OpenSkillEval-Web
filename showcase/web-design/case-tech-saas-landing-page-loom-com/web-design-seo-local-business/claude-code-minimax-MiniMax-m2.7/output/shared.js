// ClipCast Shared JavaScript

// Cookie Consent
const COOKIE_KEY = 'clipcast_cookies';

function showCookieBanner() {
  if (!getCookie(COOKIE_KEY)) {
    document.getElementById('cookieBanner').classList.add('show');
  }
}

function hideCookieBanner() {
  document.getElementById('cookieBanner').classList.remove('show');
}

function acceptCookies() {
  setCookie(COOKIE_KEY, 'accepted', 365);
  hideCookieBanner();
}

function rejectCookies() {
  setCookie(COOKIE_KEY, 'rejected', 365);
  hideCookieBanner();
}

function showCookiePreferences() {
  document.getElementById('cookieModal').classList.add('show');
}

function hideCookiePreferences() {
  document.getElementById('cookieModal').classList.remove('show');
}

function toggleCookieCategory(el) {
  el.classList.toggle('active');
}

function getCookie(key) {
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    const [k, v] = c.trim().split('=');
    if (k === key) return v;
  }
  return null;
}

function setCookie(key, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${value};expires=${d.toUTCString()};path=/`;
}

// Pricing Billing Toggle
function initBillingToggle() {
  const toggle = document.getElementById('billingToggle');
  const prices = document.querySelectorAll('[data-monthly]');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const isAnnual = toggle.classList.contains('active');

    document.querySelectorAll('.billing-monthly').forEach(el => {
      el.style.display = isAnnual ? 'none' : 'inline';
    });
    document.querySelectorAll('.billing-annual').forEach(el => {
      el.style.display = isAnnual ? 'inline' : 'none';
    });
  });
}

// Team Size Slider
function initTeamSlider() {
  const slider = document.getElementById('teamSlider');
  const valueDisplay = document.getElementById('teamSizeValue');

  if (!slider || !valueDisplay) return;

  slider.addEventListener('input', () => {
    valueDisplay.textContent = slider.value;
    updatePricingForTeamSize(slider.value);
  });
}

function updatePricingForTeamSize(size) {
  const cards = document.querySelectorAll('.pricing-card');
  size = parseInt(size);

  cards.forEach(card => {
    const minSize = card.dataset.minTeam ? parseInt(card.dataset.minTeam) : 0;
    const maxSize = card.dataset.maxTeam ? parseInt(card.dataset.maxTeam) : Infinity;

    if (size >= minSize && size <= maxSize) {
      card.style.transform = 'scale(1.02)';
      card.style.borderColor = 'var(--primary)';
    } else {
      card.style.transform = '';
      card.style.borderColor = '';
    }
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(i => i.classList.remove('open'));

        // Toggle current
        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

// Comparison Table Expand
function initComparisonExpand() {
  const expandBtns = document.querySelectorAll('.expand-features-btn');

  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tableId = btn.dataset.table;
      const table = document.getElementById(tableId);
      if (table) {
        table.classList.toggle('expanded');
        btn.textContent = table.classList.contains('expanded')
          ? 'Show less'
          : 'See all features';
      }
    });
  });
}

// Mobile Navigation
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Form validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !validateEmail(emailInput.value)) {
        emailInput.style.borderColor = 'var(--accent)';
        return;
      }
      // Would proceed to next step in real implementation
      alert('This is a demo. In production, this would proceed to the next step.');
    });
  });
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  showCookieBanner();
  initBillingToggle();
  initTeamSlider();
  initFaqAccordion();
  initComparisonExpand();
  initMobileNav();
  initSmoothScroll();
  initFormValidation();
});
