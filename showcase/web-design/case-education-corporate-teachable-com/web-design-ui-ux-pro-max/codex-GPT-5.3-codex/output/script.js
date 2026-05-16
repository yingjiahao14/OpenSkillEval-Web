document.querySelectorAll('[data-tabs]').forEach((group) => {
  const buttons = group.querySelectorAll('[data-tab-btn]');
  const panels = group.querySelectorAll('[data-tab-panel]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      group.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
    });
  });
});

document.querySelectorAll('[data-accordion]').forEach((acc) => {
  const items = acc.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    item.querySelector('.accordion-trigger')?.addEventListener('click', () => {
      items.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.slide');
  let idx = 0;
  const move = () => { track.style.transform = `translateX(-${idx * 100}%)`; };
  carousel.querySelector('[data-prev]')?.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length; move();
  });
  carousel.querySelector('[data-next]')?.addEventListener('click', () => {
    idx = (idx + 1) % slides.length; move();
  });
});

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el)=>observer.observe(el));
