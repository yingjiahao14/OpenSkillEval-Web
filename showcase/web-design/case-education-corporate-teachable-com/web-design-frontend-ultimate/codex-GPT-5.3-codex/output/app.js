const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

$$('.tab-switch').forEach(sw=>{
  const buttons = $$('button', sw);
  const target = sw.dataset.target;
  const wrap = document.getElementById(target);
  const views = $$('.preview', wrap);
  buttons.forEach(btn=>btn.addEventListener('click', ()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    views.forEach(v=>v.classList.add('hidden'));
    $('#' + btn.dataset.view, wrap).classList.remove('hidden');
  }));
});

$$('[data-tab-group]').forEach(group=>{
  const name = group.dataset.tabGroup;
  const btns = $$(`[data-tab-btn="${name}"]`);
  const panels = $$(`[data-tab-panel="${name}"]`);
  btns.forEach(btn=>btn.addEventListener('click', ()=>{
    btns.forEach(b=>b.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  }));
});

$$('[data-carousel]').forEach(car=>{
  const slides = $$('.testimonial', car);
  let i = 0;
  const render = () => slides.forEach((s,idx)=> s.style.display = idx >= i && idx < i+3 ? 'block' : 'none');
  render();
  $('.prev', car)?.addEventListener('click', ()=>{ i = (i-1+slides.length)%slides.length; render(); });
  $('.next', car)?.addEventListener('click', ()=>{ i = (i+1)%slides.length; render(); });
});

$$('.faq-item').forEach(item=>{
  $('.faq-q', item).addEventListener('click', ()=>{
    const container = item.parentElement;
    $$('.faq-item', container).forEach(el=>{ if(el!==item) el.classList.remove('open'); });
    item.classList.toggle('open');
  });
});

$$('[data-accordion-toggle]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const p = document.getElementById(btn.dataset.accordionToggle);
    const hidden = p.style.display === 'none';
    p.style.display = hidden ? 'block' : 'none';
  });
});

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=> e.isIntersecting && e.target.classList.add('in'));
}, {threshold: .12});
$$('.reveal').forEach(el=>io.observe(el));
