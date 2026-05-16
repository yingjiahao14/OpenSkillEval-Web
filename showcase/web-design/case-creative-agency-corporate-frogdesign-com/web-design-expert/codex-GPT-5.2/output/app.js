/* Leap Studio landing page interactions (no build step) */

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function debounce(fn, ms=150){
  let t;
  return (...args) => {
    clearTimeout(t);
    t=setTimeout(()=>fn(...args), ms);
  };
}

function prefersReducedMotion(){
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setAriaExpanded(btn, expanded){
  btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function clickOutside(container, onOutside){
  function handler(e){
    if (!container.contains(e.target)) onOutside();
  }
  window.addEventListener('pointerdown', handler);
  return () => window.removeEventListener('pointerdown', handler);
}

// ---- Language selector (language-toggle) ----
(function languageToggle(){
  const btn = qs('#langBtn');
  const menu = qs('#langMenu');
  if (!btn || !menu) return;

  let cleanupOutside = null;

  function open(){
    menu.dataset.open = 'true';
    setAriaExpanded(btn, true);
    cleanupOutside = clickOutside(qs('.lang'), close);
  }

  function close(){
    menu.dataset.open = 'false';
    setAriaExpanded(btn, false);
    if (cleanupOutside) cleanupOutside();
    cleanupOutside = null;
  }

  btn.addEventListener('click', () => {
    const openNow = menu.dataset.open === 'true';
    if (openNow) close(); else open();
  });

  menu.addEventListener('click', (e) => {
    const item = e.target.closest('button[data-lang]');
    if (!item) return;
    btn.firstChild.textContent = item.dataset.lang;
    close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// ---- Mobile nav ----
(function mobileNav(){
  const btn = qs('#mobileNavBtn');
  const panel = qs('#mobileNav');
  if (!btn || !panel) return;

  function setOpen(open){
    panel.hidden = !open;
    setAriaExpanded(btn, open);
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  btn.addEventListener('click', () => setOpen(panel.hidden));
  qsa('[data-nav]', panel).forEach(a => a.addEventListener('click', () => setOpen(false)));
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 860) setOpen(false);
  }, 120));
})();

// ---- Smooth anchor scroll for nav ----
(function anchorScroll(){
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = qs(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'});
      history.pushState(null, '', href);
    });
  });
})();

// ---- Hero carousel (hero-carousel) ----
(function heroCarousel(){
  const slides = [
    {
      title: 'Futurescape: Synthetic Realities',
      copy: 'Welcome to the Futurescape. Discover trends and insights on the future of human-AI chemistry.',
      cta: 'Read the report',
      href: '#insights',
      img: 'assets/hero-1.jpg',
      pills: [{t:'Global', tone:'blue'}, {t:'Insight'}]
    },
    {
      title: 'Designing Robots for Human Spaces',
      copy: "Meet 'Aura,' a concept from Leap Studio that offers a human-centered approach to physical AI.",
      cta: 'Explore the work',
      href: '#work',
      img: 'assets/hero-2.jpg',
      pills: [{t:'Work', tone:'amber'}, {t:'Physical AI'}]
    },
    {
      title: 'Amplifying Clinical Care with AI',
      copy: 'Examining how service design helps experts understand the healthcare ecosystem.',
      cta: 'Explore now',
      href: '#insights',
      img: 'assets/hero-3.jpg',
      pills: [{t:'Article', tone:'blue'}, {t:'Healthcare'}]
    },
    {
      title: 'Design Mind Leapcast Ep. 55',
      copy: 'Peter Hallström, Global Head of Design at Lumina Health, discusses the evolution of product design and the role of design leadership.',
      cta: 'Listen now',
      href: '#insights',
      img: 'assets/hero-4.jpg',
      pills: [{t:'Podcast', tone:'amber'}, {t:'Leadership'}]
    },
    {
      title: 'From Complexity to Clarity',
      copy: 'Dive into new research on how CMOs can reclaim marketing to build competitive edge.',
      cta: 'Read the report',
      href: '#insights',
      img: 'assets/hero-5.jpg',
      pills: [{t:'Insight Report', tone:'blue'}, {t:'CMO'}]
    },
  ];

  const title = qs('#heroTitle');
  const copy = qs('#heroCopy');
  const img = qs('#heroImage');
  const cta = qs('#heroCta');
  const pills = qs('#heroPills');
  const dots = qs('#heroDots');
  const prev = qs('#heroPrev');
  const next = qs('#heroNext');

  if (!title || !copy || !img || !cta || !dots || !prev || !next || !pills) return;

  let idx = 0;
  let timer = null;

  function renderPills(arr){
    pills.innerHTML = '';
    arr.forEach(p => {
      const s = document.createElement('span');
      s.className = `pill${p.tone ? ' ' + p.tone : ''}`;
      s.textContent = p.t;
      pills.appendChild(s);
    });
  }

  function renderDots(){
    dots.innerHTML='';
    slides.forEach((_,i)=>{
      const b=document.createElement('button');
      b.className='dot';
      b.type='button';
      b.setAttribute('role','tab');
      b.setAttribute('aria-label', `Go to slide ${i+1}`);
      b.setAttribute('aria-current', i===idx ? 'true' : 'false');
      b.addEventListener('click', ()=>go(i));
      dots.appendChild(b);
    });
  }

  function apply(i){
    const s = slides[i];
    title.textContent = s.title;
    copy.textContent = s.copy;
    cta.textContent = s.cta;
    cta.setAttribute('href', s.href);
    renderPills(s.pills);

    if (prefersReducedMotion()){
      img.src = s.img;
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity .28s var(--ease)';
      const newImg = new Image();
      newImg.onload = () => {
        img.src = s.img;
        requestAnimationFrame(()=> img.style.opacity = '1');
      };
      newImg.src = s.img;
    }

    renderDots();
  }

  function go(i){
    idx = (i + slides.length) % slides.length;
    apply(idx);
    restart();
  }

  function restart(){
    if (timer) window.clearInterval(timer);
    if (prefersReducedMotion()) return;
    timer = window.setInterval(()=>go(idx+1), 7000);
  }

  prev.addEventListener('click', ()=>go(idx-1));
  next.addEventListener('click', ()=>go(idx+1));

  window.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowLeft') go(idx-1);
    if (e.key === 'ArrowRight') go(idx+1);
  });

  apply(idx);
  restart();
})();

