/* WellStream marketing site interactions (no build step). */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setActiveNav() {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('[data-nav]').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (!href) return;
    a.classList.toggle('active', href === path);
  });
}

function initDropdowns(root = document) {
  $$('.dropdown', root).forEach((dd) => {
    const btn = $('button', dd);
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', (e) => {
    $$('.dropdown.open').forEach((dd) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        const btn = $('button', dd);
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    $$('.dropdown.open').forEach((dd) => {
      dd.classList.remove('open');
      const btn = $('button', dd);
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initMobileNav() {
  const toggle = $('[data-mobile-toggle]');
  const panel = $('[data-mobile-panel]');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (panel.classList.contains('open') && !panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initTabs(scope = document) {
  $$('[data-tabs]', scope).forEach((tabs) => {
    const buttons = $$('[role="tab"]', tabs);
    const panels = $$('[role="tabpanel"]', tabs);
    if (!buttons.length || !panels.length) return;

    function activate(id, { focus = false } = {}) {
      buttons.forEach((b) => {
        const selected = b.getAttribute('aria-controls') === id;
        b.setAttribute('aria-selected', selected ? 'true' : 'false');
        b.tabIndex = selected ? 0 : -1;
        if (selected && focus) b.focus();
      });
      panels.forEach((p) => {
        const show = p.id === id;
        p.hidden = !show;
      });
    }

    buttons.forEach((b) => {
      b.addEventListener('click', () => activate(b.getAttribute('aria-controls')));
      b.addEventListener('keydown', (e) => {
        const idx = buttons.indexOf(b);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const next = (idx + dir + buttons.length) % buttons.length;
          activate(buttons[next].getAttribute('aria-controls'), { focus: true });
        }
      });
    });

    const initial = buttons.find((b) => b.getAttribute('aria-selected') === 'true') || buttons[0];
    activate(initial.getAttribute('aria-controls'));
  });
}

function initAccordion(scope = document) {
  const acc = $('[data-accordion]', scope);
  if (!acc) return;
  const items = $$('[data-acc-item]', acc);
  if (!items.length) return;

  function openItem(target) {
    items.forEach((it) => {
      const btn = $('[data-acc-btn]', it);
      const panel = $('[data-acc-panel]', it);
      const open = it === target;
      it.dataset.open = open ? 'true' : 'false';
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.hidden = !open;
    });
  }

  items.forEach((it) => {
    const btn = $('[data-acc-btn]', it);
    const panel = $('[data-acc-panel]', it);
    if (!btn || !panel) return;
    panel.hidden = true;
    btn.addEventListener('click', () => openItem(it));
  });

  openItem(items[0]);
}

function initCarousel(scope = document) {
  const root = $('[data-carousel]', scope);
  if (!root) return;
  const track = $('[data-track]', root);
  const dots = $$('[data-dot]', root);
  if (!track || !dots.length) return;
  let index = 0;

  function go(i, { focus = false } = {}) {
    index = Math.max(0, Math.min(dots.length - 1, i));
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, di) => {
      const sel = di === index;
      d.setAttribute('aria-selected', sel ? 'true' : 'false');
      if (sel && focus) d.focus();
    });
  }

  dots.forEach((d, di) => {
    d.addEventListener('click', () => go(di));
    d.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go((index + 1) % dots.length, { focus: true }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go((index - 1 + dots.length) % dots.length, { focus: true }); }
    });
  });

  go(0);
}

function showToast(msg) {
  const toast = $('[data-toast]');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function initCookieBanner() {
  const banner = $('[data-cookie]');
  if (!banner) return;
  const key = 'wellstream_cookie_pref_v1';
  const pref = localStorage.getItem(key);
  if (!pref) banner.classList.add('show');

  const accept = $('[data-cookie-accept]', banner);
  const decline = $('[data-cookie-decline]', banner);
  function setPref(v) {
    localStorage.setItem(key, v);
    banner.classList.remove('show');
    showToast(v === 'accept' ? 'Cookie preferences saved: Accept' : 'Cookie preferences saved: Decline');
  }
  if (accept) accept.addEventListener('click', () => setPref('accept'));
  if (decline) decline.addEventListener('click', () => setPref('decline'));
}

function initDemoForm() {
  const form = $('[data-demo-form]');
  if (!form) return;

  const required = ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'country'];
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldInvalid(name, invalid, message) {
    const field = form.querySelector(`[data-field="${name}"]`);
    if (!field) return;
    field.dataset.invalid = invalid ? 'true' : 'false';
    const err = $('.error', field);
    if (err && message) err.textContent = message;
  }

  function validate() {
    let ok = true;
    const data = Object.fromEntries(new FormData(form).entries());
    required.forEach((name) => {
      const v = (data[name] || '').toString().trim();
      const missing = !v;
      setFieldInvalid(name, missing, 'This field is required.');
      ok = ok && !missing;
    });

    const email = (data.email || '').toString().trim();
    if (email && !emailRe.test(email)) {
      setFieldInvalid('email', true, 'Enter a valid business email.');
      ok = false;
    }

    // Phone is optional; normalize spacing for nicer payload.
    if (data.phone) data.phone = data.phone.toString().trim();
    return { ok, data };
  }

  $$('input, select, textarea', form).forEach((el) => {
    el.addEventListener('blur', () => validate());
    el.addEventListener('input', () => {
      const field = el.closest('[data-field]');
      if (field && field.dataset.invalid === 'true') validate();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { ok, data } = validate();
    if (!ok) {
      showToast('Please fix the highlighted fields.');
      const firstInvalid = form.querySelector('[data-field][data-invalid="true"] input, [data-field][data-invalid="true"] select, [data-field][data-invalid="true"] textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend in this static build: store draft locally as proof of submission.
    const key = 'wellstream_demo_request_v1';
    const payload = { ...data, submittedAt: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(payload));
    form.reset();
    $$('[data-field]', form).forEach((f) => (f.dataset.invalid = 'false'));
    showToast('Request received. Our team will reach out shortly.');
  });
}

function initUseCaseCards() {
  $$('[data-usecase-card]').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Keep it simple for this 5-page site: route to demo with context.
      e.preventDefault();
      const title = card.getAttribute('data-usecase') || 'Use Case';
      const url = new URL('request-demo.html', location.href);
      url.searchParams.set('topic', title);
      location.href = url.toString();
    });
  });
}

function prefillDemoTopic() {
  const form = $('[data-demo-form]');
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic');
  if (!topic) return;
  const comments = form.querySelector('textarea[name="comments"]');
  if (comments && !comments.value) {
    comments.value = `Interested in: ${topic}\n\n`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initDropdowns();
  initMobileNav();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initDemoForm();
  initUseCaseCards();
  prefillDemoTopic();
});

