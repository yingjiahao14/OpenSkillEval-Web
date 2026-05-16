document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.textContent = nav.classList.contains('open') ? '\u2715' : '\u2630';
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuToggle.textContent = '\u2630';
      }
    });
  }

  // Tabs
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const btns = tabGroup.querySelectorAll('.tab-btn');
    const panels = tabGroup.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = tabGroup.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // Testimonial carousel
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel) {
    const track = carousel.querySelector('.testimonials-track');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const slideCount = dots.length;

    function goToSlide(idx) {
      currentSlide = idx;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

    setInterval(() => {
      goToSlide((currentSlide + 1) % slideCount);
    }, 6000);
  }

  // Stat circle animation on scroll
  const statCircles = document.querySelectorAll('.stat-circle .fill');
  if (statCircles.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pct = entry.target.dataset.percent;
          const circumference = 2 * Math.PI * parseFloat(entry.target.getAttribute('r'));
          entry.target.style.strokeDasharray = circumference;
          entry.target.style.strokeDashoffset = circumference - (circumference * pct / 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statCircles.forEach(c => observer.observe(c));
  }

  // Progress bar animation
  const progressBars = document.querySelectorAll('.progress-fill');
  if (progressBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    progressBars.forEach(b => { b.style.width = '0%'; observer.observe(b); });
  }

  // Cookie banner
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    const stored = localStorage.getItem('wellstream-cookie-consent');
    if (stored) {
      cookieBanner.classList.add('hidden');
    }
    cookieBanner.querySelector('.cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('wellstream-cookie-consent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
    cookieBanner.querySelector('.cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('wellstream-cookie-consent', 'declined');
      cookieBanner.classList.add('hidden');
    });
  }

  // Demo form validation
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      demoForm.querySelectorAll('.form-group[data-required]').forEach(group => {
        const input = group.querySelector('input, select, textarea');
        group.classList.remove('has-error');
        if (!input.value.trim()) {
          group.classList.add('has-error');
          valid = false;
        }
        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            group.classList.add('has-error');
            valid = false;
          }
        }
      });
      if (valid) {
        demoForm.style.display = 'none';
        document.querySelector('.form-success')?.classList.add('active');
      }
    });

    demoForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group')?.classList.remove('has-error');
      });
    });
  }

  // Scroll animations
  const animateEls = document.querySelectorAll('.card, .benefit-card, .etl-item, .security-card, .split-cta-card');
  if (animateEls.length) {
    const aObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          aObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animateEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      aObserver.observe(el);
    });
  }

});
