(function(){
  const megaToggle = document.querySelector('[data-mega-toggle]');
  const megaMenu = document.querySelector('[data-mega-menu]');
  if (megaToggle && megaMenu) {
    const setMega = (open) => {
      megaMenu.classList.toggle('open', open);
      megaToggle.setAttribute('aria-expanded', String(open));
    };
    megaToggle.addEventListener('click', (event) => {
      event.preventDefault();
      setMega(!megaMenu.classList.contains('open'));
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav-services')) setMega(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMega(false);
    });
  }

  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener('click', () => {
      const open = !mobilePanel.classList.contains('open');
      mobilePanel.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const target = document.getElementById(trigger.getAttribute('aria-controls'));
      const open = target && !target.classList.contains('open');
      document.querySelectorAll('.accordion-content').forEach((panel) => panel.classList.remove('open'));
      document.querySelectorAll('[data-accordion-trigger]').forEach((btn) => btn.setAttribute('aria-expanded','false'));
      if (target) {
        target.classList.toggle('open', open);
        trigger.setAttribute('aria-expanded', String(open));
      }
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('[data-tab]');
    const panels = tabs.querySelectorAll('[data-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.tab;
        buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === id));
      });
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = carousel.querySelectorAll('.carousel-slide');
    let index = 0;
    const go = (next) => {
      index = (next + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    carousel.querySelector('[data-prev]')?.addEventListener('click', () => go(index - 1));
    carousel.querySelector('[data-next]')?.addEventListener('click', () => go(index + 1));
  });

  document.querySelectorAll('[data-subscribe]').forEach((button) => {
    button.addEventListener('click', () => {
      const email = document.querySelector('[data-email]');
      if (email && email.value.trim()) {
        button.textContent = 'Subscribed';
        button.setAttribute('aria-label','Newsletter subscription confirmed');
      } else if (email) {
        email.focus();
      }
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('visible'));
  }
})();
