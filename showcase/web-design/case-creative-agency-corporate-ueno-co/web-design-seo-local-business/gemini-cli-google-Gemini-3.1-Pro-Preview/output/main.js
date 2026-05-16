document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Duplicate marquee content for seamless scrolling
  const marquees = document.querySelectorAll('.marquee-content');
  marquees.forEach(marquee => {
    const children = Array.from(marquee.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      marquee.appendChild(clone);
    });
  });
});