// ---- Team region toggle + carousel (team-region-toggle, team-member-carousel) ----
(function teamCarousel(){
  const data = {
    'North America': [
      {
        name: 'Denice Alvarez',
        title: 'Office Manager',
        office: 'New York',
        quote: '“As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers.”',
        img: 'assets/team-1-denice.jpg'
      },
      {
        name: 'Marco Bellini',
        title: 'Design Director',
        office: 'San Francisco',
        quote: '“Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make.”',
        img: 'assets/team-2-marco.jpg'
      },
    ],
    'Asia': [
      {
        name: 'Priya Mehta',
        title: 'Studio Head',
        office: 'Bangalore',
        quote: '“We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm.”',
        img: 'assets/team-3-priya.jpg'
      },
      {
        name: 'Thierry Lam',
        title: 'Design Lead',
        office: 'Singapore',
        quote: '“Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless.”',
        img: 'assets/team-4-thierry.jpg'
      },
    ],
    'Europe': [
      {
        name: 'Gavin Hartley',
        title: 'Managing Director',
        office: 'London',
        quote: '“It\'s my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results.”',
        img: 'assets/team-5-gavin.jpg'
      },
      {
        name: 'Francesca Terzi',
        title: 'Design Director',
        office: 'Munich',
        quote: '“At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life.”',
        img: 'assets/team-6-francesca.jpg'
      },
    ],
    'Oceania': [
      {
        name: 'Jacintha Soo Ho',
        title: 'Senior Manager, CX Transformation',
        office: 'Melbourne',
        quote: '“I love helping clients see beyond their assumptions and showing them opportunities they haven\'t thought of before.”',
        img: 'assets/team-7-jacintha.jpg'
      },
    ]
  };

  const tabsRoot = qs('#regionTabs');
  const title = qs('#teamCarouselTitle');
  const track = qs('#teamTrack');
  const prev = qs('#teamPrev');
  const next = qs('#teamNext');

  if (!tabsRoot || !title || !track || !prev || !next) return;

  let region = 'North America';

  function buildCard(person){
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="media"><img src="${person.img}" alt="Portrait of ${person.name}" loading="lazy" /></div>
      <div class="body">
        <h3>${person.name}</h3>
        <div style="color:var(--muted); margin-bottom:10px; font-size:.95rem">${person.title} • ${person.office}</div>
        <div class="quote">${person.quote}</div>
        <div class="meta-row" style="margin-top:12px">
          <span style="color:var(--muted); font-size:.92rem">Office: ${person.office}</span>
          <a class="btn" href="#contact-panel" aria-label="Contact Leap Studio ${person.office}">Contact Leap Studio ${person.office}</a>
        </div>
      </div>
    `;
    return card;
  }

  function renderRegion(newRegion){
    region = newRegion;
    title.textContent = region;

    track.innerHTML = '';
    const people = data[region] ?? [];
    people.forEach(p => track.appendChild(buildCard(p)));

    // Move focus to the track for keyboard/screen reader continuity
    track.focus({preventScroll:true});
    track.scrollLeft = 0;
  }

  function setSelectedTab(btn){
    qsa('[role="tab"]', tabsRoot).forEach(t => t.setAttribute('aria-selected', 'false'));
    btn.setAttribute('aria-selected', 'true');
  }

  tabsRoot.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-region]');
    if (!btn) return;
    setSelectedTab(btn);
    renderRegion(btn.dataset.region);
  });

  function scrollByCard(dir){
    const card = qs('.card', track);
    const w = card ? card.getBoundingClientRect().width : 360;
    track.scrollBy({left: dir * (w + 14), behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
  }

  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));

  // Keyboard support
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollByCard(-1);
    if (e.key === 'ArrowRight') scrollByCard(1);
  });

  // Swipe hint: native track scroll handles touch.
  renderRegion(region);
})();

// ---- Work showcase (work-carousel) ----
(function workShowcase(){
  const projects = [
    {
      client: 'Unilever',
      title: 'Creating Consumer Insights at Scale',
      quote: '“The PDC provides insight not only to marketing, but also to supply chain, R&D, HR and finance. Thanks to the collaboration with Leap Studio we now have the capability to provide insight and action all across the organisation.”',
      cite: 'Alex Owens, VP, Global Head of People Data Centres',
      img: 'assets/work-1-unilever.jpg'
    },
    {
      client: 'IKEA Retail (Ingka Group)',
      title: 'Deepening Customer Engagement',
      quote: 'A new service ecosystem that turns visits into relationships—across channels, markets, and moments that matter.',
      cite: 'Customer Experience Transformation',
      img: 'assets/work-2-ikea.jpg'
    },
    {
      client: 'Volvo Group',
      title: 'Harnessing Data for Leaner and Greener Future of Mobility',
      quote: 'Designing data products that help teams reduce waste, accelerate decision-making, and scale sustainability outcomes.',
      cite: 'Mobility + Sustainability',
      img: 'assets/work-3-volvo.jpg'
    },
    {
      client: 'Chase Payment Solutions',
      title: 'Modernizing the Point-of-Sale Experience',
      quote: 'A next-gen POS experience that balances speed, trust, and accessibility—built for enterprise-scale deployment.',
      cite: 'Product + Service Design',
      img: 'assets/work-4-chase.jpg'
    },
    {
      client: 'Tiffany & Co.',
      title: 'Reimagining Luxury Craftsmanship',
      quote: '“We valued the truly collaborative process from conception to delivery. The resulting experience beautifully emphasizes our core brand codes of craftsmanship and heritage, while effectively leveraging new AI technologies.”',
      cite: 'Thomas Arnold, Digital Experience Design & Innovation Director',
      img: 'assets/work-5-tiffany.jpg'
    },
    {
      client: 'Majid Al Futtaim / Carrefour',
      title: 'Helping Healthier Habits Stick',
      quote: '“Our \'Pick Your 5\' framework, based on your behavior change strategy, is going to be instrumental in driving positive outcomes.”',
      cite: 'Sheila Chaiban, Global CMO',
      img: 'assets/work-6-carrefour.jpg'
    },
  ];

  const track = qs('#workTrack');
  const prev = qs('#workPrev');
  const next = qs('#workNext');
  if (!track || !prev || !next) return;

  track.innerHTML='';

  projects.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card work';
    card.innerHTML = `
      <div class="media"><img src="${p.img}" alt="${p.client} — ${p.title}" loading="lazy" /></div>
      <div class="body">
        <div class="tag ${i % 2 ? 'amber' : ''}">${p.client}</div>
        <h3>${p.title}</h3>
        <p>${p.quote}</p>
        <div class="meta-row">
          <span style="color:var(--muted); font-size:.92rem">${p.cite}</span>
          <a class="btn" href="#contact-panel" aria-label="Discuss ${p.client} case study">Discuss</a>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  function scrollByCard(dir){
    const card = qs('.card', track);
    const w = card ? card.getBoundingClientRect().width : 460;
    track.scrollBy({left: dir * (w + 14), behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
  }

  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
})();

// ---- Insights list ----
(function insights(){
  const items = [
    { type: 'Podcast', title: 'Ep. 58 — When Human Connection Meets AI', cta: 'Listen', img: 'assets/insight-1-podcast-58.jpg' },
    { type: 'Podcast', title: 'Ep. 57 — Writing the Future of AI', cta: 'Listen', img: 'assets/insight-2-podcast-57.jpg' },
    { type: 'Article', title: 'Amplifying Clinical Care with AI', cta: 'Read', img: 'assets/insight-3-article-clinical.jpg' },
    { type: 'Podcast', title: 'Ep. 56 — The Future of Customer Experience', cta: 'Listen', img: 'assets/insight-4-podcast-56.jpg' },
    { type: 'Article', title: 'Next-Gen Contact Centers: Powered by AI', cta: 'Read', img: 'assets/insight-5-article-contact.jpg' },
    { type: 'Article', title: 'The AI-Empowered Marketer', cta: 'Read', img: 'assets/insight-6-article-ai-marketer.jpg' },
    { type: 'Podcast', title: 'Ep. 55 — What Makes a Product Great?', cta: 'Listen', img: 'assets/insight-7-podcast-55.jpg' },
    { type: 'Insight Report', title: 'From Complexity to Clarity', cta: 'Download', img: 'assets/insight-8-report-clarity.jpg' },
  ];

  const grid = qs('#insightsGrid');
  if (!grid) return;
  grid.innerHTML='';

  items.forEach((it, i) => {
    const card = document.createElement('article');
    card.className = 'insight';
    const tagTone = (it.type === 'Podcast') ? 'amber' : '';

    card.innerHTML = `
      <div class="media"><img src="${it.img}" alt="${it.title}" loading="lazy" /></div>
      <div class="body">
        <div class="tag ${tagTone}">${it.type}</div>
        <h3>${it.title}</h3>
        <div class="spacer"></div>
        <div class="meta-row">
          <span style="color:var(--muted); font-size:.92rem">Leap Studio Insights</span>
          <a class="btn primary" href="#contact-panel" aria-label="${it.cta}: ${it.title}">${it.cta}</a>
        </div>
      </div>
    `;

    // Stagger on-load fade-in (subtle)
    if (!prefersReducedMotion()){
      card.style.opacity='0';
      card.style.transform='translateY(6px)';
      card.style.transition='opacity .35s var(--ease), transform .35s var(--ease)';
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.opacity='1';
          card.style.transform='translateY(0)';
        }, 40 + i*35);
      });
    }

    grid.appendChild(card);
  });
})();

