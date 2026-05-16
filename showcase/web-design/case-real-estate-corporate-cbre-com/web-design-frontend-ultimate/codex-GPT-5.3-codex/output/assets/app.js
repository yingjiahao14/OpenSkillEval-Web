(function(){
  const desktopServices = document.querySelectorAll('[data-services-toggle]');
  const servicesLi = document.querySelector('[data-services-item]');
  if (servicesLi && desktopServices.length) {
    const openMenu = () => servicesLi.classList.add('open');
    const closeMenu = () => servicesLi.classList.remove('open');
    desktopServices.forEach(el => {
      el.addEventListener('mouseenter', openMenu);
      el.addEventListener('click', (e)=>{e.preventDefault(); servicesLi.classList.toggle('open');});
    });
    servicesLi.addEventListener('mouseleave', closeMenu);
    document.addEventListener('click', (e)=>{
      if (!servicesLi.contains(e.target)) closeMenu();
    });
  }
  const mobToggle = document.querySelector('[data-mobile-toggle]');
  const mobMenu = document.querySelector('[data-mobile-menu]');
  if (mobToggle && mobMenu) mobToggle.addEventListener('click', ()=>mobMenu.classList.toggle('open'));
  const tabBtns = document.querySelectorAll('[data-tab-btn]');
  const tabs = document.querySelectorAll('[data-tab-panel]');
  if (tabBtns.length) {
    tabBtns.forEach(btn=>btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-tab-btn');
      tabBtns.forEach(b=>b.classList.remove('active'));
      tabs.forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`[data-tab-panel="${id}"]`);
      if (panel) panel.classList.add('active');
    }));
  }
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.slide');
    let idx = 0;
    const render = ()=> track.style.transform = `translateX(-${idx*100}%)`;
    carousel.querySelector('[data-prev]')?.addEventListener('click', ()=>{ idx = (idx-1+slides.length)%slides.length; render();});
    carousel.querySelector('[data-next]')?.addEventListener('click', ()=>{ idx = (idx+1)%slides.length; render();});
  }
})();
