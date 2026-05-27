(function(){
  const page = document.body.dataset.page;

  if (page === 'home') {
    const banner = document.getElementById('cookieBanner');
    const modal = document.getElementById('cookieModal');
    const saved = localStorage.getItem('clipcast_cookie_choice');
    if (!saved) banner.classList.add('active');

    const setChoice = (choice, prefs) => {
      localStorage.setItem('clipcast_cookie_choice', choice);
      if (prefs) localStorage.setItem('clipcast_cookie_prefs', JSON.stringify(prefs));
      banner.classList.remove('active');
      modal.classList.remove('open');
    };

    document.getElementById('acceptCookies')?.addEventListener('click', () => setChoice('accept_all', {targeting:true,functional:true,performance:true}));
    document.getElementById('rejectCookies')?.addEventListener('click', () => setChoice('reject_all', {targeting:false,functional:false,performance:false}));
    document.getElementById('manageCookies')?.addEventListener('click', () => modal.classList.add('open'));
    document.getElementById('closeCookieModal')?.addEventListener('click', () => modal.classList.remove('open'));
    document.getElementById('saveCookiePrefs')?.addEventListener('click', () => {
      const prefs = {
        targeting: document.querySelector('[data-cookie="targeting"]').classList.contains('on'),
        functional: document.querySelector('[data-cookie="functional"]').classList.contains('on'),
        performance: document.querySelector('[data-cookie="performance"]').classList.contains('on')
      };
      setChoice('custom', prefs);
    });

    document.querySelectorAll('.switch[data-cookie]').forEach(sw => {
      sw.addEventListener('click', () => sw.classList.toggle('on'));
    });
  }

  if (page === 'pricing') {
    const prices = {
      monthly: {business:18, ai:24},
      annual: {business:15, ai:20}
    };
    let cycle = 'monthly';

    const businessPrice = document.getElementById('businessPrice');
    const aiPrice = document.getElementById('aiPrice');
    const cycleLabel = document.querySelectorAll('[data-cycle-label]');
    const saveBadge = document.getElementById('saveBadge');
    const toggleButtons = document.querySelectorAll('[data-billing]');

    const teamSlider = document.getElementById('teamSize');
    const teamCount = document.getElementById('teamCount');
    const teamNote = document.getElementById('teamRecommendation');
    const businessTotal = document.getElementById('businessTotal');
    const aiTotal = document.getElementById('aiTotal');

    function updatePrices() {
      businessPrice.textContent = '$' + prices[cycle].business;
      aiPrice.textContent = '$' + prices[cycle].ai;
      cycleLabel.forEach(el => el.textContent = cycle === 'monthly' ? '/user/mo' : '/user/mo billed annually');
      saveBadge.style.display = cycle === 'annual' ? 'inline-block' : 'none';
      updateTeamCalc();
    }

    function updateTeamCalc(){
      const size = Number(teamSlider.value);
      const bTotal = size * prices[cycle].business;
      const aTotal = size * prices[cycle].ai;
      teamCount.textContent = size;
      businessTotal.textContent = '$' + bTotal + '/mo';
      aiTotal.textContent = '$' + aTotal + '/mo';
      teamNote.textContent = size < 8 ? 'Recommended: Business for growing teams.' : (size < 25 ? 'Recommended: Business + AI for high-output teams.' : 'Recommended: Enterprise plan for advanced controls and support.');
    }

    toggleButtons.forEach(btn => btn.addEventListener('click', () => {
      toggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cycle = btn.dataset.billing;
      updatePrices();
    }));
    teamSlider?.addEventListener('input', updateTeamCalc);
    updatePrices();

    document.querySelectorAll('[data-expand]').forEach(btn => {
      btn.addEventListener('click', () => {
        const list = document.getElementById(btn.dataset.expand);
        const expanded = list.style.display === 'block';
        list.style.display = expanded ? 'none' : 'block';
        btn.textContent = expanded ? 'See all features' : 'Hide features';
      });
    });

    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
    });
  }

  if (page === 'login' || page === 'signup') {
    const form = document.querySelector('form[data-auth]');
    form?.addEventListener('submit', function(e){
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      const endpoint = page === 'login' ? 'email-based authentication flow' : 'account creation flow';
      alert('Proceeding to ' + endpoint + ' for ' + email);
    });
  }
})();
