/* ============================================================
   WellStream Platform — Shared JavaScript
   Navigation, Tabs, Accordion, Carousel, Forms, Cookie Banner
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation ---
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  // Mobile menu toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Dropdown toggle (desktop)
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Close other dropdowns
        dropdowns.forEach(d => {
          if (d !== dropdown) d.classList.remove('open');
        });
        dropdown.classList.toggle('open');
      });
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  // --- Tab System ---
  function initTabs(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      const tabButtons = container.querySelectorAll('.tab-btn, .tab-pill');
      const tabPanels = container.querySelectorAll('.tab-panel');

      if (!tabButtons.length || !tabPanels.length) return;

      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab');

          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.getAttribute('data-tab') === targetId) {
              panel.classList.add('active');
            }
          });
        });
      });
    });
  }

  // Initialize all tab interfaces
  initTabs('.tabs-container');
  initTabs('.tabs-pills-container');

  // --- Accordion ---
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    const triggers = accordion.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        // Close all in this accordion
        accordion.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-content').style.maxHeight = '0';
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });

  // --- Carousel ---
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoPlayInterval;

    if (!track || !slides.length) return;

    function goTo(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        resetAutoPlay();
      });
    });

    // Auto-play
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        goTo((currentIndex + 1) % slides.length);
      }, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    if (slides.length > 1) {
      startAutoPlay();
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => {
      if (slides.length > 1) startAutoPlay();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < slides.length - 1) {
          goTo(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          goTo(currentIndex - 1);
        }
        resetAutoPlay();
      }
    });
  });

  // --- Demo Form Validation ---
  const demoForm = document.querySelector('.demo-form');
  if (demoForm) {
    const formSuccess = document.querySelector('.form-success');
    const formCard = document.querySelector('.form-card');

    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fields = demoForm.querySelectorAll('[required]');

      fields.forEach(field => {
        field.classList.remove('error');
        const errorMsg = field.parentElement.querySelector('.form-error-msg');

        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else if (field.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.classList.add('error');
            isValid = false;
          }
        }
      });

      if (isValid) {
        if (formCard) formCard.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('active');
      } else {
        // Scroll to first error
        const firstError = demoForm.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });

    // Clear error on input
    demoForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
      });
    });
  }

  // --- Cookie Banner ---
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    // Check if already dismissed
    if (localStorage.getItem('cookie-preference')) {
      cookieBanner.style.display = 'none';
    } else {
      const acceptBtn = cookieBanner.querySelector('.cookie-accept');
      const declineBtn = cookieBanner.querySelector('.cookie-decline');

      const dismiss = (preference) => {
        localStorage.setItem('cookie-preference', preference);
        cookieBanner.classList.add('hidden');
        setTimeout(() => {
          cookieBanner.style.display = 'none';
        }, 300);
      };

      if (acceptBtn) acceptBtn.addEventListener('click', () => dismiss('accepted'));
      if (declineBtn) declineBtn.addEventListener('click', () => dismiss('declined'));
    }
  }

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

});
