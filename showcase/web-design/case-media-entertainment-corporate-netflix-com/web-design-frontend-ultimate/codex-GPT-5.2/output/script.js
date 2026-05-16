(function () {
  const toastEl = document.querySelector('[data-toast]');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.dataset.show = 'true';
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.dataset.show = 'false';
    }, 2200);
  }

  function validateEmail(value) {
    // Simple validation is enough here; we just want frictionless capture.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function wireEmailForm(form) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input ? input.value.trim() : '';
      if (!email) {
        showToast('Enter your email to continue.');
        input?.focus();
        return;
      }
      if (!validateEmail(email)) {
        showToast('That email looks off — try again.');
        input?.focus();
        return;
      }
      showToast('Saved. Next: choose your plan.');
    });
  }

  function initFAQ() {
    const items = Array.from(document.querySelectorAll('[data-faq-item]'));
    if (!items.length) return;

    function closeAll(except) {
      for (const item of items) {
        if (item === except) continue;
        item.dataset.open = 'false';
        const panel = item.querySelector('[data-faq-panel]');
        if (panel) panel.style.maxHeight = '0px';
      }
    }

    function openItem(item) {
      item.dataset.open = 'true';
      const panel = item.querySelector('[data-faq-panel]');
      const inner = item.querySelector('[data-faq-panel-inner]');
      if (panel && inner) {
        panel.style.maxHeight = inner.scrollHeight + 'px';
      }
    }

    for (const item of items) {
      const btn = item.querySelector('[data-faq-btn]');
      const panel = item.querySelector('[data-faq-panel]');
      const inner = item.querySelector('[data-faq-panel-inner]');
      if (!btn || !panel || !inner) continue;

      item.dataset.open = 'false';
      panel.style.maxHeight = '0px';

      btn.addEventListener('click', () => {
        const isOpen = item.dataset.open === 'true';
        if (isOpen) {
          item.dataset.open = 'false';
          panel.style.maxHeight = '0px';
          return;
        }
        closeAll(item);
        openItem(item);
      });
    }
  }

  function initCarousel() {
    const scroller = document.querySelector('[data-carousel]');
    const btnNext = document.querySelector('[data-carousel-next]');
    const btnPrev = document.querySelector('[data-carousel-prev]');
    if (!scroller) return;

    function step(dir) {
      const first = scroller.querySelector('[data-card]');
      const gap = 14;
      const w = first ? first.getBoundingClientRect().width : 210;
      const delta = (w + gap) * 2;
      scroller.scrollBy({ left: dir * delta, behavior: 'smooth' });
    }

    btnNext?.addEventListener('click', () => step(1));
    btnPrev?.addEventListener('click', () => step(-1));

    // Enable drag-swipe on desktop too.
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    scroller.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      startScrollLeft = scroller.scrollLeft;
      scroller.setPointerCapture(e.pointerId);
    });
    scroller.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      scroller.scrollLeft = startScrollLeft - dx;
    });
    scroller.addEventListener('pointerup', () => {
      isDown = false;
    });
    scroller.addEventListener('pointercancel', () => {
      isDown = false;
    });
  }

  function initHelpToggle() {
    const toggle = document.querySelector('[data-help-toggle]');
    const panel = document.querySelector('[data-help-panel]');
    const inner = document.querySelector('[data-help-panel-inner]');
    if (!toggle || !panel || !inner) return;

    let open = false;
    panel.style.maxHeight = '0px';
    toggle.addEventListener('click', () => {
      open = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.style.maxHeight = open ? inner.scrollHeight + 'px' : '0px';
    });
  }

  function initLogin() {
    const form = document.querySelector('[data-login-form]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = form.querySelector('input[name="identifier"]');
      const password = form.querySelector('input[name="password"]');

      const idVal = identifier ? identifier.value.trim() : '';
      const passVal = password ? password.value : '';
      if (!idVal) {
        showToast('Enter your email or mobile number.');
        identifier?.focus();
        return;
      }
      if (!passVal) {
        showToast('Enter your password.');
        password?.focus();
        return;
      }
      showToast('Signing in…');
      // No real backend in this static artifact.
      window.setTimeout(() => showToast('Demo only: credentials not sent.'), 900);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    wireEmailForm(document.querySelector('[data-hero-form]'));
    wireEmailForm(document.querySelector('[data-cta-form]'));
    initFAQ();
    initCarousel();
    initLogin();
    initHelpToggle();
  });
})();

