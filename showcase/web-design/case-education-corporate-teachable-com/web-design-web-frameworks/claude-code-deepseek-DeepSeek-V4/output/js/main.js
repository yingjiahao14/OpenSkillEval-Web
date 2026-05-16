/* ===== LearnForge Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollAnimations();
  initAccordions();
  initCarousels();
  initHeroTabs();
  initWhyTabs();
  initDemoAccordion();
});

/* ===== Navigation ===== */
function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!nav || !toggle || !mobileNav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && (href === 'index.html' || href === './'))) {
      link.classList.add('active');
    }
  });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ===== Accordions (FAQ) ===== */
function initAccordions() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all in the same list
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(sibling => sibling.classList.remove('active'));
      }
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ===== Carousels ===== */
function initCarousels() {
  document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || !cards.length) return;

    let current = 0;
    const total = cards.length;

    function update() {
      track.style.transform = `translateX(-${current * 100}%)`;

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        current = (current - 1 + total) % total;
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        current = (current + 1) % total;
        update();
      });
    }

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.addEventListener('click', () => {
          current = i;
          update();
        });
      });
    }

    // Auto-rotate
    let interval = setInterval(() => {
      current = (current + 1) % total;
      update();
    }, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        current = (current + 1) % total;
        update();
      }, 5000);
    });

    update();
  });
}

/* ===== Hero Tab Switch (Homepage) ===== */
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const panels = document.querySelectorAll('.preview-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  });
}

/* ===== Why Choose Us Tabs (Homepage) ===== */
function initWhyTabs() {
  const tabs = document.querySelectorAll('.why-tab-btn');
  const contents = document.querySelectorAll('.why-tab-content');

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      contents.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-content') === target);
      });
    });
  });
}

/* ===== Product Demo Accordion (Online Courses page) ===== */
function initDemoAccordion() {
  const toggle = document.querySelector('.demo-toggle');
  const content = document.querySelector('.demo-content');

  if (!toggle || !content) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    content.classList.toggle('active');
  });
}
