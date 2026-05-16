/* Orchard static site interactions
 * - generic carousel arrows
 * - homepage entertainment tabs
 * - sticky section nav active state
 * - mobile footer accordion
 */

(function(){
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root=document) => root.querySelector(sel);

  function clamp(n, min, max){
    return Math.max(min, Math.min(max, n));
  }

  // --- Carousels ---
  function initCarousels(){
    $$('.carousel').forEach((carousel) => {
      const viewport = $('.carousel__viewport', carousel);
      const prev = $('.carousel__nav--prev', carousel);
      const next = $('.carousel__nav--next', carousel);
      if (!viewport || !prev || !next) return;

      const stepFromViewport = () => {
        // scroll by ~ one card + gap, while feeling "snappy".
        const firstItem = $('.carousel__item', viewport);
        if (!firstItem) return Math.round(viewport.clientWidth * 0.9);
        const r = firstItem.getBoundingClientRect();
        return clamp(Math.round(r.width + 16), 240, 520);
      };

      const syncDisabled = () => {
        const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
        const left = Math.round(viewport.scrollLeft);
        prev.disabled = left <= 2;
        next.disabled = left >= Math.round(maxScrollLeft) - 2;
      };

      const scrollByDir = (dir) => {
        const step = stepFromViewport();
        viewport.scrollBy({left: dir * step, behavior: 'smooth'});
      };

      prev.addEventListener('click', () => scrollByDir(-1));
      next.addEventListener('click', () => scrollByDir(1));
      viewport.addEventListener('scroll', () => syncDisabled(), {passive:true});
      window.addEventListener('resize', () => syncDisabled(), {passive:true});
      syncDisabled();
    });
  }

  // --- Homepage entertainment tabs ---
  function initTabs(){
    const root = $('[data-tabs]');
    if (!root) return;
    const tabs = $$('[role="tab"]', root);
    const panels = $$('[role="tabpanel"]', root);

    function activate(id){
      tabs.forEach((t) => {
        const selected = t.getAttribute('data-tab') === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
      });
      panels.forEach((p) => {
        const show = p.getAttribute('data-panel') === id;
        p.hidden = !show;
      });
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => activate(t.getAttribute('data-tab')));
    });

    // default
    const first = tabs[0]?.getAttribute('data-tab');
    if (first) activate(first);
  }

  // --- Sticky section nav active state ---
  function initSectionNav(){
    const nav = $('[data-section-nav]');
    if (!nav) return;
    const links = $$('a[href^="#"]', nav);
    const targets = links
      .map((a) => $(a.getAttribute('href')))
      .filter(Boolean);

    if (!links.length || !targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = '#' + visible.target.id;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
    }, {
      root: null,
      threshold: [0.2, 0.35, 0.5],
      rootMargin: '-84px 0px -60% 0px'
    });

    targets.forEach((t) => observer.observe(t));

    links.forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const el = $(href);
        if (!el) return;
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 86;
        window.scrollTo({top: y, behavior: 'smooth'});
      });
    });
  }

  // --- Footer accordion (mobile) ---
  function initFooterAccordion(){
    const acc = $('[data-footer-accordion]');
    if (!acc) return;
    $$('.acc__item', acc).forEach((item) => {
      const btn = $('.acc__button', item);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initTabs();
    initSectionNav();
    initFooterAccordion();
  });
})();

