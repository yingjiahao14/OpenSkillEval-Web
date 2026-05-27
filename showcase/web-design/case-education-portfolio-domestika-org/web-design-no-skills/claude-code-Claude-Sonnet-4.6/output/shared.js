// shared.js — CreativeHub shared interactions

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// Footer accordion (mobile)
document.querySelectorAll('.footer-heading.accordion-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    if (!content) return;
    const isOpen = content.classList.contains('open');
    // Close all
    document.querySelectorAll('.footer-links.accordion-content').forEach(c => c.classList.remove('open'));
    document.querySelectorAll('.footer-heading.accordion-toggle').forEach(b => b.classList.remove('open'));
    if (!isOpen) {
      content.classList.add('open');
      btn.classList.add('open');
    }
  });
});

// Active nav highlight
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || (path === 'index.html' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
})();
