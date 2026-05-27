const data = {
  specializations: [
    { title: 'Graphic Design and Visual Communication', students: '274,195', rating: '99%', old: '$174.50', price: '$14.59/mo' },
    { title: 'Sewing and Design Specialization', students: '99,120', rating: '98%', old: '$132.00', price: '$11.99/mo' },
    { title: 'Social Media Marketing Specialization', students: '282,895', rating: '98%', old: '$152.00', price: '$12.50/mo' },
    { title: 'Sketching Techniques Specialization', students: '87,442', rating: '97%', old: '$140.00', price: '$10.99/mo' },
    { title: 'UX/UI Design Specialization', students: '213,010', rating: '99%', old: '$168.00', price: '$14.20/mo' }
  ],
  courses: [
    { title: 'Drawing for Beginners Level -1', teacher: 'Lina Ortiz', students: '274,195', rating: '99%', price: '$0.50', category: 'Illustration' },
    { title: 'Modern Watercolor Techniques', teacher: 'Aya Nakamura', students: '140,522', rating: '98%', price: '$12.00', category: 'Craft' },
    { title: 'Professional Photography for Instagram', teacher: 'Leo Costa', students: '282,895', rating: '98%', price: '$0.50', category: 'Photography & Video' },
    { title: 'Creative Drawing Techniques for Beginners', teacher: 'Marta Hill', students: '94,112', rating: '97%', price: '$9.00', category: 'Illustration' },
    { title: 'Introduction to After Effects', teacher: 'Ivan Cho', students: '76,303', rating: '96%', price: '$14.00', category: '3D & Animation' },
    { title: 'Introduction to Adobe Photoshop', teacher: 'Nora James', students: '182,210', rating: '99%', price: '$0.50', category: 'Design' }
  ],
  categories: ['Illustration','Craft','Marketing & Business','Photography & Video','Design','3D & Animation','Architecture & Spaces','Writing','Fashion','Web & App Design'],
  valueProps: ['Learn at your own pace','Get front-row seats','Learn from the best professionals','Share knowledge and ideas','Meet expert teachers','Connect with a global creative community','Hands-on projects and critiques','Build a portfolio that gets noticed'],
  projects: [
    { title: 'The Heart of the Street', user: '@studiomina', likes: 1800, views: 22000, type: 'illustration' },
    { title: 'Bird Among the Flowers', user: '@floraink', likes: 2100, views: 19800, type: 'illustration' },
    { title: 'Wonder Woman', user: '@vectorvibe', likes: 2500, views: 28000, type: 'design' },
    { title: 'Floral Shadow Box', user: '@craftnook', likes: 900, views: 8400, type: 'craft' },
    { title: 'HER: The Presence of Absence', user: '@lensaura', likes: 2400, views: 26000, type: 'photography' },
    { title: 'City Pulse Branding', user: '@graphite', likes: 1400, views: 17200, type: 'design' }
  ],
  faq: [
    { q: 'What courses can Plus members watch for free?', a: 'Plus members get unlimited access to +1,000 eligible courses across top creative disciplines.' },
    { q: 'How do Plus credits work?', a: 'Yearly members receive 12 Plus credits every year to redeem for premium courses and certificates.' },
    { q: 'When will I get my certificate?', a: 'Once you complete course requirements, your certificate becomes available in your profile dashboard.' },
    { q: "What's the difference between the yearly and monthly subscription?", a: 'Yearly gives the best value at $14.59/month billed annually ($174.50) with 12 credits; monthly is $33.90/month.' }
  ]
};

const card = (c, badge='Best seller') => `<article class="card"><span class="badge">${badge}</span><h3>${c.title}</h3><p class="muted">${c.teacher || 'CreativeHub Team'}</p><p>${c.students} students · ${c.rating}</p><p class="price">${c.price} <small class="muted"><s>${c.old || ''}</s></small></p></article>`;

