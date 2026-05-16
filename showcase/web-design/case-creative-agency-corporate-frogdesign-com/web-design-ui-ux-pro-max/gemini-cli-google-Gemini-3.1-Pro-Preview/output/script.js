document.addEventListener('DOMContentLoaded', () => {
  // Lang Selector Toggle
  const langBtn = document.getElementById('lang-btn');
  const langSelector = langBtn?.closest('.lang-selector');

  if (langBtn && langSelector) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSelector.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      langSelector.classList.remove('active');
    });
  }

  // Hero Carousel Logic
  const track = document.getElementById('hero-track');
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector('.hero-nav-btns .prev-btn');
  const nextBtn = document.querySelector('.hero-nav-btns .next-btn');
  const indicators = document.querySelectorAll('.hero-indicator');
  
  if (track && slides.length > 0) {
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    function goToSlide(index) {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
      
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        goToSlide(i);
        resetAutoPlay();
      });
    });

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // Initialize
    goToSlide(0);
    startAutoPlay();
  }

  // Team Carousel Logic
  const teamData = [
    { name: "Denice Alvarez", title: "Office Manager", office: "New York", region: "north-america", quote: "As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers." },
    { name: "Marco Bellini", title: "Design Director", office: "San Francisco", region: "north-america", quote: "Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make." },
    { name: "Priya Mehta", title: "Studio Head", office: "Bangalore", region: "asia", quote: "We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm." },
    { name: "Thierry Lam", title: "Design Lead", office: "Singapore", region: "asia", quote: "Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless." },
    { name: "Gavin Hartley", title: "Managing Director", office: "London", region: "europe", quote: "It's my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results." },
    { name: "Francesca Terzi", title: "Design Director", office: "Munich", region: "europe", quote: "At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life." },
    { name: "Jacintha Soo Ho", title: "Senior Manager, CX Transformation", office: "Melbourne", region: "oceania", quote: "I love helping clients see beyond their assumptions and showing them opportunities they haven't thought of before." }
  ];

  const teamTrack = document.getElementById('team-track');
  const regionTabs = document.querySelectorAll('.tab-btn');

  function renderTeam(region) {
    if (!teamTrack) return;
    
    teamTrack.innerHTML = '';
    const filteredTeam = teamData.filter(member => member.region === region);
    
    filteredTeam.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card';
      // Muted placeholder background using Unsplash source API matching the professional aesthetic
      card.innerHTML = `
        <div class="team-img" style="background-image: url('https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop')"></div>
        <div class="team-content">
          <p class="team-quote">"${member.quote}"</p>
          <div class="team-meta">
            <h4>${member.name}</h4>
            <p>${member.title}</p>
            <a href="#" class="team-link">Contact Leap Studio ${member.office}</a>
          </div>
        </div>
      `;
      teamTrack.appendChild(card);
    });
    
    // Reset scroll
    teamTrack.scrollLeft = 0;
  }

  if (regionTabs.length > 0) {
    regionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        regionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Render team for selected region
        const region = tab.dataset.region;
        renderTeam(region);
      });
    });
    
    // Initial render
    const initialRegion = document.querySelector('.tab-btn.active')?.dataset.region || 'north-america';
    renderTeam(initialRegion);
  }

  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    // Show banner after short delay
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1500);

    const hideBanner = () => {
      cookieBanner.classList.remove('show');
    };

    const cookieBtns = cookieBanner.querySelectorAll('button');
    cookieBtns.forEach(btn => {
      btn.addEventListener('click', hideBanner);
    });
  }
});