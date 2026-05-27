/* ============================================
   Orchard — Interactive Behaviors
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initCategoryNav();
  initFooterAccordion();
});

/* --- Carousel --- */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow.next');
    if (!track) return;

    const scrollAmount = () => {
      const card = track.querySelector('.product-card, .savings-card');
      if (card) return card.offsetWidth + 16; // card width + gap
      return 296;
    };

    const updateArrows = () => {
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 5;
      if (nextBtn) nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateArrows);
    updateArrows();

    // Re-check on resize
    window.addEventListener('resize', updateArrows);
  });
}

/* --- Entertainment Tabs --- */
function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('button');
    const section = nav.closest('.entertainment-section') || nav.closest('.section');
    if (!section) return;

    const tabs = section.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabs.forEach(t => {
          t.classList.toggle('active', t.dataset.tab === target);
        });
      });
    });
  });
}

/* --- Category Sticky Nav --- */
function initCategoryNav() {
  const nav = document.querySelector('.category-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a');
  const sections = [];

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) sections.push({ link, el: target });
    }
  });

  // Click to smooth scroll
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.global-nav')?.offsetHeight || 48;
        const catNavHeight = nav.offsetHeight || 40;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - catNavHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Scroll spy
  const onScroll = () => {
    const navHeight = document.querySelector('.global-nav')?.offsetHeight || 48;
    const catNavHeight = nav.offsetHeight || 40;
    const offset = navHeight + catNavHeight + 20;

    let current = sections[0];
    for (const s of sections) {
      if (s.el.getBoundingClientRect().top <= offset) current = s;
    }

    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Footer Accordion (Mobile) --- */
function initFooterAccordion() {
  const cols = document.querySelectorAll('.footer-col');
  cols.forEach(col => {
    const heading = col.querySelector('h4');
    if (!heading) return;

    heading.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      const isOpen = col.classList.contains('open');

      // Close all
      cols.forEach(c => c.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) col.classList.add('open');
    });
  });
}
