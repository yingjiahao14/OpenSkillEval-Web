(function(){
  const root = document.querySelector('[data-menu-page]');
  if(!root) return;

  const links = Array.from(document.querySelectorAll('[data-menu-link]'));
  const sections = Array.from(document.querySelectorAll('[data-menu-section]'));

  function setActive(id){
    links.forEach(a=>a.classList.toggle('active', a.getAttribute('data-menu-link')===id));
    sections.forEach(s=>s.hidden = s.getAttribute('data-menu-section') !== id);
  }

  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('data-menu-link');
      if(!id) return;
      e.preventDefault();
      setActive(id);
      history.replaceState(null,'',`#${encodeURIComponent(id)}`);
    });
  });

  const initial = decodeURIComponent((location.hash||'').replace('#','')) || links[0]?.getAttribute('data-menu-link');
  if(initial) setActive(initial);
})();

