/* ========================================
   LearnForge — Global JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTabSwitchers();
  initCarousels();
  initAccordions();
  initScrollAnimations();
  initDemoAccordion();
});

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.nav-mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (icon) {
      const isOpen = menu.classList.contains('open');
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      lucide.createIcons();
    }
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  });
}

/* ---- Tab Switchers ---- */
function initTabSwitchers() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  });
}

/* ---- Carousels ---- */
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dots = carousel.querySelectorAll('[data-carousel-dot]');
    const cards = track ? track.children : [];
    if (!track || cards.length === 0) return;

    let current = 0;
    const total = cards.length;

    function getVisibleCount() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function update() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, total - visible);
      current = Math.min(current, maxIndex);

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 24; // 1.5rem
      const offset = current * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        current = Math.max(0, current - 1);
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const visible = getVisibleCount();
        current = Math.min(total - visible, current + 1);
        update();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        current = i;
        update();
      });
    });

    window.addEventListener('resize', update);
    update();
  });
}

/* ---- Accordions ---- */
function initAccordions() {
  document.querySelectorAll('[data-accordion]').forEach(accordion => {
    const items = accordion.querySelectorAll('[data-accordion-item]');

    items.forEach(item => {
      const question = item.querySelector('[data-accordion-question]');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close others if accordion is exclusive
        if (accordion.dataset.accordion === 'exclusive') {
          items.forEach(i => i.classList.remove('open'));
        }

        item.classList.toggle('open', !isOpen);
      });
    });
  });
}

/* ---- Demo Accordion ---- */
function initDemoAccordion() {
  const demo = document.querySelector('[data-demo-accordion]');
  if (!demo) return;

  const header = demo.querySelector('[data-demo-header]');
  if (!header) return;

  header.addEventListener('click', () => {
    demo.classList.toggle('open');
    const icon = header.querySelector('i');
    if (icon) {
      const isOpen = demo.classList.contains('open');
      icon.setAttribute('data-lucide', isOpen ? 'chevron-up' : 'chevron-down');
      lucide.createIcons();
    }
  });
}

/* ---- Scroll Animations ---- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
