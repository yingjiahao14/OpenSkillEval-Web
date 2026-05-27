/* ============================================
   Orchard — Shared JavaScript
   Carousel, Tabs, Accordion, Section Nav
   ============================================ */

// --- Carousel ---
class Carousel {
  constructor(section) {
    this.section = section;
    this.track = section.querySelector('.carousel-track');
    this.prevBtn = section.querySelector('.carousel-prev');
    this.nextBtn = section.querySelector('.carousel-next');
    if (!this.track) return;

    this.cardWidth = 0;
    this.gap = 12;
    this.scrollAmount = 0;

    this.init();
  }

  init() {
    this.measure();
    this.updateButtons();
    this.prevBtn?.addEventListener('click', () => this.scroll(-1));
    this.nextBtn?.addEventListener('click', () => this.scroll(1));
    this.track.addEventListener('scroll', () => this.updateButtons());
    window.addEventListener('resize', () => { this.measure(); this.updateButtons(); });
  }

  measure() {
    const card = this.track.querySelector('.product-card, .info-card, .savings-card');
    if (card) {
      this.cardWidth = card.offsetWidth + this.gap;
    }
    this.scrollAmount = this.cardWidth * 2;
  }

  scroll(dir) {
    const amount = dir > 0 ? this.scrollAmount : -this.scrollAmount;
    this.track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  updateButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = this.track;
    if (this.prevBtn) this.prevBtn.disabled = scrollLeft <= 2;
    if (this.nextBtn) this.nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 2;
  }
}

// --- Entertainment Tabs ---
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

// --- Footer Accordion ---
function initFooterAccordion() {
  const isMobile = () => window.innerWidth <= 768;
  const cols = document.querySelectorAll('.footer-nav-col h4');

  cols.forEach(h4 => {
    h4.addEventListener('click', () => {
      if (!isMobile()) return;
      const col = h4.parentElement;
      col.classList.toggle('expanded');
    });
  });
}

// --- Sticky Section Navigation ---
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  const tabs = nav.querySelectorAll('.section-tab');
  const sectionIds = Array.from(tabs).map(t => t.dataset.section);
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.getElementById(tab.dataset.section);
      if (target) {
        const navHeight = document.querySelector('.top-nav')?.offsetHeight || 48;
        const sectionNavHeight = nav.offsetHeight || 40;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - sectionNavHeight - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver for active state
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = nav.querySelector(`[data-section="${entry.target.id}"]`);
        if (activeTab) activeTab.classList.add('active');
      }
    });
  }, {
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));
}

// --- Mobile Nav Toggle ---
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// --- Init All ---
document.addEventListener('DOMContentLoaded', () => {
  // Init carousels
  document.querySelectorAll('.carousel-section').forEach(section => {
    new Carousel(section);
  });

  initTabs();
  initFooterAccordion();
  initSectionNav();
  initMobileNav();
});
