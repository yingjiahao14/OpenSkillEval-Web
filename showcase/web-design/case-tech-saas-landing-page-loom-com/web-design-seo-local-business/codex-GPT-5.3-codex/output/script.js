(() => {
  const q = (s, c = document) => c.querySelector(s);
  const qa = (s, c = document) => [...c.querySelectorAll(s)];

  const cookieBanner = q('#cookie-banner');
  const cookieModal = q('#cookie-modal');
  const setCookiePref = (value) => localStorage.setItem('clipcast_cookie_pref', JSON.stringify(value));
  const getCookiePref = () => {
    try { return JSON.parse(localStorage.getItem('clipcast_cookie_pref')); } catch { return null; }
  };
  if (cookieBanner) {
    const saved = getCookiePref();
    if (saved) cookieBanner.classList.add('hidden');
    q('#accept-cookies')?.addEventListener('click', () => { setCookiePref({ all: 'accepted' }); cookieBanner.classList.add('hidden'); });
    q('#reject-cookies')?.addEventListener('click', () => { setCookiePref({ all: 'rejected' }); cookieBanner.classList.add('hidden'); });
    q('#manage-cookies')?.addEventListener('click', () => cookieModal?.classList.remove('hidden'));
    q('#close-cookie-modal')?.addEventListener('click', () => cookieModal?.classList.add('hidden'));
    q('#save-cookie-prefs')?.addEventListener('click', () => {
      setCookiePref({
        targeting: q('#cookie-targeting')?.checked || false,
        functional: q('#cookie-functional')?.checked || false,
        performance: q('#cookie-performance')?.checked || false
      });
      cookieModal?.classList.add('hidden');
      cookieBanner.classList.add('hidden');
    });
  }

  const monthlyBtn = q('#monthly-btn');
  const annualBtn = q('#annual-btn');
  const priceEls = qa('.price[data-monthly]');
  const updatePrices = (isAnnual) => {
    priceEls.forEach((el) => {
      const monthly = el.getAttribute('data-monthly');
      const annual = el.getAttribute('data-annual');
      const value = isAnnual ? annual : monthly;
      if (value === '0') el.textContent = '$0';
      else el.textContent = `$${value} per user / month`;
    });
  };
  monthlyBtn?.addEventListener('click', () => { monthlyBtn.classList.add('active'); annualBtn?.classList.remove('active'); updatePrices(false); });
  annualBtn?.addEventListener('click', () => { annualBtn.classList.add('active'); monthlyBtn?.classList.remove('active'); updatePrices(true); });

  const teamSlider = q('#team-size');
  const teamValue = q('#team-size-value');
  const reco = q('#plan-reco');
  const recommendPlan = (size) => {
    if (!reco) return;
    if (size <= 5) reco.textContent = 'Recommended plan: Starter';
    else if (size <= 50) reco.textContent = 'Recommended plan: Business';
    else if (size <= 200) reco.textContent = 'Recommended plan: Business + AI';
    else reco.textContent = 'Recommended plan: Enterprise';
  };
  teamSlider?.addEventListener('input', (e) => {
    const size = Number(e.target.value);
    if (teamValue) teamValue.textContent = String(size);
    recommendPlan(size);
  });

  qa('.expand-features').forEach((btn) => btn.addEventListener('click', () => {
    const list = btn.parentElement?.querySelector('.feature-list');
    if (!list) return;
    list.classList.toggle('hidden');
    btn.textContent = list.classList.contains('hidden') ? 'See all features' : 'Hide features';
  }));

  qa('.faq-q').forEach((btn) => btn.addEventListener('click', () => {
    const answer = btn.parentElement?.querySelector('.faq-a');
    answer?.classList.toggle('hidden');
  }));

  q('#login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = q('#login-email')?.value?.trim();
    if (email) window.location.href = `login.html?email=${encodeURIComponent(email)}&flow=email`;
  });

  q('#signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = q('#signup-email')?.value?.trim();
    if (email) window.location.href = `signup.html?email=${encodeURIComponent(email)}&flow=create`;
  });
})();
