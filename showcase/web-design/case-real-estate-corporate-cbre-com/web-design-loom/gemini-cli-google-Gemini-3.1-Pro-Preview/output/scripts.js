document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Mobile Accordion for Mega Menu
  const hasDropdownLinks = document.querySelectorAll('.nav-item.has-dropdown > .nav-link');
  
  hasDropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const megaMenu = link.nextElementSibling;
        if (megaMenu && megaMenu.classList.contains('mega-menu')) {
          megaMenu.classList.toggle('active');
        }
      }
    });
  });

  // What We Do Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }
});
