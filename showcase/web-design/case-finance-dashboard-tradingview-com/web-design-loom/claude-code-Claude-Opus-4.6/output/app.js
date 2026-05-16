document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordions();
  initToggles();
  drawAllSparklines();
});

function initTabs() {
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const groupId = group.dataset.tabGroup;
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll(`[data-tab-panel][data-group="${groupId}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        panels.forEach(p => {
          p.style.display = p.dataset.tabPanel === target ? '' : 'none';
        });
      });
    });
  });
}

function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : '';
      if (icon) icon.textContent = isOpen ? '+' : '−';
      header.classList.toggle('collapsed', isOpen);
    });
  });
}

function initToggles() {
  document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const target = toggle.dataset.target;
      if (target) {
        const el = document.getElementById(target);
        if (el) el.classList.toggle('filtered', toggle.checked);
      }
    });
  });
}

function drawAllSparklines() {
  document.querySelectorAll('.sparkline').forEach(canvas => {
    if (canvas.tagName !== 'CANVAS') return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const dw = canvas.offsetWidth;
    const dh = canvas.offsetHeight;

    const trend = canvas.dataset.trend || 'up';
    const color = trend === 'up' ? '#26a69a' : '#f7525f';
    const points = generateSparkData(20, trend);
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    points.forEach((p, i) => {
      const x = (i / (points.length - 1)) * dw;
      const y = dh - ((p - min) / range) * (dh - 4) - 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const grad = ctx.createLinearGradient(0, 0, 0, dh);
    grad.addColorStop(0, color + '30');
    grad.addColorStop(1, color + '00');
    ctx.lineTo(dw, dh);
    ctx.lineTo(0, dh);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  });
}

function generateSparkData(count, trend) {
  const data = [];
  let val = 50 + Math.random() * 20;
  const drift = trend === 'up' ? 0.6 : -0.6;
  for (let i = 0; i < count; i++) {
    val += (Math.random() - 0.45) * 4 + drift;
    data.push(val);
  }
  return data;
}

function initTimeframeBtns(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
