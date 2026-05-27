var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e=`home`){let t=e===`home`,n=e===`enterprise`,r=e===`pricing`;return`
<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="${t?`#`:`./index.html`}" class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <span class="text-xl font-bold text-foreground" style="font-family:var(--font-display)">ClipCast</span>
      </a>
      <div class="hidden md:flex items-center gap-8">
        <a href="${n?`#`:`./enterprise.html`}" class="text-sm font-medium ${n?`text-primary`:`text-foreground hover:text-primary`} transition-colors">Enterprise</a>
        <a href="${r?`#`:`./pricing.html`}" class="text-sm font-medium ${r?`text-primary`:`text-foreground hover:text-primary`} transition-colors">Pricing</a>
        <a href="./login.html" class="text-sm font-medium text-foreground hover:text-primary transition-colors">Sign In</a>
        <a href="./signup.html" class="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Get Started for free</a>
      </div>
      <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-muted">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden pb-4 space-y-2">
      <a href="./enterprise.html" class="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">Enterprise</a>
      <a href="./pricing.html" class="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">Pricing</a>
      <a href="./login.html" class="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">Sign In</a>
      <a href="./signup.html" class="block px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground text-center">Get Started for free</a>
    </div>
  </div>
</nav>
<script>
  (function(){
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if(btn && menu){
      btn.addEventListener('click', function(){ menu.classList.toggle('hidden'); });
    }
  })();
<\/script>
  `.trim()}function r(){return`
<footer class="bg-[#0B0D12] text-white pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
      <div class="col-span-2 md:col-span-3 lg:col-span-1">
        <a href="./index.html" class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <span class="text-xl font-bold" style="font-family:var(--font-display)">ClipCast</span>
        </a>
        <p class="text-sm text-gray-400">One video is worth a thousand words.</p>
      </div>
      <div>
        <h4 class="font-semibold text-sm mb-4 text-gray-200">App</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="./pricing.html" class="hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#" class="hover:text-white transition-colors">ClipCast SDK</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Screen Recorder</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Screenshot</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Chrome Screen Recorder</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-sm mb-4 text-gray-200">Solutions</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">Sales</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Engineering</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Design</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Marketing</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Support</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-sm mb-4 text-gray-200">For Business</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">ClipCast AI</a></li>
          <li><a href="./enterprise.html" class="hover:text-white transition-colors">Enterprise</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Customer Stories</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Video Hosting</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-sm mb-4 text-gray-200">Downloads</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">Desktop App</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Chrome Extension</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Mobile Apps</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-sm mb-4 text-gray-200">Resources</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Community</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-500">© ${new Date().getFullYear()} ClipCast, Inc. All rights reserved.</p>
      <div class="flex items-center gap-6 text-sm text-gray-500">
        <a href="#" class="hover:text-white transition-colors">Terms</a>
        <a href="#" class="hover:text-white transition-colors">Privacy</a>
        <a href="#" class="hover:text-white transition-colors">Cookies</a>
      </div>
    </div>
  </div>
</footer>
  `.trim()}function i(){return`
${n(`home`)}
<main>
  <!-- Hero -->
  <section class="relative overflow-hidden bg-gradient-to-br from-[#F0F5FF] via-white to-[#FFF5F2]">
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight" style="font-family:var(--font-display)">
          One video is worth a thousand words
        </h1>
        <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Easily record and share AI-powered video messages with your teammates and customers to supercharge productivity
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="./signup.html" class="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
            Get ClipCast for free
          </a>
          <a href="#" class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white text-foreground px-8 py-4 text-base font-semibold hover:bg-gray-50 transition-all">
            Install Chrome Extension
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Logo Bar -->
  <section class="py-10 border-b border-gray-100 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500 mb-6">Millions of people across 400,000 companies choose ClipCast</p>
      <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
        <span class="text-lg font-bold text-gray-400">Stripe</span>
        <span class="text-lg font-bold text-gray-400">Dropbox</span>
        <span class="text-lg font-bold text-gray-400">HubSpot</span>
        <span class="text-lg font-bold text-gray-400">Atlassian</span>
        <span class="text-lg font-bold text-gray-400">LaunchDarkly</span>
        <span class="text-lg font-bold text-gray-400">Netflix</span>
      </div>
    </div>
  </section>

  <!-- Feature Highlight: AI Bug Reports -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span class="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">New!</span>
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Ship faster with AI bug reports</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            Record a quick walkthrough and let ClipCast's AI turn it into a fully populated Jira work item in a few clicks. ClipCast automatically captures the technical details devs need (device/browser/OS, console errors, and network activity) to pinpoint the problem fast and move work forward.
          </p>
          <a href="#" class="inline-flex items-center text-primary font-semibold hover:underline">
            Learn more
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div class="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 flex items-center justify-center min-h-[320px]">
          <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12l8-8"/></svg>
              </div>
              <div>
                <p class="font-semibold text-sm">AI Bug Report</p>
                <p class="text-xs text-gray-500">Generated in 3s</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-2 bg-gray-100 rounded w-3/4"></div>
              <div class="h-2 bg-gray-100 rounded w-1/2"></div>
              <div class="h-2 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Screen Recorder -->
  <section class="py-20 bg-muted/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">The easiest screen recorder you'll ever use</h2>
        <p class="text-lg text-gray-600">Record in a few clicks. Share anywhere. Collaborate better.</p>
      </div>
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1 bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[320px]">
          <div class="bg-white rounded-xl shadow-xl p-4 w-full max-w-sm">
            <div class="bg-gray-900 rounded-lg h-40 flex items-center justify-center mb-3">
              <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-red-500"></div>
              <div class="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div class="h-2 w-2 rounded-full bg-green-500"></div>
              <span class="text-xs text-gray-500 ml-2">Recording...</span>
            </div>
          </div>
        </div>
        <div class="order-1 md:order-2">
          <h3 class="text-2xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Lightning fast screen recording</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">
            Easily record your screen and camera. Record on any device using ClipCast's Chrome extension, desktop app, or mobile app.
          </p>
          <a href="#" class="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">
            Download now
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Video Editor -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">So much more than a screen recorder</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Edit your videos like a pro</h3>
          <p class="text-gray-600 text-sm leading-relaxed">ClipCast's intuitive editor lets you trim, stitch clips, add eye-catching backgrounds, and even enhance your message with text, arrows, and box overlays.</p>
        </div>
        <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF613D" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Share or embed video anywhere you work</h3>
          <p class="text-gray-600 text-sm leading-relaxed">From Google Workspace to Slack, ClipCast videos seamlessly integrate with hundreds of tools you use every day.</p>
        </div>
        <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Engage and connect with video</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Collaborate by adding emojis, comments, tasks and CTAs to your video message. Transcripts and captions in 50+ languages.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Integrations -->
  <section class="py-20 bg-muted/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Works where you work</h2>
      <p class="text-gray-600 mb-12 max-w-2xl mx-auto">Seamlessly integrate with the tools your team already uses.</p>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-6">
        ${[`Slack`,`Google`,`Jira`,`Notion`,`HubSpot`,`Salesforce`].map(e=>`
          <div class="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-center">
            <span class="font-semibold text-gray-700">${e}</span>
          </div>
        `).join(``)}
      </div>
    </div>
  </section>

  <!-- Engagement -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Engage your audience like never before</h2>
          <p class="text-gray-600 mb-6 leading-relaxed">
            Add interactive elements to your videos — comments, reactions, CTAs, and tasks. Turn passive viewers into active participants and drive action from every message.
          </p>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm text-gray-600">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Emoji reactions and threaded comments
            </li>
            <li class="flex items-center gap-3 text-sm text-gray-600">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Embedded call-to-action buttons
            </li>
            <li class="flex items-center gap-3 text-sm text-gray-600">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Assignable tasks and due dates
            </li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-[320px]">
          <div class="bg-white rounded-xl shadow-xl p-5 w-full max-w-sm space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary/10"></div>
              <div class="h-2 bg-gray-100 rounded w-24"></div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 flex gap-2">
              <span class="text-lg">👍</span>
              <span class="text-lg">💬</span>
              <span class="text-lg">✅</span>
            </div>
            <div class="h-2 bg-gray-100 rounded w-full"></div>
            <div class="h-2 bg-gray-100 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Security -->
  <section class="py-20 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Keep your content safe</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">Enterprise-grade security to keep your data and your customer's data private and secure.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h3 class="font-semibold text-foreground mb-1">SSO & SCIM</h3>
          <p class="text-sm text-gray-500">Single sign-on and automated provisioning</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 class="font-semibold text-foreground mb-1">SOC 2 Type 2</h3>
          <p class="text-sm text-gray-500">Independently audited security controls</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 class="font-semibold text-foreground mb-1">Privacy Controls</h3>
          <p class="text-sm text-gray-500">Custom data retention and access settings</p>
        </div>
        <div class="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </div>
          <h3 class="font-semibold text-foreground mb-1">GDPR & CCPA</h3>
          <p class="text-sm text-gray-500">Full compliance with global regulations</p>
        </div>
      </div>
      <div class="text-center mt-8">
        <a href="./enterprise.html" class="inline-flex items-center text-primary font-semibold hover:underline">
          Learn more
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Use Cases -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Video messaging for all use cases</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="group bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF613D" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Sales</h3>
          <p class="text-sm text-gray-600">Personalize your pitch with video outreach to close more deals.</p>
        </div>
        <div class="group bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Engineering</h3>
          <p class="text-sm text-gray-600">Add visual context to your code to accelerate your sprints.</p>
        </div>
        <div class="group bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Customer Support</h3>
          <p class="text-sm text-gray-600">Troubleshoot over video to reach resolutions faster.</p>
        </div>
        <div class="group bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF613D" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Design</h3>
          <p class="text-sm text-gray-600">Share ideas and provide feedback over video to enhance designs.</p>
        </div>
      </div>
      <div class="text-center mt-8">
        <a href="#" class="inline-flex items-center text-primary font-semibold hover:underline">
          See all use cases
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="py-20 bg-muted/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Powerful features for easy, custom recordings</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[{icon:`Monitor`,title:`Screen and camera recording`,desc:`Capture your screen, webcam, or both at once.`},{icon:`Share2`,title:`Easy sharing and embedding`,desc:`Share with a link or embed anywhere.`},{icon:`Scissors`,title:`Trim and stitch video clips`,desc:`Quickly edit and combine recordings.`},{icon:`Download`,title:`Download and upload`,desc:`Export in multiple formats or import existing videos.`},{icon:`Type`,title:`Transcriptions and closed captions`,desc:`Auto-generate text in 50+ languages.`},{icon:`Lock`,title:`Video privacy controls`,desc:`Password protection and domain restrictions.`},{icon:`Palette`,title:`Custom background`,desc:`Add branded backgrounds to your videos.`},{icon:`BarChart3`,title:`Video and viewer insights`,desc:`Track views, engagement, and drop-off.`}].map(e=>`
          <div class="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 class="font-semibold text-foreground mb-1">${e.title}</h3>
            <p class="text-sm text-gray-500">${e.desc}</p>
          </div>
        `).join(``)}
      </div>
      <div class="text-center mt-8">
        <a href="#" class="inline-flex items-center text-primary font-semibold hover:underline">
          See all features
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Blog -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">From the blog</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <article class="group bg-gradient-to-b from-white to-gray-50/50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="h-48 bg-gradient-to-br from-primary/10 to-primary/5"></div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">When to Choose Synchronous Vs. Asynchronous Communication</h3>
            <p class="text-sm text-gray-600 mb-4">This guide explores the intricacies of sync vs. async communication, helps you decide which is best for your workflow, and introduces how screen recording bridges the gap.</p>
            <span class="text-sm font-semibold text-primary">Read more →</span>
          </div>
        </article>
        <article class="group bg-gradient-to-b from-white to-gray-50/50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="h-48 bg-gradient-to-br from-accent/10 to-accent/5"></div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Let ClipCast AI Do the Work: Say Goodbye to Manual Documentation</h3>
            <p class="text-sm text-gray-600 mb-4">With new ClipCast AI workflows, you turn any video into a written doc to draft SOPs, file Jira tickets, and more.</p>
            <span class="text-sm font-semibold text-primary">Read more →</span>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Enterprise CTA -->
  <section class="py-20 bg-gradient-to-br from-[#0B0D12] to-[#1a1d26] text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family:var(--font-display)">ClipCast for Enterprise</h2>
      <p class="text-gray-400 mb-8 text-lg">ClipCast for Enterprise helps teams securely manage and organize async video communication at scale</p>
      <a href="./enterprise.html" class="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
        Learn more
      </a>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Loved by teams everywhere</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[{quote:`ClipCast enables us to maximize our impact as a distributed company by helping us collaborate and share ideas more easily.`,name:`Andrew Reynolds`,role:`Design Lead, MetaLab`},{quote:`I think it's the plug-and-play, intuitive, frictionless nature of ClipCast that allows us to create personalized videos so quickly and see such an impressive increase in our response rate.`,name:`Bucky Henry`,role:`Sales Manager, Intercom`},{quote:`ClipCast allows me to connect more personally with people without having to do 75 different one-on-one calls, which is just impossible at scale.`,name:`Katie Burke`,role:`Chief People Officer, HubSpot`},{quote:`My teammates and I love using ClipCast! It has saved us hundreds of hours by creating informative video tutorials instead of long emails or 1-on-1 trainings with customers.`,name:`Erica Goodell`,role:`Customer Success, Pearson`},{quote:`ClipCast gave us an affordable platform to create personalized video content from our laptops, without the need for expensive video production teams.`,name:`Chris Radtke`,role:`Sr Director of Content Marketing, Braze`},{quote:`I've sent ClipCasts externally three times this month instead of scheduling a meeting and the first response is always, 'This is great, why don't more people do this?'`,name:`Colby Howard`,role:`Founding Partner, Paragon Intel`}].map(e=>`
          <div class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
            <p class="text-gray-700 mb-4 text-sm leading-relaxed">"${e.quote}"</p>
            <div>
              <p class="font-semibold text-foreground text-sm">${e.name}</p>
              <p class="text-xs text-gray-500">${e.role}</p>
            </div>
          </div>
        `).join(``)}
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">ClipCast powers great campaigns.</h2>
      <p class="text-gray-600 mb-8">For Mac, Windows, iOS, and Android</p>
      <a href="./signup.html" class="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
        Get ClipCast for free
      </a>
    </div>
  </section>
</main>
${r()}
  `.trim()}function a(){return`
${n(`enterprise`)}
<main>
  <!-- Hero -->
  <section class="relative overflow-hidden bg-gradient-to-br from-[#0B0D12] to-[#1a1d26] text-white">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight" style="font-family:var(--font-display)">
          Async video for the modern enterprise
        </h1>
        <p class="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
          Securely manage and organize async video communication at scale. ClipCast Enterprise gives your team the tools to communicate faster, clearer, and more personally.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="./signup.html" class="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Get Started for free
          </a>
          <a href="./pricing.html" class="inline-flex items-center justify-center rounded-xl border border-gray-700 text-white px-8 py-4 text-base font-semibold hover:bg-white/5 transition-all">
            View Pricing
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Logo Bar -->
  <section class="py-10 border-b border-gray-100 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500 mb-6">Trusted by industry leaders</p>
      <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
        <span class="text-lg font-bold text-gray-400">Stripe</span>
        <span class="text-lg font-bold text-gray-400">Dropbox</span>
        <span class="text-lg font-bold text-gray-400">HubSpot</span>
        <span class="text-lg font-bold text-gray-400">Atlassian</span>
        <span class="text-lg font-bold text-gray-400">LaunchDarkly</span>
        <span class="text-lg font-bold text-gray-400">Netflix</span>
      </div>
    </div>
  </section>

  <!-- Async Video Benefits -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Communicate faster with async video</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Save time</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Teams can communicate more efficiently without typing long emails, scheduling meetings, or trying to work across time zones.</p>
        </div>
        <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF613D" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Communicate clearly</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Async video captures context, tone, and personality in detail. Distributed teams can preserve the true meaning of their message.</p>
        </div>
        <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Deepen culture</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Make it effortless for anyone in your organization to share ideas, introduce themselves, and build community with fellow teammates using async video.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Community & Visibility -->
  <section class="py-20 bg-muted/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Drive community and visibility at scale</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Scale knowledge with video</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Connect pockets of institutional knowledge by making video messages searchable and discoverable.</p>
        </div>
        <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF613D" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Create a culture of sharing</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Video messaging encourages your team to share early and often so projects are visible and driven to completion quicker.</p>
        </div>
        <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12l8-8"/></svg>
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">Build community at scale</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Magnify people's voices so the whole company can feel connected and heard beyond the boundaries of their team.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial Quote -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <svg class="w-12 h-12 text-primary/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
      <blockquote class="text-2xl md:text-3xl font-medium text-foreground mb-6 leading-relaxed" style="font-family:var(--font-display)">
        "ClipCast allows me to connect more personally with people without having to do 75 different one-on-one calls, which is just impossible at scale."
      </blockquote>
      <div>
        <p class="font-semibold text-foreground">Katie Burke</p>
        <p class="text-sm text-gray-500">Chief People Officer, HubSpot</p>
      </div>
    </div>
  </section>

  <!-- Security -->
  <section class="py-20 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Enterprise-grade security</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">Built on the AWS backbone with secure and reliable infrastructure.</p>
      </div>
      <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div class="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h3 class="font-semibold text-foreground mb-1">GDPR, CCPA, and SOC 2 Type 2 compliant</h3>
            <p class="text-sm text-gray-500">Full compliance with global privacy and security standards.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div>
            <h3 class="font-semibold text-foreground mb-1">Built on the AWS-backbone</h3>
            <p class="text-sm text-gray-500">Secure and reliable infrastructure with 99.95% uptime SLA.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12l8-8"/></svg>
          </div>
          <div>
            <h3 class="font-semibold text-foreground mb-1">Advanced admin controls</h3>
            <p class="text-sm text-gray-500">Protect sensitive information internally with granular permissions.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1868DB" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <h3 class="font-semibold text-foreground mb-1">Encrypted data</h3>
            <p class="text-sm text-gray-500">Industry-standard security frameworks with end-to-end encryption.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Use Cases Grid -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Video messaging for all use cases</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[{icon:`Phone`,title:`Sales`,desc:`Personalize your pitch with video outreach to close more deals.`},{icon:`Code`,title:`Engineering`,desc:`Add visual context to your code to accelerate your sprints.`},{icon:`Headphones`,title:`Customer Support`,desc:`Troubleshoot over video to reach resolutions faster.`},{icon:`PenTool`,title:`Design`,desc:`Share ideas and provide feedback over video to enhance designs.`}].map(e=>`
          <div class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 class="font-semibold text-foreground mb-1">${e.title}</h3>
            <p class="text-sm text-gray-500">${e.desc}</p>
          </div>
        `).join(``)}
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div class="bg-white rounded-2xl p-10 border border-gray-100">
          <p class="text-5xl font-bold text-primary mb-2" style="font-family:var(--font-display)">50%</p>
          <p class="text-gray-600">fewer meetings across organizations</p>
        </div>
        <div class="bg-white rounded-2xl p-10 border border-gray-100">
          <p class="text-5xl font-bold text-accent mb-2" style="font-family:var(--font-display)">18%</p>
          <p class="text-gray-600">increase in traffic on webpages with ClipCast videos</p>
        </div>
        <div class="bg-white rounded-2xl p-10 border border-gray-100">
          <p class="text-5xl font-bold text-primary mb-2" style="font-family:var(--font-display)">19%</p>
          <p class="text-gray-600">boost in reply rates across sales outreach</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Integrations -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Works where you work</h2>
      <p class="text-gray-600 mb-12 max-w-2xl mx-auto">Seamlessly integrate with the tools your team already uses.</p>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-6">
        ${[`Slack`,`Google`,`Jira`,`Notion`,`HubSpot`,`Salesforce`].map(e=>`
          <div class="bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-center justify-center">
            <span class="font-semibold text-gray-700">${e}</span>
          </div>
        `).join(``)}
      </div>
    </div>
  </section>

  <!-- Pricing Plans -->
  <section class="py-20 bg-muted/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Choose the plan that fits your needs</h2>
        <a href="./pricing.html" class="inline-flex items-center text-primary font-semibold hover:underline">
          View full pricing
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 class="font-semibold text-foreground mb-1">Starter</h3>
          <p class="text-3xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">$0</p>
          <p class="text-sm text-gray-500 mb-4">25 videos, 5 min screen recordings, unlimited meeting length, transcriptions in 50+ languages</p>
          <a href="./signup.html" class="block text-center rounded-lg border border-gray-200 text-foreground px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors">Sign up</a>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 class="font-semibold text-foreground mb-1">Business</h3>
          <p class="text-3xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">$18<span class="text-base font-normal text-gray-500">/user/mo</span></p>
          <p class="text-sm text-gray-500 mb-4">Everything in Starter + unlimited videos, unlimited recording, basic waveform editing, remove branding, upload & download</p>
          <a href="./signup.html" class="block text-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Try for free</a>
        </div>
        <div class="bg-white rounded-2xl p-6 border-2 border-primary relative">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
          <h3 class="font-semibold text-foreground mb-1">Business + AI</h3>
          <p class="text-3xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">$24<span class="text-base font-normal text-gray-500">/user/mo</span></p>
          <p class="text-sm text-gray-500 mb-4">Everything in Business + auto-video enhancement, advanced editing, video-to-text automation, auto-meeting recap emails, auto-meeting notes</p>
          <a href="./signup.html" class="block text-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Try for free</a>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 class="font-semibold text-foreground mb-1">Enterprise</h3>
          <p class="text-3xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Contact Sales</p>
          <p class="text-sm text-gray-500 mb-4">Everything in Business + AI + advanced security (SSO, SCIM), Salesforce integration, 99.95% uptime SLA, admin insights</p>
          <a href="./signup.html" class="block text-center rounded-lg border border-gray-200 text-foreground px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors">Contact Sales</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Carousel -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">What our customers say</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
          <p class="text-gray-700 mb-4 text-sm leading-relaxed">"ClipCast enables us to maximize our impact as a distributed company by helping us collaborate and share ideas more easily."</p>
          <div>
            <p class="font-semibold text-foreground text-sm">Andrew Reynolds</p>
            <p class="text-xs text-gray-500">Design Lead, MetaLab</p>
          </div>
        </div>
        <div class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
          <p class="text-gray-700 mb-4 text-sm leading-relaxed">"I think it's the plug-and-play, intuitive, frictionless nature of ClipCast that allows us to create personalized videos so quickly."</p>
          <div>
            <p class="font-semibold text-foreground text-sm">Bucky Henry</p>
            <p class="text-xs text-gray-500">Sales Manager, Intercom</p>
          </div>
        </div>
        <div class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
          <p class="text-gray-700 mb-4 text-sm leading-relaxed">"My teammates and I love using ClipCast! It has saved us hundreds of hours by creating informative video tutorials."</p>
          <div>
            <p class="font-semibold text-foreground text-sm">Erica Goodell</p>
            <p class="text-xs text-gray-500">Customer Success, Pearson</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="py-20 bg-gradient-to-br from-[#0B0D12] to-[#1a1d26] text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family:var(--font-display)">Ready to improve how your team communicates?</h2>
      <a href="./signup.html" class="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 mt-6">
        Contact Sales
      </a>
    </div>
  </section>
</main>
${r()}
  `.trim()}var o=t({initPricing:()=>c,renderPricing:()=>s});function s(){return`
${n(`pricing`)}
<main>
  <!-- Hero -->
  <section class="relative overflow-hidden bg-gradient-to-br from-[#F0F5FF] via-white to-[#FFF5F2]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight" style="font-family:var(--font-display)">
        Choose the plan that fits your needs
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">Start for free, then upgrade when you're ready to unlock more power.</p>
    </div>
  </section>

  <!-- Plan Cards -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Billing Toggle -->
      <div class="flex items-center justify-center gap-4 mb-10">
        <span id="monthly-label" class="text-sm font-semibold text-foreground">Monthly</span>
        <button id="billing-toggle" class="relative w-14 h-8 bg-primary rounded-full transition-colors" aria-label="Toggle billing">
          <span id="billing-knob" class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-transform"></span>
        </button>
        <span id="annual-label" class="text-sm font-semibold text-gray-500">Annually</span>
        <span class="ml-2 inline-block px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-bold">SAVE UP TO 17%</span>
      </div>

      <!-- Team Size Slider -->
      <div class="max-w-md mx-auto mb-12">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-foreground">Team size</label>
          <span id="team-size-value" class="text-sm font-bold text-primary">1</span>
        </div>
        <input id="team-size-slider" type="range" min="1" max="100" value="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary">
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>100+</span>
        </div>
        <p id="team-recommendation" class="text-center text-sm text-gray-600 mt-3"></p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Starter -->
        <div class="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col">
          <h3 class="font-semibold text-foreground mb-1">Starter</h3>
          <div class="mb-4">
            <span class="text-4xl font-bold text-foreground" style="font-family:var(--font-display)">$0</span>
          </div>
          <p class="text-sm text-gray-500 mb-6">25 videos, 5 min screen recordings, unlimited meeting length, transcriptions in 50+ languages</p>
          <div class="mt-auto">
            <a href="./signup.html" class="block text-center rounded-lg border border-gray-200 text-foreground px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors">Sign up</a>
          </div>
        </div>
        <!-- Business -->
        <div class="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col">
          <h3 class="font-semibold text-foreground mb-1">Business</h3>
          <div class="mb-4">
            <span id="business-price" class="text-4xl font-bold text-foreground" style="font-family:var(--font-display)">$18</span>
            <span class="text-sm text-gray-500">/user/mo</span>
            <div id="business-total" class="text-xs text-gray-400 mt-1 hidden"></div>
          </div>
          <p class="text-sm text-gray-500 mb-6">Everything in Starter + unlimited videos, unlimited recording, basic waveform editing, remove branding, upload & download</p>
          <div class="mt-auto">
            <a href="./signup.html" class="block text-center rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Try for free</a>
          </div>
        </div>
        <!-- Business + AI -->
        <div class="bg-white rounded-2xl p-6 border-2 border-primary relative flex flex-col">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
          <h3 class="font-semibold text-foreground mb-1">Business + AI</h3>
          <div class="mb-4">
            <span id="business-ai-price" class="text-4xl font-bold text-foreground" style="font-family:var(--font-display)">$24</span>
            <span class="text-sm text-gray-500">/user/mo</span>
            <div id="business-ai-total" class="text-xs text-gray-400 mt-1 hidden"></div>
          </div>
          <p class="text-sm text-gray-500 mb-6">Everything in Business + auto-video enhancement, advanced editing, video-to-text automation, auto-meeting recap emails, auto-meeting notes</p>
          <div class="mt-auto">
            <a href="./signup.html" class="block text-center rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Try for free</a>
          </div>
        </div>
        <!-- Enterprise -->
        <div class="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col">
          <h3 class="font-semibold text-foreground mb-1">Enterprise</h3>
          <div class="mb-4">
            <span class="text-4xl font-bold text-foreground" style="font-family:var(--font-display)">Contact Sales</span>
          </div>
          <p class="text-sm text-gray-500 mb-6">Everything in Business + AI + advanced security (SSO, SCIM), Salesforce integration, 99.95% uptime SLA, admin insights</p>
          <div class="mt-auto">
            <a href="./signup.html" class="block text-center rounded-lg border border-gray-200 text-foreground px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors">Contact Sales</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- AI Features -->
  <section class="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">ClipCast AI</h2>
          <p class="text-gray-600 mb-6">Just hit record and ClipCast AI will do the rest. Instant edits, enhancements, and recaps for all your video recordings.</p>
          <div class="grid grid-cols-2 gap-4">
            ${[{label:`Auto-meeting notes`,badge:`NEW`},{label:`Auto-meeting recaps`,badge:`NEW`},{label:`Video-to-text automation`,badge:``},{label:`Variables`,badge:`NEW`},{label:`Auto-titles & summaries`,badge:``},{label:`Filler word removal`,badge:``}].map(e=>`
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span class="text-sm text-gray-700">${e.label}</span>
                ${e.badge?`<span class="text-[10px] font-bold bg-accent/10 text-accent px-1.5 py-0.5 rounded">${e.badge}</span>`:``}
              </div>
            `).join(``)}
          </div>
          <a href="./signup.html" class="inline-flex items-center mt-6 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">Try for free</a>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div class="space-y-4">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">AI</div>
              <div class="flex-1">
                <p class="text-sm font-medium">Auto-generated title</p>
                <p class="text-xs text-gray-500">Q3 Product Roadmap Walkthrough</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">AI</div>
              <div class="flex-1">
                <p class="text-sm font-medium">Meeting recap email</p>
                <p class="text-xs text-gray-500">Sent to all participants</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">AI</div>
              <div class="flex-1">
                <p class="text-sm font-medium">Filler words removed</p>
                <p class="text-xs text-gray-500">12 instances cleaned up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Comparison Table -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Compare all features</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
              <th class="text-center py-4 px-4 font-semibold text-foreground">Starter</th>
              <th class="text-center py-4 px-4 font-semibold text-foreground">Business</th>
              <th class="text-center py-4 px-4 font-semibold text-primary">Business + AI</th>
              <th class="text-center py-4 px-4 font-semibold text-foreground">Enterprise</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${[[`Members`,`Up to 50`,`Unlimited`,`Unlimited`,`Unlimited`],[`Recordings per person`,`Up to 25`,`Unlimited`,`Unlimited`,`Unlimited`],[`Screen recording length`,`5 min per video`,`Unlimited`,`Unlimited`,`Unlimited`],[`Screenshots`,`Unlimited`,`Unlimited`,`Unlimited`,`Unlimited`],[`Video quality`,`Up to 720p`,`High-def up to 4k`,`High-def up to 4k`,`High-def up to 4k`],[`Loom AI features`,`—`,`—`,`Included`,`Included`],[`Trim & stitch videos`,`—`,`Included`,`Included`,`Included`],[`Edit by transcript`,`—`,`—`,`Included`,`Included`],[`Remove branding`,`—`,`Included`,`Included`,`Included`],[`Custom branding`,`—`,`Included`,`Included`,`Included`],[`Engagement insights`,`—`,`Included`,`Included`,`Included`],[`Password protected videos`,`—`,`Included`,`Included`,`Included`],[`SSO (SAML)`,`—`,`—`,`—`,`Included`],[`SCIM provisioning`,`—`,`—`,`—`,`Included`],[`Custom data retention`,`—`,`—`,`—`,`Included`],[`Salesforce integration`,`—`,`—`,`—`,`Included`],[`Priority support`,`—`,`Included`,`Included`,`Included`],[`Dedicated account manager`,`—`,`—`,`—`,`Included`]].map(e=>`
              <tr class="hover:bg-gray-50/50">
                <td class="py-3 px-4 text-gray-700">${e[0]}</td>
                ${e.slice(1).map(e=>`
                  <td class="py-3 px-4 text-center ${e===`Included`?`text-primary font-semibold`:e===`—`?`text-gray-300`:`text-gray-600`}">${e===`Included`?`<svg class="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`:e}</td>
                `).join(``)}
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-20 bg-muted/30">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center" style="font-family:var(--font-display)">Frequently asked questions</h2>
      <div class="space-y-4" id="faq-container">
        ${[{q:`Can I start a free trial of paid plans?`,a:`Yes, you can try our Business + AI plan free for 14 days. If you would like a free 14-day trial of our Enterprise plan please contact sales.`},{q:`Why should I consider getting ClipCast Business + AI?`,a:`The ClipCast AI suite reduces time spent packaging and sharing videos after recording. 67% of users do not edit the auto-generated title. 73% of people said it is "extremely or very valuable" to their workflows. 18% more viewer engagement with AI-enhanced videos.`},{q:`What enterprise-grade security features does ClipCast offer?`,a:`Enforced single sign-on (SSO), SCIM automated user provisioning, organization audit log, and advanced admin controls are included in the Enterprise plan.`},{q:`What are my payment options?`,a:`You can be billed monthly, but save 17% if you pay annually. We accept credit card payment; for ACH, reach out to our Sales team.`}].map((e,t)=>`
          <div class="faq-item bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button class="faq-question w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors" data-index="${t}">
              <span class="font-semibold text-foreground">${e.q}</span>
              <svg class="faq-icon w-5 h-5 text-gray-400 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="faq-answer hidden px-5 pb-5 text-sm text-gray-600 leading-relaxed">${e.a}</div>
          </div>
        `).join(``)}
      </div>
    </div>
  </section>

  <!-- Logo Bar -->
  <section class="py-10 border-b border-gray-100 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-gray-500 mb-6">Trusted by industry leaders</p>
      <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
        <span class="text-lg font-bold text-gray-400">Stripe</span>
        <span class="text-lg font-bold text-gray-400">Dropbox</span>
        <span class="text-lg font-bold text-gray-400">HubSpot</span>
        <span class="text-lg font-bold text-gray-400">Atlassian</span>
        <span class="text-lg font-bold text-gray-400">LaunchDarkly</span>
        <span class="text-lg font-bold text-gray-400">Netflix</span>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4" style="font-family:var(--font-display)">Ready to get started?</h2>
      <p class="text-gray-600 mb-8">Join millions of people who use ClipCast to communicate better.</p>
      <a href="./signup.html" class="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
        Try for free
      </a>
    </div>
  </section>
</main>
${r()}
  `.trim()}function c(){let e=!1,t=document.getElementById(`billing-toggle`),n=document.getElementById(`billing-knob`),r=document.getElementById(`monthly-label`),i=document.getElementById(`annual-label`),a=document.getElementById(`business-price`),o=document.getElementById(`business-ai-price`),s=document.getElementById(`business-total`),c=document.getElementById(`business-ai-total`),l=document.getElementById(`team-size-slider`),u=document.getElementById(`team-size-value`),d=document.getElementById(`team-recommendation`);function f(){let t=parseInt(l?.value||`1`);u.textContent=String(t),t<=1?d.textContent=`Starter plan is perfect for individuals.`:t<=10?d.textContent=`Business plan recommended for small teams.`:t<=50?d.textContent=`Business + AI is great for growing teams.`:d.textContent=`Enterprise plan recommended for large organizations.`,e?(a.textContent=`$15`,o.textContent=`$20`,t>1?(s.classList.remove(`hidden`),c.classList.remove(`hidden`),s.textContent=`$${15*t}/mo billed annually`,c.textContent=`$${20*t}/mo billed annually`):(s.classList.add(`hidden`),c.classList.add(`hidden`))):(a.textContent=`$18`,o.textContent=`$24`,t>1?(s.classList.remove(`hidden`),c.classList.remove(`hidden`),s.textContent=`$${18*t}/mo total`,c.textContent=`$${24*t}/mo total`):(s.classList.add(`hidden`),c.classList.add(`hidden`)))}t.addEventListener(`click`,()=>{e=!e,e?(n.style.transform=`translateX(24px)`,r.classList.replace(`text-foreground`,`text-gray-500`),i.classList.replace(`text-gray-500`,`text-foreground`)):(n.style.transform=`translateX(0)`,i.classList.replace(`text-foreground`,`text-gray-500`),r.classList.replace(`text-gray-500`,`text-foreground`)),f()}),l?.addEventListener(`input`,f),f(),document.querySelectorAll(`.faq-question`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.faq-item`).querySelector(`.faq-answer`),n=e.querySelector(`.faq-icon`),r=!t.classList.contains(`hidden`);document.querySelectorAll(`.faq-answer`).forEach(e=>e.classList.add(`hidden`)),document.querySelectorAll(`.faq-icon`).forEach(e=>e.classList.remove(`rotate-180`)),r||(t.classList.remove(`hidden`),n.classList.add(`rotate-180`))})})}function l(){return`<div class="min-h-screen bg-gradient-to-br from-[#F0F5FF] via-white to-[#FFF5F2] flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <a href="./index.html" class="flex items-center justify-center gap-2 mb-8">
      <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <span class="text-xl font-bold text-foreground" style="font-family:var(--font-display)">ClipCast</span>
    </a>
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h1 class="text-2xl font-bold text-foreground text-center mb-6" style="font-family:var(--font-display)">Log in to ClipCast</h1>
      <div class="space-y-3 mb-6">
        <button class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <button class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#4A154B"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>
          Continue with Slack
        </button>
        <button class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#000"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          Continue with Apple
        </button>
        <button class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#0078D4"><path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z"/></svg>
          Continue with Outlook
        </button>
        <button class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Continue with SSO
        </button>
      </div>
      <div class="relative mb-6">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
        <div class="relative flex justify-center text-sm"><span class="bg-white px-3 text-gray-500">or</span></div>
      </div>
      <form id="login-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Work email</label>
          <input type="email" required placeholder="you@company.com" class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
        </div>
        <button type="submit" class="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Continue</button>
      </form>
      <p class="text-xs text-gray-500 text-center mt-6">
        By signing up, you acknowledge that you have read and understood, and agree to ClipCast's <a href="#" class="underline hover:text-foreground">Terms</a> and <a href="#" class="underline hover:text-foreground">Privacy Policy</a>.
      </p>
      <p class="text-sm text-center mt-4">
        <a href="./signup.html" class="text-primary font-semibold hover:underline">Sign up for free</a>
      </p>
    </div>
  </div>
</div>
<script>
  (function(){
    document.getElementById('login-form').addEventListener('submit', function(e){
      e.preventDefault();
      alert('Proceeding to email-based authentication flow...');
    });
  })();
<\/script>`}function u(){return`<div class="min-h-screen bg-gradient-to-br from-[#F0F5FF] via-white to-[#FFF5F2]">
  <div class="min-h-screen grid lg:grid-cols-2">
    <!-- Form -->
    <div class="flex items-center justify-center p-4 sm:p-8">
      <div class="w-full max-w-md">
        <a href="./index.html" class="flex items-center gap-2 mb-8">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <span class="text-xl font-bold text-foreground" style="font-family:var(--font-display)">ClipCast</span>
        </a>
        <h1 class="text-2xl font-bold text-foreground mb-2" style="font-family:var(--font-display)">Record your first ClipCast video in seconds</h1>
        <p class="text-sm text-gray-500 mb-6">Get started for free. No credit card required.</p>
        <button class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors mb-6">
          <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Sign up with Google
        </button>
        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
          <div class="relative flex justify-center text-sm"><span class="bg-white px-3 text-gray-500">or</span></div>
        </div>
        <form id="signup-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Work email</label>
            <input type="email" required placeholder="you@company.com" class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
          </div>
          <button type="submit" class="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">Continue</button>
        </form>
        <p class="text-xs text-gray-500 text-center mt-6">
          By signing up, I accept the ClipCast Cloud <a href="#" class="underline hover:text-foreground">Terms of Service</a> and acknowledge the <a href="#" class="underline hover:text-foreground">Privacy Policy</a>.
        </p>
        <p class="text-sm text-center mt-4 text-gray-600">
          Already have an account? <a href="./login.html" class="text-primary font-semibold hover:underline">Log in</a>
        </p>
      </div>
    </div>
    <!-- Testimonial Sidebar -->
    <div class="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-12">
      <div class="max-w-md">
        <svg class="w-12 h-12 text-primary/20 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        <blockquote class="text-2xl font-medium text-foreground mb-6 leading-relaxed" style="font-family:var(--font-display)">
          "I think it's the plug-and-play, intuitive, frictionless nature of ClipCast that allows us to create personalized videos so quickly and see such an impressive increase in our response rate."
        </blockquote>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">BH</div>
          <div>
            <p class="font-semibold text-foreground">Bucky Henry</p>
            <p class="text-sm text-gray-500">Sales Manager, Intercom</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  (function(){
    document.getElementById('signup-form').addEventListener('submit', function(e){
      e.preventDefault();
      alert('Proceeding to account creation flow...');
    });
  })();
<\/script>`}var d=`modulepreload`,f=function(e){return`/`+e},p={},m=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=f(t,n),t in p)return;p[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:d,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},h=window.location.pathname,g=document.querySelector(`#app`);h.includes(`enterprise`)?g.innerHTML=a():h.includes(`pricing`)?g.innerHTML=s():h.includes(`login`)?g.innerHTML=l():h.includes(`signup`)?g.innerHTML=u():g.innerHTML=i(),h.includes(`pricing`)&&m(()=>Promise.resolve().then(()=>o).then(e=>e.initPricing?.()),void 0),!h.includes(`login`)&&!h.includes(`signup`)&&m(()=>import(`./cookie-banner-CMlAv-Zg.js`).then(e=>e.initCookieBanner?.()),[]);