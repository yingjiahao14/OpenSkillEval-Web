/* ============================================
   StayQuest — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousel();
  initAccordion();
  initMobileNav();
  initScrollAnimations();
});

/* ---------- Tab Switching ---------- */
function initTabs() {
  document.querySelectorAll('.tab-bar').forEach(bar => {
    const btns = bar.querySelectorAll('.tab-btn');
    const container = bar.closest('.tab-container') || bar.parentElement;
    const panels = container.querySelectorAll('.tab-content');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.tab === target);
        });
      });
    });
  });
}

/* ---------- Carousel ---------- */
function initCarousel() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');

    if (!track) return;

    const scrollAmount = 300;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });
}

/* ---------- Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion').forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items in this accordion
        items.forEach(i => {
          i.classList.remove('open');
          const c = i.querySelector('.accordion-content');
          if (c) c.style.maxHeight = '0';
        });

        // Open clicked item if it was closed
        if (!isOpen) {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav .close-btn');

  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  }

  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove('open');
    }
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ---------- Search Form Helpers ---------- */
function handleSearch(e) {
  e.preventDefault();
  // In production, this would navigate to search results
  const form = e.target;
  const formData = new FormData(form);
  console.log('Search submitted:', Object.fromEntries(formData));
}
