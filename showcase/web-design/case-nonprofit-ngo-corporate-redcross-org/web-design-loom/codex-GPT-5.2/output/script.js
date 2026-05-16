(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // -------- Mobile drawer
  const drawerOpenBtn = qs('[data-drawer-open]');
  const drawerCloseBtn = qs('[data-drawer-close]');
  const backdrop = qs('.drawer-backdrop');
  const drawer = qs('.drawer');

  let lastFocusEl = null;

  function setDrawer(open) {
    if (!drawer || !backdrop) return;

    if (open) {
      lastFocusEl = document.activeElement;
      document.body.classList.add('drawer-open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      const firstLink = qs('.drawer nav a', drawer) || drawerCloseBtn;
      firstLink?.focus?.();
    } else {
      document.body.classList.remove('drawer-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      lastFocusEl?.focus?.();
      lastFocusEl = null;
    }
  }

  function trapFocus(e, rootEl) {
    if (e.key !== 'Tab') return;
    const focusables = qsa('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])', rootEl).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  drawerOpenBtn?.addEventListener('click', () => setDrawer(true));
  drawerCloseBtn?.addEventListener('click', () => setDrawer(false));
  backdrop?.addEventListener('click', () => setDrawer(false));

  // -------- Donate modal: forward-declare for Escape
  let closeDonateModal = () => {};
  const modalBackdrop = qs('.modal-backdrop');
  const modal = qs('#donate-modal');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.body.classList.contains('drawer-open')) setDrawer(false);
      if (document.body.classList.contains('modal-open')) closeDonateModal();
    }
    if (document.body.classList.contains('drawer-open') && drawer) trapFocus(e, drawer);
    if (document.body.classList.contains('modal-open') && modal) trapFocus(e, modal);
  });
  qsa('.drawer nav a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));

  // -------- Smooth anchor focus for keyboard users
  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = qs(id);
      if (!target) return;
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener(
          'blur',
          () => {
            target.removeAttribute('tabindex');
          },
          { once: true }
        );
      }, 0);
    });
  });

  // -------- Donate modal
  const modalOpenBtns = qsa('[data-open-donate]');
  const modalCloseBtn = qs('[data-close-donate]');
  const amountButtons = qsa('[data-amount]', modal);
  const selectedAmountInput = qs('#donation-amount', modal);
  const customAmountInput = qs('#donation-custom', modal);
  const impactLine = qs('[data-impact-line]', modal);
  const donateLive = qs('[data-donate-live]', modal);

  const amountImpact = {
    25: 'Provides 5 emergency blankets for displaced families',
    50: 'Supplies a family with food and water for one week',
    100: 'Funds emergency shelter materials for a household',
    250: 'Equips a volunteer with disaster response training',
  };

  function announce(el, msg) {
    if (!el) return;
    el.textContent = '';
    setTimeout(() => {
      el.textContent = msg;
    }, 10);
  }

  function updateImpact(amount) {
    if (!impactLine) return;
    if (!amount) {
      impactLine.textContent = 'Select an amount to see the impact.';
      return;
    }
    const rounded = Number(amount);
    const impact = amountImpact[rounded] || 'Every dollar counts toward saving lives.';
    impactLine.textContent = impact;
  }

  function setSelectedAmount(amount, source = 'preset') {
    const numeric = amount ? String(amount) : '';
    if (selectedAmountInput) selectedAmountInput.value = numeric;
    if (source === 'preset' && customAmountInput) customAmountInput.value = '';

    amountButtons.forEach((btn) => {
      const btnAmount = btn.getAttribute('data-amount');
      const isPressed = btnAmount === numeric;
      btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    });

    updateImpact(numeric);
    if (numeric) announce(donateLive, `Selected donation amount $${numeric}.`);
  }

  function openDonateModal() {
    if (!modal || !modalBackdrop) return;
    lastFocusEl = document.activeElement;
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    modalBackdrop.setAttribute('aria-hidden', 'false');

    if (!selectedAmountInput?.value) setSelectedAmount(50);

    const first = qs('[data-amount]', modal) || qs('button, input, select', modal);
    first?.focus?.();
  }

  closeDonateModal = function closeDonateModalImpl() {
    if (!modal || !modalBackdrop) return;
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    lastFocusEl?.focus?.();
    lastFocusEl = null;
  };

  window.closeDonateModal = closeDonateModal;

  modalOpenBtns.forEach((btn) => btn.addEventListener('click', openDonateModal));
  modalCloseBtn?.addEventListener('click', closeDonateModal);
  modalBackdrop?.addEventListener('click', closeDonateModal);

  amountButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const amt = btn.getAttribute('data-amount');
      if (!amt) return;
      setSelectedAmount(amt, 'preset');
    });
  });

  customAmountInput?.addEventListener('input', () => {
    const clean = customAmountInput.value.replace(/[^\d.]/g, '');
    if (clean !== customAmountInput.value) customAmountInput.value = clean;
    const val = Number(customAmountInput.value);
    if (!Number.isFinite(val) || val <= 0) {
      setSelectedAmount('', 'custom');
      amountButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      updateImpact('');
      return;
    }
    setSelectedAmount(String(Math.round(val)), 'custom');
  });

  qs('[data-submit-donation]', modal)?.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = Number(selectedAmountInput?.value || 0);
    const name = qs('#donor-name', modal)?.value?.trim();
    if (!amount || amount <= 0) {
      announce(donateLive, 'Please select a donation amount.');
      qs('[data-amount]', modal)?.focus?.();
      return;
    }
    announce(donateLive, `Thank you${name ? `, ${name}` : ''}. This demo will process a $${amount} donation.`);
  });

  // -------- Stats counters
  const statNodes = qsa('[data-countup]');
  function animateCount(el) {
    const target = Number(el.getAttribute('data-target') || '0');
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${formatter.format(target)}${suffix}`;
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${formatter.format(value)}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNodes.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.getAttribute('data-done') === 'true') return;
          el.setAttribute('data-done', 'true');
          animateCount(el);
        });
      },
      { threshold: 0.35 }
    );
    statNodes.forEach((n) => io.observe(n));
  } else {
    statNodes.forEach(animateCount);
  }

  // -------- Programs accordion
  const accItems = qsa('.acc-item');
  accItems.forEach((item) => {
    const btn = qs('.acc-trigger', item);
    const panel = qs('.acc-panel', item);
    if (!btn || !panel) return;

    const open = item.getAttribute('data-open') === 'true';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';

    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      accItems.forEach((other) => {
        if (other === item) return;
        other.setAttribute('data-open', 'false');
        const otherBtn = qs('.acc-trigger', other);
        const otherPanel = qs('.acc-panel', other);
        otherBtn?.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.style.maxHeight = '0px';
      });

      item.setAttribute('data-open', isOpen ? 'false' : 'true');
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
    });
  });

  window.addEventListener('resize', () => {
    qsa('.acc-item[data-open="true"] .acc-panel').forEach((panel) => {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
  });

  // -------- News carousel
  const track = qs('[data-carousel-track]');
  const prevBtn = qs('[data-carousel-prev]');
  const nextBtn = qs('[data-carousel-next]');
  const status = qs('[data-carousel-status]');

  if (track && prevBtn && nextBtn) {
    const cards = qsa('.news-card', track);
    let index = 0;

    const computePerView = () => {
      const w = window.innerWidth;
      if (w <= 760) return 1;
      if (w <= 980) return 2;
      return 3;
    };

    function updateButtons(maxIndex) {
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= maxIndex;
      const perView = computePerView();
      const start = index * perView + 1;
      const end = Math.min(cards.length, (index + 1) * perView);
      if (status) status.textContent = `Showing ${start}–${end} of ${cards.length}`;
    }

    function apply() {
      const perView = computePerView();
      const maxIndex = Math.max(0, Math.ceil(cards.length / perView) - 1);
      index = Math.min(index, maxIndex);
      const viewport = qs('.carousel-viewport');
      const viewportWidth = viewport?.clientWidth || 1;
      track.style.transform = `translateX(-${index * viewportWidth}px)`;
      updateButtons(maxIndex);
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      apply();
    });
    nextBtn.addEventListener('click', () => {
      const perView = computePerView();
      const maxIndex = Math.max(0, Math.ceil(cards.length / perView) - 1);
      index = Math.min(maxIndex, index + 1);
      apply();
    });
    window.addEventListener('resize', apply);
    apply();
  }
})();

