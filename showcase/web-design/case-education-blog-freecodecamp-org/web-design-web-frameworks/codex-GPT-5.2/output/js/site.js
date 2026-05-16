(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function initMobileMenu() {
    var toggle = qs('[data-action="menu-toggle"]');
    var menu = qs('[data-mobile-nav]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('data-open', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = menu.getAttribute('data-open') === 'true';
      setOpen(!isOpen);
    });

    // Close on navigation
    qsa('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });

    setOpen(false);
  }

  function initDonationTabs() {
    var root = qs('[data-donation-tabs]');
    if (!root) return;
    var desc = qs('[data-donation-description]');
    if (!desc) return;

    function update(amount) {
      qsa('[data-amount]', root).forEach(function (btn) {
        var isActive = btn.getAttribute('data-amount') === String(amount);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.classList.toggle('is-active', isActive);
      });

      desc.textContent =
        'Your $' +
        amount +
        ' donation will provide 1,000 hours of learning to people around the world each month.';

      var sub = qs('[data-donation-sub]');
      if (sub) {
        sub.textContent = 'Donating $' + amount + ' / month: edit amount · Secure donation';
      }
    }

    qsa('[data-amount]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        update(btn.getAttribute('data-amount'));
      });
    });

    var initial = root.getAttribute('data-default') || '20';
    update(initial);
  }

  function initFaqAccordion() {
    var acc = qs('[data-accordion]');
    if (!acc) return;

    qsa('[data-acc-item]', acc).forEach(function (item) {
      var btn = qs('[data-acc-btn]', item);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var open = item.getAttribute('data-open') === 'true';
        item.setAttribute('data-open', open ? 'false' : 'true');
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  }

  function initLoadMore() {
    var btn = qs('[data-action="load-more"]');
    var grid = qs('[data-article-grid]');
    var template = qs('#article-template');
    if (!btn || !grid || !template) return;

    var batch = [];
    try {
      batch = JSON.parse(template.textContent || '[]');
    } catch (e) {
      batch = [];
    }

    var idx = 0;
    var pageSize = 3;

    function cardTone(tag) {
      var t = String(tag || '').toLowerCase();
      if (t.includes('ai')) return '';
      if (t.includes('web scraping')) return 'mint';
      if (t.includes('database')) return 'violet';
      if (t.includes('elastic')) return 'cool';
      if (t.includes('data-engineering') || t.includes('data engineering')) return 'rose';
      return '';
    }

    function tagHref(tag) {
      var t = String(tag || '').toLowerCase();
      if (t === '#ai' || t === 'ai' || t === '#ai ') return 'tag-ai.html';
      if (t.includes('web scraping')) return 'tag-web-scraping.html';
      return '#';
    }

    function makeCard(a) {
      var article = document.createElement('article');
      article.className = 'card';
      article.innerHTML =
        '<a class="card-link" href="#" aria-label="Open article">' +
        '<div class="card-media">' +
        '<img alt="" src="' +
        a.thumbnail +
        '">' +
        '<a class="tag" data-tone="' +
        cardTone(a.tag) +
        '" href="' +
        tagHref(a.tag) +
        '">' +
        a.tag +
        '</a>' +
        '</div>' +
        '<div class="card-body">' +
        '<h3 class="card-title">' +
        a.title +
        '</h3>' +
        '<div class="meta">' +
        '<span class="avatar"><img alt="" src="' +
        a.avatar +
        '"></span>' +
        '<strong>' +
        a.author +
        '</strong>' +
        '<span class="dot">·</span>' +
        '<span>' +
        a.time +
        '</span>' +
        '</div>' +
        '</div>' +
        '</a>';
      return article;
    }

    function appendNext() {
      var slice = batch.slice(idx, idx + pageSize);
      slice.forEach(function (a) {
        grid.appendChild(makeCard(a));
      });
      idx += slice.length;
      if (idx >= batch.length) {
        btn.disabled = true;
        btn.textContent = 'All caught up';
      }
    }

    btn.addEventListener('click', appendNext);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initDonationTabs();
    initFaqAccordion();
    initLoadMore();
  });
})();

