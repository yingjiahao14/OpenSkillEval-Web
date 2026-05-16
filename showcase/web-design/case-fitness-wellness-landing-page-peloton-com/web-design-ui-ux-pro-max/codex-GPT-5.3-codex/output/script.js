(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((el) => {
    if (el.getAttribute('href') === current) el.classList.add('active');
  });

  document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
    const dropdown = toggle.closest('.dropdown');
    toggle.addEventListener('click', () => dropdown.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  });

  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-target');
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        group.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
      });
    });
  });

  document.querySelectorAll('[data-accordion]').forEach((root) => {
    const items = root.querySelectorAll('.accordion-item');
    items.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      trigger.addEventListener('click', () => {
        items.forEach((it) => it.classList.remove('active'));
        item.classList.add('active');
      });
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const slides = root.querySelectorAll('[data-slide]');
    const dots = root.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        slides.forEach((s) => s.classList.remove('active'));
        dots.forEach((d) => d.classList.remove('active'));
        slides[idx].classList.add('active');
        dot.classList.add('active');
      });
    });
  });

  const cookieKey = 'wellstream_cookie_pref';
  const banner = document.querySelector('#cookie-banner');
  if (banner && !localStorage.getItem(cookieKey)) {
    banner.classList.add('show');
    banner.querySelectorAll('[data-cookie]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem(cookieKey, btn.getAttribute('data-cookie'));
        banner.classList.remove('show');
      });
    });
  }

  const demoForm = document.querySelector('#demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      demoForm.querySelectorAll('[data-required]').forEach((field) => {
        const error = demoForm.querySelector(`[data-error-for="${field.name}"]`);
        if (!field.value.trim()) {
          valid = false;
          if (error) error.textContent = 'This field is required.';
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
          valid = false;
          if (error) error.textContent = 'Enter a valid email address.';
        } else {
          if (error) error.textContent = '';
        }
      });
      const status = document.querySelector('#form-status');
      if (valid) {
        status.textContent = 'Thank you. Your demo request has been submitted.';
        status.style.color = '#2dd4bf';
        demoForm.reset();
      } else {
        status.textContent = 'Please fix highlighted fields and resubmit.';
        status.style.color = '#fb7185';
      }
    });
  }
})();
