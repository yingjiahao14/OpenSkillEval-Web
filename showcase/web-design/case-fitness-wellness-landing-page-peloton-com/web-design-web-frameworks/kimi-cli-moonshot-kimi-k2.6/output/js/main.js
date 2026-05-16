/**
 * WellStream Platform — Main JavaScript
 */

(function () {
  'use strict';

  /* ============================================
     Mobile Menu
     ============================================ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('ri-menu-line');
        icon.classList.toggle('ri-close-line');
      }
    });
  }

  /* ============================================
     Tabs
     ============================================ */
  function initTabs(container) {
    if (!container) return;
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  document.querySelectorAll('.tabs-container').forEach(initTabs);

  /* ============================================
     Accordion
     ============================================ */
  function initAccordion(container) {
    if (!container) return;
    const items = container.querySelectorAll('.accordion-item');

    items.forEach((item) => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all if you want single-open behavior
        items.forEach((i) => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  document.querySelectorAll('.accordion').forEach(initAccordion);

  /* ============================================
     Testimonial Carousel
     ============================================ */
  function initCarousel(container) {
    if (!container) return;
    const track = container.querySelector('.testimonials-track');
    const dots = container.querySelectorAll('.testimonial-dot');
    if (!track) return;

    let current = 0;
    const total = dots.length || track.children.length;

    function goTo(index) {
      current = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-play
    setInterval(() => {
      goTo((current + 1) % total);
    }, 6000);
  }

  document.querySelectorAll('.testimonials-carousel').forEach(initCarousel);

  /* ============================================
     Cookie Banner
     ============================================ */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (cookieBanner) {
    const consent = localStorage.getItem('wellstream_cookie_consent');
    if (!consent) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1000);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_consent', 'accepted');
        cookieBanner.classList.remove('visible');
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_consent', 'declined');
        cookieBanner.classList.remove('visible');
      });
    }
  }

  /* ============================================
     Demo Form Validation
     ============================================ */
  const demoForm = document.getElementById('demoForm');

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const requiredFields = demoForm.querySelectorAll('[data-required]');
      requiredFields.forEach((field) => {
        const errorEl = field.parentElement.querySelector('.form-error');
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
          if (errorEl) errorEl.classList.add('visible');
        } else {
          field.classList.remove('error');
          if (errorEl) errorEl.classList.remove('visible');
        }
      });

      // Email validation
      const emailField = demoForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorEl = emailField.parentElement.querySelector('.form-error');
        if (!emailRe.test(emailField.value.trim())) {
          valid = false;
          emailField.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid email address.';
            errorEl.classList.add('visible');
          }
        }
      }

      if (valid) {
        demoForm.innerHTML = `
          <div class="form-success">
            <i class="ri-checkbox-circle-line"></i>
            <h3>Thank You!</h3>
            <p>Your demo request has been submitted. Our team will contact you shortly to schedule your personalized demonstration.</p>
          </div>
        `;
      }
    });

    // Clear errors on input
    demoForm.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const errorEl = field.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  /* ============================================
     Header Scroll Effect
     ============================================ */
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.background = 'rgba(13, 27, 42, 0.98)';
      } else {
        header.style.background = 'rgba(13, 27, 42, 0.92)';
      }
    });
  }

  /* ============================================
     Animate Stats on Scroll
     ============================================ */
  const statCircles = document.querySelectorAll('.stat-circle');
  if (statCircles.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const circle = entry.target;
            const progress = circle.dataset.progress;
            if (progress) {
              circle.style.setProperty('--progress', progress + '%');
            }
            observer.unobserve(circle);
          }
        });
      },
      { threshold: 0.5 }
    );
    statCircles.forEach((c) => observer.observe(c));
  }

  /* ============================================
     Animate Timeline Bars on Scroll
     ============================================ */
  const timelineBars = document.querySelectorAll('.timeline-bar-fill');
  if (timelineBars.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.dataset.width;
            if (width) {
              setTimeout(() => {
                bar.style.width = width;
              }, 200);
            }
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.5 }
    );
    timelineBars.forEach((b) => observer.observe(b));
  }
})();
