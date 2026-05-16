(function(){
  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root||document).querySelectorAll(sel)); }

  function initAccordions(){
    qsa('[data-accordion]').forEach(function(acc){
      var items = qsa('[data-acc-item]', acc);
      function openItem(item){
        items.forEach(function(it){ it.dataset.open = (it === item) ? 'true' : 'false'; });
        var btn = qs('[data-acc-btn]', item);
        items.forEach(function(it){
          var b = qs('[data-acc-btn]', it);
          if(!b) return;
          b.setAttribute('aria-expanded', it===item ? 'true' : 'false');
        });
        if(btn){
          var controls = btn.getAttribute('aria-controls');
          if(controls){
            items.forEach(function(it){
              var content = qs('#'+controls, it);
              if(content) content.hidden = (it !== item);
            });
          }
        }
      }
      items.forEach(function(item){
        var btn = qs('[data-acc-btn]', item);
        var content = qs('[data-acc-content]', item);
        if(content && !content.id){
          content.id = 'acc-' + Math.random().toString(16).slice(2);
        }
        if(btn && content){
          btn.setAttribute('aria-controls', content.id);
        }
        if(btn){
          btn.addEventListener('click', function(){
            var isOpen = item.dataset.open === 'true';
            if(isOpen) return; // only one open; keep open on re-click
            openItem(item);
          });
        }
      });

      var defaultOpen = items.find(function(it){ return it.dataset.open === 'true'; }) || items[0];
      if(defaultOpen) openItem(defaultOpen);
    });
  }

  function initTabs(){
    qsa('[data-tabs]').forEach(function(root){
      var tabs = qsa('[role="tab"]', root);
      var panels = qsa('[role="tabpanel"]', root);

      function selectTab(tab){
        var target = tab.getAttribute('aria-controls');
        tabs.forEach(function(t){
          var selected = (t === tab);
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(function(p){
          var active = (p.id === target);
          p.hidden = !active;
        });
      }

      tabs.forEach(function(tab){
        tab.addEventListener('click', function(){ selectTab(tab); });
        tab.addEventListener('keydown', function(e){
          var idx = tabs.indexOf(tab);
          if(e.key === 'ArrowRight'){
            e.preventDefault();
            var next = tabs[(idx+1) % tabs.length];
            next.focus();
            selectTab(next);
          }
          if(e.key === 'ArrowLeft'){
            e.preventDefault();
            var prev = tabs[(idx-1+tabs.length) % tabs.length];
            prev.focus();
            selectTab(prev);
          }
        });
      });

      var selected = tabs.find(function(t){ return t.getAttribute('aria-selected') === 'true'; }) || tabs[0];
      if(selected) selectTab(selected);
    });
  }

  function initSidebar(){
    var btn = qs('[data-sidebar-toggle]');
    if(!btn) return;

    function setCollapsed(collapsed){
      document.body.classList.toggle('sidebar-collapsed', collapsed);
      btn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      btn.textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
      try{ localStorage.setItem('cf_sidebar_collapsed', collapsed ? '1' : '0'); }catch(_e){}
    }

    var stored = null;
    try{ stored = localStorage.getItem('cf_sidebar_collapsed'); }catch(_e){}
    var shouldCollapse = stored === '1' || window.matchMedia('(max-width: 860px)').matches;
    setCollapsed(shouldCollapse);

    btn.addEventListener('click', function(){
      setCollapsed(!document.body.classList.contains('sidebar-collapsed'));
    });
  }

  function initMobileMenu(){
    var btn = qs('[data-mobile-nav]');
    var nav = qs('[data-topnav]');
    if(!btn || !nav) return;
    btn.addEventListener('click', function(){
      var open = nav.dataset.open === 'true';
      nav.dataset.open = open ? 'false' : 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initAccordions();
    initTabs();
    initSidebar();
    initMobileMenu();
  });
})();
