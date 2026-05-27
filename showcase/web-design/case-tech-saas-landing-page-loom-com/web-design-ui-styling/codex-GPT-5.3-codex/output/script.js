function initPricing() {
  const root = document.querySelector('[data-pricing-root]');
  if (!root) return;

  const monthlyBtn = document.querySelector('[data-billing="monthly"]');
  const annualBtn = document.querySelector('[data-billing="annual"]');
  const teamSlider = document.querySelector('#teamSize');
  const teamValue = document.querySelector('#teamValue');
  const rec = document.querySelector('#recommendation');

  const prices = {
    Starter: { monthly: 0, annual: 0 },
    Business: { monthly: 18, annual: 15 },
    'Business + AI': { monthly: 24, annual: 20 },
    Enterprise: { monthly: null, annual: null }
  };

  function renderBilling(mode) {
    document.querySelectorAll('[data-plan]').forEach((card) => {
      const name = card.getAttribute('data-plan');
      const slot = card.querySelector('[data-price]');
      if (prices[name][mode] === null) {
        slot.textContent = 'Custom';
      } else {
        slot.textContent = `$${prices[name][mode]}`;
      }
    });
    monthlyBtn.classList.toggle('active', mode === 'monthly');
    annualBtn.classList.toggle('active', mode === 'annual');
    localStorage.setItem('clipcast-billing', mode);
  }

  function updateRecommendation(value) {
    teamValue.textContent = value;
    let text = 'Best for individuals and early trials: Starter';
    if (value >= 4 && value <= 20) text = 'Recommended plan: Business for growing teams';
    if (value > 20 && value <= 75) text = 'Recommended plan: Business + AI for high-output teams';
    if (value > 75) text = 'Recommended plan: Enterprise for scale, security, and control';
    rec.textContent = text;
  }

  monthlyBtn?.addEventListener('click', () => renderBilling('monthly'));
  annualBtn?.addEventListener('click', () => renderBilling('annual'));
  teamSlider?.addEventListener('input', (e) => updateRecommendation(Number(e.target.value)));

  document.querySelectorAll('[data-expand]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-expand');
      const list = document.getElementById(id);
      const open = list.hasAttribute('hidden');
      list.toggleAttribute('hidden');
      btn.textContent = open ? 'Hide extra features' : 'See all features';
    });
  });

  const saved = localStorage.getItem('clipcast-billing') || 'annual';
  renderBilling(saved);
  updateRecommendation(Number(teamSlider?.value || 12));
}

function initFAQ() {
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const btn = item.querySelector('.accordion-btn');
    btn?.addEventListener('click', () => item.classList.toggle('open'));
  });
}

function initCookie() {
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  if (!banner) return;
  const saved = localStorage.getItem('clipcast-cookie-consent');
  if (saved) banner.style.display = 'none';

  const dismiss = (value) => {
    localStorage.setItem('clipcast-cookie-consent', value);
    const prefs = {
      targeting: document.getElementById('targeting')?.checked ?? false,
      functional: document.getElementById('functional')?.checked ?? true,
      performance: document.getElementById('performance')?.checked ?? true,
    };
    localStorage.setItem('clipcast-cookie-prefs', JSON.stringify(prefs));
    banner.style.display = 'none';
    modal?.classList.remove('open');
  };

  document.getElementById('acceptCookies')?.addEventListener('click', () => dismiss('accepted'));
  document.getElementById('rejectCookies')?.addEventListener('click', () => dismiss('rejected'));
  document.getElementById('manageCookies')?.addEventListener('click', () => modal?.classList.add('open'));
  document.getElementById('closeCookieModal')?.addEventListener('click', () => modal?.classList.remove('open'));
  document.getElementById('saveCookiePrefs')?.addEventListener('click', () => dismiss('custom'));
}

function initAuth() {
  document.querySelectorAll('[data-auth-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = form.getAttribute('data-auth-form');
      const email = form.querySelector('input[type="email"]').value;
      alert(`${type === 'login' ? 'Login' : 'Signup'} flow started for ${email}`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPricing();
  initFAQ();
  initCookie();
  initAuth();
});
