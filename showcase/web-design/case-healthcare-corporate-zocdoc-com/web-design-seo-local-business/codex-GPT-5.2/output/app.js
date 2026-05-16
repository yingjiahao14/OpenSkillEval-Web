const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function escapeHtml(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildResultSummary({ query, location, insurance, source }) {
  const q = query?.trim() ? query.trim() : 'Any specialty';
  const loc = location?.trim() ? location.trim() : 'Near you';
  const ins = insurance?.trim() ? insurance.trim() : 'Any insurance';
  return {
    title: 'Search results (demo)',
    pills: [
      { label: 'Query', value: q },
      { label: 'Location', value: loc },
      { label: 'Insurance', value: ins },
      { label: 'Source', value: source || 'form' },
    ],
  };
}

function renderResults(summary) {
  const results = $('#results');
  if (!results) return;

  const pills = summary.pills
    .map(
      (p) =>
        `<span class="pill"><span>${escapeHtml(p.label)}:</span> <code>${escapeHtml(
          p.value
        )}</code></span>`
    )
    .join('');

  results.innerHTML = `
    <div class="results" role="status" aria-live="polite">
      <h3>${escapeHtml(summary.title)}</h3>
      <div class="row">${pills}</div>
      <p style="margin:10px 0 0;color:rgba(15,23,42,.72);font-weight:700;font-size:13px;max-width:80ch;">
        This is a static prototype: clicking Search or a specialty shows how filters would be applied.
      </p>
    </div>
  `;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initMobileDrawer() {
  const btn = $('#mobileMenuBtn');
  const drawer = $('#mobileDrawer');
  const backdrop = $('#drawerBackdrop');
  const closeBtn = $('#drawerCloseBtn');
  if (!btn || !drawer || !backdrop || !closeBtn) return;

  const open = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    btn.focus();
  };

  btn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) close();
    else open();
  });
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  });
}

function initAutocomplete() {
  const input = $('#queryInput');
  const wrap = $('#queryField');
  const panel = $('#autocomplete');
  const list = $('#autocompleteList');
  if (!input || !wrap || !panel || !list) return;

  const suggestions = [
    { type: 'Specialty', label: 'Dentist', icon: '🦷' },
    { type: 'Specialty', label: 'Primary Care', icon: '🩺' },
    { type: 'Specialty', label: 'Dermatologist', icon: '✨' },
    { type: 'Specialty', label: 'Psychiatrist', icon: '🧠' },
    { type: 'Specialty', label: 'Eye Doctor', icon: '👁️' },
    { type: 'Specialty', label: 'Orthopedic Surgeon', icon: '🦴' },
    { type: 'Condition', label: 'Back pain', icon: '📍' },
    { type: 'Condition', label: 'Anxiety', icon: '🌿' },
    { type: 'Condition', label: 'Acne', icon: '💧' },
    { type: 'Doctor', label: 'Dr. Sarah Chen', icon: '👩‍⚕️' },
    { type: 'Doctor', label: 'Dr. Michael Rivera', icon: '👨‍⚕️' },
  ];

  let activeIndex = -1;
  let current = [];
  let raf = null;

  const close = () => {
    panel.classList.remove('open');
    activeIndex = -1;
    input.setAttribute('aria-expanded', 'false');
  };

  const open = () => {
    panel.classList.add('open');
    input.setAttribute('aria-expanded', 'true');
  };

  const render = (items) => {
    list.innerHTML = items
      .map(
        (s, idx) => `
        <li class="ac-item" role="option" id="ac-${idx}" data-value="${escapeHtml(
          s.label
        )}">
          <div class="ac-icon" aria-hidden="true">${escapeHtml(s.icon)}</div>
          <div>
            <div class="ac-title">${escapeHtml(s.label)}</div>
            <div class="ac-meta">${escapeHtml(s.type)}</div>
          </div>
        </li>
      `
      )
      .join('');
  };

  const scheduleUpdate = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        current = suggestions.slice(0, 6);
      } else {
        current = suggestions
          .filter((s) => s.label.toLowerCase().includes(q))
          .slice(0, 7);
      }
      render(current);
      if (current.length) open();
      else close();
    });
  };

  input.addEventListener('input', scheduleUpdate);
  input.addEventListener('focus', scheduleUpdate);

  input.addEventListener('keydown', (e) => {
    if (!panel.classList.contains('open')) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, current.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault();
        input.value = current[activeIndex].label;
        close();
      }
      return;
    } else if (e.key === 'Escape') {
      close();
      return;
    }

    const nodes = $$('.ac-item', list);
    nodes.forEach((n, i) => n.classList.toggle('active', i === activeIndex));
    if (activeIndex >= 0 && nodes[activeIndex]) {
      input.setAttribute('aria-activedescendant', nodes[activeIndex].id);
      nodes[activeIndex].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  });

  list.addEventListener('click', (e) => {
    const li = e.target.closest('.ac-item');
    if (!li) return;
    input.value = li.getAttribute('data-value') || '';
    close();
    input.focus();
  });

  document.addEventListener('click', (e) => {
    if (wrap.contains(e.target) || panel.contains(e.target)) return;
    close();
  });
}

function initGeolocation() {
  const btn = $('#geoBtn');
  const input = $('#locationInput');
  if (!btn || !input) return;

  const setState = (label, disabled) => {
    btn.textContent = label;
    btn.disabled = disabled;
  };

  btn.addEventListener('click', async () => {
    if (!('geolocation' in navigator)) {
      input.value = 'Location services unavailable';
      return;
    }
    setState('Locating…', true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        input.value = `Near me (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
        setState('Use my location', false);
      },
      () => {
        input.value = 'Unable to detect location';
        setState('Use my location', false);
      },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 120000 }
    );
  });
}

function initSearchAndCards() {
  const form = $('#searchForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = $('#queryInput')?.value || '';
      const location = $('#locationInput')?.value || '';
      const insurance = $('#insuranceSelect')?.value || '';
      const summary = buildResultSummary({ query, location, insurance, source: 'form' });
      history.replaceState(null, '', '#results');
      renderResults(summary);
    });
  }

  $$('.specialty-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const specialty = card.getAttribute('data-specialty') || '';
      const queryInput = $('#queryInput');
      if (queryInput) queryInput.value = specialty;
      const summary = buildResultSummary({
        query: specialty,
        location: $('#locationInput')?.value || '',
        insurance: $('#insuranceSelect')?.value || '',
        source: 'specialty-card',
      });
      history.replaceState(null, '', '#results');
      renderResults(summary);
    });
  });
}

function initSmoothScroll() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initAutocomplete();
  initGeolocation();
  initSearchAndCards();
  initSmoothScroll();
});

