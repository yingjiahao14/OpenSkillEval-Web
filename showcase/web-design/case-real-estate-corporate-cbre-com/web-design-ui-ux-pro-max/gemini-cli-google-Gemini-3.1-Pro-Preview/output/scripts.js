document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

  // Mobile Accordion
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const subMenu = link.nextElementSibling;
      if (subMenu && subMenu.classList.contains('mobile-nav-sub')) {
        e.preventDefault();
        subMenu.classList.toggle('active');
        const icon = link.querySelector('svg');
        if (icon) {
          icon.style.transform = subMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
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
        const targetId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and target content
        btn.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }

  // Newsletter Subscribe
  const subscribeBtn = document.getElementById('subscribe-btn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Our Take Newsletter!');
    });
  }

  // Invest Carousel
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const carouselTrack = document.getElementById('carousel-track');
  
  if (prevBtn && nextBtn && carouselTrack) {
    let scrollPos = 0;
    nextBtn.addEventListener('click', () => {
      const itemWidth = carouselTrack.children[0].offsetWidth + 32; // Include gap
      scrollPos += itemWidth;
      if (scrollPos >= carouselTrack.scrollWidth - carouselTrack.clientWidth) {
        scrollPos = carouselTrack.scrollWidth - carouselTrack.clientWidth;
      }
      carouselTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
      const itemWidth = carouselTrack.children[0].offsetWidth + 32; // Include gap
      scrollPos -= itemWidth;
      if (scrollPos < 0) scrollPos = 0;
      carouselTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
    });
  }
});
