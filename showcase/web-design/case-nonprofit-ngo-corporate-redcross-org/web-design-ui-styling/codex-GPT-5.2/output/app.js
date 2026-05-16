(() => {
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const state = {
    lastFocus: null,
    modal: {
      amount: 50,
      amountIsCustom: false
    }
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const lockScroll = (locked) => {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  };

  // Drawer
  const setDrawerOpen = (open) => {
    document.body.dataset.drawerOpen = open ? 'true' : 'false';
    const btn = $('#mobileMenuBtn');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    lockScroll(open || document.body.dataset.modalOpen === 'true');
  };

  const toggleDrawer = () => {
    setDrawerOpen(document.body.dataset.drawerOpen !== 'true');
  };

  // Modal
  const setModalOpen = (open) => {
    const modalOverlay = $('#donateModalOverlay');
    if (!modalOverlay) return;

    if (open) {
      state.lastFocus = document.activeElement;
      document.body.dataset.modalOpen = 'true';
      modalOverlay.removeAttribute('aria-hidden');
      lockScroll(true);

      const first = $(focusableSelector, modalOverlay);
      first?.focus();
    } else {
      document.body.dataset.modalOpen = 'false';
      modalOverlay.setAttribute('aria-hidden', 'true');
      lockScroll(document.body.dataset.drawerOpen === 'true');
      if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
    }
  };

  const setAmount = (amount, isCustom = false) => {
    state.modal.amount = amount;
    state.modal.amountIsCustom = isCustom;

    const buttons = $$('.amount-btn');
    buttons.forEach((b) => {
      const val = b.getAttribute('data-amount');
      const matches = !isCustom && val && Number(val) === amount;
      b.setAttribute('aria-pressed', matches ? 'true' : 'false');
    });

    const custom = $('#donateCustomAmount');
    if (custom) {
      if (isCustom) custom.value = String(amount || '');
      custom.toggleAttribute('data-active', isCustom);
    }

    const amountLabel = $('#donateSelectedAmount');
    if (amountLabel) amountLabel.textContent = formatCurrency(amount || 0);
  };

  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value);
    } catch {
      return `$${value}`;
    }
  };

  // Counters
  const animateCounters = () => {
    const counters = $$('[data-counter]');
    if (!counters.length) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const run = (el) => {
      if (el.dataset.counterDone === 'true') return;
      el.dataset.counterDone = 'true';

      const target = Number(el.getAttribute('data-counter') || '0');
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';

      if (reduceMotion) {
        el.textContent = `${prefix}${target}${suffix}`;
        return;
      }

      const start = 0;
      const duration = 900;
      const startTime = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(start + (target - start) * eased);
        el.textContent = `${prefix}${current}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) run(e.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((c) => io.observe(c));
  };

  // Accordion
  const initAccordion = () => {
    const items = $$('.acc-item');
    if (!items.length) return;

    const closeAllExcept = (keepId) => {
      items.forEach((item) => {
        if (item.id === keepId) return;
        setAccordionItemOpen(item, false);
      });
    };

    const setAccordionItemOpen = (item, open) => {
      const trigger = $('.acc-trigger', item);
      const panel = $('.acc-panel', item);
      if (!trigger || !panel) return;

      item.dataset.open = open ? 'true' : 'false';
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');

      const inner = $('.acc-panel-inner', panel);
      const targetHeight = open ? inner.scrollHeight : 0;
      panel.style.height = `${targetHeight}px`;
    };

    items.forEach((item, idx) => {
      const trigger = $('.acc-trigger', item);
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.dataset.open === 'true';
        closeAllExcept(item.id);
        setAccordionItemOpen(item, !isOpen);
      });

      // Open the first by default (credibility + reduces scrolling)
      if (idx === 0) {
        setAccordionItemOpen(item, true);
      } else {
        setAccordionItemOpen(item, false);
      }
    });

    // Recalculate heights on resize
    window.addEventListener('resize', () => {
      items.forEach((item) => {
        if (item.dataset.open !== 'true') return;
        const panel = $('.acc-panel', item);
        const inner = $('.acc-panel-inner', panel);
        panel.style.height = `${inner.scrollHeight}px`;
      });
    });
  };

  // Carousel
  const initCarousel = () => {
    const track = $('#newsTrack');
    const windowEl = $('#newsWindow');
    if (!track || !windowEl) return;

    const slides = $$('.news-slide', track);
    let index = 0;

    const slidesPerView = () => {
      const w = window.innerWidth;
      if (w >= 1020) return 3;
      if (w >= 760) return 2;
      return 1;
    };

    const clampIndex = () => {
      const spv = slidesPerView();
      const max = Math.max(0, slides.length - spv);
      index = Math.max(0, Math.min(index, max));
      return { spv, max };
    };

    const update = () => {
      const { spv, max } = clampIndex();
      const pct = (100 / spv) * index;
      track.style.transform = `translateX(-${pct}%)`;

      const prev = $('#newsPrev');
      const next = $('#newsNext');
      prev?.toggleAttribute('disabled', index <= 0);
      next?.toggleAttribute('disabled', index >= max);

      const status = $('#newsStatus');
      if (status) {
        status.textContent = `Showing stories ${index + 1}–${Math.min(
          index + spv,
          slides.length
        )} of ${slides.length}`;
      }
    };

    $('#newsPrev')?.addEventListener('click', () => {
      index -= 1;
      update();
    });

    $('#newsNext')?.addEventListener('click', () => {
      index += 1;
      update();
    });

    window.addEventListener('resize', update);
    update();
  };

  // Keyboard handling for drawer + modal
  const initGlobalKeys = () => {
    document.addEventListener('keydown', (e) => {
      const modalOpen = document.body.dataset.modalOpen === 'true';
      const drawerOpen = document.body.dataset.drawerOpen === 'true';

      if (e.key === 'Escape') {
        if (modalOpen) {
          e.preventDefault();
          setModalOpen(false);
        } else if (drawerOpen) {
          e.preventDefault();
          setDrawerOpen(false);
        }
      }

      if (modalOpen && e.key === 'Tab') {
        const overlay = $('#donateModalOverlay');
        const focusables = $$(focusableSelector, overlay);
        if (!focusables.length) return;
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
    });
  };

  const initDonateModal = () => {
    const openButtons = $$('[data-open-donate]');
    const overlay = $('#donateModalOverlay');
    const closeButton = $('#donateModalClose');
    if (!overlay) return;

    overlay.setAttribute('aria-hidden', 'true');
    document.body.dataset.modalOpen = 'false';

    openButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setModalOpen(true);
      });
    });

    closeButton?.addEventListener('click', () => setModalOpen(false));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) setModalOpen(false);
    });

    $$('.amount-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-amount');
        if (!val) return;
        setAmount(Number(val), false);
      });
    });

    const custom = $('#donateCustomAmount');
    custom?.addEventListener('input', () => {
      const num = Number(custom.value || '0');
      setAmount(isFinite(num) ? num : 0, true);
    });

    const form = $('#donateForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = $('#donateName')?.value?.trim() || '';
      const email = $('#donateEmail')?.value?.trim() || '';
      const recurring = $('#donateFrequency')?.value || 'one-time';

      const msg = $('#donateMessage');
      if (msg) {
        msg.textContent = `Thanks${name ? `, ${name}` : ''}. This demo would process a ${formatCurrency(
          state.modal.amount
        )} ${recurring} donation and email a receipt to ${email || 'your address'}.`;
      }
    });

    setAmount(50, false);
  };

  const initDrawer = () => {
    document.body.dataset.drawerOpen = 'false';
    $('#mobileMenuBtn')?.addEventListener('click', toggleDrawer);
    $('#drawerOverlay')?.addEventListener('click', () => setDrawerOpen(false));
    $('#drawerClose')?.addEventListener('click', () => setDrawerOpen(false));

    // Close drawer when clicking any drawer link
    $$('.drawer nav a').forEach((a) => {
      a.addEventListener('click', () => setDrawerOpen(false));
    });
  };

  const init = () => {
    initDrawer();
    initDonateModal();
    initGlobalKeys();
    initAccordion();
    initCarousel();
    animateCounters();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

