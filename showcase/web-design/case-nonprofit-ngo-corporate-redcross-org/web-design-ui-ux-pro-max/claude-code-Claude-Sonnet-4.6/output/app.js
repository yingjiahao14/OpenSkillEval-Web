/* ============================================================
   GLOBAL AID ALLIANCE — app.js
   Interactions: Mobile menu, Donate modal, Accordion,
                 News carousel, Counter animation
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility ─────────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ── Mobile Navigation ───────────────────────────────────── */
  const hamburgerBtn   = $('#hamburger-btn');
  const mobileNav      = $('#mobile-nav');
  const mobileOverlay  = $('#mobile-nav-overlay');
  const mobileClose    = $('#mobile-nav-close');
  const mobileLinks    = $$('.mobile-nav-link');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileOverlay.classList.add('active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburgerBtn.focus();
  }

  hamburgerBtn.addEventListener('click', openMobileNav);
  mobileClose.addEventListener('click', closeMobileNav);
  mobileOverlay.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* ── Donate Modal ────────────────────────────────────────── */
  const donateModal  = $('#donate-modal');
  const modalClose   = $('#modal-close');
  const donateButtons = $$('#header-donate-btn, #hero-donate-btn, #involved-donate-btn, #cta-donate-btn, #mobile-donate-btn');

  let previouslyFocused = null;

  function openDonateModal(triggerEl) {
    previouslyFocused = triggerEl || document.activeElement;
    donateModal.classList.add('open');
    donateModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first interactive element in modal
    setTimeout(() => {
      const first = donateModal.querySelector('input, button:not(.modal-close)');
      if (first) first.focus();
    }, 150);
  }

  function closeDonateModal() {
    donateModal.classList.remove('open');
    donateModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previouslyFocused) previouslyFocused.focus();
  }

  donateButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // also close mobile nav if open
      if (mobileNav.classList.contains('open')) closeMobileNav();
      openDonateModal(btn);
    });
  });

  modalClose.addEventListener('click', closeDonateModal);

  donateModal.addEventListener('click', function (e) {
    if (e.target === donateModal) closeDonateModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && donateModal.classList.contains('open')) {
      closeDonateModal();
    }
  });

  // Trap focus in modal
  donateModal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = $$('button, input, [tabindex]:not([tabindex="-1"])', donateModal).filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Modal radio amount selection — visual sync
  $$('input[name="donation_amount"]').forEach(radio => {
    radio.addEventListener('change', function () {
      $$('.modal-amount-btn').forEach(btn => btn.classList.remove('modal-amount-btn-selected'));
      const btn = this.nextElementSibling;
      if (btn) btn.classList.add('modal-amount-btn-selected');
      // clear custom amount
      const custom = $('#custom-amount');
      if (custom) custom.value = '';
    });
  });

  // Donate form submit (demo: shows confirmation)
  const donateForm = $('#donate-form');
  if (donateForm) {
    donateForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = donateForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Processing…';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 9l4 4 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Thank You!
        `;
        submitBtn.style.background = '#059669';
        setTimeout(() => {
          closeDonateModal();
          submitBtn.innerHTML = 'Complete Donation';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          donateForm.reset();
          $$('.modal-amount-btn').forEach(b => b.classList.remove('modal-amount-btn-selected'));
          $$('.modal-amount-btn-selected, .modal-amount-popular .modal-amount-btn').forEach(b => {
            if (b.closest('.modal-amount-popular')) b.classList.add('modal-amount-btn-selected');
          });
        }, 2000);
      }, 1400);
    });
  }

  // Section donate amount buttons (pre-select in modal)
  $$('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      $$('.amount-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      const amount = this.dataset.amount;
      const matchRadio = $(`input[name="donation_amount"][value="${amount}"]`);
      if (matchRadio) {
        matchRadio.checked = true;
        matchRadio.dispatchEvent(new Event('change'));
      }
    });
  });

  /* ── Accordion (Programs) ────────────────────────────────── */
  const accordionTriggers = $$('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const panelId  = this.getAttribute('aria-controls');
      const panel    = document.getElementById(panelId);

      // Close all
      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) {
          p.hidden = true;
          p.style.maxHeight = '0';
          p.style.visibility = 'hidden';
        }
      });

      // Open clicked (toggle)
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        panel.style.visibility = 'visible';
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Init: open first accordion
  const firstTrigger = accordionTriggers[0];
  if (firstTrigger) {
    const firstPanelId = firstTrigger.getAttribute('aria-controls');
    const firstPanel   = document.getElementById(firstPanelId);
    if (firstPanel) {
      firstPanel.hidden = false;
      firstPanel.style.visibility = 'visible';
      firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
    }
  }

  /* ── News Carousel ───────────────────────────────────────── */
  const track   = $('#carousel-track');
  const prevBtn = $('#carousel-prev');
  const nextBtn = $('#carousel-next');
  const dots    = $$('.carousel-dot');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalCards   = track.children.length;

    function getCardsPerView() {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 768)  return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, totalCards - cardsPerView);
    }

    function getCardWidth() {
      const card = track.children[0];
      if (!card) return 0;
      const style = window.getComputedStyle(track);
      const gap   = parseFloat(style.gap) || 20;
      return card.offsetWidth + gap;
    }

    function goTo(index) {
      const max = getMaxIndex();
      currentIndex = Math.max(0, Math.min(index, max));
      const offset = currentIndex * getCardWidth();
      track.style.transform = `translateX(-${offset}px)`;

      // Update dots
      dots.forEach((dot, i) => {
        const active = i === currentIndex;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', String(active));
      });

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= max;
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    dots.forEach(dot => {
      dot.addEventListener('click', function () {
        goTo(parseInt(this.dataset.index, 10));
      });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cardsPerView = getCardsPerView();
        goTo(Math.min(currentIndex, getMaxIndex()));
      }, 150);
    });

    goTo(0);
  }

  /* ── Animated Counters ───────────────────────────────────── */
  const statNumbers = $$('.stat-number');

  function formatNumber(val, format, prefix, suffix) {
    let str;
    if (format === 'comma') {
      str = Math.round(val).toLocaleString('en-US');
    } else {
      str = Math.round(val).toString();
    }
    return (prefix || '') + str + (suffix || '');
  }

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const format  = el.dataset.format || '';
    const duration = 2000;
    const start    = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current  = easeOut(progress) * target;
      el.textContent = formatNumber(current, format, prefix, suffix);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Trigger counters when section is visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => observer.observe(el));
  } else {
    // Fallback: set immediately
    statNumbers.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const format = el.dataset.format || '';
      el.textContent = formatNumber(target, format, prefix, suffix);
    });
  }

  /* ── Respect prefers-reduced-motion ─────────────────────── */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    // Immediately set counter values without animation
    statNumbers.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const format = el.dataset.format || '';
      el.textContent = formatNumber(target, format, prefix, suffix);
    });
  }

})();
