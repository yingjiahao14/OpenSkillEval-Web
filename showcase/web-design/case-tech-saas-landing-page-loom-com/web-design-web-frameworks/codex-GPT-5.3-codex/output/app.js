(function () {
  const consentKey = 'clipcast_cookie_consent_v1';
  const prefKey = 'clipcast_cookie_prefs_v1';

  function setupCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const modal = document.getElementById('prefModal');
    if (!banner) return;

    const savedConsent = localStorage.getItem(consentKey);
    if (!savedConsent) banner.classList.add('show');

    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    const manageBtn = document.getElementById('manageCookies');
    const savePrefsBtn = document.getElementById('savePrefs');
    const closePrefsBtn = document.getElementById('closePrefs');

    const setConsent = (value) => {
      localStorage.setItem(consentKey, value);
      banner.classList.remove('show');
    };

    acceptBtn && acceptBtn.addEventListener('click', () => {
      localStorage.setItem(prefKey, JSON.stringify({ targeting: true, functional: true, performance: true }));
      setConsent('accepted');
    });

    rejectBtn && rejectBtn.addEventListener('click', () => {
      localStorage.setItem(prefKey, JSON.stringify({ targeting: false, functional: false, performance: false }));
      setConsent('rejected');
    });

    manageBtn && manageBtn.addEventListener('click', () => modal.classList.add('show'));
    closePrefsBtn && closePrefsBtn.addEventListener('click', () => modal.classList.remove('show'));

    savePrefsBtn && savePrefsBtn.addEventListener('click', () => {
      const targeting = document.getElementById('prefTargeting').checked;
      const functional = document.getElementById('prefFunctional').checked;
      const performance = document.getElementById('prefPerformance').checked;
      localStorage.setItem(prefKey, JSON.stringify({ targeting, functional, performance }));
      setConsent('custom');
      modal.classList.remove('show');
    });
  }

  function setupPricing() {
    const monthlyBtn = document.getElementById('billMonthly');
    const annualBtn = document.getElementById('billAnnual');
    if (!monthlyBtn || !annualBtn) return;

    const prices = {
      monthly: { starter: '$0', business: '$18', ai: '$24', enterprise: 'Custom' },
      annual: { starter: '$0', business: '$15', ai: '$20', enterprise: 'Custom' }
    };

    const setBilling = (mode) => {
      const isAnnual = mode === 'annual';
      monthlyBtn.classList.toggle('active', !isAnnual);
      annualBtn.classList.toggle('active', isAnnual);
      document.getElementById('priceStarter').textContent = prices[mode].starter;
      document.getElementById('priceBusiness').textContent = prices[mode].business;
      document.getElementById('priceAI').textContent = prices[mode].ai;
      document.getElementById('priceEnterprise').textContent = prices[mode].enterprise;
      const freqEls = document.querySelectorAll('.billing-freq');
      freqEls.forEach((el) => {
        el.textContent = isAnnual ? 'per user / month, billed annually' : 'per user / month';
      });
    };

    monthlyBtn.addEventListener('click', () => setBilling('monthly'));
    annualBtn.addEventListener('click', () => setBilling('annual'));

    const teamSlider = document.getElementById('teamSlider');
    const teamSizeText = document.getElementById('teamSizeValue');
    const teamHint = document.getElementById('teamHint');
    if (teamSlider && teamSizeText && teamHint) {
      const updateTeam = () => {
        const value = Number(teamSlider.value);
        teamSizeText.textContent = value;
        if (value <= 10) teamHint.textContent = 'Recommended: Starter or Business for growing teams.';
        else if (value <= 50) teamHint.textContent = 'Recommended: Business for collaboration at scale.';
        else teamHint.textContent = 'Recommended: Business + AI or Enterprise for advanced controls.';
      };
      teamSlider.addEventListener('input', updateTeam);
      updateTeam();
    }

    document.querySelectorAll('.expand-features').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const area = document.getElementById(targetId);
        if (!area) return;
        const open = area.classList.toggle('open');
        btn.textContent = open ? 'Hide full feature list' : 'See all features';
      });
    });

    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      q.addEventListener('click', () => item.classList.toggle('open'));
    });
  }

  function setupAuthForm() {
    document.querySelectorAll('[data-auth-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput || !emailInput.value.trim()) return;
        const status = form.querySelector('[data-status]');
        if (status) status.textContent = 'Continuing to secure email authentication flow...';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupCookieBanner();
    setupPricing();
    setupAuthForm();
  });
})();
