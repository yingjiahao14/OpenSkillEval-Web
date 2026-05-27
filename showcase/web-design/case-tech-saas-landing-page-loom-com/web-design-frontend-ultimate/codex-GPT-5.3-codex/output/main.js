const nav = `
<div class="nav-wrap">
  <div class="container nav">
    <a class="brand" href="index.html"><span class="brand-badge"></span>ClipCast</a>
    <div class="nav-links">
      <a href="enterprise.html">Enterprise</a>
      <a href="pricing.html">Pricing</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
    </div>
    <div class="nav-cta">
      <a class="btn btn-ghost" href="login.html">Login</a>
      <a class="btn btn-primary" href="signup.html">Get Started for free</a>
    </div>
  </div>
</div>`;

document.querySelectorAll('[data-nav]').forEach((node) => { node.innerHTML = nav; });

const page = document.body.dataset.page;

if (page === 'home') {
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  const consent = localStorage.getItem('clipcast_cookie_consent');
  if (!consent) banner.classList.add('show');

  const saveAndHide = (value) => {
    localStorage.setItem('clipcast_cookie_consent', value);
    banner.classList.remove('show');
    modal.classList.remove('show');
  };

  document.getElementById('acceptCookies')?.addEventListener('click', () => saveAndHide('accepted'));
  document.getElementById('rejectCookies')?.addEventListener('click', () => saveAndHide('rejected'));
  document.getElementById('openPrefs')?.addEventListener('click', () => modal.classList.add('show'));
  document.getElementById('closePrefs')?.addEventListener('click', () => modal.classList.remove('show'));
  document.getElementById('savePrefs')?.addEventListener('click', () => {
    const prefs = {
      targeting: document.getElementById('targeting').classList.contains('on'),
      functional: document.getElementById('functional').classList.contains('on'),
      performance: document.getElementById('performance').classList.contains('on')
    };
    localStorage.setItem('clipcast_cookie_prefs', JSON.stringify(prefs));
    saveAndHide('custom');
  });

  document.querySelectorAll('.switch').forEach((sw) => {
    sw.addEventListener('click', () => sw.classList.toggle('on'));
  });
}

if (page === 'pricing') {
  const monthlyBtn = document.getElementById('billMonthly');
  const annualBtn = document.getElementById('billAnnual');
  const slider = document.getElementById('teamSize');
  const teamCount = document.getElementById('teamCount');
  const reco = document.getElementById('teamReco');

  const prices = {
    starter: { m: '$0', a: '$0' },
    business: { m: '$18', a: '$15' },
    ai: { m: '$24', a: '$20' },
    enterprise: { m: 'Custom', a: 'Custom' }
  };

  let billing = 'm';
  const updatePrices = () => {
    document.getElementById('pStarter').textContent = prices.starter[billing];
    document.getElementById('pBusiness').textContent = prices.business[billing];
    document.getElementById('pAI').textContent = prices.ai[billing];
    document.getElementById('pEnterprise').textContent = prices.enterprise[billing];
    document.querySelectorAll('.billingLabel').forEach((el) => {
      el.textContent = billing === 'm' ? 'per user / month' : 'per user / month (annual billing)';
    });
  };

  monthlyBtn?.addEventListener('click', () => {
    billing = 'm';
    monthlyBtn.classList.add('active');
    annualBtn.classList.remove('active');
    updatePrices();
  });
  annualBtn?.addEventListener('click', () => {
    billing = 'a';
    annualBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    updatePrices();
  });

  slider?.addEventListener('input', () => {
    const size = Number(slider.value);
    teamCount.textContent = size;
    if (size <= 5) reco.textContent = 'Recommended: Starter for individuals getting started.';
    else if (size <= 50) reco.textContent = 'Recommended: Business for growing teams.';
    else if (size <= 200) reco.textContent = 'Recommended: Business + AI for high-volume collaboration.';
    else reco.textContent = 'Recommended: Enterprise for scale, security, and governance.';
  });

  document.querySelectorAll('[data-expand]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.expand);
      target.classList.toggle('open');
      button.textContent = target.classList.contains('open') ? 'Hide features' : 'See all features';
    });
  });

  document.querySelectorAll('.acc-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      panel.classList.toggle('open');
    });
  });

  updatePrices();
}

if (page === 'login' || page === 'signup') {
  document.getElementById('authForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('workEmail')?.value || '';
    const target = page === 'login' ? 'email-based authentication flow' : 'account creation flow';
    alert(`Continuing to ${target} for: ${email}`);
  });
}
