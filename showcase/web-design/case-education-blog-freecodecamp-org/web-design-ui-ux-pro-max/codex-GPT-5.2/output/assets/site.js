function qs(sel, root = document){
  return root.querySelector(sel);
}

function qsa(sel, root = document){
  return Array.from(root.querySelectorAll(sel));
}

function initMobileMenu(){
  const button = qs('[data-menu-button]');
  const panel = qs('[data-mobile-nav]');
  if (!button || !panel) return;

  const setOpen = (open) => {
    panel.dataset.open = open ? 'true' : 'false';
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  setOpen(false);

  button.addEventListener('click', () => {
    const next = panel.dataset.open !== 'true';
    setOpen(next);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  qsa('a', panel).forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}

function initLoadMore(){
  const button = qs('[data-load-more]');
  const grid = qs('[data-article-grid]');
  const template = qs('#article-card-template');
  if (!button || !grid || !template) return;

  const data = window.__MORE_ARTICLES__ || [];
  let index = 0;
  const pageSize = Number(button.dataset.pageSize || 3);

  const appendCard = (article) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const tagEl = qs('[data-tag]', node);
    const titleLink = qs('[data-title-link]', node);
    const titleEl = qs('[data-title]', node);
    const authorInitials = qs('[data-avatar]', node);
    const authorName = qs('[data-author]', node);
    const time = qs('[data-time]', node);
    const tagLink = qs('[data-tag-link]', node);

    tagEl.textContent = article.tag;
    titleEl.textContent = article.title;
    authorName.textContent = article.author;
    time.textContent = article.time;

    authorInitials.textContent = (article.author || '—')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || '')
      .join('');

    const tagHref = article.tagHref || '#';
    tagLink.setAttribute('href', tagHref);
    titleLink.setAttribute('href', '#');
    node.setAttribute('data-article-tag', (article.tag || '').toLowerCase());

    grid.appendChild(node);
  };

  const updateButton = () => {
    const remaining = data.length - index;
    if (remaining <= 0){
      button.disabled = true;
      button.textContent = 'All caught up';
      return;
    }
    button.disabled = false;
    button.textContent = 'Load More Articles';
  };

  const load = () => {
    const slice = data.slice(index, index + pageSize);
    slice.forEach(appendCard);
    index += slice.length;
    updateButton();
  };

  button.addEventListener('click', () => {
    load();
  });

  updateButton();
}

function initDonationTabs(){
  const tabs = qsa('[data-donation-tab]');
  const desc = qs('[data-donation-desc]');
  if (!tabs.length || !desc) return;

  const setActive = (amount) => {
    tabs.forEach((t) => {
      const active = t.dataset.amount === amount;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    desc.textContent = `Your $${amount} donation will provide ${donationHoursFor(amount)} hours of learning to people around the world each month.`;
  };

  tabs.forEach((t) => {
    t.addEventListener('click', () => {
      setActive(t.dataset.amount);
    });
  });

  // default state from markup
  const initial = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.amount || tabs[0].dataset.amount;
  setActive(initial);
}

function donationHoursFor(amount){
  // Keeps copy consistent with brief while feeling proportional.
  const n = Number(amount);
  if (n === 5) return 250;
  if (n === 10) return 500;
  if (n === 20) return 1000;
  if (n === 40) return 2000;
  return Math.round(n * 50);
}

function initFAQ(){
  const items = qsa('[data-faq-item]');
  if (!items.length) return;

  const setOpen = (item, open) => {
    const answer = qs('[data-faq-answer]', item);
    const button = qs('[data-faq-question]', item);
    if (!answer || !button) return;

    item.dataset.open = open ? 'true' : 'false';
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
  };

  items.forEach((item) => {
    const btn = qs('[data-faq-question]', item);
    if (!btn) return;

    setOpen(item, false);
    btn.addEventListener('click', () => {
      const next = item.dataset.open !== 'true';
      setOpen(item, next);
    });
  });

  window.addEventListener('resize', () => {
    items.forEach((item) => {
      if (item.dataset.open === 'true') setOpen(item, true);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLoadMore();
  initDonationTabs();
  initFAQ();
});

