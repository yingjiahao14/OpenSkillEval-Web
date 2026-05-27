const specials = [
  {title:'Graphic Design and Visual Communication',students:'282,895',rating:'99%',old:'$224.99',price:'$0.50'},
  {title:'Sewing and Design Specialization',students:'274,195',rating:'98%',old:'$199.00',price:'$0.50'},
  {title:'Social Media Marketing Specialization',students:'210,341',rating:'97%',old:'$189.00',price:'$0.50'},
  {title:'Sketching Techniques Specialization',students:'196,220',rating:'99%',old:'$210.00',price:'$0.50'},
  {title:'UX/UI Design Specialization',students:'300,012',rating:'99%',old:'$239.00',price:'$0.50'}
];
const courses = [
  {title:'Drawing for Beginners Level -1',cat:'Illustration',instructor:'Alena Cook',students:'274,195',rating:'99%',price:'$12.99'},
  {title:'Modern Watercolor Techniques',cat:'Illustration',instructor:'Mia M.',students:'113,000',rating:'98%',price:'$14.99'},
  {title:'Professional Photography for Instagram',cat:'Photography & Video',instructor:'R. Campos',students:'89,112',rating:'97%',price:'$11.99'},
  {title:'Creative Drawing Techniques for Beginners',cat:'Illustration',instructor:'Noah T',students:'102,210',rating:'96%',price:'$13.99'},
  {title:'Introduction to After Effects',cat:'3D & Animation',instructor:'J. Lee',students:'140,500',rating:'98%',price:'$15.99'},
  {title:'Introduction to Adobe Photoshop',cat:'Design',instructor:'Sara P',students:'165,320',rating:'99%',price:'$10.99'}
];
const plusCourses = [
  'Color Theory for Digital Artists','Storytelling Through Photography','Motion Graphics Fast Track','Brand Design Intensive','Creative Career Systems','Sketchbook to Portfolio'
];
const projects = [
  {title:'The Heart of the Street',likes:882,views:12040,tag:'Photography'},
  {title:'Bird Among the Flowers',likes:612,views:9420,tag:'Illustration'},
  {title:'Wonder Woman',likes:1320,views:18110,tag:'Illustration'},
  {title:'Floral Shadow Box',likes:402,views:7900,tag:'Craft'},
  {title:'HER: The Presence of Absence',likes:1103,views:15230,tag:'Photography'},
  {title:'Monochrome Balance',likes:388,views:6200,tag:'Design'}
];
function renderCard(item,badge='Best seller'){return `<article class="card"><div class="thumb"></div><div class="card-body"><h3>${item.title}</h3><div class="meta"><span>${item.students||''} students</span><span>${item.rating||''} rating</span></div><div class="price-row"><span class="price">${item.price||'$0.50'}</span>${item.old?`<span class="strike">${item.old}</span>`:''}<span class="badge">${badge}</span></div></div></article>`}
function setupCarousel(trackId,leftId,rightId){
  const t=document.getElementById(trackId); if(!t)return;
  const left=document.getElementById(leftId), right=document.getElementById(rightId);
  const amount=()=>t.querySelector('.card')?.offsetWidth + 12 || 300;
  left?.addEventListener('click',()=>t.scrollBy({left:-amount(),behavior:'smooth'}));
  right?.addEventListener('click',()=>t.scrollBy({left:amount(),behavior:'smooth'}));
}
function setupFooterAccordion(){
  document.querySelectorAll('.footer-toggle').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open')));
}
function initHome(){
  const s=document.getElementById('special-track'); if(s) s.innerHTML=specials.map(i=>renderCard(i,'Specialization')).join('');
  const c=document.getElementById('course-track'); if(c) c.innerHTML=courses.map(i=>renderCard(i)).join('');
  const values=['Learn at your own pace','Get front-row seats','Learn from the best professionals','Share knowledge and ideas','Meet expert teachers','Connect with a global creative community','Build portfolio-ready projects','Join weekly live sessions'];
  const v=document.getElementById('values-grid'); if(v) v.innerHTML=values.map(x=>`<div class="value-card">${x}</div>`).join('');
  setupCarousel('special-track','special-left','special-right');
  setupCarousel('course-track','course-left','course-right');
}
function initCourses(){
  const grid=document.getElementById('courses-grid'); if(!grid)return;
  const render=(cat='All')=>grid.innerHTML=courses.filter(c=>cat==='All'||c.cat===cat).map(c=>renderCard(c)).join('');
  render('All');
  document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-cat]').forEach(x=>x.classList.remove('active')); b.classList.add('active'); render(b.dataset.cat);}));
}
function initPlus(){
  const free=document.getElementById('plus-free'); if(free) free.innerHTML=plusCourses.map(t=>renderCard({title:t,students:'Plus',rating:'Members',price:'FREE'},'Plus')).join('');
  const price=document.getElementById('price-main'); const sub=document.getElementById('price-sub'); const save=document.getElementById('save-badge');
  document.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-plan]').forEach(x=>x.classList.remove('active')); b.classList.add('active');
    if(b.dataset.plan==='yearly'){price.textContent='$14.59/month'; sub.textContent='Billed as $174.50 yearly • 12 Plus credits every year'; save.textContent='SAVE 57%';}
    else {price.textContent='$33.90/month'; sub.textContent='Billed monthly • Flexible cancellation'; save.textContent='';}
  }));
  document.querySelectorAll('.accordion-btn').forEach(btn=>btn.addEventListener('click',()=>{const p=btn.nextElementSibling; p.style.maxHeight=p.style.maxHeight?null:p.scrollHeight+'px';}));
  setupCarousel('plus-free','plus-free-left','plus-free-right');
  setupCarousel('plus-new','plus-new-left','plus-new-right');
  const pn=document.getElementById('plus-new'); if(pn) pn.innerHTML=plusCourses.slice().reverse().map(t=>renderCard({title:t,students:'New',rating:'This week',price:'FREE'},'New')).join('');
}
function initProjects(){
  const g=document.getElementById('project-grid'); if(!g)return;
  const render=(tag='All',sort='popular')=>{
    let arr=projects.filter(p=>tag==='All'||p.tag===tag);
    arr=arr.sort((a,b)=>sort==='popular'?b.likes-a.likes:b.views-a.views);
    g.innerHTML=arr.map(p=>`<article class="project"><div class="thumb"></div><div class="card-body"><h3>${p.title}</h3><div class="meta"><span>${p.tag}</span><span>❤ ${p.likes}</span><span>👁 ${p.views}</span></div></div></article>`).join('');
  };
  let tag='All', sort='popular'; render(tag,sort);
  document.querySelectorAll('[data-tag]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tag]').forEach(x=>x.classList.remove('active')); b.classList.add('active'); tag=b.dataset.tag; render(tag,sort);}));
  document.querySelectorAll('[data-sort]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-sort]').forEach(x=>x.classList.remove('active')); b.classList.add('active'); sort=b.dataset.sort; render(tag,sort);}));
}
function initLogin(){
  const e=document.getElementById('toggle-pass'); const i=document.getElementById('password'); if(!e||!i) return;
  e.addEventListener('click',()=>{i.type=i.type==='password'?'text':'password'; e.textContent=i.type==='password'?'👁':'🙈';});
}
document.addEventListener('DOMContentLoaded',()=>{initHome();initCourses();initPlus();initProjects();initLogin();setupFooterAccordion();});
