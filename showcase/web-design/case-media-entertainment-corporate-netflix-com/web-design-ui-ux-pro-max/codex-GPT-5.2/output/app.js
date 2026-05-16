(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  // ---------- FAQ Accordion (single open) ----------
  function initFaqAccordion() {
    const faq = document.querySelector('[data-accordion="faq"]');
    if (!faq) return;

    const items = $all('[data-acc-item]', faq);

    function closeAll(except) {
      items.forEach((item) => {
        if (except && item === except) return;
        item.dataset.open = 'false';
        const btn = $('[data-acc-button]', item);
        const panel = $('[data-acc-panel]', item);
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.setAttribute('aria-hidden', 'true');
      });
    }

    items.forEach((item, idx) => {
      const btn = $('[data-acc-button]', item);
      const panel = $('[data-acc-panel]', item);
      if (!btn || !panel) return;

      const panelId = panel.id || `faq-panel-${idx + 1}`;
      panel.id = panelId;
      btn.setAttribute('aria-controls', panelId);

      btn.addEventListener('click', () => {
        const isOpen = item.dataset.open === 'true';
        closeAll(item);
        item.dataset.open = isOpen ? 'false' : 'true';
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        panel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      });
    });

    // Default open first item for weight (desktop), closed on very small screens.
    if (window.innerWidth > 520 && items[0]) {
      const btn = $('[data-acc-button]', items[0]);
      const panel = $('[data-acc-panel]', items[0]);
      items[0].dataset.open = 'true';
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (panel) panel.setAttribute('aria-hidden', 'false');
    } else {
      closeAll();
    }
  }

  // ---------- Trending Carousel ----------
  function initCarousel() {
    const root = document.querySelector('[data-carousel="trending"]');
    if (!root) return;

    const viewport = $('[data-carousel-viewport]', root);
    const nextBtn = $('[data-carousel-next]', root);
    const prevBtn = $('[data-carousel-prev]', root);
    if (!viewport || !nextBtn || !prevBtn) return;

    function cardWidth() {
      const first = viewport.querySelector('[data-carousel-item]');
      if (!first) return 240;
      const rect = first.getBoundingClientRect();
      const styles = window.getComputedStyle(viewport);
      const gap = parseFloat(styles.columnGap || styles.gap || '16') || 16;
      return rect.width + gap;
    }

    function updateButtons() {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const x = viewport.scrollLeft;
      prevBtn.disabled = x <= 4;
      nextBtn.disabled = x >= maxScroll - 4;
    }

    function scrollByCards(dir) {
      const delta = cardWidth() * dir * 2;
      viewport.scrollBy({
        left: delta,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }

    nextBtn.addEventListener('click', () => scrollByCards(1));
    prevBtn.addEventListener('click', () => scrollByCards(-1));

    viewport.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateButtons);
    });
    window.addEventListener('resize', () => {
      window.requestAnimationFrame(updateButtons);
    });
    updateButtons();

    // Optional: drag to scroll for desktop.
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    viewport.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDown = true;
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture(e.pointerId);
      viewport.style.cursor = 'grabbing';
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      viewport.scrollLeft = startScroll - dx;
    });
    function stopDrag() {
      isDown = false;
      viewport.style.cursor = '';
      updateButtons();
    }
    viewport.addEventListener('pointerup', stopDrag);
    viewport.addEventListener('pointercancel', stopDrag);
    viewport.addEventListener('pointerleave', stopDrag);
  }

  // ---------- Email capture (hero + bottom CTA) ----------
  function initEmailCapture() {
    $all('[data-email-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = (input && input.value ? input.value : '').trim();
        if (!input) return;

        input.setCustomValidity('');
        const valid = input.checkValidity();
        if (!valid) {
          input.reportValidity();
          return;
        }

        const msg = form.querySelector('[data-email-success]');
        if (msg) {
          msg.textContent = email ? `Great — we’ll send a link to ${email}.` : 'Great — check your inbox.';
          msg.style.display = 'block';
        }
        form.reset();
      });
    });
  }

  // ---------- Login form validation + help toggle ----------
  function initLogin() {
    const form = document.querySelector('[data-login-form]');
    if (form) {
      const email = form.querySelector('input[name="identifier"]');
      const pass = form.querySelector('input[name="password"]');
      const err = form.querySelector('[data-login-error]');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!email || !pass) return;

        const idVal = (email.value || '').trim();
        const pwVal = pass.value || '';
        const ok = idVal.length >= 3 && pwVal.length >= 4;
        if (!ok) {
          if (err) {
            err.dataset.show = 'true';
            err.textContent = 'Please enter your email/mobile and password.';
          }
          if (idVal.length < 3) email.focus();
          else pass.focus();
          return;
        }

        if (err) {
          err.dataset.show = 'true';
          err.textContent = 'Demo only — authentication is disabled in this static build.';
        }
      });
    }

    const help = document.querySelector('[data-help]');
    if (help) {
      const btn = help.querySelector('[data-help-btn]');
      const panel = help.querySelector('[data-help-panel]');
      if (btn && panel) {
        btn.addEventListener('click', () => {
          const open = help.dataset.open === 'true';
          help.dataset.open = open ? 'false' : 'true';
          btn.setAttribute('aria-expanded', open ? 'false' : 'true');
          panel.setAttribute('aria-hidden', open ? 'true' : 'false');
        });
      }
    }
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    initFaqAccordion();
    initCarousel();
    initEmailCapture();
    initLogin();
  });
})();

