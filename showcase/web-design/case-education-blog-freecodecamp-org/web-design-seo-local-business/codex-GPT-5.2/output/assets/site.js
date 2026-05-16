(function(){
  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  const relToUrl = (rel) => {
    // Keep it simple: treat relative timestamps as display-only.
    return rel;
  };

  const tagSlug = (tagLabel) => {
    const t = (tagLabel || '').trim().toLowerCase();
    if (t === '#ai') return 'tag-ai.html';
    if (t === '#web scraping') return 'tag-web-scraping.html';
    return '#';
  };

  const cardEl = (article) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" aria-hidden="true">
        <a class="tag" href="${tagSlug(article.tag)}" data-tag>${article.tag}</a>
      </div>
      <div class="body">
        <h3><a href="#" aria-label="Open article: ${article.title.replace(/"/g,'&quot;')}">${article.title}</a></h3>
        <div class="meta">
          <div class="author">
            <div class="avatar" aria-hidden="true"></div>
            <div class="name">${article.author}</div>
          </div>
          <div class="time" aria-label="Published ${relToUrl(article.time)}">${article.time}</div>
        </div>
      </div>
    `;
    return card;
  };

  ready(() => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('[data-menu-btn]');
    const mobileNav = document.querySelector('[data-mobile-nav]');
    if (menuBtn && mobileNav){
      menuBtn.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Load more articles (home)
    const loadMoreBtn = document.querySelector('[data-load-more]');
    const grid = document.querySelector('[data-article-grid]');
    const payloadEl = document.querySelector('[data-more-articles]');
    if (loadMoreBtn && grid && payloadEl){
      let idx = 0;
      let more = [];
      try { more = JSON.parse(payloadEl.textContent || '[]'); } catch (_) { more = []; }

      const appendBatch = (count) => {
        const slice = more.slice(idx, idx + count);
        slice.forEach(a => grid.appendChild(cardEl(a)));
        idx += slice.length;
        if (idx >= more.length) {
          loadMoreBtn.disabled = true;
          loadMoreBtn.textContent = 'All caught up';
        }
      };

      loadMoreBtn.addEventListener('click', () => appendBatch(6));
    }

    // Donation amount tabs (donate)
    const amountWrap = document.querySelector('[data-amount-tabs]');
    const amountDesc = document.querySelector('[data-amount-desc]');
    if (amountWrap && amountDesc){
      const impact = {
        5: 'Your $5 donation will help keep our learning tools free for everyone.',
        10: 'Your $10 donation will help fund new lessons and community support.',
        20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
        40: 'Your $40 donation will support curriculum expansions and translations at scale.'
      };

      const setAmount = (amt) => {
        const buttons = Array.from(amountWrap.querySelectorAll('button[data-amount]'));
        buttons.forEach((b) => b.setAttribute('aria-pressed', b.dataset.amount === String(amt) ? 'true' : 'false'));
        amountDesc.textContent = impact[amt] || impact[20];
        const sub = document.querySelector('[data-donation-sub]');
        if (sub) sub.textContent = `Donating $${amt} / month: edit amount · Secure donation`;
      };

      amountWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-amount]');
        if (!btn) return;
        setAmount(Number(btn.dataset.amount));
      });

      setAmount(20);
    }

    // FAQ accordion (donate)
    const accordion = document.querySelector('[data-accordion]');
    if (accordion){
      accordion.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-acc-btn]');
        if (!btn) return;
        const item = btn.closest('.acc-item');
        if (!item) return;
        const open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Enhance tag links on cards if needed
    document.querySelectorAll('[data-tag]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') a.setAttribute('href', tagSlug(a.textContent));
    });
  });
})();
