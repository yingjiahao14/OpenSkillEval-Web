(function(){
  function qs(sel, root){return (root||document).querySelector(sel)}
  function qsa(sel, root){return Array.from((root||document).querySelectorAll(sel))}

  // Mobile menu toggle (all pages)
  (function initMenu(){
    const btn = qs('[data-menu-button]');
    const panel = qs('[data-mobile-nav]');
    if(!btn || !panel) return;
    function setOpen(next){
      panel.dataset.open = String(next);
      btn.setAttribute('aria-expanded', String(next));
    }
    setOpen(false);
    btn.addEventListener('click', function(){
      setOpen(panel.dataset.open !== 'true');
    });
    // close when clicking a link
    qsa('a', panel).forEach(a => a.addEventListener('click', () => setOpen(false)));
  })();

  // Home: load more articles
  (function initLoadMore(){
    const grid = qs('[data-article-grid]');
    const btn = qs('[data-load-more]');
    const tmpl = qs('#article-card-template');
    if(!grid || !btn || !tmpl) return;

    const dataEl = qs('#more-articles-json');
    let remaining = [];
    try{ remaining = JSON.parse(dataEl.textContent || '[]'); }catch(e){ remaining = []; }

    function createCard(item){
      const node = tmpl.content.firstElementChild.cloneNode(true);
      const img = qs('img', node);
      const tagLink = qs('[data-tag-link]', node);
      const tagText = qs('[data-tag-text]', node);
      const title = qs('[data-title]', node);
      const titleLink = qs('[data-title-link]', node);
      const author = qs('[data-author]', node);
      const time = qs('[data-time]', node);

      img.src = item.thumbnail;
      img.alt = item.title;

      tagText.textContent = item.tag;
      tagLink.href = item.tagHref || '#';
      tagLink.setAttribute('aria-label', 'View tag ' + item.tag);

      title.textContent = item.title;
      titleLink.href = item.href || '#';

      author.textContent = item.author;
      time.textContent = item.time;
      return node;
    }

    function updateBtn(){
      if(remaining.length === 0){
        btn.disabled = true;
        btn.textContent = 'All caught up';
      }
    }

    btn.addEventListener('click', function(){
      const batch = remaining.splice(0, 6);
      batch.forEach(item => grid.appendChild(createCard(item)));
      updateBtn();
    });

    updateBtn();
  })();

  // Donate: amount tabs
  (function initDonationTabs(){
    const root = qs('[data-donation]');
    if(!root) return;
    const tabs = qsa('[data-amount]', root);
    const impact = qs('[data-impact]', root);
    const subLabel = qs('[data-sub-label]', root);
    if(tabs.length === 0 || !impact || !subLabel) return;

    function hoursForAmount(amount){
      // simple, believable scale anchored to brief's $20 => 1,000 hours
      const base = 1000;
      return Math.round((amount / 20) * base);
    }

    function setAmount(amount){
      tabs.forEach(t => t.setAttribute('aria-selected', String(Number(t.dataset.amount) === amount)));
      const hours = hoursForAmount(amount);
      impact.textContent = `Your $${amount} donation will provide ${hours.toLocaleString()} hours of learning to people around the world each month.`;
      subLabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
      root.dataset.selectedAmount = String(amount);
    }

    tabs.forEach(t => {
      t.addEventListener('click', () => setAmount(Number(t.dataset.amount)));
    });

    setAmount(20);
  })();

  // Donate: FAQ accordion
  (function initFaq(){
    const wrap = qs('[data-faq]');
    if(!wrap) return;
    qsa('[data-faq-item]', wrap).forEach(item => {
      const btn = qs('[data-faq-button]', item);
      if(!btn) return;
      function setOpen(next){
        item.dataset.open = String(next);
        btn.setAttribute('aria-expanded', String(next));
      }
      setOpen(false);
      btn.addEventListener('click', () => setOpen(item.dataset.open !== 'true'));
    });
  })();
})();

