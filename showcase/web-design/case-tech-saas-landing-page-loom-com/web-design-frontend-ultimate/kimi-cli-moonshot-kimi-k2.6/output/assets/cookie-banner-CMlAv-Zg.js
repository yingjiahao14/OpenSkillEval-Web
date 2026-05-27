function e(){if(document.getElementById(`cookie-banner`))return;let e=document.createElement(`div`);e.id=`cookie-banner`,e.className=`fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-lg`,e.innerHTML=`
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-600">We use cookies to enhance your experience. By continuing, you agree to our use of cookies.</p>
      <div class="flex items-center gap-3">
        <button id="cookie-manage" class="text-sm font-medium text-gray-600 hover:text-foreground transition-colors">Manage preferences</button>
        <button id="cookie-reject" class="text-sm font-medium text-gray-600 hover:text-foreground transition-colors">Reject all</button>
        <button id="cookie-accept" class="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Accept all cookies</button>
      </div>
    </div>
  `,document.body.appendChild(e),e.querySelector(`#cookie-accept`)?.addEventListener(`click`,()=>{localStorage.setItem(`cookieConsent`,`accepted`),e.remove()}),e.querySelector(`#cookie-reject`)?.addEventListener(`click`,()=>{localStorage.setItem(`cookieConsent`,`rejected`),e.remove()}),e.querySelector(`#cookie-manage`)?.addEventListener(`click`,()=>{t()}),localStorage.getItem(`cookieConsent`)&&e.remove()}function t(){let e=document.createElement(`div`);e.id=`cookie-modal`,e.className=`fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4`,e.innerHTML=`
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
      <h3 class="text-lg font-bold mb-2" style="font-family:var(--font-display)">Cookie Preferences</h3>
      <p class="text-sm text-gray-500 mb-6">Manage your cookie preferences below.</p>
      <div class="space-y-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">Necessary</p>
            <p class="text-xs text-gray-500">Required for the site to function.</p>
          </div>
          <div class="w-11 h-6 bg-primary rounded-full relative"><div class="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div></div>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">Targeting</p>
            <p class="text-xs text-gray-500">Used for personalized advertising.</p>
          </div>
          <button id="toggle-targeting" class="w-11 h-6 bg-gray-300 rounded-full relative transition-colors"><div class="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow transition-transform"></div></button>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">Functional</p>
            <p class="text-xs text-gray-500">Enable enhanced functionality.</p>
          </div>
          <button id="toggle-functional" class="w-11 h-6 bg-gray-300 rounded-full relative transition-colors"><div class="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow transition-transform"></div></button>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">Performance</p>
            <p class="text-xs text-gray-500">Help us improve performance.</p>
          </div>
          <button id="toggle-performance" class="w-11 h-6 bg-gray-300 rounded-full relative transition-colors"><div class="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow transition-transform"></div></button>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3">
        <button id="cookie-modal-close" class="text-sm font-medium text-gray-600 hover:text-foreground transition-colors">Cancel</button>
        <button id="cookie-modal-save" class="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Save preferences</button>
      </div>
    </div>
  `,document.body.appendChild(e);let t={targeting:!1,functional:!1,performance:!1},n=(n,r)=>{let i=e.querySelector(n);i&&i.addEventListener(`click`,()=>{t[r]=!t[r],t[r]?(i.classList.remove(`bg-gray-300`),i.classList.add(`bg-primary`),i.querySelector(`div`).style.transform=`translateX(20px)`):(i.classList.add(`bg-gray-300`),i.classList.remove(`bg-primary`),i.querySelector(`div`).style.transform=`translateX(0)`)})};n(`#toggle-targeting`,`targeting`),n(`#toggle-functional`,`functional`),n(`#toggle-performance`,`performance`),e.querySelector(`#cookie-modal-close`)?.addEventListener(`click`,()=>e.remove()),e.querySelector(`#cookie-modal-save`)?.addEventListener(`click`,()=>{localStorage.setItem(`cookieConsent`,JSON.stringify(t)),e.remove(),document.getElementById(`cookie-banner`)?.remove()}),e.addEventListener(`click`,t=>{t.target===e&&e.remove()})}export{e as initCookieBanner};