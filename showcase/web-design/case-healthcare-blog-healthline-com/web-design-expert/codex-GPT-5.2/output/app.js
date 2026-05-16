/* WellSource homepage interactions (no build required). */

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function showToast(message) {
  const toast = qs('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

// ---------------------------
// Trust stats ticker marquee
// ---------------------------
function initTicker() {
  const marquee = qs('[data-ticker-marquee]');
  if (!marquee) return;
  if (prefersReducedMotion()) return;

  // Duplicate content for seamless wrap.
  const items = qsa('[data-ticker-item]', marquee);
  if (items.length < 2) return;

  // Clone once.
  items.forEach((n) => marquee.appendChild(n.cloneNode(true)));

  let x = 0;
  const speed = 0.55; // px/frame

  function step() {
    const halfWidth = marquee.scrollWidth / 2;
    x -= speed;
    if (-x >= halfWidth) x = 0;
    marquee.style.transform = `translate3d(${x}px, 0, 0)`;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ---------------------------
// Mega-menu navigation
// ---------------------------
function initMegaMenu() {
  const mega = qs('#mega');
  if (!mega) return;

  const backdrop = qs('[data-mega-backdrop]', mega);
  const panelTitle = qs('[data-mega-title]', mega);
  const panelDesc = qs('[data-mega-desc]', mega);
  const colA = qs('[data-mega-col-a]', mega);
  const colB = qs('[data-mega-col-b]', mega);

  const navButtons = qsa('[data-nav-item]');

  const menuData = {
    conditions: {
      title: 'Health Conditions',
      desc: 'Explore medically reviewed condition hubs and practical guides.',
      cols: [
        {
          label: 'Common Conditions',
          items: [
            'Heart Health',
            'Type 2 Diabetes',
            'Digestive Health',
            'Mental Health',
            'Menopause',
            'Weight Management',
            'Migraine',
            'Sleep Health',
          ],
        },
        {
          label: 'Specialty Topics',
          items: [
            'Breast Cancer',
            'COPD',
            'Chronic Kidney Disease',
            'Multiple Sclerosis',
            "Parkinson's Disease",
            'Psoriasis',
            'Rheumatoid Arthritis',
            'Eye Health',
          ],
        },
      ],
    },
    wellness: {
      title: 'Wellness',
      desc: 'Everyday wellness guidance that feels actionable and human.',
      cols: [
        {
          label: 'Well-Being',
          items: [
            'Fitness',
            'Nutrition',
            'Mental Well-Being',
            'Healthy Aging',
            'Skin Care',
            "Women's Wellness",
            'Sexual Health',
            'Sleep Health',
          ],
        },
        {
          label: 'More to Explore',
          items: [
            'CBD',
            'Parenthood',
            'Hearing',
            'Vitamins & Supplements',
            'Recipes',
            'Product Reviews',
            'Featured Programs',
          ],
        },
      ],
    },
    tools: {
      title: 'Tools',
      desc: 'Smart, helpful tools for everyday health decisions.',
      cols: [
        {
          label: 'Search & Care',
          items: ['Pill Identifier', 'FindCare', 'Drugs A–Z', 'Medicare Plans by State'],
        },
        {
          label: 'Learning & Community',
          items: ['Lessons', 'Newsletters', 'Lifestyle Quizzes'],
        },
      ],
    },
    featured: {
      title: 'Featured',
      desc: 'Curated editorial series and our most-loved formats.',
      cols: [
        { label: 'Highlights', items: ['Top Reads', 'Video Series', 'Health News'] },
        { label: 'Programs', items: ['Featured Programs', 'Product Reviews', 'Recipes'] },
      ],
    },
    connect: {
      title: 'Connect',
      desc: 'Join supportive communities and follow us for updates.',
      cols: [
        { label: 'Communities', items: ['Bezzy MS', 'Bezzy Psoriasis', 'Bezzy Migraine', 'Bezzy IBD'] },
        { label: 'Social', items: ['Facebook', 'X', 'Pinterest', 'Instagram', 'YouTube'] },
      ],
    },
  };

  function renderLinks(colEl, col) {
    if (!colEl) return;
    colEl.innerHTML = '';

    const h = document.createElement('h4');
    h.textContent = col.label;
    colEl.appendChild(h);

    col.items.forEach((label) => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'link';
      a.innerHTML = `<span>${label}</span><span class="pill">Explore</span>`;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        closeMega();
        showToast(`Opening: ${label}`);
      });
      colEl.appendChild(a);
    });
  }

  function openMega(key, triggerBtn) {
    const data = menuData[key];
    if (!data) return;

    navButtons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    triggerBtn.setAttribute('aria-expanded', 'true');

    panelTitle.textContent = data.title;
    panelDesc.textContent = data.desc;
    renderLinks(colA, data.cols[0]);
    renderLinks(colB, data.cols[1]);

    mega.setAttribute('aria-hidden', 'false');
    document.body.dataset.overlayOpen = 'true';
  }

  function closeMega() {
    mega.setAttribute('aria-hidden', 'true');
    navButtons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    delete document.body.dataset.overlayOpen;
  }

  function toggle(btn) {
    const key = btn.getAttribute('data-nav-item');
    const isOpen = mega.getAttribute('aria-hidden') === 'false';
    const isThisExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen && isThisExpanded) {
      closeMega();
      return;
    }
    openMega(key, btn);
  }

  navButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggle(btn);
    });
  });

  backdrop?.addEventListener('click', closeMega);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMega();
  });
}

