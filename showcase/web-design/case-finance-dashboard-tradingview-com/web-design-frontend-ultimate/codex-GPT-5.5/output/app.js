const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function initTabs() {
  $$('[data-tabs]').forEach((group) => {
    const buttons = $$('[data-tab-target]', group);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabTarget;
        buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
        $$('[data-tab-panel]', group).forEach((panel) => {
          panel.classList.toggle('active', panel.dataset.tabPanel === target);
        });
        group.dataset.active = target;
      });
    });
  });
}

function initChartTimeframes() {
  const label = document.querySelector('[data-timeframe-label]');
  $$('[data-timeframe]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-timeframe]').forEach((btn) => btn.classList.toggle('active', btn === button));
      if (label) label.textContent = `${button.dataset.timeframe} range · synthetic live candles`;
      renderCandles(button.dataset.timeframe.length + button.textContent.length);
    });
  });
}

function initAccordions() {
  $$('.accordion-head').forEach((head) => {
    head.addEventListener('click', () => {
      const item = head.closest('.accordion');
      item.classList.toggle('collapsed');
      head.querySelector('span:last-child').textContent = item.classList.contains('collapsed') ? '+' : '−';
    });
  });
}

function initMarketsNav() {
  $$('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-scroll-target]').forEach((btn) => btn.classList.toggle('active', btn === button));
      document.querySelector(button.dataset.scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initMarketChartOptions() {
  const note = document.querySelector('[data-chart-note]');
  $$('[data-chart-option]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-chart-option]').forEach((btn) => btn.classList.toggle('active', btn === button));
      if (note) note.textContent = `${button.dataset.chartOption} mini chart mode`;
      $$('.spark').forEach((spark, index) => {
        spark.classList.toggle('blue', (index + button.dataset.chartOption.length) % 2 === 0);
      });
    });
  });
}

function initVideoToggle() {
  const toggle = document.querySelector('[data-video-toggle]');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const active = toggle.classList.toggle('active');
    toggle.textContent = active ? 'Videos only: on' : 'Videos only';
    $$('.idea-feed-card').forEach((card) => {
      card.style.display = active && card.dataset.video !== 'true' ? 'none' : '';
    });
  });
}

function initBrokerSort() {
  const list = document.querySelector('[data-broker-list]');
  if (!list) return;
  $$('[data-sort-brokers]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-sort-brokers]').forEach((btn) => btn.classList.toggle('active', btn === button));
      const cards = $$('.broker-card-wrap', list);
      if (button.dataset.sortBrokers === 'rated') {
        cards.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
      } else {
        cards.sort((a, b) => Number(a.dataset.original) - Number(b.dataset.original));
      }
      cards.forEach((card) => list.appendChild(card));
    });
  });
}

function initBrokerFilters() {
  const list = document.querySelector('[data-broker-list]');
  if (!list) return;
  $$('[data-broker-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-broker-filter]').forEach((btn) => btn.classList.toggle('active', btn === button));
      const filter = button.dataset.brokerFilter;
      $$('.broker-card-wrap', list).forEach((card) => {
        const cats = card.dataset.categories.split(',');
        card.style.display = filter === 'all' || cats.includes(filter) ? '' : 'none';
      });
    });
  });
}

function renderCandles(seed = 1) {
  const candles = document.querySelector('.candles');
  const volumes = document.querySelector('.volume-bars');
  if (!candles || !volumes) return;
  candles.innerHTML = '';
  volumes.innerHTML = '';
  for (let i = 0; i < 64; i++) {
    const positive = (i + seed) % 5 !== 0 && (i % 7 < 4 || i > 42);
    const h = 28 + ((i * 17 + seed * 9) % 122);
    const b = 40 + Math.max(0, Math.sin((i + seed) / 5) * 170) + ((i * 11) % 48);
    const color = positive ? 'var(--green)' : 'var(--red)';
    const candle = document.createElement('i');
    candle.className = 'candle';
    candle.style.setProperty('--h', `${h}px`);
    candle.style.setProperty('--b', `${Math.min(360, b)}px`);
    candle.style.setProperty('--c', color);
    candles.appendChild(candle);
    const vol = document.createElement('i');
    vol.className = 'vol';
    vol.style.setProperty('--v', `${18 + ((i * 13 + seed) % 52)}px`);
    vol.style.setProperty('--c', color);
    volumes.appendChild(vol);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordions();
  initChartTimeframes();
  initMarketsNav();
  initMarketChartOptions();
  initVideoToggle();
  initBrokerSort();
  initBrokerFilters();
  renderCandles(4);
});
