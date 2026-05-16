/* CommerceForge Dev Docs – tiny static JS (no build) */
(function(){
  const root = document.documentElement;
  const storageKey = 'cf_theme';

  function setTheme(theme){
    root.setAttribute('data-theme', theme);
    try{ localStorage.setItem(storageKey, theme); }catch(_){/* noop */}
    const btn = document.querySelector('[data-theme-toggle]');
    if(btn){
      const next = theme === 'light' ? 'Dark' : 'Light';
      btn.setAttribute('aria-label', `Switch to ${next} mode`);
      btn.querySelector('[data-theme-label]')?.replaceChildren(document.createTextNode(theme === 'light' ? 'Light' : 'Dark'));
    }
  }

  function initTheme(){
    let saved = null;
    try{ saved = localStorage.getItem(storageKey); }catch(_){/* noop */}
    const initial = saved || 'dark';
    setTheme(initial);
  }

  function initCopyButtons(){
    document.querySelectorAll('[data-copy]').forEach((btn)=>{
      btn.addEventListener('click', async ()=>{
        const targetId = btn.getAttribute('data-copy');
        const el = document.getElementById(targetId);
        const text = el ? el.textContent : '';
        try{
          await navigator.clipboard.writeText(text.trim());
          const prev = btn.textContent;
          btn.textContent = 'Copied';
          btn.setAttribute('aria-live','polite');
          setTimeout(()=>{ btn.textContent = prev; }, 900);
        }catch(e){
          // Fallback: select text by temporarily creating textarea
          const ta = document.createElement('textarea');
          ta.value = text.trim();
          document.body.appendChild(ta);
          ta.select();
          try{ document.execCommand('copy'); }catch(_){/* noop */}
          document.body.removeChild(ta);
        }
      });
    });
  }

  function initCliTabs(){
    const host = document.querySelector('[data-cli-tabs]');
    if(!host) return;

    const codeEl = document.querySelector('[data-cli-install-code]');
    const commands = {
      npm: 'npm i -g @commerceforge/cli@latest',
      yarn: 'yarn global add @commerceforge/cli@latest',
      pnpm: 'pnpm add -g @commerceforge/cli@latest'
    };

    function select(tab){
      host.querySelectorAll('[role="tab"]').forEach((t)=>{
        const on = t.getAttribute('data-tab') === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      if(codeEl) codeEl.textContent = commands[tab] || commands.npm;
    }

    host.addEventListener('click', (e)=>{
      const btn = e.target.closest('[role="tab"]');
      if(!btn) return;
      select(btn.getAttribute('data-tab'));
    });

    host.addEventListener('keydown', (e)=>{
      const tabs = Array.from(host.querySelectorAll('[role="tab"]'));
      const cur = document.activeElement;
      const idx = tabs.indexOf(cur);
      if(idx < 0) return;
      if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? (idx+1)%tabs.length : (idx-1+tabs.length)%tabs.length;
        tabs[next].focus();
        select(tabs[next].getAttribute('data-tab'));
      }
    });

    // Default
    select('npm');
  }

  function initAccordion(){
    const acc = document.querySelector('[data-accordion="cli"]');
    if(!acc) return;

    function setOpen(id){
      acc.querySelectorAll('.acc-item').forEach((item)=>{
        const open = item.id === id;
        item.setAttribute('aria-expanded', open ? 'true' : 'false');
        const trigger = item.querySelector('.acc-trigger');
        const panel = item.querySelector('.acc-panel');
        if(trigger && panel){
          trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
          panel.hidden = !open;
        }
      });
    }

    acc.addEventListener('click', (e)=>{
      const btn = e.target.closest('.acc-trigger');
      if(!btn) return;
      const item = btn.closest('.acc-item');
      if(!item) return;
      const expanded = item.getAttribute('aria-expanded') === 'true';
      setOpen(expanded ? '' : item.id);
    });

    // Default open apps
    setOpen('acc-apps');
  }

  function initSidebarCollapse(){
    const btn = document.querySelector('[data-sidebar-toggle]');
    if(!btn) return;
    const key = btn.getAttribute('data-sidebar-key') || 'cf_sidebar';

    function setCollapsed(on){
      document.body.classList.toggle('collapsed', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.querySelector('[data-collapse-label]')?.replaceChildren(document.createTextNode(on ? 'Expand' : 'Collapse'));
      try{ localStorage.setItem(key, on ? '1' : '0'); }catch(_){/* noop */}
    }

    let saved = null;
    try{ saved = localStorage.getItem(key); }catch(_){/* noop */}

    // Auto-collapse on smaller screens
    const auto = window.matchMedia('(max-width: 980px)');
    const initial = (saved === '1') || auto.matches;
    setCollapsed(initial);

    btn.addEventListener('click', ()=>{
      setCollapsed(!document.body.classList.contains('collapsed'));
    });

    auto.addEventListener?.('change', (e)=>{
      if(e.matches){ setCollapsed(true); }
    });
  }

  function initSearch(){
    const input = document.querySelector('[data-doc-search]');
    if(!input) return;
    const list = document.querySelector('[data-search-results]');
    if(!list) return;

    const items = Array.from(document.querySelectorAll('[data-search-item]')).map((el)=>({
      title: el.getAttribute('data-title') || el.textContent.trim(),
      href: el.getAttribute('href') || '#',
      keywords: (el.getAttribute('data-keywords') || '').toLowerCase()
    }));

    function render(q){
      const query = q.trim().toLowerCase();
      list.innerHTML = '';
      if(!query){
        list.hidden = true;
        return;
      }
      const hits = items
        .filter((it)=> it.title.toLowerCase().includes(query) || it.keywords.includes(query))
        .slice(0, 8);
      if(!hits.length){
        const li = document.createElement('div');
        li.className = 'tag';
        li.textContent = 'No results';
        list.appendChild(li);
        list.hidden = false;
        return;
      }
      hits.forEach((it)=>{
        const a = document.createElement('a');
        a.className = 'btn ghost';
        a.href = it.href;
        a.textContent = it.title;
        a.style.justifyContent = 'flex-start';
        list.appendChild(a);
      });
      list.hidden = false;
    }

    input.addEventListener('input', ()=>render(input.value));
    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        input.value = '';
        render('');
      }
    });
  }

  // Boot
  initTheme();
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-theme-toggle]');
    if(!btn) return;
    const cur = root.getAttribute('data-theme') || 'dark';
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });

  window.addEventListener('DOMContentLoaded', ()=>{
    initCopyButtons();
    initCliTabs();
    initAccordion();
    initSidebarCollapse();
    initSearch();
  });
})();

