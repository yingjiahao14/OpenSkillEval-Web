/* ===== LEARNFORGE INTERACTIONS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE NAV TOGGLE =====
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ===== HERO TAB SWITCH =====
  const heroTabs = document.querySelectorAll('.hero__tab');
  const heroPanels = document.querySelectorAll('.hero__preview-panel');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      heroTabs.forEach(t => t.classList.remove('active'));
      heroPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.hero__preview-panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ===== WHY CHOOSE US TABS =====
  const wcuTabs = document.querySelectorAll('.wcu__tab');
  const wcuPanels = document.querySelectorAll('.wcu__panel');
  wcuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      wcuTabs.forEach(t => t.classList.remove('active'));
      wcuPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.wcu__panel[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ===== TESTIMONIALS CAROUSEL =====
  document.querySelectorAll('.testimonials').forEach(carousel => {
    const track = carousel.querySelector('.testimonials__track');
    const slides = carousel.querySelectorAll('.testimonials__slide');
    const prevBtn = carousel.querySelector('.testimonials__btn--prev');
    const nextBtn = carousel.querySelector('.testimonials__btn--next');
    const dotsContainer = carousel.querySelector('.testimonials__dots');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonials__dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.testimonials__dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  });

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all in the same FAQ list
      const parent = item.closest('.faq__list');
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      }
      if (!isActive) item.classList.add('active');
    });
  });

  // ===== PRODUCT DEMO ACCORDION =====
  document.querySelectorAll('.product-demo').forEach(demo => {
    const toggle = demo.querySelector('.product-demo__toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      demo.classList.toggle('active');
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const animateElements = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  animateElements.forEach(el => observer.observe(el));

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
