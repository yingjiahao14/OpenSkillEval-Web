/* ===== NAVIGATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('active');
      }
    });
  });

  // ===== TABS =====
  document.querySelectorAll('.tab-bar').forEach(bar => {
    const btns = bar.querySelectorAll('.tab-btn');
    const container = bar.closest('.tabs-container');
    if (!container) return;
    const panels = container.querySelectorAll('.tab-panel');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // ===== ACCORDION =====
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const inner = body.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('open');
        ai.querySelector('.accordion-body').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // ===== TESTIMONIAL CAROUSEL =====
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;

  function goToSlide(idx) {
    const slides = carouselTrack ? carouselTrack.querySelectorAll('.carousel-slide') : [];
    if (!slides.length) return;
    currentSlide = idx;
    carouselTrack.style.transform = `translateX(-${idx * 100}%)`;
    carouselDots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  carouselDots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-advance carousel every 6s
  if (carouselTrack) {
    const totalSlides = carouselTrack.querySelectorAll('.carousel-slide').length;
    if (totalSlides > 1) {
      setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
      }, 6000);
    }
  }

  // ===== DEMO FORM VALIDATION =====
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const required = demoForm.querySelectorAll('[required]');
      required.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
        if (field.type === 'email' && field.value.trim()) {
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(field.value.trim())) {
            field.classList.add('error');
            valid = false;
          }
        }
      });
      if (valid) {
        demoForm.style.display = 'none';
        const success = document.querySelector('.form-success');
        if (success) success.style.display = 'block';
      }
    });
  }

  // ===== COOKIE BANNER =====
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 800);
  }
  document.querySelectorAll('.cookie-accept, .cookie-decline').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.classList.contains('cookie-accept') ? 'accepted' : 'declined';
      localStorage.setItem('cookieConsent', action);
      cookieBanner.classList.remove('visible');
    });
  });

  // ===== ANIMATE STATS ON SCROLL =====
  const statCircles = document.querySelectorAll('.stat-circle .progress');
  if (statCircles.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const offset = circle.dataset.offset;
          circle.style.strokeDashoffset = offset;
          observer.unobserve(circle);
        }
      });
    }, { threshold: 0.3 });

    statCircles.forEach(circle => {
      const circumference = circle.dataset.circumference;
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
      observer.observe(circle);
    });
  }

  // ===== ANIMATE TIMELINE BARS ON SCROLL =====
  const timelineBars = document.querySelectorAll('.timeline-bar .fill');
  if (timelineBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    timelineBars.forEach(bar => {
      const targetWidth = bar.dataset.width;
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }
});
