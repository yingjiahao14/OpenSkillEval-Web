(function () {
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach((el) => { el.textContent = new Date().getFullYear(); });

  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach((drop) => {
    const trigger = drop.querySelector('[data-drop-trigger]');
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      drop.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => dropdowns.forEach((d) => d.classList.remove('open')));

  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll('[role="tab"]');
    const panels = group.querySelectorAll('[role="tabpanel"]');
    const activate = (id) => {
      buttons.forEach((button) => {
        const selected = button.getAttribute('aria-controls') === id;
        button.setAttribute('aria-selected', String(selected));
      });
      panels.forEach((panel) => panel.classList.toggle('active', panel.id === id));
    };
    buttons.forEach((button) => {
      button.addEventListener('click', () => activate(button.getAttribute('aria-controls')));
    });
  });

  const accordions = document.querySelectorAll('[data-accordion]');
  accordions.forEach((acc) => {
    const buttons = acc.querySelectorAll('.accordion-btn');
    const panels = acc.querySelectorAll('.accordion-panel');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('aria-controls');
        buttons.forEach((b) => b.setAttribute('aria-expanded', String(b === button)));
        panels.forEach((p) => p.classList.toggle('active', p.id === target));
      });
    });
  });

  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((car) => {
    const tracks = car.querySelectorAll('.carousel-track');
    const dots = car.querySelectorAll('.dot');
    const show = (idx) => {
      tracks.forEach((t, i) => t.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    dots.forEach((dot, idx) => dot.addEventListener('click', () => show(idx)));
  });

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner) {
    const saved = localStorage.getItem('wellstream_cookie_pref');
    if (saved) cookieBanner.classList.add('hidden');
    cookieBanner.querySelectorAll('[data-cookie-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_pref', btn.getAttribute('data-cookie-choice'));
        cookieBanner.classList.add('hidden');
      });
    });
  }

  const demoForm = document.querySelector('#demoForm');
  if (demoForm) {
    const successBox = document.querySelector('#formSuccess');
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const required = demoForm.querySelectorAll('[data-required="true"]');
      required.forEach((field) => {
        const error = demoForm.querySelector(`[data-error-for="${field.name}"]`);
        let message = '';
        if (!field.value.trim()) message = 'This field is required.';
        if (field.type === 'email' && field.value && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Enter a valid email.';
        if (error) error.textContent = message;
        if (message) valid = false;
      });
      if (!valid) return;

      successBox?.classList.add('show');
      demoForm.reset();
      setTimeout(() => successBox?.classList.remove('show'), 5000);
    });
  }
})();
