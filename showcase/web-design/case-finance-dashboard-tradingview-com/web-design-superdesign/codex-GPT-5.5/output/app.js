const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function initTabs() {
  $$('[data-tabs]').forEach(group => {
    const buttons = $$('[data-tab]', group);
    const scope = group.dataset.scope || group.closest('section')?.id || document.body;
    buttons.forEach(btn => btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      $$(`[data-panel-group="${scope}"]`).forEach(panel => panel.classList.toggle('active', panel.dataset.panel === btn.dataset.tab));
      if (group.dataset.filterTarget) applyFilter(group.dataset.filterTarget, btn.dataset.tab);
      if (group.dataset.sortTarget) sortBrokers(btn.dataset.tab);
      if (group.dataset.scroll === 'true') document.getElementById(btn.dataset.tab)?.scrollIntoView({behavior:'smooth', block:'start'});
      if (group.dataset.chartControls) updateChartLabel(btn.dataset.tab);
    }));
  });
}
function applyFilter(target, value) {
  $$(`[data-filter-set="${target}"]`).forEach(item => {
    const cats = (item.dataset.category || '').split(' ');
    item.classList.toggle('hidden', value !== 'all' && !cats.includes(value));
  });
}
function sortBrokers(mode) {
  const list = $('#broker-list'); if (!list) return;
  const rows = $$('.broker-row', list);
  rows.sort((a,b) => mode === 'best' ? Number(b.dataset.rating) - Number(a.dataset.rating) : Number(a.dataset.order) - Number(b.dataset.order));
  rows.forEach(row => list.appendChild(row));
}
function updateChartLabel(label) {
  const target = $('#chart-range-label'); if (target) target.textContent = label;
}
function initAccordions() {
  $$('.side-title').forEach(title => title.addEventListener('click', () => title.parentElement.classList.toggle('collapsed')));
}
function initVideoToggle() {
  const toggle = $('#video-toggle'); const feed = $('#idea-feed');
  if (!toggle || !feed) return;
  toggle.addEventListener('change', () => feed.classList.toggle('video-only', toggle.checked));
}
function initMarketControls() {
  $$('[data-mini-control]').forEach(btn => btn.addEventListener('click', () => {
    const type = btn.dataset.miniControl;
    $$(`[data-mini-control-group="${btn.dataset.group}"] [data-mini-control]`).forEach(b => b.classList.toggle('active', b === btn));
    $$('.spark path.area-fill').forEach(p => p.style.opacity = type === 'candles' ? '.08' : '.22');
  }));
}
document.addEventListener('DOMContentLoaded', () => { initTabs(); initAccordions(); initVideoToggle(); initMarketControls(); });
