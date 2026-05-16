document.addEventListener('DOMContentLoaded', () => {
  // Carousels
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => {
    const track = container.querySelector('.carousel-track-wrapper');
    const prevBtn = container.querySelector('.carousel-nav.prev');
    const nextBtn = container.querySelector('.carousel-nav.next');

    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });

  // Entertainment Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Footer Accordion (Mobile)
  const footerCols = document.querySelectorAll('.footer-col h3');
  footerCols.forEach(colHeader => {
    colHeader.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const parent = colHeader.parentElement;
        parent.classList.toggle('active');
      }
    });
  });

  // Sticky Category Nav Smooth Scroll
  const categoryLinks = document.querySelectorAll('.category-nav-list a[href^="#"]');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector('.category-nav').offsetHeight + document.querySelector('.global-nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active class
        categoryLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
});
