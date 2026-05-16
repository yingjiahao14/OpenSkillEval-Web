/* ============================================================
   Global Aid Alliance — App JS
   Handles: mobile menu, donate modal, accordion,
            news carousel, counter animation
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  const overlay = document.getElementById('mobile-overlay');

  function openMenu() {
    mainNav.classList.add('open');
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mainNav.classList.remove('open');
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mainNav.classList.contains('open')) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) closeMenu();
  });

  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));


  /* ---- Donate Modal ---- */
  const modal = document.getElementById('donate-modal');
  const modalClose = document.getElementById('modal-close');
  const donateSubmitBtn = document.getElementById('donate-submit');
  const customAmountInput = document.getElementById('custom-amount');
  const impactText = document.getElementById('impact-text');

  const impacts = {
    25: 'Provides 5 emergency blankets for displaced families',
    50: 'Supplies a family with food and water for one week',
    100: 'Funds emergency shelter materials for a household',
    250: 'Equips a volunteer with disaster response training',
  };

  let selectedAmount = 50;

  function updateSubmitLabel() {
    donateSubmitBtn.textContent = `Donate $${selectedAmount} Now`;
  }

  function updateImpact(amt) {
    impactText.textContent = impacts[amt] || 'Every dollar counts toward saving lives';
  }

  window.openDonateModal = function (e) {
    if (e) e.preventDefault();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  };

  function closeDonateModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeDonateModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDonateModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeDonateModal();
  });

  /* Amount buttons */
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customAmountInput.value = '';
      selectedAmount = parseInt(btn.dataset.amount, 10);
      updateSubmitLabel();
      updateImpact(selectedAmount);
    });
  });

  customAmountInput.addEventListener('input', () => {
    const val = parseInt(customAmountInput.value, 10);
    if (val > 0) {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      selectedAmount = val;
      updateSubmitLabel();
      updateImpact(val);
    }
  });

  /* Frequency buttons */
  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* Submit — demo feedback */
  donateSubmitBtn.addEventListener('click', () => {
    const first = document.getElementById('donor-first').value.trim();
    const email = document.getElementById('donor-email').value.trim();
    if (!first || !email) {
      alert('Please fill in your name and email to continue.');
      return;
    }
    donateSubmitBtn.textContent = 'Processing…';
    donateSubmitBtn.disabled = true;
    setTimeout(() => {
      closeDonateModal();
      donateSubmitBtn.textContent = `Donate $${selectedAmount} Now`;
      donateSubmitBtn.disabled = false;
      const toast = document.createElement('div');
      toast.textContent = `Thank you, ${first}! Your $${selectedAmount} donation is being processed.`;
      toast.style.cssText = `
        position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
        background:#1B3A5C;color:#fff;padding:14px 24px;border-radius:999px;
        font-size:.9rem;font-weight:600;box-shadow:0 8px 20px rgba(0,0,0,.2);
        z-index:9999;white-space:nowrap;max-width:90vw;text-align:center;`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }, 1200);
  });


  /* ---- Accordion ---- */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;

      /* Close all */
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('open');
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        content.classList.add('open');
      }
    });
  });


  /* ---- News Carousel ---- */
  const carousel = document.getElementById('news-carousel');
  const prevBtn = document.getElementById('news-prev');
  const nextBtn = document.getElementById('news-next');
  const dotsContainer = document.getElementById('carousel-dots');

  let carouselIndex = 0;
  let cardsPerView = 1;

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function totalCards() {
    return carousel.querySelectorAll('.news-card').length;
  }

  function maxIndex() {
    return Math.max(0, totalCards() - cardsPerView);
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === carouselIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1} of ${count}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === carouselIndex);
    });
  }

  function setCarouselLayout() {
    cardsPerView = getCardsPerView();
    const cards = carousel.querySelectorAll('.news-card');
    const gap = 24;
    const wrapWidth = carousel.parentElement.offsetWidth;
    const cardWidth = (wrapWidth - gap * (cardsPerView - 1)) / cardsPerView;

    cards.forEach(c => {
      c.style.width = cardWidth + 'px';
      c.style.minWidth = cardWidth + 'px';
    });

    carousel.style.width = (cardWidth * totalCards() + gap * (totalCards() - 1)) + 'px';
    goTo(Math.min(carouselIndex, maxIndex()), false);
    buildDots();
  }

  function goTo(index, animate = true) {
    carouselIndex = Math.max(0, Math.min(index, maxIndex()));
    const cards = carousel.querySelectorAll('.news-card');
    if (!cards.length) return;
    const gap = 24;
    const cardWidth = parseInt(cards[0].style.width, 10) || 300;
    const offset = carouselIndex * (cardWidth + gap);

    if (!animate) carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${offset}px)`;
    if (!animate) requestAnimationFrame(() => { carousel.style.transition = ''; });

    prevBtn.disabled = carouselIndex === 0;
    nextBtn.disabled = carouselIndex >= maxIndex();
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(carouselIndex - 1));
  nextBtn.addEventListener('click', () => goTo(carouselIndex + 1));

  window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(setCarouselLayout, 120);
  });

  setCarouselLayout();


  /* ---- Counter Animation ---- */
  const statEls = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.round(eased * target);

      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }

    requestAnimationFrame(tick);
  }

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    statEls.forEach(el => animateCounter(el));
  }

  /* Trigger counters when stats section enters viewport */
  const statsSection = document.getElementById('impact-stats');
  if ('IntersectionObserver' in window && statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(statsSection);
  } else {
    startCounters();
  }

  /* Header scroll shadow */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    siteHeader.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,0.10)'
      : '0 1px 0 oklch(96% 0.005 240)';
  }, { passive: true });

})();
