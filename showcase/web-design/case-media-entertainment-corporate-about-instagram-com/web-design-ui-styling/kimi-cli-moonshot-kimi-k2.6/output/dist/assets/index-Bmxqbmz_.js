(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`),t=[{label:`Features`,href:`#features`},{label:`Safety`,href:`#safety`},{label:`Creators`,href:`#creators`},{label:`News`,href:`#news`}],n=[{id:1,tags:[`#Announcements`],title:`Close Friends Only Podcast — Maya Lin, Kylie Torres, and Aidan Reyes are the Moment on SnapFrame's "Close Friends Only" Podcast`,date:`February 18, 2026`,gradient:`from-purple-500 to-pink-500`},{id:2,tags:[`#Tips & Tricks`,`#Product`],title:`Sticker Ideas and Tips for Finding the Best Ones — SnapFrame Sticker Ideas and Tips for Finding the Best Ones`,date:`February 4, 2026`,gradient:`from-orange-400 to-amber-400`},{id:3,tags:[`#Product`,`#Announcements`],title:`Watch Reels on the Big Screen — Introducing SnapFrame for TV: Watch Clips on the Big Screen`,date:`December 17, 2025`,gradient:`from-violet-500 to-indigo-500`},{id:4,tags:[`#Announcements`,`#Safety`],title:`Carversations: Real Parent-Teen Talks About Social Media`,date:`December 12, 2025`,gradient:`from-emerald-400 to-teal-500`}],r=[{title:`About`,links:[{label:`Our story`,href:`#`},{label:`Leadership`,href:`#`},{label:`Brand`,href:`#`},{label:`Brand kit`,href:`#`,external:!0},{label:`Working at SnapFrame`,href:`#`},{label:`Politics`,href:`#`,external:!0}]},{title:`Features`,links:[{label:`Clips`,href:`#`},{label:`Stories`,href:`#`},{label:`DMs`,href:`#`},{label:`Search & Explore`,href:`#`}]},{title:`Safety`,links:[{label:`Safety tools`,href:`#`},{label:`Privacy tools`,href:`#`},{label:`Account security`,href:`#`}]},{title:`Community`,links:[{label:`School Partnerships`,href:`#`},{label:`Teen Accounts`,href:`#`},{label:`Anti-Bullying`,href:`#`},{label:`Parents`,href:`#`},{label:`Programs`,href:`#`}]}],i=[{label:`Threads`,href:`#`},{label:`Edits`,href:`#`},{label:`Business`,href:`#`},{label:`Creators`,href:`#`},{label:`News`,href:`#`}],a=[{label:`Meta`,href:`#`},{label:`Family Center`,href:`#`},{label:`Help Center`,href:`#`}],o={hamburger:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,close:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,arrowRight:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,arrowUpRight:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,apple:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.05.05-2.31.7-3.06 1.55-.67.76-1.26 1.97-1.1 3.13 1.17.09 2.36-.72 3.08-1.57z"/></svg>`,playStore:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12 20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15 6.05 2.66Z"/></svg>`,snapframe:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>`,facebook:`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,threads:`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 1.986-.013 3.758-.47 5.268-1.36 1.84-1.09 3.024-2.695 3.517-4.77l1.976.544c-.62 2.57-2.15 4.614-4.39 5.94-1.946 1.152-4.24 1.765-6.362 1.765zM20.5 11.5h-1.8v1.8h-1.4v-1.8h-1.8V10h1.8V8.2h1.4V10h1.8v1.5z"/></svg>`,youtube:`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,x:`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,linkedin:`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`};function s(){return`
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a href="#" class="flex items-center gap-2 focus-ring rounded-lg">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sf-purple to-sf-pink flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </div>
            <span class="text-lg font-bold tracking-tight text-sf-black">SnapFrame</span>
          </a>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-1">
            ${t.map(e=>`<a href="${e.href}" class="text-sm font-medium text-gray-700 hover:text-sf-purple transition-colors focus-ring rounded-md px-2 py-1">${e.label}</a>`).join(``)}
          </nav>

          <!-- Right side -->
          <div class="flex items-center gap-3">
            <a href="#" class="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-sf-black rounded-full hover:bg-gray-800 transition-colors btn-press focus-ring">
              Log in
            </a>
            <!-- Hamburger -->
            <button id="menu-toggle" class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus-ring" aria-label="Open menu" aria-expanded="false">
              ${o.hamburger}
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div id="mobile-menu" class="mobile-menu fixed inset-0 top-16 z-40 bg-white md:hidden">
        <nav class="flex flex-col p-6 gap-2">
          ${t.map(e=>`<a href="${e.href}" class="text-lg font-medium text-gray-900 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors mobile-nav-link">${e.label}</a>`).join(``)}
          <div class="mt-4 pt-4 border-t border-gray-100">
            <a href="#" class="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-sf-black rounded-full hover:bg-gray-800 transition-colors btn-press">
              Log in
            </a>
          </div>
        </nav>
      </div>
    </header>
  `}function c(){return`
    <section class="hero-gradient relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-sf-black leading-[1.1] mb-6">
            SnapFrame brings you <span class="gradient-text">closer</span> to the people and things you love
          </h1>
          <p class="text-lg sm:text-xl text-sf-muted max-w-xl mb-8 leading-relaxed">
            Capture, create, and share what you love with the people who matter most.
          </p>
          <a href="#" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-sf-purple to-sf-pink rounded-full hover:opacity-90 transition-opacity btn-press focus-ring shadow-lg shadow-purple-200">
            Try it now
          </a>
        </div>
      </div>
      <!-- Decorative blobs -->
      <div class="absolute top-10 right-10 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-40 w-48 h-48 bg-orange-200/40 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  `}function l(){return`
    <section id="features" class="py-20 sm:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sf-black leading-tight mb-6">
              Share what you're into with the people who get you with all our features <span class="text-sf-purple">→</span>
            </h2>
          </div>
          <div class="lg:pt-4">
            <p class="text-base sm:text-lg text-sf-muted leading-relaxed mb-6">
              SnapFrame's suite of creative tools — from short-form video to disappearing stories and direct messaging — lets you express yourself and connect with the communities that matter most. Explore Clips, Stories, DMs, and Search & Explore to find your people.
            </p>
            <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-sf-purple hover:text-sf-pink transition-colors focus-ring rounded-md px-1 py-1">
              features ${o.arrowRight}
            </a>
          </div>
        </div>
      </div>
    </section>
  `}function u(){return`
    <section id="safety" class="py-20 sm:py-28 bg-sf-safety">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sf-black leading-tight mb-6">
              Protect your account and peace-of-mind with our safety tools <span class="text-emerald-500">→</span>
            </h2>
          </div>
          <div class="lg:pt-4">
            <p class="text-base sm:text-lg text-sf-muted leading-relaxed mb-6">
              SnapFrame is committed to keeping every member of our community safe. Our safety tools give you control over your experience — from content filters and restricted accounts to privacy settings and reporting features designed to protect your well-being.
            </p>
            <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors focus-ring rounded-md px-1 py-1">
              safety tools ${o.arrowRight}
            </a>
          </div>
        </div>
      </div>
    </section>
  `}function d(){return`
    <section id="creators" class="py-20 sm:py-28 bg-sf-creators">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sf-black leading-tight mb-6">
              Entertain, inspire and reach new audiences as a creator <span class="text-sf-orange">↗</span>
            </h2>
          </div>
          <div class="lg:pt-4">
            <p class="text-base sm:text-lg text-sf-muted leading-relaxed mb-6">
              Whether you're just starting out or already have a following, SnapFrame gives creators the tools to grow, monetize, and connect with fans. Build your brand, collaborate with others, and turn your passion into opportunity.
            </p>
            <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-sf-orange hover:text-amber-600 transition-colors focus-ring rounded-md px-1 py-1">
              creator ${o.arrowUpRight}
            </a>
          </div>
        </div>
      </div>
    </section>
  `}function f(){return`
    <section class="py-16 sm:py-24 bg-gradient-to-r from-sf-purple via-sf-pink to-sf-orange">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Where everyday moments bring friends together
        </p>
      </div>
    </section>
  `}function p(){let e=n.map(e=>{let t=e.tags.map(e=>`<span class="tag-pill ${e.includes(`Announcements`)?`bg-purple-100 text-purple-700`:e.includes(`Safety`)?`bg-emerald-100 text-emerald-700`:e.includes(`Tips`)?`bg-amber-100 text-amber-700`:`bg-blue-100 text-blue-700`}">${e}</span>`).join(``);return`
      <article class="news-card bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover cursor-pointer focus-ring">
        <div class="h-44 bg-gradient-to-br ${e.gradient} flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/></svg>
        </div>
        <div class="p-5">
          <div class="flex flex-wrap gap-2 mb-3">
            ${t}
          </div>
          <h3 class="text-base font-bold text-sf-black leading-snug mb-3 line-clamp-3">
            ${e.title}
          </h3>
          <time class="text-xs font-medium text-gray-400">${e.date}</time>
        </div>
      </article>
    `}).join(``);return`
    <section id="news" class="py-20 sm:py-28 bg-sf-cream">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-10">
          <div>
            <span class="text-xs font-bold tracking-widest uppercase text-sf-purple mb-2 block">News</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-sf-black">Discover more about SnapFrame</h2>
          </div>
          <a href="#" class="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-sf-purple hover:text-sf-pink transition-colors focus-ring rounded-md px-2 py-1 shrink-0">
            View more ${o.arrowRight}
          </a>
        </div>

        <!-- Horizontal scroll container -->
        <div id="news-carousel" class="flex gap-5 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory">
          ${e}
        </div>

        <div class="mt-6 sm:hidden text-center">
          <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-sf-purple hover:text-sf-pink transition-colors focus-ring rounded-md px-2 py-1">
            View more ${o.arrowRight}
          </a>
        </div>
      </div>
    </section>
  `}function m(){return`
    <section class="py-20 sm:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sf-black mb-3">
          Create, share and connect.
        </h2>
        <p class="text-lg sm:text-xl text-sf-muted mb-10">Download now.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3.5 bg-sf-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors btn-press focus-ring w-full sm:w-auto justify-center">
            ${o.apple} App Store
          </a>
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3.5 bg-sf-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors btn-press focus-ring w-full sm:w-auto justify-center">
            ${o.playStore} Google Play
          </a>
        </div>
      </div>
    </section>
  `}function h(){return`
    <footer class="bg-sf-cream border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <!-- Footer grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          ${r.map(e=>`
    <div>
      <h4 class="text-sm font-bold text-sf-black uppercase tracking-wider mb-4">${e.title}</h4>
      <ul class="space-y-2.5">
        ${e.links.map(e=>`
          <li>
            <a href="${e.href}" class="text-sm text-gray-500 hover:text-sf-purple transition-colors focus-ring rounded inline-flex items-center gap-1">
              ${e.label}
              ${e.external?o.arrowUpRight:``}
            </a>
          </li>
        `).join(``)}
      </ul>
    </div>
  `).join(``)}
          ${`
    <div>
      <h4 class="text-sm font-bold text-sf-black uppercase tracking-wider mb-4">External Links</h4>
      <ul class="space-y-2.5">
        ${i.map(e=>`
          <li>
            <a href="${e.href}" class="text-sm text-gray-500 hover:text-sf-purple transition-colors focus-ring rounded inline-flex items-center gap-1">
              ${e.label} ${o.arrowUpRight}
            </a>
          </li>
        `).join(``)}
      </ul>
    </div>
  `}
          ${`
    <div>
      <h4 class="text-sm font-bold text-sf-black uppercase tracking-wider mb-4">Partner Links</h4>
      <ul class="space-y-2.5">
        ${a.map(e=>`
          <li>
            <a href="${e.href}" class="text-sm text-gray-500 hover:text-sf-purple transition-colors focus-ring rounded inline-flex items-center gap-1">
              ${e.label} ${o.arrowUpRight}
            </a>
          </li>
        `).join(``)}
      </ul>
    </div>
  `}
        </div>

        <!-- Bottom row -->
        <div class="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <!-- Language -->
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            English (US)
          </div>

          <!-- Social icons -->
          <div class="flex items-center gap-4">
            ${[{icon:o.snapframe,label:`SnapFrame`},{icon:o.facebook,label:`Facebook`},{icon:o.threads,label:`Threads`},{icon:o.youtube,label:`YouTube`},{icon:o.x,label:`X`},{icon:o.linkedin,label:`LinkedIn`}].map(e=>`
              <a href="#" aria-label="${e.label}" class="text-gray-400 hover:text-sf-purple transition-colors focus-ring rounded">
                ${e.icon}
              </a>
            `).join(``)}
          </div>

          <!-- Legal -->
          <div class="flex items-center gap-4 text-xs text-gray-400">
            <a href="#" class="hover:text-gray-600 transition-colors focus-ring rounded">API</a>
            <span>·</span>
            <a href="#" class="hover:text-gray-600 transition-colors focus-ring rounded">Privacy</a>
            <span>·</span>
            <a href="#" class="hover:text-gray-600 transition-colors focus-ring rounded">Terms</a>
            <span>·</span>
            <a href="#" class="hover:text-gray-600 transition-colors focus-ring rounded">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `}e.innerHTML=`
  ${s()}
  <main>
    ${c()}
    ${l()}
    ${u()}
    ${d()}
    ${f()}
    ${p()}
    ${m()}
  </main>
  ${h()}
`;function g(){let e=document.getElementById(`menu-toggle`),t=document.getElementById(`mobile-menu`),n=document.querySelectorAll(`.mobile-nav-link`);e&&t&&(e.addEventListener(`click`,()=>{let n=t.classList.toggle(`open`);e.setAttribute(`aria-expanded`,String(n)),e.innerHTML=n?o.close:o.hamburger,document.body.style.overflow=n?`hidden`:``}),n.forEach(n=>{n.addEventListener(`click`,()=>{t.classList.remove(`open`),e.setAttribute(`aria-expanded`,`false`),e.innerHTML=o.hamburger,document.body.style.overflow=``})}));let r=document.getElementById(`news-carousel`);r&&r.querySelectorAll(`.news-card`).forEach(e=>{e.classList.add(`snap-start`)})}g();