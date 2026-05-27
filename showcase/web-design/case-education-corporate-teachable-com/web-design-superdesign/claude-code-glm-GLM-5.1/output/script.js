/* ===== LearnForge Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileNav();
  initHeroTabs();
  initFeatureTabs();
  initTestimonialCarousels();
  initFAQAccordions();
  initDemoAccordion();
  initScrollReveal();
});

/* Sticky Nav Shadow */
function initStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* Mobile Nav Toggle */
function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* Hero Tab Switcher */
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const frames = document.querySelectorAll('.hero-preview-frame');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      frames.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      const frame = document.querySelector(`.hero-preview-frame[data-frame="${target}"]`);
      if (frame) frame.classList.add('active');
    });
  });
}

/* Why Choose Us / Feature Tabs */
function initFeatureTabs() {
  const tabs = document.querySelectorAll('.feature-tab');
  const panels = document.querySelectorAll('.feature-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.feature-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

/* Testimonial Carousel */
function initTestimonialCarousels() {
  document.querySelectorAll('.testimonials-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || !cards.length) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, cards.length - cardsPerView);

    function getCardsPerView() {
      const w = window.innerWidth;
      if (w <= 540) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function updateCarousel() {
      const gap = 16;
      const cardWidth = cards[0].offsetWidth + gap;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); });
        dotsContainer.appendChild(dot);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    });

    createDots();
    updateCarousel();

    window.addEventListener('resize', () => {
      cardsPerView = getCardsPerView();
      maxIndex = Math.max(0, cards.length - cardsPerView);
      currentIndex = Math.min(currentIndex, maxIndex);
      createDots();
      updateCarousel();
    });
  });
}

/* FAQ Accordion */
function initFAQAccordions() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Close all siblings
      const parent = item.parentElement;
      parent.querySelectorAll('.faq-item').forEach(sibling => {
        sibling.classList.remove('active');
        const sibAnswer = sibling.querySelector('.faq-answer');
        if (sibAnswer) sibAnswer.style.maxHeight = '0';
      });
      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* Product Demo Accordion */
function initDemoAccordion() {
  document.querySelectorAll('.demo-accordion').forEach(accordion => {
    const trigger = accordion.querySelector('.demo-accordion-trigger');
    const content = accordion.querySelector('.demo-accordion-content');
    if (!trigger || !content) return;
    trigger.addEventListener('click', () => {
      const isOpen = accordion.classList.contains('active');
      accordion.classList.toggle('active');
      content.style.maxHeight = isOpen ? '0' : content.scrollHeight + 'px';
    });
  });
}

/* Scroll Reveal */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}
