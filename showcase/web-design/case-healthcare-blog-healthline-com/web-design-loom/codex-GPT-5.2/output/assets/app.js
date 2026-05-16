(function(){
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector('[data-header]');
  const mega = document.querySelector('[data-mega]');
  const overlay = document.querySelector('[data-overlay]');

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  function closeAllMega(){
    document.querySelectorAll('[data-mega-trigger]').forEach((btn)=>{
      btn.setAttribute('aria-expanded','false');
    });
    document.querySelectorAll('[data-mega-panel]').forEach((panel)=>{
      panel.classList.remove('is-open');
    });
    if (overlay){ overlay.hidden = true; }
    if (mega){ mega.dataset.open = 'false'; }
  }

  function openMega(id){
    closeAllMega();
    const trigger = document.querySelector(`[data-mega-trigger="${id}"]`);
    const panel = document.querySelector(`[data-mega-panel="${id}"]`);
    if (!trigger || !panel) return;
    trigger.setAttribute('aria-expanded','true');
    panel.classList.add('is-open');
    if (overlay){ overlay.hidden = false; }
    if (mega){ mega.dataset.open = 'true'; }
  }

  function toggleMega(id){
    const trigger = document.querySelector(`[data-mega-trigger="${id}"]`);
    const expanded = trigger?.getAttribute('aria-expanded') === 'true';
    if (expanded) closeAllMega();
    else openMega(id);
  }

  document.addEventListener('click', (e)=>{
    const trigger = e.target.closest('[data-mega-trigger]');
    if (trigger){
      const id = trigger.getAttribute('data-mega-trigger');
      toggleMega(id);
      return;
    }

    if (e.target.closest('[data-mega]')) return;

    if (overlay && e.target === overlay){
      closeAllMega();
    }
  });

  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape'){
      closeAllMega();
      if (navList){
        navList.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded','false');
      }
    }
  });

  // Mobile menu toggle (small screens)
  if (navToggle && navList){
    navToggle.addEventListener('click', ()=>{
      const open = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Recommended reads tabs
  const readsByTab = {
    top: [
      {kicker:'Nutrition', title:'16 Superfoods That Are Worthy of the Title', desc:'Evidence-backed picks that are easy to add to your routine.'},
      {kicker:'Medications', title:'Does Ozempic Cause Hair Loss?', desc:'What the research suggests — and what to ask your clinician.'},
      {kicker:'Health News', title:'Prescription Drug Content on Social Media Often Misleading, Study Finds', desc:'How to spot red flags and evaluate claims.'},
      {kicker:'Mental Well-Being', title:'Can Music Therapy Help with Depression?', desc:'A gentle, research-informed look at benefits and limits.'},
      {kicker:'Nutrition', title:'Why Am I Craving So Much Salt?', desc:'Common causes, plus when to check in with a pro.'},
      {kicker:'Apps', title:'These Are the 8 Best Calorie Counter Apps', desc:'Features to look for, from barcode scanning to trends.'},
    ],
    fitness: [
      {kicker:'Fitness', title:'Day 12: Resistance Band Moves You Can Do in 10 Minutes', desc:'Beginner-friendly strength moves you can do at home.'},
      {kicker:'Training', title:'How to Build a Grocery List That Supports Your Workouts', desc:'Simple staples for recovery, energy, and consistency.'},
      {kicker:'Mobility', title:'5 Ways to Improve Flexibility Without Overstretching', desc:'A safe approach that actually sticks.'},
      {kicker:'Habits', title:'A Realistic Weekly Routine for Busy Schedules', desc:'Short sessions, clear goals, and rest days.'},
      {kicker:'Cardio', title:'Walking Workouts: How to Progress Without Burning Out', desc:'Intervals, incline, and pacing tips.'},
      {kicker:'Strength', title:'Beginner Strength Training: What to Do First', desc:'Movement patterns, form cues, and easy progressions.'},
    ],
    mental: [
      {kicker:'Mental Well-Being', title:'Can Music Therapy Help with Depression?', desc:'What it can support, and where it won’t replace care.'},
      {kicker:'Anxiety', title:'A 3-Minute Reset for Spiraling Thoughts', desc:'A simple practice to help you re-center.'},
      {kicker:'Sleep', title:'How to Wind Down When Your Mind Won’t', desc:'Gentle routines, light exposure, and calming cues.'},
      {kicker:'Stress', title:'What a “Good” Coping Skill Looks Like', desc:'How to choose tools that are sustainable for you.'},
      {kicker:'Mindfulness', title:'Mindfulness Without the Pressure', desc:'Low-friction ways to start.'},
      {kicker:'Relationships', title:'Setting Boundaries That Feel Kind', desc:'Scripts and examples you can adapt.'},
    ],
    reviews: [
      {kicker:'Product Reviews', title:'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', desc:'Ergonomics, comfort, and who it’s best for.'},
      {kicker:'Apps', title:'These Are the 8 Best Calorie Counter Apps', desc:'Our feature checklist for tracking tools.'},
      {kicker:'Sleep', title:'Best Sleep Trackers for Everyday Use', desc:'What to prioritize: comfort, battery, and data clarity.'},
      {kicker:'Fitness', title:'Best Resistance Bands for Beginners', desc:'Handles, loop options, and durability.'},
      {kicker:'Kitchen', title:'Best Blenders for Smoothies and Meal Prep', desc:'Power, noise, and easy cleaning.'},
      {kicker:'Skin Care', title:'Best Sunscreens for Sensitive Skin', desc:'Ingredients to look for and avoid.'},
    ],
    recipes: [
      {kicker:'Recipes', title:'High-Protein Breakfasts You Can Prep Fast', desc:'Simple options that travel well.'},
      {kicker:'Recipes', title:'Fiber-Friendly Lunch Ideas', desc:'Meals that support digestion and steady energy.'},
      {kicker:'Recipes', title:'Heart-Healthy Pantry Staples', desc:'Build meals around easy ingredients.'},
      {kicker:'Recipes', title:'Snack Plates for Busy Days', desc:'Balanced combos: protein, fiber, and healthy fats.'},
      {kicker:'Recipes', title:'Weeknight Dinners in 20 Minutes', desc:'Low-fuss meals with flexible swaps.'},
      {kicker:'Recipes', title:'Hydration Boosters That Aren’t Sugary', desc:'Flavor ideas without the crash.'},
    ],
    skin: [
      {kicker:'Skin Care', title:"Beginner's Guide to Sensitive Skin", desc:'A gentle routine with fewer surprises.'},
      {kicker:'Skin Care', title:'How to Patch Test New Products', desc:'A small step that can prevent big irritation.'},
      {kicker:'Skin Care', title:'What “Fragrance-Free” Really Means', desc:'How to read labels more confidently.'},
      {kicker:'Skin Care', title:'Moisturizers: Cream vs. Lotion vs. Ointment', desc:'Choosing based on your skin’s needs.'},
      {kicker:'Skin Care', title:'Sun Protection Basics', desc:'Reapplication, SPF, and ingredient FAQs.'},
      {kicker:'Skin Care', title:'Barrier Repair 101', desc:'Signs your barrier is stressed and how to support it.'},
    ]
  };

  const grid = document.querySelector('[data-reads-grid]');
  const tabButtons = Array.from(document.querySelectorAll('[data-tabs] [role="tab"]'));

  function renderCards(items){
    if (!grid) return;
    grid.innerHTML = items.map((it)=>{
      return `
        <a class="card" href="#">
          <span class="card-kicker">${escapeHtml(it.kicker)}</span>
          <h3>${escapeHtml(it.title)}</h3>
          <p>${escapeHtml(it.desc)}</p>
        </a>
      `;
    }).join('');
  }

  function setActiveTab(id){
    tabButtons.forEach((btn)=>{
      const isActive = btn.dataset.tab === id;
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.tabIndex = isActive ? 0 : -1;
    });
    renderCards(readsByTab[id] || readsByTab.top);
  }

  function escapeHtml(s){
    return String(s)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#039;');
  }

  tabButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      setActiveTab(btn.dataset.tab);
      btn.focus();
    });

    btn.addEventListener('keydown', (e)=>{
      const currentIndex = tabButtons.indexOf(btn);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = (currentIndex + dir + tabButtons.length) % tabButtons.length;
        tabButtons[next].click();
      }
      if (e.key === 'Home'){ e.preventDefault(); tabButtons[0].click(); }
      if (e.key === 'End'){ e.preventDefault(); tabButtons[tabButtons.length-1].click(); }
    });
  });

  setActiveTab('top');

  // Carousel
  const carousel = document.querySelector('[data-carousel]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  function scrollByAmount(amount){
    if (!carousel) return;
    carousel.scrollBy({ left: amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  function prefersReducedMotion(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  prevBtn?.addEventListener('click', ()=>scrollByAmount(-420));
  nextBtn?.addEventListener('click', ()=>scrollByAmount(420));

  carousel?.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight'){ e.preventDefault(); scrollByAmount(220); }
    if (e.key === 'ArrowLeft'){ e.preventDefault(); scrollByAmount(-220); }
  });

  // Newsletter forms
  function setupNewsletter(formSel, noteSel){
    const form = document.querySelector(formSel);
    const note = document.querySelector(noteSel);
    if (!form || !note) return;

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get('email') || '').trim();

      if (!email){
        note.textContent = 'Please enter your email.';
        return;
      }

      // No backend in this static build — simulate successful submit.
      note.textContent = 'Thanks — you’re subscribed.';
      form.reset();
    });
  }

  setupNewsletter('[data-newsletter-form]','[data-form-note]');
  setupNewsletter('[data-footer-form]','[data-footer-note]');

})();
