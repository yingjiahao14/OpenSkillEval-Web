document.addEventListener('DOMContentLoaded', () => {
  // 1. Carousels
  const carousels = document.querySelectorAll('.carousel-section');
  carousels.forEach(section => {
    const container = section.querySelector('.carousel-container');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    if (container && prevBtn && nextBtn) {
      const scrollAmount = 340; // card width + gap

      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      // Update button state based on scroll position
      const updateButtons = () => {
        prevBtn.disabled = container.scrollLeft <= 0;
        nextBtn.disabled = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 10);
      };

      container.addEventListener('scroll', updateButtons);
      window.addEventListener('resize', updateButtons);
      updateButtons();
    }
  });

  // 2. Footer Accordion
  const footerCols = document.querySelectorAll('.footer-col h4');
  footerCols.forEach(header => {
    header.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        const parent = header.parentElement;
        parent.classList.toggle('active');
        const arrow = header.querySelector('.arrow');
        if (arrow) {
          arrow.textContent = parent.classList.contains('active') ? '−' : '+';
        }
      }
    });
  });

  // 3. Entertainment Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 4. Smooth scrolling for section navs
  const sectionNavLinks = document.querySelectorAll('.section-nav-links a');
  sectionNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navHeight = document.querySelector('.global-nav').offsetHeight;
        const sectionNavHeight = document.querySelector('.section-nav').offsetHeight;
        const offset = targetEl.offsetTop - navHeight - sectionNavHeight;
        
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    });
  });
});
