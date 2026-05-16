(function(){
  function qs(sel, root){return (root||document).querySelector(sel)}
  function qsa(sel, root){return Array.from((root||document).querySelectorAll(sel))}

  // Top-nav active state
  (function markActive(){
    var path = location.pathname.split('/').pop() || 'index.html'
    qsa('[data-nav]').forEach(function(a){
      if(a.getAttribute('href') === path){
        a.setAttribute('aria-current','page')
      }
    })
  })();

  // CLI accordion (one open at a time)
  (function cliAccordion(){
    var acc = qs('[data-accordion="cli"]')
    if(!acc) return
    var items = qsa('.acc-item', acc)

    function openItem(id){
      items.forEach(function(item){
        var btn = qs('.acc-btn', item)
        var panel = qs('.acc-panel', item)
        var isTarget = item.getAttribute('data-acc') === id
        btn.setAttribute('aria-expanded', isTarget ? 'true' : 'false')
        panel.setAttribute('data-open', isTarget ? 'true' : 'false')
      })
    }

    items.forEach(function(item){
      var id = item.getAttribute('data-acc')
      var btn = qs('.acc-btn', item)
      btn.addEventListener('click', function(){
        var isOpen = btn.getAttribute('aria-expanded') === 'true'
        openItem(isOpen ? '' : id)
      })
    })

    // default open apps
    openItem('apps')
  })();

  // CLI tabs -> update install command snippet
  (function cliTabs(){
    var root = qs('[data-cli-tabs]')
    if(!root) return
    var pre = qs('[data-cli-install]', root)
    var map = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    }
    function setTab(name){
      qsa('.tab', root).forEach(function(t){
        t.setAttribute('aria-selected', t.getAttribute('data-tab') === name ? 'true':'false')
      })
      if(pre) pre.textContent = map[name] || map.npm
    }
    qsa('.tab', root).forEach(function(t){
      t.addEventListener('click', function(){
        setTab(t.getAttribute('data-tab'))
      })
    })
    setTab('npm')
  })();

  // Sidebar collapse for docs pages
  (function sidebarCollapse(){
    var btn = qs('[data-sidebar-toggle]')
    if(!btn) return
    var key = 'cf_sidebar_collapsed'
    function apply(v){
      document.documentElement.classList.toggle('sidebar-collapsed', v)
      btn.setAttribute('aria-pressed', v ? 'true' : 'false')
      btn.querySelector('[data-label]').textContent = v ? 'Expand sidebar' : 'Collapse sidebar'
    }

    var autoCollapse = window.matchMedia && window.matchMedia('(max-width: 980px)').matches
    var saved = null
    try{ saved = localStorage.getItem(key) }catch(e){}
    var initial = saved === null ? autoCollapse : saved === '1'
    apply(initial)

    btn.addEventListener('click', function(){
      var next = !document.documentElement.classList.contains('sidebar-collapsed')
      apply(next)
      try{ localStorage.setItem(key, next ? '1':'0') }catch(e){}
    })
  })();

  // “Ask assistant” (client-side filter)
  (function ask(){
    var input = qs('[data-ask]')
    var list = qs('[data-ask-results]')
    if(!input || !list) return
    var items = qsa('a[data-ask-item]', list)
    function filter(){
      var q = (input.value || '').trim().toLowerCase()
      items.forEach(function(a){
        var t = (a.textContent || '').toLowerCase()
        a.style.display = (!q || t.indexOf(q) !== -1) ? '' : 'none'
      })
    }
    input.addEventListener('input', filter)
  })();
})();

