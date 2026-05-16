document.addEventListener('DOMContentLoaded', () => {
  // Carousels
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => {
    const wrapper = container.querySelector('.carousel-wrapper');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    if (!wrapper || !prevBtn || !nextBtn) return;

    const scrollAmount = 340; // width + gap

    const updateBtns = () => {
      prevBtn.disabled = wrapper.scrollLeft <= 0;
      nextBtn.disabled = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 1;
    };

    wrapper.addEventListener('scroll', updateBtns);
    window.addEventListener('resize', updateBtns);
    // Initial check requires slight delay sometimes
    setTimeout(updateBtns, 100);

    prevBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  // Entertainment Tabs
  const tabBtns = document.querySelectorAll('.ent-tab');
  const tabContents = document.querySelectorAll('.ent-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // Footer Accordion
  const footerCols = document.querySelectorAll('.footer-col h3');
  footerCols.forEach(col => {
    col.addEventListener('click', () => {
      if (window.innerWidth <= 767) {
        col.parentElement.classList.toggle('open');
      }
    });
  });

  // Smooth scroll for category section nav
  const categoryLinks = document.querySelectorAll('.category-nav a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navHeight = document.querySelector('.nav-global').offsetHeight + document.querySelector('.category-nav').offsetHeight;
        window.scrollTo({
          top: targetEl.offsetTop - navHeight,
          behavior: 'smooth'
        });
        
        // Update active class
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
});
