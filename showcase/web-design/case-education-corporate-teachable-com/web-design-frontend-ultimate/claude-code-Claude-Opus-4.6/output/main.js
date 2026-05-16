document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileOverlay = document.querySelector('.nav-mobile-overlay');
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileOverlay.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Tabs (generic)
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = group.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // Hero tabs
  document.querySelectorAll('.hero-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-hero-tab');
      document.querySelectorAll('.hero-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.hero-preview-content').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`[data-hero-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // Why Choose Us tabs
  document.querySelectorAll('.why-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-why');
      document.querySelectorAll('.why-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.why-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`[data-why-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // Carousel
  document.querySelectorAll('.testimonials-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
    const nextBtn = carousel.parentElement.querySelector('.carousel-next');
    const dotsContainer = carousel.parentElement.querySelector('.carousel-dots');
    let current = 0;
    const total = cards.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    if (dotsContainer) {
      cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    // Auto-advance
    let autoplay = setInterval(() => goTo(current + 1), 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Nav scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }
});
