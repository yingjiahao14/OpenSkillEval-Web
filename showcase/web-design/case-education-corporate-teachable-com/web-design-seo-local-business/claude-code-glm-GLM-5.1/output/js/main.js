/* ===== LearnForge Interactive Components ===== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Animations ---
  const animateElements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  animateElements.forEach(el => observer.observe(el));

  // --- Mobile Nav Toggle ---
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
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

  // --- Hero Tab Switch ---
  const heroTabs = document.querySelectorAll('.hero__tab');
  const heroPanels = document.querySelectorAll('.hero__preview-panel');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => t.classList.remove('active'));
      heroPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // --- Generic Tabs (Why Choose Us, etc.) ---
  document.querySelectorAll('.tabs').forEach(tabsContainer => {
    const btns = tabsContainer.querySelectorAll('.tabs__btn');
    const parentSection = tabsContainer.closest('.section') || tabsContainer.parentElement;
    const panels = parentSection.querySelectorAll('.tabs__panel');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  });

  // --- Testimonial Carousels ---
  document.querySelectorAll('.testimonials').forEach(carousel => {
    const track = carousel.querySelector('.testimonials__track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.testimonials__btn--prev');
    const nextBtn = carousel.querySelector('.testimonials__btn--next');
    const dotsContainer = carousel.querySelector('.testimonials__dots');
    let current = 0;
    const total = cards.length;

    // Create dots
    if (dotsContainer && total > 0) {
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
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 6s
    let autoplay = setInterval(() => goTo(current + 1), 6000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 6000);
    });

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });
  });

  // --- FAQ Accordions ---
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const inner = item.querySelector('.faq-item__answer-inner');
      const isActive = item.classList.contains('active');

      // Close siblings in same list
      const parent = item.parentElement;
      parent.querySelectorAll('.faq-item').forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('active');
          sibling.querySelector('.faq-item__answer').style.maxHeight = '0';
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // --- Product Demo Accordion ---
  document.querySelectorAll('.demo-accordion__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const accordion = btn.closest('.demo-accordion');
      const content = accordion.querySelector('.demo-accordion__content');
      const inner = accordion.querySelector('.demo-accordion__content-inner');
      const isActive = accordion.classList.contains('active');

      if (isActive) {
        accordion.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        accordion.classList.add('active');
        content.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      } else {
        nav.style.boxShadow = '';
      }
    });
  }

});
