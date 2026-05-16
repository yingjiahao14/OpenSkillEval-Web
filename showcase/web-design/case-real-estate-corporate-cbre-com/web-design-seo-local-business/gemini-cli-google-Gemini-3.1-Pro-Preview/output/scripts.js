document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Mobile Accordion
  const accordionBtns = document.querySelectorAll('.mobile-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const subnav = btn.nextElementSibling;
      if (subnav) {
        subnav.classList.toggle('active');
        btn.textContent = subnav.classList.contains('active') ? '−' : '+';
      }
    });
  });

  // Tabs for What We Do
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Newsletter form prevention
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for subscribing to Our Take Newsletter!');
    });
  }
});
