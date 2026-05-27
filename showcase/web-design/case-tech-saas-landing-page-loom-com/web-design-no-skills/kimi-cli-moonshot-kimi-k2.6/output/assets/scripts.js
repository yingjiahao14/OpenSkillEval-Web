// ClipCast — Global Scripts

/* Cookie Banner */
(function () {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  const prefs = JSON.parse(localStorage.getItem('cookiePrefs') || 'null');
  if (prefs) banner.classList.add('hidden');

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookiePrefs', JSON.stringify({ targeting: true, functional: true, performance: true }));
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-reject')?.addEventListener('click', () => {
    localStorage.setItem('cookiePrefs', JSON.stringify({ targeting: false, functional: false, performance: false }));
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-manage')?.addEventListener('click', () => {
    document.getElementById('cookie-modal')?.classList.add('open');
  });
  document.getElementById('cookie-modal-close')?.addEventListener('click', () => {
    document.getElementById('cookie-modal')?.classList.remove('open');
  });
  document.getElementById('cookie-modal-save')?.addEventListener('click', () => {
    const targeting = document.getElementById('toggle-targeting')?.checked ?? false;
    const functional = document.getElementById('toggle-functional')?.checked ?? false;
    const performance = document.getElementById('toggle-performance')?.checked ?? false;
    localStorage.setItem('cookiePrefs', JSON.stringify({ targeting, functional, performance }));
    document.getElementById('cookie-modal')?.classList.remove('open');
    banner.classList.add('hidden');
  });
})();

/* FAQ Accordion */
(function () {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();

/* Pricing Toggle */
(function () {
  const monthlyBtn = document.getElementById('toggle-monthly');
  const annualBtn = document.getElementById('toggle-annual');
  if (!monthlyBtn || !annualBtn) return;

  const prices = {
    business: { monthly: 18, annual: 15 },
    business_ai: { monthly: 24, annual: 20 },
  };

  function setAnnual(isAnnual) {
    monthlyBtn.classList.toggle('active', !isAnnual);
    annualBtn.classList.toggle('active', isAnnual);
    document.getElementById('price-business')?.textContent = '$' + (isAnnual ? prices.business.annual : prices.business.monthly);
    document.getElementById('price-business-ai')?.textContent = '$' + (isAnnual ? prices.business_ai.annual : prices.business_ai.monthly);
    document.getElementById('period-business')?.textContent = isAnnual ? '/user/mo, billed annually' : '/user/mo';
    document.getElementById('period-business-ai')?.textContent = isAnnual ? '/user/mo, billed annually' : '/user/mo';
  }

  monthlyBtn.addEventListener('click', () => setAnnual(false));
  annualBtn.addEventListener('click', () => setAnnual(true));
})();

/* Team Size Slider */
(function () {
  const slider = document.getElementById('team-slider');
  const label = document.getElementById('team-label');
  if (!slider || !label) return;
  slider.addEventListener('input', () => {
    const v = parseInt(slider.value, 10);
    label.textContent = v + (v === 1 ? ' person' : ' people');
  });
})();

/* Comparison Table Expand */
(function () {
  document.querySelectorAll('[data-expand]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.expand);
      if (!target) return;
      const isHidden = target.hidden;
      target.hidden = !isHidden;
      btn.textContent = isHidden ? 'Show less' : 'See all features';
    });
  });
})();

/* Mobile nav */
(function () {
  const toggle = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-nav');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
  });
})();
