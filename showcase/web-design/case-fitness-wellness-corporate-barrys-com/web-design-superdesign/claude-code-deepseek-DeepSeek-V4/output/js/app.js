/* ============================================
   RedRoom Fitness — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Nav Toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navCta = document.getElementById('navCta');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open', !isOpen);
      if (navCta) navCta.classList.toggle('open', !isOpen);
      navToggle.classList.toggle('active', !isOpen);
    });
  }

  /* --- Nav Scroll Effect --- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* --- Lifestyle Carousel --- */
  const carousel = document.getElementById('lifestyleCarousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let current = 0;
    const total = slides.length;

    // Create dots
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch/swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    });
  }

  /* --- Floor / Treadmill Toggle --- */
  const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const target = this.getAttribute('data-toggle-btn');
        document.querySelectorAll('[data-toggle-content]').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-toggle-content') === target);
        });
      });
    });
  }

  /* --- Instructor Location Filter --- */
  const filterBar = document.getElementById('filterBar');
  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const location = btn.getAttribute('data-filter');
      document.querySelectorAll('.instructor-card').forEach(card => {
        if (location === 'all' || card.getAttribute('data-location') === location) {
          card.classList.remove('fade-out');
          card.style.display = '';
        } else {
          card.classList.add('fade-out');
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
      // Show all cards that match
      if (location === 'all') {
        document.querySelectorAll('.instructor-card').forEach(c => {
          c.classList.remove('fade-out');
          c.style.display = '';
        });
      }
    });
  }

  /* --- FAQ Accordion (single-open) --- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* --- Newsletter Validation --- */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const errorEl = form.querySelector('.newsletter-error');
      const successEl = document.querySelector('.newsletter-form + .newsletter-success') ||
                        form.parentElement.querySelector('.newsletter-success');

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        input.classList.add('error');
        if (errorEl) { errorEl.textContent = 'Please enter your email address.'; errorEl.classList.add('visible'); }
        if (successEl) successEl.classList.remove('visible');
        return;
      }

      if (!emailRegex.test(email)) {
        input.classList.add('error');
        if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.classList.add('visible'); }
        if (successEl) successEl.classList.remove('visible');
        return;
      }

      input.classList.remove('error');
      if (errorEl) errorEl.classList.remove('visible');
      if (successEl) { successEl.textContent = 'You\'re in! Check your inbox for a confirmation.'; successEl.classList.add('visible'); }
      input.value = '';
    });

    const input = form.querySelector('input[type="email"]');
    if (input) {
      input.addEventListener('input', function () {
        input.classList.remove('error');
        const errorEl = form.querySelector('.newsletter-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    }
  });

  /* --- Country Selector --- */
  const countrySelect = document.getElementById('countrySelect');
  if (countrySelect) {
    countrySelect.addEventListener('change', function () {
      if (this.value) {
        console.log('Country selected:', this.value);
      }
    });
  }

  /* --- Scroll-triggered fade-up animations --- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

});
