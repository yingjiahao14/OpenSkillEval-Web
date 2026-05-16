const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

(function cookieBanner() {
  const btn = $('#cookieAgree');
  const banner = $('#cookieBanner');
  if (!btn || !banner) return;
  if (localStorage.getItem('gb_cookie_ok') === '1') banner.style.display = 'none';
  btn.addEventListener('click', () => {
    localStorage.setItem('gb_cookie_ok', '1');
    banner.style.display = 'none';
  });
})();

(function footerAccordion() {
  if (window.innerWidth > 900) return;
  $$('.footer-col').forEach((col) => {
    const toggle = $('.footer-toggle', col);
    if (!toggle) return;
    toggle.addEventListener('click', () => col.classList.toggle('open'));
  });
})();

(function rewardsTabs() {
  const wrap = $('#rewardsTabs');
  if (!wrap) return;
  const buttons = $$('.tab-btn', wrap);
  const panels = $$('.tab-panel', wrap.parentElement);
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      panels.forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      const id = button.dataset.tab;
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('active');
    });
  });
})();

function setupCarousel(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;
  const track = $('.carousel-track', root);
  const slides = $$('.carousel-slide', root);
  const prev = $('.prev', root.parentElement);
  const next = $('.next', root.parentElement);
  let index = 0;
  const move = () => { track.style.transform = `translateX(-${index * 100}%)`; };
  next?.addEventListener('click', () => { index = (index + 1) % slides.length; move(); });
  prev?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; move(); });
}
setupCarousel('featuredCarousel');
$$('[data-carousel]').forEach((node) => setupCarousel(node.id));

(function storeLocator() {
  const input = $('#storeSearch');
  const suggest = $('#suggestions');
  const filterBtn = $('#filterBtn');
  const panel = $('#filterPanel');
  const results = $('#storeResults');
  if (!input) return;
  const places = ['Seattle, WA', 'Portland, OR', 'San Diego, CA', 'Austin, TX'];
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    suggest.innerHTML = '';
    if (!q) { suggest.classList.remove('active'); return; }
    places.filter((item) => item.toLowerCase().includes(q)).forEach((place) => {
      const btn = document.createElement('button');
      btn.textContent = place;
      btn.onclick = () => {
        input.value = place;
        suggest.classList.remove('active');
        results.innerHTML = `<strong>Showing stores near ${place}</strong><p class="meta">3 stores with fast pickup and 2 with delivery.</p>`;
      };
      suggest.appendChild(btn);
    });
    suggest.classList.add('active');
  });
  filterBtn?.addEventListener('click', () => panel.hidden = !panel.hidden);

  const orderBtns = $$('.order-type button');
  orderBtns.forEach((button) => {
    button.addEventListener('click', () => {
      orderBtns.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const mode = button.dataset.mode;
      results.innerHTML = `<strong>${mode} stores selected</strong><p class="meta">Updated results for ${mode.toLowerCase()} availability.</p>`;
    });
  });
})();
