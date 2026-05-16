document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Hero tabs
  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroScreens = document.querySelectorAll('.hero-preview-screen');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      heroTabs.forEach(t => t.classList.remove('active'));
      heroScreens.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      const screen = document.getElementById(target);
      if (screen) screen.classList.add('active');
    });
  });

  // Why-choose tabs
  const whyTabs = document.querySelectorAll('.why-tab');
  const whyPanels = document.querySelectorAll('.why-panel');
  whyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;
      whyTabs.forEach(t => t.classList.remove('active'));
      whyPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // FAQ Accordions
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Testimonial Carousels
  document.querySelectorAll('.testimonials-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = 1;

    function getCardsPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      const gap = 24;
      const cardWidth = cards[0].offsetWidth + gap;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      if (dotsContainer) {
        const dotCount = maxIndex + 1;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < dotCount; i++) {
          const dot = document.createElement('button');
          dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
          dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
          dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); });
          dotsContainer.appendChild(dot);
        }
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateCarousel(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { const maxIndex = Math.max(0, cards.length - cardsPerView); if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); } });

    updateCarousel();
    window.addEventListener('resize', () => { updateCarousel(); }, { passive: true });
  });

  // Scroll animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
  }
});
