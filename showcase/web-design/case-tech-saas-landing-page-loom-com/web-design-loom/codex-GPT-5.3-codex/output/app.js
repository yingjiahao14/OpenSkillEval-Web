(function () {
  const pricingState = {
    billing: 'monthly',
    teamSize: 20,
    plans: {
      starter: { monthly: 0, annual: 0 },
      business: { monthly: 18, annual: 15 },
      ai: { monthly: 24, annual: 20 },
      enterprise: { monthly: null, annual: null }
    }
  };

  function byId(id) { return document.getElementById(id); }

  function initPricing() {
    const monthlyBtn = byId('billing-monthly');
    const annualBtn = byId('billing-annual');
    const slider = byId('team-size');
    if (!monthlyBtn || !annualBtn || !slider) return;

    const teamLabel = byId('team-size-label');
    const recommendation = byId('plan-recommendation');

    function updatePrices() {
      ['starter','business','ai'].forEach((key) => {
        const amount = pricingState.plans[key][pricingState.billing];
        const node = byId(`price-${key}`);
        if (!node) return;
        if (amount === 0) {
          node.textContent = '$0';
        } else {
          node.textContent = `$${amount}`;
        }
      });
      const suffixes = document.querySelectorAll('.price-suffix');
      suffixes.forEach((el) => {
        el.textContent = pricingState.billing === 'monthly' ? 'per user / month' : 'per user / month (billed annually)';
      });
    }

    function updateRecommendation() {
      const n = pricingState.teamSize;
      teamLabel.textContent = `${n} teammate${n > 1 ? 's' : ''}`;
      if (n <= 5) {
        recommendation.textContent = 'Recommendation: Starter for individuals, Business for growing teams.';
      } else if (n <= 50) {
        recommendation.textContent = 'Recommendation: Business gives your team unlimited videos and SSO add-ons.';
      } else {
        recommendation.textContent = 'Recommendation: Enterprise for advanced security, governance, and onboarding support.';
      }
    }

    function setBilling(value) {
      pricingState.billing = value;
      monthlyBtn.classList.toggle('active', value === 'monthly');
      annualBtn.classList.toggle('active', value === 'annual');
      monthlyBtn.setAttribute('aria-pressed', value === 'monthly');
      annualBtn.setAttribute('aria-pressed', value === 'annual');
      updatePrices();
    }

    monthlyBtn.addEventListener('click', () => setBilling('monthly'));
    annualBtn.addEventListener('click', () => setBilling('annual'));
    slider.addEventListener('input', (e) => {
      pricingState.teamSize = Number(e.target.value);
      updateRecommendation();
    });

    document.querySelectorAll('[data-expand-features]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-expand-features');
        const target = byId(id);
        const open = target.classList.toggle('open');
        btn.textContent = open ? 'Hide extra features' : 'See all features';
        btn.setAttribute('aria-expanded', String(open));
      });
    });

    document.querySelectorAll('.faq-q').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = byId(btn.getAttribute('aria-controls'));
        const isOpen = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });

    setBilling('monthly');
    updateRecommendation();
  }

  function initCookieConsent() {
    const banner = byId('cookie-banner');
    if (!banner) return;
    const modal = byId('cookie-modal');
    const saved = localStorage.getItem('clipcast-cookie-consent');
    if (saved) {
      banner.style.display = 'none';
      return;
    }

    function saveConsent(state) {
      localStorage.setItem('clipcast-cookie-consent', JSON.stringify(state));
      banner.style.display = 'none';
      if (modal) modal.classList.remove('open');
    }

    byId('accept-cookies')?.addEventListener('click', () => {
      saveConsent({ type: 'all', targeting: true, functional: true, performance: true });
    });

    byId('reject-cookies')?.addEventListener('click', () => {
      saveConsent({ type: 'none', targeting: false, functional: false, performance: false });
    });

    byId('manage-cookies')?.addEventListener('click', () => {
      modal?.classList.add('open');
    });

    byId('close-cookie-modal')?.addEventListener('click', () => modal?.classList.remove('open'));
    byId('save-cookie-prefs')?.addEventListener('click', () => {
      saveConsent({
        type: 'custom',
        targeting: byId('pref-targeting')?.checked,
        functional: byId('pref-functional')?.checked,
        performance: byId('pref-performance')?.checked
      });
    });
  }

  function initAuthForms() {
    document.querySelectorAll('[data-auth-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        const status = form.querySelector('[data-auth-status]');
        if (!email || !status) return;
        if (!email.value || !email.value.includes('@')) {
          status.textContent = 'Please enter a valid work email.';
          return;
        }
        status.textContent = `Continuing with ${email.value}...`;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPricing();
    initCookieConsent();
    initAuthForms();
  });
})();
