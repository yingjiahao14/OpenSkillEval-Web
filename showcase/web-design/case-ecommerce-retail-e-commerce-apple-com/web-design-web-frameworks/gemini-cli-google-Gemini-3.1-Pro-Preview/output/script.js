document.addEventListener('DOMContentLoaded', () => {
  // Carousels
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = track.querySelector('.card').offsetWidth;
        track.scrollBy({ left: -cardWidth - 20, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = track.querySelector('.card').offsetWidth;
        track.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
      });
    }
  });

  // Tabs
  document.querySelectorAll('.tabs-container').forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        if (contents[index]) {
          contents[index].classList.add('active');
        }
      });
    });
  });

  // Footer Accordion
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.footer-col h3').forEach(header => {
      header.addEventListener('click', () => {
        const col = header.parentElement;
        col.classList.toggle('active');
      });
    });
  }

  // Smooth Scroll for Section Nav
  document.querySelectorAll('.category-nav-list a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = document.querySelector('.category-nav') ? document.querySelector('.category-nav').offsetHeight : 0;
          const globalNavHeight = document.querySelector('.global-nav') ? document.querySelector('.global-nav').offsetHeight : 0;
          const offsetPosition = targetElement.offsetTop - navHeight - globalNavHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });
});
