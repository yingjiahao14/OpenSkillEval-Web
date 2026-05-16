/* script.js */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('menu-open');
      navMobile.classList.toggle('active');
      
      if (navMobile.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Clone marquee content for smooth infinite scrolling
  const marqueeRows = document.querySelectorAll('.marquee-row');
  marqueeRows.forEach(row => {
    const content = row.querySelector('.marquee-content');
    if (content) {
      // Clone it to make it twice as long for continuous looping
      const clone = content.cloneNode(true);
      row.appendChild(clone);
    }
  });
});
