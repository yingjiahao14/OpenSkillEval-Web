// LearnForge Corporate Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize navbar scroll effect
  initNavbar();

  // Initialize tab switches
  initTabSwitches();

  // Initialize feature tabs
  initFeatureTabs();

  // Initialize testimonial carousels
  initTestimonialCarousels();

  // Initialize FAQ accordions
  initFaqAccordions();

  // Initialize product demo accordion
  initProductDemo();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Tab switch functionality (Creator view vs Student view)
function initTabSwitches() {
  const tabContainers = document.querySelectorAll('.hero-tabs');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.hero-tab');
    const previewCreator = document.querySelector('.preview-creator');
    const previewStudent = document.querySelector('.preview-student');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        if (this.dataset.view === 'creator' && previewCreator && previewStudent) {
          previewCreator.style.display = 'block';
          previewStudent.style.display = 'none';
        } else if (this.dataset.view === 'student' && previewCreator && previewStudent) {
          previewCreator.style.display = 'none';
          previewStudent.style.display = 'block';
        }
      });
    });
  });
}

// Feature tabs (Why Choose Us section)
function initFeatureTabs() {
  const tabContainers = document.querySelectorAll('.features-tabs');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.feature-tab');
    const panels = document.querySelectorAll('.feature-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const target = this.dataset.tab;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Update active panel
        panels.forEach(panel => {
          if (panel.id === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });
}

// Testimonial carousels
function initTestimonialCarousels() {
  const carousels = document.querySelectorAll('.testimonials-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.btn-prev');
    const nextBtn = carousel.querySelector('.btn-next');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth + 24; // Including gap
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextSlide() {
      const maxIndex = cards.length - cardsPerView;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function prevSlide() {
      const maxIndex = cards.length - cardsPerView;
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Handle resize
    window.addEventListener('resize', function() {
      cardsPerView = getCardsPerView();
      currentIndex = Math.min(currentIndex, cards.length - cardsPerView);
      updateCarousel();
    });

    // Auto-advance
    setInterval(nextSlide, 5000);
  });
}

// FAQ accordions
function initFaqAccordions() {
  const faqLists = document.querySelectorAll('.faq-list');

  faqLists.forEach(faqList => {
    const items = faqList.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');

        // Close all items in this FAQ list
        items.forEach(i => i.classList.remove('active'));

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  });
}

// Product demo accordion (Online Courses page)
function initProductDemo() {
  const demoSections = document.querySelectorAll('.product-demo-accordion');

  demoSections.forEach(section => {
    const header = section.querySelector('.demo-header');

    if (!header) return;

    header.addEventListener('click', function() {
      section.classList.toggle('active');
    });
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
