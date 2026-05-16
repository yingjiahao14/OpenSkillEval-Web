/* ========================================
   WellStream Platform — Global Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initFormValidation();
  initMobileNav();
  initStatRings();
  initTimelineBars();
});

/* ---------- Tabs ---------- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panels = tabContainer.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = tabContainer.querySelector(`.tab-panel[data-tab="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ---------- Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close all siblings if single-open behavior desired
      const parent = item.closest('.accordion');
      if (parent && parent.dataset.singleOpen !== 'false') {
        parent.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      }

      item.classList.toggle('active', !isActive);
    });
  });
}

/* ---------- Carousel ---------- */
function initCarousel() {
  document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    if (!track || !slides.length) return;

    let current = 0;

    function goTo(index) {
      current = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-advance every 6s
    setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 6000);
  });
}

/* ---------- Cookie Banner ---------- */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('cookieConsent')) {
    banner.classList.remove('show');
    return;
  }

  // Show after a short delay
  setTimeout(() => banner.classList.add('show'), 800);

  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.classList.remove('show');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      banner.classList.remove('show');
    });
  }
}

/* ---------- Form Validation ---------- */
function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[data-required]').forEach(field => {
        const group = field.closest('.form-group');
        const value = field.value.trim();
        if (!value) {
          valid = false;
          group.classList.add('error');
        } else {
          group.classList.remove('error');
        }

        // Email validation
        if (field.type === 'email' && value) {
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(value)) {
            valid = false;
            group.classList.add('error');
          }
        }
      });

      if (valid) {
        const success = form.querySelector('.form-success');
        if (success) {
          form.querySelectorAll('.form-grid, .form-group, .btn[type="submit"]').forEach(el => el.style.display = 'none');
          success.style.display = 'block';
        }
      }
    });
  });
}

/* ---------- Mobile Nav ---------- */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
  });
}

/* ---------- Stat Rings Animation ---------- */
function initStatRings() {
  const rings = document.querySelectorAll('.stat-ring[data-percent]');
  if (!rings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = parseInt(ring.dataset.percent, 10);
        const fill = ring.querySelector('.stat-ring-fill');
        if (fill) {
          const circumference = 377;
          const offset = circumference - (percent / 100) * circumference;
          fill.style.strokeDashoffset = offset;
        }
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.5 });

  rings.forEach(ring => observer.observe(ring));
}

/* ---------- Timeline Bars Animation ---------- */
function initTimelineBars() {
  const bars = document.querySelectorAll('.timeline-bar-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}
