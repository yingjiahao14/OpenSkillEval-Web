(function () {
  function setupTabs(scope) {
    scope.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
      const buttons = tabsRoot.querySelectorAll('[role="tab"]');
      const panels = tabsRoot.querySelectorAll('[data-panel]');
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-target');
          buttons.forEach((b) => b.setAttribute('aria-selected', String(b === button)));
          panels.forEach((p) => p.classList.toggle('active', p.getAttribute('data-panel') === id));
        });
      });
    });
  }

  function setupAccordion(scope) {
    scope.querySelectorAll('[data-accordion]').forEach((acc) => {
      const items = acc.querySelectorAll('.accordion-item');
      items.forEach((item) => {
        item.querySelector('.acc-btn').addEventListener('click', () => {
          items.forEach((other) => other.classList.remove('active'));
          item.classList.add('active');
        });
      });
    });
  }

  function setupCarousel(scope) {
    const container = scope.querySelector('[data-carousel]');
    if (!container) return;
    const sets = JSON.parse(container.getAttribute('data-sets'));
    const track = container.querySelector('.carousel-track');
    const dots = container.querySelectorAll('.dot');

    function render(index) {
      track.innerHTML = sets[index].map((item) => `\n<div class="testimonial"><p>“${item.quote}”</p><p class="muted">— ${item.name}, ${item.role}</p></div>`).join('');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => render(i)));
    render(0);
  }

  function setupDemoForm(scope) {
    const form = scope.querySelector('#demoForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let isValid = true;
      const required = ['firstName','lastName','email','company','jobTitle','industry','country'];
      required.forEach((name) => {
        const input = form.elements[name];
        const errorEl = form.querySelector(`[data-error="${name}"]`);
        let error = '';
        if (!input.value.trim()) error = 'Required field';
        if (name === 'email' && input.value && !/^\S+@\S+\.\S+$/.test(input.value)) error = 'Enter a valid email';
        errorEl.textContent = error;
        if (error) isValid = false;
      });
      const success = form.querySelector('#formSuccess');
      if (isValid) {
        success.textContent = 'Request submitted. Our team will contact you shortly.';
        form.reset();
      } else {
        success.textContent = '';
      }
    });
  }

  function setupCookieBanner(scope) {
    const banner = scope.querySelector('#cookieBanner');
    if (!banner) return;
    const stored = localStorage.getItem('ws_cookie_pref');
    if (stored) { banner.classList.add('hidden'); return; }
    banner.querySelector('[data-cookie="accept"]').addEventListener('click', () => {
      localStorage.setItem('ws_cookie_pref', 'accept');
      banner.classList.add('hidden');
    });
    banner.querySelector('[data-cookie="decline"]').addEventListener('click', () => {
      localStorage.setItem('ws_cookie_pref', 'decline');
      banner.classList.add('hidden');
    });
  }

  const scope = document;
  setupTabs(scope);
  setupAccordion(scope);
  setupCarousel(scope);
  setupDemoForm(scope);
  setupCookieBanner(scope);
})();
