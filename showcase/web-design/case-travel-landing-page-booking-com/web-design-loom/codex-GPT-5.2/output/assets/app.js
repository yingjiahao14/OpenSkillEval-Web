function qs(sel, root = document){ return root.querySelector(sel); }
function qsa(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }

function setupTabs(root){
  const tablist = root;
  const tabs = qsa('[role="tab"]', tablist);
  const panels = tabs
    .map(t => qs(`#${t.getAttribute('aria-controls')}`))
    .filter(Boolean);

  function activate(tab){
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(p => {
      const active = p && tab && p.id === tab.getAttribute('aria-controls');
      if (!p) return;
      p.hidden = !active;
    });
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activate(t));
    t.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(t);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(idx + dir + tabs.length) % tabs.length];
        next.focus();
        activate(next);
      }
    });
  });

  const pre = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
  if (pre) activate(pre);
}

function setupCarousels(){
  qsa('[data-carousel]').forEach((root) => {
    const viewport = qs('[data-carousel-viewport]', root);
    const prev = qs('[data-carousel-prev]', root);
    const next = qs('[data-carousel-next]', root);
    if (!viewport || !prev || !next) return;

    const step = () => Math.max(260, Math.min(320, viewport.clientWidth * 0.85));
    prev.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior: 'smooth' }));
  });
}

function setupAccordions(){
  qsa('[data-accordion]').forEach((root) => {
    const items = qsa('[data-acc-item]', root);
    function closeAll(except){
      items.forEach(it => {
        if (it === except) return;
        it.dataset.open = 'false';
        const btn = qs('[data-acc-btn]', it);
        const panel = qs('[data-acc-panel]', it);
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.hidden = true;
      });
    }
    items.forEach((it) => {
      const btn = qs('[data-acc-btn]', it);
      const panel = qs('[data-acc-panel]', it);
      if (!btn || !panel) return;
      btn.addEventListener('click', () => {
        const isOpen = it.dataset.open === 'true';
        closeAll(isOpen ? null : it);
        it.dataset.open = isOpen ? 'false' : 'true';
        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        panel.hidden = isOpen;
      });
    });

    // initialize: open first item if marked, otherwise close all
    const initial = items.find(i => i.dataset.open === 'true') || null;
    closeAll(initial);
    if (initial){
      const btn = qs('[data-acc-btn]', initial);
      const panel = qs('[data-acc-panel]', initial);
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (panel) panel.hidden = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  qsa('[data-tabs]').forEach(setupTabs);
  setupCarousels();
  setupAccordions();
});

