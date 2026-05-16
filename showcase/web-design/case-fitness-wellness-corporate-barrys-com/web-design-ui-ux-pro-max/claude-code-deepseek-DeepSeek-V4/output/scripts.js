/**
 * RedRoom Fitness — Shared JavaScript
 * Mobile nav toggle + Newsletter validation
 */
(function() {
  'use strict';

  // ── Mobile Navigation Toggle ────────────────────────────────
  var navMenuBtn = document.getElementById('navMenuBtn');
  var navLinks = document.getElementById('navLinks');
  if (navMenuBtn && navLinks) {
    navMenuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navMenuBtn.classList.toggle('active');
      navMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navMenuBtn.classList.remove('active');
        navMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Newsletter Validation ───────────────────────────────────
  var form = document.getElementById('newsletterForm');
  if (!form) return;
  var input = document.getElementById('newsletterEmail');
  var feedback = document.getElementById('newsletterFeedback');
  var success = document.getElementById('newsletterSuccess');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  input.addEventListener('blur', function () {
    var val = input.value.trim();
    if (val && !isValidEmail(val)) {
      input.classList.add('error');
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'newsletter-feedback error';
    } else if (val && isValidEmail(val)) {
      input.classList.remove('error');
      feedback.textContent = '';
      feedback.className = 'newsletter-feedback';
    }
  });

  input.addEventListener('input', function () {
    if (input.classList.contains('error')) {
      input.classList.remove('error');
      feedback.textContent = '';
      feedback.className = 'newsletter-feedback';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var val = input.value.trim();
    if (!val) {
      input.classList.add('error');
      feedback.textContent = 'Email address is required.';
      feedback.className = 'newsletter-feedback error';
      return;
    }
    if (!isValidEmail(val)) {
      input.classList.add('error');
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'newsletter-feedback error';
      return;
    }
    input.classList.add('success');
    feedback.textContent = '';
    feedback.className = 'newsletter-feedback';
    form.style.display = 'none';
    success.style.display = 'block';
  });
})();
