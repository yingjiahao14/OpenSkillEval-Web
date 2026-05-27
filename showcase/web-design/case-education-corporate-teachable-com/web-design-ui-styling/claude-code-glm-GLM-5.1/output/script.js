/* LearnForge — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initCarousels();
  initFAQAccordions();
  initDemoAccordions();
  initTabSwitches();
});

/* ── Navigation ──────────────────────────────────────── */
function initNavigation() {
  const nav = document.querySelector('.nav-fixed');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
}

/* ── Scroll Animations ───────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ── Testimonial Carousels ───────────────────────────── */
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dotsContainer = container.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();

    function getSlidesPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, slides.length - slidesPerView);
    }

    function updateCarousel() {
      const slideWidth = 100 / slidesPerView;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      updateDots();
      if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
      if (nextBtn) nextBtn.style.opacity = currentIndex >= getMaxIndex() ? '0.4' : '1';
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      const totalDots = getMaxIndex() + 1;
      dots.forEach((dot, i) => {
        dot.style.display = i < totalDots ? '' : 'none';
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    // Create dots
    if (dotsContainer) {
      const totalDots = slides.length;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.addEventListener('click', () => { currentIndex = Math.min(i, getMaxIndex()); updateCarousel(); });
        dotsContainer.appendChild(dot);
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateCarousel(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < getMaxIndex()) { currentIndex++; updateCarousel(); } });

    window.addEventListener('resize', () => {
      slidesPerView = getSlidesPerView();
      currentIndex = Math.min(currentIndex, getMaxIndex());
      updateCarousel();
    });

    updateCarousel();
  });
}

/* ── FAQ Accordion ───────────────────────────────────── */
function initFAQAccordions() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all siblings
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(sibling => {
          sibling.classList.remove('active');
          const sibAnswer = sibling.querySelector('.faq-answer');
          if (sibAnswer) sibAnswer.style.maxHeight = '0';
        });
      }

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ── Demo Accordion ──────────────────────────────────── */
function initDemoAccordions() {
  document.querySelectorAll('.demo-accordion').forEach(acc => {
    const header = acc.querySelector('.demo-accordion-header');
    const body = acc.querySelector('.demo-accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isActive = acc.classList.contains('active');
      acc.classList.toggle('active');
      body.style.maxHeight = isActive ? '0' : body.scrollHeight + 'px';
    });
  });
}

/* ── Tab Switches ────────────────────────────────────── */
function initTabSwitches() {
  // Hero tab switch
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const groupName = group.dataset.tabGroup;
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll(`[data-tab-panel-group="${groupName}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(panel => {
          const panelTabs = panel.querySelectorAll('[data-tab-panel]');
          panelTabs.forEach(p => {
            p.classList.toggle('active', p.dataset.tabPanel === tabId);
          });
        });
      });
    });
  });

  // Why Choose Us tabs
  document.querySelectorAll('.wcu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.wcuTab;

      document.querySelectorAll('.wcu-tab').forEach(t => {
        t.classList.remove('active');
        t.style.background = '#f5f5f5';
        t.style.color = '#666';
      });
      tab.classList.add('active');
      tab.style.background = '#000';
      tab.style.color = '#E6FF32';

      document.querySelectorAll('.wcu-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.wcuPanel === category);
      });
    });
  });
}
