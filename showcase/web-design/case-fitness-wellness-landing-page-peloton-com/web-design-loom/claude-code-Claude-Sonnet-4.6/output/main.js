// WellStream Platform — Global JS

// ── Navigation ──────────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('nav-mobile-open');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('nav-mobile-open'));
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Tabs ──────────────────────────────────────────
function initTabs(containerSelector) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

// ── Accordion ─────────────────────────────────────
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  // Open first by default
  const first = document.querySelector('.accordion-item');
  if (first) first.classList.add('open');
}

// ── Carousel ──────────────────────────────────────
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.testimonial-card');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let current = 0;
  let interval;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetInterval(); });
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => goTo(current + 1), 5000);
  }

  goTo(0);
  resetInterval();
}

// ── Cookie Banner ─────────────────────────────────
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  if (localStorage.getItem('ws_cookie_pref')) {
    banner.style.display = 'none';
    return;
  }

  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('ws_cookie_pref', 'accepted');
    banner.style.display = 'none';
  });

  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    localStorage.setItem('ws_cookie_pref', 'declined');
    banner.style.display = 'none';
  });
}

// ── Circular Stats (Animated SVG) ─────────────────
function initStats() {
  const fills = document.querySelectorAll('.stat-circle .fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = parseFloat(el.getAttribute('data-pct') || 0);
        const r = 54;
        const circ = 2 * Math.PI * r;
        const offset = circ * (1 - pct / 100);
        el.style.strokeDasharray = circ;
        el.style.strokeDashoffset = offset;
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(el => {
    const r = 54;
    const circ = 2 * Math.PI * r;
    el.style.strokeDasharray = circ;
    el.style.strokeDashoffset = circ;
    observer.observe(el);
  });
}

// ── Progress Bars ─────────────────────────────────
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') || '0%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ── Demo Form ─────────────────────────────────────
function initDemoForm() {
  const form = document.getElementById('demoForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('has-error');
        field.classList.add('error');
        valid = false;
      } else {
        group.classList.remove('has-error');
        field.classList.remove('error');
      }
    });

    // Email validation
    const email = form.querySelector('[type="email"]');
    if (email && email.value) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      if (!emailValid) {
        email.closest('.form-group').classList.add('has-error');
        email.classList.add('error');
        valid = false;
      }
    }

    if (valid) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      field.closest('.form-group')?.classList.remove('has-error');
    });
  });
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTabs('.tabs-container');
  initAccordion();
  initCarousel();
  initCookieBanner();
  initStats();
  initProgressBars();
  initDemoForm();
});
