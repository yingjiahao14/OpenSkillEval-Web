document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
  }
});