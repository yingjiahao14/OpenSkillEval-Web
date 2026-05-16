/* shared.js — RedRoom Fitness */
(function () {
  'use strict';

  // ── Nav scroll effect ──
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.background = window.scrollY > 40
        ? 'rgba(10,10,10,0.98)'
        : 'rgba(10,10,10,0.95)';
    }, { passive: true });
  }

  // ── Mobile nav toggle ──
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // ── Newsletter form validation ──
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      const msg = document.getElementById('newsletter-msg');
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      input.classList.remove('error');
      msg.className = 'newsletter-msg';

      if (!email) {
        input.classList.add('error');
        msg.textContent = 'Please enter your email address.';
        msg.classList.add('error');
        return;
      }
      if (!valid) {
        input.classList.add('error');
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.add('error');
        return;
      }

      input.value = '';
      msg.textContent = '✓ You\'re in! Check your inbox for a welcome email.';
      msg.classList.add('success');
    });
  }

  // ── Mark active nav link ──
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && href !== '#' && currentFile === href) {
      a.classList.add('active');
    }
  });

  // ── Scroll-reveal animations ──
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { observer.observe(el); });
  }
})();
