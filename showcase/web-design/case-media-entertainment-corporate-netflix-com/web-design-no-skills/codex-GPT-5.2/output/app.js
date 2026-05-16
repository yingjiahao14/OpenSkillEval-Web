(function () {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setMosaic() {
    const root = document.documentElement;
    const w = 1200;
    const h = 680;
    const cols = 10;
    const rows = 6;
    const tileW = Math.ceil(w / cols);
    const tileH = Math.ceil(h / rows);

    const colors = [
      [229, 9, 20],
      [255, 255, 255],
      [32, 32, 32],
      [18, 18, 18],
      [120, 20, 20],
      [30, 30, 30],
    ];

    function posterSVG(i) {
      const base = colors[i % colors.length];
      const accent = colors[(i + 2) % colors.length];
      const title = `SW-${String(i + 1).padStart(2, '0')}`;
      const bg = `rgb(${base[0]},${base[1]},${base[2]})`;
      const a = `rgb(${accent[0]},${accent[1]},${accent[2]})`;
      const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${tileW}" height="${tileH}" viewBox="0 0 ${tileW} ${tileH}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${a}"/>
    </linearGradient>
    <radialGradient id="r" cx="35%" cy="25%" r="75%">
      <stop offset="0" stop-color="rgba(255,255,255,.22)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <rect x="12" y="12" width="${tileW - 24}" height="${tileH - 24}" rx="16" ry="16" fill="rgba(0,0,0,.18)" stroke="rgba(255,255,255,.16)"/>
  <text x="20" y="38" fill="rgba(255,255,255,.92)" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial" font-weight="900" font-size="18">${title}</text>
  <text x="20" y="${tileH - 26}" fill="rgba(255,255,255,.80)" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial" font-weight="700" font-size="12" letter-spacing=".8">STREAMWAVE</text>
</svg>`;
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
    }

    const layers = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        layers.push(`url("${posterSVG(i++)}") ${c * tileW}px ${r * tileH}px / ${tileW}px ${tileH}px no-repeat`);
      }
    }

    root.style.setProperty('--poster-mosaic', layers.join(', '));
  }

  function attachEmailCapture(form) {
    if (!form) return;
    const input = $('input[type="email"]', form);
    const note = form.nextElementSibling && form.nextElementSibling.classList?.contains('capture-note')
      ? form.nextElementSibling
      : null;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (input?.value || '').trim();

      if (!email) {
        input?.focus();
        if (note) {
          note.textContent = 'Please enter your email to continue.';
          note.dataset.state = 'error';
        }
        return;
      }

      if (note) {
        note.textContent = `Nice — we’ll use ${email} to get you started.`;
        note.dataset.state = 'ok';
      }

      try {
        localStorage.setItem('streamwave_email', email);
      } catch (_) {}

      const btn = $('button[type="submit"]', form);
      if (btn) {
        const prev = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Starting…';
        window.setTimeout(() => {
          btn.disabled = false;
          btn.textContent = prev;
        }, 900);
      }
    });
  }

  function initCarousel() {
    const scroller = $('[data-carousel]');
    if (!scroller) return;

    const next = $('[data-carousel-next]');
    const prev = $('[data-carousel-prev]');

    function scrollByCards(dir) {
      const card = scroller.querySelector('[data-card]');
      const gap = 14;
      const amount = (card?.getBoundingClientRect().width || 220) + gap;
      scroller.scrollBy({ left: dir * amount * 2, behavior: 'smooth' });
    }

    next?.addEventListener('click', () => scrollByCards(1));
    prev?.addEventListener('click', () => scrollByCards(-1));

    // Enable keyboard scrolling when focused
    scroller.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByCards(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByCards(-1);
      }
    });

    function updateButtons() {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const left = scroller.scrollLeft;
      prev && (prev.disabled = left <= 2);
      next && (next.disabled = left >= max - 2);
    }

    scroller.addEventListener('scroll', () => window.requestAnimationFrame(updateButtons));
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }

  function initFAQ() {
    const wrap = $('[data-faq]');
    if (!wrap) return;
    const items = $$('.faq-item', wrap);

    function closeAll(except) {
      for (const item of items) {
        if (item === except) continue;
        item.setAttribute('aria-expanded', 'false');
        const panel = $('.faq-a', item);
        if (panel) panel.style.maxHeight = '0px';
        const btn = $('.faq-q', item);
        btn && btn.setAttribute('aria-expanded', 'false');
      }
    }

    function openItem(item) {
      item.setAttribute('aria-expanded', 'true');
      const panel = $('.faq-a', item);
      const inner = $('.faq-a-inner', item);
      const btn = $('.faq-q', item);
      btn && btn.setAttribute('aria-expanded', 'true');
      if (panel && inner) {
        const target = clamp(inner.scrollHeight + 2, 0, 1200);
        panel.style.maxHeight = `${target}px`;
      }
    }

    for (const item of items) {
      const btn = $('.faq-q', item);
      const panel = $('.faq-a', item);
      const inner = $('.faq-a-inner', item);
      if (!btn || !panel || !inner) continue;

      // initialize collapsed
      item.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';

      btn.addEventListener('click', () => {
        const expanded = item.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          item.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
          return;
        }
        closeAll(item);
        openItem(item);
      });
    }

    // Keep the open item sized on resize
    window.addEventListener('resize', () => {
      const open = items.find((i) => i.getAttribute('aria-expanded') === 'true');
      if (!open) return;
      const panel = $('.faq-a', open);
      const inner = $('.faq-a-inner', open);
      if (!panel || !inner) return;
      panel.style.maxHeight = `${clamp(inner.scrollHeight + 2, 0, 1200)}px`;
    });
  }

  function initLogin() {
    const form = $('[data-login-form]');
    if (form) {
      const email = $('[name="identifier"]', form);
      const pass = $('[name="password"]', form);
      const emailErr = $('[data-err="identifier"]', form);
      const passErr = $('[data-err="password"]', form);

      try {
        const saved = localStorage.getItem('streamwave_email');
        if (saved && email && !email.value) email.value = saved;
      } catch (_) {}

      function setErr(el, show, msg) {
        if (!el) return;
        if (show) {
          el.textContent = msg;
          el.classList.add('show');
        } else {
          el.classList.remove('show');
        }
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const idVal = (email?.value || '').trim();
        const pwVal = pass?.value || '';

        let ok = true;
        if (!idVal) {
          ok = false;
          setErr(emailErr, true, 'Please enter your email or mobile number.');
        } else {
          setErr(emailErr, false, '');
        }

        if (!pwVal || pwVal.length < 6) {
          ok = false;
          setErr(passErr, true, 'Password must be at least 6 characters.');
        } else {
          setErr(passErr, false, '');
        }

        if (!ok) {
          (emailErr?.classList.contains('show') ? email : pass)?.focus();
          return;
        }

        const btn = $('button[type="submit"]', form);
        if (btn) {
          const prev = btn.textContent;
          btn.disabled = true;
          btn.textContent = 'Signing in…';
          window.setTimeout(() => {
            btn.disabled = false;
            btn.textContent = prev;
          }, 900);
        }
      });
    }

    const toggle = $('[data-help-toggle]');
    const panel = $('[data-help-panel]');
    if (toggle && panel) {
      panel.style.maxHeight = '0px';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (expanded) {
          panel.style.maxHeight = '0px';
        } else {
          const inner = panel.querySelector('.help-inner');
          panel.style.maxHeight = `${clamp((inner?.scrollHeight || 0) + 2, 0, 800)}px`;
        }
      });
      window.addEventListener('resize', () => {
        if (toggle.getAttribute('aria-expanded') !== 'true') return;
        const inner = panel.querySelector('.help-inner');
        panel.style.maxHeight = `${clamp((inner?.scrollHeight || 0) + 2, 0, 800)}px`;
      });
    }
  }

  function init() {
    setMosaic();
    attachEmailCapture($('[data-email-form="hero"]'));
    attachEmailCapture($('[data-email-form="cta"]'));
    initCarousel();
    initFAQ();
    initLogin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

