(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){return`
<header class="sticky top-0 z-50 bg-white border-b border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <span class="text-xl font-bold text-charcoal tracking-tight">WellSource</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main navigation">
        <div class="relative">
          <button data-dropdown="menu-health" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Health Conditions
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${t()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-wellness" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Wellness
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${n()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-tools" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Tools
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${r()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-featured" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Featured
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${i()}
        </div>
        <div class="relative">
          <button data-dropdown="menu-connect" aria-expanded="false" aria-haspopup="true"
            class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-primary rounded-md hover:bg-warm-gray transition-colors">
            Connect
            <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ${a()}
        </div>
      </nav>

      <!-- Secondary Actions -->
      <div class="flex items-center gap-3">
        <a href="#newsletter" class="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary-dark transition-colors">Subscribe</a>
        <a href="#" class="hidden sm:inline-flex text-sm font-medium text-charcoal hover:text-primary transition-colors">Sign In</a>
        <!-- Mobile menu button -->
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-md text-charcoal hover:bg-warm-gray" aria-label="Open menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden lg:hidden border-t border-border-light bg-white">
    <div class="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
      ${s()}
    </div>
  </div>
</header>
`}function t(){return o(`menu-health`,`Health Conditions`,[`Breast Cancer`,`Chronic Kidney Disease`,`COPD`,`Digestive Health`,`Eye Health`,`Heart Health`,`Menopause`,`Mental Health`,`Migraine`,`Multiple Sclerosis`,`Parkinson's Disease`,`Psoriasis`,`Rheumatoid Arthritis`,`Sleep Health`,`Type 2 Diabetes`,`Weight Management`])}function n(){return o(`menu-wellness`,`Wellness`,[`CBD`,`Fitness`,`Healthy Aging`,`Hearing`,`Mental Well-Being`,`Nutrition`,`Parenthood`,`Recipes`,`Sexual Health`,`Skin Care`,`Sleep Health`,`Vitamins and Supplements`,`Women's Wellness`],[`Product Reviews`,`Featured Programs`])}function r(){return o(`menu-tools`,`Tools`,[`Pill Identifier`,`FindCare`,`Drugs A-Z`,`Medicare Plans by State`,`Lessons`,`Newsletters`,`Lifestyle Quizzes`])}function i(){return o(`menu-featured`,`Featured`,[`Health News`,`Top Reads`,`Video Series`])}function a(){return o(`menu-connect`,`Connect`,[`Bezzy Communities`,`Facebook`,`X`,`Pinterest`,`Instagram`,`YouTube`])}function o(e,t,n,r){let i=r?.length?`<div class="mt-4 pt-4 border-t border-border-light">
         <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Also in ${t}</p>
         <div class="flex flex-wrap gap-2">
           ${r.map(e=>`<a href="#" class="text-sm text-primary hover:underline">${e}</a>`).join(``)}
         </div>
       </div>`:``;return`
<div id="${e}" class="mega-menu hidden opacity-0 pointer-events-none absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-border-light overflow-hidden transition-opacity duration-200 z-50">
  <div class="p-4">
    <p class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">${t}</p>
    <ul class="grid grid-cols-1 gap-1">
      ${n.map(e=>`
        <li><a href="#" class="block px-3 py-2 text-sm text-charcoal hover:text-primary hover:bg-primary-light rounded-md transition-colors">${e}</a></li>
      `).join(``)}
    </ul>
    ${i}
  </div>
</div>
`}function s(){return[{title:`Health Conditions`,items:[`Breast Cancer`,`Chronic Kidney Disease`,`COPD`,`Digestive Health`,`Eye Health`,`Heart Health`,`Menopause`,`Mental Health`,`Migraine`,`Multiple Sclerosis`,`Parkinson's Disease`,`Psoriasis`,`Rheumatoid Arthritis`,`Sleep Health`,`Type 2 Diabetes`,`Weight Management`]},{title:`Wellness`,items:[`CBD`,`Fitness`,`Healthy Aging`,`Hearing`,`Mental Well-Being`,`Nutrition`,`Parenthood`,`Recipes`,`Sexual Health`,`Skin Care`,`Sleep Health`,`Vitamins and Supplements`,`Women's Wellness`]},{title:`Tools`,items:[`Pill Identifier`,`FindCare`,`Drugs A-Z`,`Medicare Plans by State`,`Lessons`,`Newsletters`,`Lifestyle Quizzes`]},{title:`Featured`,items:[`Health News`,`Top Reads`,`Video Series`]},{title:`Connect`,items:[`Bezzy Communities`,`Facebook`,`X`,`Pinterest`,`Instagram`,`YouTube`]}].map(e=>`
    <details class="group">
      <summary class="flex items-center justify-between px-3 py-2 text-sm font-medium text-charcoal cursor-pointer hover:bg-warm-gray rounded-md list-none">
        ${e.title}
        <svg class="w-4 h-4 text-text-muted group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </summary>
      <ul class="pl-4 mt-1 space-y-1">
        ${e.items.map(e=>`<li><a href="#" class="block px-3 py-1.5 text-sm text-text-body hover:text-primary rounded-md">${e}</a></li>`).join(``)}
      </ul>
    </details>
  `).join(``)}function c(){let e=[{icon:`shield`,text:`Medically reviewed content`},{icon:`users`,text:`145 medical reviewers in network`},{icon:`calendar`,text:`21 years of experience`},{icon:`globe`,text:`55 million monthly readers`}].map(e=>`
    <div class="flex items-center gap-2 shrink-0 px-6">
      <div class="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
        ${l(e.icon)}
      </div>
      <span class="text-sm font-medium text-charcoal whitespace-nowrap">${e.text}</span>
    </div>
  `).join(``);return`
<section class="bg-primary-light border-b border-border-light overflow-hidden" aria-label="Credibility stats">
  <div class="relative py-2.5">
    <div class="animate-ticker flex items-center w-max">
      ${e}
      ${e}
      ${e}
      ${e}
    </div>
  </div>
</section>
`}function l(e){return{shield:`<svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,users:`<svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,calendar:`<svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>`,globe:`<svg class="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>`}[e]||``}function u(){return`
<section class="bg-warm-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Text -->
      <div class="order-2 lg:order-1">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          Fitness
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight tracking-tight mb-4">
          Day 12: Resistance Band Moves You Can Do in 10 Minutes
        </h1>
        <p class="text-lg text-text-body leading-relaxed mb-6 max-w-xl">
          Simple, beginner-friendly resistance band exercises to build strength and improve flexibility at home.
        </p>
        <div class="flex items-center gap-4">
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
            Read Article
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </a>
          <span class="inline-flex items-center gap-1.5 text-sm text-text-muted">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            5 min read
          </span>
        </div>
        <!-- Challenge badge -->
        <div class="mt-8 inline-flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-border-light shadow-sm">
          <div class="w-10 h-10 rounded-lg bg-coral-light flex items-center justify-center">
            <svg class="w-5 h-5 text-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
          </div>
          <div>
            <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">30-Day Challenge</p>
            <p class="text-sm font-medium text-charcoal">Day 12 of 30</p>
          </div>
        </div>
      </div>

      <!-- Visual -->
      <div class="order-1 lg:order-2">
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-light to-warm-gray border border-border-light">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"/>
                </svg>
              </div>
              <p class="text-lg font-semibold text-charcoal">30-Day Fitness Challenge</p>
              <p class="text-sm text-text-muted mt-1">Resistance Band Workout</p>
            </div>
          </div>
          <!-- Decorative elements -->
          <div class="absolute top-4 right-4 w-16 h-16 rounded-full bg-coral/10 blur-xl"></div>
          <div class="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
        </div>
      </div>
    </div>
  </div>
</section>
`}function d(){return`
<section class="bg-white border-b border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center gap-3 mb-5">
      <svg class="w-5 h-5 text-coral" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/></svg>
      <h2 class="text-lg font-bold text-charcoal">Trending Now</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${[{category:`Heart Health`,title:`How to Make a Heart-Healthy Grocery List`,color:`bg-rose-50 text-rose-700`},{category:`Wellness`,title:`The Worst U.S. Cities for Spring Allergies in 2026, Ranked`,color:`bg-emerald-50 text-emerald-700`},{category:`Lifestyle`,title:`Can You Run a Marathon … with POTS?`,color:`bg-amber-50 text-amber-700`},{category:`Products`,title:`Is Floor Sitting the New Standing? This Unique Desk Surprised Us`,color:`bg-sky-50 text-sky-700`}].map(e=>`
        <a href="#" class="group block p-4 rounded-xl border border-border-light hover:border-primary/30 hover:shadow-md transition-all bg-warm-white">
          <span class="inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${e.color} mb-2">${e.category}</span>
          <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors">${e.title}</h3>
        </a>
      `).join(``)}
    </div>
  </div>
</section>
`}function f(){return`
<section id="newsletter" class="bg-primary">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    <div class="max-w-2xl mx-auto text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/15 flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">The best of health and wellness</h2>
      <p class="text-primary-light text-base mb-8">We do the research so you don't have to. Stay in the know with the latest in health and wellness.</p>
      <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="event.preventDefault(); alert('Thanks for subscribing!');">
        <input 
          type="email" 
          required
          placeholder="Enter your email"
          class="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent text-sm"
        />
        <button type="submit" class="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-warm-white transition-colors shadow-sm text-sm whitespace-nowrap">
          Join Now
        </button>
      </form>
      <p class="mt-3 text-xs text-white/60">Your privacy is important to us.</p>
    </div>
  </div>
</section>
`}function p(){return`
<section class="bg-white py-10 lg:py-14">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-charcoal">Health Topics</h2>
      <a href="#" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
        View all
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </a>
    </div>
    <div data-carousel class="relative">
      <div data-carousel-track class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style="scrollbar-width:none;-ms-overflow-style:none;">
        ${[{name:`Anxiety & Depression`,color:`from-violet-100 to-violet-50`,iconColor:`text-violet-600`},{name:`Digestive Health`,color:`from-emerald-100 to-emerald-50`,iconColor:`text-emerald-600`},{name:`Heart Health`,color:`from-rose-100 to-rose-50`,iconColor:`text-rose-600`},{name:`Menopause`,color:`from-amber-100 to-amber-50`,iconColor:`text-amber-600`},{name:`Type 2 Diabetes`,color:`from-sky-100 to-sky-50`,iconColor:`text-sky-600`},{name:`Weight Management`,color:`from-teal-100 to-teal-50`,iconColor:`text-teal-600`}].map(e=>`
          <a href="#" class="snap-start shrink-0 flex flex-col items-center gap-3 group">
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${e.color} border-2 border-border-light group-hover:border-primary/30 flex items-center justify-center transition-all group-hover:shadow-md">
              <svg class="w-10 h-10 ${e.iconColor}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-sm font-medium text-charcoal group-hover:text-primary transition-colors text-center max-w-[120px]">${e.name}</span>
          </a>
        `).join(``)}
      </div>
      <!-- Navigation arrows -->
      <button data-carousel-prev class="absolute left-0 top-10 -translate-x-2 w-9 h-9 rounded-full bg-white shadow-md border border-border-light flex items-center justify-center text-charcoal hover:text-primary hover:shadow-lg transition-all z-10 hidden sm:flex">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
      </button>
      <button data-carousel-next class="absolute right-0 top-10 translate-x-2 w-9 h-9 rounded-full bg-white shadow-md border border-border-light flex items-center justify-center text-charcoal hover:text-primary hover:shadow-lg transition-all z-10 hidden sm:flex">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </button>
    </div>
  </div>
</section>
`}function m(){return`
<section class="bg-warm-white py-10 lg:py-14 border-y border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-xl sm:text-2xl font-bold text-charcoal mb-6">Health Tools</h2>
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Nutrition Hub -->
      <div class="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
        <div class="flex items-start gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-2.687c-1.718-.293-2.3-2.379-1.067-3.61L4.2 15.3"/></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-charcoal mb-1">Nutrition Hub</h3>
            <p class="text-sm text-text-body leading-relaxed">Take charge of your nutrition with guidance on meal planning, diets, supplements, and more from our dietitians and nutritionists.</p>
          </div>
        </div>
        <div class="space-y-3 mb-5">
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Recipe Hub</p>
              <p class="text-xs text-text-muted">Try 400+ recipes for different dietary preferences</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Macronutrient Calculator</p>
              <p class="text-xs text-text-muted">Calculate your daily carb, protein, and fat goals</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Calorie Calculator</p>
              <p class="text-xs text-text-muted">Learn how many calories you need for your weight goals</p>
            </div>
          </div>
        </div>
        <a href="#" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
          Visit Nutrition Hub
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
        </a>
      </div>

      <!-- Drug & Care Tools -->
      <div class="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
        <div class="flex items-start gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-charcoal mb-1">Drug & Care Tools</h3>
            <p class="text-sm text-text-body leading-relaxed">Find medications, identify pills, compare care options, and locate doctors near you.</p>
          </div>
        </div>
        <div class="space-y-3 mb-5">
          <div class="p-4 rounded-xl bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-semibold text-charcoal">Drug Directory: A to Z</p>
              <span class="text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded-md">Search drugs</span>
            </div>
            <p class="text-xs text-text-muted">Learn everything you need to know about specific prescriptions and over-the-counter medications.</p>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">Pill Identifier</p>
              <p class="text-xs text-text-muted">Identify an unknown tablet or capsule</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">GLP-1 Resource</p>
              <p class="text-xs text-text-muted">Compare places to buy weight-loss medications online</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-warm-gray hover:bg-primary-light/50 transition-colors cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-charcoal">FindCare</p>
              <p class="text-xs text-text-muted">Find local doctors who accept your insurance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`}function h(){let e=[`Top Reads`,`Fitness`,`Mental Well-Being`,`Product Reviews`,`Recipes`,`Skin Care`],t={"Top Reads":[{title:`16 Superfoods That Are Worthy of the Title`,category:`Nutrition`,readTime:`6 min`,imageColor:`bg-emerald-50`},{title:`Does Ozempic Cause Hair Loss?`,category:`Medications`,readTime:`5 min`,imageColor:`bg-violet-50`},{title:`Prescription Drug Content on Social Media Often Misleading, Study Finds`,category:`Health News`,readTime:`4 min`,imageColor:`bg-rose-50`},{title:`Can Music Therapy Help with Depression?`,category:`Mental Health`,readTime:`7 min`,imageColor:`bg-amber-50`},{title:`Why Am I Craving So Much Salt?`,category:`Nutrition`,readTime:`4 min`,imageColor:`bg-sky-50`},{title:`These Are the 8 Best Calorie Counter Apps`,category:`Product Reviews`,readTime:`8 min`,imageColor:`bg-teal-50`}],Fitness:[{title:`These Are the 8 Best Calorie Counter Apps`,category:`Product Reviews`,readTime:`8 min`,imageColor:`bg-teal-50`},{title:`Day 12: Resistance Band Moves You Can Do in 10 Minutes`,category:`Fitness`,readTime:`5 min`,imageColor:`bg-primary-light`},{title:`7 Types of Exercises to Relieve Constipation`,category:`Fitness`,readTime:`4 min`,imageColor:`bg-emerald-50`},{title:`Can You Run a Marathon … with POTS?`,category:`Lifestyle`,readTime:`6 min`,imageColor:`bg-amber-50`},{title:`How to Make a Heart-Healthy Grocery List`,category:`Heart Health`,readTime:`5 min`,imageColor:`bg-rose-50`},{title:`The Worst U.S. Cities for Spring Allergies in 2026, Ranked`,category:`Wellness`,readTime:`4 min`,imageColor:`bg-sky-50`}],"Mental Well-Being":[{title:`Can Music Therapy Help with Depression?`,category:`Mental Health`,readTime:`7 min`,imageColor:`bg-amber-50`},{title:`Why Am I Craving So Much Salt?`,category:`Nutrition`,readTime:`4 min`,imageColor:`bg-sky-50`},{title:`16 Superfoods That Are Worthy of the Title`,category:`Nutrition`,readTime:`6 min`,imageColor:`bg-emerald-50`},{title:`Does Ozempic Cause Hair Loss?`,category:`Medications`,readTime:`5 min`,imageColor:`bg-violet-50`},{title:`These Are the 8 Best Calorie Counter Apps`,category:`Product Reviews`,readTime:`8 min`,imageColor:`bg-teal-50`},{title:`Prescription Drug Content on Social Media Often Misleading, Study Finds`,category:`Health News`,readTime:`4 min`,imageColor:`bg-rose-50`}],"Product Reviews":[{title:`These Are the 8 Best Calorie Counter Apps`,category:`Product Reviews`,readTime:`8 min`,imageColor:`bg-teal-50`},{title:`Is Floor Sitting the New Standing? This Unique Desk Surprised Us`,category:`Products`,readTime:`6 min`,imageColor:`bg-violet-50`},{title:`16 Superfoods That Are Worthy of the Title`,category:`Nutrition`,readTime:`6 min`,imageColor:`bg-emerald-50`},{title:`Does Ozempic Cause Hair Loss?`,category:`Medications`,readTime:`5 min`,imageColor:`bg-rose-50`},{title:`Why Am I Craving So Much Salt?`,category:`Nutrition`,readTime:`4 min`,imageColor:`bg-sky-50`},{title:`Can Music Therapy Help with Depression?`,category:`Mental Health`,readTime:`7 min`,imageColor:`bg-amber-50`}],Recipes:[{title:`16 Superfoods That Are Worthy of the Title`,category:`Nutrition`,readTime:`6 min`,imageColor:`bg-emerald-50`},{title:`Why Am I Craving So Much Salt?`,category:`Nutrition`,readTime:`4 min`,imageColor:`bg-sky-50`},{title:`How to Make a Heart-Healthy Grocery List`,category:`Heart Health`,readTime:`5 min`,imageColor:`bg-rose-50`},{title:`These Are the 8 Best Calorie Counter Apps`,category:`Product Reviews`,readTime:`8 min`,imageColor:`bg-teal-50`},{title:`Does Ozempic Cause Hair Loss?`,category:`Medications`,readTime:`5 min`,imageColor:`bg-violet-50`},{title:`Can Music Therapy Help with Depression?`,category:`Mental Health`,readTime:`7 min`,imageColor:`bg-amber-50`}],"Skin Care":[{title:`Beginner's Guide to Sensitive Skin`,category:`Skin Care`,readTime:`6 min`,imageColor:`bg-rose-50`},{title:`Eczema Solutions: Knowledge for Self-Care`,category:`Skin Care`,readTime:`5 min`,imageColor:`bg-amber-50`},{title:`16 Superfoods That Are Worthy of the Title`,category:`Nutrition`,readTime:`6 min`,imageColor:`bg-emerald-50`},{title:`Does Ozempic Cause Hair Loss?`,category:`Medications`,readTime:`5 min`,imageColor:`bg-violet-50`},{title:`Why Am I Craving So Much Salt?`,category:`Nutrition`,readTime:`4 min`,imageColor:`bg-sky-50`},{title:`These Are the 8 Best Calorie Counter Apps`,category:`Product Reviews`,readTime:`8 min`,imageColor:`bg-teal-50`}]};return`
<section class="bg-white py-10 lg:py-14">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-xl sm:text-2xl font-bold text-charcoal mb-6">Recommended Reads</h2>
    <div data-tabs>
      <!-- Tab List -->
      <div class="flex gap-1 overflow-x-auto pb-1 mb-6 border-b border-border-light" role="tablist" aria-label="Recommended reads categories">
        ${e.map((e,t)=>`
          <button 
            data-tab="${e}" 
            role="tab" 
            aria-selected="${t===0?`true`:`false`}"
            class="px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${t===0?`text-primary border-primary`:`text-text-muted border-transparent hover:text-charcoal`}"
          >${e}</button>
        `).join(``)}
      </div>
      <!-- Tab Panels -->
      ${e.map((e,n)=>`
        <div data-tab-panel="${e}" class="${n===0?``:`hidden`}" role="tabpanel">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${t[e].map(e=>`
              <a href="#" class="group block bg-warm-white rounded-xl border border-border-light overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
                <div class="aspect-[16/10] ${e.imageColor} flex items-center justify-center">
                  <svg class="w-10 h-10 text-charcoal/20" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                  </svg>
                </div>
                <div class="p-4">
                  <span class="inline-block text-xs font-semibold text-primary mb-1.5">${e.category}</span>
                  <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors line-clamp-2">${e.title}</h3>
                  <div class="flex items-center gap-2 mt-2 text-xs text-text-muted">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    ${e.readTime} read
                  </div>
                </div>
              </a>
            `).join(``)}
          </div>
        </div>
      `).join(``)}
    </div>
  </div>
</section>
`}function g(){return`
<section class="bg-warm-white py-12 lg:py-16 border-y border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-bold text-charcoal mb-3">Why you can trust us on your health journey</h2>
      <p class="text-text-body max-w-xl mx-auto">WellSource is committed to delivering accurate, accessible, and actionable health information you can rely on.</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[{icon:`users`,title:`For you, by experts`,desc:`Experienced health writers break down complex topics so your choices feel clearer.`},{icon:`arrow`,title:`Built to move you forward`,desc:`We pair trusted information with tools and resources to guide your real health decisions.`},{icon:`shield`,title:`Reviewed by professionals`,desc:`Content accuracy checked by our medical experts so information is always dependable.`},{icon:`refresh`,title:`Always up to date`,desc:`We regularly update our content as medical guidance evolves, so your next steps reflect what's current.`}].map(e=>`
        <div class="bg-white rounded-2xl border border-border-light p-6 text-center hover:shadow-md transition-shadow">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-light flex items-center justify-center">
            ${_(e.icon)}
          </div>
          <h3 class="text-base font-bold text-charcoal mb-2">${e.title}</h3>
          <p class="text-sm text-text-body leading-relaxed">${e.desc}</p>
        </div>
      `).join(``)}
    </div>
  </div>
</section>
`}function _(e){return{users:`<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,arrow:`<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,shield:`<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,refresh:`<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`}[e]||``}function v(){return`
<section class="bg-white py-10 lg:py-14">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-charcoal">Featured Programs</h2>
      <a href="#" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
        View all
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[{title:`Beginner's Guide to Sensitive Skin`,color:`bg-rose-50`,iconColor:`text-rose-500`},{title:`Living with Multiple Sclerosis`,color:`bg-sky-50`,iconColor:`text-sky-500`},{title:`Eczema Solutions: Knowledge for Self-Care`,color:`bg-amber-50`,iconColor:`text-amber-500`},{title:`Men's Wellness`,color:`bg-emerald-50`,iconColor:`text-emerald-500`}].map(e=>`
        <a href="#" class="group block bg-warm-white rounded-xl border border-border-light p-5 hover:shadow-md hover:border-primary/20 transition-all">
          <div class="w-11 h-11 rounded-lg ${e.color} flex items-center justify-center mb-4">
            <svg class="w-5 h-5 ${e.iconColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
            </svg>
          </div>
          <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors">${e.title}</h3>
          <div class="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
            Explore
            <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </div>
        </a>
      `).join(``)}
    </div>
  </div>
</section>
`}function y(){return`
<section class="bg-warm-white py-10 lg:py-14 border-t border-border-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-charcoal">Latest Videos</h2>
      <a href="#" class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
        View all videos
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
      </a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${[{title:`7 Types of Exercises to Relieve Constipation`,duration:`4:32`},{title:`What Every Psoriasis Patient Needs to Know About Flares and Stress`,duration:`6:15`},{title:`Parkinson's Disease: 5 Progression Stages`,duration:`5:48`},{title:`Chronic Spontaneous Urticaria Facts and Resources`,duration:`3:55`}].map(e=>`
        <a href="#" class="group block bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
          <div class="relative aspect-video bg-charcoal/5 flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-medium">${e.duration}</span>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-semibold text-charcoal group-hover:text-primary leading-snug transition-colors line-clamp-2">${e.title}</h3>
          </div>
        </a>
      `).join(``)}
    </div>
  </div>
</section>
`}function b(){let e=[`About Us`,`Contact Us`,`Privacy Policy`,`Privacy Settings`,`Advertising Policy`,`Health Topics`,`Sitemap`,`Medical Affairs`,`Content Integrity`,`Newsletters`],t=[{name:`Facebook`,icon:x(`facebook`)},{name:`X`,icon:x(`x`)},{name:`Pinterest`,icon:x(`pinterest`)},{name:`Instagram`,icon:x(`instagram`)},{name:`YouTube`,icon:x(`youtube`)}];return`
<footer class="bg-charcoal text-white">
  <!-- Newsletter bar -->
  <div class="border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="max-w-xl">
        <h3 class="text-lg font-bold mb-2">Stay informed, stay well</h3>
        <p class="text-sm text-white/70 mb-5 leading-relaxed">Filter out the noise and nurture your inbox with health and wellness advice that's inclusive and rooted in medical expertise.</p>
        <form class="flex flex-col sm:flex-row gap-3" onsubmit="event.preventDefault(); alert('Thanks for signing up!');">
          <input 
            type="email" 
            required
            placeholder="Enter your email"
            class="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-sm"
          />
          <button type="submit" class="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm whitespace-nowrap">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Links & Social -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div class="flex flex-wrap gap-x-4 gap-y-2">
        ${e.map(e=>`<a href="#" class="text-sm text-white/60 hover:text-white transition-colors">${e}</a>`).join(``)}
      </div>
      <div class="flex items-center gap-3">
        ${t.map(e=>`
          <a href="#" aria-label="${e.name}" class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
            ${e.icon}
          </a>
        `).join(``)}
      </div>
    </div>
  </div>

  <!-- Legal -->
  <div class="border-t border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <span class="text-sm font-semibold">WellSource</span>
        </div>
        <p class="text-xs text-white/50 max-w-2xl leading-relaxed">
          © 2026 WellSource Media LLC. All rights reserved. Our website services, content, and products are for informational purposes only. WellSource does not provide medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  </div>
</footer>
`}function x(e){return{facebook:`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,x:`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,pinterest:`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>`,instagram:`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,youtube:`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`}[e]||``}function S(t){t.innerHTML=`
    ${e()}
    ${c()}
    <main>
      ${u()}
      ${d()}
      ${f()}
      ${p()}
      ${m()}
      ${h()}
      ${g()}
      ${v()}
      ${y()}
    </main>
    ${b()}
  `,C(),w(),T(),E()}function C(){document.querySelectorAll(`[data-dropdown]`).forEach(e=>{let t=e.dataset.dropdown,n=document.getElementById(t);if(!n)return;let r,i=()=>{clearTimeout(r),n.classList.remove(`hidden`,`opacity-0`,`pointer-events-none`),n.classList.add(`opacity-100`),e.setAttribute(`aria-expanded`,`true`)},a=()=>{r=setTimeout(()=>{n.classList.add(`hidden`,`opacity-0`,`pointer-events-none`),n.classList.remove(`opacity-100`),e.setAttribute(`aria-expanded`,`false`)},150)};e.addEventListener(`mouseenter`,i),e.addEventListener(`mouseleave`,a),n.addEventListener(`mouseenter`,()=>clearTimeout(r)),n.addEventListener(`mouseleave`,a),e.addEventListener(`click`,r=>{r.preventDefault(),n.classList.contains(`hidden`)?(document.querySelectorAll(`.mega-menu`).forEach(e=>{e.id!==t&&(e.classList.add(`hidden`,`opacity-0`,`pointer-events-none`),e.classList.remove(`opacity-100`))}),n.classList.remove(`hidden`,`opacity-0`,`pointer-events-none`),n.classList.add(`opacity-100`),e.setAttribute(`aria-expanded`,`true`)):(n.classList.add(`hidden`,`opacity-0`,`pointer-events-none`),n.classList.remove(`opacity-100`),e.setAttribute(`aria-expanded`,`false`))})})}function w(){document.querySelectorAll(`[data-tabs]`).forEach(e=>{let t=e.querySelectorAll(`[data-tab]`),n=e.querySelectorAll(`[data-tab-panel]`);t.forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.tab;t.forEach(e=>{e.classList.remove(`text-primary`,`border-primary`),e.classList.add(`text-text-muted`,`border-transparent`),e.setAttribute(`aria-selected`,`false`)}),e.classList.remove(`text-text-muted`,`border-transparent`),e.classList.add(`text-primary`,`border-primary`),e.setAttribute(`aria-selected`,`true`),n.forEach(e=>{e.dataset.tabPanel===r?(e.classList.remove(`hidden`),e.classList.add(`animate-fade-in`)):(e.classList.add(`hidden`),e.classList.remove(`animate-fade-in`))})})})})}function T(){document.querySelectorAll(`[data-carousel]`).forEach(e=>{let t=e.querySelector(`[data-carousel-track]`),n=e.querySelector(`[data-carousel-prev]`),r=e.querySelector(`[data-carousel-next]`);n.addEventListener(`click`,()=>{t.scrollBy({left:-280,behavior:`smooth`})}),r.addEventListener(`click`,()=>{t.scrollBy({left:280,behavior:`smooth`})})})}function E(){let e=document.querySelector(`.animate-ticker`);if(!e)return;let t=e.parentElement;t&&(t.addEventListener(`mouseenter`,()=>{e.style.animationPlayState=`paused`}),t.addEventListener(`mouseleave`,()=>{e.style.animationPlayState=`running`}))}S(document.querySelector(`#app`));