function setupCarousel(name, items) {
  const track = document.querySelector(`[data-carousel-track="${name}"]`);
  if (!track) return;
  track.innerHTML = items.map(item => card(item, name === 'stories' ? 'Member story' : 'Best seller')).join('');
  document.querySelectorAll(`[data-carousel="${name}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const width = track.firstElementChild?.getBoundingClientRect().width || 300;
      track.scrollBy({ left: btn.dataset.dir === 'next' ? width + 16 : -(width + 16), behavior: 'smooth' });
    });
  });
}

function setupHome() {
  setupCarousel('specialization', data.specializations);
  setupCarousel('courses', data.courses);
  const vp = document.getElementById('valueProps');
  if (vp) vp.innerHTML = data.valueProps.map(v => `<div class="value-item">${v}</div>`).join('');
}

function setupCourses() {
  const grid = document.getElementById('coursesGrid');
  const filters = document.getElementById('categoryFilters');
  if (!grid || !filters) return;
  const render = (cat='All') => {
    const list = cat === 'All' ? data.courses : data.courses.filter(c => c.category === cat);
    grid.innerHTML = list.map(c => card(c)).join('');
  };
  filters.innerHTML = ['All', ...data.categories].map(c => `<button class="filter-btn ${c==='All'?'active':''}" data-cat="${c}">${c}</button>`).join('');
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.cat);
  });
  render();
}

function setupProjects() {
  const mason = document.getElementById('projectsMasonry');
  const sort = document.getElementById('projectSort');
  if (!mason || !sort) return;
  let current = [...data.projects];
  const render = () => mason.innerHTML = current.map(p => `<article class="card project"><div class="thumb"></div><h3>${p.title}</h3><p class="muted">${p.user}</p><p>❤️ ${p.likes} · 👁 ${p.views}</p></article>`).join('');
  sort.innerHTML = ['Most liked','Most viewed','Illustration','Design','Photography','Craft'].map((s,i)=>`<button class="${i===0?'active':''}" data-sort="${s}">${s}</button>`).join('');
  sort.addEventListener('click', (e)=>{
    const btn=e.target.closest('button'); if(!btn) return;
    sort.querySelectorAll('button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const s=btn.dataset.sort;
    current=[...data.projects];
    if(s==='Most liked') current.sort((a,b)=>b.likes-a.likes);
    else if(s==='Most viewed') current.sort((a,b)=>b.views-a.views);
    else current=current.filter(p=>p.type===s.toLowerCase());
    render();
  });
  render();
}

function setupPlus() {
  setupCarousel('pluscourses', data.courses);
  setupCarousel('stories', [
    { title: 'From hobbyist to freelance illustrator', teacher: 'Elena P.' , students: 'Member since 2023', rating: '5/5', price: '' },
    { title: 'How Plus helped me launch my photo studio', teacher: 'Mark T.' , students: 'Member since 2022', rating: '5/5', price: '' },
    { title: 'Weekly learning routine that changed my career', teacher: 'Nina R.' , students: 'Member since 2024', rating: '5/5', price: '' }
  ]);
  const pricing = document.getElementById('pricingCard');
  const toggle = document.getElementById('pricingToggle');
  const renderPrice = (mode='yearly') => {
    const yearly = mode === 'yearly';
    pricing.innerHTML = `<p class="badge">${yearly ? 'SAVE 57%' : 'Flexible plan'}</p><h3>${yearly ? '$14.59/month' : '$33.90/month'}</h3><p>${yearly ? '$174.50 billed yearly · 12 Plus credits every year' : 'Billed monthly · cancel anytime'}</p><ul><li>+1,000 courses FREE</li><li>100+ new courses added every week</li><li>certificate per course</li><li>Exchange it now, or later</li></ul><button class="btn btn-primary">Start Plus</button>`;
  };
  if (toggle) {
    toggle.addEventListener('click', (e)=>{
      const btn=e.target.closest('button[data-billing]'); if(!btn) return;
      toggle.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderPrice(btn.dataset.billing);
    });
  }
  renderPrice();
  const faq = document.getElementById('faqList');
  if (faq) {
    faq.innerHTML = data.faq.map((f,i)=>`<div class="faq-item ${i===0?'open':''}"><button class="faq-q">${f.q}</button><div class="faq-a">${f.a}</div></div>`).join('');
    faq.addEventListener('click',(e)=>{
      const q=e.target.closest('.faq-q'); if(!q) return;
      q.parentElement.classList.toggle('open');
    });
  }
}

function setupLogin() {
  const input = document.getElementById('passwordInput');
  const toggle = document.getElementById('passwordToggle');
  if (!input || !toggle) return;
  toggle.addEventListener('click', ()=> input.type = input.type === 'password' ? 'text' : 'password');
}

function setupFooterAccordion() {
  if (window.matchMedia('(max-width: 760px)').matches) {
    document.querySelectorAll('[data-footer-group] .footer-title').forEach(btn => {
      btn.addEventListener('click', ()=> btn.parentElement.classList.toggle('open'));
    });
  }
}

const page = document.body.dataset.page;
if (page === 'home') setupHome();
if (page === 'courses') setupCourses();
if (page === 'projects') setupProjects();
if (page === 'plus') setupPlus();
if (page === 'login') setupLogin();
setupFooterAccordion();
