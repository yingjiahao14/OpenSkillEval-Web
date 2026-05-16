(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function setPressed(el, pressed){
    if(!el) return;
    el.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }

  function initDarkModeToggle(){
    const toggle = document.querySelector('[data-dark-toggle]');
    if(!toggle) return;

    // Dark mode is default. Toggle provides a lightweight "high contrast" mode.
    const KEY = 'cf_high_contrast';
    const saved = localStorage.getItem(KEY);
    const enabled = saved === '1';
    document.documentElement.dataset.theme = enabled ? 'contrast' : 'dark';
    setPressed(toggle, enabled);
    toggle.addEventListener('click', () => {
      const now = !(localStorage.getItem(KEY) === '1');
      localStorage.setItem(KEY, now ? '1' : '0');
      document.documentElement.dataset.theme = now ? 'contrast' : 'dark';
      setPressed(toggle, now);
    });
  }

  function initAssistantSearch(){
    const wrap = document.querySelector('[data-assistant]');
    if(!wrap) return;
    const input = $('[data-assistant-input]', wrap);
    const out = $('[data-assistant-output]', wrap);
    if(!input || !out) return;

    function score(text, q){
      const t = text.toLowerCase();
      const qq = q.toLowerCase().trim();
      if(!qq) return 0;
      if(t.includes(qq)) return 10;
      // crude token scoring
      return qq.split(/\s+/).reduce((acc, tok) => acc + (t.includes(tok) ? 2 : 0), 0);
    }

    const items = $$('[data-search-item]').map(el => ({
      el,
      title: el.getAttribute('data-title') || el.textContent.trim(),
      body: el.getAttribute('data-body') || '',
      href: el.getAttribute('href') || ''
    }));

    function render(q){
      const qtrim = q.trim();
      if(!qtrim){
        out.innerHTML = '<div class="meta">Type to search docs sections and pages.</div>';
        return;
      }
      const ranked = items
        .map(it => ({ it, s: score(it.title + ' ' + it.body, qtrim) }))
        .filter(x => x.s > 0)
        .sort((a,b) => b.s - a.s)
        .slice(0,6);

      if(!ranked.length){
        out.innerHTML = '<div class="meta">No matches. Try “CLI”, “GraphQL”, “UCP”, or “Hydrogen”.</div>';
        return;
      }
      out.innerHTML = ranked.map(({it}) => {
        const safeTitle = it.title.replace(/</g,'&lt;');
        const safeBody = (it.body || '').replace(/</g,'&lt;');
        return `
          <a class="card" href="${it.href}">
            <h3>${safeTitle}</h3>
            <p>${safeBody}</p>
            <div class="meta">Open →</div>
          </a>
        `;
      }).join('');
      out.classList.add('grid-3');
    }

    input.addEventListener('input', () => render(input.value));
    render('');

    // keyboard shortcut: / to focus search
    document.addEventListener('keydown', (e) => {
      if(e.key === '/' && !(e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'))){
        e.preventDefault();
        input.focus();
      }
    });
  }

  function initCliTabs(){
    const root = document.querySelector('[data-cli-tabs]');
    if(!root) return;
    const code = $('[data-cli-install-code]', root);
    const tabs = $$('[role="tab"]', root);

    function setTab(id){
      tabs.forEach(t => t.setAttribute('aria-selected', (t.getAttribute('data-tab') === id) ? 'true' : 'false'));
      const cmd = root.getAttribute(`data-cmd-${id}`);
      if(code && cmd) code.textContent = cmd;
      root.dataset.activeTab = id;
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => setTab(tab.getAttribute('data-tab')));
    });
    setTab(root.getAttribute('data-default') || 'npm');
  }

  function initCopyButtons(){
    $$('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetSel = btn.getAttribute('data-copy');
        const target = targetSel ? document.querySelector(targetSel) : null;
        const text = target ? target.textContent : '';
        try{
          await navigator.clipboard.writeText(text.trim());
          const prev = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => btn.textContent = prev, 900);
        }catch{
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text.trim();
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
      });
    });
  }

  function initCliAccordion(){
    const root = document.querySelector('[data-cli-accordion]');
    if(!root) return;
    const items = $$('[data-acc-item]', root);
    function open(id){
      items.forEach(it => {
        const isOpen = it.getAttribute('data-acc-item') === id;
        it.dataset.open = isOpen ? 'true' : 'false';
        const header = $('[data-acc-header]', it);
        if(header) header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
    items.forEach(it => {
      const header = $('[data-acc-header]', it);
      if(!header) return;
      header.addEventListener('click', () => open(it.getAttribute('data-acc-item')));
    });
    open(items[0]?.getAttribute('data-acc-item') || 'apps');
  }

  function initSidebar(){
    const btn = document.querySelector('[data-sidebar-toggle]');
    const shell = document.querySelector('[data-docs-shell]');
    if(!btn || !shell) return;

    const KEY = shell.getAttribute('data-storage-key') || 'cf_sidebar_collapsed';
    const setCollapsed = (collapsed) => {
      document.body.classList.toggle('collapsed', collapsed);
      btn.textContent = collapsed ? 'Expand' : 'Collapse';
      btn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      localStorage.setItem(KEY, collapsed ? '1' : '0');
    };

    const saved = localStorage.getItem(KEY) === '1';
    const small = window.matchMedia('(max-width: 980px)').matches;
    setCollapsed(saved || small);
    btn.addEventListener('click', () => setCollapsed(!document.body.classList.contains('collapsed')));
  }

  function initThemeContrast(){
    // optional contrast mode: slightly stronger borders and text.
    const update = () => {
      if(document.documentElement.dataset.theme === 'contrast'){
        document.documentElement.style.setProperty('--border', 'rgba(255,255,255,0.18)');
        document.documentElement.style.setProperty('--border-strong', 'rgba(255,255,255,0.28)');
        document.documentElement.style.setProperty('--muted', 'rgba(255,255,255,0.74)');
      }else{
        document.documentElement.style.removeProperty('--border');
        document.documentElement.style.removeProperty('--border-strong');
        document.documentElement.style.removeProperty('--muted');
      }
    };
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });
    update();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDarkModeToggle();
    initThemeContrast();
    initAssistantSearch();
    initCliTabs();
    initCliAccordion();
    initCopyButtons();
    initSidebar();
  });
})();

