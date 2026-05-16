const byId = (id) => document.getElementById(id);

function wireTabs(groupName) {
  document.querySelectorAll(`[data-tab-group="${groupName}"]`).forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.tab;
      document.querySelectorAll(`[data-tab-group="${groupName}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll(`[data-panel-group="${groupName}"]`).forEach((panel) => {
        panel.hidden = panel.dataset.panel !== value;
      });
    });
  });
}

function wireAccordion() {
  document.querySelectorAll('[data-accordion-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.accordion');
      const collapsed = container.dataset.collapsed === 'true';
      container.dataset.collapsed = collapsed ? 'false' : 'true';
      btn.textContent = collapsed ? '−' : '+';
    });
  });
}

function wireNavState() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav a').forEach((a) => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}

function wireMarketsAnchorTabs() {
  document.querySelectorAll('[data-jump]').forEach((b) => {
    b.addEventListener('click', () => {
      const target = byId(b.dataset.jump);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function wireToggle() {
  document.querySelectorAll('.toggle').forEach((t) => {
    t.addEventListener('click', () => t.classList.toggle('on'));
  });
}

function drawCandles() {
  const canvas = byId('termCanvas');
  if (!canvas) return;
  for (let i = 0; i < 52; i++) {
    const h = 30 + Math.round(Math.random() * 180);
    const x = 16 + i * 12;
    const y = 30 + Math.round(Math.random() * 280);
    const green = Math.random() > 0.46;
    const c = document.createElement('div');
    c.className = 'candle';
    c.style.left = `${x}px`;
    c.style.top = `${y}px`;
    c.style.height = `${h}px`;
    c.style.background = green ? 'var(--gain)' : 'var(--loss)';
    canvas.appendChild(c);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  wireNavState();
  ['market-categories','timeframe','fin-detail','ideas-feed','gainers-session','brokers-category','brokers-rating','chart-type'].forEach(wireTabs);
  wireAccordion();
  wireMarketsAnchorTabs();
  wireToggle();
  drawCandles();
});
