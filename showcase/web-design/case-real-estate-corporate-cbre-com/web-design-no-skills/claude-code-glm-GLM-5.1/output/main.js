/* ===== GlobalStone Main JS ===== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMegaMenu();
  initMobileNav();
  initWhatWeDoTabs();
  initCarousel();
  initNewsletter();
});

/* ===== Header Scroll ===== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ===== Mega Menu ===== */
function initMegaMenu() {
  const navItems = document.querySelectorAll('.main-nav > li');
  let closeTimeout;

  navItems.forEach(item => {
    const link = item.querySelector(':scope > a');
    const mega = item.querySelector('.mega-menu');
    if (!mega) return;

    const openMenu = () => {
      clearTimeout(closeTimeout);
      navItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
      item.classList.add('active');
    };

    const closeMenu = () => {
      closeTimeout = setTimeout(() => { item.classList.remove('active'); }, 150);
    };

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      } else {
        openMenu();
      }
    });

    item.addEventListener('mouseenter', openMenu);
    item.addEventListener('mouseleave', closeMenu);
    mega.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
    mega.addEventListener('mouseleave', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav')) {
      navItems.forEach(i => i.classList.remove('active'));
    }
  });
}

/* ===== Mobile Nav ===== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Accordion
  mobileNav.querySelectorAll('.mobile-nav-item > a').forEach(link => {
    link.addEventListener('click', (e) => {
      const item = link.parentElement;
      const subnav = item.querySelector('.mobile-subnav');
      if (subnav) {
        e.preventDefault();
        // Close siblings
        item.parentElement.querySelectorAll('.mobile-nav-item.open').forEach(i => {
          if (i !== item) i.classList.remove('open');
        });
        item.classList.toggle('open');
      } else {
        // Close mobile nav on regular link click
        toggle.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ===== What We Do Tabs ===== */
function initWhatWeDoTabs() {
  const container = document.querySelector('.what-we-do');
  if (!container) return;

  const tabs = container.querySelectorAll('.wwd-tab');
  const panels = container.querySelectorAll('.wwd-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = container.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ===== Carousel ===== */
function initCarousel() {
  const wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  const slides = wrapper.querySelectorAll('.carousel-slide');
  const dots = wrapper.querySelectorAll('.carousel-dot');
  const prevBtn = wrapper.querySelector('.carousel-prev');
  const nextBtn = wrapper.querySelector('.carousel-next');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });
}

/* ===== Newsletter ===== */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#1a8a7d';
      input.value = '';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2500);
    }
  });
}
