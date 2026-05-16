document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.navbar-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Hero tab switching
  const heroTabBtns = document.querySelectorAll('.hero-tab-btn');
  const heroTabPanels = document.querySelectorAll('.hero-tab-panel');
  heroTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      heroTabBtns.forEach(b => b.classList.remove('active'));
      heroTabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Why Choose Us tabs
  const whyTabBtns = document.querySelectorAll('.why-tab-btn');
  const whyTabPanels = document.querySelectorAll('.why-tab-panel');
  whyTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      whyTabBtns.forEach(b => b.classList.remove('active'));
      whyTabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Testimonial Carousels
  document.querySelectorAll('.testimonial-track-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.testimonial-track');
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = wrapper.parentElement.querySelector('.carousel-prev');
    const nextBtn = wrapper.parentElement.querySelector('.carousel-next');
    let index = 0;

    function getVisible() {
      const w = wrapper.offsetWidth;
      if (w > 900) return 3;
      if (w > 600) return 2;
      return 1;
    }

    function update() {
      const visible = getVisible();
      const max = Math.max(0, cards.length - visible);
      if (index > max) index = max;
      if (index < 0) index = 0;
      const cardWidth = cards[0].offsetWidth + 16;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { index--; update(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { index++; update(); });

    window.addEventListener('resize', update);
    update();
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
