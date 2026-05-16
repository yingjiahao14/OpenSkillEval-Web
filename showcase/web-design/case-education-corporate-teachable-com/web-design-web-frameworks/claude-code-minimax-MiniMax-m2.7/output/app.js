// LearnForge - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  initTabSwitch();
  initWhyChooseTabs();
  initTestimonialCarousels();
  initFaqAccordions();
  initDemoAccordions();
  initCarouselControls();
});

// Tab Switch (Homepage Hero)
function initTabSwitch() {
  const tabBtns = document.querySelectorAll('.tab-switch-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Why Choose Us Tabs
function initWhyChooseTabs() {
  const tabs = document.querySelectorAll('.why-tab');
  const contents = document.querySelectorAll('.why-content');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Testimonial Carousels
function initTestimonialCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (!track || !cards.length) return;

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24; // Including margin
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    function getVisibleCards() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      const offset = currentIndex * cardWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }

    function goToPrev() {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    }

    function goToNext() {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);

    // Handle resize
    window.addEventListener('resize', () => {
      const newVisible = getVisibleCards();
      const newMaxIndex = Math.max(0, cards.length - newVisible);
      currentIndex = Math.min(currentIndex, newMaxIndex);
      updateCarousel();
    });
  });
}

// FAQ Accordions
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));

      // Open clicked if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Demo Accordions (Online Courses)
function initDemoAccordions() {
  const demoItems = document.querySelectorAll('.demo-item');

  demoItems.forEach(item => {
    const header = item.querySelector('.demo-header');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      demoItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Generic Carousel Controls
function initCarouselControls() {
  document.querySelectorAll('[data-carousel-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const carouselId = btn.dataset.carouselPrev;
      const carousel = document.getElementById(carouselId);
      if (carousel) {
        carousel.dispatchEvent(new CustomEvent('carousel:prev'));
      }
    });
  });

  document.querySelectorAll('[data-carousel-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const carouselId = btn.dataset.carouselNext;
      const carousel = document.getElementById(carouselId);
      if (carousel) {
        carousel.dispatchEvent(new CustomEvent('carousel:next'));
      }
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
