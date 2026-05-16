// WellStream Platform — Shared JavaScript

// ============================================================
// NAVIGATION
// ============================================================
function initNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  dropdownTriggers.forEach(trigger => {
    const dropdown = trigger.closest('.nav-dropdown');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  });
}

// ============================================================
// TABS
// ============================================================
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '[data-tabs]');
  containers.forEach(container => {
    const buttons = container.querySelectorAll('[data-tab-btn]');
    const panels = container.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabBtn;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// ============================================================
// ACCORDION
// ============================================================
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isActive = header.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        const b = h.nextElementSibling;
        if (b) b.style.maxHeight = '0';
      });

      // Open clicked if not already active
      if (!isActive) {
        header.classList.add('active');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first by default
  const first = document.querySelector('.accordion-header');
  if (first) {
    first.classList.add('active');
    const body = first.nextElementSibling;
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// ============================================================
// CAROUSEL
// ============================================================
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto advance
  setInterval(() => goTo((current + 1) % total), 6000);
  goTo(0);
}

// ============================================================
// COOKIE BANNER
// ============================================================
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  const accepted = localStorage.getItem('ws_cookies');
  if (accepted) return;

  setTimeout(() => banner.classList.add('visible'), 800);

  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('ws_cookies', 'accepted');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  });

  banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('ws_cookies', 'declined');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  });
}

// ============================================================
// CIRCLE STATS ANIMATION
// ============================================================
function initCircleStats() {
  const circles = document.querySelectorAll('.circle-fill');
  circles.forEach(circle => {
    const percent = parseFloat(circle.dataset.percent || 0);
    const r = 70;
    const circumference = 2 * Math.PI * r;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const offset = circumference - (percent / 100) * circumference;
          circle.style.strokeDashoffset = offset;
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(circle);
  });
}

// ============================================================
// PROGRESS BARS ANIMATION
// ============================================================
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.width = target.dataset.width || '0%';
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ============================================================
// DEMO FORM VALIDATION
// ============================================================
function initDemoForm() {
  const form = document.getElementById('demoForm');
  if (!form) return;

  const successEl = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      field.classList.remove('invalid');
      if (!field.value.trim()) {
        field.classList.add('invalid');
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('invalid');
        valid = false;
      }
    });

    if (valid) {
      form.style.display = 'none';
      if (successEl) { successEl.classList.add('show'); }
    }
  });

  // Clear invalid on input
  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('invalid'));
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initCircleStats();
  initProgressBars();
  initDemoForm();
});
