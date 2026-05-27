/* ===== LearnForge — Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Navbar Scroll Effect ===== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ===== Mobile Nav Toggle ===== */
  const mobileToggle = document.querySelector('.navbar__mobile-toggle');
  const navLinks = document.querySelector('.navbar__links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ===== Hero Tab Switch ===== */
  initTabs('.hero__tab-btn', '.hero__tab-panel');

  /* ===== Why Choose Us Tabs ===== */
  initTabs('.why-choose__tab-btn', '.why-choose__panel');

  /* ===== FAQ Accordions ===== */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      // Collapse siblings
      item.parentElement.querySelectorAll('.faq__item.active').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  /* ===== Product Demo Accordion ===== */
  document.querySelectorAll('.product-demo__header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      item.parentElement.querySelectorAll('.product-demo__item.active').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  /* ===== Testimonial Carousels ===== */
  document.querySelectorAll('.testimonials__carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials__track');
    const prevBtn = carousel.querySelector('.testimonials__prev');
    const nextBtn = carousel.querySelector('.testimonials__next');
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = Math.min(currentIndex, maxIndex);
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 0;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      updateCarousel();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
  });

  /* ===== Scroll Animations ===== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

/* ===== Generic Tab Init ===== */
function initTabs(btnSelector, panelSelector) {
  const btns = document.querySelectorAll(btnSelector);
  const panels = document.querySelectorAll(panelSelector);
  if (!btns.length || !panels.length) return;

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panels[i].classList.add('active');
    });
  });
}
