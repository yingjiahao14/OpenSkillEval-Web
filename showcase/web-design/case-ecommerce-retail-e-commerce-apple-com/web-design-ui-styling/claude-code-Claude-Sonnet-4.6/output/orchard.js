// Orchard — Shared JavaScript

// ── Carousel ──────────────────────────────────────────────
class Carousel {
  constructor(el) {
    this.el = el;
    this.track = el.querySelector('.carousel-track');
    this.prevBtn = el.querySelector('.carousel-btn-prev');
    this.nextBtn = el.querySelector('.carousel-btn-next');
    this.outer = el.querySelector('.carousel-track-outer');
    this.index = 0;
    this.cardWidth = () => {
      const card = this.track.firstElementChild;
      if (!card) return 256;
      return card.offsetWidth + parseInt(getComputedStyle(this.track).gap) || 256;
    };
    this.visibleCount = () => Math.floor(this.outer.offsetWidth / this.cardWidth());
    this.totalCards = this.track.children.length;

    this.prevBtn?.addEventListener('click', () => this.scroll(-1));
    this.nextBtn?.addEventListener('click', () => this.scroll(1));
    this.update();
    window.addEventListener('resize', () => { this.index = 0; this.apply(); this.update(); });
  }
  scroll(dir) {
    const max = this.totalCards - this.visibleCount();
    this.index = Math.max(0, Math.min(this.index + dir, max));
    this.apply();
    this.update();
  }
  apply() {
    this.track.style.transform = `translateX(-${this.index * this.cardWidth()}px)`;
  }
  update() {
    const max = this.totalCards - this.visibleCount();
    if (this.prevBtn) this.prevBtn.disabled = this.index <= 0;
    if (this.nextBtn) this.nextBtn.disabled = this.index >= max;
  }
}

// ── Tabs ──────────────────────────────────────────────────
function initTabs(containerEl) {
  const btns = containerEl.querySelectorAll('.tab-btn');
  const panels = containerEl.querySelectorAll('.tab-panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      containerEl.querySelector(`.tab-panel[data-tab="${target}"]`)?.classList.add('active');
    });
  });
}

// ── Section Nav (smooth scroll + active state) ────────────
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;
  const links = nav.querySelectorAll('.section-nav-link');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        const offset = 44 + 44; // nav + section-nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Update active on scroll
  const sections = Array.from(links).map(l => document.getElementById(l.getAttribute('href').replace('#', ''))).filter(Boolean);
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// ── Footer Accordion (mobile) ─────────────────────────────
function initFooterAccordion() {
  if (window.innerWidth > 768) return;
  document.querySelectorAll('.footer-col h4').forEach(h4 => {
    h4.addEventListener('click', () => {
      h4.parentElement.classList.toggle('open');
    });
  });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-wrapper').forEach(el => new Carousel(el));
  const tabContainer = document.querySelector('.entertainment-section');
  if (tabContainer) initTabs(tabContainer);
  initSectionNav();
  initFooterAccordion();
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) initFooterAccordion();
  });
});
