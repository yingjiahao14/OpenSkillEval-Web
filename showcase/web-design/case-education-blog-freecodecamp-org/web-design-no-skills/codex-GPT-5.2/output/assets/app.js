function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setCurrentNav() {
  const page = document.body.getAttribute('data-page');
  if (!page) return;
  qsa('[data-nav]').forEach((a) => {
    if (a.getAttribute('data-nav') === page) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
}

function initMenuToggle() {
  const btn = qs('[data-menu-btn]');
  const panel = qs('[data-mobile-nav]');
  if (!btn || !panel) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
  };

  setOpen(false);

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });
}

function renderArticleCard(article) {
  const tagHref =
    article.tagSlug === 'ai'
      ? 'tag-ai.html'
      : article.tagSlug === 'web-scraping'
        ? 'tag-web-scraping.html'
        : '#';

  const tagLinkAttrs = tagHref === '#' ? 'role="link" aria-disabled="true"' : '';

  return `
    <article class="card" data-article>
      <div class="card-media">
        <div class="thumb" style="background-image:${article.thumbCss}"></div>
        <a class="tag-pill" href="${tagHref}" ${tagLinkAttrs} aria-label="View ${article.tagLabel} posts">
          <span class="dot" aria-hidden="true"></span>
          <span>${article.tagLabel}</span>
        </a>
      </div>
      <div class="card-body">
        <h3 class="card-title">${article.title}</h3>
        <div class="meta">
          <div class="avatar" aria-hidden="true">${article.authorInitials}</div>
          <div>
            <div><strong>${article.author}</strong></div>
            <div><span>${article.time}</span></div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function initLoadMoreArticles() {
  const grid = qs('[data-article-grid]');
  const btn = qs('[data-load-more]');
  if (!grid || !btn) return;

  const payloadEl = qs('#more-articles');
  let queue = [];
  try {
    queue = JSON.parse(payloadEl?.textContent || '[]');
  } catch {
    queue = [];
  }

  const batchSize = 6;

  const updateBtn = () => {
    if (queue.length === 0) {
      btn.disabled = true;
      btn.textContent = 'All caught up';
      btn.setAttribute('aria-disabled', 'true');
    }
  };

  const appendBatch = () => {
    const batch = queue.splice(0, batchSize);
    if (batch.length === 0) {
      updateBtn();
      return;
    }

    const html = batch.map(renderArticleCard).join('');
    grid.insertAdjacentHTML('beforeend', html);
    updateBtn();
  };

  btn.addEventListener('click', () => {
    appendBatch();
  });

  updateBtn();
}

function initDonationTabs() {
  const tabs = qsa('[data-amount]');
  const impact = qs('[data-impact-text]');
  const sub = qs('[data-sub-label]');
  if (tabs.length === 0 || !impact) return;

  const copy = {
    5: 'Your $5 donation will help keep our lessons free for learners everywhere.',
    10: 'Your $10 donation will help fund new tutorials and community tools.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will help us translate and expand the curriculum faster.',
  };

  const setAmount = (amount) => {
    tabs.forEach((t) => {
      const isActive = t.getAttribute('data-amount') === String(amount);
      t.setAttribute('aria-selected', String(isActive));
    });
    impact.textContent = copy[amount] || copy[20];
    if (sub) {
      sub.innerHTML = `Donating <strong>$${amount}</strong> / month: <a href="#" onclick="return false">edit amount</a> \u00b7 Secure donation`;
    }
  };

  tabs.forEach((t) => {
    t.addEventListener('click', () => {
      const amount = Number(t.getAttribute('data-amount'));
      setAmount(amount);
    });
  });

  setAmount(20);
}

function initFaqAccordion() {
  const items = qsa('[data-acc-item]');
  if (items.length === 0) return;

  items.forEach((item) => {
    const btn = qs('[data-acc-btn]', item);
    const panel = qs('[data-acc-panel]', item);
    if (!btn || !panel) return;
    item.dataset.open = 'false';
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    btn.addEventListener('click', () => {
      const open = item.dataset.open !== 'true';
      item.dataset.open = String(open);
      btn.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
      if (open) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      } else {
        panel.style.maxHeight = '0px';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setCurrentNav();
  initMenuToggle();
  initLoadMoreArticles();
  initDonationTabs();
  initFaqAccordion();
});

