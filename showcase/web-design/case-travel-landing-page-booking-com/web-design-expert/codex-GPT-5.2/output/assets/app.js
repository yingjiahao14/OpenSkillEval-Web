function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setCurrentNav() {
  const page = document.documentElement.dataset.page;
  qsa('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === page);
    if (a.dataset.nav === page) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function initTabs(root) {
  const tabs = qsa('[role="tab"]', root);
  const panels = qsa('[role="tabpanel"]', root);
  if (!tabs.length || !panels.length) return;

  function activate(id) {
    tabs.forEach((t) => {
      const on = t.id === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => {
      p.hidden = p.getAttribute('aria-labelledby') !== id;
    });
  }

  tabs.forEach((t) => {
    t.addEventListener('click', () => activate(t.id));
    t.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(t);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabs[(idx + 1) % tabs.length];
        next.focus();
        activate(next.id);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus();
        activate(prev.id);
      }
    });
  });

  const selected = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
  activate(selected.id);
}

function initAllTabs() {
  qsa('[data-tabs]').forEach((root) => initTabs(root));
}

function initCarousel() {
  qsa('[data-carousel]').forEach((root) => {
    const track = qs('[data-carousel-track]', root);
    const prev = qs('[data-carousel-prev]', root);
    const next = qs('[data-carousel-next]', root);
    if (!track || !prev || !next) return;

    const scrollByCard = (dir) => {
      const first = qs('.carousel-item', track);
      const w = first ? first.getBoundingClientRect().width : 320;
      track.scrollBy({ left: dir * (w + 12), behavior: 'smooth' });
    };

    prev.addEventListener('click', () => scrollByCard(-1));
    next.addEventListener('click', () => scrollByCard(1));
  });
}

function initAccordion() {
  qsa('[data-accordion]').forEach((root) => {
    const items = qsa('[data-acc-item]', root);
    const buttons = qsa('[data-acc-btn]', root);
    if (!items.length || !buttons.length) return;

    function openItem(id) {
      items.forEach((it) => {
        const on = it.id === id;
        it.dataset.open = on ? 'true' : 'false';
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('aria-controls');
        const item = qs(`#${CSS.escape(id)}`)?.closest('[data-acc-item]');
        if (!item) return;
        const isOpen = item.dataset.open === 'true';
        openItem(isOpen ? '' : item.id);
      });
    });

    openItem(items[0].id);
  });
}

function initHomeSearchValidation() {
  const form = qs('[data-home-search]');
  if (!form) return;
  const alert = qs('[data-search-alert]');
  const destination = qs('input[name="destination"]', form);
  const checkin = qs('input[name="checkin"]', form);
  const checkout = qs('input[name="checkout"]', form);

  function show(msg) {
    if (!alert) return;
    alert.textContent = msg;
    alert.classList.add('show');
  }

  function clear() {
    if (!alert) return;
    alert.classList.remove('show');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clear();
    if (!destination?.value?.trim()) {
      show('Please enter a destination to search.');
      destination?.focus();
      return;
    }
    if (!checkin?.value || !checkout?.value) {
      show('Please select both check-in and check-out dates.');
      (checkin?.value ? checkout : checkin)?.focus();
      return;
    }
    if (checkout.value <= checkin.value) {
      show('Check-out must be after check-in.');
      checkout?.focus();
      return;
    }
    show('Search started — showing demo results (static site).');
  });
}

function initPackagesRadio() {
  const root = qs('[data-package-form]');
  if (!root) return;
  const radios = qsa('input[name="package_type"]', root);
  const hint = qs('[data-package-hint]', root);

  const map = {
    'Hotel + Flight': 'Includes round-trip flights and hotel stay.',
    'Hotel + Flight + Car': 'Includes flights, hotel, and a rental car for your trip.',
    'Flight + Car': 'Includes flights plus a rental car — great for road trips.',
    'Hotel + Car': 'Includes hotel plus a rental car — perfect for flexible stays.'
  };

  function update() {
    const val = radios.find((r) => r.checked)?.value || 'Hotel + Flight';
    if (hint) hint.textContent = map[val] || 'Choose a package type to update details.';
  }

  radios.forEach((r) => r.addEventListener('change', update));
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  setCurrentNav();
  initAllTabs();
  initCarousel();
  initAccordion();
  initHomeSearchValidation();
  initPackagesRadio();
});

