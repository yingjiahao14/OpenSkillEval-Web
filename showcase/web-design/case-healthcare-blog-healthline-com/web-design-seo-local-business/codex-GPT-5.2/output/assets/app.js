/* WellSource interactions
   - nav-dropdown: mega menu toggles
   - recommended-reads-tabs: stateful tabs -> grid
   - health-topics-carousel: smooth horizontal scroll
   - newsletter-signup: simple client-side submission state
   - trust-stats-ticker: continuous auto-scroll
*/

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function initYear() {
  const el = $('[data-js="year"]');
  if (el) el.textContent = String(new Date().getFullYear());
}

function initMegaMenu() {
  const mega = $('[data-js="mega"]');
  const header = $('[data-js="header"]');
  if (!mega || !header) return;

  const triggers = $$('[data-menu]');
  const panels = $$('[data-panel]', mega);
  const burger = $('[data-js="nav-burger"]');
  const navItems = $('[data-js="nav-items"]');

  const closeAll = () => {
    triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
    panels.forEach((p) => p.classList.remove('is-active'));
    mega.classList.remove('is-open');
    mega.setAttribute('aria-hidden', 'true');
  };

  const openMenu = (id, trigger) => {
    triggers.forEach((t) => t.setAttribute('aria-expanded', t === trigger ? 'true' : 'false'));
    panels.forEach((p) => p.classList.toggle('is-active', p.getAttribute('data-panel') === id));
    mega.classList.add('is-open');
    mega.setAttribute('aria-hidden', 'false');
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-menu');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (!id) return;
      if (isExpanded) closeAll();
      else openMenu(id, btn);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAll();
        btn.blur();
      }
    });
  });

  document.addEventListener('click', (e) => {
    const within = header.contains(e.target);
    if (!within) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  // Mobile burger
  if (burger && navItems) {
    burger.addEventListener('click', () => {
      const isOpen = navItems.classList.toggle('is-open');
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (!isOpen) closeAll();
    });
  }
}

function initTicker() {
  const track = $('[data-js="ticker-track"]');
  const wrapper = $('[data-js="ticker"]');
  if (!track || !wrapper) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Duplicate content for seamless loop
  const base = track.innerHTML;
  track.innerHTML = base + base;

  let x = 0;
  let last = performance.now();
  const pxPerSec = 70;

  function loop(now) {
    const dt = (now - last) / 1000;
    last = now;
    x -= pxPerSec * dt;

    const half = track.scrollWidth / 2;
    if (-x >= half) x += half;

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

function initTopicsCarousel() {
  const rail = $('[data-js="topics-rail"]');
  const prev = $('[data-js="topics-prev"]');
  const next = $('[data-js="topics-next"]');
  if (!rail || !prev || !next) return;

  const step = () => Math.max(240, Math.round(rail.clientWidth * 0.75));

  prev.addEventListener('click', () => {
    rail.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    rail.scrollBy({ left: step(), behavior: 'smooth' });
  });
}

function initNewsletter() {
  const forms = $$('[data-js="newsletter-form"]');
  if (!forms.length) return;

  forms.forEach((form) => {
    const hint = $('[data-js="newsletter-hint"]', form) || $('[data-js="newsletter-hint"]', form.parentElement);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get('email') || '').trim();
      if (!email || !email.includes('@')) {
        if (hint) {
          hint.textContent = 'Please enter a valid email address.';
          hint.classList.remove('is-success');
          hint.classList.add('is-error');
        }
        return;
      }
      // Demo behavior only (no network)
      if (hint) {
        hint.textContent = 'Thanks — you’re subscribed!';
        hint.classList.remove('is-error');
        hint.classList.add('is-success');
      }
      form.reset();
    });
  });
}

