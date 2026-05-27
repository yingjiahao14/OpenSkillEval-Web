(function () {
  const setupCarousel = (root) => {
    root.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const prev = root.querySelector(`[data-prev="${carousel.dataset.carousel}"]`);
      const next = root.querySelector(`[data-next="${carousel.dataset.carousel}"]`);
      const move = (dir) => {
        carousel.scrollBy({ left: dir * (carousel.clientWidth * 0.85), behavior: 'smooth' });
      };
      prev && prev.addEventListener('click', () => move(-1));
      next && next.addEventListener('click', () => move(1));
    });
  };

  const setupCourseFilters = () => {
    const list = document.querySelector('[data-course-list]');
    if (!list) return;
    const cards = [...list.querySelectorAll('[data-category]')];
    document.querySelectorAll('[data-filter-category]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-category]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.dataset.filterCategory;
        cards.forEach((card) => {
          const show = selected === 'All' || card.dataset.category === selected;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  };

  const setupPricingToggle = () => {
    const wrap = document.querySelector('[data-pricing-toggle]');
    if (!wrap) return;
    const monthly = document.querySelector('[data-plan="monthly"]');
    const yearly = document.querySelector('[data-plan="yearly"]');
    const monthlyBtn = wrap.querySelector('[data-toggle="monthly"]');
    const yearlyBtn = wrap.querySelector('[data-toggle="yearly"]');
    const switchPlan = (mode) => {
      const isYearly = mode === 'yearly';
      yearly.style.display = isYearly ? '' : 'none';
      monthly.style.display = isYearly ? 'none' : '';
      yearlyBtn.classList.toggle('active', isYearly);
      monthlyBtn.classList.toggle('active', !isYearly);
    };
    monthlyBtn.addEventListener('click', () => switchPlan('monthly'));
    yearlyBtn.addEventListener('click', () => switchPlan('yearly'));
  };

  const setupFaq = () => {
    document.querySelectorAll('.faq-q').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        item.classList.toggle('open');
      });
    });
  };

  const setupProjectsFilter = () => {
    const masonry = document.querySelector('[data-project-grid]');
    if (!masonry) return;
    const cards = [...masonry.querySelectorAll('[data-sort][data-tag]')];
    const render = (tag, sort) => {
      const filtered = cards.filter((c) => tag === 'All' || c.dataset.tag === tag);
      filtered.sort((a, b) => {
        if (sort === 'popular') return Number(b.dataset.likes) - Number(a.dataset.likes);
        if (sort === 'views') return Number(b.dataset.views) - Number(a.dataset.views);
        return Number(a.dataset.sort) - Number(b.dataset.sort);
      });
      cards.forEach((c) => c.remove());
      filtered.forEach((c) => masonry.appendChild(c));
    };

    let activeTag = 'All';
    let activeSort = 'latest';

    document.querySelectorAll('[data-project-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-project-filter]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeTag = btn.dataset.projectFilter;
        render(activeTag, activeSort);
      });
    });

    document.querySelectorAll('[data-project-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-project-sort]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeSort = btn.dataset.projectSort;
        render(activeTag, activeSort);
      });
    });
  };

  const setupPasswordToggle = () => {
    const input = document.querySelector('#password');
    const eye = document.querySelector('[data-eye]');
    if (!input || !eye) return;
    eye.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      eye.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      eye.textContent = show ? '🙈' : '👁️';
    });
  };

  const setupFooterAccordion = () => {
    if (window.innerWidth > 700) return;
    document.querySelectorAll('[data-footer-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.closest('.footer-col').classList.toggle('open');
      });
    });
  };

  const setup = () => {
    setupCarousel(document);
    setupCourseFilters();
    setupPricingToggle();
    setupFaq();
    setupProjectsFilter();
    setupPasswordToggle();
    setupFooterAccordion();
  };

  document.addEventListener('DOMContentLoaded', setup);
})();
