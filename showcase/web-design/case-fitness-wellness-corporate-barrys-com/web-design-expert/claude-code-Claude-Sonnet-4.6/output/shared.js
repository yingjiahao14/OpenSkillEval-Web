/* ══════════════════════════════════════════
   RedRoom Fitness — Shared JavaScript
   ══════════════════════════════════════════ */

(function() {
  'use strict';

  // ── Nav scroll effect ──
  const nav = document.getElementById('mainNav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      const spans = navToggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Active nav link ──
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#' && currentFile.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });

  // ── Newsletter form ──
  const form = document.getElementById('newsletterForm');
  if (form) {
    const emailInput = document.getElementById('emailInput');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function showError(msg) {
      emailInput.classList.add('error');
      formError.textContent = msg;
      formError.classList.add('visible');
      formSuccess.classList.remove('visible');
    }

    function clearError() {
      emailInput.classList.remove('error');
      formError.classList.remove('visible');
    }

    emailInput.addEventListener('input', clearError);

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const val = emailInput.value.trim();
      if (!val) {
        showError('Please enter your email address.');
        return;
      }
      if (!validateEmail(val)) {
        showError('Please enter a valid email address (e.g. you@example.com).');
        return;
      }
      clearError();
      emailInput.value = '';
      formSuccess.textContent = "You're in! Check your inbox for a confirmation.";
      formSuccess.classList.add('visible');
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    });
  }

  // ── Country selector ──
  const countrySelector = document.getElementById('countrySelector');
  const countryDropdown = document.getElementById('countryDropdown');
  if (countrySelector && countryDropdown) {
    countrySelector.addEventListener('click', e => {
      e.stopPropagation();
      const open = countryDropdown.classList.toggle('open');
      countrySelector.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', () => {
      countryDropdown.classList.remove('open');
      countrySelector.setAttribute('aria-expanded', 'false');
    });
    countryDropdown.querySelectorAll('.country-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.getElementById('countryFlag').textContent = opt.dataset.flag;
        document.getElementById('countryName').textContent = opt.dataset.name;
        countryDropdown.querySelectorAll('.country-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        countryDropdown.classList.remove('open');
      });
    });
  }

})();
