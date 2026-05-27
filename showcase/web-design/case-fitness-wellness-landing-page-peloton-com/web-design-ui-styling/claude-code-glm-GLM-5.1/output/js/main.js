/* WellStream Platform — Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initDemoForm();
  initStatAnimations();
});

/* ── Navigation ───────────────────────────────────────── */
function initNavigation() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
  // Close mobile nav on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ── Tabs ──────────────────────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.tabs-wrapper').forEach(wrapper => {
    const btns = wrapper.querySelectorAll('.tab-btn');
    const panels = wrapper.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        wrapper.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  });
}

/* ── Accordion ────────────────────────────────────────── */
function initAccordion() {
  document.querySelectorAll('.accordion').forEach(acc => {
    const items = acc.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');
      const inner = item.querySelector('.accordion-body-inner');
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        items.forEach(i => {
          i.classList.remove('open');
          i.querySelector('.accordion-body').style.maxHeight = '0';
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = inner.scrollHeight + 'px';
        }
      });
    });
  });
}

/* ── Testimonial Carousel ─────────────────────────────── */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const cards = carousel.querySelectorAll('.carousel-card');
  let current = 0;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance
  let interval = setInterval(() => {
    goTo((current + 1) % cards.length);
  }, 5000);

  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => {
    interval = setInterval(() => goTo((current + 1) % cards.length), 5000);
  });
}

/* ── Cookie Banner ────────────────────────────────────── */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('cookieConsent')) {
    banner.remove();
    return;
  }
  setTimeout(() => banner.classList.add('visible'), 800);

  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  });
  banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  });
}

/* ── Demo Form Validation ─────────────────────────────── */
function initDemoForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const required = form.querySelectorAll('[data-required]');
    required.forEach(field => {
      const error = field.parentElement.querySelector('.form-error');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (error) error.classList.add('visible');
        valid = false;
      } else {
        field.classList.remove('error');
        if (error) error.classList.remove('visible');
      }
    });
    // Email validation
    const email = form.querySelector('[name="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      const error = email.parentElement.querySelector('.form-error');
      if (error) { error.textContent = 'Please enter a valid email address'; error.classList.add('visible'); }
      valid = false;
    }
    if (valid) {
      const btn = form.querySelector('.form-submit');
      btn.innerHTML = '<span class="btn-cta btn-cta-green w-full" style="width:100%;display:block;text-align:center;">Submitted Successfully</span>';
      btn.disabled = true;
    }
  });

  // Clear errors on input
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const error = field.parentElement.querySelector('.form-error');
      if (error) error.classList.remove('visible');
    });
  });
}

/* ── Stat Circle Animations ───────────────────────────── */
function initStatAnimations() {
  const stats = document.querySelectorAll('.stat-circle');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const fill = circle.querySelector('svg circle');
        if (fill) {
          const offset = fill.dataset.offsetFinal || '0';
          fill.style.strokeDashoffset = offset;
        }
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.3 });

  stats.forEach(s => observer.observe(s));
}
