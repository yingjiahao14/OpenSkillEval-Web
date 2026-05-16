(function () {
  const q = (s, root = document) => root.querySelector(s);
  const qa = (s, root = document) => Array.from(root.querySelectorAll(s));

  qa('[data-tabs]').forEach((tabRoot) => {
    const buttons = qa('[role="tab"]', tabRoot);
    const panels = qa('[role="tabpanel"]', tabRoot);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        q(`#${target}`, tabRoot)?.classList.add('active');
      });
    });
  });

  qa('[data-accordion]').forEach((acc) => {
    qa('.accordion-btn', acc).forEach((btn) => {
      btn.addEventListener('click', () => {
        qa('.accordion-item', acc).forEach((item) => item.classList.remove('active'));
        btn.closest('.accordion-item')?.classList.add('active');
      });
    });
  });

  qa('[data-carousel]').forEach((root) => {
    const track = q('.carousel-track', root);
    const dots = qa('.dot', root);
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
  });

  const cookie = q('#cookieBanner');
  if (cookie) {
    const saved = localStorage.getItem('wellstream_cookie_pref');
    if (!saved) cookie.classList.add('show');
    q('#cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem('wellstream_cookie_pref', 'accepted');
      cookie.classList.remove('show');
    });
    q('#cookieDecline')?.addEventListener('click', () => {
      localStorage.setItem('wellstream_cookie_pref', 'declined');
      cookie.classList.remove('show');
    });
  }

  const form = q('#demoForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      qa('[data-required="true"]', form).forEach((field) => {
        const errorEl = q(`.error[data-for="${field.name}"]`, form);
        if (!field.value.trim()) {
          ok = false;
          if (errorEl) errorEl.textContent = 'This field is required.';
        } else {
          if (errorEl) errorEl.textContent = '';
        }
      });
      const email = q('input[name="email"]', form);
      const emailErr = q('.error[data-for="email"]', form);
      if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
        ok = false;
        if (emailErr) emailErr.textContent = 'Enter a valid email address.';
      }
      if (!ok) return;
      const success = q('#formSuccess');
      if (success) {
        success.textContent = 'Thank you. Your demo request has been submitted.';
      }
      form.reset();
    });
  }

  const toggle = q('#mobileMenuToggle');
  const menu = q('#mainMenu');
  toggle?.addEventListener('click', () => menu?.classList.toggle('show'));
})();
