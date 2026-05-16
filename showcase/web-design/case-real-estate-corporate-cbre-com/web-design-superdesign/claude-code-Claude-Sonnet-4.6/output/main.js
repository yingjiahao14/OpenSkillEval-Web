/* GlobalStone — Site JavaScript */

// ── MEGA MENU ──
(function () {
  const servicesBtn = document.getElementById('services-nav-btn');
  const megaMenu = document.getElementById('mega-menu');
  if (!servicesBtn || !megaMenu) return;

  let menuTimeout;

  function openMenu() {
    clearTimeout(menuTimeout);
    megaMenu.classList.add('show');
    servicesBtn.classList.add('open');
  }

  function closeMenu() {
    menuTimeout = setTimeout(() => {
      megaMenu.classList.remove('show');
      servicesBtn.classList.remove('open');
    }, 80);
  }

  servicesBtn.addEventListener('mouseenter', openMenu);
  servicesBtn.addEventListener('mouseleave', closeMenu);
  megaMenu.addEventListener('mouseenter', openMenu);
  megaMenu.addEventListener('mouseleave', closeMenu);

  servicesBtn.addEventListener('click', () => {
    const isOpen = megaMenu.classList.contains('show');
    if (isOpen) { megaMenu.classList.remove('show'); servicesBtn.classList.remove('open'); }
    else openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!servicesBtn.contains(e.target) && !megaMenu.contains(e.target)) {
      megaMenu.classList.remove('show');
      servicesBtn.classList.remove('open');
    }
  });
})();

// ── MOBILE NAV ──
(function () {
  const toggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    const isOpen = mobileNav.classList.contains('show');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  const accordionBtns = mobileNav.querySelectorAll('.mobile-nav-item[data-accordion]');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.accordion;
      const body = document.getElementById(targetId);
      if (!body) return;
      const isOpen = body.classList.contains('show');
      // Close others
      mobileNav.querySelectorAll('.mobile-accordion-body.show').forEach(el => el.classList.remove('show'));
      mobileNav.querySelectorAll('.mobile-nav-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) { body.classList.add('show'); btn.classList.add('open'); }
    });
  });
})();

// ── WHAT WE DO TABS ──
(function () {
  const tabs = document.querySelectorAll('.wwd-tab');
  const panels = document.querySelectorAll('.wwd-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('wwd-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();

// ── CAROUSEL ──
(function () {
  const wrappers = document.querySelectorAll('[data-carousel]');
  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const prevBtn = wrapper.querySelector('[data-carousel-prev]');
    const nextBtn = wrapper.querySelector('[data-carousel-next]');
    const dotsContainer = wrapper.querySelector('.carousel-dots');
    if (!track || !slides.length) return;

    let current = 0;
    const total = slides.length;

    // Build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));
  });
})();
