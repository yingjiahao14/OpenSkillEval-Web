// shared.js — RedRoom Fitness

// Nav mobile toggle
(function() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('menu-open');
    const isOpen = nav.classList.contains('menu-open');
    toggle.setAttribute('aria-expanded', isOpen);
    const links = nav.querySelector('.nav-links');
    if (links) {
      nav.style.setProperty('--menu-height', links.offsetHeight + 'px');
    }
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) nav.classList.remove('menu-open');
  });
})();

// Active nav link highlight
(function() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// Country selector
(function() {
  const btn = document.getElementById('countrySelectorBtn');
  const dropdown = document.getElementById('countryDropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isHidden = dropdown.hidden;
    dropdown.hidden = !isHidden;
    btn.setAttribute('aria-expanded', String(isHidden));
  });

  dropdown.querySelectorAll('.country-option').forEach(opt => {
    opt.addEventListener('click', e => {
      e.preventDefault();
      dropdown.querySelectorAll('.country-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      btn.childNodes[0].textContent = opt.textContent + ' ';
      dropdown.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!btn.contains(e.target)) {
      dropdown.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Newsletter validation (shared helper)
function initNewsletter(formId, emailId, msgId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById(emailId);
    const msg = document.getElementById(msgId);
    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    emailInput.classList.remove('error');
    msg.className = 'newsletter-msg';
    if (!valid) {
      emailInput.classList.add('error');
      msg.textContent = 'Please enter a valid email address.';
      msg.classList.add('error');
      return;
    }
    msg.textContent = "You're in! Welcome to the RedRoom community.";
    msg.classList.add('success');
    emailInput.value = '';
  });
}
