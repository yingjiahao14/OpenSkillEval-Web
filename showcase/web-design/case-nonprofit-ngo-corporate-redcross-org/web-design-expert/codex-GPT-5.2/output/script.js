/* Global Aid Alliance — single-page interactions */

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatNumber(n) {
  return new Intl.NumberFormat(undefined).format(n);
}

function formatMoneyMillions(millions) {
  const dollars = Math.round(millions * 1_000_000);
  return `$${formatNumber(dollars)}`;
}

function trapFocus(container, event) {
  if (event.key !== 'Tab') return;
  const focusables = qsa(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    container
  ).filter((el) => el.offsetParent !== null);
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const isShift = event.shiftKey;
  const active = document.activeElement;

  if (!isShift && active === last) {
    event.preventDefault();
    first.focus();
  } else if (isShift && active === first) {
    event.preventDefault();
    last.focus();
  }
}

function setBodyLock(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

function initMobileMenu() {
  const openBtn = qs('[data-action="open-drawer"]');
  const closeBtn = qs('[data-action="close-drawer"]');
  const backdrop = qs('#drawer-backdrop');
  const drawer = qs('#mobile-drawer');

  if (!openBtn || !closeBtn || !backdrop || !drawer) return;

  function open() {
    document.body.classList.add('drawer-open');
    openBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    setBodyLock(true);
    closeBtn.focus();
  }

  function close() {
    document.body.classList.remove('drawer-open');
    openBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    setBodyLock(false);
    openBtn.focus();
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    trapFocus(drawer, e);
  });
  qsa('a[href^="#"]', drawer).forEach((a) => {
    a.addEventListener('click', () => close());
  });
}

function initDonateModal() {
  const openers = qsa('[data-action="open-donate"]');
  const closeBtn = qs('[data-action="close-donate"]');
  const backdrop = qs('#modal-backdrop');
  const modalRoot = qs('#donate-modal');
  const panel = qs('#donate-modal-panel');
  const amountButtons = qsa('[data-amount]', modalRoot);
  const amountInput = qs('#custom-amount', modalRoot);
  const donateNow = qs('#donate-submit', modalRoot);
  const result = qs('#donate-result', modalRoot);

  if (!closeBtn || !backdrop || !modalRoot || !panel || !amountInput || !donateNow) return;

  let lastActive = null;
  let selectedAmount = 50;

  function syncSelection(amount) {
    selectedAmount = amount;
    amountButtons.forEach((btn) => {
      const val = Number(btn.getAttribute('data-amount'));
      btn.setAttribute('aria-pressed', String(val === selectedAmount));
    });
    if (Number(amountInput.value) !== selectedAmount) {
      amountInput.value = String(selectedAmount);
    }
  }

  function open() {
    lastActive = document.activeElement;
    document.body.classList.add('modal-open');
    modalRoot.setAttribute('aria-hidden', 'false');
    setBodyLock(true);
    syncSelection(selectedAmount);
    closeBtn.focus();
  }

  function close() {
    document.body.classList.remove('modal-open');
    modalRoot.setAttribute('aria-hidden', 'true');
    setBodyLock(false);
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
  }

  openers.forEach((btn) => btn.addEventListener('click', open));
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    trapFocus(panel, e);
  });

  amountButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const amt = Number(btn.getAttribute('data-amount'));
      if (!Number.isFinite(amt) || amt <= 0) return;
      syncSelection(amt);
      result.textContent = '';
    });
  });

  amountInput.addEventListener('input', () => {
    const raw = Number(amountInput.value);
    if (!Number.isFinite(raw)) return;
    const amt = clamp(Math.round(raw), 1, 1_000_000);
    selectedAmount = amt;
    amountButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    result.textContent = '';
  });

  donateNow.addEventListener('click', () => {
    const amt = clamp(Math.round(Number(amountInput.value || selectedAmount)), 1, 1_000_000);
    amountInput.value = String(amt);
    result.textContent = `Thank you — your $${formatNumber(amt)} gift helps deliver urgent aid.`;
    result.focus();
  });

  syncSelection(selectedAmount);
}

function initAccordion() {
  const items = qsa('[data-accordion-item]');
  if (items.length === 0) return;

  function closeAll(exceptId) {
    items.forEach((item) => {
      const btn = qs('[data-accordion-button]', item);
      const panel = qs('[data-accordion-panel]', item);
      const id = item.getAttribute('data-accordion-item');
      if (!btn || !panel) return;
      if (id === exceptId) return;
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';
      panel.setAttribute('aria-hidden', 'true');
    });
  }

  items.forEach((item) => {
    const btn = qs('[data-accordion-button]', item);
    const panel = qs('[data-accordion-panel]', item);
    if (!btn || !panel) return;

    function toggle(forceOpen = null) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const next = forceOpen === null ? !expanded : forceOpen;

      if (next) {
        closeAll(item.getAttribute('data-accordion-item'));
        btn.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        const inner = qs('.acc-panel__inner', panel);
        const height = inner ? inner.scrollHeight : panel.scrollHeight;
        panel.style.maxHeight = `${height + 18}px`;
      } else {
        btn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        panel.style.maxHeight = '0px';
      }
    }

    btn.addEventListener('click', () => toggle());
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Open the first item for scannability.
  const first = items[0];
  const firstBtn = qs('[data-accordion-button]', first);
  if (firstBtn) firstBtn.click();
}

function initCounters() {
  const statEls = qsa('[data-count-to]');
  if (statEls.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setFinal(el) {
    const to = Number(el.getAttribute('data-count-to'));
    const fmt = el.getAttribute('data-count-format') || 'number';
    if (fmt === 'money_millions') el.textContent = formatMoneyMillions(to);
    else el.textContent = formatNumber(to);
  }

  if (reduced) {
    statEls.forEach(setFinal);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);

        const to = Number(el.getAttribute('data-count-to'));
        const fmt = el.getAttribute('data-count-format') || 'number';
        const duration = 900;
        const start = performance.now();
        const from = 0;

        function tick(now) {
          const t = clamp((now - start) / duration, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = Math.round(from + (to - from) * eased);
          if (fmt === 'money_millions') el.textContent = formatMoneyMillions(val);
          else el.textContent = formatNumber(val);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.35 }
  );

  statEls.forEach((el) => io.observe(el));
}

function initCarousel() {
  const track = qs('#news-track');
  const prev = qs('[data-action="news-prev"]');
  const next = qs('[data-action="news-next"]');
  const viewport = qs('#news-viewport');
  if (!track || !prev || !next || !viewport) return;

  const cards = qsa('.news-card', track);
  let index = 0;

  function cardsPerView() {
    const w = viewport.clientWidth;
    if (w < 760) return 1;
    if (w < 980) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - cardsPerView());
  }

  function cardWidth() {
    const card = cards[0];
    if (!card) return 0;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function render() {
    index = clamp(index, 0, maxIndex());
    const x = -index * cardWidth();
    track.style.transform = `translateX(${x}px)`;
    prev.disabled = index === 0;
    next.disabled = index === maxIndex();
  }

  prev.addEventListener('click', () => {
    index -= cardsPerView();
    render();
  });

  next.addEventListener('click', () => {
    index += cardsPerView();
    render();
  });

  window.addEventListener('resize', () => {
    // Recompute and clamp on resize.
    render();
  });

  // Keyboard accessibility.
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'ArrowRight') next.click();
  });

  render();
}

function initYear() {
  const y = qs('[data-year]');
  if (!y) return;
  y.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDonateModal();
  initAccordion();
  initCounters();
  initCarousel();
  initYear();
});