// ---- Principles ----
(function principles(){
  const items = [
    {
      title: 'Challenge the status quo',
      body: 'From launching game-changing products and services to redefining business as usual, our work bridges the gap between what could be and what should be.'
    },
    {
      title: 'Fuse art & science to make ideas real',
      body: 'We innovate with equal parts expertise in creativity and transformation, leveraging next-level data and tech to elevate experiences for all.'
    },
    {
      title: 'Create a lasting impact at global scale',
      body: 'Driving meaningful outcomes starts with reimagining systems at a fundamental level. As part of Meridian Consulting, we bring a global reach and diverse skillsets to our approach.'
    },
    {
      title: 'Regenerate systems & communities',
      body: 'In the eco-digital era, we believe every collaboration is an opportunity to create social, economic and environmental value for all.'
    },
  ];

  const grid = qs('#principlesGrid');
  if (!grid) return;
  grid.innerHTML='';

  items.forEach((p, i) => {
    const card = document.createElement('article');
    card.className='principle';
    card.innerHTML = `
      <div class="kicker">Principle 0${i+1}</div>
      <h3>${p.title}</h3>
      <p>${p.body}</p>
    `;
    grid.appendChild(card);
  });
})();

// ---- Cookie consent (cookie-consent) ----
(function cookieConsent(){
  const banner = qs('#cookieBanner');
  const accept = qs('#cookieAccept');
  const decline = qs('#cookieDecline');
  const manage = qs('#cookieManage');
  const dialog = qs('#cookieDialog');
  const save = qs('#cookieSave');
  const cookieSettingsLink = qs('#cookieSettingsLink');

  if (!banner || !accept || !decline || !manage || !dialog || !save || !cookieSettingsLink) return;

  const KEY = 'leapstudio_cookie_consent_v1';

  function get(){
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch { return null; }
  }

  function set(value){
    localStorage.setItem(KEY, JSON.stringify(value));
  }

  function openBanner(){ banner.dataset.open = 'true'; }
  function closeBanner(){ banner.dataset.open = 'false'; }

  function openDialog(){
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  }

  function closeDialog(){
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  function applyConsent(consent){
    // For this static demo we only store preferences.
    set(consent);
    closeBanner();
  }

  const existing = get();
  if (!existing) openBanner();

  accept.addEventListener('click', () => applyConsent({ essential:true, analytics:true, personalization:true, decidedAt: new Date().toISOString() }));
  decline.addEventListener('click', () => applyConsent({ essential:true, analytics:false, personalization:false, decidedAt: new Date().toISOString() }));

  manage.addEventListener('click', () => {
    openDialog();
  });

  cookieSettingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openDialog();
  });

  dialog.addEventListener('close', () => {
    // no-op
  });

  dialog.addEventListener('click', (e) => {
    // click outside to close
    const rect = dialog.getBoundingClientRect();
    const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog && e.target === dialog) closeDialog();
  });

  save.addEventListener('click', (e) => {
    // The <form method="dialog"> will close the dialog automatically.
    const analytics = !!qs('#cookieAnalytics')?.checked;
    const personalization = !!qs('#cookiePersonalization')?.checked;
    applyConsent({ essential:true, analytics, personalization, decidedAt: new Date().toISOString() });
  });
})();
