(function(){
  // Shared helpers (kept tiny; works when opened directly from disk)
  const current = document.documentElement.getAttribute('data-page');
  document.querySelectorAll('[data-nav-link]').forEach((a) => {
    if(!current) return;
    if(a.getAttribute('data-nav-link') === current){
      a.setAttribute('aria-current', 'page');
    }
  });
})();

