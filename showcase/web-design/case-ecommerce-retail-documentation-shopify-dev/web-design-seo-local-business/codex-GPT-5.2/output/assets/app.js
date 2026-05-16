(function(){
  const state = {
    cliTab: 'npm',
    cliOpen: 'apps'
  };

  function qs(sel, root){
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root){
    return Array.from((root || document).querySelectorAll(sel));
  }

  function setCliTab(tab){
    state.cliTab = tab;
    qsa('[data-cli-tab]').forEach((btn) => {
      btn.setAttribute('aria-selected', btn.getAttribute('data-cli-tab') === tab ? 'true' : 'false');
    });
    qsa('[data-cli-install-code]').forEach((node) => {
      const code = node.getAttribute('data-' + tab) || node.getAttribute('data-npm') || '';
      node.textContent = code;
    });
  }

  function setAccordionOpen(key){
    state.cliOpen = key;
    qsa('[data-acc-item]').forEach((item) => {
      const isOpen = item.getAttribute('data-acc-item') === key;
      item.setAttribute('data-open', isOpen ? 'true' : 'false');
      const btn = qs('[data-acc-btn]', item);
      const panel = qs('[data-acc-panel]', item);
      if(btn){
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      if(panel){
        panel.hidden = !isOpen;
      }
    });
  }

  function wireCli(){
    const root = qs('[data-cli]');
    if(!root) return;

    qsa('[data-cli-tab]', root).forEach((btn) => {
      btn.addEventListener('click', () => setCliTab(btn.getAttribute('data-cli-tab')));
    });

    qsa('[data-acc-btn]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-acc-btn');
        setAccordionOpen(key);
      });
    });

    setCliTab(state.cliTab);
    setAccordionOpen(state.cliOpen);
  }

  function wireSidebar(){
    const btn = qs('[data-sidebar-toggle]');
    if(!btn) return;
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('sidebar-collapsed');
      btn.setAttribute('aria-pressed', document.documentElement.classList.contains('sidebar-collapsed') ? 'true' : 'false');
    });
  }

  function wireSearch(){
    const input = qs('[data-search-input]');
    const out = qs('[data-search-output]');
    if(!input || !out) return;

    const pages = [
      { title: 'Apps', href: 'apps-build.html' },
      { title: 'Storefronts', href: 'storefronts.html' },
      { title: 'Agents', href: 'agents.html' },
      { title: 'Help', href: 'support.html' }
    ];

    function render(list){
      if(!list.length){
        out.innerHTML = '<div class="hint">No matches. Try “apps”, “hydrogen”, “UCP”.</div>';
        return;
      }
      out.innerHTML = list.map((p) => {
        return '<a class="btn small ghost" href="' + p.href + '">' + p.title + ' →</a>';
      }).join(' ');
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if(!q){
        out.innerHTML = '<div class="hint">Jump to a section or page. Tip: press <span class="kbd">/</span> to focus.</div>';
        return;
      }
      const hits = pages.filter((p) => p.title.toLowerCase().includes(q));
      render(hits);
    });

    window.addEventListener('keydown', (e) => {
      if(e.key === '/' && !/input|textarea/i.test(document.activeElement && document.activeElement.tagName)){
        e.preventDefault();
        input.focus();
      }
    });
  }

  function wireCopyButtons(){
    qsa('[data-copy-btn]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy-btn');
        const target = qs('#' + CSS.escape(targetId));
        if(!target) return;
        try{
          await navigator.clipboard.writeText(target.textContent);
          const prev = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = prev; }, 900);
        }catch(_){
          // ignore (non-https local file contexts can block clipboard)
        }
      });
    });
  }

  function highlightActiveSidebarLink(){
    const hash = (location.hash || '').trim();
    if(!hash) return;
    qsa('.side-links a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === hash);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    wireCli();
    wireSidebar();
    wireSearch();
    wireCopyButtons();
    highlightActiveSidebarLink();
    window.addEventListener('hashchange', highlightActiveSidebarLink);
  });
})();