function initRecommendedReadsTabs() {
  const tabsRoot = $('[data-js="tabs"]');
  const grid = $('[data-js="reads-grid"]');
  if (!tabsRoot || !grid) return;

  const data = {
    top: [
      { title: '16 Superfoods That Are Worthy of the Title', category: 'Nutrition', minutes: 7 },
      { title: 'Does Ozempic Cause Hair Loss?', category: 'Medications', minutes: 6 },
      { title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds', category: 'Health News', minutes: 5 },
      { title: 'Can Music Therapy Help with Depression?', category: 'Mental Well-Being', minutes: 6 },
      { title: 'Why Am I Craving So Much Salt?', category: 'Nutrition', minutes: 5 },
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', minutes: 8 }
    ],
    fitness: [
      { title: 'Day 12: Resistance Band Moves You Can Do in 10 Minutes', category: 'Fitness', minutes: 6 },
      { title: 'How to Build a Walking Habit That Sticks', category: 'Fitness', minutes: 5 },
      { title: 'Beginner Strength Training: A Simple Weekly Plan', category: 'Fitness', minutes: 7 },
      { title: 'Mobility Moves for Tight Hips and Lower Back', category: 'Fitness', minutes: 6 },
      { title: 'Cardio vs. Strength: What Matters Most for Health?', category: 'Fitness', minutes: 7 },
      { title: 'The Best Time of Day to Work Out (and Why)', category: 'Fitness', minutes: 4 }
    ],
    mental: [
      { title: 'Can Music Therapy Help with Depression?', category: 'Mental Well-Being', minutes: 6 },
      { title: 'Anxiety Basics: What to Know Before You Spiral', category: 'Mental Well-Being', minutes: 7 },
      { title: 'Sleep and Stress: A Two-Way Street', category: 'Mental Well-Being', minutes: 6 },
      { title: 'How to Find a Therapist (and What to Ask)', category: 'Mental Well-Being', minutes: 8 },
      { title: 'Mindfulness for Busy People: 3-Minute Reset', category: 'Mental Well-Being', minutes: 4 },
      { title: 'Burnout vs. Depression: How They Differ', category: 'Mental Well-Being', minutes: 7 }
    ],
    products: [
      { title: 'These Are the 8 Best Calorie Counter Apps', category: 'Product Reviews', minutes: 8 },
      { title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', category: 'Product Reviews', minutes: 6 },
      { title: 'Best Resistance Bands for Beginners', category: 'Product Reviews', minutes: 7 },
      { title: 'Best Pill Organizers (Tested for Real Life)', category: 'Product Reviews', minutes: 6 },
      { title: 'Best Sunscreens for Sensitive Skin', category: 'Product Reviews', minutes: 8 },
      { title: 'Best Sleep Trackers for Better Recovery', category: 'Product Reviews', minutes: 7 }
    ],
    recipes: [
      { title: 'High-Protein Breakfasts That Don’t Feel Heavy', category: 'Recipes', minutes: 7 },
      { title: 'Anti-Inflammatory Lunch Ideas You Can Meal-Prep', category: 'Recipes', minutes: 8 },
      { title: 'Sheet-Pan Dinners for Busy Weeknights', category: 'Recipes', minutes: 6 },
      { title: 'Fiber-Friendly Snacks for Gut Health', category: 'Recipes', minutes: 5 },
      { title: 'Heart-Healthy Grocery List Staples', category: 'Recipes', minutes: 6 },
      { title: 'Hydration Helpers: Foods That Count', category: 'Recipes', minutes: 4 }
    ],
    skin: [
      { title: "Beginner's Guide to Sensitive Skin", category: 'Skin Care', minutes: 7 },
      { title: 'Moisturizer 101: Barrier Support Explained', category: 'Skin Care', minutes: 6 },
      { title: 'Eczema Triggers: What to Watch For', category: 'Skin Care', minutes: 7 },
      { title: 'Retinoids vs. Vitamin C: How to Choose', category: 'Skin Care', minutes: 6 },
      { title: 'Sunscreen Reapplication: Real-World Guide', category: 'Skin Care', minutes: 5 },
      { title: 'Fragrance-Free Favorites for Sensitive Types', category: 'Skin Care', minutes: 6 }
    ]
  };

  const render = (key) => {
    const list = data[key] || data.top;
    grid.innerHTML = list
      .map((a, idx) => {
        const label = a.category || 'Wellness';
        const mins = clamp(Number(a.minutes || 6), 3, 12);
        const score = 92 - (idx % 5) * 3;
        return `
          <article class="article">
            <div class="article__top">
              <span class="chip">${label}</span>
              <span class="chip" title="Estimated reading time">${mins} min</span>
            </div>
            <div class="article__title">${a.title}</div>
            <div class="article__meta">
              <span>Medically reviewed</span>
              <span aria-hidden="true">•</span>
              <span>Trust score ${score}%</span>
            </div>
            <div class="article__footer">
              <span class="muted">Evidence-forward, human tone</span>
              <a class="readmore" href="#">Read →</a>
            </div>
          </article>
        `;
      })
      .join('');
  };

  const tabs = $$('[data-tab]', tabsRoot);
  const setActive = (key) => {
    tabs.forEach((t) => {
      const isActive = t.getAttribute('data-tab') === key;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    render(key);
  };

  tabs.forEach((t) => {
    t.addEventListener('click', () => {
      const key = t.getAttribute('data-tab') || 'top';
      setActive(key);
    });
  });

  render('top');
}

initYear();
initMegaMenu();
initTicker();
initTopicsCarousel();
initNewsletter();
initRecommendedReadsTabs();

