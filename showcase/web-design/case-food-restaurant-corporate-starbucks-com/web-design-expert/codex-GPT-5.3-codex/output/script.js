const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const page = document.body.dataset.page;

if (page === 'home') {
  const cookie = $('#cookieBanner');
  $('#cookieAgree')?.addEventListener('click', () => cookie?.remove());

  if (window.matchMedia('(max-width: 700px)').matches) {
    $$('.footer-col h4').forEach(h => {
      h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
    });
  }
}

if (page === 'rewards') {
  const tabs = $$('.tab');
  const panel = $('#redemptionPanel');
  const content = {
    25: 'Customize your drink with an extra espresso shot, dairy alternative, or flavored syrup.',
    60: 'Enjoy a bakery favorite: butter croissant, cake pop, or warm cookie.',
    100: 'Redeem a handcrafted beverage, hot breakfast item, or parfait.',
    200: 'Pick a lunch sandwich, protein box, or packaged coffee to take home.',
    300: 'Take home whole bean coffee, merchandise, or premium drinkware.',
    400: 'Celebrate big with select at-home brewing gear and signature bundles.'
  };
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    panel.textContent = content[t.dataset.stars];
  }));
}

const setupCarousel = (rootId) => {
  const root = document.getElementById(rootId);
  if (!root) return;
  const track = $('.track', root);
  $('.prev', root).addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  $('.next', root).addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });
};
setupCarousel('featuredCarousel');
['Birthday','Thank You','Celebration','Appreciation','Encouragement','Workplace'].forEach(c => setupCarousel('cat-' + c.replace(/\s+/g, '-')));

if (page === 'store-locator') {
  const suggestions = $('#suggestions');
  const input = $('#storeSearch');
  const mapTitle = $('#mapTitle');
  const results = $('#results');
  const data = ['Seattle, WA','Portland, OR','San Francisco, CA','Austin, TX','Chicago, IL'];

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const list = data.filter(x => x.toLowerCase().includes(q));
    suggestions.innerHTML = list.map(v => `<button type="button">${v}</button>`).join('');
    suggestions.style.display = q ? 'block' : 'none';
    if (q) {
      mapTitle.textContent = `Showing nearby stores for “${input.value}”`;
      results.textContent = `${Math.max(2, list.length)} stores available`;
    }
    $$('button', suggestions).forEach(btn => btn.addEventListener('click', () => {
      input.value = btn.textContent;
      suggestions.style.display = 'none';
      mapTitle.textContent = `Showing nearby stores for “${btn.textContent}”`;
      results.textContent = `4 stores available`;
    }));
  });

  $('#filterBtn').addEventListener('click', () => {
    const panel = $('#filterPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });

  $$('#orderType button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#orderType button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      results.textContent = btn.dataset.type === 'pickup' ? '6 pickup-ready stores' : '3 delivery-enabled stores';
    });
  });
}
