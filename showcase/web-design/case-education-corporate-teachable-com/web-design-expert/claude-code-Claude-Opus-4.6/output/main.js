document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Nav ───
  document.querySelectorAll('.hamburger').forEach(btn => {
    btn.addEventListener('click', () => {
      const links = btn.closest('.nav-inner').querySelector('.nav-links');
      links.classList.toggle('open');
      btn.classList.toggle('active');
    });
  });

  // ─── Tab Switching ───
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab]');
    const container = group.closest('section') || group.parentElement;
    const panels = container.querySelectorAll('[data-tab-panel]');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.tabPanel === target);
        });
      });
    });
  });

  // ─── Why Choose Us Tabs ───
  document.querySelectorAll('.why-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.why;
      const section = tab.closest('.section');
      section.querySelectorAll('.why-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      section.querySelectorAll('.why-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.whyPanel === target);
      });
    });
  });

  // ─── FAQ Accordion ───
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
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

  // ─── Testimonials Carousel ───
  document.querySelectorAll('.testimonials-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let index = 0;

    function getVisible() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function update() {
      const visible = getVisible();
      const max = Math.max(0, cards.length - visible);
      if (index > max) index = max;
      if (index < 0) index = 0;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 0;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { index--; update(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { index++; update(); });

    window.addEventListener('resize', update);
    update();
  });

  // ─── Scroll Animations ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

});
