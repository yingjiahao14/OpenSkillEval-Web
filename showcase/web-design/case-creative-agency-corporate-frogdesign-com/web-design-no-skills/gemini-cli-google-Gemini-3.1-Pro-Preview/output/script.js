document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // 2. Language Selector Dropdown
  const langBtn = document.querySelector('.lang-btn');
  const langMenu = document.querySelector('.lang-menu');
  const langOptions = document.querySelectorAll('.lang-menu a');
  
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      langMenu.classList.toggle('show');
      const expanded = langBtn.getAttribute('aria-expanded') === 'true' || false;
      langBtn.setAttribute('aria-expanded', !expanded);
    });

    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = e.target.textContent;
        langBtn.innerHTML = `${selectedLang} <span class="arrow">▼</span>`;
        langMenu.classList.remove('show');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('show');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Hero Carousel
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (slides.length > 0) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
      });
    });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
    }
    
    resetInterval();
  }

  // 4. Team Region Toggle & Carousel
  const teamData = {
    na: [
      {
        name: "Denice Alvarez",
        title: "Office Manager",
        office: "New York",
        quote: "As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers.",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
      },
      {
        name: "Marco Bellini",
        title: "Design Director",
        office: "San Francisco",
        quote: "Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make.",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
      }
    ],
    asia: [
      {
        name: "Priya Mehta",
        title: "Studio Head",
        office: "Bangalore",
        quote: "We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm.",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
      },
      {
        name: "Thierry Lam",
        title: "Design Lead",
        office: "Singapore",
        quote: "Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
      }
    ],
    europe: [
      {
        name: "Gavin Hartley",
        title: "Managing Director",
        office: "London",
        quote: "It's my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
      },
      {
        name: "Francesca Terzi",
        title: "Design Director",
        office: "Munich",
        quote: "At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life.",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
      }
    ],
    oceania: [
      {
        name: "Jacintha Soo Ho",
        title: "Senior Manager, CX Transformation",
        office: "Melbourne",
        quote: "I love helping clients see beyond their assumptions and showing them opportunities they haven't thought of before.",
        photo: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=200&h=200"
      }
    ]
  };

  const teamCarousel = document.getElementById('team-carousel');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const teamPrev = document.getElementById('team-prev');
  const teamNext = document.getElementById('team-next');

  function renderTeam(region) {
    if (!teamCarousel) return;
    
    teamCarousel.innerHTML = '';
    const members = teamData[region];
    
    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.innerHTML = `
        <div class="team-photo" style="background-image: url('${member.photo}')"></div>
        <div class="team-quote">"${member.quote}"</div>
        <div class="team-info">
          <h4>${member.name}</h4>
          <p>${member.title} · ${member.office}</p>
          <a href="#" class="team-cta">Contact Leap Studio ${member.office}</a>
        </div>
      `;
      teamCarousel.appendChild(card);
    });

    // Reset scroll position
    teamCarousel.scrollTo({ left: 0, behavior: 'smooth' });
  }

  // Initialize default region
  renderTeam('na');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const region = btn.getAttribute('data-region');
      renderTeam(region);
    });
  });

  if (teamPrev && teamNext && teamCarousel) {
    teamNext.addEventListener('click', () => {
      teamCarousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
    teamPrev.addEventListener('click', () => {
      teamCarousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  // 5. Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('accept-cookies');
  const btnDecline = document.getElementById('decline-cookies');
  const btnManage = document.getElementById('manage-cookies');

  // Check if user already made a choice
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }

  function closeCookieBanner(choice) {
    localStorage.setItem('cookieConsent', choice);
    cookieBanner.classList.remove('show');
  }

  if (btnAccept) btnAccept.addEventListener('click', () => closeCookieBanner('accepted'));
  if (btnDecline) btnDecline.addEventListener('click', () => closeCookieBanner('declined'));
  if (btnManage) btnManage.addEventListener('click', () => closeCookieBanner('managed'));

});
