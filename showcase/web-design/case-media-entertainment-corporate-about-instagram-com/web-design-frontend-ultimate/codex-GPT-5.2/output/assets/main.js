(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (toggle && mobileNav) {
    const closeButtons = mobileNav.querySelectorAll('[data-nav-close]');
    const navLinks = mobileNav.querySelectorAll('[data-nav-link]');

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      if (open) {
        mobileNav.hidden = false;
        mobileNav.setAttribute('data-open', 'true');
        document.documentElement.style.overflow = 'hidden';
      } else {
        mobileNav.removeAttribute('data-open');
        document.documentElement.style.overflow = '';
        // allow exit animation to finish
        window.setTimeout(() => {
          mobileNav.hidden = true;
        }, 180);
      }
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    closeButtons.forEach((btn) => btn.addEventListener('click', () => setOpen(false)));
    navLinks.forEach((a) => a.addEventListener('click', () => setOpen(false)));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  // Make the news carousel feel great on desktop: wheel scroll maps to horizontal scroll.
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    carousel.addEventListener(
      'wheel',
      (e) => {
        // Only hijack when it looks like vertical scrolling.
        const mostlyVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
        if (!mostlyVertical) return;
        if (e.deltaY === 0) return;
        e.preventDefault();
        carousel.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      },
      { passive: false },
    );
  }

  // Small polish: add a shadow once scrolled.
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 6 ? '0 10px 30px rgba(0,0,0,0.08)' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

