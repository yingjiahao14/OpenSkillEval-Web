const state = {
  billing: localStorage.getItem('cc_billing') || 'monthly',
  teamSize: Number(localStorage.getItem('cc_team_size') || 10),
  cookieConsent: localStorage.getItem('cc_cookie_consent') || null,
  cookiePrefs: JSON.parse(localStorage.getItem('cc_cookie_prefs') || '{"targeting":false,"functional":true,"performance":true}')
};

function bindPricing() {
  const toggleButtons = document.querySelectorAll('[data-billing]');
  const prices = document.querySelectorAll('[data-price-monthly]');
  const badge = document.querySelector('[data-annual-badge]');
  const slider = document.querySelector('#team-size');
  const sizeOut = document.querySelector('#team-size-value');
  const rec = document.querySelector('#team-recommendation');

  const updateBilling = (mode) => {
    state.billing = mode;
    localStorage.setItem('cc_billing', mode);
    toggleButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.billing === mode));
    prices.forEach((node) => {
      const val = mode === 'monthly' ? node.dataset.priceMonthly : node.dataset.priceAnnual;
      const suffix = mode === 'monthly' ? '/user/mo' : '/user/mo (billed annually)';
      node.textContent = val === 'custom' ? 'Custom pricing' : `${val} ${suffix}`;
    });
    if (badge) badge.classList.toggle('hidden', mode !== 'annual');
  };

  const updateTeamSize = (value) => {
    state.teamSize = Number(value);
    localStorage.setItem('cc_team_size', String(value));
    if (sizeOut) sizeOut.textContent = `${value} seats`;
    if (!rec) return;
    if (value <= 5) rec.textContent = 'Recommended: Starter for lightweight async updates.';
    else if (value <= 50) rec.textContent = 'Recommended: Business for growing teams with collaboration.';
    else if (value <= 250) rec.textContent = 'Recommended: Business + AI for high-volume workflows and automation.';
    else rec.textContent = 'Recommended: Enterprise for governance, security, and scale.';
  };

  toggleButtons.forEach((btn) => btn.addEventListener('click', () => updateBilling(btn.dataset.billing)));
  if (slider) {
    slider.value = state.teamSize;
    slider.addEventListener('input', (e) => updateTeamSize(e.target.value));
  }
  updateBilling(state.billing);
  updateTeamSize(state.teamSize);

  document.querySelectorAll('[data-expand-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.expandTarget);
      const isHidden = target.classList.contains('hidden');
      target.classList.toggle('hidden');
      btn.textContent = isHidden ? 'Hide features' : 'See all features';
    });
  });

  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      panel.classList.toggle('hidden');
    });
  });
}

function bindCookie() {
  const banner = document.querySelector('#cookie-banner');
  const modal = document.querySelector('#cookie-modal');
  if (!banner) return;

  const saveConsent = (type) => {
    state.cookieConsent = type;
    localStorage.setItem('cc_cookie_consent', type);
    banner.classList.add('hidden');
  };

  if (state.cookieConsent) banner.classList.add('hidden');

  const prefT = document.querySelector('#pref-targeting');
  const prefF = document.querySelector('#pref-functional');
  const prefP = document.querySelector('#pref-performance');
  if (prefT && prefF && prefP) {
    prefT.checked = !!state.cookiePrefs.targeting;
    prefF.checked = !!state.cookiePrefs.functional;
    prefP.checked = !!state.cookiePrefs.performance;
  }

  document.querySelector('#accept-cookies')?.addEventListener('click', () => {
    state.cookiePrefs = { targeting: true, functional: true, performance: true };
    localStorage.setItem('cc_cookie_prefs', JSON.stringify(state.cookiePrefs));
    saveConsent('accepted');
  });
  document.querySelector('#reject-cookies')?.addEventListener('click', () => {
    state.cookiePrefs = { targeting: false, functional: false, performance: false };
    localStorage.setItem('cc_cookie_prefs', JSON.stringify(state.cookiePrefs));
    saveConsent('rejected');
  });
  document.querySelector('#manage-cookies')?.addEventListener('click', () => { modal.style.display = 'grid'; });
  document.querySelector('#close-cookie-modal')?.addEventListener('click', () => { modal.style.display = 'none'; });
  document.querySelector('#save-cookie-prefs')?.addEventListener('click', () => {
    state.cookiePrefs = {
      targeting: document.querySelector('#pref-targeting').checked,
      functional: document.querySelector('#pref-functional').checked,
      performance: document.querySelector('#pref-performance').checked
    };
    localStorage.setItem('cc_cookie_prefs', JSON.stringify(state.cookiePrefs));
    modal.style.display = 'none';
    saveConsent('custom');
  });
}

function bindAuth() {
  document.querySelectorAll('[data-auth-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input.value.trim()) return input.focus();
      const next = form.dataset.next || 'index.html';
      const qp = new URLSearchParams({ email: input.value.trim() });
      window.location.href = `${next}?${qp.toString()}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindPricing();
  bindCookie();
  bindAuth();
});
