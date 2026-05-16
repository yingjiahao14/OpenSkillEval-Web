document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Accordions
  const accordions = document.querySelectorAll('.accordion-trigger');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const content = acc.nextElementSibling;
      const icon = acc.querySelector('.accordion-icon');
      const isOpen = content.getAttribute('data-state') === 'open';
      
      const parent = acc.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-content').forEach(c => {
          c.setAttribute('data-state', 'closed');
        });
        parent.querySelectorAll('.accordion-icon').forEach(i => {
          i.style.transform = 'rotate(0deg)';
        });
      }

      if (!isOpen) {
        content.setAttribute('data-state', 'open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        content.setAttribute('data-state', 'closed');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });

  // Tabs
  const tabGroups = document.querySelectorAll('.tab-group');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const contents = group.querySelectorAll('.tab-content');
    
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Remove active from all
        buttons.forEach(b => {
          b.classList.remove('bg-brand-900', 'text-white', 'border-brand-900');
          b.classList.add('text-slate-500', 'border-transparent', 'hover:text-slate-700', 'hover:border-slate-300');
        });
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active to current
        btn.classList.add('bg-brand-900', 'text-white', 'border-brand-900');
        btn.classList.remove('text-slate-500', 'border-transparent', 'hover:text-slate-700', 'hover:border-slate-300');
        if (contents[index]) contents[index].classList.add('active');
      });
    });
  });

  // Special Tabs (like images switching)
  const imageTabGroups = document.querySelectorAll('.image-tab-group');
  imageTabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.img-tab-btn');
    const images = group.querySelectorAll('.img-tab-content');
    
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('bg-white', 'shadow-subtle', 'text-brand-900');
          b.classList.add('text-slate-500', 'hover:text-slate-700');
        });
        images.forEach(img => img.classList.add('hidden'));
        
        btn.classList.add('bg-white', 'shadow-subtle', 'text-brand-900');
        btn.classList.remove('text-slate-500', 'hover:text-slate-700');
        if (images[index]) images[index].classList.remove('hidden');
      });
    });
  });

  // Simple Carousel
  const carousels = document.querySelectorAll('.carousel-widget');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (!track) return;
    
    const slides = Array.from(track.children);
    let currentIndex = 0;
    
    const getVisibleSlides = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };
    
    const updateCarousel = () => {
      const visible = getVisibleSlides();
      const maxIndex = slides.length - visible;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      
      const slideWidth = 100 / visible;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex -= 1;
        } else {
          currentIndex = slides.length - getVisibleSlides();
        }
        updateCarousel();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const visible = getVisibleSlides();
        if (currentIndex < slides.length - visible) {
          currentIndex += 1;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      });
    }
    
    window.addEventListener('resize', updateCarousel);
  });
});
