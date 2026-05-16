(() => {
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Mobile drawer ----------
  const drawer = qs('#mobile-drawer');
  const drawerBackdrop = qs('#drawer-backdrop');
  const openDrawerBtn = qs('#open-drawer');
  const closeDrawerBtn = qs('#close-drawer');

  const setDrawerOpen = (open) => {
    if (!drawer || !drawerBackdrop) return;
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    drawerBackdrop.dataset.open = open ? 'true' : 'false';
    openDrawerBtn?.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      closeDrawerBtn?.focus();
    } else {
      openDrawerBtn?.focus();
    }
  };

  openDrawerBtn?.addEventListener('click', () => setDrawerOpen(true));
  closeDrawerBtn?.addEventListener('click', () => setDrawerOpen(false));
  drawerBackdrop?.addEventListener('click', () => setDrawerOpen(false));

  qsa('#mobile-drawer a').forEach((a) => {
    a.addEventListener('click', () => setDrawerOpen(false));
  });

  // ---------- Donate modal ----------
  const modalBackdrop = qs('#donate-backdrop');
  const modal = qs('#donate-modal');
  const openDonateBtns = qsa('[data-open-donate]');
  const closeDonateBtn = qs('#close-donate');
  const cancelDonateBtn = qs('#cancel-donate');
  const amountButtons = qsa('[data-amount]');
  const customAmountInput = qs('#custom-amount');
  const freqSelect = qs('#donation-frequency');
  const donorEmail = qs('#donor-email');
  const donateForm = qs('#donate-form');
  const summaryAmount = qs('#summary-amount');
  const summaryImpact = qs('#summary-impact');
  const summaryFreq = qs('#summary-frequency');

  const impactByAmount = new Map([
    [25, 'Provides 5 emergency blankets for displaced families'],
    [50, 'Supplies a family with food and water for one week'],
    [100, 'Funds emergency shelter materials for a household'],
    [250, 'Equips a volunteer with disaster response training'],
  ]);

  let lastFocusedEl = null;

  const formatUSD = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return '$0';
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  };

  const getSelectedAmount = () => {
    const pressed = amountButtons.find((b) => b.getAttribute('aria-pressed') === 'true');
    if (pressed) return Number(pressed.dataset.amount);
    const custom = Number(customAmountInput?.value);
    return Number.isFinite(custom) ? custom : 0;
  };

  const setPressedAmount = (value) => {
    amountButtons.forEach((btn) => {
      const isPressed = Number(btn.dataset.amount) === value;
      btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    });
  };

  const updateSummary = () => {
    const amount = getSelectedAmount();
    const frequency = freqSelect?.value === 'monthly' ? 'Monthly' : 'One-time';
    const impact = impactByAmount.get(amount) || 'Every dollar counts toward saving lives.';

    if (summaryAmount) summaryAmount.textContent = formatUSD(amount);
    if (summaryImpact) summaryImpact.textContent = impact;
    if (summaryFreq) summaryFreq.textContent = frequency;
  };

  const setDonateOpen = (open) => {
    if (!modalBackdrop || !modal) return;
    modalBackdrop.dataset.open = open ? 'true' : 'false';
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      lastFocusedEl = document.activeElement;
      updateSummary();
      // Focus first actionable control in modal
      (amountButtons[0] || customAmountInput || closeDonateBtn)?.focus();
    } else {
      lastFocusedEl?.focus?.();
      lastFocusedEl = null;
    }
  };

  openDonateBtns.forEach((b) => b.addEventListener('click', () => setDonateOpen(true)));
  closeDonateBtn?.addEventListener('click', () => setDonateOpen(false));
  cancelDonateBtn?.addEventListener('click', () => setDonateOpen(false));
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) setDonateOpen(false);
  });

  const announceKey = (e) => {
    if (!modalBackdrop || modalBackdrop.dataset.open !== 'true') return;
    if (e.key === 'Enter' && document.activeElement?.classList?.contains('amount-btn')) {
      updateSummary();
    }
  };
  document.addEventListener('keyup', announceKey);

  amountButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = Number(btn.dataset.amount);
      setPressedAmount(value);
      if (customAmountInput) customAmountInput.value = '';
      updateSummary();
    });
  });

  customAmountInput?.addEventListener('input', () => {
    setPressedAmount(NaN);
    updateSummary();
  });
  freqSelect?.addEventListener('change', updateSummary);

  // Basic focus trap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop?.dataset.open === 'true') setDonateOpen(false);
      if (drawer?.getAttribute('aria-hidden') === 'false') setDrawerOpen(false);
    }

    if (e.key !== 'Tab') return;
    if (modalBackdrop?.dataset.open !== 'true') return;
    if (!modal) return;

    const focusables = qsa(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      modal
    ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

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
  });

  donateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = getSelectedAmount();
    if (!Number.isFinite(amount) || amount <= 0) {
      customAmountInput?.focus();
      customAmountInput?.setCustomValidity?.('Please enter an amount.');
      customAmountInput?.reportValidity?.();
      customAmountInput?.setCustomValidity?.('');
      return;
    }

    // Lightweight confirmation without network calls.
    const email = donorEmail?.value?.trim();
    const msg = email
      ? `Thank you. A receipt will be sent to ${email}.`
      : 'Thank you. Your support helps communities recover.';

    const confirmEl = qs('#donate-confirm');
    if (confirmEl) {
      confirmEl.textContent = msg;
      confirmEl.hidden = false;
    }
  });

  // ---------- Impact counters ----------
  const counters = qsa('[data-counter]');
  const animateCounter = (el) => {
    const end = Number(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = prefersReducedMotion ? 0 : 1100;

    if (!Number.isFinite(end)) return;
    if (duration === 0) {
      el.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      return;
    }

    const start = 0;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      // Ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(start + (end - start) * eased);
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (counters.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );
    counters.forEach((c) => io.observe(c));
  }

  // ---------- Programs accordion ----------
  qsa('[data-accordion-item]').forEach((item) => {
    const btn = qs('button[data-accordion-button]', item);
    const panel = qs('[data-accordion-panel]', item);
    if (!btn || !panel) return;

    const sync = (open) => {
      item.dataset.open = open ? 'true' : 'false';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0px';
      }
    };

    sync(false);
    btn.addEventListener('click', () => {
      const open = item.dataset.open !== 'true';
      sync(open);
    });

    window.addEventListener('resize', () => {
      if (item.dataset.open === 'true') {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // ---------- News carousel ----------
  const carousel = qs('[data-carousel]');
  if (carousel) {
    const track = qs('[data-carousel-track]', carousel);
    const prevBtn = qs('[data-carousel-prev]', carousel);
    const nextBtn = qs('[data-carousel-next]', carousel);
    const cards = qsa('[data-carousel-card]', carousel);

    let index = 0;

    const itemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 720) return 1;
      if (width <= 980) return 2;
      return 3;
    };

    const maxIndex = () => Math.max(0, cards.length - itemsPerView());

    const cardStep = () => {
      if (!cards.length) return 0;
      const style = getComputedStyle(track);
      const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0;
      const w = cards[0].getBoundingClientRect().width;
      return w + gap;
    };

    const render = () => {
      index = Math.min(Math.max(0, index), maxIndex());
      const step = cardStep();
      track.style.transform = `translateX(${-index * step}px)`;
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= maxIndex();
    };

    prevBtn?.addEventListener('click', () => {
      index -= 1;
      render();
    });
    nextBtn?.addEventListener('click', () => {
      index += 1;
      render();
    });

    window.addEventListener('resize', render);
    render();
  }
})();
