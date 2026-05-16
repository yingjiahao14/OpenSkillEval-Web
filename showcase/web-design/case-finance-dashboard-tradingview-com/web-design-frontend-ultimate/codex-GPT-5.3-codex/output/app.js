const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

function wireTabs(scope = document) {
  $$('[data-tabset]', scope).forEach((set) => {
    const buttons = $$('[data-tab]', set);
    const panels = $$('[data-panel]', set);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tab;
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        panels.forEach((panel) => {
          panel.style.display = panel.dataset.panel === key ? '' : 'none';
        });
      });
    });
  });
}

function wireWatchAccordion() {
  $$('.watch-header').forEach((header) => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });
}

function wireTimeframe() {
  const map = {
    '1D': [38,20,30,18,40,26,31,16,24,34,22,29,17,27,23],
    '5D': [20,21,22,24,23,25,22,26,27,28,26,29,31,30,33],
    '1M': [14,18,17,21,23,20,24,22,26,29,31,30,32,35,36],
    '3M': [12,15,18,17,22,24,28,26,30,29,32,34,31,36,38],
    '6M': [10,13,14,18,20,19,24,25,23,27,30,33,35,37,39],
    'YTD': [8,11,13,14,18,21,20,25,28,27,31,34,36,40,42],
    '1Y': [6,10,12,11,15,18,17,21,24,23,27,29,33,35,39],
    '5Y': [4,6,8,10,9,12,14,16,18,22,26,30,34,38,43],
    'All': [3,5,6,8,7,11,13,15,17,19,23,27,31,37,44]
  };
  const container = $('#chart-bars');
  if (!container) return;
  const draw = (arr) => {
    container.innerHTML = '';
    arr.forEach((h, i) => {
      const wick = document.createElement('div');
      wick.className = 'wick';
      wick.style.left = `${22 + i * 20}px`;
      wick.style.top = `${130 - (h + 9)}px`;
      wick.style.height = `${h + 18}px`;
      container.appendChild(wick);

      const c = document.createElement('div');
      c.className = 'candle';
      c.style.left = `${19 + i * 20}px`;
      c.style.top = `${150 - h}px`;
      c.style.height = `${h}px`;
      c.style.background = i % 3 === 0 ? '#f7525f' : '#22c55e';
      container.appendChild(c);
    });
  };
  draw(map['1D']);
  $$('[data-time]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('[data-time]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      draw(map[btn.dataset.time] || map['1D']);
    });
  });
}

function wireVideoOnly() {
  const toggle = $('#videosOnly');
  const items = $$('.idea-item');
  if (!toggle || !items.length) return;
  toggle.addEventListener('change', () => {
    items.forEach((item) => {
      const isVideo = item.dataset.video === 'true';
      item.style.display = toggle.checked ? (isVideo ? '' : 'none') : '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wireTabs();
  wireWatchAccordion();
  wireTimeframe();
  wireVideoOnly();
});
