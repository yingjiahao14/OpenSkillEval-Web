document.addEventListener('DOMContentLoaded', () => {
  // Carousels
  const carousels = document.querySelectorAll('.carousel-section');
  carousels.forEach(section => {
    const container = section.querySelector('.carousel-container');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    if (container && prevBtn && nextBtn) {
      const scrollAmount = 350;

      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

      // Add active to current
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Footer Accordion (Mobile)
  const footerHeadings = document.querySelectorAll('.footer-column h3');
  footerHeadings.forEach(heading => {
    heading.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        heading.classList.toggle('active');
      }
    });
  });

  // Sticky Nav Smooth Scroll
  const stickyLinks = document.querySelectorAll('.sticky-nav a');
  stickyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        // adjust for nav height + sticky nav height
        const y = targetEl.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});