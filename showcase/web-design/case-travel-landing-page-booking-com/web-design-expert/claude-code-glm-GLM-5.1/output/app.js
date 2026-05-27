/* ============================================================
   StayQuest — Interactive Components
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousel();
  initFaqAccordion();
  initMobileNav();
});

/* --- Tab Switching --- */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('[data-tab-btn]');
    const container = tabGroup.closest('.tabs-container') || tabGroup.parentElement;
    const panels = container.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabBtn;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(panel => {
          panel.classList.toggle('active', panel.dataset.tabPanel === target);
        });
      });
    });
  });
}

/* --- Carousel --- */
function initCarousel() {
  document.querySelectorAll('[data-carousel]').forEach(wrapper => {
    const track = wrapper.querySelector('[data-carousel-track]');
    const prevBtn = wrapper.querySelector('[data-carousel-prev]');
    const nextBtn = wrapper.querySelector('[data-carousel-next]');

    if (!track) return;

    const scrollAmount = 280;

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

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  document.querySelectorAll('[data-faq]').forEach(faqContainer => {
    const items = faqContainer.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items
        items.forEach(i => i.classList.remove('open'));

        // Toggle clicked item
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const expanded = mobileNav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
