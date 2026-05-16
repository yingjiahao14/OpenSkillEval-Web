/* ============================================================
   GreenBean Coffee — Shared Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu Toggle ──────────────────────────────────── */
  const menuBtn  = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  /* ── Cookie Banner ───────────────────────────────────────── */
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAgree  = document.getElementById('cookie-agree');
  const cookieChange = document.getElementById('cookie-change');
  if (cookieBanner) {
    const dismissed = sessionStorage.getItem('cookieDismissed');
    if (!dismissed) {
      setTimeout(() => cookieBanner.classList.remove('hidden'), 800);
    } else {
      cookieBanner.remove();
    }
    if (cookieAgree) {
      cookieAgree.addEventListener('click', () => {
        sessionStorage.setItem('cookieDismissed', '1');
        cookieBanner.classList.add('hidden');
        setTimeout(() => cookieBanner.remove(), 400);
      });
    }
    if (cookieChange) {
      cookieChange.addEventListener('click', () => {
        cookieBanner.classList.add('hidden');
        setTimeout(() => cookieBanner.remove(), 400);
      });
    }
  }

  /* ── Footer Accordion (Mobile) ───────────────────────────── */
  document.querySelectorAll('.footer-col-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      const isOpen = col.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  /* ── Tabs ────────────────────────────────────────────────── */
  document.querySelectorAll('.tab-list').forEach(tabList => {
    const tabBtns   = tabList.querySelectorAll('.tab-btn');
    const container = tabList.closest('.tabs');
    if (!container) return;
    const panels = container.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const target = btn.dataset.target;
        const panel  = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ── Accordion ───────────────────────────────────────────── */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });

  /* ── Generic Carousels ───────────────────────────────────── */
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    initCarousel(wrap);
  });

  /* ── Store Locator ───────────────────────────────────────── */
  initStoreLocator();
});

/* ──────────────────────────────────────────────────────────── */
function initCarousel(wrap) {
  const track   = wrap.querySelector('.carousel-track');
  const items   = wrap.querySelectorAll('.carousel-item');
  const prevBtn = wrap.querySelector('.carousel-btn--prev');
  const nextBtn = wrap.querySelector('.carousel-btn--next');
  if (!track || !items.length) return;

  let current = 0;

  function getPerView() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1200) return 3;
    return 4;
  }

  function getItemWidth() {
    const pv = getPerView();
    const gap = 20;
    const vp  = track.parentElement.offsetWidth;
    return (vp - gap * (pv - 1)) / pv;
  }

  function update() {
    const pv = getPerView();
    const max = Math.max(0, items.length - pv);
    current = Math.min(Math.max(0, current), max);
    const iw  = getItemWidth();
    const gap = 20;
    const offset = current * (iw + gap);
    track.style.transform = `translateX(-${offset}px)`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= max;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { current--; update(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { current++; update(); });

  window.addEventListener('resize', update);
  update();
}

/* ──────────────────────────────────────────────────────────── */
function initStoreLocator() {
  const searchInput = document.getElementById('location-search');
  if (!searchInput) return;

  const suggestions = [
    '1912 Pike Pl, Seattle, WA 98101',
    'Pike Place Market, Seattle, WA',
    '429 15th Ave E, Seattle, WA 98112',
    '3401 Fremont Ave N, Seattle, WA 98103',
    '5420 22nd Ave NW, Ballard, WA 98107',
    '400 Westlake Ave N, Seattle, WA 98109',
    '1600 E Olive Way, Seattle, WA 98102',
    '2121 6th Ave, Seattle, WA 98121',
    '98101 — Downtown Seattle',
    '98103 — Fremont / Green Lake',
  ];

  const suggBox   = document.getElementById('search-suggestions');
  const clearBtn  = document.getElementById('search-clear');
  const filterBtn = document.getElementById('filter-btn');
  const filterPanel   = document.getElementById('filter-panel');
  const filterOverlay = document.getElementById('filter-overlay');
  const filterClose   = document.getElementById('filter-close');
  const applyFilter   = document.getElementById('apply-filter');

  /* Suggestions */
  if (searchInput && suggBox) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.toggle('visible', val.length > 0);
      if (!val) { suggBox.classList.remove('visible'); return; }
      const matches = suggestions.filter(s => s.toLowerCase().includes(val)).slice(0, 5);
      suggBox.innerHTML = matches.map(m => `
        <div class="suggestion-item" role="option" tabindex="0">
          <svg class="suggestion-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          ${m}
        </div>`).join('');
      suggBox.classList.toggle('visible', matches.length > 0);
      suggBox.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          searchInput.value = item.textContent.trim();
          suggBox.classList.remove('visible');
          if (clearBtn) clearBtn.classList.add('visible');
          doSearch(searchInput.value);
        });
      });
    });

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { suggBox.classList.remove('visible'); doSearch(searchInput.value); }
      if (e.key === 'Escape') { suggBox.classList.remove('visible'); }
    });

    document.addEventListener('click', e => {
      if (!searchInput.contains(e.target) && !suggBox.contains(e.target)) {
        suggBox.classList.remove('visible');
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.remove('visible');
      if (suggBox) suggBox.classList.remove('visible');
      searchInput.focus();
    });
  }

  /* Order type toggle */
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.toggle-group').querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type;
      document.querySelectorAll('.store-card').forEach(card => {
        card.style.display = 'block';
        if (type === 'delivery' && !card.dataset.delivery) card.style.display = 'none';
      });
    });
  });

  /* Filter panel */
  function openFilter() {
    if (filterPanel)  filterPanel.classList.add('open');
    if (filterOverlay) filterOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeFilter() {
    if (filterPanel)  filterPanel.classList.remove('open');
    if (filterOverlay) filterOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (filterBtn)    filterBtn.addEventListener('click', openFilter);
  if (filterClose)  filterClose.addEventListener('click', closeFilter);
  if (filterOverlay) filterOverlay.addEventListener('click', closeFilter);
  if (applyFilter)  applyFilter.addEventListener('click', closeFilter);

  /* Store card selection */
  document.querySelectorAll('.store-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.store-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

function doSearch(val) {
  if (!val.trim()) return;
  const resultCount = document.getElementById('result-count');
  if (resultCount) resultCount.textContent = 'Showing results near: ' + val;
}
