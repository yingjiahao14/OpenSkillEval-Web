(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{label:`Volta.`,href:`index.html`},{label:`Neweno`,href:`neweno.html`},{label:`Services`,href:`services.html`},{label:`Clients`,href:`clients.html`},{label:`Contact`,href:`contact.html`}];function t(t){return`
    <header class="w-full max-w-[1400px] mx-auto px-8 md:px-16 py-8 flex items-center justify-between">
      <div class="desktop-nav flex items-center gap-8">
        ${e.map(e=>{let n=e.label===`Volta.`,r=e.href===t||t===`index.html`&&e.label===`Volta.`,i=n?`nav-link logo`:`nav-link${r?` active`:``}`;return`<a href="${e.href}" class="${i}">${e.label}</a>`}).join(``)}
      </div>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
    <div class="mobile-overlay" id="mobileMenu">
      ${e.map(e=>`<a href="${e.href}" class="mobile-nav-link">${e.label===`Volta.`?`Home`:e.label}</a>`).join(``)}
    </div>
  `}function n(){let e=document.getElementById(`hamburger`),t=document.getElementById(`mobileMenu`);if(!e||!t)return;let n=!1;e.addEventListener(`click`,()=>{n=!n,e.classList.toggle(`open`,n),t.classList.toggle(`open`,n),document.body.style.overflow=n?`hidden`:``}),t.querySelectorAll(`a`).forEach(r=>{r.addEventListener(`click`,()=>{n=!1,e.classList.remove(`open`),t.classList.remove(`open`),document.body.style.overflow=``})})}export{t as n,n as t};