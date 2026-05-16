document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isExpanded = mobileNav.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.innerHTML = isExpanded ? '✕' : '☰';
    });
  }

  // Mobile Accordion
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSub = document.getElementById(targetId);
      
      if (targetSub) {
        const isActive = targetSub.classList.contains('active');
        
        // Close others (optional)
        // document.querySelectorAll('.mobile-nav-sub').forEach(sub => sub.classList.remove('active'));
        // document.querySelectorAll('.mobile-nav-btn').forEach(b => b.innerHTML = b.innerHTML.replace('−', '+'));

        if (isActive) {
          targetSub.classList.remove('active');
          btn.innerHTML = btn.innerHTML.replace('−', '+');
        } else {
          targetSub.classList.add('active');
          btn.innerHTML = btn.innerHTML.replace('+', '−');
        }
      }
    });
  });

  // What We Do Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Set current year in footer
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
