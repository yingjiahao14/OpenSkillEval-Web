document.addEventListener('DOMContentLoaded', () => {

  // ===== Header scroll shadow =====
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ===== Hero Carousel =====
  const heroTrack = document.getElementById('heroTrack');
  const heroDots = document.getElementById('heroDots');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  if (heroTrack && heroDots) {
    let heroIndex = 0;
    const heroSlides = heroTrack.querySelectorAll('.hero-carousel__slide');
    const totalSlides = heroSlides.length;
    const dots = heroDots.querySelectorAll('.hero-carousel__dot');

    function goToHeroSlide(index) {
      heroIndex = (index + totalSlides) % totalSlides;
      heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === heroIndex));
    }

    heroPrev.addEventListener('click', () => goToHeroSlide(heroIndex - 1));
    heroNext.addEventListener('click', () => goToHeroSlide(heroIndex + 1));
    dots.forEach(dot => {
      dot.addEventListener('click', () => goToHeroSlide(parseInt(dot.dataset.slide)));
    });

    setInterval(() => goToHeroSlide(heroIndex + 1), 6000);
  }

  // ===== Course Carousels =====
  const carouselState = {};

  document.querySelectorAll('.carousel-arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const carouselId = btn.dataset.carousel;
      const dir = parseInt(btn.dataset.dir);
      const track = document.getElementById(carouselId + 'Track');
      if (!track) return;

      const cards = track.children;
      if (!cards.length) return;

      const cardWidth = cards[0].offsetWidth + 24;
      const visibleWidth = track.parentElement.offsetWidth;
      const maxScroll = track.scrollWidth - visibleWidth;

      if (!carouselState[carouselId]) carouselState[carouselId] = 0;

      carouselState[carouselId] += dir * cardWidth;
      carouselState[carouselId] = Math.max(0, Math.min(carouselState[carouselId], maxScroll));

      track.style.transform = `translateX(-${carouselState[carouselId]}px)`;
    });
  });

  // ===== Pricing Toggle (Plus page) =====
  const pricingToggle = document.getElementById('pricingToggle');
  const pricingContent = document.getElementById('pricingContent');

  if (pricingToggle && pricingContent) {
    const plans = {
      yearly: {
        price: '$14.59',
        period: '/month',
        billed: 'Billed as $174.50/year',
        features: [
          '+1,000 courses FREE to watch',
          '100+ new courses added every week',
          '12 Plus credits every year',
          'Certificate for every completed course',
          'Exclusive savings — always at least 20% off'
        ],
        cta: 'Start Plus — Yearly',
        terms: 'Cancel subscription renewal whenever you want. After one year, renewal price will be the full amount of $349.'
      },
      monthly: {
        price: '$33.90',
        period: '/month',
        billed: 'Billed monthly at $33.90',
        features: [
          '+1,000 courses FREE to watch',
          '100+ new courses added every week',
          '1 Plus credit per month',
          'Certificate for every completed course',
          'Exclusive savings — always at least 20% off'
        ],
        cta: 'Start Plus — Monthly',
        terms: 'Cancel subscription renewal whenever you want.'
      }
    };

    pricingToggle.querySelectorAll('.pricing-toggle__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pricingToggle.querySelectorAll('.pricing-toggle__btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const plan = plans[btn.dataset.plan];
        pricingContent.innerHTML = `
          <div class="pricing-card__price">${plan.price}<span>${plan.period}</span></div>
          <div class="pricing-card__billed">${plan.billed}</div>
          <ul class="pricing-card__features">
            ${plan.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <a href="#" class="btn btn--primary btn--lg pricing-card__cta">${plan.cta}</a>
          <div class="pricing-card__terms">${plan.terms}</div>
        `;
      });
    });
  }

  // ===== FAQ Accordion =====
  const faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.querySelectorAll('.faq-item__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        faqList.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // ===== Courses Sidebar Filtering =====
  const sidebar = document.getElementById('coursesSidebar');
  const courseGrid = document.getElementById('courseGrid');
  const categoryLabel = document.getElementById('categoryLabel');

  if (sidebar && courseGrid) {
    sidebar.querySelectorAll('.sidebar__link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const category = link.dataset.category;
        const label = link.textContent.trim();
        if (categoryLabel) {
          categoryLabel.innerHTML = `Showing: <strong>${label}</strong>`;
        }

        const cards = courseGrid.querySelectorAll('.course-card');
        cards.forEach(card => {
          const tags = card.dataset.tags || '';
          if (category === 'all' || tags.includes(category)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== Projects Sort/Filter =====
  const gallery = document.getElementById('projectGallery');
  const sortFilter = document.getElementById('sortFilter');
  const fieldFilter = document.getElementById('fieldFilter');

  if (gallery && sortFilter) {
    function sortProjects() {
      const items = Array.from(gallery.querySelectorAll('.masonry__item'));
      const sortBy = sortFilter.value;
      const field = fieldFilter ? fieldFilter.value : 'all';

      items.forEach(item => {
        const itemField = item.dataset.field || '';
        item.style.display = (field === 'all' || itemField === field) ? '' : 'none';
      });

      const visibleItems = items.filter(i => i.style.display !== 'none');

      visibleItems.sort((a, b) => {
        switch (sortBy) {
          case 'most-liked':
            return parseInt(b.dataset.likes) - parseInt(a.dataset.likes);
          case 'most-viewed':
            return parseInt(b.dataset.views) - parseInt(a.dataset.views);
          case 'most-recent':
            return new Date(b.dataset.date) - new Date(a.dataset.date);
          default:
            return 0;
        }
      });

      visibleItems.forEach(item => gallery.appendChild(item));
    }

    sortFilter.addEventListener('change', sortProjects);
    if (fieldFilter) fieldFilter.addEventListener('change', sortProjects);

    const timeFilter = document.getElementById('timeFilter');
    if (timeFilter) timeFilter.addEventListener('change', sortProjects);
  }

  // ===== Login Password Toggle =====
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordInput = document.getElementById('password');

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      const icon = document.getElementById('eyeIcon');
      if (icon) {
        icon.innerHTML = isPassword
          ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
          : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    });
  }

  // ===== Login Form Validation =====
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      if (email && password && email.value && password.value) {
        alert('Login submitted! (Demo mode)');
      }
    });
  }

  // ===== Countdown Timer =====
  const countH = document.getElementById('countHours');
  const countM = document.getElementById('countMinutes');
  const countS = document.getElementById('countSeconds');

  if (countH && countM && countS) {
    let totalSeconds = 5 * 3600 + 42 * 60 + 18;

    setInterval(() => {
      if (totalSeconds <= 0) return;
      totalSeconds--;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      countH.textContent = String(h).padStart(2, '0');
      countM.textContent = String(m).padStart(2, '0');
      countS.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // ===== Footer Accordion (mobile) =====
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.footer__section-title').forEach(title => {
      title.addEventListener('click', () => {
        const section = title.closest('.footer__section');
        if (section) section.classList.toggle('open');
      });
    });
  }

  // ===== Mobile Menu Toggle =====
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const nav = document.querySelector('.header__nav');
      if (nav) {
        const isVisible = nav.style.display === 'flex';
        nav.style.display = isVisible ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '64px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'white';
        nav.style.padding = '1rem 1.5rem';
        nav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
        nav.style.zIndex = '100';
        nav.style.borderTop = '1px solid #eee';
      }
    });
  }

});
