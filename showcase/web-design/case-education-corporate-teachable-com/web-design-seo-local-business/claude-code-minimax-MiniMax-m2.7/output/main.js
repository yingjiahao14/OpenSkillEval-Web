// LearnForge - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
  initTabSwitch();
  initWhyChooseTabs();
  initTestimonialCarousels();
  initFaqAccordions();
  initDemoAccordions();
  initScrollAnimations();
});

// Tab Switch (Hero)
function initTabSwitch() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
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
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// Testimonial Carousels
function initTestimonialCarousels() {
  const carousels = document.querySelectorAll('.testimonials-wrapper');

  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.testimonials-track');
    const cards = wrapper.querySelectorAll('.testimonial-card');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');

    if (!track || !cards.length) return;

    let currentIndex = 0;
    let cardsToShow = 3;

    function updateCardsToShow() {
      if (window.innerWidth <= 768) {
        cardsToShow = 1;
      } else if (window.innerWidth <= 1024) {
        cardsToShow = 2;
      } else {
        cardsToShow = 3;
      }
    }

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextSlide() {
      updateCardsToShow();
      if (currentIndex < cards.length - cardsToShow) {
        currentIndex++;
        updateCarousel();
      }
    }

    function prevSlide() {
      updateCardsToShow();
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    window.addEventListener('resize', () => {
      updateCardsToShow();
      currentIndex = Math.min(currentIndex, cards.length - cardsToShow);
      updateCarousel();
    });

    updateCardsToShow();
  });
}

// FAQ Accordions
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Demo Accordions (Online Courses page)
function initDemoAccordions() {
  const demoItems = document.querySelectorAll('.demo-item');

  demoItems.forEach(item => {
    const header = item.querySelector('.demo-header');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.demo-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
}

// Mobile Navigation Toggle
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}
