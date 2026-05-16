(function(){
  function q(sel, root){return (root||document).querySelector(sel)}
  function qa(sel, root){return Array.from((root||document).querySelectorAll(sel))}

  // Mega menu (desktop)
  var megaTrigger = q('[data-mega-trigger]');
  var mega = q('[data-mega]');
  var header = q('[data-site-header]');

  function closeMega(){
    if (!mega) return;
    mega.classList.remove('open');
    if (megaTrigger) megaTrigger.setAttribute('aria-expanded','false');
  }
  function openMega(){
    if (!mega) return;
    mega.classList.add('open');
    if (megaTrigger) megaTrigger.setAttribute('aria-expanded','true');
  }
  function toggleMega(){
    if (!mega) return;
    if (mega.classList.contains('open')) closeMega(); else openMega();
  }

  if (megaTrigger && mega){
    megaTrigger.addEventListener('click', function(e){
      e.preventDefault();
      toggleMega();
    });
    var wrap = q('[data-mega-wrap]');
    if (wrap){
      wrap.addEventListener('mouseenter', function(){
        if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) openMega();
      });
      wrap.addEventListener('mouseleave', function(){
        if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) closeMega();
      });
    }
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeMega();
    });
    document.addEventListener('click', function(e){
      if (!mega.classList.contains('open')) return;
      var target = e.target;
      if (wrap && wrap.contains(target)) return;
      closeMega();
    });
  }

  // Mobile nav drawer + accordion
  var navToggle = q('[data-nav-toggle]');
  var drawer = q('[data-mobile-drawer]');
  function setDrawer(open){
    if (!drawer || !navToggle) return;
    drawer.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeMega();
  }
  if (navToggle && drawer){
    navToggle.addEventListener('click', function(){
      setDrawer(!drawer.classList.contains('open'));
    });
    window.addEventListener('resize', function(){
      if (window.innerWidth > 820) setDrawer(false);
    });
  }
  qa('[data-acc-btn]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var id = btn.getAttribute('aria-controls');
      var panel = id ? document.getElementById(id) : null;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (panel) panel.classList.toggle('open', !isOpen);
    });
  });

  // What We Do tabs
  var tabRoot = q('[data-tabs]');
  if (tabRoot){
    var tabButtons = qa('[role="tab"]', tabRoot);
    var panels = qa('[role="tabpanel"]', tabRoot);
    function activateTab(id){
      tabButtons.forEach(function(b){
        var selected = b.getAttribute('aria-controls') === id;
        b.setAttribute('aria-selected', selected ? 'true' : 'false');
        b.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(function(p){
        var on = p.id === id;
        p.hidden = !on;
        if (on){
          p.classList.remove('panel-fade');
          void p.offsetWidth;
          p.classList.add('panel-fade');
        }
      });
    }
    tabButtons.forEach(function(b){
      b.addEventListener('click', function(){
        activateTab(b.getAttribute('aria-controls'));
      });
      b.addEventListener('keydown', function(e){
        var idx = tabButtons.indexOf(b);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight'){
          e.preventDefault();
          var n = tabButtons[(idx+1) % tabButtons.length];
          n.focus();
          activateTab(n.getAttribute('aria-controls'));
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
          e.preventDefault();
          var p = tabButtons[(idx-1+tabButtons.length) % tabButtons.length];
          p.focus();
          activateTab(p.getAttribute('aria-controls'));
        }
      });
    });
  }

  // Featured partners carousel (simple)
  qa('[data-carousel]').forEach(function(root){
    var track = q('[data-carousel-track]', root);
    var prev = q('[data-carousel-prev]', root);
    var next = q('[data-carousel-next]', root);
    if (!track || !prev || !next) return;
    function step(dir){
      var card = q('.partner', track);
      var amount = card ? (card.getBoundingClientRect().width + 14) : 340;
      track.scrollBy({left: dir * amount, behavior:'smooth'});
    }
    prev.addEventListener('click', function(){step(-1)});
    next.addEventListener('click', function(){step(1)});
  });

  // Smooth anchor focus for “Skip” links (optional)
  qa('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(){
      var id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      var el = document.getElementById(id.slice(1));
      if (!el) return;
      setTimeout(function(){
        if (typeof el.focus === 'function') el.focus({preventScroll:true});
      }, 0);
    });
  });
})();

