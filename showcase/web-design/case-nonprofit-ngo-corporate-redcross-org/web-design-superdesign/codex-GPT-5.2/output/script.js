function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatHumanNumber(value) {
  return value.toLocaleString(undefined);
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setBodyScrollLocked(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

// Mobile drawer
function setupDrawer() {
  const drawer = document.querySelector('[data-drawer]');
  if (!drawer) return;
  const openBtn = document.querySelector('[data-drawer-open]');
  const closeBtn = document.querySelector('[data-drawer-close]');
  const backdrop = drawer.querySelector('[data-drawer-backdrop]');

  function open() {
    drawer.setAttribute('data-open', 'true');
    setBodyScrollLocked(true);
    closeBtn?.focus();
  }

  function close() {
    drawer.setAttribute('data-open', 'false');
    setBodyScrollLocked(false);
    openBtn?.focus();
  }

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  drawer.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => close());
  });
}

// Donate modal
function setupDonateModal() {
  const modal = document.querySelector('[data-modal="donate"]');
  if (!modal) return;

  const openers = document.querySelectorAll('[data-open-donate]');
  const closer = modal.querySelector('[data-close-modal]');
  const backdrop = modal.querySelector('[data-modal-backdrop]');
  const customInput = modal.querySelector('[data-custom-amount]');
  const amountButtons = modal.querySelectorAll('[data-amount]');
  const amountHidden = modal.querySelector('input[name="amount"]');
  const impact = modal.querySelector('[data-impact]');

  const impactByAmount = {
    25: 'Provides 5 emergency blankets for displaced families',
    50: 'Supplies a family with food and water for one week',
    100: 'Funds emergency shelter materials for a household',
    250: 'Equips a volunteer with disaster response training',
  };

  let lastFocused = null;

  function setActiveAmount(amount) {
    amountButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-amount') === String(amount);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    if (amountHidden) amountHidden.value = String(amount ?? '');
    if (impact) {
      if (amount && impactByAmount[amount]) {
        impact.textContent = impactByAmount[amount];
      } else {
        impact.textContent = 'Every dollar counts toward saving lives.';
      }
    }
  }

  function open() {
    lastFocused = document.activeElement;
    modal.setAttribute('data-open', 'true');
    setBodyScrollLocked(true);
    const first = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    first?.focus();
  }

  function close() {
    modal.setAttribute('data-open', 'false');
    setBodyScrollLocked(false);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  openers.forEach((btn) => btn.addEventListener('click', open));
  closer?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  amountButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const amount = Number(btn.getAttribute('data-amount'));
      if (customInput) customInput.value = '';
      setActiveAmount(amount);
    });
  });

  customInput?.addEventListener('input', () => {
    const raw = String(customInput.value || '').replace(/[^0-9]/g, '');
    customInput.value = raw;
    const amount = raw ? Number(raw) : null;
    setActiveAmount(amount);
    amountButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
  });

  // Default selection
  setActiveAmount(50);

  const form = modal.querySelector('form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const amount = fd.get('amount');
    const email = fd.get('email');
    const name = fd.get('name');
    // Demo-only: show a lightweight confirmation
    const msg = modal.querySelector('[data-confirm]');
    if (msg) {
      msg.textContent = `Thanks${name ? `, ${name}` : ''}! We’re ready to process your $${amount} gift. (Demo form — no payment processed.)`;
      msg.style.display = 'block';
    }
    if (typeof email === 'string' && email.length > 0) {
      // keep it; no network
    }
  });
}

// Impact counters
function setupCounters() {
  const targets = document.querySelectorAll('[data-counter]');
  if (!targets.length) return;

  function animate(el) {
    const to = Number(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    if (!Number.isFinite(to)) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${formatHumanNumber(to)}${suffix}`;
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const from = 0;

    function frame(now) {
      const t = clamp((now - start) / duration, 0, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(from + (to - from) * eased);
      el.textContent = `${prefix}${formatHumanNumber(current)}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.getAttribute('data-done') === 'true') return;
        el.setAttribute('data-done', 'true');
        animate(el);
      });
    },
    { threshold: 0.25 }
  );

  targets.forEach((el) => io.observe(el));
}

// Programs accordion
function setupAccordion() {
  const items = document.querySelectorAll('[data-accordion-item]');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    trigger?.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      items.forEach((i) => i.setAttribute('data-open', 'false'));
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
    });
  });

  // Open first by default
  items[0]?.setAttribute('data-open', 'true');
}

// News carousel
function setupCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const cards = carousel.querySelectorAll('[data-carousel-card]');

  if (!track || !viewport || !cards.length) return;

  let index = 0;

  function cardsPerView() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 720) return 2;
    return 1;
  }

  function maxIndex() {
    return Math.max(0, cards.length - cardsPerView());
  }

  function stepWidth() {
    // Use first card width plus gap, computed from layout
    const first = cards[0];
    const rect = first.getBoundingClientRect();
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return rect.width + gap;
  }

  function update() {
    index = clamp(index, 0, maxIndex());
    const x = stepWidth() * index;
    track.style.transform = `translateX(${-x}px)`;
    prevBtn?.setAttribute('aria-disabled', index === 0 ? 'true' : 'false');
    nextBtn?.setAttribute('aria-disabled', index === maxIndex() ? 'true' : 'false');
  }

  prevBtn?.addEventListener('click', () => {
    index -= cardsPerView();
    update();
  });
  nextBtn?.addEventListener('click', () => {
    index += cardsPerView();
    update();
  });

  window.addEventListener('resize', () => {
    update();
  });

  update();
}

// Smooth anchor scroll (drawer-friendly)
function setupAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDrawer();
  setupDonateModal();
  setupCounters();
  setupAccordion();
  setupCarousel();
  setupAnchors();

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

