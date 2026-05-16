/* ChartPulse — Interactive Behaviors */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Generic tab switching ---- */
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const name = group.dataset.tabGroup;
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll(`[data-panel="${name}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        panels.forEach(p => {
          p.style.display = p.dataset.panelValue === target ? '' : 'none';
        });
      });
    });
  });

  /* ---- Generic tab-line switching ---- */
  document.querySelectorAll('.tab-line').forEach(line => {
    const tabs = line.querySelectorAll('.tab-l');
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');

        const group = t.closest('[data-tab-group]');
        if (group) {
          const name = group.dataset.tabGroup;
          const target = t.dataset.tab;
          document.querySelectorAll(`[data-panel="${name}"]`).forEach(p => {
            p.style.display = p.dataset.panelValue === target ? '' : 'none';
          });
        }
      });
    });
  });

  /* ---- Tabs (pill style) ---- */
  document.querySelectorAll('.tabs').forEach(group => {
    const tabBtns = group.querySelectorAll('.tab');
    tabBtns.forEach(t => {
      t.addEventListener('click', () => {
        tabBtns.forEach(x => x.classList.remove('active'));
        t.classList.add('active');

        const parentGroup = t.closest('[data-tab-group]');
        if (parentGroup) {
          const name = parentGroup.dataset.tabGroup;
          const target = t.dataset.tab;
          document.querySelectorAll(`[data-panel="${name}"]`).forEach(p => {
            p.style.display = p.dataset.panelValue === target ? '' : 'none';
          });
        }
      });
    });
  });

  /* ---- Watchlist accordion (chart page) ---- */
  document.querySelectorAll('.wl-cat-head').forEach(head => {
    head.addEventListener('click', () => {
      head.parentElement.classList.toggle('open');
    });
  });

  /* ---- Timeframe toggle (chart page) ---- */
  document.querySelectorAll('.tf-group').forEach(grp => {
    const btns = grp.querySelectorAll('.tf-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
    });
  });

  /* ---- Markets page section scrolling ---- */
  document.querySelectorAll('[data-scroll-to]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = document.getElementById(trigger.dataset.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Videos-only toggle ---- */
  document.querySelectorAll('.toggle-switch').forEach(sw => {
    sw.addEventListener('click', () => {
      sw.classList.toggle('on');
      const dot = sw.querySelector('.toggle-dot');
      if (dot) dot.style.transform = sw.classList.contains('on') ? 'translateX(18px)' : '';
    });
  });

});

/* Sparkline SVG generator */
function createSparkline(container, dataPoints, isUp) {
  const w = container.clientWidth || 88;
  const h = container.clientHeight || 28;
  const min = Math.min(...dataPoints);
  const max = Math.max(...dataPoints);
  const range = max - min || 1;

  const points = dataPoints.map((v, i) => ({
    x: (i / (dataPoints.length - 1)) * w,
    y: h - ((v - min) / range) * h * 0.8 - h * 0.1
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${w},${h} L0,${h} Z`;
  const color = isUp ? '#26d4a8' : '#ff6b78';
  const fillColor = isUp ? 'rgba(38,212,168,.12)' : 'rgba(255,107,120,.12)';

  container.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:100%">
    <path d="${areaPath}" fill="${fillColor}"/>
    <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.5"/>
  </svg>`;
}

function randomSpark(isUp) {
  const n = 20;
  const arr = [];
  let v = 50;
  for (let i = 0; i < n; i++) {
    v += (Math.random() - (isUp ? 0.4 : 0.6)) * 6;
    arr.push(v);
  }
  return arr;
}

function initSparklines() {
  document.querySelectorAll('.spark').forEach(el => {
    const isUp = el.classList.contains('spark-up');
    createSparkline(el, randomSpark(isUp), isUp);
  });
}