// ---------------------------
// Mobile drawer
// ---------------------------
function initMobileDrawer() {
  const openBtn = qs('#openDrawer');
  const closeBtn = qs('#closeDrawer');
  const drawer = qs('#drawer');
  const backdrop = qs('#drawerBackdrop');
  if (!openBtn || !closeBtn || !drawer || !backdrop) return;

  function open() {
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.dataset.overlayOpen = 'true';
    closeBtn.focus();
  }
  function close() {
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    delete document.body.dataset.overlayOpen;
    openBtn.focus();
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer.getAttribute('aria-hidden') === 'false') close();
    }
  });
}

// ---------------------------
// Recommended Reads tabs
// ---------------------------
function initRecommendedTabs() {
  const root = qs('[data-tabs]');
  if (!root) return;
  const buttons = qsa('[role="tab"]', root);
  const grid = qs('#recommendedGrid');
  if (!grid) return;

  const articlesByCategory = {
    'Top Reads': [
      {
        title: '16 Superfoods That Are Worthy of the Title',
        desc: 'A practical, evidence-informed guide to foods that offer real benefits.',
        meta: 'Nutrition · 8 min read',
      },
      {
        title: 'Does Ozempic Cause Hair Loss?',
        desc: 'What research shows, what’s still unclear, and what to ask your clinician.',
        meta: 'Medication · 6 min read',
      },
      {
        title: 'Can Music Therapy Help with Depression?',
        desc: 'How structured music interventions may support mood and daily function.',
        meta: 'Mental Health · 7 min read',
      },
      {
        title: 'These Are the 8 Best Calorie Counter Apps',
        desc: 'Features that matter: barcode scans, macro targets, and sustainable tracking.',
        meta: 'Tools · 9 min read',
      },
      {
        title: 'Why Am I Craving So Much Salt?',
        desc: 'Common reasons cravings spike — from training to sleep and stress.',
        meta: 'Wellness · 5 min read',
      },
      {
        title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds',
        desc: 'What to look for when evaluating health claims online.',
        meta: 'Health News · 4 min read',
      },
    ],
    Fitness: [
      {
        title: 'Day 12: Resistance Band Moves You Can Do in 10 Minutes',
        desc: 'Beginner-friendly moves that build strength without a gym.',
        meta: 'Fitness · 10 min read',
      },
      {
        title: 'Warm-Up Routines That Actually Reduce Injury Risk',
        desc: 'What to do before strength, runs, and HIIT sessions.',
        meta: 'Fitness · 6 min read',
      },
      {
        title: 'Recovery 101: Sleep, Protein, and Smart Rest Days',
        desc: 'A simple checklist to keep progress steady and sustainable.',
        meta: 'Fitness · 7 min read',
      },
      {
        title: 'Low-Impact Cardio Ideas for Sensitive Joints',
        desc: 'Options that boost endurance while keeping things gentle.',
        meta: 'Fitness · 5 min read',
      },
      {
        title: 'Strength Training Myths That Slow You Down',
        desc: 'The most common misconceptions — and what to do instead.',
        meta: 'Fitness · 8 min read',
      },
      {
        title: 'Mobility vs Flexibility: What’s the Difference?',
        desc: 'How to train both for better movement and fewer aches.',
        meta: 'Fitness · 6 min read',
      },
    ],
    'Mental Well-Being': [
      {
        title: 'Can Music Therapy Help with Depression?',
        desc: 'A look at structured music-based approaches and who they may help.',
        meta: 'Mental Health · 7 min read',
      },
      {
        title: 'Anxiety Spirals: A Grounding Toolkit That Works',
        desc: 'Breathing, sensory anchors, and small actions for the next 10 minutes.',
        meta: 'Mental Health · 6 min read',
      },
      {
        title: 'How to Talk to Your Doctor About Mental Health',
        desc: 'A guide to preparing, documenting symptoms, and asking for support.',
        meta: 'Care · 5 min read',
      },
      {
        title: 'Stress and Sleep: The Two-Way Street',
        desc: 'Why stress worsens sleep — and sleep loss increases stress.',
        meta: 'Wellness · 6 min read',
      },
      {
        title: 'Small Habits That Improve Mood Over Time',
        desc: 'Tiny actions that compound without feeling overwhelming.',
        meta: 'Wellness · 4 min read',
      },
      {
        title: 'Screen Time and Mental Health: Setting Better Boundaries',
        desc: 'Simple strategies to reduce doomscrolling and reclaim attention.',
        meta: 'Lifestyle · 5 min read',
      },
    ],
    'Product Reviews': [
      {
        title: 'These Are the 8 Best Calorie Counter Apps',
        desc: 'We compare usability, features, and pricing to find standouts.',
        meta: 'Reviews · 9 min read',
      },
      {
        title: 'Air Purifiers: What Helps with Allergies?',
        desc: 'Key specs that matter: CADR, filters, and room size.',
        meta: 'Reviews · 7 min read',
      },
      {
        title: 'Wearables: Which Metrics Are Actually Useful?',
        desc: 'A practical take on steps, HRV, sleep scores, and trends.',
        meta: 'Reviews · 6 min read',
      },
      {
        title: 'Walking Pads vs Treadmills: A Buyer’s Guide',
        desc: 'Space, noise, cadence, and what works for desk setups.',
        meta: 'Reviews · 8 min read',
      },
      {
        title: 'The Best Water Bottles for Staying Hydrated',
        desc: 'Insulation, cleaning, and designs you’ll actually use.',
        meta: 'Reviews · 5 min read',
      },
      {
        title: 'Standing Desks: What to Look For',
        desc: 'Stability, range, and ergonomics — without gimmicks.',
        meta: 'Reviews · 6 min read',
      },
    ],
    Recipes: [
      {
        title: 'High-Protein Breakfasts You Can Prep Fast',
        desc: 'Balanced options that keep energy steady through the morning.',
        meta: 'Recipes · 6 min read',
      },
      {
        title: 'Mediterranean-Inspired Grocery Staples',
        desc: 'A go-to list for quick meals that feel satisfying.',
        meta: 'Nutrition · 5 min read',
      },
      {
        title: 'Fiber-Friendly Meals for Digestive Comfort',
        desc: 'Gentle ways to increase fiber while listening to your body.',
        meta: 'Recipes · 7 min read',
      },
      {
        title: 'Sheet-Pan Dinners for Busy Weeks',
        desc: 'Minimal prep, easy cleanup, and lots of flavor.',
        meta: 'Recipes · 6 min read',
      },
      {
        title: 'A Heart-Healthy Snack Board',
        desc: 'Smart swaps that support cholesterol goals without feeling restrictive.',
        meta: 'Heart Health · 5 min read',
      },
      {
        title: 'Hydration Helpers: Foods with High Water Content',
        desc: 'Simple add-ins that support fluids — especially in warm months.',
        meta: 'Wellness · 4 min read',
      },
    ],
    'Skin Care': [
      {
        title: "Beginner's Guide to Sensitive Skin",
        desc: 'How to build a routine that’s calm, consistent, and irritation-aware.',
        meta: 'Skin Care · 7 min read',
      },
      {
        title: 'Eczema Solutions: Knowledge for Self-Care',
        desc: 'Daily care steps that support your skin barrier.',
        meta: 'Skin Care · 6 min read',
      },
      {
        title: 'Sunscreen 101: How to Choose and Apply',
        desc: 'SPF, broad spectrum, reapplication — and common misconceptions.',
        meta: 'Skin Care · 5 min read',
      },
      {
        title: 'Moisturizers: Ingredients That Matter',
        desc: 'Ceramides, glycerin, petrolatum — and how they work.',
        meta: 'Skin Care · 6 min read',
      },
      {
        title: 'Acne and Stress: What’s the Link?',
        desc: 'Why flare-ups happen, and how to simplify your approach.',
        meta: 'Skin Care · 5 min read',
      },
      {
        title: 'Fragrance-Free vs Unscented: What to Know',
        desc: 'Label details that help if you’re irritation-prone.',
        meta: 'Skin Care · 4 min read',
      },
    ],
  };

  function render(category) {
    const articles = articlesByCategory[category] || articlesByCategory['Top Reads'];
    grid.innerHTML = '';
    articles.forEach((a) => {
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'card article';
      card.innerHTML = `
        <div class="top">
          <div class="label"><span class="mini-dot"></span>${category}</div>
          <span aria-hidden="true" style="opacity:.6">→</span>
        </div>
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <div class="meta">${a.meta}</div>
      `;
      card.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(`Opening: ${a.title}`);
      });
      grid.appendChild(card);
    });
  }

  function selectTab(btn) {
    buttons.forEach((b) => {
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      b.tabIndex = b === btn ? 0 : -1;
    });
    render(btn.dataset.category);
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => selectTab(btn));
    btn.addEventListener('keydown', (e) => {
      const i = buttons.indexOf(btn);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = buttons[(i + dir + buttons.length) % buttons.length];
        next.focus();
        selectTab(next);
      }
    });
  });

  // Default selection
  const defaultBtn = buttons.find((b) => b.dataset.category === 'Top Reads') || buttons[0];
  if (defaultBtn) selectTab(defaultBtn);
}

