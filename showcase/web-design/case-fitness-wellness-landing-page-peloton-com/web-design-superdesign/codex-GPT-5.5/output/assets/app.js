(function () {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  qsa('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    const map = {
      menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
      arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
      check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>',
      plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
      shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
      database: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',
      activity: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
      map: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/></svg>',
      lock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      plug: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-5M9 8V2M15 8V2M6 8h12v4a6 6 0 0 1-12 0V8Z"/></svg>'
    };
    el.innerHTML = map[name] || map.arrow;
  });

  const mobileToggle = qs('.mobile-toggle');
  const navLinks = qs('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
  qsa('.drop-btn').forEach((btn) => btn.addEventListener('click', () => btn.closest('.dropdown').classList.toggle('open')));

  qsa('[data-tabs]').forEach((tabsRoot) => {
    const buttons = qsa('[data-tab]', tabsRoot);
    const scope = tabsRoot.getAttribute('data-tabs');
    const panels = qsa(`[data-tab-panel][data-tab-scope="${scope}"]`);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === target));
      });
    });
  });

  qsa('.accordion').forEach((accordion) => {
    qsa('.accordion-item', accordion).forEach((item, index) => {
      const button = qs('.accordion-button', item);
      button.addEventListener('click', () => {
        qsa('.accordion-item', accordion).forEach((other) => other.classList.toggle('active', other === item));
      });
      if (index === 0) item.classList.add('active');
    });
  });

  qsa('[data-carousel]').forEach((carousel) => {
    const track = qs('.testimonial-track', carousel);
    const dots = qsa('.dot-btn', carousel);
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d) => d.classList.toggle('active', d === dot));
      });
    });
  });

  const cookie = qs('.cookie-banner');
  if (cookie && !localStorage.getItem('wellstream_cookie_pref')) cookie.style.display = 'block';
  qsa('[data-cookie]').forEach((btn) => {
    btn.addEventListener('click', () => {
      localStorage.setItem('wellstream_cookie_pref', btn.getAttribute('data-cookie'));
      if (cookie) cookie.style.display = 'none';
    });
  });

  const demoForm = qs('#demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      qsa('[required]', demoForm).forEach((field) => {
        const wrapper = field.closest('.field');
        const isEmail = field.type === 'email';
        const ok = field.value.trim() && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        wrapper.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (valid) {
        qs('.form-success').style.display = 'block';
        demoForm.reset();
        qs('.form-success').focus();
      }
    });
    qsa('input, select, textarea', demoForm).forEach((field) => field.addEventListener('input', () => field.closest('.field').classList.remove('invalid')));
  }
})();
