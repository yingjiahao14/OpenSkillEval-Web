// ClipCast Shared JavaScript

// Mobile nav toggle
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = '#fff';
    links.style.flexDirection = 'column';
    links.style.padding = '16px 24px';
    links.style.borderBottom = '1px solid var(--border)';
    links.style.boxShadow = 'var(--shadow-lg)';
  });
}

// FAQ accordion
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all in same parent
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// Cookie banner
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal');
  if (!banner) return;
  if (localStorage.getItem('cookie-consent')) {
    banner.classList.add('hidden');
  }
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-reject')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'rejected');
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-manage')?.addEventListener('click', () => {
    modal?.classList.add('open');
  });
  document.getElementById('cookie-modal-close')?.addEventListener('click', () => {
    modal?.classList.remove('open');
  });
  document.getElementById('cookie-save')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'custom');
    modal?.classList.remove('open');
    banner.classList.add('hidden');
  });
}

// Pricing toggle
function initPricingToggle() {
  const monthlyBtn = document.getElementById('toggle-monthly');
  const annualBtn = document.getElementById('toggle-annual');
  if (!monthlyBtn || !annualBtn) return;

  const businessPrice = document.getElementById('price-business');
  const businessAIPrice = document.getElementById('price-business-ai');
  const businessNote = document.getElementById('note-business');
  const businessAINote = document.getElementById('note-business-ai');

  function setMonthly() {
    monthlyBtn.classList.add('active');
    annualBtn.classList.remove('active');
    if (businessPrice) businessPrice.textContent = '$18';
    if (businessAIPrice) businessAIPrice.textContent = '$24';
    if (businessNote) businessNote.textContent = 'per user / month';
    if (businessAINote) businessAINote.textContent = 'per user / month';
  }
  function setAnnual() {
    annualBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    if (businessPrice) businessPrice.textContent = '$15';
    if (businessAIPrice) businessAIPrice.textContent = '$20';
    if (businessNote) businessNote.textContent = 'per user / month, billed annually';
    if (businessAINote) businessAINote.textContent = 'per user / month, billed annually';
  }
  monthlyBtn.addEventListener('click', setMonthly);
  annualBtn.addEventListener('click', setAnnual);
}

// Team size slider
function initTeamSlider() {
  const slider = document.getElementById('team-slider');
  const display = document.getElementById('team-size-display');
  if (!slider || !display) return;
  slider.addEventListener('input', () => {
    display.textContent = slider.value + ' people';
  });
}

// Comparison table expand
function initComparisonExpand() {
  document.querySelectorAll('.comparison-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) target.classList.toggle('open');
    });
  });
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFAQ();
  initCookieBanner();
  initPricingToggle();
  initTeamSlider();
  initComparisonExpand();
});
