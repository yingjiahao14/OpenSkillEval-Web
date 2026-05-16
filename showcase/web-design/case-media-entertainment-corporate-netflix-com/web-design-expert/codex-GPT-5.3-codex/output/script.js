(function () {
  const carousel = document.getElementById('trendingCarousel');
  const nextBtn = document.getElementById('nextTrend');
  const prevBtn = document.getElementById('prevTrend');

  if (carousel && nextBtn && prevBtn) {
    const moveBy = () => Math.min(360, Math.floor(carousel.clientWidth * 0.9));
    nextBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: moveBy(), behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', function () {
      carousel.scrollBy({ left: -moveBy(), behavior: 'smooth' });
    });
  }

  const faqList = document.getElementById('faqList');
  if (faqList) {
    const items = Array.from(faqList.querySelectorAll('.faq-item'));
    faqList.addEventListener('click', function (event) {
      const button = event.target.closest('.faq-q');
      if (!button) return;

      const current = button.closest('.faq-item');
      items.forEach(function (item) {
        const isActive = item === current && !item.classList.contains('active');
        item.classList.toggle('active', isActive);
        const q = item.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', String(isActive));
      });
    });
  }

  document.querySelectorAll('.email-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) {
        if (input) input.focus();
        return;
      }
      alert('Thanks! We\'ll use ' + input.value.trim() + ' to get you started.');
      form.reset();
    });
  });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }
      alert('Sign-in request submitted.');
      loginForm.reset();
    });
  }

  const helpToggle = document.getElementById('helpToggle');
  const helpPanel = document.getElementById('helpPanel');
  if (helpToggle && helpPanel) {
    helpToggle.addEventListener('click', function () {
      const isOpen = helpPanel.classList.toggle('open');
      helpToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
})();
