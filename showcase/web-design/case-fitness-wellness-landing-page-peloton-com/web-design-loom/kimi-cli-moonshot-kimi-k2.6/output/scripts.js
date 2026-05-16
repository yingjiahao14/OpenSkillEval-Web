/* ============================================
   WellStream Platform — Global Scripts
   ============================================ */

(function () {
  'use strict';

  /* ---------- Mobile Nav ---------- */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMain = document.querySelector('.nav-main');

  if (mobileBtn && navMain) {
    mobileBtn.addEventListener('click', () => {
      navMain.classList.toggle('open');
      const expanded = navMain.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', expanded);
    });

    document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          toggle.closest('.nav-dropdown').classList.toggle('open');
        }
      });
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs(container) {
    if (!container) return;
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(initTabs);

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Optional: close others
      item.parentElement.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
      header.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Testimonial Carousel ---------- */
  function initCarousel(carousel) {
    if (!carousel) return;
    const track = carousel.querySelector('.testimonial-track');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const cards = carousel.querySelectorAll('.testimonial-card');
    let current = 0;

    function goTo(index) {
      current = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-advance
    setInterval(() => {
      goTo((current + 1) % cards.length);
    }, 6000);
  }

  document.querySelectorAll('.testimonial-carousel').forEach(initCarousel);

  /* ---------- Stat Circles Animation ---------- */
  function animateStatCircles() {
    document.querySelectorAll('.stat-circle-fill').forEach(circle => {
      const offset = circle.dataset.offset;
      if (offset) {
        circle.style.strokeDashoffset = offset;
      }
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStatCircles();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    animateStatCircles();
  }

  /* ---------- Progress Bars Animation ---------- */
  function animateProgressBars() {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const width = bar.dataset.width;
      if (width) bar.style.width = width;
    });
  }

  const timelineSection = document.querySelector('.timeline-section');
  if (timelineSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(timelineSection);
  }

  /* ---------- Cookie Banner ---------- */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      cookieBanner.classList.add('hidden');
    }

    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.add('hidden');
    });

    document.getElementById('cookieDecline')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.add('hidden');
    });
  }

  /* ---------- Form Validation ---------- */
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const requiredFields = demoForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          valid = false;
          group.classList.add('error');
        } else {
          group.classList.remove('error');
        }
      });

      const emailField = demoForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const group = emailField.closest('.form-group');
        if (!emailRegex.test(emailField.value.trim())) {
          valid = false;
          group.classList.add('error');
          group.querySelector('.form-error').textContent = 'Please enter a valid email address.';
        }
      }

      if (valid) {
        const btn = demoForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Submitted!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          demoForm.reset();
        }, 3000);
      }
    });

    demoForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-group')?.classList.remove('error');
      });
    });
  }

  /* ---------- Header Scroll Effect ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
})();
