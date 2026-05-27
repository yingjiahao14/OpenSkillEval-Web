const qs = (s, p=document) => p.querySelector(s);
const qsa = (s, p=document) => [...p.querySelectorAll(s)];

qsa('[data-carousel]').forEach((wrap) => {
  const track = qs('.track', wrap);
  const slides = qsa('.slide', wrap);
  const prev = qs('.prev', wrap);
  const next = qs('.next', wrap);
  let index = 0;
  const perView = () => window.innerWidth < 700 ? 1 : window.innerWidth < 1000 ? 2 : 3;
  function render(){
    const max = Math.max(0, slides.length - perView());
    if(index > max) index = max;
    const w = slides[0].getBoundingClientRect().width + 16;
    track.style.transform = `translateX(${-index * w}px)`;
  }
  prev?.addEventListener('click', ()=>{ index = Math.max(0, index-1); render();});
  next?.addEventListener('click', ()=>{ index = Math.min(slides.length - perView(), index+1); render();});
  window.addEventListener('resize', render);
  render();
});

qsa('[data-filter-group]').forEach((group) => {
  const cards = qsa('[data-category]');
  qsa('.filter-item', group).forEach((btn) => {
    btn.addEventListener('click', () => {
      qsa('.filter-item', group).forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const pick = btn.dataset.filter;
      cards.forEach((card) => {
        card.style.display = pick === 'All' || card.dataset.category.includes(pick) ? '' : 'none';
      });
    });
  });
});

const billing = qs('[data-billing]');
if (billing) {
  const price = qs('[data-price]');
  const total = qs('[data-total]');
  const save = qs('[data-save]');
  qsa('button', billing).forEach((b)=>b.addEventListener('click',()=>{
    qsa('button', billing).forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    if (b.dataset.plan === 'yearly') {
      price.textContent = '$14.59/month';
      total.textContent = '$174.50 billed yearly';
      save.textContent = 'SAVE 57%';
    } else {
      price.textContent = '$33.90/month';
      total.textContent = '$33.90 billed monthly';
      save.textContent = 'Flexible month-to-month';
    }
  }));
}

qsa('.faq-q').forEach((btn)=>btn.addEventListener('click',()=>{
  const ans = btn.nextElementSibling;
  const open = ans.style.display === 'block';
  qsa('.faq-a').forEach(a=>a.style.display='none');
  ans.style.display = open ? 'none' : 'block';
}));

qsa('[data-project-sort]').forEach((controls)=>{
  const container = qs('[data-projects]');
  const cards = qsa('.card', container);
  qsa('button', controls).forEach((btn)=>btn.addEventListener('click',()=>{
    qsa('button', controls).forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode;
    const sorted = [...cards].sort((a,b)=>{
      if(mode==='likes') return +b.dataset.likes - +a.dataset.likes;
      if(mode==='views') return +b.dataset.views - +a.dataset.views;
      return a.dataset.title.localeCompare(b.dataset.title);
    });
    sorted.forEach(c=>container.appendChild(c));
  }));
});

qsa('.foot-acc-btn').forEach((btn)=>btn.addEventListener('click',()=>{
  const links = btn.nextElementSibling;
  links.classList.toggle('open');
}));

const passToggle = qs('[data-pass-toggle]');
if(passToggle){
  passToggle.addEventListener('click',()=>{
    const input = qs('#password');
    input.type = input.type === 'password' ? 'text' : 'password';
  });
}
