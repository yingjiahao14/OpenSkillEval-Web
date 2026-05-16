document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Language Dropdown
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('hidden');
  });
  
  document.addEventListener('click', () => {
    langDropdown.classList.add('hidden');
  });

  langDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      langDropdown.querySelectorAll('a').forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      langBtn.innerHTML = `${e.target.textContent} <i class="ri-arrow-down-s-line"></i>`;
      langDropdown.classList.add('hidden');
    });
  });

  // Hero Carousel
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      showSlide(index);
      stopSlideShow();
      startSlideShow();
    });
  });

  startSlideShow();

  // Team Region Toggle
  const regionTabs = document.querySelectorAll('.tab-btn');
  const teamCards = document.querySelectorAll('.team-card');
  const teamCarousel = document.getElementById('team-carousel');

  regionTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // Update active tab
      regionTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      
      const region = e.target.dataset.region;
      
      // Filter cards
      teamCards.forEach(card => {
        if (card.dataset.region === region) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Reset scroll
      teamCarousel.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });

  // Work Carousel Navigation
  const workCarousel = document.getElementById('work-carousel');
  const workPrev = document.getElementById('work-prev');
  const workNext = document.getElementById('work-next');
  
  workPrev.addEventListener('click', () => {
    workCarousel.scrollBy({ left: -400, behavior: 'smooth' });
  });
  
  workNext.addEventListener('click', () => {
    workCarousel.scrollBy({ left: 400, behavior: 'smooth' });
  });

  // Cookie Consent
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('cookie-accept');
  const btnManage = document.getElementById('cookie-manage');
  const btnDecline = document.getElementById('cookie-decline');

  // Check if cookie consent is already given
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1500);
  }

  function hideBanner() {
    cookieBanner.classList.remove('show');
    localStorage.setItem('cookieConsent', 'true');
  }

  btnAccept.addEventListener('click', hideBanner);
  btnManage.addEventListener('click', hideBanner);
  btnDecline.addEventListener('click', hideBanner);
});
