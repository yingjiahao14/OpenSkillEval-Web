/* ============================================
   GlobalStone — Global Commercial Real Estate
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initMegaMenu();
  initTabs();
  initCarousels();
  initHeaderScroll();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    mobileNav.classList.toggle('active');
    document.body.style.overflow = !expanded ? 'hidden' : '';
  });

  // Accordion submenus
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (!link.hasAttribute('aria-expanded')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = link.getAttribute('aria-expanded') === 'true';
      // Close others
      mobileNav.querySelectorAll('.mobile-nav-link[aria-expanded="true"]').forEach(l => {
        if (l !== link) {
          l.setAttribute('aria-expanded', 'false');
          l.nextElementSibling?.classList.remove('active');
        }
      });
      link.setAttribute('aria-expanded', !expanded);
      const submenu = link.nextElementSibling;
      if (submenu) submenu.classList.toggle('active');
    });
  });
}

/* Mega Menu */
function initMegaMenu() {
  const triggers = document.querySelectorAll('[data-mega-menu]');
  triggers.forEach(trigger => {
    const targetId = trigger.getAttribute('data-mega-menu');
    const menu = document.getElementById(targetId);
    if (!menu) return;

    let timeout;

    const open = () => {
      clearTimeout(timeout);
      trigger.setAttribute('aria-expanded', 'true');
      menu.classList.add('active');
    };

    const close = () => {
      timeout = setTimeout(() => {
        trigger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('active');
      }, 150);
    };

    trigger.addEventListener('mouseenter', open);
    trigger.addEventListener('mouseleave', close);
    menu.addEventListener('mouseenter', () => clearTimeout(timeout));
    menu.addEventListener('mouseleave', close);

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth >= 769) {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          trigger.setAttribute('aria-expanded', 'false');
          menu.classList.remove('active');
        } else {
          // Close other menus
          triggers.forEach(t => {
            if (t !== trigger) {
              t.setAttribute('aria-expanded', 'false');
              const m = document.getElementById(t.getAttribute('data-mega-menu'));
              m?.classList.remove('active');
            }
          });
          open();
        }
      }
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const m = document.getElementById(t.getAttribute('data-mega-menu'));
        m?.classList.remove('active');
      });
    }
  });
}

/* Tabs */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = container.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* Carousels */
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    if (!track || slides.length === 0) return;

    let current = 0;

    const update = () => {
      track.style.transform = `translateX(-${current * 100}%)`;
    };

    prevBtn?.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      update();
    });

    nextBtn?.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      update();
    });
  });
}

/* Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.style.boxShadow = '0 2px 12px rgba(10, 22, 40, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  });
}
