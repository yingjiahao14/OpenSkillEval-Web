/* Shared JavaScript for RedRoom Fitness */

// Mobile menu toggle
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// Newsletter form validation
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const feedback = form.closest('.newsletter-inner').querySelector('.newsletter-feedback');
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        feedback.textContent = 'Please enter your email address.';
        feedback.className = 'newsletter-feedback error';
      } else if (!emailRegex.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'newsletter-feedback error';
      } else {
        feedback.textContent = 'Thanks for subscribing! Check your inbox soon.';
        feedback.className = 'newsletter-feedback success';
        input.value = '';
      }
    });
  });
}

// Scroll reveal animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// Initialize all shared components
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNewsletter();
  initScrollReveal();
});
