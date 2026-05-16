// ── Mobile menu toggle ──
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const isOpen = mobileNav.classList.contains('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// ── Footer accordion (mobile) ──
document.querySelectorAll('[data-accordion]').forEach(heading => {
  heading.addEventListener('click', () => {
    const links = heading.nextElementSibling;
    if (!links) return;
    const isOpen = links.classList.toggle('open');
    const icon = heading.querySelector('.accordion-icon');
    if (icon) icon.textContent = isOpen ? '−' : '+';
  });
});

// ── Active nav link ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
    link.classList.add('active');
  }
});
