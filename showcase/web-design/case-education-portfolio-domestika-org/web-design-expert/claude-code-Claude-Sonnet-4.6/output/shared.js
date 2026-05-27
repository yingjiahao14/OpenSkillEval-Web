/* CreativeHub — Shared JavaScript */

// ─── Promo Banner Countdown ───
function initCountdown() {
  const banner = document.getElementById('promo-banner');
  if (!banner) return;
  const countdownEl = banner.querySelector('.countdown');
  if (!countdownEl) return;

  // Set 3h 47m remaining
  let total = 3 * 3600 + 47 * 60 + 33;
  function tick() {
    if (total <= 0) { banner.remove(); return; }
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    countdownEl.textContent = `${h}:${m}:${s}`;
    total--;
  }
  tick();
  setInterval(tick, 1000);

  banner.querySelector('.close-btn')?.addEventListener('click', () => {
    banner.style.transition = 'height .3s ease, opacity .3s ease';
    banner.style.overflow = 'hidden';
    banner.style.opacity = '0';
    banner.style.height = banner.offsetHeight + 'px';
    requestAnimationFrame(() => { banner.style.height = '0'; });
    setTimeout(() => banner.remove(), 350);
  });
}

// ─── Generic Carousel ───
function initCarousel(wrapperEl) {
  if (!wrapperEl) return;
  const track = wrapperEl.querySelector('.carousel-track');
  const prevBtn = wrapperEl.querySelector('.carousel-btn.prev');
  const nextBtn = wrapperEl.querySelector('.carousel-btn.next');
  const dotsContainer = wrapperEl.querySelector('.carousel-dots');
  if (!track) return;

  let current = 0;

  function getVisible() {
    const w = wrapperEl.offsetWidth;
    if (w < 500) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return Math.min(parseInt(wrapperEl.dataset.visible || 4), track.children.length);
  }

  function itemWidth() {
    const items = track.children;
    if (!items.length) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const vis = getVisible();
    return (wrapperEl.querySelector('.carousel-track-outer').offsetWidth - gap * (vis - 1)) / vis;
  }

  function getMax() { return Math.max(0, track.children.length - getVisible()); }

  function update() {
    const iw = itemWidth();
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    track.style.transform = `translateX(-${current * (iw + gap)}px)`;
    // fix child widths
    Array.from(track.children).forEach(c => { c.style.minWidth = iw + 'px'; c.style.maxWidth = iw + 'px'; });
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= getMax();
    if (dotsContainer) updateDots();
  }

  function updateDots() {
    const max = getMax() + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < Math.min(max, 8); i++) {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => { current = i; update(); });
      dotsContainer.appendChild(d);
    }
  }

  prevBtn?.addEventListener('click', () => { if (current > 0) { current--; update(); } });
  nextBtn?.addEventListener('click', () => { if (current < getMax()) { current++; update(); } });

  window.addEventListener('resize', () => { current = Math.min(current, getMax()); update(); });
  update();
}

// ─── Footer Accordion (mobile) ───
function initFooterAccordion() {
  document.querySelectorAll('.footer-col').forEach(col => {
    const toggle = col.querySelector('.footer-col-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      col.classList.toggle('open');
    });
  });
}

// ─── Password Toggle ───
function initPasswordToggle() {
  document.querySelectorAll('[data-password-toggle]').forEach(btn => {
    const target = document.getElementById(btn.dataset.passwordToggle);
    if (!target) return;
    btn.addEventListener('click', () => {
      const isHidden = target.type === 'password';
      target.type = isHidden ? 'text' : 'password';
      btn.querySelector('.eye-open')?.classList.toggle('hidden', !isHidden);
      btn.querySelector('.eye-closed')?.classList.toggle('hidden', isHidden);
    });
  });
}

// ─── FAQ Accordion ───
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!open) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ─── Init on DOM ready ───
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFooterAccordion();
  initPasswordToggle();
  initFAQ();
  document.querySelectorAll('.carousel-wrapper').forEach(initCarousel);
});
