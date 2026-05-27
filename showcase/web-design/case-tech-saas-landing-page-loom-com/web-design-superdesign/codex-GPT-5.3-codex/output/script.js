(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const pricingData = {
    monthly: {
      starter: '$0',
      business: '$18',
      business_ai: '$24',
      suffix: '/user/month'
    },
    annual: {
      starter: '$0',
      business: '$15',
      business_ai: '$20',
      suffix: '/user/month billed annually'
    }
  };

  function initBillingToggle() {
    const root = $('[data-billing-root]');
    if (!root) return;
    const monthlyBtn = $('[data-billing="monthly"]', root);
    const annualBtn = $('[data-billing="annual"]', root);
    const targets = $$('[data-plan-price]');
    const suffixes = $$('[data-plan-suffix]');

    function setMode(mode) {
      monthlyBtn.classList.toggle('active', mode === 'monthly');
      annualBtn.classList.toggle('active', mode === 'annual');
      monthlyBtn.setAttribute('aria-pressed', String(mode === 'monthly'));
      annualBtn.setAttribute('aria-pressed', String(mode === 'annual'));
      targets.forEach((el) => {
        const key = el.getAttribute('data-plan-price');
        el.textContent = pricingData[mode][key] || '';
      });
      suffixes.forEach((el) => {
        if (el.getAttribute('data-plan-suffix') !== 'starter') {
          el.textContent = pricingData[mode].suffix;
        }
      });
    }

    monthlyBtn.addEventListener('click', () => setMode('monthly'));
    annualBtn.addEventListener('click', () => setMode('annual'));
    setMode('monthly');
  }

  function initTeamSlider() {
    const slider = $('#team-size');
    const readout = $('#team-size-readout');
    const suggestion = $('#plan-suggestion');
    if (!slider || !readout || !suggestion) return;

    const suggest = (size) => {
      if (size <= 5) return 'Starter works for individuals and tiny teams.';
      if (size <= 30) return 'Business is recommended for growing teams.';
      if (size <= 100) return 'Business + AI is ideal for high-output teams.';
      return 'Enterprise is recommended for governance and scale.';
    };

    const update = () => {
      const value = Number(slider.value);
      readout.textContent = `${value} teammates`;
      suggestion.textContent = suggest(value);
    };

    slider.addEventListener('input', update);
    update();
  }

  function initComparisonExpand() {
    $$('[data-expand-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.getAttribute('data-expand-target'));
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (target) {
          target.classList.toggle('hidden', expanded);
        }
        btn.textContent = expanded ? 'See all features' : 'Show fewer features';
      });
    });
  }

  function initFaqAccordion() {
    $$('[data-faq-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.getAttribute('aria-controls'));
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (target) target.classList.toggle('hidden', expanded);
      });
    });
  }

  function initCookieConsent() {
    const banner = $('#cookie-banner');
    const modal = $('#cookie-modal');
    if (!banner) return;

    const KEY = 'clipcast_cookie_consent';
    const PREF_KEY = 'clipcast_cookie_prefs';

    const showBannerIfNeeded = () => {
      const saved = localStorage.getItem(KEY);
      if (!saved) banner.style.display = 'block';
    };

    const saveChoice = (choice) => {
      localStorage.setItem(KEY, choice);
      banner.style.display = 'none';
      if (modal) modal.style.display = 'none';
    };

    const acceptBtn = $('#cookie-accept');
    const rejectBtn = $('#cookie-reject');
    const manageBtn = $('#cookie-manage');
    const savePrefsBtn = $('#save-prefs');
    const closeModal = $('#close-cookie-modal');

    acceptBtn && acceptBtn.addEventListener('click', () => saveChoice('accepted_all'));
    rejectBtn && rejectBtn.addEventListener('click', () => saveChoice('rejected_all'));

    manageBtn && manageBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'flex';
    });

    closeModal && closeModal.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });

    savePrefsBtn && savePrefsBtn.addEventListener('click', () => {
      const prefs = {
        targeting: $('#pref-targeting')?.checked || false,
        functional: $('#pref-functional')?.checked || false,
        performance: $('#pref-performance')?.checked || false
      };
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
      saveChoice('customized');
    });

    showBannerIfNeeded();
  }

  function initAuthForms() {
    $$('[data-auth-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = $('input[type="email"]', form)?.value?.trim();
        if (!email) return;
        const next = form.getAttribute('data-next') || 'index.html';
        window.location.href = `${next}?email=${encodeURIComponent(email)}`;
      });
    });
  }

  initBillingToggle();
  initTeamSlider();
  initComparisonExpand();
  initFaqAccordion();
  initCookieConsent();
  initAuthForms();
})();
