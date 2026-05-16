function icon(name) {
  const common = {
    search: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="1.8"/><path d="M16.6 16.6 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    candle: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16 5v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="6" y="9" width="6" height="6" rx="1.4" stroke="currentColor" stroke-width="1.8"/><rect x="12" y="7" width="6" height="10" rx="1.4" stroke="currentColor" stroke-width="1.8"/></svg>',
    draw: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20h4l11-11a2 2 0 0 0-4-4L4 16v4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M13 6l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    indicator: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16c3-9 6 9 9 0s6 9 7-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M9 5v14" stroke="currentColor" stroke-width="1.8" opacity=".9"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 16H6c1.2-1.3 2-3 2-5V9a4 4 0 1 1 8 0v2c0 2 0.8 3.7 2 5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };
  return common[name] || '';
}

function sparklineSVG(values, stroke) {
  const w = 92;
  const h = 26;
  const pad = 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const dx = (w - pad * 2) / (values.length - 1);
  const scale = (v) => {
    if (max === min) return h / 2;
    const t = (v - min) / (max - min);
    return pad + (1 - t) * (h - pad * 2);
  };
  const d = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * dx} ${scale(v)}`)
    .join(' ');
  return `
  <svg class="spark" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${stroke}" stop-opacity=".22" />
        <stop offset="1" stop-color="${stroke}" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path d="${d}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
    <path d="${d} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z" fill="url(#g)" opacity=".9"/>
  </svg>`;
}

