document.addEventListener('DOMContentLoaded', () => {
  // ─── Header scroll effect ───
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ─── Mobile nav toggle ───
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ─── Mobile accordion ───
  document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.toggle('open');
      btn.classList.toggle('active');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  // ─── Mega menu (desktop) ───
  const servicesLink = document.querySelector('[data-mega-menu]');
  const megaMenu = document.querySelector('.mega-menu');

  if (servicesLink && megaMenu) {
    let closeTimeout;

    const openMenu = () => {
      clearTimeout(closeTimeout);
      megaMenu.classList.add('open');
      servicesLink.classList.add('active');
      servicesLink.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      closeTimeout = setTimeout(() => {
        megaMenu.classList.remove('open');
        servicesLink.classList.remove('active');
        servicesLink.setAttribute('aria-expanded', 'false');
      }, 200);
    };

    servicesLink.addEventListener('mouseenter', openMenu);
    servicesLink.addEventListener('mouseleave', closeMenu);
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
    megaMenu.addEventListener('mouseleave', closeMenu);

    servicesLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (megaMenu.classList.contains('open')) {
        megaMenu.classList.remove('open');
        servicesLink.classList.remove('active');
        servicesLink.setAttribute('aria-expanded', 'false');
      } else {
        openMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && megaMenu.classList.contains('open')) {
        closeMenu();
        servicesLink.focus();
      }
    });
  }

  // ─── What We Do tabs ───
  const wwdTabs = document.querySelectorAll('.wwd-tab');
  const wwdPanels = document.querySelectorAll('.wwd-panel');

  wwdTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      wwdTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      wwdPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ─── Carousel ───
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');

  if (carouselTrack && prevBtn && nextBtn) {
    let current = 0;
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const getVisible = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    const update = () => {
      const visible = getVisible();
      const max = Math.max(0, slides.length - visible);
      current = Math.min(current, max);
      const pct = (current / slides.length) * 100;
      carouselTrack.style.transform = `translateX(-${pct}%)`;

      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };

    prevBtn.addEventListener('click', () => { current = Math.max(0, current - 1); update(); });
    nextBtn.addEventListener('click', () => {
      const visible = getVisible();
      current = Math.min(slides.length - visible, current + 1);
      update();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { current = i; update(); });
    });

    window.addEventListener('resize', update, { passive: true });
    update();
  }

  // ─── Scroll animations ───
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