// ---------------------------
// Topics carousel controls
// ---------------------------
function initCarousel() {
  const scroller = qs('#topicsCarousel');
  const left = qs('#topicsLeft');
  const right = qs('#topicsRight');
  if (!scroller || !left || !right) return;

  function update() {
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const x = scroller.scrollLeft;
    left.disabled = x <= 2;
    right.disabled = x >= maxScroll - 2;
  }

  function scrollByCards(dir) {
    const card = qs('.topic', scroller);
    const amount = card ? card.getBoundingClientRect().width + 16 : 220;
    scroller.scrollBy({ left: dir * amount * 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  left.addEventListener('click', () => scrollByCards(-1));
  right.addEventListener('click', () => scrollByCards(1));
  scroller.addEventListener('scroll', () => window.requestAnimationFrame(update));
  window.addEventListener('resize', update);

  update();
}

// ---------------------------
// Newsletter submit
// ---------------------------
function initNewsletter() {
  qsa('form[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = qs('input[type="email"]', form)?.value?.trim() || '';
      if (!email) {
        showToast('Please enter an email address.');
        return;
      }
      showToast(`Thanks — you’re signed up: ${email}`);
      form.reset();
    });
  });
}

// Prevent scroll when overlays open
function initOverlayScrollLock() {
  const style = document.createElement('style');
  style.textContent = `body[data-overlay-open="true"]{overflow:hidden}`;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  initOverlayScrollLock();
  initTicker();
  initMegaMenu();
  initMobileDrawer();
  initRecommendedTabs();
  initCarousel();
  initNewsletter();
});

