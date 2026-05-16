(function(){
  function qs(sel, root){return (root||document).querySelector(sel)}
  function qsa(sel, root){return Array.from((root||document).querySelectorAll(sel))}

  // Mobile menu (all pages)
  function initMenu(){
    var btn = qs('[data-menu-button]');
    var panel = qs('[data-mobile-nav]');
    if(!btn || !panel) return;
    btn.addEventListener('click', function(){
      var isOpen = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Home: load more articles
  function initLoadMore(){
    var host = qs('[data-article-grid]');
    var btn = qs('[data-load-more]');
    if(!host || !btn) return;

    var templates = window.__OLH_MORE_ARTICLES || [];
    var idx = 0;

    function makeCard(a){
      var article = document.createElement('article');
      article.className = 'card';
      article.innerHTML =
        '<div class="thumb">'+
          '<img alt="" loading="lazy" src="'+a.thumb+'" />'+
        '</div>'+
        '<div class="card-body">'+
          '<div class="tag-row">'+
            '<span class="tag '+(a.tagClass||'')+'"><a href="'+a.tagHref+'">'+a.tag+'</a></span>'+
          '</div>'+
          '<h3 class="card-title"><a href="#" aria-label="Open article">'+a.title+'</a></h3>'+
          '<div class="meta">'+
            '<span class="avatar" aria-hidden="true">'+a.avatar+'</span>'+
            '<b>'+a.author+'</b>'+
            '<span class="dot" aria-hidden="true"></span>'+
            '<span>'+a.time+'</span>'+
          '</div>'+
        '</div>';
      return article;
    }

    btn.addEventListener('click', function(){
      var batch = templates.slice(idx, idx+3);
      batch.forEach(function(a){ host.appendChild(makeCard(a)); });
      idx += batch.length;
      if(idx >= templates.length){
        btn.disabled = true;
        btn.textContent = 'All caught up';
      }
    });
  }

  // Donate: amount tabs
  function initDonationTabs(){
    var root = qs('[data-donation-tabs]');
    if(!root) return;
    var desc = qs('[data-donation-desc]');
    var amountOut = qs('[data-donation-amount-out]');
    var tabs = qsa('[data-amount]', root);
    if(!tabs.length) return;

    var copy = {
      5: 'Your $5 donation will help keep tutorials free and accessible for everyone.',
      10: 'Your $10 donation will help us publish more step-by-step tutorials each month.',
      20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      40: 'Your $40 donation will help fund new curriculum tracks and translations worldwide.'
    };

    function setActive(value){
      tabs.forEach(function(t){
        var isActive = String(t.getAttribute('data-amount')) === String(value);
        t.setAttribute('aria-selected', String(isActive));
      });
      if(desc) desc.textContent = copy[value] || '';
      if(amountOut) amountOut.textContent = '$'+value;
    }

    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        setActive(Number(t.getAttribute('data-amount')));
      });
    });

    // Default selection ($20)
    setActive(20);
  }

  // Donate: FAQ accordion
  function initFaq(){
    var root = qs('[data-faq]');
    if(!root) return;
    qsa('[data-faq-item]', root).forEach(function(item){
      var btn = qs('[data-faq-q]', item);
      var ans = qs('[data-faq-a]', item);
      if(!btn || !ans) return;
      btn.addEventListener('click', function(){
        var open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        if(open){
          ans.style.maxHeight = ans.scrollHeight + 'px';
        } else {
          ans.style.maxHeight = '0px';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initMenu();
    initLoadMore();
    initDonationTabs();
    initFaq();
  });
})();

